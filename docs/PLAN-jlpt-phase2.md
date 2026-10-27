# JLPT Phase 2: N3 grammar

A brief for a fresh session. Read this file, then `CLAUDE.md` (Progress: Next, the JLPT Phase 1 entry under Built, Decisions, Waiting on the owner), `AGENTS.md`, `content/STYLE.md` (all of it; §6 before touching `lib/romaji.ts` or `lib/markup.ts`), `docs/PLAN-jlpt-phase1.md` (the owner's rules, which still apply) and `docs/jlpt-writer-spec.md` (the spec every lesson writer follows). Stop at the end of the phase and report; Phase 3 (N2) starts only when the owner says so.

## The owner's goal and rules

Nihongo Path's grammar should cover JLPT N5 to N2, in the style and quality of the existing lessons, with every new point wired into the drills. Phase 1 (2026-10-27, on main) added the missing N5 points and N4: 74 lessons in units 九–十三. Phase 2 adds N3.

The owner's rules from Phase 1 hold: follow the existing conventions exactly; don't break progress; accuracy over volume (pattern, meaning, connections, register, confusions, at least 4 natural examples per point, vocabulary at or below the level); tag each point with its JLPT level, Bunpro first and JLPT Sensei as the cross-check, disputes recorded; never invent usage (`needsReview` instead); unrelated bugs to `BACKLOG.md`; keep new tests to an absolute minimum.

Owner decisions since (CLAUDE.md, Decisions):
- **A checkpoint commit per finished unit** (written, reviewed, fixed, checks green), pushed to `features`. Not one commit per phase.
- **Writers on Opus; reviewers and fixers on Sonnet**, one review per unit; Haiku only for mechanical passes (counts).
- Never push `main` unless the owner asks. Pushing `main` deploys japanese.danelrahmani.com.

## How the work runs (it worked in Phase 1)

- The session orchestrates; agents write. Writers run **one at a time**: they all touch the same word lists, kanji list, grammar topics and snapshots. A reviewer only reads, so it can run beside the next step's writer, but its fixer waits until no writer is running.
- Per unit: one or two Opus writers (about 8–10 lessons each) from `docs/jlpt-writer-spec.md`, with the batch in the prompt (unit, slugs, levels, existing coverage to build on); then one fresh Sonnet reviewer on the unit's `npm run dump -- <unit>` output and `content/STYLE.md`, writing its findings to a file; then a Sonnet fixer applying them; then tests, typecheck, lint and build, a 375 px look at one lesson, and the checkpoint commit.
- When a review finds a mistake that later units would repeat, add it to the spec's "What reviewers kept finding" section at once, and send it to any writer already running. When it finds a gap in the checker or resolver that affects every unit (as Phase 1's keyboard-kanji and ている fixes did), fix it once in `lib/quiz.ts` or `lib/words.ts` rather than per question.
- Before starting writers, extract JMdict common words and KANJIDIC2 from `~/Downloads` (the zips named in the spec) into the session's scratchpad, and save the N3 lists (Step 0). Give writers those paths.
- Usage limits stopped agents mid-task several times in Phase 1: an agent's work is saved, so resume it with a message rather than starting a new one, and check the files' state first.

## Step 0: the inventory, then stop for the owner

1. `git fetch`; local `features` must equal `origin/features`.
2. Fetch **Bunpro's N3 grammar** (https://bunpro.jp/grammar_points, the N3 section; WebFetch reads only the first 100,000 characters, so use `offset`) and **JLPT Sensei's N3 list** (https://jlptsensei.com/jlpt-n3-grammar-list/ and its later pages; WebFetch was rate-limited in Phase 1, `curl` worked). Save both, with the date, in the session's notes. If neither site is reachable, stop and ask the owner which reference to use.
3. Build the inventory: every N3 point on Bunpro, marked
   - **taught** (already a topic in `content/grammar.ts`; Phase 1 taught some N3 points inside N4 units: purpose のに, ことにする/ことになる, ことがある "sometimes", hearsay そう, という "called");
   - **new**;
   - **skip** (with the reason: on neither list at N3, covered by a broader lesson, a set phrase better taught as vocabulary).
   Carry-overs from Phase 1 that must be in it: ために and ずに (skipped there as N3), ことになっている and ことにしている, ような気がする, ようとする, させてもらう.
4. Propose the units: about 40–60 lessons in four to six units, each with a theme, the slugs, and each point's levels on both lists. A starting shape to improve on:

| Unit | Theme | Examples of points |
|---|---|---|
| 十四 | Purpose, cause and result | ために (both senses), ように言う/頼む, おかげで, せいで, によって/による, わけだ, わけではない, わけにはいかない, ばかりに |
| 十五 | Time and change | うちに, ないうちに, たとたん, 最中に, たびに, ばかり (only, nothing but), てばかりいる, 一方だ, ところに/ところへ |
| 十六 | Relations and viewpoint | について, に対して, にとって, として, に関して, に比べて, によれば, にしては, わりに |
| 十七 | Degree, limits and emphasis | さえ, こそ, ほど (extent; ば〜ほど), くらい (extent), だけでなく/ばかりでなく, なんか/なんて, っぽい, がち, 気味 |
| 十八 | Attitude, inference and doing | ようとする, ふりをする, に違いない, べき, ものだ, ことだ, ことはない, かのように, ずに, まま, stem + かける/きる/直す/合う |

5. Units and their numerals: the path's unit numbers stop at 十三 in `KANJI_NUMERALS` (`content/units.ts`); extend it (十四…十八) and check that the path tabs still scroll at 375 px and the breadcrumb reads 第十四章.
6. **Stop and show the owner** the inventory (counts per category, the skips with reasons) and the unit plan. Wait for a yes before writing lessons. No exemplar is needed this time: Phase 1's `temo-ii` and the spec set the bar.

## Step 1: the units

In the order the owner approves, each unit as above, ending in its checkpoint commit (`JLPT Phase 2 (checkpoint): unit 十四, …`). Vocabulary at or below N3 for N3 points. Points Bunpro puts at N2 that JLPT Sensei has at N3: teach them where they fit, tagged N2 with the dispute (the `/grammar` filter's levels are in `content/jlpt.ts`; add N2 there if any topic is tagged N2).

## Step 2: wiring

- **Conjugation trainer**: probably no new engine forms; if a lesson teaches a verb form the engine lacks (the volitional + とする uses existing forms), add it to `lib/conjugate.ts` following C1's rules with golden rows in `tests/conjugate.test.ts` (the only new test content), and to `VERB_FORM_INFO` tied to its lesson.
- **Resolver**: compounds such as stem + かける/きる/直す/合う, っぽい, がち, 気味 need `lib/words.ts` support (as Phase 1 added for 始める/出す, すぎる, そう).
- **Placement**: two picks per new unit; the result's level name comes from the unit's lessons ("around JLPT N3").
- **Export**: nothing new; `jlptLevel` and `grammarPointId` fill themselves.

## Step 3: the end

- Counts (a one-off script, not a test; Phase 1's is described in CLAUDE.md): lessons and points per level and unit; per lesson its cloze cards, register cards, Type it lines and quiz questions. Any point with fewer than 3 cloze cards or 2 Type it lines needs more examples, or a reason.
- Checks: `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` (on Windows its font trim deletes every font: a known bug in BACKLOG.md; use `npx next build` for a local preview).
- The full accessibility sweep `npm run a11y` once (Phase 1 skipped it): it needs a build with fonts, so run it where the font trim works, or fix that bug first with the owner's yes.
- Browser at 375 px, light and dark: a lesson from each new unit, `/grammar` filtered to N3, the trainer for any new form, the placement check reaching an N3 band, the cloze and polite ↔ casual drills showing a new line. No horizontal scroll, a clean console.
- **Commit** the last unit and the wiring as `JLPT Phase 2: N3 grammar`, push `features`, and update CLAUDE.md (a Built entry, Numbers, How it was checked, Decisions, Waiting on the owner) in that commit.
- **Report to the owner**: what was added, counts per unit and per drill, every `needsReview` left, disputed levels, points added beyond the starting shape or skipped (each with its reason), anything put in `BACKLOG.md`. Then stop: don't start Phase 3, and don't push `main`.
