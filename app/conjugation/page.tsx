import type { Metadata } from "next";
import { ConjugationTrainer } from "@/components/conjugation/ConjugationTrainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ALL_LESSONS } from "@/content/units";
import { trainerWords } from "@/lib/conjugation-words";
import { plainOf } from "@/lib/markup";

export const metadata: Metadata = { title: "Conjugation" };

export default function ConjugationPage() {
  // Each lesson's title and link, for the form links and the "finish this lesson" hint.
  const lessons = Object.fromEntries(ALL_LESSONS.map((l) => [l.key, { title: plainOf(l.lesson.title, false), href: l.href }]));
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Practice</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">活用</span> <span className="text-2xl text-ink-2">Conjugation</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        One verb or adjective, one form: type it with a Japanese keyboard, in kanji or kana. Forms open as you finish the
        lessons that teach them, and words as you meet them in the lessons.
      </p>
      <div className="mt-8">
        <ConjugationTrainer words={trainerWords()} lessons={lessons} />
      </div>
    </div>
  );
}
