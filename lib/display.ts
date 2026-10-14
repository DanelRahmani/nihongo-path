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
  srsSchema,
  TEXT_SIZES,
  THEMES,
} from "@/lib/schemas";
import { MAX_BOX, UNLOCK_BOX } from "@/lib/srs";

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
 * learned gets one rule that shows the reading of every word containing it. Fed every kanji the app shows
 * and the kanji learned in the kanji cards (lib/kanji-deck.ts).
 */
export function furiganaCss(pageKanji: Iterable<string>, learned: ReadonlySet<string>): string {
  const unlearned = [...new Set(pageKanji)].filter((k) => !learned.has(k));
  return unlearned.map((k) => `[data-furigana=new] .w[data-k*="${k}"] rt{display:revert}`).join("\n");
}

/** The <style> element that holds those rules: written before the first paint, then kept up to date. */
export const FURIGANA_STYLE_ID = "furigana-new";

/**
 * Plain ES5, inlined in <head> after HEAD_SCRIPT: works out the learned kanji from the stored schedule (the current
 * version only: decks whose id starts with "kanji", readable cards at UNLOCK_BOX or above) and writes furiganaCss's rules for every
 * other kanji in `allKanji`, so "furigana on new kanji" shows the right readings from the first paint. Anything
 * unreadable, or a schedule from a newer build, counts as nothing learned: every reading shows.
 */
export function furiganaScript(allKanji: string): string {
  return `(function(){
var K=${json([...allKanji])},L={},css=[];
try{
var p=JSON.parse(localStorage.getItem(${json("np:srs")}));
var d=p&&p.v===${srsSchema.version}&&p.data&&p.data.decks;
if(d&&typeof d==="object"){for(var id in d){if(Object.prototype.hasOwnProperty.call(d,id)&&id.indexOf("kanji")===0&&d[id]&&d[id].cards){
var c=d[id].cards;for(var ch in c){var b=Object.prototype.hasOwnProperty.call(c,ch)&&c[ch];
if(b&&b.box%1===0&&b.box>=${UNLOCK_BOX}&&b.box<=${MAX_BOX}&&typeof b.due==="number"&&isFinite(b.due))L[ch]=1}}}}
}catch(e){L={}}
for(var i=0;i<K.length;i++){var k=K[i];if(!L[k])css.push('[data-furigana=new] .w[data-k*="'+k+'"] rt{display:revert}')}
var st=document.createElement("style");st.id=${json(FURIGANA_STYLE_ID)};st.textContent=css.join("\\n");
document.head.appendChild(st);
})();`;
}
