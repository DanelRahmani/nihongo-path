import type { Metadata } from "next";
import Link from "next/link";
import { KanjiDrill } from "@/components/kanji/KanjiDrill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { kanjiCards } from "@/lib/kanji-cards";

export const metadata: Metadata = { title: "Kanji cards" };

export default function KanjiDrillPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Spaced repetition</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">漢字</span> <span className="text-2xl text-ink-2">Kanji cards</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Each card gives a word&apos;s reading and meaning. Type the reading with a Japanese keyboard and choose the kanji
        spelling it offers. Ten kanji at a time, the most used first; the next ten open once you know these.
      </p>
      <p className="mt-3 text-sm text-ink-2">
        With <strong className="font-medium text-ink">Furigana on new kanji</strong> (in <span lang="ja">表示</span> Display), readings
        disappear from the kanji you learn here. Kana practice is in the{" "}
        <Link href="/kana#drill" className="link-inline">
          kana drill
        </Link>
        .
      </p>
      <div className="mt-8">
        <KanjiDrill cards={kanjiCards()} />
      </div>
    </div>
  );
}
