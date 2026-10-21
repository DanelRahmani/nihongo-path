/**
 * The progress export (Phase 0): the backup file (lib/backup.ts) plus a self-describing view of lessons, items,
 * days, placement checks and a summary, for analysis outside the app. Import still reads only `stores`. Pure: the
 * caller passes the stores, the lessons, a way to describe each item, the time and the time zone.
 * docs/EXPORT_FORMAT.md documents every field; bump BACKUP_VERSION whenever the shape changes.
 */
import { BACKUP_VERSION, makeBackupObject } from "@/lib/backup";
import { csvField } from "@/lib/dictionary";
import { CASUAL_DECK_ID, CLOZE_DECK_ID, CONJUGATION_DECK, POLITE_DECK_ID, QUIZ_DECK, VOCAB_DECK_ID, VOCAB_MORE_DECK_ID } from "@/lib/notebook";
import type { Review, StoreValues } from "@/lib/schemas";
import { type CardState, UNLOCK_BOX } from "@/lib/srs";
import { streak } from "@/lib/today";

export const DRILLS = ["kana", "kanji", "vocabulary", "cloze", "register", "conjugation", "quiz", "type"] as const;
export type Drill = (typeof DRILLS)[number] | "other";

/** The drill a deck belongs to. */
export function drillOf(deck: string): Drill {
  if (deck.startsWith("hiragana") || deck.startsWith("katakana")) return "kana";
  if (deck.startsWith("kanji")) return "kanji";
  if (deck === VOCAB_DECK_ID || deck === VOCAB_MORE_DECK_ID) return "vocabulary";
  if (deck === CLOZE_DECK_ID) return "cloze";
  if (deck === CASUAL_DECK_ID || deck === POLITE_DECK_ID) return "register";
  if (deck === CONJUGATION_DECK) return "conjugation";
  if (deck === QUIZ_DECK) return "quiz";
  if (deck === "type") return "type";
  return "other";
}

/** A lesson as the export lists it. */
export interface ExportLesson {
  id: string;
  slug: string;
  stage: { index: number; slug: string; title: string };
  title: string;
  jlptLevel: string | null;
}

/** What the app can say about an item: plain-text prompt and answer, its deck's title and its lesson. */
export interface ItemText {
  deckTitle: string;
  prompt: string;
  expected: string;
  lessonId: string | null;
}

const RESULT = { c: "correct", x: "incorrect" } as const;
const MODE = { p: "practice", r: "review", x: "retry" } as const;

export interface ExportedReview {
  at: string;
  result: (typeof RESULT)[keyof typeof RESULT];
  answerGiven: string;
  responseMs: number | null;
  mode: "scheduled" | (typeof MODE)[keyof typeof MODE];
}

export interface ExportedItem {
  id: string;
  deck: string;
  deckTitle: string | null;
  card: string;
  drill: Drill;
  lessonId: string | null;
  grammarPointId: null;
  prompt: string | null;
  expected: string | null;
  jlptLevel: string | null;
  status: "learning" | "learned" | "unscheduled";
  scheduler: (CardState & { kind: "leitner-5"; dueAt: string }) | null;
  notebook: { misses: number; rightInRow: number; addedAt: string; lastMissAt: string } | null;
  reps: number;
  lapses: number;
  firstSeenAt: string | null;
  lastReviewedAt: string | null;
  history: ExportedReview[];
}

export interface DailyRow {
  date: string;
  /** Answers counted towards the daily goal (from the Today card's record; covers days before the history). */
  answered: number;
  goal: number | null;
  goalMet: boolean | null;
  /** From the answer history: null on days before it began. */
  correct: number | null;
  incorrect: number | null;
  newItems: number | null;
  minutes: null;
}

export interface Accuracy {
  answers: number;
  correct: number;
  accuracy: number | null;
}

export interface ExportInput {
  stores: StoreValues;
  /** The raw store values, as backup.ts writes them (stores from a newer build are kept as they are). */
  read: (key: string) => string | null;
  lessons: ExportLesson[];
  describe: (deck: string, card: string) => ItemText | null;
  now: number;
  timeZone: string;
  appVersion: string;
}

const DAY = 86_400_000;
const iso = (t: number) => new Date(t).toISOString();

/**
 * The local calendar date of a time, "YYYY-MM-DD", in a time zone. Answers come in sessions, so results are cached
 * per quarter hour (every UTC offset is a multiple of 15 minutes): thousands of answers need few Intl calls.
 */
export function localDayFormatter(timeZone: string): (t: number) => string {
  const format = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" });
  const cache = new Map<number, string>();
  return (t) => {
    const slot = Math.floor(t / 900_000);
    let day = cache.get(slot);
    if (day === undefined) {
      const parts = Object.fromEntries(format.formatToParts(t).map((p) => [p.type, p.value]));
      day = `${parts.year}-${parts.month}-${parts.day}`;
      cache.set(slot, day);
    }
    return day;
  };
}

/** An ISO time with the zone's offset, e.g. "2026-11-07T09:30:00+01:00". */
export function isoWithOffset(t: number, timeZone: string): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(t)
      .map((p) => [p.type, p.value]),
  );
  const local = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
  const offset = Math.round((Date.parse(`${local}Z`) - Math.floor(t / 1000) * 1000) / 60_000);
  if (offset === 0) return `${local}Z`;
  const abs = Math.abs(offset);
  return `${local}${offset < 0 ? "-" : "+"}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
}

const dayNumber = (date: string) => Date.parse(`${date}T00:00:00Z`) / DAY;

/** The longest run of consecutive dates in a sorted list of "YYYY-MM-DD". */
function longestRun(days: string[]): number {
  let longest = 0;
  let run = 0;
  let prev = NaN;
  for (const d of days) {
    const n = dayNumber(d);
    run = n === prev + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = n;
  }
  return longest;
}

function accuracy(reviews: Review[], since: number): Accuracy {
  let answers = 0;
  let correct = 0;
  for (const r of reviews) {
    if (r.t < since) continue;
    answers++;
    if (r.r === "c") correct++;
  }
  return { answers, correct, accuracy: answers ? Math.round((correct / answers) * 1000) / 1000 : null };
}

export function buildExport({ stores, read, lessons, describe, now, timeZone, appVersion }: ExportInput) {
  const history = stores["np:history"];
  const decks = stores["np:srs"].decks;
  const notebook = stores["np:notebook"];
  const progress = stores["np:progress"];
  const log = stores["np:lessons-log"];
  const activity = stores["np:activity"];
  const localDay = localDayFormatter(timeZone);
  const today = localDay(now);

  // One pass over the history: answers per item, and per day.
  const byItem = new Map<string, Review[]>();
  const days = new Map<string, { correct: number; incorrect: number; newItems: number }>();
  for (const r of history) {
    const id = `${r.k}|${r.c}`;
    let list = byItem.get(id);
    if (!list) byItem.set(id, (list = []));
    list.push(r);
    const date = localDay(r.t);
    let day = days.get(date);
    if (!day) days.set(date, (day = { correct: 0, incorrect: 0, newItems: 0 }));
    if (r.r === "c") day.correct++;
    else day.incorrect++;
  }

  const cardOf = (deck: string, card: string): CardState | undefined => decks[deck]?.cards[card];
  // An item is new on the day of its first answer, unless its schedule counts more answers than the history holds
  // (it was studied before recording began).
  for (const reviews of byItem.values()) {
    const r0 = reviews[0];
    const card = cardOf(r0.k, r0.c);
    if (card && card.reps > reviews.filter((r) => r.m !== "p").length) continue;
    days.get(localDay(r0.t))!.newItems++;
  }

  const ids = new Set<string>();
  for (const [deck, state] of Object.entries(decks)) for (const card of Object.keys(state.cards)) ids.add(`${deck}|${card}`);
  for (const item of Object.values(notebook)) ids.add(`${item.deck}|${item.card}`);
  for (const id of byItem.keys()) ids.add(id);

  const items = [...ids].map((id): ExportedItem => {
    const at = id.indexOf("|");
    const deck = id.slice(0, at);
    const card = id.slice(at + 1);
    const reviews = byItem.get(id) ?? [];
    const text = describe(deck, card);
    const sched = cardOf(deck, card);
    const note = notebook[id];
    return {
      id,
      deck,
      deckTitle: text?.deckTitle ?? null,
      card,
      drill: drillOf(deck),
      lessonId: text?.lessonId ?? null,
      grammarPointId: null,
      prompt: text?.prompt ?? null,
      expected: text?.expected ?? null,
      jlptLevel: null,
      status: sched ? (sched.box >= UNLOCK_BOX ? "learned" : "learning") : "unscheduled",
      scheduler: sched ? { kind: "leitner-5", ...sched, dueAt: iso(sched.due) } : null,
      notebook: note ? { misses: note.misses, rightInRow: note.rightInRow, addedAt: iso(note.added), lastMissAt: iso(note.lastMiss) } : null,
      reps: sched ? sched.reps : reviews.length,
      lapses: sched ? sched.lapses : reviews.filter((r) => r.r === "x").length,
      firstSeenAt: reviews.length ? iso(reviews[0].t) : null,
      lastReviewedAt: reviews.length ? iso(reviews[reviews.length - 1].t) : null,
      history: reviews.map((r) => ({
        at: iso(r.t),
        result: RESULT[r.r],
        answerGiven: r.a,
        responseMs: r.ms ?? null,
        mode: r.m ? MODE[r.m] : "scheduled",
      })),
    };
  });

  const answeredLessons = new Set(items.filter((i) => i.drill === "quiz" && i.history.length).map((i) => i.lessonId));
  const exportedLessons = lessons.map((l) => {
    const entry = log[l.id] ?? {};
    const done = Boolean(progress[l.id]);
    return {
      ...l,
      status: done ? "completed" : entry.firstOpenedAt !== undefined || answeredLessons.has(l.id) ? "in progress" : "not started",
      firstOpenedAt: entry.firstOpenedAt === undefined ? null : iso(entry.firstOpenedAt),
      completedAt: done && entry.completedAt !== undefined ? iso(entry.completedAt) : null,
      completedBy: !done ? null : entry.completedAt === undefined ? "unknown" : entry.placed ? "placement" : "lesson",
    };
  });

  const dates = [...new Set([...Object.keys(activity.days), ...days.keys()])].sort();
  const dailyRows = dates.map((date): DailyRow => {
    const a = activity.days[date];
    const h = days.get(date);
    return {
      date,
      answered: a?.answered ?? 0,
      goal: a?.goal ?? null,
      goalMet: a ? a.answered >= a.goal : null,
      correct: h?.correct ?? null,
      incorrect: h?.incorrect ?? null,
      newItems: h?.newItems ?? null,
      minutes: null,
    };
  });
  const metDays = dailyRows.filter((d) => d.goalMet).map((d) => d.date);

  const itemsByDrill: Record<string, Record<string, number>> = {};
  for (const item of items) {
    const counts = (itemsByDrill[item.drill] ??= {});
    counts[item.status] = (counts[item.status] ?? 0) + 1;
  }
  const tally = (key: (l: (typeof exportedLessons)[number]) => string) => {
    const out: Record<string, { completed: number; total: number }> = {};
    for (const l of exportedLessons) {
      const t = (out[key(l)] ??= { completed: 0, total: 0 });
      t.total++;
      if (l.status === "completed") t.completed++;
    }
    return out;
  };
  const dueByDeck: Record<string, number> = {};
  for (const [deck, state] of Object.entries(decks)) {
    const n = Object.values(state.cards).filter((c) => c.due <= now).length;
    if (n) dueByDeck[deck] = n;
  }

  const backup = makeBackupObject(read, new Date(now));
  return {
    app: backup.app,
    backup: backup.backup,
    exported: backup.exported,
    meta: {
      schemaVersion: BACKUP_VERSION,
      appVersion,
      exportedAt: isoWithOffset(now, timeZone),
      timeZone,
      counts: {
        lessons: exportedLessons.length,
        lessonsCompleted: exportedLessons.filter((l) => l.status === "completed").length,
        items: items.length,
        reviews: history.length,
        studyDays: dailyRows.length,
        placementChecks: stores["np:placement"].length,
      },
    },
    settings: {
      dailyGoal: activity.goal,
      newCardCap: stores["np:study"].newPerDay,
      moreWords: stores["np:study"].moreWords,
      display: stores["np:settings"],
    },
    lessons: exportedLessons,
    items,
    daily: {
      days: dailyRows,
      currentStreak: streak(activity, today),
      longestStreak: Math.max(longestRun(metDays), activity.before?.length ?? 0),
    },
    placement: stores["np:placement"].map((p) => ({
      at: iso(p.at),
      startUnit: p.start,
      asked: p.answers.length,
      correct: p.answers.filter((a) => a.correct).length,
      answers: p.answers,
    })),
    summary: {
      itemsByDrill,
      accuracy: {
        last7Days: accuracy(history, now - 7 * DAY),
        last30Days: accuracy(history, now - 30 * DAY),
        last90Days: accuracy(history, now - 90 * DAY),
      },
      dueNow: Object.values(dueByDeck).reduce((a, b) => a + b, 0),
      dueByDeck,
      notebookItems: Object.keys(notebook).length,
      lessonsByStage: tally((l) => l.stage.slug),
      lessonsByJlptLevel: tally((l) => l.jlptLevel ?? "unknown"),
    },
    stores: backup.stores,
  };
}

export type ProgressExport = ReturnType<typeof buildExport>;

/** Written as a code point: a literal U+FEFF is invisible, and editors strip it. */
const BOM = String.fromCharCode(0xfeff);

/** One row per item, for a spreadsheet: UTF-8 with a byte order mark and CRLF, like the dictionary's CSV. */
export function exportCsv(file: ProgressExport): string {
  const rows = [
    ["id", "drill", "deck", "lesson", "jlptLevel", "prompt", "expected", "reps", "lapses", "lastResult", "lastReviewed", "due"],
    ...file.items.map((i) => [
      i.id,
      i.drill,
      i.deck,
      i.lessonId ?? "",
      i.jlptLevel ?? "",
      i.prompt ?? "",
      i.expected ?? "",
      String(i.reps),
      String(i.lapses),
      i.history.at(-1)?.result ?? "",
      i.lastReviewedAt ?? "",
      i.scheduler?.dueAt ?? "",
    ]),
  ];
  return BOM + rows.map((r) => r.map(csvField).join(",")).join("\r\n") + "\r\n";
}

/** "nihongo-path-export-2026-11-07.json", dated in the reader's time zone. */
export function exportFileName(now: number, timeZone: string, ext: "json" | "csv" = "json"): string {
  return `nihongo-path-export-${localDayFormatter(timeZone)(now)}.${ext}`;
}
