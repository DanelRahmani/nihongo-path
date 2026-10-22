import { describe, expect, it } from "vitest";
import { ALL_LESSONS } from "@/content/units";
import { KANJI } from "@/content/kanji";
import { NAMES, WORDS } from "@/content/words";
import { NON_LESSON_WORDS } from "@/content/words/expansion";
import type { Word } from "@/content/types";
import { type DictionaryData, lessonsOf, lookupWord } from "@/lib/lookup";
import { plainOf } from "@/lib/markup";
import { entryId, kanjiLessons, sentenceLines, wordLessonLinks } from "@/lib/word-lessons";
import { lineWords } from "@/lib/words";

const PATH = ALL_LESSONS.map((l) => l.key);
const inOrder = (keys: string[]) => keys.every((k, i) => i === 0 || PATH.indexOf(keys[i - 1]) < PATH.indexOf(k));
const KANA = new Set(ALL_LESSONS.filter((l) => l.lesson.register === "neutral").map((l) => l.key));
const word = (jp: string, pos: Word["pos"]) => WORDS.find((w) => w.jp === jp && w.pos === pos)!;

describe("kanjiLessons", () => {
  it("lists lessons in path order, without repeats or kana lessons", () => {
    for (const { char } of KANJI) {
      const lessons = kanjiLessons(char);
      expect(new Set(lessons).size, char).toBe(lessons.length);
      expect(inOrder(lessons), char).toBe(true);
      expect(lessons.filter((k) => KANA.has(k)), char).toEqual([]);
    }
  });

  it("counts every word with the kanji: verbs, counters, affixed words and names", () => {
    expect(kanjiLessons("食")).toContain("verbs/masu-form");
    expect(kanjiLessons("円")).toContain("grammar/kosoado");
    expect(kanjiLessons("中")).toContain("suffixes/chuu-juu");
    expect(kanjiLessons("客")).toContain("suffixes/name-suffixes");
    expect(kanjiLessons("田")).toContain("suffixes/name-suffixes");
  });

  it("finds exactly the lessons whose lines show the kanji", () => {
    for (const { char } of KANJI) {
      const expected = new Set(sentenceLines().flatMap(({ key, line }) => (plainOf(line, false).includes(char) ? [key] : [])));
      expect(new Set(kanjiLessons(char)), char).toEqual(expected);
    }
  });
});

describe("the word card's lesson links", () => {
  const links = wordLessonLinks();
  const data: DictionaryData = { words: WORDS, extra: NON_LESSON_WORDS, names: NAMES, kanji: [], lessons: links };
  const hrefs = (w: Word) => lessonsOf(w, data).map((l) => l.href);

  it("points every entry at valid lessons, each listed once, in path order", () => {
    expect(new Set(links.list.map(([k]) => k)).size).toBe(links.list.length);
    expect(inOrder(links.list.map(([k]) => k))).toBe(true);
    for (const ids of Object.values(links.words)) {
      for (const i of ids) expect(links.list[i]).toBeDefined();
      expect(inOrder(ids.map((i) => links.list[i][0]))).toBe(true);
    }
    const title = new Map(ALL_LESSONS.map((l) => [l.key, l.lesson.title]));
    for (const [key, t] of links.list) expect(t).toBe(title.get(key));
  });

  it("tells 本 the counter from 本 the book, and credits words found with an affix", () => {
    expect(hrefs(word("[本|ほん]", "counter"))).toContain("/learn/grammar/numbers-counting");
    expect(hrefs(word("[本|ほん]", "noun"))).not.toEqual(hrefs(word("[本|ほん]", "counter")));
    expect(hrefs(word("[客|きゃく]", "noun"))).toContain("/learn/suffixes/name-suffixes");
  });

  it("lists the lesson a word is tapped in, for every lesson word in every lesson sentence", () => {
    const missing: string[] = [];
    for (const { key, line } of sentenceLines()) {
      for (const token of lineWords(line)) {
        const found = lookupWord(token, data);
        if (found?.kind !== "word" || !WORDS.includes(found.word)) continue;
        if (!hrefs(found.word).includes(`/learn/${key}`)) missing.push(`${key}: ${token} → ${entryId(found.word)}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("gives nothing for words outside the lessons, or without the data", () => {
    expect(NON_LESSON_WORDS.flatMap((w) => lessonsOf(w, data))).toEqual([]);
    expect(lessonsOf(word("[食|た]べる", "verb"), { ...data, lessons: undefined })).toEqual([]);
  });

  it("is small: under 36 KB of JSON", () => {
    expect(Buffer.byteLength(JSON.stringify(links))).toBeLessThan(36_000);
  });
});
