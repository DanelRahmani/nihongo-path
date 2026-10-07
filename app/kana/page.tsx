import type { Metadata } from "next";
import { KanaChart } from "@/components/kana/KanaChart";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Kana charts" };

export default function KanaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>Charts</Eyebrow>
          <h1 className="mt-2 font-serif text-4xl font-bold">
            <span lang="ja">かな</span> <span className="text-2xl text-ink-2">Kana</span>
          </h1>
        </div>
        <ButtonLink href="/kana/drill">Drill kana</ButtonLink>
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
