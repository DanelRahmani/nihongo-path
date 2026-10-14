import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import KeyboardPage from "@/app/keyboard/page";
import { typedWithoutJapanese } from "@/components/ui/KeyboardHelp";
import { furiganaKanji } from "@/lib/kanji-cards";
import { SITE_PAGES } from "@/lib/search";
import { PRECACHE } from "@/lib/service-worker";

describe("the keyboard page", () => {
  const html = renderToStaticMarkup(createElement(KeyboardPage));

  it("has a section for each system and for typing kana, each linked from the top", () => {
    for (const id of ["ios", "android", "windows", "mac", "romaji"]) {
      expect(html, id).toContain(`id="${id}"`);
      expect(html, id).toContain(`href="#${id}"`);
    }
  });

  it("covers adding, switching, converting, small kana, ー and を", () => {
    for (const text of ["Add the keyboard", "Switch to it", "Type kana and kanji", "kitte", "xtu", "ー", "wo"]) expect(html, text).toContain(text);
  });

  it("shows only kanji that the furigana rules know", () => {
    const known = new Set(furiganaKanji());
    const shown = [...html.replace(/<[^>]+>/g, "")].filter((c) => /\p{Script=Han}/u.test(c));
    // 半角/全角 is a key's label, written as on the key; every other kanji is a lesson word's.
    expect(shown.filter((c) => !known.has(c) && !"半角全".includes(c))).toEqual([]);
  });

  it("is a page search finds, in the Practice menu, and saved for offline use", () => {
    expect(SITE_PAGES.find((p) => p.href === "/keyboard")?.title).toBe("Japanese keyboard");
    expect(readFileSync("components/NavLinks.tsx", "utf8")).toMatch(/href: "\/keyboard"/);
    expect(PRECACHE).toContain("/keyboard");
  });

  it("teaches nn before y, where a single n reads as a syllable (konya is こにゃ)", () => {
    expect(html).toMatch(/konnya →\s*(<[^>]+>)*こんや/);
  });
});

describe("typedWithoutJapanese", () => {
  it("is true for English letters, half or full width, with no kana or kanji", () => {
    expect(typedWithoutJapanese("taberu")).toBe(true);
    expect(typedWithoutJapanese("ｔａｂｅｒｕ")).toBe(true);
    expect(typedWithoutJapanese("Tabemasu.")).toBe(true);
  });
  it("is false once any kana or kanji is there, or for no letters at all", () => {
    for (const s of ["たべる", "食べる", "taべる", "タベル", "3", "、"]) expect(typedWithoutJapanese(s), s).toBe(false);
  });
});
