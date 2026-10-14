/**
 * Lenient matching of romaji a learner types against the app's romaji (content/STYLE.md §6).
 * Both sides are folded to one spelling, so si/shi, tu/tsu, kyō/kyoo/kyou and n'/n all match. Pure.
 */

const MACRONS: Record<string, string> = { ā: "aa", ī: "ii", ū: "uu", ē: "ee", ō: "oo", â: "aa", î: "ii", û: "uu", ê: "ee", ô: "oo" };

/** Kunrei and other alternative spellings, folded to Hepburn. Longest first. */
const ALTERNATIVES: [RegExp, string][] = [
  [/sy([aueo])/g, "sh$1"],
  [/[tc]y([aueo])/g, "ch$1"],
  [/[zj]y([aueo])/g, "j$1"],
  [/si/g, "shi"],
  [/ti/g, "chi"],
  [/tu/g, "tsu"],
  // Not the hu of Hepburn shu and chu.
  [/(^|[^sc])hu/g, "$1fu"],
  [/zi|di/g, "ji"],
  [/du/g, "zu"],
  [/wo/g, "o"],
  // Traditional Hepburn writes ん as m before b, m and p (shimbun); the app writes n.
  [/m(?=[bmp])/g, "n"],
  // Japanese keyboards type ん as nn; it's one n at the end of a word or before a consonant
  // (mikann, ennpitsu), but nn before a vowel or y is real (minna, konnichiwa).
  [/nn(?=$|[^aiueoy])/g, "n"],
  [/dzu/g, "zu"],
];

export function normalizeRomaji(s: string): string {
  let out = s
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[āīūēōâîûêô]/g, (c) => MACRONS[c])
    .replace(/[\s'’\-.,!?~]/g, "");
  // Hepburn itself never contains si, ti, tu, zi, or hu outside shu and chu (shi, chi, tsu, ji, fu), so these folds
  // leave it alone.
  for (const [from, to] of ALTERNATIVES) out = out.replace(from, to);
  return out.replace(/ou/g, "oo");
}

/** True when the typed romaji spells the same reading as `expected` (the app's romaji). */
export function romajiMatches(typed: string, expected: string): boolean {
  return typed.trim() !== "" && normalizeRomaji(typed) === normalizeRomaji(expected);
}
