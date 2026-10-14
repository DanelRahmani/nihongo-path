import { describe, expect, it } from "vitest";
import { charset, missing, parseRange, trimFontCss, unnamedFonts } from "@/scripts/fonts/trim";

const rule = (range: string | null, file: string) =>
  `@font-face{font-family:Mincho;font-style:normal;font-weight:500;font-display:swap;src:url(../media/${file}) format("woff2")${range ? `;unicode-range:${range}` : ""}}`;

describe("the font trim (H1)", () => {
  it("reads every character once, astral ones as one code point", () => {
    expect([...charset(["日本", "本 𠮷"])].sort((a, b) => a - b)).toEqual([0x20, 0x65e5, 0x672c, 0x20bb7]);
  });

  it("reads escaped characters too, as a minifier or encoder might write them", () => {
    const set = charset(['"\\u3042"', "'\\u{20BB7}'", "&#x3044;", "&#12358;"]);
    for (const p of [0x3042, 0x20bb7, 0x3044, 12358]) expect(set.has(p)).toBe(true);
  });

  it("parses single points, ranges and wildcards", () => {
    expect(parseRange("U+3042, U+3000-303F,U+30??")).toEqual([
      [0x3042, 0x3042],
      [0x3000, 0x303f],
      [0x3000, 0x30ff],
    ]);
    expect(() => parseRange("U+ZZ")).toThrow();
  });

  it("drops the slices the text doesn't use and keeps the others as written", () => {
    const css = [rule("U+3041-3096", "kana.woff2"), rule("U+4E00-4E10,U+672C", "kanji.woff2"), rule("U+AC00-D7A3", "hangul.woff2"), rule(null, "fallback.woff2")].join("");
    const { css: out, kept, removed } = trimFontCss(css, charset(["あいう本"]));
    expect(removed).toBe(1);
    expect([...kept].sort()).toEqual(["../media/fallback.woff2", "../media/kana.woff2", "../media/kanji.woff2"]);
    expect(out).toBe([rule("U+3041-3096", "kana.woff2"), rule("U+4E00-4E10,U+672C", "kanji.woff2"), rule(null, "fallback.woff2")].join(""));
  });

  it("checks wide ranges against the used set", () => {
    expect(trimFontCss(rule("U+0-10FFFF", "all.woff2"), charset(["a"])).removed).toBe(0);
    expect(trimFontCss(rule("U+20000-2FFFF", "ext.woff2"), charset(["a日"])).removed).toBe(1);
  });

  it("deletes only font files nothing names", () => {
    const fonts = ["out/_next/static/media/a.woff2", "out/_next/static/media/b.woff2", "out/_next/static/media/c.woff2"];
    expect(unnamedFonts(fonts, new Set(["a.woff2", "c.woff2"]))).toEqual(["out/_next/static/media/b.woff2"]);
  });

  it("names the required characters the scan missed", () => {
    expect(missing(charset(["日本"]), ["日本語", "あ"])).toEqual(["語", "あ"]);
  });
});
