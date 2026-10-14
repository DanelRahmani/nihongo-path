import { KANJI } from "@/content/kanji";
import { WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { NON_LESSON_WORDS } from "@/content/words/expansion";
import { GROUP_SIZE, type KanjiCard } from "@/lib/kanji-deck";
import { parse, plainOf, readingOf } from "@/lib/markup";
import { SITE_PAGES } from "@/lib/search";
import { DATE_KANJI } from "@/lib/today";

/** Parts of speech that make poor kanji cards: their meaning names a job, not a thing to recall. */
const NOT_CARDS = new Set(["counter", "suffix", "prefix"]);

/**
 * A meaning with its kanji in kana, read as the card's word reads them: "(〜が好き: to like)" for [好|す]き gives
 * "(〜がすき: to like)". The meaning is the question, so it must not show the answer's kanji.
 */
function inKana(meaning: string, word: string): string {
  let out = readingOf(meaning, false);
  for (const t of parse(word, false)) if (t.kind === "ruby") out = out.replaceAll(t.base, t.reading);
  return out;
}

/**
 * The kanji cards, built at build time from content/kanji.ts and the dictionary: one card per lesson kanji, most
 * used first. Each asks a word with the kanji that no other card asks, if there is one: first the kanji's own
 * examples, then other dictionary words, lesson words first. Kanji with the fewest words choose first, so 英 keeps
 * 英語 and 語 asks 日本語. Kanji with one word only (冷 蔵 庫: 冷蔵庫) share it. The meaning shown is the
 * dictionary's, with its kanji in kana. Server only: the page hands the result to the trainer.
 */
export function kanjiCards(): KanjiCard[] {
  const dictionary = [...WORDS, ...EXTRA_WORDS].filter((w) => !NOT_CARDS.has(w.pos));
  // The first entry for each written form: 本 the noun "book", not the counter.
  const meaningOf = new Map<string, string>();
  for (const w of dictionary) if (!meaningOf.has(w.jp)) meaningOf.set(w.jp, w.meaning);
  const candidates = new Map(
    KANJI.map((k) => {
      const others = dictionary.map((w) => w.jp).filter((jp) => plainOf(jp, false).includes(k.char) && !k.examples.includes(jp));
      return [k.char, [...new Set([...k.examples, ...others])].filter((jp) => meaningOf.has(jp))];
    }),
  );
  const order = KANJI.map((k, i) => ({ char: k.char, i })).sort((a, b) => candidates.get(a.char)!.length - candidates.get(b.char)!.length || a.i - b.i);
  const asked = new Set<string>();
  const wordOf = new Map<string, string>();
  for (const { char } of order) {
    const list = candidates.get(char)!;
    const word = list.find((jp) => !asked.has(jp)) ?? list[0];
    asked.add(word);
    wordOf.set(char, word);
  }
  return KANJI.map((k, i) => {
    const word = wordOf.get(k.char)!;
    return { id: k.char, meanings: k.meanings, word, wordMeaning: inKana(meaningOf.get(word)!, word), group: String(Math.floor(i / GROUP_SIZE) + 1) };
  });
}

/**
 * Every kanji the app shows in a Japanese line (the lesson kanji, the dictionary's words, the Today card's date
 * and the search's page names), which "furigana on new kanji" writes rules for. Server only; the layout hands it to the head script.
 */
export function furiganaKanji(): string {
  const all = new Set([...KANJI.map((k) => k.char), ...DATE_KANJI]);
  // The search's page names (練習, 活用, 復習) show as Japanese lines in the search results.
  for (const page of SITE_PAGES) for (const c of plainOf(page.jp, false)) if (/\p{Script=Han}/u.test(c)) all.add(c);
  for (const w of [...WORDS, ...NON_LESSON_WORDS]) for (const c of plainOf(w.jp, false)) if (/\p{Script=Han}/u.test(c)) all.add(c);
  return [...all].join("");
}
