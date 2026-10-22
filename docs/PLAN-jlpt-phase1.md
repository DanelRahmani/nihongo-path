# JLPT Phase 1: the N5 gaps and N4 grammar

A brief for a fresh session. Read this file, then `CLAUDE.md` (Progress: Next, Decisions, Waiting on the owner), `AGENTS.md`, `content/STYLE.md` (all of it; §6 before touching `lib/romaji.ts` or `lib/markup.ts`) and `docs/EXPORT_FORMAT.md`. Then work through the steps below. Stop at the end of the phase and report; Phase 2 (N3) starts only when the owner says so.

## The owner's goal and rules

The owner is extending Nihongo Path so its grammar covers JLPT N5 up to and including N2, in the same style and quality as the existing 62 lessons, with every new point wired into the existing drills. Phase 1 covers what the app lacks at N5 and all of N4. Phases 2 (N3), 3 (N2) and 4 (an LLM sentence checker) come later.

Rules, from the owner:

1. **Follow the existing conventions exactly:** the same data format, the same lesson template (`content/STYLE.md` §10), tone, and display options (kana/furigana/kanji, romaji). Add no new libraries without asking.
2. **Don't break progress.** Existing lesson ids, slugs and saved data keep working. Any stored shape that changes gets a migration (`lib/schemas.ts`, `lib/envelope.ts`).
3. **Accuracy matters more than volume.** For each grammar point give:
   - the pattern, its meaning, how it connects (which forms it attaches to), its register, and the common confusions with similar patterns;
   - at least 4 natural example sentences with English, mixing polite and casual where natural;
   - vocabulary at or below the point's level.
4. **Tag each point with its JLPT level.** Lists are unofficial and disagree: record the reference used, and flag disputed points.
5. **Never invent usage.** If a sentence's naturalness is uncertain, flag it in a `needsReview` field rather than guessing.
6. **One commit per phase.** At the end: lint, type-check, tests, production build; fix failures; then report what was added, counts per level, every `needsReview` item, and anything skipped.
7. **Stay in scope.** Unrelated bugs or refactors go in `BACKLOG.md`, not into this phase's diff.
8. **Keep new tests to an absolute minimum** (owner, 2026-10-21). The existing content tests already check every new lesson; add a test only where this brief says so.

Project rules that also apply (CLAUDE.md, memory):

- Work on branch `features`. Run `git fetch` first and confirm local `features` equals `origin/features`. Never push `main` (it deploys the live site) unless the owner asks.
- Check every UI change at 375 px in light and dark.
- Have each unit's content reviewed by a fresh Opus 5.5 subagent (one per unit, in parallel) before the phase ends, and apply its findings.
- Haiku subagents may do mechanical passes (romaji typed by hand in prose, counting).

## How the app is built (what Phase 1 plugs into)

- **Lessons** are data: `content/lessons/*.ts`, one file per unit, typed by `content/types.ts` (`Lesson`, `Block`, `Example`, `QuizQuestion`). Units and their order are in `content/units.ts` (`UNITS`, `ALL_LESSONS`, `KANJI_NUMERALS`). A lesson's id is `unit/lesson`.
- **The lesson template** (STYLE §10, `lib/template.ts`, `tests/template.test.ts`): idea, highlighted core examples with `alt` lines in the other register, a one-change `pair`, a `mistake` callout, a `dialogue`, a typed `quiz`. Parts left out go in `exempt` with a reason. `register` and `kinds` are required.
- **Markup:** `[漢字|かんじ]` ruby, `{…}` highlight, spaces are word boundaries, `-` joins names. STYLE §5 governs kana vs kanji: 常用 only, with house exceptions.
- **Content tests** run on every lesson:
  - `content.test.ts`: punctuation, spaces, stacked particles;
  - `joyo.test.ts`: every ruby reading is in the 常用漢字表;
  - `kanji.test.ts`: every kanji has an entry in `content/kanji.ts`;
  - `words.test.ts`: every word resolves to `content/words` or an engine form;
  - `register.test.ts`: no line mixes registers, and each alt is the other register;
  - `grammar.test.ts`: every particle, grammar and verb lesson has a topic in `content/grammar.ts`, with examples copied verbatim;
  - `corpus.test.ts`: the snapshot `tests/__snapshots__/corpus.txt`; read the diff line by line, then accept it with `npm test -- -u`;
  - `reading.test.ts`: decks never import `content/reading.ts` or `lib/corpus.ts`.
- **Drills built from the lessons automatically**, so a new lesson feeds them with no wiring:
  - **Cloze** (`lib/cloze-cards.ts`): every highlighted example line, minus `content/cloze-exclusions.ts`. A gap that ends the line carries the register.
  - **Polite ↔ casual** (`lib/register-cards.ts`): every example or dialogue line with an `alt`. Engine variants are accepted. Add extra accepted answers in `content/register-also.ts`.
  - **Type it** (`lib/type-lines.ts`): every example, alt and dialogue line of non-kana lessons.
  - **Vocabulary deck:** the words of finished lessons, through `content/words`.
  - **Review queue, notebook and daily new-card limit:** every deck goes through `lib/srs.ts`, `lib/stores.ts` (`answerScheduled`, `logAnswer`) and `lib/new-cards.ts`. New items are covered with no wiring.
- **Conjugation trainer:**
  - `lib/conjugate.ts` is the engine. It already builds `passive`, `causative`, `ba`, `imperative`, `prohibitive` and `nasai`, with golden tables in `tests/conjugate.test.ts`.
  - `lib/conjugation-trainer.ts` `VERB_FORM_INFO` lists the forms the trainer asks, each tied to the lesson that teaches it. A form is asked only once that lesson exists.
- **Grammar overview** (`content/grammar.ts`, `app/grammar/page.tsx`): groups of topics, each with a `slug` (its anchor, `/grammar#slug`), a `pattern`, a `meaning`, the `lesson`, and examples copied verbatim from that lesson. 61 topics today.
- **Placement** (`lib/placement-bands.ts`): one band per unit except the kana units. Each band has two quiz questions picked in `PICKS` (pinned in `tests/placement.test.ts`). The first band with two misses is where to start.
- **Search** indexes lessons and grammar topics automatically.
- **Progress export** (`lib/export.ts`, `docs/EXPORT_FORMAT.md`): `lessons[].jlptLevel`, `items[].jlptLevel` and `items[].grammarPointId` are `null` today. Phase 1 fills them.
- **Dumping a unit for review:** `npm run dump -- <unit>` prints every line with its reading, romaji and English.

## What already exists (deduplicate against it)

These are already taught; extend or link to them rather than teaching them again:

- `de-ichiban` (の中で一番 is partly covered);
- `kara-because` (から/ので/ですから);
- `ni-purpose` (Verb stem に行く);
- `ni-naru`, `te-iru`, `te-kudasai`, `tai`, `tagatte-iru`, `volitional`/`mashou`, `potential`, `tara`, `masen-ka`, `te-request`, `kute`;
- までに and quoting と, which appear only in callouts.

Before writing each lesson, grep `content/lessons` and `content/grammar.ts` for its pattern, and note what you found in the report.

## Step 0: infrastructure (a small diff)

1. **A JLPT tag** on `Lesson` and `GrammarTopic` (`content/types.ts`, `content/grammar.ts`):
   ```ts
   jlpt?: { level: "N5" | "N4" | "N3" | "N2"; source: string; disputed?: string };
   ```
   - `source` names the reference: use **Bunpro's JLPT grammar lists** as the primary source, cross-checked against **JLPT Sensei**.
   - Where the two disagree, set the Bunpro level and describe the disagreement in `disputed`.
   - Fetch the lists with WebFetch. If neither site is reachable, stop and ask the owner which reference to use; don't tag from memory.
   - Tag the existing grammar, particle and verb topics and lessons too (most are N5), so the `/grammar` filter is complete.
2. **`needsReview`:**
   - add `needsReview?: string` (the reason) to `Example`, `DialogueLine` and `QuizQuestion`;
   - render nothing for it;
   - make `npm run dump` print it, so the report can list every flagged line.
3. **`/grammar` filter by level:** a small client component of level chips (All, N5, N4) that hides the topics of other levels.
   - Use the existing `Chip` or `Segmented` from `components/ui`.
   - Without JavaScript, every topic stays visible.
   - Show each topic's level as a small label.
4. **New units:** add each to `UNITS`, and extend `KANJI_NUMERALS` past 十 (十一, 十二, 十三).
   - Check that the path tabs still scroll at 375 px and the breadcrumb reads 第十一章.
   - Add a `LessonKind` per new unit only if the existing kinds don't fit; prefer reusing `grammar` and `verbs`.
5. **Export:**
   - fill `lessons[].jlptLevel` from `lesson.jlpt`;
   - fill `items[].jlptLevel` from the item's lesson (quiz, cloze, register and Type it items know their lesson; conjugation items through `formLesson`; kana and kanji stay `null`);
   - set `items[].grammarPointId` to the item's topic slug when its lesson has exactly one topic, else `null`.

   The shape doesn't change, so `BACKUP_VERSION` stays 2. Update `docs/EXPORT_FORMAT.md` to say where the values come from.

## Step 1: one exemplar lesson, then stop and show it

Write one complete lesson end to end, for example `てもいい / てはいけない`:

- a "How it connects" `table` (the forms it attaches to);
- 4–6 highlighted core examples with `alt` lines;
- a one-change pair;
- a `mistake` callout for the main confusion;
- a dialogue;
- a quiz of 4–5 typed questions with every correct alternative listed;
- its JLPT tag;
- its topic or topics in `content/grammar.ts`, with examples copied verbatim.

Add any new words to `content/words` and any new kanji to `content/kanji.ts`; run `npm run check-words` if JMdict is at hand. Get the full test suite green. Then show the owner the lesson (a 375 px screenshot and the `npm run dump` output) and wait for a yes before writing the rest. The other units copy this one, so its quality sets the bar.

## Step 2: the units

Proposed split; adjust the themes if the reference suggests a better order, and say why in the report.

| Unit | Title | Points |
|---|---|---|
| 九 `n5-essentials` | N5 essentials | てもいい / てはいけない; ないでください; なければならない / なくてはいけない / なきゃ; まえに / あとで; とき; のが好き / 上手 (nominaliser の); より / ほうが / の中で一番 (link `de-ichiban`); でしょう; Verb stem + かた; たり〜たりする; たことがある; ほしい; もう / まだ |
| 十 `n4-conditions` | If, even if, because | ば; と (natural result); なら; ば, と, なら and たら compared; ても / でも; のに; けど / けれども; ので (link `kara-because`); し |
| 十一 `n4-plans` | Plans, purpose and aspect | ために; ように; ようにする / ようになる; ことにする / ことになる; ことができる; つもり; てしまう / ちゃう; ておく; てある; てみる; ていく / てくる; ところだ (ところ / たところ / ているところ); たばかり; ながら; までに (from the callout) / 間 / 間に |
| 十二 `n4-giving-voice` | Giving, voice and polite speech | あげる / くれる / もらう; てあげる / てくれる / てもらう; てほしい; passive (including the suffering passive); causative; causative-passive; させてください; basic keigo (いらっしゃる, 召し上がる, おる, 参る, お〜になる, お〜する) |
| 十三 `n4-seeming` | Seeming, hearsay and thinking | そう (looks like); そう (I heard); よう / みたい; らしい; はず; かもしれない; だろう; と思う; と言う; か / かどうか (embedded questions); のだ / んです; かな; やすい / にくい; すぎる; がる; なさい |

That makes about 60 points in about 55 lessons. Put two points in one lesson only where the contrast is the lesson (ば/と/なら/たら, あげる/くれる/もらう).

Add standard N4 points the inventory missed if the reference lists them, for example:

- 〜てくれませんか / 〜てもらえませんか (requests);
- 〜ことがある (sometimes), distinct from たことがある;
- 〜ずに / 〜ないで (without doing);
- 〜し〜し;
- 〜だけ / 〜しか〜ない, if not already covered;
- 〜(よ)うと思う / 〜(よ)うと思っている.

Check each against the reference, and list every addition and every skip with its reason.

How to write them:

- **Order:** write the units in the order above, since later units use earlier forms (the て form, the plain forms).
- **Subagents:** you may hand each unit to an Opus 5.5 subagent with a self-contained writer spec. Include:
  - the exemplar lesson;
  - STYLE.md's rules, restated;
  - the lesson template;
  - the rule to use fresh words in quizzes and never copy another unit's lines (grep first);
  - quiz prompts that name the register ("Casual negative") when both fit;
  - reading questions that ask for kana and accept only kana;
  - every correct alternative listed, with digit forms where a number is typed;
  - vocabulary at or below the level;
  - `needsReview` instead of guessing.

  Integrate and test each unit yourself.
- **Examples:** at least 4 per point, highlighted, half with `alt` lines where both registers are natural. Keigo lines may have a plain alt only where one exists. That gives each point at least 3 cloze cards and at least 2 Type it lines automatically. Check the counts in Step 4.
- **Connections:** a "How it connects" table per point, for example "Verb て form + も いい", "い-adjective くて + も", "Noun / な-adjective + でも".
- **Confusions:** each lesson's `mistake` callout or `pair` names the look-alike. Examples:
  - ば vs たら;
  - そう (looks) vs そう (heard);
  - よう vs みたい vs らしい;
  - あげる vs くれる;
  - passive vs potential (食べられる);
  - ことにする vs ことになる;
  - てある vs ている;
  - のに vs けど.
- **Register:** say it in the lesson (the `register` field and the prose). For example: なきゃ is casual speech; お〜になる is honorific.
- **Grammar overview:** one topic per point, in new groups named after the units, each tagged with `jlpt`.

## Step 3: the conjugation trainer

Add these forms to `VERB_FORM_INFO`, each tied to the lesson that teaches it: `ba`, `passive`, `causative`, `nasai`, and `imperative`/`prohibitive` only if a Phase 1 lesson teaches them (the plain command is usually N4; decide by the reference).

Add to the engine (`lib/conjugate.ts`), following C1's rules:

- `causativePassive`: the full form (させられる, 書かせられる) as the main answer, with the short う-verb form (書かされる) as a variant. Not for する-only compounds where it's unnatural; refuse rather than guess.
- `honorific` (お〜になる) and `humble` (お〜する): for ordinary verbs only, with the special verbs (いらっしゃる, 召し上がる, おっしゃる, なさる, いたす, 参る, 申す, 伺う, 拝見する, おる) taken from a table, not built. Where a verb has a special form, the trainer asks for that form, and the お〜 form is refused when it isn't used (お行きになる is rare: check the reference, and flag it in `needsReview`).

Add golden rows for each new form to the existing tables in `tests/conjugate.test.ts`. That is the only new test content in this phase. Also add each new form to `identifyForm`'s names, so a wrong answer that is another form gets named. Leave out ようとする (N3, Phase 2) and the adjective そう stems unless the engine already handles いい → よさそう and ない → なさそう.

## Step 4: placement, then checks

- **Placement:** add two `PICKS` per new unit (quiz questions whose prompt doesn't give the answer away) and update the pinned list in `tests/placement.test.ts`. On the result, name the level reached: "Start with If, even if, because: around JLPT N4", using the unit's lessons' `jlpt`.
- **Counts** (from a one-off script, not a test):
  - per level and per unit: lessons and points;
  - per point: cloze cards, register cards, Type it lines and quiz questions;
  - conjugation forms added.

  Any point with fewer than 3 cloze cards or 2 Type it lines needs more examples, or a reason in the report.
- **Review:** one fresh Opus 5.5 reviewer per new unit, in parallel. Give each STYLE.md, the dump of its unit, and this brief's accuracy rules; ask for errors, should-fix and polish items, plus a verdict on every `needsReview` line. Apply the findings, keep or clear the flags, and record what wasn't applied and why (as CLAUDE.md does for earlier phases).
- **Checks:** `npm test` (accept the corpus snapshot only after reading its diff), `npm run typecheck`, `npm run lint`, `npm run build`.
- **Browser, at 375 px in light and dark:**
  - a lesson from each new unit;
  - `/grammar` filtered to N4;
  - the conjugation trainer asking a passive form;
  - the placement check reaching an N4 band;
  - the cloze and polite ↔ casual drills showing a new line;
  - an export's `jlptLevel`.

  No horizontal scroll, and a clean console.

## Done, and the report

- **Commit:** one commit, `JLPT Phase 1: N5 gaps and N4 grammar`, on `features`, then push `features`. If the session must stop before the end, commit as `JLPT Phase 1 (in progress)` and write in CLAUDE.md's Next exactly where it stopped.
- **CLAUDE.md:** a Built entry, updated Numbers, How it was checked, and Waiting on the owner (disputed levels, unconfirmed citations), as earlier phases did.
- **Report to the owner:**
  - what was added, and counts per level, per unit and per drill;
  - every `needsReview` line with its reason;
  - disputed JLPT levels;
  - points added beyond the inventory, and points skipped, each with the reason;
  - anything put in `BACKLOG.md`.
- **Then stop.** Don't start Phase 2, and don't push `main`.
