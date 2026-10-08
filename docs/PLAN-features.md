# Nihongo Path: feature plan (Phase 0)

> Status: the owner answered the questions in section 7 on 2026-10-07 and said go. Progress is tracked in `CLAUDE.md`.

## Context

Nihongo Path is a working static study app: 9 units, 62 example-first lessons, kana charts and a Leitner kana drill. You want the feature set from your Persian app (furigana-style display modes, register pairs, a dictionary, trainers, a review queue, polish) adapted to Japanese. Accuracy comes first, and every content unit gets an independent review. This document covers what exists, what each feature needs, the order to build it in, and the decisions I need from you.

## 1. What's in the repo now

- **Stack:** Next.js 16.3.6 (App Router, `output: "export"`), React 19.2, Tailwind 4, TypeScript, Vitest 5, ESLint 9. Next 16 differs from my training data, so before each phase I read the guide in `node_modules/next/dist/docs/` (`scripts.md`, `static-exports.md`, `fonts.md`).
- **Routes:** `/`, `/learn/[unit]/[lesson]` (62 pages built from `generateStaticParams`), `/kana`, `/kana/drill`.
- **Content model:** lessons are data. `content/types.ts` defines the `Block` union (idea, heading, text, examples, pair, table, callout, dialogue, link). `content/lessons/<unit>.ts` holds the lessons and `content/units.ts` sets the order. Markup: `[漢字|かな]` for ruby, `{…}` for the highlight, spaces as word boundaries.
- **Numbers today:** 287 Japanese lines, 136 of them with a highlight. 900 ruby tokens covering 249 distinct kanji. 208 kana cards. 0 quizzes. 3 test files (`tests/content.test.ts`, `romaji.test.ts`, `srs.test.ts`).
- **Logic:** `lib/markup.ts` is the parser, `lib/romaji.ts` generates modified Hepburn from the kana, and `lib/srs.ts` is a pure Leitner scheduler with row unlocking. `lib/storage.ts` wraps localStorage behind a `useSyncExternalStore` store. `lib/stores.ts` holds the `np:settings`, `np:progress` and `np:srs` stores, which are unversioned.
- **Deploys:** Vercel project `nihongo-path`. It isn't linked to git, so I deploy by hand through the Vercel MCP. `CLAUDE.md` is just `@AGENTS.md`, and `next dev` rewrites AGENTS.md.

**Problems found during the audit** (each is fixed in the sub-phase named in brackets):
1. Display settings only apply after hydration. The server HTML always renders kana-only, so anyone using a different mode sees a flash. [A4]
2. Japanese text inside `Rich` and `Cell` (prose and table cells) has no `lang="ja"`, which affects font glyph choice and screen readers. [A3]
3. Romaji: a kanji word whose reading is は/へ/を (歯, 葉) would be read *wa/e/o*. No current line triggers this, but the dictionary will. [A1]
4. Dark mode only follows the OS setting; there's no way to override it. [A4]
5. The fonts: two Google Japanese families × 6 weights produce **730 font files (18 MB)** in `out/_next/static/media`. The browser only fetches the slices it needs, but nobody has measured how many that is. [H1]

## 2. Feature audit

| # | Feature | Status | Files involved now | Sub-phase |
|---|---|---|---|---|
| 1 | Lesson template | **Partly.** Idea, examples, pair, mistake/culture callout, dialogue and `source` all exist. Missing: quiz block, register tag, per-lesson kinds tags (kind is set per unit today), a test that enforces the template. 38 pair blocks across 62 lessons (none in katakana), 0 quizzes | `content/types.ts`, `content/lessons/*.ts`, `components/lesson/LessonRenderer.tsx`, `tests/content.test.ts` | B1–B5 |
| 2 | Furigana modes | **Partly.** Full readings are authored, and a test forbids bare kanji. Modes are kana/furigana/kanji, chosen in React after hydration; there is no "unlearned only" mode | `components/Jp.tsx`, `components/DisplaySettings.tsx`, `lib/stores.ts`, `app/globals.css` | A4, E2 |
| 3 | Polite ↔ plain pairs | **Partly.** Only as `pair` blocks (e.g. `start/polite-and-casual`). No field for the second register, no "shown beneath" rendering, no check against mixing | `content/types.ts`, lessons | B1 (schema), B2–B5 (content) |
| 4 | Display settings | **Partly.** Furigana mode and romaji are stored in localStorage and applied after paint. No text size, typeface or theme | `components/DisplaySettings.tsx`, `lib/stores.ts`, `app/layout.tsx` | A4 |
| 5 | Word inspector | Missing (there's no dictionary and no kanji data) | — | D2 |
| 6 | Reading view | Missing | — | F2 |
| 7 | Grammar overview | Missing | — | F1 |
| 8 | Kana + kanji trainers, tracing | **Kana done well:** Leitner boxes 1–5, row unlock, practice mode, charts. Kanji trainer, tracing, print sheets and KanjiVG are missing | `lib/srs.ts`, `content/kana.ts`, `components/kana/*` | E1–E3 |
| 9 | Conjugation engine + trainer | Missing. Verb forms are hand-typed tables in the lessons | `content/lessons/verbs.ts` | C1, E4 |
| 10 | Vocabulary deck | Missing | — | E5 |
| 11 | Cloze | Missing (136 candidate lines today) | — | E6 |
| 12 | Polite ↔ plain drill | Missing | — | E7 |
| 13 | Mistake notebook | Missing | — | E1 |
| 14 | One review queue | Missing (`KanaDueBadge` only counts kana) | `components/kana/KanaDueBadge.tsx` | E8 |
| 15 | Placement check | Missing (it needs the lesson quizzes first) | — | E9 |
| 16 | "Type it" game | Missing | — | E10 |
| 17 | Today card | **Partly.** `ContinueCard` and `KanaDueBadge` exist. Goal ring, streak, word of the day, era date and the mistake count are missing | `app/page.tsx`, `components/Progress.tsx` | F4 |
| 18 | Search | Missing | — | F3 |
| 19 | Dictionary page | Missing | — | D1, D3 |
| 20 | Expansion from free sources | Missing | — | G1–G2 |
| 21 | Big lists out of the HTML | Not needed yet. The home page already sends only path summaries; keep that pattern | `app/page.tsx` | D3 onward |
| 22 | Design system | **Partly.** Colour tokens with a Tailwind `@theme`, OS-driven dark mode, a focus ring, the hanko. Missing: type, spacing and radius tokens; shared Button/Chip/Panel/Feedback components (styles are repeated inline, and Chip lives inside PathBrowser); a theme override; `line-break: strict`; `lang="ja"` in prose | `app/globals.css`, all components | A3, H2 |
| 23 | Performance | Never measured (see problem 5) | `app/layout.tsx` | H1 |
| 24 | Accessibility sweep | **Partly.** Focus ring, reduced motion for the two animations, aria on chips and the switch. No sweep script | — | H2 |
| 25 | Backup/restore + offline | Missing. Stores are unversioned | `lib/storage.ts` | A2 (envelopes), H3 |

**Already done well, kept as is:** kana charts; the Leitner core (`schedule`, row unlock); the romaji engine (it gets tests and one fix, no rewrite); lessons as data; content-integrity tests (extended, not replaced); the hanko, the continue card; the static export with no backend.

## 3. Adapting to Japanese: what changes and what's skipped

- **Vowel-mark modes become furigana modes.** Japanese also needs a fourth mode the Persian app didn't: **kana only**, where kanji are replaced by their reading. That's today's default, and it's how a beginner reads everything (Q1).
- **Spoken ↔ written becomes polite ↔ plain** (です/ます vs だ and plain forms). Both registers are spoken; plain is also the neutral written style. Written である style is out of scope at this level.
- **Mixed registers:** in Japanese, subordinate clauses are plain by grammar (降ったら、行きません). So the "no mixing" check only looks at sentence-final predicates.
- **Readings with several candidates** (今日 きょう/こんにち, 一日, 上手): every ruby reading is written per occurrence, dictionary entries are keyed by (written form, reading), and decks accept only the readings listed for that meaning. Jukujikun (今日, 大人, 一人) stay one ruby group; their kanji breakdown says the reading belongs to the whole word, not to each kanji.
- **Romaji is generated, never typed.** Q2 decides the scheme; it's pinned by golden tests and a snapshot of the whole corpus.
- **Tracing:** no automatic stroke grading. Stroke recognition is unreliable, so the trainer shows the stroke-order animation and a free tracing canvas, and the learner compares by eye.
- **"Type it" and typed answers use the IME:** the checker waits for `compositionend`, applies NFKC (half-width ｶﾅ → カナ), and treats the ideographic space and 。、！？ explicitly. Romaji typed as an answer isn't accepted, since the spec says kanji or kana; learners use a Japanese keyboard.
- **Katakana words typed in hiragana** (たくしー for タクシー) count as a miss with a named reason ("this word is written in katakana").
- **Era date** comes from `Intl.DateTimeFormat("ja-JP-u-ca-japanese", { era: "long", … })`, e.g. 令和8年10月7日(水).
- **Reading view:** the haiku and the story can be set vertically (`writing-mode: vertical-rl`), in CSS only.
- **Skipped:** heritage-learner notes (as you asked). Pitch accent is blocked on audio from a native speaker; no speech synthesis. It goes into "Waiting on the owner" in A1.

## 4. Build order: small, shippable sub-phases

Rules for every sub-phase: one commit and push to `features`; checks pass before committing (`npm test`, `npm run typecheck`, `npm run lint`, `npm run build`); the CLAUDE.md progress section is updated in the same commit. Any UI change is checked in the built-in browser at 375 px, light and dark: no horizontal scroll, a visible focus ring on every Tab stop, a clean console.

### A. Foundations

| Sub-phase | What ships | Tests added |
|---|---|---|
| **A1 Style guide + reading safety net** | `content/STYLE.md` rewritten. It covers: furigana (one ruby group per kanji run, okurigana outside, jukujikun as one group); the romaji scheme (Q2); kana vs kanji (常用漢字 only; こと/もの/とき/ください/いる/ある/できる/ちょっと stay in kana; no rare kanji); punctuation (full-width 。、「」！？, 〜 U+301C, half-width digits, no spaces in rendered Japanese); registers (what counts as polite or plain, sentence-final rule, alt lines); originality and sources; pitch accent blocked. `scripts/dump-corpus.ts` prints every line as location / Japanese / reading / romaji / English, and serves as the reviewers' printed dump. Fix: a word that contains ruby is never read as a particle. CLAUDE.md progress section and "Waiting on the owner" | `tests/golden-readings.test.ts` pins long vowels (おう/おお/えい/いい, ー), っ (kk, tch, word-final), ん before a vowel or y (n') and before b/m/p, は/へ/を as particles vs inside words, 歯 → ha, ぢ/づ, ヴ/ティ/ファ, こんにちは, name-suffix hyphens. `tests/corpus.test.ts` snapshots every line's reading and romaji: **any engine change shows up as a before/after diff over the whole corpus.** The fix must leave the snapshot unchanged |
| **A2 Versioned stores** | `lib/envelope.ts` (pure): `{v, data}` envelopes with a migration chain per store; legacy raw values are read as v0. `lib/storage.ts` switches over, keeping the same `np:*` keys and the same visible behaviour | Legacy → v1 migration for all three stores; a future version or corrupt JSON falls back safely; write → read round trip |
| **A2b Path tabs** (owner request, 2026-10-07) | The path shows one unit per tab instead of one long list. The tab you open first is the unit of your next unfinished lesson, and your last choice is remembered (path-filter store v2, migrated from the kind filter). `/#unit` links (the lesson breadcrumb) open their tab. The kind chips are gone | Pure `currentUnit`/`selectedUnit`/`tabIndexAfterKey`; the v1 → v2 migration |
| **A3 Design system core + fresh look** (owner request: "nice and fresh") | Tokens in `globals.css` (colour, type scale, spacing, radius, motion). `components/ui/{Button,Chip,Panel,Feedback}.tsx`. Existing components move onto them (PathBrowser, KanaDrill, Progress, DisplaySettings). Japanese runs inside `Rich`/`Cell` get `<span lang="ja">`. `line-break: strict` on Japanese | `lib/markup.ts` `langRuns()` split test; render tests that Rich/Cell output carries `lang="ja"` |
| **A4 Display settings before paint** | Settings: furigana mode (Q1), romaji on/off, size S/M/L, typeface gothic/mincho (default mincho, today's look), theme system/light/dark. An inline `<head>` script reads the `np:settings` envelope and sets `data-furigana`, `data-romaji`, `data-size`, `data-font` and `data-theme` on `<html>` before first paint; on any error it falls back to the defaults. `Jp`/`Rich`/`Cell` render every variant into the HTML (ruby with rt, a kana-only span, word spaces, the romaji line), and CSS picks which to show. `Jp` stops subscribing to the store, so lesson pages ship less JS. The plumbing for "new kanji only" goes in here; the mode itself turns on in E2 | Pure `settingsToAttributes()`; the head script tolerates missing or corrupt storage; the furigana-CSS generator (input: learned kanji; output: one rule per unlearned kanji); server-render test that one `Jp` contains every variant. Browser: reload with non-default settings and confirm no flash and that the `<html>` attributes are set before hydration |

### B. Lesson template (with C1 slotted in between B3 and B4)

| Sub-phase | What ships | Tests added |
|---|---|---|
| **B1 Schema, quiz, register lines** | `Lesson.register` (polite/plain/both). `Lesson.kinds[]`: used by search and the grammar overview (the path itself is unit tabs since A2b); the unit `kind` stays for grouping. `Example.alt` / `DialogueLine.alt` hold the other register, shown beneath. A `quiz` block with 3–5 typed questions, each with accepted answers and an explanation; the quiz accepts the kanji or kana form of each accepted answer (NFKC, trailing punctuation ignored). `lib/template.ts` (pure) checks: one-line idea first; core examples with 3–5 items, each highlighted; at least one contrast pair; a ✗/✓ mistake callout; a dialogue or culture note; a quiz; plus `source`, `register` and `kinds`. Exemptions are written in the lesson with a reason. `content/retrofit-pending.ts` lists lessons not yet converted. `lib/register.ts` (pure, heuristic) classifies sentence-final predicates | `template.test.ts` enforces the template on every lesson not on the pending list, and fails if a listed lesson already passes, so the list can only shrink. `register.test.ts` gives the classifier golden cases and checks that no line mixes registers (unless allowed with a reason) and that each alt is the opposite register of its line. A quiz checker test |
| **B2 Retrofit:** Start here, Hiragana, Katakana, Word order (15 lessons; done 2026-10-08) | Quizzes; the missing pairs, mistakes and dialogues/culture notes; register and kinds tags; alt lines. Kana lessons quiz by typing the reading in romaji (`answerIn: "romaji"`) and use culture notes for “in real conversation” | The pending list shrinks; corpus snapshot updated, with the diff reviewed |
| **B3 Retrofit:** Particles (14; done 2026-10-08) | Same | Same |
| **C1 Conjugation engine** (done 2026-10-08) | `lib/conjugate.ts` (pure). Input: dictionary form and class (godan, ichidan, する, くる, plus する-compounds). Exceptions: 行く→行って/行った, ある→ない, 問う→問うて, いらっしゃる/くださる/なさる/おっしゃる/ござる → 〜います. Adjectives: i-adjectives (いい→よく…) and na-adjectives. Forms: polite/plain × affirmative/negative × non-past/past, て, potential, volitional, passive, causative, ば, たら, the commands in common use (〜なさい, 〜て/〜てください, plain imperative and the な prohibitive, each marked with its register). Forms a word lacks are marked with a reason (e.g. no potential of ある, できる or わかる; no volitional or plain imperative of わかる). Results come as kana + kanji pairs, so furigana is preserved | `tests/conjugate.test.ts`: golden tables **I type by hand**, about 15 verbs and 6 adjectives covering every class and exception. `lesson-tables.test.ts` checks that every conjugation table cell in the verbs and grammar lessons matches the engine |
| **B4 Retrofit:** Core grammar + Verbs (17; done 2026-10-08) | Same; the verb tables are now cross-checked by the engine | Same |
| **B5 Retrofit:** Suffixes + Culture (15) | Same. The pending list is now empty | Same |

### D. Words and kanji

| Sub-phase | What ships | Tests added |
|---|---|---|
| **D1 Lesson dictionary + kanji data** | `content/words/*.ts`: every word used in the lessons, with written form, reading, meaning, part of speech and verb class, topic and the lessons it appears in. `content/kanji.ts`: the lesson kanji plus the N5 and N4 kanji (Q3), with on/kun readings, meanings, 常用 status from KANJIDIC2, and one or two example words per kanji for the trainer (lesson words first, otherwise common JMdict words I choose). I choose the meanings; a Sonnet agent formats batches from my spec; a fresh reviewer checks every batch | Coverage: every word token in the lessons resolves to an entry, an engine form, or the function-word list. Every (form, reading) pair in a lesson matches an entry. Every kanji in the lessons has data and is 常用. **Every ruby reading is checked against the 常用漢字表:** it splits into 常用 readings of its kanji (allowing rendaku and っ), or it is a 付表 word, or it is on the STYLE.md exception list (明日 あした). Readings are kana only |
| **D2 Word inspector + kanji pages** | A popover on a word in a lesson or the dictionary: reading, meaning, kanji breakdown (each kanji's readings and meaning, linked). The match is exact on (written form, authored reading); inflected forms match through an engine-generated reverse index (Q5). For keyboard users, each Japanese line is one Tab stop and the arrow keys move between words, so hundreds of extra Tab stops are avoided. `/kanji/[char]` is static. The dictionary JSON is fetched on the first tap | Pure `lookup()`: exact hits, inflected hits ("polite past of 食べる"), no fuzzy hits, and 今日 resolves by reading |
| **D3 Dictionary page** | `/dictionary`: search by kanji, by kana (hiragana and katakana treated alike), by lenient romaji (kyo/kyou/kyō, si/shi, nn/n) or by English; filters for topic, source (lesson or expansion) and starting kana row; ★ "My words" with CSV export (UTF-8 BOM). **Feature 21:** the data is a static JSON file from a `force-static` route handler, fetched when the browser is idle, and the list grows in batches inside `startTransition` | Romaji normaliser, search ranking, filters, CSV escaping, the batch-growth reducer |

### E. Practice

| Sub-phase | What ships | Tests added |
|---|---|---|
| **E1 SRS generalised + mistake notebook** | A deck registry: each deck has `cards`, a prompt, `check → {correct, canonical, note}` and its own Leitner state. The kana state is migrated with its schedule unchanged (an A2 migration). Notebook store: every trainer and quiz reports misses, and an item leaves after two right answers in a row | Migration preserves every kana card's box and due date; deck-agnostic `nextCard`; notebook enter/leave rules |
| **E2 Kanji trainer** | The N5 kanji, then the N4 kanji, from Jonathan Waller's lists (Q3), in groups of 10, each group opening when the earlier ones are learned (box ≥ 3). Card: a kanji inside an example word (学 in 学生); type the word's reading in kana. That's exact and never fuzzy, and the meaning is shown afterwards. **"Furigana on new kanji only" goes live**, driven by the learned set | Group unlock, checker, and learned set → CSS rules |
| **E3 Stroke order and tracing** | KanjiVG paths for kana and the lesson kanji (kana coverage verified on download) turned into small per-character JSON files. Stroke-order animation (reduced motion shows numbered strokes instead), a free tracing canvas, printable A4 sheets via print CSS. KanjiVG credited on these pages | Extraction script output (stroke counts against KANJIDIC2), the print-layout builder |
| **E4 Conjugation trainer** | Asks one random form of a learned verb or adjective. Each form type links to its lesson. A wrong answer that is another form gets named ("That's the plain past") | Pure `identifyForm()`; question generator never asks a form the word lacks |
| **E5 Vocabulary deck** | English → typed Japanese. Accepts the kanji form or the kana reading, ignores half-width/full-width, and tells the learner which form they typed. A card joins when its lesson is marked done | Checker (kanji, kana, width, katakana-vs-hiragana note, multi-reading words); joining on lesson completion |
| **E6 Cloze deck** | Every highlighted example line becomes a fill-the-gap card, with the English as a hint. Alternative answers are accepted only from reviewed data or the engine. Cards are left out by rule (a contrast-pair line where the other side also fits; a highlight covering most of the line; kana lessons) or by hand in `content/cloze-exclusions.ts` with a reason | Builder: card count and every exclusion with its reason; checker |
| **E7 Polite ↔ plain drill** | Two decks, one per direction, built from the `alt` pairs. Convert a whole sentence; punctuation is ignored; engine variants are accepted (ません/ないです); feedback names the first word that differs, using the authored word boundaries | `diffFirstWord()`, variant acceptance |
| **E8 One review queue** | Everything due across decks, most overdue first, then the notebook. Each item is asked with its own deck's prompt and checker and scheduled in its own deck. The home badge shows the total | Merge order; scheduling stays per deck |
| **E9 Placement check** | Two questions per band (band = unit, kana excluded: 7 bands, 14 questions), taken from the lesson quizzes. The first band with two misses is where to start; a single miss is a slip. Offers to mark earlier lessons as finished | Pure `placement()` over miss patterns |
| **E10 "Type it" game** | Copy-type a line through the IME. The target is either kana or kanji (the learner picks). Feedback is specific: an extra or half-width space, 、 vs ",", the wrong kanji choice | IME-aware comparer cases |

### F. Reading and reference

| Sub-phase | What ships | Tests added |
|---|---|---|
| **F1 Grammar overview** | `/grammar`: one topic per construction, each linked to its lesson. Examples are copied verbatim from the lessons | Every topic example appears verbatim in its lesson; every grammar, particle and verb lesson has at least one topic |
| **F2 Reading view** | `/read`: a sign, a menu, a LINE-style chat, a news headline, a short story (all original) and haiku by Bashō and Issa (public domain; the edition the text and reading were checked against is named, and anything I can't verify goes to "Waiting on the owner"). Furigana is hidden by default with a "show readings" toggle; each line reveals its romaji and translation. CSS-only styling. Reviewed like a lesson | Card builders never import reading texts; markup and corpus tests cover them |
| **F3 Search** | `/` or Ctrl/⌘K opens a dialog that is lazy-imported, with a lazy JSON index (lessons, kanji, words) | Index builder, ranking, the shortcut ignores keystrokes typed in inputs |
| **F4 Today card** | Reviews due, mistakes waiting, a daily goal ring (5/10/20 answered items), the streak (days the goal was met), the word of the day (index = day × step mod N, with step coprime to N so every word appears once per cycle), and today's date with the era from `Intl` | Stride covers all N; streak and goal logic; era formatting at a fixed date |

### G. Dictionary expansion (after Q4)

| Sub-phase | What ships | Tests added |
|---|---|---|
| **G1 Source pipeline** | `scripts/expand/`: rank by wordfreq, keep words JMdict marks common, turn word forms into dictionary words, drop names, profanity, fragments and particles, and output a candidate list. A refresh script diffs our entries against the latest JMdict (EDRDG asks for regular updates). I ask before each download, with file name, source and size | Lemmatiser and filter fixtures |
| **G2…Gn Batches** (about 250 words each, target in Q4) | A Sonnet agent writes entries (reading, meaning, topic) from my spec; the checker runs until it passes; a fresh reviewer reads each batch. Credits go on the dictionary page and in the footer of every screen that shows this data | Checker: reading in kana, written form in 常用 kanji, no duplicate (form, reading), topic from the allowed list |

### H. Polish

| Sub-phase | What ships | Tests added |
|---|---|---|
| **H1 Performance** | `scripts/perf-ab.mjs`: two local production builds, Lighthouse runs interleaved A/B/A/B, medians reported. Then the fonts: subset to the characters the content uses (the set is known at build time), preload only fonts used at first paint, load mincho lazily if it's only used for examples | The charset extractor; perf numbers recorded in CLAUDE.md |
| **H2 Accessibility sweep** | `scripts/a11y-sweep.mjs` (Playwright) visits every route at 375 px in light and dark and checks: no horizontal scroll; every Tab stop has a visible focus ring (computed outline or shadow); no running animations under reduced motion. Final design-system pass. Lighthouse accessibility 100 | The sweep runs in CI-style mode and fails on any finding |
| **H3 Backup, restore, offline** | Export and import every `np:*` store as one versioned file (validated, then migrated). A hand-written service worker produced by a `force-static` route (precache the shell and data JSON, network-first for HTML), with no hosting config changes | Export → import round trip across every store; a v0 file imports correctly; the service-worker manifest builder |

That makes 32 sub-phases, with G2 repeating once per word batch. The order follows the dependencies: the tokens and display system come before any new UI; the engine comes before the verb retrofit, the inspector and the drills; the dictionary before the vocabulary deck, search and the Today card; quizzes before placement.

## 5. Ways of working

- **Review:** after each content unit (B2–B5, D1 batches, F1, F2, G batches), a fresh reviewer agent on the strongest model (Q7) gets the content file, the `dump-corpus` output for it, and STYLE.md. It reports errors, should-fix items, polish and can't-verify items, and edits nothing. I apply every finding or record why not in the commit message and CLAUDE.md; can't-verify items go to "Waiting on the owner".
- **Delegation:** Sonnet agents handle structured work: formatting data from my spec, KanjiVG and KANJIDIC extraction, checker loops, mechanical moves onto the design system. I keep the judgement: STYLE, examples, quizzes, meanings, golden tables, the engine, triaging reviews. Parallel agents each own one file and use their own scratch folder.
- **Git:** one branch, `features`, with a commit and push per sub-phase. Nothing merges to `main`, and no hosting or protection settings change.
- **CLAUDE.md progress section** (below `@AGENTS.md`): what was built, decisions, numbers (lessons, quiz questions, cards per deck, words, kanji, tests), how it was checked, Waiting on the owner.
- **Asking first:** each data download and each new devDependency that pulls large binaries (Playwright with Chromium, Lighthouse).

## 6. Data sources and licences (feature 20, also used by D1 and E3)

| Source | What we'd use | Licence | What it obliges us to do |
|---|---|---|---|
| **JMdict** (EDRDG), via the jmdict-simplified JSON builds | Headwords, readings, alternative spellings, part of speech, "common" priority tags. Glosses only to check the meanings we write | CC BY-SA 4.0 (EDRDG licence) | Credit on **every screen** that shows its data (a footer line); derived data stays CC BY-SA; EDRDG asks for a procedure to keep the data current (monthly for web dictionaries), hence the G1 refresh script |
| **KANJIDIC2** (EDRDG) | Kanji readings, meanings, grade, stroke count | CC BY-SA 4.0 plus extra conditions in section 8 (I read them before use; we only need readings and meanings) | Same as JMdict |
| **KanjiVG** (Ulrich Apel) | Stroke paths and stroke order | CC BY-SA 3.0 | Credit on the tracing pages; the extracted paths stay CC BY-SA 3.0 |
| **wordfreq** (Robyn Speer) | Japanese frequency ranking, to choose which words to add | Data CC BY-SA 4.0, code MIT | Credit. The data is frozen at about 2021 (project sunset), which is fine for ranking |
| **Tatoeba** | Example sentences | CC BY 2.0 FR (some CC0) | Credit each sentence's author. Quality varies. **Recommended: skip.** Examples stay original |

Our lessons stay yours. The dictionary and kanji data files carry a CC BY-SA notice, and a `/credits` page lists every source.

## 7. Decisions (answered 2026-10-07)

| # | Question | Answer |
|---|---|---|
| Q1 | Furigana modes | **Four modes, kana only by default:** Kana only · Furigana · Furigana on new kanji · No furigana |
| Q2 | Romaji scheme | **Keep long vowels spelled out** (kyou, koohii). No reading changes |
| Q3 | Kanji trainer set | **JLPT N5, then N4**, from Jonathan Waller's lists (tanos.co.uk), the de facto standard; the JLPT has published no official lists since 2010. The licence (reportedly CC BY) is confirmed and credited before the download. The trainer needs an example word for every kanji, which D1 provides. Lesson kanji outside N5/N4 keep their furigana in "new kanji" mode |
| Q4 | Data sources | **JMdict (jmdict-simplified) + KANJIDIC2 + KanjiVG + wordfreq, skip Tatoeba, about 2,000 extra words.** CC BY-SA terms and the refresh script as in §6 |
| Q5 | Inflected words in the inspector | **Yes:** exact match against the engine's generated forms |
| Q6 | Deploys | **None.** A preview deploy of `features` only when asked; production untouched |
| Q7 | Reviewer model | **Opus 5.5** |

Decisions I've taken that you can overrule: retrofit all 62 lessons to the template (placement needs their quizzes); one branch, `features`; the kanji card is "reading of this kanji in a lesson word"; the streak counts days the goal was met; katakana words typed in hiragana count as a miss with the reason named; no stroke grading.

## 8. Verification (every sub-phase)

1. `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` all green. The corpus snapshot diff is reviewed whenever it changes, and must be empty for any change to the reading engine.
2. UI sub-phases: the built-in browser (`.claude/launch.json` → `dev`) at 375 px, light and dark: no horizontal scroll, visible focus on every Tab stop, a clean console, settings survive a reload with no flash.
3. Content sub-phases: the fresh reviewer's findings are applied and logged; can't-verify items go into CLAUDE.md.
4. Commit and push to `features`; CLAUDE.md numbers updated.
