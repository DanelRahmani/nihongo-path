import { GRAMMAR_TOPICS } from "@/content/grammar";
import { KANJI } from "@/content/kanji";
import { ALL_LESSONS } from "@/content/units";
import { WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { tableReadings } from "@/lib/joyo";
import { buildSearchIndex, SITE_PAGES } from "@/lib/search";

/** Static JSON for the search dialog, requested only when the reader opens it. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(
    buildSearchIndex({
      pages: SITE_PAGES,
      lessons: ALL_LESSONS.map((l) => ({ href: l.href, title: l.lesson.title, summary: l.lesson.summary, mark: l.lesson.mark, unit: l.unit.title })),
      grammar: GRAMMAR_TOPICS,
      kanji: KANJI.map((k) => ({ char: k.char, meanings: k.meanings, ...(tableReadings(k.char) ?? { on: [], kun: [] }) })),
      words: WORDS,
      extra: EXTRA_WORDS,
    }),
  );
}
