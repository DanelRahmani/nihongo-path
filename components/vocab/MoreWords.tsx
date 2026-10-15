"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { TypedDrill } from "@/components/drill/TypedDrill";
import { VOCAB_FACES } from "@/components/vocab/VocabDrill";
import { panelClass } from "@/components/ui/Panel";
import { loadMoreWords } from "@/lib/load-more-words";
import { useStore } from "@/lib/storage";
import { studyStore } from "@/lib/stores";
import { type VocabCard, vocabMoreDeck } from "@/lib/vocab-deck";

const noSubscribe = () => () => {};
/** False on the server and in the first render, so the switch shows the reader's setting, not the default. */
const useMounted = () => useSyncExternalStore(noSubscribe, () => true, () => false);

type Load = { state: "off" } | { state: "loading" } | { state: "error" } | { state: "ready"; cards: VocabCard[] };

/**
 * "More words" (I6): an opt-in second deck of the dictionary's expansion words, most frequent first. The switch is
 * stored in np:study; the cards (/vocab-more.json) are fetched only once it is on.
 */
export function MoreWords({ count }: { count: number }) {
  const [study, setStudy] = useStore(studyStore);
  const [load, setLoad] = useState<Load>({ state: "off" });
  const [attempt, setAttempt] = useState(0);
  const mounted = useMounted();
  const on = study.moreWords;

  useEffect(() => {
    if (!on) return;
    let live = true;
    queueMicrotask(() => live && setLoad((l) => (l.state === "ready" ? l : { state: "loading" })));
    loadMoreWords()
      .then((cards) => live && setLoad({ state: "ready", cards }))
      .catch(() => live && setLoad({ state: "error" }));
    return () => {
      live = false;
    };
  }, [on, attempt]);

  const cards = load.state === "ready" ? load.cards : null;
  const deck = useMemo(() => cards && vocabMoreDeck(cards, true), [cards]);

  return (
    <section aria-labelledby="more-words-heading" className="mt-14 border-t border-line pt-10">
      <h2 id="more-words-heading" className="font-serif text-2xl font-bold">
        <span lang="ja">語彙</span> More words
      </h2>
      <p className="mt-3 leading-relaxed text-ink-2">
        {count.toLocaleString("en-GB")} everyday words beyond the lessons, from the dictionary, most common first. Off
        unless you want them; your lesson words stay a separate deck. Switched off again, the words you&apos;ve started
        stay saved but leave Review until you switch it back on.
      </p>
      <label className={`${mounted ? "" : "invisible"} mt-4 inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-line-strong bg-surface px-4`}>
        <input type="checkbox" checked={on} onChange={(e) => setStudy((s) => ({ ...s, moreWords: e.target.checked }))} className="size-4 accent-[var(--color-accent)]" />
        <span>Study the More words deck too</span>
      </label>
      {/* Always mounted, so the loading, the arrival and a failure are announced. */}
      <p role="status" className={on && load.state !== "ready" ? "mt-6 text-sm text-ink-2" : "sr-only"}>
        {on && load.state === "loading" && "Loading the words…"}
        {on && load.state === "error" && "The words couldn't be loaded. Check your connection, then try again."}
        {on && load.state === "ready" && `${load.cards.length.toLocaleString("en-GB")} words on. The first card is below.`}
      </p>
      {on && load.state === "error" && (
        <Button variant="secondary" className="mt-3" onClick={() => setAttempt((a) => a + 1)}>
          Try again
        </Button>
      )}
      <div className="mt-6" />
      {on && deck && (
        <TypedDrill
          deck={deck}
          groupsName="sets of 50"
          openLabel="most common first"
          placeholder="Type it in Japanese…"
          focusFirst={false}
          empty={<div className={panelClass("surface", "p-6 text-center")}>No words to show.</div>}
          {...VOCAB_FACES}
        />
      )}
    </section>
  );
}
