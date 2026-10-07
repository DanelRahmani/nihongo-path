/**
 * The shape, version and migrations of every localStorage store. Pure, so the migrations are unit
 * tested and backup/restore can decode any store without React.
 */
import { isPlainObject, type StoreSchema, wrapUnchanged } from "@/lib/envelope";
import { type CardState, EMPTY_SRS, MAX_BOX, type SrsState } from "@/lib/srs";

/**
 * How kanji are shown. kana: kanji replaced by their reading · all: furigana over every kanji ·
 * new: furigana only over kanji not yet learned (E2) · none: kanji alone.
 */
export const FURIGANA_MODES = ["kana", "all", "new", "none"] as const;
export const TEXT_SIZES = ["s", "m", "l"] as const;
export const FONTS = ["mincho", "gothic"] as const;
export const THEMES = ["system", "light", "dark"] as const;

export interface Settings {
  furigana: (typeof FURIGANA_MODES)[number];
  romaji: boolean;
  size: (typeof TEXT_SIZES)[number];
  /** The typeface for Japanese lines. */
  font: (typeof FONTS)[number];
  theme: (typeof THEMES)[number];
}

export const DEFAULT_SETTINGS: Settings = { furigana: "kana", romaji: false, size: "m", font: "mincho", theme: "system" };

/** Version 1's three script modes, as version 2 furigana modes. */
export const SCRIPT_TO_FURIGANA: Record<string, Settings["furigana"]> = { kana: "kana", furigana: "all", kanji: "none" };

const oneOf = <T extends string>(options: readonly T[], value: unknown, fallback: T): T =>
  options.includes(value as T) ? (value as T) : fallback;

/** Keeps every valid field and fills the rest from the defaults, so one bad field doesn't reset the others. */
export const settingsSchema: StoreSchema<Settings> = {
  version: 2,
  fallback: DEFAULT_SETTINGS,
  migrations: [
    wrapUnchanged,
    (data) => (isPlainObject(data) ? { furigana: SCRIPT_TO_FURIGANA[data.script as string], romaji: data.romaji } : data),
  ],
  validate(data) {
    if (!isPlainObject(data)) return null;
    return {
      furigana: oneOf(FURIGANA_MODES, data.furigana, DEFAULT_SETTINGS.furigana),
      romaji: typeof data.romaji === "boolean" ? data.romaji : DEFAULT_SETTINGS.romaji,
      size: oneOf(TEXT_SIZES, data.size, DEFAULT_SETTINGS.size),
      font: oneOf(FONTS, data.font, DEFAULT_SETTINGS.font),
      theme: oneOf(THEMES, data.theme, DEFAULT_SETTINGS.theme),
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

/** The path page's unit tab and "hide finished" toggle. */
export interface PathFilter {
  /** The unit tab the reader chose; null follows their progress. */
  unit: string | null;
  hideDone: boolean;
}

export const DEFAULT_PATH_FILTER: PathFilter = { unit: null, hideDone: false };

/**
 * Version 1 filtered the whole path by lesson kind. Version 2 shows one unit per tab, so a kind
 * filter opens that kind's first unit, and "all" follows progress. Unit slugs equal kind names
 * except for these two.
 */
const KIND_TO_UNIT: Record<string, string | null> = { all: null, basics: "start", kana: "hiragana" };

export const pathFilterSchema: StoreSchema<PathFilter> = {
  version: 2,
  fallback: DEFAULT_PATH_FILTER,
  migrations: [
    wrapUnchanged,
    (data) => {
      if (!isPlainObject(data)) return data;
      const kind = typeof data.kind === "string" ? data.kind : "all";
      return { unit: kind in KIND_TO_UNIT ? KIND_TO_UNIT[kind] : kind, hideDone: data.hideDone };
    },
  ],
  validate(data) {
    if (!isPlainObject(data)) return null;
    return {
      unit: typeof data.unit === "string" && /^[a-z0-9-]+$/.test(data.unit) ? data.unit : null,
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
