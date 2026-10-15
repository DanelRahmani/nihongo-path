import { packMoreCards } from "@/lib/vocab-deck";
import { vocabMoreCards } from "@/lib/vocab-more-cards";

/** Static JSON of the "More words" cards (I6), fetched only when the deck is switched on or has cards to review. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(packMoreCards(vocabMoreCards()));
}
