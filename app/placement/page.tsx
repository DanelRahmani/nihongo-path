import type { Metadata } from "next";
import { PlacementCheck } from "@/components/placement/PlacementCheck";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { kanaLessons, placementBands, questionLessonTitles } from "@/lib/placement-bands";

export const metadata: Metadata = { title: "Placement check" };

export default function PlacementPage() {
  const bands = placementBands();
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Already know some Japanese?</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">実力</span> <span className="text-2xl text-ink-2">Placement check</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        A few questions from the lesson quizzes find where on the path to start. The kana units
        aren&apos;t asked: every question is written in kana, so answering them shows you can read it.
      </p>
      <div className="mt-8">
        <PlacementCheck bands={bands} kanaLessons={kanaLessons()} lessonTitles={questionLessonTitles(bands)} />
      </div>
    </div>
  );
}
