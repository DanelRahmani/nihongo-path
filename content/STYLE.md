# Content style guide

Every lesson, word list, reading text and quiz follows this file, and reviewers check content against it. When a rule changes, it changes here first, in the same commit as the content.

## 1. Teaching style

Lessons blend two teaching styles the learner finds easiest:

**Cure Dolly (Organic Japanese)**: explain Japanese *as Japanese*, not as broken English.
- Every sentence has a **core sentence**: a が-subject + a verb, adjective, or noun+だ.
- The subject is always there, even when unsaid: the **zero が** (e.g. `パン を [食|た]べる` → zero-が "I").
- は is **not** the subject marker. It sets the **topic** from outside the core sentence ("as for X…"), and it *can* be exclusive or contrastive: when it replaces が or を, or when two は contrast in one sentence. も is the inclusive topic ("X too").
- Particles are the engine: they tell you each word's job, so the order can move while the verb stays last.

**Jouzu Juls**: practical and example-first.
- Lead with natural, everyday sentences people actually say; flag textbook-only phrasing.
- Minimal pairs: change one thing, say plainly how the feeling changes.
- Name the common mistake and the fix. Keep jokes light, jargon rare.

English translations show nuance ("It's *Japan* that is beautiful"), not just a word-for-word gloss.

## 2. Accuracy and sources

- **Original examples only.** Never copy example sentences from textbooks, videos, apps or sentence databases (Tatoeba included). One named exception: 象は鼻が長い, the classic example sentence of Japanese linguistics and the title of Mikami Akira's 1960 book, used in word-order/topic-comment as “the famous example” and credited in its `source`. Any further exception is listed here first.
- Each lesson's `source` names the reference its rule was checked against (Genki, Tae Kim, IMABI, Cure Dolly…). The source backs the rule; the sentences are ours.
- Quoted texts (the reading view) are public domain only, such as Bashō or Issa, and their `source` names the edition the text and its reading were checked against.
- Readings, kanji choice, okurigana and politeness level are checked, not guessed. Anything that can't be checked goes to "Waiting on the owner" in `CLAUDE.md`, not into a lesson.
- **Pitch accent is not marked.** It is blocked on recordings by a native speaker. No speech synthesis.

## 3. Markup

Used in every Japanese string (see `content/types.ts`):

| Markup | Meaning |
|---|---|
| `[漢字|かんじ]` | Kanji with its reading, shown per the reader's furigana mode |
| `[!漢字|かんじ]` | The same, but the kanji and its furigana show in every mode, Kana only included. Only where seeing the kanji is the point: start/three-scripts, katakana look-alikes, and later the kanji pages |
| `{text}` | The highlighted ("red pen") part; may contain ruby |
| `**bold**`, `*italic*` | Emphasis |
| spaces | In Japanese lines (`jp` fields, Japanese-only table cells): word boundaries. Shown in kana-only mode, hidden otherwise, and used to space the romaji. In English prose: ordinary spaces, and Japanese inside prose has no word spaces. |
| `-` | In Japanese lines only: joins a personal name to its suffix or title (`[田中|たなか]-さん`). Never shown; a hyphen in the romaji (tanaka-san). Don't use it in prose, where it would show. |

## 4. Furigana: writing readings

- **Every kanji sits inside `[漢字|かな]`.** Kana-only mode must never show a bare kanji; the content test fails on one.
- **Readings are hiragana**, on-readings included (`[学生|がくせい]`, not `ガクセイ`). Tested.
- **One group per word's run of kanji, okurigana outside:** `[学生|がくせい]`, `[日本語|にほんご]`, `[食|た]べる`, `[美|うつく]しい`, `[申|もう]し[訳|わけ]`. Don't split a word's kanji into one group per character (not `[学|がく][生|せい]`).
- A suffix or title that is a word of its own keeps its own group: `お[客|きゃく][様|さま]`, `[山田|やまだ]-[先生|せんせい]`.
- **Readings that belong to the whole word** (熟字訓 jukujikun, and ateji) are always one group: `[今日|きょう]`, `[昨日|きのう]`, `[大人|おとな]`, `[一人|ひとり]`, `[二人|ふたり]`, `[部屋|へや]`, `[時計|とけい]`, `[上手|じょうず]`, `[八百屋|やおや]`. The kanji pages say that such a reading belongs to the word, not to each kanji.
- 々 stays in the group of the kanji it repeats: `[人々|ひとびと]`.
- Sound changes are part of the reading: `[三本|さんぼん]`, `[一本|いっぽん]`, `[六百|ろっぴゃく]`, `[三千|さんぜん]`, `[三匹|さんびき]`.
- **A kanji with several readings gets the one this sentence means, every time.** Never copy a reading from another line without checking it. The usual traps:
  - 今日: きょう (today) · こんにち (nowadays: 今日の日本). The greeting is always written こんにちは.
  - 一日: いちにち (one day, all day) · ついたち (the 1st of the month)
  - 上手: じょうず (skilful) · うわて (a cut above)
  - 何: なに · なん. なん before a counter (`[何時|なんじ]`, `[何歳|なんさい]`) and usually before a d, t or n sound (`[何|なん] です か`); なに before most other sounds (`[何|なに] を`). There are exceptions (なんで "why" vs なにで "by what"), so check each one.
  - 人: ひと (a person) · じん (nationality: `[日本人|にほんじん]`) · にん (counting: `[三人|さんにん]`; but `[一人|ひとり]`, `[二人|ふたり]`)
  - 来る: く (`[来|く]る`) · き (`[来|き]ます`) · こ (`[来|こ]ない`)
  - Family: `[母|はは]` (my mother, said to others) · `お[母|かあ]さん` (someone else's mother, or addressing your own). Likewise 父, 兄, 姉.
- Decks and the dictionary accept only the readings listed for the meaning being asked.

## 5. Kana or kanji

The references:
1. **常用漢字表** (Cabinet notice, 30 November 2010) for which kanji and which readings may be used, including its appendix of whole-word readings (付表: 今日, 昨日, 大人, 友達, 部屋, 時計, 眼鏡, 上手, 下手, 一人, 二人, 母さん, 父さん, 兄さん, 姉さん…). The appendix allows its words inside longer words, so お母さん is fine.
2. **送り仮名の付け方** (1973; revised 1981 and 2010) for okurigana, using its main rule (本則).
3. **公用文における漢字使用等について** (2010): **only its list of words written in kana** is adopted (formal nouns, helper verbs and the like, below). Its other choices are for official documents and are not followed: adverbs follow newspaper and textbook usage (あまり, まったく, すでに), and the polite prefixes お and ご are written in kana (`お[名前|なまえ]`, `ご[家族|かぞく]`).

Where they leave a choice, follow modern everyday usage (newspapers, NHK, current beginner textbooks) and stay consistent across lessons.

- **Only 常用 kanji, with 常用 readings.** A word whose kanji or reading is outside the table is written in kana: きれい (not 綺麗), おいしい (not 美味しい), かわいい (not 可愛い), すし (not 寿司), おなか (not お腹: 腹 is only フク and はら), すく (not 空く: 空 has no す reading), あいづち (槌 isn't 常用).
- **Write the whole word in kana**, never half kanji and half kana for a missing character (あいづち, not 相づち).
- The table doesn't list every sound change (it says so itself: 納得 なっとく), nor proper nouns. So voiced and doubled readings that follow from a listed reading (`[三匹|さんびき]`, `[喫茶店|きっさてん]`, `[一本|いっぽん]`) and names are fine. `tests/joyo.test.ts` checks every kanji and reading in the lessons against the table (`content/data/joyo.json`, built from the official text), through `lib/joyo.ts`. It allows:
  - voicing after the first kanji, and a small っ for a final つ/ち/く/き before another kanji (`[三本|さんぼん]`, `[一本|いっぽん]`);
  - a verb's noun form and stem + っ inside compounds (`[試合|しあい]`, `[切手|きって]`), and 来's conjugated stems き and こ;
  - 付表 words as units, also inside longer words (`[今日中|きょうじゅう]`, お`[母|かあ]`さん);
  - a short named list in `lib/joyo.ts` of sound changes the table leaves out (日本 にほん) and place names (大阪, 渋谷). Adding to it needs a reason, like the exception below.
- **Exceptions:** 明日 read あした. The appendix lists only あす, but 明日 for あした is standard in everyday writing and in beginner textbooks. Three more, confirmed by the owner (2026-10-14) for the dictionary expansion: 文字 もじ (the table lists モン and ジ, and gives もじ only as an example of neither), and the 連声 words 反応 はんのう and 天皇 てんのう (ん + あ/お read as the の/な row). Two more, chosen by the owner (2026-10-15) for the expansion: 出来事 できごと (the table lists 来 as ライ, く.る, きた.る and きた.す; き is only 来る's conjugated stem, allowed alone in its ruby (来ます), and ごと is the rendaku of こと) and 流行る はやる (はや is a 熟字訓 reading of the whole word, so one ruby group, `[流行|はや]る`; 流行 りゅうこう stays as the table reads it). できる itself stays in kana (below), as newspapers write できる but 出来事. Any further exception is added here, with its reason, before it is used.
- **Quoted texts keep their own kanji.** The reading view's haiku (`content/reading.ts`) are written as the edition named in their `source` prints them, with readings for every kanji, even where a kanji or reading is outside the table (蛙 かわず, 閑 しず). The corpus marks them `quoted`, and the 常用, kanji-data and dictionary tests skip them. Original reading texts follow every rule here.
- **No rare kanji in beginner content.** If everyday writing puts a word in kana, so do we.
- **Always in kana:**
  - formal nouns: こと, とき ("when…"), ところ (abstract), もの (abstract), わけ, はず, よう, ほか, とおり, うち (うちに), たび (たびに), とたん, and the suffixes ごと and おき after a number or noun (the quiz checker accepts a keyboard's 毎 and 置き for them there);
  - ある and いる (existence), できる ("can"), なる ("become"), ない;
  - helper verbs after the て form (the quiz checker also accepts the kanji a keyboard offers for these and for the formal nouns above, as whole words): 〜て いる, 〜て ある, 〜て いく, 〜て くる, 〜て みる, 〜て おく, 〜て しまう, 〜て あげる, 〜て くれる, 〜て もらう, 〜て いただく, 〜て ください. On their own these verbs keep their kanji: `[行|い]く`, `[来|く]る`, `[見|み]る`;
  - いう and いえば in という and its grammar uses (というのは, というと, というより, といえば), as with という “called”: the quiz checker accepts the keyboard's 言 for them only right after quoting と or って;
  - いく in わけにはいかない (わけ に は いかない / いきません), as the lessons write it: 行かない is "not going", and the idiom is a different word. The quiz checker accepts the keyboard's 行 for it only right after わけ に (は);
  - ください, in every use (a house choice);
  - ほしい after the て form (〜て ほしい), while the adjective on its own keeps its kanji (`[欲|ほ]しい`), as newspapers and NHK write them;
  - いい and よい with all their forms (よくない, よかった), a house choice: 良い is 常用, but beginner text writes these in kana;
  - grammar words: 〜かもしれない, 〜について, 〜にとって, 〜として, 〜をはじめ, など, ぐらい/くらい, ごろ (around a time), ばかり (たばかり "only just", and "nothing but"), ほう in のほうが and ほうがいい, and 〜すぎる after a stem or adjective (`[食|た]べすぎる`, `[高|たか]すぎる`);
  - set phrases and common adverbs as people write them: ありがとう, おはよう, すみません, よろしく, どうぞ, ちょっと.
- **Content nouns keep their kanji; formal nouns don't:** `[時間|じかん]`, `[七時|しちじ]`, `[食|た]べ[物|もの]`, but とき, ところ, もの in their grammatical use. The set compounds `[申|もう]し[訳|わけ]` and `[言|い]い[訳|わけ]` keep 訳.
- **Okurigana follow the main rule:** `[行|い]く` / `[行|おこな]う`, `[少|すこ]し`, `[新|あたら]しい`, `[終|お]わる`, `[分|わ]かる`, `[生|う]まれる`, `[話|はな]す` (verb) / `[話|はなし]` (noun). Nouns that custom writes without okurigana stay that way (`[切手|きって]`).
- **Katakana** for loanwords (コーヒー, パン), foreign names (スミス), and sound effects or emphasis only where a lesson teaches them.
- **Kana lessons** (Hiragana, Katakana) write every word in kana, including words normally written in kanji (やま, ねこ): reading the kana is the point, and a kanji with furigana would let the reader skip it.

## 6. Romaji

Romaji is **generated** from the kana reading by `lib/romaji.ts` and never typed by hand. `tests/golden-readings.test.ts` pins the scheme word by word, and `tests/__snapshots__/corpus.txt` pins every line in the curriculum. A change to the engine alone must leave the snapshot exactly as it is. Lesson marks and unit names are labels shown without romaji, so the snapshot doesn't pin romaji for them.

The scheme is modified Hepburn with long vowels spelled as the kana are written (no macrons):

| Case | Rule | Examples |
|---|---|---|
| Basic kana | し shi, ち chi, つ tsu, ふ fu, じ ji, ぢ ji, づ zu | すし sushi, はなぢ hanaji, つづく tsuzuku |
| Long vowels | spelled as written: おう ou, おお oo, えい ei, いい ii, うう uu | きょう kyou, おおきい ookii, せんせい sensei |
| Katakana ー | repeats the vowel before it | コーヒー koohii, ラーメン raamen |
| っ | doubles the next consonant; t before ch; dropped at the end of a word | きって kitte, まっちゃ matcha, あっ！ a! |
| ん before a vowel or y | n' | ほんや hon'ya, きんえん kin'en |
| ん before b, m, p | stays n (not m) | しんぶん shinbun, さんぽ sanpo |
| は, へ, を as particles | wa, e, o: the particle is its own word in the markup | わたし は watashi wa |
| Stacked particles | each its own word | ここ で は ない koko de wa nai |
| Set words ending in は | こんにちは konnichiwa, こんばんは konbanwa, and the conjunction では dewa (では、…) | |
| は inside a word | ha, and a kanji word read は (歯, 葉) is ha | はな hana, 歯 ha |
| Extended katakana | ティ ti, ディ di, ファ fa, フィ fi, フェ fe, フォ fo, ヴァ va, ウィ wi, ウェ we, シェ she, ジェ je, チェ che | ティッシュ tisshu |
| Names | a hyphen where the markup joins a name to its suffix or title; none for family words or other suffixes | tanaka-san, yamada-sensei, sumisu-san, tanaka-san-tachi; okaasan, okyakusama |
| ・ | separates words: a space | は・が wa ga |
| Case and punctuation | all lower case; 。→ . 、→ , 「」 and 『』→ " ！→ ! ？→ ? 〜 → ~ … → ... | |

Romaji is a reading aid only. Typed answers are kana or kanji, entered through a Japanese keyboard (IME), with one exception: reading questions in the kana lessons (`answerIn: "romaji"`) ask how a word is read and take romaji, since a Japanese keyboard would write the kana for the learner. They accept the common other spellings (si/shi, tu/tsu, ō/ou/oo, n/n', m/n before b, m, p, and ん typed as nn: `lib/romaji-input.ts`), and name a small っ or a long vowel that is missing or added. Before the kana lessons, a question can ask for a name (`answerIn: "name"`, such as the name of a script), typed in English letters or in Japanese.

## 7. Word spaces in Japanese lines

The romaji follows the word spaces, so they are written consistently:

- **Particles are their own word**, sentence-final ones included: `[私|わたし] は`, `[一緒|いっしょ] に`, `よ`, `ね`, `か`, `の`. Stacked particles too: `に は`, `で は`, `に も`. The combined ending よね stays together, and では is one word only as the conjunction at the start of a sentence (`では、…`). Tested.
- **です, だ and their forms are their own word**, so is な after a na-adjective (a form of だ): `[学生|がくせい] です`, `[学生|がくせい] じゃ ない`, `[暇|ひま] だったら`, `[静|しず]か な [町|まち]`. The past of a polite negative splits the same way: `[行|い]きません でした`, `じゃ ありません でした`.
- **The explanatory ん is its own word:** `[行|い]った ん です`, `[見|み]て きた ん だ けど`. After a noun or na-adjective it fuses with な into one word: `そう なん だ`, `[学生|がくせい] なん です`.
- **Fixed compound particles are one word; a particle followed by an ordinary verb is two.** A case particle plus a verb form that has become a grammar word of its own is written as one word, and listed as a function word or an expression: について, にとって, として, をはじめ, に[関|かん]して, に[対|たい]して, によって, につれて. When the verb keeps its own meaning (比べる, 代わる, する, 言う), the particle and the verb stay two words, so the word card can show the verb and the romaji follows the particle rule: に [比|くら]べて, に [代|か]わって, に して は, と する, と いう. The casual hearsay だって is one word too (`[医者|いしゃ] だって`, `ん だって`).
- **Verb and i-adjective endings stay attached:** `[食|た]べます`, `[食|た]べなかった`, `[高|たか]くない`, `よくない`, `したくない`.
- **A helper verb after the て form is its own word:** `[食|た]べて いる`, `[書|か]いて ください`, `[見|み]て きた`.
- **する verbs: the noun and する are separate:** `[勉強|べんきょう] する`, `[結婚|けっこん] して います`.
- **Prefixes and suffixes stay attached:** `お[茶|ちゃ]`, `お[客|きゃく][様|さま]`, `[学生|がくせい]たち`. A personal name is joined to its suffix or title with `-`: `[田中|たなか]-さん`, `[健太|けんた]-くん`, `スミス-さん`, `[山田|やまだ]-[先生|せんせい]`, `[田中|たなか]-さん-たち`. Family words are not names: `お[母|かあ]さん`. Tested.
- **Set greetings that Japanese treats as one expression are one word:** いただきます, いってきます, いってらっしゃい, おかえりなさい, ただいま. Phrases with separable parts keep them: `おはよう ございます`, `ごちそうさま でした`, `よろしく お[願|ねが]い します`.
- Punctuation attaches to the word before it.

## 8. Punctuation and symbols

- Japanese sentences use full-width punctuation: 。、「」『』？！（）・. No ASCII , . ? ! : ( ) " ~ inside a Japanese sentence (tested).
- **。** ends a statement. **？** ends a question, also after か; this is clearer for learners, though formal writing often puts 。 after か. A か that invites or muses rather than asks may take 。 (`そろそろ [行|い]きましょう か。`).
- **！** sparingly, in exclamations and dialogue.
- 「」 for quoted speech and cited words; 『』 for titles and for a quote inside a quote.
- **〜** is U+301C (wave dash), for "something goes here" (〜ます, 〜さん). Never U+FF5E ～ (tested) or ASCII ~.
- **ー** (U+30FC) is the katakana long-vowel mark. Never 一 (the kanji for one), ‐, −, or － (tested).
- **…**: a single … (U+2026) for trailing off in dialogue, as in chat and comics. This is a house choice; Japanese print typesetting uses a double …….
- **Numbers:** in example sentences, kanji numerals with ruby (`[三人|さんにん]`, `[七時|しちじ]`). That is a teaching choice, because reading them is the point; everyday horizontal text writes 3人 and 7時, keeping kanji only in fixed words (一人, 一番, 一度). In reading texts (menus, signs, prices, times), half-width Arabic digits, with one ruby group over the number and its counter, so the furigana and romaji give the spoken number: `[10時|じゅうじ]`, `[400円|よんひゃくえん]`. Never full-width ０–９ (tested).
- **Table cells that list forms** use English-style notation between Japanese items: ` · ` (U+00B7) or `, ` between alternatives, `→` for a change, and ASCII parentheses for an optional or alternative reading (`[七|なな] (しち)`). Lesson marks use ・ (U+30FB) between items.
- No spaces in rendered Japanese: word spaces are markup only. Never the ideographic space U+3000 (tested). Never half-width katakana (tested).

## 9. Registers: polite and plain

The two registers are 丁寧体 (です・ます体, polite) and 普通体 (plain).

- **Polite:** the sentence ends in a です/ます form: です, でした, じゃ ありません, ます, ました, ません, ません でした, ましょう; i-adjective + です (`[高|たか]い です`, `[高|たか]くない です`); 〜て ください as a request.
- **Plain:** だ, だった, じゃ ない; plain verb forms (`[食|た]べる`, `[食|た]べた`, `[食|た]べない`); an i-adjective alone; a noun or na-adjective with だ dropped in conversation; a bare て form as a request (`[窓|まど] を [開|あ]けて`).
- **Sentence-final particles:** よ, ね and よね follow either register. の (as a question) and かな are plain only; their polite equivalents are 〜ん です か and 〜でしょう か.
- **A line's register is set by the last predicate of each sentence.** Clauses before it may be plain or polite, and either way they don't set the register: たら clauses and relative clauses are plain by grammar (`[雨|あめ] が [降|ふ]ったら、[行|い]きません。` is polite), けど and から clauses often keep です/ます in polite speech (`[高|たか]い です けど`), and a direct quote keeps its own register.
- **One line, one register.** Don't end one sentence polite and the next plain in the same line, unless switching is the point of the lesson; such a line says so in its note.
- Every lesson declares `register`: `polite`, `plain` or `both` (from B1), or `neutral` for a lesson of single words with no sentences (the kana lessons; tested).
- **The other-register line** (`alt`, from B1) keeps the meaning and changes as little as possible, choosing the natural form over the literal one: `[行|い]きます か？` → `[行|い]く？` (plain questions usually drop か); `[学生|がくせい] です。` → `[学生|がくせい] だ よ。` or just `[学生|がくせい]。` (a bare だ can sound blunt). The drill also accepts the engine's variants (ません / ない です).
- Honorific and humble language (尊敬語, 謙譲語) only in lessons that teach it. Set phrases that contain it are fine anywhere: いただきます, いってらっしゃい, おはよう ございます, お[客|きゃく][様|さま], 〜て おります in the business example of the suffixes unit.
- Gendered sentence endings (わ, ぜ, ぞ, かしら) only in lessons that discuss them.

## 10. Lesson template (enforced from B1)

Every lesson has, in this order:
1. **The idea**: one sentence.
2. **Core examples**: 3–5 natural sentences, each with the key part highlighted.
3. **Contrast pairs**: the same sentence with one thing changed, and a plain-English note on how the meaning shifts.
4. **Common mistake**: a callout showing ✗ the mistake and ✓ the fix.
5. **In real conversation**: a short dialogue or a culture note.
6. **Quiz**: 3–5 typed questions, each with its accepted answers and an explanation.

It also has the fields `source`, `register` and `kinds`. A lesson that can't follow a step says why in its `exempt` field, and the template test reads that reason.

In the kana lessons:
- the core examples are words, and each highlight marks the kana the lesson teaches (`さい{ふ}`, `き{っ}ぷ`);
- the contrast pairs are minimal pairs, two words that differ in one kana or one beat (つき/すき, おばさん/おばあさん);
- "in real conversation" is a culture note;
- the quiz asks for readings in romaji (§6), using words that are not in the lesson's examples.

## 11. Review

Every new unit of content, and every large word list, is read by a fresh reviewer agent (Opus 5.5). The reviewer gets the content file, its printed dump (`npm run dump -- <unit or lesson>`: location, Japanese, reading, romaji, English) and this file. It reports **errors**, **should-fix**, **polish** and **can't-verify** items, and edits nothing. Every finding is applied, or the reason it isn't is recorded in the commit message. Can't-verify items go into "Waiting on the owner" in `CLAUDE.md`.

## 12. Notes from the learner's Notion (checked)

Useful framing kept: zero が, the core sentence, は exclusive / も inclusive topic, に target vs で place of action or means.

Corrected, not copied:
- に has no fixed "time → destination → intention → target" order; time tends to come first by habit only.
- 日本が美しい is grammatical but means "It's *Japan* that's beautiful"; the neutral sentence is 日本は美しい.
- 世界で一番ラーメン needs the adjective: 世界で一番おいしいラーメン.
