"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL_LESSONS } from "@/content/units";
import { progressStore } from "@/lib/stores";
import { useStore } from "@/lib/storage";

/** The red seal for a finished lesson: 済 means "done". */
export function Hanko({ size = "md", animate = false }: { size?: "sm" | "md" | "lg"; animate?: boolean }) {
  const cls = { sm: "size-7 text-sm", md: "size-10 text-lg", lg: "size-16 text-3xl" }[size];
  return (
    <span lang="ja" aria-label="Done" className={`hanko ${cls} ${animate ? "hanko-stamp" : ""}`}>
      済
    </span>
  );
}

export function LessonDoneMark({ lessonKey }: { lessonKey: string }) {
  const [progress] = useStore(progressStore);
  return progress[lessonKey] ? <Hanko size="sm" /> : <span className="size-7 rounded-full border border-dashed border-line" />;
}

export function CompleteButton({ lessonKey }: { lessonKey: string }) {
  const [progress, setProgress] = useStore(progressStore);
  const [justStamped, setJustStamped] = useState(false);
  const done = Boolean(progress[lessonKey]);

  const toggle = () => {
    setJustStamped(!done);
    setProgress((p) => {
      const next = { ...p };
      if (done) delete next[lessonKey];
      else next[lessonKey] = true;
      return next;
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={toggle}
        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
          done ? "border border-line text-ink-2 hover:border-ink-2" : "bg-accent text-on-accent hover:opacity-90"
        }`}
      >
        {done ? "Mark as not done" : "Mark lesson as done"}
      </button>
      {done && <Hanko size="lg" animate={justStamped} />}
    </div>
  );
}

/** Dashboard hero: the first lesson not yet done. */
export function ContinueCard() {
  const [progress] = useStore(progressStore);
  const next = ALL_LESSONS.find((l) => !progress[l.key]);
  const doneCount = ALL_LESSONS.filter((l) => progress[l.key]).length;

  if (!next) {
    return (
      <div className="flex items-center gap-4">
        <Hanko size="lg" />
        <p className="text-lg">Every lesson is stamped. Keep your kana sharp in the drill.</p>
      </div>
    );
  }

  return (
    <Link
      href={next.href}
      className="group flex items-center gap-5 rounded-2xl border border-line p-5 transition-colors hover:border-accent sm:p-6"
    >
      <span lang="ja" className="font-serif text-4xl font-bold text-accent sm:text-5xl">
        {next.lesson.mark.replace(/\[([^|]+)\|[^\]]+\]/g, "$1")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium tracking-[0.18em] text-ink-2 uppercase">
          {doneCount === 0 ? "Start here" : "Continue"} · Lesson {next.number} · {next.unit.title}
        </span>
        <span className="mt-1 block text-xl font-bold group-hover:text-accent">{next.lesson.title}</span>
        <span className="mt-1 block text-sm text-ink-2">{next.lesson.summary}</span>
      </span>
      <span aria-hidden className="text-2xl text-accent transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function UnitProgress({ keys }: { keys: string[] }) {
  const [progress] = useStore(progressStore);
  const done = keys.filter((k) => progress[k]).length;
  return (
    <span className="text-xs text-ink-2 tabular-nums">
      {done}/{keys.length}
    </span>
  );
}
