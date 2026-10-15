import type { Word } from "@/content/types";
import { BATCH_01 } from "@/content/words/expansion/batch-01";
import { BATCH_02 } from "@/content/words/expansion/batch-02";
import { BATCH_03 } from "@/content/words/expansion/batch-03";
import { BATCH_04 } from "@/content/words/expansion/batch-04";
import { BATCH_05 } from "@/content/words/expansion/batch-05";
import { BATCH_06 } from "@/content/words/expansion/batch-06";
import { BATCH_07 } from "@/content/words/expansion/batch-07";
import { BATCH_08 } from "@/content/words/expansion/batch-08";
import { BATCH_09 } from "@/content/words/expansion/batch-09";
import { BATCH_10 } from "@/content/words/expansion/batch-10";
import { EXTRA_WORDS } from "@/content/words/extra";

/**
 * The dictionary expansion (G2…): common words beyond the lessons, written in batches from the candidate list
 * (content/data/expand-candidates.json, scripts/expand/) and reviewed like lesson content. Derived from JMdict
 * (© EDRDG, CC BY-SA 4.0); the meanings are ours. Not lesson words: the lesson decks, drills and kanji cards never
 * use them (only the opt-in "More words" deck does, lib/vocab-more-cards.ts), and a lesson word always wins over
 * them in the word inspector.
 */
/** The batches by number, so the checker (tests/expansion.test.ts) tests each one on its own. */
export const BATCHES: Record<string, Word[]> = {
  "01": BATCH_01,
  "02": BATCH_02,
  "03": BATCH_03,
  "04": BATCH_04,
  "05": BATCH_05,
  "06": BATCH_06,
  "07": BATCH_07,
  "08": BATCH_08,
  "09": BATCH_09,
  "10": BATCH_10,
};

export const EXPANSION_WORDS: Word[] = Object.values(BATCHES).flat();

/** Every dictionary word that isn't a lesson word: the kanji-example words, then the expansion. */
export const NON_LESSON_WORDS: Word[] = [...EXTRA_WORDS, ...EXPANSION_WORDS];
