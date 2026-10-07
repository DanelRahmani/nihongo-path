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
} from "@/lib/schemas";

/** What each store held in localStorage before envelopes (version 0), and what it should become. */
const LEGACY = {
  "np:settings": { script: "furigana", romaji: true },
  "np:progress": { "start/three-scripts": true, "particles/wa-topic": true },
  "np:srs": {
    cards: {
      "hiragana:あ": { box: 4, due: 1_790_000_000_000, reps: 6, lapses: 1 },
      "katakana:ア": { box: 1, due: 0, reps: 1, lapses: 1 },
    },
    extraRows: { hiragana: 2 },
  },
  "np:path-filter": { kind: "particles", hideDone: true },
} as const;

describe("envelopes", () => {
  it("tells an envelope from a legacy value", () => {
    expect(isEnvelope({ v: 1, data: {} })).toBe(true);
    expect(isEnvelope({ v: 0, data: {} })).toBe(false);
    expect(isEnvelope({ v: 1, data: {}, extra: 1 })).toBe(false);
    expect(isEnvelope({ script: "kana", romaji: false })).toBe(false);
    expect(isEnvelope(LEGACY["np:progress"])).toBe(false);
  });

  it.each(Object.entries(LEGACY))("migrates the legacy %s value to version 1 unchanged", (key, legacy) => {
    const schema = SCHEMAS[key as keyof typeof SCHEMAS] as StoreSchema<unknown>;
    expect(decode(JSON.stringify(legacy), schema)).toEqual({ value: legacy, status: "migrated" });
  });

  it.each(Object.entries(LEGACY))("round-trips %s through encode and decode", (key, value) => {
    const schema = SCHEMAS[key as keyof typeof SCHEMAS] as StoreSchema<unknown>;
    const raw = encode(value, schema);
    expect(JSON.parse(raw)).toEqual({ v: 1, data: value });
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
    const raw = JSON.stringify({ v: 1, data: { script: "hieroglyphs", romaji: true } });
    expect(decode(raw, settingsSchema).value).toEqual({ script: "kana", romaji: true });
  });

  it("drops progress entries that aren't true", () => {
    const raw = JSON.stringify({ "start/three-scripts": true, "start/polite-and-casual": "yes" });
    expect(decode(raw, progressSchema).value).toEqual({ "start/three-scripts": true });
  });

  it("drops unreadable kana cards and keeps the rest of the schedule", () => {
    const raw = JSON.stringify({
      cards: { "hiragana:あ": { box: 2, due: 5, reps: 1, lapses: 0 }, "hiragana:い": { box: 9, due: 5, reps: 1, lapses: 0 } },
      extraRows: { hiragana: 1, katakana: -3 },
    });
    expect(decode(raw, srsSchema).value).toEqual({
      cards: { "hiragana:あ": { box: 2, due: 5, reps: 1, lapses: 0 } },
      extraRows: { hiragana: 1 },
    });
  });

  it("resets an unknown path filter kind", () => {
    const raw = JSON.stringify({ kind: "astrology", hideDone: true });
    expect(decode(raw, pathFilterSchema).value).toEqual({ ...DEFAULT_PATH_FILTER, hideDone: true });
  });
});
