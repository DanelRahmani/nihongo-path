import { describe, expect, it } from "vitest";
import { acceptedForms, checkAnswer, normalizeAnswer } from "@/lib/quiz";

describe("normalizeAnswer", () => {
  it("folds width, drops spaces and trailing punctuation", () => {
    expect(normalizeAnswer(" がくせい です。 ")).toBe("がくせいです");
    expect(normalizeAnswer("ｶﾞｸｾｲ")).toBe("ガクセイ");
    expect(normalizeAnswer("いく？")).toBe("いく");
  });
});

describe("acceptedForms", () => {
  it("accepts each kanji word in kanji or in kana", () => {
    expect(acceptedForms("[学生|がくせい] だ").sort()).toEqual(["がくせいだ", "学生だ"].sort());
    expect(acceptedForms("[毎日|まいにち] [走|はし]る")).toHaveLength(4);
  });
});

describe("checkAnswer", () => {
  it("accepts the kanji form, the kana form and a mix by word", () => {
    for (const typed of ["学生だ", "がくせいだ", "学生だ。", "学生 だ"]) expect(checkAnswer(["[学生|がくせい] だ"], typed).correct).toBe(true);
    expect(checkAnswer(["[毎日|まいにち] [走|はし]る"], "毎日はしる").correct).toBe(true);
  });

  it("accepts any of the listed answers, and nothing else", () => {
    expect(checkAnswer(["[学生|がくせい] だ", "[学生|がくせい]"], "がくせい").correct).toBe(true);
    expect(checkAnswer(["[学生|がくせい] だ"], "がくせいです")).toEqual({ correct: false, answer: "学生だ" });
  });

  it("explains romaji typed instead of Japanese", () => {
    expect(checkAnswer(["[行|い]きます"], "ikimasu").note).toMatch(/Japanese keyboard/);
  });

  it("explains a katakana word typed in hiragana", () => {
    expect(checkAnswer(["コーヒー"], "こーひー").note).toBe("Same sound, but it's written in katakana.");
  });

  it("explains a particle spelled by its sound", () => {
    expect(checkAnswer(["は"], "わ").note).toBe("Same sound, different spelling: it's written は.");
    expect(checkAnswer(["を"], "お").note).toBe("Same sound, different spelling: it's written を.");
  });
});
