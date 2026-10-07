/**
 * Display settings live as attributes on <html> (data-furigana, data-romaji, data-size, data-font,
 * data-theme), and CSS shows the matching variant of every Japanese line. HEAD_SCRIPT sets them from
 * localStorage before the first paint, so a reload never flashes the default display. Pure.
 */
import {
  DEFAULT_SETTINGS,
  FONTS,
  FURIGANA_MODES,
  SCRIPT_TO_FURIGANA,
  type Settings,
  settingsSchema,
  TEXT_SIZES,
  THEMES,
} from "@/lib/schemas";

export const SETTINGS_KEY = "np:settings";

export function settingsToAttributes(s: Settings): Record<string, string> {
  return {
    "data-furigana": s.furigana,
    "data-romaji": s.romaji ? "on" : "off",
    "data-size": s.size,
    "data-font": s.font,
    "data-theme": s.theme,
  };
}

export const DEFAULT_ATTRIBUTES = settingsToAttributes(DEFAULT_SETTINGS);

const json = (x: unknown) => JSON.stringify(x);

/**
 * Runs in <head> before anything paints. Plain ES5 in a string, so no bundler transform can break it;
 * tests/display.test.ts checks it agrees with decode(settingsSchema) on every case. It mirrors the
 * envelope rules: unwrapped data is version 0, a newer version or anything unreadable means defaults.
 */
export const HEAD_SCRIPT = `(function(){
var D=${json(DEFAULT_SETTINGS)},s=D;
function pick(o,v,f){return o.indexOf(v)>=0?v:f}
try{
var raw=localStorage.getItem(${json(SETTINGS_KEY)});
if(raw!==null){
var p=JSON.parse(raw),v=0,d=p;
if(p&&typeof p==="object"&&!Array.isArray(p)&&Object.keys(p).length===2&&"data" in p&&typeof p.v==="number"&&p.v%1===0&&p.v>=1){v=p.v;d=p.data}
if(v<=${settingsSchema.version}&&d&&typeof d==="object"&&!Array.isArray(d)){
if(v<2)d={furigana:${json(SCRIPT_TO_FURIGANA)}[d.script],romaji:d.romaji};
s={furigana:pick(${json(FURIGANA_MODES)},d.furigana,D.furigana),
romaji:typeof d.romaji==="boolean"?d.romaji:D.romaji,
size:pick(${json(TEXT_SIZES)},d.size,D.size),
font:pick(${json(FONTS)},d.font,D.font),
theme:pick(${json(THEMES)},d.theme,D.theme)};
}
}
}catch(e){s=D}
var r=document.documentElement;
r.setAttribute("data-furigana",s.furigana);
r.setAttribute("data-romaji",s.romaji?"on":"off");
r.setAttribute("data-size",s.size);
r.setAttribute("data-font",s.font);
r.setAttribute("data-theme",s.theme);
})();`;

/** Sets the display attributes on <html>, e.g. when the reader changes a setting. */
export function applyAttributes(root: { setAttribute(name: string, value: string): void }, s: Settings): void {
  for (const [name, value] of Object.entries(settingsToAttributes(s))) root.setAttribute(name, value);
}

/**
 * The CSS for "furigana on new kanji only": in that mode readings start hidden, and each kanji not yet
 * learned gets one rule that shows the reading of every word containing it. E2 feeds it the kanji on
 * the page and the learned set.
 */
export function furiganaCss(pageKanji: Iterable<string>, learned: ReadonlySet<string>): string {
  const unlearned = [...new Set(pageKanji)].filter((k) => !learned.has(k));
  return unlearned.map((k) => `[data-furigana=new] .w[data-k*="${k}"] rt{display:revert}`).join("\n");
}
