"use client";

import Link from "next/link";
import { Jp, Rich } from "@/components/Jp";
import { Hanko } from "@/components/Progress";
import { KINDS, type LessonKind } from "@/content/types";
import { useStore } from "@/lib/storage";
import { pathFilterStore, progressStore } from "@/lib/stores";

export interface PathLesson {
  key: string;
  href: string;
  number: string;
  title: string;
  mark: string;
  summary: string;
}

export interface PathUnit {
  slug: string;
  kind: LessonKind;
  numeral: string;
  title: string;
  titleJp: string;
  description: string;
  lessons: PathLesson[];
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active ? "border-accent bg-accent text-on-accent" : "border-line text-ink-2 hover:border-ink-2 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export function PathBrowser({ units }: { units: PathUnit[] }) {
  const [filter, setFilter] = useStore(pathFilterStore);
  const [progress] = useStore(progressStore);
  const kinds = KINDS.filter((k) => units.some((u) => u.kind === k.kind));
  const total = units.reduce((n, u) => n + u.lessons.length, 0);
  const done = units.reduce((n, u) => n + u.lessons.filter((l) => progress[l.key]).length, 0);

  const visible = units
    .filter((u) => filter.kind === "all" || u.kind === filter.kind)
    .map((u) => ({ ...u, lessons: filter.hideDone ? u.lessons.filter((l) => !progress[l.key]) : u.lessons }))
    .filter((u) => u.lessons.length > 0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="path-heading" className="text-xs font-medium tracking-[0.2em] text-ink-2 uppercase">
          The path · <span className="tabular-nums">{done}/{total}</span> done
        </h2>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-2">
          <input
            type="checkbox"
            checked={filter.hideDone}
            onChange={(e) => setFilter((f) => ({ ...f, hideDone: e.target.checked }))}
            className="size-4 accent-[var(--accent)]"
          />
          Hide finished lessons
        </label>
      </div>

      <div
        role="group"
        aria-label="Filter by lesson type"
        className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        <Chip active={filter.kind === "all"} onClick={() => setFilter((f) => ({ ...f, kind: "all" }))}>
          All
        </Chip>
        {kinds.map((k) => (
          <Chip key={k.kind} active={filter.kind === k.kind} onClick={() => setFilter((f) => ({ ...f, kind: k.kind }))}>
            {k.label}
          </Chip>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-line p-8 text-center text-ink-2">
          Every lesson here is finished. Untick “Hide finished lessons” to review them.
        </p>
      )}

      <ol className="mt-6">
        {visible.map((unit) => (
          <li key={unit.slug} id={unit.slug} className="scroll-mt-20 border-t border-line py-8">
            <div className="flex items-baseline gap-4">
              <span lang="ja" aria-hidden className="w-10 shrink-0 font-serif text-4xl font-bold text-accent">
                {unit.numeral}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-bold">
                    {unit.title}{" "}
                    <Jp jp={unit.titleJp} romaji={false} className="ml-1 font-serif text-base font-medium text-ink-2" />
                  </h3>
                  <span className="shrink-0 text-xs text-ink-2 tabular-nums">
                    {unit.lessons.filter((l) => progress[l.key]).length}/{unit.lessons.length}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-2">{unit.description}</p>
                <ul className="mt-4 divide-y divide-line">
                  {unit.lessons.map((lesson) => (
                    <li key={lesson.key}>
                      <Link href={lesson.href} className="group flex items-center gap-3 py-3 sm:gap-4">
                        <span className="w-8 shrink-0 text-xs text-ink-2 tabular-nums">{lesson.number}</span>
                        <span className="hidden w-20 shrink-0 sm:block">
                          <Jp jp={lesson.mark} romaji={false} className="font-serif text-lg font-bold group-hover:text-accent" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium group-hover:text-accent">{lesson.title}</span>
                          <Rich text={lesson.summary} className="block text-sm text-ink-2" />
                        </span>
                        {progress[lesson.key] ? (
                          <Hanko size="sm" />
                        ) : (
                          <span aria-hidden className="size-7 shrink-0 rounded-full border border-dashed border-line" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
