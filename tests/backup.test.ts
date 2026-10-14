import { describe, expect, it } from "vitest";
import { backupFileName, makeBackup, readBackup, STORE_NAMES } from "@/lib/backup";
import { decode, encode, type StoreSchema } from "@/lib/envelope";
import { reportAnswer } from "@/lib/notebook";
import { SCHEMAS, type StoreKey } from "@/lib/schemas";

/** A non-default value for every store, as a learner's browser would hold it. */
const VALUES: Record<StoreKey, unknown> = {
  "np:settings": { furigana: "all", romaji: true, size: "l", font: "gothic", theme: "dark" },
  "np:progress": { "start/three-scripts": true, "particles/wa-vs-ga": true },
  "np:srs": { decks: { "hiragana-base": { cards: { "hiragana:あ": { box: 3, due: 1_700_000_000_000, reps: 4, lapses: 1 } }, extraGroups: 1 } } },
  "np:path-filter": { unit: "verbs", hideDone: true },
  "np:my-words": ["[本|ほん]#noun"],
  "np:activity": { goal: 20, days: { "2026-10-13": { answered: 25, goal: 20 }, "2026-10-14": { answered: 3, goal: 20 } } },
  "np:notebook": reportAnswer({}, "quiz", "particles/wa-vs-ga#abc", false, 1_700_000_000_000),
};

const schema = (key: StoreKey) => SCHEMAS[key] as StoreSchema<unknown>;
const storage = (entries: Record<string, string>) => (key: string) => entries[key] ?? null;

describe("backup", () => {
  it("lists a value for every store, so the round trip covers them all", () => {
    expect(Object.keys(VALUES).sort()).toEqual(Object.keys(SCHEMAS).sort());
    expect(Object.keys(STORE_NAMES).sort()).toEqual(Object.keys(SCHEMAS).sort());
    // Each sample is valid as it stands, so the round trip below proves nothing is lost.
    for (const key of Object.keys(VALUES) as StoreKey[]) expect(schema(key).validate(VALUES[key]), key).toEqual(VALUES[key]);
  });

  it("round-trips every store: export, then import, gives the same stored values", () => {
    const stored = Object.fromEntries((Object.keys(VALUES) as StoreKey[]).map((k) => [k, encode(VALUES[k], schema(k))]));
    const file = makeBackup(storage(stored), new Date("2026-10-14T09:00:00Z"));
    const read = readBackup(file);
    expect(read.ok).toBe(true);
    if (!read.ok) return;
    expect(read.exported).toBe("2026-10-14T09:00:00.000Z");
    expect(read.writes).toEqual(stored);
    expect(read.outcomes.every((o) => o.outcome === "restored")).toBe(true);
    for (const key of Object.keys(VALUES) as StoreKey[]) expect(decode(read.writes[key] ?? null, schema(key)).value, key).toEqual(VALUES[key]);
  });

  it("imports a file of version-0 (unwrapped) stores through their migrations", () => {
    const file = JSON.stringify({
      app: "nihongo-path",
      backup: 1,
      stores: {
        "np:progress": { "start/three-scripts": true },
        "np:srs": { cards: { "hiragana:あ": { box: 2, due: 5, reps: 1, lapses: 0 } }, extraRows: { "hiragana-base": 1 } },
        "np:settings": { script: "kanji", romaji: true },
      },
    });
    const read = readBackup(file);
    expect(read.ok).toBe(true);
    if (!read.ok) return;
    expect(read.outcomes).toEqual([
      { key: "np:settings", outcome: "migrated" },
      { key: "np:progress", outcome: "migrated" },
      { key: "np:srs", outcome: "migrated" },
    ]);
    expect(decode(read.writes["np:srs"] ?? null, schema("np:srs")).value).toMatchObject({
      decks: { "hiragana-base": { cards: { "hiragana:あ": { box: 2, due: 5 } }, extraGroups: 1 } },
    });
    expect(decode(read.writes["np:settings"] ?? null, schema("np:settings")).value).toMatchObject({ furigana: "none", romaji: true });
    expect(read.writes["np:notebook"]).toBeUndefined();
  });

  it("leaves out a store from a newer build or one that can't be used, and imports the rest", () => {
    const file = JSON.stringify({
      app: "nihongo-path",
      backup: 1,
      stores: { "np:progress": { v: 99, data: {} }, "np:my-words": { v: 1, data: "not a list" }, "np:path-filter": { v: 2, data: { unit: "verbs", hideDone: false } }, "np:other": 1 },
    });
    const read = readBackup(file);
    expect(read.ok && read.outcomes).toEqual([
      { key: "np:progress", outcome: "newer" },
      { key: "np:path-filter", outcome: "restored" },
      { key: "np:my-words", outcome: "unusable" },
    ]);
    expect(read.ok && Object.keys(read.writes)).toEqual(["np:path-filter"]);
  });

  it("refuses files that aren't backups, or that hold nothing usable", () => {
    expect(readBackup("not json")).toMatchObject({ ok: false });
    expect(readBackup(JSON.stringify({ app: "other", backup: 1, stores: {} }))).toMatchObject({ ok: false });
    expect(readBackup(JSON.stringify({ app: "nihongo-path", stores: {} }))).toMatchObject({ ok: false, reason: "This backup has no version." });
    expect(readBackup(JSON.stringify({ app: "nihongo-path", backup: 2, stores: {} }))).toMatchObject({ ok: false, reason: expect.stringContaining("newer") });
    expect(readBackup(JSON.stringify({ app: "nihongo-path", backup: 1, stores: {} }))).toMatchObject({ ok: false });
    // __proto__ in the file is an ordinary key, never a store.
    expect(readBackup('{"app":"nihongo-path","backup":1,"stores":{"__proto__":{"np:progress":{}}}}')).toMatchObject({ ok: false });
  });

  it("skips stores the browser holds nothing or garbage for, and names the file by date", () => {
    const file = JSON.parse(makeBackup(storage({ "np:progress": "{oops", "np:my-words": encode(["a#noun"], schema("np:my-words")) }), new Date(0)));
    expect(Object.keys(file.stores)).toEqual(["np:my-words"]);
    // By the local date: a backup made just after midnight is named for that day.
    expect(backupFileName(new Date(2026, 9, 14, 0, 30))).toBe("nihongo-path-2026-10-14.json");
  });

  it("keeps a store this browser holds from a newer build, and exports such a store unchanged", () => {
    const newer = JSON.stringify({ v: 99, data: { anything: true } });
    const file = makeBackup(storage({ "np:progress": newer }), new Date(0));
    expect(JSON.parse(file).stores["np:progress"]).toEqual({ v: 99, data: { anything: true } });
    expect(readBackup(file)).toMatchObject({ ok: false });
    const incoming = JSON.stringify({ app: "nihongo-path", backup: 1, stores: { "np:progress": { v: 1, data: { "start/three-scripts": true } }, "np:my-words": { v: 1, data: [] } } });
    const read = readBackup(incoming, storage({ "np:progress": newer }));
    expect(read.ok && read.outcomes).toEqual([
      { key: "np:progress", outcome: "kept-newer" },
      { key: "np:my-words", outcome: "restored" },
    ]);
    expect(read.ok && Object.keys(read.writes)).toEqual(["np:my-words"]);
  });

  it("treats null stores, a bad export date and a non-integer version safely", () => {
    const base = { app: "nihongo-path", stores: { "np:progress": null, "np:my-words": { v: 1, data: [] } } };
    const read = readBackup(JSON.stringify({ ...base, backup: 1, exported: 42 }));
    expect(read).toMatchObject({ ok: true, exported: null, outcomes: [{ key: "np:progress", outcome: "unusable" }, { key: "np:my-words", outcome: "restored" }] });
    expect(readBackup(JSON.stringify({ ...base, backup: "1" }))).toMatchObject({ ok: false });
    expect(readBackup(JSON.stringify({ ...base, backup: 1.5 }))).toMatchObject({ ok: false });
  });
});
