import type { Metadata } from "next";
import { DictionaryBrowser } from "@/components/dictionary/DictionaryBrowser";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Dictionary" };

export default function DictionaryPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Lesson words and kanji examples</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">辞書</span> <span className="text-2xl text-ink-2">Dictionary</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Search in kanji, in kana or in romaji (kyou, kyō and kyo all find <span lang="ja">今日</span>), or in English. Tap a word
        for its kanji, and ☆ to keep it in My words, which you can download for a spreadsheet or Anki.
      </p>
      <div className="mt-8">
        <DictionaryBrowser />
      </div>
      <p className="mt-12 text-xs leading-relaxed text-ink-2">
        Expansion: words that appear only as kanji examples. Parts of speech checked against JMdict © EDRDG, licensed CC BY-SA
        4.0.
      </p>
    </div>
  );
}
