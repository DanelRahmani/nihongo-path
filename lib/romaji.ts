import { KANA } from "@/content/kana";
import { readingOf } from "@/lib/markup";

/** Kana → Hepburn-style romaji (long vowels spelled out: ou, ei, ー repeats the vowel). */
const MAP: Record<string, string> = Object.fromEntries(KANA.map((k) => [k.char, k.romaji[0]]));

Object.assign(MAP, {
  ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o", ゃ: "ya", ゅ: "yu", ょ: "yo",
  ァ: "a", ィ: "i", ゥ: "u", ェ: "e", ォ: "o", ャ: "ya", ュ: "yu", ョ: "yo",
  ヴ: "vu", ヴァ: "va", ヴィ: "vi", ヴェ: "ve", ヴォ: "vo",
  ティ: "ti", ディ: "di", トゥ: "tu", ドゥ: "du", デュ: "dyu",
  ファ: "fa", フィ: "fi", フェ: "fe", フォ: "fo",
  ウィ: "wi", ウェ: "we", ウォ: "wo",
  シェ: "she", ジェ: "je", チェ: "che", ツァ: "tsa",
});

const PUNCT: Record<string, string> = {
  "。": ".", "、": ",", "？": "?", "！": "!", "「": "\"", "」": "\"",
  "…": "...", "〜": "~", "～": "~", "・": " ", "（": "(", "）": ")", "：": ":",
};

/** Particles read differently from their kana, and set words containing them. */
const WORDS: Record<string, string> = {
  は: "wa", へ: "e", を: "o",
  には: "niwa", では: "dewa", とは: "towa", からは: "karawa", までは: "madewa", へは: "ewa",
  こんにちは: "konnichiwa", こんばんは: "konbanwa",
};

const TRAILING_PUNCT = /[。、？！…」）〜～：]+$/;
const LEADING_PUNCT = /^[「（]+/;

function convertWord(word: string): string {
  const lead = word.match(LEADING_PUNCT)?.[0] ?? "";
  const trail = word.slice(lead.length).match(TRAILING_PUNCT)?.[0] ?? "";
  const core = word.slice(lead.length, word.length - trail.length);
  const punct = (s: string) => [...s].map((c) => PUNCT[c] ?? c).join("");

  if (core in WORDS) return punct(lead) + WORDS[core] + punct(trail);

  let out = "";
  let sokuon = false;
  let afterN = false;
  for (let i = 0; i < core.length; ) {
    const c = core[i];
    if (c === "っ" || c === "ッ") {
      sokuon = true;
      i++;
      continue;
    }
    if (c === "ー") {
      const lastVowel = out.match(/[aeiou](?=[^aeiou]*$)/)?.[0] ?? "";
      out += lastVowel;
      i++;
      continue;
    }
    const two = core.slice(i, i + 2);
    let r: string;
    if (two.length === 2 && two in MAP) {
      r = MAP[two];
      i += 2;
    } else {
      r = MAP[c] ?? PUNCT[c] ?? c;
      i++;
    }
    if (sokuon && /^[a-z]/.test(r)) r = (r.startsWith("ch") ? "t" : r[0]) + r;
    sokuon = false;
    if (afterN && /^[aeiouy]/.test(r)) out += "'";
    afterN = c === "ん" || c === "ン";
    out += r;
  }
  return punct(lead) + out + punct(trail);
}

/** Romaji for a kana reading with space-separated words. */
export function kanaToRomaji(reading: string): string {
  return reading
    .replace(/([、。！？])(?=\S)/g, "$1 ")
    .split(/\s+/)
    .filter(Boolean)
    .map(convertWord)
    .join(" ")
    .replace(/\s+([.,?!:])/g, "$1");
}

/** Romaji for a marked-up Jp string. */
export function romajiOf(jp: string): string {
  return kanaToRomaji(readingOf(jp));
}
