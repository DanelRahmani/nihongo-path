/**
 * The mistake notebook: every trainer and quiz reports its answers here. A miss puts the item in the notebook;
 * it leaves after two right answers in a row. The review queue (E7) asks the items again. Pure.
 */

/** The notebook's deck name for lesson quiz questions, which aren't a scheduled deck. */
export const QUIZ_DECK = "quiz";

/** The notebook's deck name for the conjugation trainer's questions (card id: `${word.jp}#${form}`). */
export const CONJUGATION_DECK = "conjugation";

/** The vocabulary deck's id (lib/vocab-deck.ts), here so the home page can name it without loading the deck. */
export const VOCAB_DECK_ID = "vocab";

/** The cloze deck's id (lib/cloze-deck.ts), for the same reason. */
export const CLOZE_DECK_ID = "cloze";

/** Right answers in a row that take an item out of the notebook. */
export const LEAVE_AFTER = 2;

/**
 * How long after a miss a right answer starts to count: copying the answer just shown, or seeing the card again
 * a moment later, isn't remembering it.
 */
export const SPACING = 10 * 60_000;

export interface NoteItem {
  /** The deck that asks the item (a deck id from lib/decks.ts, or "quiz" for a lesson quiz question). */
  deck: string;
  /** The card's id within its deck. */
  card: string;
  misses: number;
  /** Right answers since the last miss. */
  rightInRow: number;
  /** When the item was first missed, and missed last (ms). */
  added: number;
  lastMiss: number;
}

/** Items by key (noteKey). */
export type Notebook = Record<string, NoteItem>;

/** Deck ids never hold "|" (the store rejects one that does), so the key can't be ambiguous. */
export const noteKey = (deck: string, card: string) => `${deck}|${card}`;

/**
 * One answer to an item. A miss adds it, or resets its run of right answers; a right answer to an item in the
 * notebook counts towards LEAVE_AFTER once SPACING has passed since the miss. A right answer to an item that
 * isn't in the notebook changes nothing.
 */
export function reportAnswer(notebook: Notebook, deck: string, card: string, correct: boolean, now: number): Notebook {
  const key = noteKey(deck, card);
  const item = notebook[key];
  if (correct) {
    if (!item || now - item.lastMiss < SPACING) return notebook;
    if (item.rightInRow + 1 < LEAVE_AFTER) return { ...notebook, [key]: { ...item, rightInRow: item.rightInRow + 1 } };
    const rest = { ...notebook };
    delete rest[key];
    return rest;
  }
  return {
    ...notebook,
    [key]: { deck, card, misses: (item?.misses ?? 0) + 1, rightInRow: 0, added: item?.added ?? now, lastMiss: now },
  };
}

/**
 * The items this build can still ask (`exists` says which), the longest-waiting first. Items whose card was
 * removed, or whose quiz prompt was rewritten, are kept in the store but not counted: a later build may bring the
 * card back.
 */
export function resolvableItems(notebook: Notebook, exists: (item: NoteItem) => boolean): NoteItem[] {
  return notebookItems(notebook).filter(exists);
}

/** The items, the longest-waiting first (oldest last miss). */
export function notebookItems(notebook: Notebook): NoteItem[] {
  return Object.values(notebook).sort((a, b) => a.lastMiss - b.lastMiss || a.added - b.added);
}

/**
 * A short, stable id for a quiz question: its lesson and a hash of its prompt, so inserting a question doesn't
 * renumber the others. (FNV-1a, 32 bits, in base 36.)
 */
export function quizCardId(lessonKey: string, prompt: string): string {
  let h = 0x811c9dc5;
  for (const c of prompt) {
    h ^= c.codePointAt(0)!;
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${lessonKey}#${h.toString(36)}`;
}
