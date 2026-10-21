/**
 * Every deck and asker built from /review-data.json: the review queue asks with them, and the progress export
 * describes each item with them. Pure.
 */
import { clozeDeck } from "@/lib/cloze-deck";
import type { ItemText } from "@/lib/export";
import { plainOf } from "@/lib/markup";
import { type AskableItem, type Deck, KANA_DECKS } from "@/lib/decks";
import { kanjiDeck } from "@/lib/kanji-deck";
import { CONJUGATION_DECK, QUIZ_DECK } from "@/lib/notebook";
import { registerDeck } from "@/lib/register-drill";
import { conjugationAsker, quizAsker } from "@/lib/review-askers";
import type { ReviewData } from "@/lib/review-data";
import { askFrom, type Asker } from "@/lib/review-queue";
import { type VocabCard, vocabDeck, vocabMoreDeck } from "@/lib/vocab-deck";

export interface ReviewDecks {
  decks: Deck[];
  /** Askers for the notebook's unscheduled items: lesson quiz and conjugation questions. */
  askers: Record<string, Asker>;
  /** Each deck's title, for an item's label. */
  titles: Record<string, string>;
}

/**
 * Only studied cards and notebook items are asked, so no deck needs the reader's finished lessons. Studied "More
 * words" cards are included whatever the switch says now.
 */
export function reviewDecks(data: ReviewData, more: VocabCard[]): ReviewDecks {
  const path = Object.keys(data.lessons);
  const none = new Set<string>();
  const decks: Deck[] = [
    ...KANA_DECKS,
    kanjiDeck(data.kanji),
    vocabDeck(data.vocab, path, none),
    clozeDeck(data.cloze, path, none),
    registerDeck("casual", data.register.casual, path, none),
    registerDeck("polite", data.register.polite, path, none),
    vocabMoreDeck(more, true),
  ];
  const askers = { [QUIZ_DECK]: quizAsker(data.quiz, data.lessons), [CONJUGATION_DECK]: conjugationAsker(data.conjugation, data.lessons) };
  const titles = { ...Object.fromEntries(decks.map((d) => [d.id, d.title])), [QUIZ_DECK]: "Lesson quiz", [CONJUGATION_DECK]: "Conjugation" };
  return { decks, askers, titles };
}

/** Any item of any deck, ready to ask, or null when this build doesn't have it. */
export function askAny({ decks, askers }: ReviewDecks): (deck: string, card: string) => AskableItem | null {
  const byId = new Map(decks.map((d) => [d.id, d]));
  return (deckId, cardId) => {
    const deck = byId.get(deckId);
    if (deck) return askFrom(deck, cardId);
    return askers[deckId]?.(cardId) ?? null;
  };
}

/** Markup as plain text: no ruby brackets or emphasis stars. */
const plain = (markup: string) => plainOf(markup.replace(/\*+/g, ""), false);

/**
 * Each item's prompt and answer as plain text, its deck's title and its lesson, for the progress export. With no
 * decks (the data didn't load), only Type it lines, whose card is the line itself, are described.
 */
export function describeItems(rd: ReviewDecks | null): (deck: string, card: string) => ItemText | null {
  const ask = rd ? askAny(rd) : null;
  return (deck, card) => {
    if (deck === "type") return { deckTitle: "Type it", prompt: plain(card), expected: plain(card), lessonId: null };
    const item = ask?.(deck, card);
    if (!item) return null;
    let expected = item.answerJp ? plain(item.answerJp) : "";
    if (!expected) {
      try {
        expected = item.check("").canonical;
      } catch {
        // A checker that needs an answer: leave the expected answer empty.
      }
    }
    const href = item.source?.href ?? "";
    return {
      deckTitle: rd?.titles[deck] ?? deck,
      prompt: plain(item.prompt.text) + (item.prompt.hint ? ` (${plain(item.prompt.hint)})` : ""),
      expected,
      lessonId: href.startsWith("/learn/") ? href.slice("/learn/".length) : null,
    };
  };
}
