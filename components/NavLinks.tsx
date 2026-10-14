"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { closeWhenFocusLeaves } from "@/components/ui/popover";

interface MenuItem {
  href: string;
  jp: string;
  label: string;
  text: string;
  match: (path: string) => boolean;
}

const LINKS = [
  { href: "/", jp: "道", label: "Path", match: (p: string) => p === "/" || p.startsWith("/learn") },
  { href: "/kana", jp: "かな", label: "Kana", match: (p: string) => p.startsWith("/kana") },
];

/** The drills, in the Practice menu (the kana drill lives on the Kana page, and is listed here too). */
const PRACTICE: MenuItem[] = [
  { href: "/review", jp: "復習", label: "Review", text: "Everything due from every drill, then your mistakes", match: (p) => p.startsWith("/review") },
  { href: "/kana#drill", jp: "かな", label: "Kana drill", text: "Hiragana and katakana, on the Kana page", match: (p) => p.startsWith("/kana") },
  { href: "/kanji/drill", jp: "漢字", label: "Kanji cards", text: "Type words in kanji with a Japanese keyboard", match: (p) => p.startsWith("/kanji/drill") },
  { href: "/vocabulary", jp: "単語", label: "Vocabulary", text: "English to Japanese cards for the lessons' words", match: (p) => p.startsWith("/vocabulary") },
  { href: "/cloze", jp: "穴埋め", label: "Fill the gap", text: "Lesson lines with the highlighted part missing", match: (p) => p.startsWith("/cloze") },
  { href: "/register", jp: "丁寧", label: "Polite and casual", text: "Say a lesson line in the other register", match: (p) => p.startsWith("/register") },
  { href: "/conjugation", jp: "活用", label: "Conjugation", text: "One verb or adjective, one form at a time", match: (p) => p.startsWith("/conjugation") },
  { href: "/type", jp: "入力", label: "Type it", text: "Copy lesson lines with a Japanese keyboard", match: (p) => p.startsWith("/type") },
  { href: "/keyboard", jp: "キーボード", label: "Japanese keyboard", text: "Set one up on a phone or computer", match: (p) => p.startsWith("/keyboard") },
];

/** Reference pages, in the Extras menu. */
const EXTRAS: MenuItem[] = [
  { href: "/grammar", jp: "文法", label: "Grammar overview", text: "Particles, grammar and verb forms on one page", match: (p) => p.startsWith("/grammar") },
  { href: "/dictionary", jp: "辞書", label: "Dictionary", text: "Every word, by kanji, kana, romaji or English", match: (p) => p.startsWith("/dictionary") || (p.startsWith("/kanji") && !p.startsWith("/kanji/drill")) },
  { href: "/read", jp: "読む", label: "Reading", text: "A sign, a menu, a chat, a story and haiku", match: (p) => p.startsWith("/read") },
];

const pill = (active: boolean) =>
  `flex h-9 items-center gap-1.5 rounded-full px-1.5 text-sm whitespace-nowrap transition-colors duration-150 sm:px-2.5 min-[50rem]:px-3.5 ${
    active ? "bg-accent-soft text-accent" : "text-ink-2 hover:bg-paper-2 hover:text-ink"
  }`;

/** A nav button that opens a popover menu of pages, fixed under the header and lined up under its button. */
function NavMenu({ id, jp, label, items, pathname }: { id: string; jp: string; label: string; items: MenuItem[]; pathname: string }) {
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const active = items.some((item) => item.match(pathname));

  // Kept on screen: the menu's left edge follows its button, within a 16 px margin.
  const place = () => {
    const b = button.current?.getBoundingClientRect();
    const m = menu.current;
    if (!b || !m) return;
    const width = Math.min(18 * 16, window.innerWidth - 32);
    m.style.left = `${Math.max(16, Math.min(b.left, window.innerWidth - width - 16))}px`;
  };

  return (
    <>
      <button ref={button} type="button" popoverTarget={id} onClick={place} className={pill(active)}>
        <span lang="ja" className="font-serif text-base">
          {jp}
        </span>
        <span className="sr-only min-[50rem]:not-sr-only">{label}</span>
        <span aria-hidden className="hidden text-xs min-[50rem]:inline">
          ▾
        </span>
      </button>

      <div
        ref={menu}
        id={id}
        popover="auto"
        onBlur={closeWhenFocusLeaves}
        aria-label={label}
        className="fixed top-[4.5rem] m-0 max-h-[calc(100dvh-6rem)] w-[min(18rem,calc(100vw-2rem))] overflow-y-auto rounded-panel border border-line bg-surface p-2 text-ink shadow-pop"
      >
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const current = item.match(pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => menu.current?.hidePopover()}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ${current ? "bg-accent-soft text-accent" : "hover:bg-paper-2"}`}
                >
                  <span lang="ja" aria-hidden className="w-14 shrink-0 font-serif text-lg font-bold whitespace-nowrap text-accent">
                    {item.jp}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{item.label}</span>
                    <span className="block text-xs text-ink-2">{item.text}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="flex items-center sm:ml-4 sm:gap-1">
      {LINKS.map((l) => {
        const active = l.match(pathname);
        return (
          <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={pill(active)}>
            <span lang="ja" className="font-serif text-base">
              {l.jp}
            </span>
            <span className="sr-only min-[50rem]:not-sr-only">{l.label}</span>
          </Link>
        );
      })}
      <NavMenu id="practice-menu" jp="練習" label="Practice" items={PRACTICE} pathname={pathname} />
      <NavMenu id="extras-menu" jp="参考" label="Extras" items={EXTRAS} pathname={pathname} />
    </nav>
  );
}
