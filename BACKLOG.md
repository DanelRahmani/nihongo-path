# Backlog

Things noticed while working on something else, left for later.

- **History size in localStorage** (2026-10-21, Phase 0): the answer log takes about 75 bytes an answer, so around 60,000 answers fill the usual 5 MB localStorage quota together with the other stores; writes then fail silently (`lib/storage.ts`). Before that matters, move `np:history` to IndexedDB, or warn on `/data` as it nears the quota.
- **Two clocks for "today"** (Phase 0): the Today card's days (`lib/today.ts dayKey`) use the browser's zone at answer time, the export's history days use the zone at export time. They differ only for answers given while travelling.
