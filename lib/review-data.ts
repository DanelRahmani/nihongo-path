import { ALL_LESSONS } from "@/content/units";
import { clozeCards } from "@/lib/cloze-cards";
import type { ClozeCard } from "@/lib/cloze-deck";
import type { TrainerWord } from "@/lib/conjugation-trainer";
import { trainerWords } from "@/lib/conjugation-words";
import { kanjiCards } from "@/lib/kanji-cards";
import type { KanjiCard } from "@/lib/kanji-deck";
import { conjugate, formsOf, questionId } from "@/lib/conjugation-trainer";
import { KANA_DECKS } from "@/lib/decks";
import { KANJI_DECK_ID } from "@/lib/kanji-deck";
import { plainOf } from "@/lib/markup";
import { CASUAL_DECK_ID, CLOZE_DECK_ID, CONJUGATION_DECK, POLITE_DECK_ID, QUIZ_DECK, quizCardId, VOCAB_DECK_ID } from "@/lib/notebook";
import type { Direction, RegisterCard } from "@/lib/register-drill";
import { registerCards } from "@/lib/register-cards";
import type { LessonLinks, QuizEntry } from "@/lib/review-askers";
import { vocabCards } from "@/lib/vocab-cards";
import type { VocabCard } from "@/lib/vocab-deck";

/**
 * Everything the review page needs to ask any item: every deck's cards, the trainer's words, the quizzes and the
 * lessons' titles. The review asks only studied cards and notebook items, so the lists of lessons that open a card
 * (vocabulary, conjugation) are left out.
 */
export interface ReviewData {
  lessons: LessonLinks;
  kanji: KanjiCard[];
  vocab: VocabCard[];
  cloze: ClozeCard[];
  register: Record<Direction, RegisterCard[]>;
  conjugation: TrainerWord[];
  quiz: QuizEntry[];
}

/** Built at build time for /review-data.json. Server only; never imports the reading texts or the corpus. */
export function reviewData(): ReviewData {
  const path = ALL_LESSONS.map((l) => l.key);
  return {
    lessons: Object.fromEntries(ALL_LESSONS.map((l) => [l.key, { title: plainOf(l.lesson.title, false), href: l.href }])),
    kanji: kanjiCards(),
    vocab: vocabCards(path).map((c) => ({ ...c, lessons: [] })),
    cloze: clozeCards().cards,
    register: registerCards(),
    conjugation: trainerWords().map((w) => ({ ...w, lessons: [] })),
    quiz: quizEntries(),
  };
}

/** Every lesson quiz question, with its notebook id and lesson. */
export function quizEntries(): QuizEntry[] {
  return ALL_LESSONS.flatMap(({ key, lesson }) =>
    lesson.blocks.flatMap((b) => (b.type === "quiz" ? b.questions.map((q) => ({ ...q, id: quizCardId(key, q.prompt), lesson: key })) : [])),
  );
}

/**
 * The card ids this build can ask, by deck (scheduled decks, the quiz, the conjugation questions), for the home
 * page's review count (/review-ids.json): a stale id in the stores then isn't counted.
 */
export function reviewIds(): Record<string, string[]> {
  const path = ALL_LESSONS.map((l) => l.key);
  const register = registerCards();
  const words = trainerWords();
  return {
    ...Object.fromEntries(KANA_DECKS.map((d) => [d.id, d.cards.map((c) => c.id)])),
    [KANJI_DECK_ID]: kanjiCards().map((c) => c.id),
    [VOCAB_DECK_ID]: vocabCards(path).map((c) => c.id),
    [CLOZE_DECK_ID]: clozeCards().cards.map((c) => c.id),
    [CASUAL_DECK_ID]: register.casual.map((c) => c.id),
    [POLITE_DECK_ID]: register.polite.map((c) => c.id),
    [QUIZ_DECK]: quizEntries().map((q) => q.id),
    [CONJUGATION_DECK]: words.flatMap((word) => formsOf(word).filter((form) => conjugate(word, form).ok).map((form) => questionId({ word, form }))),
  };
}
