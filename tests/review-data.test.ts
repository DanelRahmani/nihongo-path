import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ALL_LESSONS } from "@/content/units";
import { clozeDeck } from "@/lib/cloze-deck";
import { openQuestions, questionId } from "@/lib/conjugation-trainer";
import { trainerWords } from "@/lib/conjugation-words";
import { KANA_DECKS } from "@/lib/decks";
import { plainOf } from "@/lib/markup";
import { kanjiDeck } from "@/lib/kanji-deck";
import { CONJUGATION_DECK, QUIZ_DECK, quizCardId } from "@/lib/notebook";
import { registerDeck } from "@/lib/register-drill";
import { conjugationAsker, quizAsker } from "@/lib/review-askers";
import { quizEntries, reviewData, reviewIds } from "@/lib/review-data";
import { askFrom } from "@/lib/review-queue";
import { vocabDeck } from "@/lib/vocab-deck";

const DATA = reviewData();
const LESSONS = DATA.lessons;
const WORDS = trainerWords();

describe("the review data", () => {
  it("names every quiz question as the lesson quiz does, uniquely", () => {
    const ids = quizEntries().map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of DATA.quiz) expect(q.id).toBe(quizCardId(q.lesson, q.prompt));
    expect(Object.keys(LESSONS)).toEqual(ALL_LESSONS.map((l) => l.key));
  });

  it("lets every card of every deck be asked", () => {
    const path = Object.keys(LESSONS);
    const decks = [kanjiDeck(DATA.kanji), vocabDeck(DATA.vocab, path, new Set()), clozeDeck(DATA.cloze, path, new Set()), registerDeck("casual", DATA.register.casual, path, new Set()), registerDeck("polite", DATA.register.polite, path, new Set())];
    for (const deck of decks) for (const card of deck.cards) expect(askFrom(deck as never, card.id), `${deck.id} ${card.id}`).not.toBeNull();
  });

  it("indexes exactly the ids the review page can ask", () => {
    const ids = reviewIds();
    expect(ids[QUIZ_DECK]).toEqual(DATA.quiz.map((q) => q.id));
    expect(ids["kanji-lesson"]).toEqual(DATA.kanji.map((c) => c.id));
    for (const d of KANA_DECKS) expect(ids[d.id]).toHaveLength(d.cards.length);
    const ask = conjugationAsker(WORDS, LESSONS);
    for (const id of ids[CONJUGATION_DECK]) expect(ask(id), id).not.toBeNull();
  });
});

describe("the quiz asker", () => {
  const ask = quizAsker(DATA.quiz, LESSONS);

  it("asks a question with its own checker, explanation and lesson", () => {
    const q = DATA.quiz.find((x) => !x.answerIn)!;
    const item = ask(q.id)!;
    expect(item.check(plainOf(q.answers[0], false)).correct).toBe(true);
    expect(item.check("ぬぬぬ").correct).toBe(false);
    expect(item.explain).toBe(q.explanation);
    expect(item.source).toEqual(LESSONS[q.lesson]);
    expect(item.prompt.ask).not.toMatch(/[[\]|*]/);
  });

  it("says when the answer is romaji or a name", () => {
    expect(ask(DATA.quiz.find((x) => x.answerIn === "romaji")!.id)!.prompt.answerIn).toBe("romaji");
    expect(ask(DATA.quiz.find((x) => x.answerIn === "name")!.id)!.prompt.answerIn).toBe("name");
    expect(ask("start/three-scripts#nope")).toBeNull();
  });
});

describe("the conjugation asker", () => {
  const ask = conjugationAsker(WORDS, LESSONS);

  it("asks every open question back from its id", () => {
    const all = new Set(ALL_LESSONS.map((l) => l.key));
    for (const q of openQuestions(WORDS, all)) {
      const item = ask(questionId(q))!;
      expect(item, questionId(q)).not.toBeNull();
      expect(item.cardId).toBe(questionId(q));
    }
  });

  it("asks nothing for an unknown word or form, a form it never asks, or a malformed id", () => {
    expect(ask("[食|た]べる#nope")).toBeNull();
    expect(ask("ぬぬ#polite")).toBeNull();
    expect(ask("[降|ふ]る#tai")).toBeNull();
    expect(ask("no-hash")).toBeNull();
  });
});

describe("client code", () => {
  it("keeps the lessons out of the review page's client modules", () => {
    for (const file of ["lib/review-queue.ts", "lib/review-askers.ts", "components/review/ReviewQueue.tsx"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/^import (?!type )[^;]*?from "@\/(content\/(?!kana")|lib\/review-data|lib\/joyo|lib\/corpus)/m);
    }
  });
});
