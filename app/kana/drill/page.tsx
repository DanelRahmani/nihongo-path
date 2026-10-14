import type { Metadata } from "next";
import { MovedTo } from "@/components/MovedTo";

// The kana drill moved onto the Kana page; old links and bookmarks land here and are sent on.
export const metadata: Metadata = { title: "Kana drill", robots: { index: false } };

export default function DrillMovedPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <h1 className="font-serif text-4xl font-bold">Kana drill</h1>
      <MovedTo href="/kana#drill" label="the Kana page" />
    </div>
  );
}
