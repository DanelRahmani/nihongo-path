import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { REGISTER_ALSO } from "@/content/register-also";
import { ALL_LESSONS } from "@/content/units";
import { lineRegister } from "@/lib/register";
import { registerCards } from "@/lib/register-cards";
import { checkRegister, diffFirstWord, registerDeck } from "@/lib/register-drill";
import { deckState, EMPTY_SRS, unlockedCards } from "@/lib/srs";

const CARDS = registerCards();
const LESSONS = ALL_LESSONS.map((l) => l.key);
const find = (to: string) => CARDS.polite.find((c) => c.to === to)!;

describe("the cards", () => {
  it("pair every alt line both ways, polite into casual and back", () => {
    let alts = 0;
    for (const { lesson } of ALL_LESSONS) {
      for (const b of lesson.blocks) alts += (b.type === "examples" ? b.items : b.type === "dialogue" ? b.lines : []).filter((i) => i.alt).length;
    }
    expect(CARDS.casual.length).toBe(alts);
    expect(CARDS.polite.length).toBe(alts);
    for (const d of ["casual", "polite"] as const) expect(new Set(CARDS[d].map((c) => c.id)).size, d).toBe(CARDS[d].length);
    for (const c of CARDS.casual) {
      expect(lineRegister(c.from), c.from).toBe("polite");
      expect(lineRegister(c.to), c.to).not.toBe("polite");
      expect(CARDS.polite.some((p) => p.from === c.to && p.to === c.from), c.id).toBe(true);
    }
    for (const c of [...CARDS.casual, ...CARDS.polite]) {
      expect(c.from + c.to, c.id).not.toMatch(/[{}]/);
      expect(LESSONS, c.id).toContain(c.lesson);
    }
  });

  it("carry the engine's variants, swapping whole word runs", () => {
    expect(find("あれ は [郵便局|ゆうびんきょく] じゃ ありません でした。").also.sort()).toEqual(
      ["あれ は [郵便局|ゆうびんきょく] じゃ なかった です。", "あれ は [郵便局|ゆうびんきょく] で は ありません でした。", "あれ は [郵便局|ゆうびんきょく] で は なかった です。"].sort(),
    );
    expect(find("お[金|かね] が ありません。").also).toContain("お[金|かね] が ない です。");
  });

  it("leave an invitation's ません か alone, and いい's stiff よい out of casual answers", () => {
    expect(find("[一緒|いっしょ] に [行|い]きません か？").also).toEqual([]);
    expect(CARDS.casual.find((c) => c.to === "[今日|きょう] は [天気|てんき] が いい。")!.also).toEqual([]);
  });

  it("add the reviewed alternatives, each naming a card", () => {
    const ids = new Set([...CARDS.casual, ...CARDS.polite].map((c) => c.id));
    for (const id of Object.keys(REGISTER_ALSO)) expect(ids.has(id), id).toBe(true);
  });
});

describe("diffFirstWord", () => {
  const line = "[昨日|きのう] [映画|えいが] を [見|み]ました。";

  it("finds nothing when every word matches, in kanji or kana, ignoring spaces and punctuation", () => {
    expect(diffFirstWord(line, "昨日映画を見ました")).toBeNull();
    expect(diffFirstWord(line, "きのう えいが を みました。")).toBeNull();
  });

  it("names the first word that differs, by the lesson's word spaces", () => {
    expect(diffFirstWord(line, "昨日映画を見た")).toEqual({ word: "見ました", index: 3, typed: "見た" });
    expect(diffFirstWord(line, "昨日映画が見ました")).toEqual({ word: "を", index: 2, typed: "が見ました" });
    expect(diffFirstWord(line, "")).toEqual({ word: "昨日", index: 0, typed: "" });
    expect(diffFirstWord(line, "昨日映画を見ましたよ")).toEqual({ extra: "よ" });
  });

  it("handles 、 inside a line, a name joined with -, and kanji and kana mixed in one word", () => {
    expect(diffFirstWord("[今|いま]、 [忙|いそが]しい？", "いま忙しい")).toBeNull();
    expect(diffFirstWord("[田中|たなか]-さん は [先生|せんせい] です。", "たなかさんは先生です")).toBeNull();
    expect(diffFirstWord("[食|た]べ[物|もの] です", "食べものです")).toBeNull();
  });
});

describe("checkRegister", () => {
  const card = find("あれ は [郵便局|ゆうびんきょく] じゃ ありません でした。");

  it("accepts the lesson's line and the engine's variants, ignoring punctuation and spaces", () => {
    expect(checkRegister(card, "あれは郵便局じゃありませんでした", "polite").correct).toBe(true);
    expect(checkRegister(card, "あれは郵便局じゃなかったです。", "polite").correct).toBe(true);
    expect(checkRegister(card, "あれは郵便局ではなかったです", "polite").correct).toBe(true);
    // A reviewed alternative: casual keeps を.
    expect(checkRegister(CARDS.casual.find((c) => c.id === "start/polite-and-casual#1inls1d")!, "何を飲む？", "casual").correct).toBe(true);
  });

  it("says where the answer parts from the line: a word that differs, a word missing, something extra", () => {
    expect(checkRegister(card, "あれは郵便局じゃありませんでしたよ", "polite").note).toBe("Every word is there, with よ extra at the end.");
    expect(checkRegister(card, "あれは郵便局じゃないでした", "polite").note).toBe("Expected ありません; yours has ないでした.");
    expect(checkRegister(card, "あれは郵便局ありませんでした", "polite").note).toBe("じゃ is missing.");
  });

  it("names the line given, unchanged", () => {
    expect(checkRegister(card, "あれは郵便局じゃなかった", "polite").note).toBe("That's the line as given: say it politely.");
  });

  it("follows the accepted line the answer gets furthest along", () => {
    // では is an accepted variant, so the difference is at the end, not at じゃ.
    expect(checkRegister(card, "あれは郵便局ではありませんでしたね", "polite").note).toMatch(/ね extra/);
  });
});

describe("joining on lesson completion", () => {
  it("opens a lesson's lines in both directions when it is done", () => {
    const lesson = CARDS.casual[0].lesson;
    for (const d of ["casual", "polite"] as const) {
      const deck = registerDeck(d, CARDS[d], LESSONS, new Set([lesson]));
      const open = unlockedCards(deck, deckState(EMPTY_SRS, deck.id));
      expect(open.length).toBeGreaterThan(0);
      expect(open.every((c) => c.lesson === lesson)).toBe(true);
    }
    expect(registerDeck("casual", CARDS.casual, LESSONS, new Set()).id).not.toBe(registerDeck("polite", CARDS.polite, LESSONS, new Set()).id);
  });
});

describe("client code", () => {
  it("keeps the lessons out of the drill's client modules; the builder never reads the reading texts or the corpus", () => {
    for (const file of ["lib/register-drill.ts", "components/register/RegisterDrill.tsx"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/^import (?!type )[^;]*?from "@\/(content\/(?!kana")|lib\/register-cards|lib\/joyo|lib\/corpus)/m);
    }
    expect(readFileSync("lib/register-cards.ts", "utf8")).not.toMatch(/content\/reading|lib\/corpus/);
  });
});
