"use client";

import { useLayoutEffect } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { applyAttributes, applyThemeColor } from "@/lib/display";
import type { Settings } from "@/lib/schemas";
import { useStore } from "@/lib/storage";
import { settingsStore } from "@/lib/stores";
import { closeWhenFocusLeaves } from "@/components/ui/popover";

const FURIGANA: { value: Settings["furigana"]; label: string; sample: React.ReactNode; hint: string }[] = [
  { value: "kana", label: "Kana only", sample: "ねこ", hint: "Kanji written in kana, with spaces between words." },
  {
    value: "all",
    label: "Furigana",
    sample: (
      <ruby>
        猫<rt>ねこ</rt>
      </ruby>
    ),
    hint: "Kanji with the reading above.",
  },
  {
    value: "new",
    label: "New kanji",
    sample: (
      <>
        <ruby>
          子<rt>こ</rt>
        </ruby>
        猫
      </>
    ),
    hint: "Readings only over kanji you haven't learned yet in the kanji cards.",
  },
  { value: "none", label: "Kanji", sample: "猫", hint: "Kanji alone, as Japanese is printed." },
];

const sample = (node: React.ReactNode, className = "") => (
  <span lang="ja" className={`flex h-9 items-end leading-none ${className}`}>
    {node}
  </span>
);

export function DisplaySettings() {
  const [settings, setSettings] = useStore(settingsStore);
  const update = (patch: Partial<Settings>) => setSettings((s) => ({ ...s, ...patch }));

  // Keep <html> in step with the store: after every change, and after React's development-mode remount,
  // which clears the attributes the head script set. In production the first run changes nothing.
  useLayoutEffect(() => {
    const s = settingsStore.get();
    applyAttributes(document.documentElement, s);
    applyThemeColor(document, s.theme);
    // Next rewrites <head> on navigation and drops the theme-color tag; put it back whenever that happens.
    const watch = new MutationObserver(() => applyThemeColor(document, settingsStore.get().theme));
    watch.observe(document.head, { childList: true });
    return () => watch.disconnect();
  }, [settings]);

  return (
    <>
      <button
        type="button"
        popoverTarget="display-settings"
        className="flex h-9 items-center gap-2 rounded-full border border-line-strong bg-surface px-2.5 text-sm whitespace-nowrap text-ink-2 transition-colors duration-150 hover:border-accent hover:text-accent sm:px-3.5"
      >
        <span lang="ja" className="font-serif text-base leading-none text-ink">
          表示
        </span>
        <span className="sr-only sm:not-sr-only">Display</span>
      </button>

      <div
        id="display-settings"
        popover="auto"
        onBlur={closeWhenFocusLeaves}
        aria-label="Display settings"
        className="fixed top-[4.5rem] right-4 max-h-[calc(100dvh-6rem)] w-[min(22rem,calc(100vw-2rem))] space-y-5 overflow-y-auto rounded-panel border border-line bg-surface p-5 text-ink shadow-pop"
      >
        <div>
          <Segmented
            legend="Kanji"
            name="furigana"
            value={settings.furigana}
            columns={2}
            onChange={(furigana) => update({ furigana })}
            options={FURIGANA.map((m) => ({ value: m.value, label: m.label, sample: sample(m.sample, "font-jp text-2xl") }))}
          />
          <p className="mt-2 text-xs text-ink-2">{FURIGANA.find((m) => m.value === settings.furigana)?.hint}</p>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
          <div>
            <p className="text-sm font-medium">Show romaji</p>
            <p className="text-xs text-ink-2">Latin letters under Japanese lines</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={settings.romaji}
            aria-label="Show romaji"
            onClick={() => update({ romaji: !settings.romaji })}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${settings.romaji ? "bg-accent" : "bg-line-strong"}`}
          >
            <span
              className={`absolute top-1 left-1 size-5 rounded-full bg-surface shadow-card transition-transform duration-200 ease-soft ${
                settings.romaji ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        <div className="border-t border-line pt-4">
          <Segmented
            legend="Text size"
            name="size"
            value={settings.size}
            onChange={(size) => update({ size })}
            options={[
              { value: "s", label: "Small", sample: sample("あ", "font-jp text-base") },
              { value: "m", label: "Medium", sample: sample("あ", "font-jp text-xl") },
              { value: "l", label: "Large", sample: sample("あ", "font-jp text-3xl") },
            ]}
          />
        </div>

        <div className="border-t border-line pt-4">
          <Segmented
            legend="Japanese typeface"
            name="font"
            value={settings.font}
            onChange={(font) => update({ font })}
            options={[
              { value: "mincho", label: "Mincho", sample: sample("日本語", "font-serif text-xl") },
              { value: "gothic", label: "Gothic", sample: sample("日本語", "font-sans text-xl") },
            ]}
          />
        </div>

        <div className="border-t border-line pt-4">
          <Segmented
            legend="Theme"
            name="theme"
            value={settings.theme}
            onChange={(theme) => update({ theme })}
            options={[
              { value: "system", label: "System" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
