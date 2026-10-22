"use client";

import { type ReactNode, useState, useSyncExternalStore } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { JLPT_FILTER_LEVELS } from "@/content/jlpt";
import type { JlptLevel } from "@/content/types";

const noSubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(noSubscribe, () => true, () => false);

type Choice = "all" | JlptLevel;

/**
 * The grammar overview's level filter: chips that hide the topics of other levels, through `data-level` on the
 * wrapper and the CSS in app/globals.css. The chips appear once the page is interactive; until then, and without
 * JavaScript, every topic shows.
 */
export function GrammarLevels({ counts, children }: { counts: Record<string, number>; children: ReactNode }) {
  const mounted = useMounted();
  const [level, setLevel] = useState<Choice>("all");
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const shown = level === "all" ? total : (counts[level] ?? 0);
  return (
    <div data-level={level === "all" ? undefined : level}>
      <div className={`mt-8 max-w-xs ${mounted ? "" : "invisible"}`}>
        <Segmented<Choice>
          legend="JLPT level"
          name="jlpt-level"
          value={level}
          options={[{ value: "all", label: "All" }, ...JLPT_FILTER_LEVELS.map((l) => ({ value: l, label: l }))]}
          onChange={setLevel}
        />
      </div>
      <p role="status" className="sr-only">
        {mounted && level !== "all" ? `${shown} ${level} topics shown` : ""}
      </p>
      {children}
    </div>
  );
}
