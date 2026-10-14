import type { Metadata } from "next";
import { RegisterDrill } from "@/components/register/RegisterDrill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ALL_LESSONS } from "@/content/units";
import { registerCards } from "@/lib/register-cards";

export const metadata: Metadata = { title: "Polite and casual" };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Spaced repetition</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">丁寧・普通</span> <span className="text-2xl text-ink-2">Polite and casual</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        A lesson line in one register: say it in the other, the way the lesson does, typed with a Japanese keyboard.
        Spaces and punctuation don&apos;t matter, and a wrong answer shows the first word that differs.
      </p>
      <div className="mt-8">
        <RegisterDrill cards={registerCards()} lessons={ALL_LESSONS.map((l) => l.key)} />
      </div>
    </div>
  );
}
