/**
 * A Leitner scheduler for any deck: kana now, kanji, vocabulary and the other trainers later (lib/decks.ts holds
 * the decks). Each deck keeps its own state: a box and due time per card, and how many groups the reader opened
 * by hand. Cards come in groups (kana rows), each opening once every card before it is learned. Pure.
 */

/** Leitner boxes 1–5. A correct answer moves a card up one box; a miss sends it back to box 1. */
export const MAX_BOX = 5;
const MIN = 60_000;
const DAY = 24 * 60 * MIN;
/** Wait before a card in box N is due again (index = box). */
export const INTERVALS = [0, 0, 10 * MIN, DAY, 3 * DAY, 7 * DAY];
/** A group counts as learned once every card reaches this box; the next group then unlocks. */
export const UNLOCK_BOX = 3;

export interface CardState {
  box: number;
  due: number;
  reps: number;
  lapses: number;
}

/** One deck's schedule. */
export interface DeckState {
  cards: Record<string, CardState>;
  /** Groups unlocked by hand ("I already know these"). */
  extraGroups: number;
}

/** Every deck's schedule, by deck id (store np:srs, version 2). */
export interface SrsState {
  decks: Record<string, DeckState>;
}

export const EMPTY_DECK_STATE: DeckState = Object.freeze({ cards: Object.freeze({}), extraGroups: 0 });
export const EMPTY_SRS: SrsState = Object.freeze({ decks: Object.freeze({}) });

/** What the scheduler needs of a deck: its cards in unlock order, and the group each belongs to. */
export interface SrsDeck<C extends { id: string } = { id: string }> {
  id: string;
  cards: C[];
  /** Group keys in unlock order. */
  groups: string[];
  groupOf(card: C): string;
}

export const deckState = (srs: SrsState, deckId: string): DeckState => srs.decks[deckId] ?? EMPTY_DECK_STATE;

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

/** The state after answering one card, scheduled in its own deck. */
export function answerCard(srs: SrsState, deckId: string, cardId: string, correct: boolean, now: number): SrsState {
  const state = deckState(srs, deckId);
  const cards = { ...state.cards, [cardId]: schedule(state.cards[cardId], correct, now) };
  return { decks: { ...srs.decks, [deckId]: { ...state, cards } } };
}

/** The state after opening the next group by hand. */
export function unlockGroup(srs: SrsState, deckId: string): SrsState {
  const state = deckState(srs, deckId);
  return { decks: { ...srs.decks, [deckId]: { ...state, extraGroups: state.extraGroups + 1 } } };
}

const learned = (state: DeckState, id: string) => (state.cards[id]?.box ?? 0) >= UNLOCK_BOX;

/** Each deck's cards bucketed by group, worked out once per deck. */
const buckets = new WeakMap<object, Map<string, { id: string }[]>>();

function cardsByGroup<C extends { id: string }>(deck: SrsDeck<C>): Map<string, C[]> {
  let map = buckets.get(deck) as Map<string, C[]> | undefined;
  if (!map) {
    map = new Map(deck.groups.map((g) => [g, [] as C[]]));
    for (const card of deck.cards) map.get(deck.groupOf(card))?.push(card);
    buckets.set(deck, map);
  }
  return map;
}

/** Number of groups (from the start of the deck) unlocked by learning: every earlier card at UNLOCK_BOX. */
export function unlockedGroupCount<C extends { id: string }>(deck: SrsDeck<C>, state: DeckState): number {
  const byGroup = cardsByGroup(deck);
  let count = 1;
  while (count < deck.groups.length && (byGroup.get(deck.groups[count - 1]) ?? []).every((c) => learned(state, c.id))) count++;
  return Math.min(deck.groups.length, count + state.extraGroups);
}

/**
 * The cards that can be asked: those of the unlocked groups, and any card already studied, so one lapse in an
 * early group doesn't lock away the due cards of later ones.
 */
export function unlockedCards<C extends { id: string }>(deck: SrsDeck<C>, state: DeckState): C[] {
  const open = new Set(deck.groups.slice(0, unlockedGroupCount(deck, state)));
  return deck.cards.filter((c) => open.has(deck.groupOf(c)) || state.cards[c.id] !== undefined);
}

export interface DeckStats {
  total: number;
  unlocked: number;
  due: number;
  fresh: number;
  learned: number;
  nextDue: number | null;
}

export function deckStats<C extends { id: string }>(deck: SrsDeck<C>, state: DeckState, now: number): DeckStats {
  const open = unlockedCards(deck, state);
  const seen = open.filter((c) => state.cards[c.id]);
  const future = seen.map((c) => state.cards[c.id].due).filter((d) => d > now);
  return {
    total: deck.cards.length,
    unlocked: open.length,
    due: seen.filter((c) => state.cards[c.id].due <= now).length,
    fresh: open.length - seen.length,
    learned: deck.cards.filter((c) => learned(state, c.id)).length,
    nextDue: future.length ? Math.min(...future) : null,
  };
}

/**
 * The next card to ask: the most overdue card first, then a new card in unlock order.
 * Avoids repeating `lastId` back-to-back when anything else is available.
 * Returns null when nothing is due and there are no new cards.
 */
/** The cards due now, the most overdue first. */
export function dueCards<C extends { id: string }>(deck: SrsDeck<C>, state: DeckState, now: number): C[] {
  return unlockedCards(deck, state)
    .filter((c) => state.cards[c.id] && state.cards[c.id].due <= now)
    .sort((a, b) => state.cards[a.id].due - state.cards[b.id].due);
}

export function nextCard<C extends { id: string }>(deck: SrsDeck<C>, state: DeckState, now: number, lastId?: string): C | null {
  const due = dueCards(deck, state, now);
  const fresh = unlockedCards(deck, state).filter((c) => !state.cards[c.id]);
  const queue = [...due, ...fresh];
  return queue.find((c) => c.id !== lastId) ?? queue[0] ?? null;
}

/** Any unlocked card other than `lastId`, for practice that ignores the schedule. */
export function practiceCard<C extends { id: string }>(deck: SrsDeck<C>, state: DeckState, lastId: string | undefined, rand: number): C | null {
  const open = unlockedCards(deck, state).filter((c) => c.id !== lastId);
  return open.length ? open[Math.floor(rand * open.length)] : null;
}

/** A wait as people say it: 10 min, 3 hours, 2 days. */
export function formatWait(ms: number): string {
  const min = Math.ceil(ms / 60_000);
  if (min < 60) return `${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"}`;
  const d = Math.round(h / 24);
  return `${d} day${d === 1 ? "" : "s"}`;
}
