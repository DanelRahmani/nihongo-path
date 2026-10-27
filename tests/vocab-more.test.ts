import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ALL_LESSONS } from "@/content/units";
import { WORDS } from "@/content/words";
import { EXPANSION_WORDS } from "@/content/words/expansion";
import { kanjiCards } from "@/lib/kanji-cards";
import { reportAnswer } from "@/lib/notebook";
import { reviewIds } from "@/lib/review-data";
import { buildQueue, deckInUse } from "@/lib/review-queue";
import { EMPTY_SRS, practiceCard, type SrsState } from "@/lib/srs";
import { DEFAULT_STUDY, SCHEMAS, studySchema } from "@/lib/schemas";
import { vocabCards } from "@/lib/vocab-cards";
import { packMoreCards, unpackMoreCards, VOCAB_MORE_DECK_ID, vocabMoreDeck } from "@/lib/vocab-deck";
import { vocabMoreCards } from "@/lib/vocab-more-cards";

const cards = vocabMoreCards();
const expansion = new Set(EXPANSION_WORDS.map((w) => w.jp));
const lessonWords = new Set(WORDS.map((w) => w.jp));

describe("More words cards", () => {
  it("come only from the expansion words, never a lesson word, each once", () => {
    for (const c of cards) {
      expect(expansion.has(c.jp), c.jp).toBe(true);
      expect(lessonWords.has(c.jp), c.jp).toBe(false);
    }
    expect(new Set(cards.map((c) => c.id)).size).toBe(cards.length);
    // Words a later lesson teaches leave the deck (MOVED_TO_LESSONS), so the count falls as lessons are added.
    expect(cards.length).toBeGreaterThan(1500);
  });

  it("come most frequent first, by the candidate list's rank, in groups of 50", () => {
    const file = JSON.parse(readFileSync("content/data/expand-candidates.json", "utf8")) as { candidates: { id: string }[] };
    const rank = new Map(file.candidates.map((c, i) => [c.id, i]));
    // Words counted mostly from suffixes and compounds (者, 会, 県…) are moved after rank 1000; the rest keep their order.
    const moved = new Set(["者", "会", "県", "名", "世", "部", "版", "用", "生", "元", "ただ"]);
    const written = (jp: string) => jp.replace(/\[([^|\]]+)\|[^\]]+\]/g, "$1");
    const ranks = cards.filter((c) => !moved.has(written(c.jp))).map((c) => rank.get(c.id) ?? Infinity);
    expect(ranks.every((r, i) => i === 0 || ranks[i - 1] <= r)).toBe(true);
    expect(written(cards[0].jp)).toBe("自分");
    // They come after every other word ranked under 1000 (a position, not a fixed index: the deck shrinks as lessons take words).
    const lastEarly = Math.max(...cards.map((c, i) => (!moved.has(written(c.jp)) && rank.get(c.id)! < 1000 ? i : -1)));
    for (const c of cards.filter((k) => moved.has(written(k.jp)))) expect(cards.indexOf(c), c.jp).toBeGreaterThan(lastEarly);
    expect(cards[0].group).toBe("1");
    expect(cards[50].group).toBe("2");
  });

  it("have English-only prompts, and same-meaning words accept each other", () => {
    for (const c of cards) expect(c.meaning, c.jp).not.toMatch(/[぀-ヿ\p{Script=Han}]/u);
    const deck = vocabMoreDeck(cards, true);
    const card = (id: string) => cards.find((c) => c.id === id)!;
    // 開始 and スタート (both expansion words), ショップ and the lesson word 店.
    expect(deck.check(card("1202760"), "スタート")).toMatchObject({ correct: true, note: expect.stringContaining("means this too") });
    expect(deck.check(card("1062820"), "店")).toMatchObject({ correct: true, note: expect.stringContaining("means this too") });
  });

  it("name a lesson word with the same main sense, without counting it (食べる for 食う \"to eat (rough)\")", () => {
    const kuu = cards.find((c) => c.id === "1592100")!;
    expect(kuu.near).toContain("[食|た]べる");
    expect(vocabMoreDeck(cards, true).check(kuu, "食べる")).toMatchObject({ correct: false, note: expect.stringContaining("食べる also means that") });
    expect(vocabMoreDeck(cards, true).check(kuu, "食う").correct).toBe(true);
  });

  it("travel packed in /vocab-more.json and come back the same", () => {
    expect(unpackMoreCards(packMoreCards(cards))).toEqual(cards);
    expect(Buffer.byteLength(JSON.stringify(packMoreCards(cards)))).toBeLessThan(140_000);
  });

  it("are never in the lesson decks: no lesson deck's builder reads the expansion, and no card asks an expansion word", () => {
    // lib/kanji-cards.ts reads it only for the furigana rules; its cards are checked below.
    const builders = ["lib/vocab-cards.ts", "lib/cloze-cards.ts", "lib/register-cards.ts", "lib/conjugation-words.ts", "lib/type-lines.ts"];
    for (const file of builders) expect(readFileSync(file, "utf8"), file).not.toMatch(/words\/expansion|EXPANSION_WORDS/);
    const path = ALL_LESSONS.map((l) => l.key);
    const asked = [...vocabCards(path).map((c) => c.jp), ...kanjiCards().map((c) => c.word)];
    expect(asked.filter((jp) => expansion.has(jp))).toEqual([]);
  });

  it("practise only the cards already studied, not the 2,000 unseen ones", () => {
    const deck = vocabMoreDeck(cards, true);
    const state = { extraGroups: 0, cards: { [cards[5].id]: { box: 2, due: 0, reps: 1, lapses: 0 } } };
    for (let i = 0; i < 5; i++) expect(practiceCard(deck, state, undefined, Math.random())?.id).toBe(cards[5].id);
    expect(practiceCard(deck, { extraGroups: 0, cards: {} }, undefined, 0.5)).toBeNull();
  });

  it("are loaded by the review only while switched on and in use, and a notebook item is asked", () => {
    const studied: SrsState = { decks: { [VOCAB_MORE_DECK_ID]: { extraGroups: 0, cards: { [cards[0].id]: { box: 2, due: 0, reps: 1, lapses: 0 } } } } };
    const missed = reportAnswer({}, VOCAB_MORE_DECK_ID, cards[1].id, false, 0);
    expect(deckInUse(EMPTY_SRS, {}, VOCAB_MORE_DECK_ID, true)).toBe(false);
    expect(deckInUse(studied, {}, VOCAB_MORE_DECK_ID, false)).toBe(false);
    expect(deckInUse(studied, {}, VOCAB_MORE_DECK_ID, true)).toBe(true);
    expect(deckInUse(EMPTY_SRS, missed, VOCAB_MORE_DECK_ID, true)).toBe(true);
    const queue = buildQueue([vocabMoreDeck(cards, true)], {}, studied, missed, 60 * 60_000);
    expect(queue.map((q) => q.cardId)).toEqual([cards[0].id, cards[1].id]);
    // Without the cards (switched off, or a failed fetch) nothing of the deck is asked.
    expect(buildQueue([vocabMoreDeck([], true)], {}, studied, missed, 60 * 60_000)).toEqual([]);
  });

  it("open only when the switch is on, and the review can ask them by id", () => {
    expect(cards.every((c) => vocabMoreDeck(cards, false).isOpen?.(c) === false)).toBe(true);
    expect(cards.every((c) => vocabMoreDeck(cards, true).isOpen?.(c) === true)).toBe(true);
    expect(reviewIds()[VOCAB_MORE_DECK_ID]).toEqual(cards.map((c) => c.id));
  });
});

describe("the study store", () => {
  it("is listed for backup, off by default, and keeps a readable switch", () => {
    expect(SCHEMAS["np:study"]).toBe(studySchema);
    expect(DEFAULT_STUDY.moreWords).toBe(false);
    expect(studySchema.validate({ moreWords: true, newPerDay: 10 })).toEqual({ moreWords: true, newPerDay: 10 });
    expect(studySchema.validate({ moreWords: "on", newPerDay: 10 })).toEqual({ moreWords: false, newPerDay: 10 });
    expect(studySchema.validate([])).toBeNull();
  });
});
