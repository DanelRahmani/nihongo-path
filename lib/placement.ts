/**
 * The placement check (E8): two questions per band, a band being a unit (the kana units left out), taken from
 * the lesson quizzes. The first band with two misses is where to start; a single miss is a slip. Pure.
 */
import type { QuizQuestion } from "@/content/types";

/** Questions per band, and the misses in one band that place the reader there. */
export const PER_BAND = 2;

export interface PlacementQuestion extends QuizQuestion {
  /** The lesson ("unit/lesson") the question comes from. */
  lesson: string;
}

export interface Band {
  unit: string;
  title: string;
  /** The unit's lessons ("unit/lesson"), in path order: the ones to mark finished when the reader places past it. */
  lessons: string[];
  questions: PlacementQuestion[];
}

/**
 * Where to start, from each band's answers so far (true = right), in band order. The first band with PER_BAND
 * misses is the start; null when no band has (every band passed, or the check isn't finished). `done` says the
 * check can stop: a band placed the reader, or every question is answered.
 */
export function placement(bands: Band[], answers: boolean[][]): { start: number | null; done: boolean } {
  for (let i = 0; i < bands.length; i++) {
    const own = answers[i] ?? [];
    if (own.filter((a) => !a).length >= PER_BAND) return { start: i, done: true };
    if (own.length < bands[i].questions.length) return { start: null, done: false };
  }
  return { start: null, done: true };
}

/** The lessons to mark finished when the reader starts at band `start` (every lesson of the bands before it). */
export function lessonsBefore(bands: Band[], start: number | null): string[] {
  return bands.slice(0, start ?? bands.length).flatMap((b) => b.lessons);
}
