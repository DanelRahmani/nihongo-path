import type { ReactNode } from "react";

/** A one-of-several choice drawn as cards or pills: real radio buttons, so arrow keys and screen readers work. */
export function Segmented<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  columns,
}: {
  legend: string;
  name: string;
  value: T;
  options: { value: T; label: ReactNode; sample?: ReactNode }[];
  onChange: (value: T) => void;
  /** Grid columns; defaults to one per option. */
  columns?: number;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-medium tracking-[0.18em] text-ink-2 uppercase">{legend}</legend>
      <div className="mt-2.5 grid gap-2" style={{ gridTemplateColumns: `repeat(${columns ?? options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <label
              key={o.value}
              className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border px-2 py-2 text-center transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent ${
                active ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong hover:bg-paper-2"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={active}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              {o.sample}
              <span className={`text-xs ${active ? "font-medium text-accent" : "text-ink-2"}`}>{o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
