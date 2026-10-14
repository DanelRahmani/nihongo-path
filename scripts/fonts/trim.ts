/**
 * Trims the web fonts of a static build (H1).
 *
 * next/font/google gives each Japanese family and weight Google's ~120 unicode-range slices, and every page's
 * render-blocking CSS carries all 731 @font-face rules (195 KB gzipped). The characters the app can show are known at
 * build time: everything in the exported pages, router payloads and data files. This keeps only the rules whose
 * slice holds one of them, narrows each rule's unicode-range to those characters (a character outside the set still
 * shows, in the fallback font), and deletes the font files no rule names any more. Fonts stay sliced, so a page still
 * fetches only the slices its text needs.
 *
 * Pure; scripts/fonts/run.ts applies it to out/ (`npm run build` runs it after `next build`).
 */

/** Code points of every character in the given texts. */
export function charset(texts: Iterable<string>): Set<number> {
  const set = new Set<number>();
  for (const text of texts) for (const ch of text) set.add(ch.codePointAt(0)!);
  return set;
}

/** The code points a unicode-range value covers: U+3042, U+3000-303F, U+30?? (CSS Fonts 4). */
export function parseRange(value: string): [number, number][] {
  const points: [number, number][] = [];
  for (const raw of value.split(",")) {
    const part = raw.trim().replace(/^U\+/i, "");
    if (!part) continue;
    const [a, b] = part.includes("-") ? part.split("-") : part.includes("?") ? [part.replace(/\?/g, "0"), part.replace(/\?/g, "F")] : [part, part];
    const from = parseInt(a, 16);
    const to = parseInt(b, 16);
    if (!Number.isFinite(from) || !Number.isFinite(to) || to < from) throw new Error(`Unreadable unicode-range part: ${raw}`);
    points.push([from, to]);
  }
  return points;
}

/** Sorted code points written as a unicode-range value, runs merged: U+3041-3096,U+30FC. */
export function formatRange(points: number[]): string {
  const runs: [number, number][] = [];
  for (const p of points) {
    const last = runs.at(-1);
    if (last && p === last[1] + 1) last[1] = p;
    else runs.push([p, p]);
  }
  return runs.map(([a, b]) => (a === b ? `U+${a.toString(16).toUpperCase()}` : `U+${a.toString(16).toUpperCase()}-${b.toString(16).toUpperCase()}`)).join(",");
}

/**
 * The CSS with each sliced @font-face rule narrowed to the characters in `used`, and rules for none of them removed.
 * Rules without a unicode-range (the size-adjusted local() fallbacks next/font writes) are kept as they are.
 * Returns the new CSS and the font URLs the kept rules still name.
 */
export function trimFontCss(css: string, used: Set<number>): { css: string; kept: Set<string>; removed: number } {
  const kept = new Set<string>();
  let removed = 0;
  const out = css.replace(/@font-face\s*\{[^}]*\}/g, (rule) => {
    const range = rule.match(/unicode-range\s*:\s*([^;}]+)/i);
    const urls = [...rule.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map((m) => m[1]);
    if (!range) {
      for (const u of urls) kept.add(u);
      return rule;
    }
    const points: number[] = [];
    for (const [from, to] of parseRange(range[1])) {
      if (to - from > 0x2000) {
        // A wide range (a whole block): walk the used set instead of the range.
        for (const p of used) if (p >= from && p <= to) points.push(p);
      } else for (let p = from; p <= to; p++) if (used.has(p)) points.push(p);
    }
    if (!points.length) {
      removed++;
      return "";
    }
    for (const u of urls) kept.add(u);
    return rule.replace(range[0], `unicode-range:${formatRange([...new Set(points)].sort((a, b) => a - b))}`);
  });
  return { css: out, kept, removed };
}

