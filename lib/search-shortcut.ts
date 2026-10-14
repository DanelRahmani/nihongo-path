/**
 * The search shortcut: / or Ctrl/⌘K, outside text fields. Its own module with no imports, so the header's
 * launcher, on every page, doesn't pull the search code into the first load.
 */

/** The parts of a keyboard event the shortcut needs, so it is testable without a DOM. */
export interface ShortcutEvent {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  isComposing?: boolean;
  target: EventTarget | { tagName?: string; type?: string; isContentEditable?: boolean } | null;
}

/** Inputs that take typed text (a checkbox or a radio button doesn't). */
const TEXT_INPUTS = new Set(["text", "search", "email", "url", "tel", "password", "number", "date", "time", "datetime-local", "month", "week"]);

/** True when the reader is typing into the target, where / and Ctrl/⌘K are text, not commands. */
export function isTypingTarget(target: ShortcutEvent["target"]): boolean {
  if (!target || typeof target !== "object") return false;
  const el = target as { tagName?: string; type?: string; isContentEditable?: boolean };
  const tag = el.tagName?.toUpperCase();
  return el.isContentEditable === true || tag === "TEXTAREA" || tag === "SELECT" || (tag === "INPUT" && TEXT_INPUTS.has((el.type ?? "text").toLowerCase()));
}

/**
 * / or Ctrl/⌘K, outside text fields and outside a keyboard's composition (IME). Not Ctrl+Shift+K, Firefox's web
 * console; K is matched in either case for Caps Lock.
 */
export function isSearchShortcut(e: ShortcutEvent): boolean {
  if (e.isComposing || e.altKey || isTypingTarget(e.target)) return false;
  if (e.key.toLowerCase() === "k") return (e.ctrlKey || e.metaKey) && !e.shiftKey;
  return e.key === "/" && !e.ctrlKey && !e.metaKey;
}
