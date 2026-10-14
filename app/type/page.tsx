import type { Metadata } from "next";
import { TypeIt } from "@/components/type-it/TypeIt";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { typeLines } from "@/lib/type-lines";

export const metadata: Metadata = { title: "Type it" };

export default function TypeItPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Keyboard practice</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">入力</span> <span className="text-2xl text-ink-2">Type it</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Copy a lesson line with a Japanese keyboard, in kana or in kanji. Japanese lines have no spaces, and <span lang="ja">、</span> and <span lang="ja">。</span> come
        from the Japanese keyboard, not the English one.
      </p>
      <div className="mt-8">
        <TypeIt lines={typeLines()} />
      </div>
    </div>
  );
}
