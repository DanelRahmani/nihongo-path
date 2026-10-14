import { reviewIds } from "@/lib/review-data";

/** Static JSON for the home page's review count: the card ids this build can ask, fetched when the page is idle. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(reviewIds());
}
