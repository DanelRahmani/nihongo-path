"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { showKanji, TypedDrill } from "@/components/drill/TypedDrill";
import { Jp, Rich } from "@/components/Jp";
import { panelClass } from "@/components/ui/Panel";
import { Segmented } from "@/components/ui/Segmented";
import { plainOf } from "@/lib/markup";
import { type Direction, type RegisterCard, registerDeck } from "@/lib/register-drill";
import { useStore } from "@/lib/storage";
import { progressStore } from "@/lib/stores";

/**
 * The polite ↔ casual drill: a lesson line in one register; the learner says it in the other, as the lesson does.
 * One deck per direction, each scheduled on its own; a lesson's lines join when it is marked finished.
 */
export function RegisterDrill({ cards, lessons }: { cards: Record<Direction, RegisterCard[]>; lessons: string[] }) {
  const [progress] = useStore(progressStore);
  const [direction, setDirection] = useState<Direction>("casual");
  // Switching direction remounts the drill; focus stays on the switch until the reader moves on.
  const [switched, setSwitched] = useState(false);
  const done = useMemo(() => new Set(Object.keys(progress)), [progress]);
  const deck = useMemo(() => registerDeck(direction, cards[direction], lessons, done), [direction, cards, lessons, done]);
  const lessonsDone = lessons.filter((l) => done.has(l) && cards[direction].some((c) => c.lesson === l)).length;
  return (
    <div>
      <Segmented
        legend="Say it"
        name="register-direction"
        value={direction}
        onChange={(d) => {
          setDirection(d);
          setSwitched(true);
        }}
        options={[
          { value: "casual", label: <span className="text-sm">Polite <span aria-hidden>→</span><span className="sr-only">to</span> casual</span> },
          { value: "polite", label: <span className="text-sm">Casual <span aria-hidden>→</span><span className="sr-only">to</span> polite</span> },
        ]}
      />
      <div className="mt-6">
        <TypedDrill
          key={deck.id}
          deck={deck}
          focusFirst={!switched}
          groupsName="lessons"
          openLabel={`${lessonsDone} lesson${lessonsDone === 1 ? "" : "s"} with lines done`}
          placeholder={direction === "casual" ? "The casual line…" : "The polite line…"}
          empty={
            <div className={panelClass("surface", "p-6 text-center")}>
              <p className="font-medium">No lines yet</p>
              <p className="mt-1 text-sm text-ink-2">
                Lines join when you finish a lesson that shows them in both registers, starting with{" "}
                <Link href="/learn/start/polite-and-casual" className="text-accent hover:underline">
                  Polite and casual
                </Link>
                .
              </p>
            </div>
          }
          front={(c) => (
            <>
              {/* keep-words: in Kana only mode the line breaks between words, never inside one. */}
              <Jp jp={c.from} romaji={false} inspect={false} className="font-jp text-2xl leading-relaxed sm:text-3xl keep-words" />
              <Rich text={c.en} className="mt-4 block text-base" />
              <p className="mt-1 text-xs tracking-[0.15em] text-ink-2 uppercase">Say it {direction === "casual" ? "casually" : "politely"}</p>
            </>
          )}
          answer={(c) => <Jp jp={showKanji(c.to)} romaji={false} inspect={false} className="mt-1 font-jp text-2xl leading-relaxed keep-words" />}
          right={(c) => (
            <>
              <span className="text-good">○</span> <Jp jp={c.to} romaji={false} inspect={false} />
            </>
          )}
          said={(c) => `Right: ${plainOf(c.to, false)}`}
        />
      </div>
    </div>
  );
}
