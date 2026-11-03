# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Pilot (design prototype) of a site for the Israel Handball Association, built with Vite + React + TypeScript. It is not the official site: content and photos come from handballisr.co.il for pilot review only. It is deployed on Cloudflare Pages at `handball-pilot.pages.dev`. The UI is Hebrew and RTL (`<html lang="he" dir="rtl">`).

## Commands

```
npm install
npm run dev        # Vite dev server
npm run build      # production build to dist/
npm run preview    # serve the built dist/
python scripts/sync.py   # pull latest results/tables/news from the official site into src/sync-data.json
```

There is no lint or test setup. `npm run build` is the only check, and CI runs it after every data sync. Vite doesn't type-check, and `tsconfig.json` has `strict: false`.

## Architecture

- **`src/App.tsx`**: all pages and components live in this one file (header, home, matches, tables, news, clubs, TV, accessibility statement), plus the route table in `App()`. The `/` route renders `V1`, the current home page design. `/v/0` is the older `Home`.
- **Routing**: `@instinct/files` is a stand-in for the original hosting platform's router helpers. `vite.config.ts` aliases it to `src/files-shim.tsx`, which re-exports react-router's `HashRouter` as `FileRouter`. Routes are hash-based (`#/matches`) so the built site also works from `file://`. `main.tsx` decodes a URL-encoded hash before the router mounts.
- **Data layer** has two sources:
  - `src/sync-data.json` is machine-maintained by `scripts/sync.py`. It holds `meta`, men's `results`/`table`, women's `resultsW`/`tableW`, `fixtures`, `news`, men's top `scorers` (`{round, list}`) and the latest YouTube `videos`. Edit it by hand only when doing a manual data update, and keep the same shape.
  - `src/data.ts` loads that JSON and adds the hand-curated data: team metadata (`teams`/`wteams`: short name → full name, logo key, hue), clubs, Europe ties and other leagues. Team names in the JSON must match the keys of `teams`/`wteams`. Each Europe tie has an `until` date (the last date its "next" text mentions) and hides itself after it; updating Europe results is still manual.
- **Assets** (`src/assets.ts`): logos and images are imported explicitly and exposed as key → URL maps (`logos`, `imgs`, `ytThumbs`). News images and video thumbnails use `import.meta.glob` (`./img/news/*`, `./img/yt/*.jpg`), keyed by the article or video id in the filename. `App.tsx`'s `nimg()` prefers an article's own image (`newsImgs[id]`) and falls back to the curated `imgs[n.img]`. Images load on demand (`loading="lazy"` below the fold); photos are kept at most 1280px wide and logos 320px.

## Sync from the official site

`.github/workflows/sync.yml` runs `scripts/sync.py --ci` every 8 hours (and on manual dispatch). When data changed, it runs `npm ci && npm run build` and commits as `handball-sync-bot` with the message `Auto-sync from official association site: …`. Expect these bot commits on `main`, and pull before working.

The rules `sync.py` follows, which any change to it must keep:
- It parses the men's league (LeagueId 11554) and women's league (11558), `cYear=2027`, by fetching every round in the selector. The board prints scores away-first, and a `0-0` means the game hasn't been played, so it is never stored as a result.
- Before writing, it recomputes the standings from all stored and new results and compares them to the official table. Any mismatch aborts with exit 2 and writes nothing.
- Official team names map through `NAME_M`/`NAME_W`. An unmapped name aborts with exit 1, and names are never guessed. A renamed or new team needs a mapping entry there plus a `teams`/`wteams` entry in `data.ts`.
- News titles and teasers are copied verbatim from the article page. Each new article's `mainImage` is downloaded to `src/img/news/<id>.<ext>` and shrunk to max 1280px wide (Pillow, installed by the workflow).
- Top scorers (`stats.asp`, team names mapped through `NAME_STATS`) and YouTube videos (channel feed; thumbnails saved to `src/img/yt/<id>.jpg`) are best effort: on any problem they keep the stored data and add a `warnings` entry instead of aborting.
- With `--ci`, the script `git add`s `src/img/news` and `src/img/yt` itself, because the workflow stages only `sync-data.json`.

## Pilot-only safeguards

Keep these while the site is a pilot: `noindex, nofollow` in `index.html`, the `X-Robots-Tag` header in `public/_headers`, `Disallow: /` in `public/robots.txt`, and the pilot banner in `Header()` linking to the official site. `public/_redirects` is the Cloudflare Pages SPA fallback. The OG image is served from the GitHub raw URL of `public/og-image.jpg`.
