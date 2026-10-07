import type { HTMLAttributes } from "react";

/**
 * The one container style.
 * surface: a raised white card · outline: a hairline frame · tint: accent-washed · well: a recessed grey area.
 */
export type PanelTone = "surface" | "outline" | "tint" | "well";

const TONES: Record<PanelTone, string> = {
  surface: "rounded-card border border-line bg-surface shadow-card",
  outline: "rounded-card border border-line",
  tint: "rounded-card bg-accent-soft",
  well: "rounded-card bg-paper-2",
};

export function panelClass(tone: PanelTone = "surface", extra = ""): string {
  return `${TONES[tone]} ${extra}`;
}

export function Panel({ tone, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { tone?: PanelTone }) {
  return <div className={panelClass(tone, className)} {...props} />;
}
