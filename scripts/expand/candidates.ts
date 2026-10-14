// The expansion candidate list (G1):
//   npm run expand-candidates -- <jmdict-eng-common.json> <wordfreq large_ja.msgpack.gz> [count]
// Ranks JMdict's common words by wordfreq (word forms folded into their dictionary words, scripts/expand/expand.ts),
// keeps the content words a learner looks up, writes each in its STYLE §5 form, drops the lesson dictionary's own
// words, and writes content/data/expand-candidates.json, most frequent first. The downloads stay outside the repo;
// only this list is committed. Prints why words were left out.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";
import { NAMES, WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { plainOf, readingOf } from "@/lib/markup";
import { chooseForm, classify, credit, FUNCTION_WORDS, frequencies, indexEntries, isFragment, isUnsuitable, type JmEntry, lessonEntryIds, looksProper, toHiragana } from "@/scripts/expand/expand";
import { decodeMsgpack } from "@/scripts/expand/msgpack";

const [jmdictPath, wordfreqPath, countArg = "5000"] = process.argv.slice(2);
const COUNT = Number(countArg);
if (!jmdictPath || !wordfreqPath || !Number.isInteger(COUNT) || COUNT < 1) {
  console.error("Usage: npm run expand-candidates -- <jmdict-eng-common.json> <large_ja.msgpack.gz> [count, default 5000]");
  process.exit(2);
}
const OUT = fileURLToPath(new URL("../../content/data/expand-candidates.json", import.meta.url));

const jmdict = JSON.parse(readFileSync(jmdictPath, "utf8")) as { version: string; dictDate: string; words: JmEntry[] };
const freq = frequencies(decodeMsgpack(gunzipSync(readFileSync(wordfreqPath))) as unknown[]);

const lessonWords = [...WORDS, ...EXTRA_WORDS].map((w) => ({ written: plainOf(w.jp, false), reading: toHiragana(readingOf(w.jp, false)), meaning: w.meaning }));
const taughtIds = lessonEntryIds(jmdict.words, lessonWords);
const names = new Set(NAMES.map((n) => plainOf(n, false)));
const lessonKeys = new Set(lessonWords.map((w) => `${w.written}|${w.reading}`));

const ix = indexEntries(jmdict.words);
const score = new Map<string, number>();
for (const [token, f] of freq) for (const [id, share] of credit(token, f, ix, (e) => taughtIds.has(e.id))) score.set(id, (score.get(id) ?? 0) + share);

/** Kana words wordfreq over-counts because they spell common endings or grammar (まし is ました's stem; すげ is すげー). */
const OVERCOUNTED = new Set(["まし", "すげ", "あい", "わし", "くり", "ガン"]);

const reasons = new Map<string, number>();
const leftOut = (reason: string) => reasons.set(reason, (reasons.get(reason) ?? 0) + 1);
type Candidate = { id: string; jp: string; pos: string; verb?: string; suru?: true; kana?: string; proper?: true; homograph?: true; gloss: string; zipf: number };
const kept: Candidate[] = [];
const checkByHand: { id: string; written: string; reading: string }[] = [];
const seen = new Set<string>();
const ranked = jmdict.words.filter((e) => (score.get(e.id) ?? 0) > 0).sort((a, b) => score.get(b.id)! - score.get(a.id)!);
for (const e of ranked) {
  if (taughtIds.has(e.id)) {
    leftOut("already in the lesson dictionary");
    continue;
  }
  const cls = classify(e);
  if ("reason" in cls) {
    leftOut(cls.reason);
    continue;
  }
  const form = chooseForm(e);
  if ("reason" in form) {
    if (form.check) checkByHand.push({ id: e.id, written: e.kanji[0]?.text ?? "", reading: e.kana[0]?.text ?? "" });
    leftOut(form.reason);
    continue;
  }
  const key = `${form.written}|${form.reading}`;
  if (isFragment(form.written)) leftOut("one kana");
  else if (FUNCTION_WORDS.has(form.jp)) leftOut("grammar the lessons teach (STYLE §5)");
  else if (isUnsuitable(form.written, form.reading)) leftOut("unsuitable (adult term or insult)");
  else if (OVERCOUNTED.has(form.written)) leftOut("over-counted kana word");
  else if (lessonKeys.has(key) || names.has(form.written)) leftOut("already in the lesson dictionary");
  else if (seen.has(key)) leftOut("same written form and reading as a higher-ranked entry");
  else {
    seen.add(key);
    kept.push({
      id: e.id,
      jp: form.jp,
      pos: cls.pos,
      ...(cls.verb ? { verb: cls.verb } : {}),
      ...(cls.suru ? { suru: true as const } : {}),
      ...(form.kanaBecause ? { kana: form.kanaBecause } : {}),
      ...(looksProper(e) ? { proper: true as const } : {}),
      gloss: e.sense
        .slice(0, 2)
        .map((s) => s.gloss.slice(0, 3).map((g) => g.text).join("; "))
        .join(" | "),
      zipf: Math.round((Math.log10(score.get(e.id)!) + 9) * 100) / 100,
    });
  }
}
// A word written the same as another candidate (心 こころ/しん): flagged, so the writer picks.
const byWritten = new Map<string, number>();
for (const c of kept) byWritten.set(plainOf(c.jp, false), (byWritten.get(plainOf(c.jp, false)) ?? 0) + 1);
for (const c of kept) if ((byWritten.get(plainOf(c.jp, false)) ?? 0) > 1) c.homograph = true;

const out = {
  note:
    "Expansion candidates (G1), most frequent first. This file is licensed CC BY-SA 4.0. It is derived, with changes (filtered, re-ranked, forms chosen by content/STYLE.md, glosses cut to the first senses), from JMdict (© the Electronic Dictionary Research and Development Group, CC BY-SA 4.0; https://www.edrdg.org/jmdict/j_jmdict.html, licence https://www.edrdg.org/edrdg/licence.html) through jmdict-simplified, and from wordfreq (Robyn Speer, wordfreq v3.1.1, data CC BY-SA 4.0, built from the sources its README lists). Generated by scripts/expand/candidates.ts. The glosses are JMdict's, for checking only: the app's meanings are written separately.",
  source: { jmdict: `${jmdict.version} (${jmdict.dictDate})`, wordfreq: "3.1.1 large_ja" },
  checkByHand,
  candidates: kept.slice(0, COUNT),
};
writeFileSync(OUT, `${JSON.stringify(out).replace(/\},\{/g, "},\n{")}\n`);
console.log(`${ranked.length} JMdict entries counted by wordfreq; ${kept.length} kept, ${Math.min(COUNT, kept.length)} written; ${checkByHand.length} to check by hand.`);
for (const [reason, n] of [...reasons].sort((a, b) => b[1] - a[1])) console.log(`  left out, ${reason}: ${n}`);
