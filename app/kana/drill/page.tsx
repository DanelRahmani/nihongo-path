import type { Metadata } from "next";
import Link from "next/link";
import { KanaDrill } from "@/components/kana/KanaDrill";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Kana drill" };

export default function DrillPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Spaced repetition</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">練習</span> <span className="text-2xl text-ink-2">Kana drill</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        See a kana, type how it sounds. Cards you miss come back sooner, and a new row opens once you know the current
        ones.
      </p>
      <p className="mt-3 text-sm text-ink-2">
        Ready for more? The{" "}
        <Link href="/kanji/drill" className="text-accent hover:underline">
          kanji cards
        </Link>
        , the{" "}
        <Link href="/vocabulary" className="text-accent hover:underline">
          vocabulary deck
        </Link>
        , the{" "}
        <Link href="/cloze" className="text-accent hover:underline">
          fill-the-gap lines
        </Link>
        , the{" "}
        <Link href="/register" className="text-accent hover:underline">
          polite and casual drill
        </Link>{" "}
        and the{" "}
        <Link href="/conjugation" className="text-accent hover:underline">
          conjugation trainer
        </Link>{" "}
        are answered with a Japanese keyboard.
      </p>
      <div className="mt-8">
        <KanaDrill />
      </div>
    </div>
  );
}
