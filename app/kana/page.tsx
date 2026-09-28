import type { Metadata } from "next";
import Link from "next/link";
import { KanaChart } from "@/components/kana/KanaChart";

export const metadata: Metadata = { title: "Kana charts" };

export default function KanaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-ink-2 uppercase">Charts</p>
          <h1 className="mt-2 font-serif text-4xl font-bold">
            <span lang="ja">かな</span> <span className="text-2xl text-ink-2">Kana</span>
          </h1>
        </div>
        <Link
          href="/kana/drill"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
        >
          Drill kana
        </Link>
      </div>
      <p className="mt-4 leading-relaxed text-ink-2">
        A red dot marks a kana you&apos;ve learned in the drill. Read the grid across: each row is one consonant with the five vowels.
      </p>
      <div className="mt-8">
        <KanaChart />
      </div>
    </div>
  );
}
