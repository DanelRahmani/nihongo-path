/**
 * The "Type it" game (E9): copy a lesson line through a Japanese keyboard, in kana or in kanji (the learner
 * picks). The comparer walks the line in the lesson's own pieces, so its feedback can name what keyboards get
 * wrong: a space typed in (half or full width), "," or "." for 、 and 。, half-width ? and !, the reading left in
 * kana, another kanji chosen from the keyboard's list, digits for a kanji numeral, the keyboard's kanji for a word
 * the lessons write in kana (下さい), katakana for hiragana, and わ for the particle は. Pure.
 */
import { parse } from "@/lib/markup";
import { KANA_WORDS } from "@/lib/quiz";

export type Script = "kana" | "kanji";

export type Slip =
  | { kind: "space"; width: "half" | "full" }
  | { kind: "punctuation"; typed: string; expected: string }
  | { kind: "kana-for-kanji"; typed: string; expected: string }
  | { kind: "other-kanji"; typed: string; expected: string; reading: string }
  | { kind: "digits"; typed: string; expected: string }
  | { kind: "kana-word"; typed: string; expected: string }
  | { kind: "other-script"; typed: string; expected: string }
  | { kind: "particle"; typed: string; expected: string };

export interface Comparison {
  /** Typed exactly as the line, slip-free. */
  exact: boolean;
  slips: Slip[];
  /** Where the typing first stops matching anything (index into the target text), when it does. */
  differsAt: number | null;
  /** What was typed from that point on, when it differs. */
  typedFrom: string;
  /** The line as the reader should type it. */
  target: string;
  /** Kana mode only: the typing is the line in kanji, which this round doesn't ask for. */
  typedInKanji?: true;
}

/** One piece of the target: a run of kanji with its reading, or one other character (a particle は/へ/を marked). */
type Piece = { text: string; reading?: string; particle?: true };

const PARTICLES = new Set(["は", "へ", "を"]);

/** The line in pieces, in the chosen script: kanji keep their reading beside them; kana mode types the reading. */
export function piecesOf(jp: string, script: Script): Piece[] {
  const out: Piece[] = [];
  for (const t of parse(jp, false)) {
    if (t.kind === "ruby") {
      if (script === "kanji") out.push({ text: t.base, reading: t.reading });
      else for (const c of t.reading) out.push({ text: c });
    } else if (t.kind === "text") {
      // The lesson's word spaces and name joins (田中-さん) aren't typed. A particle is a word of its own.
      for (const word of t.text.split(/\s+/)) {
        const particle = PARTICLES.has(word);
        for (const c of word.replace(/-/g, "")) out.push({ text: c, ...(particle ? { particle: true as const } : {}) });
      }
    }
  }
  return out;
}

/** Keyboard look-alikes for Japanese punctuation (the longest first, so 。。。 is taken whole). */
const LOOKALIKES: Record<string, string[]> = {
  "、": [",", "，", "､"],
  "。": [".", "．", "｡"],
  "？": ["?"],
  "！": ["!"],
  "・": ["･"],
  "…": ["。。。", "...", "・・・", "．．．"],
  "ー": ["-", "－"],
};

/** The particles written は, へ, を, and the kana a learner types for their sound. */
const PARTICLE_SOUND: Record<string, string> = { は: "わ", へ: "え", を: "お" };

const KANJI_DIGITS = "〇一二三四五六七八九十百千万";

const toHiragana = (s: string) => [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");
const isHan = (c: string | undefined) => !!c && /\p{Script=Han}/u.test(c);

type Placed = Slip & { from: number; to: number };

/**
 * Compares a typed line with the target. Slips are noted and stepped over, so one slip doesn't hide the rest;
 * anything else stops the walk at `differsAt`. The line counts as typed only when it is exact.
 */
export function compareTyped(jp: string, script: Script, typed: string): Comparison {
  const pieces = piecesOf(jp, script);
  const target = pieces.map((p) => p.text).join("");
  const slips: Placed[] = [];
  let at = 0; // position in typed
  let pos = 0; // position in target
  const spaces = () => {
    while (typed[at] === " " || typed[at] === "　") {
      slips.push({ kind: "space", width: typed[at] === " " ? "half" : "full", from: pos, to: pos });
      at++;
    }
  };
  // Whether the typing from `from` lines up with piece k, so a slip is only taken when the typing resumes after it.
  const linesUp = (k: number, from: number) => {
    const next = pieces[k];
    const rest = typed.slice(from).replace(/^[ 　]+/, "");
    if (!next) return rest === "";
    return (
      rest.startsWith(next.text) ||
      (!!next.reading && rest.startsWith(next.reading)) ||
      (!!rest[0] && toHiragana(rest[0].normalize("NFKC")) === toHiragana(next.text[0])) ||
      !!LOOKALIKES[next.text]?.some((l) => rest.startsWith(l))
    );
  };
  const fail = (): Comparison => ({ exact: false, slips: merge(slips), differsAt: pos, typedFrom: typed.slice(at), target });

  for (let k = 0; k < pieces.length; k++) {
    spaces();
    const piece = pieces[k];
    const rest = typed.slice(at);
    const slip = (s: Slip, typedLength: number) => {
      slips.push({ ...s, from: pos, to: pos + piece.text.length });
      at += typedLength;
    };
    // A word the lessons write in kana that the keyboard converted (下さい for ください).
    const kanaWord = piece.reading ? undefined : KANA_WORDS.find(([kanji, kana]) => rest.startsWith(kanji) && target.startsWith(kana, pos));
    if (rest.startsWith(piece.text)) {
      at += piece.text.length;
    } else if (kanaWord) {
      const [kanji, kana] = kanaWord;
      slips.push({ kind: "kana-word", typed: kanji, expected: kana, from: pos, to: pos + kana.length });
      at += kanji.length;
      // Step over the pieces the word covers.
      let covered = piece.text.length;
      while (covered < kana.length && k + 1 < pieces.length) covered += pieces[++k].text.length;
      pos += covered;
      continue;
    } else if (piece.reading && rest.startsWith(piece.reading)) {
      slip({ kind: "kana-for-kanji", typed: piece.reading, expected: piece.text }, piece.reading.length);
    } else if (piece.reading && /^[0-9０-９]/.test(rest) && KANJI_DIGITS.includes(piece.text[0])) {
      // Digits for the numeral part of the word (3本 for 三本), the rest of it typed as written.
      const digits = rest.match(/^[0-9０-９]+/)![0];
      const numeral = piece.text.match(new RegExp(`^[${KANJI_DIGITS}]+`))![0];
      const tail = piece.text.slice(numeral.length);
      if (!rest.slice(digits.length).startsWith(tail)) return fail();
      slip({ kind: "digits", typed: digits + tail, expected: piece.text }, digits.length + tail.length);
    } else if (piece.reading && isHan(rest[0])) {
      // Another kanji from the keyboard's list (観 for 見, 京 for 今日): the whole kanji run, and only if the
      // typing lines up with the next piece after it, so a different word isn't passed off as a slip.
      const run = rest.match(/^\p{Script=Han}+/u)![0];
      if (!linesUp(k + 1, at + run.length)) return fail();
      slip({ kind: "other-kanji", typed: run, expected: piece.text, reading: piece.reading }, run.length);
    } else if (LOOKALIKES[piece.text]?.some((l) => rest.startsWith(l))) {
      const typedAs = LOOKALIKES[piece.text].find((l) => rest.startsWith(l)) as string;
      slip({ kind: "punctuation", typed: typedAs, expected: piece.text }, typedAs.length);
    } else if (piece.particle && rest[0] === PARTICLE_SOUND[piece.text]) {
      slip({ kind: "particle", typed: rest[0], expected: piece.text }, 1);
    } else if (rest[0] && toHiragana(rest.slice(0, 2).normalize("NFKC")) === toHiragana(piece.text)) {
      // A half-width kana with its voicing mark (ｶﾞ for が).
      slip({ kind: "other-script", typed: rest.slice(0, 2), expected: piece.text }, 2);
    } else if (rest[0] && toHiragana(rest[0].normalize("NFKC")) === toHiragana(piece.text)) {
      // Katakana for hiragana or back, half-width katakana (ｺ) included.
      slip({ kind: "other-script", typed: rest[0], expected: piece.text }, 1);
    } else {
      return fail();
    }
    pos += piece.text.length;
  }
  spaces();
  if (at < typed.length) return fail();
  return { exact: slips.length === 0, slips: merge(slips), differsAt: null, typedFrom: "", target };
}

/**
 * compareTyped, and in kana mode, when the typing is the line in kanji, says so: the reader typed the kanji this
 * round doesn't ask for.
 */
export function compareLine(jp: string, script: Script, typed: string): Comparison {
  const r = compareTyped(jp, script, typed);
  if (r.exact || script !== "kana" || r.differsAt === null) return r;
  const asKanji = compareTyped(jp, "kanji", typed);
  return asKanji.differsAt === null && asKanji.slips.every((s) => s.kind !== "kana-for-kanji") ? { ...r, typedInKanji: true } : r;
}

/** Slips of one kind side by side in the line become one: にほん + ご → にほんご for 日本語, ぱ + ん for パン. */
function merge(slips: Placed[]): Slip[] {
  const out: Placed[] = [];
  for (const s of slips) {
    const prev = out.at(-1);
    if (prev && prev.to === s.from && prev.kind === s.kind && (s.kind === "kana-for-kanji" || s.kind === "other-script") && "typed" in prev) {
      out[out.length - 1] = { ...prev, typed: prev.typed + s.typed, expected: prev.expected + s.expected, to: s.to };
    } else out.push(s);
  }
  return out.map((s) => {
    const slip: Partial<Placed> = { ...s };
    delete slip.from;
    delete slip.to;
    return slip as Slip;
  });
}

const scriptName = (s: string) => (/[｡-ﾟ]/.test(s) ? "half-width katakana" : /[ァ-ヺ]/.test(s) ? "katakana" : "hiragana");

/** A slip in words, for the feedback list. */
export function describeSlip(slip: Slip): string {
  switch (slip.kind) {
    case "space":
      return slip.width === "half" ? "A half-width space: Japanese lines have no spaces." : "A full-width space: Japanese lines have no spaces between words.";
    case "punctuation":
      return slip.expected === "ー"
        ? `“${slip.typed}” for ー: the long-vowel mark comes from the Japanese keyboard's - key.`
        : `“${slip.typed}” for ${slip.expected}: switch the keyboard to Japanese for its punctuation.`;
    case "kana-for-kanji":
      return `${slip.typed} left in kana: convert it to ${slip.expected}.`;
    case "other-kanji":
      return `${slip.typed} where the line has ${slip.expected} (read ${slip.reading}): if the keyboard offers it, choose ${slip.expected}.`;
    case "digits":
      return `${slip.typed} in digits: the line writes ${slip.expected}. The keyboard's list offers both.`;
    case "kana-word":
      return `${slip.typed}: the lessons write ${slip.expected} in kana, so keep the keyboard's kana.`;
    case "other-script":
      return `${slip.typed} for ${slip.expected}: ${scriptName(slip.typed)} instead of ${scriptName(slip.expected)}.`;
    case "particle":
      return `${slip.typed} for the particle ${slip.expected}: it sounds ${slip.typed} but is written ${slip.expected} (typed ${slip.expected === "は" ? "ha" : slip.expected === "へ" ? "he" : "wo"}).`;
  }
}
