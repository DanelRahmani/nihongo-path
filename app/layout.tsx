import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import Link from "next/link";
import { DisplaySettings } from "@/components/DisplaySettings";
import { NavLinks } from "@/components/NavLinks";
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
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1e" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${mincho.variable} ${gothic.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6">
            <Link href="/" className="group flex items-center gap-3" aria-label="Nihongo Path home">
              <span className="size-3.5 rounded-full bg-accent transition-transform group-hover:scale-110" />
              <span lang="ja" className="font-serif text-xl font-bold tracking-wider">
                日本語の道
              </span>
            </Link>
            <NavLinks />
            <div className="ml-auto">
              <DisplaySettings />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-xs text-ink-2 sm:px-6">
            <span>Nihongo Path — a personal study app</span>
            <span lang="ja" className="font-serif">
              一歩ずつ
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
