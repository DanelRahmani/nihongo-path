import type { Word } from "@/content/types";
import { x } from "@/content/words/expansion/make";

/** Expansion batch 01: candidates 1–250. Meanings are ours; forms from JMdict (© EDRDG, CC BY-SA 4.0). */
export const BATCH_01: Word[] = [
  // skipped: 1437260 [的|てき] (formal ending '-ish, -like' (suffix))
  x("1322990", "[者|もの]", "noun", "person (formal; humble of yourself)", "people"),
  // skipped: 1168660 よる (artefact: よる also spells 'night'; the verb is mostly grammar (によって))
  x("1318610", "[自分|じぶん]", "pronoun", "oneself, myself, yourself", "people"),
  // skipped: 2017560 たい (grammar ending (want to), taught in the verb lessons)
  x("1576870", "[俺|おれ]", "pronoun", "I, me (men, casual)", "people"),
  // moved to the lessons (n4-plans/nagara): 1221520 [気|き]
  // moved to the lessons (n4-plans/hajimeru): 1600900 [話|はなし]
  // moved to the lessons (n5-essentials/temo-ii): 1305990 [使|つか]う
  // moved to the lessons (n4-giving-voice/kenjougo): 1577985 おる
  x("1012050", "まあ", "adverb", "well, I suppose; more or less", "language"),
  // skipped: 1375260 [性|せい] (suffix (-ness, nature))
  x("1445640", "やつ", "noun", "guy, fellow; thing (casual; rude about people)", "people"),
  // moved to the lessons (n4-plans/noni-purpose): 1487660 [必要|ひつよう]
  x("1202150", "みな", "noun", "everyone, all (a little formal)", "people"),
  // moved to the lessons (n4-seeming/hazu): 1007130 そんな
  x("1258810", "[県|けん]", "noun", "prefecture", "places"),
  x("1004880", "こんな", "pre-noun", "this kind of, like this", "language"),
  // moved to the lessons (n4-plans/hajimeru): 1451750 [同|おな]じ
  // moved to the lessons (n5-essentials/sugiru): 1536010 [問題|もんだい]
  // skipped: 1251000 [系|けい] (suffix (system, group))
  // moved to the lessons (n5-essentials/mae-ato): 1327190 [手|て]
  x("1006730", "そして", "conjunction", "and, and then", "language"),
  x("1356370", "[情報|じょうほう]", "noun", "information", "school-work"),
  // moved to the lessons (n5-essentials/tsumori): 1592250 [国|くに]
  x("1215810", "[関係|かんけい]", "noun", "relationship, connection (する: to be involved)", "people"),
  x("1198170", "[会|かい]", "noun", "meeting, party; society", "school-work"),
  x("1212260", "[感|かん]じる", "verb", "to feel, to sense", "feelings", "ichidan"),
  x("1505990", "しかし", "conjunction", "however, but", "language"),
  // skipped: 1611580 [本当|ほんとう]に (the lesson word 本当 already covers 本当に)
  x("1191060", "[可能|かのう]", "na-adj", "possible", "everyday"),
  x("1355810", "[場合|ばあい]", "noun", "case, occasion, situation", "everyday"),
  x("1538900", "ただ", "noun", "free (of charge); ordinary", "shopping"),
  x("1419990", "[男|おとこ]", "noun", "man, male (blunt when said of a person)", "people"),
  // moved to the lessons (n4-plans/tokoro): 1343100 [所|ところ]
  // moved to the lessons (n4-giving-voice/ageru-kureru-morau): 1535910 もらう
  x("1009500", "なんか", "adverb", "things like, such as; something like (casual)", "language"),
  x("1344930", "[女|おんな]", "noun", "woman, female (blunt when said of a person)", "people"),
  x("1366770", "[人間|にんげん]", "noun", "human being, person", "people"),
  x("1531330", "[名|な]", "noun", "name (formal, written)", "people"),
  // moved to the lessons (n5-essentials/sugiru): 1316380 [次|つぎ]
  x("1595730", "すべて", "noun", "everything, all", "everyday"),
  x("1345250", "[女性|じょせい]", "noun", "woman, female (polite)", "people"),
  x("1579080", "ころ", "noun", "(around) the time when; about (a time)", "time"),
  x("1260670", "[元|もと]", "noun", "origin, source; former", "everyday"),
  x("1605810", "[世|よ]", "noun", "world, society; lifetime", "everyday"),
  // moved to the lessons (n4-plans/te-aru): 1207610 かける
  // moved to the lessons (n5-essentials/temo-ii): 1409110 だめ
  // moved to the lessons (n4-giving-voice/ageru-kureru-morau): 1577200 かわいい
  // moved to the lessons (n4-conditions/advice): 1012620 もっと
  x("1254690", "[結果|けっか]", "noun", "result, consequence; as a result", "school-work"),
  x("1306200", "[使用|しよう]", "noun", "use (する: to use)", "everyday"),
  x("1378450", "[生|なま]", "noun", "raw; live (performance); draft (beer)", "food"),
  // moved to the lessons (n5-essentials/hou-ga-ii): 1217730 [顔|かお]
  // moved to the lessons (n5-essentials/toki): 1502390 [物|もの]
  // skipped: 1955970 [感|かん] (suffix (feeling of, sense of))
  // moved to the lessons (n4-plans/you-ni): 1380440 [声|こえ]
  // moved to the lessons (n4-plans/you-ni-suru-naru): 1293780 [最近|さいきん]
  x("1546200", "[用|よう]", "noun", "business, errand, task", "everyday"),
  x("2036870", "お[願|ねが]い", "noun", "request, favour; wish (する: to ask)", "everyday"),
  x("2643970", "だって", "conjunction", "but, because (casual); even", "language"),
  x("1316300", "[時代|じだい]", "noun", "period, era, the times", "time"),
  x("1002290", "お[前|まえ]", "pronoun", "you (rough, to equals or juniors)", "people"),
  x("1310680", "やめる", "verb", "to stop, to quit", "everyday", "ichidan"),
  // skipped: 1633260 [高|たか] (rare reading (amount); small sense for a learner)
  x("1188370", "なんて", "adverb", "what a ...!; such a thing as; what?", "language"),
  x("1203260", "[他|ほか]", "noun", "other, another; besides", "everyday"),
  x("1055810", "サイト", "noun", "website, site", "hobbies"),
  x("1364440", "[神|かみ]", "noun", "god, deity", "everyday"),
  x("1481480", "[版|はん]", "noun", "edition, version, printing", "school-work"),
  x("1531040", "[無料|むりょう]", "noun", "free of charge", "shopping"),
  // skipped: 1949190 [他|た] (formal reading 'other'; the lessons use ほか)
  // moved to the lessons (n5-essentials/sugiru): 1409140 [体|からだ]
  // moved to the lessons (n4-plans/hajimeru): 1405800 [続|つづ]ける
  // moved to the lessons (n4-plans/you-ni): 1259140 [見|み]える
  x("1293810", "[最後|さいご]", "noun", "the end, the last, final", "time"),
  x("1355850", "[場所|ばしょ]", "noun", "place, location", "places"),
  x("1499290", "[部|ぶ]", "noun", "department, section; club", "school-work"),
  x("1509430", "[別|べつ]", "noun", "different, separate, other", "everyday"),
  // moved to the lessons (n4-giving-voice/requests): 1587290 いただく
  // moved to the lessons (n5-essentials/kata): 1264540 [言葉|ことば]
  // moved to the lessons (n4-plans/you-ni): 1495770 つける
  x("1510790", "[変|か]わる", "verb", "to change, to become different", "everyday", "godan"),
  // moved to the lessons (n4-conditions/temo): 1593670 [探|さが]す
  // skipped: 1567610 もむ (rare verb (to rub, massage))
  x("1589060", "[行|おこな]う", "verb", "to do, to carry out, to hold (an event)", "everyday", "godan"),
  // moved to the lessons (n4-plans/te-shimau): 1326980 [取|と]る
  x("1441390", "[点|てん]", "noun", "point, dot; score", "school-work"),
  x("1310460", "うまい", "i-adj", "good at; delicious (casual)", "food"),
  x("1322700", "[社会|しゃかい]", "noun", "society, community; the world of work", "school-work"),
  // skipped: 1308080 [市|いち] (rare reading (market, fair); the common word is し)
  x("1308090", "[市|し]", "noun", "city", "places"),
  x("1401000", "[相手|あいて]", "noun", "the other person, partner", "people"),
  x("1517090", "[方法|ほうほう]", "noun", "method, way", "everyday"),
  x("1550140", "[理由|りゆう]", "noun", "reason", "everyday"),
  x("1279310", "さらに", "adverb", "furthermore, even more, again", "language"),
  // skipped: 1587140 [戦|いくさ] (old word (war, battle))
  // skipped: 1250090 [型|かた] (mostly a suffix)
  x("1297910", "[作品|さくひん]", "noun", "work (book, film, art)", "hobbies"),
  x("1451290", "[動画|どうが]", "noun", "video, video clip", "hobbies"),
  x("1218190", "[企業|きぎょう]", "noun", "company, business, enterprise", "school-work"),
  x("1239700", "[曲|きょく]", "noun", "piece of music, tune, song", "hobbies"),
  x("1263650", "[現在|げんざい]", "noun", "the present, now, as of now", "time"),
  x("1406150", "[存在|そんざい]", "noun", "existence, presence (する: to exist)", "everyday"),
  x("1526920", "[漫画|まんが]", "noun", "manga, comic", "hobbies"),
  x("1530970", "[無理|むり]", "na-adj", "impossible, unreasonable; overdoing it", "everyday"),
  x("1549660", "[利用|りよう]", "noun", "use, utilisation (する: to use)", "everyday"),
  // moved to the lessons (n4-plans/made-ni-aida): 1338180 [出|だ]す
  x("1577120", "なぜ", "adverb", "why", "language"),
  x("1587850", "いろいろ", "na-adj", "various, all sorts of", "everyday"),
  // moved to the lessons (n5-essentials/naide-kudasai): 1519210 [忘|わす]れる
  x("1313830", "[事件|じけん]", "noun", "incident, case, event", "everyday"),
  x("1497190", "[普通|ふつう]", "noun", "normal, ordinary, regular", "everyday"),
  x("2022640", "[番|ばん]", "noun", "number; turn", "numbers"),
  x("1197390", "[画像|がぞう]", "noun", "image, picture", "hobbies"),
  x("1293850", "[最高|さいこう]", "noun", "best, the greatest; highest", "feelings"),
  x("1345140", "[女子|じょし]", "noun", "girl, woman (school use)", "people"),
  x("1356730", "[状態|じょうたい]", "noun", "state, condition", "everyday"),
  x("1386840", "[絶対|ぜったい]", "adverb", "absolutely, definitely; absolute", "everyday"),
  x("1477810", "[発売|はつばい]", "noun", "sale, release (する: to put on sale)", "shopping"),
  x("1538100", "[約|やく]", "adverb", "about, approximately", "numbers"),
  x("1591430", "[気持|きも]ち", "noun", "feeling, mood", "feelings"),
  // skipped: 2861111 なす (formal verb (to do, to commit))
  x("1202710", "[開催|かいさい]", "noun", "holding (an event) (する: to hold)", "everyday"),
  x("1205900", "[確認|かくにん]", "noun", "confirmation (する: to check)", "everyday"),
  x("1321110", "[実際|じっさい]", "noun", "reality, actual state; in fact", "everyday"),
  // moved to the lessons (n4-seeming/to-iu): 1005180 さっき
  x("1289070", "[今回|こんかい]", "noun", "this time, now", "time"),
  // moved to the lessons (n5-essentials/nakute-mo-ii): 1396130 [全部|ぜんぶ]
  // moved to the lessons (n4-plans/made-ni-aida): 1006380 ずっと
  // skipped: 1444150 つく (artefact: つく is many verbs (breathe, lie, stick); no single sense)
  x("1264770", "[個人|こじん]", "noun", "individual, private person; personal", "people"),
  x("1517150", "[法|ほう]", "noun", "law; method", "school-work"),
  // skipped: 2037700 [機|き] (rare as a bare word (chance, machine); mostly a suffix)
  // moved to the lessons (n5-essentials/nakereba): 1404975 [早|はや]い
  x("1329590", "[受|う]ける", "verb", "to receive; to take (a test); to catch", "school-work", "ichidan"),
  // skipped: 1399970 かく (artefact: かく is mostly 書く, 描く or 掻く; the kana form is ambiguous)
  x("1342550", "[初|はじ]めて", "adverb", "for the first time", "time"),
  x("1355790", "[場|ば]", "noun", "place, spot; scene", "places"),
  // moved to the lessons (n4-giving-voice/kenjougo): 1357600 [色|いろ]
  // moved to the lessons (n4-seeming/to-iu): 1378860 [生活|せいかつ]
  // moved to the lessons (n4-plans/te-iku-kuru): 1535780 もちろん
  x("1244080", "[区|く]", "noun", "ward (of a city), district", "places"),
  x("1590560", "かなり", "adverb", "quite, fairly, considerably", "everyday"),
  x("1009330", "どんな", "pre-noun", "what kind of", "language"),
  x("1273370", "[公開|こうかい]", "noun", "release, opening to the public (する: to release)", "everyday"),
  // skipped: 1342530 [初|はつ] (prefix (first, new))
  x("1549910", "[理解|りかい]", "noun", "understanding (する: to understand)", "school-work"),
  x("1344970", "[女|おんな]の[子|こ]", "noun", "girl", "people"),
  x("1356700", "[状況|じょうきょう]", "noun", "situation, circumstances", "everyday"),
  x("1208360", "[活動|かつどう]", "noun", "activity (する: to be active)", "everyday"),
  x("1409840", "[対応|たいおう]", "noun", "handling, response (する: to deal with)", "school-work"),
  x("1444800", "[登場|とうじょう]", "noun", "appearance, entrance (する: to appear)", "hobbies"),
  x("1459400", "[内容|ないよう]", "noun", "contents, substance", "everyday"),
  x("1481800", "[販売|はんばい]", "noun", "sales, selling (する: to sell)", "shopping"),
  x("1516750", "[放送|ほうそう]", "noun", "broadcast (する: to broadcast)", "hobbies"),
  x("1584930", "あまり", "noun", "(not) very, (not) much; remainder", "everyday"),
  // skipped: 2021030 とる (artefact: とる kana form is 取る, 撮る, 採る and more)
  x("1093020", "ネット", "noun", "the Internet, the net; network", "hobbies"),
  x("1211510", "[完全|かんぜん]", "na-adj", "perfect, complete", "everyday"),
  x("1225130", "[技術|ぎじゅつ]", "noun", "technology; technique, skill", "school-work"),
  x("1258520", "[研究|けんきゅう]", "noun", "research, study (する: to research)", "school-work"),
  // moved to the lessons (n4-giving-voice/te-ageru-kureru-morau): 1386460 [説明|せつめい]
  x("1454670", "[特|とく]に", "adverb", "especially, in particular", "everyday"),
  // moved to the lessons (n4-seeming/you-mitai): 1529410 [夢|ゆめ]
  x("1610040", "せい", "noun", "fault, blame (because of)", "everyday"),
  // moved to the lessons (n4-seeming/garu): 1593480 [怖|こわ]い
  // skipped: 1319060 [式|しき] (mostly a suffix (-style, ceremony))
  x("1394680", "そういう", "pre-noun", "that kind of, such", "language"),
  // moved to the lessons (n4-giving-voice/causative-passive): 1477840 [発表|はっぴょう]
  // moved to the lessons (n4-plans/te-iku-kuru): 1602440 [増|ふ]える
  // skipped: 1956960 [無|む] (prefix (un-, nothing))
  x("1021680", "イベント", "noun", "event", "hobbies"),
  x("1060300", "システム", "noun", "system", "school-work"),
  x("1165790", "[一般|いっぱん]", "noun", "general, ordinary, common", "everyday"),
  x("1255940", "[件|けん]", "noun", "matter, case (counter-like use for cases)", "everyday"),
  x("1279170", "[攻撃|こうげき]", "noun", "attack; criticism (する: to attack)", "everyday"),
  x("1318000", "[自身|じしん]", "noun", "oneself, one's own self", "people"),
  x("1499490", "[部分|ぶぶん]", "noun", "part, portion", "everyday"),
  x("1596930", "[確|たし]か", "na-adj", "certain, sure; if I remember right", "everyday"),
  x("1544730", "[与|あた]える", "verb", "to give, to grant (formal); to cause (damage)", "everyday", "ichidan"),
  // moved to the lessons (n4-giving-voice/causative): 1588730 [選|えら]ぶ
  x("1007720", "ちゃんと", "adverb", "properly, neatly; diligently", "everyday"),
  // moved to the lessons (n4-seeming/sou-hearsay): 1091500 ニュース
  x("1150410", "[愛|あい]", "noun", "love, affection", "feelings"),
  x("1351430", "[紹介|しょうかい]", "noun", "introduction (する: to introduce)", "people"),
  x("1390360", "[戦争|せんそう]", "noun", "war", "everyday"),
  x("1394840", "[全員|ぜんいん]", "noun", "all members, everyone", "people"),
  x("1444810", "[登録|とうろく]", "noun", "registration (する: to register)", "everyday"),
  // moved to the lessons (n4-plans/you-to-omou): 1543240 [予定|よてい]
  x("1304510", "[残|のこ]る", "verb", "to remain, to be left", "everyday", "godan"),
  // skipped: 1284220 [号|ごう] (mostly a suffix)
  x("1221130", "[機能|きのう]", "noun", "function (する: to function)", "everyday"),
  x("1252090", "[計画|けいかく]", "noun", "plan, project (する: to plan)", "school-work"),
  x("1336820", "[重要|じゅうよう]", "na-adj", "important, essential", "everyday"),
  x("1386060", "[設定|せってい]", "noun", "setting, settings (する: to set up)", "everyday"),
  x("1429120", "[調査|ちょうさ]", "noun", "survey, investigation (する: to investigate)", "school-work"),
  x("1250220", "[形|かたち]", "noun", "shape, form", "everyday"),
  x("1583460", "[描|えが]く", "verb", "to draw, to paint; to depict", "hobbies", "godan"),
  x("1240530", "[玉|たま]", "noun", "ball, sphere; bead", "everyday"),
  x("1077360", "チーム", "noun", "team", "hobbies"),
  // skipped: 1168610 [員|いん] (suffix (member))
  x("1202760", "[開始|かいし]", "noun", "start (する: to start)", "time"),
  x("1202880", "[開発|かいはつ]", "noun", "development (する: to develop)", "school-work"),
  x("1223240", "[記事|きじ]", "noun", "article, news story", "school-work"),
  x("1296300", "[際|さい]", "noun", "occasion, time (when) (formal)", "time"),
  // moved to the lessons (n4-giving-voice/sonkeigo): 1318720 [自由|じゆう]
  x("1368370", "[人生|じんせい]", "noun", "life (of a person)", "everyday"),
  // moved to the lessons (n4-seeming/rashii): 1382370 [昔|むかし]
  x("1535560", "[目的|もくてき]", "noun", "purpose, goal", "everyday"),
  x("1522050", "ほとんど", "adverb", "almost, nearly; hardly (with a negative)", "everyday"),
  // skipped: 1505080 [文|ふみ] (rare reading (letter, writing); the common reading is ぶん)
  // moved to the lessons (n4-plans/tokoro): 1402730 [送|おく]る
  x("1001200", "おい", "interjection", "hey! (rough, mostly men)", "language"),
  // skipped: 1171570 いか (artefact: counted from 以下)
  x("1173660", "[影響|えいきょう]", "noun", "influence, effect (する: to affect)", "everyday"),
  x("1264670", "[限定|げんてい]", "noun", "limit, limited (する: to limit)", "shopping"),
  x("1376070", "[政府|せいふ]", "noun", "government", "school-work"),
  x("1420160", "[男性|だんせい]", "noun", "man, male (polite)", "people"),
  // moved to the lessons (n4-plans/koto-ni-suru-naru): 1387210 [先|さき]
  x("1307770", "[子|こ]", "noun", "child; girl, boy (as in that girl)", "people"),
  // moved to the lessons (n5-essentials/ta-koto-ga-aru): 1355120 [乗|の]る
  x("1012810", "やっぱり", "adverb", "as expected, after all (casual)", "language"),
  x("1214200", "[管理|かんり]", "noun", "management (する: to manage)", "school-work"),
  x("1220550", "[期間|きかん]", "noun", "period, term", "time"),
  x("1307710", "[姿|すがた]", "noun", "figure, appearance, form", "body"),
  x("1420800", "[地域|ちいき]", "noun", "area, region", "places"),
  x("1426530", "[注意|ちゅうい]", "noun", "attention, care (する: to be careful; to warn)", "everyday"),
  // skipped: 1551200 [率|りつ] (suffix (rate))
  x("1591330", "[気|き]づく", "verb", "to notice, to realise", "feelings", "godan"),
  x("1229350", "[求|もと]める", "verb", "to seek, to request, to want", "everyday", "ichidan"),
  x("1445270", "[土|つち]", "noun", "earth, soil, ground", "nature"),
  x("1138270", "ライブ", "noun", "live show, concert", "hobbies"),
  // moved to the lessons (n5-essentials/deshou): 1007310 だから
  // skipped: 1035470 オメガ (rare (Greek letter))
  // moved to the lessons (n4-plans/koto-ga-dekiru): 1036400 カード
  x("1298800", "[撮影|さつえい]", "noun", "filming, shooting (する: to film)", "hobbies"),
  // skipped: 1320300 [室|しつ] (mostly a suffix (-room))
  x("1451210", "[動|うご]く", "verb", "to move; to work, to run (a machine)", "everyday", "godan"),
  x("1314600", "[似|に]る", "verb", "to resemble, to look like", "everyday", "ichidan"),
  x("1153930", "[安全|あんぜん]", "noun", "safety; safe", "everyday"),
  x("1223340", "[記念|きねん]", "noun", "commemoration, memento (する: to commemorate)", "everyday"),
  x("1254380", "[決定|けってい]", "noun", "decision (する: to decide)", "everyday"),
  x("1559900", "[連絡|れんらく]", "noun", "contact (する: to contact)", "everyday"),
  x("1629200", "[王|おう]", "noun", "king", "people"),
  // moved to the lessons (n4-plans/you-to-omou): 1307500 [始|はじ]まる
  // moved to the lessons (n5-essentials/no-nominaliser): 1202270 [絵|え]
  x("1320810", "[実|み]", "noun", "fruit; nut", "nature"),
  x("1062910", "シリーズ", "noun", "series", "hobbies"),
  // moved to the lessons (n5-essentials/no-nominaliser): 1183720 [音楽|おんがく]
];
