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
        <Link href="/kanji/drill" className="link-inline">
          kanji cards
        </Link>
        , the{" "}
        <Link href="/vocabulary" className="link-inline">
          vocabulary deck
        </Link>
        , the{" "}
        <Link href="/cloze" className="link-inline">
          fill-the-gap lines
        </Link>
        , the{" "}
        <Link href="/register" className="link-inline">
          polite and casual drill
        </Link>{" "}
        and the{" "}
        <Link href="/conjugation" className="link-inline">
          conjugation trainer
        </Link>{" "}
        are answered with a Japanese keyboard. To get used to the keyboard itself,{" "}
        <Link href="/type" className="link-inline">
          type out lesson lines
        </Link>
        .
      </p>
      <div className="mt-8">
        <KanaDrill />
      </div>
    </div>
  );
}
