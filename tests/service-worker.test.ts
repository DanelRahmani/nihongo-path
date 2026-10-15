import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CACHE_PREFIX, PRECACHE, RETIRE_WORKER, serviceWorkerSource, STATIC_CACHE } from "@/lib/service-worker";

const ORIGIN = "https://site.test";
const href = (r: Request | string) => (typeof r === "string" ? new URL(r, ORIGIN).href : r.url);

/** A response as a same-origin fetch gives it (type "basic"; Node's own are "default"). */
function basic(body: string, init: ResponseInit = {}) {
  const response = new Response(body, init);
  Object.defineProperty(response, "type", { value: "basic" });
  return response;
}

/** A Cache Storage in memory, keyed by URL, whose `put` can be made to fail (a full quota). */
function fakeCaches() {
  const stores = new Map<string, Map<string, Response>>();
  const failing = { put: false };
  const open = async (name: string) => {
    if (!stores.has(name)) stores.set(name, new Map());
    const store = stores.get(name)!;
    return {
      put: async (r: Request | string, response: Response) => {
        if (failing.put) throw new DOMException("full", "QuotaExceededError");
        store.set(href(r), response);
      },
      match: async (r: Request | string) => store.get(href(r))?.clone(),
      keys: async () => [...store.keys()].map((url) => new Request(url)),
      delete: async (r: Request | string) => store.delete(href(r)),
    };
  };
  return { stores, failing, api: { open, keys: async () => [...stores.keys()], delete: async (name: string) => stores.delete(name) } };
}

type Fetch = (r: Request | string) => Promise<Response>;

/** Runs the worker's source with a fake `self`, `caches` and `fetch`, and returns a way to fire its events. */
function boot(source: string, caches: ReturnType<typeof fakeCaches>, fetchImpl: { fn: Fetch }) {
  const handlers: Record<string, (event: unknown) => void> = {};
  const navigated: string[] = [];
  const self = {
    location: { origin: ORIGIN },
    addEventListener: (type: string, fn: (event: unknown) => void) => (handlers[type] = fn),
    skipWaiting: async () => {},
    registration: { unregister: async () => true },
    clients: { claim: async () => {}, matchAll: async () => [{ url: `${ORIGIN}/review`, navigate: async (url: string) => navigated.push(url) }] },
  };
  new Function("self", "caches", "fetch", source)(self, caches.api, (r: Request | string) => fetchImpl.fn(typeof r === "string" ? new URL(r, ORIGIN).href : r));
  const run = async (type: string, extra: object = {}) => {
    const waits: Promise<unknown>[] = [];
    let responded: Promise<Response> | undefined;
    handlers[type]({ ...extra, waitUntil: (p: Promise<unknown>) => waits.push(p), respondWith: (p: Promise<Response>) => (responded = p) });
    const response = responded ? await responded : undefined;
    await Promise.all(waits);
    return response;
  };
  return { run, navigated };
}

const get = (path: string, init?: RequestInit) => new Request(`${ORIGIN}${path}`, init);
const navigate = (path: string) => new Proxy(get(path), { get: (t, k) => (k === "mode" ? "navigate" : Reflect.get(t, k)) });
const page = (chunks: string[]) => basic(`<html>${chunks.map((c) => `<script src="${c}"></script>`).join("")}</html>`, { headers: { "Content-Type": "text/html; charset=utf-8" } });

describe("the service worker", () => {
  it("is plain script that parses, names its build, and lists the shell and the data", () => {
    for (const source of [serviceWorkerSource("abc"), serviceWorkerSource("abc", { retire: true })]) expect(() => new Function("self", "caches", "fetch", source)).not.toThrow();
    expect(serviceWorkerSource("abc")).toContain(`"${CACHE_PREFIX}pages-abc"`);
    for (const url of ["/", "/review", "/dictionary-data.json", "/search-items.json", "/review-data.json"]) expect(PRECACHE).toContain(url);
    expect(RETIRE_WORKER).toBe(false);
  });

  it("precaches only pages and data that exist, also in the built site when there is one", () => {
    for (const url of PRECACHE) {
      const dir = url === "/" ? "app" : `app${url}`;
      expect(existsSync(`${dir}/page.tsx`) || existsSync(`${dir}/route.ts`), url).toBe(true);
      if (existsSync("out/index.html")) expect(existsSync(url === "/" ? "out/index.html" : url.endsWith(".json") ? `out${url}` : `out${url}.html`), `out: ${url}`).toBe(true);
    }
  });

  it("saves the shell and the build files its pages name on install, skipping a file that fails", async () => {
    const caches = fakeCaches();
    const fetched: string[] = [];
    const fetchImpl = {
      fn: async (r: Request | string) => {
        const url = href(r);
        fetched.push(url);
        if (url.endsWith("/review")) return basic("gone", { status: 404 });
        if (url.includes("/_next/static/")) return basic("chunk");
        if (url.endsWith(".json")) return basic("{}", { headers: { "Content-Type": "application/json" } });
        return page(["/_next/static/chunks/a.js", "/_next/static/css/b.css"]);
      },
    };
    await boot(serviceWorkerSource("v1"), caches, fetchImpl).run("install");
    const pages = caches.stores.get(`${CACHE_PREFIX}pages-v1`)!;
    expect(pages.has(`${ORIGIN}/review`)).toBe(false);
    expect(pages.has(`${ORIGIN}/kanji/drill`)).toBe(true);
    expect([...caches.stores.get(STATIC_CACHE)!.keys()].sort()).toEqual([`${ORIGIN}/_next/static/chunks/a.js`, `${ORIGIN}/_next/static/css/b.css`]);
    // Each build file is fetched once, though every page names it.
    expect(fetched.filter((u) => u.endsWith("a.js"))).toHaveLength(1);
  });

  it("serves pages network-first, keeping one copy per path, and the kept copy only offline", async () => {
    const caches = fakeCaches();
    const net = { fn: (async () => basic("fresh")) as Fetch };
    const { run } = boot(serviceWorkerSource("v1"), caches, net);
    expect(await (await run("fetch", { request: navigate("/dictionary?q=a") }))!.text()).toBe("fresh");
    net.fn = async () => basic("newer");
    expect(await (await run("fetch", { request: navigate("/dictionary?q=b") }))!.text()).toBe("newer");
    expect([...caches.stores.get(`${CACHE_PREFIX}pages-v1`)!.keys()]).toEqual([`${ORIGIN}/dictionary`]);
    net.fn = async () => {
      throw new TypeError("offline");
    };
    expect(await (await run("fetch", { request: navigate("/dictionary?q=c") }))!.text()).toBe("newer");
    const notice = (await run("fetch", { request: navigate("/never-seen") }))!;
    expect(notice.status).toBe(503);
    expect(await notice.text()).toContain("You're offline");
    // Data never saved fails offline as a fetch would.
    await expect(run("fetch", { request: get("/other.json") })).rejects.toThrow("offline");
  });

  it("returns the network's answer when saving it fails, and keeps only whole 200 responses", async () => {
    const caches = fakeCaches();
    const net = { fn: (async () => basic("old build")) as Fetch };
    const { run } = boot(serviceWorkerSource("v1"), caches, net);
    await run("fetch", { request: navigate("/review") });
    caches.failing.put = true;
    net.fn = async () => basic("new build");
    expect(await (await run("fetch", { request: navigate("/review") }))!.text()).toBe("new build");
    expect(await (await run("fetch", { request: get("/_next/static/chunks/c.js") }))!.text()).toBe("new build");
    caches.failing.put = false;
    net.fn = async () => basic("missing", { status: 404 });
    await run("fetch", { request: navigate("/gone") });
    net.fn = async () => new Response("opaque");
    await run("fetch", { request: navigate("/elsewhere") });
    expect([...caches.stores.get(`${CACHE_PREFIX}pages-v1`)!.keys()]).toEqual([`${ORIGIN}/review`]);
  });

  it("serves build files cache-first, and leaves router payloads, Range requests, other origins and non-GET alone", async () => {
    const caches = fakeCaches();
    let calls = 0;
    const { run } = boot(serviceWorkerSource("v1"), caches, { fn: async () => basic(`chunk ${++calls}`) });
    const chunk = () => get("/_next/static/chunks/a1b2.js");
    expect(await (await run("fetch", { request: chunk() }))!.text()).toBe("chunk 1");
    expect(await (await run("fetch", { request: chunk() }))!.text()).toBe("chunk 1");
    for (const request of [
      get("/kana/drill.txt?_rsc=abc"),
      get("/kana/drill/__next.kana.txt"),
      get("/review-data.json", { headers: { range: "bytes=0-10" } }),
      new Request("https://fonts.example/x.woff2"),
      get("/x", { method: "POST" }),
    ]) {
      expect(await run("fetch", { request }), request.url).toBeUndefined();
    }
  });

  it("keeps the build files the page posts, and only same-origin build files", async () => {
    const caches = fakeCaches();
    const { run } = boot(serviceWorkerSource("v1"), caches, { fn: async () => basic("chunk") });
    await run("message", { data: { type: "keep", urls: [`${ORIGIN}/_next/static/chunks/p.js`, `${ORIGIN}/secret.json`, "https://evil.test/_next/static/x.js", 42] } });
    expect([...caches.stores.get(STATIC_CACHE)!.keys()]).toEqual([`${ORIGIN}/_next/static/chunks/p.js`]);
  });

  it("on activate deletes other builds' page caches and the build files this build's pages don't name", async () => {
    const caches = fakeCaches();
    const net = { fn: (async (r: Request | string) => (href(r).includes("/_next/") ? basic("chunk") : page(["/_next/static/chunks/new.js"]))) as Fetch };
    for (const name of [`${CACHE_PREFIX}pages-old`, "someone-else"]) await caches.api.open(name);
    await (await caches.api.open(STATIC_CACHE)).put(`${ORIGIN}/_next/static/chunks/old.js`, basic("old"));
    const worker = boot(serviceWorkerSource("v2"), caches, net);
    await worker.run("install");
    await worker.run("activate");
    expect([...caches.stores.keys()].sort()).toEqual([`${CACHE_PREFIX}pages-v2`, STATIC_CACHE, "someone-else"].sort());
    expect([...caches.stores.get(STATIC_CACHE)!.keys()]).toEqual([`${ORIGIN}/_next/static/chunks/new.js`]);
  });

  it("on activate keeps the fonts this build's stylesheets name, without fetching them", async () => {
    const caches = fakeCaches();
    const fetched: string[] = [];
    const net = {
      fn: (async (r: Request | string) => {
        fetched.push(href(r));
        if (href(r).endsWith(".css")) return basic("@font-face{src:url(../media/kept.woff2) format(\"woff2\")}");
        return href(r).includes("/_next/") ? basic("chunk") : page(["/_next/static/chunks/a.js", "/_next/static/css/b.css"]);
      }) as Fetch,
    };
    const statics = await caches.api.open(STATIC_CACHE);
    for (const font of ["kept", "gone"]) await statics.put(`${ORIGIN}/_next/static/media/${font}.woff2`, basic("font"));
    const worker = boot(serviceWorkerSource("v3"), caches, net);
    await worker.run("install");
    await worker.run("activate");
    const keys = [...caches.stores.get(STATIC_CACHE)!.keys()];
    expect(keys).toContain(`${ORIGIN}/_next/static/media/kept.woff2`);
    expect(keys).not.toContain(`${ORIGIN}/_next/static/media/gone.woff2`);
    expect(fetched.some((u) => u.endsWith(".woff2"))).toBe(false);
  });

  it("retired, deletes its caches, unregisters and reloads the open tabs", async () => {
    const caches = fakeCaches();
    for (const name of [`${CACHE_PREFIX}pages-v1`, STATIC_CACHE, "someone-else"]) await caches.api.open(name);
    const worker = boot(serviceWorkerSource("v3", { retire: true }), caches, { fn: async () => basic("") });
    await worker.run("activate");
    expect([...caches.stores.keys()]).toEqual(["someone-else"]);
    expect(worker.navigated).toEqual([`${ORIGIN}/review`]);
  });

  it("is registered only in production builds, by a component in the layout", () => {
    expect(readFileSync("components/ServiceWorker.tsx", "utf8")).toMatch(/NODE_ENV !== "production"/);
    expect(readFileSync("app/layout.tsx", "utf8")).toMatch(/<ServiceWorker \/>/);
  });
});
