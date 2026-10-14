/**
 * The shape, version and migrations of every localStorage store. Pure, so the migrations are unit
 * tested and backup/restore can decode any store without React.
 */
import { isPlainObject, type StoreSchema, wrapUnchanged } from "@/lib/envelope";
import { KANA } from "@/content/kana";
import { type Notebook, noteKey } from "@/lib/notebook";
import { type CardState, EMPTY_SRS, MAX_BOX, type SrsState } from "@/lib/srs";
import { type Activity, EMPTY_ACTIVITY, GOALS, type Goal, isDayKey } from "@/lib/today";

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

const cardsOf = (x: unknown) =>
  Object.fromEntries(Object.entries(isPlainObject(x) ? x : {}).filter(([, c]) => isCardState(c))) as Record<string, CardState>;

/** An own property only: a polluted prototype must not supply a value. */
const own = (o: Record<string, unknown>, key: string) => (Object.prototype.hasOwnProperty.call(o, key) ? o[key] : undefined);

/**
 * The deck each kana card belonged to in version 1, which kept every kana card in one map. Frozen against the
 * version-1 kana decks (script-group), whatever later builds name their decks.
 */
const KANA_DECK_OF = new Map(KANA.map((k) => [k.id, `${k.script}-${k.group}`]));
const V1_DECKS = new Set(KANA_DECK_OF.values());

/**
 * Version 1 → 2: one map of kana cards, plus hand-unlocked rows by deck, becomes one schedule per deck. Every
 * card keeps its box, due time and counts; a card or deck no kana deck has is dropped. Maps are built from
 * entries, so a stored key such as __proto__ stays an ordinary key.
 */
export function srsV1toV2(data: unknown): unknown {
  if (!isPlainObject(data)) return data;
  const cards = new Map<string, [string, unknown][]>();
  for (const [id, card] of Object.entries(isPlainObject(data.cards) ? data.cards : {})) {
    const deckId = KANA_DECK_OF.get(id);
    if (deckId) cards.set(deckId, [...(cards.get(deckId) ?? []), [id, card]]);
  }
  const extra = new Map(Object.entries(isPlainObject(data.extraRows) ? data.extraRows : {}).filter(([id]) => V1_DECKS.has(id)));
  const ids = [...V1_DECKS].filter((id) => cards.has(id) || extra.has(id));
  return { decks: Object.fromEntries(ids.map((id) => [id, { cards: Object.fromEntries(cards.get(id) ?? []), extraGroups: extra.get(id) ?? 0 }])) };
}

/** Drops unreadable cards rather than a deck's whole schedule, and unreadable decks rather than every deck. */
export const srsSchema: StoreSchema<SrsState> = {
  version: 2,
  fallback: EMPTY_SRS,
  migrations: [wrapUnchanged, srsV1toV2],
  validate(data) {
    if (!isPlainObject(data) || !isPlainObject(data.decks)) return null;
    const decks = Object.entries(data.decks).flatMap(([id, d]) => {
      if (!isPlainObject(d)) return [];
      const extra = own(d, "extraGroups");
      return [[id, { cards: cardsOf(own(d, "cards")), extraGroups: Number.isInteger(extra) && (extra as number) >= 0 ? (extra as number) : 0 }] as const];
    });
    // From entries, so a deck stored under __proto__ is an ordinary key, not the object's prototype.
    return { decks: Object.fromEntries(decks) };
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

/** My words on the dictionary page: entry ids (lib/dictionary.ts), in the order they were saved. */
export type MyWords = string[];

/** Keeps each readable id once, so one bad item doesn't empty the list. */
export const myWordsSchema: StoreSchema<MyWords> = {
  version: 1,
  fallback: [],
  migrations: [wrapUnchanged],
  validate(data) {
    if (!Array.isArray(data)) return null;
    return [...new Set(data.filter((id): id is string => typeof id === "string" && id.length > 0 && id.length <= 200))];
  },
};

/**
 * Answers per day for the Today card's goal and streak (lib/today.ts). Keeps every readable day, so one bad entry
 * doesn't break the streak; an unknown goal falls back to the default.
 */
export const activitySchema: StoreSchema<Activity> = {
  version: 1,
  fallback: EMPTY_ACTIVITY,
  migrations: [wrapUnchanged],
  validate(data) {
    if (!isPlainObject(data)) return null;
    const days: Activity["days"] = {};
    if (isPlainObject(data.days)) {
      for (const [key, day] of Object.entries(data.days)) {
        if (!isDayKey(key) || !isPlainObject(day)) continue;
        const { answered, goal } = day;
        if (Number.isInteger(answered) && (answered as number) >= 0 && Number.isInteger(goal) && (goal as number) > 0) {
          days[key] = { answered: answered as number, goal: goal as number };
        }
      }
    }
    const goal = GOALS.includes(data.goal as Goal) ? (data.goal as Goal) : EMPTY_ACTIVITY.goal;
    const b = data.before;
    const before =
      isPlainObject(b) && typeof b.day === "string" && isDayKey(b.day) && Number.isInteger(b.length) && (b.length as number) > 0
        ? { day: b.day, length: b.length as number }
        : undefined;
    return before ? { goal, days, before } : { goal, days };
  },
};

/** Keeps each readable item, so one bad entry doesn't empty the notebook. */
export const notebookSchema: StoreSchema<Notebook> = {
  version: 1,
  fallback: {},
  migrations: [wrapUnchanged],
  validate(data) {
    if (!isPlainObject(data)) return null;
    const notebook: Notebook = {};
    for (const item of Object.values(data)) {
      if (!isPlainObject(item)) continue;
      const { deck, card, misses, rightInRow, added, lastMiss, lastRight } = item;
      if (typeof deck !== "string" || typeof card !== "string" || !deck || !card || deck.includes("|")) continue;
      if (!Number.isInteger(misses) || (misses as number) < 1 || !Number.isInteger(rightInRow) || (rightInRow as number) < 0) continue;
      if (!Number.isFinite(added) || !Number.isFinite(lastMiss)) continue;
      // Keyed again from the item itself, so a mangled key can't hide it.
      notebook[noteKey(deck, card)] = {
        deck,
        card,
        misses: misses as number,
        rightInRow: rightInRow as number,
        added: added as number,
        lastMiss: lastMiss as number,
        ...(Number.isFinite(lastRight) ? { lastRight: lastRight as number } : {}),
      };
    }
    return notebook;
  },
};

/** Every store by its localStorage key. Backup and restore (H3) go through this list. */
export const SCHEMAS = {
  "np:settings": settingsSchema,
  "np:progress": progressSchema,
  "np:srs": srsSchema,
  "np:path-filter": pathFilterSchema,
  "np:my-words": myWordsSchema,
  "np:activity": activitySchema,
  "np:notebook": notebookSchema,
} as const;

export type StoreKey = keyof typeof SCHEMAS;
