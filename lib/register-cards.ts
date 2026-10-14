import { REGISTER_ALSO } from "@/content/register-also";
import type { Jp } from "@/content/types";
import { ALL_LESSONS } from "@/content/units";
import { NAMES, WORDS } from "@/content/words";
import { allForms } from "@/lib/engine-forms";
import { quizCardId } from "@/lib/notebook";
import { lineRegister } from "@/lib/register";
import { type Direction, type RegisterCard, unhighlighted, wordsOf } from "@/lib/register-drill";
import { buildIndex, resolveWord } from "@/lib/words";

/**
 * A sentence with the engine's variants swapped in, one conjugated word at a time: [食|た]べません also comes as
 * [食|た]べない です. The longest form that runs on from the word counts, by whole words, so じゃ ありません でした
 * is replaced as a whole (じゃ なかった です), never as じゃ ありません + でした. A form followed by か is left alone:
 * 行きません か invites, 行かない です か asks. Only the engine supplies variants, so only reviewed forms count.
 */
function sentenceVariants(line: Jp, ix: ReturnType<typeof buildIndex>): Jp[] {
  const out = new Set<Jp>();
  const words = wordsOf(line);
  words.forEach((word, i) => {
    const r = resolveWord(word.replace(/[。、？！]+$/, ""), ix);
    if (!r || !("word" in r) || (r.how !== "form" && r.how !== "entry")) return;
    let best: { length: number; variants: Jp[]; tail: string } | null = null;
    for (const c of allForms(r.word)) {
      if (!c.ok || !c.variants.length) continue;
      const form = wordsOf(c.jp);
      const run = words.slice(i, i + form.length);
      // The run's last word may carry the line's punctuation.
      const tail = run.at(-1)?.match(/[。、？！]+$/)?.[0] ?? "";
      if (run.length !== form.length || run.join(" ").replace(/[。、？！]+$/, "") !== c.jp) continue;
      if (!best || form.length > best.length) best = { length: form.length, variants: c.variants, tail };
    }
    if (!best || /^か[？。！]*$/.test(words[i + best.length] ?? "")) return;
    for (const v of best.variants) out.add([...words.slice(0, i), v + best.tail, ...words.slice(i + best.length)].join(" "));
  });
  return [...out];
}

/**
 * The cards of both directions, from every example and dialogue line that has its other-register version in the
 * lesson (`alt`). The polite side converts to the casual side, and back. The accepted answers add the engine's
 * variants (on the casual side, not いい's stiff よい) and the reviewed ones in content/register-also.ts. Server
 * only: the page hands the result to the decks. Never imports the reading texts or the corpus.
 */
export function registerCards(): Record<Direction, RegisterCard[]> {
  const ix = buildIndex(WORDS, NAMES);
  const cards: Record<Direction, RegisterCard[]> = { casual: [], polite: [] };
  for (const { key, lesson } of ALL_LESSONS) {
    for (const b of lesson.blocks) {
      const items = b.type === "examples" ? b.items : b.type === "dialogue" ? b.lines : [];
      for (const item of items) {
        if (!item.alt) continue;
        const [a, z] = [unhighlighted(item.jp), unhighlighted(item.alt)];
        const polite = lineRegister(a) === "polite" ? a : lineRegister(z) === "polite" ? z : null;
        if (!polite) continue;
        const casual = polite === a ? z : a;
        const toCasual = quizCardId(key, polite);
        const toPolite = quizCardId(key, casual);
        const casualVariants = sentenceVariants(casual, ix).filter((v) => v.replace(/よい/g, "いい") !== casual);
        cards.casual.push({ id: toCasual, from: polite, to: casual, also: [...casualVariants, ...(REGISTER_ALSO[toCasual] ?? [])], en: item.en, lesson: key });
        cards.polite.push({ id: toPolite, from: casual, to: polite, also: [...sentenceVariants(polite, ix), ...(REGISTER_ALSO[toPolite] ?? [])], en: item.en, lesson: key });
      }
    }
  }
  return cards;
}
