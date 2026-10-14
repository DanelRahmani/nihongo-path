import type { Jp, Word, WordPos, WordTopic } from "@/content/types";

/**
 * One expansion word: its JMdict entry id, written form (STYLE §5, as the candidate list gives it), part of
 * speech, a short learner's meaning (ours), topic, and verb class for verbs.
 */
export const x = (jmdict: string, jp: Jp, pos: WordPos, meaning: string, topic: WordTopic, verb?: Word["verb"]): Word => ({
  jp,
  meaning,
  pos,
  topic,
  ...(verb ? { verb } : {}),
  jmdict,
});
