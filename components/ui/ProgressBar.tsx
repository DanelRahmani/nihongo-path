/** A thin progress bar. Pass `label` to announce it; leave it out when a visible count says the same. */
export function ProgressBar({ value, max, label, className = "" }: { value: number; max: number; label?: string; className?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      {...(label
        ? { role: "progressbar", "aria-label": label, "aria-valuemin": 0, "aria-valuemax": max, "aria-valuenow": value }
        : { "aria-hidden": true })}
      className={`h-1.5 overflow-hidden rounded-full bg-paper-3 ${className}`}
    >
      <div className="h-full rounded-full bg-accent transition-[width] duration-500 ease-soft" style={{ width: `${pct}%` }} />
    </div>
  );
}
