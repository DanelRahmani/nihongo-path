import type { Jp, Word, WordPos, WordTopic } from "@/content/types";

/** Short constructors that keep the word lists one line per word. */
export const w = (pos: WordPos, jp: Jp, meaning: string, topic: WordTopic): Word => ({ jp, meaning, pos, topic });
export const noun = (jp: Jp, meaning: string, topic: WordTopic) => w("noun", jp, meaning, topic);
export const iAdj = (jp: Jp, meaning: string, topic: WordTopic) => w("i-adj", jp, meaning, topic);
export const naAdj = (jp: Jp, meaning: string, topic: WordTopic) => w("na-adj", jp, meaning, topic);
export const verb = (jp: Jp, cls: NonNullable<Word["verb"]>, meaning: string, topic: WordTopic): Word => ({
  ...w("verb", jp, meaning, topic),
  verb: cls,
});
