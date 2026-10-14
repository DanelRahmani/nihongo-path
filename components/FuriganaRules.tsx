"use client";

import { useEffect } from "react";
import { FURIGANA_STYLE_ID, furiganaCss } from "@/lib/display";
import { learnedKanji } from "@/lib/kanji-deck";
import { useStore } from "@/lib/storage";
import { srsStore } from "@/lib/stores";

/**
 * Keeps the "furigana on new kanji" rules in step with the kanji cards: the head script wrote them before the
 * first paint, and each kanji learned (or forgotten) since rewrites them. Renders nothing.
 */
export function FuriganaRules({ kanji }: { kanji: string }) {
  // Only a trigger: during hydration it holds the server's empty schedule, so the rules read the store itself.
  const [srs] = useStore(srsStore);
  useEffect(() => {
    let style = document.getElementById(FURIGANA_STYLE_ID);
    if (!style) {
      style = Object.assign(document.createElement("style"), { id: FURIGANA_STYLE_ID });
      document.head.append(style);
    }
    const css = furiganaCss(kanji, learnedKanji(srsStore.get()));
    // Most answers (every kana card) change no kanji: leave the 20 KB of rules alone then.
    if (style.textContent !== css) style.textContent = css;
  }, [kanji, srs]);
  return null;
}
