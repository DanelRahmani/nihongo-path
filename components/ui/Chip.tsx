import type { ButtonHTMLAttributes } from "react";

/** A pill that toggles one option on or off (aria-pressed). */
export function Chip({
  active,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors duration-150 ${
        active
          ? "border-accent bg-accent text-on-accent"
          : "border-line-strong bg-surface text-ink-2 hover:border-ink-2 hover:text-ink"
      } ${className}`}
      {...props}
    />
  );
}
