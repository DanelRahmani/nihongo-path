import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { WordTopic } from "@/content/types";
import { NAMES, WORDS } from "@/content/words";
import { EXPANSION_WORDS } from "@/content/words/expansion";
import { EXTRA_WORDS } from "@/content/words/extra";
import { conjugateAdjective, conjugateVerb } from "@/lib/conjugate";
import { isJoyo, joyoReadingOk } from "@/lib/joyo";
import { plainOf, readingOf } from "@/lib/markup";

const TOPICS: WordTopic[] = ["people", "food", "places", "time", "school-work", "home", "nature", "body", "travel", "shopping", "hobbies", "feelings", "language", "everyday", "greetings", "numbers"];
const CANDIDATES = new Map(
  (JSON.parse(readFileSync("content/data/expand-candidates.json", "utf8")).candidates as { id: string; jp: string; pos: string; verb?: string }[]).map((c) => [c.id, c]),
);

/** The checker every expansion batch passes (plan G2): each word as STYLE §5 writes it, once, with a usable entry. */
describe("the dictionary expansion", () => {
  it("writes each word from its candidate, kanji and readings 常用, readings in hiragana", () => {
    for (const w of EXPANSION_WORDS) {
      const c = CANDIDATES.get(w.jmdict ?? "");
      expect(c, `${w.jp}: no candidate ${w.jmdict}`).toBeDefined();
      expect(w.jp, `${w.jp}: written as the candidate list gives it`).toBe(c?.jp);
      for (const [, base, reading] of w.jp.matchAll(/\[([^|\]]+)\|([^\]]+)\]/g)) {
        expect([...base].every((c, i) => (c === "々" ? i > 0 : isJoyo(c))), w.jp).toBe(true);
        expect(joyoReadingOk(base, reading), w.jp).toBe(true);
        expect(reading, w.jp).toMatch(/^[ぁ-ゖー]+$/);
      }
      expect(plainOf(w.jp, false), w.jp).toMatch(/^[ぁ-ゖァ-ヺー\p{Script=Han}々]+$/u);
    }
  });

  it("adds no word twice, and none the lessons, the kanji examples or the names already have", () => {
    const key = (jp: string) => `${plainOf(jp, false)}|${readingOf(jp, false)}`;
    const existing = new Set([...WORDS, ...EXTRA_WORDS].map((w) => key(w.jp)));
    const names = new Set(NAMES.map((n) => plainOf(n, false)));
    const seen = new Set<string>();
    for (const w of EXPANSION_WORDS) {
      expect(existing.has(key(w.jp)), `${w.jp} is already a dictionary word`).toBe(false);
      expect(names.has(plainOf(w.jp, false)), w.jp).toBe(false);
      expect(seen.has(key(w.jp)), `${w.jp} twice`).toBe(false);
      seen.add(key(w.jp));
    }
  });

  it("gives each word a short English meaning, a topic from the list, and verbs a class the engine conjugates", () => {
    for (const w of EXPANSION_WORDS) {
      expect(TOPICS, w.jp).toContain(w.topic);
      expect(w.meaning.trim(), w.jp).not.toBe("");
      expect(w.meaning.length, `${w.jp}: ${w.meaning}`).toBeLessThanOrEqual(60);
      expect(w.meaning.replace(/する/g, ""), `${w.jp}: English only (and する)`).not.toMatch(/[぀-ヿ一-鿿]/);
      if (w.pos === "verb") {
        expect(w.verb, w.jp).toBe(CANDIDATES.get(w.jmdict ?? "")?.verb);
        expect(w.meaning, `${w.jp}: a verb's meaning starts with "to"`).toMatch(/^to /);
        expect(conjugateVerb(w.jp, w.verb!, "polite").ok, w.jp).toBe(true);
      }
      if (w.pos === "i-adj" || w.pos === "na-adj") expect(conjugateAdjective(w.jp, w.pos === "i-adj" ? "i" : "na", "politeNeg").ok, w.jp).toBe(true);
    }
  });
});
