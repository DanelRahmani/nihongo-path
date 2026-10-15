import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { panelClass } from "@/components/ui/Panel";
import { NEW_CARDS_DONE } from "@/lib/new-cards";
import { formatWait } from "@/lib/srs";

/**
 * The drills' panel when nothing is left to ask. `held`: today's new-card limit (I7) holds back cards that would
 * otherwise come; `started`: the learner has studied a card of this deck. Held before the first card, the deck
 * simply starts tomorrow: no "well done", and nothing to practise or open.
 */
export function CaughtUp({
  nextDue,
  now,
  held,
  started,
  onPractise,
  unlock,
}: {
  nextDue: number | null;
  now: number;
  held: boolean;
  started: boolean;
  onPractise: () => void;
  /** "I know these: open the next group", where the deck offers it. Hidden while the limit holds cards back. */
  unlock?: { label: string; onClick: () => void };
}) {
  if (held && !started) {
    return (
      <div className={panelClass("surface", "rise mt-6 p-8 text-center")}>
        <p className="text-lg font-medium">This deck starts tomorrow</p>
        <p className="mt-1 text-sm text-ink-2">
          Today&apos;s new cards went to other drills. To start this one today, raise “New cards a day” on the{" "}
          <Link href="/" className="link-inline">
            home page
          </Link>
          .
        </p>
      </div>
    );
  }
  return (
    <div className={panelClass("surface", "rise mt-6 p-8 text-center")}>
      <p lang="ja" className="font-serif text-5xl text-accent">
        お見事
      </p>
      <p className="mt-3 text-lg font-medium">All caught up</p>
      <p className="mt-1 text-sm text-ink-2">
        {held && `${NEW_CARDS_DONE} `}
        {nextDue
          ? `The next card is due in ${formatWait(nextDue - now)}. Spacing reviews out is what makes them stick.`
          : held
            ? ""
            : "Nothing is scheduled yet."}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button variant="secondary" onClick={onPractise}>
          Practise anyway
        </Button>
        {unlock && !held && <Button onClick={unlock.onClick}>{unlock.label}</Button>}
      </div>
      <p className="mt-4 text-xs text-ink-2">Practice doesn&apos;t change your review schedule.</p>
    </div>
  );
}
