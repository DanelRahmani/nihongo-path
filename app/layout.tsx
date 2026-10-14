import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import Link from "next/link";
import { DisplaySettings } from "@/components/DisplaySettings";
import { InlineScript } from "@/components/InlineScript";
import { NavLinks } from "@/components/NavLinks";
import { SearchLauncher } from "@/components/search/SearchLauncher";
import { ServiceWorker } from "@/components/ServiceWorker";
import { FocusIntoView } from "@/components/FocusIntoView";
import { FuriganaRules } from "@/components/FuriganaRules";
import { DEFAULT_ATTRIBUTES, furiganaScript, HEAD_SCRIPT } from "@/lib/display";
import { furiganaKanji } from "@/lib/kanji-cards";
import "./globals.css";

const mincho = Shippori_Mincho({
  variable: "--font-mincho",
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  preload: false,
});

const gothic = Zen_Kaku_Gothic_New({
  variable: "--font-gothic",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: { default: "Nihongo Path", template: "%s · Nihongo Path" },
  description: "Learn kana, particles, grammar and conversation culture with clear example pairs.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1e" },
  ],
};

/** Every kanji the app shows, for "furigana on new kanji" (worked out once, at build time). */
const FURIGANA_KANJI = furiganaKanji();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The head script swaps the default display attributes for the reader's before the first paint,
    // so React must accept <html> as it finds it.
    <html lang="en" {...DEFAULT_ATTRIBUTES} suppressHydrationWarning className={`${mincho.variable} ${gothic.variable} h-full`}>
      <head>
        <InlineScript html={HEAD_SCRIPT} />
        <InlineScript html={furiganaScript(FURIGANA_KANJI)} />
      </head>
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
          <div className="mx-auto flex h-16 max-w-5xl items-center gap-1 px-4 sm:gap-4 sm:px-6">
            <Link href="/" className="group flex min-h-9 min-w-9 shrink-0 items-center gap-2 sm:gap-3" aria-label="Nihongo Path home">
              <span className="size-3.5 rounded-full bg-accent shadow-[0_0_0_4px_var(--accent-soft)] transition-transform duration-300 ease-soft group-hover:scale-110" />
              <span lang="ja" className="font-serif text-base font-bold tracking-wide whitespace-nowrap max-[419px]:hidden sm:text-xl sm:tracking-wider">
                日本語の道
              </span>
            </Link>
            <NavLinks />
            <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
              <SearchLauncher />
              <DisplaySettings />
            </div>
          </div>
        </header>
        <FuriganaRules kanji={FURIGANA_KANJI} />
        <ServiceWorker />
        <FocusIntoView />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <footer className="border-t border-line bg-paper-2">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-8 text-xs text-ink-2 sm:px-6">
            <span>
              Nihongo Path · a personal study app ·{" "}
              <Link href="/data" className="underline-offset-2 hover:text-accent hover:underline">
                Your data
              </Link>{" "}
              ·{" "}
              <Link href="/credits" className="underline-offset-2 hover:text-accent hover:underline">
                Credits
              </Link>
              <span className="mt-1 block">Dictionary and kanji data: JMdict and KANJIDIC2 © EDRDG, wordfreq; CC BY-SA 4.0.</span>
            </span>
            <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">
              <span lang="ja" className="font-serif text-sm text-ink">
                一歩ずつ
              </span>
              <span className="sr-only sm:not-sr-only">one step at a time</span>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
