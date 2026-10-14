"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formLabel, kanjiOf, kunLabel, lookupWord, type KanjiInfo, type WordLookup } from "@/lib/lookup";
import { loadDictionary } from "@/lib/load-dictionary";
import { plainOf, readingOf } from "@/lib/markup";

type Shown =
  | { state: "loading" }
  | { state: "error" }
  | { state: "done"; lookup: WordLookup | null; kanji: KanjiInfo[] };

/**
 * One Japanese line as a toolbar of words (Jp.tsx renders each word with role="button"). The line is one Tab
 * stop: the chosen word holds tabIndex 0 (a roving tab index), the arrow keys, Home and End move focus between
 * words, Enter or Space explains the word, and Escape closes the card. The dictionary is fetched on first use.
 */
export function InspectorLine({ children }: { children: React.ReactNode }) {
  const line = useRef<HTMLSpanElement>(null);
  const request = useRef(0);
  const [shown, setShown] = useState<Shown>();
  const [announce, setAnnounce] = useState("");

  const words = () => Array.from(line.current?.querySelectorAll<HTMLElement>("[data-inspect-word]") ?? []);
  const activeIndex = () => Math.max(0, words().findIndex((w) => w.tabIndex === 0));

  const select = (index: number, focus: boolean) => {
    const all = words();
    if (!all.length) return;
    const next = (index + all.length) % all.length;
    all.forEach((word, i) => {
      word.tabIndex = i === next ? 0 : -1;
      word.toggleAttribute("data-active", i === next);
    });
    if (focus) all[next].focus();
  };

  const close = (refocus: boolean) => {
    request.current++;
    setShown(undefined);
    setAnnounce("");
    if (refocus) words()[activeIndex()]?.focus();
  };

  const inspect = async (index: number) => {
    select(index, false);
    const jp = words()[index]?.dataset.jp;
    if (!jp) return;
    const id = ++request.current;
    setShown({ state: "loading" });
    try {
      const data = await loadDictionary();
      if (id !== request.current) return; // closed, or another word chosen, while loading
      const lookup = lookupWord(jp, data);
      setShown({ state: "done", lookup, kanji: lookup?.kanji ?? kanjiOf(jp, data) });
      setAnnounce(lookup?.kind === "word" ? `${plainOf(lookup.word.jp, false)}: ${lookup.word.meaning}` : "");
    } catch {
      if (id === request.current) setShown({ state: "error" });
    }
  };

  // The first word is the line's Tab stop until another is chosen.
  useEffect(() => {
    const all = words();
    if (all.length && !all.some((w) => w.tabIndex === 0)) all[0].tabIndex = 0;
  }, []);

  // A tap or click outside the line closes its card.
  useEffect(() => {
    if (!shown) return;
    const onDown = (event: PointerEvent) => {
      if (!line.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  });

  return (
    <span
      className="inspector-line relative"
      ref={line}
      // Tab away from the line and its card closes the card, so it never covers the element that now has focus.
      // Focus moving nowhere (a tap on the card's text) leaves it open; taps outside close it above.
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (shown && next instanceof Node && !event.currentTarget.contains(next)) close(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && shown) {
          event.preventDefault();
          close(true);
        }
      }}
    >
      <span
        role="toolbar"
        aria-label="Words: arrow keys to move, Enter to explain"
        onClick={(event) => {
          const target = (event.target as HTMLElement).closest<HTMLElement>("[data-inspect-word]");
          const index = target ? words().indexOf(target) : -1;
          if (index >= 0) void inspect(index);
        }}
        onKeyDown={(event) => {
          const target = (event.target as HTMLElement).closest<HTMLElement>("[data-inspect-word]");
          if (!target) return;
          const all = words();
          const index = all.indexOf(target);
          const move = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: all.length - 1 }[event.key];
          if (move !== undefined) {
            event.preventDefault();
            select(move, true);
          } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            void inspect(index);
          }
        }}
      >
        {children}
      </span>

      <span role="status" className="sr-only">
        {announce}
      </span>

      {shown && (
        <span className="inspector-popover rise fixed inset-x-4 bottom-4 z-50 mx-auto block max-w-sm rounded-panel border border-line-strong bg-surface p-4 text-left font-sans text-sm shadow-lift">
          {shown.state === "loading" && "Looking up…"}
          {shown.state === "error" && "The dictionary could not be loaded. Try again."}
          {shown.state === "done" && <InspectorCard lookup={shown.lookup} kanji={shown.kanji} onClose={() => close(true)} />}
        </span>
      )}
    </span>
  );
}

const KIND_TEXT = {
  function: "A particle or grammar word. Its lesson explains it.",
  name: "A name.",
  number: "A number.",
  fragment: "Part of a word, shown on its own.",
} as const;

function InspectorCard({ lookup, kanji, onClose }: { lookup: WordLookup | null; kanji: KanjiInfo[]; onClose: () => void }) {
  const word = lookup?.kind === "word" ? lookup.word : undefined;
  const label = lookup?.kind === "word" ? formLabel(lookup.form) : undefined;
  return (
    <span className="block">
      <span className="flex items-start justify-between gap-4">
        <span>
          {word && (
            <span lang="ja" className="block font-jp text-lg text-ink">
              {plainOf(word.jp, false)}
              {readingOf(word.jp, false) !== plainOf(word.jp, false) && <span className="ml-2 text-sm text-ink-2">{readingOf(word.jp, false)}</span>}
            </span>
          )}
          <strong className="block text-base text-ink">
            {word ? word.meaning : lookup ? KIND_TEXT[lookup.kind as keyof typeof KIND_TEXT] : "No dictionary entry for this word yet."}
          </strong>
          {word && label && (
            <span className="mt-1 block text-ink-2">
              {label} of <span lang="ja" className="font-jp">{plainOf(word.jp, false)}</span>
            </span>
          )}
          {lookup?.kind === "word" && lookup.counter && <span className="mt-1 block text-ink-2">a number with this counter</span>}
          {lookup?.kind === "word" && lookup.affix && (
            <span className="mt-1 block text-ink-2">
              with <span lang="ja" className="font-jp">{plainOf(lookup.affix.jp, false)}</span>: {lookup.affix.meaning}
            </span>
          )}
        </span>
        <button type="button" onClick={onClose} className="rounded-full px-2 text-lg leading-none text-ink-2 hover:bg-paper-2 hover:text-ink" aria-label="Close word card">
          ×
        </button>
      </span>
      {kanji.length > 0 && (
        <span className="mt-3 block border-t border-line pt-3">
          <span className="mb-2 block text-xs font-medium tracking-wider text-ink-2 uppercase">Kanji</span>
          <span className="flex flex-col gap-1.5">
            {kanji.map((k) => (
              <Link key={k.char} href={`/kanji/${k.char}`} className="flex items-baseline gap-3 rounded-lg bg-paper-2 px-2.5 py-1.5 hover:bg-accent-soft hover:text-accent">
                <span lang="ja" className="font-jp text-xl">{k.char}</span>
                <span className="min-w-0">
                  <span className="block">{k.meanings.join(", ")}</span>
                  <span lang="ja" className="block text-xs text-ink-2">
                    {[...k.on, ...k.kun].map((r, i) => {
                      const special = k.special.includes(r.replace(".", ""));
                      return (
                        <span key={r}>
                          {i > 0 && "・"}
                          <span className={special ? "opacity-60" : undefined}>{kunLabel(r)}</span>
                          {special && <span className="sr-only"> (special use)</span>}
                        </span>
                      );
                    })}
                  </span>
                </span>
              </Link>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}
