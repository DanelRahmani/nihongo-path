/** Parser for the Japanese markup described in content/types.ts. */

export type Token =
  | { kind: "text"; text: string; hl: boolean; bold: boolean; it: boolean }
  | { kind: "ruby"; base: string; reading: string; hl: boolean; bold: boolean; it: boolean }
  | { kind: "space" };

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
export function readingOf(src: string): string {
  return parse(src, true)
    .map((t) => (t.kind === "space" ? " " : t.kind === "ruby" ? t.reading : t.text))
    .join("")
    .trim();
}

/** Visible text with markup stripped (kanji kept, spaces removed). */
export function plainOf(src: string, wordSpaces = true): string {
  return parse(src, wordSpaces)
    .map((t) => (t.kind === "space" ? "" : t.kind === "ruby" ? t.base : t.text))
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
