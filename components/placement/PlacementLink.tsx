"use client";

import Link from "next/link";
import { useStore } from "@/lib/storage";
import { progressStore } from "@/lib/stores";

/** Lessons finished after which the home page stops offering the check. */
const OFFER_UNTIL = 10;

/** The home page's offer of the placement check, shown only while few lessons are finished. */
export function PlacementLink() {
  const [progress] = useStore(progressStore);
  if (Object.keys(progress).length >= OFFER_UNTIL) return null;
  return (
    <p className="mt-3 text-sm text-ink-2">
      Know some Japanese already?{" "}
      <Link href="/placement" className="text-accent hover:underline">
        Take the placement check
      </Link>{" "}
      to find where to start.
    </p>
  );
}
