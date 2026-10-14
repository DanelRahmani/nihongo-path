import { ALL_LESSONS } from "@/content/units";

/** A line to copy: the lesson's markup (highlight braces removed), its English and its lesson. */
export interface TypeLine {
  jp: string;
  en: string;
  lesson: string;
}

/**
 * The lines the "Type it" game offers: every example, alt and dialogue line of the lessons after the kana units,
 * in path order, each line once. Build time only; never reads the reading texts or the corpus.
 */
export function typeLines(): TypeLine[] {
  const seen = new Set<string>();
  return ALL_LESSONS.filter(({ lesson }) => lesson.register !== "neutral").flatMap(({ key, lesson }) =>
    lesson.blocks.flatMap((b) => {
      const items = b.type === "examples" ? b.items : b.type === "dialogue" ? b.lines : [];
      return items.flatMap((i) => [i.jp, ...(i.alt ? [i.alt] : [])].map((jp) => ({ jp: jp.replace(/[{}]/g, ""), en: i.en, lesson: key })));
    }),
  ).filter((line) => !seen.has(line.jp) && !!seen.add(line.jp));
}
