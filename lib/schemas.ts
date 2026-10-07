/**
 * The shape, version and migrations of every localStorage store. Pure, so the migrations are unit
 * tested and backup/restore can decode any store without React.
 */
import { KINDS, type LessonKind, type ScriptMode } from "@/content/types";
import { isPlainObject, type StoreSchema, wrapUnchanged } from "@/lib/envelope";
import { type CardState, EMPTY_SRS, MAX_BOX, type SrsState } from "@/lib/srs";

export interface Settings {
  script: ScriptMode;
  romaji: boolean;
}

export const DEFAULT_SETTINGS: Settings = { script: "kana", romaji: false };

const SCRIPT_MODES: ScriptMode[] = ["kana", "furigana", "kanji"];

/** Keeps every valid field and fills the rest from the defaults, so one bad field doesn't reset the others. */
export const settingsSchema: StoreSchema<Settings> = {
  version: 1,
  fallback: DEFAULT_SETTINGS,
  migrations: [wrapUnchanged],
  validate(data) {
    if (!isPlainObject(data)) return null;
    return {
      script: SCRIPT_MODES.includes(data.script as ScriptMode) ? (data.script as ScriptMode) : DEFAULT_SETTINGS.script,
      romaji: typeof data.romaji === "boolean" ? data.romaji : DEFAULT_SETTINGS.romaji,
    };
  },
};

/** Completed lessons, keyed "unit/lesson". */
export type ProgressState = Record<string, true>;

export const progressSchema: StoreSchema<ProgressState> = {
  version: 1,
  fallback: {},
  migrations: [wrapUnchanged],
  validate(data) {
    if (!isPlainObject(data)) return null;
    return Object.fromEntries(Object.entries(data).filter(([, done]) => done === true)) as ProgressState;
  },
};

function isCardState(x: unknown): x is CardState {
  if (!isPlainObject(x)) return false;
  const { box, due, reps, lapses } = x;
  return (
    Number.isInteger(box) && (box as number) >= 1 && (box as number) <= MAX_BOX &&
    Number.isFinite(due) && Number.isInteger(reps) && Number.isInteger(lapses)
  );
}

/** Drops unreadable cards rather than the whole schedule. */
export const srsSchema: StoreSchema<SrsState> = {
  version: 1,
  fallback: EMPTY_SRS,
  migrations: [wrapUnchanged],
  validate(data) {
    if (!isPlainObject(data)) return null;
    const cards = isPlainObject(data.cards) ? data.cards : {};
    const extraRows = isPlainObject(data.extraRows) ? data.extraRows : {};
    return {
      cards: Object.fromEntries(Object.entries(cards).filter(([, c]) => isCardState(c))) as Record<string, CardState>,
      extraRows: Object.fromEntries(
        Object.entries(extraRows).filter(([, n]) => Number.isInteger(n) && (n as number) >= 0),
      ) as Record<string, number>,
    };
  },
};

export interface PathFilter {
  kind: LessonKind | "all";
  hideDone: boolean;
}

export const DEFAULT_PATH_FILTER: PathFilter = { kind: "all", hideDone: false };

export const pathFilterSchema: StoreSchema<PathFilter> = {
  version: 1,
  fallback: DEFAULT_PATH_FILTER,
  migrations: [wrapUnchanged],
  validate(data) {
    if (!isPlainObject(data)) return null;
    const kinds: string[] = ["all", ...KINDS.map((k) => k.kind)];
    return {
      kind: kinds.includes(data.kind as string) ? (data.kind as PathFilter["kind"]) : DEFAULT_PATH_FILTER.kind,
      hideDone: typeof data.hideDone === "boolean" ? data.hideDone : DEFAULT_PATH_FILTER.hideDone,
    };
  },
};

/** Every store by its localStorage key. Backup and restore (H3) go through this list. */
export const SCHEMAS = {
  "np:settings": settingsSchema,
  "np:progress": progressSchema,
  "np:srs": srsSchema,
  "np:path-filter": pathFilterSchema,
} as const;

export type StoreKey = keyof typeof SCHEMAS;
