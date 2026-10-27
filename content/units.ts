import { basics } from "@/content/lessons/basics";
import { hiragana } from "@/content/lessons/hiragana";
import { katakana } from "@/content/lessons/katakana";
import { n4Conditions } from "@/content/lessons/n4-conditions";
import { n4GivingVoice } from "@/content/lessons/n4-giving-voice";
import { n4Plans } from "@/content/lessons/n4-plans";
import { n4Seeming } from "@/content/lessons/n4-seeming";
import { n5Essentials } from "@/content/lessons/n5-essentials";
import { culture } from "@/content/lessons/culture";
import { grammar } from "@/content/lessons/grammar";
import { particles } from "@/content/lessons/particles";
import { suffixes } from "@/content/lessons/suffixes";
import { verbs } from "@/content/lessons/verbs";
import { wordOrder } from "@/content/lessons/word-order";
import type { Lesson, Unit } from "@/content/types";

/** The curriculum, in learning order. */
export const UNITS: Unit[] = [
  {
    slug: "start",
    kind: "basics",
    title: "Start here",
    titleJp: "[入門|にゅうもん]",
    description: "How Japanese is written, and the two ways every sentence can end.",
    lessons: basics,
  },
  {
    slug: "hiragana",
    kind: "kana",
    title: "Hiragana",
    titleJp: "ひらがな",
    description: "The core script: every sentence needs it.",
    lessons: hiragana,
  },
  {
    slug: "katakana",
    kind: "kana",
    title: "Katakana",
    titleJp: "カタカナ",
    description: "Same sounds, sharper shapes — for foreign words and names.",
    lessons: katakana,
  },
  {
    slug: "word-order",
    kind: "word-order",
    title: "Word order",
    titleJp: "[語順|ごじゅん]",
    description: "Verb last, topic first, and why the middle can move.",
    lessons: wordOrder,
  },
  {
    slug: "particles",
    kind: "particles",
    title: "Particles",
    titleJp: "[助詞|じょし]",
    description: "The little words that give every other word its job.",
    lessons: particles,
  },
  {
    slug: "grammar",
    kind: "grammar",
    title: "Core grammar",
    titleJp: "[文法|ぶんぽう]",
    description: "です, adjectives, existence, pointing words, questions and numbers.",
    lessons: grammar,
  },
  {
    slug: "verbs",
    kind: "verbs",
    title: "Verb conjugation",
    titleJp: "[動詞|どうし]",
    description: "Every everyday verb form, from ます to たら.",
    lessons: verbs,
  },
  {
    slug: "suffixes",
    kind: "suffixes",
    title: "Suffixes and prefixes",
    titleJp: "[接尾辞|せつびじ]",
    description: "Name suffixes, titles, and the little add-ons that build new words.",
    lessons: suffixes,
  },
  {
    slug: "culture",
    kind: "culture",
    title: "Culture in conversation",
    titleJp: "[文化|ぶんか]",
    description: "Politeness, avoiding “you”, soft refusals and the phrases people actually use.",
    lessons: culture,
  },
  {
    slug: "n5-essentials",
    kind: "grammar",
    title: "N5 essentials",
    titleJp: "[基本|きほん]",
    description: "Permission and rules, before and after, comparing, experiences: the rest of JLPT N5.",
    lessons: n5Essentials,
  },
  {
    slug: "n4-conditions",
    kind: "grammar",
    title: "If, even if, because",
    titleJp: "[条件|じょうけん]",
    description: "The four ways to say if, even if and even though, but, and listing reasons.",
    lessons: n4Conditions,
  },
  {
    slug: "n4-plans",
    kind: "grammar",
    title: "Plans, purpose and aspect",
    titleJp: "[予定|よてい]",
    description: "What it's for, so that, deciding and planning, can, and the て forms that finish, prepare and leave things done.",
    lessons: n4Plans,
  },
  {
    slug: "n4-giving-voice",
    kind: "grammar",
    title: "Giving, voice and polite speech",
    titleJp: "[敬語|けいご]",
    description: "Giving and receiving, favours and requests, the passive and causative, and honorific and humble speech.",
    lessons: n4GivingVoice,
  },
  {
    slug: "n4-seeming",
    kind: "grammar",
    title: "Seeming, hearsay and thinking",
    titleJp: "[推量|すいりょう]",
    description: "Looks like, I hear, seems and apparently; should be and might be; what you think and what was said.",
    lessons: n4Seeming,
  },
];

export function findLesson(unitSlug: string, lessonSlug: string) {
  const unitIndex = UNITS.findIndex((u) => u.slug === unitSlug);
  const unit = UNITS[unitIndex];
  const lesson = unit?.lessons.find((l) => l.slug === lessonSlug);
  if (!unit || !lesson) return null;
  return { unit, unitIndex, lesson };
}

export interface LessonRef {
  unit: Unit;
  lesson: Lesson;
  key: string;
  href: string;
  /** "unit.lesson" number, e.g. "4.3". */
  number: string;
}

/** Every lesson in order, for numbering, prev/next links and "continue" on the dashboard. */
export const ALL_LESSONS: LessonRef[] = UNITS.flatMap((unit, u) =>
  unit.lessons.map((lesson, l) => ({
    unit,
    lesson,
    key: `${unit.slug}/${lesson.slug}`,
    href: `/learn/${unit.slug}/${lesson.slug}`,
    number: `${u}.${l + 1}`,
  })),
);

/** Unit numbers as kanji numerals: the path is a real sequence. */
export const KANJI_NUMERALS = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三"];
