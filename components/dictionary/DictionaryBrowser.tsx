"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useDeferredValue, useEffect, useMemo, useReducer, useRef, useState, useTransition } from "react";
import { Jp, Rich } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { panelClass } from "@/components/ui/Panel";
import { Segmented } from "@/components/ui/Segmented";
import type { WordTopic } from "@/content/types";
import {
  buildEntries,
  DEFAULT_FILTERS,
  type Entry,
  type Filters,
  growthReducer,
  INITIAL_GROWTH,
  KANA_ROWS,
  POS_LABELS,
  search,
  TOPIC_LABELS,
  toCsv,
  visibleCount,
} from "@/lib/dictionary";
import { whenIdle } from "@/lib/idle";
import { loadDictionary } from "@/lib/load-dictionary";
import { useStore } from "@/lib/storage";
import { myWordsStore } from "@/lib/stores";
import { ArrowStrip } from "@/components/ui/ArrowStrip";

type Load = { state: "waiting" } | { state: "error" } | { state: "done"; entries: Entry[] };

/** Saves the CSV as a file: a Blob keeps the byte order mark that lets Excel read the Japanese. */
function download(csv: string, name: string) {
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  // Revoked a moment later: some browsers still read the URL after click() returns.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Fills the search box from ?q= (the site search links each word to /dictionary?q=…), on load and on each new
 * link. Its own component in its own Suspense boundary, so the rest of the page is still prerendered. Typing
 * writes the query back to the address, so a link to the word already shown still changes it.
 */
function QueryFromUrl({ onQuery }: { onQuery: (q: string) => void }) {
  const q = useSearchParams().get("q");
  useEffect(() => {
    if (q !== null) onQuery(q);
  }, [q, onQuery]);
  return null;
}

/**
 * The /dictionary search. The page's HTML holds no words: the data is fetched when the browser is idle (or as
 * soon as the reader focuses the search box), and the result list grows one batch at a time in a transition, so
 * typing stays responsive.
 */
export function DictionaryBrowser() {
  const [load, setLoad] = useState<Load>({ state: "waiting" });
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [mine, setMine] = useStore(myWordsStore);
  const [growth, grow] = useReducer(growthReducer, INITIAL_GROWTH);
  const [, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  const started = useRef(false);
  const sentinel = useRef<HTMLLIElement>(null);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setLoad({ state: "waiting" });
    loadDictionary()
      .then((data) => startTransition(() => setLoad({ state: "done", entries: buildEntries(data) })))
      .catch(() => {
        started.current = false;
        setLoad({ state: "error" });
      });
  }, []);

  useEffect(() => whenIdle(start), [start]);

  // A query from a link loads the data at once, as focusing the box does, and clears the filters, which could
  // hide the linked word. The address echoing what was just typed changes nothing.
  const typed = useRef(query);
  useEffect(() => {
    typed.current = query;
  });
  const fromUrl = useCallback(
    (q: string) => {
      if (q === typed.current) return;
      setQuery(q);
      setFilters(DEFAULT_FILTERS);
      start();
    },
    [start],
  );

  // Keep ?q= in step with the box, without a history entry per keystroke. Next.js picks up history.replaceState
  // when the state is null (its own state would make it skip the update).
  useEffect(() => {
    const url = new URL(window.location.href);
    if ((url.searchParams.get("q") ?? "") === deferredQuery) return;
    if (deferredQuery) url.searchParams.set("q", deferredQuery);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [deferredQuery]);

  const mineSet = useMemo(() => new Set(mine), [mine]);
  const entries = load.state === "done" ? load.entries : null;
  const results = useMemo(() => (entries ? search(entries, deferredQuery, filters, mineSet) : []), [entries, deferredQuery, filters, mineSet]);
  const key = JSON.stringify([deferredQuery, filters]);
  const shown = visibleCount(growth, key, results.length);

  // Grow the list when its end scrolls near the screen. Not while keyboard focus walks the list: Tab would scroll
  // the end into view again and again, and the page below the list could never be reached. "Show more" stays.
  useEffect(() => {
    const end = sentinel.current;
    if (!end || shown >= results.length) return;
    const observer = new IntersectionObserver(
      (seen) => {
        const focus = document.activeElement;
        if (focus && list.current?.contains(focus) && focus.matches(":focus-visible")) return;
        if (seen.some((s) => s.isIntersecting)) startTransition(() => grow({ type: "grow", key, total: results.length }));
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(end);
    return () => observer.disconnect();
  }, [key, shown, results.length]);

  const setFilter = <K extends keyof Filters>(name: K, value: Filters[K]) => setFilters((f) => ({ ...f, [name]: value }));
  // Saved ids that no longer name an entry (a reading changed in a later build) aren't counted or shown, but
  // are kept: a later build may bring the word back.
  const saved = useMemo(() => (entries ? search(entries, "", { ...DEFAULT_FILTERS, mine: true }, mineSet) : null), [entries, mineSet]);
  const savedCount = saved?.length ?? mine.length;
  const list = useRef<HTMLUListElement>(null);
  const refocus = useRef<number | null>(null);

  const toggleSaved = (id: string, index: number) => {
    // Unstarring in My words removes the row: keep the keyboard on the list.
    if (filters.mine && mineSet.has(id)) refocus.current = index;
    setMine((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  };

  useEffect(() => {
    if (refocus.current === null) return;
    const stars = list.current?.querySelectorAll<HTMLElement>("[data-star]") ?? [];
    (stars[Math.min(refocus.current, stars.length - 1)] ?? document.getElementById("dictionary-mine"))?.focus();
    refocus.current = null;
  });
  const filtered = filters.topic !== "all" || filters.source !== "all" || filters.row !== "all" || filters.mine;

  return (
    <div>
      <Suspense fallback={null}>
        <QueryFromUrl onQuery={fromUrl} />
      </Suspense>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="dictionary-search" className="text-xs font-medium tracking-[0.18em] text-ink-2 uppercase">
            Search
          </label>
          <input
            id="dictionary-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={start}
            placeholder="Kanji, kana, romaji or English"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            className="mt-2.5 h-12 w-full rounded-2xl border border-line-strong bg-surface px-4 text-base text-ink placeholder:text-ink-2/70 focus-visible:border-accent"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-[1fr_1.4fr]">
          <div>
            <label htmlFor="dictionary-topic" className="text-xs font-medium tracking-[0.18em] text-ink-2 uppercase">
              Topic
            </label>
            <select
              id="dictionary-topic"
              value={filters.topic}
              onChange={(event) => setFilter("topic", event.target.value as WordTopic | "all")}
              className="mt-2.5 h-11 w-full rounded-2xl border border-line-strong bg-surface px-3 text-sm text-ink"
            >
              <option value="all">All topics</option>
              {Object.entries(TOPIC_LABELS).map(([topic, label]) => (
                <option key={topic} value={topic}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <Segmented
            legend="Source"
            name="dictionary-source"
            value={filters.source}
            onChange={(value) => setFilter("source", value)}
            options={[
              { value: "all", label: "All" },
              { value: "lesson", label: "Lessons" },
              { value: "extra", label: "Expansion" },
            ]}
          />
        </div>

        <fieldset className="min-w-0">
          <legend className="text-xs font-medium tracking-[0.18em] text-ink-2 uppercase">Starts with</legend>
          <ArrowStrip className="scroll-strip -mx-4 mt-2 flex gap-1.5 overflow-x-auto px-4 py-1.5">
            {(["all", ...KANA_ROWS] as const).map((row) => {
              const active = filters.row === row;
              return (
                <label
                  key={row}
                  className={`relative inline-flex h-9 shrink-0 cursor-pointer items-center rounded-full border text-sm transition-colors duration-150 ring-within ${
                    row === "all" ? "px-4" : "px-3.5"
                  } ${active ? "border-accent bg-accent text-on-accent" : "border-line-strong bg-surface text-ink-2 hover:border-ink-2 hover:text-ink"}`}
                >
                  <input type="radio" name="dictionary-row" value={row} checked={active} onChange={() => setFilter("row", row)} className="sr-only" />
                  {row === "all" ? (
                    "Any"
                  ) : (
                    <>
                      <span lang="ja" aria-hidden className="font-jp text-base">
                        {row}
                      </span>
                      <span className="sr-only">
                        <span lang="ja">{row}</span> row
                      </span>
                    </>
                  )}
                </label>
              );
            })}
          </ArrowStrip>
        </fieldset>

        <div className="flex flex-wrap items-center gap-2">
          <Chip id="dictionary-mine" active={filters.mine} onClick={() => setFilter("mine", !filters.mine)}>
            <span aria-hidden>{filters.mine ? "★" : "☆"}</span> My words
            <span className="tabular-nums">({savedCount})</span>
          </Chip>
          {saved && saved.length > 0 && (
            <Button variant="secondary" size="sm" onClick={() => download(toCsv(saved), "my-words.csv")}>
              Download CSV
            </Button>
          )}
          {filtered && (
            <Button variant="ghost" size="sm" onClick={() => setFilters(DEFAULT_FILTERS)}>
              Clear filters
            </Button>
          )}
        </div>
      </div>

      <p role="status" className="mt-8 text-sm text-ink-2 tabular-nums">
        {load.state === "done"
          ? `${results.length} ${results.length === 1 ? "word" : "words"}`
          : load.state === "waiting"
            ? "Loading the dictionary…"
            : "The dictionary could not be loaded."}
      </p>

      {load.state === "error" && (
        <div className={panelClass("well", "mt-3 flex flex-wrap items-center justify-between gap-3 p-5")}>
          <span>Check the connection, then try again.</span>
          <Button variant="secondary" size="sm" onClick={start}>
            Try again
          </Button>
        </div>
      )}

      {load.state === "done" && results.length === 0 && (
        <p className={panelClass("well", "mt-3 p-5 text-ink-2")}>
          {filters.mine && savedCount === 0 ? "No saved words yet. Tap ☆ beside a word to keep it here." : "No words match. Try another spelling, or clear the filters."}
        </p>
      )}

      {results.length > 0 && (
        <ul ref={list} className={panelClass("surface", "mt-3 divide-y divide-line")}>
          {results.slice(0, shown).map((entry, i) => (
            <WordRow key={entry.id} entry={entry} saved={mineSet.has(entry.id)} onToggle={() => toggleSaved(entry.id, i)} />
          ))}
          {shown < results.length && (
            <li ref={sentinel} className="flex justify-center px-5 py-4">
              <Button variant="ghost" size="sm" onClick={() => startTransition(() => grow({ type: "grow", key, total: results.length }))}>
                Show more ({results.length - shown} left)
              </Button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

function WordRow({ entry, saved, onToggle }: { entry: Entry; saved: boolean; onToggle: () => void }) {
  const { word } = entry;
  return (
    <li className="flex items-start gap-3 px-4 py-4 sm:gap-4 sm:px-6">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={saved}
        aria-label={`Save ${entry.written} (${entry.reading}, ${POS_LABELS[word.pos]}) to My words`}
        data-star
        className={`grid size-10 shrink-0 place-items-center rounded-full text-xl transition-colors duration-150 ${saved ? "text-accent hover:bg-accent-soft" : "text-ink-2 hover:bg-paper-2 hover:text-ink"}`}
      >
        <span aria-hidden>{saved ? "★" : "☆"}</span>
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {/* Shown with furigana in every mode, as on the kanji pages: here the written form is the point. */}
          <Jp jp={word.jp.replace(/\[(?!!)/g, "[!")} className="font-jp text-2xl font-medium" />
          {/* The ruby already shows the reading, except in the kanji-only furigana mode. */}
          {entry.reading !== entry.written && (
            <span lang="ja" className="dictionary-reading text-sm text-ink-2">
              {entry.reading}
            </span>
          )}
        </div>
        <p className="mt-1 text-ink">
          <Rich text={word.meaning} />
        </p>
        <p className="mt-1 flex flex-wrap gap-x-2 text-xs text-ink-2">
          <span>{POS_LABELS[word.pos]}</span>
          <span aria-hidden>·</span>
          <span>{TOPIC_LABELS[word.topic]}</span>
          {entry.source === "extra" && (
            <>
              <span aria-hidden>·</span>
              <span>Expansion</span>
            </>
          )}
        </p>
      </div>
    </li>
  );
}
