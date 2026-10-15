/**
 * The daily limit on new cards (I7), pure. A card is new the first time it is answered in a scheduled deck (kana,
 * kanji, vocabulary, More words, gap-fill, polite and casual); the count is kept for the local day only, so it starts
 * again at midnight. Studied cards, practice and the review queue don't count and are never held back.
 */

/** The limits a learner can choose. */
export const NEW_PER_DAY = [5, 10, 20] as const;
export type NewPerDay = (typeof NEW_PER_DAY)[number];
export const DEFAULT_NEW_PER_DAY: NewPerDay = 10;

/** New cards answered on one local day ("YYYY-MM-DD", lib/today.ts dayKey). */
export interface NewCards {
  day: string;
  count: number;
}

export const NO_NEW_CARDS: NewCards = Object.freeze({ day: "", count: 0 });

/** New cards answered today: a count from another day is yesterday's. */
export const newToday = (nc: NewCards, today: string) => (nc.day === today ? nc.count : 0);

/** How many more new cards today allows under `limit` (0 once it is met or passed, as after lowering the limit). */
export const newLeft = (nc: NewCards, today: string, limit: number) => Math.max(0, limit - newToday(nc, today));

/** One more new card answered today. */
export const countNew = (nc: NewCards, today: string): NewCards => ({ day: today, count: newToday(nc, today) + 1 });

/** The drills' line when today's limit holds new cards back (no number: the limit may have been lowered since). */
export const NEW_CARDS_DONE = "Today's new cards are done: due cards still come up, and new ones open tomorrow.";

/** Whether answering this card makes it one of today's new cards: it has never been answered in its deck. */
export const isNewCard = (deckCards: Record<string, unknown>, cardId: string) => !Object.hasOwn(deckCards, cardId);
