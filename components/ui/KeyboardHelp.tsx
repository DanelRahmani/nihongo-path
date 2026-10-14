import Link from "next/link";

/**
 * True when an answer meant for a Japanese keyboard was typed in English letters only (no kana or kanji): the reader
 * may not have a Japanese keyboard yet. Full-width letters count as letters.
 */
export const typedWithoutJapanese = (typed: string) => /[a-zＡ-Ｚａ-ｚ]/i.test(typed) && !/[぀-ヿ\p{Script=Han}]/u.test(typed);

/** A short line under a miss typed in English letters, linking the keyboard set-up page. */
export function KeyboardHelp({ className = "" }: { className?: string }) {
  return (
    <p className={`text-sm text-ink-2 ${className}`}>
      No Japanese keyboard yet?{" "}
      <Link href="/keyboard" className="link-inline">
        Set up a Japanese keyboard
      </Link>
    </p>
  );
}
