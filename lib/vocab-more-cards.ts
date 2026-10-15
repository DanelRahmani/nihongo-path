import { readFileSync } from "node:fs";
import { join } from "node:path";
import { WORDS } from "@/content/words";
import { EXPANSION_WORDS } from "@/content/words/expansion";
import { plainOf } from "@/lib/markup";
import { englishOnly, POS, POS_NAMES } from "@/lib/vocab-cards";
import { MORE_GROUP_SIZE, type VocabCard } from "@/lib/vocab-deck";

/**
 * Words whose frequency the candidate list overstates (counted from suffixes and compounds: 〜者, 〜会, 〜県; ただ
 * from the adverb, not 只 "free"), moved after the first 1,000 so the deck doesn't open on them.
 */
const LATER = new Set(["者", "会", "県", "名", "世", "部", "版", "用", "生", "元", "ただ"]);
const LATER_RANK = 1000;

/** A meaning's first sense without its brackets, for matching near-synonyms: "to eat (rough)" → "to eat". */
const mainSense = (meaning: string) => meaning.split(";")[0].replace(/\s*\([^)]*\)/g, "").trim().toLowerCase();

/** Each candidate's rank in content/data/expand-candidates.json (most frequent first), by JMdict id. */
function candidateRanks(): Map<string, number> {
  const file = JSON.parse(readFileSync(join(process.cwd(), "content/data/expand-candidates.json"), "utf8")) as { candidates: { id: string }[] };
  return new Map(file.candidates.map((c, i) => [c.id, i]));
}

/**
 * The "More words" cards (I6): the dictionary expansion's words, never the lessons', made like the lesson
 * vocabulary cards (an English meaning on the front, the reviewed form or its reading typed) and ordered by
 * frequency, so new cards come most common first. Each card's id is its JMdict id (short, and kept when a meaning
 * is reworded). Words with the same English meaning accept each other, and so does a lesson word with that
 * meaning (with a note); a lesson word with the same main sense but a different bracket (食べる for 食う "to eat
 * (rough)") is named but not counted. Groups of 50 by rank, with LATER's words moved down. Build time only:
 * /vocab-more.json serves it.
 */
export function vocabMoreCards(): VocabCard[] {
  const rank = candidateRanks();
  const words = EXPANSION_WORDS.filter((w) => w.jmdict && POS.includes(w.pos))
    .map((w, i) => {
      const r = rank.get(w.jmdict!) ?? Infinity;
      return { w, i, r: LATER.has(plainOf(w.jp, false)) ? Math.max(r, LATER_RANK) + 0.5 : r };
    })
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .map(({ w }) => w);
  const cards: VocabCard[] = [];
  for (const w of words) {
    const meaning = englishOnly(w.meaning);
    if (!meaning) continue;
    const group = String(Math.floor(cards.length / MORE_GROUP_SIZE) + 1);
    cards.push({ id: w.jmdict!, jp: w.jp, meaning, pos: POS_NAMES[w.pos] ?? "", also: [], spellings: [], lessons: [], group });
  }
  const byMeaning = new Map<string, string[]>();
  for (const c of cards) byMeaning.set(c.meaning, [...(byMeaning.get(c.meaning) ?? []), c.jp]);
  for (const w of WORDS) {
    const m = englishOnly(w.meaning);
    if (byMeaning.has(m)) byMeaning.get(m)!.push(w.jp);
  }
  for (const c of cards) c.also = (byMeaning.get(c.meaning) ?? []).filter((jp) => jp !== c.jp && plainOf(jp, false) !== plainOf(c.jp, false));
  const lessonBySense = new Map<string, string[]>();
  for (const w of WORDS) {
    const sense = mainSense(englishOnly(w.meaning));
    if (sense) lessonBySense.set(sense, [...(lessonBySense.get(sense) ?? []), w.jp]);
  }
  for (const c of cards) {
    const near = (lessonBySense.get(mainSense(c.meaning)) ?? []).filter((jp) => !c.also.includes(jp) && plainOf(jp, false) !== plainOf(c.jp, false));
    if (near.length) c.near = near;
  }
  return cards;
}
