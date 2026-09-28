import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // A stray package-lock.json in the home folder would otherwise be picked as the workspace root.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
