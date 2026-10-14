/**
 * The home page's Today card: the daily goal and its streak, the word of the day and today's date in the
 * Japanese calendar. Days are the reader's local calendar days, written YYYY-MM-DD. Pure, so all of it is tested
 * at fixed dates.
 */

/** Answers a day: the reader picks one. */
export const GOALS = [5, 10, 20] as const;
export type Goal = (typeof GOALS)[number];

export interface Activity {
  goal: Goal;
  /** Answers given each day, with the goal that applied that day: changing the goal doesn't rewrite the past. */
  days: Record<string, { answered: number; goal: number }>;
  /** The streak that ended on `day`, the newest met day dropped from `days`, so a streak outlives the history. */
  before?: { day: string; length: number };
}

export const EMPTY_ACTIVITY: Activity = { goal: 10, days: {} };

/** How many days of history are kept; older days are folded into `before`. */
export const KEEP_DAYS = 400;

const pad = (n: number) => String(n).padStart(2, "0");

/** The local calendar day of a moment: 2026-10-14. */
export function dayKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Days since 1970-01-01 for a day key, so days can be counted and stepped without time zones. */
export function dayNumber(key: string): number {
  const [y, m, d] = key.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86_400_000);
}

/** The day key `n` days after `key` (before, when n is negative). */
export function addDays(key: string, n: number): string {
  const date = new Date((dayNumber(key) + n) * 86_400_000);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** True for a real calendar day written YYYY-MM-DD (not 2026-02-30). */
export const isDayKey = (key: string) => /^\d{4}-\d{2}-\d{2}$/.test(key) && addDays(key, 0) === key;

const met = (activity: Activity, key: string) => {
  const day = activity.days[key];
  return day !== undefined && day.answered >= day.goal;
};

/**
 * Drops days older than KEEP_DAYS, oldest first, folding each met one into `before`: a met day right after the
 * last folded one lengthens that streak, any other starts a new one.
 */
function prune(activity: Activity, today: string): Activity {
  const oldest = dayNumber(today) - KEEP_DAYS;
  const old = Object.keys(activity.days).filter((key) => dayNumber(key) <= oldest).sort();
  if (!old.length) return activity;
  const days = { ...activity.days };
  let before = activity.before;
  for (const key of old) {
    if (met(activity, key)) before = { day: key, length: before?.day === addDays(key, -1) ? before.length + 1 : 1 };
    delete days[key];
  }
  return { ...activity, days, ...(before ? { before } : {}) };
}

/** One more answer today, counted against today's goal (the current goal on a new day). */
export function recordAnswer(activity: Activity, today: string): Activity {
  const pruned = prune(activity, today);
  const day = pruned.days[today];
  return { ...pruned, days: { ...pruned.days, [today]: { answered: (day?.answered ?? 0) + 1, goal: day?.goal ?? pruned.goal } } };
}

/**
 * A new goal applies from today, today's answers included, except a higher goal once today's is met: that one
 * starts tomorrow, so raising the bar doesn't take back a day already done.
 */
export function setGoal(activity: Activity, goal: Goal, today: string): Activity {
  const day = activity.days[today];
  if (!day || (met(activity, today) && goal > day.goal)) return { ...activity, goal };
  return { ...activity, goal, days: { ...activity.days, [today]: { ...day, goal } } };
}

/** Today's answers and the goal they count against; `next` is the goal from tomorrow when it differs. */
export function todayProgress(activity: Activity, today: string): { answered: number; goal: number; met: boolean; next: number | null } {
  const answered = activity.days[today]?.answered ?? 0;
  const goal = activity.days[today]?.goal ?? activity.goal;
  return { answered, goal, met: answered >= goal, next: goal === activity.goal ? null : activity.goal };
}

/**
 * Days in a row the goal was met, up to today. A streak isn't broken until a whole day passes without the goal:
 * before today's goal is met, it counts up to yesterday. A streak that runs back past the kept history goes on
 * into `before`.
 */
export function streak(activity: Activity, today: string): number {
  let day = met(activity, today) ? today : addDays(today, -1);
  let n = 0;
  while (met(activity, day)) {
    n++;
    day = addDays(day, -1);
  }
  return activity.before?.day === day ? n + activity.before.length : n;
}

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/**
 * The stride for the word of the day: the number nearest 0.618 × n that shares no factor with n, so stepping by
 * it visits every word once in n days, and neighbouring days land far apart in the list.
 */
export function stride(n: number): number {
  if (n <= 2) return 1;
  const start = Math.round(n * 0.618);
  for (let d = 0; d < n; d++) {
    for (const s of [start - d, start + d]) if (s > 0 && s < n && gcd(s, n) === 1) return s;
  }
  return 1;
}

/** Which of `n` words is the word of the day: day × stride mod n. */
export function wordOfTheDay(today: string, n: number): number {
  return n > 0 ? (((dayNumber(today) * stride(n)) % n) + n) % n : 0;
}

/** Era names the app can read aloud. A future era falls back to the date without readings. */
const ERA_READINGS: Record<string, string> = { 令和: "れいわ", 平成: "へいせい" };

const DIGITS = ["", "いち", "に", "さん", "よん", "ご", "ろく", "なな", "はち", "きゅう"];

/** Years of an era: 4 よねん, 7 ななねん, 9 きゅうねん; the first year is 元年 がんねん. */
function yearReading(year: number): string {
  if (year === 1) return "がんねん";
  const tens = Math.floor(year / 10);
  const ones = year % 10;
  const tensReading = tens === 0 ? "" : tens === 1 ? "じゅう" : `${DIGITS[tens]}じゅう`;
  return `${tensReading}${ones === 4 ? "よ" : DIGITS[ones]}ねん`;
}

const MONTHS = ["", "いちがつ", "にがつ", "さんがつ", "しがつ", "ごがつ", "ろくがつ", "しちがつ", "はちがつ", "くがつ", "じゅうがつ", "じゅういちがつ", "じゅうにがつ"];

/** Days of the month: the native readings for 1–10, 14, 20 and 24, にち otherwise. */
const DAYS = [
  "",
  "ついたち",
  "ふつか",
  "みっか",
  "よっか",
  "いつか",
  "むいか",
  "なのか",
  "ようか",
  "ここのか",
  "とおか",
  "じゅういちにち",
  "じゅうににち",
  "じゅうさんにち",
  "じゅうよっか",
  "じゅうごにち",
  "じゅうろくにち",
  "じゅうしちにち",
  "じゅうはちにち",
  "じゅうくにち",
  "はつか",
  "にじゅういちにち",
  "にじゅうににち",
  "にじゅうさんにち",
  "にじゅうよっか",
  "にじゅうごにち",
  "にじゅうろくにち",
  "にじゅうしちにち",
  "にじゅうはちにち",
  "にじゅうくにち",
  "さんじゅうにち",
  "さんじゅういちにち",
];

const WEEKDAYS: Record<string, string> = { 月: "げつ", 火: "か", 水: "すい", 木: "もく", 金: "きん", 土: "ど", 日: "にち" };

/**
 * Today in the Japanese calendar, as lesson markup with readings: [令和|れいわ] [8年|はちねん] [10月|じゅうがつ]
 * [14日|じゅうよっか] [水曜日|すいようび]. Numbers are digits with one ruby group over number and counter, as in
 * the reading view (STYLE §8). The era comes from Intl's Japanese calendar. Null for an era the app can't read
 * (a future one, or a clock set far back), rather than kanji without readings.
 */
export function japaneseDate(date: Date, timeZone?: string): string | null {
  const parts = new Intl.DateTimeFormat("ja-JP-u-ca-japanese", { era: "long", year: "numeric", month: "numeric", day: "numeric", weekday: "long", timeZone })
    .formatToParts(date)
    .reduce<Record<string, string>>((all, p) => ({ ...all, [p.type]: p.value }), {});
  // Intl writes the first year of an era as 元 (some engines may write 1).
  const year = parts.year === "元" ? 1 : Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const weekday = parts.weekday?.charAt(0) ?? "";
  const era = ERA_READINGS[parts.era];
  if (!era || !year || !MONTHS[month] || !DAYS[day] || !WEEKDAYS[weekday]) return null;
  return [
    `[${parts.era}|${era}]`,
    `[${year === 1 ? "元" : year}年|${yearReading(year)}]`,
    `[${month}月|${MONTHS[month]}]`,
    `[${day}日|${DAYS[day]}]`,
    `[${weekday}曜日|${WEEKDAYS[weekday]}ようび]`,
  ].join(" ");
}

/** Today in English: Wednesday 14 October 2026. */
export function englishDate(date: Date, timeZone?: string): string {
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone }).format(date).replace(",", "");
}
