import Link from "next/link";
import { PathBrowser, type PathUnit } from "@/components/PathBrowser";
import { PlacementLink } from "@/components/placement/PlacementLink";
import { ContinueCard } from "@/components/Progress";
import { TodayCard } from "@/components/today/TodayCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { panelClass } from "@/components/ui/Panel";
import { ALL_LESSONS, KANJI_NUMERALS, UNITS } from "@/content/units";

const REFERENCE = [
  { href: "/grammar", jp: "文法", title: "Grammar overview", text: "Particles, grammar and verb forms on one page." },
  { href: "/dictionary", jp: "辞書", title: "Dictionary", text: "Every word, by kanji, kana, romaji or English." },
  { href: "/read", jp: "読む", title: "Reading", text: "A sign, a menu, a chat, a story and haiku." },
];

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
        </div>
      </section>

      <section className="mt-14" aria-labelledby="today-heading">
        <TodayCard />
      </section>

      <section className="mt-8" aria-label="Next lesson">
        <ContinueCard lessons={continueLessons} />
        <PlacementLink />
      </section>

      <section className="mt-20" aria-labelledby="path-heading">
        <PathBrowser units={units} />
      </section>

      <section className="mt-16" aria-labelledby="reference-heading">
        <Eyebrow as="h2" id="reference-heading">
          Reference
        </Eyebrow>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {REFERENCE.map((r) => (
            <Link key={r.href} href={r.href} className={panelClass("surface", "flex items-center gap-4 p-5 transition-colors duration-150 hover:border-accent")}>
              <span lang="ja" aria-hidden className="font-serif text-3xl font-bold text-accent">
                {r.jp}
              </span>
              <span className="min-w-0">
                <span className="block font-bold">{r.title}</span>
                <span className="block text-sm text-ink-2">{r.text}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
