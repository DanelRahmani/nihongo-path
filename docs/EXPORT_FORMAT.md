# Progress export format

"Export my progress" on `/data` downloads `nihongo-path-export-YYYY-MM-DD.json` (dated in the reader's time zone). The file is built in the browser by `lib/export.ts`; nothing is uploaded. The same file is the app's backup: "Import progress" reads it back (`lib/backup.ts`, `lib/merge.ts`).

Current version: **2** (`backup` and `meta.schemaVersion`). Version 1 files (backups from before 2026-10-21) hold only `app`, `backup`, `exported` and `stores`, and still import.

## Versioning

- Any change to the file's shape bumps `BACKUP_VERSION` in `lib/backup.ts` and updates this document.
- Import reads `stores` alone. Every other section is a derived view for reading and analysis, rebuilt on each export, so older files keep importing whatever those sections become. `tests/fixtures/backup-v1.json` is a frozen version 1 file that must keep importing.
- Each store inside `stores` carries its own version and migrates on import as if read from localStorage.

## Conventions

- Times are ISO 8601 in UTC (`2026-11-07T08:30:00.000Z`), except `meta.exportedAt`, which carries the reader's offset.
- Dates (`daily.days[].date`) are local calendar dates, `YYYY-MM-DD`. The history's days use `meta.timeZone`; the daily goal's days use the browser's zone at the time of each answer (the same zone unless the reader travelled).
- `null` means "not recorded" or "not a feature yet", never zero.
- Recording of individual answers began with version 2. Before it, only each card's schedule (`reps`, `lapses`, box) and each day's answer count exist.

## Top level

| Field | Type | Meaning |
|---|---|---|
| `app` | `"nihongo-path"` | Identifies the file. Anything else is refused. |
| `backup` | integer | The file version (2). |
| `exported` | string | When the file was made (UTC). |
| `meta`, `settings`, `lessons`, `items`, `daily`, `placement`, `summary` | | The analysis view, below. |
| `stores` | object | Every localStorage store as its envelope `{v, data}`. Import restores from here. |

## `meta`

| Field | Type | Meaning |
|---|---|---|
| `schemaVersion` | integer | Same as `backup`. |
| `appVersion` | string | Commit the app was built from (7 characters), or the package version. |
| `exportedAt` | string | When the file was made, ISO with the local offset. |
| `timeZone` | string | IANA zone of the browser, e.g. `Europe/Amsterdam`. |
| `counts` | object | `lessons`, `lessonsCompleted`, `items`, `reviews` (answers in the history), `studyDays` (rows in `daily.days`), `placementChecks`. |

## `settings`

| Field | Type | Meaning |
|---|---|---|
| `dailyGoal` | integer | Answers a day the Today card aims for (5, 10 or 20). |
| `newCardCap` | integer | New cards the decks may introduce a day. |
| `moreWords` | boolean | Whether the optional "More words" deck is on. |
| `display.furigana` | `"kana" \| "all" \| "new" \| "none"` | Kana only, furigana on all kanji, on new kanji only, or none. |
| `display.romaji` | boolean | Romaji line shown. |
| `display.size` | `"s" \| "m" \| "l"` | Text size. |
| `display.font` | `"mincho" \| "gothic"` | Japanese typeface. |
| `display.theme` | `"system" \| "light" \| "dark"` | Colour theme. |

## `lessons[]`

One entry per lesson, in path order.

| Field | Type | Meaning |
|---|---|---|
| `id` | string | `unit/lesson`, e.g. `particles/wa-topic`. Stable. |
| `slug` | string | The lesson's slug. |
| `stage` | object | The unit: `index` (0 for 〇 Start here, 8 for 八 Culture), `slug`, `title`. |
| `title` | string | Lesson title. |
| `jlptLevel` | string \| null | `null` until the JLPT phases tag lessons. |
| `status` | `"not started" \| "in progress" \| "completed"` | Completed = marked done; in progress = opened or a quiz question answered. |
| `firstOpenedAt` | string \| null | First visit; `null` for visits before recording began. |
| `completedAt` | string \| null | When marked done; `null` if not done, or done before recording began. |
| `completedBy` | `"lesson" \| "placement" \| "unknown" \| null` | Marked done in the lesson, by the placement check, or before recording began; `null` if not done. |

## `items[]`

Every item that has a schedule, a notebook entry or at least one recorded answer.

| Field | Type | Meaning |
|---|---|---|
| `id` | string | `deck|card`, e.g. `hiragana-base|hiragana:し`. The notebook uses the same key. |
| `deck` | string | Deck id: `hiragana-*`, `katakana-*`, `kanji`, `vocab`, `vocab-more`, `cloze`, `to-casual`, `to-polite`, plus `quiz` (lesson quiz questions), `conjugation` (trainer questions) and `type` (Type it lines). |
| `deckTitle` | string \| null | The deck's name in the app. |
| `card` | string | The card's id in its deck. Quiz cards are `unit/lesson#hash` of the question; conjugation cards `word#form`; Type it cards the line's markup. |
| `drill` | string | `kana`, `kanji`, `vocabulary`, `cloze`, `register`, `conjugation`, `quiz`, `type`, or `other` for a deck this build doesn't know. |
| `lessonId` | string \| null | The item's lesson, where the app links one (quiz and conjugation questions). |
| `grammarPointId` | `null` | Until grammar points have ids. |
| `prompt` | string \| null | The question as plain text, with its hint in brackets. `null` if the item is no longer in the app, or the question data couldn't load. |
| `expected` | string \| null | The answer shown after a miss, as plain text (romaji where the answer is typed in romaji). The checkers also accept kana for kanji, listed alternatives and so on. |
| `jlptLevel` | string \| null | `null` for now. |
| `status` | `"learning" \| "learned" \| "unscheduled"` | Scheduled cards: learned at box ≥ 3 (the unlock rule). Quiz, conjugation and Type it items aren't scheduled. |
| `scheduler` | object \| null | The Leitner state as stored: `{kind: "leitner-5", box (1–5), due (epoch ms), reps, lapses, dueAt}`. Box waits: 0, 10 minutes, 1, 3, 7 days. |
| `notebook` | object \| null | In the mistake notebook: `{misses, rightInRow, addedAt, lastMissAt}`. It leaves after 2 right answers in a row. |
| `reps`, `lapses` | integer | Scheduled cards: the scheduler's counts (practice answers not included). Others: answers and wrong answers in the history. |
| `firstSeenAt`, `lastReviewedAt` | string \| null | First and last recorded answer. |
| `history[]` | array | Every recorded answer, oldest first: `{at, result ("correct" \| "incorrect"), answerGiven, responseMs, mode}`. `mode`: `scheduled` (a normal answer), `practice` (the drill's practice mode, not scheduled), `review` (the review queue), `retry` (a quiz question tried again). `responseMs`: from the card appearing (drills, review, Type it) or the first keystroke (quiz); `null` if not measured. Type it records each check; "correct" means exact. Placement check answers are in `placement`, not here. |

## `daily`

| Field | Type | Meaning |
|---|---|---|
| `days[]` | array | One row per date with answers: `{date, answered (counted for the goal), goal, goalMet, correct, incorrect, newItems, minutes}`. `goal` and `goalMet` are `null` where the goal record has no entry; `correct`, `incorrect` and `newItems` are `null` on days before the history began; `minutes` is always `null` (not tracked). |
| `currentStreak` | integer | Days in a row the goal was met, ending today or yesterday (the Today card's streak). |
| `longestStreak` | integer | The longest such run the records show. |

## `placement[]`

Each finished placement check, oldest first: `{at, startUnit (the unit it placed the reader at, or null when no unit stopped them), asked, correct, answers: [{unit, lesson, correct}]}`. Recorded from version 2 on.

## `summary`

| Field | Type | Meaning |
|---|---|---|
| `itemsByDrill` | object | Per drill, item counts per `status`. |
| `accuracy.last7Days`, `last30Days`, `last90Days` | `{answers, correct, accuracy}` | Every recorded answer in the window (practice, review and retries included); `accuracy` is 0–1, or `null` without answers. |
| `dueNow` | integer | Scheduled cards due at export time. |
| `dueByDeck` | object | The same, per deck. |
| `notebookItems` | integer | Items in the mistake notebook. |
| `lessonsByStage` | object | Per unit slug, `{completed, total}`. |
| `lessonsByJlptLevel` | object | Per level (`unknown` for now), `{completed, total}`. |

## `stores`

`np:settings`, `np:progress`, `np:srs`, `np:path-filter`, `np:my-words`, `np:activity`, `np:notebook`, `np:study`, `np:new-cards`, `np:history`, `np:lessons-log`, `np:placement`. Shapes and versions are in `lib/schemas.ts`. `np:history` keeps answers in short keys: `k` deck, `c` card, `t` epoch ms, `r` `c`/`x`, `a` the answer typed, `ms` time to answer, `m` `p`/`r`/`x` (practice, review, retry).

## Import

- Refused with a message: unreadable JSON, a file without `app: "nihongo-path"`, a version newer than the app, or a file with nothing usable. A store from a newer build, or a damaged one, is left out and named; the rest import.
- The page lists what each store will become, then the reader chooses:
  - **Merge**: answers joined without duplicates; each scheduled card from the side that answered it last (then the one answered more often); finished lessons, lesson times (earliest opened, latest done), saved words, notebook items (the more recently touched), daily counts (the higher) and placement checks joined. Display settings, study choices, the path tab and today's new-card count stay as they are here.
  - **Replace**: every store in the file replaces the one here.
- Stores the file doesn't hold stay as they are. The page then reloads.

## CSV summary

"Export summary (CSV)" writes one row per item: `id, drill, deck, lesson, jlptLevel, prompt, expected, reps, lapses, lastResult, lastReviewed, due` (UTF-8 with a byte order mark, CRLF).
