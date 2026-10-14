import { KANJI } from "@/content/kanji";
import { NAMES, WORDS } from "@/content/words";
import { NON_LESSON_WORDS } from "@/content/words/expansion";
import type { DictionaryData } from "@/lib/lookup";
import { tableReadings } from "@/lib/joyo";

/** Static JSON, requested by the word inspector only after a learner opens it. The 常用 readings are added here, so joyo.json stays out of client code. */
export const dynamic = "force-static";

export function GET() {
  const data: DictionaryData = {
    licence: "CC BY-SA 4.0. Derived from JMdict and KANJIDIC2 (© EDRDG, https://www.edrdg.org/edrdg/licence.html), wordfreq and the 常用漢字表; sources at /credits.",
    words: WORDS,
    extra: NON_LESSON_WORDS,
    names: NAMES,
    kanji: KANJI.map((k) => ({ ...k, ...(tableReadings(k.char) ?? { on: [], kun: [], special: [] }) })),
  };
  return Response.json(data);
}
