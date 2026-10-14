/**
 * The cloze deck (E5): every highlighted example line becomes a fill-the-gap card, with the English as a hint.
 * The highlighted words are the answer; alternatives count only from reviewed data (the engine's variants of a
 * conjugated form). A card joins when its lesson is marked done. The cards are data (ClozeCard), built at build
 * time by lib/cloze-cards.ts. Pure.
 */
import type { Check, Deck } from "@/lib/decks";
import { plainOf } from "@/lib/markup";
import { CLOZE_DECK_ID } from "@/lib/notebook";
import { acceptedForms, checkAnswer, normalizeAnswer } from "@/lib/quiz";

export { CLOZE_DECK_ID } from "@/lib/notebook";

/** What stands in for the gap in the line shown. */
export const GAP = "＿＿";

export interface ClozeCard {
  /** "unit/lesson#hash" of the line (lib/cloze-cards.ts). */
  id: string;
  /** The line in lesson markup with the highlight replaced by GAP: [学生|がくせい] ＿＿。 */
  line: string;
  /** The highlighted words in markup, the answer: です. */
  answer: string;
  /** Other answers that count, in markup: the engine's variants of a conjugated form (ないです for ません). */
  also: string[];
  /** The line's English, the hint. */
  en: string;
  /** The line's register, named when the gap holds the line's final predicate, so the gap has one answer (む or みます). */
  register?: "polite" | "casual";
  /** The word part just before a gap that is a word's ending, in markup: [飲|の] of [飲|の]＿＿. */
  stem?: string;
  /** The line's lesson ("unit/lesson"): the card joins when it is marked done. */
  lesson: string;
}

/**
 * The answer or one of its reviewed alternatives, with the quiz checker's rules and notes. Typing the word part
 * already shown (飲みます for 飲＿＿) is named.
 */
export function checkCloze(card: ClozeCard, answer: string): Check {
  const result = checkAnswer([card.answer, ...card.also], answer);
  const canonical = plainOf(card.answer, false);
  if (result.correct) return { correct: true, canonical };
  if (card.stem) {
    const typed = normalizeAnswer(answer);
    const stem = acceptedForms(card.stem).find((f) => f && typed.startsWith(f));
    if (stem && checkAnswer([card.answer, ...card.also], typed.slice(stem.length)).correct) {
      return { correct: false, canonical, note: `Type only the missing part: ${canonical}.` };
    }
  }
  return { correct: false, canonical, ...(result.note ? { note: result.note } : {}) };
}

/** The cloze deck: groups are lessons in path order (`lessons`), each card open once its lesson is done. */
export function clozeDeck(cards: ClozeCard[], lessons: string[], done: ReadonlySet<string>): Deck<ClozeCard> {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const used = new Set(cards.map((c) => c.lesson));
  return {
    id: CLOZE_DECK_ID,
    title: "Fill the gap",
    titleJp: "穴埋め",
    cards,
    groups: lessons.filter((l) => used.has(l)),
    groupOf: (c) => c.lesson,
    isOpen: (c) => done.has(c.lesson),
    card: (id) => byId.get(id),
    prompt: (c) => ({
      text: c.line,
      lang: "ja",
      ask: `Fill the blank${c.register ? `, ${c.register}` : ""}: ${plainOf(c.line, false).replace(GAP, " blank ")} (${c.en})`,
    }),
    check: checkCloze,
    groupLabel: (lesson) => lesson,
  };
}
