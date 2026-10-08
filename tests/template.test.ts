import { describe, expect, it } from "vitest";
import { RETROFIT_PENDING } from "@/content/retrofit-pending";
import type { Lesson } from "@/content/types";
import { ALL_LESSONS } from "@/content/units";
import { sentenceCount, templateProblems } from "@/lib/template";

describe("every lesson follows the template (content/STYLE.md §10)", () => {
  const pending = new Set(RETROFIT_PENDING);

  it.each(ALL_LESSONS.filter((l) => !pending.has(l.key)).map((l) => [l.key, l.lesson] as const))("%s", (_, lesson) => {
    expect(templateProblems(lesson)).toEqual([]);
  });

  it("lists only real lessons as pending", () => {
    const keys = new Set(ALL_LESSONS.map((l) => l.key));
    expect(RETROFIT_PENDING.filter((k) => !keys.has(k))).toEqual([]);
  });

  it("lists no lesson as pending once it follows the template (the list only shrinks)", () => {
    const done = ALL_LESSONS.filter((l) => pending.has(l.key) && templateProblems(l.lesson).length === 0).map((l) => l.key);
    expect(done).toEqual([]);
  });
});

const GOOD: Lesson = {
  slug: "t",
  title: "T",
  mark: "は",
  summary: "s",
  source: "Genki I",
  register: "polite",
  kinds: ["particles"],
  blocks: [
    { type: "idea", text: "One idea, in one sentence." },
    {
      type: "examples",
      items: [
        { jp: "{は} です。", en: "a" },
        { jp: "{は} です。", en: "b" },
        { jp: "{は} です。", en: "c" },
      ],
    },
    { type: "pair", a: { jp: "a", en: "a" }, b: { jp: "b", en: "b" }, diff: "d" },
    { type: "callout", kind: "mistake", text: "✗ wrong ✓ right" },
    { type: "callout", kind: "culture", text: "c" },
    {
      type: "quiz",
      questions: [
        { prompt: "1", answers: ["は"], explanation: "e" },
        { prompt: "2", answers: ["は"], explanation: "e" },
        { prompt: "3", answers: ["は"], explanation: "e" },
      ],
    },
    { type: "link", href: "/", label: "next" },
  ],
};

describe("templateProblems", () => {
  it("accepts a complete lesson", () => {
    expect(templateProblems(GOOD)).toEqual([]);
  });

  it("names each missing part", () => {
    const bare: Lesson = { ...GOOD, register: undefined, kinds: [], blocks: [{ type: "idea", text: "x" }] };
    expect(templateProblems(bare)).toEqual([
      "no register (polite, plain, both or neutral)",
      "no kinds tags",
      "no examples",
      "no pair",
      "no common-mistake callout",
      "no dialogue or culture note",
      "no quiz",
    ]);
  });

  it("accepts a part left out with a reason, and rejects one without", () => {
    const noPair = { ...GOOD, blocks: GOOD.blocks.filter((b) => b.type !== "pair") };
    expect(templateProblems({ ...noPair, exempt: { pair: "Kana lessons contrast sounds, not sentences." } })).toEqual([]);
    expect(templateProblems({ ...noPair, exempt: { pair: " " } })).toEqual(["exempt from pair without a reason"]);
    expect(templateProblems({ ...GOOD, exempt: { pair: "reason" } })).toEqual(["exempt from pair, but has one: remove the exemption"]);
  });

  it("wants a one-sentence idea, highlighted core examples, ✗/✓ and a quiz at the end", () => {
    const blocks = structuredClone(GOOD.blocks);
    blocks[0] = { type: "idea", text: "Two sentences. Too many." };
    (blocks[1] as { items: { jp: string }[] }).items[2].jp = "は です。";
    blocks[3] = { type: "callout", kind: "mistake", text: "no marks" };
    blocks.push({ type: "text", text: "after the quiz" });
    expect(templateProblems({ ...GOOD, blocks })).toEqual([
      "the idea is more than one sentence",
      "core example 3 has no highlight",
      "a common-mistake callout without ✗ and ✓",
      "the quiz isn't the last block (only links may follow it)",
    ]);
  });

  it("counts English sentences, ignoring an ellipsis and Japanese inside", () => {
    expect(sentenceCount("は sets the topic: “as for X…”.")).toBe(1);
    expect(sentenceCount("One. Two!")).toBe(2);
  });
});
