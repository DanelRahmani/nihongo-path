"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", jp: "道", label: "Path", match: (p: string) => p === "/" || p.startsWith("/learn") },
  { href: "/kana", jp: "かな", label: "Kana", match: (p: string) => p === "/kana" },
  { href: "/kana/drill", jp: "練習", label: "Drill", match: (p: string) => p.startsWith("/kana/drill") },
  { href: "/dictionary", jp: "辞書", label: "Dictionary", match: (p: string) => p.startsWith("/dictionary") || p.startsWith("/kanji") },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="flex items-center sm:ml-4 sm:gap-1">
      {LINKS.map((l) => {
        const active = l.match(pathname);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`flex h-9 items-center gap-1.5 rounded-full px-1.5 text-sm whitespace-nowrap transition-colors duration-150 sm:px-3.5 ${
              active ? "bg-accent-soft text-accent" : "text-ink-2 hover:bg-paper-2 hover:text-ink"
            }`}
          >
            <span lang="ja" className="font-serif text-base">
              {l.jp}
            </span>
            <span className="sr-only sm:not-sr-only">{l.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
