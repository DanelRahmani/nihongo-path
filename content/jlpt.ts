/**
 * JLPT levels for lessons and grammar topics. There is no official grammar list: the levels follow Bunpro's
 * JLPT lists, cross-checked with JLPT Sensei's, and a disagreement is described in `disputed`.
 * Both lists were read on 2026-10-21, and their N3 sections again on 2026-10-28 (JLPT Phase 2).
 */
import type { JlptLevel, JlptTag } from "@/content/types";

export const JLPT_SOURCE = "Bunpro's JLPT grammar lists (bunpro.jp/grammar_points), cross-checked with JLPT Sensei (jlptsensei.com), 2026-10-21";

export function jlpt(level: JlptLevel, disputed?: string): JlptTag {
  return disputed ? { level, source: JLPT_SOURCE, disputed } : { level, source: JLPT_SOURCE };
}

/** The levels the /grammar filter offers (N3: points Bunpro places there that an N4 unit teaches). */
export const JLPT_FILTER_LEVELS: JlptLevel[] = ["N5", "N4", "N3"];
