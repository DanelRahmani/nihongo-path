/**
 * Merging an imported backup into this browser's stores (Phase 0), keeping the newer state of each item: answers
 * joined without duplicates; each scheduled card from the side that answered it last (then the one answered more
 * often); finished lessons, saved words, notebook items, daily counts and placement checks joined. Display
 * settings, study choices, the path tab and today's new-card count stay as they are here. Pure.
 */
import type { History, StoreKey, StoreValues } from "@/lib/schemas";
import type { DeckState } from "@/lib/srs";

const lastAnswers = (history: History) => {
  const last = new Map<string, number>();
  for (const r of history) {
    const id = `${r.k}|${r.c}`;
    last.set(id, Math.max(last.get(id) ?? 0, r.t));
  }
  return last;
};

const reviewKey = (r: History[number]) => `${r.k}|${r.c}|${r.t}|${r.r}|${r.a}`;

/** The stores after merging `incoming` (the file's stores, already decoded) into `current`. */
export function mergeStores(current: StoreValues, incoming: Partial<StoreValues>): StoreValues {
  const merged = { ...current };
  const theirHistory = incoming["np:history"] ?? [];

  if (incoming["np:history"]) {
    const seen = new Set(current["np:history"].map(reviewKey));
    merged["np:history"] = [...current["np:history"], ...theirHistory.filter((r) => !seen.has(reviewKey(r)))].sort((a, b) => a.t - b.t);
  }

  const theirSrs = incoming["np:srs"];
  if (theirSrs) {
    const ours = lastAnswers(current["np:history"]);
    const theirs = lastAnswers(theirHistory);
    const decks: Record<string, DeckState> = { ...current["np:srs"].decks };
    for (const [deckId, deck] of Object.entries(theirSrs.decks)) {
      const mine = decks[deckId];
      const cards = { ...mine?.cards };
      for (const [cardId, card] of Object.entries(deck.cards)) {
        const own = cards[cardId];
        const a = ours.get(`${deckId}|${cardId}`) ?? 0;
        const b = theirs.get(`${deckId}|${cardId}`) ?? 0;
        if (!own || b > a || (b === a && card.reps > own.reps)) cards[cardId] = card;
      }
      decks[deckId] = { cards, extraGroups: Math.max(mine?.extraGroups ?? 0, deck.extraGroups) };
    }
    merged["np:srs"] = { decks };
  }

  if (incoming["np:progress"]) merged["np:progress"] = { ...current["np:progress"], ...incoming["np:progress"] };

  if (incoming["np:lessons-log"]) {
    const log = { ...current["np:lessons-log"] };
    for (const [key, theirs] of Object.entries(incoming["np:lessons-log"])) {
      const mine = log[key] ?? {};
      const opened = [mine.firstOpenedAt, theirs.firstOpenedAt].filter((t): t is number => t !== undefined);
      const later = (theirs.completedAt ?? -1) > (mine.completedAt ?? -1) ? theirs : mine;
      log[key] = {
        ...(opened.length ? { firstOpenedAt: Math.min(...opened) } : {}),
        ...(later.completedAt !== undefined ? { completedAt: later.completedAt } : {}),
        ...(later.placed ? { placed: true as const } : {}),
      };
    }
    merged["np:lessons-log"] = log;
  }

  if (incoming["np:my-words"]) merged["np:my-words"] = [...new Set([...current["np:my-words"], ...incoming["np:my-words"]])];

  if (incoming["np:notebook"]) {
    const notebook = { ...current["np:notebook"] };
    const touched = (n: (typeof notebook)[string]) => Math.max(n.lastMiss, n.lastRight ?? 0);
    for (const [key, item] of Object.entries(incoming["np:notebook"])) {
      if (!notebook[key] || touched(item) > touched(notebook[key])) notebook[key] = item;
    }
    merged["np:notebook"] = notebook;
  }

  const theirActivity = incoming["np:activity"];
  if (theirActivity) {
    const mine = current["np:activity"];
    const days = { ...mine.days };
    for (const [day, d] of Object.entries(theirActivity.days)) {
      if (!days[day] || d.answered > days[day].answered) days[day] = d;
    }
    const before = [mine.before, theirActivity.before].filter((b) => b !== undefined).sort((a, b) => b.length - a.length)[0];
    merged["np:activity"] = { goal: mine.goal, days, ...(before ? { before } : {}) };
  }

  if (incoming["np:placement"]) {
    const seen = new Set(current["np:placement"].map((p) => p.at));
    merged["np:placement"] = [...current["np:placement"], ...incoming["np:placement"].filter((p) => !seen.has(p.at))].sort((a, b) => a.at - b.at);
  }

  return merged;
}

/** The stores a merge leaves as they are here. */
export const KEPT_ON_MERGE: StoreKey[] = ["np:settings", "np:study", "np:path-filter", "np:new-cards"];
