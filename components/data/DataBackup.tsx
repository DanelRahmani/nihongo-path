"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { Feedback } from "@/components/ui/Feedback";
import { panelClass } from "@/components/ui/Panel";
import { type ReadBackup, readBackup, STORE_NAMES, type StoreOutcome } from "@/lib/backup";
import { decode, encode, type StoreSchema } from "@/lib/envelope";
import { buildExport, exportCsv, exportFileName, type ExportLesson } from "@/lib/export";
import { loadMoreWords } from "@/lib/load-more-words";
import { loadReviewData } from "@/lib/load-review-data";
import { KEPT_ON_MERGE, mergeStores } from "@/lib/merge";
import { VOCAB_MORE_DECK_ID } from "@/lib/notebook";
import { describeItems, type ReviewDecks, reviewDecks } from "@/lib/review-decks";
import { SCHEMAS, type StoreKey, type StoreValues } from "@/lib/schemas";

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

/**
 * Bigger than any export can be: localStorage holds about 5 MB, and the export's analysis sections (each answer
 * spelled out) make the file about three times the stores.
 */
const MAX_FILE = 64 * 1024 * 1024;

const schemaOf = (key: StoreKey) => SCHEMAS[key] as StoreSchema<unknown>;

/** Every store's value as this browser holds it (the fallback where it holds nothing usable). */
function readValues(): StoreValues {
  return Object.fromEntries((Object.keys(SCHEMAS) as StoreKey[]).map((k) => [k, decode(readRaw(k), schemaOf(k)).value])) as StoreValues;
}

/** The decks that describe each item, or null when their data can't be loaded. */
async function loadDecks(stores: StoreValues): Promise<ReviewDecks | null> {
  const usesMore =
    VOCAB_MORE_DECK_ID in stores["np:srs"].decks ||
    stores["np:history"].some((r) => r.k === VOCAB_MORE_DECK_ID) ||
    Object.values(stores["np:notebook"]).some((n) => n.deck === VOCAB_MORE_DECK_ID);
  try {
    const [data, more] = await Promise.all([loadReviewData(), usesMore ? loadMoreWords().catch(() => []) : Promise.resolve([])]);
    return reviewDecks(data, more);
  } catch {
    return null;
  }
}

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
export function DataBackup({
  lessons,
  appVersion,
  typeLessons,
  lessonTopics,
}: {
  lessons: ExportLesson[];
  appVersion: string;
  typeLessons: Record<string, string>;
  lessonTopics: Record<string, string>;
}) {
  const mounted = useMounted();
  const [busy, setBusy] = useState(false);
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

  const download = (name: string, text: string, type: string) => {
    const blob = new Blob([text], { type });
    // The previous file's address is released only now: Safari can still be opening it a while after the click.
    if (lastUrl) URL.revokeObjectURL(lastUrl);
    lastUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = lastUrl;
    link.download = name;
    document.body.append(link);
    link.click();
    link.remove();
  };

  const exportFile = async (kind: "json" | "csv") => {
    setBusy(true);
    const now = Date.now();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const stores = readValues();
    const decks = await loadDecks(stores);
    const file = buildExport({ stores, read: readRaw, lessons, describe: describeItems(decks), now, timeZone, appVersion, typeLessons, lessonTopics });
    const name = exportFileName(now, timeZone, kind);
    if (kind === "json") download(name, JSON.stringify(file), "application/json");
    else download(name, exportCsv(file), "text/csv;charset=utf-8");
    setBusy(false);
    announce(
      `Download started: ${name}.` +
        (decks ? "" : " The questions' text couldn't be loaded (are you offline?), so prompts and answers are left out; everything else is there."),
    );
  };

  const restore = (mode: "merge" | "replace") => {
    if (!read?.ok) return;
    let writes = read.writes;
    if (mode === "merge") {
      const keys = (Object.keys(read.writes) as StoreKey[]).filter((k) => !KEPT_ON_MERGE.includes(k));
      const incoming = Object.fromEntries(keys.map((k) => [k, decode(read.writes[k] ?? null, schemaOf(k)).value])) as Partial<StoreValues>;
      const merged = mergeStores(readValues(), incoming);
      writes = Object.fromEntries(keys.map((k) => [k, encode(merged[k], schemaOf(k))]));
    }
    const before = Object.keys(writes).map((key) => [key, readRaw(key)] as const);
    try {
      for (const [key, raw] of Object.entries(writes)) window.localStorage.setItem(key, raw as string);
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
          Export my progress
        </h2>
        <p className="mt-1 text-sm text-ink-2">
          {held.length
            ? `This browser holds: ${held.map((k) => STORE_NAMES[k].toLowerCase()).join(", ")}.`
            : "This browser holds nothing yet: the export would be empty."}
        </p>
        <p className="mt-2 text-sm text-ink-2">
          The file is a full backup, and it also lists every lesson, every item you&apos;ve answered with its schedule and
          answers, each day&apos;s totals and a summary, for analysing elsewhere. Answers are recorded from this version of
          the app on. The summary as a spreadsheet: one row per item.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => exportFile("json")} disabled={!held.length || busy}>
            Export my progress
          </Button>
          <Button variant="secondary" onClick={() => exportFile("csv")} disabled={!held.length || busy}>
            Export summary (CSV)
          </Button>
        </div>
      </section>

      <section className={panelClass("surface", "p-6")} aria-labelledby="import-heading">
        <h2 id="import-heading" className="text-lg font-medium">
          Import progress
        </h2>
        <p className="mt-1 text-sm text-ink-2">
          Merge keeps the newer state of each card and joins both histories, finished lessons and saved words; your
          display settings stay as they are. Replace swaps what this browser holds for what the file holds. Either way,
          anything the file doesn&apos;t hold stays as it is. To be safe, export this browser&apos;s progress first.
        </p>
        <label className="mt-4 block text-sm">
          <span className="font-medium">Export file</span>
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
              <Button onClick={() => restore("merge")} disabled={!Object.keys(read.writes).length}>
                Merge and reload
              </Button>
              <Button variant="secondary" onClick={() => restore("replace")} disabled={!Object.keys(read.writes).length}>
                Replace and reload
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
