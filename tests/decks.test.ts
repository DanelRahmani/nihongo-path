import { describe, expect, it } from "vitest";
import { KANA } from "@/content/kana";
import { ALL_LESSONS } from "@/content/units";
import { askItem, deckIds, KANA_DECKS, kanaDeckId } from "@/lib/decks";
import { decode } from "@/lib/envelope";
import { LEAVE_AFTER, type Notebook, notebookItems, noteKey, QUIZ_DECK, quizCardId, reportAnswer, resolvableItems, SPACING } from "@/lib/notebook";
import { notebookSchema, srsSchema, srsV1toV2 } from "@/lib/schemas";
import { type CardState, deckState, deckStats, dueCards, UNLOCK_BOX, unlockedCards } from "@/lib/srs";

describe("the deck registry", () => {
  it("has the six kana decks, each card in exactly one", () => {
    expect(KANA_DECKS.map((d) => d.id)).toEqual(["hiragana-base", "hiragana-dakuten", "hiragana-yoon", "katakana-base", "katakana-dakuten", "katakana-yoon"]);
    const ids = KANA_DECKS.flatMap((d) => d.cards.map((c) => c.id));
    expect(ids.sort()).toEqual(KANA.map((k) => k.id).sort());
    for (const k of KANA) expect(askItem(kanaDeckId(k), k.id)?.prompt.text).toBe(k.char);
  });

  it("gives every card a prompt and a checker that accepts its canonical answer", () => {
    for (const deck of KANA_DECKS) {
      for (const card of deck.cards) {
        const item = askItem(deck.id, card.id)!;
        expect(item.prompt.text, card.id).toBeTruthy();
        expect(item.check(item.check("").canonical).correct, card.id).toBe(true);
      }
    }
    expect(deckIds()).toEqual(KANA_DECKS.map((d) => d.id));
  });

  it("asks nothing for a deck or card this build doesn't have", () => {
    expect(askItem("hiragana-base", "hiragana:𛀁")).toBeNull();
    expect(askItem("no-such-deck", "hiragana:あ")).toBeNull();
    expect(askItem(QUIZ_DECK, "particles/wa-topic#abc")).toBeNull();
  });

  it("puts every group's cards in that group, in unlock order", () => {
    for (const deck of KANA_DECKS) {
      const order = deck.cards.map((c) => deck.groups.indexOf(deck.groupOf(c)));
      expect(order.every((g) => g >= 0)).toBe(true);
      expect(order).toEqual([...order].sort((a, b) => a - b));
      expect(deck.groupLabel(deck.groups[1])).toMatch(/^\S+( \S+)+$/);
    }
  });

  it("keeps due cards of later groups askable after a lapse in an early one", () => {
    const deck = KANA_DECKS.find((d) => d.id === "hiragana-base")!;
    const firstThree = deck.cards.filter((k) => ["a", "ka", "sa"].includes(k.row));
    const cards: Record<string, CardState> = Object.fromEntries(firstThree.map((k) => [k.id, { box: UNLOCK_BOX, due: 0, reps: 3, lapses: 0 }]));
    cards["hiragana:あ"] = { box: 1, due: 0, reps: 4, lapses: 1 };
    const state = { cards, extraGroups: 0 };
    expect(dueCards(deck, state, 1)).toHaveLength(15);
    expect(deckStats(deck, state, 1).due).toBe(15);
    // The あ row is open again only for learning: no new card from later rows.
    expect(unlockedCards(deck, state).filter((k) => !cards[k.id])).toHaveLength(0);
  });
});

describe("the version 2 schedule", () => {
  // Every kana card in a different box and due time, as a version 1 store held them.
  const v1Cards: Record<string, CardState> = Object.fromEntries(
    KANA.map((k, i) => [k.id, { box: (i % 5) + 1, due: 1_790_000_000_000 + i * 60_000, reps: i, lapses: i % 3 }]),
  );

  it("keeps every kana card's box and due time through the migration", () => {
    const raw = JSON.stringify({ v: 1, data: { cards: v1Cards, extraRows: { "hiragana-base": 2, "katakana-yoon": 1 } } });
    const { value, status } = decode(raw, srsSchema);
    expect(status).toBe("migrated");
    for (const k of KANA) expect(deckState(value, kanaDeckId(k)).cards[k.id], k.id).toEqual(v1Cards[k.id]);
    const total = Object.values(value.decks).reduce((n, d) => n + Object.keys(d.cards).length, 0);
    expect(total).toBe(KANA.length);
    expect(deckState(value, "hiragana-base").extraGroups).toBe(2);
    expect(deckState(value, "katakana-yoon").extraGroups).toBe(1);
    expect(deckState(value, "hiragana-yoon").extraGroups).toBe(0);
  });

  it("keeps every card from a raw version 0 store too", () => {
    const { value, status } = decode(JSON.stringify({ cards: v1Cards, extraRows: {} }), srsSchema);
    expect(status).toBe("migrated");
    for (const k of KANA) expect(deckState(value, kanaDeckId(k)).cards[k.id], k.id).toEqual(v1Cards[k.id]);
  });

  it("drops a card or deck no kana deck has, and leaves a non-object alone", () => {
    expect(srsV1toV2({ cards: { "hiragana:𛀁": { box: 1, due: 0, reps: 0, lapses: 0 } }, extraRows: { hiragana: 2 } })).toEqual({ decks: {} });
    expect(srsV1toV2("x")).toBe("x");
  });

  it("treats a stored __proto__ or constructor key as data, never as the prototype", () => {
    const v1 = '{"v":1,"data":{"cards":{},"extraRows":{"__proto__":5,"constructor":2}}}';
    expect(decode(v1, srsSchema).value).toEqual({ decks: {} });
    expect(({} as Record<string, unknown>).extraGroups).toBeUndefined();
    const v2 = '{"v":2,"data":{"decks":{"__proto__":{"cards":{},"extraGroups":3},"hiragana-base":{"cards":{}}}}}';
    const value = decode(v2, srsSchema).value;
    expect(Object.getPrototypeOf(value.decks)).toBe(Object.prototype);
    expect(Object.keys(value.decks).sort()).toEqual(["__proto__", "hiragana-base"]);
    // A deck without extraGroups gets 0.
    expect(value.decks["hiragana-base"]).toEqual({ cards: {}, extraGroups: 0 });
  });

  it("drops an unreadable deck and keeps the others", () => {
    const raw = JSON.stringify({ v: 2, data: { decks: { "hiragana-base": { cards: { "hiragana:あ": { box: 2, due: 1, reps: 1, lapses: 0 } }, extraGroups: 0 }, broken: 7 } } });
    expect(Object.keys(decode(raw, srsSchema).value.decks)).toEqual(["hiragana-base"]);
  });
});

describe("the mistake notebook", () => {
  const NOW = 1_000;
  const LATER = NOW + SPACING;
  const miss = (n: Notebook, card = "a", t = NOW) => reportAnswer(n, "hiragana-base", card, false, t);
  const right = (n: Notebook, card = "a", t = LATER) => reportAnswer(n, "hiragana-base", card, true, t);

  it("takes in a missed item", () => {
    expect(miss({})).toEqual({ [noteKey("hiragana-base", "a")]: { deck: "hiragana-base", card: "a", misses: 1, rightInRow: 0, added: NOW, lastMiss: NOW } });
  });

  it("ignores a right answer to an item it doesn't hold", () => {
    const empty: Notebook = {};
    expect(right(empty)).toBe(empty);
  });

  it(`lets an item go after ${LEAVE_AFTER} right answers in a row`, () => {
    const once = right(miss({}));
    expect(Object.values(once)[0].rightInRow).toBe(1);
    expect(right(once)).toEqual({});
  });

  it("doesn't count a right answer soon after the miss", () => {
    const n = miss({});
    expect(right(n, "a", NOW + SPACING - 1)).toBe(n);
    expect(right(right(n, "a", NOW + 1), "a", NOW + 2)).toBe(n);
  });

  it("starts the run again on a miss, counting the misses and keeping when it was first missed", () => {
    const n = miss(right(miss({})), "a", LATER + 5);
    expect(Object.values(n)[0]).toMatchObject({ misses: 2, rightInRow: 0, added: NOW, lastMiss: LATER + 5 });
    expect(Object.keys(right(n, "a", LATER + 5 + SPACING))).toHaveLength(1);
  });

  it("counts only the items this build can still ask", () => {
    let n = miss({}, "hiragana:あ");
    n = reportAnswer(n, "hiragana-base", "hiragana:gone", false, NOW);
    expect(resolvableItems(n, (i) => askItem(i.deck, i.card) !== null).map((i) => i.card)).toEqual(["hiragana:あ"]);
    expect(Object.keys(n)).toHaveLength(2);
  });

  it("keeps items of different decks apart, and lists the longest-waiting first", () => {
    let n = miss({}, "b", 30);
    n = miss(n, "a", 10);
    n = reportAnswer(n, QUIZ_DECK, "a", false, 20);
    expect(notebookItems(n).map((i) => `${i.deck}:${i.card}`)).toEqual(["hiragana-base:a", "quiz:a", "hiragana-base:b"]);
  });

  it("drops unreadable items from the store", () => {
    const good = { deck: "quiz", card: "x#1", misses: 1, rightInRow: 0, added: 1, lastMiss: 1 };
    const kept = { ...good, card: "x#2", rightInRow: 1 };
    const raw = JSON.stringify({ v: 1, data: { wrongKey: good, kept, bad: { ...good, misses: 0 }, worse: "x", piped: { ...good, deck: "a|b" }, late: { ...good, lastMiss: "soon" } } });
    expect(decode(raw, notebookSchema).value).toEqual({ [noteKey("quiz", "x#1")]: good, [noteKey("quiz", "x#2")]: kept });
  });

  it("names every quiz question uniquely and stably", () => {
    const ids = ALL_LESSONS.flatMap((l) => l.lesson.blocks.flatMap((b) => (b.type === "quiz" ? b.questions.map((q) => quizCardId(l.key, q.prompt)) : [])));
    expect(ids.length).toBeGreaterThan(200);
    expect(new Set(ids).size).toBe(ids.length);
    expect(quizCardId("particles/wa-topic", "A")).toBe(quizCardId("particles/wa-topic", "A"));
    expect(quizCardId("particles/wa-topic", "A")).not.toBe(quizCardId("particles/wa-topic", "B"));
  });
});
