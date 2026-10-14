import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";
import { THEME_COLORS } from "@/lib/display";

/** A PNG's width and height, from its IHDR chunk. */
function pngSize(file: string): string {
  const bytes = readFileSync(file);
  expect(bytes.subarray(1, 4).toString("latin1"), file).toBe("PNG");
  return `${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`;
}

describe("the web app manifest", () => {
  const m = manifest();

  it("names the app, starts at the home page and opens standalone", () => {
    expect(m.name).toBe("日本語の道 Nihongo Path");
    expect(m.short_name).toBe("Nihongo Path");
    expect(m.start_url).toBe("/");
    expect(m.display).toBe("standalone");
    // The light theme's paper, as the layout's theme colour.
    expect(m.theme_color).toBe(THEME_COLORS.light);
    expect(m.id).toBe("/");
    // THEME_COLORS are the two themes' paper.
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).toMatch(new RegExp(`--paper:\\s*${THEME_COLORS.light}`));
    expect(css).toMatch(new RegExp(`--paper:\\s*${THEME_COLORS.dark}`));
  });

  it("lists icons that exist at their stated sizes, with a 192 px, a 512 px and a maskable one", () => {
    const icons = m.icons ?? [];
    for (const icon of icons) {
      const file = `public${icon.src}`;
      expect(existsSync(file), file).toBe(true);
      expect(pngSize(file), file).toBe(icon.sizes);
    }
    expect(icons.map((i) => i.sizes)).toEqual(expect.arrayContaining(["192x192", "512x512"]));
    expect(icons.some((i) => i.purpose === "maskable")).toBe(true);
    expect(pngSize("app/apple-icon.png")).toBe("180x180");
  });

  it("keeps the maskable icon's mark inside the safe zone, a circle of radius 40 % of the width", () => {
    const radii = [...readFileSync("scripts/icons/mark.svg", "utf8").matchAll(/<circle[^>]* r="(\d+)"/g)].map((r) => Number(r[1]));
    const scale = Number(/icon-maskable-512\.png", size: 512, scale: ([\d.]+)/.exec(readFileSync("scripts/icons/make-icons.mjs", "utf8"))![1]);
    expect(Math.max(...radii) * scale).toBeLessThanOrEqual(0.4 * 512);
  });

  it("is in the built site as built from app/manifest.ts, with the icons beside it (skipped without a build)", () => {
    if (!existsSync("out/index.html")) return;
    const built = JSON.parse(readFileSync("out/manifest.webmanifest", "utf8"));
    expect(built).toEqual(JSON.parse(JSON.stringify(m)));
    for (const icon of built.icons) expect(existsSync(`out${icon.src}`), icon.src).toBe(true);
    expect(readFileSync("out/index.html", "utf8")).toMatch(/<link rel="manifest" href="\/manifest.webmanifest"/);
  });
});
