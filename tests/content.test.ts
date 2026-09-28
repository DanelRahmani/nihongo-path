import { describe, expect, it } from "vitest";
import type { Block, Lesson } from "@/content/types";
import { ALL_LESSONS, UNITS } from "@/content/units";
import { bareKanji, parse } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";

type Field = { where: string; text: string; jp: boolean };

/** Every piece of text in a lesson, tagged with whether it's a Jp (word-spaced) string. */
function fields(lesson: Lesson, where: string): Field[] {
  const out: Field[] = [
    { where: `${where} mark`, text: lesson.mark, jp: true },
    { where: `${where} summary`, text: lesson.summary, jp: false },
  ];
  const add = (text: string | undefined, jp: boolean, what: string) => {
    if (text !== undefined) out.push({ where: `${where} ${what}`, text, jp });
  };
  lesson.blocks.forEach((b: Block, i) => {
    const at = `block ${i} (${b.type})`;
    switch (b.type) {
      case "idea":
      case "heading":
      case "text":
      case "callout":
        add(b.text, false, at);
        break;
      case "examples":
        b.items.forEach((ex, j) => {
          add(ex.jp, true, `${at} #${j} jp`);
          add(ex.en, false, `${at} #${j} en`);
          add(ex.note, false, `${at} #${j} note`);
        });
        break;
      case "pair":
        add(b.title, false, `${at} title`);
        [b.a, b.b].forEach((ex, j) => {
          add(ex.jp, true, `${at} ${j ? "B" : "A"} jp`);
          add(ex.en, false, `${at} ${j ? "B" : "A"} en`);
          add(ex.note, false, `${at} ${j ? "B" : "A"} note`);
        });
        add(b.diff, false, `${at} diff`);
        break;
      case "table":
        add(b.caption, false, `${at} caption`);
        b.headers.forEach((h) => add(h, false, `${at} header`));
        b.rows.forEach((r) => r.forEach((c) => add(c, false, `${at} cell`)));
        break;
      case "dialogue":
        b.lines.forEach((l, j) => {
          add(l.jp, true, `${at} line ${j} jp`);
          add(l.en, false, `${at} line ${j} en`);
        });
        add(b.note, false, `${at} note`);
        break;
      case "link":
        add(b.text, false, `${at} text`);
        break;
    }
  });
  return out;
}

const ALL_FIELDS = ALL_LESSONS.flatMap((l) => fields(l.lesson, l.key));
const KANA_ONLY = /^[぀-ヿー]+$/;

describe("curriculum structure", () => {
  it("has unique unit slugs and unique lesson slugs per unit", () => {
    expect(new Set(UNITS.map((u) => u.slug)).size).toBe(UNITS.length);
    for (const u of UNITS) {
      expect(u.lessons.length, u.slug).toBeGreaterThan(0);
      expect(new Set(u.lessons.map((l) => l.slug)).size, u.slug).toBe(u.lessons.length);
    }
  });

  it("gives every lesson a plain-English title, a summary, a source and blocks", () => {
    for (const { key, lesson } of ALL_LESSONS) {
      expect(lesson.title, key).not.toMatch(/[[\]{}*]/);
      expect(bareKanji(lesson.title, false), `${key} title has kanji`).toEqual([]);
      expect(lesson.summary.length, key).toBeGreaterThan(0);
      expect(lesson.source.length, key).toBeGreaterThan(0);
      expect(lesson.blocks.length, key).toBeGreaterThan(2);
    }
  });

  it("only links to pages that exist", () => {
    const routes = new Set(["/", "/kana", "/kana/drill", ...ALL_LESSONS.map((l) => l.href)]);
    for (const { key, lesson } of ALL_LESSONS) {
      for (const b of lesson.blocks) {
        if (b.type === "link") expect(routes.has(b.href), `${key} → ${b.href}`).toBe(true);
      }
    }
  });

  it("keeps table rows the same width as their headers", () => {
    for (const { key, lesson } of ALL_LESSONS) {
      for (const b of lesson.blocks) {
        if (b.type === "table") b.rows.forEach((r) => expect(r.length, key).toBe(b.headers.length));
      }
    }
  });
});

describe("japanese markup", () => {
  it("parses everywhere", () => {
    for (const f of ALL_FIELDS) expect(() => parse(f.text, f.jp), f.where).not.toThrow();
  });

  it("never shows a bare kanji (Kana-only mode must be fully readable)", () => {
    const bad = ALL_FIELDS.filter((f) => bareKanji(f.text, f.jp).length > 0).map((f) => `${f.where}: ${f.text}`);
    expect(bad).toEqual([]);
  });

  it("gives every kanji a kana-only reading", () => {
    const bad = ALL_FIELDS.flatMap((f) =>
      parse(f.text, f.jp).flatMap((t) => (t.kind === "ruby" && !KANA_ONLY.test(t.reading) ? [`${f.where}: ${t.base}|${t.reading}`] : [])),
    );
    expect(bad).toEqual([]);
  });

  it("balances highlight, bold and italic markers", () => {
    for (const f of ALL_FIELDS) {
      expect((f.text.match(/{/g) ?? []).length, f.where).toBe((f.text.match(/}/g) ?? []).length);
      expect((f.text.match(/\*\*/g) ?? []).length % 2, `${f.where} bold`).toBe(0);
      expect((f.text.replace(/\*\*/g, "").match(/\*/g) ?? []).length % 2, `${f.where} italic`).toBe(0);
    }
  });

  it("turns every Japanese line into romaji with no kana left over", () => {
    const bad = ALL_FIELDS.filter((f) => f.jp)
      .map((f) => ({ f, r: romajiOf(f.text) }))
      .filter(({ r }) => /[぀-ヿ]/.test(r))
      .map(({ f, r }) => `${f.where}: ${r}`);
    expect(bad).toEqual([]);
  });
});
