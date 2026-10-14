import { RETIRE_WORKER, serviceWorkerSource } from "@/lib/service-worker";

/**
 * The service worker, as a static file at the site's root (so its scope is the whole site). Each build gets its
 * own version, so a new build's worker replaces the old one and refreshes the saved pages.
 */
export const dynamic = "force-static";

const VERSION = Date.now().toString(36);

export function GET() {
  return new Response(serviceWorkerSource(VERSION, { retire: RETIRE_WORKER }), { headers: { "Content-Type": "application/javascript; charset=utf-8" } });
}
