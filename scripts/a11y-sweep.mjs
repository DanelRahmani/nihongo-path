/**
 * The accessibility sweep (H2). Serves the static build in `out/` (run `npm run build` first) and visits every page
 * at 375 px in light and dark, with reduced motion. On each page:
 * - overflow: no horizontal page scroll, and no element reaching past the viewport outside a scroller (main clips
 *   overflow, so the page's scroll width alone can't see it);
 * - focus: Tab through every stop (each element once; up to MAX_STOPS, and focus must end where the walk began or
 *   leave the page, never loop back mid-page), then back with Shift+Tab. Each stop must show an indicator that focus
 *   adds: an outline, a shadow or a border colour that differs from the same element unfocused (read with
 *   transitions off), on the element or a wrapper up to three levels up. The indicator must reach 3:1 against what
 *   is behind it (WCAG 1.4.11), mustn't be clipped by an ancestor that hides overflow or fades it out, and the
 *   element mustn't sit under the sticky header or another sticky or fixed element (WCAG 2.4.11);
 * - axe-core's WCAG 2 A and AA rules, in both schemes (Lighthouse runs in light only);
 * - motion: no running animation or transition longer than 1 ms, after load and after every Tab;
 * - the page answers 200 and logs no console error or uncaught exception.
 * Then the states the walk can't reach: the search dialog with results, the Extras menu, the Display popover, the
 * word card, a drill and a quiz after a miss, a quiz's second try and its call to action when every answer is right, the home page with saved progress, and the dictionary's row radios
 * walked with the arrow keys. Each scenario fails if it doesn't reach its state. A third pass at text size L
 * with furigana and romaji, and one at 768 and 800 px (a tablet; the header's labels show from 800), check
 * overflow only. Last, Lighthouse's accessibility audit on representative pages
 * must score 100 (skip it with --no-lighthouse).
 *
 *   npm run a11y [-- --route /path]… [--states] [--all] [--no-lighthouse] [--stale-ok] [--css "rule"]
 *
 * `--route` (repeatable) sweeps only those pages, without the interactive states and extra passes, which `--states`
 * adds back: a quick check of the pages one change touches.
 *
 * `--css` adds a style rule to every page, to check the sweep itself: `--css "*:focus { outline: none !important }"`
 * must produce findings.
 * Exits 1 on findings, 2 when it can't run (no build, a build older than the source, bad arguments). Kanji pages
 * share one template, so only the first few are visited unless --all is given.
 * Uses the Playwright devDependency (pinned to the pre-installed browsers), axe-core and Lighthouse.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "playwright";
import { serveOut } from "./serve-out.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const AXE = createRequire(import.meta.url).resolve("axe-core/axe.min.js");
const OUT = join(ROOT, "out");
const MAX_STOPS = 400;
const KANJI_SAMPLE = 5;
const WORKERS = 4;
const LIGHTHOUSE_ROUTES = ["/", "/learn/particles/wa-vs-ga", "/kana", "/vocabulary", "/dictionary", "/grammar", "/read", "/review", "/data", "/kanji/日", "/keyboard"];

const args = process.argv.slice(2);
const all = args.includes("--all");
const runLighthouse = !args.includes("--no-lighthouse");
const routeAts = args.flatMap((a, i) => (a === "--route" ? [i] : []));
const onlyRoutes = routeAts.map((i) => args[i + 1]);
const only = onlyRoutes.length ? [...new Set(onlyRoutes)] : null;
const withStates = args.includes("--states");
const cssAt = args.indexOf("--css");
const css = cssAt >= 0 ? args[cssAt + 1] : null;
const known = new Set(["--all", "--no-lighthouse", "--route", "--states", "--stale-ok", "--css"]);
const values = new Set([...routeAts.map((i) => i + 1), ...(cssAt >= 0 ? [cssAt + 1] : [])]);
if (onlyRoutes.some((r) => !r?.startsWith("/")) || (cssAt >= 0 && (!css || css.startsWith("--"))) || args.some((a, i) => (a.startsWith("--") && !values.has(i) ? !known.has(a) : !values.has(i)))) {
  console.error('Usage: npm run a11y [-- --route /path]… [--states] [--all] [--no-lighthouse] [--stale-ok] [--css "rule"]');
  process.exit(2);
}

if (!existsSync(join(OUT, "index.html"))) {
  console.error("No build in out/: run `npm run build` first.");
  process.exit(2);
}

/** The newest modification time under a directory. */
function newest(dir) {
  let latest = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const s = statSync(path);
    latest = Math.max(latest, s.isDirectory() ? newest(path) : s.mtimeMs);
  }
  return latest;
}
const source = Math.max(
  ...["app", "components", "content", "lib"].map((d) => newest(join(ROOT, d))),
  ...["next.config.ts", "postcss.config.mjs", "package.json"].filter((f) => existsSync(join(ROOT, f))).map((f) => statSync(join(ROOT, f)).mtimeMs),
);
if (statSync(join(OUT, "index.html")).mtimeMs < source && !args.includes("--stale-ok")) {
  console.error("out/ is older than the source: run `npm run build` first (or pass --stale-ok).");
  process.exit(2);
}

/** Every page of the build, as its address: out/kana/drill.html → /kana/drill. */
function routes() {
  const found = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) {
        if (name !== "_next") walk(path);
      } else if (name.endsWith(".html") && name !== "404.html" && !name.startsWith("_") && !/<meta name="robots" content="noindex/.test(readFileSync(path, "utf8"))) {
        // (Pages marked noindex are moved pages that send the reader on; their target is swept instead.)
        const route = "/" + relative(OUT, path).replace(/\\/g, "/").replace(/\.html$/, "");
        found.push(route === "/index" ? "/" : route);
      }
    }
  };
  walk(OUT);
  const kanji = found.filter((r) => r.startsWith("/kanji/") && r !== "/kanji/drill").sort();
  const rest = found.filter((r) => !kanji.includes(r)).sort();
  return [...rest, ...(all ? kanji : kanji.slice(0, KANJI_SAMPLE))];
}

/** In the page: elements reaching past the viewport that no scroller or clipping wrapper holds. */
function overflowing() {
  const width = window.innerWidth;
  const out = [];
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1 || (r.right <= width + 1 && r.left >= -1)) continue;
    if (el.closest("[aria-hidden='true']")) continue;
    const s = getComputedStyle(el);
    if (s.pointerEvents === "none" || s.visibility === "hidden") continue;
    let held = false;
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      if (n.tagName === "MAIN") break;
      if (getComputedStyle(n).overflowX !== "visible") held = true;
    }
    if (held) continue;
    // Only the outermost offender: its children overflow with it.
    if (out.some((o) => o.el.contains(el))) continue;
    out.push({ el, what: `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? `.${el.className.trim().split(/\s+/).slice(0, 3).join(".")}` : ""} (${Math.round(r.left)}…${Math.round(r.right)} px)` });
  }
  return { scrollWidth: document.documentElement.scrollWidth, width, items: out.slice(0, 3).map((o) => o.what) };
}

/** In the page: animations and transitions still running that last longer than 1 ms. */
function running() {
  return document
    .getAnimations()
    .filter((a) => a.playState === "running" && (a.effect?.getComputedTiming().duration ?? 0) > 1)
    .map((a) => a.animationName || a.transitionProperty || a.constructor.name);
}

/**
 * In the page: the focused element's indicator. Reads the element and up to three ancestors focused, then
 * unfocused (with transitions off and focus events kept from the app), and keeps what focus changed.
 */
function focusIndicator([tag, key]) {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  const seenTag = el.dataset[key];
  const seen = seenTag !== undefined;
  if (!seen) el.dataset[key] = tag;
  const name = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("name") || el.getAttribute("placeholder") || "").trim().replace(/\s+/g, " ").slice(0, 40);
  const what = `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""} “${name}”`;
  if (seen) return { seen, seenTag, what };

  const chain = [el];
  for (let n = el.parentElement; n && chain.length < 4 && n !== document.body; n = n.parentElement) chain.push(n);
  const read = () =>
    chain.map((n) => {
      const s = getComputedStyle(n);
      return {
        outline: [s.outlineStyle, s.outlineWidth, s.outlineColor, s.outlineOffset],
        shadow: s.boxShadow,
        borders: ["Top", "Right", "Bottom", "Left"].map((side) => ({ color: s[`border${side}Color`], width: parseFloat(s[`border${side}Width`]) })),
      };
    });
  const stop = (e) => e.stopImmediatePropagation();
  const events = ["focus", "blur", "focusin", "focusout"];
  const still = document.createElement("style");
  still.textContent = "*, *::before, *::after { transition: none !important; }";
  document.head.append(still);
  const focused = read();
  const visibleFocus = el.matches(":focus-visible");
  for (const e of events) window.addEventListener(e, stop, true);
  el.blur();
  const blurred = read();
  el.focus({ preventScroll: true });
  for (const e of events) window.removeEventListener(e, stop, true);
  const refocused = document.activeElement === el;

  // Any CSS colour (Tailwind's /NN colours compute to oklab()) as RGBA, through a 1×1 canvas.
  const ctx = Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", { willReadFrequently: true });
  const rgba = (c) => {
    if (!c || c === "transparent") return null;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#000";
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  };
  const COLOUR = /(?:rgba?|oklab|oklch|lab|lch|hsla?|hwb|color)\([^)]*\)|#[0-9a-f]{3,8}\b/i;
  const layers = (shadow) =>
    shadow === "none"
      ? []
      : shadow.split(/,(?![^(]*\))/).map((l) => {
          const color = rgba(l.match(COLOUR)?.[0]);
          const lengths = l.replace(COLOUR, "").match(/-?[\d.]+px/g)?.map(parseFloat) ?? [];
          return { text: l.trim(), color, blur: lengths[2] ?? 0, spread: lengths[3] ?? 0, inset: /inset/.test(l) };
        });
  const luminance = ({ r, g, b }) => {
    const ch = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
  };
  const over = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 });
  /** The colour behind a node: its ancestors' backgrounds composited, down to the page's. */
  const behind = (node) => {
    const stack = [];
    for (let n = node; n; n = n.parentElement) {
      const c = rgba(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0) {
        stack.push(c);
        if (c.a >= 0.99) break;
      }
    }
    let base = stack.at(-1)?.a >= 0.99 ? stack.pop() : rgba(getComputedStyle(document.body).backgroundColor) ?? { r: 255, g: 255, b: 255, a: 1 };
    for (const c of stack.reverse()) base = over(c, base);
    return base;
  };
  const contrast = (color, node) => {
    const bg = behind(node);
    const fg = over(color, bg);
    const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
    return (hi + 0.05) / (lo + 0.05);
  };

  const rings = [];
  chain.forEach((node, i) => {
    const [f, b] = [focused[i], blurred[i]];
    const [style, width, color, offset] = f.outline;
    if (f.outline.join() !== b.outline.join() && style !== "none" && parseFloat(width) > 0 && (rgba(color)?.a ?? 0) > 0) {
      const o = parseFloat(offset);
      // An outline drawn inside the element sits on its own background; outside, on its parent's.
      rings.push({ node, kind: "outline", contrast: contrast(rgba(color), o < 0 ? node : node.parentElement ?? node), reach: Math.max(0, o + parseFloat(width)) });
    }
    if (f.shadow !== b.shadow) {
      const before = new Set(layers(b.shadow).map((l) => l.text));
      for (const l of layers(f.shadow)) {
        if (before.has(l.text) || !l.color || l.color.a <= 0 || (l.blur <= 0 && l.spread <= 0)) continue;
        rings.push({ node, kind: "shadow", contrast: contrast(l.color, l.inset ? node : node.parentElement ?? node), reach: l.inset ? 0 : Math.max(0, l.spread + l.blur / 2) });
      }
    }
    f.borders.forEach((side, j) => {
      if (side.color !== b.borders[j].color && side.width > 0 && (rgba(side.color)?.a ?? 0) > 0) {
        rings.push({ node, kind: "border", contrast: contrast(rgba(side.color), node.parentElement ?? node), reach: 0 });
      }
    });
  });

  const best = rings.sort((a, b) => b.contrast - a.contrast)[0];
  let clippedBy = null;
  if (best && best.reach > 0) {
    const r = best.node.getBoundingClientRect();
    const box = { left: r.left - best.reach, right: r.right + best.reach, top: r.top - best.reach, bottom: r.bottom + best.reach };
    for (let n = best.node.parentElement; n && n !== document.documentElement; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.overflowX === "visible" && s.overflowY === "visible") continue;
      // The padding box (scrollbars and borders aside), less any faded edge (.scroll-strip's mask).
      const outer = n.getBoundingClientRect();
      const scale = outer.width / (n.offsetWidth || outer.width || 1);
      const length = (v) => {
        const value = v.trim();
        if (!value) return 0;
        const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return (value.endsWith("rem") ? parseFloat(value) * root : parseFloat(value) || 0) * scale;
      };
      const masked = (s.maskImage || s.webkitMaskImage || "none") !== "none";
      const a = {
        left: outer.left + n.clientLeft * scale + (masked ? length(s.getPropertyValue("--fade-start")) : 0),
        top: outer.top + n.clientTop * scale,
      };
      a.right = outer.left + (n.clientLeft + n.clientWidth) * scale - (masked ? length(s.getPropertyValue("--fade-end")) : 0);
      a.bottom = outer.top + (n.clientTop + n.clientHeight) * scale;
      const sides = [
        s.overflowX !== "visible" && box.left < a.left - 0.5 && "left",
        s.overflowX !== "visible" && box.right > a.right + 0.5 && "right",
        s.overflowY !== "visible" && box.top < a.top - 0.5 && "top",
        s.overflowY !== "visible" && box.bottom > a.bottom + 0.5 && "bottom",
      ].filter(Boolean);
      if (sides.length) {
        clippedBy = `${n.tagName.toLowerCase()}.${String(n.className).trim().split(/\s+/).slice(0, 2).join(".")} (${sides.join(", ")}${masked ? ", under the fade" : ""})`;
        break;
      }
    }
  }

  // Under the sticky header, or another sticky or fixed element? Only for elements with a box of their own (visually
  // hidden inputs show focus on a wrapper).
  let coveredBy = null;
  const r = el.getBoundingClientRect();
  if (r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < window.innerHeight) {
    const x = Math.min(Math.max(r.left + r.width / 2, 0), window.innerWidth - 1);
    const y = Math.min(Math.max(r.top + r.height / 2, 0), window.innerHeight - 1);
    const hit = document.elementFromPoint(x, y);
    if (hit && !el.contains(hit) && !hit.contains(el) && !chain.includes(hit)) {
      for (let n = hit; n && n !== document.body; n = n.parentElement) {
        const position = getComputedStyle(n).position;
        if ((position === "sticky" || position === "fixed") && !n.contains(el)) {
          coveredBy = n.tagName === "HEADER" ? "the sticky header" : `a ${position} ${n.tagName.toLowerCase()}.${String(n.className).trim().split(/\s+/)[0]}`;
          break;
        }
      }
    }
  }

  still.remove();
  return {
    seen,
    what,
    visibleFocus,
    refocused,
    ring: best ? { kind: best.kind, contrast: Math.round(best.contrast * 100) / 100 } : null,
    clippedBy,
    coveredBy,
  };
}

const findings = [];
const notes = [];
let stops = 0;
const report = (where, issue) => findings.push(`${where}: ${issue}`);

/**
 * Walk the focus order from where focus is now with `key` (Tab, Shift+Tab, or an arrow inside a radio group),
 * checking each stop once. The walk ends when focus leaves the page or comes back to where it began (a modal dialog
 * and a radio group wrap round); coming back anywhere else is a loop that skips part of the page, or a trap.
 * Returns true when it stopped at `limit`.
 */
async function walk(page, where, limit, { key = "Tab", pass = "a11ySeen", first = null } = {}) {
  let start = first;
  for (let i = 0; i < limit; i++) {
    await page.keyboard.press(key);
    // Two frames: focus styles land a frame after the key.
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const state = await page.evaluate(focusIndicator, [`${pass}-${i}`, pass]);
    if (!state) {
      // Focus left the document (past the last stop): the browser chrome would have it now.
      if (i > 0) return false;
      continue;
    }
    if (state.seen) {
      if (start !== null && state.seenTag !== start) report(where, `${key} brought focus back to ${state.what} (a loop or a trap)`);
      return false;
    }
    start ??= `${pass}-${i}`;
    stops++;
    if (!state.ring) report(where, `no visible focus indicator on ${state.what}${state.visibleFocus ? "" : " (not :focus-visible)"}`);
    else if (state.ring.contrast < 3) report(where, `focus ${state.ring.kind} on ${state.what} has contrast ${state.ring.contrast}:1 (needs 3:1)`);
    if (state.clippedBy) report(where, `focus ring on ${state.what} clipped by ${state.clippedBy}`);
    if (state.coveredBy) report(where, `${state.what} is under ${state.coveredBy} when focused (${key})`);
    if (!state.refocused) notes.push(`${where}: ${state.what} didn't take focus back after the check`);
    const moving = await page.evaluate(running);
    if (moving.length) report(where, `running under reduced motion after ${key}: ${[...new Set(moving)].join(", ")}`);
  }
  return true;
}

async function checkLayout(page, where) {
  const { scrollWidth, width, items } = await page.evaluate(overflowing);
  if (scrollWidth > width) report(where, `horizontal scroll (${scrollWidth} px wide at ${width} px)`);
  for (const item of items) report(where, `reaches past the viewport: ${item}`);
}

/** axe-core's WCAG 2 A and AA rules on the page as it is now (both schemes; Lighthouse covers light only). */
async function checkAxe(page, where) {
  await page.addScriptTag({ path: AXE });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
    return result.violations.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`.slice(0, 240));
  });
  for (const v of violations) report(where, `axe ${v}`);
}

/** Opens a page and waits for it to settle: network idle, fonts, and one idle callback (the Today card loads then). */
async function open(context, route, where, expect = 200) {
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && !(expect === 404 && /404/.test(m.text())) && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  const res = await page.goto(base + route, { waitUntil: "networkidle" });
  if (res?.status() !== expect) report(where, `answered ${res?.status()} (expected ${expect})`);
  await page.evaluate(() => document.fonts.ready.then(() => new Promise((r) => (window.requestIdleCallback ?? setTimeout)(r, { timeout: 1000 }))));
  return { page, errors };
}

async function sweepPage(context, scheme, route, expect) {
  const where = `${route} (${scheme})`;
  const { page, errors } = await open(context, route, where, expect);
  await checkLayout(page, where);
  const moving = await page.evaluate(running);
  if (moving.length) report(where, `running under reduced motion: ${[...new Set(moving)].join(", ")}`);
  await checkAxe(page, where);
  if (await walk(page, where, MAX_STOPS)) report(where, `more than ${MAX_STOPS} Tab stops: the page below them can't be reached in reasonable time`);
  // Back from the end with Shift+Tab: the browser scrolls each stop in from the top, where the sticky header is.
  await page.evaluate(() => document.activeElement instanceof HTMLElement && document.activeElement.blur());
  await page.keyboard.press("End");
  await walk(page, where, MAX_STOPS, { key: "Shift+Tab", pass: "a11yBack" });
  for (const error of errors) report(where, `console: ${error.slice(0, 160)}`);
  await page.close();
}

/** Today's and yesterday's local dates, in the browser, for the seeded activity store. */
const SEED = () => {
  const day = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86_400_000);
  const ago = now.getTime() - 86_400_000;
  const put = (key, v, data) => localStorage.setItem(key, JSON.stringify({ v, data }));
  if (sessionStorage.getItem("seeded")) return;
  sessionStorage.setItem("seeded", "1");
  put("np:progress", 1, { "start/polite-and-casual": true, "start/three-scripts": true });
  put("np:activity", 1, { goal: 10, days: { [day(yesterday)]: { answered: 12, goal: 10 }, [day(now)]: { answered: 3, goal: 10 } } });
  put("np:notebook", 1, { "hiragana-base|hiragana:あ": { deck: "hiragana-base", card: "hiragana:あ", misses: 1, rightInRow: 0, added: ago, lastMiss: ago } });
};

/** Waits until `test` holds in the page, or fails the scenario saying which state it didn't reach. */
async function reach(page, state, test, arg) {
  try {
    await page.waitForFunction(test, arg, { timeout: 10_000 });
  } catch {
    throw new Error(`didn't reach ${state}`);
  }
}

const LESSON = "/learn/start/polite-and-casual";
/** States the plain walk can't reach: each sets the page up and checks it got there, then the checks run from where focus is. */
const SCENARIOS = [
  {
    name: "search dialog",
    route: "/",
    limit: 40,
    async setup(page) {
      await page.keyboard.press("/");
      await page.locator("[role=combobox]").waitFor();
      await page.keyboard.type("taberu");
      await page.locator("[role=option]").first().waitFor();
    },
  },
  ...[
    ["Practice menu", "practice-menu"],
    ["Extras menu", "extras-menu"],
    ["Display popover", "display-settings"],
  ].map(([name, id]) => ({
    name,
    route: "/",
    limit: 20,
    async setup(page) {
      await page.keyboard.press("Tab"); // Keyboard modality, so programmatic focus shows its ring.
      await page.locator(`button[popovertarget="${id}"]`).focus();
      await page.keyboard.press("Enter");
      await page.locator(`#${id}:popover-open`).waitFor();
    },
  })),
  {
    name: "word card",
    route: LESSON,
    limit: 10,
    async setup(page) {
      await page.keyboard.press("Tab");
      await page.locator("[role=toolbar] [tabindex='0']").first().focus();
      await page.keyboard.press("Enter");
      await page.locator(".inspector-popover").waitFor();
    },
  },
  {
    name: "kana drill after a miss",
    route: "/kana",
    limit: 4,
    async setup(page) {
      await page.locator("#drill button").first().click(); // The first deck.
      const box = page.locator("#drill input").first();
      await box.waitFor();
      await box.focus();
      // Typed, not filled, so the browser is in keyboard mode and the focused Next button shows its ring.
      await page.keyboard.type("zzz");
      await page.keyboard.press("Enter");
      await reach(page, "the answer side with Next card focused", () => /Next card/.test(document.activeElement?.textContent ?? "") && document.activeElement.matches(":focus-visible"));
    },
  },
  {
    name: "quiz after a miss",
    route: LESSON,
    limit: 4,
    async setup(page) {
      const box = page.locator("main form input").first();
      await box.focus();
      await page.keyboard.type("ぬぬぬ");
      await page.keyboard.press("Enter");
      await reach(page, "the quiz's feedback", () => !!document.querySelector("main form")?.parentElement?.querySelector("[role=img]"));
    },
  },
  {
    name: "quiz retry",
    route: LESSON,
    limit: 6,
    async setup(page) {
      // Every question missed, then "Try the ones you missed again": the second-try boxes, focus in the first.
      const boxes = page.locator('section[aria-labelledby="quiz-heading"] > ol input');
      for (let i = 0; i < (await boxes.count()); i++) {
        await boxes.nth(i).fill("ぬぬぬ");
        await boxes.nth(i).press("Enter");
      }
      await page.getByRole("button", { name: /you missed again/ }).click();
      await reach(page, "the second-try boxes, announced", () => !!document.activeElement?.closest("h3 + ol") && /Second try/.test(document.querySelector('section[aria-labelledby="quiz-heading"] [role=status]')?.textContent ?? ""));
    },
  },
  {
    name: "quiz all right",
    route: LESSON,
    limit: 3,
    async setup(page) {
      // Every answer right: "Mark this lesson as done" takes focus. The answers are this lesson's.
      const boxes = page.locator('section[aria-labelledby="quiz-heading"] > ol input');
      for (const [i, answer] of ["読む", "飲みます", "学生だよ", "暑い"].entries()) {
        await boxes.nth(i).fill(answer);
        await boxes.nth(i).press("Enter");
      }
      await reach(page, "the finish button, focused", () => document.activeElement?.textContent === "Mark this lesson as done");
    },
  },
  {
    name: "home with saved progress",
    route: "/",
    limit: 80,
    seed: true,
    async setup(page) {
      await reach(page, "the Today card's streak and mistake", () => /Streak: 1 day/.test(document.body.innerText) && /mistake/.test(document.body.innerText));
    },
  },
  {
    name: "dictionary row radios",
    route: "/dictionary",
    limit: 20,
    key: "ArrowRight",
    async setup(page) {
      await reach(page, "the row radios", () => document.querySelectorAll("fieldset input[type=radio]").length > 10);
      await page.keyboard.press("Tab"); // Keyboard modality, so programmatic focus shows its ring.
      // The checked radio of the last radio group on the page: the "Starts with" row.
      const radios = page.locator("fieldset input[type=radio]:checked");
      await radios.last().focus();
    },
  },
];

async function runScenario(browser, scheme, scenario) {
  const where = `${scenario.route} ${scenario.name} (${scheme})`;
  let context;
  try {
    context = await newContext(browser, scheme);
    if (scenario.seed) await context.addInitScript(SEED);
    const { page, errors } = await open(context, scenario.route, where);
    await scenario.setup(page);
    await checkLayout(page, where);
    const moving = await page.evaluate(running);
    if (moving.length) report(where, `running under reduced motion: ${[...new Set(moving)].join(", ")}`);
    // The element focus landed on counts as the first stop.
    const first = await page.evaluate(focusIndicator, ["start", "a11ySeen"]);
    if (first && !first.seen && !first.ring) report(where, `no visible focus indicator on ${first.what}`);
    if (first?.clippedBy) report(where, `focus ring on ${first.what} clipped by ${first.clippedBy}`);
    if (await walk(page, where, scenario.limit, { key: scenario.key, first: first ? "start" : null })) notes.push(`${where}: stopped at ${scenario.limit} stops`);
    for (const error of errors) report(where, `console: ${error.slice(0, 160)}`);
  } catch (e) {
    report(where, `crashed: ${String(e.message ?? e).split("\n")[0]}`);
  } finally {
    await context?.close();
  }
}

/** A browser context at 375 px with reduced motion and no service worker (it would serve later pages from its cache). */
async function newContext(browser, scheme = "light", width = 375) {
  const context = await browser.newContext({ viewport: { width, height: 800 }, colorScheme: scheme, reducedMotion: "reduce", serviceWorkers: "block" });
  if (css) await context.addInitScript((rule) => document.addEventListener("DOMContentLoaded", () => document.head.append(Object.assign(document.createElement("style"), { textContent: rule }))), css);
  return context;
}

/** Text size L, every furigana and romaji: overflow and console only. */
const LARGE = () => localStorage.setItem("np:settings", JSON.stringify({ v: 2, data: { furigana: "all", romaji: true, size: "l", font: "mincho", theme: "system" } }));

/** The findings so far, and the exit code. */
function finish(code) {
  findings.sort();
  if (notes.length) console.log(`\nNotes:\n${[...new Set(notes)].sort().map((n) => `- ${n}`).join("\n")}`);
  const unique = [...new Set(findings)];
  if (unique.length) {
    console.log(`\n${unique.length} finding${unique.length === 1 ? "" : "s"}:`);
    for (const f of unique) console.log(`- ${f}`);
  } else if (code === 0) console.log("\nNo findings.");
  process.exit(code || (unique.length ? 1 : 0));
}

const server = await serveOut(OUT);
const base = `http://127.0.0.1:${server.address().port}`;
const list = only ? only.map((route) => ({ route, expect: 200 })) : [...routes().map((route) => ({ route, expect: 200 })), { route: "/no-such-page", expect: 404 }];
const workers = Math.min(WORKERS, list.length);
console.log(`Sweeping ${list.length} page${list.length === 1 ? "" : "s"} in light and dark${only && !withStates ? "" : `, ${SCENARIOS.length} interactive states, and the large-text pass`}…`);
const started = Date.now();

/**
 * Light and dark side by side, each with `workers` pages at a time. Each worker has its own browser: windows of one
 * browser can't all hold keyboard focus at once, and :focus-visible only applies in the one that does.
 */
async function pool(items, run) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(workers, items.length) }, async () => {
      let browser;
      try {
        browser = await chromium.launch();
        for (let item = queue.shift(); item; item = queue.shift()) await run(browser, item);
      } finally {
        await browser?.close();
      }
    }),
  );
}

/** Runs one check in a fresh context, turning a crash into a finding. */
async function inContext(browser, where, scheme, prepare, check) {
  let context;
  try {
    context = await newContext(browser, scheme);
    if (prepare) await context.addInitScript(prepare);
    await check(context);
  } catch (e) {
    report(where, `crashed: ${String(e.message ?? e).split("\n")[0]}`);
  } finally {
    await context?.close();
  }
}

try {
  await Promise.all(
    ["light", "dark"].map((scheme) =>
      pool(list, (browser, { route, expect }) => inContext(browser, `${route} (${scheme})`, scheme, null, (context) => sweepPage(context, scheme, route, expect))),
    ),
  );
  if (!only || withStates) {
    await Promise.all(["light", "dark"].map((scheme) => pool(SCENARIOS, (browser, s) => runScenario(browser, scheme, s))));
    await pool(
      list.filter((l) => l.expect === 200),
      (browser, { route }) =>
        inContext(browser, `${route} (large text)`, "light", LARGE, async (context) => {
          const where = `${route} (large text)`;
          const { page, errors } = await open(context, route, where);
          await checkLayout(page, where);
          for (const error of errors) report(where, `console: ${error.slice(0, 160)}`);
        }),
    );
  }
  if (!only) {
    // A tablet in portrait: the header shows its English labels from 50rem, so check the widths around it too.
    await pool(
      list.filter((l) => l.expect === 200),
      async (browser, { route }) => {
        for (const width of [768, 800]) {
          let context;
          const where = `${route} (${width} px)`;
          try {
            context = await newContext(browser, "light", width);
            const { page, errors } = await open(context, route, where);
            await checkLayout(page, where);
            for (const error of errors) report(where, `console: ${error.slice(0, 160)}`);
          } catch (e) {
            report(where, `crashed: ${String(e.message ?? e).split("\n")[0]}`);
          } finally {
            await context?.close();
          }
        }
      },
    );
  }
  console.log(`Sweep done in ${Math.round((Date.now() - started) / 1000)} s: ${stops} focus stops checked.`);

  if (runLighthouse) {
    const chrome = await chromeLauncher.launch({ chromePath: process.env.CHROME_PATH || chromium.executablePath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });
    try {
      for (const route of only ?? LIGHTHOUSE_ROUTES) {
        try {
          const { lhr } = await lighthouse(base + encodeURI(route), { port: chrome.port, onlyCategories: ["accessibility"], output: "json", logLevel: "error" });
          const score = Math.round((lhr.categories.accessibility.score ?? 0) * 100);
          if (lhr.runtimeError) report(`${route} (Lighthouse)`, lhr.runtimeError.message);
          else if (score < 100) {
            const failed = lhr.categories.accessibility.auditRefs
              .map((ref) => lhr.audits[ref.id])
              .filter((a) => a.score !== null && a.score < 1)
              .map((a) => `${a.id}: ${(a.details?.items ?? []).slice(0, 3).map((it) => it.node?.snippet ?? it.node?.selector ?? "").join(" | ").slice(0, 200)}`);
            report(`${route} (Lighthouse)`, `accessibility ${score}: ${failed.join("; ")}`);
          } else notes.push(`${route}: Lighthouse accessibility 100`);
        } catch (e) {
          report(`${route} (Lighthouse)`, `crashed: ${String(e.message ?? e).split("\n")[0]}`);
        }
      }
    } finally {
      await chrome.kill();
    }
  }
} catch (e) {
  // Setup failed (a browser that won't start): say so, with whatever was found before it.
  console.error(e);
  server.close();
  finish(2);
}
server.close();
finish(0);
