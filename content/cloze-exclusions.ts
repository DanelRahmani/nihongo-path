/**
 * The cloze deck's hand-reviewed data (E5), keyed by card id ("unit/lesson#hash", lib/cloze-cards.ts clozeId),
 * each with its line beside it. Lines are also left out by rule (lib/cloze-cards.ts): pair lines whose other side
 * fits the same gap, lines with several highlights, highlights covering most of the line, and the kana lessons.
 */

/** Lines left out by hand: another answer is equally right, or the line doesn't test what its lesson teaches. */
export const CLOZE_EXCLUSIONS: Record<string, string> = {
  // その [本|ほん] ＿＿ [昨日|きのう] [読|よ]んだ。 (は)
  "word-order/topic-comment#1hp5wdf": "を also fits “I read that book yesterday”.",
  // この [町|まち] ＿＿ [静|しず]か です。 (は)
  "particles/wa-topic#49hyv3": "が also fits “This town is quiet”.",
  // [弟|おとうと] ＿＿ [好|す]き な [歌|うた] (が)
  "particles/wa-vs-ga#v14nhi": "の also fits in a describing clause (弟の好きな歌).",
  // [家|いえ] ＿＿ [出|で]る。 (を)
  "particles/wo-object#1tb44dt": "から also fits “leave the house” (家から出る).",
  // [夜|よる] [九時|くじ] ＿＿ です。 (まで)
  "particles/kara-made#1hklyup": "“Nine in the evening” doesn't say “until”; only the dialogue gives まで.",
  // [十時|じゅうじ] ＿＿ です。 (から)
  "particles/kara-made#1q0f3th": "“At ten” doesn't say “from”; only the dialogue gives から.",
  // ＿＿ [電車|でんしゃ] が [便利|べんり] です。 ([日本|にほん] は)
  "word-order/topic-comment#1cztdb9": "日本では also fits “Trains are convenient in Japan”.",
  // ＿＿ [電車|でんしゃ] が [便利|べんり] だ よ。 ([日本|にほん] は)
  "word-order/topic-comment#ww2spr": "日本では also fits “Trains are convenient in Japan”.",
  // すみません、 ＿＿ は いくら です か？ (それ)
  "grammar/kosoado#nuh6ou": "あれ also fits “How much is that?”; the English doesn't say where the thing is.",
  // ＿＿ は [五千円|ごせんえん] です。 (あれ)
  "grammar/kosoado#azqce4": "それ also fits “That one's 5,000 yen”.",
  // ＿＿ は [学生|がくせい] です か？ (あなた)
  "culture/avoid-anata#1vlsxhu": "Any name or title fits, and the lesson teaches avoiding あなた, not using it.",
  // ＿＿ は [学生|がくせい] です か？ ([田中|たなか]-さん)
  "culture/avoid-anata#1tm2qiv": "Any name or title fits “Are you a student?”.",
  // わざわざ ＿＿。 (すみません)
  "culture/sumimasen#1ou0qwj": "ありがとう(ございます) also fits “Thank you for going to all that trouble”.",
  // [!私|わたし] は ＿＿ が [!好|す]き です。 (コーヒー)
  "start/three-scripts#3zf6ea": "three-scripts shows the scripts and teaches neither word; the learner hasn't met kana yet.",
  // ＿＿ を [!勉強|べんきょう] して います。 ([!日本語|にほんご])
  "start/three-scripts#3xgh1b": "three-scripts shows the scripts and teaches neither word; the learner hasn't met kana yet.",
  // [夏休|なつやす]み ＿＿ どこか [行|い]きました か？ (に)
  "particles/ni-target#12v2wwu": "は also fits (夏休みはどこか行きましたか？).",
  // [帰|かえ]＿＿ (る), and the same for 入る, 走る, 知る and 切る
  "verbs/verb-groups#1h7fwx5": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  "verbs/verb-groups#owvqls": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  "verbs/verb-groups#15s6ws4": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  "verbs/verb-groups#qokyqk": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  "verbs/verb-groups#rrvmw4": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  // [変|か]え＿＿ (ます)
  "verbs/verb-groups#1ler4ia": "The gap is the ending ます alone, which the English gives away; the card tests nothing.",
  // [電話|でんわ]＿＿ です。 and three more: the answer is the kanji 中
  "suffixes/chuu-juu#alelyp": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#8bu5y3": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#17adcuf": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#at5bm6": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#1o4hs3y": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#1pznjnw": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  // [映画|えいが] ＿＿ [好|す]き です。 (が)
  "n5-essentials/no-nominaliser#deq20n": "は also fits “I like films” (映画は好きです).",
  // [田中|たなか]-さん は たぶん [来|こ]ない ＿＿。 (でしょう)
  "n5-essentials/deshou#upouy9": "たぶん already says “probably”, so です also fits (来ないです).",
  // たぶん [電車|でんしゃ] の [中|なか] ＿＿。 (でしょう)
  "n5-essentials/deshou#130ktxv": "たぶん already says “probably”, so です also fits (電車の中です).",
  // この [時計|とけい] は ＿＿ [高|たか]い です。 (とても)
  "n5-essentials/sugiru#knkjpy": "すごく and other words for “very” fit too.",
  // この [薬|くすり] を [飲|の]＿＿、 [元気|げんき] に なります よ。 (めば), and the other ば gaps where たら and と fit
  // as well (a natural result, directions): the card would only check that some “if” was formed.
  "n4-conditions/ba#x21e62": "たら and と fit as well, so the card can't test ば.",
  "n4-conditions/ba#10ji0w4": "たら and と fit as well, so the card can't test ば.",
  // [毎日|まいにち] [勉強|べんきょう] ＿＿、 [日本語|にほんご] が [上手|じょうず] に なります よ。 (すれば), and its casual line
  "n4-conditions/ba#10qx5lu": "たら and と fit as well, so the card can't test ば.",
  "n4-conditions/ba#axxo24": "たら and と fit as well, so the card can't test ば.",
  // [早|はや]く [寝|ね]＿＿、 [明日|あした] [起|お]きられません よ。 (なければ)
  "n4-conditions/ba#1rn5t6o": "たら and と fit as well, so the card can't test ば.",
  // あの [角|かど] を [右|みぎ] に [曲|ま]が＿＿、 すぐ です よ。 (れば)
  "n4-conditions/ba#125wv8u": "たら and と fit as well, so the card can't test ば.",
  // [急|いそ]＿＿、 [電車|でんしゃ] に [乗|の]れます よ。 (げば), and its casual line
  "n4-conditions/conditionals-compared#13jpp34": "たら and と fit as well, so the card can't test ば.",
  "n4-conditions/conditionals-compared#1pvn8ja": "たら and と fit as well, so the card can't test ば.",
  // [一時間|いちじかん] [待|ま]った ＿＿、 [彼|かれ] は [来|き]ません でした。 (のに), and its casual line
  "n4-conditions/noni#1yz4a1z": "けど also fits; only the English (“still”, “and yet”) points to のに.",
  "n4-conditions/noni#19mf467": "けど also fits; only the English (“still”, “and yet”) points to のに.",
  // この [店|みせ] は [安|やす]い ＿＿、 おいしい です。 (のに), and its casual line
  "n4-conditions/noni#1lia4ib": "けど also fits; only the English (“still”, “and yet”) points to のに.",
  "n4-conditions/noni#1dr61j0": "けど also fits; only the English (“still”, “and yet”) points to のに.",
  // [傘|かさ] を [持|も]って いる ＿＿、 [使|つか]わない ん です か？ (のに), and its casual line
  "n4-conditions/noni#1qjwck2": "けど also fits; only the English (“still”, “and yet”) points to のに.",
  "n4-conditions/noni#1dbwvqs": "けど also fits; only the English (“still”, “and yet”) points to のに.",
  // [待|ま]って いた ＿＿… (のに)
  "n4-conditions/noni#u5yxfd": "けど also fits; only the English (“still”, “and yet”) points to のに.",
  // え、 [昨日|きのう]、 [来|く]る って [言|い]って いた ＿＿… (のに)
  "n4-conditions/noni#a2mh5c": "けど also fits; only the English (“still”, “and yet”) points to のに.",
  // [今日|きょう] は [雨|あめ] だ ＿＿、 [家|いえ] に いよう。 (し), and its polite line
  "n4-conditions/shi#29khod": "から also fits “It's raining today, so let's stay in”.",
  "n4-conditions/shi#18043h9": "から also fits “It's raining today, so let's stay in”.",
  // [時間|じかん] も ない ＿＿、 タクシー で [行|い]きましょう。 (し), and its casual line
  "n4-conditions/shi#al1db1": "から also fits.",
  "n4-conditions/shi#evu0u5": "から also fits.",
  // あの [店|みせ] は [安|やす]い し、 おいしい ＿＿、 いつも [人|ひと] が [多|おお]い です。 (し), and its casual line
  "n4-conditions/shi#1fh56kc": "から also fits.",
  "n4-conditions/shi#1nuzrm8": "から also fits.",
  // [頭|あたま] も [痛|いた]い ＿＿、 [今日|きょう] は [早|はや]く [帰|かえ]ります。 (し), and its casual line
  "n4-conditions/shi#hhtz4k": "から also fits.",
  "n4-conditions/shi#17zy3ey": "から also fits.",
  // [駅|えき] から [近|ちか]い し、 [広|ひろ]い ＿＿。 (し): an answer to どうして
  "n4-conditions/shi#19zygtf": "から also fits.",
  // [病院|びょういん] に [行|い]っ＿＿？ (たら どう), and [一度|いちど] [先生|せんせい] に [相談|そうだん] し＿＿？: their polite twins
  // gap the same line, and the casual card can't name its register (the English is the same).
  "n4-conditions/advice#1bjjq1h": "Its polite line has the same English, so たらどうですか fits as well and the card can't name a register.",
  "n4-conditions/advice#opfax0": "Its polite line has the same English, so たらどうですか fits as well and the card can't name a register.",
  // この ナイフ は パン を [切|き]る ＿＿ [使|つか]います。 (のに), and its casual line
  "n4-plans/noni-purpose#160a47b": "ために (N3) also fits “I use this knife for cutting bread”.",
  "n4-plans/noni-purpose#130p8mq": "ために (N3) also fits “I use this knife for cutting bread”.",
  // この [仕事|しごと] を する ＿＿ [日本語|にほんご] が [必要|ひつよう] です か？ (のに), and its casual line
  "n4-plans/noni-purpose#2w5q2c": "ために (N3) also fits “Do you need Japanese to do this job?”.",
  "n4-plans/noni-purpose#uej4sn": "ために (N3) also fits “Do you need Japanese to do this job?”.",
  // [卵|たまご] を [焼|や]く ＿＿ [使|つか]う ん だ よ。 (のに)
  "n4-plans/noni-purpose#q1qkhk": "ために (N3) also fits “It's for frying eggs”.",
  // [駅|えき] まで [走|はし]った ＿＿、 [間|ま]に[合|あ]いません でした。 (のに)
  "n4-plans/noni-purpose#1xzqu91": "けど also fits, and it's the “even though” のに, not this lesson's.",
  // [遅|おく]れない ＿＿ ね。 (よう に して)
  "n4-plans/you-ni-suru-naru#gcwr98": "で also fits: 遅れないでね (don't be late).",
  // [今日|きょう] は [早|はや]く [寝|ね]＿＿。 (よう と [思|おも]う), and its polite line
  "n4-plans/you-to-omou#wwo8cj": "よう alone also fits “I think I'll get to bed early” (寝よう).",
  "n4-plans/you-to-omou#xc1aes": "ます also fits “I think I'll get to bed early” (寝ます).",
  // [来週|らいしゅう] の [土曜日|どようび] は [友達|ともだち] と [会|あ]う ＿＿ が ある。 ([予定|よてい]), and its polite line
  "n4-plans/you-to-omou#1ggrnaa": "やくそく (a promise to meet) also fits.",
  "n4-plans/you-to-omou#1hcckto": "やくそく (a promise to meet) also fits.",
  // [今夜|こんや] は ＿＿ が ある から、 [行|い]けない。 ([予定|よてい]), and its polite line
  "n4-plans/you-to-omou#1vsurl3": "用事 and 約束 also fit “I've got plans tonight”.",
  "n4-plans/you-to-omou#rinjd9": "用事 and 約束 also fit “I've got plans tonight”.",
  // [来月|らいげつ]、 [京都|きょうと] に [行|い]く ＿＿ です。 ([予定|よてい])
  "n4-plans/you-to-omou#sj2i6d": "つもり also fits; the pair's point is the contrast.",
  // [来月|らいげつ]、 [京都|きょうと] に [行|い]＿＿。 (こう と [思|おも]って います)
  "n4-plans/you-to-omou#1xs2nck": "きます and くつもりです also fit; the pair's point is the contrast.",
  // いい ね。 [僕|ぼく] は [家|いえ] で ゆっくり する ＿＿。 (つもり)
  "n4-plans/you-to-omou#19boaqy": "予定 also fits, and つもり is another lesson's point.",
  // [宿題|しゅくだい] は もう [全部|ぜんぶ] やって ＿＿。 (しまいました)
  "n4-plans/te-shimau#mmherj": "あります and おきました also fit “I've already done all my homework”.",
  // [宿題|しゅくだい] は もう [全部|ぜんぶ] やっ＿＿。 (ちゃった): its casual line
  "n4-plans/te-shimau#o6x2m6": "た also fits “I've already done all my homework” (やった).",
  // この [本|ほん]、 [一日|いちにち] で [読|よ]ん＿＿。 (じゃった)
  "n4-plans/te-shimau#1aw374l": "だ also fits: 読んだ.",
  // [会議|かいぎ] に [遅|おく]れ＿＿、 ごめん。 (ちゃって)
  "n4-plans/te-shimau#9vwo3l": "て also fits: 遅れて、ごめん.",
  // [今日中|きょうじゅう] に [洗濯|せんたく] を して ＿＿。 (しまおう), and its polite line
  "n4-plans/te-shimau#mwfgh5": "おこう (ておく) also fits “Let's get the washing done today”.",
  "n4-plans/te-shimau#1c3qpif": "おきましょう (ておく) also fits “Let's get the washing done today”.",
  // [宿題|しゅくだい] を [忘|わす]れ＿＿。 (ました)
  "n4-plans/te-shimau#ifnsr5": "The pair's plain side: ちゃった and てしまいました fit too, and it doesn't test てしまう.",
  // [宿題|しゅくだい] を [忘|わす]れて ＿＿。 (しまいました): the pair's other side
  "n4-plans/te-shimau#1efbfny": "きました also fits “I'm afraid I've forgotten my homework” (忘れてきました).",
  // [授業|じゅぎょう] の [前|まえ] に、 この ページ を [読|よ]んで ＿＿ ください。 (おいて), and its casual line
  "n4-plans/te-oku#p7bnuf": "読んでください alone says “Please read this page”; みて fits too.",
  "n4-plans/te-oku#adozxs": "で also fits: 読んでね (please read it).",
  // その まま に して ＿＿ ください。 (おいて), and its casual line
  "n4-plans/te-oku#1rb6twe": "そのままにしてください says the same, so nothing in the hint calls for おいて.",
  "n4-plans/te-oku#o2a1ec": "て also fits: そのままにして.",
  // [使|つか]った お[皿|さら] は、 [後|あと] で [洗|あら]う から、 そこ に [置|お]いて ＿＿。 (おいて), and its polite line
  "n4-plans/te-oku#1p8oywj": "ね also fits: そこに置いてね.",
  "n4-plans/te-oku#1i9jirm": "置いてください alone says “Leave the plates there”.",
  // [切符|きっぷ] を [買|か]い＿＿。 (ました), and the pair's other side
  "n4-plans/te-oku#x346w3": "The pair's plain side: it doesn't test ておく.",
  "n4-plans/te-oku#zb24h7": "あります (てある) also fits “I've got the tickets in”.",
  // ホテル は もう [予約|よやく] して ＿＿。 (あります), and its casual line
  "n4-plans/te-aru#1us35nn": "います (予約しています) also fits “The hotel's already booked”.",
  "n4-plans/te-aru#1qr7kg1": "いる (予約してるよ) also fits “The hotel's already booked”.",
  // [飲|の]み[物|もの] は テーブル の [上|うえ] に [並|なら]べて ＿＿。 (あります)
  "n4-plans/te-aru#10vdkl": "おきました (ておく) also fits after は.",
  // [部屋|へや] の エアコン は もう つけて ＿＿。 (あります)
  "n4-plans/te-aru#1fbyuh9": "おきました and います also fit after は.",
  // [新|あたら]しい ラーメン[屋|や] に [行|い]って ＿＿。 (みました)
  "n4-plans/te-miru#z7uqjx": "きました (went there) also fits “I tried the new ramen place”.",
  // [新|あたら]しい ラーメン[屋|や] に [行|い]って ＿＿。 (みた)
  "n4-plans/te-miru#eb9uck": "きた (went there) also fits “I tried the new ramen place”.",
  // [駅|えき] の [前|まえ] の [店|みせ] で カレー を [食|た]べ＿＿。 (ました)
  "n4-plans/te-miru#13km446": "The pair's plain side: てみました fits too, and it doesn't test てみる.",
  // [作|つく]り[方|かた] を [母|はは] に [聞|き]いて ＿＿ ね。 (みる)
  "n4-plans/te-miru#9vcfuh": "おく (ておく) also fits “I'll ask my mum”.",
  // [増|ふ]えて ＿＿ でしょう。 (いく)
  "n4-plans/te-iku-kuru#1xy2a8j": "くる also fits: 増えてくるでしょう (will start to grow).",
  // これ から [日本|にほん] に [来|く]る [人|ひと] は [増|ふ]えて ＿＿ だろう。 (いく), the casual line
  "n4-plans/te-iku-kuru#poad4n": "くる also fits: 増えてくるだろう (will start to grow).",
  // [明日|あした] の パーティー、 [何|なに] か [持|も]って ＿＿ か？ (いこう)
  "n4-plans/te-iku-kuru#18ckhhx": "こよう (持ってこようか) also fits “Shall I bring something to tomorrow's party?”.",
  // [分|わ]かった。 [妹|いもうと] も [連|つ]れて ＿＿ も いい？ (いって)
  "n4-plans/te-iku-kuru#12own3x": "きて also fits: asked of the host, 連れてきてもいい？ is as natural.",
  // [今|いま]、 [家|いえ] に [着|つ]いた ＿＿。 (ところ です), and its casual line
  "n4-plans/tokoro#17wmb4m": "ばかり also fits “I've just got home”.",
  "n4-plans/tokoro#1vfz4vw": "ばかり also fits “I've just got home”.",
  // [映画|えいが] が [始|はじ]まった ＿＿。 (ところ です)
  "n4-plans/tokoro#86ath0": "ばかり also fits “The film's just started”.",
  // [昼|ひる]ご[飯|はん] を [食|た]べた ＿＿ だ から (ところ)
  "n4-plans/tokoro#jc7bf1": "ばかり also fits “I've just had lunch, so I'm fine”.",
  // [昼|ひる]ご[飯|はん] を [食|た]べた ＿＿ です から (ところ)
  "n4-plans/tokoro#vsiar3": "ばかり also fits “I've just had lunch, so I'm fine”.",
  // はい、 [焼|や]いた ＿＿ です よ。 (ばかり)
  "n4-plans/ta-bakari#1ja72cl": "ところ also fits “it's fresh out of the oven”.",
  // [暗|くら]く なる ＿＿ [家|いえ] に [着|つ]きたい。 (まで に)
  "n4-plans/made-ni-aida#osdsm1": "前に also fits “by the time it gets dark”.",
  // [暗|くら]く なる ＿＿ [家|いえ] に [着|つ]きたい です。 (まで に)
  "n4-plans/made-ni-aida#196j0h3": "前に also fits “by the time it gets dark”.",
  // [料理|りょうり] を [作|つく]って いる ＿＿、 [子供|こども]たち は … いました。 ([間|あいだ])
  "n4-plans/made-ni-aida#chv56f": "とき also fits “While I was cooking”.",
  // [料理|りょうり] を [作|つく]って いる ＿＿、 [子供|こども]たち は … いた。 ([間|あいだ])
  "n4-plans/made-ni-aida#1sndmss": "とき also fits “While I was cooking”.",
  // [弟|おとうと] が いない ＿＿、 … [食|た]べちゃった。 ([間|あいだ] に)
  "n4-plans/made-ni-aida#1eyyslt": "ときに also fits “while he wasn't around”.",
  // [弟|おとうと] が いない ＿＿、 … しまいました。 ([間|あいだ] に)
  "n4-plans/made-ni-aida#7w42h6": "ときに also fits “while he wasn't around”.",
  // [彼|かれ] が [話|はな]して いる ＿＿、 [私|わたし] は [寝|ね]て しまいました。 ([間|あいだ] に)
  "n4-plans/made-ni-aida#653rzr": "とき and ときに also fit “I fell asleep while he was talking”.",
  // [今日|きょう] [帰|かえ]る ＿＿ やって おきます。 (まで に)
  "n4-plans/made-ni-aida#1spnntt": "前に also fits “before I go home today”.",
  // [待|ま]って いる ＿＿、 この [雑誌|ざっし] を … ([間|あいだ]), and its casual line
  "n4-plans/made-ni-aida#16y1xmt": "とき also fits “while you wait”.",
  "n4-plans/made-ni-aida#mohb0x": "とき also fits “while you wait”.",
  // [彼|かれ] が [話|はな]して いる ＿＿、 [私|わたし] は ずっと [聞|き]いて いました。 ([間|あいだ])
  "n4-plans/made-ni-aida#1quu6gv": "とき also fits “I listened the whole time he was talking”.",
  // [日本|にほん] に いる ＿＿、 [一度|いちど] [京都|きょうと] に … ([間|あいだ] に), and its casual line
  "n4-plans/made-ni-aida#1gkzcek": "ときに also fits “While I'm in Japan”.",
  "n4-plans/made-ni-aida#1l0b2zc": "ときに also fits “While I'm in Japan”.",
  // [砂糖|さとう] が ＿＿、 [困|こま]りました。 (なくて)
  "n4-plans/naide-zuni#1gaabz9": "なかったから and なかったので also fit “There was no sugar, so I was stuck”.",
};

/**
 * Other answers that count, reviewed by hand: a particle the lesson says also fits, and the digits a keyboard
 * offers for a number (as the lesson quizzes list them). Written as typed.
 */
export const CLOZE_ALSO: Record<string, string[]> = {
  // [学校|がっこう] ＿＿ [行|い]く。 (に)
  "particles/ni-target#dfhvgm": ["へ"],
  // はい、 [京都|きょうと] ＿＿ [行|い]きました。 (に)
  "particles/ni-target#o4rdlq": ["へ"],
  // [北|きた] ＿＿ [向|む]かう。 (へ): the lesson says both mark direction.
  "particles/e-vs-ni#qg11ya": ["に"],
  // [空港|くうこう] ＿＿ [急|いそ]ぐ。 (へ)
  "particles/e-vs-ni#bym6xw": ["に"],
  // [本|ほん] ＿＿ [雑誌|ざっし] を [読|よ]む。 (や): the lesson teaches とか too.
  "particles/to-ya#10z33pn": ["とか"],
  // [暑|あつ]い ＿＿、 [窓|まど] を [開|あ]けて。 (から)
  "particles/kara-made#1mf4v1l": ["ので"],
  // ＿＿？ すごい ね！ ([本当|ほんとう]): casual, and the quiz accepts え、ほんと？
  "culture/aizuchi#1h78sko": ["ほんと"],
  // りんご を ＿＿ ください。 ([三|みっ]つ), and the other counting lines
  "grammar/numbers-counting#xyzfbn": ["3つ"],
  "grammar/numbers-counting#x2pemp": ["5枚"],
  "grammar/numbers-counting#1h6d5ks": ["2本"],
  "grammar/numbers-counting#1pqgp07": ["2人"],
  // [猫|ねこ] が ＿＿ いる。 ([三匹|さんびき])
  "suffixes/tachi-plural#uny2gr": ["3匹"],
  // [毎日|まいにち] [薬|くすり] を [飲|の]ま＿＿ なりません。 (なければ), and the other なければ gaps before
  // なりません, ならない or いけません: the lesson teaches なくては beside it.
  "n5-essentials/nakereba#wvn967": ["なくては"],
  "n5-essentials/nakereba#1pv2234": ["なくては"],
  "n5-essentials/nakereba#1bwni0i": ["なくては"],
  "n5-essentials/nakereba#t7iw08": ["なくては"],
  "n5-essentials/nakereba#10h2c8e": ["なくては"],
  "n5-essentials/nakereba#x9z8l4": ["なくては"],
  // [明日|あした] は [六時|ろくじ] に [起|お]き＿＿ いけません。 (なくて は), and its casual line
  "n5-essentials/nakereba#11o0uz8": ["なければ"],
  "n5-essentials/nakereba#1fl2cfq": ["なければ"],
  // [今日|きょう] は [銀行|ぎんこう] に [行|い]か＿＿ いけません。 (なくて は), and the other new なくては gaps
  "n5-essentials/nakereba#cq9w5a": ["なければ"],
  "n5-essentials/nakereba#a44sc": ["なければ"],
  "n5-essentials/nakereba#19ladi3": ["なければ"],
  "n5-essentials/nakereba#zjr00i": ["なければ"],
  "n5-essentials/nakereba#1cf71u0": ["なければ"],
  // [明日|あした] テスト です から、 [勉強|べんきょう] し＿＿ いけません。 (ない と), and そろそろ [寝|ね]＿＿ いけません。
  "n5-essentials/nakereba#1skcuu": ["なければ", "なくては"],
  "n5-essentials/nakereba#ju4ijm": ["なければ", "なくては"],
  "n5-essentials/nakereba#15fius7": ["なければ", "なくては"],
  "n5-essentials/nakereba#fkztao": ["なければ", "なくては"],
  "n5-essentials/nakereba#1pp85oq": ["なければ", "なくては"],
  // そろそろ [寝|ね]＿＿。 (ない と): the casual short forms fit as well.
  "n5-essentials/nakereba#1vxwbht": ["なきゃ", "なくちゃ"],
  "n5-essentials/nakereba#1nwspdi": ["なきゃ", "なくちゃ"],
  // もう [九時|くじ] だ。 [行|い]か＿＿。 (なきゃ), and the other casual must gaps that end the line
  "n5-essentials/nakereba#1nbamvi": ["なくちゃ", "ないと"],
  "n5-essentials/nakereba#1bjxqmm": ["なくちゃ", "ないと"],
  "n5-essentials/nakereba#vtkjy2": ["なきゃ", "ないと"],
  // [田中|たなか]-さん に [電話|でんわ] し＿＿ いけない。 (なきゃ)
  "n5-essentials/nakereba#3yq0e1": ["なくちゃ", "なければ", "なくては", "ないと"],
  // [明日|あした] は [来|こ]＿＿ です よ。 (なくて も いい), and every なくてもいい gap: the lesson says casual
  // speech drops the も.
  "n5-essentials/nakute-mo-ii#5fbv2w": ["なくていい"],
  "n5-essentials/nakute-mo-ii#1mgvbno": ["なくていい"],
  "n5-essentials/nakute-mo-ii#4tj7pk": ["なくていい"],
  "n5-essentials/nakute-mo-ii#fr6u1w": ["なくていい"],
  "n5-essentials/nakute-mo-ii#1ki7y0": ["なくていい"],
  "n5-essentials/nakute-mo-ii#ar3l9e": ["なくていい"],
  "n5-essentials/nakute-mo-ii#1w7jbg0": ["なくていい"],
  "n5-essentials/nakute-mo-ii#1irx085": ["なくていい"],
  "n5-essentials/nakute-mo-ii#yngl2n": ["なくていい"],
  "n5-essentials/nakute-mo-ii#1j63bjd": ["なくていい"],
  // [私|わたし] は [絵|え] を [描|か]く ＿＿ が [好|す]き です。 (の), and the other のが好き and のは gaps: the
  // lesson says こと fits there too.
  "n5-essentials/no-nominaliser#prz2xz": ["こと"],
  "n5-essentials/no-nominaliser#160evfd": ["こと"],
  "n5-essentials/no-nominaliser#1nxcab9": ["こと"],
  "n5-essentials/no-nominaliser#57wvvo": ["こと"],
  "n5-essentials/no-nominaliser#9bwygm": ["ことが"],
  "n5-essentials/no-nominaliser#kxmq9i": ["こと"],
  "n5-essentials/no-nominaliser#1tgr62q": ["こと"],
  "n5-essentials/no-nominaliser#1c3zrke": ["こと"],
  // [肉|にく] と [魚|さかな] と、 ＿＿ が [好|す]き です か？ (どちら), and the other which-of-two gaps: どちら and
  // どっち both fit (the quiz accepts either). Not the shop assistant's どちら, which wouldn't be どっち to a customer.
  "n5-essentials/comparing#dcrbpr": ["どっち"],
  "n5-essentials/comparing#1spka3h": ["どっち"],
  "n5-essentials/comparing#wer1ku": ["どっち"],
  "n5-essentials/comparing#1kgh4": ["どっち"],
  "n5-essentials/comparing#p89dzo": ["どちら"],
  "n5-essentials/comparing#1mrc5yq": ["どちら"],
  // [毎日|まいにち] [二時間|にじかん] ＿＿ [勉強|べんきょう] して います。 (ぐらい), and every くらい/ぐらい gap: the lesson says
  // they mean the same.
  "n5-essentials/gurai-goro#lj2tmu": ["くらい"],
  "n5-essentials/gurai-goro#1wcdk42": ["くらい"],
  "n5-essentials/gurai-goro#wdi2x1": ["くらい"],
  "n5-essentials/gurai-goro#1yry58h": ["くらい"],
  "n5-essentials/gurai-goro#16e4hf9": ["くらい"],
  "n5-essentials/gurai-goro#1mkqrzd": ["くらい"],
  "n5-essentials/gurai-goro#auoyko": ["くらい"],
  "n5-essentials/gurai-goro#1ledxdc": ["くらい"],
  "n5-essentials/gurai-goro#1r4qded": ["ぐらい"],
  "n5-essentials/gurai-goro#r3b649": ["ぐらい"],
  // [天気|てんき] が ＿＿、 [山|やま] に [登|のぼ]ります。 (よければ), and the お金があれば lines: after a state ば leads
  // into a plan, and so does たら (the lesson's pair says so); と doesn't, so the card still tests the “if”.
  "n4-conditions/ba#1v2jro7": ["よかったら"],
  "n4-conditions/ba#yshh31": ["よかったら"],
  "n4-conditions/ba#1ok1wfj": ["あったら"],
  "n4-conditions/ba#j8j3iy": ["あったら"],
  // コーヒー ＿＿、 [私|わたし] が [作|つく]ります よ。 (なら), and the other なら gaps after a noun or な-adjective
  "n4-conditions/nara#2jy8gc": ["だったら"],
  "n4-conditions/nara#84v6n6": ["だったら"],
  "n4-conditions/nara#1you382": ["だったら"],
  "n4-conditions/nara#1dbinix": ["だったら"],
  "n4-conditions/conditionals-compared#1jrea4g": ["だったら"],
  // カメラ を [買|か]う ＿＿、 この [店|みせ] が [安|やす]い です よ。 (なら), and the other なら gaps after a verb or
  // い-adjective: the quizzes accept んなら and のなら.
  "n4-conditions/nara#1td4p6s": ["ん なら", "の なら"],
  "n4-conditions/nara#xklhcw": ["ん なら", "の なら"],
  "n4-conditions/nara#nzclvf": ["ん なら", "の なら"],
  "n4-conditions/nara#1ns9i7z": ["ん なら", "の なら"],
  "n4-conditions/nara#goxho2": ["ん なら", "の なら"],
  "n4-conditions/nara#37gece": ["ん なら", "の なら"],
  "n4-conditions/conditionals-compared#kc9pba": ["ん なら", "の なら"],
  "n4-conditions/conditionals-compared#18adqx6": ["ん なら", "の なら"],
  "n4-conditions/conditionals-compared#1xypcrd": ["ん なら", "の なら"],
  // この [料理|りょうり] は [高|たか]い ＿＿、 おいしい。 (けど), and every “but” gap: the lesson teaches けど, けれど,
  // けれども and が as the same “but”, が as the formal one (not in casual lines).
  "n4-conditions/kedo#ivuy7r": ["けれど", "けれども"],
  // [行|い]きたい ＿＿、 [時間|じかん] が ない。 (けど): のに fits too, with frustration.
  "n4-conditions/kedo#shngg5": ["けれど", "けれども", "のに"],
  "n4-conditions/kedo#12zkm86": ["けれど", "けれども"],
  "n4-conditions/kedo#77869i": ["けれど", "けれども"],
  // [先生|せんせい]、 [宿題|しゅくだい] を [忘|わす]れた ん です ＿＿… (けど), and [明日|あした] の [会議|かいぎ] の こと なん です ＿＿…
  "n4-conditions/kedo#29y9de": ["けれど", "けれども", "が"],
  "n4-conditions/kedo#222tzh": ["けれど", "けれども", "が"],
  "n4-conditions/kedo#16gp5s3": ["けれど", "けれども", "が"],
  "n4-conditions/kedo#ar4j4z": ["けれど", "けれども", "が"],
  "n4-conditions/kedo#1ns3x4f": ["けど", "けれど", "けれども"],
  "n4-conditions/kedo#10otdad": ["けど", "けれど", "が"],
  "n4-conditions/kedo#7j0afw": ["けれど", "けれども", "が"],
  "n4-conditions/kedo#15i291u": ["けれど", "けれども", "が"],
  "n4-conditions/kedo#myjztt": ["けれど", "けれども", "が"],
  // [少|すこ]し [散歩|さんぽ] し＿＿？ (たら どう), and [窓|まど] を [開|あ]け＿＿？: the lesson says casual speech stops at
  // たら, and the polite たらどうですか has the same English.
  "n4-conditions/advice#1busxv9": ["たら", "たら どう です か"],
  "n4-conditions/advice#1yq3lsd": ["たら", "たら どう です か"],
  // どこ で [降|お]り＿＿ です か？ (たら いい), and its casual line: the lesson teaches ばいい beside it.
  "n4-conditions/advice#bqmwn7": ["れば いい"],
  "n4-conditions/advice#1hlry7q": ["れば いい"],
  // [会社|かいしゃ] まで [行|い]く ＿＿ [一時間|いちじかん] かかります。 (のに), and the other purpose のに gaps: the lesson
  // teaches のには beside it.
  "n4-plans/noni-purpose#gwxsn8": ["のに は"],
  "n4-plans/noni-purpose#b4xgai": ["のに は"],
  "n4-plans/noni-purpose#1675dks": ["のに は"],
  "n4-plans/noni-purpose#19m1v40": ["のに は"],
  "n4-plans/noni-purpose#1w6cknc": ["のに は"],
  "n4-plans/noni-purpose#18jui4c": ["のに は"],
  "n4-plans/noni-purpose#su2365": ["のに は"],
  // [毎晩|まいばん] [十二時|じゅうにじ] まで に [寝|ね]る ＿＿ ん だ。 (よう に してる), and the other casual てる gaps: the
  // full ている is casual too.
  "n4-plans/you-ni-suru-naru#vixhbl": ["よう に して いる"],
  "n4-plans/you-to-omou#s72kfv": ["よう と [思|おも]って いる"],
  "n4-plans/you-to-omou#znoeor": ["よう と [思|おも]って いる"],
  "n4-plans/you-to-omou#1malqwi": ["おう と [思|おも]って いる"],
  "n4-plans/you-to-omou#vgtjxh": ["ろう と [思|おも]って いる"],
  // [残念|ざんねん] です が、 [明日|あした] は [行|い]く ＿＿。 (こと が できません): the lesson's quiz accepts こと は.
  "n4-plans/koto-ga-dekiru#12izca7": ["こと は できません"],
  // [明日|あした] は [十時|じゅうじ] に [東京|とうきょう] に [着|つ]く ＿＿。 ([予定|よてい] だ): a casual noun ends bare too.
  "n4-plans/you-to-omou#1arz5rj": ["[予定|よてい]"],
  // ご[飯|はん] を [作|つく]っ＿＿ ね。 (とく), and the other とく gaps: the full ておく is casual too.
  "n4-plans/te-oku#1nmmqxk": ["て おく"],
  "n4-plans/te-oku#1nwqt87": ["て おいて"],
  "n4-plans/te-oku#1lmhow7": ["て おく"],
  // カーテン が [閉|し]まって ＿＿。 (います): the ています contraction.
  "n4-plans/te-aru#1o9mknx": ["ます"],
  // [朝|あさ] は [電車|でんしゃ] が [遅|おく]れる ＿＿。 (こと が あります), and the other “sometimes” gaps: the lesson
  // teaches こともある beside ことがある.
  "n4-plans/koto-ga-aru#1gkurie": ["こと も あります"],
  "n4-plans/koto-ga-aru#gbbg18": ["こと も ある"],
  "n4-plans/koto-ga-aru#1enqt60": ["こと も ある"],
  "n4-plans/koto-ga-aru#1lkf1tm": ["こと も あります"],
  "n4-plans/koto-ga-aru#6qdsro": ["こと も あります"],
  "n4-plans/koto-ga-aru#1jwb0d3": ["こと も ある"],
  "n4-plans/koto-ga-aru#jzp1jh": ["こと も あります"],
  "n4-plans/koto-ga-aru#4odgl6": ["こと も あります"],
  "n4-plans/koto-ga-aru#1g0ux4b": ["こと も ある"],
  "n4-plans/koto-ga-aru#hszhb5": ["こと が ある"],
  "n4-plans/koto-ga-aru#10v5aoj": ["こと が あります"],
  "n4-plans/koto-ga-aru#5ih6ym": ["こと が ある"],
  "n4-plans/koto-ga-aru#sifefy": ["こと も ある"],
  // [金曜日|きんようび] ＿＿ レポート を … (まで に), and the other までに gaps: までには fits too (the quiz accepts it).
  "n4-plans/made-ni-aida#13a417e": ["まで に は"],
  "n4-plans/made-ni-aida#14i7cm5": ["まで に は"],
  "n4-plans/made-ni-aida#18aslqq": ["まで に は"],
  "n4-plans/made-ni-aida#ttdl1y": ["まで に は"],
  "n4-plans/made-ni-aida#13m9q86": ["まで に は"],
  // [七時|しちじ] ＿＿ [帰|かえ]る よ。 (まで に), and its polite line: 前に fits (the lesson excludes 暗くなる＿＿ for it).
  "n4-plans/made-ni-aida#bmizcg": ["前 に", "まで に は"],
  "n4-plans/made-ni-aida#1rhnd2u": ["前 に", "まで に は"],
  // [今朝|けさ] は [朝|あさ]ご[飯|はん] を [食|た]べ＿＿ [家|いえ] を [出|で]ました。 (ないで), and the other gaps right after
  // the stem: the lesson mentions ずに (written and formal), so it counts. Not [電話|でんわ] し＿＿ (せずに).
  "n4-plans/naide-zuni#pt2dg7": ["ず に"],
  "n4-plans/naide-zuni#1ae0gss": ["ず に"],
  "n4-plans/naide-zuni#o3on32": ["ず に"],
  "n4-plans/naide-zuni#17hs77o": ["ず に"],
  "n4-plans/naide-zuni#a7xq20": ["ず に"],
  "n4-plans/naide-zuni#1962977": ["ず に"],
  "n4-plans/naide-zuni#px64yf": ["ず に"],
  "n4-plans/naide-zuni#1f9uxy3": ["ず に"],
  "n4-plans/naide-zuni#1hngalh": ["ず に"],
  "n4-plans/naide-zuni#5lfcrx": ["ず に"],
  "n4-plans/naide-zuni#1azlyvh": ["ず に"],
  "n4-plans/naide-zuni#xx4r5g": ["ず に"],
  "n4-plans/naide-zuni#1oa9ltl": ["ず に"],
  "n4-plans/naide-zuni#1m1qds1": ["ず に"],
  "n4-plans/naide-zuni#1726skb": ["ず に"],
  "n4-plans/naide-zuni#14m9701": ["ず に"],
  "n4-plans/naide-zuni#1mrjyff": ["ず に"],
};
