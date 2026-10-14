"use client";

import Link from "next/link";
import { useEffect } from "react";

/** A page that moved: sends the reader on at once (a static export has no server redirects) and links there too. */
export function MovedTo({ href, label }: { href: string; label: string }) {
  useEffect(() => window.location.replace(href), [href]);
  return (
    <p className="mt-4 leading-relaxed text-ink-2">
      This page has moved to{" "}
      <Link href={href} className="link-inline">
        {label}
      </Link>
      .
    </p>
  );
}
