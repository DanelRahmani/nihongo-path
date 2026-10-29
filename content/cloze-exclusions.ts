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
  // n4-giving-voice/sonkeigo and kenjougo: every gap is a keigo verb, and the plain polite verb (言います, います, あります) fits it too.
  "n4-giving-voice/sonkeigo#17mwjyw": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#1q5s4iv": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#1b7xpp0": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#i78opy": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#1j4rvnm": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#1szw7kl": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#1s41wmh": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#hgt96u": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#1v9ttwy": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/sonkeigo#1ty2uq5": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#8qhahe": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#1huluwt": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#28q667": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#134ojia": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#1g2f72g": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#12nvag4": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#1y0syiy": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#14psxoq": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#3lno4q": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#5oil2s": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#cucoy0": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#1uhwxcx": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#rdiwi": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#1mt8yyj": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  "n4-giving-voice/kenjougo#mhwduq": "the plain polite verb fits too; keigo is drilled by the quiz and the conjugation trainer's honorific and humble forms.",
  // どう ＿＿。 [最近|さいきん] [忙|いそが]しい みたい だ よ。 (かな)
  "n4-seeming/kana#ssz5c8": "どうだろう fits “Hard to say” as well.",
  // Purpose, cause and reasons (unit 十四)
  // [事故|じこ] が あった ＿＿、 [道|みち] が [混|こ]んで います。 (ため に)
  "n3-reasons/tame-ni#sk9jt2": "ので and から also fit the cause after a verb; only the formality differs.",
  // [町|まち] の [人口|じんこう] が [増|ふ]えた ＿＿、 [新|あたら]しい [学校|がっこう] が できました。 (ため に)
  "n3-reasons/tame-ni#1tuxfva": "ので and から also fit the cause after a verb; only the formality differs.",
  // [早|はや]く [着|つ]いた ＿＿、 [一時間|いちじかん] [待|ま]ちました。 (ため に)
  "n3-reasons/tame-ni#1lv78rn": "ので and から also fit the cause after a verb; only the formality differs.",
  // [早|はや]く [着|つ]く ＿＿、 タクシー に [乗|の]りました。 (ため に)
  "n3-reasons/tame-ni#446e9o": "ように also fits “so as to get there early” (早く着くように).",
  // [昨日|きのう] は [大雨|おおあめ] でした。 ＿＿、 [多|おお]く の [電車|でんしゃ] が [遅|おく]れました。 (その ため)
  "n3-reasons/tame-ni#19xbatl": "だから and それで also fit “because of that” between two sentences.",
  // この [町|まち] は [駅|えき] から [遠|とお]い です。 ＿＿、 [車|くるま] が ない と [不便|ふべん] です。 (その ため)
  "n3-reasons/tame-ni#104ikub": "だから and それで also fit “because of that” between two sentences.",
  // [友達|ともだち] が [手伝|てつだ]って くれた ＿＿、 [掃除|そうじ] が [早|はや]く [終|お]わった。 (おかげ で)
  "n3-reasons/okage-sei#zzmr01": "から and ので also fit the cause after a verb or adjective; only the credit differs.",
  // [友達|ともだち] が [手伝|てつだ]って くれた ＿＿、 [掃除|そうじ] が [早|はや]く [終|お]わりました。 (おかげ で)
  "n3-reasons/okage-sei#14imqp5": "から and ので also fit the cause after a verb or adjective; only the credit differs.",
  // [駅|えき] が [近|ちか]い ＿＿、 [通勤|つうきん] が [楽|らく] です。 (おかげ で)
  "n3-reasons/okage-sei#ngnx8k": "から and ので also fit the cause after a verb or adjective; only the credit differs.",
  // [合格|ごうかく] した よ！ ノート を [貸|か]して くれた ＿＿ よ。 ありがとう。 (おかげ だ)
  "n3-reasons/okage-sei#wk0anl": "から and ので also fit the cause after a verb or adjective; only the credit differs.",
  // [寝坊|ねぼう] した ＿＿、 [会議|かいぎ] に [遅|おく]れました。 (せい で)
  "n3-reasons/okage-sei#1qd01l4": "ので and から also fit the cause after a verb or adjective; only the blame differs.",
  // [寝坊|ねぼう] した ＿＿、 [会議|かいぎ] に [遅|おく]れた。 (せい で)
  "n3-reasons/okage-sei#58hgmf": "ので and から also fit the cause after a verb or adjective; only the blame differs.",
  // [部屋|へや] が [狭|せま]い ＿＿、 [机|つくえ] が [置|お]けない。 (せい で)
  "n3-reasons/okage-sei#1c0prpv": "ので and から also fit the cause after a verb or adjective; only the blame differs.",
  // [部屋|へや] が [狭|せま]い ＿＿、 [机|つくえ] が [置|お]けません。 (せい で)
  "n3-reasons/okage-sei#1we2w2f": "ので and から also fit the cause after a verb or adjective; only the blame differs.",
  // よかった！ [私|わたし] は [前|まえ] の [日|ひ] に [寝|ね]なかった ＿＿、 [全然|ぜんぜん] だめ だった… (せい で)
  "n3-reasons/okage-sei#k8dz6e": "ので and から also fit the cause after a verb or adjective; only the blame differs.",
  // [地震|じしん] ＿＿、 [多|おお]く の [建物|たてもの] が [壊|こわ]れました。 (によって)
  "n3-reasons/ni-yotte#1sk4zle": "で also fits the cause or means, as the lesson's pair says.",
  // [雪|ゆき] ＿＿ [電車|でんしゃ] の [遅|おく]れ が [出|で]て います。 (による)
  "n3-reasons/ni-yotte#r12czh": "で also fits the cause or means, as the lesson's pair says.",
  // [試験|しけん] の [結果|けっか] は メール ＿＿ [知|し]らせます。 (によって)
  "n3-reasons/ni-yotte#lkwnu0": "で also fits the cause or means, as the lesson's pair says.",
  // この [問題|もんだい] は [話|はな]し[合|あ]い ＿＿ [決|き]まりました。 (によって)
  "n3-reasons/ni-yotte#1r2hyy5": "で also fits the cause or means, as the lesson's pair says.",
  // インターネット ＿＿ [買|か]い[物|もの] が [増|ふ]えて います。 (による)
  "n3-reasons/ni-yotte#1d9d7o7": "での also fits (インターネットでの買い物).",
  // [窓|まど] が [開|あ]いて いる。 [寒|さむ]い ＿＿。 (わけ だ)
  "n3-reasons/wake-da#8i6ui": "はずだ can also say “no wonder”.",
  // [窓|まど] が [開|あ]いて います。 [寒|さむ]い ＿＿。 (わけ です)
  "n3-reasons/wake-da#1yg0dy8": "はずだ can also say “no wonder”.",
  // [彼|かれ] は [十年|じゅうねん] も [日本|にほん] に [住|す]んで いた ん です か？ [日本語|にほんご] が [上手|じょうず] な ＿＿ ね。 (わけ です)
  "n3-reasons/wake-da#1awzdd5": "はずだ can also say “no wonder”.",
  // [彼|かれ] は [十年|じゅうねん] も [日本|にほん] に [住|す]んで いた の？ [日本語|にほんご] が [上手|じょうず] な ＿＿ ね。 (わけ だ)
  "n3-reasons/wake-da#1coaqax": "はずだ can also say “no wonder”.",
  // [毎晩|まいばん] [三時|さんじ] まで ゲーム を して いる の？ [眠|ねむ]い ＿＿ よ。 (わけ だ)
  "n3-reasons/wake-da#ecrj2x": "はずだ can also say “no wonder”.",
  // [毎晩|まいばん] [三時|さんじ] まで ゲーム を して いる ん です か？ [眠|ねむ]い ＿＿ よ。 (わけ です)
  "n3-reasons/wake-da#w0rc7": "はずだ can also say “no wonder”.",
  // [駅|えき] の [前|まえ] に [大|おお]きい [会社|かいしゃ] が できた。 だから [朝|あさ] の [電車|でんしゃ] が [混|こ]んで いる ＿＿。 (わけ だ)
  "n3-reasons/wake-da#9bm4yd": "はずだ can also say “no wonder”.",
  // [駅|えき] の [前|まえ] に [大|おお]きい [会社|かいしゃ] が できました。 だから [朝|あさ] の [電車|でんしゃ] が [混|こ]んで いる ＿＿。 (わけ です)
  "n3-reasons/wake-da#pqzlww": "はずだ can also say “no wonder”.",
  // [会議|かいぎ] に [山田|やまだ]-さん が いません ね。 [今日|きょう] は [休|やす]み な ＿＿。 (わけ です)
  "n3-reasons/wake-da#16zzy8n": "はずです also fits: “he must be off today” reads as a conclusion too.",
  // [山田|やまだ]-さん は [今日|きょう] [休|やす]み です。 だから [会議|かいぎ] に [来|こ]ない ＿＿。 (はず です)
  "n3-reasons/wake-da#ps97m1": "わけです also fits, as the lesson's pair says.",
  // [一日|いちにち] [二時間|にじかん] なら、 [一週間|いっしゅうかん] で [十四時間|じゅうよじかん] ＿＿。 (と いう わけ だ)
  "n3-reasons/wake-da#14egdv7": "だ (です) alone also fits “makes fourteen hours a week”.",
  // [一日|いちにち] [二時間|にじかん] なら、 [一週間|いっしゅうかん] で [十四時間|じゅうよじかん] ＿＿。 (と いう わけ です)
  "n3-reasons/wake-da#13l0lvj": "だ (です) alone also fits “makes fourteen hours a week”.",
  // こんな [難|むずか]しい [問題|もんだい]、 [私|わたし] に [解|と]ける ＿＿。 (わけ が ない)
  "n3-reasons/wake-dewa-nai#1bf2zph": "はずがない also fits “there's no way”, as the lesson says.",
  // こんな [難|むずか]しい [問題|もんだい]、 [私|わたし] に [解|と]ける ＿＿。 (わけ が ありません)
  "n3-reasons/wake-dewa-nai#1oqqsif": "はずがない also fits “there's no way”, as the lesson says.",
  // [一週間|いっしゅうかん] で [英語|えいご] が [話|はな]せる よう に なる ＿＿。 (わけ が ない)
  "n3-reasons/wake-dewa-nai#14afro": "はずがない also fits “there's no way”, as the lesson says.",
  // [一週間|いっしゅうかん] で [英語|えいご] が [話|はな]せる よう に なる ＿＿。 (わけ が ありません)
  "n3-reasons/wake-dewa-nai#1levbrs": "はずがない also fits “there's no way”, as the lesson says.",
  // あの [店|みせ] の ラーメン が まずい ＿＿。 いつも たくさん の [人|ひと] が [並|なら]んで いる ん だ から。 (わけ が ない)
  "n3-reasons/wake-dewa-nai#123d6e2": "はずがない also fits “there's no way”, as the lesson says.",
  // そんな [高|たか]い [車|くるま]、 [買|か]える ＿＿ よ。 (わけ ない)
  "n3-reasons/wake-dewa-nai#31t0ul": "はずがない also fits “there's no way”, as the lesson says.",
  // そんな [高|たか]い [車|くるま]、 [買|か]える ＿＿ よ。 (わけ が ありません)
  "n3-reasons/wake-dewa-nai#180fwuj": "はずがない also fits “there's no way”, as the lesson says.",
  // [熱|ねつ] が ある けど、 [今日|きょう] は ＿＿。 ([休|やす]めない)
  "n3-reasons/wake-ni-wa-ikanai#tyzcn2": "休むわけにはいかない, the pair's other side, also fits.",
  // Time and change (unit 十五)
  // [学生|がくせい] の ＿＿、 たくさん [本|ほん] を [読|よ]んで おいた ほう が いい よ。 (うち に)
  "n3-time/uchi-ni#1jth6k0": "[間|あいだ]に also fits “while you're still a student” (学生の間に).",
  // [学生|がくせい] の ＿＿、 たくさん [本|ほん] を [読|よ]んで おいた ほう が いい です よ。 (うち に)
  "n3-time/uchi-ni#a1yfmc": "[間|あいだ]に also fits “while you're still a student” (学生の間に).",
  // そう なん だ。 じゃあ、 [東京|とうきょう] に いる ＿＿、 [一緒|いっしょ] に [飲|の]み に [行|い]こう よ。 (うち に)
  "n3-time/uchi-ni#1fwoala": "[間|あいだ]に also fits “while you're still in Tokyo” (東京にいる間に).",
  // The "while still …" cards where 間に is just as natural are out. The ない-form "before …" cards stay: the English says
  // "before", which 間に ("while") doesn't translate, and 温かいうちに is the idiomatic way to say it.
  // [覚|おぼ]えて いる ＿＿、 メモ して おこう。 (うち に)
  "n3-time/uchi-ni#x9ludm": "[間|あいだ]に also fits “while I still remember it” (覚えている間に).",
  // [覚|おぼ]えて いる ＿＿、 メモ して おきます。 (うち に)
  "n3-time/uchi-ni#1pmo7d5": "[間|あいだ]に also fits “while I still remember it” (覚えている間に).",
  // [若|わか]い ＿＿、 たくさん の [国|くに] へ [行|い]って みたい。 (うち に)
  "n3-time/uchi-ni#x63tl7": "[間|あいだ]に also fits “while I'm still young” (若い間に).",
  // [若|わか]い ＿＿、 たくさん の [国|くに] へ [行|い]って みたい です。 (うち に)
  "n3-time/uchi-ni#upgvi1": "[間|あいだ]に also fits “while I'm still young” (若い間に).",
  // [両親|りょうしん] が [元気|げんき] な ＿＿、 [一緒|いっしょ] に [旅行|りょこう] したい です。 (うち に)
  "n3-time/uchi-ni#yzipit": "[間|あいだ]に also fits “while they're in good health” (元気な間に).",
  // [両親|りょうしん] が [元気|げんき] な ＿＿、 [一緒|いっしょ] に [旅行|りょこう] したい。 (うち に)
  "n3-time/uchi-ni#17qq0s7": "[間|あいだ]に also fits “while they're in good health” (元気な間に).",
  // [知|し]らない ＿＿、 [冬|ふゆ] に なって いた。 (うち に)
  "n3-time/uchi-ni#14ia20r": "[間|あいだ]に also fits “before I knew it” (知らない間に).",
  // [知|し]らない ＿＿、 [冬|ふゆ] に なって いました。 (うち に)
  "n3-time/uchi-ni#1vykipo": "[間|あいだ]に also fits “before I knew it” (知らない間に).",
  // [気|き]づかない ＿＿、 [財布|さいふ] が なく なって いた。 (うち に)
  "n3-time/uchi-ni#j0t21v": "[間|あいだ]に also fits “without my noticing” (気づかない間に).",
  // [気|き]づかない ＿＿、 [財布|さいふ] が なく なって いました。 (うち に)
  "n3-time/uchi-ni#7bkd78": "[間|あいだ]に also fits “without my noticing” (気づかない間に).",
  // [話|はな]して いる ＿＿、 [夜|よる] に なって いた。 (うち に)
  "n3-time/uchi-ni#1wgklpe": "[間|あいだ]に also fits “while we were talking” (話している間に).",
  // [話|はな]して いる ＿＿、 [夜|よる] に なって いました。 (うち に)
  "n3-time/uchi-ni#kqwg19": "[間|あいだ]に also fits “while we were talking” (話している間に).",
  // (間に also fits most 最中に lines, but the English "right in the middle of" carries 最中, so those cards stay.)
  // [料理|りょうり] を [作|つく]って いる ＿＿、 [友達|ともだち] が [来|き]ました。 ([最中|さいちゅう] に)
  "n3-time/saichuu-ni#1us7m76": "ているところに also fits a friend turning up mid-cooking (作っているところに).",
  // [料理|りょうり] を [作|つく]って いる ＿＿、 [友達|ともだち] が [来|き]た。 ([最中|さいちゅう] に)
  "n3-time/saichuu-ni#sa5x9d": "ているところに also fits a friend turning up mid-cooking (作っているところに).",
  // すみません、 [今|いま] [資料|しりょう] を [作|つく]って いる ＿＿ なん です。 [後|あと] で も いい です か？ ([最中|さいちゅう])
  "n3-time/saichuu-ni#1058fuh": "ているところなんです also fits “I'm in the middle of …”.",
  // [町|まち] の [小|ちい]さい [店|みせ] が [減|へ]って ＿＿。 (きました)
  "n3-time/ippou-da#dv2iy7": "減っています also fits “have been getting fewer”.",
  // よく [考|かんが]えた ＿＿、 [決|き]めます。 ([上|うえ] で)
  "n3-time/ue-de#5snsy9": "[後|あと]で also fits “once I've thought it over”.",
  // よく [考|かんが]えた ＿＿、 [決|き]める よ。 ([上|うえ] で)
  "n3-time/ue-de#47y7ix": "[後|あと]で also fits “once I've thought it over”.",
  // [説明|せつめい] を よく [読|よ]んだ ＿＿、 [名前|なまえ] を [書|か]いて ください。 ([上|うえ] で)
  "n3-time/ue-de#1dw0urt": "[後|あと]で also fits “after reading”.",
  // [家族|かぞく] と [相談|そうだん] の ＿＿、 [返事|へんじ] します。 ([上|うえ] で)
  "n3-time/ue-de#v1xu4r": "[後|あと]で also fits “after talking it over” (相談の後で).",
  // [家族|かぞく] と [相談|そうだん] の ＿＿、 [返事|へんじ] する ね。 ([上|うえ] で)
  "n3-time/ue-de#oozpe4": "[後|あと]で also fits “after talking it over” (相談の後で).",
  // [両親|りょうしん] に [話|はな]した ＿＿、 [留学|りゅうがく] する こと に した。 ([上|うえ] で)
  "n3-time/ue-de#spo8r1": "[後|あと]で also fits “after discussing it”.",
  // [両親|りょうしん] に [話|はな]した ＿＿、 [留学|りゅうがく] する こと に しました。 ([上|うえ] で)
  "n3-time/ue-de#1vqf4n2": "[後|あと]で also fits “after discussing it”.",
  // ありがとう ございます。 [一度|いちど] [中|なか] を よく [見|み]た ＿＿、 [決|き]めて ください。 ([上|うえ] で)
  "n3-time/ue-de#romlg8": "[後|あと]で also fits “have a good look round first, and then decide”.",
  // The topic ta-ue-de is left with no cloze card of its own: 上で and あとで overlap by nature, and a gap on 上 only
  // gives 後. The "in doing" cards (ue-de-doing) stay.
  // [先生|せんせい] に [相談|そうだん] した ＿＿、 [決|き]めました。 ([上|うえ] で)
  "n3-time/ue-de#zon339": "[後|あと]で also fits “after talking it over” (相談した後で).",
  // たび on verb lines: と also fits (見るたびに = 見ると), as the lesson says. The noun lines (の＋たび) stay: と can't follow a noun.
  // この [歌|うた] を [聞|き]く ＿＿、 [昔|むかし] の こと を [思|おも]い[出|だ]す。 (たび に)
  "n3-time/tabi-ni#1vwjldy": "と also fits a habit (聞くと), as the lesson says.",
  // この [歌|うた] を [聞|き]く ＿＿、 [昔|むかし] の こと を [思|おも]い[出|だ]します。 (たび に)
  "n3-time/tabi-ni#19weu2v": "と also fits a habit (聞くと), as the lesson says.",
  // [祖母|そぼ] の [家|いえ] に [行|い]く ＿＿、 [料理|りょうり] を [教|おし]えて もらいました。 (たび に)
  "n3-time/tabi-ni#d5tzmy": "と also fits a habit (行くと), as the lesson says.",
  // [祖母|そぼ] の [家|いえ] に [行|い]く ＿＿、 [料理|りょうり] を [教|おし]えて もらった。 (たび に)
  "n3-time/tabi-ni#qoasfs": "と also fits a habit (行くと), as the lesson says.",
  // [彼|かれ] は [会|あ]う ＿＿ [違|ちが]う [車|くるま] に [乗|の]って いる。 (たび に)
  "n3-time/tabi-ni#11nwye4": "と also fits a habit (会うと), as the lesson says.",
  // [地震|じしん] の ニュース を [見|み]る ＿＿、 [家族|かぞく] の こと が [心配|しんぱい] に なります。 (たび に)
  "n3-time/tabi-ni#83j9yh": "と also fits a habit (見ると), as the lesson says.",
  // [地震|じしん] の ニュース を [見|み]る ＿＿、 [家族|かぞく] の こと が [心配|しんぱい] に なる。 (たび に)
  "n3-time/tabi-ni#1w3i47f": "と also fits a habit (見ると), as the lesson says.",
  // うん。 [東京|とうきょう] に [行|い]く ＿＿、 [何|なに] か [買|か]っちゃう ん だ。 (たび に)
  "n3-time/tabi-ni#ejlegs": "と also fits a habit (行くと), as the lesson says.",
  // Relations, viewpoint and what's said (unit 十六)
  // [明日|あした] の [会議|かいぎ] で、 [新|あたら]しい [計画|けいかく] ＿＿ [話|はな]します。 (について)
  "n3-relations/ni-tsuite#1ps150v": "を also fits “talk about the plan” (計画を話す).",
  // [明日|あした] の [会議|かいぎ] で、 [新|あたら]しい [計画|けいかく] ＿＿ [話|はな]す よ。 (について)
  "n3-relations/ni-tsuite#fgjavq": "を also fits “talk about the plan” (計画を話す).",
  // [日本|にほん] の [歴史|れきし] ＿＿ [調|しら]べて います。 (について)
  "n3-relations/ni-tsuite#6c16dz": "を also fits “look into history” (歴史を調べる).",
  // [日本|にほん] の [歴史|れきし] ＿＿ [調|しら]べて いる。 (について)
  "n3-relations/ni-tsuite#3gztqr": "を also fits “look into history” (歴史を調べる).",
  // その [問題|もんだい] ＿＿、 どう [思|おも]う？ (について)
  "n3-relations/ni-tsuite#m12bxl": "を also fits “what do you think of that problem” (その問題をどう思う？).",
  // その [問題|もんだい] ＿＿、 どう [思|おも]います か？ (について)
  "n3-relations/ni-tsuite#2b32wf": "を also fits “what do you think of that problem” (その問題をどう思う？).",
  // [先生|せんせい]、 [来週|らいしゅう] の [発表|はっぴょう] は [何|なに] ＿＿ [話|はな]せば いい です か？ (について)
  "n3-relations/ni-tsuite#h6j357": "を also fits “what should I talk about” (何を話せば).",
  // [国|くに] の [文化|ぶんか] ＿＿ [話|はな]して ください。 (について)
  "n3-relations/ni-tsuite#c14wt1": "を also fits “talk about the culture” (文化を話す).",
  // [東京|とうきょう] は [人口|じんこう] が [増|ふ]えて いる ＿＿、 [田舎|いなか] は [減|へ]って いる。 (の に[対|たい]して)
  "n3-relations/ni-taishite#ldx8ry": "けど also fits after a plain verb (増えているけど), and the lesson's pair teaches it.",
  // [東京|とうきょう] は [人口|じんこう] が [増|ふ]えて いる ＿＿、 [田舎|いなか] は [減|へ]って います。 (の に[対|たい]して)
  "n3-relations/ni-taishite#r1y76w": "けど also fits after a plain verb (増えているけど), and the lesson's pair teaches it.",
  // [去年|きょねん] は [雨|あめ] が [多|おお]かった ＿＿、 [今年|ことし] は ほとんど [降|ふ]って いない。 (の に[対|たい]して)
  "n3-relations/ni-taishite#wys3jo": "けど also fits after a past adjective (多かったけど), and the lesson's pair teaches it.",
  // [去年|きょねん] は [雨|あめ] が [多|おお]かった ＿＿、 [今年|ことし] は ほとんど [降|ふ]って いません。 (の に[対|たい]して)
  "n3-relations/ni-taishite#5un7ti": "けど also fits after a past adjective (多かったけど), and the lesson's pair teaches it.",
  // [新|あたら]しい ルール ＿＿、 [何|なに]か [意見|いけん] は あります か？ (に[対|たい]して)
  "n3-relations/ni-taishite#1k6r1j5": "について also fits “views on the new rules” (ルールについて).",
  // はい。 [若|わか]い [人|ひと] は いい と [言|い]って いる ＿＿、 [年|とし] が [上|うえ] の [人|ひと] は [反対|はんたい] して います。 (の に[対|たい]して)
  "n3-relations/ni-taishite#1ao1g90": "けど also fits after a plain verb (言っているけど), and the lesson's pair teaches it.",
  // [兄|あに] は [通訳|つうやく] ＿＿ [働|はたら]いて います。 (として)
  "n3-relations/toshite#pnlocb": "で also fits a role in speech (通訳で働く), as the lesson says.",
  // [兄|あに] は [通訳|つうやく] ＿＿ [働|はたら]いて いる。 (として)
  "n3-relations/toshite#1mmgcmv": "で also fits a role in speech (通訳で働く), as the lesson says.",
  // [田中|たなか]-さん は チーム の [代表|だいひょう] ＿＿ [会議|かいぎ] に [出|で]ます。 (として)
  "n3-relations/toshite#17443jg": "で also fits a role in speech (通訳で働く), as the lesson says.",
  // [田中|たなか]-さん は チーム の [代表|だいひょう] ＿＿ [会議|かいぎ] に [出|で]る よ。 (として)
  "n3-relations/toshite#ci8xey": "で also fits a role in speech (通訳で働く), as the lesson says.",
  // これ は お[土産|みやげ] ＿＿ [人気|にんき] が ある お[菓子|かし] です。 (として)
  "n3-relations/toshite#1pfyf5t": "で also fits a role in speech (通訳で働く), as the lesson says.",
  // これ は お[土産|みやげ] ＿＿ [人気|にんき] が ある お[菓子|かし] だ よ。 (として)
  "n3-relations/toshite#1ekujaj": "で also fits a role in speech (通訳で働く), as the lesson says.",
  // [私|わたし] ＿＿、 [来週|らいしゅう] の ほう が いい です。 (として は)
  "n3-relations/toshite#10jbkk4": "は also fits (私は、来週のほうがいい).",
  // [私|わたし] ＿＿、 [来週|らいしゅう] の ほう が いい。 (として は)
  "n3-relations/toshite#f7verk": "は also fits (私は、来週のほうがいい).",
  // [親|おや] ＿＿、 [子供|こども] の [将来|しょうらい] が [心配|しんぱい] です。 (として も)
  "n3-relations/toshite#de7a3l": "も also fits (親も、子供の将来が心配です).",
  // [親|おや] ＿＿、 [子供|こども] の [将来|しょうらい] が [心配|しんぱい] だ。 (として も)
  "n3-relations/toshite#pu5bzv": "も also fits (親も、子供の将来が心配です).",
  // [医者|いしゃ] ＿＿ [経験|けいけん] は まだ [短|みじか]い です。 (として の)
  "n3-relations/toshite#ge95c8": "の alone also fits (医者の経験, 先生の経験).",
  // [留学生|りゅうがくせい] ＿＿ [日本|にほん] に [来|き]ました。 (として)
  "n3-relations/toshite#18cxa4w": "で also fits a role in speech (通訳で働く), as the lesson says.",
  // [学校|がっこう] の [先生|せんせい] ＿＿、 [五年|ごねん] [働|はたら]いて いました。 (として)
  "n3-relations/toshite#duesky": "で also fits a role in speech (通訳で働く), as the lesson says.",
  // そう です か。 [先生|せんせい] ＿＿ [経験|けいけん] は、 この [仕事|しごと] に も [役|やく] に [立|た]ちそう です ね。 (として の)
  "n3-relations/toshite#rpwc0h": "の alone also fits (医者の経験, 先生の経験).",
  // [東京|とうきょう] は [大阪|おおさか] ＿＿ [人|ひと] が [多|おお]い。 (より)
  "n3-relations/ni-kurabete#196n7ia": "に比べて also fits (大阪に比べて人が多い).",
  // [初|はじ]めて [作|つく]った ＿＿、 よく できて います ね。 (に して は)
  "n3-relations/ni-shite-wa#1ymxdn0": "の割に also fits after a verb (作った割に).",
  // [初|はじ]めて [作|つく]った ＿＿、 よく できてる ね。 (に して は)
  "n3-relations/ni-shite-wa#1dfwuog": "の割に also fits after a verb (作った割に).",
  // この [映画|えいが] は [有名|ゆうめい] な ＿＿、 あまり [面白|おもしろ]くなかった。 ([割|わり] に)
  "n3-relations/ni-shite-wa#1ovdwvj": "のに also fits (有名なのに, よく食べるのに, 安いのに).",
  // この [映画|えいが] は [有名|ゆうめい] な ＿＿、 あまり [面白|おもしろ]くなかった です。 ([割|わり] に)
  "n3-relations/ni-shite-wa#1xflw0d": "のに also fits (有名なのに, よく食べるのに, 安いのに).",
  // [弟|おとうと] は よく [食|た]べる ＿＿ [太|ふと]らない。 ([割|わり] に)
  "n3-relations/ni-shite-wa#6jqbq4": "のに also fits (有名なのに, よく食べるのに, 安いのに).",
  // [弟|おとうと] は よく [食|た]べる ＿＿ [太|ふと]りません。 ([割|わり] に)
  "n3-relations/ni-shite-wa#1q3jw1v": "のに also fits (有名なのに, よく食べるのに, 安いのに).",
  // この かばん は [安|やす]い ＿＿ [便利|べんり] だ よ。 ([割|わり] に)
  "n3-relations/ni-shite-wa#1v4locx": "のに also fits (有名なのに, よく食べるのに, 安いのに).",
  // この かばん は [安|やす]い ＿＿ [便利|べんり] です よ。 ([割|わり] に)
  "n3-relations/ni-shite-wa#1i2xpx3": "のに also fits (有名なのに, よく食べるのに, 安いのに).",
  // [日本|にほん] ＿＿ [韓国|かんこく] で [人気|にんき] が あります。 (や)
  "n3-relations/wo-hajime#7x4l2h": "と also fits (日本と韓国で).",
  // n3-relations/tte: は fits every topic gap by definition (that is what the lesson says), so narrowing can't help; the quote cards carry the lesson.
  // [日本|にほん] の [夏|なつ] ＿＿、 [本当|ほんとう] に [暑|あつ]い ね。 (って)
  "n3-relations/tte#5a5wmi": "は also fits a topic gap (日本の夏は、…).",
  // [田中|たなか]-さん ＿＿、 どんな [人|ひと]？ (って)
  "n3-relations/tte#1peneeo": "は also fits a topic gap (日本の夏は、…).",
  // 「[空気|くうき] を [読|よ]む」 ＿＿、 どういう [意味|いみ]？ (って)
  "n3-relations/tte#15zuugl": "は also fits a topic gap (日本の夏は、…).",
  // [一人|ひとり] で [旅行|りょこう] する の ＿＿、 [楽|たの]しい よ。 (って)
  "n3-relations/tte#unasky": "は also fits a topic gap (日本の夏は、…).",
  // [彼|かれ] ＿＿、 いつも [遅|おく]れて くる よね。 (って)
  "n3-relations/tte#wlngqt": "は also fits a topic gap (日本の夏は、…).",
  // 「ありがとう」 ＿＿ [伝|つた]えて ね。 (って)
  "n3-relations/tte#13v97uw": "と also fits (「ありがとう」と伝えて).",
  // [週末|しゅうまつ] の キャンプ ＿＿、 [何時|なんじ] に [出発|しゅっぱつ]？ (って)
  "n3-relations/tte#1k6wnq5": "は also fits a topic gap (日本の夏は、…).",
  // n3-relations/n-datte: no card. Narrowing the gap to ん / なん would test nothing about hearsay, and narrowing ということだ to と いう
  // leaves a gap that とのことです also fits; そうだ and らしい fit the whole-pattern gaps.
  // [山田|やまだ]-さん、 [来月|らいげつ] [会社|かいしゃ] を [辞|や]める ＿＿。 (ん だって)
  "n3-relations/n-datte#1ya5j4t": "そうだ and らしい (the hearsay lessons) also fit every hearsay gap.",
  // あの [映画|えいが]、 すごく [怖|こわ]い ＿＿。 (ん だって)
  "n3-relations/n-datte#oqjgk3": "そうだ and らしい (the hearsay lessons) also fit every hearsay gap.",
  // [明日|あした] は [雪|ゆき] ＿＿。 (なん だって)
  "n3-relations/n-datte#1qx21ao": "そうだ and らしい (the hearsay lessons) also fit every hearsay gap.",
  // [駅前|えきまえ] の パン[屋|や]、 [先週|せんしゅう] [閉|し]まった ＿＿。 (ん だって)
  "n3-relations/n-datte#mue8mv": "そうだ and らしい (the hearsay lessons) also fit every hearsay gap.",
  // [佐藤|さとう]-さん の お[兄|にい]さん、 [医者|いしゃ] ＿＿。 (だって)
  "n3-relations/n-datte#1drum5k": "そうだ and らしい (the hearsay lessons) also fit every hearsay gap.",
  // [天気予報|てんきよほう] によると、 [明日|あした] は [晴|は]れる ＿＿。 (と いう こと です)
  "n3-relations/n-datte#hzjdkr": "そうです and らしいです (the hearsay lessons) also fit every hearsay gap; とのことです fits the same ＿＿ こと です.",
  // [部長|ぶちょう] は [今日|きょう] [休|やす]み だ ＿＿。 (と いう こと です)
  "n3-relations/n-datte#16m3il4": "そうです and らしいです (the hearsay lessons) also fit every hearsay gap; とのことです fits the same ＿＿ こと です.",
  // [事故|じこ] の ため、 [電車|でんしゃ] が [遅|おく]れて いる ＿＿。 (と いう こと です)
  "n3-relations/n-datte#526wyw": "そうです and らしいです (the hearsay lessons) also fit every hearsay gap; とのことです fits the same ＿＿ こと です.",
  // [田中|たなか]-さん から [電話|でんわ] が あって、 [少|すこ]し [遅|おく]れる ＿＿。 (と いう こと でした)
  "n3-relations/n-datte#1w2fm3h": "そうです and らしいです (the hearsay lessons) also fit every hearsay gap; とのことです fits the same ＿＿ こと です.",
  // ニュース によると、 [今年|ことし] の [冬|ふゆ] は [寒|さむ]く なる ＿＿。 (と いう こと だ)
  "n3-relations/n-datte#1dvkguj": "そうだ and らしい (the hearsay lessons) also fit every hearsay gap.",
  // ねえ、 [聞|き]いた？ [来週|らいしゅう] の テスト、 [中止|ちゅうし] に なった ＿＿。 (ん だって)
  "n3-relations/n-datte#1aby2hw": "そうだ and らしい (the hearsay lessons) also fit every hearsay gap.",
  // [森|もり]-さん。 [先生|せんせい] が [病気|びょうき] ＿＿。 (なん だって)
  "n3-relations/n-datte#9cqbnz": "そうだ and らしい (the hearsay lessons) also fit every hearsay gap.",
  // Degree, limits and emphasis (unit 十七)
  // [忙|いそが]しくて、 [昼|ひる]ご[飯|はん] を [食|た]べる [時間|じかん] ＿＿ ありません でした。 (さえ)
  "n3-degree/sae#mctwf5": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // [忙|いそが]しくて、 [昼|ひる]ご[飯|はん] を [食|た]べる [時間|じかん] ＿＿ なかった。 (さえ)
  "n3-degree/sae#i9qjnj": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // [隣|となり] に [住|す]んで いる [人|ひと] の [名前|なまえ] ＿＿ [知|し]らない。 (さえ)
  "n3-degree/sae#1js7xug": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // [隣|となり] に [住|す]んで いる [人|ひと] の [名前|なまえ] ＿＿ [知|し]りません。 (さえ)
  "n3-degree/sae#16mt6xj": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // この [問題|もんだい] は [先生|せんせい] ＿＿ [分|わ]からなかった。 (で さえ)
  "n3-degree/sae#1vp7zfr": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // この [問題|もんだい] は [先生|せんせい] ＿＿ [分|わ]かりません でした。 (で さえ)
  "n3-degree/sae#14p6evg": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // [疲|つか]れて いて、 [立|た]つ こと ＿＿ できなかった。 (さえ)
  "n3-degree/sae#jlbjrw": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // [疲|つか]れて いて、 [立|た]つ こと ＿＿ できません でした。 (さえ)
  "n3-degree/sae#1idupqw": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // この こと は [家族|かぞく] に ＿＿ [話|はな]して いません。 (さえ)
  "n3-degree/sae#h7oo4m": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // この こと は [家族|かぞく] に ＿＿ [話|はな]して いない。 (さえ)
  "n3-degree/sae#1gn23gk": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // [難|むずか]しい よ。 まだ [子供|こども] の [本|ほん] ＿＿ [読|よ]めない ん だ。 (さえ)
  "n3-degree/sae#1n5qhn": "も (でも after a noun) also fits “even” in a negative line, as the lesson's pair says.",
  // [健康|けんこう] ＿＿ [一番|いちばん] [大切|たいせつ] な もの だ と [思|おも]う。 (こそ)
  "n3-degree/koso#ysad1": "は and が also fit (健康が一番大切).",
  // [健康|けんこう] ＿＿ [一番|いちばん] [大切|たいせつ] な もの だ と [思|おも]います。 (こそ)
  "n3-degree/koso#11q8pfo": "は and が also fit (健康が一番大切).",
  // [難|むずか]しかった ＿＿、 やめた。 (から)
  "n3-degree/koso#1lx6hqe": "ので also fits “so I gave up”.",
  // [日本語|にほんご] は [思|おも]った ＿＿ [難|むずか]しくなかった です。 (ほど)
  "n3-degree/hodo#fz2r2w": "より also fits (思ったより難しくなかった, 前よりおいしくない).",
  // [日本語|にほんご] は [思|おも]った ＿＿ [難|むずか]しくなかった。 (ほど)
  "n3-degree/hodo#11v0ves": "より also fits (思ったより難しくなかった, 前よりおいしくない).",
  // この [店|みせ] の ラーメン は、 [前|まえ] ＿＿ おいしく ありません。 (ほど)
  "n3-degree/hodo#16ro0n": "より also fits (思ったより難しくなかった, 前よりおいしくない).",
  // この [店|みせ] の ラーメン は、 [前|まえ] ＿＿ おいしくない。 (ほど)
  "n3-degree/hodo#u9adap": "より also fits (思ったより難しくなかった, 前よりおいしくない).",
  // [返事|へんじ] は [早|はや]い ＿＿ いい です。 (ほど)
  "n3-degree/ba-hodo#uwhr9e": "ほうが also fits (早いほうがいい).",
  // [返事|へんじ] は [早|はや]い ＿＿ いい よ。 (ほど)
  "n3-degree/ba-hodo#qv2nji": "ほうが also fits (早いほうがいい).",
  // [練習|れんしゅう] する ＿＿、 [上手|じょうず] に なって きた。 (につれて)
  "n3-degree/ba-hodo#101xeu0": "うちに also fits (練習するうちに).",
  // [遅|おく]れる なら、 [電話|でんわ] ＿＿ して よ。 (くらい)
  "n3-degree/kurai-extent#1he9p5o": "でも also fits (電話でもして).",
  // [遅|おく]れる なら、 [電話|でんわ] ＿＿ して ください。 (くらい)
  "n3-degree/kurai-extent#1upq082": "でも also fits (電話でもして).",
  // [忙|いそが]しくて も、 [朝|あさ]ご[飯|はん] ＿＿ [食|た]べた ほう が いい です よ。 (くらい)
  "n3-degree/kurai-extent#8v4iyk": "Contrastive は also fits (朝ご飯は食べたほうがいい, ひらがなは読めます).",
  // [忙|いそが]しくて も、 [朝|あさ]ご[飯|はん] ＿＿ [食|た]べた ほう が いい よ。 (くらい)
  "n3-degree/kurai-extent#jwn9js": "Contrastive は also fits (朝ご飯は食べたほうがいい, ひらがなは読めます).",
  // ひらがな ＿＿ [読|よ]めます よ。 (ぐらい)
  "n3-degree/kurai-extent#gcrrh4": "Contrastive は also fits (朝ご飯は食べたほうがいい, ひらがなは読めます).",
  // ひらがな ＿＿ [読|よ]める よ。 (ぐらい)
  "n3-degree/kurai-extent#1g43x72": "Contrastive は also fits (朝ご飯は食べたほうがいい, ひらがなは読めます).",
  // ひらがな ＿＿ [読|よ]めます。 (くらい)
  "n3-degree/kurai-extent#176xnqr": "Contrastive は also fits (朝ご飯は食べたほうがいい, ひらがなは読めます).",
  // [部屋|へや] ＿＿ [片付|かたづ]けなさい。 (くらい)
  "n3-degree/kurai-extent#pa2jg8": "を also fits (部屋を片付けなさい).",
  // この [問題|もんだい] は ＿＿ [難|むずか]しくて、 [誰|だれ] も [答|こた]えられなかった。 (あまりに)
  "n3-degree/amari#4ygotr": "とても also fits “so … that” (とても難しくて…).",
  // この [問題|もんだい] は ＿＿ [難|むずか]しくて、 [誰|だれ] も [答|こた]えられません でした。 (あまりに)
  "n3-degree/amari#1vi3xf9": "とても also fits “so … that” (とても難しくて…).",
  // [値段|ねだん] が ＿＿ [高|たか]い ので、 [買|か]う の を やめました。 (あまりに も)
  "n3-degree/amari#ina2jw": "とても also fits “so … that” (とても難しくて…).",
  // [値段|ねだん] が ＿＿ [高|たか]い ので、 [買|か]う の を やめた。 (あまりに も)
  "n3-degree/amari#1e4o9gr": "とても also fits “so … that” (とても難しくて…).",
  // [景色|けしき] が ＿＿ きれい で、 [言葉|ことば] が [出|で]なかった。 (あまりに)
  "n3-degree/amari#1oub1rb": "とても also fits “so … that” (とても難しくて…).",
  // [景色|けしき] が ＿＿ きれい で、 [言葉|ことば] が [出|で]ません でした。 (あまりに)
  "n3-degree/amari#1l9bzvh": "とても also fits “so … that” (とても難しくて…).",
  // [話|はなし] が ＿＿ [長|なが]くて、 [途中|とちゅう] で [眠|ねむ]く なりました。 (あまりに も)
  "n3-degree/amari#tffebm": "とても also fits “so … that” (とても難しくて…).",
  // [話|はなし] が ＿＿ [長|なが]くて、 [途中|とちゅう] で [眠|ねむ]く なった。 (あまりに も)
  "n3-degree/amari#1c5nim6": "とても also fits “so … that” (とても難しくて…).",
  // [昨日|きのう] の [夜|よる] は ＿＿ [暑|あつ]くて、 [眠|ねむ]れなかった。 (あまり)
  "n3-degree/amari#1qr5thy": "とても also fits “so … that” (とても難しくて…).",
  // [昨日|きのう] の [夜|よる] は ＿＿ [暑|あつ]くて、 [眠|ねむ]れません でした。 (あまり)
  "n3-degree/amari#11cqsjq": "とても also fits “so … that” (とても難しくて…).",
  // ＿＿ [素晴|すば]らしくて、 [途中|とちゅう] で [泣|な]いちゃった。 (あまりに も)
  "n3-degree/amari#rue9ou": "とても also fits “so … that” (とても難しくて…).",
  // ＿＿ [寒|さむ]い ので、 [家|いえ] に いた。 (あまり)
  "n3-degree/amari#1us8mrs": "とても also fits “so … that” (とても難しくて…).",
  // ＿＿ [寒|さむ]くない ので、 [外|そと] で [遊|あそ]んだ。 (あまり)
  "n3-degree/amari#1237197": "それほど and そんなに also fit “not very”.",
  // うち の [子供|こども] は [甘|あま]い もの ＿＿ [食|た]べて います。 (ばかり)
  "n3-degree/bakari#1mt95r": "だけ also fits (甘いものだけ, 男の子だけ).",
  // うち の [子供|こども] は [甘|あま]い もの ＿＿ [食|た]べて いる。 (ばかり)
  "n3-degree/bakari#1yaywfv": "だけ also fits (甘いものだけ, 男の子だけ).",
  // この クラス は [男|おとこ]の[子|こ] ＿＿ だ。 (ばかり)
  "n3-degree/bakari#140xapa": "だけ also fits (甘いものだけ, 男の子だけ).",
  // この クラス は [男|おとこ]の[子|こ] ＿＿ です。 (ばかり)
  "n3-degree/bakari#unsh3e": "だけ also fits (甘いものだけ, 男の子だけ).",
  // [彼|かれ] は いつも [文句|もんく] ＿＿ [言|い]って いる。 (ばかり)
  "n3-degree/bakari#1h0ejyi": "を also fits (いつも文句を言っている).",
  // [彼|かれ] は いつも [文句|もんく] ＿＿ [言|い]って います。 (ばかり)
  "n3-degree/bakari#cn9azo": "を also fits (いつも文句を言っている).",
  // [今|いま]、 [食|た]べた ＿＿ です。 (ばかり)
  "n3-degree/bakari#1gpe4t": "ところ also fits (食べたところ).",
  // [飲|の]み[物|もの] は、 お[茶|ちゃ] ＿＿ どう？ (なんか)
  "n3-degree/nanka-nante#4n77sd": "でも also fits (お茶でもどう？).",
  // [飲|の]み[物|もの] は、 お[茶|ちゃ] ＿＿ どう です か？ (なんか)
  "n3-degree/nanka-nante#1mft8ou": "でも also fits (お茶でもどう？).",
  // [勉強|べんきょう] ＿＿、 [嫌|きら]い だ。 (なんて)
  "n3-degree/nanka-nante#crmo11": "は also fits (勉強は嫌いだ, 彼の言うことは信じないほうがいい).",
  // [彼|かれ] の [言|い]う こと ＿＿、 [信|しん]じない ほう が いい よ。 (なんか)
  "n3-degree/nanka-nante#93bdfi": "は also fits (勉強は嫌いだ, 彼の言うことは信じないほうがいい).",
  // [彼|かれ] の [言|い]う こと ＿＿、 [信|しん]じない ほう が いい です よ。 (なんか)
  "n3-degree/nanka-nante#8c1le2": "は also fits (勉強は嫌いだ, 彼の言うことは信じないほうがいい).",
  // こんな ところ で [会|あ]う ＿＿、 [思|おも]わなかった。 (なんて)
  "n3-degree/nanka-nante#1c66i4t": "とは (and と) also fit (会うとは思わなかった).",
  // こんな ところ で [会|あ]う ＿＿、 [思|おも]いません でした。 (なんて)
  "n3-degree/nanka-nante#1vulh2a": "とは (and と) also fit (会うとは思わなかった).",
  // [約束|やくそく] を [忘|わす]れる ＿＿、 ひどい よ。 (なんて)
  "n3-degree/nanka-nante#doydn7": "のは also fits (約束を忘れるのはひどい).",
  // [約束|やくそく] を [忘|わす]れる ＿＿、 ひどい です よ。 (なんて)
  "n3-degree/nanka-nante#1362g35": "のは also fits (約束を忘れるのはひどい).",
  // [昨日|きのう] の [試験|しけん] は ＿＿ [分|わ]からなかった。 (まったく)
  "n3-degree/negative-adverbs#fcrqvr": "[全然|ぜんぜん] also fits “not at all”, as the lesson says.",
  // [昨日|きのう] の [試験|しけん] は ＿＿ [分|わ]かりません でした。 (まったく)
  "n3-degree/negative-adverbs#1w1xt3w": "[全然|ぜんぜん] also fits “not at all”, as the lesson says.",
  // この [町|まち] は [昔|むかし] と ＿＿ [変|か]わって いません。 (まったく)
  "n3-degree/negative-adverbs#1tulsmn": "[全然|ぜんぜん] also fits “not at all”, as the lesson says.",
  // この [町|まち] は [昔|むかし] と ＿＿ [変|か]わって いない。 (まったく)
  "n3-degree/negative-adverbs#3i1eaz": "[全然|ぜんぜん] also fits “not at all”, as the lesson says.",
  // この [映画|えいが] は ＿＿ [面白|おもしろ]くなかった。 ([別|べつ]に)
  "n3-degree/negative-adverbs#co709u": "あまり also fits (あまり面白くなかった, あまり行きたくない).",
  // この [映画|えいが] は ＿＿ [面白|おもしろ]くなかった です。 ([別|べつ]に)
  "n3-degree/negative-adverbs#4hovj2": "あまり also fits (あまり面白くなかった, あまり行きたくない).",
  // ＿＿ [行|い]きたくない けど、 [誘|さそ]われた から [行|い]く。 ([別|べつ]に)
  "n3-degree/negative-adverbs#ma8arf": "あまり also fits (あまり面白くなかった, あまり行きたくない).",
  // ＿＿ [行|い]きたくない けど、 [誘|さそ]われた から [行|い]きます。 ([別|べつ]に)
  "n3-degree/negative-adverbs#1k9432y": "あまり also fits (あまり面白くなかった, あまり行きたくない).",
  // この [料理|りょうり] は ＿＿ おいしい。 (とても)
  "n3-degree/negative-adverbs#teebe2": "すごく and 本当に also fit “very”.",
};

/**
 * Other answers that count, reviewed by hand: a particle the lesson says also fits, and the digits a keyboard
 * offers for a number (as the lesson quizzes list them). Written as typed.
 */
export const CLOZE_ALSO: Record<string, string[]> = {
  // [日曜日|にちようび] ＿＿、 [道|みち] が [混|こ]んで います ね。 (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#1qs86dj": ["の [割|わり] に"],
  // [日曜日|にちようび] ＿＿、 [道|みち] が [混|こ]んでる ね。 (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#pux2ol": ["の [割|わり] に"],
  // [十月|じゅうがつ] ＿＿、 [今日|きょう] は [暑|あつ]い です ね。 (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#1h3ltoh": ["の [割|わり] に"],
  // [十月|じゅうがつ] ＿＿、 [今日|きょう] は [暑|あつ]い ね。 (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#19xz32t": ["の [割|わり] に"],
  // [小学生|しょうがくせい] ＿＿、 [難|むずか]しい [言葉|ことば] を よく [知|し]って いる。 (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#ce1xrj": ["の [割|わり] に"],
  // [小学生|しょうがくせい] ＿＿、 [難|むずか]しい [言葉|ことば] を よく [知|し]って います。 (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#1and3hv": ["の [割|わり] に"],
  // [日本|にほん] に [来|き]て [一年|いちねん] ＿＿、 [日本語|にほんご] が [上手|じょうず] です ね。 (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#e1hp04": ["の [割|わり] に"],
  // [日本|にほん] に [来|き]て [一年|いちねん] ＿＿、 [日本語|にほんご] が [上手|じょうず] だ ね。 (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#1ukemuu": ["の [割|わり] に"],
  // [初|はじ]めて ＿＿、 すごく おいしい よ！ (に して は; の割に is taught beside it)
  "n3-relations/ni-shite-wa#yyga0e": ["の [割|わり] に"],
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
  // n4-giving-voice/requests: every request form the lesson teaches fits, so the casual gaps take each casual one and the polite gaps each polite one.
  // n4-giving-voice/causative-passive: the lesson teaches the long form beside the short one.
  // ちょっと [手伝|てつだ]って ＿＿？ (くれない)
  "n4-giving-voice/requests#12my6op": ["くれる", "もらえる", "もらえない"],
  // ちょっと [手伝|てつだ]って ＿＿？ (くれません か)
  "n4-giving-voice/requests#umhh1k": ["くれます か", "もらえません か", "もらえます か", "いただけません か", "いただけます か"],
  // その [塩|しお]、 [取|と]って ＿＿？ (くれる)
  "n4-giving-voice/requests#i2iix7": ["くれない", "もらえる", "もらえない"],
  // その [塩|しお] を [取|と]って ＿＿？ (くれます か)
  "n4-giving-voice/requests#1al7nzn": ["くれません か", "もらえません か", "もらえます か", "いただけません か", "いただけます か"],
  // [帰|かえ]り に [牛乳|ぎゅうにゅう] を [買|か]って きて ＿＿？ (もらえる)
  "n4-giving-voice/requests#1j1ehfp": ["くれる", "くれない", "もらえない"],
  // [帰|かえ]り に [牛乳|ぎゅうにゅう] を [買|か]って きて ＿＿？ (もらえます か)
  "n4-giving-voice/requests#13sxat8": ["くれません か", "くれます か", "もらえません か", "いただけません か", "いただけます か"],
  // [駅|えき] に [着|つ]いたら、 [電話|でんわ] して ＿＿？ (もらえない)
  "n4-giving-voice/requests#s0doo9": ["くれる", "くれない", "もらえる"],
  // [駅|えき] に [着|つ]いたら、 [電話|でんわ] して ＿＿？ (もらえません か)
  "n4-giving-voice/requests#1r2fc48": ["くれません か", "くれます か", "もらえます か", "いただけません か", "いただけます か"],
  // すみません、 [写真|しゃしん] を [撮|と]って ＿＿？ (もらえません か)
  "n4-giving-voice/requests#y0re12": ["くれません か", "くれます か", "もらえます か", "いただけません か", "いただけます か"],
  // もう [少|すこ]し ゆっくり [話|はな]して ＿＿？ (くれません か)
  "n4-giving-voice/requests#tu4nn9": ["くれます か", "もらえません か", "もらえます か", "いただけません か", "いただけます か"],
  // もう [少|すこ]し ゆっくり [話|はな]して ＿＿？ (くれない)
  "n4-giving-voice/requests#1nu007i": ["くれる", "もらえる", "もらえない"],
  // すみません、 [駅|えき] まで の [道|みち] を [教|おし]えて ＿＿？ (いただけません か)
  "n4-giving-voice/requests#1pyumhs": ["くれません か", "くれます か", "もらえません か", "もらえます か", "いただけます か"],
  // [申|もう]し[訳|わけ] ありません が、 [少|すこ]し [待|ま]って ＿＿？ (いただけません か)
  "n4-giving-voice/requests#wuw9nl": ["くれません か", "くれます か", "もらえません か", "もらえます か", "いただけます か"],
  // [窓|まど] を [開|あ]けて ＿＿？ (もらえません か)
  "n4-giving-voice/requests#jgn24k": ["くれません か", "くれます か", "もらえます か", "いただけません か", "いただけます か"],
  // [佐藤|さとう]-さん、 この メール を [英語|えいご] に [直|なお]して ＿＿？ (いただけません か)
  "n4-giving-voice/requests#3dya2k": ["くれません か", "くれます か", "もらえません か", "もらえます か", "いただけます か"],
  // [子供|こども] の とき、 [毎日|まいにち] [牛乳|ぎゅうにゅう] を ＿＿。 ([飲|の]まされました)
  "n4-giving-voice/causative-passive#9kn49f": ["[飲|の]ませられました"],
  // [子供|こども] の とき、 [毎日|まいにち] [牛乳|ぎゅうにゅう] を ＿＿。 ([飲|の]まされた)
  "n4-giving-voice/causative-passive#h23a8y": ["[飲|の]ませられた"],
  // [先輩|せんぱい] に [重|おも]い [荷物|にもつ] を ＿＿。 ([運|はこ]ばされた)
  "n4-giving-voice/causative-passive#205jeh": ["[運|はこ]ばせられた"],
  // [先輩|せんぱい] に [重|おも]い [荷物|にもつ] を ＿＿。 ([運|はこ]ばされました)
  "n4-giving-voice/causative-passive#ct82e4": ["[運|はこ]ばせられました"],
  // [駅|えき] で [一時間|いちじかん] も ＿＿。 ([待|ま]たされました)
  "n4-giving-voice/causative-passive#1lrwevj": ["[待|ま]たせられました"],
  // [駅|えき] で [一時間|いちじかん] も ＿＿。 ([待|ま]たされた)
  "n4-giving-voice/causative-passive#f07rgu": ["[待|ま]たせられた"],
  // [楽|たの]しかった けど、 カラオケ で [何度|なんど] も ＿＿ よ。 ([歌|うた]わされた)
  "n4-giving-voice/causative-passive#i9bi0j": ["[歌|うた]わせられた"],
  // n4-giving-voice/te-ageru-kureru-morau: to a manager or a teacher the honorific and humble forms fit as well.
  "n4-giving-voice/te-ageru-kureru-morau#10j4hz5": ["いただきました"],
  "n4-giving-voice/te-ageru-kureru-morau#k256f1": ["くださって", "いただいて"],
  "n4-giving-voice/te-ageru-kureru-morau#ydiiki": ["くださって", "いただいて"],
  // n4-giving-voice/sasete-kudasai: the lesson teaches ください, もらえませんか and いただけませんか as alternatives.
  "n4-giving-voice/sasete-kudasai#v7t62n": ["させて もらえません か", "させて いただけません か", "させて もらえます か", "させて いただけます か"],
  "n4-giving-voice/sasete-kudasai#mvebea": ["せて ください", "せて いただけません か", "せて もらえます か", "せて いただけます か"],
  "n4-giving-voice/sasete-kudasai#1yif3ee": ["せて ください", "せて もらえません か", "せて もらえます か", "せて いただけます か"],
  "n4-giving-voice/sasete-kudasai#ooo7h3": ["せて ください", "せて もらえません か", "せて もらえます か", "せて いただけます か"],
  // n4-seeming/you-mitai: the lesson teaches ようだ and みたいだ for the same “seems” and “like”.
  "n4-seeming/you-mitai#1r3d2d9": ["みたい です"],
  "n4-seeming/you-mitai#1fsqiax": ["みたい だ", "よう だ"],
  "n4-seeming/you-mitai#fxs3i5": ["みたい です"],
  "n4-seeming/you-mitai#94va6v": ["みたい だ", "の よう だ"],
  "n4-seeming/you-mitai#1v1kja9": ["みたい です"],
  "n4-seeming/you-mitai#1h5071r": ["みたい だ", "な よう だ"],
  "n4-seeming/you-mitai#1c4jj7e": ["みたい です"],
  "n4-seeming/you-mitai#1cq3wbu": ["よう"],
  "n4-seeming/you-mitai#g7xarc": ["よう"],
  "n4-seeming/you-mitai#5arzn": ["みたい だ", "よう だ"],
  "n4-seeming/you-mitai#1g347cx": ["よう"],
  "n4-seeming/you-mitai#1rmbviq": ["みたい だ", "な よう だ"],
  "n4-seeming/you-mitai#1rs3kjy": ["な よう"],
  "n4-seeming/you-mitai#1vmgdaa": ["よう"],
  "n4-seeming/you-mitai#1eseq4k": ["みたい だ", "よう だ"],
  "n4-seeming/you-mitai#704z6e": ["みたい に"],
  "n4-seeming/you-mitai#18dni76": ["の よう に"],
  "n4-seeming/you-mitai#xoimbv": ["の よう に"],
  "n4-seeming/you-mitai#ff0npb": ["みたい に"],
  "n4-seeming/you-mitai#yptttv": ["の よう な"],
  "n4-seeming/you-mitai#18o93zf": ["みたい な"],
  "n4-seeming/you-mitai#nf5424": ["の よう"],
  "n4-seeming/you-mitai#1tw3pzl": ["みたい だ", "の よう だ"],
  "n4-seeming/you-mitai#14d7847": ["の よう に"],
  "n4-seeming/you-mitai#87lil1": ["の よう に"],
  "n4-seeming/you-mitai#8u609w": ["よう"],
  "n4-seeming/you-mitai#oxong6": ["みたい だ", "の よう だ"],
  // n4-seeming/hazu: casual speech often drops the が of はずがない, as the lesson says.
  "n4-seeming/hazu#i5a89v": ["はず ない"],
  "n4-seeming/hazu#m67ujq": ["はず ない"],
  "n4-seeming/hazu#ta8231": ["はず ない"],
  "n4-seeming/hazu#47va5m": ["はず ない"],
  // n4-seeming/kamoshirenai: in casual speech かも and かもしれない both fit.
  "n4-seeming/kamoshirenai#1b7zkwa": ["かも"],
  "n4-seeming/kamoshirenai#1uj10gk": ["かも"],
  "n4-seeming/kamoshirenai#1kakabd": ["かも"],
  "n4-seeming/kamoshirenai#3ee2o": ["かも"],
  "n4-seeming/kamoshirenai#105k0at": ["かも"],
  "n4-seeming/kamoshirenai#1ccnmy3": ["かも しれない"],
  "n4-seeming/kamoshirenai#1efo52d": ["かも しれない"],
  "n4-seeming/kamoshirenai#etqo31": ["かも しれない"],
  "n4-seeming/kamoshirenai#1bzma9d": ["かも しれない"],
  "n4-seeming/kamoshirenai#1jcz6f1": ["かも しれない"],
  "n4-seeming/kamoshirenai#3t1ppk": ["かも しれない"],
  // n4-seeming/to-iu: the lesson says speech often uses って for と.
  "n4-seeming/to-iu#rdmcn3": ["って [言|い]いました", "と [言|い]って いました", "って [言|い]って いました"],
  "n4-seeming/to-iu#15abewp": ["って [言|い]った", "と [言|い]って いた", "って [言|い]って いた"],
  "n4-seeming/to-iu#iql21": ["って [言|い]って いました", "と [言|い]いました", "って [言|い]いました"],
  "n4-seeming/to-iu#15942zd": ["と [言|い]って いた", "と [言|い]った", "って [言|い]った", "って [言|い]って いた"],
  "n4-seeming/to-iu#1shsmui": ["って [言|い]って いた", "と [言|い]った", "って [言|い]った"],
  "n4-seeming/to-iu#kadaiz": ["って [言|い]って いました", "と [言|い]いました", "って [言|い]いました"],
  "n4-seeming/to-iu#1k6wavy": ["って [言|い]った", "と [言|い]って いた", "って [言|い]って いた"],
  "n4-seeming/to-iu#o1gpz0": ["って [言|い]いました", "と [言|い]って いました", "って [言|い]って いました"],
  "n4-seeming/to-iu#1k0ecy9": ["って [言|い]います"],
  "n4-seeming/to-iu#113we19": ["って いう"],
  "n4-seeming/to-iu#15twbiu": ["と いう"],
  "n4-seeming/to-iu#1ng73fj": ["って いう"],
  "n4-seeming/to-iu#v9h1gs": ["と いう"],
  "n4-seeming/to-iu#1iuo9jb": ["って いう"],
  "n4-seeming/to-iu#1ubbxzt": ["と いう"],
  "n4-seeming/to-iu#plkhsy": ["って いう"],
  "n4-seeming/to-iu#1t34aba": ["と いう"],
  "n4-seeming/to-iu#lz81cr": ["と いう こと", "って いう こと"],
  "n4-seeming/to-iu#n3mbqj": ["って こと", "って いう こと"],
  "n4-seeming/to-iu#1ik2tsu": ["って いう"],
  "n4-seeming/to-iu#gy8zpt": ["と [言|い]って いた", "と [言|い]った", "って [言|い]った", "って [言|い]って いた"],
  // Question word … ＿＿ (か): のか is the lesson's emphatic variant
  "n4-seeming/ka-dou-ka#wxsflt": ["の か"],
  "n4-seeming/ka-dou-ka#2svdvv": ["の か"],
  "n4-seeming/ka-dou-ka#dscxmv": ["の か"],
  "n4-seeming/ka-dou-ka#g3hykw": ["の か"],
  "n4-seeming/ka-dou-ka#y156a1": ["の か"],
  "n4-seeming/ka-dou-ka#4aymmy": ["の か"],
  "n4-seeming/ka-dou-ka#1j86gme": ["の か"],
  "n4-seeming/ka-dou-ka#17340w4": ["の か"],
  "n4-seeming/ka-dou-ka#1r43o9w": ["の か"],
  "n4-seeming/ka-dou-ka#hetqt1": ["の か"],
  "n4-seeming/ka-dou-ka#1somgoa": ["の か"],
  // … ＿＿。 (ん です): the lesson gives のです as the written form
  "n4-seeming/n-desu#ovcmn3": ["の です"],
  "n4-seeming/n-desu#690o8d": ["の です"],
  "n4-seeming/n-desu#19vhzur": ["の です"],
  // … ＿＿？ (ん です か)
  "n4-seeming/n-desu#5qufj7": ["の です か"],
  "n4-seeming/n-desu#2ct9i4": ["の です か"],
  "n4-seeming/n-desu#gfv0b8": ["の です か"],
  "n4-seeming/n-desu#lx37ce": ["の です か"],
  "n4-seeming/n-desu#1rsqjxh": ["の です か"],
  // … ＿＿。 (なん です)
  "n4-seeming/n-desu#1p2fdgn": ["な の です"],
  "n4-seeming/n-desu#1y091vs": ["な の です"],
  // … ＿＿。 (かな): かしら, the lesson's other “I wonder”
  "n4-seeming/kana#f8jjb2": ["かしら"],
  "n4-seeming/kana#q42oam": ["かしら"],
  "n4-seeming/kana#racdfo": ["かしら"],
  "n4-seeming/kana#1j2b0i3": ["かしら"],
  "n4-seeming/kana#1qlijfh": ["かしら"],
  "n4-seeming/kana#92mo9i": ["かしら"],
  "n4-seeming/kana#bbppca": ["かしら"],
  // … ＿＿。 (かしら): かな
  "n4-seeming/kana#1eqg0dj": ["かな"],
  "n4-seeming/kana#e5h5s7": ["かな"],
  "n4-seeming/kana#1veuo04": ["かな"],
  "n4-seeming/kana#aec3jv": ["かな"],
  // [正|ただ]しい もの を ＿＿。 ([選|えら]べ): exam instructions also use なさい
  "n4-seeming/commands#1gzpjdg": ["[選|えら]びなさい"],
  // hazu: the polite はずがありません also takes はずがないです (ない です is the engine's polite variant).
  "n4-seeming/hazu#17h5ib5": ["はず が ない です"],
  "n4-seeming/hazu#1odfyty": ["はず が ない です"],
  "n4-seeming/hazu#1nx55b": ["はず が ない です"],
  "n4-seeming/hazu#13vyo7e": ["はず が ない です"],
  // ka-dou-ka: a bare か is grammatical for a yes-or-no question; the lesson says so.
  "n4-seeming/ka-dou-ka#1a4y2be": ["か"],
  "n4-seeming/ka-dou-ka#ylsyds": ["か"],
  "n4-seeming/ka-dou-ka#w4iirm": ["か"],
  "n4-seeming/ka-dou-ka#1my1dw7": ["か"],
  "n4-seeming/ka-dou-ka#zjpf2v": ["か"],
  "n4-seeming/ka-dou-ka#7z8kq6": ["か"],
  "n4-seeming/ka-dou-ka#1rohk4s": ["か"],
  "n4-seeming/ka-dou-ka#3v1vn6": ["か"],
  "n4-seeming/ka-dou-ka#keykea": ["か"],
  "n4-seeming/ka-dou-ka#1u8wjq": ["か"],
  "n4-seeming/ka-dou-ka#1jveqch": ["か"],
  // n-desu: the casual statement is んだ or の; the casual question の？ is also んだ after どうした.
  "n4-seeming/n-desu#1srj0zz": ["の"],
  "n4-seeming/n-desu#162em97": ["の"],
  "n4-seeming/n-desu#q3teuk": ["な の"],
  "n4-seeming/n-desu#19x0kie": ["な の"],
  "n4-seeming/n-desu#6c19nb": ["の"],
  "n4-seeming/n-desu#15mtzvx": ["ん だ"],
  "n4-seeming/n-desu#120ofsn": ["ん だ"],
  "n4-seeming/n-desu#b6caxf": ["の"],
  "n4-seeming/n-desu#1lq5lex": ["の"],
  // kana: かしら, the lesson's other “I wonder”, after the volitional and the negative.
  "n4-seeming/kana#2yhut1": ["かしら"],
  "n4-seeming/kana#o3607q": ["かしら"],
  "n4-seeming/kana#1abk98": ["かしら"],
  "n4-seeming/kana#1fd0594": ["かしら"],
  "n4-seeming/kana#1gsns5f": ["かしら"],
  "n4-seeming/kana#1owug6i": ["かしら"],
  // yasui-nikui: づらい is as common as にくい, though the unit doesn't teach it.
  "n4-seeming/yasui-nikui#1mfbqcd": ["づらい"],
  "n4-seeming/yasui-nikui#1fmxmnd": ["づらい"],
  "n4-seeming/yasui-nikui#3iikke": ["づらい"],
  "n4-seeming/yasui-nikui#dpgyd6": ["づらい"],
  "n4-seeming/yasui-nikui#bwa8ej": ["づらい"],
  "n4-seeming/yasui-nikui#wrykyc": ["づらい"],
  "n4-seeming/yasui-nikui#q8tfba": ["づらい"],
  "n4-seeming/yasui-nikui#1ba2ehy": ["づらかった"],
  // ga-suru: 聞こえる is as right as する for a sound you can hear; ような気がする follows a clause.
  "n4-seeming/ga-suru#mutzii": ["が [聞|き]こえる"],
  "n4-seeming/ga-suru#1h9tad0": ["が [聞|き]こえます"],
  "n4-seeming/ga-suru#1brnr7v": ["が [聞|き]こえます"],
  "n4-seeming/ga-suru#woe1d7": ["が [聞|き]こえる"],
  "n4-seeming/ga-suru#aexr6p": ["よう な [気|き] が する"],
  "n4-seeming/ga-suru#1wm4zpt": ["よう な [気|き] が します"],
  "n4-seeming/ga-suru#cmnavr": ["よう な [気|き] が します"],
  "n4-seeming/ga-suru#9n46xr": ["よう な [気|き] が する"],
  "n4-seeming/ga-suru#1ldbl9i": ["よう な [気|き] が する"],
  "n4-seeming/ga-suru#1n2xeyw": ["よう な [気|き] が します"],
  "n4-seeming/ga-suru#1ct31ox": ["よう な [気|き] が します"],
  "n4-seeming/ga-suru#1wfud0h": ["よう な [気|き] が する"],
  "n4-seeming/ga-suru#1068fok": ["が [聞|き]こえません"],
  "n4-seeming/ga-suru#nenfgk": ["が [聞|き]こえます"],
  // Purpose, cause and reasons (unit 十四)
  // n3-reasons/tame-ni: the lesson says the に is often dropped.
  "n3-reasons/tame-ni#1p8sagk": ["ため"],
  "n3-reasons/tame-ni#zddgae": ["ため"],
  "n3-reasons/tame-ni#fbxzac": ["ため"],
  "n3-reasons/tame-ni#ib43nq": ["ため"],
  "n3-reasons/tame-ni#1mxu11j": ["ため"],
  "n3-reasons/tame-ni#1kwa7mo": ["ため"],
  "n3-reasons/tame-ni#i3wbgr": ["ため"],
  "n3-reasons/tame-ni#1m13ycz": ["ため"],
  "n3-reasons/tame-ni#1a3exdo": ["ため"],
  "n3-reasons/tame-ni#6yt3tu": ["ため"],
  // n3-reasons/tame-ni: and the other way round.
  "n3-reasons/tame-ni#1aszshg": ["ため に"],
  // n3-reasons/tame-ni: そのため and そのために, as the lesson shows.
  "n3-reasons/tame-ni#14iptdb": ["その ため"],
  // n3-reasons/wake-dewa-nai: the lesson teaches casual わけじゃない.
  "n3-reasons/wake-dewa-nai#1x1idz8": ["わけ じゃ ない"],
  "n3-reasons/wake-dewa-nai#8t4mbw": ["わけ じゃ ない"],
  // n3-reasons/wake-dewa-nai: and its polite forms.
  "n3-reasons/wake-dewa-nai#orbl6u": ["わけ じゃ ありません", "わけ で は ない です", "わけ じゃ ない です"],
  "n3-reasons/wake-dewa-nai#puz24c": ["わけ じゃ ありません", "わけ で は ない です", "わけ じゃ ない です"],
  "n3-reasons/wake-dewa-nai#186ni8": ["わけ じゃ ありません", "わけ で は ない です", "わけ じゃ ない です"],
  // n3-reasons/wake-ni-wa-ikanai: the lesson says casual speech sometimes drops the は.
  "n3-reasons/wake-ni-wa-ikanai#x9o40p": ["わけ に いかない"],
  "n3-reasons/wake-ni-wa-ikanai#1ykqa5g": ["わけ に いかない"],
  "n3-reasons/wake-ni-wa-ikanai#1u5xs4w": ["わけ に いかない"],
  "n3-reasons/wake-ni-wa-ikanai#1jpsbwx": ["わけ に いかない"],
  "n3-reasons/wake-ni-wa-ikanai#foq5to": ["わけ に いかない"],
  "n3-reasons/wake-ni-wa-ikanai#14mgwaz": ["わけ に いかない"],
  // n3-reasons/wake-ni-wa-ikanai: and politely.
  "n3-reasons/wake-ni-wa-ikanai#13z90y5": ["わけ に いきません", "わけ に は いかない です"],
  "n3-reasons/wake-ni-wa-ikanai#e85wh": ["わけ に いきません", "わけ に は いかない です"],
  "n3-reasons/wake-ni-wa-ikanai#13n7lvm": ["わけ に いきません", "わけ に は いかない です"],
  "n3-reasons/wake-ni-wa-ikanai#ip62j3": ["わけ に いきません", "わけ に は いかない です"],
  "n3-reasons/wake-ni-wa-ikanai#1gwqmpx": ["わけ に いきません", "わけ に は いかない です"],
  // n3-reasons/tame-ni: the second そのために line, with the に dropped too.
  "n3-reasons/tame-ni#w29bxg": ["その ため"],
  // n3-reasons/wake-dewa-nai: the lesson says casual speech drops the が, and the dialogue line (怒る わけ ない) takes it.
  "n3-reasons/wake-dewa-nai#1p1n2ko": ["わけ ない"],
  "n3-reasons/wake-dewa-nai#wscaba": ["わけ ない"],
  // n3-reasons/wake-ni-wa-ikanai: ないわけにはいかない lines (the gap is わけ に は); the は can drop here too.
  "n3-reasons/wake-ni-wa-ikanai#iwqw64": ["わけ に"],
  "n3-reasons/wake-ni-wa-ikanai#1lf0pb4": ["わけ に"],
  "n3-reasons/wake-ni-wa-ikanai#12eah23": ["わけ に"],
  "n3-reasons/wake-ni-wa-ikanai#14xickf": ["わけ に"],
  "n3-reasons/wake-ni-wa-ikanai#ddje75": ["わけ に"],
  "n3-reasons/wake-ni-wa-ikanai#13bh4xx": ["わけ に"],
  // Time and change (unit 十五)
  // n3-time/ta-totan: the lesson says the に is often dropped, and it may be added.
  "n3-time/ta-totan#1vzxeje": ["とたん"],
  "n3-time/ta-totan#1aun8tx": ["とたん"],
  "n3-time/ta-totan#nkzd0x": ["とたん に"],
  "n3-time/ta-totan#u0wcx7": ["とたん に"],
  "n3-time/ta-totan#17zc8kd": ["とたん に"],
  "n3-time/ta-totan#1s7olou": ["とたん に"],
  "n3-time/ta-totan#u77sbb": ["とたん に"],
  "n3-time/ta-totan#drwxak": ["とたん に"],
  "n3-time/ta-totan#161work": ["とたん"],
  "n3-time/ta-totan#1j5wpff": ["とたん"],
  "n3-time/ta-totan#169nfsy": ["とたん"],
  "n3-time/ta-totan#17y1sp": ["とたん"],
  // n3-time/tabi-ni: the lesson says the に may drop.
  "n3-time/tabi-ni#16dizx1": ["たび"],
  "n3-time/tabi-ni#nzfbhg": ["たび"],
  "n3-time/tabi-ni#1i2dj7l": ["たび"],
  "n3-time/tabi-ni#1nvxexl": ["たび"],
  "n3-time/tabi-ni#1hxdr0w": ["たび"],
  "n3-time/tabi-ni#8aco30": ["たび"],
  "n3-time/tabi-ni#8vdg7s": ["たび"],
  "n3-time/tabi-ni#s0axsu": ["たび"],
  "n3-time/tabi-ni#16ofea3": ["たび"],
  // n3-time/goto-oki-ni: with minutes and hours, the lesson says ごとに and おきに mean the same.
  "n3-time/goto-oki-ni#1obf4sq": ["おき に"],
  "n3-time/goto-oki-ni#mwpo1m": ["おき に"],
  "n3-time/goto-oki-ni#d55421": ["おき に"],
  "n3-time/goto-oki-ni#xhuhc2": ["おき に"],
  "n3-time/goto-oki-ni#a8sen2": ["おき に"],
  // n3-time/goto-oki-ni: and the other way round.
  "n3-time/goto-oki-ni#1scbg4f": ["ごと に"],
  "n3-time/goto-oki-ni#1d58d9": ["ごと に"],
  // n3-time/ippou-da: ばかりだ fits a trend for the worse (all of these are), and [一方|いっぽう]だ any one-way trend; the lesson teaches both.
  "n3-time/ippou-da#x4gfq2": ["ばかり だ"],
  "n3-time/ippou-da#fyvs8c": ["ばかり です"],
  "n3-time/ippou-da#m96vpk": ["ばかり です"],
  "n3-time/ippou-da#eurbiu": ["ばかり だ"],
  "n3-time/ippou-da#127cf4b": ["ばかり です"],
  "n3-time/ippou-da#5stolb": ["ばかり だ"],
  "n3-time/ippou-da#1be8fkl": ["ばかり だった"],
  "n3-time/ippou-da#1uug7e0": ["ばかり でした"],
  "n3-time/ippou-da#1wkkirp": ["[一方|いっぽう] だ"],
  "n3-time/ippou-da#1a89vsp": ["[一方|いっぽう] です"],
  "n3-time/ippou-da#1y4iui4": ["[一方|いっぽう] です"],
  "n3-time/ippou-da#9ssd0a": ["[一方|いっぽう] だ"],
  "n3-time/ippou-da#bttn7r": ["[一方|いっぽう] だ"],
  "n3-time/ippou-da#5ag52r": ["[一方|いっぽう] です"],
  "n3-time/ippou-da#183jdkf": ["[一方|いっぽう] でした"],
  "n3-time/ippou-da#ix7mmu": ["[一方|いっぽう] だった"],
  "n3-time/ippou-da#kc1mst": ["ばかり です"],
  "n3-time/ippou-da#1pjbzp5": ["ばかり です"],
  "n3-time/ippou-da#1rg3ez": ["[一方|いっぽう] です"],
  // n3-time/ni-tsurete: the lesson says writing drops the て. (とともに and と also fit most of these lines; the cards stay,
  // because とともに isn't taught in this unit and the lesson only names it.)
  "n3-time/ni-tsurete#p6pxp6": ["につれ"],
  "n3-time/ni-tsurete#lglzta": ["につれ"],
  "n3-time/ni-tsurete#16qp48d": ["につれ"],
  "n3-time/ni-tsurete#mmyzqa": ["につれ"],
  "n3-time/ni-tsurete#32mpfk": ["につれ"],
  "n3-time/ni-tsurete#1b3w57f": ["につれ"],
  "n3-time/ni-tsurete#1ud18d8": ["につれ"],
  "n3-time/ni-tsurete#oskrfd": ["につれ"],
  "n3-time/ni-tsurete#110k6j4": ["につれ"],
  "n3-time/ni-tsurete#1ctmep9": ["につれ"],
  "n3-time/ni-tsurete#1t9b65y": ["につれ"],
  // Relations, viewpoint and what's said (unit 十六)
  // n3-relations: cards narrowed to one word (に {比べて}, と {いえば}, {と いう の} は) accept the other form the lesson teaches.
  "n3-relations/ni-tsuite#qnt466": ["に[関|かん]して"],
  "n3-relations/ni-tsuite#146mct": ["に[関|かん]して"],
  "n3-relations/ni-tsuite#1ta4ce5": ["に[関|かん]する","に[関|かん]して の"],
  "n3-relations/ni-tsuite#1x11wxh": ["に[関|かん]する","に[関|かん]して の"],
  "n3-relations/ni-tsuite#1jprh2g": ["について"],
  "n3-relations/ni-tsuite#13pj4g0": ["について"],
  "n3-relations/ni-tsuite#fnkp0y": ["について の"],
  "n3-relations/ni-tsuite#19nih8": ["について の"],
  "n3-relations/ni-tsuite#jazaj4": ["について の"],
  "n3-relations/ni-tsuite#1ejjhqx": ["について の"],
  "n3-relations/ni-tsuite#xo5y1q": ["に[関|かん]して","に[関|かん]して は"],
  "n3-relations/ni-taishite#136qd54": ["に"],
  "n3-relations/ni-taishite#2e16y4": ["に"],
  "n3-relations/ni-taishite#1667vn1": ["に"],
  "n3-relations/ni-taishite#oi8mjv": ["に"],
  "n3-relations/ni-taishite#1en2jne": ["に"],
  "n3-relations/ni-taishite#legjh6": ["に"],
  "n3-relations/ni-totte#9c47t7": ["に は","にとって は"],
  "n3-relations/ni-totte#1gaf75h": ["に は","にとって は"],
  "n3-relations/ni-totte#1lhujsz": ["に は","にとって は"],
  "n3-relations/ni-totte#5nvoij": ["に は","にとって は"],
  "n3-relations/ni-totte#148g0y0": ["に は","にとって は"],
  "n3-relations/ni-totte#57917y": ["に は","にとって は"],
  "n3-relations/ni-totte#86g6vf": ["に は","にとって は"],
  "n3-relations/ni-totte#z5ralt": ["に は","にとって は"],
  "n3-relations/ni-totte#9c95md": ["に は","にとって は"],
  "n3-relations/ni-totte#1ptp6be": ["に は","にとって は"],
  "n3-relations/ni-totte#116q6u2": ["に"],
  "n3-relations/ni-kurabete#1905ttj": ["[比|くら]べる と","[比|くら]べ"],
  "n3-relations/ni-kurabete#1vrj6vn": ["[比|くら]べる と","[比|くら]べ"],
  "n3-relations/ni-kurabete#1dkx0vo": ["[比|くら]べて","[比|くら]べ"],
  "n3-relations/ni-kurabete#1yffkzs": ["[比|くら]べて","[比|くら]べ"],
  "n3-relations/ni-kurabete#1ifde6g": ["[比|くら]べる と","[比|くら]べ"],
  "n3-relations/ni-kurabete#pzy4e8": ["[比|くら]べる と","[比|くら]べ"],
  "n3-relations/ni-kurabete#5z63p1": ["[比|くら]べる と","[比|くら]べ"],
  "n3-relations/ni-kurabete#193t2j3": ["[比|くら]べる と","[比|くら]べ"],
  "n3-relations/ni-kurabete#1um0uka": ["[比|くら]べて","[比|くら]べ"],
  "n3-relations/ni-kurabete#g0p9g6": ["[比|くら]べて","[比|くら]べ"],
  "n3-relations/ni-kurabete#1b9ic8x": ["[比|くら]べる と","[比|くら]べ"],
  "n3-relations/ni-kurabete#19cixy4": ["[比|くら]べて","[比|くら]べ"],
  "n3-relations/wo-hajime#pfobwm": ["をはじめ として"],
  "n3-relations/wo-hajime#e05j39": ["をはじめ として"],
  "n3-relations/wo-hajime#825drr": ["をはじめ として"],
  "n3-relations/wo-hajime#19xqdct": ["をはじめ として"],
  "n3-relations/wo-hajime#gm3jo4": ["をはじめ"],
  "n3-relations/wo-hajime#1y2mya2": ["をはじめ"],
  "n3-relations/wo-hajime#yzqo3m": ["をはじめ として"],
  "n3-relations/wo-hajime#1pob4f4": ["をはじめ として"],
  "n3-relations/wo-hajime#kkfzw8": ["をはじめ として"],
  "n3-relations/wo-hajime#9vmxg5": ["をはじめ として"],
  "n3-relations/kawari-ni#moqs6h": ["[代|か]わり に"],
  "n3-relations/kawari-ni#79e2zb": ["[代|か]わり に"],
  "n3-relations/kawari-ni#gudfso": ["の [代|か]わり に"],
  "n3-relations/kawari-ni#1yvucpn": ["の [代|か]わり に"],
  "n3-relations/kawari-ni#amd49j": ["の [代|か]わり に"],
  "n3-relations/kawari-ni#ghi0r7": ["の [代|か]わり に"],
  "n3-relations/kawari-ni#19vodk1": ["の [代|か]わり に"],
  "n3-relations/kawari-ni#ro3soi": ["の [代|か]わり に"],
  "n3-relations/kawari-ni#1gtxe03": ["[代|か]わり に"],
  "n3-relations/tte#14vlutg": ["って [言|い]って いた","と [言|い]って いた","って","って [言|い]った","と [言|い]った"],
  "n3-relations/tte#8r8ac0": ["って [言|い]って いた","と [言|い]って いた","って","って [言|い]った","と [言|い]った"],
  "n3-relations/to-iu-no-wa#1rp7cxm": ["って いう の"],
  "n3-relations/to-iu-no-wa#20176t": ["と いう の"],
  "n3-relations/to-iu-no-wa#1pjp230": ["って いう の"],
  "n3-relations/to-iu-no-wa#zryii1": ["と いう の"],
  "n3-relations/to-iu-no-wa#11tilro": ["って いう の"],
  "n3-relations/to-iu-no-wa#1v8wmmf": ["と いう の"],
  "n3-relations/to-iu-no-wa#1g1o3q9": ["って いう の"],
  "n3-relations/to-iu-no-wa#rjjn09": ["と いう の も","なぜなら"],
  "n3-relations/to-iu-no-wa#1eov13n": ["と いう の も","なぜなら"],
  "n3-relations/to-iu-no-wa#4v7hf1": ["と いう の も","なぜなら"],
  "n3-relations/to-iu-no-wa#1wt7q6d": ["と いう の も","なぜなら"],
  "n3-relations/to-iu-no-wa#1t11yi2": ["と いう こと"],
  "n3-relations/to-iu-no-wa#84odau": ["って いう の"],
  "n3-relations/to-ieba#1yde880": ["いう と"],
  "n3-relations/to-ieba#jz6rri": ["いう と"],
  "n3-relations/to-ieba#106v55b": ["いう と"],
  "n3-relations/to-ieba#7cdu4l": ["いう と"],
  "n3-relations/to-ieba#sa625e": ["いう と"],
  "n3-relations/to-ieba#1faiaps": ["いう と"],
  "n3-relations/to-ieba#16f9e6j": ["いう と"],
  "n3-relations/to-ieba#1exd8pa": ["いう と"],
  "n3-relations/to-ieba#2csz8e": ["いえば"],
  "n3-relations/to-ieba#gylols": ["いえば"],
  "n3-relations/to-ieba#erkdj1": ["いえば"],
  "n3-relations/to-ieba#xuav5t": ["いえば"],
  "n3-relations/to-ieba#dyntlr": ["いう と"],
  "n3-relations/to-ieba#lxdypv": ["いう と"],
  "n3-relations/to-iu-yori#6d6p3u": ["と いう より も"],
  "n3-relations/to-iu-yori#12hmfum": ["と いう より も"],
  "n3-relations/to-iu-yori#1q85tw": ["と いう より も"],
  "n3-relations/to-iu-yori#rytspu": ["と いう より も"],
  "n3-relations/to-iu-yori#1fr5i4x": ["と いう より も"],
  "n3-relations/to-iu-yori#4vytaq": ["と いう より も"],
  "n3-relations/to-iu-yori#bme8mw": ["と いう より も"],
  "n3-relations/to-iu-yori#j4lto4": ["と いう より も"],
  "n3-relations/to-iu-yori#8y6516": ["と いう より も"],
  "n3-relations/to-iu-yori#18061p3": ["と いう より も"],
  "n3-relations/to-iu-yori#5disky": ["と いう より も"],
  // Degree, limits and emphasis (unit 十七)
  // n3-degree/hodo: for a degree, the lesson teaches くらい (ぐらい) as the everyday ほど.
  // [泣|な]きたい ＿＿ [悲|かな]しかった。 (ほど)
  "n3-degree/hodo#13qpdol": ["くらい","ぐらい"],
  // [泣|な]きたい ＿＿ [悲|かな]しかった です。 (ほど)
  "n3-degree/hodo#z9a8er": ["くらい","ぐらい"],
  // [足|あし] が [痛|いた]くて、 [歩|ある]けない ＿＿ でした。 (ほど)
  "n3-degree/hodo#1121zy3": ["くらい","ぐらい"],
  // [足|あし] が [痛|いた]くて、 [歩|ある]けない ＿＿ だった。 (ほど)
  "n3-degree/hodo#bxlfvk": ["くらい","ぐらい"],
  // [今日|きょう] は [死|し]ぬ ＿＿ [疲|つか]れた。 (ほど)
  "n3-degree/hodo#149i1dl": ["くらい","ぐらい"],
  // [信|しん]じられない ＿＿ [安|やす]い です ね。 (ほど)
  "n3-degree/hodo#1br786s": ["くらい","ぐらい"],
  // [信|しん]じられない ＿＿ [安|やす]い ね。 (ほど)
  "n3-degree/hodo#p9ukym": ["くらい","ぐらい"],
  // すごかった。 [前|まえ] が [見|み]えない ＿＿ [降|ふ]った [日|ひ] も あった よ。 (ほど)
  "n3-degree/hodo#184kos3": ["くらい","ぐらい"],
  // n3-degree/kurai-extent: and the other way round; くらい and ぐらい are one word.
  // [今日|きょう] は [外|そと] に [出|で]たくない ＿＿ [寒|さむ]い。 (くらい)
  "n3-degree/kurai-extent#zqgpgt": ["ぐらい","ほど"],
  // [今日|きょう] は [外|そと] に [出|で]たくない ＿＿ [寒|さむ]い です。 (くらい)
  "n3-degree/kurai-extent#sqxemz": ["ぐらい","ほど"],
  // [涙|なみだ] が [出|で]る ＿＿ [笑|わら]った。 (くらい)
  "n3-degree/kurai-extent#d2wphe": ["ぐらい","ほど"],
  // [涙|なみだ] が [出|で]る ＿＿ [笑|わら]いました。 (くらい)
  "n3-degree/kurai-extent#1rhxxyo": ["ぐらい","ほど"],
  // その ニュース を [聞|き]いて、 [声|こえ] も [出|で]ない ＿＿ [驚|おどろ]いた。 (くらい)
  "n3-degree/kurai-extent#jfdp3y": ["ぐらい","ほど"],
  // その ニュース を [聞|き]いて、 [声|こえ] も [出|で]ない ＿＿ [驚|おどろ]きました。 (くらい)
  "n3-degree/kurai-extent#1p35goy": ["ぐらい","ほど"],
  // [見|み]た！ [声|こえ] が [出|で]なく なる ＿＿ [応援|おうえん] した よ。 (くらい)
  "n3-degree/kurai-extent#mzvqa6": ["ぐらい","ほど"],
  // n3-degree/kurai-extent: くらい and ぐらい are one word.
  // [彼女|かのじょ] は プロ と [同|おな]じ ＿＿ [歌|うた] が [上手|じょうず] です。 (くらい)
  "n3-degree/kurai-extent#7cmehe": ["ぐらい"],
  // [彼女|かのじょ] は プロ と [同|おな]じ ＿＿ [歌|うた] が [上手|じょうず] だ よ。 (くらい)
  "n3-degree/kurai-extent#m9y73y": ["ぐらい"],
  // こんな [時間|じかん] に [電話|でんわ] して くる の は [母|はは] ＿＿ です。 (くらい)
  "n3-degree/kurai-extent#1jur5wj": ["ぐらい"],
  // こんな [時間|じかん] に [電話|でんわ] して くる の は [母|はは] ＿＿ だ。 (くらい)
  "n3-degree/kurai-extent#1fdx3ql": ["ぐらい"],
  // この [町|まち] で [遅|おそ]く まで [開|あ]いて いる の は コンビニ ＿＿ だ。 (くらい)
  "n3-degree/kurai-extent#apswtd": ["ぐらい"],
  // この [町|まち] で [遅|おそ]く まで [開|あ]いて いる の は コンビニ ＿＿ です。 (くらい)
  "n3-degree/kurai-extent#1eh20qf": ["ぐらい"],
  // クラス で その [漢字|かんじ] が [読|よ]めた の は [私|わたし] ＿＿ だった。 (くらい)
  "n3-degree/kurai-extent#vx47p": ["ぐらい"],
  // クラス で その [漢字|かんじ] が [読|よ]めた の は [私|わたし] ＿＿ でした。 (くらい)
  "n3-degree/kurai-extent#m6xczy": ["ぐらい"],
  // [冷蔵庫|れいぞうこ] に ある の は [卵|たまご] ＿＿ です。 (くらい)
  "n3-degree/kurai-extent#11jmvkq": ["ぐらい"],
  // [冷蔵庫|れいぞうこ] に ある の は [卵|たまご] ＿＿ だ よ。 (くらい)
  "n3-degree/kurai-extent#1nc7lcm": ["ぐらい"],
  // n3-degree/dake-de-naku: だけでなく, its spoken forms and the written ばかりでなく say the same.
  // [田中|たなか]-さん は [英語|えいご] ＿＿、 [中国語|ちゅうごくご] も [話|はな]せます。 (だけ で なく)
  "n3-degree/dake-de-naku#5evt20": ["だけ で なくて","だけ じゃ なくて","だけ じゃ なく","ばかり で なく"],
  // この [店|みせ] は [安|やす]い ＿＿、 [味|あじ] も いい。 (だけ で なく)
  "n3-degree/dake-de-naku#10piiov": ["だけ で なくて","だけ じゃ なくて","だけ じゃ なく","ばかり で なく"],
  // この [店|みせ] は [安|やす]い ＿＿、 [味|あじ] も いい です。 (だけ で なく)
  "n3-degree/dake-de-naku#15nu41p": ["だけ で なくて","だけ じゃ なくて","だけ じゃ なく","ばかり で なく"],
  // [雨|あめ] ＿＿、 [風|かぜ] も [強|つよ]く なって きました。 (だけ で なく)
  "n3-degree/dake-de-naku#17ww5hd": ["だけ で なくて","だけ じゃ なくて","だけ じゃ なく","ばかり で なく"],
  // [子供|こども] ＿＿、 [大人|おとな] も [楽|たの]しめる [映画|えいが] です。 (だけ で なく)
  "n3-degree/dake-de-naku#1g32njx": ["だけ で なくて","だけ じゃ なくて","だけ じゃ なく","ばかり で なく"],
  // [話|はな]す こと ＿＿、 [読|よ]む こと に も [慣|な]れて きました。 (だけ で なく)
  "n3-degree/dake-de-naku#1kqg0oq": ["だけ で なくて","だけ じゃ なくて","だけ じゃ なく","ばかり で なく"],
  // [田中|たなか]-さん は [英語|えいご] ＿＿、 [中国語|ちゅうごくご] も [話|はな]せる よ。 (だけ じゃ なくて)
  "n3-degree/dake-de-naku#siuoi4": ["だけ で なく","だけ で なくて","だけ じゃ なく","ばかり で なく"],
  // [雨|あめ] ＿＿、 [風|かぜ] も [強|つよ]く なって きた。 (だけ じゃ なくて)
  "n3-degree/dake-de-naku#1a2aud8": ["だけ で なく","だけ で なくて","だけ じゃ なく","ばかり で なく"],
  // [彼|かれ] は [勉強|べんきょう] ＿＿、 スポーツ も [得意|とくい] だ よ。 (だけ じゃ なくて)
  "n3-degree/dake-de-naku#2z0h24": ["だけ で なく","だけ で なくて","だけ じゃ なく","ばかり で なく"],
  // [彼|かれ] は [勉強|べんきょう] ＿＿、 スポーツ も [得意|とくい] です よ。 (だけ じゃ なくて)
  "n3-degree/dake-de-naku#fmg0xs": ["だけ で なく","だけ で なくて","だけ じゃ なく","ばかり で なく"],
  // [子供|こども] ＿＿、 [大人|おとな] も [楽|たの]しめる [映画|えいが] だ よ。 (だけ じゃ なくて)
  "n3-degree/dake-de-naku#10dje4d": ["だけ で なく","だけ で なくて","だけ じゃ なく","ばかり で なく"],
  // この [町|まち] は [旅行|りょこう] で [来|く]る [人|ひと] ＿＿、 [住|す]む [人|ひと] に も [人気|にんき] が あります。 (ばかり で なく)
  "n3-degree/dake-de-naku#x19fuf": ["だけ で なく","だけ で なくて","だけ じゃ なくて","だけ じゃ なく"],
  // [彼女|かのじょ] は [歌|うた] が [上手|じょうず] な ＿＿、 [曲|きょく] も [作|つく]れる。 (ばかり で なく)
  "n3-degree/dake-de-naku#1w7qx27": ["だけ で なく","だけ で なくて","だけ じゃ なくて","だけ じゃ なく"],
  // [彼女|かのじょ] は [歌|うた] が [上手|じょうず] な ＿＿、 [曲|きょく] も [作|つく]れます。 (ばかり で なく)
  "n3-degree/dake-de-naku#7txr5v": ["だけ で なく","だけ で なくて","だけ じゃ なくて","だけ じゃ なく"],
  // [運動|うんどう] は [体|からだ] ＿＿、 [心|こころ] に も いい そう です。 (ばかり で なく)
  "n3-degree/dake-de-naku#k5y219": ["だけ で なく","だけ で なくて","だけ じゃ なくて","だけ じゃ なく"],
  // [運動|うんどう] は [体|からだ] ＿＿、 [心|こころ] に も いい そう だ。 (ばかり で なく)
  "n3-degree/dake-de-naku#1g1ozxz": ["だけ で なく","だけ で なくて","だけ じゃ なくて","だけ じゃ なく"],
  // [台風|たいふう] で、 [電車|でんしゃ] ＿＿ [飛行機|ひこうき] も [止|と]まった。 (ばかり で なく)
  "n3-degree/dake-de-naku#12pjom1": ["だけ で なく","だけ で なくて","だけ じゃ なくて","だけ じゃ なく"],
  // [台風|たいふう] で、 [電車|でんしゃ] ＿＿ [飛行機|ひこうき] も [止|と]まりました。 (ばかり で なく)
  "n3-degree/dake-de-naku#sditrl": ["だけ で なく","だけ で なくて","だけ じゃ なくて","だけ じゃ なく"],
  // n3-degree/nanka-nante: after a noun, なんか and なんて are taught as one (など where it's neutral).
  // [私|わたし] ＿＿、 まだ まだ です。 (なんか)
  "n3-degree/nanka-nante#18p6m5o": ["なんて"],
  // [私|わたし] ＿＿、 まだ まだ だ よ。 (なんか)
  "n3-degree/nanka-nante#m0l968": ["なんて"],
  // [私|わたし] ＿＿、 まだ [彼氏|かれし] も いない のに。 (なんか)
  "n3-degree/nanka-nante#170et1g": ["なんて"],
  // [忙|いそが]しくて、 テレビ ＿＿ [見|み]る [時間|じかん] が ない。 (なんか)
  "n3-degree/nanka-nante#1v943gv": ["なんて","など"],
  // [忙|いそが]しくて、 テレビ ＿＿ [見|み]る [時間|じかん] が ありません。 (なんか)
  "n3-degree/nanka-nante#13h712b": ["なんて","など"],
  // n3-degree/tatoe-temo: どんなに and いくら are taught as one (no matter how).
  // ＿＿ [忙|いそが]しくて も、 [家族|かぞく] と の [時間|じかん] は [大切|たいせつ] に したい。 (どんなに)
  "n3-degree/tatoe-temo#4n93ej": ["いくら"],
  // ＿＿ [忙|いそが]しくて も、 [家族|かぞく] と の [時間|じかん] は [大切|たいせつ] に したい です。 (どんなに)
  "n3-degree/tatoe-temo#1qmcfmx": ["いくら"],
  // ＿＿ [頑張|がんば]って も、 [彼|かれ] に は [勝|か]てなかった。 (どんなに)
  "n3-degree/tatoe-temo#1bbxcyb": ["いくら"],
  // ＿＿ [頑張|がんば]って も、 [彼|かれ] に は [勝|か]てません でした。 (どんなに)
  "n3-degree/tatoe-temo#xrhya1": ["いくら"],
  // ＿＿ [高|たか]くて も、 この [絵|え] が [欲|ほ]しい。 (どんなに)
  "n3-degree/tatoe-temo#2ss0t8": ["いくら"],
  // ＿＿ [高|たか]くて も、 この [絵|え] が [欲|ほ]しい です。 (どんなに)
  "n3-degree/tatoe-temo#1942ic0": ["いくら"],
  // はい。 ＿＿ [疲|つか]れて も、 [走|はし]り[続|つづ]けます。 (どんなに)
  "n3-degree/tatoe-temo#1t4h4ny": ["いくら"],
  // ＿＿ [食|た]べて も [太|ふと]らない [人|ひと] が [羨|うらや]ましい。 (いくら)
  "n3-degree/tatoe-temo#1a08o0m": ["どんなに"],
  // ＿＿ [食|た]べて も [太|ふと]らない [人|ひと] が [羨|うらや]ましい です。 (いくら)
  "n3-degree/tatoe-temo#1nn9zrm": ["どんなに"],
  // ＿＿ [電話|でんわ] して も、 [彼女|かのじょ] は [出|で]ません でした。 (いくら)
  "n3-degree/tatoe-temo#1m403fy": ["どんなに"],
  // ＿＿ [電話|でんわ] して も、 [彼女|かのじょ] は [出|で]なかった。 (いくら)
  "n3-degree/tatoe-temo#3v6gi6": ["どんなに"],
};
