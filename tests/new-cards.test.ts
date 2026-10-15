import { describe, expect, it } from "vitest";
import { countNew, isNewCard, newLeft, newToday, NO_NEW_CARDS } from "@/lib/new-cards";
import { answerCard, EMPTY_SRS, LEARNING_LIMIT, nextCard, type SrsDeck } from "@/lib/srs";
import { dayKey } from "@/lib/today";
import { decode } from "@/lib/envelope";
import { newCardsSchema, SCHEMAS, studySchema } from "@/lib/schemas";

describe("the daily new-card count", () => {
  it("counts today's new cards, and starts again at local midnight", () => {
    const late = dayKey(new Date(2026, 9, 14, 23, 59));
    const midnight = dayKey(new Date(2026, 9, 15, 0, 0));
    let nc = NO_NEW_CARDS;
    for (let i = 0; i < 7; i++) nc = countNew(nc, late);
    expect(newToday(nc, late)).toBe(7);
    expect(newLeft(nc, late, 10)).toBe(3);
    expect(newToday(nc, midnight)).toBe(0);
    expect(newLeft(nc, midnight, 10)).toBe(10);
    expect(countNew(nc, midnight)).toEqual({ day: midnight, count: 1 });
  });

  it("follows a limit changed mid-day: lowered below today's count leaves none, raised opens more", () => {
    const today = "2026-10-15";
    let nc = NO_NEW_CARDS;
    for (let i = 0; i < 8; i++) nc = countNew(nc, today);
    expect(newLeft(nc, today, 5)).toBe(0);
    expect(newLeft(nc, today, 10)).toBe(2);
    expect(newLeft(nc, today, 20)).toBe(12);
  });
});

describe("the stores", () => {
  it("migrates np:study v1 to v2 with 10 new cards a day, keeping the More words switch", () => {
    expect(decode(JSON.stringify({ v: 1, data: { moreWords: true } }), studySchema).value).toEqual({ moreWords: true, newPerDay: 10 });
    expect(decode(JSON.stringify({ v: 2, data: { moreWords: false, newPerDay: 20 } }), studySchema).value).toEqual({ moreWords: false, newPerDay: 20 });
    expect(studySchema.validate({ moreWords: true, newPerDay: 7 })).toEqual({ moreWords: true, newPerDay: 10 });
  });

  it("reads np:new-cards as today's count, and anything unreadable as none", () => {
    expect(newCardsSchema.validate({ day: "2026-10-15", count: 3 })).toEqual({ day: "2026-10-15", count: 3 });
    expect(newCardsSchema.validate({ day: "2026-02-30", count: 3 })).toEqual(NO_NEW_CARDS);
    expect(newCardsSchema.validate({ day: "2026-10-15", count: -1 })).toEqual(NO_NEW_CARDS);
    expect(SCHEMAS["np:new-cards"]).toBe(newCardsSchema);
  });
});

describe("the limit in the decks", () => {
  /** A deck that opens with lessons (isOpen), 30 cards. */
  const deck: SrsDeck<{ id: string }> = { id: "t", cards: [...Array(30).keys()].map((i) => ({ id: `c${i}` })), groups: ["g"], groupOf: () => "g", isOpen: () => true };
  const NOW = 1_800_000_000_000;

  it("counts a card as new only before its first answer, so a missed new card isn't counted again", () => {
    let srs = EMPTY_SRS;
    expect(isNewCard(srs.decks.t?.cards ?? {}, "c0")).toBe(true);
    srs = answerCard(srs, "t", "c0", false, NOW);
    expect(isNewCard(srs.decks.t.cards, "c0")).toBe(false);
    expect(isNewCard({ ["__proto__"]: 1 }, "toString")).toBe(true);
  });

  it("combines with the learning limit: whichever is reached first holds new cards back", () => {
    let srs = EMPTY_SRS;
    for (let i = 0; i < LEARNING_LIMIT; i++) srs = answerCard(srs, "t", `c${i}`, false, NOW);
    const later = NOW + 24 * 3600_000 * 10;
    // Ten cards still being learned: due ones come, new ones wait, whatever the allowance.
    expect(nextCard(deck, srs.decks.t, later, undefined, 20)?.id).toBe("c0");
    const fresh = { cards: {}, extraGroups: 0 };
    expect(nextCard(deck, fresh, NOW, undefined, 0)).toBeNull();
    expect(nextCard(deck, fresh, NOW, undefined, 1)?.id).toBe("c0");
  });

  it("starts again at local midnight through real timestamps, and follows the limit set now", () => {
    const before = new Date(2026, 9, 15, 23, 59, 30).getTime();
    const after = new Date(2026, 9, 16, 0, 0, 30).getTime();
    let nc = NO_NEW_CARDS;
    for (let i = 0; i < 10; i++) nc = countNew(nc, dayKey(new Date(before)));
    expect(newLeft(nc, dayKey(new Date(before)), 10)).toBe(0);
    expect(newLeft(nc, dayKey(new Date(after)), 10)).toBe(10);
    expect(newLeft(nc, dayKey(new Date(before)), 20)).toBe(10);
  });
});
