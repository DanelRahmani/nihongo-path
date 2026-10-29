# JLPT phases: writer spec for one batch of lessons

The spec every lesson-writer agent follows in the JLPT phases (written for Phase 1, kept up to date with each unit's review). The orchestrating session gives each writer its batch (unit, lessons, slugs, levels) and the two local paths below; the writer writes those lessons, integrates them, gets the checks green and reports. Writers don't commit, push or edit `CLAUDE.md`.

Local paths the orchestrator fills in (outside the repo, never committed):
- `<JMDICT>`: `jmdict-eng-common-3.6.2.json`, extracted from `~/Downloads/jmdict-eng-common-3.6.2+20261012204142.json.zip`.
- `<KANJIDIC>`: `kanjidic2-en-3.6.2.json`, extracted from `~/Downloads/kanjidic2-en-3.6.2+20261012204142.json.zip`. Stroke counts and meanings: `characters.find(c => c.literal === "座").misc.strokeCounts[0]`, and `readingMeaning.groups[].meanings` with `lang === "en"`.
- `<SOURCES>`: the phase's saved JLPT lists (Bunpro and JLPT Sensei, by level).

The repo is on Windows with CRLF line endings: prefer the Edit/Write tools over shell text munging.

## Read first

1. The phase's brief (`docs/PLAN-jlpt-phase<N>.md`): the owner's rules. Accuracy over volume. Never invent usage.
2. `content/STYLE.md`, all of it. It is binding.
3. `content/types.ts`, `content/jlpt.ts`.
4. **The approved exemplar:** `content/lessons/n5-essentials.ts`, lesson `temo-ii`, and its topics in `content/grammar.ts` (group `n5-essentials`). Every lesson copies its structure and quality bar.
5. `<SOURCES>`.
6. Lessons written before yours (the same unit file, and earlier units): don't repeat their lines; you may use the forms they teach. Grep `content/lessons` and `content/grammar.ts` for your pattern first: 190+ topics already exist.

## Each lesson

Same order as the exemplar:

- `slug` (as given to you, never change it without saying why), `title` (plain English, **no kanji**), `mark` (short Japanese label), `summary`, `source` (the reference the rule was checked against: Genki I/II chapter, Tobira chapter, Bunpro's grammar point name, Tae Kim, or Makino & Tsutsui's *Dictionary of Basic / Intermediate Japanese Grammar*; only cite what you are confident covers the point), `register` (`polite` / `plain` / `both`), `kinds: ["grammar"]` (or `["verbs"]`), `jlpt: jlpt(level, disputed?)`.
- **idea**: one sentence.
- **"How it connects" table** (`caption: "How it connects"`): what the pattern attaches to (verb て form, plain non-past, た form, ない form, stem; い-adjective; な-adjective; noun), with a Japanese-only example cell per row. Japanese-only cells are word-spaced lines; cells mixing English and Japanese are prose (no word spaces in the Japanese).
- **Core examples**, highlighted with `{…}`: **at least 4 for every grammar point and every sub-pattern you tag as a topic**, natural everyday sentences, mixing polite and casual. About half carry `alt` (the same line in the other register, minimal change). A first examples block holds 3–5 lines (template test): split larger sets under headings. Use `note` for a one-line nuance.
- **pair**: the same sentence with one thing changed, ideally the look-alike pattern, and `diff` saying how the meaning shifts.
- **mistake callout**: ✗ the common mistake, ✓ the fix, why. Name the confusion.
- **dialogue** (2–4 lines, speakers named in English) or a **culture** callout when a dialogue would be forced.
- optional **tip** callout.
- **quiz**: 4–5 typed questions.
  - Fresh words: never a line or word pairing from this lesson's examples, never a line copied from another lesson.
  - When both registers fit, the prompt names the register ("Casual negative", "Polite").
  - **Prompts rule out other right answers**: name the pattern when another one fits ("With のに:", "keeping なら", "with する"), or list every right answer.
  - A reading question asks for kana and lists only kana answers.
  - List **every correct alternative**: full and contracted forms where the prompt allows (なきゃ / なければ), both `[電話|でんわ] する` and `[電話|でんわ] を する`, digits for counted numbers (3人); "Fix it" questions accept every correct fix. Nothing else is accepted, so a missing alternative marks a right answer wrong; an accepted wrong answer is an error too.
  - The checker already ignores spaces and punctuation, accepts kana for any kanji word, the ている contraction (てる, てた, てます…), and a keyboard's kanji for whole-word とき/こと/ところ/ほう/もの/ごろ/ため/わけ/はず/とおり/うち, すぎ → 過ぎ, ほしい → 欲しい, the helper verbs after a て form (見る, 置く, 行く, 来る, 上げる) and the keigo verbs 致し, 頂き, 仰る. Don't list those spellings.
  - Each has an `explanation`.
- Where you are not sure a sentence is natural, or that an answer list is complete, add `needsReview: "<the reason>"`. Don't guess, and don't flag what you are sure of.
- Two points share one lesson only where the contrast is the lesson.

## What reviewers kept finding (avoid them)

- Sub-patterns with fewer than 4 examples.
- Quiz prompts another pattern also answers; missing alternatives (contractions, を with する verbs, だ optional, the other register's spelling).
- Overclaims ("X replaces が", "only たら fits", "X is the usual way") where the truth is narrower.
- English that fits another pattern as well as the taught one: make the English carry the nuance ("I've gone and left…", "It's been decided that…", "I hear…").
- Unnatural or textbook-only lines (帰ったとき for a future promise, 分からなければ declared impossible): if unsure, flag it.
- Lines ending in `…。` (it prints as "...." in the romaji): end with … alone.
- Vocabulary above the level (N2 words in N3 points) unless the point needs it.
- A grammar verb written in kana (いく in わけにはいかない) that a keyboard turns into kanji: fold it narrowly in `lib/quiz.ts` (only right after the idiom's own words), or the right answer is marked wrong in the quiz, the cloze and the polite ↔ casual drills alike.
- Cloze cards another pattern fits (けど for のに, から for し, と for ば, ばかり for ところ, the plain polite verb for keigo): exclude the card in `content/cloze-exclusions.ts` with the reason, rather than accepting the other pattern in `CLOZE_ALSO`, so the card still tests the point. `CLOZE_ALSO` is for true variants the lesson teaches (よう/みたい, かも/かもしれない). Check every card against the look-alikes of its pattern, not only the obvious one: 間に for うちに ("while still …" cards), と for たびに (verb lines), あとで for た上で, ごとに for たびに on noun lines, 一方だ for ばかりだ.
- A suffix a keyboard writes in kanji (ごとに → 毎に, おきに → 置きに) is folded in `lib/quiz.ts` as a suffix after a number or noun, not as a whole word.
- A hard "only" rule ("ばかりだ is only for bad news") where the references say "mostly": write "usually" and don't mark the opposite as ✗.
- A ✗ in a mistake callout that is acceptable Japanese (私にとって、それはいいと思います, 会社の代表に話しました, ご飯に代わって…): make the ✗ a real error (友達にとって、料理を作りました), or say in brackets what it means instead ("says something else", "odd for a swap of things").
- An example whose logic doesn't show the pattern: にしては needs a result that clashes with the standard (busy roads on a Sunday, not quiet ones); check that the English "for a …" would surprise a speaker, and that a table row's pattern (verb + にしては) has an example line.
- A line that two readings fit when the English picks one (料理を作る代わりに: "instead of cooking" or "in return for cooking"): write the line so only the taught reading is possible.
- Quiz answers missing the optional extra particle (より も, 割に は, というより も) or the polite email forms (でしょう か, に なります か).
- A cloze gap that is all of a pattern where only one word teaches it: narrow the highlight to that word (に {比べて}, と {いえば}), keep the shared word outside, and add the true variants (比べる と, いう と) to `CLOZE_ALSO`. Don't narrow a gap until it tests nothing about the point (a bare ん in んだって).
- Pairs that change two things at once: say so in the `diff` ("a different sentence on purpose, to show the two jobs"), or change one thing.

## Japanese rules (STYLE.md has the full text)

- Markup: `[漢字|かんじ]` ruby, one group per word's run of kanji, okurigana outside, hiragana readings; `{…}` highlight; spaces are word boundaries in Japanese lines; `-` joins a name to its suffix (`[田中|たなか]-さん`).
- Every kanji in ruby, also in English prose. Only 常用 kanji and readings (`tests/joyo.test.ts`). Words everyday writing puts in kana stay kana (STYLE §5's list: formal nouns, ある/いる/できる/なる/ない, helper verbs after て, ください, いい/よい, かもしれない, そう/よう/みたい/はず, ごろ, ほう…). 明日 is あした.
- Word spaces: particles are their own words; です, だ and their forms are their own words; the explanatory ん is its own word (`[行|い]く ん です`), なん after nouns; verb and い-adjective endings stay attached; a helper verb after the て form is its own word; する verbs: `[勉強|べんきょう] する`. In English prose, Japanese has **no** word spaces.
- Punctuation: full width 。、？！「」…; ？ after questions (also after か); 〜 is U+301C; ー for long vowels.
- One line, one register (set by the last predicate). Gendered endings only where taught.

## Integration (you do it, then run the checks)

- **Unit**: a new unit goes at the end of `UNITS` in `content/units.ts` (slug, `kind: "grammar"`, title, a short `titleJp` in 常用 kanji with ruby, description) with `content/lessons/<unit-slug>.ts`. Otherwise append to the existing file. `KANJI_NUMERALS` goes to 十三; a unit beyond needs it extended.
- **Words**: every word of every Japanese line must resolve (`tests/words.test.ts`).
  - Prefer words already in `content/words/{nouns,verbs,describing,other}.ts`.
  - A new word goes into the fitting file with a short British-English meaning, the right verb class and a topic.
  - From `content/words/extra.ts`: move the line into the lesson lists.
  - From an expansion batch (`content/words/expansion/batch-*.ts`): replace its line with `// moved to the lessons (<unit>/<lesson>): <jmdict id> <jp>`, and add the id to `MOVED_TO_LESSONS` in `content/words/expansion/index.ts` (also for a candidate past the batches, which has no line to replace).
  - `npm run check-words -- "<JMDICT>"`: 20 known findings today (affixes, おばさん, ござる, 尊敬語, 謙譲語, もうすぐ…); a new one needs fixing or a reason.
  - A contracted or compound form that doesn't resolve: add minimal support in `lib/words.ts` beside the existing helpers, and a label in `FORM_LABELS` in `lib/lookup.ts`. Never edit `lib/conjugate.ts`, `lib/romaji.ts`, `lib/markup.ts` or the conjugation trainer; if the engine lacks a form, write the line so it doesn't need it, or report it.
- **Kanji**: each new kanji gets an entry at the end of `content/kanji.ts`: `k("座", ["sit","seat"], 10, ["[座|すわ]る"])`, stroke count from `<KANJIDIC>`, meanings trimmed for learners, one or two example words from `content/words`.
- **Grammar overview** (`content/grammar.ts`): one topic per point, in a group for your unit (`slug` = unit slug, `title` = unit title). Each topic: a unique `slug`, `pattern` (English placeholders, Japanese without word spaces, no 「」, never the word "dictionary": say "plain non-past verb"), `meaning`, `lesson`, `jlpt`, and 1–2 highlighted examples copied **verbatim** from the lesson, a polite/casual pair labelled with `register`.
- **JLPT level**: Bunpro first; a JLPT Sensei disagreement (another level, or not listed) goes in `disputed`. Tag the lesson (its main point) and each topic.
- **Placement**: a new unit gets two `PICKS` in `lib/placement-bands.ts` (quiz questions whose prompts don't give the answer away) and an updated `tests/placement.test.ts` (band count; inline snapshot via `-u`).
- **Drills** feed themselves. Exclusions and accepted variants as above; natural alternatives for the polite ↔ casual drill go in `content/register-also.ts` (card ids come from `lib/register-cards.ts`; re-derive them with a scratch script after changing a line). A line ending in a grammar word the register classifier reads as neutral (かも, かな, らしい…) may need adding to `registerOf` in `lib/cloze-cards.ts`.

## Checks

- `npx vitest run`. Expected snapshot changes: `tests/__snapshots__/corpus.txt` (only your lines added, nothing existing changed, romaji right), the cloze counts in `tests/cloze.test.ts`, the placement snapshot. Accept with `-u` only after reading the diff.
- `tests/word-lessons.test.ts`'s size ceiling may be raised in 4 KB steps; say so.
- A test failing only because words left the More words deck: report it, don't change it.
- Add no new tests. Don't weaken any other test; if one seems wrong, report it.
- `npx tsc --noEmit` and `npm run lint` clean. Don't run `npm run build` (the orchestrator does).
- Unrelated bugs go in `BACKLOG.md`.

## Report (your final message)

1. Lessons: slug, title, JLPT level and any dispute, core examples per point.
2. Existing coverage found by grepping, and how you linked or avoided it.
3. New words and kanji; words moved from the expansion or extra lists.
4. Every `needsReview` with its reason.
5. Points merged, split or skipped, with the reason.
6. Changes outside content (lib/words.ts, lookup labels, exclusions, register-also, test ceilings).
7. Test results (counts) and anything unresolved.
