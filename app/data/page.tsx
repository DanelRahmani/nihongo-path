import type { Metadata } from "next";
import { DataBackup } from "@/components/data/DataBackup";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Your data" };

export default function DataPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Backup and restore</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">記録</span> <span className="text-2xl text-ink-2">Your data</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Your progress lives only in this browser: nothing is sent anywhere. Save it to a file to keep a copy, or to move it
        to another device or browser.
      </p>
      <div className="mt-8">
        <DataBackup />
      </div>
    </div>
  );
}
