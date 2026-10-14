/**
 * The accessibility sweep (H2). Serves the static build in `out/` (run `npm run build` first) and visits every page
 * at 375 px in light and dark, with reduced motion. On each page:
 * - overflow: no horizontal page scroll, and no element reaching past the viewport outside a scroller (main clips
 *   overflow, so the page's scroll width alone can't see it);
 * - focus: Tab through every stop (each element once; up to MAX_STOPS). Each must show an indicator that focus
 *   adds: an outline, a shadow or a border colour that differs from the same element unfocused (read with
 *   transitions off), on the element or a wrapper up to three levels up. The indicator must reach 3:1 against what
 *   is behind it (WCAG 1.4.11), mustn't be clipped by an ancestor that hides overflow, and the element mustn't sit
 *   under the sticky header (WCAG 2.4.11);
 * - motion: no running animation or transition longer than 1 ms, after load and after every Tab;
 * - the page answers 200 and logs no console error or uncaught exception.
 * Then the states the walk can't reach: the search dialog with results, the Extras menu, the Display popover, the
 * word card, a drill and a quiz after a miss, and the home page with saved progress. A third pass at text size L
 * with furigana and romaji checks overflow only. Last, Lighthouse's accessibility audit on representative pages
 * must score 100 (skip it with --no-lighthouse).
 *
 *   npm run a11y [-- --route /path] [--all] [--no-lighthouse] [--css "rule"]
 *
 * `--css` adds a style rule to every page, to check the sweep itself: `--css "*:focus { outline: none !important }"`
 * must produce findings.
 * Exits 1 on findings, 2 when it can't run (no build, a build older than the source, bad arguments). Kanji pages
 * share one template, so only the first few are visited unless --all is given.
 * Uses the Playwright devDependency (pinned to the pre-installed browsers) and Lighthouse.
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "playwright";
import { serveOut } from "./serve-out.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "out");
const MAX_STOPS = 400;
const KANJI_SAMPLE = 5;
const WORKERS = 4;
const LIGHTHOUSE_ROUTES = ["/", "/learn/particles/wa-vs-ga", "/kana", "/kana/drill", "/dictionary", "/grammar", "/read", "/review", "/data", "/kanji/日"];

const args = process.argv.slice(2);
const all = args.includes("--all");
const runLighthouse = !args.includes("--no-lighthouse");
const routeAt = args.indexOf("--route");
const only = routeAt >= 0 ? args[routeAt + 1] : null;
const cssAt = args.indexOf("--css");
const css = cssAt >= 0 ? args[cssAt + 1] : null;
const known = new Set(["--all", "--no-lighthouse", "--route", "--stale-ok", "--css"]);
if ((routeAt >= 0 && !only?.startsWith("/")) || (cssAt >= 0 && !css) || args.some((a, i) => (a.startsWith("--") ? !known.has(a) : i !== routeAt + 1 && i !== cssAt + 1))) {
  console.error('Usage: npm run a11y [-- --route /path] [--all] [--no-lighthouse] [--stale-ok] [--css "rule"]');
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
const source = Math.max(...["app", "components", "content", "lib"].map((d) => newest(join(ROOT, d))));
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
      } else if (name.endsWith(".html") && name !== "404.html" && !name.startsWith("_")) {
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
function focusIndicator(tag) {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  const seen = el.dataset.a11ySeen !== undefined;
  if (!seen) el.dataset.a11ySeen = tag;
  const name = (el.getAttribute("aria-label") || el.textContent || el.getAttribute("name") || el.getAttribute("placeholder") || "").trim().replace(/\s+/g, " ").slice(0, 40);
  const what = `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""} “${name}”`;
  if (seen) return { seen, what };

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
  still.remove();
  const refocused = document.activeElement === el;

  const rgba = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r, g, b, a };
  };
  const layers = (shadow) =>
    shadow === "none"
      ? []
      : shadow.split(/,(?![^(]*\))/).map((l) => {
          const color = rgba(l);
          const lengths = l.replace(/rgba?\([^)]*\)/, "").match(/-?[\d.]+px/g)?.map(parseFloat) ?? [];
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
      const a = n.getBoundingClientRect();
      const sides = [
        s.overflowX !== "visible" && box.left < a.left - 0.5 && "left",
        s.overflowX !== "visible" && box.right > a.right + 0.5 && "right",
        s.overflowY !== "visible" && box.top < a.top - 0.5 && "top",
        s.overflowY !== "visible" && box.bottom > a.bottom + 0.5 && "bottom",
      ].filter(Boolean);
      if (sides.length) {
        clippedBy = `${n.tagName.toLowerCase()}.${String(n.className).trim().split(/\s+/).slice(0, 2).join(".")} (${sides.join(", ")})`;
        break;
      }
    }
  }

  // Under the sticky header? Only for elements with a box of their own (visually hidden inputs show focus on a wrapper).
  let coveredBy = null;
  const r = el.getBoundingClientRect();
  if (r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < window.innerHeight) {
    const x = Math.min(Math.max(r.left + r.width / 2, 0), window.innerWidth - 1);
    const y = Math.min(Math.max(r.top + r.height / 2, 0), window.innerHeight - 1);
    const hit = document.elementFromPoint(x, y);
    if (hit && !el.contains(hit) && !hit.contains(el) && !chain.includes(hit)) {
      const header = hit.closest("header");
      if (header && !header.contains(el)) coveredBy = "the sticky header";
    }
  }

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

/** Tab through the page from where focus is now, checking each stop once. */
async function walk(page, where, limit) {
  for (let i = 0; i < limit; i++) {
    await page.keyboard.press("Tab");
    // Two frames: focus styles land a frame after the key.
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const state = await page.evaluate(focusIndicator, String(i));
    if (!state) {
      // Focus left the document (past the last stop): the browser chrome would have it now.
      if (i > 0) return;
      continue;
    }
    if (state.seen) return;
    stops++;
    if (!state.ring) report(where, `no visible focus indicator on ${state.what}${state.visibleFocus ? "" : " (not :focus-visible)"}`);
    else if (state.ring.contrast < 3) report(where, `focus ${state.ring.kind} on ${state.what} has contrast ${state.ring.contrast}:1 (needs 3:1)`);
    if (state.clippedBy) report(where, `focus ring on ${state.what} clipped by ${state.clippedBy}`);
    if (state.coveredBy) report(where, `${state.what} is under ${state.coveredBy} when focused`);
    if (!state.refocused) notes.push(`${where}: ${state.what} didn't take focus back after the check`);
    const moving = await page.evaluate(running);
    if (moving.length) report(where, `running under reduced motion after Tab: ${[...new Set(moving)].join(", ")}`);
  }
  notes.push(`${where}: stopped at ${limit} Tab stops`);
}

async function checkLayout(page, where) {
  const { scrollWidth, width, items } = await page.evaluate(overflowing);
  if (scrollWidth > width) report(where, `horizontal scroll (${scrollWidth} px wide at ${width} px)`);
  for (const item of items) report(where, `reaches past the viewport: ${item}`);
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
  await walk(page, where, MAX_STOPS);
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

const LESSON = "/learn/start/polite-and-casual";
/** States the plain walk can't reach: each sets the page up, then the checks run from where focus is. */
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
      await page.waitForTimeout(500);
    },
  },
  {
    name: "kana drill after a miss",
    route: "/kana/drill",
    limit: 4,
    async setup(page) {
      await page.locator("main button").first().click(); // The first deck.
      const box = page.locator("main input").first();
      await box.waitFor();
      await box.focus();
      // Typed, not filled, so the browser is in keyboard mode and the focused Next button shows its ring.
      await page.keyboard.type("zzz");
      await page.keyboard.press("Enter");
      await page.waitForTimeout(300);
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
      await page.waitForTimeout(300);
    },
  },
  { name: "home with saved progress", route: "/", limit: 80, seed: true, async setup() {} },
];

async function runScenario(browser, scheme, scenario) {
  const where = `${scenario.route} ${scenario.name} (${scheme})`;
  const context = await newContext(browser, scheme);
  if (scenario.seed) await context.addInitScript(SEED);
  try {
    const { page, errors } = await open(context, scenario.route, where);
    await scenario.setup(page);
    await checkLayout(page, where);
    const moving = await page.evaluate(running);
    if (moving.length) report(where, `running under reduced motion: ${[...new Set(moving)].join(", ")}`);
    // The element focus landed on counts as the first stop.
    const first = await page.evaluate(focusIndicator, "start");
    if (first && !first.seen && !first.ring) report(where, `no visible focus indicator on ${first.what}`);
    await walk(page, where, scenario.limit);
    for (const error of errors) report(where, `console: ${error.slice(0, 160)}`);
  } catch (e) {
    report(where, `crashed: ${String(e.message ?? e).split("\n")[0]}`);
  } finally {
    await context.close();
  }
}

/** A browser context at 375 px with reduced motion and no service worker (it would serve later pages from its cache). */
async function newContext(browser, scheme = "light") {
  const context = await browser.newContext({ viewport: { width: 375, height: 800 }, colorScheme: scheme, reducedMotion: "reduce", serviceWorkers: "block" });
  if (css) await context.addInitScript((rule) => document.addEventListener("DOMContentLoaded", () => document.head.append(Object.assign(document.createElement("style"), { textContent: rule }))), css);
  return context;
}

/** Text size L, every furigana and romaji: overflow and console only. */
const LARGE = () => localStorage.setItem("np:settings", JSON.stringify({ v: 2, data: { furigana: "all", romaji: true, size: "l", font: "mincho", theme: "system" } }));

const server = await serveOut(OUT);
const base = `http://127.0.0.1:${server.address().port}`;
const list = only ? [{ route: only, expect: 200 }] : [...routes().map((route) => ({ route, expect: 200 })), { route: "/no-such-page", expect: 404 }];
const workers = Math.min(WORKERS, list.length);
console.log(`Sweeping ${list.length} page${list.length === 1 ? "" : "s"} in light and dark${only ? "" : `, ${SCENARIOS.length} interactive states, and the large-text pass`}…`);
const started = Date.now();

/**
 * Light and dark side by side, each with `workers` pages at a time. Each worker has its own browser: windows of one
 * browser can't all hold keyboard focus at once, and :focus-visible only applies in the one that does.
 */
async function pool(items, run) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(workers, items.length) }, async () => {
      const browser = await chromium.launch();
      try {
        for (let item = queue.shift(); item; item = queue.shift()) await run(browser, item);
      } finally {
        await browser.close();
      }
    }),
  );
}

try {
  await Promise.all(
    ["light", "dark"].map((scheme) =>
      pool(list, async (browser, { route, expect }) => {
        const context = await newContext(browser, scheme);
        try {
          await sweepPage(context, scheme, route, expect);
        } catch (e) {
          report(`${route} (${scheme})`, `crashed: ${String(e.message ?? e).split("\n")[0]}`);
        } finally {
          await context.close();
        }
      }),
    ),
  );
  if (!only) {
    await Promise.all(["light", "dark"].map((scheme) => pool(SCENARIOS, (browser, s) => runScenario(browser, scheme, s))));
    await pool(list.filter((l) => l.expect === 200), async (browser, { route }) => {
      const where = `${route} (large text)`;
      const context = await newContext(browser);
      await context.addInitScript(LARGE);
      try {
        const { page, errors } = await open(context, route, where);
        await checkLayout(page, where);
        for (const error of errors) report(where, `console: ${error.slice(0, 160)}`);
      } catch (e) {
        report(where, `crashed: ${String(e.message ?? e).split("\n")[0]}`);
      } finally {
        await context.close();
      }
    });
  }
  console.log(`Sweep done in ${Math.round((Date.now() - started) / 1000)} s: ${stops} Tab stops checked.`);

  if (runLighthouse) {
    const chrome = await chromeLauncher.launch({ chromePath: process.env.CHROME_PATH || chromium.executablePath(), chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"] });
    try {
      for (const route of only ? [only] : LIGHTHOUSE_ROUTES) {
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
      }
    } finally {
      await chrome.kill();
    }
  }
} finally {
  server.close();
}

findings.sort();
if (notes.length) console.log(`\nNotes:\n${[...new Set(notes)].sort().map((n) => `- ${n}`).join("\n")}`);
if (findings.length) {
  console.log(`\n${findings.length} finding${findings.length === 1 ? "" : "s"}:`);
  for (const f of findings) console.log(`- ${f}`);
  process.exit(1);
}
console.log("\nNo findings.");
