import syncData from './sync-data.json';

export const syncMeta: { lastSync: string; latestNewsId: number } = syncData.meta;
export type Res = { r: number; h: string; a: string; hs: number; as: number; d: string; day: string; t: string; hall: string };
export const results: Res[] = syncData.results as Res[];

export type Team = { short: string; full: string; logo?: string; hue: number };
export const teams: Record<string, Team> = {
 'חולון': { short: 'חולון', full: 'מ.כ. יובלים חולון', logo: 'holon', hue: 215 },
 'מכבי ראשל"צ': { short: 'מכבי ראשל"צ', full: 'מכבי ראשון לציון', logo: 'mrl', hue: 40 },
 'רמת השרון': { short: 'רמת השרון', full: 'א.ס. SGS רמת השרון', logo: 'rsh', hue: 25 },
 'הפועל ראשל"צ': { short: 'הפועל ראשל"צ', full: 'הפועל אלטשולר שחם ראשון לציון', logo: 'hrl', hue: 0 },
 'הרצליה': { short: 'הרצליה', full: 'בני הרצליה', logo: 'herz', hue: 210 },
 'אשדוד': { short: 'אשדוד', full: 'הפועל אשדוד', logo: 'ashdod', hue: 355 },
 'קרית מוצקין': { short: 'קרית מוצקין', full: 'מכבי אבישי קרית מוצקין', logo: 'motzkin', hue: 45 },
 'ערד': { short: 'ערד', full: 'הפועל "דור" ערד', logo: 'arad', hue: 5 },
 'רחובות': { short: 'רחובות', full: 'מכבי עירוני רחובות', logo: 'rehovot', hue: 200 },
 'באר שבע': { short: 'באר שבע', full: 'מ.כ. באר שבע', logo: 'bsh', hue: 160 },
 'מכבי ת"א': { short: 'מכבי ת"א', full: 'מכבי תל אביב', logo: 'mta', hue: 50 },
 'נס ציונה': { short: 'נס ציונה', full: 'א.כ. נס ציונה', logo: 'nz', hue: 275 },
 'קרית אונו': { short: 'קרית אונו', full: 'הפועל קרית אונו', logo: 'ko', hue: 350 },
};

export type Fx = { d: string; day: string; t: string; league: string; round: string; hall: string; h: string; a: string; g: 'm' | 'w' | 'y'; tv?: string; iso: string; pp?: boolean };
export const fixtures: Fx[] = (syncData.fixtures as Fx[]).slice().sort((a, b) => Date.parse(a.iso) - Date.parse(b.iso));

export const table: [string, number, number, number, number, number, number, number][] = syncData.table as [string, number, number, number, number, number, number, number][];

export type News = { id: string; title: string; tag: string; img: string; date?: string; teaser?: string; url: string };
export const news: News[] = syncData.news as News[];
export const article = [
 'המחזור השישי בליגת ווינר בכדוריד שוחק על פני ארבעה ימים, עם משחקים שהשפיעו על תמונת הצמרת ועל המאבקים בתחתית. מכבי ראשל"צ היא היחידה שנותרה מושלמת אחרי חמישה משחקים, עם ניצחון 26:38 על עירוני רחובות. הפועל ראשל"צ נצמדה אליה (עם משחק יתר) אחרי 31:36 על הפועל אשדוד. בדרמה של המחזור נפרדו בני הרצליה ומכבי ת"א ב-29:29, ובקרב התחתית גברה נס ציונה 29:37 על מ.כ. באר שבע. באמצע השבוע גברה מ.כ. חולון 24:41 על קריית מוצקין, והפועל קריית אונו ניצחה 30:31 את הפועל ערד.',
 'הפועל ראשל"צ אירחה את הפועל אשדוד למשחק ששודר בערוץ הספורט. אחרי מחצית צמודה (17:18), שמרה המארחת על יתרון קטן גם בחלק השני ורשמה ניצחון רביעי ברציפות, 31:36. נריה עובד כבשה 10 שערים, איתי סורקיס 7; לאשדוד כבש אדיר כהן 13.',
 'מכבי ראשל"צ אירחה בבית מכבי את עירוני רחובות. הצהובים נתנו פייט ענק באירופה אבל הודחו על ידי וויבודינה, ובליגה המשיכו ברצף: 26:38 וניצחון חמישי ברציפות. ירמי סידי ולידור פסו כבשו 7 כ"א.',
 'בני הרצליה ומכבי ת"א נפרדו ב-29:29 בתום דרמה גדולה: ויקטור פלצ\'נקו השווה דקה לסיום, ובן ליברטי החטיא פנדל בשניית הסיום. בקרב התחתית בצימרמן רשמה נס ציונה ניצחון שני העונה, 29:37 על באר שבע, שהשארה אותה במקום האחרון.',
];
export const clubs: [string, string, string | undefined][] = [
 ['הפועל אלטשולר שחם ראשון לציון', '11', 'hrl'], ['מכבי ראשון לציון', '18', 'mrl'], ['מ.כ. יובלים חולון', '20', 'holon'], ['מכבי תל אביב', '21', 'mta'], ['בני הרצליה', '28', 'herz'], ['א.כ. נס ציונה', '29', 'nz'],
 ['א.ס. רמת השרון', '33', 'rsh'], ['הפועל קרית אונו', '10', 'ko'], ['הפועל "דור" ערד', '8', 'arad'], ['מ.כ. באר שבע', '44', 'bsh'], ['הפועל אשדוד', '4', 'ashdod'], ['מכבי אבישי קרית מוצקין', '15', 'motzkin'],
 ['מכבי עירוני רחובות', '16', 'rehovot'], ['אסא טכניון חיפה', '27', 'tech'], ['מכבי פתח תקוה', '30', 'mpt'], ['הפועל ירושלים', '6', 'jer'], ['מכבי דימונה', '39', 'dim'], ['הפועל נתניה', '42', 'net'],
 ['הפועל חבל אילות', '53', 'eilot'], ['מכבי רעננה', '19', 'raanana'], ['מכבי עירוני חורה', '61', 'hura'], ['הפועל פתח תקוה', '46', 'hpt'], ['הפועל רמת-גן', '12', 'hrg'], ['מכבי ארזים אהל שם ר"ג', '17', 'arazim'], ['מ.כ. באר יעקב', '58', 'byaakov'], ['הקרייתים', '25', 'krayot'],
];

export type WRow = [string, number, number, number, number, number, number, number]; // name, P, W, D, L, GF, GA, pts
export const tableW: WRow[] = syncData.tableW as WRow[];
export const resultsW: Res[] = syncData.resultsW as Res[];

/* crest reuse for women's teams (same clubs) */
export const wteams: Record<string, Team> = {
 'הפועל "דלתות פנדור" ראשל"צ': { short: 'הפועל ראשל"צ', full: 'הפועל "דלתות פנדור" ראשל"צ', logo: 'hrl', hue: 0 },
 'בנות "עיקו" הרצליה': { short: 'הרצליה', full: 'בנות "עיקו" הרצליה', logo: 'herz', hue: 210 },
 'מ.כ. חולון': { short: 'חולון', full: 'מ.כ. יובלים חולון', logo: 'holon', hue: 215 },
 'מכבי ראשון לציון': { short: 'מכבי ראשל"צ', full: 'מכבי ראשון לציון', logo: 'mrl', hue: 40 },
 'מכבי תל אביב': { short: 'מכבי ת"א', full: 'מכבי תל אביב', logo: 'mta', hue: 50 },
 'הפועל אשדוד': { short: 'אשדוד', full: 'הפועל אשדוד', logo: 'ashdod', hue: 355 },
 'מכבי ארזים אהל שם ר"ג': { short: 'ארזים ר"ג', full: 'מכבי ארזים אהל שם ר"ג', logo: 'arazim', hue: 220 },
 'הפועל קרית אונו': { short: 'קרית אונו', full: 'הפועל קרית אונו', logo: 'ko', hue: 350 },
 'מכבי פתח תקוה': { short: 'פתח תקוה', full: 'מכבי פתח תקוה', logo: 'mpt', hue: 260 },
 'א.ס. רמה"ש': { short: 'רמת השרון', full: 'א.ס. רמת השרון', logo: 'rsh', hue: 25 },
 'א.כ. נס ציונה': { short: 'נס ציונה', full: 'א.כ. נס ציונה', logo: 'nz', hue: 275 },
};

/* ---------- כדוריד TV: סרטונים אמיתיים מערוץ היוטיוב הרשמי של האיגוד (נבדק 25/10/2026) ---------- */
export type Ytv = { id: string; title: string; date: string; dur?: string };
export const ytVideos: Ytv[] = [
 { id: 'fnN33h7bEzU', title: 'משחק 3 בגמר פליאוף האליפות בליגת אתנה לנשים', date: '27/09/2026' },
 { id: '_mhHP2hEFtQ', title: 'חולון נגד הפועל אשדוד · גביע אתנה ע"ש רונית שטייגר · נשים', date: '26/09/2026' },
 { id: 'hOM9kCWt6ew', title: 'רמת השרון נגד מכבי תל אביב · גביע ווינר ע"ש מויזס רש · גברים', date: '25/09/2026' },
 { id: 'YUqY-F3-1q0', title: 'חולון נגד מכבי ראשון לציון · גביע ווינר ע"ש מויזס רש · גברים', date: '25/09/2026' },
 { id: 'dyGOsZ3y4EU', title: 'מכבי הארזים ר"ג נגד בנות עיקו הרצליה · גביע אתנה · נשים', date: '25/09/2026' },
 { id: 'zqPkfu7sRNY', title: 'גמר גביע ווינר שופטים ע"ש מויזס רש 2025 · המשחק המלא', date: '26/09/2025' },
];

/* ---------- שידור חי: מתמלא רק כשיש משחק חי בפועל ממקור נתונים. כרגע ריק, אין משחק חי ---------- */
export type LiveGame = { h: string; a: string; hs: number; as: number; minute: string; league: string };
export const liveGames: LiveGame[] = [];

/* ---------- ישראל באירופה: גביע אירופה (EHF), מאתר EHF ואתר האיגוד, נבדק 25/10/2026 ---------- */
export type EuTie = { club: string; logoKey?: string; gender: 'נשים' | 'גברים'; opp: string; oppCountry: string; result: string; note: string; next: string };
export const europe: EuTie[] = [
 { club: 'בנות "עיקו" הרצליה', gender: 'נשים', opp: 'KHF Shqiponja', oppCountry: 'קוסובו', result: '69:51 בסיכום', note: '40:24 ו-29:27 בסיבוב 2 · עלתה לסיבוב 3', next: 'סיבוב 3: מול IUVENTA מיכאלובצה (סלובקיה), 14-15/11', },
 { club: 'מכבי ארזים אהל שם ר"ג', gender: 'נשים', opp: 'ADAA São Pedro do Sul', oppCountry: 'פורטוגל', result: '52:44 בסיכום', note: '28:22 ו-24:22 בסיבוב 2 · עלתה לסיבוב 3', next: 'סיבוב 3: מול Westfriesland (הולנד), 14-15/11', },
 { club: 'רמת השרון', gender: 'גברים', opp: 'יוניקוס', oppCountry: 'יוון', result: '59:51 בסיכום', note: '25:31 ביוון ו-26:28 בגומלין · ניצחון כפול · עלתה לסיבוב 3', next: 'סיבוב 3: מול PAOK (יוון), משחק ראשון בבית 21-22/11, גומלין בחוץ 28-29/11', },
];

/* Verified 25/10/2026: sport5 articles (highlights played), eurohandball history, handballisr news, ynet */

/* ---------- איתור מועדון ("בוא לשחק"): עיר לפי שם המועדון הרשום באתר האיגוד ---------- */
export type FinderClub = { name: string; city: string; siteId: string; lat: number; lon: number; tid?: number };
export const finderClubs: FinderClub[] = [
 { name: 'הפועל אלטשולר שחם ראשון לציון', city: 'ראשון לציון', siteId: '11', lat: 31.97, lon: 34.79, tid: 3 }, { name: 'מכבי ראשון לציון', city: 'ראשון לציון', siteId: '18', lat: 31.96, lon: 34.80, tid: 4 },
 { name: 'מ.כ. יובלים חולון', city: 'חולון', siteId: '20', lat: 32.01, lon: 34.77, tid: 28 }, { name: 'מכבי תל אביב', city: 'תל אביב', siteId: '21', lat: 32.08, lon: 34.78, tid: 5 },
 { name: 'בני הרצליה', city: 'הרצליה', siteId: '28', lat: 32.16, lon: 34.84, tid: 13 }, { name: 'א.כ. נס ציונה', city: 'נס ציונה', siteId: '29', lat: 31.93, lon: 34.80, tid: 26 },
 { name: 'א.ס. רמת השרון', city: 'רמת השרון', siteId: '33', lat: 32.14, lon: 34.84, tid: 27 }, { name: 'הפועל קרית אונו', city: 'קרית אונו', siteId: '10', lat: 32.06, lon: 34.86, tid: 36 },
 { name: 'הפועל "דור" ערד', city: 'ערד', siteId: '8', lat: 31.26, lon: 35.21, tid: 35 }, { name: 'מ.כ. באר שבע', city: 'באר שבע', siteId: '44', lat: 31.25, lon: 34.79, tid: 254 },
 { name: 'הפועל אשדוד', city: 'אשדוד', siteId: '4', lat: 31.80, lon: 34.65, tid: 51 }, { name: 'מכבי אבישי קרית מוצקין', city: 'קרית מוצקין', siteId: '15', lat: 32.83, lon: 35.08, tid: 29 },
 { name: 'מכבי עירוני רחובות', city: 'רחובות', siteId: '16', lat: 31.89, lon: 34.81, tid: 8 }, { name: 'אסא טכניון חיפה', city: 'חיפה', siteId: '27', lat: 32.78, lon: 34.99 },
 { name: 'מכבי פתח תקוה', city: 'פתח תקוה', siteId: '30', lat: 32.09, lon: 34.89 }, { name: 'הפועל ירושלים', city: 'ירושלים', siteId: '6', lat: 31.77, lon: 35.22 },
 { name: 'מכבי דימונה', city: 'דימונה', siteId: '39', lat: 31.07, lon: 35.03 }, { name: 'הפועל נתניה', city: 'נתניה', siteId: '42', lat: 32.33, lon: 34.86 },
 { name: 'הפועל חבל אילות', city: 'אילת והארבה', siteId: '53', lat: 29.56, lon: 34.95 }, { name: 'מכבי רעננה', city: 'רעננה', siteId: '19', lat: 32.18, lon: 34.87 },
 { name: 'מכבי עירוני חורה', city: 'חורה', siteId: '61', lat: 31.30, lon: 34.94 }, { name: 'הפועל פתח תקוה', city: 'פתח תקוה', siteId: '46', lat: 32.10, lon: 34.88 },
 { name: 'הפועל רמת-גן', city: 'רמת גן', siteId: '12', lat: 32.07, lon: 34.82 }, { name: 'מכבי ארזים אהל שם ר"ג', city: 'רמת גן', siteId: '17', lat: 32.06, lon: 34.83 },
 { name: 'מ.כ. באר יעקב', city: 'באר יעקב', siteId: '58', lat: 31.94, lon: 34.83 }, { name: 'הקרייתים', city: 'קרית חיים', siteId: '25', lat: 32.82, lon: 35.07 },
];

/* ---------- ליגות ומסגרות נוספות באתר האיגוד (boards.asp?cYear=2027) - כל קישור נפתח ואומת מול עמוד הליגה הרשמי 31/10/2026 ---------- */
export type LeagueLink = { name: string; id: number; group: string };
export const moreLeagues: LeagueLink[] = [
 { name: 'לאומית גברים', id: 11584, group: 'בוגרים' },
 { name: 'ארצית צפון', id: 11585, group: 'בוגרים' },
 { name: 'ארצית דרום', id: 11586, group: 'בוגרים' },
 { name: 'נוער צפון', id: 11573, group: 'נוער' },
 { name: 'נוער דרום', id: 11574, group: 'נוער' },
 { name: 'נערים י\'', id: 11580, group: 'נערים ונערות' },
 { name: 'נערים ט\' צפון', id: 11593, group: 'נערים ונערות' },
 { name: 'נערים ט\' דרום', id: 11594, group: 'נערים ונערות' },
 { name: 'ליגה נערות', id: 11575, group: 'נערים ונערות' },
 { name: 'נערות י\'', id: 11595, group: 'נערים ונערות' },
 { name: 'נערות ט\'', id: 11596, group: 'נערים ונערות' },
 { name: 'ילדים ז\' מרכז', id: 11617, group: 'ילדים וילדות' },
 { name: 'ילדים ז\' צפון', id: 11618, group: 'ילדים וילדות' },
 { name: 'ילדים ז\' דרום', id: 11619, group: 'ילדים וילדות' },
 { name: 'ילדים ז\' גוש דן', id: 11623, group: 'ילדים וילדות' },
 { name: 'ילדים ז\' דן', id: 11627, group: 'ילדים וילדות' },
 { name: 'ילדות ז\' צפון', id: 11621, group: 'ילדים וילדות' },
 { name: 'ילדות ז\' דרום', id: 11622, group: 'ילדים וילדות' },
 { name: 'ילדים ח\' צפון', id: 11611, group: 'ילדים וילדות' },
 { name: 'ילדים ח\' דרום', id: 11613, group: 'ילדים וילדות' },
 { name: 'ילדות ח\' צפון', id: 11614, group: 'ילדים וילדות' },
 { name: 'ילדות ח\' דרום', id: 11610, group: 'ילדים וילדות' },
 { name: 'גביע WINNER שופטים ע"ש מויזס רש', id: 11632, group: 'גביעים' },
 { name: 'גביע הליגה ע"ש רונית שטייגר · נשים', id: 11555, group: 'גביעים' },
 { name: 'גביע WINNER ע"ש מויזס רש · בית א\'', id: 11628, group: 'גביעים' },
 { name: 'גביע WINNER ע"ש מויזס רש · בית ב\'', id: 11629, group: 'גביעים' },
 { name: 'גביע WINNER ע"ש מויזס רש · בית ג\'', id: 11630, group: 'גביעים' },
 { name: 'גביע WINNER ע"ש מויזס רש · בית ד\'', id: 11631, group: 'גביעים' },
];

/* קישור לטופס ההצבעה (גוגל פורמז) - ימולא רק לאחר אישור אריק ויצירת הטופס */
export const VOTE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScQDLX41KG782IjPccbehrKTf-egY2hx0arWvNS7JP1h7CI4A/viewform';

export type Scorer = { name: string; team: string; goals: number };
/* Official association ranking (handballisr.co.il/stats.asp), men's WINNER league, after round 6, checked 25/10/2026 */
export const scorersRound = 6;
export const scorers: Scorer[] = [
 { name: 'ניב צורף', team: 'הרצליה', goals: 57 },
 { name: 'פיליפ לאובץ', team: 'קרית מוצקין', goals: 48 },
 { name: 'אור לוי', team: 'חולון', goals: 47 },
 { name: 'יונתן פלח', team: 'הפועל ראשל"צ', goals: 47 },
 { name: 'נבו מדינה', team: 'קרית אונו', goals: 40 },
 { name: 'לידור פסו', team: 'מכבי ראשל"צ', goals: 39 },
 { name: 'אקאסיו מוריירה', team: 'ערד', goals: 38 },
 { name: "פיליפ וויוביץ'", team: 'באר שבע', goals: 38 },
 { name: "אורוש טודורוביץ'", team: 'אשדוד', goals: 37 },
 { name: 'אסף שרון', team: 'נס ציונה', goals: 37 },
];
