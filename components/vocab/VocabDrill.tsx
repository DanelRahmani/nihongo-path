"use client";

import Link from "next/link";
import { useMemo } from "react";
import { showKanji, TypedDrill } from "@/components/drill/TypedDrill";
import { Jp } from "@/components/Jp";
import { panelClass } from "@/components/ui/Panel";
import { plainOf } from "@/lib/markup";
import { useStore } from "@/lib/storage";
import { progressStore } from "@/lib/stores";
import { type VocabCard, vocabDeck } from "@/lib/vocab-deck";

/**
 * The vocabulary deck: English on the front; the learner types the word with a Japanese keyboard. Each lesson's
 * words join when the lesson is marked finished.
 */
export function VocabDrill({ cards, lessons }: { cards: VocabCard[]; lessons: string[] }) {
  const [progress] = useStore(progressStore);
  const done = useMemo(() => new Set(Object.keys(progress)), [progress]);
  const deck = useMemo(() => vocabDeck(cards, lessons, done), [cards, lessons, done]);
  const lessonsDone = lessons.filter((l) => done.has(l)).length;
  return (
    <TypedDrill
      deck={deck}
      groupsName="lessons"
      openLabel={`${lessonsDone} lesson${lessonsDone === 1 ? "" : "s"} done`}
      placeholder="Type it in Japanese…"
      empty={
        <div className={panelClass("surface", "p-6 text-center")}>
          <p className="font-medium">No words yet</p>
          <p className="mt-1 text-sm text-ink-2">
            A lesson&apos;s words join this deck when you mark the lesson finished. Start with the{" "}
            <Link href="/" className="text-accent hover:underline">
              path
            </Link>
            .
          </p>
        </div>
      }
      front={(c) => (
        <>
          <p className="text-2xl font-medium sm:text-3xl">{c.meaning}</p>
          {c.pos && <p className="mt-2 text-xs tracking-[0.15em] text-ink-2 uppercase">{c.pos}</p>}
        </>
      )}
      answer={(c) => <Jp jp={showKanji(c.jp)} romaji={false} inspect={false} className="mt-1 font-jp text-4xl font-medium" />}
      right={(c, check) => (
        <>
          <span className="text-good">○</span> <Jp jp={showKanji(c.jp)} romaji={false} inspect={false} /> · {c.meaning}
          {check.note && <span className="block">{check.note}</span>}
        </>
      )}
      said={(c, check) => [`Right: ${plainOf(c.jp, false)}.`, check.note].filter(Boolean).join(" ")}
    />
  );
}
