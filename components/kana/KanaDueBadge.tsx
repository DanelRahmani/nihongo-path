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
      className="inline-flex items-center gap-3 rounded-full border border-line py-1.5 pr-4 pl-1.5 text-sm transition-colors hover:border-accent"
    >
      <span
        className={`grid h-7 min-w-7 place-items-center rounded-full px-2 text-xs font-bold tabular-nums ${
          due > 0 ? "bg-accent text-on-accent" : "bg-paper-2 text-ink-2"
        }`}
      >
        {due}
      </span>
      {!started ? "Start the hiragana drill" : due > 0 ? "Kana due for review" : "Kana all caught up"}
      <span aria-hidden className="text-accent">
        →
      </span>
    </Link>
  );
}
