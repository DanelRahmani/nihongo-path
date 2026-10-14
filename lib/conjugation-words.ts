import { WORDS } from "@/content/words";
import type { TrainerWord } from "@/lib/conjugation-trainer";
import { plainOf } from "@/lib/markup";
import { FIXED_FORM, wordLessons } from "@/lib/word-lessons";

/**
 * Words not asked at all: the auxiliary おく (only after a て form: [考|かんが]えて おく) and 結構, which the
 * lessons use only in the set phrase 結構です (no, thank you).
 */
const NOT_ASKED = new Set(["おく", "[結構|けっこう]"]);

/**
 * The verbs and adjectives the trainer asks, each with every lesson whose examples, pairs or dialogue use it (in
 * any form), in path order. A word no lesson line uses isn't asked. Build time only: the page hands the result to
 * the trainer.
 */
export function trainerWords(): TrainerWord[] {
  const used = wordLessons();
  return WORDS.flatMap((w): TrainerWord[] => {
    const lessons = used.get(w.jp);
    const meaning = plainOf(w.meaning, false);
    if (!lessons || FIXED_FORM.has(w.jp) || NOT_ASKED.has(w.jp)) return [];
    if (w.pos === "verb" && w.verb) return [{ kind: "verb", jp: w.jp, meaning, cls: w.verb, lessons }];
    if (w.pos === "i-adj" || w.pos === "na-adj") return [{ kind: "adjective", jp: w.jp, meaning, cls: w.pos === "i-adj" ? "i" : "na", lessons }];
    return [];
  });
}
