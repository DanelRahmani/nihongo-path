import { execSync } from "node:child_process";
import type { Metadata } from "next";
import { DataBackup } from "@/components/data/DataBackup";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GRAMMAR_TOPICS } from "@/content/grammar";
import { UNITS } from "@/content/units";
import { type ExportLesson, lineKey } from "@/lib/export";
import { plainOf } from "@/lib/markup";
import { typeLines } from "@/lib/type-lines";

export const metadata: Metadata = { title: "Your data" };

/** The commit this build came from: Vercel's, else the local checkout's, else the package version. */
function appVersion(): string {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA;
  if (sha) return sha.slice(0, 7);
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "0.1.0";
  }
}

/** Every lesson, for the export's lesson list: built here so the page doesn't ship the lessons. */
const LESSONS: ExportLesson[] = UNITS.flatMap((unit, index) =>
  unit.lessons.map((l) => ({
    id: `${unit.slug}/${l.slug}`,
    slug: l.slug,
    stage: { index, slug: unit.slug, title: unit.title },
    title: plainOf(l.title, false),
    jlptLevel: l.jlpt?.level ?? null,
  })),
);

/** Type it lines' lessons by line key: the export names a line's lesson without the page shipping the lines. */
const TYPE_LESSONS: Record<string, string> = Object.fromEntries(typeLines().map((l) => [lineKey(l.jp), l.lesson]));

/** Each lesson's grammar topic, for lessons that have exactly one. */
const LESSON_TOPICS: Record<string, string> = Object.fromEntries(
  Object.entries(Object.groupBy(GRAMMAR_TOPICS, (t) => t.lesson))
    .filter(([, topics]) => topics?.length === 1)
    .map(([lesson, topics]) => [lesson, topics![0].slug]),
);

export default function DataPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Backup and restore</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">記録</span> <span className="text-2xl text-ink-2">Your data</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Your progress lives only in this browser: nothing is sent anywhere. Export it to a file to keep a copy, to move it to
        another device or browser, or to analyse your study history elsewhere.
      </p>
      <div className="mt-8">
        <DataBackup lessons={LESSONS} appVersion={appVersion()} typeLessons={TYPE_LESSONS} lessonTopics={LESSON_TOPICS} />
      </div>
    </div>
  );
}
