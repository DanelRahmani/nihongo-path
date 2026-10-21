/** The lessons log's update rules (Phase 0). Pure, so the export and the merge share them. */
import type { LessonsLog } from "@/lib/schemas";

/** The first time a lesson is opened; later visits change nothing. */
export function markOpened(log: LessonsLog, key: string, now: number): LessonsLog {
  if (log[key]?.firstOpenedAt !== undefined) return log;
  return { ...log, [key]: { ...log[key], firstOpenedAt: now } };
}

/**
 * Lessons marked done (with the time, and `placed` when the placement check marked them) or not done (time
 * cleared).
 */
export function markCompleted(log: LessonsLog, keys: string[], done: boolean, now: number, placed = false): LessonsLog {
  const next = { ...log };
  for (const key of keys) {
    const entry = { ...next[key] };
    delete entry.completedAt;
    delete entry.placed;
    next[key] = done ? { ...entry, completedAt: now, ...(placed ? { placed: true as const } : {}) } : entry;
  }
  return next;
}
