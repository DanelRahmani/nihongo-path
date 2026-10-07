"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Jp, Rich } from "@/components/Jp";
import { Hanko } from "@/components/Progress";
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
        ref={stripRef}
        role="tablist"
        aria-labelledby="path-heading"
        onKeyDown={onKeyDown}
        className="-mx-4 mt-4 flex gap-1 overflow-x-auto border-b border-line px-4 sm:mx-0 sm:px-0"
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
              className={`-mb-px flex shrink-0 scroll-mt-24 items-baseline gap-1.5 border-b-2 px-3 pt-2 pb-2.5 text-sm whitespace-nowrap transition-colors focus-visible:-outline-offset-4 ${
                active ? "border-accent font-medium text-ink" : "border-transparent text-ink-2 hover:text-ink"
              }`}
            >
              <span lang="ja" aria-hidden className="font-serif font-bold text-accent">
                {u.numeral}
              </span>
              {u.title}
              {finished && (
                <span aria-label="finished" className="text-xs text-accent">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <section id={PANEL_ID} role="tabpanel" aria-labelledby={unit.slug} tabIndex={0} className="pt-8">
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

            {lessons.length === 0 ? (
              <p className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center text-ink-2">
                Every lesson in {unit.title} is finished. Untick “Hide finished lessons” to review them.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-line">
                {lessons.map((lesson) => (
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
