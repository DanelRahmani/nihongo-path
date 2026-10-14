import type { WordPos } from "@/content/types";
import { WORDS } from "@/content/words";
import { plainOf } from "@/lib/markup";

/** A word of the day: the lesson markup and its meaning as plain text. */
export interface TodayWord {
  jp: string;
  meaning: string;
}

/** Words that stand on their own; counters, affixes and pre-noun words make poor words of the day. */
const POS: WordPos[] = ["noun", "verb", "i-adj", "na-adj", "adverb", "expression", "interjection"];

/**
 * The lesson words the word of the day cycles through, in dictionary order. Build time only. A build that adds
 * words changes the count and the stride, so the day's word can change with a new build.
 */
export function todayWords(): TodayWord[] {
  return WORDS.filter((w) => POS.includes(w.pos)).map((w) => ({ jp: w.jp, meaning: plainOf(w.meaning, false) }));
}
