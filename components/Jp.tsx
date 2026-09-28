"use client";

import { Fragment } from "react";
import type { ScriptMode } from "@/content/types";
import { hasJapanese, parse, type Token } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";
import { settingsStore } from "@/lib/stores";
import { useStore } from "@/lib/storage";

function renderTokens(tokens: Token[], mode: ScriptMode) {
  return tokens.map((t, i) => {
    // Kana-only text is spaced between words (as in children's books), or はは and は run together.
    if (t.kind === "space") return mode === "kana" ? <Fragment key={i}> </Fragment> : null;
    let node: React.ReactNode;
    if (t.kind === "text") {
      node = t.text;
    } else if (mode === "kana") {
      node = t.reading;
    } else if (mode === "kanji") {
      node = t.base;
    } else {
      node = (
        <ruby>
          {t.base}
          <rp>(</rp>
          <rt>{t.reading}</rt>
          <rp>)</rp>
        </ruby>
      );
    }
    if (t.bold) node = <strong className="font-bold">{node}</strong>;
    if (t.it) node = <em>{node}</em>;
    if (t.hl) node = <span className="hl">{node}</span>;
    return <Fragment key={i}>{node}</Fragment>;
  });
}

/** A Japanese phrase or sentence, shown per the reader's script mode, with an optional romaji line. */
export function Jp({
  jp,
  className = "",
  romaji = true,
}: {
  jp: string;
  className?: string;
  /** Allow the romaji line (still only shown when the reader has romaji on). */
  romaji?: boolean;
}) {
  const [settings] = useStore(settingsStore);
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span lang="ja">{renderTokens(parse(jp, true), settings.script)}</span>
      {romaji && settings.romaji && (
        <span className="mt-1 font-sans text-[0.55em] leading-snug font-normal tracking-wide text-ink-2 [font-size:max(0.55em,0.8rem)]">
          {romajiOf(jp)}
        </span>
      )}
    </span>
  );
}

/** Prose with inline Japanese, **bold** and {highlights}. */
export function Rich({ text, className }: { text: string; className?: string }) {
  const [settings] = useStore(settingsStore);
  return <span className={className}>{renderTokens(parse(text, false), settings.script)}</span>;
}

/** Table cell: Japanese cells get a romaji line when romaji is on. */
export function Cell({ text }: { text: string }) {
  const [settings] = useStore(settingsStore);
  const tokens = parse(text, false);
  const showRomaji = settings.romaji && hasJapanese(text) && !/[a-z]/i.test(text.replace(/\[[^\]]*\]/g, ""));
  return (
    <span className="inline-flex flex-col">
      <span>{renderTokens(tokens, settings.script)}</span>
      {showRomaji && <span className="text-xs text-ink-2">{romajiOf(text)}</span>}
    </span>
  );
}
