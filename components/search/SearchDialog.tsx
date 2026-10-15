"use client";

import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import { Rich } from "@/components/Jp";
import { loadDictionary } from "@/lib/load-dictionary";
import { KIND_LABELS, type SearchItem, searchIndex, wordItems } from "@/lib/search";

let indexPromise: Promise<SearchItem[]> | undefined;
let wordsPromise: Promise<SearchItem[]> | undefined;

/** The static /search-items.json (pages, lessons, grammar, kanji), once per page view; a failure is forgotten. */
function loadIndex(): Promise<SearchItem[]> {
  indexPromise ??= fetch("/search-items.json")
    .then((response) => {
      if (!response.ok) throw new Error("The search index could not be loaded.");
      return response.json() as Promise<SearchItem[]>;
    })
    .catch((error: unknown) => {
      indexPromise = undefined;
      throw error;
    });
  return indexPromise;
}

/**
 * The words' results, built from /dictionary-data.json (shared with the word card and /dictionary, which build the
 * same entries once): after a yield, so the other results show first and typing isn't held up. A failure is
 * forgotten, so the next open tries again.
 */
function loadWords(): Promise<SearchItem[]> {
  wordsPromise ??= loadDictionary()
    .then(
      (data) =>
        new Promise<SearchItem[]>((resolve, reject) =>
          setTimeout(() => {
            try {
              resolve(wordItems(data));
            } catch (error) {
              reject(error);
            }
          }, 0),
        ),
    )
    .catch((error: unknown) => {
      wordsPromise = undefined;
      throw error;
    });
  return wordsPromise;
}

type Words = "loading" | "ready" | "failed";
type Load = { state: "waiting" } | { state: "error" } | { state: "done"; items: SearchItem[]; words: Words };

const LIMIT = 30;

/**
 * Site search in a modal <dialog>: a combobox over a listbox of results (aria-activedescendant), so focus stays
 * in the box while the arrows move through the results. Enter opens the result, Escape closes the dialog and the
 * browser returns focus to where it was.
 */
export default function SearchDialog({ request }: { request: number }) {
  const router = useRouter();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [load, setLoad] = useState<Load>({ state: "waiting" });
  const [query, setQuery] = useState("");
  // The highlighted result, for the result list it was chosen in: new results start at the first again.
  const [chosen, setChosen] = useState<{ results: SearchItem[] | null; index: number }>({ results: null, index: 0 });
  const pressedBackdrop = useRef(false);
  // Enter also confirms a Japanese keyboard's conversion; that Enter must not open a result.
  const composing = useRef(false);
  const deferredQuery = useDeferredValue(query);

  // Each request from the launcher opens the dialog; the dialog closes itself, so no state can lag behind a
  // quick Escape and reopen.
  useEffect(() => {
    const d = dialog.current;
    if (!d || d.open) return;
    d.showModal();
    input.current?.select();
  }, [request]);

  // Load the index on the first open, and again on a later open if it failed.
  // Load the index on the first open, then the words; on a later open, whichever failed. Results already shown
  // stay when a retry fails.
  // (Done once the words are in: the run that started the words' load must stay live until they arrive.)
  const complete = load.state === "done" && load.words === "ready";
  useEffect(() => {
    if (complete) return;
    let live = true;
    loadIndex()
      .then((items) => {
        if (!live) return;
        setLoad({ state: "done", items, words: "loading" });
        return loadWords().then(
          (words) => live && setLoad({ state: "done", items: [...items, ...words], words: "ready" }),
          () => live && setLoad({ state: "done", items, words: "failed" }),
        );
      })
      .catch(() => live && setLoad((l) => (l.state === "done" ? l : { state: "error" })));
    return () => {
      live = false;
    };
  }, [request, complete]);

  const results = useMemo(() => (load.state === "done" ? searchIndex(load.items, deferredQuery, LIMIT) : []), [load, deferredQuery]);
  const active = chosen.results === results ? chosen.index : 0;
  const setActive = (index: number) => setChosen({ results, index });
  const current = Math.min(active, results.length - 1);
  const optionId = (i: number) => `${id}-option-${i}`;

  useEffect(() => {
    if (current >= 0) document.getElementById(optionId(current))?.scrollIntoView({ block: "nearest" });
  });

  const go = (item: SearchItem | undefined) => {
    if (!item) return;
    dialog.current?.close();
    router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Safari ends the composition before the Enter that confirms it, which then has keyCode 229.
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229 || composing.current) return;
    if (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      // The shortcut again, inside the box: keep the dialog, rather than let the browser focus its address bar.
      e.preventDefault();
      e.currentTarget.select();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!results.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((current + step + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      // Typed faster than the deferred list updated: open the best match for what is in the box now.
      if (query !== deferredQuery && load.state === "done") go(searchIndex(load.items, query, 1)[0]);
      else go(results[current]);
    }
  };

  const status =
    load.state === "error"
      ? "Search couldn't load. Close it and try again."
      : load.state === "waiting"
        ? "Loading…"
        : [
            !deferredQuery.trim()
              ? ""
              : results.length
                ? `${results.length === LIMIT ? `Top ${LIMIT}` : results.length} result${results.length === 1 ? "" : "s"}`
                : "No matches",
            // The rest is searched while the words load, and without them if they fail; the next open tries again.
            load.words === "loading" ? "Loading words…" : load.words === "failed" ? "Words couldn't load: searching pages, lessons, grammar and kanji. Close and reopen to try again." : "",
          ]
            .filter(Boolean)
            .join(". ");

  return (
    <dialog
      ref={dialog}
      aria-label="Search"
      // A tap on the backdrop lands on the dialog itself, outside its panel. Both ends of the tap must be there,
      // so a text selection dragged out of the box doesn't close it.
      onPointerDown={(e) => (pressedBackdrop.current = e.target === dialog.current)}
      onClick={(e) => pressedBackdrop.current && e.target === dialog.current && dialog.current?.close()}
      className="mx-auto mt-[8vh] max-h-[min(36rem,84dvh)] w-[min(36rem,calc(100vw-2rem))] overflow-hidden rounded-panel border border-line bg-surface p-0 text-ink shadow-pop backdrop:bg-ink/25 backdrop:backdrop-blur-[2px] open:flex open:flex-col"
    >
      <div className="flex items-center gap-2 border-b-2 border-line px-4 focus-within:border-accent">
        <svg aria-hidden viewBox="0 0 20 20" className="size-5 shrink-0 text-ink-2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="8.5" cy="8.5" r="5.75" />
          <path d="m13 13 4.25 4.25" />
        </svg>
        <input
          ref={input}
          type="text"
          role="combobox"
          aria-label="Search lessons, grammar, kanji and words"
          aria-expanded={results.length > 0}
          aria-controls={`${id}-results`}
          aria-autocomplete="list"
          aria-activedescendant={current >= 0 ? optionId(current) : undefined}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onCompositionStart={() => (composing.current = true)}
          onCompositionEnd={() => (composing.current = false)}
          placeholder="Kanji, kana, romaji or English"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          className="search-input h-14 min-w-0 flex-1 bg-transparent text-base placeholder:text-ink-2/70"
        />
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="h-8 shrink-0 rounded-lg border border-line-strong px-2 text-xs text-ink-2 hover:border-ink-2 hover:text-ink"
        >
          Esc<span className="sr-only"> (close search)</span>
        </button>
      </div>

      <ul id={`${id}-results`} role="listbox" aria-label="Results" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 empty:hidden">
        {results.map((item, i) => (
          <li
            // The list is replaced on each query, and two results can share a link (本 the noun and the counter).
            key={i}
            id={optionId(i)}
            role="option"
            aria-selected={i === current}
            onPointerMove={() => i !== current && setActive(i)}
            onClick={() => go(item)}
            className={`flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 ${i === current ? "bg-accent-soft" : ""}`}
          >
            <span className={`mt-0.5 w-16 shrink-0 text-[0.7rem] font-medium tracking-[0.12em] uppercase ${i === current ? "text-accent" : "text-ink-2"}`}>
              {KIND_LABELS[item.kind]}
            </span>
            <span className="min-w-0">
              <Rich text={item.label} className={`block font-medium ${item.kind === "kanji" || item.kind === "word" ? "font-jp text-lg leading-snug" : "text-sm"}`} />
              <Rich text={item.detail} className="mt-0.5 block truncate text-xs text-ink-2" />
            </span>
          </li>
        ))}
      </ul>

      <p role="status" className="px-5 py-3 text-xs text-ink-2 empty:hidden [ul:not(:empty)+&]:border-t [ul:not(:empty)+&]:border-line">
        {status}
      </p>
      {load.state === "done" && !deferredQuery.trim() && (
        <p className="px-5 pb-5 text-sm leading-relaxed text-ink-2">
          Try <span lang="ja">食べる</span>, taberu or eat. Use ↑ and ↓ to choose, Enter to open.
        </p>
      )}
    </dialog>
  );
}
