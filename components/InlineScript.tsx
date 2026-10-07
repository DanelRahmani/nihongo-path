"use client";

/**
 * An inline script that runs while the browser parses the server HTML. On the client React renders it
 * as text/plain, so it never runs twice and React doesn't warn about rendering a script
 * (node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md).
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
