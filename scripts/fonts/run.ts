// Trims the fonts of the static export in out/ (H1): `npm run build` runs it after `next build`.
//   node … scripts/fonts/run.ts [out-dir]
// What the app can show is read from the pages, router payloads, data files and scripts (the scripts hold the UI's
// own strings); see scripts/fonts/trim.ts for what is kept.
import { readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { charset, trimFontCss } from "@/scripts/fonts/trim";

/** Every file under a directory. */
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const out = process.argv[2] ?? fileURLToPath(new URL("../../out", import.meta.url));
const all = files(out);
const texts = all.filter((f) => /\.(html|txt|json|js)$/.test(f)).map((f) => readFileSync(f, "utf8"));
const used = charset(texts);
const names = new Set<string>();
let before = 0;
let after = 0;
let removed = 0;
for (const sheet of all.filter((f) => f.endsWith(".css"))) {
  const css = readFileSync(sheet, "utf8");
  if (!css.includes("@font-face")) continue;
  const trimmed = trimFontCss(css, used);
  before += css.length;
  after += trimmed.css.length;
  removed += trimmed.removed;
  for (const u of trimmed.kept) names.add(basename(u));
  writeFileSync(sheet, trimmed.css);
}
// Delete only the font files no stylesheet, page or script names now (a preload link would name one).
for (const t of texts) for (const m of t.matchAll(/[\w.-]+\.woff2/g)) names.add(m[0]);
const fonts = all.filter((f) => f.endsWith(".woff2"));
let deleted = 0;
for (const f of fonts) {
  if (!names.has(basename(f))) {
    unlinkSync(f);
    deleted++;
  }
}
console.log(
  `Fonts trimmed to ${used.size} characters: ${removed} @font-face rules removed, CSS ${Math.round(before / 1024)} → ${Math.round(after / 1024)} KB, ${deleted} of ${fonts.length} font files deleted.`,
);
