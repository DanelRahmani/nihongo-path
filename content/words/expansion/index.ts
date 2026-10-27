import type { Word } from "@/content/types";
import { BATCH_01 } from "@/content/words/expansion/batch-01";
import { BATCH_02 } from "@/content/words/expansion/batch-02";
import { BATCH_03 } from "@/content/words/expansion/batch-03";
import { BATCH_04 } from "@/content/words/expansion/batch-04";
import { BATCH_05 } from "@/content/words/expansion/batch-05";
import { BATCH_06 } from "@/content/words/expansion/batch-06";
import { BATCH_07 } from "@/content/words/expansion/batch-07";
import { BATCH_08 } from "@/content/words/expansion/batch-08";
import { BATCH_09 } from "@/content/words/expansion/batch-09";
import { BATCH_10 } from "@/content/words/expansion/batch-10";
import { EXTRA_WORDS } from "@/content/words/extra";

/**
 * The dictionary expansion (G2…): common words beyond the lessons, written in batches from the candidate list
 * (content/data/expand-candidates.json, scripts/expand/) and reviewed like lesson content. Derived from JMdict
 * (© EDRDG, CC BY-SA 4.0); the meanings are ours. Not lesson words: the lesson decks, drills and kanji cards never
 * use them (only the opt-in "More words" deck does, lib/vocab-more-cards.ts), and a lesson word always wins over
 * them in the word inspector.
 */
/** The batches by number, so the checker (tests/expansion.test.ts) tests each one on its own. */
export const BATCHES: Record<string, Word[]> = {
  "01": BATCH_01,
  "02": BATCH_02,
  "03": BATCH_03,
  "04": BATCH_04,
  "05": BATCH_05,
  "06": BATCH_06,
  "07": BATCH_07,
  "08": BATCH_08,
  "09": BATCH_09,
  "10": BATCH_10,
};

export const EXPANSION_WORDS: Word[] = Object.values(BATCHES).flat();

/**
 * Candidates a later lesson teaches (JMdict ids): moved from their batch into the lesson dictionary, each batch
 * keeping a comment where the word was (candidates past the batches, such as アルバイト, had no line to replace).
 * The candidate list still holds them.
 */
export const MOVED_TO_LESSONS = new Set(["1305990", "1224880", "1409110", "1291800", "1404975", "1502390", "1407980", "1381380", "2013900", "1483740", "1588120", "1236900", "1087820", "1073210", "1500100", "1217730", "1443000", "1202270", "1423000", "1213400", "1350110", "1390930", "1327190", "1519210", "1290800", "1171010", "1598550", "1396130", "1183720", "1264540", "1490230", "1341000", "1123880", "1013050", "1007310", "1421970", "1553170", "1180470", "1265070", "1227560", "1252560", "1019420", "1038660", "1185200", "1333070", "1390980", "1538440", "1355120", "1231690", "1536010", "1409140", "1316380", "1592250", "1585650", "1154330", "1512130", "1589730", "1065950", "1552740", "1067770", "1356510", "1012620", "1036400", "1078630", "1115150", "1120410", "1169250", "1206050", "1207590", "1207610", "1208000", "1215260", "1228260", "1259140", "1269410", "1293780", "1304680", "1307500", "1326980", "1380440", "1387210", "1427340", "1429060", "1473950", "1487660", "1495770", "1509290", "1524690", "1543240", "1543750", "1559160", "1579720", "1591150", "1548010", "1547900", "1583720", "1419370", "1508390", "1529530", "1340460", "1593670", "1604550", "1401210", "1529390", "2845606", "1239730", "1299680", "1006380", "1199900", "1215230", "1221520", "1228560", "1229840", "1289590", "1318950", "1338180", "1343100", "1344380", "1351360", "1402730", "1405800", "1432850", "1445690", "1449540", "1451750", "1535780", "1600900", "1602440", "1604130", "1106400", "1513060", "1145990", "1536930", "1043760", "1529330", "1387500", "1577985", "1535910", "1577200", "1587290", "1357600", "1386460", "1477840", "1588730", "1318720", "1259210", "1395620", "1587610", "1404390", "1531190", "1218760", "1156530", "1390020", "1006780", "1555830", "1253190", "1242350", "1541900", "1257330", "1576630", "1172660", "1602710", "1599390", "1592500", "1603550", "1133790", "1237020", "1315240", "1448440", "1450270", "1078270", "1195670", "1445360", "1415750", "1363090", "1305700", "1223660", "1203020", "1403040", "1548550", "1365850", "2008740", "1091500", "1346150", "1310620", "1529410", "1350040", "1382370", "1007130", "1172400", "1497980", "1190860", "1600160", "1352290", "1378860", "1005180", "1254180", "1315130", "1357980", "1376600", "1426680", "1510640", "1526960", "1538130", "1593480"]);

/** Every dictionary word that isn't a lesson word: the kanji-example words, then the expansion. */
export const NON_LESSON_WORDS: Word[] = [...EXTRA_WORDS, ...EXPANSION_WORDS];
