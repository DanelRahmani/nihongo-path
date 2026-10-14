import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Jp } from "@/components/Jp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { panelClass } from "@/components/ui/Panel";
import { KANJI } from "@/content/kanji";
import { tableReadings } from "@/lib/joyo";
import { kunLabel } from "@/lib/lookup";
import { readingOf } from "@/lib/markup";

const BY_CHAR = new Map(KANJI.map((kanji) => [kanji.char, kanji]));

export function generateStaticParams() {
  // Next 16's development server compares request paths before decoding them
  // when `output: "export"` is enabled. The production export uses the real
  // character, while development needs the URL segment form to exercise it.
  if (process.env.NODE_ENV === "development") return KANJI.map(({ char }) => ({ char: encodeURIComponent(char) }));
  return KANJI.map(({ char }) => ({ char }));
}

function routeKanji(value: string) {
  let decoded = value;
  try {
    while (decoded.includes("%")) {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    }
  } catch {
    // A malformed % escape: not a kanji, so the page 404s.
  }
  return decoded;
}

export async function generateMetadata({ params }: PageProps<"/kanji/[char]">): Promise<Metadata> {
  const { char: routeChar } = await params;
  const char = routeKanji(routeChar);
  const kanji = BY_CHAR.get(char);
  return { title: kanji ? `${char} — ${kanji.meanings[0]}` : "Kanji" };
}

export default async function KanjiPage({ params }: PageProps<"/kanji/[char]">) {
  const { char: routeChar } = await params;
  const char = routeKanji(routeChar);
  const kanji = BY_CHAR.get(char);
  if (!kanji) notFound();

  const table = tableReadings(char) ?? { on: [], kun: [], special: [] };
  const groups = [
    { name: "On", hint: "from Chinese, in katakana", readings: table.on.map((r) => ({ text: r, special: table.special.includes(r) })) },
    { name: "Kun", hint: "Japanese, in hiragana; okurigana in brackets", readings: table.kun.map((r) => ({ text: kunLabel(r), special: table.special.includes(r.replace(".", "")) })) },
  ].filter((g) => g.readings.length);
  const anySpecial = groups.some((g) => g.readings.some((r) => r.special));
  return (
    <article className="mx-auto max-w-2xl px-4 pt-8 pb-24 sm:px-6 sm:pt-12">
      <Link href="/" className="inline-flex h-8 items-center rounded-full bg-paper-2 px-3 text-sm text-ink-2 transition-colors hover:bg-accent-soft hover:text-accent">
        ← Path
      </Link>

      <header className="mt-9 flex items-start gap-6 sm:gap-8">
        <div lang="ja" className="grid size-28 shrink-0 place-items-center rounded-card bg-accent-soft font-jp text-6xl text-accent sm:size-36 sm:text-7xl">
          {kanji.char}
        </div>
        <div className="min-w-0 pt-2">
          <Eyebrow>Kanji</Eyebrow>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{kanji.meanings.join(" · ")}</h1>
          <p className="mt-3 text-ink-2">{kanji.strokes} strokes</p>
        </div>
      </header>

      <section className="mt-12" aria-labelledby="readings-heading">
        <Eyebrow as="h2" id="readings-heading">Readings</Eyebrow>
        {groups.length > 0 && <dl className={panelClass("surface", "mt-4 divide-y divide-line")}>
          {groups.map((g) => (
            <div key={g.name} className="px-5 py-4 sm:px-6">
              <dt className="text-sm text-ink-2">
                <span className="font-medium text-ink">{g.name}</span> · {g.hint}
              </dt>
              <dd lang="ja" className="mt-2 flex flex-wrap gap-2 font-jp text-xl">
                {g.readings.map((r) => (
                  <span key={r.text} className={r.special ? "rounded-lg border border-dashed border-line-strong px-3 py-1 text-ink-2" : "rounded-lg bg-paper-2 px-3 py-1"}>
                    {r.text}
                    {r.special && <span className="sr-only"> (special use)</span>}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>}
        {anySpecial && <p className="mt-3 text-sm text-ink-2">Dashed: a reading the <span lang="ja">常用漢字表</span> marks for special or narrow use.</p>}
      </section>

      <section className="mt-12" aria-labelledby="examples-heading">
        <Eyebrow as="h2" id="examples-heading">Example words</Eyebrow>
        <div className={panelClass("surface", "mt-4 divide-y divide-line")}>
          {kanji.examples.map((example) => (
            <div key={example} className="px-5 py-5 sm:px-6">
              <Jp jp={example.replace(/\[(?!!)/g, "[!")} className="font-jp text-2xl font-medium leading-relaxed" />
              <p lang="ja" className="mt-1 text-sm text-ink-2">{readingOf(example)}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-12 text-xs leading-relaxed text-ink-2">
        Readings from the <span lang="ja">常用漢字表</span> (2010). Meanings and stroke counts derived from KANJIDIC2 © EDRDG, licensed CC BY-SA 4.0.
      </p>
    </article>
  );
}
