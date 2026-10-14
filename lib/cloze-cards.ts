import { CLOZE_ALSO, CLOZE_EXCLUSIONS } from "@/content/cloze-exclusions";
import type { Jp } from "@/content/types";
import { ALL_LESSONS } from "@/content/units";
import { NAMES, WORDS } from "@/content/words";
import { type ClozeCard, GAP } from "@/lib/cloze-deck";
import { allForms } from "@/lib/engine-forms";
import { plainOf } from "@/lib/markup";
import { quizCardId } from "@/lib/notebook";
import { lineRegister } from "@/lib/register";
import { buildIndex, resolveWord } from "@/lib/words";

/** A highlight covering more than this share of a line leaves too little to go on. */
export const MOST = 0.6;

/** A cloze card's id: the lesson and a hash of the line, as quiz questions are named. */
export const clozeId = (lesson: string, jp: Jp) => quizCardId(lesson, jp);

export interface ClozeLeftOut {
  lesson: string;
  jp: Jp;
  reason: string;
}

/** Plain text for measuring: no spaces, joins or punctuation. */
const bare = (jp: Jp) => plainOf(jp, false).replace(/[。、？！…\s-]/g, "");

/**
 * True when the gap holds the line's final predicate (only sentence-final particles and punctuation follow it),
 * so its answer carries the line's register: 飲＿＿。 (みます or む), 寒い ＿＿ ね (です or nothing).
 */
const endsLine = (line: Jp) => /^[\s]*(か|よ|ね|よね|の|な)?[\s]*[。？！…]*$/.test(plainOf(line.split(GAP)[1] ?? "", false));

/**
 * The register a line's ending carries: polite (です, ます), casual for a plain verb or adjective ending
 * (lineRegister calls a short one like 飲む neutral), and none for a line that ends in a noun or an adverb
 * ([本屋|ほんや]さん, [今日|きょう] は ちょっと…), where no other register would fit the gap.
 */
function registerOf(jp: Jp, ix: ReturnType<typeof buildIndex>): ClozeCard["register"] {
  const reg = lineRegister(jp);
  if (reg === "polite") return "polite";
  if (reg === "plain") return "casual";
  const words = unbraced(jp).replace(/[。、？！…]+$/, "").split(/\s+/).filter((w) => !/^(か|よ|ね|よね|の|な)$/.test(w));
  const r = resolveWord(words.at(-1) ?? "", ix);
  const predicate = r && "word" in r && ["verb", "i-adj", "na-adj"].includes(r.word.pos) && !(r.how === "form" && r.form === "sa");
  return predicate ? "casual" : undefined;
}

const unbraced = (jp: Jp) => jp.replace(/[{}]/g, "");

/**
 * The cloze cards, built at build time from every highlighted line of the lessons' examples (alternative register
 * lines included), pairs and dialogues, in path order. Left out by rule, with the reason:
 * - pair lines whose two sides read the same apart from the highlight: the other side fits the gap too;
 * - lines with several highlights;
 * - highlights covering most of the line;
 * - the kana lessons (single words, not sentences).
 * Left out by hand: content/cloze-exclusions.ts (`exclusions`, replaceable for tests). A gap holding the line's
 * final predicate names the register, so む and みます aren't both right. Server only: the page hands the result
 * to the deck. Never imports the reading texts or the corpus.
 */
export function clozeCards(exclusions: Record<string, string> = CLOZE_EXCLUSIONS): { cards: ClozeCard[]; leftOut: ClozeLeftOut[] } {
  const ix = buildIndex(WORDS, NAMES);
  const cards: ClozeCard[] = [];
  const leftOut: ClozeLeftOut[] = [];
  const frame = (jp: Jp) => jp.replace(/\{[^}]*\}/g, GAP);
  for (const { key, lesson } of ALL_LESSONS) {
    const lines: { jp: Jp; en: string; sameFrame?: true }[] = [];
    for (const b of lesson.blocks) {
      if (b.type === "examples") for (const e of b.items) lines.push({ jp: e.jp, en: e.en }, ...(e.alt ? [{ jp: e.alt, en: e.en }] : []));
      if (b.type === "pair") {
        const same = frame(b.a.jp) === frame(b.b.jp);
        for (const e of [b.a, b.b]) lines.push({ jp: e.jp, en: e.en, ...(same ? { sameFrame: true as const } : {}) });
      }
      if (b.type === "dialogue") for (const l of b.lines) lines.push({ jp: l.jp, en: l.en }, ...(l.alt ? [{ jp: l.alt, en: l.en }] : []));
    }
    for (const { jp, en, sameFrame } of lines) {
      const highlights = jp.match(/\{[^}]*\}/g) ?? [];
      if (!highlights.length) continue;
      const out = (reason: string) => leftOut.push({ lesson: key, jp, reason });
      if (lesson.register === "neutral") out("kana lesson");
      else if (sameFrame) out("pair line: the other side fits the same gap");
      else if (highlights.length > 1) out("several highlights");
      else {
        const highlight = highlights[0] as string;
        const answer = highlight.slice(1, -1).trim();
        const id = clozeId(key, jp);
        const line = jp.replace(highlight, GAP);
        if (bare(answer).length / bare(jp.replace(/[{}]/g, "")).length > MOST) out("highlight covers most of the line");
        else if (exclusions[id]) out(exclusions[id]);
        else {
          const register = endsLine(line) ? registerOf(jp, ix) : undefined;
          // The word part just before the gap, when the gap is a word's ending: [飲|の] of [飲|の]＿＿.
          const stem = /\S$/.test(line.split(GAP)[0]) ? (line.split(GAP)[0].split(/\s+/).pop() ?? "") : "";
          cards.push({
            id,
            line,
            answer,
            also: [...engineVariants(line, answer, ix), ...(CLOZE_ALSO[id] ?? [])],
            en,
            lesson: key,
            ...(register ? { register } : {}),
            ...(stem ? { stem } : {}),
          });
        }
      }
    }
  }
  return { cards, leftOut };
}

/**
 * The engine's other standard ways to say the answer, when it is a conjugated form: [食|た]べません also takes
 * [食|た]べない です, いい です takes よい です, and a copula after a noun (学生 じゃ ない) takes で は ない. Nothing for
 * anything else, so only reviewed alternatives count.
 */
function engineVariants(line: Jp, answer: Jp, ix: ReturnType<typeof buildIndex>): Jp[] {
  const out = new Set<Jp>();
  const before = line.split(GAP)[0].trimEnd().split(/\s+/).pop() ?? "";
  const resolve = (w: Jp) => {
    const r = resolveWord(w, ix);
    return r && "word" in r && (r.how === "entry" || r.how === "form") ? r.word : null;
  };
  // The answer is itself a form of its first word: [食|た]べません, いい です.
  const first = resolve(answer.split(/\s+/)[0]);
  if (first) for (const c of allForms(first)) if (c.ok && c.jp === answer) c.variants.forEach((v) => out.add(v));
  // The answer completes a form of the word before the gap: [学生|がくせい] + じゃ ない.
  const prev = line.split(GAP)[0].endsWith(" ") && before ? resolve(before) : null;
  if (prev) {
    for (const c of allForms(prev)) {
      if (!c.ok || c.jp !== `${prev.jp} ${answer}`) continue;
      for (const v of c.variants) if (v.startsWith(`${prev.jp} `)) out.add(v.slice(prev.jp.length + 1));
    }
  }
  return [...out].filter((v) => v !== answer);
}
