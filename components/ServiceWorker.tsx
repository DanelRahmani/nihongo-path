"use client";

import { useEffect } from "react";
import { whenIdle } from "@/lib/idle";
import { RETIRE_WORKER } from "@/lib/service-worker";

/**
 * Registers the service worker (app/sw.js, lib/service-worker.ts) once the page is idle, in production builds only:
 * in development it would keep serving pages the dev server has since changed. Once it is active, the page posts the
 * build files it loaded before the worker controlled it, so they're kept for offline use too. With RETIRE_WORKER
 * set, it unregisters the worker instead.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    return whenIdle(() => {
      if (RETIRE_WORKER) {
        navigator.serviceWorker
          .getRegistrations()
          .then((registrations) => registrations.forEach((r) => r.unregister()))
          .catch(() => {});
        return;
      }
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => navigator.serviceWorker.ready)
        .then((registration) => {
          const urls = performance
            .getEntriesByType("resource")
            .map((entry) => entry.name)
            .filter((url) => new URL(url).pathname.startsWith("/_next/static/"));
          registration.active?.postMessage({ type: "keep", urls });
        })
        .catch(() => {
          // No offline copy this visit; the site works as before.
        });
    });
  }, []);
  return null;
}
