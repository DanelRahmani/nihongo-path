"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { Feedback } from "@/components/ui/Feedback";
import { panelClass } from "@/components/ui/Panel";
import { backupFileName, makeBackup, type ReadBackup, readBackup, STORE_NAMES, type StoreOutcome } from "@/lib/backup";
import type { StoreKey } from "@/lib/schemas";

const noSubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(noSubscribe, () => true, () => false);

/** localStorage can be missing or throw (private mode, blocked storage). */
function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Whether the browser lets the page use localStorage at all. */
function storageWorks(): boolean {
  try {
    window.localStorage.getItem("np:settings");
    return true;
  } catch {
    return false;
  }
}

/** Bigger than any backup can be: localStorage itself holds about 5 MB. */
const MAX_FILE = 5 * 1024 * 1024;

const OUTCOME: Record<StoreOutcome, string> = {
  restored: "will be restored",
  migrated: "will be restored (from an older version of the app)",
  newer: "left out: made by a newer version of the app",
  unusable: "left out: it couldn't be read",
  "kept-newer": "kept as it is: this browser's copy is from a newer version of the app",
};

let lastUrl: string | undefined;

/**
 * Export every store to a file, and import one back. An import is read and checked first (lib/backup.ts), the
 * reader sees what it holds, and only then are the stores written; the page then reloads, so every store and the
 * display settings start from the restored data. Stores the file lacks are kept. A write that fails part-way puts
 * the earlier stores back.
 */
export function DataBackup() {
  const mounted = useMounted();
  const [read, setRead] = useState<(ReadBackup & { name: string }) | null>(null);
  const [status, setStatus] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  if (!mounted) return <div aria-hidden className={panelClass("surface", "min-h-64")} />;

  if (!storageWorks()) {
    return (
      <Feedback kind="info">
        This browser won&apos;t let the app store anything (private browsing, or site data turned off), so there is nothing
        to back up, and a backup couldn&apos;t be restored here.
      </Feedback>
    );
  }

  // Cleared first, so the same message twice is announced twice.
  const announce = (text: string) => {
    setStatus("");
    setTimeout(() => setStatus(text), 50);
  };

  const held = (Object.keys(STORE_NAMES) as StoreKey[]).filter((key) => readRaw(key) !== null);

  const exportFile = () => {
    const now = new Date();
    const blob = new Blob([makeBackup(readRaw, now)], { type: "application/json" });
    // The previous file's address is released only now: Safari can still be opening it a while after the click.
    if (lastUrl) URL.revokeObjectURL(lastUrl);
    lastUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = lastUrl;
    link.download = backupFileName(now);
    document.body.append(link);
    link.click();
    link.remove();
    announce(`Download started: ${link.download}.`);
  };

  const restore = () => {
    if (!read?.ok) return;
    const before = Object.keys(read.writes).map((key) => [key, readRaw(key)] as const);
    try {
      for (const [key, raw] of Object.entries(read.writes)) window.localStorage.setItem(key, raw as string);
    } catch {
      // Put back what was written before the failure, so the browser doesn't hold half of each.
      for (const [key, raw] of before) {
        try {
          if (raw === null) window.localStorage.removeItem(key);
          else window.localStorage.setItem(key, raw);
        } catch {
          // Nothing more can be done here.
        }
      }
      announce("The browser ran out of room for the backup, so nothing was restored.");
      return;
    }
    window.location.reload();
  };

  const exported = read?.ok && read.exported && !Number.isNaN(Date.parse(read.exported)) ? new Date(read.exported).toLocaleString() : null;

  return (
    <div className="space-y-6">
      <section className={panelClass("surface", "p-6")} aria-labelledby="export-heading">
        <h2 id="export-heading" className="text-lg font-medium">
          Save a backup
        </h2>
        <p className="mt-1 text-sm text-ink-2">
          {held.length
            ? `This browser holds: ${held.map((k) => STORE_NAMES[k].toLowerCase()).join(", ")}.`
            : "This browser holds nothing yet: the backup would be empty."}
        </p>
        <Button className="mt-4" onClick={exportFile} disabled={!held.length}>
          Save to a file
        </Button>
      </section>

      <section className={panelClass("surface", "p-6")} aria-labelledby="import-heading">
        <h2 id="import-heading" className="text-lg font-medium">
          Restore a backup
        </h2>
        <p className="mt-1 text-sm text-ink-2">
          What the file holds replaces what this browser holds; anything the file doesn&apos;t hold stays as it is. To be
          safe, save a backup of this browser first.
        </p>
        <label className="mt-4 block text-sm">
          <span className="font-medium">Backup file</span>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="mt-2 block w-full text-sm file:mr-3 file:h-10 file:rounded-full file:border file:border-line-strong file:bg-surface file:px-4 file:text-sm file:text-ink"
            onChange={async (e) => {
              const input = e.currentTarget;
              const file = input.files?.[0];
              if (!file) return setRead(null);
              if (file.size > MAX_FILE) {
                setRead({ ok: false, reason: "This file is far bigger than any backup, so it wasn't read.", name: file.name });
                return announce("This file is far bigger than any backup, so it wasn't read.");
              }
              let text: string;
              try {
                text = await file.text();
              } catch {
                setRead({ ok: false, reason: "The file couldn't be read. Choose it again.", name: file.name });
                return announce("The file couldn't be read. Choose it again.");
              }
              // A later choice wins over a slow read of an earlier one.
              if (input.files?.[0] !== file) return;
              const result = readBackup(text, readRaw);
              setRead({ ...result, name: file.name });
              announce(result.ok ? `${file.name} read. Check what it holds, then restore it.` : result.reason);
            }}
          />
        </label>
        {read && !read.ok && (
          <Feedback kind="info" className="mt-4">
            {read.reason}
          </Feedback>
        )}
        {read?.ok && (
          <div className="mt-4">
            <p className="text-sm">
              {read.name}
              {exported && `, saved ${exported}`}:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2">
              {read.outcomes.map((o) => (
                <li key={o.key}>
                  {STORE_NAMES[o.key]}: {OUTCOME[o.outcome]}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-2">Close the app&apos;s other tabs first, so they don&apos;t write their old copies back.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={restore} disabled={!Object.keys(read.writes).length}>
                Restore and reload
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setRead(null);
                  announce("Nothing was restored.");
                  if (fileInput.current) {
                    fileInput.current.value = "";
                    fileInput.current.focus();
                  }
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Always mounted, so screen readers announce each change. */}
      <p role="status" className="sr-only">
        {status}
      </p>
    </div>
  );
}
