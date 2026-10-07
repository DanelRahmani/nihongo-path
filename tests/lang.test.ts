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

// Rendered with the default settings (kana only), as the server renders them.
describe("lang attributes in rendered prose", () => {
  it("marks each Japanese run and each kanji word inside English prose", () => {
    const html = renderToStaticMarkup(createElement(Rich, { text: "Use です or [学生|がくせい] here." }));
    expect(html).toBe('<span>Use <span lang="ja">です</span> or <span lang="ja">がくせい</span> here.</span>');
  });

  it("marks a Japanese-only table cell as a whole", () => {
    const html = renderToStaticMarkup(createElement(Cell, { text: "[食|た]べます" }));
    expect(html).toContain('<span lang="ja">たべます</span>');
  });

  it("marks only the Japanese in a mixed table cell", () => {
    const html = renderToStaticMarkup(createElement(Cell, { text: "polite: [食|た]べます" }));
    expect(html).toContain('polite: <span lang="ja">たべます</span>');
  });
});
