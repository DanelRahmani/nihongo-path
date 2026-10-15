import { buildSearchIndex } from "@/lib/search";
import { indexSources } from "@/lib/search-sources";

/**
 * Static JSON for the search dialog, requested only when the reader opens it: pages, lessons, grammar topics and
 * kanji. The words come from /dictionary-data.json in the dialog (lib/search.ts wordItems), so they aren't sent twice.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex({ ...indexSources(), words: [], extra: [] }));
}
