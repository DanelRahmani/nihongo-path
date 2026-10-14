"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Jp, Rich } from "@/components/Jp";
import { Hanko } from "@/components/Progress";
import { panelClass } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { selectedUnit, tabIndexAfterKey } from "@/lib/path";
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
  numeral: string;
  title: string;
  titleJp: string;
  description: string;
  lessons: PathLesson[];
}

const PANEL_ID = "path-panel";

/** The path, one unit per tab. Each tab's id is the unit slug, so /#particles (the lesson breadcrumb) opens it. */
export function PathBrowser({ units }: { units: PathUnit[] }) {
  const [filter, setFilter] = useStore(pathFilterStore);
  const [progress] = useStore(progressStore);
  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const current = selectedUnit(units, filter.unit, progress);
  const unit = units.find((u) => u.slug === current)!;
  const total = units.reduce((n, u) => n + u.lessons.length, 0);
  const done = units.reduce((n, u) => n + u.lessons.filter((l) => progress[l.key]).length, 0);
  const lessons = filter.hideDone ? unit.lessons.filter((l) => !progress[l.key]) : unit.lessons;

  const choose = (slug: string) => {
    setFilter((f) => ({ ...f, unit: slug }));
    // Keep the address in step, so a reload or a shared link opens the same tab.
    window.history.replaceState(null, "", `#${slug}`);
  };

  // Arriving at /#unit (from a lesson's breadcrumb, or a shared link) opens that unit's tab.
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (units.some((u) => u.slug === slug)) setFilter((f) => ({ ...f, unit: slug }));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [units, setFilter]);

  // Scroll the tab strip (not the page) so the open tab is in view on narrow screens.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = tabRefs.current[current];
    if (!strip || !tab) return;
    const left = tab.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft || left + tab.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollLeft = left - 16;
    }
  }, [current]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next = tabIndexAfterKey(units.findIndex((u) => u.slug === current), e.key, units.length);
    if (next === null) return;
    e.preventDefault();
    choose(units[next].slug);
    tabRefs.current[units[next].slug]?.focus();
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="path-heading" className="flex items-baseline gap-3">
          <span className="font-serif text-2xl font-bold">The path</span>
          <span className="text-sm text-ink-2 tabular-nums">
            {done}/{total} done
          </span>
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
        ref={stripRef}
        role="tablist"
        aria-labelledby="path-heading"
        onKeyDown={onKeyDown}
        className="scroll-strip -mx-4 mt-5 flex gap-1.5 overflow-x-auto px-4 py-1.5"
      >
        {units.map((u) => {
          const active = u.slug === current;
          const finished = u.lessons.every((l) => progress[l.key]);
          return (
            <button
              key={u.slug}
              ref={(el) => {
                tabRefs.current[u.slug] = el;
              }}
              id={u.slug}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={PANEL_ID}
              tabIndex={active ? 0 : -1}
              onClick={() => choose(u.slug)}
              className={`flex h-10 shrink-0 scroll-mt-24 items-center gap-2 rounded-full px-4 text-sm whitespace-nowrap transition-colors duration-150 focus-visible:-outline-offset-2 ${
                active ? "bg-accent-soft font-medium text-accent" : "text-ink-2 hover:bg-paper-2 hover:text-ink"
              }`}
            >
              <span lang="ja" aria-hidden className="font-serif text-base font-bold text-accent">
                {u.numeral}
              </span>
              {u.title}
              {finished && (
                <span aria-label="finished" className="grid size-4 place-items-center rounded-full bg-accent text-[0.6rem] text-on-accent">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <section
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={unit.slug}
        tabIndex={0}
        className={panelClass("surface", "mt-4 p-5 sm:p-7")}
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <span lang="ja" aria-hidden className="w-10 shrink-0 font-serif text-5xl leading-none font-bold text-accent sm:w-12 sm:text-6xl">
            {unit.numeral}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold sm:text-2xl">
              {unit.title}{" "}
              <Jp jp={unit.titleJp} romaji={false} inspect={false} className="ml-1 font-serif text-base font-medium text-ink-2" />
            </h3>
            <p className="mt-1 text-sm text-ink-2">{unit.description}</p>
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar value={unit.lessons.filter((l) => progress[l.key]).length} max={unit.lessons.length} className="flex-1" />
              <span className="shrink-0 text-xs text-ink-2 tabular-nums">
                {unit.lessons.filter((l) => progress[l.key]).length}/{unit.lessons.length}
              </span>
            </div>
          </div>
        </div>

        {lessons.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line-strong p-8 text-center text-ink-2">
            Every lesson in {unit.title} is finished. Untick “Hide finished lessons” to review them.
          </p>
        ) : (
          <ul className="mt-5 divide-y divide-line border-t border-line">
            {lessons.map((lesson) => (
              <li key={lesson.key}>
                <Link
                  href={lesson.href}
                  className="group -mx-2 flex items-center gap-3 rounded-xl px-2 py-3.5 transition-colors duration-150 hover:bg-paper-2 sm:-mx-3 sm:gap-4 sm:px-3"
                >
                  <span className="w-8 shrink-0 text-xs text-ink-2 tabular-nums">{lesson.number}</span>
                  <span className="hidden w-20 shrink-0 sm:block">
                    <Jp jp={lesson.mark} romaji={false} inspect={false} className="font-serif text-lg font-bold group-hover:text-accent" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-balance group-hover:text-accent">{lesson.title}</span>
                    <Rich text={lesson.summary} className="mt-0.5 block text-sm text-ink-2" />
                  </span>
                  {progress[lesson.key] ? (
                    <Hanko size="sm" />
                  ) : (
                    <span aria-hidden className="size-7 shrink-0 rounded-full border-2 border-dashed border-line-strong" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
