"use client";

import { useSyncExternalStore } from "react";
import { decode, encode, type StoreSchema } from "@/lib/envelope";

/** localStorage can be missing or throw (private mode, blocked storage) — never let that break the page. */
function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, raw: string) {
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    // Storage unavailable: progress lives only for this page view.
  }
}

export interface PersistentStore<T> {
  get: () => T;
  getServer: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
}

export function createPersistentStore<T>(key: string, schema: StoreSchema<T>): PersistentStore<T> {
  let cache: T | undefined;
  /** False when a newer build wrote this key: keep its data rather than overwrite it with ours. */
  let writable = true;
  const listeners = new Set<() => void>();
  const read = () => {
    if (cache === undefined) {
      const { value, status } = decode(readRaw(key), schema);
      writable = status !== "future";
      cache = value;
    }
    return cache;
  };

  return {
    get: read,
    getServer: () => schema.fallback,
    set(next) {
      cache = typeof next === "function" ? (next as (prev: T) => T)(read()) : next;
      if (writable) writeRaw(key, encode(cache, schema));
      listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) {
          cache = undefined;
          listener();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
      };
    },
  };
}

export function useStore<T>(store: PersistentStore<T>) {
  const value = useSyncExternalStore(store.subscribe, store.get, store.getServer);
  return [value, store.set] as const;
}
