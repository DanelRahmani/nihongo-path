import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { READING } from "@/content/reading";
import { readingFields } from "@/lib/corpus";
import { lineRegister } from "@/lib/register";

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? sourceFiles(path) : /\.tsx?$/.test(name) ? [path.replace(/\\/g, "/")] : [];
  });
}

describe("reading view (content/reading.ts)", () => {
  const APP_FILES = ["app", "components", "lib", "content"].flatMap(sourceFiles);
  /** Any import of the module, by alias or relative path, static or dynamic. */
  const imports = (module: string) => new RegExp(`(from|import\\()\\s*["'](@/|(\\.\\.?/)+)${module}["']`);

  it("is imported only by its page and the corpus, never by a card or deck builder", () => {
    const importers = APP_FILES.filter((file) => imports("(content/)?reading").test(readFileSync(file, "utf8")));
    expect(importers.sort()).toEqual(["app/read/page.tsx", "lib/corpus.ts"]);
  });

  it("reaches nothing else through the corpus, which only tests and scripts import", () => {
    expect(APP_FILES.filter((file) => file !== "lib/corpus.ts" && imports("(lib/)?corpus").test(readFileSync(file, "utf8")))).toEqual([]);
  });

  it("writes numbers in the original texts as digits sharing a ruby group with their counter (STYLE.md §8)", () => {
    const lines = READING.filter((t) => t.kind !== "haiku").flatMap((t) => t.lines.flatMap((l) => [l.jp, l.price ?? ""]));
    expect(lines.filter((jp) => /[〇一二三四五六七八九十百千万]/.test(jp))).toEqual([]);
    expect(lines.filter((jp) => /[0-9]\[/.test(jp))).toEqual([]);
  });

  it("has unique slugs, a title, and an English line for every Japanese line", () => {
    const slugs = READING.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const t of READING) {
      expect(t.title, t.slug).toBeTruthy();
      expect(t.lines.length, t.slug).toBeGreaterThan(0);
      for (const l of t.lines) expect(l.en, `${t.slug}: ${l.jp}`).toBeTruthy();
    }
  });

  it("names the poet and the edition of every haiku, and marks it quoted in the corpus", () => {
    const haiku = READING.filter((t) => t.kind === "haiku");
    expect(haiku.length).toBeGreaterThanOrEqual(4);
    for (const t of haiku) expect(t.author && t.source, t.slug).toBeTruthy();
    const quoted = new Set(readingFields().filter((f) => f.quoted).map((f) => f.lesson));
    expect([...quoted].sort()).toEqual(haiku.map((t) => `read/${t.slug}`).sort());
  });

  it("gives every chat line a sender, and keeps the chat casual and the story polite", () => {
    const chat = READING.find((t) => t.kind === "chat")!;
    expect(chat.lines.every((l) => l.from)).toBe(true);
    expect(chat.lines.filter((l) => lineRegister(l.jp) === "polite").map((l) => l.jp)).toEqual([]);
    const story = READING.find((t) => t.kind === "story")!;
    expect(story.lines.filter((l) => lineRegister(l.jp) !== "polite").map((l) => l.jp)).toEqual([]);
    // Signs and news are polite, or bare noun phrases (本日休業, 東京で初雪).
    const notices = READING.filter((t) => t.kind === "sign" || t.kind === "news").flatMap((t) => t.lines);
    expect(notices.filter((l) => !["polite", "neutral"].includes(lineRegister(l.jp))).map((l) => l.jp)).toEqual([]);
  });
});
