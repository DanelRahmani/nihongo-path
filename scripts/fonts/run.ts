// Trims the fonts of the static export in out/ (H1): `npm run build` runs it after `next build`.
//   node … scripts/fonts/run.ts [out-dir]
// What the app can show is read from the pages, router payloads, data files and scripts (the scripts hold the UI's
// own strings); see scripts/fonts/trim.ts for what is kept. Each rewritten stylesheet gets a new name with the hash of
// its new contents, and every page and payload that named it is updated: build files are cached as immutable (by the
// host and the service worker), so a changed file must not keep its old name. Exits 1 when the scan missed content
// (a lesson kanji or a drill kana absent) or a page still names an old stylesheet.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { KANA } from "@/content/kana";
import { KANJI } from "@/content/kanji";
import { charset, missing, trimFontCss, unnamedFonts } from "@/scripts/fonts/trim";

/** Every file under a directory. */
function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const out = process.argv[2] ?? fileURLToPath(new URL("../../out", import.meta.url));
const all = files(out);
const textFiles = all.filter((f) => /\.(html|txt|json|js|css)$/.test(f));
const texts = new Map(textFiles.map((f) => [f, readFileSync(f, "utf8")]));
const used = charset(texts.values());

const absent = missing(used, [...KANJI.map((k) => k.char), ...KANA.map((k) => k.char)]);
if (absent.length) {
  console.error(`The character scan missed ${absent.length} characters the app shows (${absent.slice(0, 20).join("")}…): has the build's encoding changed?`);
  process.exit(1);
}

const names = new Set<string>();
const renamed = new Map<string, string>();
let before = 0;
let after = 0;
let removed = 0;
for (const sheet of textFiles.filter((f) => f.endsWith(".css"))) {
  const css = texts.get(sheet)!;
  if (!css.includes("@font-face")) continue;
  const trimmed = trimFontCss(css, used);
  before += css.length;
  after += trimmed.css.length;
  removed += trimmed.removed;
  for (const u of trimmed.kept) names.add(basename(u));
  if (trimmed.css === css) continue;
  const hash = createHash("sha256").update(trimmed.css).digest("hex").slice(0, 8);
  const name = basename(sheet).replace(/\.css$/, `-${hash}.css`);
  writeFileSync(join(dirname(sheet), name), trimmed.css);
  unlinkSync(sheet);
  texts.delete(sheet);
  texts.set(join(dirname(sheet), name), trimmed.css);
  renamed.set(basename(sheet), name);
}

// Point every page, payload and script at the renamed stylesheets.
if (renamed.size) {
  const old = new RegExp([...renamed.keys()].map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
  for (const [file, text] of texts) {
    if (file.endsWith(".css") || !old.test(text)) continue;
    old.lastIndex = 0;
    const next = text.replace(old, (n) => renamed.get(n)!);
    writeFileSync(file, next);
    texts.set(file, next);
  }
  const stale = [...texts].filter(([file, text]) => !file.endsWith(".css") && [...renamed.keys()].some((n) => text.includes(n)));
  if (stale.length) {
    console.error(`${stale.length} files still name a stylesheet that was renamed, e.g. ${stale[0][0]}`);
    process.exit(1);
  }
}

// Delete only the font files no stylesheet, page or script names now (a preload link would name one).
for (const t of texts.values()) for (const m of t.matchAll(/[\w.-]+\.woff2/g)) names.add(m[0]);
const fonts = all.filter((f) => f.endsWith(".woff2"));
const unnamed = unnamedFonts(fonts, names);
for (const f of unnamed) unlinkSync(f);

console.log(
  `Fonts trimmed to the ${used.size} characters the build shows: ${removed} @font-face rules removed, CSS ${Math.round(before / 1024)} → ${Math.round(after / 1024)} KB in ${renamed.size} renamed sheets, ${unnamed.length} of ${fonts.length} font files deleted.`,
);
