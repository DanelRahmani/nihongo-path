/**
 * The deck registry: every trainer's deck, with its cards, how a card is asked and how an answer is checked.
 * Each deck is scheduled on its own (lib/srs.ts), and misses go to the mistake notebook (lib/notebook.ts).
 * Decks never import the reading texts or the corpus (tests/reading.test.ts checks this).
 */
import { DECKS as KANA_DECK_DEFS, deckCards, type Kana, type KanaGroup, type Script } from "@/content/kana";
import type { SrsDeck } from "@/lib/srs";

/** The verdict on one answer: right or not, the answer to show, and a note naming a near miss. */
export interface Check {
  correct: boolean;
  canonical: string;
  note?: string;
}

/** How a card is asked: the text to show (lesson markup) and what the reader types. */
export interface Prompt {
  text: string;
  lang: "ja" | "en";
  /** The instruction, which is also the answer box's label: "Type the romaji". */
  ask: string;
}

export interface Deck<C extends { id: string } = { id: string }> extends SrsDeck<C> {
  title: string;
  titleJp: string;
  /** The card with this id, or undefined for one this build doesn't have. */
  card(id: string): C | undefined;
  prompt(card: C): Prompt;
  check(card: C, answer: string): Check;
  /** A group's cards, for "New row unlocked: か き く け こ". */
  groupLabel(group: string): string;
}

export interface KanaDeck extends Deck<Kana> {
  script: Script;
  kanaGroup: KanaGroup;
}

/** A kana card's answer: any of its romaji spellings, ignoring case and spaces. Kana typed instead is named. */
export function checkKana(kana: Kana, answer: string): Check {
  const typed = answer.trim().toLowerCase();
  const correct = kana.romaji.includes(typed);
  const note = !correct && /[぀-ヿ]/.test(typed) ? "Type the reading in English letters (romaji), not in kana." : undefined;
  return { correct, canonical: kana.romaji[0], ...(note ? { note } : {}) };
}

export const KANA_DECKS: KanaDeck[] = KANA_DECK_DEFS.map((def) => {
  const cards = deckCards(def);
  const byId = new Map(cards.map((k) => [k.id, k]));
  return {
    id: def.id,
    title: def.title,
    titleJp: def.titleJp,
    script: def.script,
    kanaGroup: def.group,
    cards,
    groups: def.rows,
    groupOf: (k: Kana) => k.row,
    card: (id: string) => byId.get(id),
    prompt: (k: Kana): Prompt => ({ text: k.char, lang: "ja", ask: "Type the romaji" }),
    check: checkKana,
    groupLabel: (row: string) =>
      cards
        .filter((k) => k.row === row)
        .map((k) => k.char)
        .join(" "),
  };
});

/** The kana deck a kana card belongs to: hiragana-base, katakana-yoon… */
export const kanaDeckId = (k: Pick<Kana, "script" | "group">) => `${k.script}-${k.group}`;

/** Every deck by id. Later trainers (kanji, conjugation, vocabulary, cloze, register) add theirs here. */
const DECKS = new Map<string, Deck<Kana>>(KANA_DECKS.map((d) => [d.id, d]));

export const deckIds = () => [...DECKS.keys()];

/** One card, ready to ask: its prompt and its checker, with the card's own type kept inside. */
export interface AskableItem {
  deckId: string;
  cardId: string;
  prompt: Prompt;
  check(answer: string): Check;
}

/**
 * The card `cardId` of deck `deckId`, ready to ask, or null when this build has no such deck or card (a removed
 * card, or the quiz, which isn't a scheduled deck). The review queue (E7) asks notebook and due items this way.
 */
export function askItem(deckId: string, cardId: string): AskableItem | null {
  const deck = DECKS.get(deckId);
  const card = deck?.card(cardId);
  if (!deck || !card) return null;
  return { deckId, cardId, prompt: deck.prompt(card), check: (answer) => deck.check(card, answer) };
}
