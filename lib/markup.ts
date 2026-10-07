/** Parser for the Japanese markup described in content/types.ts. */

export type Token =
  | { kind: "text"; text: string; hl: boolean; bold: boolean; it: boolean }
  | { kind: "ruby"; base: string; reading: string; hl: boolean; bold: boolean; it: boolean }
  | { kind: "space" }
  /** "-" in a Jp string: joins a name to its suffix. Never shown; a hyphen in romaji (tanaka-san). */
  | { kind: "join" };

/**
 * @param wordSpaces true for Jp strings (spaces are word boundaries, hidden in
 *   Japanese); false for prose (spaces are literal text).
 */
export function parse(src: string, wordSpaces: boolean): Token[] {
  const out: Token[] = [];
  let hl = false;
  let bold = false;
  let it = false;
  let buf = "";
  const flush = () => {
    if (buf) out.push({ kind: "text", text: buf, hl, bold, it });
    buf = "";
  };

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === "{" || c === "}") {
      flush();
      hl = c === "{";
    } else if (c === "*" && src[i + 1] === "*") {
      flush();
      bold = !bold;
      i++;
    } else if (c === "*") {
      flush();
      it = !it;
    } else if (c === "[") {
      const bar = src.indexOf("|", i);
      const end = src.indexOf("]", i);
      if (bar === -1 || end === -1 || bar > end) throw new Error(`Bad ruby markup in: ${src}`);
      flush();
      out.push({ kind: "ruby", base: src.slice(i + 1, bar), reading: src.slice(bar + 1, end), hl, bold, it });
      i = end;
    } else if (c === "-" && wordSpaces) {
      flush();
      out.push({ kind: "join" });
    } else if (c === " " && wordSpaces) {
      flush();
      if (out.at(-1)?.kind !== "space") out.push({ kind: "space" });
    } else {
      buf += c;
    }
  }
  flush();
  return out;
}

/** Plain kana reading of a Jp string, keeping word spaces. */
export function readingOf(src: string, wordSpaces = true): string {
  return parse(src, wordSpaces)
    .map((t) => (t.kind === "space" ? " " : t.kind === "join" ? "" : t.kind === "ruby" ? t.reading : t.text))
    .join("")
    .trim();
}

/** Visible text with markup stripped (kanji kept, spaces removed). */
export function plainOf(src: string, wordSpaces = true): string {
  return parse(src, wordSpaces)
    .map((t) => (t.kind === "space" || t.kind === "join" ? "" : t.kind === "ruby" ? t.base : t.text))
    .join("");
}

const HAN = /[\p{Script=Han}々]/u;

/** Kanji that appear outside [漢字|かな] markup — these would break Kana-only mode. */
export function bareKanji(src: string, wordSpaces: boolean): string[] {
  return parse(src, wordSpaces).flatMap((t) =>
    t.kind === "text" ? [...t.text].filter((c) => HAN.test(c)) : [],
  );
}

export function hasJapanese(src: string): boolean {
  return /[぀-ヿ\p{Script=Han}]/u.test(src);
}

/** CJK punctuation, kana, kanji and full-width forms. */
const JA_CHAR = /[　-ヿ㐀-䶿一-鿿！-｠]/u;

/** Splits English prose into runs of Japanese and other text, so each Japanese run can carry lang="ja". */
export function langRuns(text: string): { text: string; ja: boolean }[] {
  const runs: { text: string; ja: boolean }[] = [];
  for (const c of text) {
    const ja = JA_CHAR.test(c);
    const last = runs.at(-1);
    if (last && last.ja === ja) last.text += c;
    else runs.push({ text: c, ja });
  }
  return runs;
}

/** A table cell written entirely in Japanese: it uses word spaces and gets a romaji line, like an example. */
export function isJpOnly(src: string): boolean {
  return hasJapanese(src) && !/[a-z]/i.test(src.replace(/\[[^\]]*\]/g, ""));
}
