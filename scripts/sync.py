#!/usr/bin/env python3
"""
Auto-sync for the handball pilot site data layer (src/sync-data.json).

Fetches the official Israel Handball Association pages (handballisr.co.il),
parses the men's (LeagueId 11554) and women's (11558) league scoreboards and
standings plus the news index, verifies everything against table arithmetic,
and rewrites src/sync-data.json when verified new data exists.

Safety rules:
  - Never store a 0-0 "result" (the board prints 0-0 for unplayed games).
  - Score direction is verified by recomputing the full standings from all
    stored + new results and comparing to the official standings; any mismatch
    aborts the run without writes (exit 2).
  - Unknown team names abort (exit 1); names are never guessed.
  - News teasers are copied verbatim from the article's own meta description;
    nothing is paraphrased or invented.

Exit codes: 0 ok (writes only if changed) | 1 fetch/parse error | 2 verification failed.
"""
import html as htmlmod
import json
import os
import re
import sys
import urllib.request
from datetime import datetime
from zoneinfo import ZoneInfo

BASE = 'https://handballisr.co.il'
CYEAR = '2027'
LEAGUES = {'m': '11554', 'w': '11558'}
LEAGUE_NAME = {'m': 'ליגת WINNER', 'w': 'ליגת על אתנה נשים'}
TZ = ZoneInfo('Asia/Jerusalem')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(ROOT, 'src', 'sync-data.json')

# Official site name forms -> names stored in sync-data.json. Never guess: an
# official name missing here aborts the run.
NAME_M = {
    'מכבי עירוני רחובות': 'רחובות',
    'א.כ. נס-ציונה': 'נס ציונה',
    'א.ס. SGS רמת השרון': 'רמת השרון',
    'בני הרצליה': 'הרצליה',
    'הפועל אשדוד': 'אשדוד',
    'הפועל "דור" ערד': 'ערד',
    'הפועל אלטשולר שחם ראשון לציון': 'הפועל ראשל"צ',
    'הפועל קרית אונו': 'קרית אונו',
    'מכבי אבישי קרית מוצקין': 'קרית מוצקין',
    'מ.כ. באר שבע': 'באר שבע',
    'מ.כ. יובלים חולון': 'חולון',
    'מכבי ראשון לציון': 'מכבי ראשל"צ',
    'מכבי תל אביב': 'מכבי ת"א',
}
NAME_W = {
    'הפועל "דלתות פנדור" ראשון לציון': 'הפועל "דלתות פנדור" ראשל"צ',
    'מ.כ.חולון': 'מ.כ. חולון',
    'א.כ. נס ציונה': 'א.כ. נס ציונה',
    'א.ס. רמה"ש': 'א.ס. רמה"ש',
    'בנות "עיקו" הרצליה': 'בנות "עיקו" הרצליה',
    'הפועל אשדוד': 'הפועל אשדוד',
    'מכבי ארזים אהל שם ר"ג': 'מכבי ארזים אהל שם ר"ג',
    'מכבי פתח תקוה': 'מכבי פתח תקוה',
    'מכבי ראשון לציון': 'מכבי ראשון לציון',
    'מכבי תל אביב': 'מכבי תל אביב',
    'הפועל קרית אונו': 'הפועל קרית אונו',
}
NEWS_IMG_BY_TAG = {'ליגת אתנה': 'athena', 'אירופה': 'europe', 'נבחרות': 'hall', 'ליגת WINNER': 'hall', 'האיגוד': 'reports'}


def fetch(path, encoding):
    req = urllib.request.Request(BASE + path, headers={'User-Agent': 'Mozilla/5.0 (handball-pilot sync)'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode(encoding, errors='replace')


def norm_name(s):
    s = htmlmod.unescape(s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def map_name(official, mapping, ctx):
    n = norm_name(official)
    if n not in mapping:
        raise SystemExit(f'ERROR: unmapped team name {n!r} in {ctx}; aborting (names are never guessed)')
    return mapping[n]


def parse_round_options(page):
    vals = sorted({int(v) for v in re.findall(r'<option value="(\d+)"', page)})
    if not vals:
        raise SystemExit('ERROR: no round options on league page')
    return vals


def parse_games(page, gender):
    """Rows of #gamesTbl: date+day cell, deskOnly time, home link, away link, 'A-H' score (AWAY first), hall."""
    tbl = re.search(r'<table id="gamesTbl".*?</table>', page, re.S)
    if not tbl:
        raise SystemExit(f'ERROR: gamesTbl not found ({gender})')
    games = []
    for row in re.findall(r'<tr>(.*?)</tr>', tbl.group(0), re.S):
        dm = re.search(r'(\d{2}/\d{2}/\d{4}), יום ([^\']+)', row)
        if not dm:
            continue
        date_full, day_letter = dm.group(1), dm.group(2).strip()
        tm = re.search(r'<td class="deskOnly">(\d{2}:\d{2})</td>', row)
        raw = re.findall(r'<a href="team\.asp\?TId=\d+&(?:amp;)?cYear=\d+"[^>]*>([^<]+)</a>', row)
        teams = []
        for t in raw:  # each team appears twice (desktop + mobile markup); keep first occurrence of each
            t = norm_name(t)
            if t not in teams:
                teams.append(t)
        sm = re.search(r'<td style="direction:ltr;">\s*(\d+)\s*-\s*(\d+)\s*</td>', row)
        hall_m = re.findall(r'<td class="deskOnly">(.*?)</td>', row, re.S)
        if not (tm and len(teams) == 2 and sm and hall_m):
            raise SystemExit(f'ERROR: unparseable game row ({gender}): {row[:200]!r}')
        hall = norm_name(hall_m[-1])
        games.append({
            'date': date_full, 'day': day_letter + '׳', 'time': tm.group(1),
            'h': map_name(teams[0], NAME_M if gender == 'm' else NAME_W, 'game row'),
            'a': map_name(teams[1], NAME_M if gender == 'm' else NAME_W, 'game row'),
            'away_score': int(sm.group(1)), 'home_score': int(sm.group(2)),
            'hall': hall,
        })
    if not games:
        raise SystemExit(f'ERROR: no games parsed ({gender})')
    return games


def parse_table(page, gender):
    """Rows of #leagueTbl: rank, name link, P, W, D, L, 'GA-GF' (ltr), pts."""
    tbl = re.search(r'<table id="leagueTbl".*?</table>', page, re.S)
    if not tbl:
        raise SystemExit(f'ERROR: leagueTbl not found ({gender})')
    rows = []
    for row in re.findall(r'<tr[^>]*>(.*?)</tr>', tbl.group(0), re.S):
        nm = re.search(r'<td class="name">.*?<a href="team\.asp[^"]*"[^>]*>([^<]+)</a>', row, re.S)
        if not nm:
            continue
        nums = re.findall(r'<td[^>]*>\s*(\d+)\s*</td>', row)
        gfga = re.search(r'<td style="direction:ltr;">\s*(\d+)\s*-\s*(\d+)\s*</td>', row)
        if len(nums) < 6 or not gfga:
            raise SystemExit(f'ERROR: unparseable table row ({gender}): {row[:200]!r}')
        name = map_name(nm.group(1), NAME_M if gender == 'm' else NAME_W, 'table row')
        ga, gf = int(gfga.group(1)), int(gfga.group(2))
        p, w, d, l = int(nums[1]), int(nums[2]), int(nums[3]), int(nums[4])
        pts = int(nums[5])
        rows.append([name, p, w, d, l, gf, ga, pts])
    if not rows:
        raise SystemExit(f'ERROR: no table rows parsed ({gender})')
    return rows


def recompute_table(results):
    t = {}
    for g in results:
        for side, gf_key, ga_key in (('h', 'hs', 'as'), ('a', 'as', 'hs')):
            row = t.setdefault(g[side], [0, 0, 0, 0, 0, 0, 0])
            row[0] += 1
            row[4] += g[gf_key]
            row[5] += g[ga_key]
        if g['hs'] > g['as']:
            t[g['h']][1] += 1; t[g['h']][6] += 2; t[g['a']][3] += 1
        elif g['hs'] < g['as']:
            t[g['a']][1] += 1; t[g['a']][6] += 2; t[g['h']][3] += 1
        else:
            t[g['h']][2] += 1; t[g['a']][2] += 1; t[g['h']][6] += 1; t[g['a']][6] += 1
    return t


def verify_results_against_table(results, official_rows, label):
    """Recomputed standings from results must equal the official standings exactly."""
    calc = recompute_table(results)
    problems = []
    for name, p, w, d, l, gf, ga, pts in official_rows:
        c = calc.get(name)
        if c is None:
            problems.append(f'{name}: missing from results')
        elif [p, w, d, l, gf, ga, pts] != c:
            problems.append(f'{name}: official P{p} W{w} D{d} L{l} {gf}-{ga} {pts}pts != recomputed {c}')
    extra = set(calc) - {r[0] for r in official_rows}
    if extra:
        problems.append(f'results contain teams not in official table: {sorted(extra)}')
    if problems:
        msg = f'VERIFICATION FAILED ({label}):\n  ' + '\n  '.join(problems)
        print(msg, file=sys.stderr)
        sys.exit(2)


def to_res(g, rnd):
    return {'r': rnd, 'h': g['h'], 'a': g['a'], 'hs': g['home_score'], 'as': g['away_score'],
            'd': g['date'][:5], 'day': g['day'], 't': g['time'], 'hall': g['hall']}


def to_fx(g, rnd, gender, postponed):
    dt = datetime.strptime(g['date'] + ' ' + g['time'], '%d/%m/%Y %H:%M').replace(tzinfo=TZ)
    fx = {'d': g['date'][:5], 'day': g['day'], 't': g['time'], 'league': LEAGUE_NAME[gender],
          'round': str(rnd), 'hall': g['hall'], 'h': g['h'], 'a': g['a'], 'g': gender,
          'iso': dt.isoformat()}
    if postponed:
        fx['pp'] = True
    return fx


def guess_tag(text):
    if 'אתנה' in text or 'נשים' in text:
        return 'ליגת אתנה'
    if 'אירופה' in text or 'EHF' in text:
        return 'אירופה'
    if 'נבחרת' in text:
        return 'נבחרות'
    if 'ווינר' in text or 'WINNER' in text or 'מחזור' in text or 'ליגה' in text:
        return 'ליגת WINNER'
    return 'האיגוד'


def sync_news(data, summary):
    home = fetch('/default.asp', 'utf-8')
    ids = sorted({int(m) for m in re.findall(r'news\.asp\?id=(\d+)', home)}, reverse=True)
    if not ids:
        raise SystemExit('ERROR: no news ids on homepage')
    known = {int(n['id']) for n in data['news']}
    latest = max(max(known), int(data['meta']['latestNewsId']))
    for nid in ids:
        if nid <= latest or nid in known:
            continue
        art = fetch(f'/news.asp?id={nid}', 'utf-8')
        tm = re.search(r'<title>[^|]*\|[^|]*\|([^<]+)</title>', art)
        dm = re.search(r'<meta name="description" content="([^"]*)"', art, re.S)
        dt = re.search(r'תאריך:\s*(\d{2}/\d{2}/\d{4})', art)
        if not tm:
            raise SystemExit(f'ERROR: no title on news page {nid}')
        title = norm_name(tm.group(1))
        teaser = norm_name(dm.group(1)) if dm and dm.group(1).strip() else None
        tag = guess_tag(title + ' ' + (teaser or ''))
        item = {'id': str(nid), 'title': title, 'tag': tag, 'img': NEWS_IMG_BY_TAG[tag],
                'url': f'{BASE}/news.asp?id={nid}'}
        if dt:
            item['date'] = dt.group(1)
        if teaser:
            item['teaser'] = teaser
        data['news'].insert(0, item)
        summary['newNews'].append(f'{nid}: {title}')
        data['meta']['latestNewsId'] = nid
    data['news'].sort(key=lambda n: int(n['id']), reverse=True)


def sync_league(data, gender, summary):
    key_res = 'results' if gender == 'm' else 'resultsW'
    key_tbl = 'table' if gender == 'm' else 'tableW'
    # The default league view is not reliable (men's shows the next round,
    # women's showed a stale round), so every round listed in the selector is
    # fetched; this also auto-discovers newly published rounds.
    default_page = fetch(f'/league.asp?LeagueId={LEAGUES[gender]}&cYear={CYEAR}', 'utf-8')
    rounds = parse_round_options(default_page)
    official_table = parse_table(default_page, gender)
    games = {}
    for rnd in rounds:
        page = fetch(f'/league.asp?LeagueId={LEAGUES[gender]}&cYear={CYEAR}&SelectedGN={rnd}', 'utf-8')
        games[rnd] = parse_games(page, gender)
    # "Next round" = lowest round whose games are all unplayed (0-0). Games in
    # earlier rounds that are still 0-0 are postponed makeups (pp).
    next_round = None
    for rnd in rounds:
        if all(g['home_score'] == 0 and g['away_score'] == 0 for g in games[rnd]):
            next_round = rnd
            break
    if next_round is None:
        next_round = max(rounds) + 1

    stored = data[key_res]
    have = {(g['h'], g['a'], g['r']) for g in stored}
    new_results = []
    for rnd, gs in games.items():
        for g in gs:
            if g['home_score'] == 0 and g['away_score'] == 0:
                continue  # unplayed per board convention; never stored
            if (g['h'], g['a'], rnd) not in have:
                new_results.append(to_res(g, rnd))

    if new_results:
        # Verify stored + new results reproduce the official standings before writing anything.
        verify_results_against_table(stored + new_results, official_table, f'{gender} league')
        stored.extend(new_results)
        stored.sort(key=lambda g: (g['r'], g['d'], g['t']))
        for g in new_results:
            summary['newResults'].append(f"{LEAGUE_NAME[gender]} מחזור {g['r']}: {g['h']} {g['hs']}:{g['as']} {g['a']}")

    # Fixtures = 0-0 games from the next round plus postponed 0-0 games from
    # earlier rounds (replaces this gender's fixture set). Later scheduled
    # rounds are ignored until they become the next round.
    new_fx = []
    for rnd, gs in games.items():
        if rnd > next_round:
            continue
        for g in gs:
            if g['home_score'] == 0 and g['away_score'] == 0:
                new_fx.append(to_fx(g, rnd, gender, postponed=(rnd < next_round)))
    old_fx = [f for f in data['fixtures'] if f['g'] == gender]
    old_keys = {(f['h'], f['a'], f['round']) for f in old_fx}
    new_keys = {(f['h'], f['a'], f['round']) for f in new_fx}
    for k in sorted(new_keys - old_keys):
        summary['newFixtures'].append(f'{LEAGUE_NAME[gender]} מחזור {k[2]}: {k[0]} - {k[1]}')
    for k in sorted(old_keys - new_keys):
        summary['droppedFixtures'].append(f'{LEAGUE_NAME[gender]} מחזור {k[2]}: {k[0]} - {k[1]}')
    data['fixtures'] = [f for f in data['fixtures'] if f['g'] != gender] + new_fx

    if data[key_tbl] != official_table:
        summary['tableChanged'].append(LEAGUE_NAME[gender])
        data[key_tbl] = official_table


def main():
    ci = '--ci' in sys.argv
    with open(DATA_PATH, encoding='utf-8') as f:
        data = json.load(f)
    before = json.dumps(data, ensure_ascii=False, sort_keys=True)
    summary = {'newResults': [], 'newFixtures': [], 'droppedFixtures': [], 'newNews': [], 'tableChanged': []}
    sync_league(data, 'm', summary)
    sync_league(data, 'w', summary)
    sync_news(data, summary)
    changed = json.dumps(data, ensure_ascii=False, sort_keys=True) != before
    if changed:
        now = datetime.now(TZ)
        data['meta']['lastSync'] = now.strftime('%d/%m')
        with open(DATA_PATH, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=1)
            f.write('\n')
    summary['changed'] = changed
    summary['lastSync'] = data['meta']['lastSync']
    print(json.dumps(summary, ensure_ascii=False, indent=1))
    if ci and 'GITHUB_OUTPUT' in os.environ:
        with open(os.environ['GITHUB_OUTPUT'], 'a', encoding='utf-8') as f:
            f.write(f"changed={'true' if changed else 'false'}\n")
            flat = '; '.join(summary['newResults'] + summary['newFixtures'] +
                            [f'news {x}' for x in summary['newNews']] +
                            [f'table {x}' for x in summary['tableChanged']])
            f.write(f"summary={flat[:900]}\n")


if __name__ == '__main__':
    main()
