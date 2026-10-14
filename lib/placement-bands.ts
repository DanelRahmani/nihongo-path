import { UNITS } from "@/content/units";
import type { Band, PlacementQuestion } from "@/lib/placement";

/** Units the check leaves out: kana is learned by reading it, and the kana drill places itself. */
const SKIPPED = new Set(["hiragana", "katakana"]);

/**
 * The questions, picked by hand per unit as "lesson#quiz index": each tests the unit's core (は and が, に and で,
 * the forms) without its prompt giving the answer away, and accepts the answers a learner would type. Pinned in
 * tests/placement.test.ts, so reordering a lesson quiz can't change them silently.
 */
export const PICKS: Record<string, string[]> = {
  start: ["polite-and-casual#0", "polite-and-casual#2"],
  "word-order": ["topic-comment#1", "modifiers-first#2"],
  particles: ["wa-vs-ga#0", "ni-vs-de#1"],
  grammar: ["na-adjectives#0", "kosoado#0"],
  verbs: ["te-form#0", "nai-form#2"],
  suffixes: ["name-suffixes#1", "titles#0"],
  culture: ["uchi-soto#0", "soft-refusals#0"],
};

/** The placement bands, built at build time from the units and the picked quiz questions. Server only. */
export function placementBands(): Band[] {
  return UNITS.filter((u) => !SKIPPED.has(u.slug)).map((unit) => ({
    unit: unit.slug,
    title: unit.title,
    lessons: unit.lessons.map((l) => `${unit.slug}/${l.slug}`),
    questions: (PICKS[unit.slug] ?? []).map((pick): PlacementQuestion => {
      const [slug, index] = pick.split("#");
      const lesson = unit.lessons.find((l) => l.slug === slug);
      const quiz = lesson?.blocks.find((b) => b.type === "quiz");
      const q = quiz?.type === "quiz" ? quiz.questions[Number(index)] : undefined;
      if (!q) throw new Error(`No placement question ${unit.slug}/${pick}`);
      return { ...q, lesson: `${unit.slug}/${slug}` };
    }),
  }));
}

/** The kana units' lessons, which a reader who answered the check can read. */
export function kanaLessons(): string[] {
  return UNITS.filter((u) => SKIPPED.has(u.slug)).flatMap((u) => u.lessons.map((l) => `${u.slug}/${l.slug}`));
}

/** The titles of the lessons the check's questions come from, for the result's links. */
export function questionLessonTitles(bands: Band[]): Record<string, string> {
  const wanted = new Set(bands.flatMap((b) => b.questions.map((q) => q.lesson)));
  return Object.fromEntries(
    UNITS.flatMap((u) => u.lessons.map((l) => [`${u.slug}/${l.slug}`, l.title] as const)).filter(([key]) => wanted.has(key)),
  );
}
