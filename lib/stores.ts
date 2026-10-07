"use client";

import { pathFilterSchema, progressSchema, settingsSchema, srsSchema } from "@/lib/schemas";
import { createPersistentStore } from "@/lib/storage";

export type { PathFilter, ProgressState, Settings } from "@/lib/schemas";

export const settingsStore = createPersistentStore("np:settings", settingsSchema);

/** Completed lessons, keyed "unit/lesson". */
export const progressStore = createPersistentStore("np:progress", progressSchema);

export const srsStore = createPersistentStore("np:srs", srsSchema);

/** The path page's kind filter and "hide finished" toggle. */
export const pathFilterStore = createPersistentStore("np:path-filter", pathFilterSchema);
