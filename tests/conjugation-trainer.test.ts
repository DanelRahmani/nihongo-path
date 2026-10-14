import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ALL_LESSONS } from "@/content/units";
import { WORDS } from "@/content/words";
import {
  checkConjugation,
  conjugate,
  formLabel,
  formLesson,
  formsOf,
  identifyForm,
  openQuestions,
  pickQuestion,
  type Question,
  type TrainerWord,
} from "@/lib/conjugation-trainer";
import { trainerWords } from "@/lib/conjugation-words";

const WORDS_ASKED = trainerWords();
const ALL_DONE = new Set(ALL_LESSONS.map((l) => l.key));
const word = (jp: string) => WORDS_ASKED.find((w) => w.jp === jp)!;
const q = (jp: string, form: string): Question => ({ word: word(jp), form });

describe("the words", () => {
  it("are the lesson verbs and adjectives, each with the lessons that use it, in path order", () => {
    const keys = ALL_LESSONS.map((l) => l.key);
    expect(WORDS_ASKED.length).toBeGreaterThan(80);
    for (const w of WORDS_ASKED) {
      for (const l of w.lessons) expect(keys, w.jp).toContain(l);
      const order = w.lessons.map((l) => keys.indexOf(l));
      expect(order, w.jp).toEqual([...order].sort((a, b) => a - b));
      const entry = WORDS.find((e) => e.jp === w.jp)!;
      expect(w.kind === "verb" ? entry.pos === "verb" : entry.pos === "i-adj" || entry.pos === "na-adj", w.jp).toBe(true);
    }
    for (const jp of ["ござる", "おく", "[結構|けっこう]"]) expect(WORDS_ASKED.find((w) => w.jp === jp), jp).toBeUndefined();
  });

  it("don't count the kana lessons or a word inside another", () => {
    for (const w of WORDS_ASKED) for (const l of w.lessons) expect(l, w.jp).not.toMatch(/^(hiragana|katakana)\//);
    // お願い (ka-question) doesn't teach 願う.
    expect(word("[願|ねが]う")?.lessons ?? []).not.toContain("particles/ka-question");
  });

  it("link every form to a lesson the app has", () => {
    const lessonKeys = new Set(ALL_LESSONS.map((l) => l.key));
    for (const w of WORDS_ASKED) for (const f of formsOf(w)) expect(lessonKeys.has(formLesson(w, f)), `${w.jp} ${f}`).toBe(true);
  });
});

describe("the questions", () => {
  it("never ask a form a word lacks, nor the dictionary form that is the prompt", () => {
    const open = openQuestions(WORDS_ASKED, ALL_DONE);
    expect(open.length).toBeGreaterThan(800);
    for (const question of open) {
      expect(conjugate(question.word, question.form).ok, `${question.word.jp} ${question.form}`).toBe(true);
      if (question.form === "plain") expect(question.word.kind === "adjective" && question.word.cls === "na", question.word.jp).toBe(true);
    }
    // 分かる has no potential (it already means "can understand").
    expect(open.some((x) => x.word.jp === "[分|わ]かる" && x.form === "potential")).toBe(false);
  });

  it("open with the lessons: a form with its lesson, a word with any lesson that uses it", () => {
    // A learner who skipped ahead: only the ます lesson done.
    const done = new Set(["verbs/masu-form"]);
    const open = openQuestions(WORDS_ASKED, done);
    expect(open.length).toBeGreaterThan(10);
    expect(new Set(open.map((x) => formLesson(x.word, x.form)))).toEqual(new Set(["verbs/masu-form"]));
    expect(open.every((x) => x.word.lessons.some((l) => done.has(l)))).toBe(true);
    expect(openQuestions(WORDS_ASKED, new Set())).toEqual([]);
  });

  it("leave out forms that make no sense for the word", () => {
    const open = openQuestions(WORDS_ASKED, ALL_DONE).map((x) => `${x.word.jp} ${x.form}`);
    for (const bad of ["[降|ふ]る tai", "[開|あ]く potential", "[晴|は]れる volitional", "[知|し]る polite", "[知|し]る potential"]) expect(open).not.toContain(bad);
    expect(open).toContain("[知|し]る plainNeg");
    // A な-adjective's casual form (静か だ) is asked; a verb's dictionary form isn't.
    expect(open).toContain("[静|しず]か plain");
    expect(open).not.toContain("[食|た]べる plain");
  });

  it("bring missed questions back", () => {
    const open = openQuestions(WORDS_ASKED, ALL_DONE);
    const missed = [open[100]];
    expect(pickQuestion(open, 0.1, open[0], missed)).toBe(open[100]);
    expect(pickQuestion(open, 0.9, open[0], missed)).not.toBe(open[0]);
    // Not the same one twice in a row.
    expect(pickQuestion(open, 0.1, open[100], missed)).not.toBe(open[100]);
  });

  it("don't repeat the last question when there's another", () => {
    const open = openQuestions(WORDS_ASKED, ALL_DONE).slice(0, 2);
    for (const r of [0, 0.5, 0.99]) expect(pickQuestion(open, r, open[0])).toBe(open[1]);
    expect(pickQuestion(open.slice(0, 1), 0.5, open[0])).toBe(open[0]);
    expect(pickQuestion([], 0.5)).toBeNull();
  });
});

describe("checkConjugation", () => {
  it("accepts the form in kanji or kana, and its standard variants", () => {
    expect(checkConjugation(q("[食|た]べる", "politePast"), "食べました")).toEqual({ correct: true, canonical: "食べました" });
    expect(checkConjugation(q("[食|た]べる", "politePast"), "たべました").correct).toBe(true);
    expect(checkConjugation(q("[食|た]べる", "politeNeg"), "食べないです").correct).toBe(true);
    expect(checkConjugation(q("[行|い]く", "te"), "行って").correct).toBe(true);
  });

  it("names another form of the word", () => {
    expect(checkConjugation(q("[食|た]べる", "politePast"), "食べた").note).toBe(`That's the ${formLabel(word("[食|た]べる"), "plainPast")}.`);
    expect(checkConjugation(q("[食|た]べる", "politePast"), "食べられる").note).toMatch(/potential .* or the passive/);
  });

  it("counts a ら-less potential, naming it as casual", () => {
    const r = checkConjugation(q("[見|み]る", "potential"), "見れる");
    expect(r.correct).toBe(true);
    expect(r.note).toMatch(/casual/);
  });

  it("never throws on a wrong answer, words with refused forms included", () => {
    for (const question of openQuestions(WORDS_ASKED, ALL_DONE)) {
      expect(() => checkConjugation(question, "ぬ"), `${question.word.jp} ${question.form}`).not.toThrow();
    }
    expect(checkConjugation(q("ある", "plainNeg"), "あらない").correct).toBe(false);
  });

  it("accepts the kanji a keyboard offers for できる and いい", () => {
    expect(checkConjugation(q("できる", "polite"), "出来ます").correct).toBe(true);
    expect(checkConjugation(q("いい", "plainPast"), "良かった").correct).toBe(true);
  });

  it("names a casual form made polite", () => {
    expect(checkConjugation(q("[食|た]べる", "tai"), "食べたいです").note).toBe("That's polite. The form asked is casual: 食べたい.");
  });

  it("names romaji, and works for adjectives", () => {
    expect(checkConjugation(q("[食|た]べる", "polite"), "tabemasu").note).toMatch(/Japanese/);
    const takai = WORDS_ASKED.find((w): w is Extract<TrainerWord, { kind: "adjective" }> => w.kind === "adjective" && w.cls === "i" && w.jp === "[高|たか]い")!;
    expect(checkConjugation({ word: takai, form: "plainNeg" }, "高くない").correct).toBe(true);
    expect(checkConjugation({ word: takai, form: "plainNeg" }, "高かった").note).toMatch(/casual past/);
  });
});

describe("identifyForm", () => {
  it("names every form an answer matches", () => {
    expect(identifyForm(word("[食|た]べる"), "食べられる").sort()).toEqual(["passive", formLabel(word("[食|た]べる"), "potential")].sort());
    expect(identifyForm(word("[食|た]べる"), "食べ")).toEqual(["ます stem"]);
    expect(identifyForm(word("[食|た]べる"), "飲みます")).toEqual([]);
  });

  it("names an adjective's plain form once, and every name is a real label", () => {
    const takai = word("[高|たか]い");
    expect(identifyForm(takai, "高い")).toEqual(["dictionary form"]);
    expect(identifyForm(word("[静|しず]か"), "静かだ")).toEqual(["casual (だ)"]);
    for (const w of WORDS_ASKED.slice(0, 40)) {
      for (const f of formsOf(w)) {
        const c = conjugate(w, f);
        // An engine key ("plain", "attributive") is not a name; "passive" and "causative" are both.
        if (c.ok) for (const name of identifyForm(w, c.jp)) expect(["plain", "attributive", "adverb", "stem", "ba", "te", "tara"], `${w.jp} ${f}`).not.toContain(name);
      }
    }
  });

  it("names a ら-less potential", () => {
    expect(identifyForm(word("[見|み]る"), "見れる")).toContain("casual potential (can) (ら-less)");
  });
});

describe("client code", () => {
  it("keeps the lessons and the dictionary out of the trainer's client modules", () => {
    for (const file of ["lib/conjugation-trainer.ts", "components/conjugation/ConjugationTrainer.tsx"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/^import (?!type )[^;]*?from "@\/(content\/(?!kana")|lib\/conjugation-words|lib\/joyo|lib\/corpus)/m);
    }
  });
});
