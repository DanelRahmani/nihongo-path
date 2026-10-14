/**
 * Site search (the dialog opened with / or Ctrl/⌘K): one flat index of pages, lessons, grammar topics, kanji and
 * words, built at build time into the static /search-index.json, and ranked on the client. Matching reuses the
 * dictionary's folds (lib/dictionary.ts): katakana as hiragana, lenient romaji, English at word starts. Pure.
 */
import type { Word } from "@/content/types";
import { buildEntries, closeness, foldEnglish, looseKana, looseRomaji, parseQuery, toHiragana, withoutArticle } from "@/lib/dictionary";
import { langRuns, plainOf, readingOf } from "@/lib/markup";
import { kanaToRomaji, romajiOf } from "@/lib/romaji";
import { normalizeRomaji } from "@/lib/romaji-input";

export type SearchKind = "page" | "lesson" | "grammar" | "kanji" | "word";

/** Results of equal score list in this order. */
export const KIND_ORDER: SearchKind[] = ["page", "lesson", "grammar", "kanji", "word"];

export const KIND_LABELS: Record<SearchKind, string> = { page: "Page", lesson: "Lesson", grammar: "Grammar", kanji: "Kanji", word: "Word" };

export interface SearchItem {
  kind: SearchKind;
  /** What the result shows, without markup. */
  label: string;
  detail: string;
  href: string;
  /** Japanese to match, katakana folded to hiragana: written forms and readings. */
  jp: string[];
  /** Romaji to match, normalised (lib/romaji-input.ts). */
  roma: string[];
  /** English names, folded and without a leading article: a page or lesson title, a kanji's meanings, a word's glosses. */
  names: string[];
  /** All the English to match at a word start, folded. */
  en: string;
}

/** The app's top-level pages, so "dictionary" or 辞書 finds the page itself. */
export const SITE_PAGES: IndexSources["pages"] = [
  { title: "Path", detail: "All the lessons, unit by unit", href: "/", jp: "[道|みち]" },
  { title: "Kana charts", detail: "Hiragana and katakana", href: "/kana", jp: "かな" },
  { title: "Kana drill", detail: "Spaced-repetition practice for kana", href: "/kana/drill", jp: "[練習|れんしゅう]" },
  { title: "Kanji cards", detail: "Type words in kanji with a Japanese keyboard", href: "/kanji/drill", jp: "[漢字|かんじ]" },
  { title: "Conjugation", detail: "One verb or adjective, one form at a time", href: "/conjugation", jp: "[活用|かつよう]" },
  { title: "Vocabulary", detail: "English to Japanese cards for the lessons' words", href: "/vocabulary", jp: "[単語|たんご]" },
  { title: "Fill the gap", detail: "The lessons' example lines with the highlighted part missing", href: "/cloze", jp: "[穴埋|あなう]め" },
  { title: "Polite and casual", detail: "Say a lesson line in the other register", href: "/register", jp: "[丁寧|ていねい]" },
  { title: "Review", detail: "Everything due from every drill, then your mistakes", href: "/review", jp: "[復習|ふくしゅう]" },
  { title: "Type it", detail: "Copy lesson lines with a Japanese keyboard", href: "/type", jp: "[入力|にゅうりょく]" },
  { title: "Placement check", detail: "A few quiz questions to find where on the path to start", href: "/placement", jp: "[実力|じつりょく]" },
  { title: "Grammar overview", detail: "Particles, grammar and verb forms on one page", href: "/grammar", jp: "[文法|ぶんぽう]" },
  { title: "Dictionary", detail: "Every word, by kanji, kana, romaji or English", href: "/dictionary", jp: "[辞書|じしょ]" },
  { title: "Reading", detail: "A sign, a menu, a chat, a story and haiku", href: "/read", jp: "[読|よ]む" },
];

export interface IndexSources {
  /** jp: the page's Japanese name in markup, so its reading and romaji match too. */
  pages: { title: string; detail: string; href: string; jp: string }[];
  /** kana: a lesson of the kana units, whose mark is a kana to read as itself (は is ha there, not the particle wa). */
  lessons: { href: string; title: string; summary: string; mark: string; unit: string; kana: boolean }[];
  grammar: { slug: string; pattern: string; meaning: string }[];
  kanji: { char: string; meanings: string[]; on: string[]; kun: string[] }[];
  words: Word[];
  extra: Word[];
}

const unique = (xs: string[]) => [...new Set(xs.filter(Boolean))];

/** A Japanese stretch in pieces at its punctuation: 〜て、〜て → て, て; これ・それ → これ, それ. */
const pieces = (run: string) => run.split(/[\s〜・…。、？]+/).filter(Boolean);

/** A run that starts with the particle へ or は stacked on another (への, には is fine), read as two words: e no. */
const particleStack = (kana: string) => kana.replace(/^([はへ])(?=[のもとにでがをや])/, "$1 ");

/** Romaji of a kana reading as letters, never as a particle: a kanji read は is ha. */
const literalRomaji = (kana: string) => normalizeRomaji(romajiOf(`[字|${kana}]`));

/**
 * The Japanese stretches of English prose with Japanese in it, and their romaji: "Place に[行|い]く" gives に行く
 * and にいく, read niiku. A stretch is read as a sentence would be, so は and へ alone are the particles wa and e.
 */
function japaneseIn(markup: string): { jp: string[]; roma: string[] } {
  const runs = (text: string) => langRuns(text).filter((r) => r.ja).flatMap((r) => pieces(r.text));
  const readings = runs(readingOf(markup, false));
  return {
    jp: unique([...runs(plainOf(markup, false)), ...readings].map(toHiragana)),
    roma: unique(readings.map((r) => normalizeRomaji(kanaToRomaji(particleStack(r))))),
  };
}

/** English with its Japanese in romaji, so "te form" finds "The て form": the て form → the te form. */
function romanised(markup: string): string {
  return langRuns(readingOf(markup, false))
    .map((r) => (r.ja ? pieces(r.text).map((p) => kanaToRomaji(particleStack(p))).join(" ") : r.text))
    .join("");
}

/** English for the names list: folded, without a leading article. */
const name = (s: string) => withoutArticle(foldEnglish(plainOf(s, false)));

/** The whole index, in a fixed order: pages, lessons, grammar topics, kanji, then words. */
export function buildSearchIndex(src: IndexSources): SearchItem[] {
  const pages = src.pages.map(
    (p): SearchItem => ({
      kind: "page",
      label: p.title,
      detail: p.detail,
      href: p.href,
      jp: unique([toHiragana(plainOf(p.jp, false)), readingOf(p.jp, false)]),
      roma: [normalizeRomaji(romajiOf(p.jp))],
      names: [name(p.title)],
      en: foldEnglish(`${p.title} ${p.detail}`),
    }),
  );
  const lessons = src.lessons.map((l): SearchItem => {
    // A mark of two parts (は・が, [内|うち]・[外|そと]) matches either part.
    const parts = l.mark.split("・").map((part) => part.replace(/^〜/, ""));
    const inTitle = japaneseIn(l.title);
    return {
      kind: "lesson",
      label: plainOf(l.title, false),
      detail: `${l.unit} · ${plainOf(l.summary, false)}`,
      href: l.href,
      jp: unique([...parts.flatMap((part) => [toHiragana(plainOf(part, false)), toHiragana(readingOf(part, false))]), ...inTitle.jp]),
      roma: unique([...parts.map((part) => (l.kana ? literalRomaji(readingOf(part, false)) : normalizeRomaji(romajiOf(part)))), ...(l.kana ? [] : inTitle.roma)]),
      names: unique([name(l.title), name(romanised(l.title))]),
      en: foldEnglish(`${plainOf(l.title, false)} ${romanised(l.title)} ${plainOf(l.summary, false)}`),
    };
  });
  const grammar = src.grammar.map((g): SearchItem => {
    const inPattern = japaneseIn(g.pattern);
    return {
      kind: "grammar",
      label: plainOf(g.pattern, false),
      detail: plainOf(g.meaning, false),
      href: `/grammar#${g.slug}`,
      jp: inPattern.jp,
      roma: inPattern.roma,
      names: unique([name(g.pattern), name(romanised(g.pattern))]),
      en: foldEnglish(`${plainOf(g.pattern, false)} ${romanised(g.pattern)} ${plainOf(g.meaning, false)}`),
    };
  });
  const kanji = src.kanji.map((k): SearchItem => {
    // Kun readings without the okurigana dot: た.べる → たべる. The stem alone (た) would tie with real readings.
    const readings = unique([...k.on.map(toHiragana), ...k.kun.map((r) => r.replace(".", ""))]);
    return {
      kind: "kanji",
      label: k.char,
      detail: k.meanings.join(", "),
      href: `/kanji/${k.char}`,
      jp: [k.char, ...readings],
      roma: unique(readings.map(literalRomaji)),
      names: k.meanings.map(name),
      en: foldEnglish(k.meanings.join(", ")),
    };
  });
  const words = buildEntries({ words: src.words, extra: src.extra }).map(
    (e): SearchItem => ({
      kind: "word",
      label: e.written,
      detail: e.reading === e.written ? plainOf(e.word.meaning, false) : `${e.reading} · ${plainOf(e.word.meaning, false)}`,
      href: `/dictionary?q=${encodeURIComponent(e.written)}`,
      jp: unique([e.keys.written, e.keys.kana]),
      roma: [e.keys.roma],
      names: e.keys.glosses,
      en: e.keys.en,
    }),
  );
  return [...pages, ...lessons, ...grammar, ...kanji, ...words];
}

/**
 * Lower is better; null for no match. Japanese matches the Japanese keys (exact, start, inside), then the same
 * with long vowels in one spelling. English letters
 * match the romaji (exact, or start for three letters or more; the whole word with long vowels shortened) and
 * the English: a whole name, a word in a name that starts with the query, then a word start anywhere in the text.
 */
export function scoreItem(item: SearchItem, query: ReturnType<typeof parseQuery>): number | null {
  if (query.kind === "empty") return null;
  const scores: (number | null)[] = [];
  if (query.kind === "jp") {
    for (const key of item.jp) {
      scores.push(closeness(key, query.text));
      // Long vowels in one spelling (こうひい finds コーヒー), a half step below.
      const loose = closeness(looseKana(key), query.loose);
      if (loose !== null) scores.push(loose + 0.5);
    }
  } else {
    const reading = item.kind === "kanji" ? 0.25 : 0;
    for (const key of item.roma) {
      const strict = closeness(key, query.roma, false);
      if (strict !== null) scores.push(strict + reading);
      if (looseRomaji(key) === looseRomaji(query.roma)) scores.push(0.5 + reading);
    }
    if (item.names.includes(query.en)) scores.push(0);
    else if (item.names.some((n) => query.start.test(n))) scores.push(1.5);
    else if (query.en.length >= 3 && query.start.test(item.en)) scores.push(2.5);
  }
  const found = scores.filter((s): s is number => s !== null);
  return found.length ? Math.min(...found) : null;
}

/** The best matches, best first; ties list pages, lessons, grammar, kanji, then words, shorter labels first. */
export function searchIndex(items: SearchItem[], query: string, limit = 20): SearchItem[] {
  const q = parseQuery(query);
  if (q.kind === "empty") return [];
  const hits: { item: SearchItem; score: number; order: number }[] = [];
  items.forEach((item, order) => {
    const score = scoreItem(item, q);
    if (score !== null) hits.push({ item, score, order });
  });
  return hits
    .sort(
      (a, b) =>
        a.score - b.score ||
        KIND_ORDER.indexOf(a.item.kind) - KIND_ORDER.indexOf(b.item.kind) ||
        a.item.label.length - b.item.label.length ||
        a.order - b.order,
    )
    .slice(0, limit)
    .map((h) => h.item);
}
