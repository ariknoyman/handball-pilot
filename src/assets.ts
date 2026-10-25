import l_holon from './logos/holon.png';
import l_mrl from './logos/mrl.png';
import l_rsh from './logos/rsh.png';
import l_hrl from './logos/hrl.png';
import l_herz from './logos/herz.png';
import l_arad from './logos/arad.png';
import l_bsh from './logos/bsh.png';
import l_mta from './logos/mta.png';
import l_nz from './logos/nz.png';
import l_ko from './logos/ko.png';
import l_tech from './logos/tech.png';
import l_mpt from './logos/mpt.png';
import l_jer from './logos/jer.png';
import l_dim from './logos/dim.png';
import l_net from './logos/net.png';
import l_eilot from './logos/eilot.png';
import l_raanana from './logos/raanana.png';
import l_hura from './logos/hura.png';
import l_ashdod from './logos/ashdod.png';
import l_motzkin from './logos/motzkin.png';
import l_rehovot from './logos/rehovot.jpg';
import l_hpt from './logos/hpt.png';
import l_hrg from './logos/hrg.png';
import l_arazim from './logos/arazim.png';
import l_byaakov from './logos/byaakov.jpg';
import l_krayot from './logos/krayot.png';
export const logos: Record<string,string> = { holon: l_holon, mrl: l_mrl, rsh: l_rsh, hrl: l_hrl, herz: l_herz, arad: l_arad, bsh: l_bsh, mta: l_mta, nz: l_nz, ko: l_ko, tech: l_tech, mpt: l_mpt, jer: l_jer, dim: l_dim, net: l_net, eilot: l_eilot, raanana: l_raanana, hura: l_hura, ashdod: l_ashdod, motzkin: l_motzkin, rehovot: l_rehovot, hpt: l_hpt, hrg: l_hrg, arazim: l_arazim, byaakov: l_byaakov, krayot: l_krayot };
import i_round4 from './img/round4.jpg';
import i_herz from './img/herz.jpg';
import i_hall from './img/hall.jpg';
import i_ash from './img/ash.jpg';
import i_holon from './img/holon.jpg';
import i_athena from './img/athena.jpg';
import i_athena2 from './img/athena2.jpg';
import i_gabriel from './img/gabriel.jpg';
import i_podcast from './img/podcast.jpg';
import i_r6lead from './img/r6lead.jpg';
import i_motola from './img/motola.jpg';
import i_papa from './img/papa.jpg';
import i_reports from './img/reports.jpg';
import i_kaiu from './img/kaiu.jpg';
import i_todo from './img/todo.jpg';
import i_europe from './img/europe.jpg';
import i_arazim from './img/arazim.jpg';
import i_israelmap from './img/israel-map.svg';
import yt1 from './img/yt/fnN33h7bEzU.jpg';
import yt2 from './img/yt/_mhHP2hEFtQ.jpg';
import yt3 from './img/yt/hOM9kCWt6ew.jpg';
import yt4 from './img/yt/YUqY-F3-1q0.jpg';
import yt5 from './img/yt/dyGOsZ3y4EU.jpg';
import yt6 from './img/yt/zqPkfu7sRNY.jpg';
export const ytThumbs: Record<string,string> = { fnN33h7bEzU: yt1, _mhHP2hEFtQ: yt2, hOM9kCWt6ew: yt3, 'YUqY-F3-1q0': yt4, dyGOsZ3y4EU: yt5, zqPkfu7sRNY: yt6 };
export const imgs: Record<string,string> = { arazim: i_arazim, round4: i_round4, herz: i_herz, hall: i_hall, ash: i_ash, holon: i_holon, athena: i_athena, athena2: i_athena2, gabriel: i_gabriel, podcast: i_podcast, r6lead: i_r6lead, motola: i_motola, papa: i_papa, reports: i_reports, kaiu: i_kaiu, todo: i_todo, europe: i_europe };
import logo from './img/logo.png';
import tv from './img/tv.png';
import winner from './img/winner.png';
import sSheba from './img/s_sheba.png';
import sMolten from './img/s_molten.jpg';
import sHorizon from './img/s_horizon.png';
import sShiba from './img/s_shiba.png';
import sRoz from './img/s_roz.png';
import sGivova from './img/s_givova.jpg';
let logoMut = logo, tvMut = tv, winnerMut = winner, israelMapMut = i_israelmap;
export { logoMut as logo, tvMut as tv, winnerMut as winner, israelMapMut as israelMap };
export const sponsors = [sSheba, sMolten, winner, sHorizon, sShiba, sRoz, sGivova];

// The hosting layer signs asset URLs with a short-lived lease token (about 60s)
// and serves them no-store, so any image first requested after expiry fails.
// Fetch every asset once while the token is fresh and swap to blob: URLs,
// which need no server and stay valid for the whole session.
async function blobify(url: string): Promise<string> {
  const r = await fetch(url, { credentials: 'include' });
  if (!r.ok) throw new Error('asset ' + r.status);
  return URL.createObjectURL(await r.blob());
}
export function preloadAssets(): void {
  const swap = (u: string, set: (b: string) => void) => { blobify(u).then(set).catch(() => {}); };
  for (const k of Object.keys(logos)) { const u = logos[k]; swap(u, b => { logos[k] = b; }); }
  for (const k of Object.keys(imgs)) { const u = imgs[k]; swap(u, b => { imgs[k] = b; }); }
  for (const k of Object.keys(ytThumbs)) { const u = ytThumbs[k]; swap(u, b => { ytThumbs[k] = b; }); }
  swap(logo, b => { logoMut = b; });
  swap(tv, b => { tvMut = b; });
  swap(winner, b => { winnerMut = b; });
  swap(i_israelmap, b => { israelMapMut = b; });
  sponsors.forEach((u, i) => swap(u, b => { sponsors[i] = b; }));
}
