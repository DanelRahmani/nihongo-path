import Link from "next/link";
import { Jp } from "@/components/Jp";
import { ContinueCard, LessonDoneMark, UnitProgress } from "@/components/Progress";
import { KanaDueBadge } from "@/components/kana/KanaDueBadge";
import { KANJI_NUMERALS, UNITS } from "@/content/units";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-20 sm:px-6 sm:pt-16">
      <section className="flex items-start gap-6 sm:gap-10">
        <h1
          lang="ja"
          className="tategaki shrink-0 font-serif text-5xl leading-[1.05] font-extrabold tracking-[0.12em] sm:text-7xl"
        >
          日本語<span className="text-accent">の</span>道
        </h1>
        <div className="min-w-0 pt-2">
          <p className="text-xs font-medium tracking-[0.2em] text-ink-2 uppercase">Nihongo Path</p>
          <p className="mt-3 max-w-md text-lg leading-relaxed sm:text-xl">
            Kana first, then the grammar that makes sentences work — each idea shown with example pairs you can
            compare side by side.
          </p>
          <div className="mt-5">
            <KanaDueBadge />
          </div>
        </div>
      </section>

      <section className="mt-12" aria-label="Next lesson">
        <ContinueCard />
      </section>

      <section className="mt-16" aria-labelledby="path-heading">
        <h2 id="path-heading" className="text-xs font-medium tracking-[0.2em] text-ink-2 uppercase">
          The path
        </h2>
        <ol className="mt-4">
          {UNITS.map((unit, i) => (
            <li key={unit.slug} id={unit.slug} className="scroll-mt-20 border-t border-line py-8">
              <div className="flex items-baseline gap-4">
                <span lang="ja" aria-hidden className="w-10 shrink-0 font-serif text-4xl font-bold text-accent">
                  {KANJI_NUMERALS[i]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-xl font-bold">
                      {unit.title}{" "}
                      <Jp jp={unit.titleJp} romaji={false} className="ml-1 font-serif text-base font-medium text-ink-2" />
                    </h3>
                    <UnitProgress keys={unit.lessons.map((l) => `${unit.slug}/${l.slug}`)} />
                  </div>
                  <p className="mt-1 text-sm text-ink-2">{unit.description}</p>
                  <ul className="mt-4 divide-y divide-line">
                    {unit.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link
                          href={`/learn/${unit.slug}/${lesson.slug}`}
                          className="group flex items-center gap-4 py-3"
                        >
                          <Jp
                            jp={lesson.mark}
                            romaji={false}
                            className="w-20 shrink-0 font-serif text-lg font-bold text-ink group-hover:text-accent"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium group-hover:text-accent">{lesson.title}</span>
                            <span className="block truncate text-sm text-ink-2">{lesson.summary}</span>
                          </span>
                          <LessonDoneMark lessonKey={`${unit.slug}/${lesson.slug}`} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
