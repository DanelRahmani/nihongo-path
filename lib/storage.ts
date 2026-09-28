"use client";

import { useSyncExternalStore } from "react";

/** localStorage can be missing or throw (private mode, blocked storage) — never let that break the page. */
function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (fallback && typeof fallback === "object" && !Array.isArray(fallback)) {
      return { ...fallback, ...parsed };
    }
    return parsed as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
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

export function createPersistentStore<T>(key: string, fallback: T): PersistentStore<T> {
  let cache: T | undefined;
  const listeners = new Set<() => void>();
  const read = () => (cache ??= load(key, fallback));

  return {
    get: read,
    getServer: () => fallback,
    set(next) {
      cache = typeof next === "function" ? (next as (prev: T) => T)(read()) : next;
      save(key, cache);
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
