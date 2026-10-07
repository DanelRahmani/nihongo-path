import { Fragment } from "react";
import { isJpOnly, langRuns, parse, type Token } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";

/*
 * Japanese is rendered once with every display variant in the HTML: each kanji word carries its ruby
 * and its kana reading, word spaces are present, and the romaji line is there. CSS keyed on the <html>
 * attributes from lib/display.ts shows the right one, so nothing here depends on the reader's settings
 * and nothing flashes when they load.
 */

type Styled = { hl: boolean; bold: boolean; it: boolean };

function styled(t: Styled, node: React.ReactNode): React.ReactNode {
  if (t.bold) node = <strong className="font-bold">{node}</strong>;
  if (t.it) node = <em>{node}</em>;
  if (t.hl) node = <span className="hl">{node}</span>;
  return node;
}

/** A kanji word: ruby for the furigana modes, the bare reading for kana-only. data-k lists its kanji. */
function KanjiWord({ t }: { t: Extract<Token, { kind: "ruby" }> }) {
  return (
    <span className="w" data-k={t.base}>
      <ruby>
        {t.base}
        <rp>(</rp>
        <rt>{t.reading}</rt>
        <rp>)</rp>
      </ruby>
      <span className="yomi">{t.reading}</span>
    </span>
  );
}

/** A Japanese line: the caller puts lang="ja" on the whole line. */
function renderLine(tokens: Token[]) {
  return tokens.map((t, i) => {
    // Word spaces show only in kana-only mode (as in children's books), or はは and は run together.
    if (t.kind === "space") return <span key={i} className="ws"> </span>;
    if (t.kind === "join") return null;
    return <Fragment key={i}>{styled(t, t.kind === "text" ? t.text : <KanjiWord t={t} />)}</Fragment>;
  });
}

/**
 * English prose with Japanese inside: each stretch of Japanese gets one lang="ja" span, so it is set
 * in a Japanese font with Japanese line breaking.
 */
function renderProse(tokens: Token[]) {
  const pieces: { ja: boolean; node: React.ReactNode }[] = [];
  for (const t of tokens) {
    if (t.kind === "text") for (const run of langRuns(t.text)) pieces.push({ ja: run.ja, node: styled(t, run.text) });
    else if (t.kind === "ruby") pieces.push({ ja: true, node: styled(t, <KanjiWord t={t} />) });
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

/** A Japanese phrase or sentence, with a romaji line that shows when the reader turns romaji on. */
export function Jp({
  jp,
  className = "",
  romaji = true,
}: {
  jp: string;
  className?: string;
  /** Include the romaji line (still only shown when the reader has romaji on). */
  romaji?: boolean;
}) {
  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span lang="ja">{renderLine(parse(jp, true))}</span>
      {romaji && (
        <span className="romaji mt-1 font-sans text-[0.55em] leading-snug font-normal tracking-wide text-ink-2 [font-size:max(0.55em,0.8rem)]">
          {romajiOf(jp)}
        </span>
      )}
    </span>
  );
}

/** Prose with inline Japanese, **bold** and {highlights}. */
export function Rich({ text, className }: { text: string; className?: string }) {
  return <span className={className}>{renderProse(parse(text, false))}</span>;
}

/** Table cell: Japanese-only cells read like an example line and get a romaji line; mixed cells are prose. */
export function Cell({ text }: { text: string }) {
  const jpOnly = isJpOnly(text);
  const tokens = parse(text, jpOnly);
  return (
    <span className="inline-flex flex-col">
      {jpOnly ? <span lang="ja">{renderLine(tokens)}</span> : <span>{renderProse(tokens)}</span>}
      {jpOnly && <span className="romaji text-xs text-ink-2">{romajiOf(text)}</span>}
    </span>
  );
}
