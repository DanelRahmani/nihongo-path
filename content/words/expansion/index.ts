import type { Word } from "@/content/types";
import { EXTRA_WORDS } from "@/content/words/extra";

/**
 * The dictionary expansion (G2…): common words beyond the lessons, written in batches from the candidate list
 * (content/data/expand-candidates.json, scripts/expand/) and reviewed like lesson content. Derived from JMdict
 * (© EDRDG, CC BY-SA 4.0); the meanings are ours. Not lesson words: the decks, drills and kanji cards never use
 * them, and a lesson word always wins over them in the word inspector.
 */
export const EXPANSION_WORDS: Word[] = [];

/** Every dictionary word that isn't a lesson word: the kanji-example words, then the expansion. */
export const NON_LESSON_WORDS: Word[] = [...EXTRA_WORDS, ...EXPANSION_WORDS];
