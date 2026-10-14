"use client";

import { activitySchema, myWordsSchema, pathFilterSchema, progressSchema, settingsSchema, srsSchema } from "@/lib/schemas";
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

/** Counts one answered item (a drill card or a quiz question) towards today's goal. */
export function recordActivity() {
  activityStore.set((a) => recordAnswer(a, dayKey(new Date())));
}
