import type { ReviewData } from "@/lib/review-data";

let data: Promise<ReviewData> | undefined;

/** The static /review-data.json, fetched once per page view; a failed fetch is forgotten, so a later call retries. */
export function loadReviewData(): Promise<ReviewData> {
  data ??= fetch("/review-data.json")
    .then((response) => {
      if (!response.ok) throw new Error("The review data could not be loaded.");
      return response.json() as Promise<ReviewData>;
    })
    .catch((error: unknown) => {
      data = undefined;
      throw error;
    });
  return data;
}
