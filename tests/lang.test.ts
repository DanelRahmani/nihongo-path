import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Cell, Rich } from "@/components/Jp";
import { langRuns } from "@/lib/markup";

describe("langRuns", () => {
  it("splits English prose into Japanese and other runs", () => {
    expect(langRuns("Say です here.")).toEqual([
      { text: "Say ", ja: false },
      { text: "です", ja: true },
      { text: " here.", ja: false },
    ]);
  });

  it("keeps Japanese punctuation, ー and 〜 inside the Japanese run", () => {
    expect(langRuns("「コーヒー」〜ます。")).toEqual([{ text: "「コーヒー」〜ます。", ja: true }]);
  });

  it("returns nothing for empty text", () => {
    expect(langRuns("")).toEqual([]);
  });
});

const WORD = (base: string, reading: string) =>
  `<span class="w" data-k="${base}"><ruby>${base}<rp>(</rp><rt>${reading}</rt><rp>)</rp></ruby><span class="yomi">${reading}</span></span>`;

describe("lang attributes in rendered prose", () => {
  it("marks each Japanese run and each kanji word inside English prose", () => {
    const html = renderToStaticMarkup(createElement(Rich, { text: "Use です or [学生|がくせい] here." }));
    expect(html).toBe(`<span>Use <span lang="ja">です</span> or <span lang="ja">${WORD("学生", "がくせい")}</span> here.</span>`);
  });

  it("keeps a kanji word and its okurigana in one Japanese run", () => {
    const html = renderToStaticMarkup(createElement(Rich, { text: "say [食|た]べます" }));
    expect(html).toBe(`<span>say <span lang="ja">${WORD("食", "た")}べます</span></span>`);
  });

  it("gives a kanji marked to show the class that keeps its ruby in kana-only mode", () => {
    const html = renderToStaticMarkup(createElement(Cell, { text: "[!漢字|かんじ]" }));
    expect(html).toContain(`<span class="w show" data-k="漢字">`);
  });

  it("marks a Japanese-only table cell as a whole", () => {
    const html = renderToStaticMarkup(createElement(Cell, { text: "[食|た]べます" }));
    expect(html).toContain(`<span lang="ja">${WORD("食", "た")}べます</span>`);
  });

  it("marks only the Japanese in a mixed table cell", () => {
    const html = renderToStaticMarkup(createElement(Cell, { text: "polite: [食|た]べます" }));
    expect(html).toContain(`polite: <span lang="ja">${WORD("食", "た")}べます</span>`);
  });
});
