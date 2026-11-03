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

/* ---------- כדוריד TV: latest uploads of the association's YouTube channel (scripts/sync.py, from the channel feed) ---------- */
export type Ytv = { id: string; title: string; date: string };
export const ytVideos: Ytv[] = syncData.videos as Ytv[];

/* ---------- שידור חי: מתמלא רק כשיש משחק חי בפועל ממקור נתונים. כרגע ריק, אין משחק חי ---------- */
export type LiveGame = { h: string; a: string; hs: number; as: number; minute: string; league: string };
export const liveGames: LiveGame[] = [];

/* ---------- ישראל באירופה: גביע אירופה (EHF), מאתר EHF ואתר האיגוד, נבדק 25/10/2026 ---------- */
export type EuTie = { club: string; logoKey?: string; gender: 'נשים' | 'גברים'; opp: string; oppCountry: string; result: string; note: string; next: string; until: string };
export const europe: EuTie[] = [
 { club: 'בנות "עיקו" הרצליה', gender: 'נשים', opp: 'KHF Shqiponja', oppCountry: 'קוסובו', result: '69:51 בסיכום', note: '40:24 ו-29:27 בסיבוב 2 · עלתה לסיבוב 3', next: 'סיבוב 3: מול IUVENTA מיכאלובצה (סלובקיה), 14-15/11', until: '2026-11-15' },
 { club: 'מכבי ארזים אהל שם ר"ג', gender: 'נשים', opp: 'ADAA São Pedro do Sul', oppCountry: 'פורטוגל', result: '52:44 בסיכום', note: '28:22 ו-24:22 בסיבוב 2 · עלתה לסיבוב 3', next: 'סיבוב 3: מול Westfriesland (הולנד), 14-15/11', until: '2026-11-15' },
 { club: 'רמת השרון', gender: 'גברים', opp: 'יוניקוס', oppCountry: 'יוון', result: '59:51 בסיכום', note: '25:31 ביוון ו-26:28 בגומלין · ניצחון כפול · עלתה לסיבוב 3', next: 'סיבוב 3: מול PAOK (יוון), משחק ראשון בבית 21-22/11, גומלין בחוץ 28-29/11', until: '2026-11-29' },
];

/* Verified 25/10/2026: sport5 articles (highlights played), eurohandball history, handballisr news, ynet */

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
/* Official association ranking (handballisr.co.il/stats.asp), men's WINNER league; kept current by scripts/sync.py */
export const scorersRound: number = syncData.scorers.round;
export const scorers: Scorer[] = syncData.scorers.list as Scorer[];

/* ---------- שותפים וחסויות ----------
   Filled in by the association. Every part renders only when it has real content:
   empty stats/packages are not shown, contact null falls back to the association's
   contact page, and a null slot shows a small "פנוי לחסות" link to /partners. */
export type SponsorStat = { value: string; label: string };
export type SponsorPackage = { name: string; items: string[]; price?: string };
export type SponsorSlotKey = 'results' | 'nextGame' | 'scorers' | 'videos';
export type SlotSponsor = { name: string; url?: string; logo?: string };
export const sponsorship: {
  stats: SponsorStat[];
  packages: SponsorPackage[];
  contact: { name?: string; email?: string; phone?: string } | null;
  slots: Record<SponsorSlotKey, SlotSponsor | null>;
} = {
  stats: [],
  packages: [],
  contact: null,
  slots: { results: null, nextGame: null, scorers: null, videos: null },
};

/* Current partners, same order as `sponsors` logos in assets.ts */
export const partners: { name: string; url: string }[] = [
  { name: 'שיבא - המרכז הלאומי לרפואת ספורט', url: 'https://www.sheba.co.il/%D7%94%D7%9E%D7%9B%D7%95%D7%9F-%D7%94%D7%9C%D7%90%D7%95%D7%9E%D7%99-%D7%9C%D7%A8%D7%A4%D7%95%D7%90%D7%AA-%D7%A1%D7%A4%D7%95%D7%A8%D7%98-%D7%A9%D7%99%D7%91%D7%90' },
  { name: 'Molten', url: 'https://sports.molten.co.jp/en/' },
  { name: 'Winner', url: 'https://www.winner.co.il/' },
  { name: 'Horizon Capital', url: 'https://www.oryzncapital.com/' },
  { name: 'Rozenblatt', url: 'https://rozenblatt.co.il/' },
  { name: 'Givova', url: 'http://www.givova.it/' },
];
