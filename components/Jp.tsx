"use client";

import { Fragment } from "react";
import type { ScriptMode } from "@/content/types";
import { isJpOnly, langRuns, parse, type Token } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";
import { settingsStore } from "@/lib/stores";
import { useStore } from "@/lib/storage";

type Styled = { hl: boolean; bold: boolean; it: boolean };

function styled(t: Styled, node: React.ReactNode): React.ReactNode {
  if (t.bold) node = <strong className="font-bold">{node}</strong>;
  if (t.it) node = <em>{node}</em>;
  if (t.hl) node = <span className="hl">{node}</span>;
  return node;
}

function kanjiWord(t: Extract<Token, { kind: "ruby" }>, mode: ScriptMode): React.ReactNode {
  if (mode === "kana") return t.reading;
  if (mode === "kanji") return t.base;
  return (
    <ruby>
      {t.base}
      <rp>(</rp>
      <rt>{t.reading}</rt>
      <rp>)</rp>
    </ruby>
  );
}

/** A Japanese line: the caller puts lang="ja" on the whole line. */
function renderLine(tokens: Token[], mode: ScriptMode) {
  return tokens.map((t, i) => {
    // Kana-only text is spaced between words (as in children's books), or はは and は run together.
    if (t.kind === "space") return mode === "kana" ? <Fragment key={i}> </Fragment> : null;
    if (t.kind === "join") return null;
    return <Fragment key={i}>{styled(t, t.kind === "text" ? t.text : kanjiWord(t, mode))}</Fragment>;
  });
}

/**
 * English prose with Japanese inside: each stretch of Japanese gets one lang="ja" span, so it is set
 * in a Japanese font with Japanese line breaking.
 */
function renderProse(tokens: Token[], mode: ScriptMode) {
  const pieces: { ja: boolean; node: React.ReactNode }[] = [];
  for (const t of tokens) {
    if (t.kind === "text") for (const run of langRuns(t.text)) pieces.push({ ja: run.ja, node: styled(t, run.text) });
    else if (t.kind === "ruby") pieces.push({ ja: true, node: styled(t, kanjiWord(t, mode)) });
  }
  const out: React.ReactNode[] = [];
  let group: React.ReactNode[] = [];
  const flush = () => {
    if (group.length) out.push(<span key={out.length} lang="ja">{group}</span>);
    group = [];
  };
  pieces.forEach((p, k) => {
    if (p.ja) {
      group.push(<Fragment key={k}>{p.node}</Fragment>);
    } else {
      flush();
      out.push(<Fragment key={out.length}>{p.node}</Fragment>);
    }
  });
  flush();
  return out;
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
      <span lang="ja">{renderLine(parse(jp, true), settings.script)}</span>
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
  return <span className={className}>{renderProse(parse(text, false), settings.script)}</span>;
}

/** Table cell: Japanese cells get a romaji line when romaji is on. */
export function Cell({ text }: { text: string }) {
  const [settings] = useStore(settingsStore);
  // Japanese-only cells use word spaces like examples; mixed cells are prose.
  const jpOnly = isJpOnly(text);
  const tokens = parse(text, jpOnly);
  const showRomaji = settings.romaji && jpOnly;
  return (
    <span className="inline-flex flex-col">
      {jpOnly ? <span lang="ja">{renderLine(tokens, settings.script)}</span> : <span>{renderProse(tokens, settings.script)}</span>}
      {showRomaji && <span className="text-xs text-ink-2">{romajiOf(text)}</span>}
    </span>
  );
}
