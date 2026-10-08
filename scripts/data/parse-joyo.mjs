// Builds content/data/joyo.json from the official 常用漢字表 (2010):
//   pdftotext -enc UTF-8 -raw joyokanjihyo_20101130.pdf raw.txt
//   node scripts/data/parse-joyo.mjs raw.txt kanjidic2-en-*.json content/data/joyo.json
// Every reading is cross-checked against KANJIDIC2, which also gives the okurigana split (あつか.う).
import fs from "node:fs";
const [txtPath, kanjidicPath, outPath] = process.argv.slice(2);
// pdftotext writes characters outside the BMP (𠮟) as CESU-8 surrogate pairs: decode them.
const buf = fs.readFileSync(txtPath);
const bytes = [];
for (let i = 0; i < buf.length; i++) {
  if (buf[i] === 0xed && i + 5 < buf.length && (buf[i + 1] & 0xf0) === 0xa0 && buf[i + 3] === 0xed && (buf[i + 4] & 0xf0) === 0xb0) {
    const hi = 0xd000 | ((buf[i + 1] & 0x3f) << 6) | (buf[i + 2] & 0x3f);
    const lo = 0xd000 | ((buf[i + 4] & 0x3f) << 6) | (buf[i + 5] & 0x3f);
    bytes.push(...Buffer.from(String.fromCharCode(hi, lo), "utf8"));
    i += 5;
  } else bytes.push(buf[i]);
}
const lines = Buffer.from(bytes).toString("utf8").replace(/\r/g, "").replace(/\f/g, "").split("\n");
const start = lines.findIndex((l) => /^亜/.test(l));
const fuhyoAt = lines.findIndex((l, i) => i > start && /^付\s*表/.test(l));
const KANA = /^[ぁ-んァ-ヶー]+$/;
const KANJI = /^[㐀-鿿\u{20000}-\u{2ffff}]$/u;
const kanji = [];
let cur = null;
for (let li = start; li < fuhyoAt; li++) {
  const line = lines[li];
  if (/^ /.test(line)) continue; // old forms set under the kanji (弁: 瓣, 辯)
  const special = /^　/.test(line); // 1字下げ: a special or narrow reading
  const toks = line.replace(/^　+/, "").split(/\s+/).filter(Boolean);
  if (!toks.length) continue;
  // A kanji alone on its line is an entry only when its old form follows (県 / （縣）); otherwise it's a note.
  const lone = toks.length === 1 && !/^[（［]/.test(lines[li + 1] ?? "");
  if (KANJI.test(toks[0]) && !lone) {
    cur = { char: toks[0], readings: [] };
    kanji.push(cur);
    toks.shift();
    if (toks[0]?.startsWith("（") || KANJI.test(toks[0] ?? "")) toks.shift(); // old form: （舊） or 弁 辨
    if (toks[0] && KANA.test(toks[0])) cur.readings.push({ r: toks[0], special: false });
    continue;
  }
  if (/^[（［]/.test(toks[0]) && cur) {
    // The old form on its own line, then the first reading.
    // The old form's glyph can be lost, leaving （ ） before the reading (亀, 餅): take the first kana token.
    const r = toks.find((t) => KANA.test(t));
    if (r && !cur.readings.some((x) => x.r === r)) cur.readings.push({ r, special: false });
    continue;
  }
  if (cur && KANA.test(toks[0]) && (toks.length > 1 || special)) cur.readings.push({ r: toks[0], special });
}
// 付表: a stream of reading tokens, each followed by its word(s).
const fuhyo = [];
let entry = null;
for (const line of lines.slice(fuhyoAt + 1)) {
  // The note above the list: a ※ line and an example in 「」 brackets.
  if (/^※|「|」|用いても/.test(line.trim())) continue;
  for (const tok of line.split(/[\s　]+/).filter(Boolean)) {
    if (KANA.test(tok)) {
      entry = { reading: tok, words: [] };
      fuhyo.push(entry);
    } else if (/[㐀-鿿]/.test(tok) && entry) entry.words.push(tok);
  }
}
// Kun readings KANJIDIC2 lacks, split by hand from the table's own examples (塞がる, 羨ましい…).
const SPLIT = {
  塞ふさがる: "ふさ.がる",
  羨うらやましい: "うらや.ましい",
  速はやまる: "はや.まる",
  務つとまる: "つと.まる",
  踊おどり: "おど.り",
  絡からめる: "から.める",
  丼どん: "どん",
};
const kd = new Map(JSON.parse(fs.readFileSync(kanjidicPath, "utf8")).characters.map((c) => [c.literal, c]));
const problems = [];
const out = {};
for (const k of kanji) {
  const c = kd.get(k.char);
  if (!c) problems.push(`${k.char} not in KANJIDIC2`);
  const rs = c ? (c.readingMeaning?.groups ?? []).flatMap((g) => g.readings) : [];
  const on = rs.filter((r) => r.type === "ja_on").map((r) => r.value);
  const kun = rs.filter((r) => r.type === "ja_kun").map((r) => r.value.replace(/-/g, ""));
  const e = { on: [], kun: [], special: [] };
  for (const { r, special } of k.readings) {
    if (special) e.special.push(r);
    if (/^[ァ-ヶー]+$/.test(r)) {
      if (!on.includes(r)) problems.push(`${k.char} on ${r} not in KANJIDIC2`);
      e.on.push(r);
    } else {
      const hit = kun.filter((x) => x.replace(".", "") === r);
      if (!hit.length && !SPLIT[k.char + r]) problems.push(`${k.char} kun ${r} not in KANJIDIC2`);
      e.kun.push(SPLIT[k.char + r] ?? hit.find((x) => x.includes(".")) ?? hit[0] ?? r);
    }
  }
  if (!k.readings.length) problems.push(`${k.char} has no readings`);
  out[k.char] = e;
}
const badFu = fuhyo.filter((f) => !f.words.length);
console.log("kanji", kanji.length, "unique", Object.keys(out).length, "readings", kanji.reduce((n, k) => n + k.readings.length, 0), "付表", fuhyo.length, "付表 words", fuhyo.reduce((n, f) => n + f.words.length, 0));
if (badFu.length) console.log("付表 entries without words:", badFu.map((f) => f.reading).join(" "));
console.log(problems.length + " problems:\n" + problems.join("\n"));
// One kanji or 付表 entry per line, so diffs stay readable.
const body = [
  "{",
  `"source": "常用漢字表 (Cabinet notice, 30 November 2010), bunka.go.jp joyokanjihyo_20101130.pdf; okurigana split from KANJIDIC2 (EDRDG, CC BY-SA 4.0)",`,
  `"licence": "The table is a government notice (内閣告示), outside copyright under Japan's Copyright Act art. 13. The okurigana splits come from KANJIDIC2 © EDRDG, so this file is licensed CC BY-SA 4.0: https://www.edrdg.org/edrdg/licence.html",`,
  `"note": "on: katakana; kun: hiragana, with a dot before the okurigana; special: readings the table indents (特別なもの, 用法のごく狭いもの)",`,
  `"kanji": {`,
  Object.entries(out).map(([k, e]) => `${JSON.stringify(k)}: ${JSON.stringify(e)}`).join(",\n"),
  "},",
  `"fuhyo": [`,
  fuhyo.map((f) => JSON.stringify(f)).join(",\n"),
  "]",
  "}",
].join("\n");
JSON.parse(body);
// The table's own totals: 2,136 kanji, 4,388 readings (2,352 on, 2,036 kun), 116 付表 entries with 123 words.
const on = Object.values(out).reduce((n, e) => n + e.on.length, 0);
const kunCount = Object.values(out).reduce((n, e) => n + e.kun.length, 0);
const totals = [Object.keys(out).length, on, kunCount, fuhyo.length, fuhyo.reduce((n, f) => n + f.words.length, 0)];
if (totals.join() !== "2136,2352,2036,116,123") {
  console.error(`Not written: totals ${totals.join(", ")}, expected 2136, 2352, 2036, 116, 123`);
  process.exit(1);
}
fs.writeFileSync(outPath, body + "\n");
