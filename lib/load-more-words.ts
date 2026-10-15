import { type PackedMoreCard, unpackMoreCards, type VocabCard } from "@/lib/vocab-deck";

let cards: Promise<VocabCard[]> | undefined;

/** Fetches the "More words" cards once per page view; a failed fetch is tried again on the next call. */
export function loadMoreWords(): Promise<VocabCard[]> {
  cards ??= fetch("/vocab-more.json")
    .then((r) => {
      if (!r.ok) throw new Error(`vocab-more.json: ${r.status}`);
      return r.json() as Promise<PackedMoreCard[]>;
    })
    .then(unpackMoreCards)
    .catch((e) => {
      cards = undefined;
      throw e;
    });
  return cards;
}
