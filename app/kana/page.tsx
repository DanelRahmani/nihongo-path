import type { Metadata } from "next";
import Link from "next/link";
import { KanaChart } from "@/components/kana/KanaChart";
import { KanaDrill } from "@/components/kana/KanaDrill";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Kana" };

export default function KanaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Hiragana and katakana</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">かな</span> <span className="text-2xl text-ink-2">Kana</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Drill the kana with spaced repetition, and look them up in the{" "}
        <a href="#charts" className="link-inline">
          charts
        </a>{" "}
        below. The other drills are in the <span lang="ja">練習</span> Practice menu; most are typed with a Japanese
        keyboard (
        <Link href="/keyboard" className="link-inline">
          set one up
        </Link>
        ), but the kana drill is answered in English letters.
      </p>

      <section id="drill" aria-labelledby="drill-heading" className="mt-10 scroll-mt-4">
        <h2 id="drill-heading" className="font-serif text-2xl font-bold">
          Drill
        </h2>
        <p className="mt-2 leading-relaxed text-ink-2">
          See a kana, type how it sounds. Cards you miss come back sooner, and a new row opens once you know the current
          ones.
        </p>
        <div className="mt-6">
          <KanaDrill />
        </div>
      </section>

      <section id="charts" aria-labelledby="charts-heading" className="mt-16 scroll-mt-4">
        <h2 id="charts-heading" className="font-serif text-2xl font-bold">
          Charts
        </h2>
        <p className="mt-2 leading-relaxed text-ink-2">
          Read the grid across: each row is one consonant with the five vowels. A red dot marks a kana you&apos;ve learned in
          the drill.
        </p>
        <div className="mt-6">
          <KanaChart />
        </div>
      </section>
    </div>
  );
}
