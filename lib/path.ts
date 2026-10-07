/** Which unit tab the path shows, and keyboard movement between tabs. Pure. */

export interface UnitLessons {
  slug: string;
  lessons: { key: string }[];
}

/** The unit holding the first unfinished lesson in path order; the first unit once everything is done. */
export function currentUnit(units: UnitLessons[], done: Record<string, true>): string {
  return (units.find((u) => u.lessons.some((l) => !done[l.key])) ?? units[0]).slug;
}

/** The tab the reader last chose, if that unit still exists; otherwise the current unit. */
export function selectedUnit(units: UnitLessons[], chosen: string | null, done: Record<string, true>): string {
  return chosen !== null && units.some((u) => u.slug === chosen) ? chosen : currentUnit(units, done);
}

/** Tab index after a key press in a tab list (arrows wrap, Home and End jump); null for any other key. */
export function tabIndexAfterKey(index: number, key: string, count: number): number | null {
  switch (key) {
    case "ArrowRight":
      return (index + 1) % count;
    case "ArrowLeft":
      return (index - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
