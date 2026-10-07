import type { ReactNode } from "react";

/** The small spaced-out label above a heading. An optional Japanese word leads it in mincho. */
export function Eyebrow({
  jp,
  children,
  className = "",
  as: Tag = "div",
  id,
}: {
  jp?: string;
  children: ReactNode;
  className?: string;
  /** A heading tag when the label is the section's heading. */
  as?: "div" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag id={id} className={`flex items-baseline gap-2 text-xs font-medium tracking-[0.2em] text-ink-2 uppercase ${className}`}>
      {jp && (
        <span lang="ja" className="font-serif text-sm tracking-normal text-accent normal-case">
          {jp}
        </span>
      )}
      <span>{children}</span>
    </Tag>
  );
}
