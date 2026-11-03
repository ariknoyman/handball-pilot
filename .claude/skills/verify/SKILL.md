---
name: verify
description: How to run and drive the handball pilot site to verify a change (local build, live Cloudflare site, sync job).
---

# Verifying a change to the handball pilot

## Surfaces
- **Site (local):** `npm ci && npm run build`, then `npx vite preview --port 4173 --strictPort` (run in the background) and open `http://localhost:4173/`. Routes are hash-based: `#/`, `#/matches`, `#/tables`, `#/news`, `#/clubs`, `#/leagues`, `#/tv`, `#/social`, `#/access`, `#/club/<n>`, `#/v/0` (old home). Unknown routes redirect to `#/`.
- **Site (live):** `https://handball-pilot.pages.dev/`. Cloudflare Pages deploys `main` about a minute after merge; every PR gets a "Cloudflare Pages" check with a preview.
- **Sync job:** `gh workflow run sync.yml -R ariknoyman/handball-pilot --ref main`, then `gh run watch <id> --exit-status` and read the "Sync data from handballisr.co.il" step. Its JSON summary has `changed` and `warnings`; `warnings` must be empty.
- **Sync script (local):** `PYTHONIOENCODING=utf-8 python scripts/sync.py` (no `--ci`). It needs `tzdata` on Windows; Pillow is optional. It writes `src/sync-data.json` and images, so back the file up or restore it afterwards. A second run should report `"changed": false`.

## Driving tips
- Check for a render failure: `document.querySelector('main h1')?.textContent === 'העמוד לא נטען'` means the error boundary caught a crash.
- Time-dependent UI (next game, countdown, Europe `until`): override `Date.now = () => Date.parse('<iso>')` in the page, then switch the hash away and back to re-render. No reload is needed, because those values are computed per render.
- Phone checks: use a 375x812 viewport. Look for horizontal scroll (`document.documentElement.scrollWidth > innerWidth`) and cut-off names (`el.scrollWidth > el.clientWidth`).

## Gotchas
- `main > *` has a fade-in animation, so screenshots taken right after navigation look dim. Wait ~1-2s.
- Images below the fold use `loading="lazy"`. In a hidden browser pane they may never load, so scroll them into view or set `loading='eager'` before asserting.
- After `location.hash` navigation to the same document, a stale bundle can stay loaded. Use `location.reload()` or a new `?v=` query after rebuilding.
- `TaskStop` on `npx vite ...` can leave the node process listening. Kill leftovers by command line (`*vite*` in `Win32_Process`) before reusing a port.
- Vite dedupes byte-identical images, so two different keys can share one asset URL.
