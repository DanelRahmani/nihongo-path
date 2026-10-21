"use client";

import { markCompleted } from "@/lib/history";
import {
  activitySchema,
  historySchema,
  lessonsLogSchema,
  myWordsSchema,
  newCardsSchema,
  notebookSchema,
  pathFilterSchema,
  placementSchema,
  progressSchema,
  type Review,
  settingsSchema,
  srsSchema,
  type StoreKey,
  type StoreValue,
  studySchema,
} from "@/lib/schemas";
import { countNew, isNewCard, newLeft } from "@/lib/new-cards";
import { answerCard, deckState, type SrsState } from "@/lib/srs";
import { reportAnswer } from "@/lib/notebook";
import { createPersistentStore, type PersistentStore } from "@/lib/storage";
import { dayKey, recordAnswer } from "@/lib/today";

export type { MyWords, PathFilter, ProgressState, Settings } from "@/lib/schemas";

export const settingsStore = createPersistentStore("np:settings", settingsSchema);

/** Completed lessons, keyed "unit/lesson". */
export const progressStore = createPersistentStore("np:progress", progressSchema);

export const srsStore = createPersistentStore("np:srs", srsSchema);

/** The path page's kind filter and "hide finished" toggle. */
export const pathFilterStore = createPersistentStore("np:path-filter", pathFilterSchema);

/** The dictionary's ★ My words. */
export const myWordsStore = createPersistentStore("np:my-words", myWordsSchema);

/** Answers per day, for the Today card's goal and streak. */
export const activityStore = createPersistentStore("np:activity", activitySchema);

/** The mistake notebook: items missed in any trainer or quiz, until answered right twice in a row. */
export const notebookStore = createPersistentStore("np:notebook", notebookSchema);

/** Study choices: the "More words" deck switch and the new cards allowed a day. */
export const studyStore = createPersistentStore("np:study", studySchema);

/** New cards answered today, for the daily limit (I7). */
export const newCardsStore = createPersistentStore("np:new-cards", newCardsSchema);

/** Every answer in every drill, quiz and review since recording began, oldest first (Phase 0). */
export const historyStore = createPersistentStore("np:history", historySchema);

/** When each lesson was first opened and marked done. */
export const lessonsLogStore = createPersistentStore("np:lessons-log", lessonsLogSchema);

/** Each finished placement check. */
export const placementStore = createPersistentStore("np:placement", placementSchema);

/** Every store by its key, for the progress export and the merge on import. */
export const STORES: { [K in StoreKey]: PersistentStore<StoreValue<K>> } = {
  "np:settings": settingsStore,
  "np:progress": progressStore,
  "np:srs": srsStore,
  "np:path-filter": pathFilterStore,
  "np:my-words": myWordsStore,
  "np:activity": activityStore,
  "np:notebook": notebookStore,
  "np:study": studyStore,
  "np:new-cards": newCardsStore,
  "np:history": historyStore,
  "np:lessons-log": lessonsLogStore,
  "np:placement": placementStore,
};

/** What an answer adds to the history beyond its deck, card and result. */
export interface AnswerDetail {
  /** What the reader typed. */
  answer?: string;
  /** Time to answer, ms. */
  ms?: number;
  /** p practice (not scheduled), r the review queue, x a retry of a quiz question. */
  mode?: Review["m"];
}

/** Adds one answer to the history. */
export function recordReview(deck: string, card: string, correct: boolean, { answer = "", ms, mode }: AnswerDetail = {}) {
  const review: Review = { k: deck, c: card, t: Date.now(), r: correct ? "c" : "x", a: answer.trim() };
  if (ms !== undefined) review.ms = Math.round(ms);
  if (mode) review.m = mode;
  historyStore.set((h) => [...h, review]);
}

/** Marks lessons done or not done, and logs when (`placed`: by the placement check). */
export function setLessonsDone(keys: string[], done: boolean, placed = false) {
  progressStore.set((p) => {
    const next = { ...p };
    for (const key of keys) {
      if (done) next[key] = true;
      else delete next[key];
    }
    return next;
  });
  lessonsLogStore.set((log) => markCompleted(log, keys, done, Date.now(), placed));
}

/** Today's allowance of new cards under the reader's limit, for `nextCard` (lib/srs.ts). */
export const newCardsLeft = (now: number) => newLeft(newCardsStore.get(), dayKey(new Date(now)), studyStore.get().newPerDay);

/**
 * Schedules one answer in a deck (answerCard) and, when the card had never been answered, counts it as one of
 * today's new cards. Every drill that introduces cards answers through here; the review queue doesn't (its cards are
 * all studied), nor does practice.
 */
export function answerScheduled(state: SrsState, deckId: string, cardId: string, correct: boolean, now: number): SrsState {
  if (isNewCard(deckState(state, deckId).cards, cardId)) newCardsStore.set((nc) => countNew(nc, dayKey(new Date(now))));
  return answerCard(state, deckId, cardId, correct, now);
}

/** Counts one answered item (a drill card or a quiz question) towards today's goal. */
export function recordActivity() {
  activityStore.set((a) => recordAnswer(a, dayKey(new Date())));
}

/**
 * One answer in any trainer or quiz: it goes to the history, counts towards today's goal, and a miss goes to the
 * notebook (a right answer counts towards taking an item out). `notebook: false` counts it for the goal only, for
 * another try at a quiz question already reported.
 */
export function logAnswer(deck: string, card: string, correct: boolean, { notebook = true, ...detail }: { notebook?: boolean } & AnswerDetail = {}) {
  recordReview(deck, card, correct, detail);
  recordActivity();
  if (notebook) notebookStore.set((n) => reportAnswer(n, deck, card, correct, Date.now()));
}
