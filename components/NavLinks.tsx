"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const LINKS = [
  { href: "/", jp: "道", label: "Path", match: (p: string) => p === "/" || p.startsWith("/learn") },
  { href: "/kana", jp: "かな", label: "Kana", match: (p: string) => p === "/kana" },
  { href: "/kana/drill", jp: "練習", label: "Drill", match: (p: string) => p.startsWith("/kana/drill") || p.startsWith("/kanji/drill") || p.startsWith("/conjugation") || p.startsWith("/vocabulary") },
];

/** Reference pages, in the Extras menu. */
const EXTRAS = [
  { href: "/grammar", jp: "文法", label: "Grammar overview", text: "Particles, grammar and verb forms on one page", match: (p: string) => p.startsWith("/grammar") },
  { href: "/dictionary", jp: "辞書", label: "Dictionary", text: "Every word, by kanji, kana, romaji or English", match: (p: string) => p.startsWith("/dictionary") || (p.startsWith("/kanji") && !p.startsWith("/kanji/drill")) },
  { href: "/read", jp: "読む", label: "Reading", text: "A sign, a menu, a chat, a story and haiku", match: (p: string) => p.startsWith("/read") },
];

const pill = (active: boolean) =>
  `flex h-9 items-center gap-1.5 rounded-full px-1.5 text-sm whitespace-nowrap transition-colors duration-150 sm:px-3.5 ${
    active ? "bg-accent-soft text-accent" : "text-ink-2 hover:bg-paper-2 hover:text-ink"
  }`;

export function NavLinks() {
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const extrasActive = EXTRAS.some((e) => e.match(pathname));

  // The menu is fixed to the viewport: line it up under its button, kept on screen.
  const place = () => {
    const b = button.current?.getBoundingClientRect();
    const m = menu.current;
    if (!b || !m) return;
    const width = Math.min(18 * 16, window.innerWidth - 32);
    m.style.left = `${Math.max(16, Math.min(b.left, window.innerWidth - width - 16))}px`;
  };

  return (
    <nav aria-label="Main" className="flex items-center sm:ml-4 sm:gap-1">
      {LINKS.map((l) => {
        const active = l.match(pathname);
        return (
          <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={pill(active)}>
            <span lang="ja" className="font-serif text-base">
              {l.jp}
            </span>
            <span className="sr-only sm:not-sr-only">{l.label}</span>
          </Link>
        );
      })}

      <button ref={button} type="button" popoverTarget="extras-menu" onClick={place} className={pill(extrasActive)}>
        <span lang="ja" className="font-serif text-base">
          参考
        </span>
        <span className="sr-only sm:not-sr-only">Extras</span>
        <span aria-hidden className="hidden text-xs sm:inline">
          ▾
        </span>
      </button>

      <div
        ref={menu}
        id="extras-menu"
        popover="auto"
        aria-label="Extras"
        className="fixed top-[4.5rem] m-0 w-[min(18rem,calc(100vw-2rem))] rounded-panel border border-line bg-surface p-2 text-ink shadow-pop"
      >
        <ul className="flex flex-col gap-1">
          {EXTRAS.map((e) => {
            const active = e.match(pathname);
            return (
              <li key={e.href}>
                <Link
                  href={e.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => menu.current?.hidePopover()}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ${active ? "bg-accent-soft text-accent" : "hover:bg-paper-2"}`}
                >
                  <span lang="ja" aria-hidden className="w-9 shrink-0 font-serif text-lg font-bold text-accent">
                    {e.jp}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{e.label}</span>
                    <span className="block text-xs text-ink-2">{e.text}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
