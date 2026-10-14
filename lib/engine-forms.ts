import type { Word } from "@/content/types";
import { type AdjectiveForm, conjugateAdjective, conjugateVerb, type Conjugated, VERB_FORMS } from "@/lib/conjugate";

export const ADJECTIVE_FORMS: AdjectiveForm[] = ["plain", "plainNeg", "plainPast", "plainPastNeg", "polite", "politeNeg", "politePast", "politePastNeg", "te", "adverb", "attributive", "ba", "tara"];

/**
 * Every engine form of a dictionary word: a verb's, an adjective's, or a noun's with the copula (だ, じゃ ない…).
 * The decks use it to find a line's conjugated words and their standard variants, so alternatives come only from
 * the engine.
 */
export function allForms(w: Word): Conjugated[] {
  if (w.pos === "verb" && w.verb) return VERB_FORMS.map((f) => conjugateVerb(w.jp, w.verb!, f.form));
  if (w.pos === "i-adj" || w.pos === "na-adj") return ADJECTIVE_FORMS.map((f) => conjugateAdjective(w.jp, w.pos === "i-adj" ? "i" : "na", f));
  if (w.pos === "noun" || w.pos === "pronoun") return ADJECTIVE_FORMS.map((f) => conjugateAdjective(w.jp, "noun", f));
  return [];
}
