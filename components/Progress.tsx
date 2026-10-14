"use client";

import Link from "next/link";
import { useState } from "react";
import { Jp, Rich } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { panelClass } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { progressStore } from "@/lib/stores";
import { useStore } from "@/lib/storage";

/** The red seal for a finished lesson: 済 means "done". */
export function Hanko({ size = "md", animate = false }: { size?: "sm" | "md" | "lg"; animate?: boolean }) {
  const cls = { sm: "size-7 shrink-0 text-sm", md: "size-10 text-lg", lg: "size-16 text-3xl" }[size];
  return (
    <span lang="ja" role="img" aria-label="Done" className={`hanko ${cls} ${animate ? "hanko-stamp" : ""}`}>
      済
    </span>
  );
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
    <div className="flex min-h-16 items-center gap-5">
      <Button variant={done ? "secondary" : "primary"} size="lg" onClick={toggle}>
        {done ? "Mark as not done" : "Mark lesson as done"}
      </Button>
      {done && <Hanko size="lg" animate={justStamped} />}
    </div>
  );
}

export interface ContinueLesson {
  key: string;
  href: string;
  number: string;
  title: string;
  mark: string;
  summary: string;
  unitTitle: string;
}

/** Dashboard hero: the first lesson not yet done, and how far along the path the reader is. */
export function ContinueCard({ lessons }: { lessons: ContinueLesson[] }) {
  const [progress] = useStore(progressStore);
  const next = lessons.find((l) => !progress[l.key]);
  const doneCount = lessons.filter((l) => progress[l.key]).length;

  if (!next) {
    return (
      <div className={panelClass("tint", "flex items-center gap-5 p-6")}>
        <Hanko size="lg" />
        <p className="text-lg">Every lesson is stamped. Keep your kana sharp in the drill.</p>
      </div>
    );
  }

  return (
    <Link
      href={next.href}
      className={panelClass(
        "surface",
        "group block p-5 transition-[box-shadow,transform,border-color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift sm:p-6",
      )}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent-soft sm:size-24">
          <Jp jp={next.mark} romaji={false} inspect={false} className="font-serif text-2xl font-bold text-accent sm:text-4xl" />
        </span>
        <div className="min-w-0 flex-1">
          <Eyebrow>
            {doneCount === 0 ? "First lesson" : "Up next"} · {next.number} · {next.unitTitle}
          </Eyebrow>
          <span className="mt-1.5 block text-lg leading-snug font-bold text-balance group-hover:text-accent sm:text-xl">
            {next.title}
          </span>
          <Rich text={next.summary} className="mt-1 hidden text-sm text-ink-2 sm:block" />
        </div>
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-lg text-on-accent transition-transform duration-200 ease-soft group-hover:translate-x-1"
        >
          →
        </span>
      </div>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <ProgressBar value={doneCount} max={lessons.length} className="flex-1" />
        <span className="shrink-0 text-xs text-ink-2 tabular-nums">
          {doneCount} of {lessons.length} lessons
        </span>
      </div>
    </Link>
  );
}
