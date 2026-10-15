import { GRAMMAR_TOPICS } from "@/content/grammar";
import { KANJI } from "@/content/kanji";
import { ALL_LESSONS } from "@/content/units";
import { WORDS } from "@/content/words";
import { NON_LESSON_WORDS } from "@/content/words/expansion";
import { tableReadings } from "@/lib/joyo";
import { type IndexSources, SITE_PAGES } from "@/lib/search";

/**
 * The content the search index is built from. Build time only: it reads the 常用 table, which stays out of
 * client code (the dialog fetches the built /search-items.json instead).
 */
export function indexSources(): IndexSources {
  return {
    pages: SITE_PAGES,
    lessons: ALL_LESSONS.map((l) => ({
      href: l.href,
      title: l.lesson.title,
      summary: l.lesson.summary,
      mark: l.lesson.mark,
      unit: l.unit.title,
      kana: l.unit.slug === "hiragana" || l.unit.slug === "katakana",
    })),
    grammar: GRAMMAR_TOPICS,
    kanji: KANJI.map((k) => ({ char: k.char, meanings: k.meanings, ...(tableReadings(k.char) ?? { on: [], kun: [] }) })),
    words: WORDS,
    extra: NON_LESSON_WORDS,
  };
}
