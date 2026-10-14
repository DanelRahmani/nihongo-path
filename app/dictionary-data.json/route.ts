import { KANJI } from "@/content/kanji";
import { NAMES, WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import type { DictionaryData } from "@/lib/lookup";
import { tableReadings } from "@/lib/joyo";

/** Static JSON, requested by the word inspector only after a learner opens it. The 常用 readings are added here, so joyo.json stays out of client code. */
export const dynamic = "force-static";

export function GET() {
  const data: DictionaryData = {
    words: WORDS,
    extra: EXTRA_WORDS,
    names: NAMES,
    kanji: KANJI.map((k) => ({ ...k, ...(tableReadings(k.char) ?? { on: [], kun: [], special: [] }) })),
  };
  return Response.json(data);
}
