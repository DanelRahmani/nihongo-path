import { KanaDueBadge } from "@/components/kana/KanaDueBadge";
import { PathBrowser, type PathUnit } from "@/components/PathBrowser";
import { ContinueCard } from "@/components/Progress";
import { ALL_LESSONS, KANJI_NUMERALS, UNITS } from "@/content/units";

export default function Home() {
  // Only what the path needs is sent to the browser, not full lesson content.
  const units: PathUnit[] = UNITS.map((unit, i) => ({
    slug: unit.slug,
    kind: unit.kind,
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
        <ContinueCard lessons={continueLessons} />
      </section>

      <section className="mt-16" aria-labelledby="path-heading">
        <PathBrowser units={units} />
      </section>
    </div>
  );
}
