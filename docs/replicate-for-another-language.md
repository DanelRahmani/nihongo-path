# Prompt: build a “Nihongo Path”-style study app for another language

Paste everything below the line into a new AI coding session (Claude Code or similar), in an empty project folder. The AI will interview you first, then plan, then build.

Reference implementation: the Japanese app in this repo (`DanelRahmani/nihongo-path`). If the new session can read it, tell it where it is — it's the best spec there is.

---

## Your role

You are building a personal, mobile-first language-learning web app for me, modelled on an app I already have for Japanese (“Nihongo Path”). Before you plan or write any code, **run the setup questionnaire below**. Ask the questions in small batches (at most 4 at a time, multiple choice where possible, with a recommended option first), wait for my answers, and adapt everything that follows to them. Don't assume answers I haven't given. After the questionnaire, write a plan and get my approval before building.

## What the finished app is

- **A path of lessons** grouped into ordered units, each lesson numbered (unit.lesson, e.g. 4.3) and titled in plain English with what it teaches (e.g. “را marks the definite object”).
- **Filter chips by lesson type** on the path (Script, Pronunciation, Word order, Grammar, Verbs, Particles/Prepositions, Suffixes, Culture…), plus a “hide finished lessons” toggle.
- **Example-first teaching.** Every lesson follows one template:
  1. *The idea* — one sentence.
  2. *Core examples* — 3–5 natural sentences, key part highlighted in the accent colour (“red pen”).
  3. *Contrast pairs* — the same sentence with one thing changed, plus a plain-English note on how the meaning shifts. This is the heart of the app.
  4. *Common mistake* — what learners get wrong and the fix.
  5. *In real conversation* — a short dialogue or culture note.
- **A script trainer with spaced repetition** (Leitner boxes 1–5, intervals 0 · 10 min · 1 day · 3 days · 7 days; a miss sends a card back to box 1). The learner *types* the answer (production, not multiple choice). Characters unlock group by group once the current group reaches box 3; a “I know these — unlock the next group” escape hatch and a “practise anyway” mode that doesn't touch the schedule.
- **Display settings** (a popover in the header, saved per browser):
  - a **script / reading-aid mode** — the equivalent of Japanese kana-only / furigana / kanji (see the questionnaire: for Persian this might be *with short-vowel marks / without*, for Chinese *pinyin above / characters only*, etc.);
  - a **transliteration toggle** (the equivalent of romaji), **off by default**, generated automatically from the text so it can never drift from it.
- **Progress** (lesson “done” stamps, drill state, settings) in `localStorage`, wrapped in try/catch. No backend, no accounts.
- **A signature completion mark** that fits the culture (Japanese used a red hanko seal 「済」). Pick an equivalent for the new language — ask me.

## Architecture (keep this unless I say otherwise)

- Next.js (App Router, TypeScript, Tailwind), `output: "export"` static site, deployed to Vercel from a **private** GitHub repo. Read the installed Next.js version's bundled docs before writing code — APIs change between majors.
- **Lessons are data, not JSX.** `content/lessons/<unit>.ts` exports typed `Lesson[]`; `content/units.ts` sets the order; one `LessonRenderer` maps block types (`idea`, `heading`, `text`, `examples`, `pair`, `table`, `callout`, `dialogue`, `link`) to components.
- **A tiny inline markup** inside every target-language string, parsed once in `lib/markup.ts`:
  - `[base|reading]` — text plus its reading aid (furigana / vowel marks / pinyin…), rendered according to the display mode;
  - `{text}` — highlighted span; `**bold**`, `*italic*`;
  - spaces as word boundaries where the language needs them for transliteration.
- `lib/<transliteration>.ts` generates the transliteration from the reading; `lib/srs.ts` is pure functions (unit-tested); `lib/storage.ts` wraps `localStorage` in a `useSyncExternalStore` store.
- **Content-integrity tests** (vitest) that fail the build if: any markup doesn't parse, a string would show something the learner's chosen mode can't read (Japanese: a bare kanji outside `[漢字|かな]`), a reading is in the wrong script, highlight/bold markers are unbalanced, an internal link points nowhere, a table row has the wrong width, or transliteration leaves untransliterated characters behind.
- A `content/STYLE.md` recording the teaching style, markup rules, and any corrections made to my own notes.

## Quality bar

- **Accuracy is non-negotiable.** Every lesson has a `source` field naming the reference it was checked against. After writing each unit, have a *separate, fresh* reviewer agent proofread it (grammar, naturalness, readings, translation nuance, over-generalised rules) and fix what it finds before moving on. Examples must be original — never copied from videos or textbooks.
- If I point you to my own notes (Notion etc.), use them for framing and vocabulary, but check them: list anything wrong you corrected, and never copy an error into a lesson.
- Mobile-first (375 px wide, no horizontal scroll), visible keyboard focus, `prefers-reduced-motion` respected, light and dark themes.
- Verify in a real browser before calling anything done: path filters, a lesson, each display mode, the transliteration toggle surviving a reload, a drill with a right and a wrong answer, console free of errors. Run tests, typecheck, lint and a production build.
- Commit and push after each phase; keep the deployed version current.

## Setup questionnaire — ask me these first

Ask in batches; skip a question only if an earlier answer already settles it.

### 1. The language
1. Which language — and which variety? (e.g. Persian: Iranian Farsi / Dari / Tajik; Arabic: MSA / Egyptian / Levantine; Chinese: Mandarin simplified / traditional; Portuguese: Brazil / Portugal.)
2. Colloquial or formal first? Many languages have a big gap (Persian spoken *mikhām* vs written *mikhāham*; Arabic dialect vs MSA). Teach spoken, written, or both side by side?
3. My current level: total beginner / can read the script / know some grammar / intermediate.
4. My native language(s) and other languages I know — to reuse cognates and contrast with familiar grammar.
5. Why am I learning — travel, family and heritage, exchange or study abroad, work, media? Is there a deadline (a trip date) to plan backwards from?

### 2. Script and reading aids
6. Does the language have its own script, and how should it be taught? (Persian: 32 letters, joining forms — isolated / initial / medial / final — right-to-left, non-joining letters.)
7. What's the reading aid — the equivalent of furigana? (Persian/Arabic: short-vowel diacritics — zabar, zir, pish, sukun, tashdid; Chinese: pinyin with tones; Russian: stress marks; Hindi: none needed.) Which display modes do I want? For example:
   - *Full vowel marks* / *marks on new words only* / *no marks (real-world text)*.
8. Transliteration: which system, and should it be on or off by default? (Persian: a learner-friendly scheme vs strict academic transliteration; Chinese: pinyin; Arabic: a simple scheme vs DIN 31635.) When should I be weaned off it?
9. What should the script drill test? Letter → sound, sound → letter, letter forms in context, reading whole words, typing on a native keyboard layout?
10. Numerals: teach the native digits too (Persian ۰۱۲۳۴۵۶۷۸۹)?

### 3. Curriculum
11. Which units do I want? Offer a default list for the language and let me add, remove and reorder. (Persian default: Start here · The alphabet (4–5 lessons) · Sounds and vowel marks · Word order (SOV) · The ezafe · Prepositions and را · Core grammar (to be / to have, adjectives, questions, pointing words, numbers) · Verbs (present and past stems, present, past, continuous, subjunctive, imperative, compound verbs) · Suffixes (plural ـها / ـان, possessive endings, ـی) · Culture in conversation (taarof, formal شما vs informal تو, greetings and set phrases).)
12. How deep per unit — essentials only (fastest to useful) or complete coverage up to a level (e.g. A2 / B1)?
13. Any topics I especially struggle with or want emphasised?
14. Do I have my own notes to draw on? Where (Notion page, files, a textbook)? Should they be treated as trusted or checked?

### 4. Teaching style
15. Which teachers or channels do I find easiest to learn from? (For Japanese it was Cure Dolly's “core sentence” framing and Jouzu Juls's practical example pairs.) Summarise their approach back to me before using it.
16. Tone: friendly and light / neutral textbook / playful with jokes?
17. How much grammar terminology — plain English only, or proper terms with explanations?

### 5. Design
18. Colour scheme for light and dark mode? (Japanese used white + hinomaru red in light mode, charcoal + sakura pink in dark mode.) Offer 2–3 options inspired by the culture — for Persian, e.g. turquoise tilework and lapis blue, pomegranate red on parchment, or saffron gold on night blue.
19. Visual inspiration — Persian miniature and tile patterns, calligraphy (Nastaliq for display headings?), minimalist? Which fonts for the script (e.g. Vazirmatn for body text, a Nastaliq face for display only)?
20. The signature completion mark: what's culturally fitting? (Persian ideas: a wax-seal style مُهر stamp, a small tile rosette, a calligraphic ✓ «تمام».)
21. For right-to-left languages: confirm the UI stays in English (left-to-right) while target-language text is set `dir="rtl"` with the right font and line height.

### 6. Features and setup
22. Which extras beyond lessons and the script drill? (Per-lesson quizzes with explained answers, audio via the browser's text-to-speech voice for the language, a conjugation trainer, a vocabulary deck.) Default: none beyond the drill for v1.
23. Where should it live: new private GitHub repo (name?) and a Vercel project for test deploys? Any existing accounts, teams or folders to use?
24. Anything to reuse from the Japanese app (code, components, tests)?

## After the questionnaire

1. Summarise my answers in 10 lines and confirm.
2. Write the plan: context, architecture, curriculum (units → lessons with plain-English titles), the reading-aid and transliteration design, content-accuracy process, build phases, verification.
3. After approval, build in phases, committing after each: scaffold → markup and lesson engine (prove it with **one** flagship contrast lesson, e.g. Persian *ezafe* or را) → script drill → content, one unit at a time, each reviewed → path filters and polish → deploy and smoke-test.
4. Keep me posted with one-line status updates; if something breaks, say so plainly and fix it.

## Language-specific traps to check (Persian)

Use these if the language is Persian; write an equivalent list for any other language before building.

- Use Persian letters, not their Arabic look-alikes: ی (not ي), ک (not ك). Normalise input in the drill.
- The half-space (ZWNJ, U+200C) is part of correct spelling: می‌روم, کتاب‌ها. Tests should catch a plain space or no space where a ZWNJ belongs.
- Short vowels are usually unwritten: the reading-aid mode is the main difference between beginner and real text.
- Ezafe is pronounced but usually not written — show it explicitly in beginner mode (کتابِ من).
- Colloquial and written forms differ a lot (است → ـه, می‌خواهم → می‌خوام); decide per lesson which one it teaches and label it.
- Transliteration must handle و and ی as consonant or vowel, the silent و in خوا, and tashdid doubling.
- Formal شما vs informal تو, and verb agreement with them, belong in the culture unit — as does taarof.
