"use client";

import type { ScriptMode } from "@/content/types";
import { settingsStore } from "@/lib/stores";
import { useStore } from "@/lib/storage";

const MODES: { value: ScriptMode; label: string; sample: React.ReactNode; hint: string }[] = [
  { value: "kana", label: "Kana only", sample: "ねこ", hint: "Kanji written in kana" },
  {
    value: "furigana",
    label: "Furigana",
    sample: (
      <ruby>
        猫<rt>ねこ</rt>
      </ruby>
    ),
    hint: "Kanji with the reading above",
  },
  { value: "kanji", label: "Kanji", sample: "猫", hint: "Kanji, no reading" },
];

export function DisplaySettings() {
  const [settings, setSettings] = useStore(settingsStore);

  return (
    <>
      <button
        type="button"
        popoverTarget="display-settings"
        className="flex h-9 items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 text-sm whitespace-nowrap text-ink-2 transition-colors duration-150 hover:border-accent hover:text-accent"
      >
        <span lang="ja" className="font-serif text-base leading-none text-ink">
          表示
        </span>
        <span className="hidden sm:inline">Display</span>
      </button>

      <div
        id="display-settings"
        popover="auto"
        className="fixed top-[4.5rem] right-4 w-[min(22rem,calc(100vw-2rem))] rounded-panel border border-line bg-surface p-5 text-ink shadow-pop"
      >
        <fieldset>
          <legend className="text-xs font-medium tracking-[0.18em] text-ink-2 uppercase">Script</legend>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {MODES.map((m) => {
              const active = settings.script === m.value;
              return (
                <label
                  key={m.value}
                  className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl border px-2 pt-3 pb-2 text-center transition-colors duration-150 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent ${
                    active ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong hover:bg-paper-2"
                  }`}
                >
                  <input
                    type="radio"
                    name="script"
                    value={m.value}
                    checked={active}
                    onChange={() => setSettings((s) => ({ ...s, script: m.value }))}
                    className="sr-only"
                  />
                  <span lang="ja" className="flex h-9 items-end font-serif text-2xl leading-none">
                    {m.sample}
                  </span>
                  <span className={`text-xs ${active ? "text-accent" : "text-ink-2"}`}>{m.label}</span>
                </label>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-ink-2">{MODES.find((m) => m.value === settings.script)?.hint}</p>
        </fieldset>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div>
            <p className="text-sm font-medium">Show romaji</p>
            <p className="text-xs text-ink-2">Latin letters under Japanese</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={settings.romaji}
            aria-label="Show romaji"
            onClick={() => setSettings((s) => ({ ...s, romaji: !s.romaji }))}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${settings.romaji ? "bg-accent" : "bg-line-strong"}`}
          >
            <span
              className={`absolute top-1 left-1 size-5 rounded-full bg-surface shadow-card transition-transform duration-200 ease-soft ${
                settings.romaji ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
}
