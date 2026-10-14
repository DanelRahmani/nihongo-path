import { buildSearchIndex } from "@/lib/search";
import { indexSources } from "@/lib/search-sources";

/** Static JSON for the search dialog, requested only when the reader opens it. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex(indexSources()));
}
