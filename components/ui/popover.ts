import type { FocusEvent } from "react";

/**
 * A popover's onBlur: closes it when keyboard focus moves to something outside it, so it never covers the element
 * that now has focus (WCAG 2.4.11). Focus moving nowhere (a tap on the popover's own text) or to its toggle button
 * (which toggles it itself) leaves it open; taps outside are already handled by the popover's light dismiss.
 */
export function closeWhenFocusLeaves(e: FocusEvent<HTMLElement>) {
  const next = e.relatedTarget;
  if (!(next instanceof Element) || e.currentTarget.contains(next)) return;
  if (next.getAttribute("popovertarget") === e.currentTarget.id) return;
  if (e.currentTarget.matches(":popover-open")) e.currentTarget.hidePopover();
}
