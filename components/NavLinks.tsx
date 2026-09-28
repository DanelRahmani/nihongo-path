"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", jp: "道", label: "Path", match: (p: string) => p === "/" || p.startsWith("/learn") },
  { href: "/kana", jp: "かな", label: "Kana", match: (p: string) => p === "/kana" },
  { href: "/kana/drill", jp: "練習", label: "Drill", match: (p: string) => p.startsWith("/kana/drill") },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="flex items-center sm:ml-6 sm:gap-1">
      {LINKS.map((l) => {
        const active = l.match(pathname);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-baseline gap-1.5 px-2 py-2 text-sm whitespace-nowrap transition-colors sm:px-2.5 ${
              active ? "text-accent" : "text-ink-2 hover:text-ink"
            }`}
          >
            <span lang="ja" className="font-serif text-base">
              {l.jp}
            </span>
            <span className="hidden sm:inline">{l.label}</span>
            {active && <span className="absolute inset-x-2 -bottom-[13px] h-0.5 bg-accent sm:inset-x-2.5" />}
          </Link>
        );
      })}
    </nav>
  );
}
