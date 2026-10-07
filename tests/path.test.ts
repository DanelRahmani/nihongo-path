import { describe, expect, it } from "vitest";
import { currentUnit, selectedUnit, tabIndexAfterKey } from "@/lib/path";

const UNITS = [
  { slug: "start", lessons: [{ key: "start/a" }, { key: "start/b" }] },
  { slug: "hiragana", lessons: [{ key: "hiragana/a" }] },
  { slug: "particles", lessons: [{ key: "particles/a" }, { key: "particles/b" }] },
];

describe("currentUnit", () => {
  it("is the first unit for a new learner", () => {
    expect(currentUnit(UNITS, {})).toBe("start");
  });

  it("is the unit of the first unfinished lesson", () => {
    expect(currentUnit(UNITS, { "start/a": true, "start/b": true })).toBe("hiragana");
  });

  it("counts a lesson skipped earlier on the path", () => {
    expect(currentUnit(UNITS, { "start/b": true, "hiragana/a": true })).toBe("start");
  });

  it("goes back to the first unit when everything is done", () => {
    const all = Object.fromEntries(UNITS.flatMap((u) => u.lessons.map((l) => [l.key, true as const])));
    expect(currentUnit(UNITS, all)).toBe("start");
  });
});

describe("selectedUnit", () => {
  it("keeps the tab the reader chose", () => {
    expect(selectedUnit(UNITS, "particles", {})).toBe("particles");
  });

  it("follows progress when nothing was chosen", () => {
    expect(selectedUnit(UNITS, null, { "start/a": true, "start/b": true })).toBe("hiragana");
  });

  it("ignores a chosen unit that no longer exists", () => {
    expect(selectedUnit(UNITS, "astrology", {})).toBe("start");
  });
});

describe("tabIndexAfterKey", () => {
  it("moves with the arrows and wraps around", () => {
    expect(tabIndexAfterKey(0, "ArrowRight", 3)).toBe(1);
    expect(tabIndexAfterKey(2, "ArrowRight", 3)).toBe(0);
    expect(tabIndexAfterKey(0, "ArrowLeft", 3)).toBe(2);
  });

  it("jumps with Home and End", () => {
    expect(tabIndexAfterKey(1, "Home", 3)).toBe(0);
    expect(tabIndexAfterKey(1, "End", 3)).toBe(2);
  });

  it("ignores other keys", () => {
    expect(tabIndexAfterKey(1, "Enter", 3)).toBeNull();
  });
});
