import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ALL_LESSONS } from "@/content/units";
import { answerCard, deckState, EMPTY_SRS, LEARNING_LIMIT, nextCard, unlockedCards, unlockedGroupCount } from "@/lib/srs";
import { englishOnly, vocabCards } from "@/lib/vocab-cards";
import { checkVocab, vocabDeck } from "@/lib/vocab-deck";
import { plainOf } from "@/lib/markup";

const LESSONS = ALL_LESSONS.map((l) => l.key);
const CARDS = vocabCards(LESSONS);
const card = (jp: string) => CARDS.find((c) => c.jp === jp)!;

describe("the vocabulary cards", () => {
  it("are lesson words that stand alone, each with the lessons that use it and an English-only meaning", () => {
    expect(CARDS.length).toBeGreaterThan(350);
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length);
    for (const c of CARDS) {
      expect(c.group, c.id).toBe(c.lessons[0]);
      for (const l of c.lessons) expect(LESSONS, c.id).toContain(l);
      expect(c.meaning, c.id).not.toMatch(/[぀-ヿ\p{Script=Han}〜]/u);
      expect(c.meaning, c.id).not.toBe("");
    }
    for (const jp of ["ござる", "あ", "え", "バック", "ツール", "[結構|けっこう]"]) expect(CARDS.find((c) => c.jp === jp), jp).toBeUndefined();
    // Words whose meaning is all Japanese are left out: よろしく would clash with はじめまして.
    expect(CARDS.find((c) => c.jp === "よろしく")).toBeUndefined();
    // The pre-noun words are cards.
    expect(card("この")?.pos).toBe("before a noun");
  });

  it("come in path order, the order new cards are asked", () => {
    const order = CARDS.map((c) => LESSONS.indexOf(c.group));
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("make one card of a word with two readings", () => {
    expect(CARDS.filter((c) => plainOf(c.jp, false) === "何")).toHaveLength(1);
    expect(card("[何|なに]").also).toContain("[何|なん]");
  });

  it("drop the Japanese from a meaning, keeping its English", () => {
    expect(englishOnly("to be, to exist (people, animals); 〜ている: is doing")).toBe("to be, to exist (people, animals)");
    expect(englishOnly("study (する: to study)")).toBe("study (to study)");
    expect(englishOnly("liked (〜が好き: to like)")).toBe("liked (to like)");
    expect(englishOnly("together (一緒に)")).toBe("together");
    expect(englishOnly("(よろしくお願いします: nice to meet you; thanks)")).toBe("");
  });

  it("accept each other when two words share a meaning, or are reviewed near-synonyms", () => {
    expect(card("かばん").also).toContain("バッグ");
    expect(card("バッグ").also).toContain("かばん");
    expect(card("[多|おお]い").also).toContain("たくさん");
    expect(card("たくさん").also).toContain("[多|おお]い");
  });
});

describe("checkVocab", () => {
  const taberu = card("[食|た]べる");

  it("accepts the kanji form and the kana reading, ignoring width, and says which was typed", () => {
    expect(checkVocab(taberu, "食べる")).toEqual({ correct: true, canonical: "食べる" });
    expect(checkVocab(taberu, "たべる")).toEqual({ correct: true, canonical: "食べる", note: "In kana: it's usually written 食べる." });
    expect(checkVocab(taberu, "食べる　").correct).toBe(true);
    expect(checkVocab(card("コーヒー"), "ｺｰﾋｰ").correct).toBe(true);
  });

  it("accepts the reviewed spellings: digits, common kana spellings, full set phrases", () => {
    expect(checkVocab(card("[一|ひと]つ"), "1つ").correct).toBe(true);
    expect(checkVocab(card("[子供|こども]"), "子ども").correct).toBe(true);
    expect(checkVocab(card("ありがとう"), "ありがとうございます").correct).toBe(true);
    expect(checkVocab(card("いい"), "良い").correct).toBe(true);
  });

  it("names a kanji word typed in katakana, and a conjugated form", () => {
    expect(checkVocab(card("[学校|がっこう]"), "ガッコウ").note).toBe("Same sound: it's written 学校 (がっこう).");
    expect(checkVocab(taberu, "食べます").note).toMatch(/dictionary form, 食べる/);
  });

  it("names a katakana word typed in hiragana, and romaji", () => {
    expect(checkVocab(card("コーヒー"), "こーひー")).toMatchObject({ correct: false, note: expect.stringMatching(/katakana/) });
    expect(checkVocab(taberu, "taberu")).toMatchObject({ correct: false, note: expect.stringMatching(/Japanese keyboard/) });
  });

  it("accepts either reading of a word with two, and the other word with the same meaning", () => {
    expect(checkVocab(card("[何|なに]"), "なん")).toEqual({ correct: true, canonical: "何", note: "なん is the other reading of 何." });
    expect(checkVocab(card("たくさん"), "多い")).toMatchObject({ correct: true, note: "多い means this too. This card's word is たくさん." });
    expect(checkVocab(card("かばん"), "バッグ").correct).toBe(true);
    expect(checkVocab(taberu, "飲む").correct).toBe(false);
  });
});

describe("joining on lesson completion", () => {
  it("opens no cards until a lesson is done, then that lesson's words", () => {
    const none = vocabDeck(CARDS, LESSONS, new Set());
    expect(unlockedGroupCount(none, deckState(EMPTY_SRS, none.id))).toBe(0);
    expect(nextCard(none, deckState(EMPTY_SRS, none.id), 0)).toBeNull();
    const lesson = card("[食|た]べる").group;
    const one = vocabDeck(CARDS, LESSONS, new Set([lesson]));
    const open = unlockedCards(one, deckState(EMPTY_SRS, one.id));
    expect(open.length).toBeGreaterThan(0);
    expect(open.every((c) => c.group === lesson)).toBe(true);
    expect(open.map((c) => c.jp)).toContain("[食|た]べる");
  });

  it("opens a card with any lesson that uses its word, not only the first", () => {
    const multi = CARDS.find((c) => c.lessons.length > 1)!;
    const later = vocabDeck(CARDS, LESSONS, new Set([multi.lessons.at(-1)!]));
    expect(unlockedCards(later, deckState(EMPTY_SRS, later.id)).map((c) => c.id)).toContain(multi.id);
  });

  it("keeps studied cards askable if their lesson is unmarked", () => {
    const deck = vocabDeck(CARDS, LESSONS, new Set());
    const studied = { cards: { [card("[食|た]べる").id]: { box: 2, due: 0, reps: 1, lapses: 0 } }, extraGroups: 0 };
    expect(unlockedCards(deck, studied).map((c) => c.jp)).toEqual(["[食|た]べる"]);
  });

  it("holds back new cards while many are still being learned", () => {
    const deck = vocabDeck(CARDS, LESSONS, new Set(LESSONS));
    let srs = EMPTY_SRS;
    const firsts = CARDS.slice(0, LEARNING_LIMIT);
    for (const c of firsts) srs = answerCard(srs, deck.id, c.id, true, 0);
    // All ten are in box 2, due in ten minutes: nothing due, and no new card yet.
    expect(nextCard(deck, deckState(srs, deck.id), 1)).toBeNull();
    // One reaches the unlock box: a new card comes.
    srs = answerCard(srs, deck.id, firsts[0].id, true, 0);
    expect(nextCard(deck, deckState(srs, deck.id), 1)?.id).toBe(CARDS[LEARNING_LIMIT].id);
  });

  it("orders its groups along the path", () => {
    const deck = vocabDeck(CARDS, LESSONS, new Set());
    const order = deck.groups.map((g) => LESSONS.indexOf(g));
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });
});

describe("client code", () => {
  it("keeps the dictionary and lessons out of the deck's client modules", () => {
    for (const file of ["lib/vocab-deck.ts", "components/vocab/VocabDrill.tsx", "components/drill/TypedDrill.tsx"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/^import (?!type )[^;]*?from "@\/(content\/(?!kana")|lib\/vocab-cards|lib\/word-lessons|lib\/joyo|lib\/corpus)/m);
    }
  });
});
