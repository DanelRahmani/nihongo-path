import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    // Tests that build every deck from the whole curriculum take seconds, more under the full run's parallel load.
    testTimeout: 20_000,
  },
});
