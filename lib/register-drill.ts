/**
 * The polite ↔ casual drill (E6): two decks, one per direction, built from the lessons' alternative-register
 * lines. The learner converts a whole sentence; punctuation and spaces are ignored, the engine's variants and the
 * reviewed alternatives count (食べません or 食べない です), and a wrong answer says where it first parts from the
 * line, by the lesson's own word boundaries. The cards are data (RegisterCard), built at build time by lib/register-cards.ts. Pure.
 */
import type { Check, Deck } from "@/lib/decks";
import { plainOf } from "@/lib/markup";
import { CASUAL_DECK_ID, POLITE_DECK_ID } from "@/lib/notebook";
import { acceptedForms, checkAnswer, normalizeAnswer } from "@/lib/quiz";

export { CASUAL_DECK_ID, POLITE_DECK_ID } from "@/lib/notebook";

/** to: the register the learner converts into. */
export type Direction = "casual" | "polite";

export interface RegisterCard {
  /** "unit/lesson#hash" of the source line. */
  id: string;
  /** The line to convert, in markup (highlight braces removed). */
  from: string;
  /** The lesson's line in the other register, the answer, in markup. */
  to: string;
  /** The same answer with the engine's variants swapped in ([食|た]べない です for [食|た]べません). */
  also: string[];
  en: string;
  /** The lesson ("unit/lesson"): the card joins when it is marked done. */
  lesson: string;
}

/** A line's words by the lesson's word spaces, as markup; a name joined with "-" stays one word. */
export function wordsOf(jp: string): string[] {
  return jp.split(/\s+/).filter(Boolean);
}

/** Where a typed line first parts from the expected one, by the expected line's word spaces. */
export type Difference =
  /** The expected word at `index` isn't there; `typed` is what the answer has at that point (may be empty). */
  | { word: string; index: number; typed: string }
  /** Every expected word is there, in order, with `extra` left over at the end. */
  | { extra: string };

const noPunctuation = (s: string) => s.replace(/[。、？！]/g, "");

/**
 * Where `typed` first parts from `expected`, read left to right by the expected line's words; null when they
 * match. Each word counts in kanji or kana (as quiz answers do); punctuation and spaces in either are ignored.
 */
export function diffFirstWord(expected: string, typed: string): Difference | null {
  let rest = normalizeAnswer(typed);
  const words = wordsOf(expected);
  for (let i = 0; i < words.length; i++) {
    const forms = acceptedForms(words[i]).filter(Boolean);
    // A word that is all punctuation (？ alone) has no forms: nothing to match.
    if (!forms.length) continue;
    const hit = forms.filter((f) => rest.startsWith(f)).sort((a, b) => b.length - a.length)[0];
    if (hit === undefined) return { word: noPunctuation(plainOf(words[i], false)), index: i, typed: rest };
    rest = rest.slice(hit.length);
  }
  return rest ? { extra: rest } : null;
}

/**
 * Right: the lesson's line, an engine variant or a reviewed alternative. Wrong: the line given, unchanged, is
 * named; otherwise the note says where the answer parts from the accepted line it follows furthest: a word
 * missing, a word that differs, or something extra at the end.
 */
export function checkRegister(card: RegisterCard, answer: string, direction: Direction): Check {
  const canonical = plainOf(card.to, false);
  const result = checkAnswer([card.to, ...card.also], answer);
  if (result.correct) return { correct: true, canonical };
  if (checkAnswer([card.from], answer).correct) return { correct: false, canonical, note: `That's the line as given: say it ${direction === "casual" ? "casually" : "politely"}.` };
  if (result.note) return { correct: false, canonical, note: result.note };
  // The accepted line the answer follows furthest; the lesson's own line on a tie.
  const diffs = [card.to, ...card.also].map((line) => ({ line, diff: diffFirstWord(line, answer) }));
  const reach = (d: Difference | null) => (d === null ? Infinity : "extra" in d ? 1e6 : d.index);
  const { line, diff } = diffs.reduce((best, d) => (reach(d.diff) > reach(best.diff) ? d : best));
  if (!diff) return { correct: true, canonical };
  if ("extra" in diff) return { correct: false, canonical, note: `Every word is there, with ${noPunctuation(diff.extra)} extra at the end.` };
  const next = wordsOf(line)[diff.index + 1];
  const missing = next && acceptedForms(next).some((f) => f && diff.typed.startsWith(f));
  return { correct: false, canonical, note: missing ? `${diff.word} is missing.` : `Expected ${diff.word}${diff.typed ? `; yours has ${noPunctuation(diff.typed)}` : ""}.` };
}

/** Markup without the lesson's highlight braces: the drill shows the plain line. */
export const unhighlighted = (jp: string) => jp.replace(/[{}]/g, "");

/** One direction's deck: groups are lessons in path order (`lessons`), each card open once its lesson is done. */
export function registerDeck(direction: Direction, cards: RegisterCard[], lessons: string[], done: ReadonlySet<string>): Deck<RegisterCard> {
  const byId = new Map(cards.map((c) => [c.id, c]));
  const used = new Set(cards.map((c) => c.lesson));
  return {
    id: direction === "casual" ? CASUAL_DECK_ID : POLITE_DECK_ID,
    title: direction === "casual" ? "Polite to casual" : "Casual to polite",
    titleJp: direction === "casual" ? "普通体へ" : "丁寧体へ",
    cards,
    groups: lessons.filter((l) => used.has(l)),
    groupOf: (c) => c.lesson,
    isOpen: (c) => done.has(c.lesson),
    card: (id) => byId.get(id),
    prompt: (c) => ({
      text: c.from,
      lang: "ja",
      ask: `Say it ${direction === "casual" ? "casually" : "politely"}: ${plainOf(c.from, false)} (${c.en})`,
      hint: `${c.en} Say it ${direction === "casual" ? "casually" : "politely"}.`,
    }),
    answerJp: (c) => c.to,
    check: (c, answer) => checkRegister(c, answer, direction),
    groupLabel: (lesson) => lesson,
  };
}
