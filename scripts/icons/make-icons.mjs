/**
 * Draws the app icons from scripts/icons/mark.svg with the pinned Playwright Chromium (no image library needed):
 * public/icon-192.png, public/icon-512.png, public/icon-maskable-512.png and app/apple-icon.png (180 px).
 * The maskable icon is full-bleed paper too: the ring (radius 176 of 512) already sits inside the safe zone, a circle
 * of radius 40 % (205 of 512) that a launcher may crop to, so it is drawn at full size (tests/manifest.test.ts checks).
 * Run with `npm run icons` after changing the SVG; the PNGs are committed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const svg = readFileSync(join(here, "mark.svg"), "utf8");

const OUTPUTS = [
  { file: "public/icon-192.png", size: 192, scale: 1 },
  { file: "public/icon-512.png", size: 512, scale: 1 },
  { file: "public/icon-maskable-512.png", size: 512, scale: 1 },
  { file: "app/apple-icon.png", size: 180, scale: 1 },
];

const browser = await chromium.launch();
try {
  for (const { file, size, scale } of OUTPUTS) {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    const inner = (100 * scale).toFixed(1);
    await page.setContent(
      `<!doctype html><html><body style="margin:0;background:#ffffff;display:grid;place-items:center;width:${size}px;height:${size}px">` +
        `<div style="width:${inner}%;height:${inner}%">${svg.replace("<svg ", '<svg width="100%" height="100%" ')}</div></body></html>`,
    );
    writeFileSync(join(root, file), await page.screenshot({ type: "png", omitBackground: false }));
    await page.close();
    console.log(`${file} (${size}×${size})`);
  }
} finally {
  await browser.close();
}
