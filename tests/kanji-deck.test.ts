import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANJI } from "@/content/kanji";
import { WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { furiganaCss, furiganaScript } from "@/lib/display";
import { furiganaKanji, kanjiCards } from "@/lib/kanji-cards";
import { checkKanji, GROUP_SIZE, KANJI_DECK_ID, kanjiDeck, learnedKanji, readingOfCard, writtenOf } from "@/lib/kanji-deck";
import { corpusFields, grammarFields } from "@/lib/corpus";
import { srsSchema } from "@/lib/schemas";
import { SITE_PAGES } from "@/lib/search";
import { DATE_KANJI } from "@/lib/today";
import { plainOf, readingOf } from "@/lib/markup";
import { type CardState, deckState, EMPTY_SRS, type SrsState, UNLOCK_BOX, unlockedGroupCount } from "@/lib/srs";

const CARDS = kanjiCards();
const DECK = kanjiDeck(CARDS);
const card = (char: string) => CARDS.find((c) => c.id === char)!;

describe("the kanji cards", () => {
  it("has one card per lesson kanji, most used first, in groups of ten", () => {
    expect(CARDS.map((c) => c.id)).toEqual(KANJI.map((k) => k.char));
    expect(DECK.groups).toHaveLength(Math.ceil(KANJI.length / GROUP_SIZE));
    for (const g of DECK.groups.slice(0, -1)) expect(CARDS.filter((c) => c.group === g)).toHaveLength(GROUP_SIZE);
  });

  it("asks a dictionary word that holds the card's kanji, with its reading and meaning", () => {
    const dictionary = new Set([...WORDS, ...EXTRA_WORDS].map((w) => w.jp));
    for (const c of CARDS) {
      expect(dictionary.has(c.word), c.id).toBe(true);
      expect(writtenOf(c), c.id).toBe(plainOf(c.word, false));
      expect(writtenOf(c), c.id).toContain(c.id);
      expect(readingOfCard(c), c.id).toBe(readingOf(c.word, false));
      expect(readingOfCard(c), c.id).toMatch(/^[ぁ-ゖー]+$/);
      expect(c.wordMeaning, c.id).not.toBe("");
    }
  });

  it("never gives the answer away: no kanji in the meaning shown", () => {
    for (const c of CARDS) expect(c.wordMeaning, c.id).not.toMatch(/\p{Script=Han}/u);
    expect(card("好").wordMeaning).toContain("すき");
  });

  it("asks the noun 本 (book), not the counter", () => {
    expect(card("本").wordMeaning).toBe("book");
  });

  it("prefers a word no other card asks, from the examples first, then the dictionary", () => {
    // 英語 is 英's only word, so 語 asks another.
    expect(writtenOf(card("英"))).toBe("英語");
    expect(writtenOf(card("語"))).not.toBe("英語");
    expect(writtenOf(card("学"))).not.toBe(writtenOf(card("生")));
    const repeats = CARDS.filter((c, i) => CARDS.slice(0, i).some((d) => d.word === c.word));
    expect(repeats.length).toBeLessThan(50);
  });
});

describe("checkKanji", () => {
  const food = card("食");

  it("accepts only the reviewed written form, folding width and dropping spaces and final punctuation", () => {
    expect(checkKanji(food, writtenOf(food))).toEqual({ correct: true, canonical: writtenOf(food) });
    expect(checkKanji(food, `　${writtenOf(food)}。`).correct).toBe(true);
    expect(checkKanji(food, "食べもの").correct).toBe(false);
  });

  it("names the reading typed in kana, in hiragana or katakana", () => {
    expect(checkKanji(food, readingOfCard(food)).note).toMatch(/kanji spelling/);
    expect(checkKanji(card("紙"), "カミ").note).toMatch(/kanji spelling/);
  });

  it("names digits for a kanji numeral, and another spelling with the card's kanji", () => {
    const fifth = CARDS.find((c) => writtenOf(c) === "五月");
    if (fifth) expect(checkKanji(fifth, "5月").note).toMatch(/numeral/);
    const child = CARDS.find((c) => writtenOf(c) === "子供")!;
    expect(checkKanji(child, "子ども").note).toBe("Another spelling. These cards use 子供.");
    expect(checkKanji(food, "ｔａｂｅｍｏｎｏ").note).toMatch(/Japanese keyboard/);
  });

  it("names romaji, and another kanji for the same reading", () => {
    expect(checkKanji(food, "tabemono").note).toMatch(/Japanese keyboard/);
    const paper = card("紙");
    expect(readingOfCard(paper)).toBe("かみ");
    expect(checkKanji(paper, "髪")).toMatchObject({ correct: false, note: expect.stringMatching(/Not this spelling/) });
  });

  it("is the deck's checker, and the prompt gives the reading and the meaning", () => {
    expect(DECK.check(food, writtenOf(food)).correct).toBe(true);
    expect(DECK.prompt(food)).toEqual({ text: readingOfCard(food), lang: "ja", ask: `${readingOfCard(food)}, ${food.wordMeaning}: type the word in kanji`, hint: food.wordMeaning });
  });
});

describe("unlocking and the learned set", () => {
  const learnedFirst = (n: number): SrsState => {
    const cards: Record<string, CardState> = Object.fromEntries(CARDS.slice(0, n).map((c) => [c.id, { box: UNLOCK_BOX, due: 0, reps: 3, lapses: 0 }]));
    return { decks: { [KANJI_DECK_ID]: { cards, extraGroups: 0 } } };
  };

  it("opens the next ten once the first ten are learned", () => {
    expect(unlockedGroupCount(DECK, deckState(EMPTY_SRS, DECK.id))).toBe(1);
    expect(unlockedGroupCount(DECK, deckState(learnedFirst(9), DECK.id))).toBe(1);
    expect(unlockedGroupCount(DECK, deckState(learnedFirst(10), DECK.id))).toBe(2);
  });

  it("learns kanji from the kanji decks only, at the unlock box", () => {
    const srs = learnedFirst(3);
    srs.decks[KANJI_DECK_ID].cards["何"] = { box: UNLOCK_BOX - 1, due: 0, reps: 1, lapses: 0 };
    srs.decks["hiragana-base"] = { cards: { "hiragana:あ": { box: 5, due: 0, reps: 9, lapses: 0 } }, extraGroups: 0 };
    expect([...learnedKanji(srs)]).toEqual(CARDS.slice(0, 3).map((c) => c.id));
  });

  it("covers every kanji of every lesson, grammar and dictionary line and of the date in the furigana rules", () => {
    const all = new Set(furiganaKanji());
    expect(all.size).toBe([...furiganaKanji()].length);
    const shown = [...corpusFields(), ...grammarFields()].filter((f) => f.jp && !f.quoted).flatMap((f) => [...plainOf(f.text, false)]);
    const pages = SITE_PAGES.flatMap((p) => [...plainOf(p.jp, false)]);
    for (const c of [...shown, ...DATE_KANJI, ...pages]) if (/\p{Script=Han}/u.test(c)) expect(all.has(c), c).toBe(true);
  });
});

describe("the furigana head script", () => {
  /** Runs the real script against a stub localStorage and document, and returns the CSS it wrote. */
  function run(kanji: string, stored: string | null): string {
    const head: { id?: string; textContent?: string }[] = [];
    const document = { createElement: () => ({}), head: { appendChild: (el: { id?: string; textContent?: string }) => head.push(el) } };
    new Function("localStorage", "document", furiganaScript(kanji))({ getItem: () => stored }, document);
    expect(head).toHaveLength(1);
    expect(head[0].id).toBe("furigana-new");
    return head[0].textContent ?? "";
  }
  const v2 = (cards: Record<string, Partial<CardState>>, deck = KANJI_DECK_ID) =>
    JSON.stringify({ v: srsSchema.version, data: { decks: { [deck]: { cards, extraGroups: 0 } } } });

  it("writes the same rules as furiganaCss for the learned set", () => {
    const stored = v2({ 学: { box: 3, due: 0 }, 日: { box: 2, due: 0 }, 生: { box: 3 } });
    expect(run("学生日", stored)).toBe(furiganaCss("学生日", new Set(["学"])));
  });

  it("shows every reading when nothing is stored, the data is unreadable or from a newer build, or the deck isn't a kanji deck", () => {
    const all = furiganaCss("学生", new Set());
    expect(run("学生", null)).toBe(all);
    expect(run("学生", "{not json")).toBe(all);
    expect(run("学生", JSON.stringify({ v: srsSchema.version + 1, data: { decks: { [KANJI_DECK_ID]: { cards: { 学: { box: 5 } } } } } }))).toBe(all);
    expect(run("学生", v2({ 学: { box: 5 } }, "hiragana-base"))).toBe(all);
  });

  it("handles a kanji outside the basic plane", () => {
    expect(run("𠮟生", v2({ 生: { box: 3, due: 0 } }))).toBe(furiganaCss("𠮟", new Set()));
  });
});

describe("client code", () => {
  it("keeps the kanji content and the 常用 table out of the trainer's client modules", () => {
    // Direct imports only; the build (no kanji content in out/_next/static/chunks) covers the rest.
    for (const file of ["lib/kanji-deck.ts", "components/kanji/KanjiDrill.tsx", "components/FuriganaRules.tsx", "lib/decks.ts", "components/today/TodayCard.tsx"]) {
      const src = readFileSync(file, "utf8");
      expect(src, file).not.toMatch(/^import (?!type )[^;]*?from "@\/(content\/(?!kana")|lib\/joyo|lib\/kanji-cards)/m);
    }
  });
});
