import { describe, expect, it } from "vitest";
import { compareLine, compareTyped, describeSlip, piecesOf } from "@/lib/type-it";
import { typeLines } from "@/lib/type-lines";

const LINE = "[昨日|きのう]、 [映画|えいが] を [見|み]ました。";

describe("the target", () => {
  it("is the line without word spaces, in kanji or in kana", () => {
    expect(compareTyped(LINE, "kanji", "").target).toBe("昨日、映画を見ました。");
    expect(compareTyped(LINE, "kana", "").target).toBe("きのう、えいがをみました。");
    expect(piecesOf("[田中|たなか]-さん", "kanji").map((p) => p.text).join("")).toBe("田中さん");
  });
});

describe("compareTyped", () => {
  it("accepts the line typed exactly", () => {
    expect(compareTyped(LINE, "kanji", "昨日、映画を見ました。")).toMatchObject({ exact: true, slips: [], differsAt: null });
    expect(compareTyped(LINE, "kana", "きのう、えいがをみました。").exact).toBe(true);
  });

  it("names spaces typed in, half or full width", () => {
    const r = compareTyped(LINE, "kanji", "昨日、 映画を　見ました。");
    expect(r.exact).toBe(false);
    expect(r.slips).toEqual([{ kind: "space", width: "half" }, { kind: "space", width: "full" }]);
    expect(r.differsAt).toBeNull();
  });

  it("names , and . for 、 and 。, and half-width ?", () => {
    expect(compareTyped(LINE, "kanji", "昨日,映画を見ました.").slips).toEqual([
      { kind: "punctuation", typed: ",", expected: "、" },
      { kind: "punctuation", typed: ".", expected: "。" },
    ]);
    expect(compareTyped("[元気|げんき] です か？", "kanji", "元気ですか?").slips).toEqual([{ kind: "punctuation", typed: "?", expected: "？" }]);
  });

  it("names ... for … and a hyphen for ー, stepping over the whole look-alike", () => {
    const r = compareTyped("コーヒー です…", "kana", "コ-ヒーです...");
    expect(r.slips).toEqual([
      { kind: "punctuation", typed: "-", expected: "ー" },
      { kind: "punctuation", typed: "...", expected: "…" },
    ]);
    expect(r.differsAt).toBeNull();
    expect(describeSlip(r.slips[0])).toContain("long-vowel mark");
  });

  it("names the reading left in kana, and another kanji with the same reading", () => {
    expect(compareTyped(LINE, "kanji", "昨日、えいがを見ました。").slips).toEqual([{ kind: "kana-for-kanji", typed: "えいが", expected: "映画" }]);
    expect(compareTyped("[紙|かみ] を [買|か]う。", "kanji", "髪を買う。").slips).toEqual([{ kind: "other-kanji", typed: "髪", expected: "紙", reading: "かみ" }]);
    expect(compareTyped(LINE, "kanji", "昨日、映画を観ました。").slips).toEqual([{ kind: "other-kanji", typed: "観", expected: "見", reading: "み" }]);
  });

  it("names katakana typed for hiragana", () => {
    expect(compareTyped("ねこ が いる。", "kana", "ネこがいる。").slips).toEqual([{ kind: "other-script", typed: "ネ", expected: "ね" }]);
  });

  it("stops where the typing differs, keeping the slips before it", () => {
    const r = compareTyped(LINE, "kanji", "昨日,映画が見ました。");
    expect(r.exact).toBe(false);
    expect(r.slips).toHaveLength(1);
    expect(r.differsAt).toBe(5);
    expect(compareTyped(LINE, "kanji", "昨日、映画を見ました。よ").differsAt).toBe(11);
    expect(compareTyped(LINE, "kanji", "昨日").differsAt).toBe(2);
  });

  it("describes each slip", () => {
    expect(describeSlip({ kind: "space", width: "half" })).toMatch(/half-width/);
    expect(describeSlip({ kind: "other-kanji", typed: "観", expected: "見", reading: "み" })).toBe("観 where the line has 見 (read み): if the keyboard offers it, choose 見.");
  });

  it("never claims another kanji shares the reading, takes a kanji run of any length, and only when the typing lines up after it", () => {
    // 今日 isn't read きのう: the note names the line's kanji and its reading, not the typed one's.
    const today = compareTyped(LINE, "kanji", "今日、映画を見ました。").slips[0];
    expect(today).toEqual({ kind: "other-kanji", typed: "今日", expected: "昨日", reading: "きのう" });
    expect(describeSlip(today)).not.toMatch(/read きのう:.*今日 is/);
    expect(compareTyped("[今日|きょう] は [雨|あめ]。", "kanji", "京は雨。").slips).toEqual([{ kind: "other-kanji", typed: "京", expected: "今日", reading: "きょう" }]);
    // A kanji run after which nothing lines up is a stop, not a slip.
    expect(compareTyped(LINE, "kanji", "昨日、映画館で見ました。")).toMatchObject({ differsAt: 5, typedFrom: "館で見ました。" });
  });

  it("names digits, the keyboard's kanji for kana words, the particle's sound and half-width katakana", () => {
    expect(compareTyped("[三本|さんぼん] ください。", "kanji", "3本ください。").slips).toEqual([{ kind: "digits", typed: "3本", expected: "三本" }]);
    expect(compareTyped("[三本|さんぼん] ください。", "kanji", "三本下さい。").slips).toEqual([{ kind: "kana-word", typed: "下さい", expected: "ください" }]);
    expect(compareTyped("[私|わたし] は [学生|がくせい] です。", "kana", "わたしわがくせいです。").slips).toEqual([{ kind: "particle", typed: "わ", expected: "は" }]);
    // は inside a word isn't a particle.
    expect(compareTyped("はな が [好|す]き。", "kana", "わながすき。").differsAt).toBe(0);
    expect(compareTyped("コーヒー が いい。", "kana", "ｺｰﾋｰがいい。").slips).toEqual([{ kind: "other-script", typed: "ｺｰﾋｰ", expected: "コーヒー" }]);
    expect(compareTyped("ガム が いい。", "kana", "ｶﾞﾑがいい。").slips).toEqual([{ kind: "other-script", typed: "ｶﾞﾑ", expected: "ガム" }]);
  });

  it("merges side-by-side slips, and names hiragana typed for katakana", () => {
    expect(compareTyped("[日本|にほん][語|ご] を [話|はな]す。", "kanji", "にほんごを話す。").slips).toEqual([{ kind: "kana-for-kanji", typed: "にほんご", expected: "日本語" }]);
    const bread = compareTyped("パン を [食|た]べる。", "kana", "ぱんをたべる。").slips;
    expect(bread).toEqual([{ kind: "other-script", typed: "ぱん", expected: "パン" }]);
    expect(describeSlip(bread[0])).toBe("ぱん for パン: hiragana instead of katakana.");
  });

  it("names more punctuation look-alikes and a trailing space", () => {
    expect(compareTyped(LINE, "kanji", "昨日，映画を見ました．").slips.map((s) => s.kind)).toEqual(["punctuation", "punctuation"]);
    expect(compareTyped("そう…", "kana", "そう。。。").slips).toEqual([{ kind: "punctuation", typed: "。。。", expected: "…" }]);
    expect(compareTyped(LINE, "kanji", "昨日、映画を見ました。 ")).toMatchObject({ exact: false, differsAt: null, slips: [{ kind: "space", width: "half" }] });
  });

  it("says when kana mode's typing is the line in kanji", () => {
    expect(compareLine(LINE, "kana", "昨日、映画を見ました。").typedInKanji).toBe(true);
    expect(compareLine(LINE, "kana", "きのう、えいがをみた。").typedInKanji).toBeUndefined();
  });
});

describe("the lesson lines", () => {
  const lines = typeLines();

  it("come from the sentence lessons only, each once", () => {
    expect(lines.length).toBeGreaterThan(300);
    expect(lines.some((l) => /^(hiragana|katakana)\//.test(l.lesson))).toBe(false);
    expect(new Set(lines.map((l) => l.jp)).size).toBe(lines.length);
  });

  it("can each be typed exactly in both scripts, and the kana typed in kanji mode gives only kana-for-kanji slips", () => {
    for (const { jp } of lines) {
      for (const script of ["kana", "kanji"] as const) expect(compareTyped(jp, script, compareTyped(jp, script, "").target).exact, `${script}: ${jp}`).toBe(true);
      const kana = compareTyped(jp, "kana", "").target;
      const r = compareTyped(jp, "kanji", kana);
      expect(r.differsAt, jp).toBeNull();
      expect(r.slips.every((s) => s.kind === "kana-for-kanji"), jp).toBe(true);
    }
  });
});
