import { todayWords } from "@/lib/today-words";

/** Static JSON for the Today card's word of the day, fetched when the home page is idle. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(todayWords());
}
