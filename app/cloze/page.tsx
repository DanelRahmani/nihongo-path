import type { Metadata } from "next";
import { ClozeDrill } from "@/components/cloze/ClozeDrill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ALL_LESSONS } from "@/content/units";
import { clozeCards } from "@/lib/cloze-cards";

export const metadata: Metadata = { title: "Fill the gap" };

export default function ClozePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Spaced repetition</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">穴埋め</span> <span className="text-2xl text-ink-2">Fill the gap</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        The lessons&apos; example lines, with the highlighted part missing. Type it with a Japanese keyboard, in kanji or
        kana; the English says what the line means. A lesson&apos;s lines join once you mark it finished.
      </p>
      <div className="mt-8">
        <ClozeDrill cards={clozeCards().cards} lessons={ALL_LESSONS.map((l) => l.key)} />
      </div>
    </div>
  );
}
