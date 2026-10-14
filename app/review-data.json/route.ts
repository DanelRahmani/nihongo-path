import { reviewData } from "@/lib/review-data";

/** Static JSON for the review page: every deck's cards, fetched when the page opens. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(reviewData());
}
