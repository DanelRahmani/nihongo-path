import type { ReactNode } from "react";

/** Answer feedback, marked the Japanese way: ○ (maru) for right, ✕ (batsu) for wrong. */
export type FeedbackKind = "good" | "bad" | "info";

const STYLE: Record<FeedbackKind, { box: string; mark: string; label: string }> = {
  good: { box: "bg-good-soft", mark: "text-good", label: "Correct" },
  bad: { box: "bg-accent-soft", mark: "text-accent", label: "Not quite" },
  info: { box: "bg-paper-2", mark: "text-ink-2", label: "Note" },
};

const MARK: Record<FeedbackKind, string> = { good: "○", bad: "✕", info: "・" };

export function Feedback({ kind, children, className = "" }: { kind: FeedbackKind; children: ReactNode; className?: string }) {
  const s = STYLE[kind];
  return (
    <div className={`flex gap-3 rounded-2xl px-4 py-3 text-[0.95rem] leading-7 ${s.box} ${className}`}>
      <span aria-label={s.label} role="img" className={`font-serif text-lg leading-7 font-bold ${s.mark}`}>
        {MARK[kind]}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
