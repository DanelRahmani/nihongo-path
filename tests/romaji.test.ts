import { describe, expect, it } from "vitest";
import { bareKanji, parse, plainOf, readingOf } from "@/lib/markup";
import { kanaToRomaji, romajiOf } from "@/lib/romaji";

describe("kanaToRomaji", () => {
  it.each([
    ["すし", "sushi"],
    ["ちず", "chizu"],
    ["つくえ", "tsukue"],
    ["ふじさん", "fujisan"],
    ["きょう", "kyou"],
    ["しゃしん", "shashin"],
    ["がっこう", "gakkou"],
    ["まっちゃ", "matcha"],
    ["きっぷ", "kippu"],
    ["ほんや", "hon'ya"],
    ["れんあい", "ren'ai"],
    ["コーヒー", "koohii"],
    ["パーティー", "paatii"],
    ["ファミリーマート", "famiriimaato"],
    ["こんにちは", "konnichiwa"],
  ])("%s → %s", (kana, romaji) => {
    expect(kanaToRomaji(kana)).toBe(romaji);
  });

  it("reads standalone particles by their sound", () => {
    expect(kanaToRomaji("わたし は がくせい です。")).toBe("watashi wa gakusei desu.");
    expect(kanaToRomaji("がっこう へ いきます")).toBe("gakkou e ikimasu");
    expect(kanaToRomaji("パン を たべます")).toBe("pan o tabemasu");
    expect(kanaToRomaji("ここ では ない")).toBe("koko dewa nai");
  });

  it("keeps は inside words as ha", () => {
    expect(kanaToRomaji("はな")).toBe("hana");
  });

  it("spaces words after mid-sentence punctuation", () => {
    expect(kanaToRomaji("たべる けど、さかな は たべない。")).toBe("taberu kedo, sakana wa tabenai.");
  });

  it("attaches punctuation to the previous word", () => {
    expect(kanaToRomaji("はい 、 そう です ね ！")).toBe("hai, sou desu ne!");
  });
});

describe("markup", () => {
  const src = "[私|わたし] {は} [学生|がくせい] です。";

  it("parses ruby, highlight and word spaces", () => {
    const tokens = parse(src, true);
    expect(tokens[0]).toEqual({ kind: "ruby", base: "私", reading: "わたし", hl: false, bold: false, it: false });
    expect(tokens[2]).toEqual({ kind: "text", text: "は", hl: true, bold: false, it: false });
  });

  it("derives reading, plain text and romaji", () => {
    expect(readingOf(src)).toBe("わたし は がくせい です。");
    expect(plainOf(src)).toBe("私は学生です。");
    expect(romajiOf(src)).toBe("watashi wa gakusei desu.");
  });

  it("hyphenates a name and its suffix where the markup joins them", () => {
    expect(romajiOf("[田中|たなか]-さん、おはよう。")).toBe("tanaka-san, ohayou.");
    expect(romajiOf("お[客|きゃく][様|さま]")).toBe("okyakusama");
  });

  it("marks a kanji to show in every mode with [!…], without changing its reading", () => {
    expect(parse("[!箸|はし]", true)[0]).toEqual({ kind: "ruby", base: "箸", reading: "はし", hl: false, bold: false, it: false, show: true });
    expect(plainOf("[!漢字|かんじ] です")).toBe("漢字です");
    expect(romajiOf("[!漢字|かんじ] です")).toBe("kanji desu");
  });

  it("finds kanji outside ruby markup", () => {
    expect(bareKanji(src, true)).toEqual([]);
    expect(bareKanji("猫 が [好|す]き", true)).toEqual(["猫"]);
  });
});
