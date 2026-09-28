export type Script = "hiragana" | "katakana";
export type KanaGroup = "base" | "dakuten" | "yoon";

export interface Kana {
  /** Stable id, e.g. "hiragana:し". */
  id: string;
  char: string;
  /** Accepted answers; the first is the Hepburn spelling shown in charts. */
  romaji: string[];
  script: Script;
  group: KanaGroup;
  /** Row key, e.g. "ka" — rows unlock in order in the drill. */
  row: string;
}

type RowDef = [row: string, cells: [char: string, ...romaji: string[]][]];

/** Hiragana source table. Katakana is derived by code-point shift. */
const HIRAGANA: Record<KanaGroup, RowDef[]> = {
  base: [
    ["a", [["あ", "a"], ["い", "i"], ["う", "u"], ["え", "e"], ["お", "o"]]],
    ["ka", [["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"]]],
    ["sa", [["さ", "sa"], ["し", "shi", "si"], ["す", "su"], ["せ", "se"], ["そ", "so"]]],
    ["ta", [["た", "ta"], ["ち", "chi", "ti"], ["つ", "tsu", "tu"], ["て", "te"], ["と", "to"]]],
    ["na", [["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"]]],
    ["ha", [["は", "ha"], ["ひ", "hi"], ["ふ", "fu", "hu"], ["へ", "he"], ["ほ", "ho"]]],
    ["ma", [["ま", "ma"], ["み", "mi"], ["む", "mu"], ["め", "me"], ["も", "mo"]]],
    ["ya", [["や", "ya"], ["ゆ", "yu"], ["よ", "yo"]]],
    ["ra", [["ら", "ra"], ["り", "ri"], ["る", "ru"], ["れ", "re"], ["ろ", "ro"]]],
    ["wa", [["わ", "wa"], ["を", "o", "wo"], ["ん", "n", "nn"]]],
  ],
  dakuten: [
    ["ga", [["が", "ga"], ["ぎ", "gi"], ["ぐ", "gu"], ["げ", "ge"], ["ご", "go"]]],
    ["za", [["ざ", "za"], ["じ", "ji", "zi"], ["ず", "zu"], ["ぜ", "ze"], ["ぞ", "zo"]]],
    ["da", [["だ", "da"], ["ぢ", "ji", "di"], ["づ", "zu", "du"], ["で", "de"], ["ど", "do"]]],
    ["ba", [["ば", "ba"], ["び", "bi"], ["ぶ", "bu"], ["べ", "be"], ["ぼ", "bo"]]],
    ["pa", [["ぱ", "pa"], ["ぴ", "pi"], ["ぷ", "pu"], ["ぺ", "pe"], ["ぽ", "po"]]],
  ],
  yoon: [
    ["kya", [["きゃ", "kya"], ["きゅ", "kyu"], ["きょ", "kyo"]]],
    ["sha", [["しゃ", "sha", "sya"], ["しゅ", "shu", "syu"], ["しょ", "sho", "syo"]]],
    ["cha", [["ちゃ", "cha", "tya", "cya"], ["ちゅ", "chu", "tyu", "cyu"], ["ちょ", "cho", "tyo", "cyo"]]],
    ["nya", [["にゃ", "nya"], ["にゅ", "nyu"], ["にょ", "nyo"]]],
    ["hya", [["ひゃ", "hya"], ["ひゅ", "hyu"], ["ひょ", "hyo"]]],
    ["mya", [["みゃ", "mya"], ["みゅ", "myu"], ["みょ", "myo"]]],
    ["rya", [["りゃ", "rya"], ["りゅ", "ryu"], ["りょ", "ryo"]]],
    ["gya", [["ぎゃ", "gya"], ["ぎゅ", "gyu"], ["ぎょ", "gyo"]]],
    ["ja", [["じゃ", "ja", "zya", "jya"], ["じゅ", "ju", "zyu", "jyu"], ["じょ", "jo", "zyo", "jyo"]]],
    ["bya", [["びゃ", "bya"], ["びゅ", "byu"], ["びょ", "byo"]]],
    ["pya", [["ぴゃ", "pya"], ["ぴゅ", "pyu"], ["ぴょ", "pyo"]]],
  ],
};

/** Hiragana → katakana: the blocks are parallel, offset by 0x60. */
export function toKatakana(hira: string): string {
  return [...hira]
    .map((c) => {
      const code = c.codePointAt(0)!;
      return code >= 0x3041 && code <= 0x3096 ? String.fromCodePoint(code + 0x60) : c;
    })
    .join("");
}

function build(): Kana[] {
  const out: Kana[] = [];
  for (const script of ["hiragana", "katakana"] as const) {
    for (const group of ["base", "dakuten", "yoon"] as const) {
      for (const [row, cells] of HIRAGANA[group]) {
        for (const [hira, ...romaji] of cells) {
          const char = script === "hiragana" ? hira : toKatakana(hira);
          out.push({ id: `${script}:${char}`, char, romaji, script, group, row });
        }
      }
    }
  }
  return out;
}

export const KANA: Kana[] = build();

export interface Deck {
  id: string;
  script: Script;
  group: KanaGroup;
  title: string;
  titleJp: string;
  /** Row keys in unlock order. */
  rows: string[];
}

const GROUP_TITLES: Record<KanaGroup, string> = {
  base: "Basic",
  dakuten: "Dakuten",
  yoon: "Combos",
};

export const DECKS: Deck[] = (["hiragana", "katakana"] as const).flatMap((script) =>
  (["base", "dakuten", "yoon"] as const).map((group) => ({
    id: `${script}-${group}`,
    script,
    group,
    title: `${script === "hiragana" ? "Hiragana" : "Katakana"} · ${GROUP_TITLES[group]}`,
    titleJp: script === "hiragana" ? "ひらがな" : "カタカナ",
    rows: HIRAGANA[group].map(([row]) => row),
  })),
);

export function deckCards(deck: Deck): Kana[] {
  return KANA.filter((k) => k.script === deck.script && k.group === deck.group);
}

/** Chart layout: gojūon grid positions so や and わ rows leave gaps in the right columns. */
export const VOWEL_COLUMNS = ["a", "i", "u", "e", "o"] as const;

export function chartRows(script: Script, group: KanaGroup): { row: string; cells: (Kana | null)[] }[] {
  return HIRAGANA[group].map(([row]) => {
    const cards = KANA.filter((k) => k.script === script && k.group === group && k.row === row);
    if (group === "yoon") return { row, cells: cards };
    if (row === "ya") return { row, cells: [cards[0], null, cards[1], null, cards[2]] };
    if (row === "wa") return { row, cells: [cards[0], null, null, null, cards[1]] };
    return { row, cells: cards };
  });
}

/** ん sits outside the grid in charts. */
export function isN(k: Kana): boolean {
  return k.char === "ん" || k.char === "ン";
}
