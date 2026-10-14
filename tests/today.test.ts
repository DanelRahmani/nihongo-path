import { describe, expect, it } from "vitest";
import { decode } from "@/lib/envelope";
import { parse, readingOf } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";
import { activitySchema } from "@/lib/schemas";
import {
  type Activity,
  addDays,
  dayKey,
  dayNumber,
  EMPTY_ACTIVITY,
  englishDate,
  isDayKey,
  japaneseDate,
  KEEP_DAYS,
  recordAnswer,
  setGoal,
  streak,
  stride,
  todayProgress,
  wordOfTheDay,
} from "@/lib/today";

const TODAY = "2026-10-14";
/** An activity with these days' answers, each against a goal of 5. */
const withDays = (days: Record<string, number>, goal: Activity["goal"] = 5): Activity => ({
  goal,
  days: Object.fromEntries(Object.entries(days).map(([k, answered]) => [k, { answered, goal: 5 }])),
});

describe("days", () => {
  it("are local calendar days, counted without time zones", () => {
    expect(dayKey(new Date(2026, 9, 14, 23, 59))).toBe(TODAY);
    expect(dayKey(new Date(2026, 0, 5, 0, 0))).toBe("2026-01-05");
    expect(dayNumber("1970-01-02")).toBe(1);
    expect(dayNumber(TODAY) - dayNumber("2026-10-13")).toBe(1);
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(addDays("2024-03-01", -1)).toBe("2024-02-29");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });
});

describe("the daily goal", () => {
  it("counts answers per day against the goal", () => {
    let a = EMPTY_ACTIVITY;
    for (let i = 0; i < 9; i++) a = recordAnswer(a, TODAY);
    expect(todayProgress(a, TODAY)).toEqual({ answered: 9, goal: 10, met: false, next: null });
    a = recordAnswer(a, TODAY);
    expect(todayProgress(a, TODAY)).toEqual({ answered: 10, goal: 10, met: true, next: null });
    expect(todayProgress(a, addDays(TODAY, 1))).toEqual({ answered: 0, goal: 10, met: false, next: null });
  });

  it("applies a new goal from today, and leaves earlier days as they were", () => {
    const a = setGoal(withDays({ "2026-10-13": 5, [TODAY]: 3 }), 20, TODAY);
    expect(a.days["2026-10-13"].goal).toBe(5);
    expect(a.days[TODAY].goal).toBe(20);
    expect(todayProgress(a, TODAY).met).toBe(false);
    expect(setGoal(EMPTY_ACTIVITY, 5, TODAY)).toEqual({ goal: 5, days: {} });
  });

  it("drops days older than the history it keeps", () => {
    const old = addDays(TODAY, -KEEP_DAYS);
    const kept = addDays(TODAY, -KEEP_DAYS + 1);
    const a = recordAnswer(withDays({ [old]: 5, [kept]: 5 }), TODAY);
    expect(Object.keys(a.days).sort()).toEqual([kept, TODAY]);
  });

  it("starts a raised goal tomorrow once today's is met, and a lowered one at once", () => {
    const done = withDays({ [TODAY]: 6 });
    const raised = setGoal(done, 20, TODAY);
    expect(todayProgress(raised, TODAY)).toEqual({ answered: 6, goal: 5, met: true, next: 20 });
    // The next answer keeps today's goal.
    expect(todayProgress(recordAnswer(raised, TODAY), TODAY).goal).toBe(5);
    expect(todayProgress(raised, addDays(TODAY, 1)).goal).toBe(20);
    const lowered = setGoal(withDays({ [TODAY]: 6 }, 10), 5, TODAY);
    expect(todayProgress(setGoal({ goal: 10, days: { [TODAY]: { answered: 6, goal: 10 } } }, 5, TODAY), TODAY).met).toBe(true);
    expect(lowered.goal).toBe(5);
  });

  it("keeps an unmet day's goal change for today", () => {
    const a = setGoal(withDays({ [TODAY]: 2 }), 20, TODAY);
    expect(todayProgress(a, TODAY)).toEqual({ answered: 2, goal: 20, met: false, next: null });
  });
});

describe("the streak", () => {
  it("counts days in a row the goal was met, up to today", () => {
    expect(streak(withDays({ "2026-10-12": 5, "2026-10-13": 6, [TODAY]: 5 }), TODAY)).toBe(3);
    expect(streak(withDays({}), TODAY)).toBe(0);
  });

  it("isn't broken before today's goal is met", () => {
    expect(streak(withDays({ "2026-10-12": 5, "2026-10-13": 5, [TODAY]: 2 }), TODAY)).toBe(2);
    expect(streak(withDays({ "2026-10-12": 5, "2026-10-13": 5 }), TODAY)).toBe(2);
  });

  it("is broken by a day without the goal", () => {
    expect(streak(withDays({ "2026-10-11": 5, "2026-10-12": 4, "2026-10-13": 5, [TODAY]: 5 }), TODAY)).toBe(2);
    expect(streak(withDays({ "2026-10-11": 5, "2026-10-12": 5 }), TODAY)).toBe(0);
  });

  it("judges each day by the goal that applied that day", () => {
    const a: Activity = { goal: 20, days: { "2026-10-13": { answered: 5, goal: 5 }, [TODAY]: { answered: 10, goal: 20 } } };
    expect(streak(a, TODAY)).toBe(1);
  });

  it("outlives the kept history", () => {
    // Every day for 500 days, answering each day.
    let a: Activity = { goal: 5, days: {} };
    const start = addDays(TODAY, -499);
    for (let d = 0; d < 500; d++) for (let i = 0; i < 5; i++) a = recordAnswer(a, addDays(start, d));
    expect(Object.keys(a.days).length).toBe(KEEP_DAYS);
    expect(streak(a, TODAY)).toBe(500);
    // A missed day inside the folded part ends the folded run there.
    const gap: Activity = { goal: 5, days: { [TODAY]: { answered: 5, goal: 5 } }, before: { day: addDays(TODAY, -2), length: 30 } };
    expect(streak(gap, TODAY)).toBe(1);
    expect(streak({ ...gap, before: { day: addDays(TODAY, -1), length: 30 } }, TODAY)).toBe(31);
  });

  it("runs across a month and a year end", () => {
    expect(streak(withDays({ "2026-12-30": 5, "2026-12-31": 5, "2027-01-01": 5 }), "2027-01-01")).toBe(3);
  });
});

describe("the word of the day", () => {
  it.each([1, 2, 3, 10, 12, 97, 100, 547, 640])("visits all %i words once in that many days", (n) => {
    const seen = new Set<number>();
    for (let d = 0; d < n; d++) seen.add(wordOfTheDay(addDays(TODAY, d), n));
    // Days before 1970 have negative day numbers.
    for (let d = 0; d < n; d++) expect(wordOfTheDay(addDays("1960-01-01", d), n)).toBeGreaterThanOrEqual(0);
    expect(seen.size).toBe(n);
    for (const i of seen) expect(i >= 0 && i < n).toBe(true);
  });

  it("uses a stride coprime to the word count, and the same word all day", () => {
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    for (const n of [3, 10, 100, 547, 640, 1000]) expect(gcd(stride(n), n), String(n)).toBe(1);
    expect(wordOfTheDay(TODAY, 547)).toBe(wordOfTheDay(dayKey(new Date(2026, 9, 14, 23)), 547));
    expect(wordOfTheDay(TODAY, 547)).not.toBe(wordOfTheDay(addDays(TODAY, 1), 547));
    expect(wordOfTheDay(TODAY, 0)).toBe(0);
  });
});

describe("today's date", () => {
  const at = (iso: string) => new Date(`${iso}T12:00:00Z`);

  it("gives the era and readings, as reading-view markup", () => {
    expect(japaneseDate(at(TODAY), "UTC")).toBe("[令和|れいわ] [8年|はちねん] [10月|じゅうがつ] [14日|じゅうよっか] [水曜日|すいようび]");
    expect(romajiOf(japaneseDate(at(TODAY), "UTC")!)).toBe("reiwa hachinen juugatsu juuyokka suiyoubi");
    expect(englishDate(at(TODAY), "UTC")).toBe("Wednesday 14 October 2026");
  });

  it("reads the first year of an era as 元年 and the irregular months and days", () => {
    expect(japaneseDate(at("2019-05-01"), "UTC")).toBe("[令和|れいわ] [元年|がんねん] [5月|ごがつ] [1日|ついたち] [水曜日|すいようび]");
    expect(japaneseDate(at("2019-04-30"), "UTC")).toBe("[平成|へいせい] [31年|さんじゅういちねん] [4月|しがつ] [30日|さんじゅうにち] [火曜日|かようび]");
    expect(readingOf(japaneseDate(at("2022-07-20"), "UTC")!)).toBe("れいわ よねん しちがつ はつか すいようび");
    expect(readingOf(japaneseDate(at("2025-09-24"), "UTC")!)).toBe("れいわ ななねん くがつ にじゅうよっか すいようび");
    expect(readingOf(japaneseDate(at("2027-01-09"), "UTC")!)).toBe("れいわ きゅうねん いちがつ ここのか どようび");
  });

  it("is valid markup on every day of a year", () => {
    for (let d = 0; d < 366; d++) {
      const markup = japaneseDate(at(addDays("2026-01-01", d)), "UTC")!;
      expect(markup).toMatch(/^\[令和\|れいわ\] \[\d+年\|[ぁ-ゖ]+\] \[\d+月\|[ぁ-ゖ]+\] \[\d+日\|[ぁ-ゖ]+\] \[.曜日\|[ぁ-ゖ]+\]$/);
      expect(parse(markup, true).some((t) => t.kind === "text" && /\p{Script=Han}/u.test(t.text))).toBe(false);
    }
  });
});

describe("date readings, typed by hand", () => {
  // The reading of each part, from the date's markup: era, year, month, day, weekday.
  const partsOf = (iso: string) => readingOf(japaneseDate(at(iso), "UTC")!).split(" ");
  const at = (iso: string) => new Date(`${iso}T12:00:00Z`);
  const DAYS = [
    "ついたち", "ふつか", "みっか", "よっか", "いつか", "むいか", "なのか", "ようか", "ここのか", "とおか",
    "じゅういちにち", "じゅうににち", "じゅうさんにち", "じゅうよっか", "じゅうごにち", "じゅうろくにち", "じゅうしちにち", "じゅうはちにち", "じゅうくにち", "はつか",
    "にじゅういちにち", "にじゅうににち", "にじゅうさんにち", "にじゅうよっか", "にじゅうごにち", "にじゅうろくにち", "にじゅうしちにち", "にじゅうはちにち", "にじゅうくにち", "さんじゅうにち",
    "さんじゅういちにち",
  ];
  const MONTHS = ["いちがつ", "にがつ", "さんがつ", "しがつ", "ごがつ", "ろくがつ", "しちがつ", "はちがつ", "くがつ", "じゅうがつ", "じゅういちがつ", "じゅうにがつ"];
  // 令和 n年 is 2018 + n.
  const YEARS: [number, string][] = [
    [2, "にねん"], [3, "さんねん"], [4, "よねん"], [5, "ごねん"], [6, "ろくねん"], [7, "ななねん"], [8, "はちねん"], [9, "きゅうねん"], [10, "じゅうねん"],
    [11, "じゅういちねん"], [14, "じゅうよねん"], [17, "じゅうななねん"], [19, "じゅうきゅうねん"], [20, "にじゅうねん"], [24, "にじゅうよねん"], [31, "さんじゅういちねん"],
  ];
  const WEEK = ["にちようび", "げつようび", "かようび", "すいようび", "もくようび", "きんようび", "どようび"];

  it.each(DAYS.map((r, i) => [i + 1, r] as const))("day %i is %s", (day, reading) => {
    expect(partsOf(`2026-01-${String(day).padStart(2, "0")}`)[3]).toBe(reading);
  });

  it.each(MONTHS.map((r, i) => [i + 1, r] as const))("month %i is %s", (month, reading) => {
    expect(partsOf(`2026-${String(month).padStart(2, "0")}-15`)[2]).toBe(reading);
  });

  it.each(YEARS)("令和 year %i is %s", (year, reading) => {
    expect(partsOf(`${2018 + year}-06-15`)[1]).toBe(reading);
  });

  it("names the weekdays, starting from Sunday 2026-10-11", () => {
    expect(WEEK.map((_, i) => partsOf(addDays("2026-10-11", i))[4])).toEqual(WEEK);
  });

  it("gives no date for an era it can't read", () => {
    expect(japaneseDate(at("1985-06-15"), "UTC")).toBeNull();
  });
});

describe("the activity store", () => {
  it("keeps readable days and drops bad ones", () => {
    const days = { [TODAY]: { answered: 3, goal: 5 }, "14/10/2026": { answered: 1, goal: 5 }, "2026-02-30": { answered: 1, goal: 5 }, "2026-10-13": { answered: -1, goal: 5 }, "2026-10-12": "x" };
    const raw = JSON.stringify({ v: 1, data: { goal: 7, days, before: { day: "2025-01-01", length: 0 } } });
    expect(decode(raw, activitySchema).value).toEqual({ goal: 10, days: { [TODAY]: { answered: 3, goal: 5 } } });
    expect(isDayKey("2024-02-29")).toBe(true);
    expect(isDayKey("2026-02-29")).toBe(false);
  });

  it("keeps the folded streak", () => {
    const raw = JSON.stringify({ v: 1, data: { goal: 5, days: {}, before: { day: "2025-01-01", length: 40 } } });
    expect(decode(raw, activitySchema).value.before).toEqual({ day: "2025-01-01", length: 40 });
  });
});
