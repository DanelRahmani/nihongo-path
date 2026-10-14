"use client";

import { activitySchema, myWordsSchema, notebookSchema, pathFilterSchema, progressSchema, settingsSchema, srsSchema } from "@/lib/schemas";
import { reportAnswer } from "@/lib/notebook";
import { createPersistentStore } from "@/lib/storage";
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

/** Counts one answered item (a drill card or a quiz question) towards today's goal. */
export function recordActivity() {
  activityStore.set((a) => recordAnswer(a, dayKey(new Date())));
}

/**
 * One answer in any trainer or quiz: it counts towards today's goal, and a miss goes to the notebook (a right
 * answer counts towards taking an item out). `notebook: false` counts it for the goal only, for another try at a
 * quiz question already reported.
 */
export function logAnswer(deck: string, card: string, correct: boolean, { notebook = true } = {}) {
  recordActivity();
  if (notebook) notebookStore.set((n) => reportAnswer(n, deck, card, correct, Date.now()));
}
