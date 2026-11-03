import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, Navigate, useLocation } from '@instinct/files';
import './fonts.css';
import './style.css';
import { logos, logo, tv, sponsors, imgs, newsImgs, ytThumbs } from './assets';
const nimg = (n: any): string => newsImgs[n.id] || imgs[n.img];
import { results, resultsW, fixtures, table, tableW, moreLeagues, scorers, scorersRound, news, clubs, teams, wteams, ytVideos, liveGames, europe, VOTE_URL, syncMeta, sponsorship, partners, type SponsorSlotKey, type Fx, type Res, type News } from './data';

const TV_URL = 'https://handballisr.watch.pixellot.tv/';
const SITE = 'https://handballisr.co.il';
const PILOT_URL = 'https://handball-pilot.pages.dev/';
const FB = 'https://www.facebook.com/Handballisr/';
const YT = 'https://www.youtube.com/channel/UC_W0XW-HGewdgzjuudDvQww';
const IG = 'https://www.instagram.com/israel.handball.federation/';
const TT = 'https://www.tiktok.com/@israelhandballfederation';
const gLabel = { m: 'גברים', w: 'נשים', y: 'נוער' } as const;

/* ---------- small pieces ---------- */
function useTitle(t: string) { useEffect(() => { document.title = t ? t + ' | איגוד הכדוריד' : 'איגוד הכדוריד בישראל'; }, [t]); }

const TEAM_ALIAS: Record<string, string> = { 'מכבי ראשון-לציון': 'מכבי ראשל"צ', 'הפועל ראשון-לציון': 'הפועל ראשל"צ' };
function Crest({ name, size = 44 }: { name: string; size?: number }) {
  const t = teams[name] || wteams[name] || teams[TEAM_ALIAS[name]] || wteams[TEAM_ALIAS[name]];
  const src = t?.logo ? logos[t.logo] : undefined;
  const label = (t?.short || name).replace(/[^\u0590-\u05FFA-Za-z ]/g, '').trim();
  const ini = label.split(' ').map(w => w[0]).join('').slice(0, 2);
  return <span className="crest" style={{ width: size, height: size, fontSize: size * 0.36, ['--h' as string]: t?.hue ?? 220 }}>
    {src ? <img loading="lazy" src={src} alt="" /> : <b>{ini}</b>}
  </span>;
}
const sn = (n: string) => (teams[n] || wteams[n])?.short || n;

function Ico({ d }: { d: string }) { return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>; }
const I = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  table: 'M4 5h16M4 12h16M4 19h16',
  news: 'M5 4h12a2 2 0 012 2v14H7a2 2 0 01-2-2zM9 9h6M9 13h6',
  tv: 'M3 7h18v12H3zM8 3l4 4 4-4M10 10.5v5l4.5-2.5z',
  play: 'M8 5v14l11-7z',
  share: 'M12 3v12m0-12L8 7m4-4l4 4M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6',
  info: 'M12 8h.01M12 11v5M12 2a10 10 0 100 20 10 10 0 000-20z',
  whistle: 'M14 3v3M4 15h9a4 4 0 014 4v0a2 2 0 01-2 2H9a5 5 0 01-5-5v-1zM13 15l4-4h3v4',
};

function useCountdown(iso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(t); }, []);
  const ms = new Date(iso).getTime() - now;
  if (!(ms > 0)) return null;
  const m = Math.floor(ms / 60000);
  return { d: Math.floor(m / 1440), h: Math.floor((m % 1440) / 60), m: m % 60 };
}

/* ---------- chrome ---------- */
const IFb = <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21z" /></svg>;
const IYt = <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" /></svg>;
const IIg = <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" /></svg>;
function Socials({ label }: { label?: boolean }) {
  return <div className="soc">
    <a href={FB} target="_blank" rel="noopener" aria-label="פייסבוק האיגוד" className="fb">{IFb}{label && <span>פייסבוק</span>}</a>
    <a href={YT} target="_blank" rel="noopener" aria-label="יוטיוב האיגוד" className="yt">{IYt}{label && <span>יוטיוב</span>}</a>
    <a href={IG} target="_blank" rel="noopener" aria-label="אינסטגרם האיגוד" className="ig">{IIg}{label && <span>אינסטגרם</span>}</a>
    <a href={TT} target="_blank" rel="noopener" aria-label="טיקטוק האיגוד" className="tt">{ITt}{label && <span>טיקטוק</span>}</a>
  </div>;
}
function Social() {
  const posts = [news[0], news[2], news[3]];
  return <section className="sec social">
    <SecHead t="האיגוד ברשתות" />
    <div className="soc-grid">
      <a className="soc-card fb" href={FB} target="_blank" rel="noopener"><span className="soc-ic">{IFb}</span><b>פייסבוק</b><small>איגוד הכדוריד Israel Handball Federation</small><em>לעמוד הרשמי ‹</em></a>
      <a className="soc-card yt" href={YT} target="_blank" rel="noopener"><span className="soc-ic">{IYt}</span><b>יוטיוב</b><small>הערוץ של האיגוד</small><em>לערוץ ‹</em></a>
      <a className="soc-card ig" href={IG} target="_blank" rel="noopener"><span className="soc-ic">{IIg}</span><b>אינסטגרם</b><small>העמוד הרשמי של האיגוד</small><em>לעמוד הרשמי ‹</em></a>
      <a className="soc-card tt" href={TT} target="_blank" rel="noopener"><span className="soc-ic">{ITt}</span><b>טיקטוק</b><small>הערוץ הרשמי של האיגוד</small><em>לערוץ ‹</em></a>
    </div>
  </section>;
}
function Header() {
  return <header className="top">
    <a className="skip" href="#main">דילוג לתוכן המרכזי</a>
    <div className="pilot">גרסת פיילוט · האתר הרשמי: <a href="https://handballisr.co.il/" target="_blank" rel="noopener">handballisr.co.il</a></div>
    <div className="top-in">
      <Link to="/" className="brand"><img src={logo} alt="" /><span><b>איגוד הכדוריד</b><small>בישראל</small></span></Link>
      <nav className="dnav" aria-label="ראשי">
        <NavLink to="/" end>בית</NavLink><NavLink to="/matches">משחקים</NavLink><NavLink to="/tables">טבלאות</NavLink><NavLink to="/news">חדשות</NavLink><NavLink to="/clubs">מועדונים</NavLink><NavLink to="/leagues">ליגות</NavLink><NavLink to="/tv">כדוריד TV</NavLink>
      </nav>
      <Socials />
      {liveGames.length > 0 && <Link to="/tv" className="tvbtn on-air"><i className="dot blink" />שידור ישיר · {liveGames[0].h} <b>{liveGames[0].hs}</b>:<b>{liveGames[0].as}</b> {liveGames[0].a}</Link>}
    </div>
  </header>;
}
function Tabs({ top }: { top?: boolean }) {
  const it: [string, string, string][] = [['/', I.home, 'בית'], ['/matches', I.cal, 'משחקים'], ['/tables', I.table, 'טבלאות'], ['/leagues', I.whistle, 'ליגות'], ['/news', I.news, 'חדשות'], ['/tv', I.tv, 'TV']];
  return <nav className={top ? "tabs tabs-top" : "tabs"} aria-label={top ? "תפריט ראשי" : "תפריט תחתון"}>{it.map(([to, d, l]) => <NavLink key={to} to={to} end={to === '/'}><Ico d={d} /><span>{l}</span></NavLink>)}</nav>;
}

function Strip() {
  const last = results.filter(r => r.r === 6);
  return <section className="strip" aria-label="תוצאות אחרונות">
    <div className="strip-lab"><span>מחזור 6</span><small>ליגת WINNER</small></div>
    <div className="strip-row">
      {last.map((r, i) => <Link to="/matches" key={i} className="chipm">
        <div className={'sr' + (r.hs > r.as ? ' w' : '')}><Crest name={r.h} size={22} /><span>{sn(r.h)}</span><b>{r.hs}</b></div>
        <div className={'sr' + (r.as > r.hs ? ' w' : '')}><Crest name={r.a} size={22} /><span>{sn(r.a)}</span><b>{r.as}</b></div>
      </Link>)}
    </div>
  </section>;
}

/* ---------- match cards ---------- */
function icsUrl(g: Fx) {
  const s = new Date(g.iso), e = new Date(s.getTime() + 90 * 60000);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const t = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', 'DTSTART:' + f(s), 'DTEND:' + f(e), 'SUMMARY:' + g.h + ' - ' + g.a, 'LOCATION:' + g.hall, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(t);
}
const form = (name: string) => [...results, ...resultsW].filter(r => r.h === name || r.a === name).sort((x, y) => x.r - y.r).slice(-3).map(r => { if (r.hs === r.as) return 'd'; const hw = r.hs > r.as; const mine = r.h === name; return (hw === mine) ? 'w' : 'l'; });
function FxCard({ g }: { g: Fx }) {
  return <article className="mc">
    <div className="mc-top"><span className={'pill p-' + g.g}>{g.league}</span><span className="mc-rd">מחזור {g.round}</span>{g.pp && <span className="pill pp">משחק נדחה</span>}{g.tv && <span className="pill live"><i className="dot" />{g.tv}</span>}</div>
    <div className="mc-body">
      <div className="mc-team"><Crest name={g.h} size={56} /><strong>{sn(g.h)}</strong></div>
      <div className="mc-mid"><b>{g.t}</b><span>{g.day} {g.d}</span></div>
      <div className="mc-team"><Crest name={g.a} size={56} /><strong>{sn(g.a)}</strong></div>
    </div>
    <div className="mc-foot"><span className="loc"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg><span className="hall">{g.hall}</span></span>
      <a className="act" href={icsUrl(g)} download="handball-game.ics" aria-label="הוסף ליומן">יומן</a><ShareBtn kind="fx" g={g} /></div>
  </article>;
}
function ResCard({ r, w }: { r: Res; w?: boolean }) {
  const dr = r.hs === r.as;
  const hw = !dr && r.hs > r.as;
  return <article className="mc done">
    <div className="mc-top"><span className={w ? 'pill p-w' : 'pill p-m'}>{w ? 'ליגת אתנה' : 'ליגת WINNER'}</span><span className="mc-rd">מחזור {r.r}</span><span className="mc-end">הסתיים</span></div>
    <div className="mc-body">
      <div className={'mc-team' + (hw ? ' win' : '')}><Crest name={r.h} size={56} /><strong>{sn(r.h)}</strong><b className="sc">{r.hs}</b></div>
      <div className="mc-score"><i>:</i></div>
      <div className={'mc-team' + (!dr && !hw ? ' win' : '')}><Crest name={r.a} size={56} /><strong>{sn(r.a)}</strong><b className="sc">{r.as}</b></div>
    </div>
    <div className="mc-foot"><span>{r.day} {r.d} · {r.hall}</span><ShareBtn kind="res" r={r} /></div>
  </article>;
}


/* ---------- share card: story-size PNG generated locally from match data ---------- */
const crestImg = (name: string) => { const t = teams[name] || wteams[name]; return t?.logo ? logos[t.logo] : undefined; };
function leasedAsset(src: string) {
  if (!src || src.startsWith('data:') || src.includes('lease=')) return src;
  try {
    const lease = new URLSearchParams(location.search).get('lease');
    if (!lease) return src;
    const abs = new URL(src, location.href);
    abs.searchParams.set('lease', lease);
    return abs.toString();
  } catch { return src; }
}
function loadImg(src: string) { return new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.crossOrigin = 'anonymous'; im.onload = () => res(im); im.onerror = rej; im.src = leasedAsset(src); }); }
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
async function drawStory(kind: 'fx' | 'res', g?: Fx, r?: Res) {
  const W = 1080, H = 1920;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d')!;
  const hn = kind === 'fx' ? g!.h : r!.h, an = kind === 'fx' ? g!.a : r!.a;
  const th = (teams[hn] || wteams[hn])?.hue ?? 220, ta = (teams[an] || wteams[an])?.hue ?? 0;
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, `hsl(${th} 62% 22%)`); grad.addColorStop(.5, '#0a1022'); grad.addColorStop(1, `hsl(${ta} 62% 22%)`);
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(190,242,63,.10)'; ctx.beginPath(); ctx.arc(W / 2, 700, 360, 0, 7); ctx.fill();
  const drawCrest = async (name: string, cx: number, cy: number, d: number) => {
    const src = crestImg(name);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, d / 2 + 14, 0, 7); ctx.fillStyle = 'rgba(255,255,255,.96)'; ctx.fill(); ctx.restore();
    if (src) { try { const im = await loadImg(src); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, d / 2, 0, 7); ctx.clip(); ctx.drawImage(im, cx - d / 2, cy - d / 2, d, d); ctx.restore(); return; } catch {} }
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, d / 2, 0, 7); ctx.fillStyle = `hsl(${(teams[name] || wteams[name])?.hue ?? 220} 60% 40%)`; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '700 120px Heebo, Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(sn(name).slice(0, 1), cx, cy + 8); ctx.restore();
  };
  await drawCrest(hn, W / 2, 560, 340);
  ctx.textAlign = 'center'; ctx.direction = 'rtl';
  ctx.fillStyle = '#bef23f'; ctx.font = '700 44px Heebo, Arial';
  ctx.fillText(kind === 'fx' ? `${g!.league} · מחזור ${g!.round}` : `ליגת WINNER · מחזור ${r!.r}`, W / 2, 220);
  ctx.fillStyle = '#fff'; ctx.font = '800 72px Heebo, Arial';
  ctx.fillText(sn(hn), W / 2, kind === 'res' ? 900 : 940);
  if (kind === 'res') {
    const hw = r!.hs > r!.as, dr = r!.hs === r!.as;
    const cWin = '#bef23f', cLos = 'rgba(255,255,255,.82)';
    ctx.font = '900 180px Heebo, Arial';
    ctx.fillStyle = dr || !hw ? cWin : cWin; ctx.fillStyle = hw || dr ? cWin : cLos;
    ctx.fillText(String(r!.hs), W / 2, 1120);
    ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = '500 46px Heebo, Arial';
    ctx.fillText(dr ? 'תיקו' : 'סיום', W / 2, 1255);
    ctx.font = '900 180px Heebo, Arial'; ctx.fillStyle = !hw && !dr ? cWin : cLos;
    ctx.fillText(String(r!.as), W / 2, 1470);
    if (!dr) {
      ctx.fillStyle = '#bef23f'; ctx.font = '700 44px Heebo, Arial';
      ctx.fillText(hw ? `ניצחון ל${sn(hn)}` : `ניצחון ל${sn(an)}`, W / 2, 1340);
    }
  } else {
    ctx.fillStyle = '#bef23f'; ctx.font = '900 260px Heebo, Arial';
    ctx.fillText(g!.t, W / 2, 1260);
    ctx.fillStyle = '#fff'; ctx.font = '700 60px Heebo, Arial'; ctx.fillText(`${g!.day} ${g!.d}`, W / 2, 1400);
  }
  ctx.fillStyle = '#fff'; ctx.font = '800 72px Heebo, Arial';
  ctx.fillText(sn(an), W / 2, kind === 'res' ? 1620 : 1520);
  await drawCrest(an, W / 2, kind === 'res' ? 1755 : 1705, kind === 'res' ? 200 : 280);
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.font = '500 40px Heebo, Arial';
  ctx.fillText(kind === 'fx' ? g!.hall : `${r!.day} ${r!.d} · ${r!.hall}`, W / 2, 1902);
  try { const lg = await loadImg(logo); ctx.drawImage(lg, W / 2 - 60, 40, 120, 120); } catch {}
  return cv;
}
function ShareBtn({ kind, g, r }: { kind: 'fx' | 'res'; g?: Fx; r?: Res }) {
  const pageUrl = PILOT_URL + '#/matches';
  const text = kind === 'fx' && g
    ? `כדוריד: ${sn(g.h)} - ${sn(g.a)} · ${g.day} ${g.d} · ${g.t}`
    : r ? `תוצאה: ${sn(r.h)} ${r.hs}:${r.as} ${sn(r.a)}` : 'כדוריד ישראל';
  const go = async () => {
    const nav = navigator as Navigator & { share?: (d: { title?: string; text?: string; url?: string }) => Promise<void> };
    if (nav.share) { try { await nav.share({ title: 'איגוד הכדוריד בישראל', text, url: pageUrl }); return; } catch (e) { if ((e as Error).name === 'AbortError') return; } }
    window.open('https://wa.me/?text=' + encodeURIComponent(text + '\n' + pageUrl), '_blank', 'noopener');
  };
  return <button className="act" onClick={go} aria-label="שיתוף המשחק"><Ico d={I.share} />שיתוף</button>;
}

function Table({ n, rows, label, withForm = true, compact = false }: { n?: number; rows?: [string, number, number, number, number, number, number, number][]; label: string; withForm?: boolean; compact?: boolean }) {
  const all = rows || table;
  const list = all.slice(0, n);
  if (compact) return <div className="lt-wrap"><div className="lt compact" role="table" aria-label={label}>
    <div className="lt-r head" role="row"><span className="pos">#</span><span className="tm">קבוצה</span><span>מש׳</span><span>הפרש</span><span className="pts">נקודות</span></div>
    {list.map((r, i) => { const gd = r[5] - r[6];
      return <div key={r[0]} className={'lt-r' + (i < 2 ? ' lead' : '')} role="row">
        <span className="pos">{i + 1}</span>
        <span className="tm"><Crest name={r[0]} size={30} /><b className="tmf">{sn(r[0])}</b></span>
        <span>{r[1]}</span>
        <span className={'gd' + (gd > 0 ? ' plus' : gd < 0 ? ' neg' : '')}>{gd > 0 ? '+' + gd : gd}</span>
        <span className="pts"><CountUp to={r[7]} /></span>
      </div>; })}
  </div></div>;
  return <div className="lt-wrap"><div className="lt" role="table" aria-label={label}>
    <div className="lt-r head" role="row"><span className="pos">#</span><span className="tm">קבוצה</span><span className="pts">נקודות</span><span>מש׳</span><span>נצ׳</span><span>ת׳</span><span>הפ׳</span><span>הפרש</span></div>
    {list.map((r, i) => { const gd = r[5] - r[6];
      return <div key={r[0]} className={'lt-r' + (i < 2 ? ' lead' : '')} role="row">
        <span className="pos">{i + 1}</span>
        <span className="tm"><Crest name={r[0]} size={30} /><b className="tmf">{(teams[r[0]] || wteams[r[0]])?.full || r[0]}</b><b className="tms">{sn(r[0])}</b>{withForm && <span className="frm" aria-label="כושר: 3 משחקים אחרונים">{form(r[0]).map((x, k) => <i key={k} className={'ft ' + x}>{x === 'w' ? 'נ' : x === 'd' ? 'ת' : 'ה'}</i>)}</span>}</span>
        <span className="pts"><CountUp to={r[7]} /></span>
        <span>{r[1]}</span><span>{r[2]}</span><span>{r[3]}</span><span>{r[4]}</span>
        <span className={'gd' + (gd > 0 ? ' plus' : gd < 0 ? ' neg' : '')}>{gd > 0 ? '+' + gd : gd}</span>
      </div>; })}
  </div></div>;
}
function CountUp({ to }: { to: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = String(to); return; }
    let raf = 0; const t0 = performance.now(); const dur = 700;
    const step = (t: number) => { const p = Math.min(1, (t - t0) / dur); el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    const done = window.setTimeout(() => { el.textContent = String(to); }, dur + 800);
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { raf = requestAnimationFrame(step); io.disconnect(); } });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.clearTimeout(done); };
  }, [to]);
  return <span ref={ref} className="num">0</span>;
}
/* ---------- original editorial artwork (replaces third-party photos; rights-safe) ---------- */


/* ---------- home ---------- */
function Hero() {
  const [i, setI] = useState(0);
  const slides = [news[0], news[1], news[2], news[3]];
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI(x => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const next = fixtures.find(f => Date.parse(f.iso) > Date.now()) || fixtures[fixtures.length - 1];
  const cd = useCountdown(next.iso);
  return <section className="hero">
    {slides.map((s, k) => <div key={s.id} className={'hs' + (k === i ? ' on' : '')} aria-hidden={k !== i}><img src={imgs[s.img]} alt="" /></div>)}
    <div className="hero-in">
      <div className="hero-txt" key={i}>
        <span className="kick"><i className="dot" />{slides[i].tag}</span>
        <h1>{slides[i].title}</h1>
        {slides[i].teaser && <p>{slides[i].teaser}</p>}
        <div className="hero-cta">
          <a className="btn" href={slides[i].url}>לכתבה באתר האיגוד</a>
          <Link to="/matches" className="btn ghost">לוח המשחקים</Link>
        </div>
      </div>
      <div className="dots" role="tablist" aria-label="כתבות">{slides.map((s, k) => <button key={s.id} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={'כתבה ' + (k + 1)} />)}</div>
    </div>
    <Link to="/matches" className="next">
      <small>המשחק הבא · ליגת WINNER</small>
      <div className="next-m"><Crest name={next.h} size={40} /><b>{sn(next.h)}</b><em>נגד</em><b>{sn(next.a)}</b><Crest name={next.a} size={40} /></div>
      <div className="next-t"><span>{next.day} {next.d} · {next.t}</span>
        {cd && <span className="cd"><b>{cd.d > 0 ? `${cd.d} ימים ` : ''}{cd.h} שע' {cd.m} דק'</b> לפתיחה</span>}</div>
    </Link>
  </section>;
}

function SrcI({ url, label }: { url: string; label?: string }) {
  return <a className="srci" href={url} target="_blank" rel="noopener" aria-label={label || 'מקור הנתונים'} title={label || 'מקור הנתונים'}><Ico d={I.info} /></a>;
}
function SecHead({ t, to, l, src }: { t: string; to?: string; l?: string; src?: string }) {
  return <div className="sh"><h2>{t}{src && <>{'\u2060'}<SrcI url={src} /></>}</h2>{to && <Link to={to}><span className="l-full">{l || 'הכל'}</span><span className="l-short">הכל</span> ‹</Link>}</div>;
}

function NewsCard({ n, big, wide }: { n: News; big?: boolean; wide?: boolean }) {
  const cls = 'nc' + (big ? ' big' : '') + (wide ? ' wide' : '');
  const inner = <><div className="nc-img"><img loading="lazy" src={nimg(n)} alt="" /></div><div className="nc-t"><span className="tag">{n.tag}</span><h3>{n.title}</h3>{big && n.teaser && <p>{n.teaser}</p>}{n.date && <small>{n.date}</small>}</div></>;
  return <a className={cls} href={n.url}>{inner}</a>;
}

function TvBand() {
  return <section className="tvband">
    <div className="tvband-bg"><img loading="lazy" src={imgs.gabriel} alt="" /></div>
    <div className="tvband-in">
      <img loading="lazy" className="tvband-logo" src={tv} alt="ערוץ כדוריד TV" />
      <div className="tvband-txt"><span className="kick"><i className="dot" />שידורים ישירים · VOD</span><h2>כל משחק, בכל מקום</h2><p>משחקי הליגה בשידור ישיר ובצפייה מאוחרת, ישירות מהטלפון.</p>
        <div className="hero-cta"><a className="btn" href={TV_URL}><Ico d={I.play} />לצפייה בכדוריד TV</a><Link to="/tv" className="btn ghost">עוד על הערוץ</Link></div></div>
    </div>
  </section>;
}
const SP_LINKS = [
  'https://www.sheba.co.il/%D7%94%D7%9E%D7%9B%D7%95%D7%9F-%D7%94%D7%9C%D7%90%D7%95%D7%9E%D7%99-%D7%9C%D7%A8%D7%A4%D7%95%D7%90%D7%AA-%D7%A1%D7%A4%D7%95%D7%A8%D7%98-%D7%A9%D7%99%D7%91%D7%90',
  'https://sports.molten.co.jp/en/',
  'https://www.winner.co.il/',
  'https://www.oryzncapital.com/',
  'https://rozenblatt.co.il/',
  'http://www.givova.it/',
];
function Sponsors() {
  return <section className="sp"><small>שותפים ונותני חסות</small>
    <div className="sp-pitch"><div>
      <h3>המותג שלכם על פרק הכדוריד הישראלי</h3>
      <ul>
        <li>חשיפה שבועית במגרשים בכל הארץ - מליגת WINNER וליגת אתנה ועד ליגות הנוער, הנערים והילדים</li>
        <li>קהל מחובר של שחקנים, משפחות ואוהדים שחיים את האיגוד לאורך העונה כולה</li>
        <li>מגוון אפשרויות שילוב: נוכחות באתר האיגוד, חשיפה במשחקים ובאירועים, ושיתופי פעולה ייעודיים</li>
      </ul>
      <a className="btn play-main" href={SITE + '/contact.asp'} target="_blank" rel="noopener">לשיחה על שיתוף פעולה עם האיגוד</a>
    </div></div>
    <div className="sp-row">{sponsors.map((s, i) => <a key={i} href={SP_LINKS[i]} target="_blank" rel="noopener" aria-label="לאתר השותף"><img loading="lazy" src={s} alt="" /></a>)}<a className="sp-ph" href={SITE + '/contact.asp'} target="_blank" rel="noopener"><b>הלוגו שלך כאן</b><em>הצטרפו כשותפים של האיגוד</em></a></div></section>;
}

/* ---------- שותפים: עמוד למשיכת ספונסרים ---------- */
const SLOT_LABEL: Record<SponsorSlotKey, string> = { results: 'תוצאות המחזור (דף הבית)', nextGame: 'המשחק הבא (דף הבית)', scorers: 'מלך השערים (עמוד הטבלאות)', videos: 'קליפים ומשחקים מלאים (עמוד ה-TV)' };
function ContactBtn({ label = 'לשיחה על שיתוף פעולה' }: { label?: string }) {
  const c = sponsorship.contact;
  return c?.email
    ? <a className="btn" href={`mailto:${c.email}?subject=${encodeURIComponent('שיתוף פעולה עם איגוד הכדוריד')}`}>{label}</a>
    : <a className="btn" href={SITE + '/contact.asp'} target="_blank" rel="noopener">{label}</a>;
}
function Partners() {
  useTitle('שותפים וחסויות');
  const c = sponsorship.contact;
  return <div className="page partners">
    <section className="pa-hero">
      <span className="kick">שותפים וחסויות</span>
      <h1 className="pt">המותג שלכם על פרק הכדוריד הישראלי</h1>
      <p>חשיפה שבועית במגרשים בכל הארץ, מליגת WINNER וליגת אתנה ועד ליגות הנוער, הנערים והילדים, מול קהל מחובר של שחקנים, משפחות ואוהדים שחיים את האיגוד לאורך העונה כולה.</p>
      <div className="hero-cta"><ContactBtn /><button type="button" className="btn ghost" onClick={() => document.getElementById('pa-where')?.scrollIntoView({ behavior: 'smooth' })}>איפה המותג מופיע</button></div>
    </section>
    {sponsorship.stats.length > 0 && <section className="sec"><SecHead t="הכדוריד במספרים" />
      <div className="pa-stats">{sponsorship.stats.map(s => <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}</div></section>}
    <section className="sec" id="pa-where"><SecHead t="איפה המותג שלכם מופיע" />
      <div className="pa-grid">
        <div className="pa-card"><h3>באתר האיגוד</h3><ul>
          {(Object.keys(SLOT_LABEL) as SponsorSlotKey[]).map(k => <li key={k}><span>{SLOT_LABEL[k]}</span>{sponsorship.slots[k] ? <em className="taken">בחסות {sponsorship.slots[k]!.name}</em> : <em>פנוי</em>}</li>)}
          <li><span>רצועת השותפים בתחתית כל עמוד</span></li>
        </ul></div>
        <div className="pa-card"><h3>במגרשים ובאירועים</h3><p>חשיפה במשחקי הליגות בכל הארץ ובאירועי האיגוד.</p></div>
        <div className="pa-card"><h3>שיתופי פעולה ייעודיים</h3><p>חסות על ליגות הנוער, הנערים והילדים, על מועדונים ועל אירועים, לפי מה שמתאים למותג שלכם.</p></div>
      </div></section>
    {sponsorship.packages.length > 0 && <section className="sec"><SecHead t="חבילות חסות" />
      <div className="pa-grid">{sponsorship.packages.map(p => <div key={p.name} className="pa-card"><h3>{p.name}</h3><ul>{p.items.map(x => <li key={x}><span>{x}</span></li>)}</ul>{p.price && <b className="pa-price">{p.price}</b>}</div>)}</div></section>}
    <section className="sec"><SecHead t="השותפים שלנו" />
      <div className="sp-row">{sponsors.map((s, i) => <a key={i} href={partners[i].url} target="_blank" rel="noopener" title={partners[i].name}><img loading="lazy" src={s} alt={partners[i].name} /></a>)}</div></section>
    <section className="sec"><div className="pa-cta">
      <h2>בואו נדבר</h2>
      {c && (c.name || c.phone || c.email) ? <p>{[c.name, c.phone, c.email].filter(Boolean).join(' · ')}</p> : <p>נשמח לבנות יחד חבילה שמתאימה לכם.</p>}
      <ContactBtn label="ליצירת קשר" />
    </div></section>
  </div>;
}

/* ---------- club social (verified from each club's / umbrella org's own site) ---------- */
type CS = { fb?: string; ig?: string; tt?: string; scope: 'club' | 'umbrella'; org: string; src: string };
const clubSocial: Record<string, CS> = {
  'קרית אונו': { fb: 'https://www.facebook.com/OnoHandball/', ig: 'https://www.instagram.com/onohandball/', tt: 'https://www.tiktok.com/@onohandball', scope: 'club', org: 'מועדון הכדוריד', src: 'https://www.onohandball.co.il/' },
  'מכבי ת"א': { fb: 'https://www.facebook.com/MTA.maccabitelaviv/', ig: 'https://www.instagram.com/maccabi_telaviv_sport', scope: 'umbrella', org: 'אגודת מכבי תל אביב (כל הענפים)', src: 'https://www.maccabi-telaviv.co.il/' },
  'ערד': { fb: 'https://www.facebook.com/arad.matnas/', ig: 'https://www.instagram.com/matnasarad/', tt: 'https://www.tiktok.com/@matnasarad1', scope: 'umbrella', org: 'מתנ"ס ערד (כל החוגים)', src: 'https://www.matnas-arad.org/page.php?id=86499&type=hug' },
  'קרית מוצקין': { fb: 'https://facebook.com/Motzkin.Sports.Association', ig: 'https://instagram.com/motzkin_sport', scope: 'umbrella', org: 'עמותת הספורט קרית מוצקין (כל הענפים)', src: 'https://motzkin-sports.org.il/our-adult-groups' },
  'הרצליה': { fb: 'https://www.facebook.com/bherzliya/', ig: 'https://www.instagram.com/beniherzliya/', tt: 'https://www.tiktok.com/@bhoherzliya', scope: 'umbrella', org: 'מועדון בני הרצליה (כל הענפים)', src: 'https://www.bho.co.il/%D7%9B%D7%93%D7%95%D7%A8%D7%99%D7%93/' },
};
type FS = { fb?: string; ig?: string; conf: 'גבוהה' | 'בינונית'; ev: string };
const found: Record<string, FS> = {
  'חולון': { fb: 'https://www.facebook.com/m.k.hwlwn.kdwryd', ig: 'https://www.instagram.com/hc_holon/', conf: 'גבוהה', ev: 'שם "מ.כ. חולון כדוריד" כמו באתר האיגוד, תיאור שמזכיר ליגה וגביע אירופה, פוסטים פעילים על משחקי ליגה' },
  'מכבי ראשל"צ': { fb: 'https://www.facebook.com/MaccabiRishon', ig: 'https://www.instagram.com/maccabi_rishon_hb/', conf: 'גבוהה', ev: 'שם "מכבי ראשון לציון כדוריד", פוסטים על גמר גביע המדינה בכדוריד, שני החשבונות פעילים' },
  'רמת השרון': { fb: 'https://www.facebook.com/asramathb', conf: 'גבוהה', ev: 'שם "א.ס SGS רמת השרון כדוריד" זהה לשם הקבוצה באתר האיגוד, פוסטים על משחקי הליגה. לא נמצא אינסטגרם' },
  'הפועל ראשל"צ': { fb: 'https://www.facebook.com/HapoelRishonLeZionHandball', ig: 'https://www.instagram.com/hapoelrishon_handball/', conf: 'גבוהה', ev: 'שם "Hapoel Rishon LeZion H.C", תיאור "אגודת כדור יד", פוסטים של מועדון הכדוריד' },
  'אשדוד': { fb: 'https://www.facebook.com/profile.php?id=100051627885973', conf: 'בינונית', ev: 'שם "מועדון כדוריד הפועל אשדוד - העמוד הרשמי", כתובת מספרית בלי שם קצר. לא נמצא אינסטגרם' },
  'רחובות': { fb: 'https://www.facebook.com/rehovot.handball', ig: 'https://www.instagram.com/maccabi.rehovot_h.b/', conf: 'בינונית', ev: 'שמות "מכבי עירוני רחובות כדוריד" ו-"Maccabi Rehovot Handball Club Updates". חשבונות קטנים ופחות פעילים, לא ברור אם רשמיים' },
  'באר שבע': { fb: 'https://www.facebook.com/handballclubbeersheva', conf: 'בינונית', ev: 'שם "ע.ר מ.כ באר שבע" דומה לשם באתר האיגוד, תיאור "קבוצת כדוריד בליגת העל". עמוד קטן. לא נמצא אינסטגרם' },
  'נס ציונה': { fb: 'https://www.facebook.com/nesszionahandball', ig: 'https://www.instagram.com/nesszionahandball/', conf: 'גבוהה', ev: 'שם "א.כ. נס ציונה Ness Ziona Handball", תיאור "העמוד הרשמי של מועדון הכדוריד", אותו שם משתמש בשתי הרשתות' },
  'מכבי ת"א': { fb: 'https://www.facebook.com/MaccabiTelAvivHandball', ig: 'https://www.instagram.com/maccabitlvhb/', conf: 'גבוהה', ev: 'שמות "Maccabi Tel Aviv Handball - Official" ו-"Maccabi Tel Aviv Handball Club Official", תיאור רשמי. נוער הכדוריד מופיע בעמוד זה' },
  'הרצליה': { ig: 'https://www.instagram.com/bnei_herzliya_h.c/', conf: 'בינונית', ev: 'שם "בני הרצליה כדוריד" כחשבון ייעודי לכדוריד, בנוסף לחשבונות האגודה' },
};
const teamKeys = Object.keys(teams);
const tIdx = (k: string) => teamKeys.indexOf(k);
const ITt = <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden><path d="M16.5 3a4.6 4.6 0 0 0 3.5 3.9v3a7.5 7.5 0 0 1-3.5-1v5.6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 1 0 1.7 2.4V3z" /></svg>;
function ClubSoc({ k, label }: { k: string; label?: boolean }) {
  const s = clubSocial[k];
  const f = found[k];
  if (!s && !f) return <span className="cs-none">לא נמצא חשבון</span>;
  const fRow = f && (f.fb || f.ig) && <span className="cs-row found">
    {f.fb && !s?.fb && <a className="fb" href={f.fb} target="_blank" rel="noopener" aria-label="פייסבוק">{IFb}{label && <span>פייסבוק</span>}</a>}
    {f.ig && !s?.ig && <a className="ig" href={f.ig} target="_blank" rel="noopener" aria-label="אינסטגרם">{IIg}{label && <span>אינסטגרם</span>}</a>}
  </span>;
  if (!s) return fRow;
  return <><span className="cs-row">
    {s.fb && <a className="fb" href={s.fb} target="_blank" rel="noopener" aria-label="פייסבוק">{IFb}{label && <span>פייסבוק</span>}</a>}
    {s.ig && <a className="ig" href={s.ig} target="_blank" rel="noopener" aria-label="אינסטגרם">{IIg}{label && <span>אינסטגרם</span>}</a>}
    {s.tt && <a className="tt" href={s.tt} target="_blank" rel="noopener" aria-label="טיקטוק">{ITt}{label && <span>טיקטוק</span>}</a>}
  </span>{fRow}</>;
}
function ClubTile({ k }: { k: string }) {
  const t = teams[k]; const s = clubSocial[k];
  return <article className="ct" style={{ ['--h' as string]: t.hue }}>
    <Link to={'/club/' + tIdx(k)} className="ct-top"><Crest name={k} size={52} /><span><b>{t.full}</b>{s && s.scope === 'club' ? <small className="club">חשבונות המועדון (מאתר המועדון)</small> : !s && !found[k] ? <small className="none">לא נמצא חשבון</small> : null}</span></Link>
    <ClubSoc k={k} />
  </article>;
}
function ClubPage({ k }: { k: string }) {
  useTitle(teams[k].full);
  const t = teams[k]; const s = clubSocial[k];
  const pos = table.findIndex(r => r[0] === k) + 1; const row = table.find(r => r[0] === k);
  const last = results.filter(r => r.h === k || r.a === k).sort((x, y) => y.r - x.r).slice(0, 3);
  const next = fixtures.filter(f => f.g === 'm' && (f.h === k || f.a === k))[0];
  return <div className="page club" style={{ ['--h' as string]: t.hue }}>
    <div className="cp-hero"><Crest name={k} size={92} /><div><span className="kick">ליגת WINNER גברים</span><h1>{t.full}</h1>{row && <p>מקום {pos} בטבלה · {row[2]} ניצחונות מתוך {row[1]} משחקים</p>}</div></div>
    <div className="cp-grid">
      <section className="cp-card"><h3>המשחק הבא</h3>{next ? <div className="cp-next"><Crest name={next.h} size={40} /><b>{sn(next.h)}</b><em>נגד</em><b>{sn(next.a)}</b><Crest name={next.a} size={40} /><small>{next.day} {next.d} · {next.t} · {next.hall}</small></div> : <p className="note">אין משחק מתוזמן באתר.</p>}</section>
      <section className="cp-card"><h3>תוצאות אחרונות</h3>{last.map((r, i) => { const hw2 = r.hs > r.as, aw2 = r.as > r.hs; return <div className="cp-res" key={i}><span>מחזור {r.r}</span><span className="cp-line"><span className={'cp-side' + (hw2 ? ' w' : '')}><b>{sn(r.h)}</b><b className="sc">{r.hs}</b></span><i className="cp-dash">-</i><span className={'cp-side' + (aw2 ? ' w' : '')}><b className="sc">{r.as}</b><b>{sn(r.a)}</b></span></span></div>; })}</section>
    </div>
    <section className="cp-soc">
      <SecHead t={t.short + ' ברשתות'} />
      {(s || found[k]) ? <>
        
        <ClubSoc k={k} label />
        {s && <a className="srcl" href={s.src} target="_blank" rel="noopener">מקור האימות: {s.src.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</a>}
      </> : <div className="scope none">לא נמצאו חשבונות ברשתות.</div>}
    </section>
  </div>;
}
function SocialWall() {
  useTitle('קירות חברתיים');
  const [f, setF] = useState('');
  const list = teamKeys.filter(k => !f || k === f).sort((x, y) => Number(!!(clubSocial[y]||found[y])) - Number(!!(clubSocial[x]||found[x])));
  return <div className="page"><h1 className="pt">קירות חברתיים</h1>
    
    <div className="chips cscroll"><button className={f ? '' : 'on'} onClick={() => setF('')}>הכל</button>{teamKeys.map(k => <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{sn(k)}</button>)}</div>
    {!f && <div className="soc-grid wallhead"><a className="soc-card fb" href={FB} target="_blank" rel="noopener"><span className="soc-ic">{IFb}</span><b>האיגוד · פייסבוק</b><em>לעמוד ‹</em></a><a className="soc-card yt" href={YT} target="_blank" rel="noopener"><span className="soc-ic">{IYt}</span><b>האיגוד · יוטיוב</b><em>לערוץ ‹</em></a></div>}
    <div className="ctg">{list.map(k => <ClubTile key={k} k={k} />)}</div>
    
  </div>;
}
const S5 = 'https://www.sport5.co.il/';
const S5SHEET = 'https://www.sport5.co.il/html/pages/broadcastsheet.html';
function Broadcast() {
  const b = fixtures.filter(f => f.tv);
  return <section className="sec bcast"><SecHead t="איפה צופים" src={S5SHEET} />
    <div className="bc-grid">
      <div className="bc-main"><span className="pill live"><i className="dot" />ערוץ הספורט</span><h3>שידורים ישירים בערוץ הספורט</h3>
        {b.length === 0 && <div className="bc-row"><b>שיבוץ השידורים למחזור הקרוב טרם פורסם</b><small>הלוח המעודכן באתר ערוץ הספורט</small></div>}{b.map((x, i) => <div className="bc-row" key={i}><Crest name={x.h} size={30} /><b>{sn(x.h)} - {sn(x.a)}</b><small>{x.day} {x.d} · {x.t} · {x.tv}</small></div>)}
        <div className="bc-act"><a className="btn ghost sm" href={S5SHEET} target="_blank" rel="noopener">לוח השידורים</a><a className="btn ghost sm" href={S5} target="_blank" rel="noopener">ספורט 5</a></div>
      </div>
      <a className="bc-side" href={TV_URL} target="_blank" rel="noopener"><img loading="lazy" src={tv} alt="" /><span className="pill pix"><i className="dot" />Pixellot</span><b>כדוריד TV · שאר המשחקים</b><small>שידור ישיר ו-VOD באתר Pixellot של האיגוד</small><em className="btn ghost sm">לערוץ ב-Pixellot</em></a>
    </div>
    
  </section>;
}

function ClubStrip() {
  return <section className="sec"><SecHead t="הקבוצות ברשתות" to="/social" l="כל הקירות" />
    <div className="cstrip">{teamKeys.map(k => <Link key={k} to={'/club/' + tIdx(k)} className={'cs' + ((clubSocial[k] || found[k]) ? ' has' : '')} style={{ ['--h' as string]: teams[k].hue }}><Crest name={k} size={54} /><small>{sn(k)}</small></Link>)}</div>
  </section>;
}
function Home() {
  const week = fixtures.filter(f => f.g === 'm' && Date.parse(f.iso) > Date.now()).slice(0, 6);
  return <>
    <Strip />
    <Hero />
    <section className="sec"><SecHead t="המחזור הקרוב" to="/matches" l="כל המשחקים" />
      <div className="mc-grid">{week.map((g, i) => <FxCard key={i} g={g} />)}</div></section>
    <section className="sec"><SecHead t="טבלת ליגת WINNER" to="/tables" l="הטבלה המלאה" src={SITE} /><Table n={6} label="טבלת ליגת WINNER" compact /></section>
    <TvBand />
    <Broadcast />
    <section className="sec"><SecHead t="חדשות" to="/news" />
      <div className="ng"><NewsCard n={news[1]} big /><NewsCard n={news[2]} /><NewsCard n={news[3]} /><NewsCard n={news[4]} /></div></section>
    <ClubStrip />
    <Social />
    <Sponsors />
  </>;
}

/* ---------- matches ---------- */
function Matches() {
  useTitle('משחקים');
  const [tab, setTab] = useState<'up' | 'res'>('up');
  const [f, setF] = useState<'all' | 'm' | 'w'>('all');
  const list = fixtures.filter(g => f === 'all' || g.g === f);
  const days = [...new Set(list.map(g => g.day + ' ' + g.d))];
  const rds = [...new Set(results.map(r => r.r))].sort((a, b) => b - a).slice(0, 3);
  const wrds = [...new Set(resultsW.map(r => r.r))].sort((a, b) => b - a).slice(0, 3);
  return <div className="page"><h1 className="pt">מרכז משחקים<SrcI url={SITE} /></h1>
    
    <div className="seg2" role="tablist"><button role="tab" aria-selected={tab === 'up'} className={tab === 'up' ? 'on' : ''} onClick={() => setTab('up')}>לוח משחקים</button><button role="tab" aria-selected={tab === 'res'} className={tab === 'res' ? 'on' : ''} onClick={() => setTab('res')}>תוצאות</button></div>
    {tab === 'up' ? <>
      <div className="chips">{([['all', 'הכל'], ['m', 'ליגת WINNER'], ['w', 'ליגת אתנה']] as const).map(([k, l]) => <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{l}</button>)}</div>
      {days.map(d => <div key={d} className="day"><h2><b>{d.split(' ')[0]}</b> {d.split(' ')[1]}</h2><div className="mc-grid">{list.filter(g => g.day + ' ' + g.d === d).map((g, i) => <FxCard key={i} g={g} />)}</div></div>)}
    </> : <>
      {rds.map(r => <div key={r} className="day"><h2>מחזור <b>{r}</b> · ליגת WINNER</h2><div className="mc-grid">{results.filter(x => x.r === r).map((x, i) => <ResCard key={i} r={x} />)}</div></div>)}
      {wrds.map(r => <div key={'w' + r} className="day"><h2>מחזור <b>{r}</b> · ליגת אתנה נשים</h2><div className="mc-grid">{resultsW.filter(x => x.r === r).map((x, i) => <ResCard key={i} r={x} w />)}</div></div>)}
    </>}
    <section className="lg-more"><SecHead t="ליגות ומסגרות נוספות באתר האיגוד" src={SITE + '/boards.asp?cYear=2027'} />
      
      <LeagueGroups />
    </section>
  </div>;
}
function LeagueGroups() {
  return <>{['בוגרים', 'נוער', 'נערים ונערות', 'ילדים וילדות', 'גביעים'].map(g => <div key={g} className="lg-g"><h3>{g}</h3><div className="lg-grid">{moreLeagues.filter(l => l.group === g).map(l => <a key={l.id} className="lg-card" href={SITE + '/league.asp?LeagueId=' + l.id + '&cYear=2027'} target="_blank" rel="noopener"><b>{l.name}</b><em>לעמוד הליגה ‹</em></a>)}</div></div>)}</>;
}
function Leagues() {
  useTitle('ליגות נוער, נערים וילדים');
  return <div className="page"><h1 className="pt">ליגות נוער, נערים וילדים</h1>
    
    <LeagueGroups /></div>;
}

function Scorers({ n, foot }: { n?: number; foot?: string }) {
  return <div className="lt-wrap"><div className="lt sc" role="table" aria-label="מלך השערים - ליגת WINNER">
    <div className="lt-r head" role="row"><span className="pos">#</span><span className="tm">שחקן</span><span className="pts">שערים</span></div>
    {scorers.slice(0, n).map((p, i) => <div key={p.name} className={'lt-r' + (i === 0 ? ' lead' : '')} role="row">
      <span className="pos">{i + 1}</span>
      <span className="tm"><Crest name={p.team} size={30} /><span className="pl"><b>{p.name}</b><small>{sn(p.team)}</small></span></span>
      <span className="pts"><CountUp to={p.goals} /></span>
    </div>)}
    {foot && <div className="lt-r head foot"><span className="tm">{foot}</span></div>}
  </div></div>;
}
function Tables() {
  useTitle('טבלאות');
  const [lg, setLg] = useState<'m' | 'w'>('m');
  return <div className="page"><h1 className="pt">טבלאות וסטטיסטיקה<SrcI url={SITE} /></h1>
    <div className="chips"><button className={lg === 'm' ? 'on' : ''} onClick={() => setLg('m')}>ליגת WINNER גברים</button><button className={lg === 'w' ? 'on' : ''} onClick={() => setLg('w')}>ליגת אתנה נשים</button></div>
    {lg === 'm' ? <>
      <p className="note">אחרי מחזור {Math.max(...results.map(r => r.r))} · עודכן {syncMeta.lastSync}</p>
      <Table label="טבלת ליגת WINNER גברים" />
      <p className="legend">נ = ניצחון · ת = תיקו · ה = הפסד</p>
      <SecHead t="מלך השערים" src={SITE + '/stats.asp'} />
      <p className="note">אחרי מחזור {scorersRound}</p>
      <Scorers />
    </> : <>
      <p className="note">אחרי מחזור {Math.max(...resultsW.map(r => r.r))} · עודכן {syncMeta.lastSync}</p>
      <Table label="טבלת ליגת אתנה נשים" rows={tableW} />
      <p className="legend">נ = ניצחון · ת = תיקו · ה = הפסד</p>
      <SecHead t="המחזור הקרוב · ליגת אתנה" to="/matches" l="לוח מלא" />
      <div className="mc-grid">{fixtures.filter(f => f.g === 'w').slice(0, 5).map((g, i) => <FxCard key={i} g={g} />)}</div>
    </>}
  </div>;
}

function NewsList() {
  useTitle('חדשות');
  return <div className="page"><h1 className="pt">חדשות<SrcI url={SITE + '/news.asp'} /></h1><div className="ng"><NewsCard n={news[0]} big />{news.slice(1).map((n, i, arr) => <NewsCard key={n.id} n={n} wide={i === arr.length - 1} />)}</div>
    <a className="btn ghost wide" href={SITE + '/archive.asp'}>ארכיון החדשות באתר האיגוד</a></div>;
}


function Clubs() {
  useTitle('מועדונים');
  return <div className="page"><h1 className="pt">מועדונים<SrcI url={SITE} /></h1>
    <SecHead t="קבוצות ליגת WINNER" to="/social" l="קירות חברתיים" /><div className="ctg">{teamKeys.map(k => <ClubTile key={k} k={k} />)}</div>
    <SecHead t="כל המועדונים" />
    <div className="cg">{clubs.map(([name, id, lg]) => <a key={id} className="cl" href={`${SITE}/teams.asp?AId=${id}`}><span className="cl-c">{lg ? <img loading="lazy" src={logos[lg]} alt="" /> : <b>{name.replace(/[^\u0590-\u05FF ]/g, '').trim().split(' ').map(w => w[0]).join('').slice(0, 2)}</b>}</span><strong>{name}</strong></a>)}</div></div>;
}

function Tv() {
  useTitle('כדוריד TV');
  const live = fixtures.find(f => f.tv) || fixtures.find(f => f.g === 'm')!;
  return <div className="tvp">
    <section className="tvp-hero">
      <div className="tvp-bg"><img src={imgs.gabriel} alt="" /></div>
      <div className="tvp-in">
        <img className="tvband-logo" src={tv} alt="ערוץ כדוריד TV" />
        <div><span className="kick"><i className="dot" />שידורים ישירים, VOD</span><h1>כדוריד TV</h1><p>צפו במשחקי הליגה בשידור ישיר ובצפייה מאוחרת.</p>
          <a className="btn" href={TV_URL}><Ico d={I.play} />לצפייה בערוץ</a></div>
      </div>
    </section>
    <div className="page">
      <SecHead t="בשידור הקרוב" />
      <a className="player" href={S5SHEET} target="_blank" rel="noopener">
        <img loading="lazy" src={imgs.round4} alt="" />
        <span className="play"><Ico d={I.play} /></span>
        <div className="player-cap">{live.tv ? <span className="pill live"><i className="dot" />{live.tv}</span> : <span className="pill sched">שיבוץ השידור בערוץ הספורט טרם פורסם</span>}<div className="pc-m"><Crest name={live.h} size={36} /><b>{sn(live.h)}</b><em>נגד</em><b>{sn(live.a)}</b><Crest name={live.a} size={36} /></div><small>{live.day} {live.d} · {live.t} · {live.hall}</small></div>
      </a>
      <SecHead t="קליפים ומשחקים מלאים" />
      
      <div className="rail reels">{ytVideos.map(v => <a key={v.id} className="vcard reel" href={'https://www.youtube.com/watch?v=' + v.id} target="_blank" rel="noopener">
        <div className="vc-img"><img loading="lazy" src={ytThumbs[v.id]} alt="" /><span className="play s"><Ico d={I.play} /></span></div>
        <b>{v.title}</b><small>{v.date}</small></a>)}</div>
      <div className="hero-cta" style={{ marginTop: 14 }}><a className="btn ghost" href={YT} target="_blank" rel="noopener">לכל הסרטונים בערוץ האיגוד</a><a className="btn ghost" href={TV_URL} target="_blank" rel="noopener">שידורים מלאים ב-Pixellot</a>{VOTE_URL && <a className="btn ghost" href={VOTE_URL} target="_blank" rel="noopener">להצבעת "משחק השבוע"</a>}</div>
    </div>
  </div>;
}


/* ================= HOME ================= */
// Order of importance: lead story + next game, latest results, upcoming games, news, tables, where to watch, Europe, sponsors.
const plural = (n: number, one: string, many: string) => n === 1 ? one : `${n} ${many}`;
function NextGame({ g }: { g?: Fx }) {
  const cd = useCountdown(g?.iso ?? '');
  if (!g) return <div className="hm-next empty"><span className="kick">המשחק הבא</span><p>לוח המחזור הבא טרם פורסם באתר האיגוד.</p><div className="hm-act"><Link className="btn" to="/matches">לוח המשחקים</Link></div></div>;
  const th = (teams[g.h] || wteams[g.h])?.hue ?? 220, ta = (teams[g.a] || wteams[g.a])?.hue ?? 0;
  return <div className="hm-next" style={{ ['--th' as string]: th, ['--ta' as string]: ta }}>
    <div className="hm-next-top"><span className="kick">המשחק הבא</span><span className={'pill p-' + g.g}>{g.league}</span></div>
    <div className="hm-vs">
      <div><Crest name={g.h} size={64} /><strong>{sn(g.h)}</strong></div>
      <div className="hm-when"><b>{g.t}</b><small>{g.day} {g.d}</small></div>
      <div><Crest name={g.a} size={64} /><strong>{sn(g.a)}</strong></div>
    </div>
    <p className="hm-meta">מחזור {g.round} · {g.hall}</p>
    {cd && <p className="hm-cd">פתיחה בעוד <b>{cd.d > 0 ? `${plural(cd.d, 'יום', 'ימים')} ו-${plural(cd.h, 'שעה', 'שעות')}` : `${plural(cd.h, 'שעה', 'שעות')} ו-${plural(cd.m, 'דקה', 'דקות')}`}</b></p>}
    {g.tv && <span className="pill live"><i className="dot" />{g.tv}</span>}
    <div className="hm-act"><Link className="btn" to="/matches">כל המשחקים</Link><a className="btn ghost" href={icsUrl(g)} download="game.ics">+ יומן</a></div>
  </div>;
}
function ResRow({ r }: { r: Res }) {
  const hw = r.hs > r.as, aw = r.as > r.hs;
  return <div className="hm-row">
    <span className={'hm-tm' + (hw ? ' w' : '')}><Crest name={r.h} size={30} /><b>{sn(r.h)}</b></span>
    <span className="hm-sc"><b className={hw ? 'w' : ''}>{r.hs}</b><i>:</i><b className={aw ? 'w' : ''}>{r.as}</b></span>
    <span className={'hm-tm away' + (aw ? ' w' : '')}><b>{sn(r.a)}</b><Crest name={r.a} size={30} /></span>
  </div>;
}
function FxRow({ g }: { g: Fx }) {
  return <div className="hm-row fx">
    <span className="hm-tm"><Crest name={g.h} size={30} /><b>{sn(g.h)}</b></span>
    <span className="hm-sc t"><b>{g.t}</b><small>{g.day} {g.d}</small></span>
    <span className="hm-tm away"><b>{sn(g.a)}</b><Crest name={g.a} size={30} /></span>
    <span className="hm-tags"><span className={'pill p-' + g.g}>{g.g === 'w' ? 'ליגת אתנה' : 'ליגת WINNER'} · מחזור {g.round}</span>{g.pp && <span className="pill pp">משחק נדחה</span>}{g.tv && <span className="pill live"><i className="dot" />{g.tv}</span>}</span>
  </div>;
}
function V1() {
  useTitle('');
  const [lg, setLg] = useState<'m' | 'w'>('m');
  const upcoming = fixtures.filter(f => Date.parse(f.iso) > Date.now());
  const lead = news[0];
  const lastM = Math.max(...results.map(r => r.r)), lastW = Math.max(...resultsW.map(r => r.r));
  const res = lg === 'm' ? results.filter(r => r.r === lastM) : resultsW.filter(r => r.r === lastW);
  return <div className="vx hm">
    <h1 className="sr-only">איגוד הכדוריד בישראל</h1>
    <section className="sec hm-top">
      <a className="hm-lead" href={lead.url}>
        <img src={nimg(lead)} alt="" />
        <div className="hm-lead-t"><span className="kick">{lead.tag}{lead.date && ' · ' + lead.date}</span><h2>{lead.title}</h2>{lead.teaser && <p>{lead.teaser}</p>}<span className="hm-more">לכתבה המלאה ‹</span></div>
      </a>
      <NextGame g={upcoming[0]} />
    </section>
    <section className="sec"><SecHead t={`תוצאות · מחזור ${lg === 'm' ? lastM : lastW}`} to="/matches" l="כל התוצאות" src={SITE} />
      <div className="chips" role="group" aria-label="ליגה">{([['m', 'ליגת WINNER'], ['w', 'ליגת אתנה']] as const).map(([k, l]) => <button key={k} aria-pressed={lg === k} className={lg === k ? 'on' : ''} onClick={() => setLg(k)}>{l}</button>)}</div>
      <div className="hm-list">{res.map((r, i) => <ResRow key={i} r={r} />)}</div>
    </section>
    <section className="sec"><SecHead t="המשחקים הקרובים" to="/matches" l="לוח המשחקים" />
      {upcoming.length ? <div className="hm-list">{upcoming.slice(0, 8).map((g, i) => <FxRow key={i} g={g} />)}</div> : <p className="note">לוח המחזור הבא טרם פורסם באתר האיגוד.</p>}
    </section>
    <section className="sec"><SecHead t="חדשות" to="/news" l="כל החדשות" src={SITE + '/news.asp'} />
      <div className="ng">{news.slice(1, 4).map(n => <NewsCard key={n.id} n={n} />)}</div></section>
    <div className="duo">
      <section className="sec"><SecHead t="ליגת WINNER" to="/tables" l="הטבלה המלאה" src={SITE} /><Table n={6} label="טבלת ליגת WINNER" compact /></section>
      <section className="sec"><SecHead t="ליגת אתנה" to="/tables" l="הטבלה המלאה" /><Table n={6} rows={tableW} label="טבלת ליגת אתנה נשים" compact /></section>
    </div>
    <Broadcast />
    <EuropeCorner />
    <Sponsors />
  </div>;
}
/* ---------- הצהרת נגישות ---------- */
function Access() {
  useTitle('הצהרת נגישות');
  return <div className="page"><h1 className="pt">הצהרת נגישות</h1>
    <div className="prose">
      <p>אתר זה הוא אבטיפוס עיצוב (פיילוט) ואינו האתר הרשמי של איגוד הכדוריד בישראל. ההצהרה מתייחסת לאתר הפיילוט בלבד.</p>
      <h3>מה בוצע</h3>
      <ul>
        <li>מבנה סמנטי: כותרות, תפריטים, טפסים ותפקודי ARIA ברכיבים אינטראקטיביים.</li>
        <li>ניווט במקלדת: כפתורים, קישורים ובוררים ניתנים לפוקוס ולהפעלה.</li>
        <li>כיבוד העדפת "צמצום תנועה" (prefers-reduced-motion) - אנימציות מושבתות אוטומטית.</li>
        <li>ניגודיות גבוהה בין טקסט לרקע וגופן קריא בגדלים גמישים.</li>
        <li>תמיכה מלאה בעברית ובכיווניות RTL.</li>
      </ul>
      <h3>מגבלות ידועות</h3>
      <ul>
        <li>בטבלאות הרחבות בעמוד הטבלאות נדרשת בנייד גלילה לצדדים.</li>
        <li>סרטונים חיצוניים (יוטיוב, Pixellot) נפתחים באתרים חיצוניים, והנגישות בהם באחריות אותם אתרים.</li>
        <li>לחלק מהסמלים והאיורים אין עדיין תיאור חלופי מלא.</li>
      </ul>
      <h3>סטטוס ההצהרה</h3>
      <p>לא בוצע באתר הפיילוט מבדק נגישות פורמלי, ואין בדף זה הצהרת תאימות לתקן כלשהו. פניות בנושא נגישות יתקבלו דרך מפעיל הפיילוט; פרטי קשר יפורסמו עם המעבר להפעלה שוטפת.</p>
      <p>עודכן: 25/10/2026.</p>
    </div></div>;
}

/* A render error in one page shows a fallback instead of blanking the whole site; keyed by route so navigating away recovers. */
class PageBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(e: unknown) { console.error(e); }
  render() {
    if (!this.state.failed) return this.props.children;
    return <div className="page"><h1 className="pt">העמוד לא נטען</h1>
      <p className="note">אירעה תקלה בהצגת העמוד. אפשר לנסות לטעון מחדש, לעבור לעמוד אחר בתפריט, או להמשיך לאתר הרשמי.</p>
      <div className="hero-cta"><button className="btn" onClick={() => location.reload()}>טעינה מחדש</button><a className="btn ghost" href={SITE}>לאתר האיגוד</a></div></div>;
  }
}

export function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reset = () => { const el = document.getElementById('root'); if (el) el.scrollTop = 0; window.scrollTo(0, 0); };
    const orig = history.pushState.bind(history);
    history.pushState = function (this: History, ...args: Parameters<History['pushState']>) { orig(...args); reset(); } as History['pushState'];
    window.addEventListener('popstate', reset);
    window.addEventListener('hashchange', reset);
    return () => { history.pushState = orig; window.removeEventListener('popstate', reset); window.removeEventListener('hashchange', reset); };
  }, []);
  return <div className="hb" dir="rtl" lang="he">

    <Header />
    <Tabs top />
    <main id="main"><PageBoundary key={pathname}><Routes>
      <Route path="/" element={<V1 />} /><Route path="/v/0" element={<Home />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/tables" element={<Tables />} />
      <Route path="/news" element={<NewsList />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/leagues" element={<Leagues />} />
      <Route path="/social" element={<SocialWall />} />
      {teamKeys.map((k, i) => <Route key={k} path={'/club/' + i} element={<ClubPage k={k} />} />)}
      <Route path="/tv" element={<Tv />} />
      <Route path="/access" element={<Access />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></PageBoundary></main>
    <footer className="foot"><div><b>איגוד הכדוריד בישראל</b><p>שטרית 6, תל אביב · 03-6495552</p><p className="foot-links"><Link to="/access">הצהרת נגישות</Link></p><small>התוצאות והטבלאות מתעדכנות מאתר האיגוד · עודכן לאחרונה {syncMeta.lastSync}</small></div></footer>
    <Tabs />
  </div>;
}


/* ---------- אירופה (עמוד הבית) ---------- */
function EuropeCorner() {
  const euRef = React.useRef<HTMLDivElement>(null);
  // each tie hides after the last date its "next" line mentions, so stale fixtures never show
  const list = europe.filter(e => Date.now() < Date.parse(e.until + 'T23:59:59+02:00'));
  if (!list.length) return null;
  return <section className="sec eu">
    <SecHead t="גביע אירופה (EHF) · המועדונים" src="https://www.eurohandball.com/" />
    <div className="eu-grid" ref={euRef}>
      {list.map((e, i) => <div className="eu-card" key={i}>
        <span className="kick">גביע אירופה · {e.gender}</span>
        <div className="eu-m"><Crest name={e.club} size={56} /><div><b>{e.club}</b><small>נגד {e.opp} ({e.oppCountry})</small></div></div>
        <div className="eu-res"><b>{e.result}</b><small>{e.note}</small></div>
        <div className="eu-meta"><span className="pill">{e.next}</span></div>
      </div>)}
    </div>
    <button type="button" className="eu-cue" onClick={() => euRef.current?.scrollBy({ left: -260, behavior: 'smooth' })}><i>‹</i> גלול לעוד</button>
  </section>;
}
