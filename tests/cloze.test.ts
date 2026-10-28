import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CLOZE_ALSO, CLOZE_EXCLUSIONS } from "@/content/cloze-exclusions";
import { ALL_LESSONS } from "@/content/units";
import { clozeCards, MOST } from "@/lib/cloze-cards";
import { checkCloze, clozeDeck, GAP } from "@/lib/cloze-deck";
import { plainOf } from "@/lib/markup";
import { deckState, EMPTY_SRS, unlockedCards } from "@/lib/srs";

const { cards: CARDS, leftOut: LEFT_OUT } = clozeCards();
const LESSONS = ALL_LESSONS.map((l) => l.key);

describe("the cloze builder", () => {
  it("turns every highlighted line into a card or leaves it out with a reason", () => {
    let highlighted = 0;
    for (const { lesson } of ALL_LESSONS) {
      for (const b of lesson.blocks) {
        const lines =
          b.type === "examples"
            ? b.items.flatMap((e) => [e.jp, e.alt])
            : b.type === "pair"
              ? [b.a.jp, b.b.jp]
              : b.type === "dialogue"
                ? b.lines.flatMap((l) => [l.jp, l.alt])
                : [];
        highlighted += lines.filter((l) => l?.includes("{")).length;
      }
    }
    expect(CARDS.length + LEFT_OUT.length).toBe(highlighted);
    for (const l of LEFT_OUT) expect(l.reason, l.jp).not.toBe("");
    // Pinned: a lesson edit that adds or drops a card shows here, to be read and accepted.
    const reasons: Record<string, number> = {};
    for (const l of LEFT_OUT) {
      const key = /^(pair|kana|several|highlight)/.test(l.reason) ? l.reason : "by hand";
      reasons[key] = (reasons[key] ?? 0) + 1;
    }
    expect({ cards: CARDS.length, ...reasons }).toMatchInlineSnapshot(`
      {
        "by hand": 189,
        "cards": 1482,
        "highlight covers most of the line": 51,
        "kana lesson": 58,
        "pair line: the other side fits the same gap": 114,
        "several highlights": 24,
      }
    `);
  });

  it("leaves out pair lines, several highlights, highlights covering most of the line and the kana lessons", () => {
    const reasons = new Set(LEFT_OUT.map((l) => l.reason));
    for (const r of ["pair line: the other side fits the same gap", "several highlights", "highlight covers most of the line", "kana lesson"]) expect(reasons).toContain(r);
    for (const c of CARDS) {
      expect(c.line.split(GAP), c.id).toHaveLength(2);
      expect(c.line, c.id).not.toMatch(/[{}]/);
      const bare = (jp: string) => plainOf(jp, false).replace(/[。、？！…\s-]/g, "");
      const share = bare(c.answer).length / bare(c.line.replace(GAP, c.answer)).length;
      expect(share, c.id).toBeLessThanOrEqual(MOST);
      expect(c.lesson, c.id).not.toMatch(/^(hiragana|katakana)\//);
    }
  });

  it("leaves out every hand exclusion, each a line that would otherwise be a card, with a reason", () => {
    const unexcluded = new Set(clozeCards({}).cards.map((c) => c.id));
    for (const [id, reason] of Object.entries(CLOZE_EXCLUSIONS)) {
      expect(unexcluded.has(id), id).toBe(true);
      expect(reason.length, id).toBeGreaterThan(5);
      expect(CARDS.some((c) => c.id === id), id).toBe(false);
    }
    for (const id of Object.keys(CLOZE_ALSO)) expect(CARDS.some((c) => c.id === id), id).toBe(true);
  });

  it("names the register of every gap that holds the line's final predicate", () => {
    // The same gap in one lesson, in both registers, has two answers, told apart by the register.
    const twin = (c: (typeof CARDS)[number]) => CARDS.find((o) => o !== c && o.line === c.line && o.lesson === c.lesson);
    for (const c of CARDS.filter((x) => twin(x))) {
      expect(c.register, c.id).toBeDefined();
      expect(twin(c)!.register, c.id).not.toBe(c.register);
    }
    const drink = CARDS.filter((c) => c.line === "[毎朝|まいあさ] コーヒー を [飲|の]＿＿。");
    expect(drink.map((c) => c.register).sort()).toEqual(["casual", "polite"]);
    // A particle gap carries no register.
    expect(CARDS.find((c) => c.answer === "で" && c.lesson === "particles/de-place-means")?.register).toBeUndefined();
  });

  it("keeps a pair line whose sides differ outside the highlight", () => {
    expect(CARDS.some((c) => c.lesson === "particles/ni-vs-de")).toBe(true);
  });

  it("gives every card a unique id and its lesson's English", () => {
    expect(new Set(CARDS.map((c) => c.id)).size).toBe(CARDS.length);
    for (const c of CARDS) {
      expect(LESSONS, c.id).toContain(c.lesson);
      expect(c.en, c.id).not.toBe("");
    }
  });
});

describe("checkCloze", () => {
  // A made-up card with a katakana answer (the lessons' own are all left out or part of longer answers).
  const card = { ...CARDS[0], answer: "コーヒー", also: [] };

  it("accepts the answer in kanji or kana, ignoring width, and nothing else", () => {
    expect(checkCloze(card, "コーヒー")).toEqual({ correct: true, canonical: "コーヒー" });
    expect(checkCloze(card, "ｺｰﾋｰ").correct).toBe(true);
    expect(checkCloze(card, "こうちゃ").correct).toBe(false);
    const kanji = CARDS.find((c) => c.answer.includes("[") && !/\s/.test(c.answer))!;
    expect(checkCloze(kanji, plainOf(kanji.answer, false)).correct).toBe(true);
  });

  it("names a katakana answer typed in hiragana", () => {
    expect(checkCloze(card, "こーひー").note).toMatch(/katakana/);
  });

  it("accepts the engine's variants and the reviewed alternatives", () => {
    const copula = CARDS.find((c) => c.lesson === "grammar/desu-da" && c.answer === "じゃ ない")!;
    expect(copula.also).toContain("で は ない");
    expect(checkCloze(copula, "ではない").correct).toBe(true);
    const counting = CARDS.find((c) => c.id === "grammar/numbers-counting#xyzfbn")!;
    expect(checkCloze(counting, "3つ").correct).toBe(true);
    expect(checkCloze(CARDS.find((c) => c.id === "particles/ni-target#dfhvgm")!, "へ").correct).toBe(true);
  });

  it("names the word part already shown", () => {
    const drink = CARDS.find((c) => c.line === "[毎朝|まいあさ] コーヒー を [飲|の]＿＿。" && c.register === "polite")!;
    expect(drink.stem).toBe("[飲|の]");
    expect(checkCloze(drink, "飲みます").note).toBe("Type only the missing part: みます.");
    expect(checkCloze(drink, "のみます").note).toBe("Type only the missing part: みます.");
  });
});

describe("joining on lesson completion", () => {
  it("opens a lesson's lines when it is done", () => {
    const lesson = CARDS[0].lesson;
    const deck = clozeDeck(CARDS, LESSONS, new Set([lesson]));
    const open = unlockedCards(deck, deckState(EMPTY_SRS, deck.id));
    expect(open.length).toBeGreaterThan(0);
    expect(open.every((c) => c.lesson === lesson)).toBe(true);
    expect(unlockedCards(clozeDeck(CARDS, LESSONS, new Set()), deckState(EMPTY_SRS, deck.id))).toEqual([]);
  });
});

describe("client code", () => {
  it("keeps the lessons out of the deck's client modules; the builder never reads the reading texts or the corpus", () => {
    for (const file of ["lib/cloze-deck.ts", "components/cloze/ClozeDrill.tsx"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/^import (?!type )[^;]*?from "@\/(content\/(?!kana")|lib\/cloze-cards|lib\/joyo|lib\/corpus)/m);
    }
    expect(readFileSync("lib/cloze-cards.ts", "utf8")).not.toMatch(/content\/reading|lib\/corpus/);
  });
});
