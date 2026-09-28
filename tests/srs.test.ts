import { describe, expect, it } from "vitest";
import { DECKS, deckCards, KANA } from "@/content/kana";
import {
  EMPTY_SRS,
  INTERVALS,
  isCorrect,
  nextCard,
  schedule,
  type SrsState,
  UNLOCK_BOX,
  unlockedRowCount,
} from "@/lib/srs";

const NOW = 1_700_000_000_000;
const hiragana = DECKS.find((d) => d.id === "hiragana-base")!;

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

describe("isCorrect", () => {
  const shi = KANA.find((k) => k.id === "hiragana:し")!;
  it("accepts Hepburn and Kunrei spellings, ignoring case and spaces", () => {
    expect(isCorrect(shi, "shi")).toBe(true);
    expect(isCorrect(shi, " SI ")).toBe(true);
    expect(isCorrect(shi, "chi")).toBe(false);
  });
});

describe("row unlocking", () => {
  const aRow = deckCards(hiragana).filter((k) => k.row === "a");

  it("starts with only the first row", () => {
    expect(unlockedRowCount(hiragana, EMPTY_SRS)).toBe(1);
  });

  it("unlocks the next row once the first row reaches the unlock box", () => {
    const cards = Object.fromEntries(aRow.map((k) => [k.id, { box: UNLOCK_BOX, due: NOW, reps: 2, lapses: 0 }]));
    expect(unlockedRowCount(hiragana, { cards, extraRows: {} })).toBe(2);
  });

  it("honours manually unlocked rows", () => {
    expect(unlockedRowCount(hiragana, { cards: {}, extraRows: { [hiragana.id]: 2 } })).toBe(3);
  });
});

describe("nextCard", () => {
  it("introduces new cards in order", () => {
    expect(nextCard(hiragana, EMPTY_SRS, NOW)?.char).toBe("あ");
  });

  it("prefers due cards and avoids an immediate repeat", () => {
    const state: SrsState = {
      extraRows: {},
      cards: {
        "hiragana:あ": { box: 1, due: NOW - 10, reps: 1, lapses: 1 },
        "hiragana:い": { box: 1, due: NOW - 5, reps: 1, lapses: 1 },
      },
    };
    expect(nextCard(hiragana, state, NOW)?.char).toBe("あ");
    expect(nextCard(hiragana, state, NOW, "hiragana:あ")?.char).toBe("い");
  });

  it("returns null when every unlocked card is scheduled for later", () => {
    const cards = Object.fromEntries(
      deckCards(hiragana)
        .filter((k) => k.row === "a")
        .map((k) => [k.id, { box: 2, due: NOW + 1000, reps: 1, lapses: 0 }]),
    );
    expect(nextCard(hiragana, { cards, extraRows: {} }, NOW)).toBeNull();
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
