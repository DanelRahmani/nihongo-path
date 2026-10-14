/**
 * The kanji cards (E2): Anki-style cards answered through the Japanese keyboard. A card shows a word's reading and
 * meaning; the learner types the reading and picks the kanji spelling their keyboard offers. Only the reviewed
 * written form counts. Cards come in groups of 10, each opening when the earlier ones are learned (box ≥ 3).
 *
 * The cards are data (KanjiCard), built at build time by lib/kanji-cards.ts and handed to the page, so this
 * module, which the client loads, holds no content. Pure.
 */
import type { Check, Deck } from "@/lib/decks";
import { plainOf, readingOf } from "@/lib/markup";
import { deckState, type SrsState, UNLOCK_BOX } from "@/lib/srs";

/** Kanji per group. */
export const GROUP_SIZE = 10;

/**
 * The lesson kanji, most used first. Jonathan Waller's N5 and N4 lists will replace this set (see CLAUDE.md,
 * Waiting on the owner); learned kanji are counted across every deck whose id starts with "kanji".
 */
export const KANJI_DECK_ID = "kanji-lesson";

export interface KanjiCard {
  /** The kanji itself. */
  id: string;
  /** The kanji's meanings, for the answer side. */
  meanings: string[];
  /** The example word in lesson markup: [食|た]べる. Its written form and reading come from it (writtenOf, readingOfCard). */
  word: string;
  /** The word's meaning, for the question side, with any Japanese in it in kana (no kanji to give the answer away). */
  wordMeaning: string;
  group: string;
}

/** A card's answer, 食べる, and its question, たべる. */
export const writtenOf = (card: KanjiCard) => plainOf(card.word, false);
export const readingOfCard = (card: KanjiCard) => readingOf(card.word, false);

const toHiragana = (s: string) => [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");

/** As typed, with width folded and spaces and final punctuation dropped: "　食べる。" → 食べる. */
const clean = (s: string) => s.normalize("NFKC").replace(/[\s。、.,!?！？]/g, "");

/**
 * The answer must be the reviewed written form. A near miss is named: the reading in kana (the kanji spelling
 * wasn't chosen), romaji (a Japanese keyboard is needed), digits for a kanji numeral (5月 for 五月), another
 * spelling that keeps the card's kanji (子ども for 子供), or another kanji for the same reading.
 */
export function checkKanji(card: KanjiCard, answer: string): Check {
  const typed = clean(answer);
  const canonical = writtenOf(card);
  if (typed === canonical) return { correct: true, canonical };
  let note: string | undefined;
  if (typed && toHiragana(typed) === toHiragana(readingOfCard(card))) {
    note = "That's the reading in kana. Choose the kanji spelling from your keyboard's list.";
  } else if (/^[a-z'-]+$/i.test(typed)) {
    note = "Type it with a Japanese keyboard, then choose the kanji spelling.";
  } else if (/[0-9]/.test(typed)) {
    note = "Choose the spelling with the kanji numeral, not digits.";
  } else if (typed.includes(card.id)) {
    note = `Another spelling. These cards use ${canonical}.`;
  } else if (/\p{Script=Han}/u.test(typed)) {
    note = "Not this spelling: look for the kanji that means this.";
  }
  return { correct: false, canonical, ...(note ? { note } : {}) };
}

/** The kanji deck for these cards, in their order, in groups of GROUP_SIZE. */
export function kanjiDeck(cards: KanjiCard[], id = KANJI_DECK_ID): Deck<KanjiCard> {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const groups = [...new Set(cards.map((c) => c.group))];
  return {
    id,
    title: "Kanji · lesson kanji",
    titleJp: "漢字",
    cards,
    groups,
    groupOf: (c) => c.group,
    card: (cardId) => byId.get(cardId),
    prompt: (c) => ({ text: readingOfCard(c), lang: "ja", ask: `${readingOfCard(c)}, ${c.wordMeaning}: type the word in kanji` }),
    check: checkKanji,
    groupLabel: (group) =>
      cards
        .filter((c) => c.group === group)
        .map((c) => c.id)
        .join(" "),
  };
}

/** The kanji learned in the kanji decks (box ≥ UNLOCK_BOX), which "furigana on new kanji" leaves bare. */
export function learnedKanji(srs: SrsState): Set<string> {
  const learned = new Set<string>();
  for (const id of Object.keys(srs.decks)) {
    if (!id.startsWith("kanji")) continue;
    for (const [char, card] of Object.entries(deckState(srs, id).cards)) if (card.box >= UNLOCK_BOX) learned.add(char);
  }
  return learned;
}
