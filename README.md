# Nihongo Path 日本語の道

A personal Japanese study app: hiragana and katakana with a spaced-repetition drill, plus 62 lessons on word order, particles, core grammar, verb conjugation, suffixes and conversation culture. Lessons are taught through contrasting example pairs, in the style of Cure Dolly (core sentence, zero が) and Jouzu Juls (natural, practical examples).

Static Next.js site — no backend, no accounts. Progress, drill state and display settings live in the browser's `localStorage`.

## Scripts

```bash
npm run dev        # local dev server on http://localhost:3000
npm test           # unit + content-integrity tests (vitest)
npm run typecheck  # route types + tsc
npm run lint
npm run build      # static export to out/
```

## Where things live

- `content/lessons/<unit>.ts` — lesson content, one file per unit; `content/units.ts` sets the order.
- `content/STYLE.md` — teaching style and markup rules. Read before adding lessons.
- `content/kana.ts` — kana data; katakana is derived from hiragana.
- `lib/markup.ts`, `lib/romaji.ts` — the `[漢字|かな]` / `{highlight}` markup and generated romaji.
- `lib/srs.ts` — Leitner-box scheduler for the kana drill.

`tests/content.test.ts` fails if any lesson shows a bare kanji (Kana-only mode must always be readable), has a broken link, unbalanced markup, or Japanese that can't be turned into romaji.

## Building one for another language

`docs/replicate-for-another-language.md` is a ready-to-paste prompt, including a setup questionnaire, that has a new AI session build this kind of app for another language (with worked notes for Persian).
