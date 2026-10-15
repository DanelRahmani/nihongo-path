/**
 * The vocabulary deck (E4): Anki-style cards from English to typed Japanese. The learner types with a Japanese
 * keyboard and picks the spelling; the reviewed kanji form and the kana reading both count, width is ignored, and
 * the note says which form they entered. A card joins when a lesson that uses its word is marked done.
 * The cards are data (VocabCard), built at build time by lib/vocab-cards.ts. Pure.
 */
import type { Check, Deck } from "@/lib/decks";
import { plainOf, readingOf } from "@/lib/markup";
import { VOCAB_DECK_ID, VOCAB_MORE_DECK_ID } from "@/lib/notebook";
import { checkAnswer, normalizeAnswer } from "@/lib/quiz";

export { VOCAB_DECK_ID, VOCAB_MORE_DECK_ID } from "@/lib/notebook";

/** "More words" cards come in groups of this many, in frequency order. */
export const MORE_GROUP_SIZE = 50;

export interface VocabCard {
  /** The lesson deck: the dictionary entry id (written markup#pos, lib/dictionary.ts), as My words uses. More words: the JMdict id. */
  id: string;
  /** The word in lesson markup: [食|た]べる. */
  jp: string;
  /** The question: the English meaning, without any Japanese in it. */
  meaning: string;
  /** The part of speech, shown on the front: "adjective", "adverb"… (empty for plain nouns). */
  pos: string;
  /**
   * Other words that count, in markup: the same word's other reading (何 なん), lesson words with the same
   * meaning, and reviewed near-synonyms (多い, たくさん).
   */
  also: string[];
  /**
   * More words only: lesson words with the card's main sense (its first sense without brackets), which the learner
   * may type for it. Named, but not counted: the senses can differ (食う is rough; かかる and 撮る both "take").
   */
  near?: string[];
  /** Other spellings that count, as typed: 子ども, 1つ, ありがとうございます. */
  spellings: string[];
  /** Every lesson ("unit/lesson") whose lines use the word, in path order: the card joins when one is marked done. */
  lessons: string[];
  /** The first of them, the card's place in the deck. */
  group: string;
}

/**
 * The reviewed form (kanji or kana, or the two mixed as the markup allows) counts, and so does a word in `also`.
 * The note says which form was typed: the reading in kana for a word usually written in kanji, or the other
 * word with the same meaning. Wrong answers keep the quiz checker's notes (katakana typed in hiragana, romaji).
 */
export function checkVocab(card: VocabCard, answer: string): Check {
  const canonical = plainOf(card.jp, false);
  const reading = readingOf(card.jp, false);
  const result = checkAnswer([card.jp, ...card.spellings], answer);
  if (result.correct) {
    const kanaOnly = normalizeAnswer(answer) === normalizeAnswer(reading) && canonical !== reading;
    return kanaOnly ? { correct: true, canonical, note: `In kana: it's usually written ${canonical}.` } : { correct: true, canonical };
  }
  const other = card.also.find((jp) => checkAnswer([jp], answer).correct);
  if (other) {
    const otherWritten = plainOf(other, false);
    return otherWritten === canonical
      ? { correct: true, canonical, note: `${readingOf(other, false)} is the other reading of ${canonical}.` }
      : { correct: true, canonical, note: `${otherWritten} means this too. This card's word is ${canonical}.` };
  }
  const near = card.near?.find((jp) => checkAnswer([jp], answer).correct);
  if (near) return { correct: false, canonical, note: `${plainOf(near, false)} also means that, but this card asks for ${canonical}: the meaning's note tells them apart.` };
  // A katakana spelling of a kanji word: name its spelling, not "hiragana".
  if (result.note?.includes("written in hiragana") && /\p{Script=Han}/u.test(canonical)) {
    return { correct: false, canonical, note: `Same sound: it's written ${canonical} (${reading}).` };
  }
  if (result.note) return { correct: false, canonical, note: result.note };
  // 食べます for 食べる: a form of the word, not the word.
  const stem = canonical.slice(0, -1);
  if ((card.pos === "verb" || card.pos === "adjective") && stem && /[ぁ-ゖ]$/.test(canonical) && normalizeAnswer(answer).startsWith(stem) && normalizeAnswer(answer) !== canonical) {
    return { correct: false, canonical, note: `That's a form of the word: type its dictionary form, ${canonical}.` };
  }
  return { correct: false, canonical };
}

/** The vocabulary deck for these cards, its groups in path order (`lessons`); a card opens with any of its lessons. */
export function vocabDeck(cards: VocabCard[], lessons: string[], done: ReadonlySet<string>): Deck<VocabCard> {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const used = new Set(cards.map((c) => c.group));
  return {
    id: VOCAB_DECK_ID,
    title: "Vocabulary",
    titleJp: "単語",
    cards,
    groups: lessons.filter((l) => used.has(l)),
    groupOf: (c) => c.group,
    isOpen: (c) => c.lessons.some((l) => done.has(l)),
    card: (id) => byId.get(id),
    prompt: (c) => ({ text: c.meaning, lang: "en", ask: `${c.meaning}: type it in Japanese`, ...(c.pos ? { hint: c.pos } : {}) }),
    answerJp: (c) => c.jp,
    check: checkVocab,
    groupLabel: (group) =>
      cards
        .filter((c) => c.group === group)
        .map((c) => plainOf(c.jp, false))
        .join(" "),
  };
}

/**
 * "More words" (I6): the expansion's words as cards, most frequent first, in groups of 50. Off until the learner
 * turns it on; then every card is open, and new ones wait while 10 studied cards are still below box 3, as in the
 * lesson deck. The review always asks its due cards (`enabled` true there), whatever the switch says now.
 */
export function vocabMoreDeck(cards: VocabCard[], enabled: boolean): Deck<VocabCard> {
  const byId = new Map(cards.map((c) => [c.id, c]));
  return {
    id: VOCAB_MORE_DECK_ID,
    title: "More words",
    titleJp: "語彙",
    cards,
    groups: [...new Set(cards.map((c) => c.group))],
    groupOf: (c) => c.group,
    isOpen: () => enabled,
    practiceStudied: true,
    card: (id) => byId.get(id),
    prompt: (c) => ({ text: c.meaning, lang: "en", ask: `${c.meaning}: type it in Japanese`, ...(c.pos ? { hint: c.pos } : {}) }),
    answerJp: (c) => c.jp,
    check: checkVocab,
    groupLabel: (group) => `words ${(Number(group) - 1) * MORE_GROUP_SIZE + 1}–${Math.min(Number(group) * MORE_GROUP_SIZE, cards.length)}`,
  };
}

/** A "More words" card as /vocab-more.json carries it: empty lists and the group (worked out from the order) left out. */
export type PackedMoreCard = [id: string, jp: string, meaning: string, pos: string, also?: string[], near?: string[]];

export function packMoreCards(cards: VocabCard[]): PackedMoreCard[] {
  return cards.map((c): PackedMoreCard => {
    if (c.near?.length) return [c.id, c.jp, c.meaning, c.pos, c.also, c.near];
    return c.also.length ? [c.id, c.jp, c.meaning, c.pos, c.also] : [c.id, c.jp, c.meaning, c.pos];
  });
}

/** The cards back from their packed form, in the same order and groups of 50 as lib/vocab-more-cards.ts. */
export function unpackMoreCards(packed: PackedMoreCard[]): VocabCard[] {
  return packed.map(([id, jp, meaning, pos, also = [], near], i) => ({
    id,
    jp,
    meaning,
    pos,
    also,
    ...(near ? { near } : {}),
    spellings: [],
    lessons: [],
    group: String(Math.floor(i / MORE_GROUP_SIZE) + 1),
  }));
}
