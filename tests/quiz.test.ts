import { describe, expect, it } from "vitest";
import { acceptedForms, checkAnswer, checkName, checkQuestion, checkRomaji, normalizeAnswer } from "@/lib/quiz";

describe("normalizeAnswer", () => {
  it("folds width, drops spaces and trailing punctuation", () => {
    expect(normalizeAnswer(" がくせい です。 ")).toBe("がくせいです");
    expect(normalizeAnswer("ｶﾞｸｾｲ")).toBe("ガクセイ");
    expect(normalizeAnswer("いく？")).toBe("いく");
  });

  it("folds kanji spellings of words the lessons write in kana (a keyboard's first choice)", () => {
    expect(normalizeAnswer("美味しい")).toBe("おいしい");
    expect(checkAnswer(["[安|やす]くて おいしい"], "安くて美味しい").correct).toBe(true);
    expect(checkAnswer(["あ、 くも が いる！"], "あ、蜘蛛がいる！").correct).toBe(true);
    expect(checkAnswer(["いってきます"], "行ってきます").correct).toBe(true);
    expect(checkAnswer(["おかえりなさい"], "お帰りなさい").correct).toBe(true);
    expect(checkAnswer(["ごちそうさま でした"], "ご馳走様でした").correct).toBe(true);
    // いく in わけにはいかない, only right after わけ に は / わけ に.
    expect(checkAnswer(["[休|やす]む わけ に は いきません"], "休むわけには行きません").correct).toBe(true);
    expect(checkAnswer(["[休|やす]む わけ に いかない"], "休むわけに行かない").correct).toBe(true);
    expect(checkAnswer(["[休|やす]む いかない"], "休む行かない").correct).toBe(false);
    // ごと / おき as suffixes (a number or noun before, or the blank right after the noun), never elsewhere.
    expect(checkAnswer(["[一時間|いちじかん]ごと に"], "一時間毎に").correct).toBe(true);
    expect(checkAnswer(["[一日|いちにち]おき に"], "一日置きに").correct).toBe(true);
    expect(checkAnswer(["ごと に"], "毎に").correct).toBe(true);
    expect(checkAnswer(["[行|い]く ごと に"], "行く毎に").correct).toBe(false);
    expect(checkAnswer(["なくして [初|はじ]めて"], "無くして初めて").correct).toBe(true);
  });

  it("ignores punctuation inside the answer too", () => {
    expect(normalizeAnswer("はい、たべました。")).toBe("はいたべました");
    expect(normalizeAnswer("は・が")).toBe("はが");
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
    expect(checkAnswer(["は が"], "わが").note).toMatch(/Same sound/);
    expect(checkAnswer(["[私|わたし] は [学生|がくせい] です"], "わたしわがくせいです").note).toMatch(/Same sound/);
  });
});

describe("checkRomaji (kana lessons: type the reading)", () => {
  it("accepts the app's romaji and the usual other spellings", () => {
    for (const typed of ["kitte", "Kitte", " kitte "]) expect(checkRomaji(["きって"], typed).correct).toBe(true);
    for (const typed of ["shashin", "syasin"]) expect(checkRomaji(["しゃしん"], typed).correct).toBe(true);
    for (const typed of ["gakkou", "gakkoo", "gakkō"]) expect(checkRomaji(["がっこう"], typed).correct).toBe(true);
    for (const typed of ["hon'ya", "honya"]) expect(checkRomaji(["ほんや"], typed).correct).toBe(true);
    for (const typed of ["sanpo", "sampo"]) expect(checkRomaji(["さんぽ"], typed).correct).toBe(true);
    expect(checkRomaji(["カタカナ"], "katakana").correct).toBe(true);
  });

  it("shows the app's romaji as the answer", () => {
    expect(checkRomaji(["コーヒー"], "kohi")).toMatchObject({ correct: false, answer: "koohii" });
  });

  it("names a missing small っ, and one that isn't there", () => {
    expect(checkRomaji(["きって"], "kite").note).toMatch(/Check for a small っ/);
    expect(checkRomaji(["まっちゃ"], "macha").note).toMatch(/Check for a small っ/);
    expect(checkRomaji(["きて"], "kitte").note).toMatch(/no small っ/);
    expect(checkRomaji(["ねこ"], "nekko").note).toMatch(/no small っ/);
  });

  it("names a long vowel said short, a short one said long, and ー spelled ei", () => {
    expect(checkRomaji(["おばあさん"], "obasan").note).toMatch(/long vowel/);
    expect(checkRomaji(["がっこう"], "gakko").note).toMatch(/long vowel/);
    expect(checkRomaji(["せんせい"], "sense").note).toMatch(/long vowel/);
    expect(checkRomaji(["じしょ"], "jishoo").note).toMatch(/short here/);
    expect(checkRomaji(["メール"], "meiru").note).toMatch(/ー repeats/);
  });

  it("accepts ん typed as nn, as on a Japanese keyboard", () => {
    for (const [kana, typed] of [["みかん", "mikann"], ["えんぴつ", "ennpitsu"], ["みかづき", "mikadzuki"]]) {
      expect(checkRomaji([kana], typed).correct).toBe(true);
    }
  });

  it("asks for romaji when kana is typed, and gives no note for other misses", () => {
    expect(checkRomaji(["ねこ"], "ねこ").note).toMatch(/romaji/);
    expect(checkRomaji(["つき"], "suki")).toEqual({ correct: false, answer: "tsuki" });
    expect(checkRomaji(["こんにちは"], "konichiwa").note).toBeUndefined();
  });
});

describe("checkName (a script's name, before the learner has a Japanese keyboard)", () => {
  it("accepts the name in English letters or in Japanese", () => {
    for (const typed of ["katakana", "Katakana", "カタカナ", "かたかな"]) expect(checkName(["カタカナ"], typed).correct).toBe(true);
    for (const typed of ["kanji", "漢字", "かんじ"]) expect(checkName(["[!漢字|かんじ]"], typed).correct).toBe(true);
  });

  it("gives no reading notes for a wrong name", () => {
    expect(checkName(["カタカナ"], "terebi")).toEqual({ correct: false, answer: "katakana" });
  });
});

describe("checkQuestion", () => {
  it("checks a romaji question as romaji and any other as Japanese", () => {
    expect(checkQuestion({ prompt: "", answers: ["ねこ"], answerIn: "romaji", explanation: "" }, "neko").correct).toBe(true);
    expect(checkQuestion({ prompt: "", answers: ["ねこ"], explanation: "" }, "neko").correct).toBe(false);
    expect(checkQuestion({ prompt: "", answers: ["ねこ"], explanation: "" }, "ねこ").correct).toBe(true);
  });
});
