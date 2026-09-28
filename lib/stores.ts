"use client";

import type { ScriptMode } from "@/content/types";
import { EMPTY_SRS, type SrsState } from "@/lib/srs";
import { createPersistentStore } from "@/lib/storage";

export interface Settings {
  script: ScriptMode;
  romaji: boolean;
}

export const settingsStore = createPersistentStore<Settings>("np:settings", {
  script: "kana",
  romaji: false,
});

/** Completed lessons, keyed "unit/lesson". */
export const progressStore = createPersistentStore<Record<string, true>>("np:progress", {});

export const srsStore = createPersistentStore<SrsState>("np:srs", EMPTY_SRS);
