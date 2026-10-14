/**
 * The performance A/B (H1): Lighthouse on two production builds, runs interleaved A, B, A, B… so a busy machine
 * slows both alike, and medians (with their range) reported per page.
 *
 *   npm run perf -- <out-dir-A> <out-dir-B> [--runs 5] [--route /read]…
 *
 * Each directory is a static export (`npm run build` writes `out/`; copy it aside before building the other side,
 * or build the other commit in a git worktree). With one directory, it is measured alone. Lighthouse's mobile
 * preset (simulated slow 4G and a 4× slower CPU), performance only. Uses the pre-installed Chromium through
 * CHROME_PATH, or Playwright's when unset.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "playwright";
import { serveOut } from "./serve-out.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.flatMap((a, i) => (a === name ? [args[i + 1]] : []));
const dirs = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));
const runs = Number(flag("--runs")[0] ?? 5);
const routes = flag("--route").length ? flag("--route") : ["/", "/learn/start/polite-and-casual", "/kana/drill", "/read", "/dictionary"];

if (dirs.length < 1 || dirs.length > 2 || dirs.some((d) => !existsSync(join(d, "index.html"))) || !(runs > 0)) {
  console.error("Usage: npm run perf -- <out-dir-A> [<out-dir-B>] [--runs 5] [--route /path]…");
  process.exit(2);
}

const METRICS = {
  score: (lhr) => Math.round(lhr.categories.performance.score * 100),
  "FCP ms": (lhr) => lhr.audits["first-contentful-paint"].numericValue,
  "LCP ms": (lhr) => lhr.audits["largest-contentful-paint"].numericValue,
  "TBT ms": (lhr) => lhr.audits["total-blocking-time"].numericValue,
  CLS: (lhr) => lhr.audits["cumulative-layout-shift"].numericValue,
  "KB": (lhr) => lhr.audits["total-byte-weight"].numericValue / 1024,
  "font KB": (lhr) => fontRequests(lhr).reduce((sum, r) => sum + r.transferSize, 0) / 1024,
  fonts: (lhr) => fontRequests(lhr).length,
};
const fontRequests = (lhr) => (lhr.audits["network-requests"].details?.items ?? []).filter((r) => r.resourceType === "Font");
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const show = (key, v) => (key === "CLS" ? v.toFixed(3) : String(Math.round(v)));

const servers = await Promise.all(dirs.map((d) => serveOut(d)));
const bases = servers.map((s) => `http://127.0.0.1:${s.address().port}`);
const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH || chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});

const results = new Map(); // `${route}|${side}` → lhr[]
console.log(`Lighthouse, mobile preset: ${routes.length} pages × ${runs} runs × ${dirs.length} build${dirs.length > 1 ? "s" : ""}.`);
for (const route of routes) {
  for (let run = 0; run < runs; run++) {
    // Alternate which side goes first, so neither always gets the warmer machine.
    const order = run % 2 ? [...bases.keys()].reverse() : [...bases.keys()];
    for (const side of order) {
      const { lhr } = await lighthouse(bases[side] + route, { port: chrome.port, onlyCategories: ["performance"], output: "json", logLevel: "error" });
      if (lhr.runtimeError) throw new Error(`${route}: ${lhr.runtimeError.message}`);
      const key = `${route}|${side}`;
      results.set(key, [...(results.get(key) ?? []), lhr]);
    }
  }
  // Lighthouse's simulated timings come in steps and often fall in two clusters, so the range goes beside each median.
  const rows = [...bases.keys()].map((side) => {
    const lhrs = results.get(`${route}|${side}`);
    return Object.fromEntries(Object.entries(METRICS).map(([k, f]) => [k, lhrs.map(f)]));
  });
  const cell = (k, values) => `${show(k, median(values))} [${show(k, Math.min(...values))}–${show(k, Math.max(...values))}]`.padStart(24);
  console.log(`\n${route}`);
  for (const k of Object.keys(METRICS)) {
    const [a, b] = rows.map((r) => r[k]);
    const diff = b && median(b) - median(a);
    console.log(`  ${k.padEnd(8)} ${cell(k, a)}${b === undefined ? "" : `  → ${cell(k, b)}  (${diff >= 0 ? "+" : ""}${show(k, diff)})`}`);
  }
}

await chrome.kill();
for (const s of servers) s.close();
