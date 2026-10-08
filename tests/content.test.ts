import { describe, expect, it } from "vitest";
import { ALL_LESSONS, UNITS } from "@/content/units";
import { corpusFields } from "@/lib/corpus";
import { bareKanji, parse, plainOf, readingOf } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";

const ALL_FIELDS = corpusFields().map((f) => ({ ...f, where: `${f.lesson} ${f.where}` }));
const JP_FIELDS = ALL_FIELDS.filter((f) => f.jp);
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
    const bad = JP_FIELDS.filter((f) => !f.label)
      .map((f) => ({ f, r: romajiOf(f.text) }))
      .filter(({ r }) => /[぀-ヿ]/.test(r))
      .map(({ f, r }) => `${f.where}: ${r}`);
    expect(bad).toEqual([]);
  });
});

describe("style (content/STYLE.md)", () => {
  const offenders = (fields: typeof ALL_FIELDS, test: (plain: string) => boolean) =>
    fields.map((f) => ({ f, plain: plainOf(f.text, f.jp) })).filter(({ plain }) => test(plain)).map(({ f, plain }) => `${f.where}: ${plain}`);
  /** Example, pair and dialogue lines: full sentences with an English translation. */
  const SENTENCES = JP_FIELDS.filter((f) => f.en !== undefined);

  it("writes ruby readings in hiragana", () => {
    const bad = ALL_FIELDS.flatMap((f) =>
      parse(f.text, f.jp).flatMap((t) => (t.kind === "ruby" && !/^[ぁ-ゖ]+$/.test(t.reading) ? [`${f.where}: ${t.base}|${t.reading}`] : [])),
    );
    expect(bad).toEqual([]);
  });

  it("uses Japanese punctuation in Japanese sentences", () => {
    expect(offenders(SENTENCES, (p) => /[,.?!:;()"~]/.test(p))).toEqual([]);
  });

  it("writes the wave dash as 〜 (U+301C), never ～ (U+FF5E)", () => {
    expect(offenders(ALL_FIELDS, (p) => p.includes("～"))).toEqual([]);
  });

  it("writes the katakana long vowel as ー, never a dash or 一", () => {
    expect(offenders(ALL_FIELDS, (p) => /[ァ-ヺ][‐‑‒–—―−－一]|[‐‑‒–—―−－一][ァ-ヺ]/.test(p))).toEqual([]);
  });

  it("has no half-width katakana, full-width digits or letters, or ideographic spaces", () => {
    expect(offenders(ALL_FIELDS, (p) => /[ｦ-ﾟ０-９Ａ-Ｚａ-ｚ　]/.test(p))).toEqual([]);
  });

  it("writes Japanese inside English prose without word spaces (they would show)", () => {
    // Two Japanese words of two or more characters with a space between; lists of single kana are fine.
    const J = "[\\u3040-\\u30ff\\u3400-\\u9fff々〜]";
    const spaced = new RegExp(`${J}{2,} +${J}{2,}`, "u");
    expect(offenders(ALL_FIELDS.filter((f) => !f.jp), (p) => spaced.test(p))).toEqual([]);
  });

  it("writes stacked particles as separate words (では only as the conjunction)", () => {
    const bad = JP_FIELDS.flatMap((f) =>
      readingOf(f.text)
        .split(" ")
        .flatMap((w, i, words) => {
          const word = w.replace(/[。、？！…」』）]+$/, "");
          const conjunction = word === "では" && i === 0 && w.endsWith("、");
          return /^(には|では|とは|からは|までは|へは|への|にも|へも|からも|までに)$/.test(word) && !conjunction ? [`${f.where}: ${words.join(" ")}`] : [];
        }),
    );
    expect(bad).toEqual([]);
  });

  it("joins a name to its suffix or title with '-' (so the romaji reads tanaka-san)", () => {
    const SUFFIX = /^(さん|くん|ちゃん|さま)/;
    const TITLES = new Set(["先生", "先輩", "部長", "社長", "様"]);
    /** Words before a title that aren't names: [何名|なんめい][様|さま] (how many guests). */
    const NOT_NAMES = new Set(["何名"]);
    const bad = JP_FIELDS.flatMap((f) => {
      const tokens = parse(f.text, true);
      return tokens.flatMap((t, i) => {
        const prev = tokens[i - 1];
        const next = tokens[i + 1];
        // お[母|かあ]さん, お[客|きゃく][様|さま]: a prefixed word, not a name.
        const prefixed = prev?.kind === "text" && /[おご]$/.test(prev.text);
        const kanjiName =
          t.kind === "ruby" && !prefixed && !NOT_NAMES.has(t.base) &&
          ((next?.kind === "text" && SUFFIX.test(next.text)) || (next?.kind === "ruby" && TITLES.has(next.base)));
        const kanaName = t.kind === "text" && /[ァ-ヺ]ー?(さん|くん|ちゃん|さま)/.test(t.text);
        return kanjiName || kanaName ? [`${f.where}: ${f.text}`] : [];
      });
    });
    expect(bad).toEqual([]);
  });
});
