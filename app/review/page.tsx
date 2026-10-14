import type { Metadata } from "next";
import { ReviewQueue } from "@/components/review/ReviewQueue";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Review" };

export default function ReviewPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Everything due</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">復習</span> <span className="text-2xl text-ink-2">Review</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Every card that&apos;s due, from every drill, the most overdue first, then the mistakes in your notebook. Each is
        asked the way its own drill asks it.
      </p>
      <div className="mt-8">
        <ReviewQueue />
      </div>
    </div>
  );
}
