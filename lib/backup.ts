/**
 * Backup and restore (H3): every `np:*` store in one file, `{"app": "nihongo-path", "backup": 1, "exported": …,
 * "stores": {key: envelope}}`. Each store keeps its own envelope, so a file from an older build imports through the
 * stores' own migration chains (lib/envelope.ts), version 0 (unwrapped) included. Pure: the caller reads and
 * writes localStorage.
 */
import { decode, encode, isPlainObject, type StoreSchema } from "@/lib/envelope";
import { SCHEMAS, type StoreKey } from "@/lib/schemas";

export const BACKUP_APP = "nihongo-path";
/** The file format's version: the wrapper, not the stores, which carry their own. */
export const BACKUP_VERSION = 1;

const KEYS = Object.keys(SCHEMAS) as StoreKey[];

/** The backup file's text: every store that holds something, as stored (unparseable values are left out). */
export function makeBackup(read: (key: string) => string | null, now: Date): string {
  const stores: Record<string, unknown> = {};
  for (const key of KEYS) {
    const raw = read(key);
    if (raw === null) continue;
    try {
      stores[key] = JSON.parse(raw);
    } catch {
      // A corrupt value: the app already ignores it, so the backup does too.
    }
  }
  return JSON.stringify({ app: BACKUP_APP, backup: BACKUP_VERSION, exported: now.toISOString(), stores }, null, 2);
}

/** The file name for a backup made at `now`, by the local date: nihongo-path-2026-10-14.json. */
export const backupFileName = (now: Date) =>
  `nihongo-path-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}.json`;

export type StoreOutcome = "restored" | "migrated" | "newer" | "unusable" | "kept-newer";

export type ReadBackup =
  | {
      ok: true;
      exported: string | null;
      /** What to write: each usable store, encoded at this build's version. */
      writes: Partial<Record<StoreKey, string>>;
      /** What happened to each store in the file, in store order. Stores the file lacks aren't listed. */
      outcomes: { key: StoreKey; outcome: StoreOutcome }[];
    }
  | { ok: false; reason: string };

/**
 * Reads a backup file. Each store is validated and migrated to this build's version; a store written by a newer
 * build, or one that can't be used, is left out (and named), and the rest still import. Keys this build doesn't know
 * are ignored. A store this browser holds from a newer build (`current`) is kept: this build can't tell what it
 * would lose. Nothing is written: the caller writes `writes` and reloads.
 */
export function readBackup(text: string, current: (key: string) => string | null = () => null): ReadBackup {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, reason: "This file isn't a Nihongo Path backup: it isn't JSON." };
  }
  if (!isPlainObject(parsed) || parsed.app !== BACKUP_APP || !isPlainObject(parsed.stores)) {
    return { ok: false, reason: "This file isn't a Nihongo Path backup." };
  }
  if (!Number.isInteger(parsed.backup) || (parsed.backup as number) < 1) return { ok: false, reason: "This backup has no version." };
  if ((parsed.backup as number) > BACKUP_VERSION) return { ok: false, reason: "This backup was made by a newer version of the app. Update the app, then import it." };
  const stores = parsed.stores;
  const writes: Partial<Record<StoreKey, string>> = {};
  const outcomes: { key: StoreKey; outcome: StoreOutcome }[] = [];
  for (const key of KEYS) {
    if (!Object.prototype.hasOwnProperty.call(stores, key)) continue;
    const schema = SCHEMAS[key] as StoreSchema<unknown>;
    const { value, status } = decode(JSON.stringify(stores[key]), schema);
    if (decode(current(key), schema).status === "future") outcomes.push({ key, outcome: "kept-newer" });
    else if (status === "future") outcomes.push({ key, outcome: "newer" });
    else if (status === "corrupt" || status === "empty") outcomes.push({ key, outcome: "unusable" });
    else {
      writes[key] = encode(value, schema);
      outcomes.push({ key, outcome: status === "migrated" ? "migrated" : "restored" });
    }
  }
  if (!Object.keys(writes).length) return { ok: false, reason: "This backup holds nothing this version of the app can use." };
  return { ok: true, exported: typeof parsed.exported === "string" ? parsed.exported : null, writes, outcomes };
}

/** What each store holds, for the page and the import summary. */
export const STORE_NAMES: Record<StoreKey, string> = {
  "np:settings": "Display settings",
  "np:progress": "Finished lessons",
  "np:srs": "Drill schedules",
  "np:path-filter": "Path tab and filter",
  "np:my-words": "My words",
  "np:activity": "Daily goal and streak",
  "np:notebook": "Mistake notebook",
  "np:study": "Study choices (More words, new cards a day)",
  "np:new-cards": "New cards today",
};
