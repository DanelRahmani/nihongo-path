import type { ReactNode } from "react";

/** The small spaced-out label above a heading. An optional Japanese word leads it in mincho. */
export function Eyebrow({ jp, children, className = "" }: { jp?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-baseline gap-2 text-xs font-medium tracking-[0.2em] text-ink-2 uppercase ${className}`}>
      {jp && (
        <span lang="ja" className="font-serif text-sm tracking-normal text-accent normal-case">
          {jp}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
