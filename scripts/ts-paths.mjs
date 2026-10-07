// Lets `node scripts/<name>.ts` run with the app's imports: the "@/" alias and extensionless paths.
// Node strips the TypeScript types itself; this hook only resolves file names.
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";

const root = new URL("../", import.meta.url);
const EXTENSIONS = [".ts", ".tsx", "/index.ts"];

registerHooks({
  resolve(specifier, context, next) {
    let spec = specifier.startsWith("@/") ? new URL(specifier.slice(2), root).href : specifier;
    const local = spec.startsWith("file:") || spec.startsWith(".");
    if (local && !/\.[cm]?[jt]sx?$|\.json$/.test(spec)) {
      const base = new URL(spec, context.parentURL).href;
      const hit = EXTENSIONS.map((ext) => base + ext).find((u) => existsSync(new URL(u)));
      if (hit) spec = hit;
    }
    return next(spec, context);
  },
});
