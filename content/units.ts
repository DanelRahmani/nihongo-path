import { basics } from "@/content/lessons/basics";
import { hiragana } from "@/content/lessons/hiragana";
import { katakana } from "@/content/lessons/katakana";
import { particles } from "@/content/lessons/particles";
import type { Lesson, Unit } from "@/content/types";

/** The curriculum, in learning order. */
export const UNITS: Unit[] = [
  {
    slug: "start",
    kind: "basics",
    title: "Start here",
    titleJp: "[入門|にゅうもん]",
    description: "How Japanese is written, and the two ways every sentence can end.",
    lessons: basics,
  },
  {
    slug: "hiragana",
    kind: "kana",
    title: "Hiragana",
    titleJp: "ひらがな",
    description: "The core script: every sentence needs it.",
    lessons: hiragana,
  },
  {
    slug: "katakana",
    kind: "kana",
    title: "Katakana",
    titleJp: "カタカナ",
    description: "Same sounds, sharper shapes — for foreign words and names.",
    lessons: katakana,
  },
  {
    slug: "particles",
    kind: "particles",
    title: "Particles",
    titleJp: "[助詞|じょし]",
    description: "The little words that give every other word its job.",
    lessons: particles,
  },
];

export function findLesson(unitSlug: string, lessonSlug: string) {
  const unitIndex = UNITS.findIndex((u) => u.slug === unitSlug);
  const unit = UNITS[unitIndex];
  const lesson = unit?.lessons.find((l) => l.slug === lessonSlug);
  if (!unit || !lesson) return null;
  return { unit, unitIndex, lesson };
}

export interface LessonRef {
  unit: Unit;
  lesson: Lesson;
  key: string;
  href: string;
  /** "unit.lesson" number, e.g. "4.3". */
  number: string;
}

/** Every lesson in order, for numbering, prev/next links and "continue" on the dashboard. */
export const ALL_LESSONS: LessonRef[] = UNITS.flatMap((unit, u) =>
  unit.lessons.map((lesson, l) => ({
    unit,
    lesson,
    key: `${unit.slug}/${lesson.slug}`,
    href: `/learn/${unit.slug}/${lesson.slug}`,
    number: `${u}.${l + 1}`,
  })),
);

/** Unit numbers as kanji numerals: the path is a real sequence. */
export const KANJI_NUMERALS = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
