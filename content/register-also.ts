/**
 * The polite ↔ casual drill's reviewed alternatives (E6), keyed by card id ("unit/lesson#hash" of the line to
 * convert, lib/register-cards.ts), each with its conversion beside it. Other conversions a learner gives that are
 * just as right as the lesson's own line: casual speech keeps or drops を, a noun or な-adjective ends bare or
 * with だ (STYLE §9), and よ stays when it was there. Written as typed. The engine's variants (ない です for
 * ありません) are added on top.
 */
export const REGISTER_ALSO: Record<string, string[]> = {
  // Into casual
  // [何|なに] を [飲|の]みます か？ → [何|なに] [飲|の]む？
  "start/polite-and-casual#1inls1d": ["何を飲む？"],
  // [週末|しゅうまつ] は [何|なに] を します か？ → [週末|しゅうまつ] は [何|なに] する？
  "word-order/verb-last#i5dkzq": ["週末は何をする？"],
  // コーヒー を [飲|の]みます か？ → コーヒー [飲|の]む？
  "particles/ka-question#pw6qb6": ["コーヒーを飲む？"],
  // [毎朝|まいあさ] コーヒー を [飲|の]みます。 → [毎朝|まいあさ] コーヒー を [飲|の]む。
  "start/polite-and-casual#1pfy86w": ["毎朝コーヒー飲む。"],
  // [毎朝|まいあさ] [駅|えき] で コーヒー を [買|か]います。 → … を [買|か]う。
  "word-order/verb-last#4wp2dk": ["毎朝駅でコーヒー買う。"],
  // [日本|にほん] は [電車|でんしゃ] が [便利|べんり] です。 → … [便利|べんり] だ よ。
  "word-order/topic-comment#6bsvj": ["日本は電車が便利。", "日本は電車が便利だ。", "日本は電車が便利だね。"],
  // [田中|たなか]-さん は [先生|せんせい] です。 → … [先生|せんせい] だ よ。
  "grammar/desu-da#xgkrjy": ["田中さんは先生。", "田中さんは先生だ。", "田中さんは先生だね。"],
  // [好|す]き な [食|た]べ[物|もの] は [何|なん] です か？ → … は [何|なに]？
  "grammar/na-adjectives#13t5ar7": ["好きな食べ物は？"],
  // [今|いま]、 [忙|いそが]しい です か？ → [今|いま]、 [忙|いそが]しい？
  "culture/polite-or-casual#1ttl731": ["今、忙しいの？"],
  // ここ で [写真|しゃしん] を [撮|と]って は いけません。 → … [撮|と]っちゃ だめ。 (いけない kept, ちゃ or not)
  "n5-essentials/temo-ii#1as63er": ["ここで写真を撮ってはいけない。", "ここで写真を撮っちゃいけない。"],
  // [図書館|としょかん] で [電話|でんわ] して は いけません。 → … [電話|でんわ] しちゃ だめ。
  "n5-essentials/temo-ii#4ibuf5": ["図書館で電話してはいけない。", "図書館で電話しちゃいけない。", "図書館で電話しちゃだめだよ。"],
  // [授業|じゅぎょう] に [遅|おく]れて は いけません よ。 → … [遅|おく]れて は いけない よ。
  "n5-essentials/temo-ii#1ianzb1": ["授業に遅れちゃいけないよ。", "授業に遅れちゃだめだよ。"],
  // [電気|でんき] を [消|け]さないで ください。 → [電気|でんき]、 [消|け]さないで。
  "n5-essentials/naide-kudasai#1pbnsrr": ["電気を消さないで。"],
  // この こと は [誰|だれ] に も [言|い]わないで ください ね。 → この こと、 … [言|い]わないで ね。
  "n5-essentials/naide-kudasai#eeqv1m": ["このことは誰にも言わないでね。"],
  // [私|わたし] の ケーキ を [食|た]べないで ください ね。 → [私|わたし] の ケーキ、 [食|た]べないで ね。
  "n5-essentials/naide-kudasai#1fkmsus": ["私のケーキを食べないでね。"],
  // [毎日|まいにち] [薬|くすり] を [飲|の]まなければ なりません。 → … [飲|の]まなければ ならない。 (and the lesson's casual forms)
  "n5-essentials/nakereba#1uswa1": ["毎日薬を飲まなければいけない。", "毎日薬を飲まなきゃ。", "毎日薬を飲まなきゃいけない。", "毎日薬を飲まなくちゃ。", "毎日薬を飲まないと。"],
  // [明日|あした] は [六時|ろくじ] に [起|お]きなくて は いけません。 → … [起|お]きなくて は いけない。
  "n5-essentials/nakereba#1ewh322": ["明日は六時に起きなくちゃいけない。", "明日は六時に起きなくちゃ。", "明日は六時に起きなきゃ。", "明日は六時に起きないと。"],
  // [今日|きょう] は [早|はや]く [帰|かえ]らなければ いけません。 → … [帰|かえ]らなければ いけない。
  "n5-essentials/nakereba#a3h50w": ["今日は早く帰らなきゃいけない。", "今日は早く帰らなきゃ。", "今日は早く帰らなくちゃ。", "今日は早く帰らないと。"],
  // [明日|あした] テスト です から、 [勉強|べんきょう] しない と いけません。 → … だ から、 [勉強|べんきょう] しなくちゃ。
  "n5-essentials/nakereba#3a24i2": ["明日テストだから、勉強しないと。", "明日テストだから、勉強しなきゃ。", "明日テストだから、勉強しないといけない。", "明日テストだから、勉強しなきゃいけない。", "明日テストだから、勉強しなくちゃいけない。"],
  // そろそろ [寝|ね]ない と いけません。 → そろそろ [寝|ね]ない と。
  "n5-essentials/nakereba#1ahoqim": ["そろそろ寝ないといけない。", "そろそろ寝なきゃ。", "そろそろ寝なくちゃ。"],
  // [今日|きょう] は [銀行|ぎんこう] に [行|い]かなくて は いけません。 → … [行|い]かなくて は いけない。
  "n5-essentials/nakereba#1s0cicg": ["今日は銀行に行かなくちゃいけない。", "今日は銀行に行かなくちゃ。", "今日は銀行に行かなきゃ。", "今日は銀行に行かないと。"],
  // [毎晩|まいばん] [犬|いぬ] の [散歩|さんぽ] を しなくて は いけません。 → … しなくて は いけない。
  "n5-essentials/nakereba#zbedg6": ["毎晩犬の散歩をしなくちゃいけない。", "毎晩犬の散歩をしなくちゃ。", "毎晩犬の散歩をしなきゃ。", "毎晩犬の散歩をしないと。"],
  // もう [遅|おそ]い です から、 [帰|かえ]らない と いけません。 → もう [遅|おそ]い から、 [帰|かえ]らない と。
  "n5-essentials/nakereba#1tapeov": ["もう遅いから、帰らなきゃ。", "もう遅いから、帰らなくちゃ。", "もう遅いから、帰らないといけない。"],
  // もう [少|すこ]し [野菜|やさい] を [食|た]べない と いけません よ。 → … [食|た]べない と いけない よ。
  "n5-essentials/nakereba#1kt39ow": ["もう少し野菜を食べなきゃいけないよ。", "もう少し野菜を食べなくちゃいけないよ。"],
  // [明日|あした] は [来|こ]なくて も いい です よ。 → … [来|こ]なくて も いい よ。 (casual speech drops the も)
  "n5-essentials/nakute-mo-ii#1yhiv96": ["明日は来なくていいよ。"],
  // [靴|くつ] を [脱|ぬ]がなくて も いい です か？ → [靴|くつ]、 [脱|ぬ]がなくて も いい？
  "n5-essentials/nakute-mo-ii#hxzh3i": ["靴を脱がなくてもいい？", "靴、脱がなくていい？", "靴を脱がなくていい？"],
  // [全部|ぜんぶ] [食|た]べなくて も いい です よ。 → … [食|た]べなくて も いい よ。
  "n5-essentials/nakute-mo-ii#wsv716": ["全部食べなくていいよ。"],
  // [急|いそ]がなくて も いい です。 まだ … あります から。 → [急|いそ]がなくて も いい よ。 まだ … ある から。
  "n5-essentials/nakute-mo-ii#f20xls": ["急がなくていいよ。まだ時間があるから。"],
  // テスト の [後|あと] で、 [何|なに] を します か？ → テスト の [後|あと] で、 [何|なに] する？
  "n5-essentials/mae-ato#1dqp1rq": ["テストの後で、何をする？"],
  // [暇|ひま] な とき、 [何|なに] を します か？ → [暇|ひま] な とき、 [何|なに] する？
  "n5-essentials/toki#yzkldm": ["暇なとき、何をする？"],
  // [私|わたし] は [絵|え] を [描|か]く の が [好|す]き です。 → … [好|す]き。
  "n5-essentials/no-nominaliser#qwe17l": ["私は絵を描くのが好きだ。"],
  // [兄|あに] は [歌|うた]う の が [上手|じょうず] です。 → … [上手|じょうず] だ よ。
  "n5-essentials/no-nominaliser#1n61q5u": ["兄は歌うのが上手。", "兄は歌うのが上手だ。"],
  // [朝|あさ] [早|はや]く [起|お]きる の は [大変|たいへん] です。 → … [大変|たいへん] だ よ。
  "n5-essentials/no-nominaliser#1ek3aac": ["朝早く起きるのは大変。", "朝早く起きるのは大変だ。"],
  // [肉|にく] と [魚|さかな] と、 どちら が [好|す]き です か？ → [肉|にく] と [魚|さかな]、 どっち が [好|す]き？
  "n5-essentials/comparing#n9yrsb": ["肉と魚と、どっちが好き？", "肉と魚、どちらが好き？"],
  // [山|やま] と [海|うみ] と、 どちら が [好|す]き です か？ → [山|やま] と [海|うみ]、 どっち が [好|す]き？
  "n5-essentials/comparing#dlpas5": ["山と海と、どっちが好き？", "山と海、どちらが好き？"],
  // この [水|みず] は [飲|の]まない ほう が いい です よ。 → この [水|みず]、 [飲|の]まない ほう が いい よ。
  "n5-essentials/hou-ga-ii#5lxgnh": ["この水は飲まないほうがいいよ。"],
  // この [漢字|かんじ] の [読|よ]み[方|かた] を [教|おし]えて ください。 → … [読|よ]み[方|かた]、 [教|おし]えて。
  "n5-essentials/kata#16tejs0": ["この漢字の読み方を教えて。"],
  // この カメラ の [使|つか]い[方|かた] は [簡単|かんたん] です よ。 → … [使|つか]い[方|かた]、 [簡単|かんたん] だ よ。
  "n5-essentials/kata#16oslki": ["このカメラの使い方は簡単だよ。"],

  // 納豆を食べたことがありますか？ → 納豆、食べたことある？
  "n5-essentials/ta-koto-ga-aru#h81ozl": ["納豆を食べたことある？", "納豆、食べたことがある？", "納豆を食べたことがある？"],
  // 一度着物を着たことがあります。 → … 着たことがあるよ。
  "n5-essentials/ta-koto-ga-aru#13tuyyb": ["一度着物を着たことがある。", "一度着物を着たことあるよ。"],
  // 飛行機に乗ったことがありません。 → … 乗ったことがない。
  "n5-essentials/ta-koto-ga-aru#1893nbk": ["飛行機に乗ったことない。"],
  // この映画は何度も見たことがありますよ。 → この映画、… あるよ。
  "n5-essentials/ta-koto-ga-aru#ta3oeo": ["この映画は何度も見たことがあるよ。", "この映画、何度も見たことあるよ。"],
  // もう昼ご飯を食べましたか？ → もう昼ご飯、食べた？
  "n5-essentials/mou-mada#y1f7y2": ["もう昼ご飯を食べた？", "もう昼ご飯食べた？"],
  // 雨はまだ降っていますか？ → 雨、まだ降ってる？
  "n5-essentials/mou-mada#1c7uyw1": ["雨はまだ降ってる？", "雨、まだ降っている？", "雨はまだ降っている？"],
  // 姉はまだ寝ています。 → 姉はまだ寝ている。
  "n5-essentials/mou-mada#15qpdbr": ["姉はまだ寝てる。"],
  // その映画はまだ見ていません。 → その映画、まだ見ていない。
  "n5-essentials/mou-mada#1mpbiy4": ["その映画はまだ見ていない。", "その映画、まだ見てない。", "その映画はまだ見てない。"],
  // この問題は簡単すぎますね。 → この問題、簡単すぎるね。
  "n5-essentials/sugiru#1k7ezbv": ["この問題は簡単すぎるね。"],
  // 来年、日本で勉強するつもりです。 → … つもり。
  "n5-essentials/tsumori#1vorygt": ["来年、日本で勉強するつもりだ。"],
  // 夏休みはどこにも行かないつもりです。 → … つもり。
  "n5-essentials/tsumori#i04848": ["夏休みはどこにも行かないつもりだ。"],
  // 何か質問はありますか？ → 何か質問ある？
  "n5-essentials/dareka-daremo#64x461": ["何か質問はある？"],
  // 学校まで自転車で十五分ぐらいです。 → … ぐらいだよ。
  "n5-essentials/gurai-goro#1gxvpsq": ["学校まで自転車で十五分ぐらい。", "学校まで自転車で十五分ぐらいだ。"],
  // 毎日二時間ぐらい勉強しています。 → … 勉強してる。
  "n5-essentials/gurai-goro#946h85": ["毎日二時間ぐらい勉強している。"],
  // この町には何人ぐらい住んでいますか？ → この町、… 住んでるの？
  "n5-essentials/gurai-goro#4gay05": ["この町には何人ぐらい住んでるの？", "この町、何人ぐらい住んでいるの？", "この町には何人ぐらい住んでいるの？", "この町、何人ぐらい住んでる？"],
  // お金を入れると、切符が出ます。 → … 出るよ。 (and the other n4-conditions lines whose casual side adds よ or ね)
  "n4-conditions/to-natural#gozfyt": ["お金を入れると、切符が出る。"],
  "n4-conditions/to-natural#18siot3": ["駅を出ると、前に公園がある。"],
  "n4-conditions/temo#wcc2vm": ["雨が降っても、自転車で行く。"],
  "n4-conditions/temo#1gkvp7r": ["日曜日でも、この店は開いている。", "日曜日でも、この店は開いてるよ。", "日曜日でも、この店は開いてる。"],
  "n4-conditions/temo#4ukec1": ["今出ても、間に合わない。"],
  "n4-conditions/shi#17h7f2t": ["この町は静かだし、人も優しい。"],
  "n4-conditions/noni#fj5be9": ["この店は安いのに、おいしい。"],
  "n4-conditions/temo#jcxfzg": ["誰が来ても、ドアを開けないで。"],
  "n4-conditions/conditionals-compared#138izq6": ["田中さんが来たら、呼んで。"],
  // casual てる for ている
  "n4-conditions/to-natural#16thmv2": ["外に出ると、雪が降ってた。"],
  "n4-conditions/nara#1ljam4l": ["疲れてるなら、少し休んで。"],
  "n4-conditions/noni#v0u2uo": ["傘を持ってるのに、使わないの？"],
  // 日曜日なのに、会社に行かなければなりません。 → … 行かなきゃ。 (and the casual must forms of n5-essentials/nakereba)
  "n4-conditions/noni#1a8cxjs": ["日曜日なのに、会社に行かなければならない。", "日曜日なのに、会社に行かなきゃいけない。", "日曜日なのに、会社に行かなくちゃ。", "日曜日なのに、会社に行かないと。", "日曜日なのに、会社に行かなくちゃいけない。", "日曜日なのに、会社に行かなければいけない。", "日曜日なのに、会社に行かないといけない。"],
  // すみません、駅に行きたいんですけど… → あの、… んだけど…
  "n4-conditions/kedo#x77ubs": ["すみません、駅に行きたいんだけど…"],
  // 病院に行ったらどうですか？ → 病院に行ったらどう？ (the lesson says casual speech stops at たら or ば)
  "n4-conditions/advice#1e8eqxi": ["病院に行ったら？", "病院に行けば？"],
  "n4-conditions/advice#i1pie6": ["窓を開けたら？", "窓を開ければ？"],
  "n4-conditions/advice#1wldqn5": ["一度先生に相談したら？", "一度先生に相談すれば？"],
  // n4-plans: casual keeps ている or contracts it to てる, and てしまう/ておく may stay full or contract (ちゃう, とく).
  "n4-plans/you-ni#l7cd4n": ["日本語が話せるように、毎日練習している。"],
  "n4-plans/you-ni-suru-naru#11z1bmo": ["毎日野菜を食べるようにしてる。"],
  "n4-plans/you-ni-suru-naru#1nvi1qp": ["夜はコーヒーを飲まないようにしてる。"],
  "n4-plans/you-to-omou#1iuf5zd": ["週末は部屋を掃除しようと思っている。"],
  "n4-plans/you-to-omou#f2zah6": ["来年、新しい車を買おうと思っている。"],
  "n4-plans/you-to-omou#ob28ce": ["昼ご飯は駅の前の店で食べようと思っているんだけど、一緒に行かない？"],
  "n4-plans/you-to-omou#1guem0l": ["明日は十時に東京に着く予定。"],
  "n4-plans/te-shimau#1nbg0o9": ["宿題はもう全部やってしまった。"],
  "n4-plans/te-shimau#q81gnk": ["この本、一日で読んでしまった。"],
  "n4-plans/te-shimau#zi42k3": ["今日中に洗濯をしちゃおう。"],
  "n4-plans/te-shimau#32ixa0": ["電車に傘を忘れてしまった。"],
  "n4-plans/te-shimau#1dkm7n1": ["友達のカップを割っちゃった。"],
  "n4-plans/te-shimau#1c59cx0": ["会議に遅れてしまって、ごめん。"],
  "n4-plans/te-shimau#1glnaqe": ["財布を落としてしまった。"],
  "n4-plans/te-shimau#sjinp4": ["ケーキを全部食べてしまった。"],
  "n4-plans/te-oku#7shu4f": ["旅行の前に、天気を調べとく。"],
  "n4-plans/te-oku#mf2i1d": ["授業の前に、このページを読んでおいてね。"],
  "n4-plans/te-oku#rt0jc3": ["ご飯を作っておくね。"],
  "n4-plans/te-oku#odssoi": ["パーティーの前に部屋を掃除しといた。"],
  "n4-plans/te-oku#1cn4yyl": ["暑いから、窓を開けておいて。"],
  "n4-plans/te-oku#1qcl650": ["そのままにしておいて。"],
  "n4-plans/te-aru#b6h0pp": ["ホテルはもう予約してある。"],
  "n4-plans/te-shimau#nvh0y2": ["週末に映画を三本見ちゃった。"],
  "n4-plans/te-oku#16bsjgw": ["使ったお皿は、後で洗うから、そこに置いといて。"],
  "n4-plans/te-oku#kfp7f4": ["寒いから、エアコンはつけておくね。"],
  // この辞書は漢字を調べるのに便利です。 → … 便利だよ。 (a な-adjective ends bare or with だ; よ optional)
  "n4-plans/noni-purpose#8x7cby": ["この辞書は漢字を調べるのに便利。", "この辞書は漢字を調べるのに便利だ。", "この辞書は漢字を調べるのに便利だね。"],
  // この仕事をするのに日本語が必要ですか？ → … 必要？
  "n4-plans/noni-purpose#w72roy": ["この仕事をするのに日本語が必要なの？"],
  // 私は漢字を百ぐらい書くことができます。 → … できるよ。
  "n4-plans/koto-ga-dekiru#1ra0hp0": ["私は漢字を百ぐらい書くことができる。"],
  // 遅れないようにしてください。 → 遅れないようにしてね。
  "n4-plans/you-ni-suru-naru#1exvksz": ["遅れないようにね。"],
  // Into polite
  // コーヒー [飲|の]む？ → コーヒー を [飲|の]みます か？
  "particles/ka-question#pn76pr": ["コーヒー飲みますか？"],
  // [日本|にほん] は [電車|でんしゃ] が [便利|べんり] だ よ。 → … [便利|べんり] です。
  "word-order/topic-comment#16i0ty1": ["日本は電車が便利ですよ。"],
  // [田中|たなか]-さん は [先生|せんせい] だ よ。 → … [先生|せんせい] です。
  "grammar/desu-da#pczdqy": ["田中さんは先生ですよ。"],
  // [元気|げんき]？ → [元気|げんき] です か？
  "grammar/na-adjectives#d9tbte": ["お元気ですか？"],
  // ここ で [写真|しゃしん] を [撮|と]っちゃ だめ。 → … [撮|と]って は いけません。
  "n5-essentials/temo-ii#1yra2zc": ["ここで写真を撮っちゃいけません。", "ここで写真を撮ってはだめです。"],
  // [図書館|としょかん] で [電話|でんわ] しちゃ だめ。 → … [電話|でんわ] して は いけません。
  "n5-essentials/temo-ii#95xdwm": ["図書館で電話しちゃいけません。", "図書館で電話してはだめです。"],
  // [授業|じゅぎょう] に [遅|おく]れて は いけない よ。 → … [遅|おく]れて は いけません よ。
  "n5-essentials/temo-ii#10cignp": ["授業に遅れちゃいけませんよ。"],
  // [電気|でんき]、 [消|け]さないで。 → [電気|でんき] を [消|け]さないで ください。
  "n5-essentials/naide-kudasai#1g9bxlo": ["電気、消さないでください。"],
  // この こと、 [誰|だれ] に も [言|い]わないで ね。 → この こと は … [言|い]わないで ください ね。
  "n5-essentials/naide-kudasai#r6ufmi": ["このこと、誰にも言わないでくださいね。"],
  // [私|わたし] の ケーキ、 [食|た]べないで ね。 → [私|わたし] の ケーキ を [食|た]べないで ください ね。
  "n5-essentials/naide-kudasai#16ew9bd": ["私のケーキ、食べないでくださいね。"],
  // [毎日|まいにち] [薬|くすり] を [飲|の]まなければ ならない。 → … [飲|の]まなければ なりません。
  "n5-essentials/nakereba#jcr9yq": ["毎日薬を飲まなければいけません。"],
  // [明日|あした] は [六時|ろくじ] に [起|お]きなくて は いけない。 → … [起|お]きなくて は いけません。
  "n5-essentials/nakereba#v1zekw": ["明日は六時に起きなくてはなりません。"],
  // [今日|きょう] は [早|はや]く [帰|かえ]らなければ いけない。 → … [帰|かえ]らなければ いけません。
  "n5-essentials/nakereba#iknqpm": ["今日は早く帰らなければなりません。"],
  // [明日|あした] テスト だ から、 [勉強|べんきょう] しなくちゃ。 → … です から、 [勉強|べんきょう] しない と いけません。
  "n5-essentials/nakereba#ezxelw": ["明日テストですから、勉強しなければいけません。", "明日テストですから、勉強しなくてはいけません。", "明日テストですから、勉強しなければなりません。"],
  // そろそろ [寝|ね]ない と。 → そろそろ [寝|ね]ない と いけません。
  "n5-essentials/nakereba#rsrkb1": ["そろそろ寝なければいけません。"],
  // [今日|きょう] は [銀行|ぎんこう] に [行|い]かなくて は いけない。 → … [行|い]かなくて は いけません。
  "n5-essentials/nakereba#xcv4kq": ["今日は銀行に行かなくてはなりません。"],
  // [毎晩|まいばん] [犬|いぬ] の [散歩|さんぽ] を しなくて は いけない。 → … しなくて は いけません。
  "n5-essentials/nakereba#6xpx2s": ["毎晩犬の散歩をしなくてはなりません。"],
  // もう [遅|おそ]い から、 [帰|かえ]らない と。 → もう [遅|おそ]い です から、 [帰|かえ]らない と いけません。
  "n5-essentials/nakereba#12ezwaq": ["もう遅いですから、帰らなければいけません。", "もう遅いですから、帰らなくてはいけません。", "もう遅いですから、帰らなければなりません。"],
  // もう [少|すこ]し [野菜|やさい] を [食|た]べない と いけない よ。 → … [食|た]べない と いけません よ。
  "n5-essentials/nakereba#123srnu": ["もう少し野菜を食べなければいけませんよ。", "もう少し野菜を食べなくてはいけませんよ。"],
  // [靴|くつ]、 [脱|ぬ]がなくて も いい？ → [靴|くつ] を [脱|ぬ]がなくて も いい です か？
  "n5-essentials/nakute-mo-ii#1wc5prk": ["靴、脱がなくてもいいですか？"],
  // テスト の [後|あと] で、 [何|なに] する？ → テスト の [後|あと] で、 [何|なに] を します か？
  "n5-essentials/mae-ato#1sut6q7": ["テストの後で、何しますか？"],
  // [暇|ひま] な とき、 [何|なに] する？ → [暇|ひま] な とき、 [何|なに] を します か？
  "n5-essentials/toki#7cud57": ["暇なとき、何しますか？"],
  // [兄|あに] は [歌|うた]う の が [上手|じょうず] だ よ。 → … [上手|じょうず] です。
  "n5-essentials/no-nominaliser#znnrvi": ["兄は歌うのが上手ですよ。"],
  // [朝|あさ] [早|はや]く [起|お]きる の は [大変|たいへん] だ よ。 → … [大変|たいへん] です。
  "n5-essentials/no-nominaliser#8p9uq0": ["朝早く起きるのは大変ですよ。"],
  // [肉|にく] と [魚|さかな]、 どっち が [好|す]き？ → [肉|にく] と [魚|さかな] と、 どちら が [好|す]き です か？
  "n5-essentials/comparing#1n3bvws": ["肉と魚、どちらが好きですか？", "肉と魚と、どっちが好きですか？"],
  // [山|やま] と [海|うみ]、 どっち が [好|す]き？ → [山|やま] と [海|うみ] と、 どちら が [好|す]き です か？
  "n5-essentials/comparing#bnz9j2": ["山と海、どちらが好きですか？", "山と海と、どっちが好きですか？"],
  // この [水|みず]、 [飲|の]まない ほう が いい よ。 → この [水|みず] は [飲|の]まない ほう が いい です よ。
  "n5-essentials/hou-ga-ii#182az6z": ["この水、飲まないほうがいいですよ。"],
  // この [漢字|かんじ] の [読|よ]み[方|かた]、 [教|おし]えて。 → … [読|よ]み[方|かた] を [教|おし]えて ください。
  "n5-essentials/kata#ikuznv": ["この漢字の読み方、教えてください。"],
  // この カメラ の [使|つか]い[方|かた]、 [簡単|かんたん] だ よ。 → … [使|つか]い[方|かた] は [簡単|かんたん] です よ。
  "n5-essentials/kata#fwe68g": ["このカメラの使い方、簡単ですよ。"],
  // 納豆、食べたことある？ → 納豆を食べたことがありますか？
  "n5-essentials/ta-koto-ga-aru#1afcm71": ["納豆、食べたことがありますか？", "納豆は食べたことがありますか？"],
  // この映画、何度も見たことがあるよ。 → この映画は … ありますよ。
  "n5-essentials/ta-koto-ga-aru#pb02a": ["この映画、何度も見たことがありますよ。"],
  // もう昼ご飯、食べた？ → もう昼ご飯を食べましたか？
  "n5-essentials/mou-mada#yvehzv": ["もう昼ご飯、食べましたか？"],
  // おなかいっぱい。もう食べられない。 → おなかがいっぱいです。…
  "n5-essentials/mou-mada#1a8wcuk": ["おなかいっぱいです。もう食べられません。"],
  // 雨、まだ降ってる？ → 雨はまだ降っていますか？
  "n5-essentials/mou-mada#10jtrkc": ["雨、まだ降っていますか？"],
  // その映画、まだ見ていない。 → その映画はまだ見ていません。
  "n5-essentials/mou-mada#1mwsqx6": ["その映画、まだ見ていません。"],
  // この問題、簡単すぎるね。 → この問題は簡単すぎますね。
  "n5-essentials/sugiru#da0mwj": ["この問題、簡単すぎますね。"],
  // この町、何人ぐらい住んでるの？ → この町には … 住んでいますか？
  "n5-essentials/gurai-goro#1mlyu75": ["この町、何人ぐらい住んでいますか？"],
  // どれくらい日本にいるの？ → どれくらい日本にいるんですか？
  "n5-essentials/gurai-goro#1chpbj": ["どれくらい日本にいますか？"],
  // 日曜日なのに、会社に行かなきゃ。 → … 行かなければなりません。
  "n4-conditions/noni#iclkij": ["日曜日なのに、会社に行かなければいけません。", "日曜日なのに、会社に行かなくてはいけません。", "日曜日なのに、会社に行かないといけません。", "日曜日なのに、会社に行かなくてはなりません。"],
  // あの、駅に行きたいんだけど… → すみません、… んですけど…
  "n4-conditions/kedo#1leoncm": ["あの、駅に行きたいんですけど…"],
  // 雨が降っても、自転車で行くよ。 → … 行きます。 (and the other n4-conditions lines whose よ or ね can stay)
  "n4-conditions/temo#bil48j": ["雨が降っても、自転車で行きますよ。"],
  "n4-conditions/temo#msiern": ["日曜日でも、この店は開いていますよ。"],
  "n4-conditions/shi#1l0ua5p": ["この町は静かですし、人も優しいですよ。"],
  "n4-conditions/to-natural#1xurpql": ["お金を入れると、切符が出ますよ。"],
  "n4-conditions/to-natural#173b99": ["駅を出ると、前に公園がありますよ。"],
  "n4-conditions/noni#17bbu6i": ["この店は安いのに、おいしいですね。"],
  "n4-conditions/temo#1874ocf": ["誰が来ても、ドアを開けないでくださいね。"],
  "n4-conditions/conditionals-compared#bsxfjt": ["田中さんが来たら、呼んでくださいね。"],
  // この料理は高いけど、おいしい。 → … 高いですが、… (the lesson teaches が after です as the polite “but”)
  "n4-conditions/kedo#1v7yv7z": ["この料理は高いですが、おいしいです。"],
  "n4-conditions/kedo#16vje7h": ["行きたいですが、時間がありません。"],
  // 兄は背も高いし、頭もいい。 → … 高いですし、… (the clause before し needn't be polite)
  "n4-conditions/shi#1kqj66": ["兄は背も高いし、頭もいいです。"],
  // n4-plans: the lessons say 〜ちゃいました is heard in friendly polite talk; the full form is the line.
  "n4-plans/te-shimau#lx9lfu": ["宿題はもう全部やっちゃいました。"],
  "n4-plans/te-shimau#fn3fm3": ["この本、一日で読んじゃいました。"],
  "n4-plans/te-shimau#xjz81n": ["電車に傘を忘れちゃいました。"],
  "n4-plans/te-shimau#26r4r1": ["財布を落としちゃいました。"],
  "n4-plans/te-shimau#e8mf3v": ["ケーキを全部食べちゃいました。"],
  "n4-plans/te-aru#uqh71z": ["ホテルはもう予約してありますよ。"],
  "n4-plans/te-shimau#i1z36g": ["週末に映画を三本見ちゃいました。"],
  "n4-plans/te-shimau#5iiz5f": ["会議に遅れちゃって、すみません。"],
  // n4-plans lines whose よ or ね can stay, and a から clause that needn't be polite
  "n4-plans/noni-purpose#4jdwne": ["この辞書は漢字を調べるのに便利ですよ。"],
  "n4-plans/koto-ga-dekiru#7f5d42": ["私は漢字を百ぐらい書くことができますよ。"],
  "n4-plans/te-oku#1405syo": ["授業の前に、このページを読んでおいてくださいね。"],
  "n4-plans/you-ni-suru-naru#1p8g0qe": ["遅れないようにしてくださいね。"],
  "n4-plans/te-oku#ouuldh": ["使ったお皿は、後で洗うから、そこに置いておいてください。"],
  // n4-plans, te-miru to hajimeru. Into casual: bare plain endings, ている → てる, ていく → てく.
  "n4-plans/te-iku-kuru#1nncblp": ["ピクニックにはお弁当を持ってく。"],
  "n4-plans/te-iku-kuru#15btd1j": ["友達の家には花を持ってく。"],
  "n4-plans/te-iku-kuru#1icl0o1": ["飲み物を買ってくる。"],
  "n4-plans/te-iku-kuru#bq2ghx": ["ちょっと郵便局に行ってくる。", "ちょっと郵便局に行ってくるよ。"],
  "n4-plans/te-iku-kuru#1thp0jk": ["夕方には帰ってくる。"],
  "n4-plans/tokoro#1i7t9wd": ["これから晩ご飯を作るところ。", "これから晩ご飯を作るところだ。"],
  "n4-plans/tokoro#11i68n9": ["ちょうど今、家を出るところ。", "ちょうど今、家を出るところだ。"],
  "n4-plans/tokoro#1u90d73": ["もう寝るところだったけど、大丈夫。"],
  "n4-plans/tokoro#14ub69s": ["今、宿題をしているところ。", "今、宿題をしてるところだ。", "今、宿題をしてるところだよ。", "今、宿題をしているところだ。", "今、宿題をしているところだよ。"],
  "n4-plans/tokoro#14k9teh": ["今、調べてるところだから、ちょっと待って。"],
  "n4-plans/tokoro#1awh64m": ["駅に向かっているところ。", "駅に向かってるところだ。", "駅に向かってるところだよ。", "駅に向かっているところだ。", "駅に向かっているところだよ。"],
  "n4-plans/tokoro#pjkl7a": ["今、家に着いたところ。", "今、家に着いたところだ。"],
  "n4-plans/tokoro#11cpbu1": ["ちょうど昼ご飯を食べたところだから、今は大丈夫だよ。"],
  "n4-plans/tokoro#ebfqku": ["今、仕事が終わったところ。", "今、仕事が終わったところだ。"],
  "n4-plans/ta-bakari#1gly4as": ["先月日本に来たばかり。", "先月日本に来たばかりだ。", "先月日本に来たばかりだよ。"],
  "n4-plans/ta-bakari#2lueg5": ["このパソコン、買ったばかりなのに、もう壊れちゃった。"],
  "n4-plans/nagara#1juz6hh": ["テレビを見ながら食べないでね。"],
  "n4-plans/made-ni-aida#eyi19m": ["金曜日までにレポートを出して。"],
  "n4-plans/made-ni-aida#1r7akcq": ["七時までに帰る。"],
  "n4-plans/made-ni-aida#1o1dbsv": ["私が料理を作ってる間、子供たちはテレビを見てた。", "私が料理を作っている間、子供たちはテレビを見てた。", "私が料理を作ってる間、子供たちはテレビを見ていた。"],
  "n4-plans/made-ni-aida#723qzz": ["電車に乗ってる間、ずっと寝てた。", "電車に乗っている間、ずっと寝てた。", "電車に乗ってる間、ずっと寝ていた。"],
  "n4-plans/made-ni-aida#dv7u11": ["待っている間、この雑誌を読んでいてね。", "待ってる間、この雑誌を読んでいて。", "待ってる間、この雑誌を読んでて。", "待っている間、この雑誌を読んでて。", "待ってる間、この雑誌を読んでてね。"],
  "n4-plans/made-ni-aida#3q5ae": ["休みの間に、髪を切ってくる。", "休みの間に、髪を切ってくるよ。"],
  "n4-plans/made-ni-aida#1iw278": ["弟がいない間に、弟のケーキを食べてしまった。"],
  "n4-plans/naide-zuni#12p517s": ["傘を持たないで出かけちゃった。"],
  "n4-plans/naide-zuni#1px7v83": ["辞書を使わないで読んでみてね。"],
  "n4-plans/te-miru#156k86e": ["分からない言葉は、辞書で調べてみてね。"],
  "n4-plans/hajimeru#o77ath": ["彼は十年同じ会社で働き続けてる。"],
  "n4-plans/hajimeru#1k2l48g": ["分からなくても、聞き続けてね。"],
  "n4-plans/hajimeru#42kj6i": ["みんなが食べ終わるまで、待って。"],
  // Into polite: ですよ kept, なんです for なんだ, ちゃいました, ている contracted.
  "n4-plans/te-iku-kuru#g1pr16": ["ちょっと郵便局に行ってきますね。"],
  "n4-plans/te-iku-kuru#1du191o": ["夕方には帰ってきますよ。"],
  "n4-plans/tokoro#18207on": ["これから晩ご飯を作るところですよ。"],
  "n4-plans/tokoro#13cutbz": ["ちょうど今、家を出るところですよ。"],
  "n4-plans/tokoro#cisz4y": ["今、家に着いたところですよ。"],
  "n4-plans/tokoro#16r4dyi": ["今、仕事が終わったところですよ。"],
  "n4-plans/tokoro#9hownc": ["今、宿題をしてるところです。"],
  "n4-plans/tokoro#z5fdmn": ["今、調べてるところですから、ちょっと待ってください。"],
  "n4-plans/tokoro#30xfli": ["駅に向かってるところです。"],
  "n4-plans/ta-bakari#3aq4t9": ["先月日本に来たばかりなんです。"],
  "n4-plans/ta-bakari#1fx5mcn": ["このパソコン、買ったばかりなのに、もう壊れちゃいました。"],
  "n4-plans/made-ni-aida#1uq14zg": ["七時までに帰りますよ。"],
  "n4-plans/made-ni-aida#1vlnxfo": ["私が料理を作ってる間、子供たちはテレビを見てました。", "私が料理を作っている間、子供たちはテレビを見てました。", "私が料理を作ってる間、子供たちはテレビを見ていました。"],
  "n4-plans/made-ni-aida#tfuwvo": ["電車に乗ってる間、ずっと寝てました。", "電車に乗っている間、ずっと寝てました。", "電車に乗ってる間、ずっと寝ていました。"],
  "n4-plans/made-ni-aida#w2awgh": ["待っている間、この雑誌を読んでてください。", "待ってる間、この雑誌を読んでいてください。", "待ってる間、この雑誌を読んでてください。"],
  "n4-plans/made-ni-aida#1yw9cdv": ["休みの間に、髪を切ってきますね。"],
  "n4-plans/made-ni-aida#1v1ck2f": ["弟がいない間に、弟のケーキを食べちゃいました。"],
  "n4-plans/naide-zuni#1le7c2y": ["傘を持たないで出かけちゃいました。"],
  "n4-plans/hajimeru#xzyp99": ["彼は十年同じ会社で働き続けてます。"],
  // n4-giving-voice, into casual: を kept or dropped in questions, the long causative passive.
  "n4-giving-voice/ageru-kureru-morau#19ovck6": ["猫にご飯をあげた？"],
  "n4-giving-voice/ageru-kureru-morau#1jnwqb2": ["誰がこのお菓子くれたの？"],
  "n4-giving-voice/ageru-kureru-morau#lb63l0": ["誕生日に何をもらった？"],
  "n4-giving-voice/requests#tciy9x": ["その塩を取ってくれる？", "その塩取ってくれる？"],
  "n4-giving-voice/requests#1i32fba": ["ちょっと手伝ってくれる？"],
  "n4-giving-voice/requests#1wbwg9k": ["帰りに牛乳を買ってきてもらえない？", "帰りに牛乳買ってきてもらえる？"],
  "n4-giving-voice/requests#d0c6k0": ["駅に着いたら、電話してもらえる？"],
  "n4-giving-voice/requests#19hxrl3": ["もう少しゆっくり話してくれる？"],
  "n4-giving-voice/te-ageru-kureru-morau#1udcgdc": ["子供に本を読んであげるのが好きだ。", "子供に本を読んであげるのが好きだよ。"],
  // The same cards with を dropped, as in speech.
  "n4-giving-voice/ageru-kureru-morau#1x8z6co": ["友達に花あげた。"],
  "n4-giving-voice/ageru-kureru-morau#gzxe8t": ["弟に古いゲームあげた。"],
  "n4-giving-voice/ageru-kureru-morau#lwm225": ["母がこの時計くれた。"],
  "n4-giving-voice/ageru-kureru-morau#ndi83k": ["父に自転車もらった。"],
  "n4-giving-voice/te-ageru-kureru-morau#1jgpyvv": ["妹に宿題教えてあげた。"],
  "n4-giving-voice/te-ageru-kureru-morau#yoax6s": ["母が毎朝お弁当作ってくれる。"],
  "n4-giving-voice/te-ageru-kureru-morau#1sle6fr": ["友達に部屋の掃除手伝ってもらった。"],
  "n4-giving-voice/causative-passive#12ywvob": ["子供のとき、毎日牛乳を飲ませられた。"],
  "n4-giving-voice/causative-passive#1u737cw": ["先輩に重い荷物を運ばせられた。"],
  "n4-giving-voice/causative-passive#nm818j": ["駅で一時間も待たせられた。"],
  // n4-giving-voice, into polite: the casual line's word order kept, the long causative passive.
  "n4-giving-voice/ageru-kureru-morau#q5g4bo": ["猫にご飯あげましたか？"],
  "n4-giving-voice/ageru-kureru-morau#h90mz3": ["誕生日に何もらいましたか？"],
  "n4-giving-voice/ageru-kureru-morau#10ccm48": ["誰がこのお菓子をくれましたか？"],
  "n4-giving-voice/requests#k0vach": ["その塩、取ってくれますか？", "その塩を取ってくれませんか？", "その塩、取ってくれませんか？"],
  "n4-giving-voice/requests#1mklorr": ["ちょっと手伝ってくれますか？"],
  "n4-giving-voice/requests#1o5j1yl": ["帰りに牛乳を買ってきてもらえませんか？"],
  "n4-giving-voice/requests#1qep9qp": ["駅に着いたら、電話してもらえますか？"],
  "n4-giving-voice/requests#8ni4s4": ["もう少しゆっくり話してくれますか？"],
  "n4-giving-voice/sasete-kudasai#1ey8cyn": ["ごめんなさい、少し考えさせてください。"],
  "n4-giving-voice/causative-passive#1xxlxds": ["子供のとき、毎日牛乳を飲ませられました。"],
  "n4-giving-voice/causative-passive#12qwk33": ["先輩に重い荷物を運ばせられました。"],
  "n4-giving-voice/causative-passive#10bjkk8": ["駅で一時間も待たせられました。"],
  // Purpose, cause and reasons (unit 十四)
  // [日本|にほん] の [大学|だいがく] に [入|はい]る ため に、 … [勉強|べんきょう] して います。 → … してる。 (している, not contracted)
  "n3-reasons/tame-ni#1sx903q": ["日本の大学に入るために、毎日勉強している。"],
  // [新|あたら]しい [車|くるま] を [買|か]う ため に、 [貯金|ちょきん] して います。 → … してる。
  "n3-reasons/tame-ni#ve7dfm": ["新しい車を買うために、貯金している。"],
  // [田中|たなか]-さん に [電話|でんわ] を くれる よう に [伝|つた]えて ください。 → … [電話|でんわ] くれる … [伝|つた]えて。 (casual keeps or drops を)
  "n3-reasons/you-ni-iu#3663ls": ["田中さんに電話をくれるように伝えて。"],
  // Into polite: [田中|たなか]-さん に [電話|でんわ] くれる よう に [伝|つた]えて。 → … [電話|でんわ] を くれる … [伝|つた]えて ください。
  "n3-reasons/you-ni-iu#127z5ak": ["田中さんに電話くれるように伝えてください。"],
  // [彼|かれ] は [十年|じゅうねん] も … [住|す]んで いた ん です か？ … → … [住|す]んで いた の？ … (住んでた)
  "n3-reasons/wake-da#17g8yln": ["彼は十年も日本に住んでたの？日本語が上手なわけだね。"],
  // Time and change (unit 十五)
  // [覚|おぼ]えて いる うち に、 メモ して おきます。 → … おこう。 (or the plain おく)
  "n3-time/uchi-ni#6l7x5t": ["覚えているうちに、メモしておく。"],
  // Into polite: … メモ して おこう。 → … おきます。 (or the polite volitional)
  "n3-time/uchi-ni#1qlwwn6": ["覚えているうちに、メモしておきましょう。"],
  // [忘|わす]れない うち に、 [今|いま] [払|はら]って おきます。 → … おく ね。 (ね is optional)
  "n3-time/uchi-ni#qu2j7u": ["忘れないうちに、今払っておく。"],
  // Into polite: … [払|はら]って おく ね。 → … おきます。 (ね kept)
  "n3-time/uchi-ni#2ydvfm": ["忘れないうちに、今払っておきますね。"],
  // ベッド に [入|はい]った とたん、 [寝|ね]て しまいました。 → … しまった。 (ちゃった in speech)
  "n3-time/ta-totan#1f7a1zx": ["ベッドに入ったとたん、寝ちゃった。"],
  // [会議|かいぎ] の [最中|さいちゅう] に、 [電話|でんわ] が [鳴|な]って しまいました。 → … しまった。 (ちゃった)
  "n3-time/saichuu-ni#a5hx7d": ["会議の最中に、電話が鳴っちゃった。"],
  // [今|いま]、 [会議|かいぎ] の [準備|じゅんび] の [最中|さいちゅう] です。 → … なん だ。 (or だ, だ よ, or bare)
  "n3-time/saichuu-ni#1nosg6r": ["今、会議の準備の最中だ。", "今、会議の準備の最中だよ。", "今、会議の準備の最中。"],
  // Into polite: … [最中|さいちゅう] なん だ。 → … [最中|さいちゅう] です。 (or なんです)
  "n3-time/saichuu-ni#mqrkrm": ["今、会議の準備の最中なんです。"],
  // [旅行|りょこう] の たび に、 … [撮|と]って しまいます。 → … しまう。 (ちゃう)
  "n3-time/tabi-ni#119gypq": ["旅行のたびに、写真を何百枚も撮っちゃう。"],
  // この バス は [十五分|じゅうごふん]ごと に [来|き]ます。 → … [来|く]る よ。 (よ is optional)
  "n3-time/goto-oki-ni#xxlnrg": ["このバスは十五分ごとに来る。"],
  // Into polite: … [来|く]る よ。 → … [来|き]ます。 (よ kept)
  "n3-time/goto-oki-ni#nqtyak": ["このバスは十五分ごとに来ますよ。"],
  // [席|せき] は [一|ひと]つおき に [座|すわ]って ください。 → … [座|すわ]って ね。 (ね is optional)
  "n3-time/goto-oki-ni#z4gvkz": ["席は一つおきに座って。"],
  // よく [考|かんが]えた [上|うえ] で、 [決|き]めます。 → … [決|き]める よ。 (よ is optional)
  "n3-time/ue-de#1oifbdr": ["よく考えた上で、決める。"],
  // [家族|かぞく] と [相談|そうだん] の [上|うえ] で、 [返事|へんじ] します。 → … [返事|へんじ] する ね。 (ね is optional)
  "n3-time/ue-de#11wfqbt": ["家族と相談の上で、返事する。"],
  // Into polite: … [返事|へんじ] する ね。 → … [返事|へんじ] します。 (ね may stay)
  "n3-time/ue-de#1jmjgwi": ["家族と相談の上で、返事しますね。"],
  // [部屋|へや] を [探|さが]す [上|うえ] で、 … [大事|だいじ] です。 → … [大事|だいじ] だ よ。 (よ is optional)
  "n3-time/ue-de#1ansziw": ["部屋を探す上で、駅に近いかどうかは大事だ。"],
  // Into polite: … [大事|だいじ] だ よ。 → … [大事|だいじ] です。 (よ kept)
  "n3-time/ue-de#fpcmbg": ["部屋を探す上で、駅に近いかどうかは大事ですよ。"],
};
