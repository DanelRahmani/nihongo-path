import { describe, expect, it } from "vitest";
import joyo from "@/content/data/joyo.json" with { type: "json" };
import { corpusFields } from "@/lib/corpus";
import { isJoyo, joyoReadingOk, joyoReadings } from "@/lib/joyo";
import { parse } from "@/lib/markup";

describe("the 常用漢字表 data", () => {
  it("has the table's 2,136 kanji and its 付表", () => {
    expect(Object.keys(joyo.kanji)).toHaveLength(2136);
    // The table's own totals: 4,388 readings, 2,352 on and 2,036 kun.
    const all = Object.values(joyo.kanji);
    expect(all.reduce((n, e) => n + e.on.length, 0)).toBe(2352);
    expect(all.reduce((n, e) => n + e.kun.length, 0)).toBe(2036);
    expect(joyo.fuhyo).toHaveLength(116);
    expect(joyo.fuhyo.reduce((n, f) => n + f.words.length, 0)).toBe(123);
    expect(isJoyo("𠮟")).toBe(true);
    expect(isJoyo("綺")).toBe(false);
  });

  it("lists on readings, kun readings and kun stems", () => {
    expect(joyoReadings("扱")).toEqual(expect.arrayContaining(["あつか", "あつかう"]));
    expect(joyoReadings("中")).toEqual(expect.arrayContaining(["ちゅう", "じゅう", "なか"]));
  });
});

describe("joyoReadingOk", () => {
  it.each([
    ["一本", "いっぽん"],
    ["三本", "さんぼん"],
    ["六百", "ろっぴゃく"],
    ["学校", "がっこう"],
    ["日本語", "にほんご"],
    ["今日", "きょう"],
    ["今日中", "きょうじゅう"],
    ["大人", "おとな"],
    ["母", "かあ"],
    ["明日", "あした"],
    ["四時", "よじ"],
    ["七時", "しちじ"],
    ["九時", "くじ"],
    ["何名", "なんめい"],
    ["人々", "ひとびと"],
    ["扱", "あつか"],
    ["明日", "みょうにち"],
    ["来", "き"],
    ["試合", "しあい"],
    ["切手", "きって"],
    ["切符", "きっぷ"],
    ["日本中", "にほんじゅう"],
    ["大阪", "おおさか"],
  ])("%s %s passes", (base, reading) => {
    expect(joyoReadingOk(base, reading)).toBe(true);
  });

  it("voices a word joined to the one before it", () => {
    expect(joyoReadingOk("本", "ぼん")).toBe(false);
    expect(joyoReadingOk("本", "ぼん", true)).toBe(true);
  });

  it.each([
    ["寿司", "すし"],
    ["腹", "なか"],
    ["空", "す"],
    ["日本", "ひのもと"],
    ["一日", "いちにちち"],
    // Loopholes the D1 review found: っ before the wrong row, a p sound with no っ/ん, 付表 words mid-word,
    // 来's conjugated stems inside compounds.
    ["一本", "いっぼん"],
    ["日本", "にっほん"],
    ["学生", "がっせい"],
    ["食事", "たっじ"],
    ["十一人", "じゅうひとり"],
    ["来年", "きねん"],
    ["来週", "こしゅう"],
  ])("%s %s fails", (base, reading) => {
    expect(joyoReadingOk(base, reading)).toBe(false);
  });
});

describe("the lessons (content/STYLE.md §5)", () => {
  const FIELDS = corpusFields();
  // A quiz answer is joined when its prompt's blank follows a word: [先生|せんせい]＿ → [方|がた].
  const prompts = new Map(FIELDS.filter((f) => f.where.endsWith(" prompt")).map((f) => [`${f.lesson} ${f.where.replace(/ prompt$/, "")}`, f.text]));
  const blankAfterWord = (f: (typeof FIELDS)[number]) => {
    const prompt = prompts.get(`${f.lesson} ${f.where.replace(/ answer \d+.*$/, "")}`) ?? "";
    return /[^\s　、。]＿/.test(prompt);
  };
  const RUBY = FIELDS.flatMap((f) =>
    parse(f.text, true).flatMap((t, i, all) => {
      if (t.kind !== "ruby") return [];
      const prev = all[i - 1];
      // Joined to the word before it (〜 marks a suffix), or a quiz answer filling a blank right after a word.
      const joined =
        prev?.kind === "ruby" ||
        (prev?.kind === "text" && /[0-9０-９〜\u3400-\u9fff]$/.test(prev.text)) ||
        (i === 0 && f.where.includes(" answer ") && blankAfterWord(f));
      return [{ at: `${f.lesson} ${f.where}`, base: t.base, reading: t.reading, joined }];
    }),
  );

  it("use only 常用 kanji", () => {
    const bad = RUBY.flatMap((r) => [...r.base].filter((c) => /[\u3400-\u9fff\u{20000}-\u{2ffff}]/u.test(c) && !isJoyo(c)).map((c) => `${r.at}: ${c}`));
    expect(bad).toEqual([]);
  });

  it("read every kanji word with 常用 readings, a 付表 reading or a house exception", () => {
    const bad = [...new Set(RUBY.filter((r) => !joyoReadingOk(r.base, r.reading, r.joined)).map((r) => `${r.base}|${r.reading}`))];
    expect(bad).toEqual([]);
  });
});
