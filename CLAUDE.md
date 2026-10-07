@AGENTS.md

## Progress

Plan: `docs/PLAN-features.md` (sub-phases A1–H3). Work happens on branch `features`; nothing merges into `main` unless the owner asks, and hosting/protection settings stay untouched. No deploys unless the owner asks.

Content rules: `content/STYLE.md`. Before changing the reading engine (`lib/romaji.ts`, `lib/markup.ts`), read its §6: the corpus snapshot must stay unchanged unless the change is the point.

### Built
- **Phase 0 (2026-10-07):** repository audit and feature plan. No code changes.
- **A1 Style guide and reading safety net (2026-10-07):**
  - `content/STYLE.md` rewritten: furigana, kana vs kanji (checked against the official 常用漢字表 text), the romaji scheme, word spaces, punctuation, registers, the lesson template and the review process.
  - `lib/corpus.ts` walks every Japanese line. `npm run dump [-- unit|lesson]` prints the reviewers' dump (location, Japanese, reading, romaji, English). `scripts/ts-paths.mjs` lets Node run TypeScript scripts with the app's `@/` imports.
  - `tests/golden-readings.test.ts` pins the romaji scheme case by case. `tests/__snapshots__/corpus.txt` pins every line's reading and romaji (accept a reviewed diff with `npm test -- -u`).
  - Reading engine:
    - A kanji word read は/へ/を (歯, 葉) is no longer read as a particle. Proven by an unchanged snapshot.
    - ・ separates words, and 『』 become quotes.
    - Name hyphens come from an explicit `-` in the markup (`[田中|たなか]-さん`), hidden in Japanese, instead of a guess. Family words now read okaasan, not okaa-san, and titles read yamada-sensei.
  - New content checks: readings in hiragana, full-width punctuation in sentences, 〜 and ー written correctly, no half-width kana or full-width digits, stacked particles written separately, names joined with `-`.
  - Content fixes (each shows in the snapshot diff):
    - 寿司 → すし, お腹 → おなか, 相槌 → あいづち: these readings and kanji are not 常用.
    - Word spacing: よくない, 静か な, ません でした, 一緒 に, そう なん だ.
    - Set greetings written as one word: いってきます, いってらっしゃい, おかえりなさい.
    - Names joined with `-` in 9 lines; one grammar note corrected (よい is still the usual written form).

### Decisions
- Owner's answers, 2026-10-07 (plan §7):
  - Q1: four furigana modes, kana-only by default.
  - Q2: long vowels spelled out (kyou).
  - Q3: kanji trainer on JLPT N5, then N4, from Jonathan Waller's lists.
  - Q4: JMdict + KANJIDIC2 + KanjiVG + wordfreq; about 2,000 extra words; no Tatoeba.
  - Q5: the inspector resolves inflected forms through the engine.
  - Q6: no deploys.
  - Q7: reviewers on Opus 5.5.
- A1 house choices, recorded in STYLE.md:
  - 明日 is read あした. This is the only exception to the 常用 table, which lists only あす.
  - ください, いい and よい are always written in kana.
  - Questions take ？, also after か.
  - Dialogue uses a single … for trailing off.
  - Examples write numbers as kanji with ruby.
  - Names join their suffix with `-`.
  - Stacked particles are written separately (で は).

### Numbers
- 9 units, 62 lessons, 536 Japanese lines (287 example, pair and dialogue sentences, 136 with a highlight), 897 ruby tokens, 244 distinct kanji, 208 kana cards, 0 quizzes.
- Tests: 120 in 5 files.

### How it was checked
- `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`.
- The は/へ/を fix was run against the corpus snapshot taken before it: no line changed. Every later snapshot change was read line by line; Japanese text is unchanged except for the content fixes above.
- Browser: name lines in kana, furigana and kanji modes show no hyphen in the Japanese and tanaka-san / yamada-sensei in the romaji. Console clean.
- Review: a fresh Opus 5.5 reviewer checked STYLE.md, the changed lines and the golden values. All findings were applied:
  - 3 errors, including the は and は・が marks, which romanised wrongly (marks are now labels without romaji);
  - 10 should-fix items;
  - every polish item. The single … was kept as a stated house choice.

### Waiting on the owner
- Pitch accent: blocked on audio from a native speaker. No speech synthesis.
- JLPT N5/N4 lists: Jonathan Waller's site (tanos.co.uk) was unreachable on 2026-10-07. Its licence (reportedly CC BY) is to be confirmed before the download in D1.
