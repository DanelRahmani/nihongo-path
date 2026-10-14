import type { Block, Jp } from "@/content/types";
import { ALL_LESSONS } from "@/content/units";
import { NAMES, WORDS } from "@/content/words";
import { buildIndex, lineWords, resolveWord } from "@/lib/words";

/** Words the lessons use in one fixed form only, which the trainers don't ask: ござる appears only as ございます. */
export const FIXED_FORM = new Set(["ござる"]);

/** The Japanese lines of a lesson's examples, pairs and dialogue, alternative registers included. */
function lessonLines(blocks: Block[]): Jp[] {
  return blocks
    .flatMap((b): (Jp | undefined)[] => {
      if (b.type === "examples") return b.items.flatMap((ex) => [ex.jp, ex.alt]);
      if (b.type === "pair") return [b.a.jp, b.a.alt, b.b.jp, b.b.alt];
      if (b.type === "dialogue") return b.lines.flatMap((l) => [l.jp, l.alt]);
      return [];
    })
    .filter((l): l is Jp => l !== undefined);
}

/**
 * For each lesson word (by its markup), every lesson, in path order, whose examples, pairs or dialogue use it in
 * some form. Not counted: the kana lessons (their words are reading practice, and a kana like {す}き would read as
 * the stem of すく) and a word inside another (お願い doesn't teach 願う). Words only in prose, tables or quizzes
 * have none. Build time only; it reads the lessons through lib/words.ts, never through lib/corpus.ts.
 */
export function wordLessons(): Map<Jp, string[]> {
  const ix = buildIndex(WORDS, NAMES);
  const lessons = new Map<Jp, string[]>();
  for (const { key, lesson } of ALL_LESSONS) {
    if (lesson.register === "neutral") continue;
    for (const line of lessonLines(lesson.blocks)) {
      for (const w of lineWords(line)) {
        const r = resolveWord(w, ix);
        if (!r || (r.how !== "entry" && r.how !== "form")) continue;
        const list = lessons.get(r.word.jp) ?? [];
        if (!list.includes(key)) lessons.set(r.word.jp, [...list, key]);
      }
    }
  }
  return lessons;
}
