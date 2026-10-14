"use client";

import Link from "next/link";
import { useMemo } from "react";
import { showKanji, TypedDrill } from "@/components/drill/TypedDrill";
import { Jp, Rich } from "@/components/Jp";
import { panelClass } from "@/components/ui/Panel";
import { type ClozeCard, clozeDeck } from "@/lib/cloze-deck";
import { plainOf } from "@/lib/markup";
import { useStore } from "@/lib/storage";
import { progressStore } from "@/lib/stores";


/**
 * The cloze deck: a lesson line with a gap and its English; the learner types the missing words with a Japanese
 * keyboard. Each lesson's lines join when the lesson is marked finished.
 */
export function ClozeDrill({ cards, lessons }: { cards: ClozeCard[]; lessons: string[] }) {
  const [progress] = useStore(progressStore);
  const done = useMemo(() => new Set(Object.keys(progress)), [progress]);
  const deck = useMemo(() => clozeDeck(cards, lessons, done), [cards, lessons, done]);
  // The line with its gap filled by the answer, highlighted as the lesson highlights it.
  const filled = (c: ClozeCard) => deck.answerJp!(c);
  const lessonsDone = lessons.filter((l) => done.has(l) && cards.some((c) => c.lesson === l)).length;
  return (
    <TypedDrill
      deck={deck}
      groupsName="lessons"
      openLabel={`${lessonsDone} lesson${lessonsDone === 1 ? "" : "s"} with lines done`}
      placeholder="The missing words…"
      empty={
        <div className={panelClass("surface", "p-6 text-center")}>
          <p className="font-medium">No lines yet</p>
          <p className="mt-1 text-sm text-ink-2">
            A lesson&apos;s example lines join this deck when you mark the lesson finished. Start with the{" "}
            <Link href="/" className="link-inline">
              path
            </Link>
            .
          </p>
        </div>
      }
      front={(c) => (
        <>
          {/* keep-words: in Kana only mode the line breaks between words, never inside one. */}
          <Jp jp={c.line} romaji={false} inspect={false} className="font-jp text-2xl leading-relaxed sm:text-3xl keep-words" />
          <Rich text={c.en} className="mt-4 block text-base" />
          {c.register && <p className="mt-1 text-xs tracking-[0.15em] text-ink-2 uppercase">{c.register}</p>}
        </>
      )}
      answer={(c) => (
        <Jp jp={showKanji(filled(c))} romaji={false} inspect={false} className="mt-1 font-jp text-2xl leading-relaxed keep-words" />
      )}
      right={(c) => (
        <>
          <span className="text-good">○</span> <Jp jp={filled(c)} romaji={false} inspect={false} />
        </>
      )}
      said={(c) => `Right: ${plainOf(filled(c), false)}`}
    />
  );
}
