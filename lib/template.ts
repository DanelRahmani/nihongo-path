/**
 * The lesson template (content/STYLE.md §10) as a checklist. Returns what a lesson is missing; an
 * empty list means it follows the template. Pure.
 */
import type { Block, Lesson, TemplatePart } from "@/content/types";
import { plainOf } from "@/lib/markup";

const PARTS: TemplatePart[] = ["examples", "pair", "mistake", "conversation", "quiz"];

/** English sentences in a piece of prose: terminal . ! ? followed by a space or the end. */
export function sentenceCount(text: string): number {
  return (plainOf(text, false).match(/[.!?](?=\s|$)/g) ?? []).length;
}

function present(blocks: Block[]): Record<TemplatePart, boolean> {
  return {
    examples: blocks.some((b) => b.type === "examples"),
    pair: blocks.some((b) => b.type === "pair"),
    mistake: blocks.some((b) => b.type === "callout" && b.kind === "mistake"),
    conversation: blocks.some((b) => b.type === "dialogue" || (b.type === "callout" && b.kind === "culture")),
    quiz: blocks.some((b) => b.type === "quiz"),
  };
}

export function templateProblems(lesson: Lesson): string[] {
  const out: string[] = [];
  const { blocks } = lesson;
  const exempt = lesson.exempt ?? {};
  const has = present(blocks);

  if (!lesson.source.trim()) out.push("no source");
  if (!lesson.register) out.push("no register (polite, plain, both or neutral)");
  if (!lesson.kinds?.length) out.push("no kinds tags");

  const first = blocks[0];
  if (first?.type !== "idea") out.push("doesn't open with the idea");
  else if (sentenceCount(first.text) > 1) out.push("the idea is more than one sentence");

  for (const part of PARTS) {
    const reason = exempt[part];
    if (reason !== undefined) {
      if (!reason.trim()) out.push(`exempt from ${part} without a reason`);
      if (has[part]) out.push(`exempt from ${part}, but has one: remove the exemption`);
    } else if (!has[part]) {
      out.push(`no ${part === "conversation" ? "dialogue or culture note" : part === "mistake" ? "common-mistake callout" : part}`);
    }
  }

  const core = blocks.find((b) => b.type === "examples");
  if (core?.type === "examples" && exempt.examples === undefined) {
    if (core.items.length < 3 || core.items.length > 5) out.push(`core examples: ${core.items.length} (want 3–5)`);
    core.items.forEach((ex, i) => {
      if (!ex.jp.includes("{")) out.push(`core example ${i + 1} has no highlight`);
    });
  }

  for (const b of blocks) {
    if (b.type === "callout" && b.kind === "mistake" && !(b.text.includes("✗") && b.text.includes("✓"))) {
      out.push("a common-mistake callout without ✗ and ✓");
    }
  }

  const quizzes = blocks.filter((b) => b.type === "quiz");
  if (quizzes.length > 1) out.push("more than one quiz");
  const quiz = quizzes[0];
  if (quiz?.type === "quiz") {
    if (quiz.questions.length < 3 || quiz.questions.length > 5) out.push(`quiz: ${quiz.questions.length} questions (want 3–5)`);
    quiz.questions.forEach((q, i) => {
      if (q.answers.length === 0) out.push(`quiz question ${i + 1} has no answer`);
      if (!q.explanation.trim()) out.push(`quiz question ${i + 1} has no explanation`);
    });
    const lastContent = blocks.filter((b) => b.type !== "link").at(-1);
    if (lastContent !== quiz) out.push("the quiz isn't the last block (only links may follow it)");
  }

  return out;
}
