"use client";

import Link from "next/link";
import { useMemo } from "react";
import { showKanji, TypedDrill } from "@/components/drill/TypedDrill";
import { Jp } from "@/components/Jp";
import { type KanjiCard, kanjiDeck, readingOfCard, writtenOf } from "@/lib/kanji-deck";

/** The kanji cards: a word's reading and meaning on the front; the learner types it and picks the kanji spelling. */
export function KanjiDrill({ cards }: { cards: KanjiCard[] }) {
  const deck = useMemo(() => kanjiDeck(cards), [cards]);
  return (
    <TypedDrill
      deck={deck}
      groupsName="groups"
      unlockLabel="New kanji open"
      placeholder="Type it in kanji…"
      manualUnlock
      front={(c) => (
        <>
          <p lang="ja" className="font-jp text-4xl font-medium sm:text-5xl">
            {readingOfCard(c)}
          </p>
          <p className="mt-4 text-lg">{c.wordMeaning}</p>
        </>
      )}
      answer={(c) => (
        <>
          <Jp jp={showKanji(c.word)} romaji={false} inspect={false} className="mt-1 font-jp text-4xl font-medium sm:text-5xl" />
          <p className="mt-4 text-sm">
            <span className="text-ink-2">This card&apos;s kanji: </span>
            <Link href={`/kanji/${encodeURIComponent(c.id)}`} className="font-jp text-2xl text-accent hover:underline">
              {c.id}
            </Link>{" "}
            <span className="text-ink-2">{c.meanings.join(", ")}</span>
          </p>
        </>
      )}
      right={(c) => (
        <>
          <span className="text-good">○</span>{" "}
          <span lang="ja" className="font-jp">
            {writtenOf(c)}
          </span>{" "}
          · <span lang="ja">{c.id}</span> {c.meanings.join(", ")}
        </>
      )}
      said={(c) => `Right: ${writtenOf(c)}. ${c.id}: ${c.meanings.join(", ")}`}
    />
  );
}
