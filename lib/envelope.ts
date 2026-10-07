/**
 * Versioned storage envelopes. Every store keeps `{"v": n, "data": …}` in localStorage, so a later
 * build can tell old data from new and migrate it step by step. Pure: no window, no React.
 *
 * Version 0 is the raw, unwrapped value written before envelopes existed.
 */

export interface StoreSchema<T> {
  /** The version this build writes. */
  version: number;
  /** Used when there is nothing stored, or nothing usable. */
  fallback: T;
  /** `migrations[n]` turns version-n data into version n+1. Length must equal `version`. */
  migrations: ((data: unknown) => unknown)[];
  /** Final check on migrated data: the value to use (repaired where possible), or null to fall back. */
  validate: (data: unknown) => T | null;
}

export type DecodeStatus =
  /** Nothing stored. */
  | "empty"
  /** Stored at this build's version. */
  | "current"
  /** Stored at an older version (0 = unwrapped) and migrated. */
  | "migrated"
  /** Written by a newer build. The fallback is used, and the store must not overwrite it. */
  | "future"
  /** Unparseable or unusable; the fallback is used. */
  | "corrupt";

export interface Decoded<T> {
  value: T;
  status: DecodeStatus;
}

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

/** An envelope has exactly the keys `v` (a positive integer) and `data`. Anything else is version 0. */
export function isEnvelope(x: unknown): x is { v: number; data: unknown } {
  if (!isPlainObject(x)) return false;
  const keys = Object.keys(x);
  return keys.length === 2 && "data" in x && Number.isInteger(x.v) && (x.v as number) >= 1;
}

export function decode<T>(raw: string | null, schema: StoreSchema<T>): Decoded<T> {
  if (raw === null) return { value: schema.fallback, status: "empty" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { value: schema.fallback, status: "corrupt" };
  }
  const [v, data] = isEnvelope(parsed) ? [parsed.v, parsed.data] : [0, parsed];
  if (v > schema.version) return { value: schema.fallback, status: "future" };

  let migrated = data;
  try {
    for (let n = v; n < schema.version; n++) migrated = schema.migrations[n](migrated);
  } catch {
    return { value: schema.fallback, status: "corrupt" };
  }
  const value = schema.validate(migrated);
  if (value === null) return { value: schema.fallback, status: "corrupt" };
  return { value, status: v === schema.version ? "current" : "migrated" };
}

export function encode<T>(value: T, schema: StoreSchema<T>): string {
  return JSON.stringify({ v: schema.version, data: value });
}

/** Version 0 → 1 for stores whose data didn't change shape when envelopes arrived. */
export const wrapUnchanged = (data: unknown) => data;

export { isPlainObject };
