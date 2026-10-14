/**
 * A static server for a Next export, with the clean URLs a host gives it: /kana/drill serves kana/drill.html.
 * Used by the accessibility sweep and the performance A/B script. Listens on a free port on 127.0.0.1. Text is sent
 * gzipped when the browser asks, as the host does, so byte counts and timings are like the live site's.
 */
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { gzipSync } from "node:zlib";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".txt", ".svg"]);
const gzipped = new Map();

/** Serves `dir`; resolves to the server once it listens. `server.address().port` gives the port. */
export function serveOut(dir) {
  const root = resolve(dir);
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const candidates = [join(root, path), join(root, `${path}.html`), join(root, path, "index.html")];
    const file = candidates.find((c) => (c === root || c.startsWith(root + sep)) && existsSync(c) && statSync(c).isFile());
    if (!file) {
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      return createReadStream(join(root, "404.html")).pipe(res);
    }
    const headers = { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" };
    // Build files have hashed names, as on the host: cache them, so repeat visits measure what a returning reader gets.
    if (path.startsWith("/_next/static/")) headers["Cache-Control"] = "public, max-age=31536000, immutable";
    if (COMPRESSIBLE.has(extname(file)) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
      if (!gzipped.has(file)) gzipped.set(file, gzipSync(readFileSync(file)));
      res.writeHead(200, { ...headers, "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
      return res.end(gzipped.get(file));
    }
    res.writeHead(200, headers);
    createReadStream(file).pipe(res);
  });
  return new Promise((done) => server.listen(0, "127.0.0.1", () => done(server)));
}
