/**
 * A static server for a Next export, with the clean URLs a host gives it: /kana/drill serves kana/drill.html.
 * Used by the accessibility sweep and the performance A/B script. Listens on a free port on 127.0.0.1.
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

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
    res.writeHead(200, headers);
    createReadStream(file).pipe(res);
  });
  return new Promise((done) => server.listen(0, "127.0.0.1", () => done(server)));
}
