import { describe, expect, it } from "vitest";
import type { Block } from "@/content/types";
import { ALL_LESSONS } from "@/content/units";
import { plainOf } from "@/lib/markup";
import { lineRegister, sentenceRegister } from "@/lib/register";

describe("sentenceRegister", () => {
  it.each([
    "がくせい です。",
    "いきます か？",
    "べんきょう しません でした。",
    "よろしく おねがい します。",
    "まって ください。",
    "さむい です ね。",
    "おはよう ございます。",
  ])("polite: %s", (s) => expect(sentenceRegister(s)).toBe("polite"));

  it.each(["がくせい だ。", "えいが を みた。", "なに も たべなかった。", "あした くる よね？", "たべない。", "べんきょう する。"])(
    "plain: %s",
    (s) => expect(sentenceRegister(s)).toBe("plain"),
  );

  it.each(["しずか な まち", "はじめまして。", "こんにちは。", "ねこ", "いく？"])("neutral (no clear marker): %s", (s) =>
    expect(sentenceRegister(s)).toBe("neutral"),
  );
});

describe("lineRegister", () => {
  it("reports a line that ends one sentence polite and another plain", () => {
    expect(lineRegister("[学生|がくせい] です。 [明日|あした] [来|く]る。")).toBe("mixed");
  });

  it("ignores plain clauses inside a polite sentence and quoted speech", () => {
    expect(lineRegister("[雨|あめ] が [降|ふ]ったら、 [行|い]きません。")).toBe("polite");
    expect(lineRegister("「[行|い]く」 と [言|い]いました。")).toBe("polite");
  });
});

/** Every Japanese line with its optional other-register version, from every lesson. */
const LINES = ALL_LESSONS.flatMap(({ key, lesson }) =>
  lesson.blocks.flatMap((b: Block) => {
    const items: { jp: string; alt?: string }[] =
      b.type === "examples" ? b.items : b.type === "pair" ? [b.a, b.b] : b.type === "dialogue" ? b.lines : [];
    return items.map((it) => ({ key, register: lesson.register, jp: it.jp, alt: it.alt }));
  }),
);

describe("registers in the lessons (content/STYLE.md §9)", () => {
  it("never mixes polite and plain within one line", () => {
    const bad = LINES.filter((l) => lineRegister(l.jp) === "mixed").map((l) => `${l.key}: ${plainOf(l.jp)}`);
    expect(bad).toEqual([]);
  });

  it("gives every other-register line the other register", () => {
    const bad = LINES.filter((l) => l.alt !== undefined)
      .filter((l) => (lineRegister(l.jp) === "polite") === (lineRegister(l.alt!) === "polite"))
      .map((l) => `${l.key}: ${plainOf(l.jp)} / ${plainOf(l.alt!)}`);
    expect(bad).toEqual([]);
  });

  it("keeps polite lessons polite and plain lessons plain", () => {
    const bad = LINES.filter(
      (l) => (l.register === "polite" && lineRegister(l.jp) === "plain") || (l.register === "plain" && lineRegister(l.jp) === "polite"),
    ).map((l) => `${l.key} (${l.register}): ${plainOf(l.jp)}`);
    expect(bad).toEqual([]);
  });

  it("keeps neutral lessons to single words: no word spaces, no sentence punctuation, no alt", () => {
    const bad = LINES.filter((l) => l.register === "neutral" && (/[ 。？！]/u.test(l.jp) || l.alt !== undefined)).map(
      (l) => `${l.key}: ${plainOf(l.jp)}`,
    );
    expect(bad).toEqual([]);
  });
});
