import { KanaDueBadge } from "@/components/kana/KanaDueBadge";
import { PathBrowser, type PathUnit } from "@/components/PathBrowser";
import { ContinueCard } from "@/components/Progress";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ALL_LESSONS, KANJI_NUMERALS, UNITS } from "@/content/units";

export default function Home() {
  // Only what the path needs is sent to the browser, not full lesson content.
  const units: PathUnit[] = UNITS.map((unit, i) => ({
    slug: unit.slug,
    numeral: KANJI_NUMERALS[i],
    title: unit.title,
    titleJp: unit.titleJp,
    description: unit.description,
    lessons: ALL_LESSONS.filter((l) => l.unit.slug === unit.slug).map((l) => ({
      key: l.key,
      href: l.href,
      number: l.number,
      title: l.lesson.title,
      mark: l.lesson.mark,
      summary: l.lesson.summary,
    })),
  }));

  const continueLessons = units.flatMap((u) => u.lessons.map((l) => ({ ...l, unitTitle: u.title })));

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-24 sm:px-6 sm:pt-16">
      <section className="relative flex items-start gap-6 sm:gap-12">
        <span aria-hidden className="sun -top-16 -left-24 size-80 sm:-left-32 sm:size-[28rem]" />
        <h1
          lang="ja"
          className="tategaki relative shrink-0 font-serif text-5xl leading-[1.05] font-extrabold tracking-[0.12em] sm:text-7xl"
        >
          日本語<span className="text-accent">の</span>道
        </h1>
        <div className="relative min-w-0 pt-2">
          <Eyebrow>Nihongo Path</Eyebrow>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-pretty sm:text-2xl sm:leading-snug">
            Kana first, then the grammar that makes sentences work, each idea shown with example pairs you can compare
            side by side.
          </p>
          <div className="mt-6">
            <KanaDueBadge />
          </div>
        </div>
      </section>

      <section className="mt-14" aria-label="Next lesson">
        <ContinueCard lessons={continueLessons} />
      </section>

      <section className="mt-20" aria-labelledby="path-heading">
        <PathBrowser units={units} />
      </section>
    </div>
  );
}
