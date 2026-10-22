/**
 * Presentation-safe word lookup for the inspector. Matching stays in lib/words:
 * it uses the authored written form and reading together, then its generated-form
 * index for conjugations. This module adds the label and kanji breakdown a screen
 * needs, without importing the large 常用 table into client code.
 */
import type { Jp, Kanji, Word } from "@/content/types";
import { plainOf } from "@/lib/markup";
import { buildIndex, resolveWord } from "@/lib/words";

/** A kanji with its 常用 readings, added by the /dictionary-data route (lib/joyo.ts stays on the server). */
export interface KanjiInfo extends Kanji {
  on: string[];
  /** Hiragana, with a dot before the okurigana: た.べる. */
  kun: string[];
  /** The readings the table indents: special or narrow uses. */
  special: string[];
}

export interface DictionaryData {
  /** The data's licence and sources (/credits). */
  licence?: string;
  words: Word[];
  /** The words that aren't lesson words (kanji examples and the expansion), tried after the lesson words. */
  extra: Word[];
  names: Jp[];
  kanji: KanjiInfo[];
  /**
   * The lessons whose lines use each lesson word, keyed by entry id (`${jp}#${pos}`), as indices into `list`
   * (lib/word-lessons.ts packs it): the word card's "In the lessons".
   */
  lessons?: { list: [key: string, title: string][]; words: Record<string, number[]> };
}

/** The lessons that use a dictionary entry, as links, in path order; none for a word outside the lessons. */
export function lessonsOf(word: Word, data: DictionaryData): { href: string; title: string }[] {
  const ids = data.lessons?.words[`${word.jp}#${word.pos}`] ?? [];
  return ids.flatMap((i) => {
    const lesson = data.lessons?.list[i];
    return lesson ? [{ href: `/learn/${lesson[0]}`, title: lesson[1] }] : [];
  });
}

export type WordLookup =
  | {
      kind: "word";
      word: Word;
      /** Undefined for a dictionary-form match. */
      form?: string;
      /** A suffix or prefix which was recognised with the main word. */
      affix?: Word;
      /** A number written before the counter word. */
      counter?: boolean;
      kanji: KanjiInfo[];
    }
  /** Resolved, but with no dictionary entry of its own: a particle or grammar word, a name, a number, an ending shown alone. */
  | { kind: "function" | "name" | "number" | "fragment"; kanji: KanjiInfo[] };

const FORM_LABELS: Record<string, string> = {
  plain: "plain non-past",
  plainNeg: "plain negative",
  plainPast: "plain past",
  plainPastNeg: "plain past negative",
  polite: "polite non-past",
  politeNeg: "polite negative",
  politePast: "polite past",
  politePastNeg: "polite past negative",
  te: "て form",
  stem: "stem",
  tai: "たい form",
  potential: "potential form",
  volitional: "volitional form",
  passive: "passive form",
  causative: "causative form",
  ba: "ば conditional",
  tara: "たら conditional",
  nasai: "なさい form",
  teKudasai: "てください form",
  imperative: "plain imperative",
  prohibitive: "な prohibitive",
  causativePassive: "causative-passive form",
  honorific: "honorific (尊敬語)",
  humble: "humble (謙譲語)",
  adverb: "adverb form",
  attributive: "attributive form",
  sa: "さ noun",
  naide: "ないで (don't …; without …)",
  nakya: "なきゃ (casual なければ: must)",
  nakucha: "なくちゃ (casual なくては: must)",
  tari: "たり (doing things like …)",
  chau: "ちゃう (casual てしまう)",
  toku: "とく (casual ておく)",
  sugiru: "すぎる (too much)",
  hajimeru: "stem + はじめる (start …ing)",
  owaru: "stem + おわる (finish …ing)",
  tsuzukeru: "stem + つづける (keep on …ing)",
  dasu: "stem + だす (suddenly start)",
};

type Indexes = { lesson: ReturnType<typeof buildIndex>; all: ReturnType<typeof buildIndex> };
const indexes = new WeakMap<DictionaryData, Indexes>();

function indexFor(data: DictionaryData): Indexes {
  let index = indexes.get(data);
  if (!index) {
    index = { lesson: buildIndex(data.words, data.names), all: buildIndex([...data.words, ...data.extra], data.names) };
    indexes.set(data, index);
  }
  return index;
}

/** A concise learner-facing label for an engine-generated form. */
export function formLabel(form?: string): string | undefined {
  if (!form) return undefined;
  return form
    .split("+")
    .map((part) => FORM_LABELS[part] ?? part)
    .join(" → ");
}

/** A kun reading as dictionaries print it: た.べる → た(べる). */
export function kunLabel(kun: string): string {
  const [stem, oku] = kun.split(".");
  return oku ? `${stem}(${oku})` : stem;
}

/** Punctuation belongs to a rendered line, not to the authored word lookup. */
function withoutPunctuation(jp: Jp): Jp {
  return jp.replace(/[。、？！…「」『』・〜＿,.!?()（）:：/→✗✓]+/g, "");
}

/** The kanji a word is written with, in order, each once, that have kanji data. */
export function kanjiOf(jp: Jp, data: DictionaryData): KanjiInfo[] {
  const chars = [...new Set(plainOf(withoutPunctuation(jp), false))];
  return chars.flatMap((c) => data.kanji.filter((k) => k.char === c));
}

/**
 * Finds an authored word exactly, or one of the forms built by the conjugation
 * engine. There is deliberately no substring, spelling or meaning fallback.
 */
export function lookupWord(jp: Jp, data: DictionaryData): WordLookup | null {
  // Endings shown on their own (〜ます in a table) count, and are labelled as such.
  // A lesson word first, so the extra words never change how a lesson line resolves (a kana homophone). An
  // extra word still beats a bare name or number: [森|もり] alone is "forest" (names in lines carry -さん).
  const ix = indexFor(data);
  const key = withoutPunctuation(jp);
  const isWord = (r: ReturnType<typeof resolveWord>) => r && (r.how === "entry" || r.how === "form" || r.how === "affix" || r.how === "counter");
  const lesson = resolveWord(key, ix.lesson, { fragments: true });
  const all = isWord(lesson) ? null : resolveWord(key, ix.all, { fragments: true });
  const resolved = isWord(lesson) ? lesson : isWord(all) ? all : (lesson ?? all);
  if (!resolved) return null;
  const kanji = kanjiOf(jp, data);
  switch (resolved.how) {
    case "counter":
      return { kind: "word", word: resolved.counter, counter: true, kanji };
    case "affix":
      return { kind: "word", word: resolved.word, affix: resolved.affix, kanji };
    case "entry":
    case "form":
      return { kind: "word", word: resolved.word, ...(resolved.form ? { form: resolved.form } : {}), kanji };
    case "function":
    case "name":
    case "number":
    case "fragment":
      return { kind: resolved.how, kanji };
  }
}
