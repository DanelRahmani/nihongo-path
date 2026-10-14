/**
 * Askers for the notebook items that don't belong to a scheduled deck: lesson quiz questions and conjugation
 * questions. Each turns a card id back into a question, or null when this build no longer has it. Pure; the data
 * comes from /review-data.json.
 */
import type { QuizQuestion } from "@/content/types";
import { checkConjugation, conjugate, formLabel, formLesson, formsOf, type TrainerWord } from "@/lib/conjugation-trainer";
import type { AskableItem } from "@/lib/decks";
import { plainOf } from "@/lib/markup";
import { CONJUGATION_DECK, QUIZ_DECK } from "@/lib/notebook";
import { checkQuestion } from "@/lib/quiz";
import type { Asker } from "@/lib/review-queue";

/** A lesson quiz question with its notebook id (lib/notebook.ts quizCardId) and its lesson ("unit/lesson"). */
export interface QuizEntry extends QuizQuestion {
  id: string;
  lesson: string;
}

/** Each lesson's title and link, for an item's source. */
export type LessonLinks = Record<string, { title: string; href: string }>;

/** A prompt as a screen reader should hear it: no markup brackets or emphasis stars. */
const spoken = (markup: string) => plainOf(markup.replace(/\*+/g, ""), false);

export function quizAsker(entries: QuizEntry[], lessons: LessonLinks): Asker {
  const byId = new Map(entries.map((e) => [e.id, e]));
  return (cardId) => {
    const q = byId.get(cardId);
    if (!q) return null;
    const item: AskableItem = {
      deckId: QUIZ_DECK,
      cardId,
      prompt: { text: q.prompt, lang: "en", ask: spoken(q.prompt), answerIn: q.answerIn ?? "ja" },
      check: (answer) => {
        const r = checkQuestion(q, answer);
        return { correct: r.correct, canonical: r.answer, ...(r.note ? { note: r.note } : {}) };
      },
      explain: q.explanation,
      ...(lessons[q.lesson] ? { source: lessons[q.lesson] } : {}),
      ...(q.answerIn ? {} : { answerJp: q.answers[0] }),
    };
    return item;
  };
}

export function conjugationAsker(words: TrainerWord[], lessons: LessonLinks): Asker {
  const byJp = new Map(words.map((w) => [w.jp, w]));
  return (cardId) => {
    const at = cardId.lastIndexOf("#");
    const word = byJp.get(cardId.slice(0, at));
    const form = cardId.slice(at + 1);
    if (!word || !formsOf(word).includes(form)) return null;
    const c = conjugate(word, form);
    if (!c.ok) return null;
    return {
      deckId: CONJUGATION_DECK,
      cardId,
      prompt: { text: word.jp, lang: "ja", ask: `The ${formLabel(word, form)} of ${word.meaning}`, hint: `${word.meaning} → ${formLabel(word, form)}` },
      check: (answer) => checkConjugation({ word, form }, answer),
      answerJp: c.jp,
      ...(lessons[formLesson(word, form)] ? { source: lessons[formLesson(word, form)] } : {}),
    };
  };
}
