/**
 * The class of a typed-answer box (the drills, the quiz, the review queue, the placement check, Type it). Focus is
 * shown by the accent border with a soft ring around it. `jp` boxes take Japanese in the Japanese typeface, with an
 * English placeholder.
 */
export function fieldClass({ size = "lg", jp = true }: { size?: "md" | "lg"; jp?: boolean } = {}): string {
  const base =
    "min-w-0 flex-1 rounded-full border border-line-strong bg-surface placeholder:text-ink-2/70 focus:border-accent focus:ring-4 focus:ring-accent/20 focus:outline-none";
  if (size === "md") return `${base} h-11 px-5 text-lg placeholder:font-sans placeholder:text-sm${jp ? " font-jp" : ""}`;
  return `${base} h-14 px-6 text-xl${jp ? " font-jp placeholder:font-sans placeholder:text-base" : ""}`;
}
