import type { MetadataRoute } from "next";
import { THEME_COLORS } from "@/lib/display";

/**
 * The web app manifest, served at /manifest.webmanifest, so browsers offer to install the app. The colours are the
 * light theme's paper (THEME_COLORS); the icons come from scripts/icons (`npm run icons`).
 */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "日本語の道 Nihongo Path",
    short_name: "Nihongo Path",
    description: "Learn kana, particles, grammar and conversation culture with clear example pairs.",
    id: "/",
    lang: "en",
    dir: "ltr",
    categories: ["education"],
    start_url: "/",
    scope: "/",
    display: "standalone",
    // One colour only: the light paper, the default theme. A dark system gets a white launch screen (accepted); the
    // window's title bar then follows the page's theme-color tags.
    background_color: THEME_COLORS.light,
    theme_color: THEME_COLORS.light,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
