import type { WordPos } from "@/content/types";
import { WORDS } from "@/content/words";
import { plainOf } from "@/lib/markup";
import type { VocabCard } from "@/lib/vocab-deck";
import { FIXED_FORM, wordLessons } from "@/lib/word-lessons";

/** Parts of speech that make vocabulary cards; affixes and counters are learned in use. */
export const POS: WordPos[] = ["noun", "pronoun", "verb", "i-adj", "na-adj", "adverb", "expression", "interjection", "question", "conjunction", "pre-noun"];

/** The part of speech, shown on the front, so 多い (adjective) and たくさん (adverb) are told apart. */
export const POS_NAMES: Partial<Record<WordPos, string>> = {
  verb: "verb",
  "i-adj": "adjective",
  "na-adj": "adjective",
  adverb: "adverb",
  pronoun: "pronoun",
  "pre-noun": "before a noun",
  question: "question word",
  expression: "expression",
  interjection: "interjection",
};

/**
 * Words that make poor cards: single-kana interjections with many spellings (あっ, ええ), the kana lessons'
 * minimal-pair fillers, and 結構, which the lessons use only in 結構です (no, thank you).
 */
const DROPPED = new Set(["あ", "え", "バック", "ツール", "[結構|けっこう]"]);

/** Near-synonyms a learner may type for each other's card, accepted with a note naming the card's own word. */
const NEAR: [string, string][] = [
  ["[多|おお]い", "たくさん"],
  ["[今夜|こんや]", "[今晩|こんばん]"],
  ["[少|すこ]し", "ちょっと"],
  ["クラス", "[授業|じゅぎょう]"],
  ["[私|わたし]", "[僕|ぼく]"],
];

/**
 * Other spellings that count, as a keyboard or a speaker writes them: a word the lessons write in kana but a
 * keyboard converts (空く), common kana spellings (子ども), the full set phrase (ありがとうございます), and the
 * long or short form of an interjection.
 */
const SPELLINGS: Record<string, string[]> = {
  "すく": ["空く"],
  "[子供|こども]": ["子ども"],
  "[友達|ともだち]": ["友だち"],
  "いい": ["よい"],
  "[一緒|いっしょ]": ["一緒に", "いっしょに"],
  "ありがとう": ["ありがとうございます"],
  "ごちそうさま": ["ごちそうさまでした"],
  "お[疲|つか]れ[様|さま]": ["お疲れ様です", "おつかれさまです", "お疲れさま", "お疲れさまです"],
  "へえ": ["へー"],
  "じゃあ": ["じゃ"],
  "[箸|はし]": ["お箸", "おはし"],
};

/** Digit spellings a keyboard offers for a number word: 一つ → 1つ, 三人 → 3人. */
function digitSpellings(written: string): string[] {
  const m = written.match(/^([一二三四五六七八九十])([つ人])$/);
  return m ? [`${"一二三四五六七八九十".indexOf(m[1]) + 1}${m[2]}`] : [];
}

const JAPANESE = /[぀-ヿ\p{Script=Han}〜]/u;

/** A meaning split at its semicolons outside brackets. */
function topLevelParts(text: string): string[] {
  const parts = [""];
  let depth = 0;
  for (const c of text) {
    depth += c === "(" ? 1 : c === ")" ? -1 : 0;
    if (c === ";" && depth === 0) parts.push("");
    else parts[parts.length - 1] += c;
  }
  return parts;
}

/**
 * A meaning as an English question, so the prompt never shows the answer: a bracket "(Japanese: English)" keeps
 * its English ("liked (〜が好き: to like)" → "liked (to like)"); other brackets and parts with Japanese in them are
 * dropped ("to be, to exist (people, animals); 〜ている: is doing" → "to be, to exist (people, animals)"). Empty
 * when the meaning is all Japanese.
 */
export function englishOnly(meaning: string): string {
  return topLevelParts(plainOf(meaning, false))
    .map((part) =>
      part.replace(/\s*\(([^)]*)\)/g, (m, inner: string) => {
        if (!JAPANESE.test(inner)) return m;
        const english = inner.split(":").slice(1).join(":").trim();
        return english && !JAPANESE.test(english) && part.replace(m, "").trim() ? ` (${english})` : "";
      }),
    )
    .filter((part) => !JAPANESE.test(part))
    .map((part) => part.trim())
    .filter(Boolean)
    .join("; ");
}

/**
 * The vocabulary cards: every lesson word that stands alone, with an English meaning and the lessons that use
 * it, in path order (the order new cards come in). Words written the same (何 なに and なん) are one card taking
 * both readings; words with the same English meaning, and the reviewed near-synonyms, accept each other. Build
 * time only: the page hands the result to the deck.
 */
export function vocabCards(path: string[]): VocabCard[] {
  const used = wordLessons({ kanaLessons: true });
  const words = WORDS.filter((w) => POS.includes(w.pos) && used.has(w.jp) && !FIXED_FORM.has(w.jp) && !DROPPED.has(w.jp));
  const cards: VocabCard[] = [];
  for (const w of words) {
    const written = plainOf(w.jp, false);
    const same = cards.find((c) => plainOf(c.jp, false) === written);
    if (same) {
      same.also.push(w.jp);
      continue;
    }
    const lessons = [...used.get(w.jp)!];
    const meaning = englishOnly(w.meaning);
    if (!meaning) continue;
    cards.push({
      id: `${w.jp}#${w.pos}`,
      jp: w.jp,
      meaning,
      pos: POS_NAMES[w.pos] ?? "",
      also: [],
      spellings: [...(SPELLINGS[w.jp] ?? []), ...digitSpellings(written)],
      lessons,
      group: lessons[0],
    });
  }
  for (const c of cards) {
    const near = NEAR.flatMap(([a, b]) => (c.jp === a ? [b] : c.jp === b ? [a] : []));
    const sameMeaning = cards.filter((o) => o !== c && o.meaning === c.meaning).map((o) => o.jp);
    c.also = [...c.also, ...sameMeaning, ...near];
  }
  const order = (c: VocabCard) => path.indexOf(c.group);
  return cards.map((c, i) => ({ c, i })).sort((a, b) => order(a.c) - order(b.c) || a.i - b.i).map(({ c }) => c);
}
