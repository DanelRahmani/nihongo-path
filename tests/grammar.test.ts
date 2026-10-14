import { describe, expect, it } from "vitest";
import { GRAMMAR, GRAMMAR_TOPICS } from "@/content/grammar";
import type { Example } from "@/content/types";
import { ALL_LESSONS } from "@/content/units";
import { grammarFields } from "@/lib/corpus";
import { plainOf } from "@/lib/markup";
import { lineRegister } from "@/lib/register";

const LESSONS = new Map(ALL_LESSONS.map((l) => [l.key, l.lesson]));

/** Every Japanese line of a lesson with its English: examples, pair sides, dialogue lines and their alt lines. */
function lessonLines(key: string): { jp: string; en: string }[] {
  const lesson = LESSONS.get(key);
  if (!lesson) return [];
  const withAlt = (e: Pick<Example, "jp" | "en" | "alt">) => [{ jp: e.jp, en: e.en }, ...(e.alt ? [{ jp: e.alt, en: e.en }] : [])];
  return lesson.blocks.flatMap((b) =>
    b.type === "examples" ? b.items.flatMap(withAlt) : b.type === "pair" ? [...withAlt(b.a), ...withAlt(b.b)] : b.type === "dialogue" ? b.lines.flatMap(withAlt) : [],
  );
}

describe("grammar overview", () => {
  it("links every topic to a lesson that exists", () => {
    expect(GRAMMAR_TOPICS.filter((t) => !LESSONS.has(t.lesson)).map((t) => `${t.slug}: ${t.lesson}`)).toEqual([]);
  });

  it("copies every example verbatim from its lesson, with the lesson's English", () => {
    const missing = GRAMMAR_TOPICS.flatMap((t) => {
      const lines = lessonLines(t.lesson);
      return t.examples.filter((e) => !lines.some((l) => l.jp === e.jp && l.en === e.en)).map((e) => `${t.slug}: ${e.jp} (${e.en})`);
    });
    expect(missing).toEqual([]);
  });

  it("gives every particle, grammar and verb lesson at least one topic", () => {
    const covered = new Set(GRAMMAR_TOPICS.map((t) => t.lesson));
    const lessons = ALL_LESSONS.filter((l) => l.lesson.kinds?.some((k) => k === "particles" || k === "grammar" || k === "verbs"));
    expect(lessons.length).toBeGreaterThan(30);
    expect(lessons.filter((l) => !covered.has(l.key)).map((l) => l.key)).toEqual([]);
  });

  it("has unique slugs, and every topic has a pattern, a meaning and one to three examples", () => {
    const slugs = [...GRAMMAR.map((g) => g.slug), ...GRAMMAR_TOPICS.map((t) => t.slug)];
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const t of GRAMMAR_TOPICS) {
      expect(t.pattern && t.meaning, t.slug).toBeTruthy();
      expect(t.examples.length, t.slug).toBeGreaterThanOrEqual(1);
      expect(t.examples.length, t.slug).toBeLessThanOrEqual(3);
    }
  });

  it("follows the lessons' path order within each group", () => {
    const order = new Map(ALL_LESSONS.map((l, i) => [l.key, i]));
    for (const g of GRAMMAR) {
      const positions = g.topics.map((t) => order.get(t.lesson)!);
      expect(positions, g.slug).toEqual([...positions].sort((a, b) => a - b));
    }
  });

  it("highlights the construction in every example, except lesson lines copied without one", () => {
    // An alt line and a dialogue line, copied verbatim; their lessons highlight neither.
    const unhighlighted = new Set(["casual-question", "masen-ka"]);
    expect(GRAMMAR_TOPICS.flatMap((t) => t.examples.filter((e) => !/{.+}/.test(e.jp) && !unhighlighted.has(t.slug)).map((e) => `${t.slug}: ${e.jp}`))).toEqual([]);
  });

  it("labels a register only where the classifier agrees", () => {
    const labelled = GRAMMAR_TOPICS.flatMap((t) => t.examples.filter((e) => e.register).map((e) => ({ t, e })));
    expect(labelled.length).toBeGreaterThan(0);
    // As the lessons label alt lines: Polite for a polite line, Casual for anything else.
    for (const { t, e } of labelled) expect(lineRegister(e.jp) === "polite", `${t.slug}: ${e.jp}`).toBe(e.register === "Polite");
  });

  it("writes no word space after a particle in its prose (a space would show)", () => {
    const spaced = /[はがをにでへとやもか] +[぀-ヿ\p{Script=Han}]/u;
    expect(grammarFields().filter((f) => spaced.test(plainOf(f.text, false))).map((f) => `${f.where}: ${f.text}`)).toEqual([]);
  });
});
