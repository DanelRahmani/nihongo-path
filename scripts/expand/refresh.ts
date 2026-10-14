// The JMdict refresh check (G1; EDRDG asks web dictionaries to keep their data current, about monthly):
//   npm run expand-refresh -- <jmdict-eng.json>
// Use the full jmdict-eng file, not the common subset, so a word that only lost its "common" mark isn't reported
// as gone. Checks every dictionary word against it and prints what changed; never rewrites anything:
// - expansion words (by their JMdict id): the entry is gone or merged; the (written, reading) pair is gone or now
//   marked rare, irregular or search-only; uk was added to a word we write in kanji (STYLE §5 would write it in kana); the part
//   of speech or verb class changed; the common mark was lost; the first sense gained a vulg, sens, derog, arch or
//   obs note;
// - lesson and kanji-example words: the (written, reading) pair is gone;
// - the candidate list's JMdict is more than 31 days older than this file.
// Exits 1 when anything is found. Record the date checked in CLAUDE.md.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { WORDS } from "@/content/words";
import { EXPANSION_WORDS } from "@/content/words/expansion";
import { EXTRA_WORDS } from "@/content/words/extra";
import { plainOf, readingOf } from "@/lib/markup";
import { classify, type JmEntry, toHiragana } from "@/scripts/expand/expand";

const path = process.argv[2];
if (!path) {
  console.error("Usage: npm run expand-refresh -- <jmdict-eng.json>");
  process.exit(2);
}
const jmdict = JSON.parse(readFileSync(path, "utf8")) as { version: string; dictDate: string; words: (JmEntry & { kanji: { common: boolean }[] })[] };
const candidates = JSON.parse(readFileSync(fileURLToPath(new URL("../../content/data/expand-candidates.json", import.meta.url)), "utf8")) as { source: { jmdict: string } };

const byId = new Map(jmdict.words.map((e) => [e.id, e]));
const pairs = new Set<string>();
for (const e of jmdict.words) {
  const readings = e.kana.map((k) => toHiragana(k.text));
  for (const r of readings) pairs.add(`${r}|${r}`);
  for (const k of e.kanji) for (const r of e.kana) if (!r.appliesToKanji || r.appliesToKanji.includes("*") || r.appliesToKanji.includes(k.text)) pairs.add(`${k.text}|${toHiragana(r.text)}`);
  for (const k of e.kana) pairs.add(`${k.text}|${toHiragana(k.text)}`);
}

const findings: string[] = [];
const OUT_OF_USE = new Set(["rK", "sK", "iK", "oK", "ik", "ok", "rk", "sk"]);
const NEW_NOTES = new Set(["vulg", "sens", "derog", "arch", "obs"]);

for (const w of EXPANSION_WORDS) {
  const written = plainOf(w.jp, false);
  const reading = toHiragana(readingOf(w.jp, false));
  const e = byId.get(w.jmdict ?? "");
  if (!e) {
    findings.push(`${w.jp} (${w.jmdict}): the entry is gone or merged`);
    continue;
  }
  const kanji = e.kanji.find((k) => k.text === written);
  const kana = e.kana.find((k) => toHiragana(k.text) === reading);
  if (!kana || (/\p{Script=Han}/u.test(written) && !kanji)) findings.push(`${w.jp} (${e.id}): the written form or reading is gone`);
  for (const f of [kanji, kana]) if (f?.tags.some((t) => OUT_OF_USE.has(t))) findings.push(`${w.jp} (${e.id}): ${f.text} is now marked ${f.tags.join(",")}`);
  const uk = !!e.sense[0]?.misc.includes("uk");
  const writtenInKana = !/\p{Script=Han}/u.test(written);
  if (uk && !writtenInKana) findings.push(`${w.jp} (${e.id}): now usually written in kana (uk)`);
  const cls = classify(e);
  if ("reason" in cls) findings.push(`${w.jp} (${e.id}): would now be left out (${cls.reason})`);
  else if (cls.pos !== w.pos || cls.verb !== w.verb) findings.push(`${w.jp} (${e.id}): part of speech now ${cls.pos}${cls.verb ? ` ${cls.verb}` : ""}`);
  if (![...e.kanji, ...e.kana].some((f) => f.common)) findings.push(`${w.jp} (${e.id}): no longer marked common`);
  const notes = e.sense[0]?.misc.filter((m) => NEW_NOTES.has(m)) ?? [];
  if (notes.length) findings.push(`${w.jp} (${e.id}): first sense now marked ${notes.join(",")}`);
}

for (const w of [...WORDS, ...EXTRA_WORDS]) {
  const key = `${plainOf(w.jp, false)}|${toHiragana(readingOf(w.jp, false))}`;
  if (!pairs.has(key) && !/^[〜~]/.test(plainOf(w.jp, false))) findings.push(`${w.jp}: not a (written, reading) pair in this JMdict`);
}

const ours = Date.parse(candidates.source.jmdict.match(/\((\d{4}-\d{2}-\d{2})\)/)?.[1] ?? "");
const theirs = Date.parse(jmdict.dictDate);
if (Number.isFinite(ours) && Number.isFinite(theirs) && theirs - ours > 31 * 86_400_000) {
  findings.push(`the candidate list is built from JMdict ${candidates.source.jmdict}, more than 31 days before ${jmdict.dictDate}: rebuild it (npm run expand-candidates)`);
}

console.log(`JMdict ${jmdict.version} (${jmdict.dictDate}): ${EXPANSION_WORDS.length} expansion words and ${WORDS.length + EXTRA_WORDS.length} lesson and kanji-example words checked.`);
for (const f of findings) console.log(`- ${f}`);
if (findings.length) process.exit(1);
console.log("Nothing to look at.");
