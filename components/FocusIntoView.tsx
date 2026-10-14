"use client";

import { useEffect } from "react";

/**
 * Chrome leaves an element that takes focus half outside a horizontal scroller (a strip of tabs, a wide table) when
 * part of it already shows, so its focus ring is cut off. This scrolls the scroller until the element and its
 * scroll-margin (room for the ring, set in globals.css) are inside it. Vertical scrolling is left to the browser.
 */
export function FocusIntoView() {
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
        const overflow = getComputedStyle(n).overflowX;
        if (overflow !== "auto" && overflow !== "scroll") continue;
        const r = el.getBoundingClientRect();
        const box = n.getBoundingClientRect();
        const style = getComputedStyle(el);
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
