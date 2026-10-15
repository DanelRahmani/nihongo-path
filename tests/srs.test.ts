import { describe, expect, it } from "vitest";
import { KANA } from "@/content/kana";
import { checkKana, KANA_DECKS } from "@/lib/decks";
import {
  answerCard,
  type DeckState,
  deckState,
  deckStats,
  EMPTY_DECK_STATE,
  EMPTY_SRS,
  INTERVALS,
  nextCard,
  practiceCard,
  schedule,
  type SrsDeck,
  UNLOCK_BOX,
  unlockedGroupCount,
  unlockGroup,
} from "@/lib/srs";

const NOW = 1_700_000_000_000;
const hiragana = KANA_DECKS.find((d) => d.id === "hiragana-base")!;

describe("schedule", () => {
  it("promotes a new card to box 2 on a correct answer", () => {
    const s = schedule(undefined, true, NOW);
    expect(s.box).toBe(2);
    expect(s.due).toBe(NOW + INTERVALS[2]);
  });

  it("sends a missed card back to box 1, due immediately", () => {
    const s = schedule({ box: 4, due: NOW, reps: 5, lapses: 0 }, false, NOW);
    expect(s).toEqual({ box: 1, due: NOW, reps: 6, lapses: 1 });
  });

  it("caps at box 5", () => {
    expect(schedule({ box: 5, due: NOW, reps: 9, lapses: 0 }, true, NOW).box).toBe(5);
  });
});

describe("checkKana", () => {
  const shi = KANA.find((k) => k.id === "hiragana:し")!;
  it("accepts Hepburn and Kunrei spellings, ignoring case and spaces", () => {
    expect(checkKana(shi, "shi")).toEqual({ correct: true, canonical: "shi" });
    expect(checkKana(shi, " SI ").correct).toBe(true);
    expect(checkKana(shi, "chi")).toEqual({ correct: false, canonical: "shi" });
  });

  it("names kana typed instead of romaji", () => {
    expect(checkKana(shi, "し").note).toMatch(/romaji/);
  });
});

describe("group unlocking", () => {
  const aRow = hiragana.cards.filter((k) => k.row === "a");

  it("starts with only the first group", () => {
    expect(unlockedGroupCount(hiragana, EMPTY_DECK_STATE)).toBe(1);
  });

  it("unlocks the next group once the first reaches the unlock box", () => {
    const cards = Object.fromEntries(aRow.map((k) => [k.id, { box: UNLOCK_BOX, due: NOW, reps: 2, lapses: 0 }]));
    expect(unlockedGroupCount(hiragana, { cards, extraGroups: 0 })).toBe(2);
  });

  it("honours groups unlocked by hand, in that deck only", () => {
    const srs = unlockGroup(unlockGroup(EMPTY_SRS, hiragana.id), hiragana.id);
    expect(unlockedGroupCount(hiragana, deckState(srs, hiragana.id))).toBe(3);
    expect(deckState(srs, "katakana-base")).toEqual(EMPTY_DECK_STATE);
  });
});

describe("nextCard", () => {
  it("introduces new cards in order", () => {
    expect(nextCard(hiragana, EMPTY_DECK_STATE, NOW)?.char).toBe("あ");
  });

  it("prefers due cards and avoids an immediate repeat", () => {
    const state: DeckState = {
      extraGroups: 0,
      cards: {
        "hiragana:あ": { box: 1, due: NOW - 10, reps: 1, lapses: 1 },
        "hiragana:い": { box: 1, due: NOW - 5, reps: 1, lapses: 1 },
      },
    };
    expect(nextCard(hiragana, state, NOW)?.char).toBe("あ");
    expect(nextCard(hiragana, state, NOW, "hiragana:あ")?.char).toBe("い");
  });

  it("holds new cards back once today's allowance is used, but still asks due ones (I7)", () => {
    expect(nextCard(hiragana, EMPTY_DECK_STATE, NOW, undefined, 0)).toBeNull();
    expect(nextCard(hiragana, EMPTY_DECK_STATE, NOW, undefined, 1)?.char).toBe("あ");
    const state: DeckState = { extraGroups: 0, cards: { "hiragana:い": { box: 1, due: NOW - 5, reps: 1, lapses: 1 } } };
    expect(nextCard(hiragana, state, NOW, undefined, 0)?.char).toBe("い");
    expect(nextCard(hiragana, state, NOW, "hiragana:い", 0)?.char).toBe("い");
  });

  it("returns null when every unlocked card is scheduled for later", () => {
    const cards = Object.fromEntries(hiragana.cards.filter((k) => k.row === "a").map((k) => [k.id, { box: 2, due: NOW + 1000, reps: 1, lapses: 0 }]));
    expect(nextCard(hiragana, { cards, extraGroups: 0 }, NOW)).toBeNull();
  });

  it("works for any deck, not only kana", () => {
    // A made-up deck of words in two groups.
    const words: SrsDeck<{ id: string; level: string }> = {
      id: "test-words",
      cards: [
        { id: "neko", level: "one" },
        { id: "inu", level: "one" },
        { id: "tori", level: "two" },
      ],
      groups: ["one", "two"],
      groupOf: (c) => c.level,
    };
    let srs = EMPTY_SRS;
    expect(nextCard(words, deckState(srs, words.id), NOW)?.id).toBe("neko");
    srs = answerCard(srs, words.id, "neko", true, NOW);
    expect(nextCard(words, deckState(srs, words.id), NOW)?.id).toBe("inu");
    srs = answerCard(answerCard(srs, words.id, "inu", true, NOW), words.id, "neko", false, NOW);
    // neko is due again at once; tori is still locked.
    expect(nextCard(words, deckState(srs, words.id), NOW)?.id).toBe("neko");
    expect(deckStats(words, deckState(srs, words.id), NOW)).toMatchObject({ total: 3, unlocked: 2, due: 1, fresh: 0 });
    expect(practiceCard(words, deckState(srs, words.id), "neko", 0)?.id).toBe("inu");
    // Scheduling one deck leaves the others alone.
    expect(srs.decks[hiragana.id]).toBeUndefined();
  });
});

describe("kana data", () => {
  it("has 46 basic kana per script and no duplicate ids", () => {
    expect(KANA.filter((k) => k.script === "hiragana" && k.group === "base")).toHaveLength(46);
    expect(KANA.filter((k) => k.script === "katakana" && k.group === "base")).toHaveLength(46);
    expect(new Set(KANA.map((k) => k.id)).size).toBe(KANA.length);
  });

  it("derives katakana correctly", () => {
    expect(KANA.find((k) => k.id === "katakana:シ")?.romaji[0]).toBe("shi");
    expect(KANA.find((k) => k.id === "katakana:キャ")?.romaji[0]).toBe("kya");
  });
});
