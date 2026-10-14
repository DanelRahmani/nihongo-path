import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Jp, Rich } from "@/components/Jp";
import { LessonRenderer } from "@/components/lesson/LessonRenderer";
import { CompleteButton } from "@/components/Progress";
import { panelClass } from "@/components/ui/Panel";
import { ALL_LESSONS, findLesson, KANJI_NUMERALS, UNITS } from "@/content/units";
import { plainOf } from "@/lib/markup";

export const dynamicParams = false;

export function generateStaticParams() {
  return UNITS.flatMap((u) => u.lessons.map((l) => ({ unit: u.slug, lesson: l.slug })));
}

export async function generateMetadata({ params }: PageProps<"/learn/[unit]/[lesson]">): Promise<Metadata> {
  const { unit, lesson } = await params;
  const found = findLesson(unit, lesson);
  return { title: found?.lesson.title, description: found ? plainOf(found.lesson.summary, false) : undefined };
}

export default async function LessonPage({ params }: PageProps<"/learn/[unit]/[lesson]">) {
  const { unit: unitSlug, lesson: lessonSlug } = await params;
  const found = findLesson(unitSlug, lessonSlug);
  if (!found) notFound();
  const { unit, unitIndex, lesson } = found;

  const key = `${unit.slug}/${lesson.slug}`;
  const pos = ALL_LESSONS.findIndex((l) => l.key === key);
  const prev = ALL_LESSONS[pos - 1];
  const next = ALL_LESSONS[pos + 1];

  return (
    <article className="mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6 sm:pt-12">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
        <Link
          href={`/#${unit.slug}`}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-paper-2 px-3 transition-colors duration-150 hover:bg-accent-soft hover:text-accent"
        >
          <span aria-hidden>←</span>
          <span lang="ja" className="font-serif">
            第{KANJI_NUMERALS[unitIndex]}章
          </span>
          · {unit.title}
        </Link>
        <span className="tabular-nums">Lesson {ALL_LESSONS[pos].number}</span>
      </nav>

      <header className="mt-8 flex items-start gap-5 sm:gap-8">
        <Jp
          jp={lesson.mark}
          romaji={false}
          inspect={false}
          className="tategaki shrink-0 border-r-2 border-accent pr-3 font-serif text-5xl leading-none font-extrabold text-accent sm:pr-5 sm:text-6xl"
        />
        <div className="min-w-0 pt-1">
          <h1 className="text-3xl leading-tight font-bold text-balance sm:text-4xl">{lesson.title}</h1>
          <Rich text={lesson.summary} className="mt-3 block text-lg leading-relaxed text-ink-2" />
        </div>
      </header>

      <LessonRenderer blocks={lesson.blocks} lessonKey={key} />

      <footer className="mt-16 border-t border-line pt-10">
        <CompleteButton lessonKey={key} />
        <p className="mt-6 text-xs leading-relaxed text-ink-2">Checked against: {lesson.source}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
          {prev ? (
            <Link
              href={prev.href}
              className={panelClass("surface", "group p-4 transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:shadow-lift")}
            >
              <span className="text-ink-2">← {prev.number}</span>
              <span className="mt-1 block font-medium group-hover:text-accent">{prev.lesson.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={next.href}
              className={panelClass(
                "surface",
                "group p-4 text-right transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:shadow-lift",
              )}
            >
              <span className="text-ink-2">{next.number} →</span>
              <span className="mt-1 block font-medium group-hover:text-accent">{next.lesson.title}</span>
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}
