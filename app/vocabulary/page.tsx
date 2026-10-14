import type { Metadata } from "next";
import { VocabDrill } from "@/components/vocab/VocabDrill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ALL_LESSONS } from "@/content/units";
import { vocabCards } from "@/lib/vocab-cards";

export const metadata: Metadata = { title: "Vocabulary" };

/** Every lesson, in path order. */
const PATH = ALL_LESSONS.map((l) => l.key);

export default function VocabularyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Spaced repetition</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">単語</span> <span className="text-2xl text-ink-2">Vocabulary</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        See the English, type the Japanese with a Japanese keyboard. Kanji or kana both count. A lesson&apos;s words join
        once you mark it finished.
      </p>
      <div className="mt-8">
        <VocabDrill cards={vocabCards(PATH)} lessons={PATH} />
      </div>
    </div>
  );
}
