import type { Metadata } from "next";
import Link from "next/link";
import { Rich } from "@/components/Jp";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Set up a Japanese keyboard",
  description: "How to add and use a Japanese keyboard on iPhone and iPad, Android, Windows and Mac.",
};

/*
 * Menu names move between system versions, so the steps name where to look rather than every tap; the details not
 * checked on each system are listed under "Waiting on the owner" in CLAUDE.md (I2). Japanese here is markup
 * ([!食|た]べる keeps the kanji visible in every furigana mode, since the point is what the keyboard offers).
 */

interface System {
  id: string;
  name: string;
  add: string[];
  switchTo: string[];
  convert: string[];
}

const SYSTEMS: System[] = [
  {
    id: "ios",
    name: "iPhone and iPad",
    add: [
      "Open Settings, then General, then Keyboard, then Keyboards.",
      "Choose Add New Keyboard, then Japanese, and pick Romaji (a full English-letter layout, the easiest start). Kana is the flick layout Japanese phones use; you can add it later.",
    ],
    switchTo: ["Tap the globe key below the letters to move to the next keyboard, or touch and hold it to pick one from a list."],
    convert: [
      "Type the word in English letters: taberu shows たべる (on some versions kanji appear as you type).",
      "The bar above the keys offers spellings: tap [!食|た]べる for the kanji, or たべる for kana.",
      "While a word is still being typed, the space key moves through the suggestions and the return key keeps what's shown.",
    ],
  },
  {
    id: "android",
    name: "Android (Gboard)",
    add: [
      "If your phone uses another keyboard (many Samsung phones do), install Gboard from the Play Store and choose it, or add Japanese to the keyboard you have.",
      "Open Gboard's settings (the gear in its toolbar, or Keyboard in your phone's Settings).",
      "Choose Languages, then Add keyboard, then Japanese (日本語), and pick the QWERTY layout to type in English letters. 12 keys is the flick layout Japanese phones use.",
    ],
    switchTo: ["Tap the globe key to change keyboards."],
    convert: [
      "Type the word in English letters: taberu shows たべる.",
      "The row above the keys offers spellings: tap [!食|た]べる for the kanji, or たべる for kana. Swipe the row for more.",
      "While a word is still being typed, the space key moves through the suggestions and the enter key keeps what's shown.",
    ],
  },
  {
    id: "windows",
    name: "Windows (Microsoft IME)",
    add: [
      "Open Settings, then Time & language, then Language & region (Language on older versions).",
      "Add a language, choose Japanese (日本語) and install it. The Microsoft IME comes with it. Leave “Set as my Windows display language” unticked, unless you want Windows itself in Japanese.",
    ],
    switchTo: [
      "Press Windows key + Space to change input language. The taskbar then shows the IME's mode: A for English letters, あ for hiragana.",
      "Change the mode by clicking A or あ, with Alt + ` (the key above Tab), or with the 半角/全角 key on a Japanese keyboard.",
    ],
    convert: [
      "Type taberu and the line shows たべる, underlined while it is open.",
      "Press Space to turn it into kanji ([!食|た]べる); press Space again for the next choice, then Enter to keep it. Enter alone keeps the kana.",
      "F7 turns what you've typed into katakana, before you press Enter.",
    ],
  },
  {
    id: "mac",
    name: "Mac",
    add: [
      "Open System Settings, then Keyboard, then Text Input (Input Sources), and choose Edit.",
      "Press +, choose Japanese and the Romaji input source, then Add.",
    ],
    switchTo: [
      "Press Control + Space, or the 🌐 key on recent keyboards, or choose from the input menu in the menu bar (it shows あ while you type Japanese).",
      "If letters stay English, check Caps Lock: Keyboard settings can make it switch between ABC and Japanese.",
    ],
    convert: [
      "Type taberu. On most Macs kanji appear as you type ([!食|た]べる): this is Live Conversion.",
      "Press Space for other choices, then Enter to keep the one shown.",
      "To keep kana, press Control + J (hiragana) or Control + K (katakana) before Enter, or turn Live Conversion off in the input menu.",
    ],
  },
];

/** What to type for the kana that aren't one letter pair, the same on every system with romaji input. */
const ROMAJI: { what: string; type: string; gives: string }[] = [
  { what: "ん", type: "nn; a single n is enough before a consonant other than y", gives: "hon → ほん, konnya → こんや (konya gives こにゃ)" },
  { what: "Small っ (a held sound)", type: "the next consonant twice; tch or cch before ch", gives: "kitte → きって, matcha → まっちゃ" },
  { what: "Small ゃ ゅ ょ", type: "y after the consonant; sh and ch need no y", gives: "kyaku → きゃく, shashin → しゃしん" },
  { what: "A small kana on its own", type: "x or l first", gives: "xtu or ltu → っ, xya → ゃ" },
  { what: "Loanword sounds", type: "thi, dhi, fa", gives: "thi → てぃ (ti gives ち), fa → ふぁ" },
  { what: "ー (a long vowel in katakana)", type: "the hyphen key (-), or ー on a phone", gives: "ko-hi- → こーひー, then convert to コーヒー" },
  { what: "。、？ and ・", type: ". , ? on a computer; / for ・ on Windows and Mac", gives: "Hai, sou desu. → はい、そうです。" },
  { what: "を (the object particle)", type: "wo", gives: "wo → を" },
  { what: "The particles は and へ", type: "ha and he, as they are written", gives: "ha → は (said wa)" },
  { what: "Katakana words", type: "the word in letters, then convert", gives: "pan → ぱん → パン" },
];

function Steps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="mt-5">
      <h3 className="font-medium">{title}</h3>
      <ol className="mt-2 list-decimal space-y-2 pl-5 leading-relaxed text-ink-2 marker:text-ink-2">
        {steps.map((s) => (
          <li key={s}>
            <Rich text={s} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function KeyboardPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow jp="キーボード">Typing Japanese</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">Set up a Japanese keyboard</h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        <Rich text="The quizzes and drills are answered in kana and kanji, typed with a Japanese keyboard. Most learners type in English letters and let the keyboard turn them into kana: taberu becomes たべる, and the keyboard then offers [!食|た]べる. Most phones and computers have one built in; it only needs adding." />
      </p>
      <p className="mt-3 leading-relaxed text-ink-2">
        Kana is enough almost everywhere: the quizzes and most drills accept a word in kana, so you only need to pick the
        kanji on the kanji cards.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        Menu names change a little between versions, so the steps say where to look. If a name differs on yours, search
        your settings for “keyboard” or “Japanese”.
      </p>

      <nav aria-label="On this page" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {SYSTEMS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3.5 text-sm hover:border-accent hover:text-accent">
                {s.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#romaji" className="inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3.5 text-sm hover:border-accent hover:text-accent">
              Typing kana
            </a>
          </li>
        </ul>
      </nav>

      {SYSTEMS.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mt-10 rounded-panel border border-line bg-surface p-5 sm:p-7">
          <h2 id={`${s.id}-heading`} className="font-serif text-2xl font-bold">
            {s.name}
          </h2>
          <Steps title="Add the keyboard" steps={s.add} />
          <Steps title="Switch to it" steps={s.switchTo} />
          <Steps title="Type kana and kanji" steps={s.convert} />
        </section>
      ))}

      <section id="romaji" aria-labelledby="romaji-heading" className="mt-10">
        <h2 id="romaji-heading" className="font-serif text-2xl font-bold">
          Typing kana in English letters
        </h2>
        <p className="mt-3 leading-relaxed text-ink-2">Most kana are a consonant and a vowel (ka か, shi し). These are the ones that aren’t:</p>
        {/* No scroller: the three short columns wrap at phone width. */}
        <div className="mt-4">
          <table aria-labelledby="romaji-heading" className="w-full border-collapse text-left text-sm break-words">
            <thead>
              <tr className="border-b border-line text-ink-2">
                <th scope="col" className="py-2 pr-4 font-medium">
                  To write
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Type
                </th>
                <th scope="col" className="py-2 font-medium">
                  For example
                </th>
              </tr>
            </thead>
            <tbody>
              {ROMAJI.map((r) => (
                <tr key={r.what} className="border-b border-line align-top">
                  <th scope="row" className="py-2.5 pr-3 font-medium">
                    <Rich text={r.what} />
                  </th>
                  <td className="py-2.5 pr-3 text-ink-2">{r.type}</td>
                  <td className="py-2.5">
                    <Rich text={r.gives} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 leading-relaxed text-ink-2">
          Ready to try it? <Link href="/type" className="link-inline">Type it</Link> gives you lesson lines to copy. The{" "}
          <Link href="/kana#drill" className="link-inline">kana drill</Link> and the quiz questions that ask for a reading
          in romaji are the exception: switch back to English letters for those, or the keyboard turns the answer into
          kana.
        </p>
      </section>
    </div>
  );
}
