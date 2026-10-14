"use client";

import { useEffect } from "react";

/**
 * Chrome leaves an element that takes keyboard focus half outside a horizontal scroller (a strip of tabs, a wide
 * table) when part of it already shows, so its focus ring is cut off. This scrolls the scroller until the element
 * that draws the ring, with its scroll-margin (room for the ring, set in globals.css), is inside it. A visually
 * hidden radio draws its ring on its label, so the label is measured. Vertical scrolling is left to the browser, and
 * a tap (no :focus-visible) scrolls nothing, so a strip doesn't jump under the finger.
 */
export function FocusIntoView() {
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const el = e.target;
      if (!(el instanceof HTMLElement) || !el.matches(":focus-visible")) return;
      const target = el.closest<HTMLElement>(".ring-within, label") ?? el;
      for (let n = target.parentElement; n && n !== document.body; n = n.parentElement) {
        const overflow = getComputedStyle(n).overflowX;
        if ((overflow !== "auto" && overflow !== "scroll") || n.scrollWidth <= n.clientWidth) continue;
        const r = target.getBoundingClientRect();
        const box = n.getBoundingClientRect();
        const style = getComputedStyle(target);
        const left = r.left - (parseFloat(style.scrollMarginLeft) || 0);
        const right = r.right + (parseFloat(style.scrollMarginRight) || 0);
        if (left < box.left) n.scrollLeft -= box.left - left;
        else if (right > box.right) n.scrollLeft += right - box.right;
        return;
      }
    };
    document.addEventListener("focusin", onFocus);
    return () => document.removeEventListener("focusin", onFocus);
  }, []);
  return null;
}
