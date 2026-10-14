/**
 * Trims the web fonts of a static build (H1).
 *
 * next/font/google gives each Japanese family and weight Google's ~120 unicode-range slices, and every page's
 * render-blocking CSS carried all 731 @font-face rules (195 KB gzipped). The characters the app can show are known at
 * build time: everything in the exported pages, router payloads, data files and scripts. This drops the rules whose
 * slice holds none of them, keeping each other rule as Google wrote it (so a character a learner types that shares a
 * slice with the app's text shows in the app's font too), and lists the font files no rule names any more. Fonts stay
 * sliced, so a page still fetches only the slices its text needs.
 *
 * Pure; scripts/fonts/run.ts applies it to out/ (`npm run build` runs it after `next build`).
 */

const ESCAPES = /\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})|&#x([0-9a-fA-F]{1,6});|&#(\d{1,7});/g;

/**
 * Code points of every character in the given texts, escapes included (あ, \u{20BB7}, &#x3042;, &#12354;), so a
 * minifier or encoder that writes Japanese as escapes doesn't empty the set.
 */
export function charset(texts: Iterable<string>): Set<number> {
  const set = new Set<number>();
  for (const text of texts) {
    for (const ch of text) set.add(ch.codePointAt(0)!);
    for (const m of text.matchAll(ESCAPES)) {
      const point = m[1] ? parseInt(m[1], 16) : m[2] ? parseInt(m[2], 16) : m[3] ? parseInt(m[3], 16) : parseInt(m[4], 10);
      if (point <= 0x10ffff) set.add(point);
    }
  }
  return set;
}

/** The code points a unicode-range value covers, as [from, to] pairs: U+3042, U+3000-303F, U+30?? (CSS Fonts 4). */
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

/**
 * The CSS without the sliced @font-face rules whose range holds none of the characters in `used`. Kept rules are
 * unchanged, and so are rules without a unicode-range (the size-adjusted local() fallbacks next/font writes).
 * Returns the new CSS, the font URLs the kept rules name, and how many rules were removed.
 */
export function trimFontCss(css: string, used: Set<number>): { css: string; kept: Set<string>; removed: number } {
  const kept = new Set<string>();
  let removed = 0;
  const out = css.replace(/@font-face\s*\{[^}]*\}/g, (rule) => {
    const range = rule.match(/unicode-range\s*:\s*([^;}]+)/i);
    const uses =
      !range ||
      parseRange(range[1]).some(([from, to]) => {
        if (to - from > used.size) {
          for (const p of used) if (p >= from && p <= to) return true;
          return false;
        }
        for (let p = from; p <= to; p++) if (used.has(p)) return true;
        return false;
      });
    if (!uses) {
      removed++;
      return "";
    }
    for (const m of rule.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) kept.add(m[1]);
    return rule;
  });
  return { css: out, kept, removed };
}

/** The font files to delete: those whose file name nothing named (a kept rule, a page, a script, a preload link). */
export function unnamedFonts(fonts: string[], named: Set<string>): string[] {
  const base = (path: string) => path.slice(path.lastIndexOf("/") + 1);
  return fonts.filter((f) => !named.has(base(f)));
}

/** The characters in `required` missing from `used`: a build check that the scan saw the content at all. */
export function missing(used: Set<number>, required: Iterable<string>): string[] {
  return [...new Set([...required].flatMap((s) => [...s]))].filter((ch) => !used.has(ch.codePointAt(0)!));
}
