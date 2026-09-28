import { type Deck, deckCards, type Kana } from "@/content/kana";

/** Leitner boxes 1–5. A correct answer moves a card up one box; a miss sends it back to box 1. */
export const MAX_BOX = 5;
const MIN = 60_000;
const DAY = 24 * 60 * MIN;
/** Wait before a card in box N is due again (index = box). */
export const INTERVALS = [0, 0, 10 * MIN, DAY, 3 * DAY, 7 * DAY];
/** A row counts as learned once every card reaches this box; the next row then unlocks. */
export const UNLOCK_BOX = 3;

export interface CardState {
  box: number;
  due: number;
  reps: number;
  lapses: number;
}

export interface SrsState {
  cards: Record<string, CardState>;
  /** Rows unlocked by hand ("I already know these"), per deck. */
  extraRows: Record<string, number>;
}

export const EMPTY_SRS: SrsState = { cards: {}, extraRows: {} };

export function schedule(card: CardState | undefined, correct: boolean, now: number): CardState {
  const prev = card ?? { box: 1, due: now, reps: 0, lapses: 0 };
  const box = correct ? Math.min(prev.box + 1, MAX_BOX) : 1;
  return {
    box,
    due: now + INTERVALS[box],
    reps: prev.reps + 1,
    lapses: prev.lapses + (correct ? 0 : 1),
  };
}

export function isCorrect(kana: Kana, answer: string): boolean {
  const a = answer.trim().toLowerCase();
  return kana.romaji.includes(a);
}

/** Number of rows (from the start of the deck) currently unlocked. */
export function unlockedRowCount(deck: Deck, state: SrsState): number {
  const cards = deckCards(deck);
  let count = 1;
  while (count < deck.rows.length) {
    const learned = deck.rows
      .slice(0, count)
      .every((row) =>
        cards.filter((k) => k.row === row).every((k) => (state.cards[k.id]?.box ?? 0) >= UNLOCK_BOX),
      );
    if (!learned) break;
    count++;
  }
  return Math.min(deck.rows.length, count + (state.extraRows[deck.id] ?? 0));
}

export function unlockedCards(deck: Deck, state: SrsState): Kana[] {
  const rows = new Set(deck.rows.slice(0, unlockedRowCount(deck, state)));
  return deckCards(deck).filter((k) => rows.has(k.row));
}

export interface DeckStats {
  total: number;
  unlocked: number;
  due: number;
  fresh: number;
  learned: number;
  nextDue: number | null;
}

export function deckStats(deck: Deck, state: SrsState, now: number): DeckStats {
  const all = deckCards(deck);
  const open = unlockedCards(deck, state);
  const seen = open.filter((k) => state.cards[k.id]);
  const future = seen.map((k) => state.cards[k.id].due).filter((d) => d > now);
  return {
    total: all.length,
    unlocked: open.length,
    due: seen.filter((k) => state.cards[k.id].due <= now).length,
    fresh: open.length - seen.length,
    learned: all.filter((k) => (state.cards[k.id]?.box ?? 0) >= UNLOCK_BOX).length,
    nextDue: future.length ? Math.min(...future) : null,
  };
}

/**
 * The next card to ask: the most overdue card first, then a new card in unlock order.
 * Avoids repeating `lastId` back-to-back when anything else is available.
 * Returns null when nothing is due and there are no new cards.
 */
export function nextCard(deck: Deck, state: SrsState, now: number, lastId?: string): Kana | null {
  const open = unlockedCards(deck, state);
  const due = open
    .filter((k) => state.cards[k.id] && state.cards[k.id].due <= now)
    .sort((a, b) => state.cards[a.id].due - state.cards[b.id].due);
  const fresh = open.filter((k) => !state.cards[k.id]);
  const queue = [...due, ...fresh];
  return queue.find((k) => k.id !== lastId) ?? queue[0] ?? null;
}

/** Any unlocked card other than `lastId`, for practice that ignores the schedule. */
export function practiceCard(deck: Deck, state: SrsState, lastId: string | undefined, rand: number): Kana | null {
  const open = unlockedCards(deck, state).filter((k) => k.id !== lastId);
  return open.length ? open[Math.floor(rand * open.length)] : null;
}
