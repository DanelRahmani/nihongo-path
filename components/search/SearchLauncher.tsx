"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isSearchShortcut } from "@/lib/search-shortcut";

// The dialog and its index load only when the reader first opens search.
const SearchDialog = dynamic(() => import("@/components/search/SearchDialog"), { ssr: false });
const preload = () => void import("@/components/search/SearchDialog");

/** The header's search button, and the / and Ctrl/⌘K shortcuts anywhere outside a text field. */
export function SearchLauncher() {
  // How many times search was asked for: 0 until the first, which loads the dialog.
  const [request, setRequest] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || !isSearchShortcut(e)) return;
      // The / would otherwise land in the search box, and Ctrl+K would focus the browser's address bar.
      e.preventDefault();
      setRequest((n) => n + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        aria-haspopup="dialog"
        aria-keyshortcuts="/ Control+K Meta+K"
        title="Search (/)"
        onPointerEnter={preload}
        onFocus={preload}
        onClick={() => setRequest((n) => n + 1)}
        className="grid size-9 place-items-center rounded-full text-ink-2 transition-colors duration-150 hover:bg-paper-2 hover:text-ink"
      >
        <svg aria-hidden viewBox="0 0 20 20" className="size-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="8.5" cy="8.5" r="5.75" />
          <path d="m13 13 4.25 4.25" />
        </svg>
      </button>
      {request > 0 && <SearchDialog request={request} />}
    </>
  );
}
