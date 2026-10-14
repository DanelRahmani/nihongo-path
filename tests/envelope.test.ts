import { describe, expect, it } from "vitest";
import { decode, encode, isEnvelope, type StoreSchema } from "@/lib/envelope";
import {
  DEFAULT_PATH_FILTER,
  DEFAULT_SETTINGS,
  pathFilterSchema,
  progressSchema,
  SCHEMAS,
  settingsSchema,
  srsSchema,
  type StoreKey,
} from "@/lib/schemas";

const SRS = {
  cards: {
    "hiragana:あ": { box: 4, due: 1_790_000_000_000, reps: 6, lapses: 1 },
    "katakana:ア": { box: 1, due: 0, reps: 1, lapses: 1 },
  },
  extraRows: { hiragana: 2 },
};

/** What each store held in localStorage before envelopes (version 0), and what it becomes now. */
const LEGACY: Record<StoreKey, { before: unknown; after: unknown }> = {
  "np:settings": {
    before: { script: "furigana", romaji: true },
    after: { furigana: "all", romaji: true, size: "m", font: "mincho", theme: "system" },
  },
  "np:progress": { before: { "start/three-scripts": true }, after: { "start/three-scripts": true } },
  // Version 2 keeps one schedule per deck; every card keeps its box and due time.
  "np:srs": {
    before: SRS,
    after: {
      decks: {
        "hiragana-base": { cards: { "hiragana:あ": SRS.cards["hiragana:あ"] }, extraGroups: 0 },
        "katakana-base": { cards: { "katakana:ア": SRS.cards["katakana:ア"] }, extraGroups: 0 },
      },
    },
  },
  "np:path-filter": { before: { kind: "particles", hideDone: true }, after: { unit: "particles", hideDone: true } },
  // Never stored raw; a bare array still reads as version 0.
  "np:my-words": { before: ["[食|た]べる#verb", "[本|ほん]#counter"], after: ["[食|た]べる#verb", "[本|ほん]#counter"] },
  // Never stored raw either.
  "np:notebook": {
    before: { "quiz|particles/wa-topic#abc": { deck: "quiz", card: "particles/wa-topic#abc", misses: 1, rightInRow: 0, added: 5, lastMiss: 5 } },
    after: { "quiz|particles/wa-topic#abc": { deck: "quiz", card: "particles/wa-topic#abc", misses: 1, rightInRow: 0, added: 5, lastMiss: 5 } },
  },
  "np:activity": { before: { goal: 5, days: { "2026-10-14": { answered: 3, goal: 5 } } }, after: { goal: 5, days: { "2026-10-14": { answered: 3, goal: 5 } } } },
};

describe("envelopes", () => {
  it("tells an envelope from a legacy value", () => {
    expect(isEnvelope({ v: 1, data: {} })).toBe(true);
    expect(isEnvelope({ v: 0, data: {} })).toBe(false);
    expect(isEnvelope({ v: 1, data: {}, extra: 1 })).toBe(false);
    expect(isEnvelope({ script: "kana", romaji: false })).toBe(false);
    expect(isEnvelope(LEGACY["np:progress"].before)).toBe(false);
  });

  it.each(Object.entries(LEGACY))("migrates the legacy %s value to the current version", (key, { before, after }) => {
    const schema = SCHEMAS[key as StoreKey] as StoreSchema<unknown>;
    expect(decode(JSON.stringify(before), schema)).toEqual({ value: after, status: "migrated" });
  });

  it.each(Object.entries(LEGACY))("round-trips %s through encode and decode", (key, { after: value }) => {
    const schema = SCHEMAS[key as StoreKey] as StoreSchema<unknown>;
    const raw = encode(value, schema);
    expect(JSON.parse(raw)).toEqual({ v: schema.version, data: value });
    expect(decode(raw, schema)).toEqual({ value, status: "current" });
  });

  it("falls back when nothing is stored", () => {
    expect(decode(null, settingsSchema)).toEqual({ value: DEFAULT_SETTINGS, status: "empty" });
  });

  it("falls back on corrupt JSON", () => {
    expect(decode("{not json", progressSchema)).toEqual({ value: {}, status: "corrupt" });
    expect(decode('"just a string"', srsSchema).status).toBe("corrupt");
  });

  it("falls back on data from a newer build and reports it, so the store won't overwrite it", () => {
    const raw = JSON.stringify({ v: 99, data: { script: "furigana", romaji: true, size: "L" } });
    expect(decode(raw, settingsSchema)).toEqual({ value: DEFAULT_SETTINGS, status: "future" });
  });

  it("runs every migration step in order", () => {
    const schema: StoreSchema<{ n: number }> = {
      version: 3,
      fallback: { n: 0 },
      migrations: [(d) => ({ n: (d as number) + 1 }), (d) => ({ n: (d as { n: number }).n * 10 }), (d) => d],
      validate: (d) => d as { n: number },
    };
    expect(decode("4", schema)).toEqual({ value: { n: 50 }, status: "migrated" });
    expect(decode(JSON.stringify({ v: 2, data: { n: 7 } }), schema)).toEqual({ value: { n: 7 }, status: "migrated" });
  });

  it("treats a failing migration as corrupt", () => {
    const schema: StoreSchema<number> = {
      version: 1,
      fallback: 0,
      migrations: [() => {
        throw new Error("bad");
      }],
      validate: (d) => d as number,
    };
    expect(decode("5", schema)).toEqual({ value: 0, status: "corrupt" });
  });
});

describe("store schemas repair what they can", () => {
  it("keeps valid settings fields and defaults the rest", () => {
    const raw = JSON.stringify({ v: 2, data: { furigana: "hieroglyphs", romaji: true, size: "l", font: "comic" } });
    expect(decode(raw, settingsSchema).value).toEqual({ ...DEFAULT_SETTINGS, romaji: true, size: "l" });
  });

  it("turns version-1 script modes into furigana modes", () => {
    const v1 = (script: string) => JSON.stringify({ v: 1, data: { script, romaji: false } });
    expect(decode(v1("kana"), settingsSchema).value.furigana).toBe("kana");
    expect(decode(v1("furigana"), settingsSchema).value.furigana).toBe("all");
    expect(decode(v1("kanji"), settingsSchema).value.furigana).toBe("none");
  });

  it("drops progress entries that aren't true", () => {
    const raw = JSON.stringify({ "start/three-scripts": true, "start/polite-and-casual": "yes" });
    expect(decode(raw, progressSchema).value).toEqual({ "start/three-scripts": true });
  });

  it("drops unreadable kana cards and keeps the rest of the schedule", () => {
    const raw = JSON.stringify({
      cards: { "hiragana:あ": { box: 2, due: 5, reps: 1, lapses: 0 }, "hiragana:い": { box: 9, due: 5, reps: 1, lapses: 0 } },
      extraRows: { "hiragana-base": 1, "katakana-base": -3 },
    });
    expect(decode(raw, srsSchema).value).toEqual({
      decks: {
        "hiragana-base": { cards: { "hiragana:あ": { box: 2, due: 5, reps: 1, lapses: 0 } }, extraGroups: 1 },
        "katakana-base": { cards: {}, extraGroups: 0 },
      },
    });
  });

  it("turns a version-1 kind filter into the matching unit tab", () => {
    const v1 = (kind: string) => JSON.stringify({ v: 1, data: { kind, hideDone: false } });
    expect(decode(v1("particles"), pathFilterSchema).value).toEqual({ unit: "particles", hideDone: false });
    expect(decode(v1("basics"), pathFilterSchema).value).toEqual({ unit: "start", hideDone: false });
    expect(decode(v1("kana"), pathFilterSchema).value).toEqual({ unit: "hiragana", hideDone: false });
    expect(decode(v1("all"), pathFilterSchema).value).toEqual(DEFAULT_PATH_FILTER);
  });

  it("drops an unreadable unit tab and keeps the toggle", () => {
    const raw = JSON.stringify({ v: 2, data: { unit: 42, hideDone: true } });
    expect(decode(raw, pathFilterSchema).value).toEqual({ ...DEFAULT_PATH_FILTER, hideDone: true });
  });
});
