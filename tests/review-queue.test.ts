import { describe, expect, it } from "vitest";
import type { Deck } from "@/lib/decks";
import { type Notebook, reportAnswer, SPACING } from "@/lib/notebook";
import { applyReview, askFrom, buildQueue, reviewCount } from "@/lib/review-queue";
import { answerCard, type CardState, deckState, EMPTY_SRS, type SrsState } from "@/lib/srs";

type Card = { id: string };
/** A made-up deck whose answer is the card id. */
const deck = (id: string, ids: string[]): Deck<Card> => ({
  id,
  title: id,
  titleJp: id,
  cards: ids.map((c) => ({ id: c })),
  groups: ["g"],
  groupOf: () => "g",
  card: (c) => (ids.includes(c) ? { id: c } : undefined),
  prompt: (c) => ({ text: c.id, lang: "en", ask: c.id }),
  check: (c, a) => ({ correct: a === c.id, canonical: c.id }),
  groupLabel: () => "",
});

const A = deck("a", ["a1", "a2", "a3"]);
const B = deck("b", ["b1", "b2"]);
const at = (due: number): CardState => ({ box: 2, due, reps: 1, lapses: 0 });
const SRS: SrsState = {
  decks: {
    a: { cards: { a1: at(300), a2: at(100), a3: at(9e12) }, extraGroups: 0 },
    b: { cards: { b1: at(200) }, extraGroups: 0 },
  },
};
const NOW = 1_000 + SPACING;

/** A quiz asker that knows one question. */
const quiz = (id: string) =>
  id === "lesson#q1" ? { deckId: "quiz", cardId: id, prompt: { text: "Q", lang: "en" as const, ask: "Q" }, check: () => ({ correct: true, canonical: "A" }) } : null;

describe("the review queue", () => {
  it("puts due cards of every deck first, most overdue first, then the notebook", () => {
    let notebook: Notebook = {};
    notebook = reportAnswer(notebook, "b", "b2", false, 50);
    notebook = reportAnswer(notebook, "quiz", "lesson#q1", false, 40);
    const queue = buildQueue([A, B], { quiz }, SRS, notebook, NOW);
    expect(queue.map((i) => `${i.from}:${i.deckId}:${i.cardId}`)).toEqual(["due:a:a2", "due:b:b1", "due:a:a1", "notebook:quiz:lesson#q1", "notebook:b:b2"]);
  });

  it("asks a notebook item that is also due only once, as due", () => {
    const notebook = reportAnswer({}, "a", "a2", false, 10);
    const queue = buildQueue([A, B], {}, SRS, notebook, NOW);
    expect(queue.filter((i) => i.cardId === "a2").map((i) => i.from)).toEqual(["due"]);
  });

  it("keeps deck order for cards due at the same moment", () => {
    const tie: SrsState = { decks: { a: { cards: { a3: at(500) }, extraGroups: 0 }, b: { cards: { b2: at(500) }, extraGroups: 0 } } };
    expect(buildQueue([A, B], {}, tie, {}, NOW).map((i) => i.cardId)).toEqual(["a3", "b2"]);
    expect(buildQueue([B, A], {}, tie, {}, NOW).map((i) => i.cardId)).toEqual(["b2", "a3"]);
  });

  it("leaves out a notebook item a right answer couldn't clear yet (missed or answered right a moment ago)", () => {
    const fresh = reportAnswer({}, "b", "b2", false, NOW - 60_000);
    expect(buildQueue([A, B], {}, EMPTY_SRS, fresh, NOW)).toEqual([]);
    expect(reviewCount(EMPTY_SRS, fresh, NOW)).toEqual({ due: 0, notebook: 0 });
  });

  it("leaves out notebook items it can't ask, keeping them in the store", () => {
    const notebook = reportAnswer(reportAnswer({}, "gone", "x", false, 1), "a", "removed", false, 2);
    expect(buildQueue([A], {}, EMPTY_SRS, notebook, NOW)).toEqual([]);
    expect(Object.keys(notebook)).toHaveLength(2);
  });

  it("asks each item with its own deck's checker", () => {
    const [first] = buildQueue([A, B], {}, SRS, {}, NOW);
    expect(first.check("a2")).toEqual({ correct: true, canonical: "a2" });
    expect(first.check("b1").correct).toBe(false);
    expect(askFrom(A, "nope")).toBeNull();
  });

  it("schedules an answer in its own deck only", () => {
    const after = answerCard(SRS, "b", "b1", true, NOW);
    expect(deckState(after, "b").cards.b1.box).toBe(3);
    expect(deckState(after, "a")).toBe(SRS.decks.a);
    expect(buildQueue([A, B], {}, after, {}, NOW).map((i) => i.cardId)).toEqual(["a2", "a1"]);
  });

  it("applies a review answer: a due card in its own deck, a notebook item to the notebook only", () => {
    const queue = buildQueue([A, B], { quiz }, SRS, reportAnswer({}, "quiz", "lesson#q1", false, 0), NOW);
    const due = queue.find((i) => i.cardId === "b1")!;
    const missed = applyReview(SRS, {}, due, false, NOW);
    expect(missed.srs.decks.b.cards.b1.box).toBe(1);
    expect(missed.srs.decks.a).toBe(SRS.decks.a);
    expect(Object.keys(missed.notebook)).toEqual(["b|b1"]);
    const note = queue.find((i) => i.from === "notebook")!;
    const right = applyReview(SRS, reportAnswer({}, "quiz", "lesson#q1", false, 0), note, true, NOW);
    expect(right.srs).toBe(SRS);
    expect(right.notebook["quiz|lesson#q1"].rightInRow).toBe(1);
  });
});

describe("the review count", () => {
  it("counts due cards in every deck, and notebook items not already due", () => {
    const notebook = reportAnswer(reportAnswer({}, "a", "a2", false, 1), "quiz", "q", false, 1);
    expect(reviewCount(SRS, notebook, NOW)).toEqual({ due: 3, notebook: 1 });
    expect(reviewCount(EMPTY_SRS, {}, NOW)).toEqual({ due: 0, notebook: 0 });
  });

  it("matches the queue once it knows which ids exist, stale ids included", () => {
    const srs: SrsState = { decks: { ...SRS.decks, a: { cards: { ...SRS.decks.a.cards, gone: at(10) }, extraGroups: 0 } } };
    let notebook = reportAnswer({}, "quiz", "lesson#q1", false, 1);
    notebook = reportAnswer(notebook, "quiz", "lesson#old", false, 1);
    notebook = reportAnswer(notebook, "b", "b2", false, 1);
    const ids: Record<string, Set<string>> = { a: new Set(A.cards.map((c) => c.id)), b: new Set(B.cards.map((c) => c.id)), quiz: new Set(["lesson#q1"]) };
    const queue = buildQueue([A, B], { quiz }, srs, notebook, NOW);
    const count = reviewCount(srs, notebook, NOW, (deck, card) => ids[deck]?.has(card) ?? false);
    expect(count).toEqual({ due: queue.filter((i) => i.from === "due").length, notebook: queue.filter((i) => i.from === "notebook").length });
    expect(count).toEqual({ due: 3, notebook: 2 });
  });
});
