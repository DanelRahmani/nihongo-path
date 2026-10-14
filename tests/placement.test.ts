import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { UNITS } from "@/content/units";
import { type Band, lessonsBefore, PER_BAND, placement } from "@/lib/placement";
import { kanaLessons, PICKS, placementBands, questionLessonTitles } from "@/lib/placement-bands";

const BANDS = placementBands();

describe("the bands", () => {
  it("are the units after the kana, in path order, two lesson-quiz questions each, typed in Japanese", () => {
    expect(BANDS.map((b) => b.unit)).toEqual(UNITS.map((u) => u.slug).filter((s) => s !== "hiragana" && s !== "katakana"));
    expect(BANDS).toHaveLength(7);
    for (const b of BANDS) {
      expect(b.questions, b.unit).toHaveLength(PER_BAND);
      expect(new Set(b.questions.map((q) => q.prompt)).size, b.unit).toBe(PER_BAND);
      for (const q of b.questions) {
        expect(q.answerIn, q.prompt).toBeUndefined();
        expect(b.lessons, q.prompt).toContain(q.lesson);
      }
    }
  });

  it("are the hand-picked questions, pinned", () => {
    expect(Object.keys(PICKS)).toEqual(BANDS.map((b) => b.unit));
    expect(BANDS.flatMap((b) => b.questions.map((q) => `${q.lesson}: ${q.prompt}`))).toMatchInlineSnapshot(`
      [
        "start/polite-and-casual: Make it casual: [本|ほん]を[読|よ]みます。 → [本|ほん]を＿＿",
        "start/polite-and-casual: Make it casual: [学生|がくせい]です。",
        "word-order/topic-comment: Type the two missing particles in order: [私|わたし]＿[目|め]＿[悪|わる]い。 (My eyesight is bad.)",
        "word-order/modifiers-first: Say “the book I read yesterday” with [昨日|きのう], [読|よ]んだ and [本|ほん].",
        "particles/wa-vs-ga: Fill in the particle: [誰|だれ]＿[来|き]ましたか？ (Who came?)",
        "particles/ni-vs-de: “I work at a bank”: [銀行|ぎんこう]＿[働|はたら]いています。",
        "grammar/na-adjectives: Before a noun: “a quiet room” ([静|しず]か, [部屋|へや])",
        "grammar/kosoado: Pointing at a tower far from both of you: “What's that?” ＿は[何|なん]ですか？",
        "verbs/te-form: て form: [読|よ]む → ＿",
        "verbs/nai-form: Casual negative: [会|あ]う → ＿",
        "suffixes/name-suffixes: To your friend's little daughter, Hana: はな＿、いくつ？ (how old are you?)",
        "suffixes/titles: Thanking your doctor, Dr Kato: [加藤|かとう]＿、ありがとうございました。",
        "culture/uchi-soto: Telling a colleague about your own older brother: ＿は[会社員|かいしゃいん]です。",
        "culture/soft-refusals: A colleague asks for help on Saturday. Say no softly: [土曜日|どようび]は＿…",
      ]
    `);
  });

  it("leave the kana lessons to their own offer, and title every question's lesson", () => {
    const all = lessonsBefore(BANDS, null);
    expect(all).toHaveLength(UNITS.reduce((n, u) => n + u.lessons.length, 0) - kanaLessons().length);
    expect(all.some((l) => /^(hiragana|katakana)\//.test(l))).toBe(false);
    expect(kanaLessons().every((l) => /^(hiragana|katakana)\//.test(l))).toBe(true);
    const titles = questionLessonTitles(BANDS);
    for (const b of BANDS) for (const q of b.questions) expect(titles[q.lesson], q.lesson).toBeTruthy();
  });
});

describe("placement", () => {
  /** Answers for the first bands: "RR" right right, "RW" a slip, "WW" two misses. */
  const run = (...bands: string[]) => bands.map((b) => [...b].map((c) => c === "R"));
  const fake: Band[] = Array.from({ length: 4 }, (_, i) => ({
    unit: `u${i}`,
    title: `Unit ${i}`,
    lessons: [`u${i}/a`, `u${i}/b`],
    questions: [0, 1].map((n) => ({ prompt: `${i}-${n}`, answers: ["は"], explanation: "", lesson: `u${i}/a` })),
  }));

  it("starts at the first band with two misses", () => {
    expect(placement(fake, run("RR", "WW"))).toEqual({ start: 1, done: true });
    expect(placement(fake, run("WW"))).toEqual({ start: 0, done: true });
    expect(placement(fake, run("RR", "RW", "RR", "WW"))).toEqual({ start: 3, done: true });
  });

  it("treats a single miss as a slip", () => {
    expect(placement(fake, run("RW", "WR", "RW", "WR"))).toEqual({ start: null, done: true });
  });

  it("stops as soon as a band places, and waits while questions remain", () => {
    expect(placement(fake, run("RR", "W"))).toEqual({ start: null, done: false });
    expect(placement(fake, run("RR", "R"))).toEqual({ start: null, done: false });
    expect(placement(fake, [])).toEqual({ start: null, done: false });
  });

  it("offers every earlier band's lessons to mark finished", () => {
    expect(lessonsBefore(fake, 2)).toEqual(["u0/a", "u0/b", "u1/a", "u1/b"]);
    expect(lessonsBefore(fake, 0)).toEqual([]);
    expect(lessonsBefore(fake, null)).toHaveLength(8);
  });

  it("never places in a band with fewer questions than misses needed, and passes it once answered", () => {
    const short: Band[] = [{ ...fake[0], questions: fake[0].questions.slice(0, 1) }, fake[1]];
    expect(placement(short, run("W", "RR"))).toEqual({ start: null, done: true });
  });
});

describe("client code", () => {
  it("keeps the lessons out of the check's client modules", () => {
    for (const file of ["lib/placement.ts", "components/placement/PlacementCheck.tsx"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/^import (?!type )[^;]*?from "@\/(content\/(?!kana")|lib\/placement-bands|lib\/joyo|lib\/corpus)/m);
    }
  });
});
