"use client";

import Link from "next/link";
import { useState } from "react";
import { DECKS } from "@/content/kana";
import { deckStats } from "@/lib/srs";
import { srsStore } from "@/lib/stores";
import { useStore } from "@/lib/storage";

export function KanaDueBadge() {
  const [srs] = useStore(srsStore);
  const [now] = useState(() => Date.now());
  const due = DECKS.reduce((n, d) => n + deckStats(d, srs, now).due, 0);
  const started = Object.keys(srs.cards).length > 0;

  return (
    <Link
      href="/kana/drill"
      className="group inline-flex h-11 items-center gap-3 rounded-full border border-line-strong bg-surface pr-4 pl-1.5 text-sm shadow-card transition-colors duration-150 hover:border-accent"
    >
      <span
        className={`grid h-8 min-w-8 place-items-center rounded-full px-2 text-xs font-bold tabular-nums ${
          due > 0 ? "bg-accent text-on-accent" : "bg-paper-3 text-ink-2"
        }`}
      >
        {due}
      </span>
      {!started ? "Start the hiragana drill" : due > 0 ? "Kana due for review" : "Kana all caught up"}
      <span aria-hidden className="text-accent transition-transform duration-200 ease-soft group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
