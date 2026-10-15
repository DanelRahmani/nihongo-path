/**
 * The one review queue (E7): everything due across the scheduled decks, most overdue first, then the mistake
 * notebook's items, the longest-waiting first. Each item is asked with its own deck's prompt and checker; a due
 * card is scheduled in its own deck, and every answer goes to the notebook. Pure.
 */
import type { AskableItem, Deck } from "@/lib/decks";
import { askable, notebookItems, noteKey, type Notebook, reportAnswer } from "@/lib/notebook";
import { answerCard, deckState, dueCards, type SrsState } from "@/lib/srs";

export interface QueueItem extends AskableItem {
  /** due: a scheduled card whose time has come; notebook: a missed item waiting to be answered right. */
  from: "due" | "notebook";
  /** When it fell due (due cards) or was last missed (notebook items), ms. */
  since: number;
}

/** Asks a card of a deck that isn't scheduled (quiz questions, conjugation questions), or null if it's gone. */
export type Asker = (cardId: string) => AskableItem | null;

/** One deck's card, ready to ask, or null when the deck has no such card. */
export function askFrom<C extends { id: string }>(deck: Deck<C>, cardId: string): AskableItem | null {
  const card = deck.card(cardId);
  if (!card) return null;
  return {
    deckId: deck.id,
    cardId,
    prompt: deck.prompt(card),
    check: (answer) => deck.check(card, answer),
    ...(deck.answerJp ? { answerJp: deck.answerJp(card) } : {}),
    ...(deck.answerNote ? { answerNote: deck.answerNote(card) } : {}),
  };
}

/**
 * The queue: due cards of every deck, most overdue first (ties keep deck order), then the notebook's items that
 * aren't already due and that a right answer would count for now (lib/notebook.ts askable), oldest miss first.
 * Notebook items of decks this page doesn't know, or whose card is gone, are left out (kept in the store).
 */
export function buildQueue(decks: Deck<{ id: string }>[], askers: Record<string, Asker>, srs: SrsState, notebook: Notebook, now: number): QueueItem[] {
  const due: QueueItem[] = [];
  decks.forEach((deck) => {
    const own = deckState(srs, deck.id);
    for (const card of dueCards(deck, own, now)) {
      const item = askFrom(deck, card.id);
      if (item) due.push({ ...item, from: "due", since: own.cards[card.id].due });
    }
  });
  due.sort((a, b) => a.since - b.since);
  const queued = new Set(due.map((i) => noteKey(i.deckId, i.cardId)));
  const byId = new Map(decks.map((d) => [d.id, d]));
  const missed: QueueItem[] = [];
  for (const note of notebookItems(notebook)) {
    if (queued.has(noteKey(note.deck, note.card)) || !askable(note, now)) continue;
    const deck = byId.get(note.deck);
    const item = deck ? askFrom(deck, note.card) : (askers[note.deck]?.(note.card) ?? null);
    if (item) missed.push({ ...item, from: "notebook", since: note.lastMiss });
  }
  return [...due, ...missed];
}

/** Whether this build has a card, by deck and card id (the review page's data, or the home page's id index). */
export type Exists = (deck: string, card: string) => boolean;

/**
 * How many reviews wait, without the card data, so the home page can show it: due cards in every deck, plus
 * notebook items that aren't already due and can be answered now. With `exists` (the /review-ids.json index) it
 * counts only what the review page can ask, as buildQueue does; without it, ids a later build removed count too.
 */
export function reviewCount(srs: SrsState, notebook: Notebook, now: number, exists: Exists = () => true): { due: number; notebook: number } {
  let due = 0;
  for (const [deck, state] of Object.entries(srs.decks)) for (const [card, s] of Object.entries(state.cards)) if (s.due <= now && exists(deck, card)) due++;
  const isDue = (deck: string, card: string) => (srs.decks[deck]?.cards[card]?.due ?? Infinity) <= now;
  const missed = Object.values(notebook).filter((n) => !isDue(n.deck, n.card) && askable(n, now) && exists(n.deck, n.card)).length;
  return { due, notebook: missed };
}

/**
 * One answer in the review: a due card is scheduled in its own deck; a notebook item is reported to the notebook
 * only (it leaves the schedule alone, as practice does). Every answer is reported to the notebook. The daily goal
 * is counted by the caller (lib/stores.ts logAnswer).
 */
// applyReview schedules due cards only: they are studied, so the daily new-card limit (I7) never applies. If the
// queue ever asks a card with no schedule, answer it through answerScheduled (lib/stores.ts) so it is counted.
export function applyReview(srs: SrsState, notebook: Notebook, item: QueueItem, correct: boolean, now: number): { srs: SrsState; notebook: Notebook } {
  return {
    srs: item.from === "due" ? answerCard(srs, item.deckId, item.cardId, correct, now) : srs,
    notebook: reportAnswer(notebook, item.deckId, item.cardId, correct, now),
  };
}

/**
 * Whether the review must load a deck's cards (one fetched apart from /review-data.json, such as More words): only
 * while it is switched on and its schedule or the notebook holds one of its cards.
 */
export function deckInUse(srs: SrsState, notebook: Notebook, deckId: string, on: boolean): boolean {
  return on && (Object.keys(deckState(srs, deckId).cards).length > 0 || Object.values(notebook).some((item) => item.deck === deckId));
}
