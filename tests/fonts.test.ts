import { describe, expect, it } from "vitest";
import { charset, formatRange, parseRange, trimFontCss } from "@/scripts/fonts/trim";

const rule = (range: string | null, file: string) =>
  `@font-face{font-family:Mincho;font-style:normal;font-weight:500;font-display:swap;src:url(../media/${file}) format("woff2")${range ? `;unicode-range:${range}` : ""}}`;

describe("the font trim (H1)", () => {
  it("reads every character once, astral ones as one code point", () => {
    expect([...charset(["日本", "本 𠮷"])].sort((a, b) => a - b)).toEqual([0x20, 0x672c, 0x65e5, 0x20bb7].sort((a, b) => a - b));
  });

  it("parses single points, ranges and wildcards, and writes runs back", () => {
    expect(parseRange("U+3042, U+3000-303F,U+30??")).toEqual([
      [0x3042, 0x3042],
      [0x3000, 0x303f],
      [0x3000, 0x30ff],
    ]);
    expect(formatRange([0x3041, 0x3042, 0x3043, 0x30fc, 0x672c])).toBe("U+3041-3043,U+30FC,U+672C");
    expect(() => parseRange("U+ZZ")).toThrow();
  });

  it("keeps slices the text uses, narrowed to its characters, and drops the rest", () => {
    const css = [rule("U+3041-3096", "kana.woff2"), rule("U+4E00-4E10,U+672C", "kanji.woff2"), rule("U+AC00-D7A3", "hangul.woff2"), rule(null, "fallback.woff2")].join("");
    const { css: out, kept, removed } = trimFontCss(css, charset(["あいう本"]));
    expect(removed).toBe(1);
    expect([...kept].sort()).toEqual(["../media/fallback.woff2", "../media/kana.woff2", "../media/kanji.woff2"]);
    expect(out).toContain("unicode-range:U+3042,U+3044,U+3046}");
    expect(out).toContain("unicode-range:U+672C}");
    expect(out).not.toContain("hangul");
    // A rule without a range (a local() fallback) is kept as written.
    expect(out).toContain(rule(null, "fallback.woff2"));
  });

  it("walks wide ranges through the used set", () => {
    const { css } = trimFontCss(rule("U+0-10FFFF", "all.woff2"), charset(["a日"]));
    expect(css).toContain("unicode-range:U+61,U+65E5}");
  });
});
