"use client";

import { type ComponentPropsWithoutRef, type ReactNode, type Ref, useCallback, useEffect, useRef, useState } from "react";

type StripProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  /** The element the strip is: a plain div (tabs, radios) or a nav (a strip of links). */
  as?: "div" | "nav";
  ref?: Ref<HTMLElement>;
  children: ReactNode;
};

/**
 * A horizontal scroll strip (`.scroll-strip`) with ‹ › buttons at the ends that scroll it, shown on devices with a
 * fine pointer while there is more to see that way. A mouse has no other way to scroll a strip whose scrollbar is
 * hidden; touch swipes, and the keyboard moves through the strip's own items. The buttons are for the pointer only,
 * so they are kept out of the Tab order and hidden from screen readers. They appear after mounting (the server can't
 * measure), so the page doesn't change between the server's HTML and hydration.
 */
export function ArrowStrip({ as: Tag = "div", ref, className = "", children, ...rest }: StripProps) {
  const inner = useRef<HTMLElement | null>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      inner.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const update = () => {
      const start = el.scrollLeft > 1;
      const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      setEdges((e) => (e.start === start && e.end === end ? e : { start, end }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    for (const child of el.children) resize.observe(child);
    return () => {
      el.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, []);

  const scroll = (direction: 1 | -1) => {
    const el = inner.current;
    if (!el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: smooth ? "smooth" : "auto" });
  };

  const arrow = (direction: 1 | -1) => (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      // Keep focus where it is (a click would otherwise focus this hidden button, and arrow keys in the strip stop).
      onPointerDown={(e) => e.preventDefault()}
      onClick={() => scroll(direction)}
      className={`absolute top-1/2 z-10 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-surface text-lg leading-none text-ink-2 shadow-card transition-colors duration-150 pointer-fine:grid hover:border-accent hover:text-accent ${
        direction < 0 ? "-left-2 sm:-left-4" : "-right-2 sm:-right-4"
      }`}
    >
      {direction < 0 ? "‹" : "›"}
    </button>
  );

  return (
    <div className="relative">
      <Tag ref={setRef} className={className} {...rest}>
        {children}
      </Tag>
      {edges.start && arrow(-1)}
      {edges.end && arrow(1)}
    </div>
  );
}
