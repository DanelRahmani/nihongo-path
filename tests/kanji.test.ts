import { describe, expect, it } from "vitest";
import { KANJI } from "@/content/kanji";
import { NAMES, WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { corpusFields } from "@/lib/corpus";
import { isJoyo, joyoReadingOk, joyoReadings } from "@/lib/joyo";
import { parse, plainOf } from "@/lib/markup";
import { keyOf } from "@/lib/words";

const HAN = /\p{Script=Han}/u;
const BY_CHAR = new Map(KANJI.map((k) => [k.char, k]));

describe("the kanji data (content/kanji.ts)", () => {
  it("has every kanji the lessons and their words use, once", () => {
    const used = new Set<string>();
    for (const f of corpusFields()) for (const c of plainOf(f.text, false)) if (HAN.test(c)) used.add(c);
    for (const jp of [...WORDS.map((w) => w.jp), ...NAMES]) for (const c of plainOf(jp, false)) if (HAN.test(c)) used.add(c);
    expect([...used].filter((c) => !BY_CHAR.has(c))).toEqual([]);
    expect(BY_CHAR.size).toBe(KANJI.length);
  });

  it("holds only 常用 kanji, each with readings, meanings and a stroke count", () => {
    const bad = KANJI.filter((k) => !isJoyo(k.char) || !joyoReadings(k.char).length || !k.meanings.length || k.strokes < 1);
    expect(bad.map((k) => k.char)).toEqual([]);
  });

  it("gives one or two example words that contain the kanji and are in the dictionary", () => {
    const known = new Set([...WORDS, ...EXTRA_WORDS].map((w) => keyOf(w.jp)));
    const bad = KANJI.filter(
      (k) => !k.examples.length || k.examples.length > 2 || k.examples.some((jp) => !plainOf(jp, false).includes(k.char) || !known.has(keyOf(jp))),
    );
    expect(bad.map((k) => k.char)).toEqual([]);
  });

  it("writes the extra example words with 常用 kanji and readings", () => {
    const bad = EXTRA_WORDS.flatMap((w) =>
      parse(w.jp, true).flatMap((t) => (t.kind === "ruby" && !joyoReadingOk(t.base, t.reading) ? [`${t.base}|${t.reading}`] : [])),
    );
    expect(bad).toEqual([]);
  });
});
