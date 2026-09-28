import { waVsGa } from "@/content/lessons/particles/wa-vs-ga";
import type { Lesson, Unit } from "@/content/types";

/** The curriculum, in learning order. */
export const UNITS: Unit[] = [
  {
    slug: "particles",
    title: "Particles",
    titleJp: "[助詞|じょし]",
    description: "The little words that give every other word its job.",
    lessons: [waVsGa],
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
}

/** Every lesson in order, for prev/next links and "continue" on the dashboard. */
export const ALL_LESSONS: LessonRef[] = UNITS.flatMap((unit) =>
  unit.lessons.map((lesson) => ({
    unit,
    lesson,
    key: `${unit.slug}/${lesson.slug}`,
    href: `/learn/${unit.slug}/${lesson.slug}`,
  })),
);

/** Unit numbers as kanji numerals: the path is a real sequence. */
export const KANJI_NUMERALS = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
