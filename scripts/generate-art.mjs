// Generates the site's illustrations as SVG files in public/images.
// Run with `npm run art`. Output is deterministic (seeded), so re-running
// produces the same files unless the drawing code changes.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT, { recursive: true });

const C = {
  sky0: "#03060D",
  sky1: "#081223",
  sky2: "#12203A",
  far: "#0C172A",
  mid: "#101E36",
  near: "#152644",
  nearer: "#1A2E50",
  ground: "#060B15",
  ink: "#02050A",
  amber: "#F6B23C",
  amberSoft: "#FFD68A",
  warm: "#FFE7B3",
  cool: "#A9C8FF",
  red: "#FF5A4E",
  green: "#3DDC84",
};

// ---------- helpers ----------

function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v) => Math.round(v * 10) / 10;
const lerp = (a, b, t) => a + (b - a) * t;
const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];

function doc(w, h, title, body, extraDefs = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title><defs>${baseDefs()}${extraDefs}</defs>${body}</svg>\n`;
}

function baseDefs() {
  return [
    `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sky0}"/><stop offset="0.62" stop-color="${C.sky1}"/><stop offset="1" stop-color="${C.sky2}"/></linearGradient>`,
    `<radialGradient id="horizon" cx="0.5" cy="1" r="0.75"><stop offset="0" stop-color="${C.amber}" stop-opacity="0.2"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.amberSoft}" stop-opacity="0.6"/><stop offset="1" stop-color="${C.amberSoft}" stop-opacity="0"/></linearGradient>`,
    `<linearGradient id="beamDown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.amberSoft}" stop-opacity="0.45"/><stop offset="1" stop-color="${C.amberSoft}" stop-opacity="0"/></linearGradient>`,
    `<linearGradient id="beamCool" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cool}" stop-opacity="0.4"/><stop offset="1" stop-color="${C.cool}" stop-opacity="0"/></linearGradient>`,
    `<radialGradient id="glow"><stop offset="0" stop-color="${C.amberSoft}" stop-opacity="0.95"/><stop offset="0.35" stop-color="${C.amber}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="glowSoft"><stop offset="0" stop-color="${C.amber}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="glowCool"><stop offset="0" stop-color="${C.cool}" stop-opacity="0.75"/><stop offset="1" stop-color="${C.cool}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="glowRed"><stop offset="0" stop-color="${C.red}" stop-opacity="0.95"/><stop offset="1" stop-color="${C.red}" stop-opacity="0"/></radialGradient>`,
    `<radialGradient id="glowGreen"><stop offset="0" stop-color="${C.green}" stop-opacity="0.8"/><stop offset="1" stop-color="${C.green}" stop-opacity="0"/></radialGradient>`,
    `<linearGradient id="fadeBottom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ink}" stop-opacity="0"/><stop offset="1" stop-color="${C.ink}" stop-opacity="0.9"/></linearGradient>`,
    `<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1628"/><stop offset="1" stop-color="${C.ink}"/></linearGradient>`,
    `<pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity="0.035"/></pattern>`,
    `<pattern id="hazard" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="28" fill="${C.amber}"/><rect x="14" width="14" height="28" fill="#141414"/></pattern>`,
  ].join("");
}

function sky(rand, w, h, { stars = 140, starBand = 0.55, horizonY = h } = {}) {
  let s = `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  for (let i = 0; i < stars; i++) {
    const big = rand() > 0.92;
    s += `<circle cx="${n(rand() * w)}" cy="${n(rand() * h * starBand)}" r="${big ? 1.3 : 0.7}" fill="#fff" opacity="${n(0.15 + rand() * 0.55)}"/>`;
  }
  s += `<ellipse cx="${w / 2}" cy="${horizonY}" rx="${w * 0.7}" ry="${h * 0.35}" fill="url(#horizon)"/>`;
  return s;
}

function moon(x, y, r) {
  return `<circle cx="${x}" cy="${y}" r="${r * 3.2}" fill="url(#glowCool)" opacity="0.35"/><circle cx="${x}" cy="${y}" r="${r}" fill="#E9EEF8"/><circle cx="${x + r * 0.42}" cy="${y - r * 0.18}" r="${r * 0.92}" fill="${C.sky0}" opacity="0.92"/>`;
}

function windowColor(rand) {
  const p = rand();
  if (p < 0.6) return C.warm;
  if (p < 0.88) return C.amber;
  return C.cool;
}

// A rectangular tower with a grid of lit windows.
function building(rand, { x, ground, w, h, fill, lit = 0.3, cell = [7, 11], win = [3.5, 5.5], pad = 5, top = null }) {
  const y = ground - h;
  let s = `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h + 1)}" fill="${fill}"/>`;
  if (top === "antenna" && h > 140) {
    const ax = x + w * (0.3 + rand() * 0.4);
    const ah = 20 + rand() * 40;
    s += `<path d="M${n(ax)} ${n(y)}V${n(y - ah)}" stroke="${fill}" stroke-width="2"/><circle cx="${n(ax)}" cy="${n(y - ah)}" r="5" fill="url(#glowRed)"/><circle cx="${n(ax)}" cy="${n(y - ah)}" r="1.4" fill="${C.red}"/>`;
  } else if (top === "step") {
    const sw = w * (0.45 + rand() * 0.3);
    const sh = 8 + rand() * 22;
    s += `<rect x="${n(x + (w - sw) / 2)}" y="${n(y - sh)}" width="${n(sw)}" height="${n(sh + 1)}" fill="${fill}"/>`;
  } else if (top === "slant") {
    s += `<path d="M${n(x)} ${n(y)}L${n(x + w)} ${n(y - 18 - rand() * 18)}V${n(y)}Z" fill="${fill}"/>`;
  }
  const [cw, ch] = cell;
  const [ww, wh] = win;
  const cols = Math.floor((w - pad * 2) / cw);
  const rows = Math.floor((h - pad * 2) / ch);
  if (cols < 1 || rows < 1) return s;
  const ox = x + (w - cols * cw) / 2 + (cw - ww) / 2;
  const oy = y + pad + (ch - wh) / 2;
  let wins = "";
  for (let r = 0; r < rows; r++) {
    const rowLit = lit * (0.25 + rand() * 1.5);
    for (let c = 0; c < cols; c++) {
      if (rand() < rowLit) {
        wins += `<rect x="${n(ox + c * cw)}" y="${n(oy + r * ch)}" width="${ww}" height="${wh}" fill="${windowColor(rand)}" opacity="${n(0.35 + rand() * 0.6)}"/>`;
      }
    }
  }
  return s + wins;
}

// A row of buildings. `shape(x)` returns 0..1 to raise buildings near a centre.
function skyline(rand, { from = -20, to, ground, minH, maxH, minW, maxW, fill, lit, cell, win, shape = () => 1, gap = 3 }) {
  let x = from;
  let s = "";
  while (x < to) {
    const bw = minW + rand() * (maxW - minW);
    const f = shape(x + bw / 2);
    const bh = minH + (maxH - minH) * f * (0.45 + rand() * 0.55);
    const top = rand() < 0.22 ? "antenna" : rand() < 0.3 ? "step" : rand() < 0.12 ? "slant" : null;
    s += building(rand, { x, ground, w: bw, h: bh, fill, lit, cell, win, top });
    x += bw + gap + rand() * 5;
  }
  return s;
}

const bell = (cx, spread, floor = 0.2) => (x) => floor + (1 - floor) * Math.exp(-(((x - cx) / spread) ** 2));

function cnTower(x, ground, H, fill) {
  const p = (f) => ground - H * f;
  const shaft = `M${n(x - H * 0.034)} ${ground}L${n(x - H * 0.011)} ${n(p(0.6))}L${n(x + H * 0.011)} ${n(p(0.6))}L${n(x + H * 0.034)} ${ground}Z`;
  const upper = `M${n(x - H * 0.009)} ${n(p(0.6))}L${n(x - H * 0.006)} ${n(p(0.81))}L${n(x + H * 0.006)} ${n(p(0.81))}L${n(x + H * 0.009)} ${n(p(0.6))}Z`;
  const pod =
    `M${n(x - H * 0.024)} ${n(p(0.6))}` +
    `L${n(x - H * 0.05)} ${n(p(0.622))}L${n(x - H * 0.052)} ${n(p(0.64))}` +
    `L${n(x - H * 0.036)} ${n(p(0.655))}L${n(x + H * 0.036)} ${n(p(0.655))}` +
    `L${n(x + H * 0.052)} ${n(p(0.64))}L${n(x + H * 0.05)} ${n(p(0.622))}L${n(x + H * 0.024)} ${n(p(0.6))}Z`;
  const deck = `M${n(x - H * 0.014)} ${n(p(0.8))}h${n(H * 0.028)}v${n(-H * 0.018)}h${n(-H * 0.028)}Z`;
  const antenna = `M${n(x - H * 0.004)} ${n(p(0.818))}L${n(x - H * 0.001)} ${n(p(1))}L${n(x + H * 0.001)} ${n(p(1))}L${n(x + H * 0.004)} ${n(p(0.818))}Z`;
  return (
    `<g fill="${fill}"><path d="${shaft}"/><path d="${upper}"/><path d="${pod}"/><path d="${deck}"/><path d="${antenna}"/></g>` +
    `<rect x="${n(x - H * 0.047)}" y="${n(p(0.636))}" width="${n(H * 0.094)}" height="${n(H * 0.006)}" fill="${C.amberSoft}" opacity="0.9"/>` +
    `<rect x="${n(x - H * 0.04)}" y="${n(p(0.648))}" width="${n(H * 0.08)}" height="${n(H * 0.003)}" fill="${C.amber}" opacity="0.6"/>` +
    `<rect x="${n(x - H * 0.011)}" y="${n(p(0.795))}" width="${n(H * 0.022)}" height="${n(H * 0.004)}" fill="${C.amberSoft}" opacity="0.8"/>` +
    `<path d="M${n(x - H * 0.02)} ${ground}L${n(x - H * 0.008)} ${n(p(0.58))}" stroke="${C.amber}" stroke-opacity="0.25" stroke-width="1.5"/>` +
    `<circle cx="${x}" cy="${n(p(1))}" r="9" fill="url(#glowRed)"/><circle cx="${x}" cy="${n(p(1))}" r="2" fill="${C.red}"/>` +
    `<circle cx="${x}" cy="${n(p(0.9))}" r="6" fill="url(#glowRed)" opacity="0.8"/>`
  );
}

function dome(x, ground, w, h, fill) {
  return `<path d="M${n(x - w / 2)} ${ground}Q${n(x - w / 2)} ${n(ground - h)} ${x} ${n(ground - h)}Q${n(x + w / 2)} ${n(ground - h)} ${n(x + w / 2)} ${ground}Z" fill="${fill}"/>` +
    `<path d="M${n(x - w * 0.42)} ${n(ground - h * 0.35)}Q${x} ${n(ground - h * 1.02)} ${n(x + w * 0.42)} ${n(ground - h * 0.35)}" fill="none" stroke="${C.cool}" stroke-opacity="0.25" stroke-width="1.2"/>`;
}

// Security guard silhouette, ~180 units tall, feet at y=0.
function guard({ x, ground, s = 1, flip = false, beam = 0, color = "#04070D", vest = C.amber, cap = true, radio = false }) {
  const parts = [
    // legs
    `<path d="M-15 0L-12 -90H-2L-1 0Z"/><path d="M1 0L2 -90H12L15 0Z"/>`,
    // boots
    `<path d="M-17 0V-6H-1V0Z"/><path d="M1 0V-6H19V0Z"/>`,
    // torso
    `<path d="M-23 -144Q-23 -152 -15 -153H15Q23 -152 23 -144L20 -86H-20Z"/>`,
    // left arm down
    `<path d="M-23 -146L-29 -98L-22 -96L-16 -136Z"/>`,
    // right arm: forward if holding a light, otherwise down
    beam
      ? `<path d="M16 -148L48 -126L44 -119L14 -134Z"/><rect x="44" y="-131" width="14" height="7" rx="2"/>`
      : `<path d="M23 -146L29 -98L22 -96L16 -136Z"/>`,
    // neck + head
    `<rect x="-5" y="-158" width="10" height="7"/><circle cx="0" cy="-168" r="12"/>`,
    cap ? `<path d="M-13 -171Q0 -186 13 -171L24 -169L13 -166L-13 -167Z"/>` : "",
    radio ? `<rect x="-21" y="-148" width="6" height="12" rx="1"/>` : "",
  ].join("");
  const bands = `<path d="M-21 -121H21M-20.5 -108H20.5" stroke="${vest}" stroke-width="3.2" opacity="0.95"/><path d="M-13 -152L-11 -124M13 -152L11 -124" stroke="${vest}" stroke-width="2.6" opacity="0.8"/>`;
  const light = beam
    ? `<path d="M58 -129L58 -125L${beam} ${n(-127 + beam * 0.5)}L${beam} ${n(-127 + beam * 0.08)}Z" fill="url(#beam)"/><circle cx="58" cy="-127" r="10" fill="url(#glow)"/>`
    : "";
  const sx = flip ? -s : s;
  // A stroked copy underneath gives a thin rim light around the outer edge only.
  const rim = `<g fill="none" stroke="${C.cool}" stroke-opacity="0.45" stroke-width="${n(3.2 / Math.max(s, 0.6))}" stroke-linejoin="round">${parts}</g>`;
  return `<g transform="translate(${n(x)} ${n(ground)}) scale(${sx} ${s})">${light}${rim}<g fill="${color}">${parts}</g>${bands}</g>`;
}

function shadow(x, ground, rx) {
  return `<ellipse cx="${n(x)}" cy="${n(ground)}" rx="${rx}" ry="${n(rx * 0.12)}" fill="#000" opacity="0.45"/>`;
}

function lampPost(x, ground, h, color = "#0A1222") {
  return `<ellipse cx="${x}" cy="${ground}" rx="${h * 0.55}" ry="${h * 0.09}" fill="url(#glowSoft)" opacity="0.9"/>` +
    `<path d="M${x} ${ground}V${ground - h}h14" stroke="${color}" stroke-width="4" fill="none"/>` +
    `<path d="M${x + 6} ${ground - h + 2}l${-8} ${h * 0.9}h${30}l${-8} ${-h * 0.9}Z" fill="url(#beamDown)" opacity="0.55"/>` +
    `<circle cx="${x + 14}" cy="${ground - h + 3}" r="22" fill="url(#glow)" opacity="0.8"/><rect x="${x + 6}" y="${ground - h}" width="16" height="5" rx="2" fill="${C.amberSoft}"/>`;
}

function tree(rand, x, ground, h, fill) {
  let s = `<rect x="${x - 3}" y="${ground - h * 0.35}" width="6" height="${h * 0.35}" fill="${fill}"/>`;
  for (let i = 0; i < 4; i++) {
    s += `<circle cx="${n(x + (rand() - 0.5) * h * 0.4)}" cy="${n(ground - h * (0.55 + rand() * 0.3))}" r="${n(h * (0.2 + rand() * 0.12))}" fill="${fill}"/>`;
  }
  return s;
}

// ---------- scenes ----------

function hero() {
  const W = 1920, H = 1080, rand = seeded(7);
  const shore = 850;
  let s = sky(rand, W, H, { stars: 220, horizonY: shore });
  s += moon(1640, 170, 26);
  s += `<rect width="${W}" height="${shore}" fill="url(#grid)" opacity="0.6"/>`;
  s += skyline(rand, { to: W + 20, ground: shore - 8, minH: 40, maxH: 300, minW: 30, maxW: 70, fill: C.far, lit: 0.12, cell: [7, 11], shape: bell(1350, 520, 0.25) });
  s += dome(1060, shore - 4, 210, 62, C.mid);
  s += cnTower(1215, shore, 720, C.mid);
  s += skyline(rand, { to: W + 20, ground: shore, minH: 60, maxH: 470, minW: 42, maxW: 96, fill: C.mid, lit: 0.22, cell: [8, 12], win: [4, 6], shape: bell(1460, 330, 0.12) });
  s += skyline(rand, { to: W + 20, ground: shore + 6, minH: 24, maxH: 120, minW: 50, maxW: 120, fill: C.near, lit: 0.18, cell: [9, 13], win: [4, 6] });
  // waterfront and lake
  s += `<rect y="${shore + 6}" width="${W}" height="${H - shore}" fill="url(#water)"/>`;
  s += `<rect y="${shore + 5}" width="${W}" height="2" fill="${C.amber}" opacity="0.35"/>`;
  for (let i = 0; i < 520; i++) {
    const x = rand() * W;
    const near = Math.exp(-(((x - 1400) / 520) ** 2));
    if (rand() > 0.25 + near * 0.75) continue;
    const y = shore + 12 + rand() ** 1.8 * (H - shore - 30);
    const len = 6 + rand() * 30 * (1 - (y - shore) / (H - shore));
    s += `<rect x="${n(x)}" y="${n(y)}" width="${n(len)}" height="1.6" fill="${rand() > 0.3 ? C.amber : C.warm}" opacity="${n(0.1 + rand() * 0.35 * near + 0.05)}"/>`;
  }
  s += `<rect x="1212" y="${shore + 10}" width="5" height="180" fill="${C.amber}" opacity="0.08"/>`;
  s += `<rect y="${H - 260}" width="${W}" height="260" fill="url(#fadeBottom)"/>`;
  return doc(W, H, "Toronto skyline at night", s);
}

function construction() {
  const W = 1200, H = 800, rand = seeded(11);
  const g = 640;
  let s = sky(rand, W, H, { stars: 90, horizonY: g });
  s += skyline(rand, { to: W + 20, ground: g, minH: 30, maxH: 180, minW: 30, maxW: 60, fill: C.far, lit: 0.1, cell: [7, 10] });
  // building under construction
  const bx = 150, bw = 360, floors = 13, fh = 34;
  let frame = "";
  for (let f = 0; f <= floors; f++) {
    const y = g - f * fh;
    const partial = f > floors - 3;
    const sw = partial ? bw * (f === floors ? 0.45 : 0.75) : bw;
    frame += `<rect x="${bx}" y="${y - 5}" width="${sw}" height="5" fill="${C.nearer}"/>`;
    if (f < floors) {
      const cols = partial ? 5 : 9;
      for (let c = 0; c < cols; c++) {
        const cx = bx + 4 + c * ((partial ? sw : bw) - 10) / (cols - 1);
        frame += `<rect x="${n(cx)}" y="${y - fh}" width="5" height="${fh}" fill="${C.near}"/>`;
      }
      if (f < floors - 4 && rand() > 0.35) {
        frame += `<rect x="${bx}" y="${y - fh + 2}" width="${bw}" height="${fh - 7}" fill="${C.mid}" opacity="0.65"/>`;
      }
      if (rand() > 0.5) {
        const lx = bx + 20 + rand() * (sw - 40);
        frame += `<circle cx="${n(lx)}" cy="${y - fh / 2}" r="16" fill="url(#glow)" opacity="0.55"/><circle cx="${n(lx)}" cy="${y - fh / 2}" r="2" fill="${C.warm}"/>`;
      }
    }
  }
  // hoist
  frame += `<rect x="${bx + bw + 4}" y="${g - floors * fh + 30}" width="16" height="${floors * fh - 30}" fill="none" stroke="${C.near}" stroke-width="2"/><rect x="${bx + bw + 6}" y="${g - 220}" width="12" height="20" fill="${C.amber}" opacity="0.7"/>`;
  s += frame;
  // tower crane
  const cx = 700, top = 120, mw = 16;
  let lattice = `M${cx} ${g}V${top}M${cx + mw} ${g}V${top}`;
  for (let y = g; y > top + mw; y -= mw) lattice += `M${cx} ${y}L${cx + mw} ${y - mw}M${cx} ${y - mw}H${cx + mw}`;
  const jl = 170, jr = 450, jy = top;
  lattice += `M${cx - jl} ${jy}H${cx + mw + jr}M${cx - jl} ${jy + 12}H${cx + mw + jr}`;
  for (let x = cx - jl; x < cx + mw + jr; x += 16) lattice += `M${x} ${jy + 12}L${x + 8} ${jy}L${x + 16} ${jy + 12}`;
  lattice += `M${cx + mw / 2} ${jy - 60}L${cx - jl + 10} ${jy}M${cx + mw / 2} ${jy - 60}L${cx + mw + jr - 60} ${jy}M${cx} ${jy}L${cx + mw / 2} ${jy - 60}L${cx + mw} ${jy}`;
  s += `<path d="${lattice}" stroke="${C.nearer}" stroke-width="2.2" fill="none"/>`;
  s += `<rect x="${cx - jl - 4}" y="${jy + 12}" width="56" height="28" fill="${C.nearer}"/>`;
  s += `<rect x="${cx + mw + 2}" y="${jy + 12}" width="26" height="20" fill="${C.nearer}"/><rect x="${cx + mw + 6}" y="${jy + 16}" width="14" height="9" fill="${C.amber}" opacity="0.8"/>`;
  const hx = cx + mw + 300;
  s += `<rect x="${hx - 8}" y="${jy + 12}" width="22" height="8" fill="${C.nearer}"/><path d="M${hx + 3} ${jy + 20}V${jy + 300}" stroke="${C.nearer}" stroke-width="1.5"/><path d="M${hx - 4} ${jy + 300}h14l-7 14z" fill="${C.nearer}"/>`;
  s += `<rect x="${hx - 60}" y="${jy + 314}" width="130" height="12" fill="${C.near}"/>`;
  s += `<circle cx="${cx + mw / 2}" cy="${jy - 62}" r="10" fill="url(#glowRed)"/><circle cx="${cx + mw / 2}" cy="${jy - 62}" r="2.2" fill="${C.red}"/>`;
  s += `<circle cx="${cx + mw + jr}" cy="${jy + 6}" r="8" fill="url(#glowRed)"/>`;
  // floodlight
  const fx = 1010;
  s += `<path d="M${fx} ${g + 20}V${g - 250}" stroke="#0B1527" stroke-width="5"/><rect x="${fx - 26}" y="${g - 262}" width="52" height="14" rx="3" fill="#0B1527"/>`;
  s += `<path d="M${fx - 24} ${g - 248}L${fx - 260} ${g + 40}H${fx + 120}L${fx + 24} ${g - 248}Z" fill="url(#beamDown)" opacity="0.8"/>`;
  s += `<circle cx="${fx}" cy="${g - 252}" r="40" fill="url(#glow)" opacity="0.85"/>`;
  // ground
  s += `<rect y="${g}" width="${W}" height="${H - g}" fill="${C.ground}"/>`;
  s += `<ellipse cx="${fx - 60}" cy="${g + 40}" rx="260" ry="34" fill="url(#glowSoft)"/>`;
  // site trailer and pallets
  s += `<rect x="790" y="${g - 64}" width="150" height="64" fill="#0E1A2E"/><rect x="806" y="${g - 48}" width="30" height="18" fill="${C.warm}" opacity="0.75"/><rect x="900" y="${g - 50}" width="22" height="50" fill="#0A1322"/>`;
  s += `<rect x="560" y="${g - 26}" width="90" height="26" fill="#0E1A2E"/><rect x="566" y="${g - 46}" width="78" height="20" fill="#0C1729"/>`;
  // hoarding fence with hazard band
  const fy = g + 10, fhh = 120;
  s += `<rect y="${fy - fhh}" width="${W}" height="${fhh + 6}" fill="#0A1120"/>`;
  for (let x = 0; x < W; x += 80) s += `<rect x="${x}" y="${fy - fhh}" width="2" height="${fhh}" fill="#16233B"/>`;
  s += `<rect y="${fy - 26}" width="${W}" height="18" fill="url(#hazard)" opacity="0.9"/>`;
  s += `<rect y="${fy - fhh - 4}" width="${W}" height="6" fill="#16233B"/>`;
  s += `<rect x="470" y="${fy - fhh + 26}" width="250" height="46" rx="4" fill="#0F1B30" stroke="${C.amber}" stroke-opacity="0.5"/><text x="595" y="${fy - fhh + 56}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="3" fill="${C.amber}">SITE PROTECTED</text>`;
  // foreground
  s += `<rect y="${fy + 6}" width="${W}" height="${H - fy}" fill="#050A14"/>`;
  s += `<ellipse cx="380" cy="${fy + 74}" rx="300" ry="40" fill="url(#glowSoft)"/>`;
  s += shadow(330, fy + 72, 60);
  s += guard({ x: 330, ground: fy + 70, s: 1.05, beam: 520, radio: true });
  s += `<rect y="${H - 120}" width="${W}" height="120" fill="url(#fadeBottom)"/>`;
  return doc(W, H, "Security guard on patrol at a Toronto construction site at night", s);
}

function residential() {
  const W = 1200, H = 800, rand = seeded(23);
  const g = 650;
  let s = sky(rand, W, H, { stars: 110, horizonY: g });
  s += moon(980, 120, 22);
  s += skyline(rand, { to: W + 20, ground: g - 40, minH: 40, maxH: 200, minW: 30, maxW: 60, fill: C.far, lit: 0.1 });
  // condo towers with balconies
  const tower = (x, w, h, fill, seed) => {
    const r = seeded(seed);
    let t = building(r, { x, ground: g, w, h, fill, lit: 0.42, cell: [12, 18], win: [8, 10], pad: 8 });
    for (let y = g - h + 18; y < g - 60; y += 18) t += `<rect x="${x - 4}" y="${y}" width="${w + 8}" height="3" fill="${C.cool}" opacity="0.12"/>`;
    t += `<rect x="${x}" y="${g - h - 14}" width="${w}" height="14" fill="${fill}"/><rect x="${x + w * 0.2}" y="${g - h - 26}" width="${w * 0.6}" height="12" fill="${fill}"/>`;
    return t;
  };
  s += tower(140, 180, 470, C.mid, 5);
  s += tower(370, 150, 380, C.near, 6);
  // trees behind townhouses
  for (let i = 0; i < 9; i++) s += tree(rand, 560 + i * 75 + rand() * 30, g, 110 + rand() * 50, "#0B1527");
  // townhouses
  for (let i = 0; i < 5; i++) {
    const x = 560 + i * 128;
    const hh = 150 + (i % 2) * 14;
    s += `<path d="M${x} ${g}V${g - hh}L${x + 64} ${g - hh - 48}L${x + 128} ${g - hh}V${g}Z" fill="${i % 2 ? C.near : C.nearer}"/>`;
    s += `<path d="M${x - 4} ${g - hh + 2}L${x + 64} ${g - hh - 52}L${x + 132} ${g - hh + 2}" fill="none" stroke="#0A1222" stroke-width="5"/>`;
    for (const [wx, wy] of [[18, 40], [76, 40], [18, 90]]) {
      const on = rand() > 0.3;
      s += `<rect x="${x + wx}" y="${g - hh + wy}" width="34" height="30" fill="${on ? C.warm : "#0C1729"}" opacity="${on ? n(0.55 + rand() * 0.4) : 1}"/>`;
    }
    s += `<rect x="${x + 80}" y="${g - 62}" width="28" height="62" fill="#0A1222"/><circle cx="${x + 72}" cy="${g - 70}" r="18" fill="url(#glow)" opacity="0.9"/><rect x="${x + 70}" y="${g - 74}" width="5" height="7" fill="${C.amberSoft}"/>`;
  }
  // condo lobby entrance
  s += `<rect x="190" y="${g - 70}" width="90" height="70" fill="${C.warm}" opacity="0.55"/><rect x="170" y="${g - 82}" width="130" height="12" fill="#0A1222"/><circle cx="235" cy="${g - 40}" r="70" fill="url(#glowSoft)"/>`;
  // street
  s += `<rect y="${g}" width="${W}" height="${H - g}" fill="${C.ground}"/>`;
  s += `<rect y="${g}" width="${W}" height="6" fill="#0F1B30"/>`;
  s += lampPost(520, g + 50, 190);
  s += `<rect y="${g + 60}" width="${W}" height="${H - g}" fill="${C.ink}"/>`;
  s += `<path d="M0 ${g + 120}H${W}" stroke="${C.amber}" stroke-opacity="0.35" stroke-width="3" stroke-dasharray="40 30"/>`;
  s += shadow(420, g + 52, 46);
  s += guard({ x: 420, ground: g + 50, s: 0.78, beam: 420, flip: false });
  s += `<rect y="${H - 140}" width="${W}" height="140" fill="url(#fadeBottom)"/>`;
  return doc(W, H, "Security guard patrolling outside a condo tower and townhouses at night", s);
}

function concierge() {
  const W = 1200, H = 800, rand = seeded(31);
  const floor = 560;
  const defs = `<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B111D"/><stop offset="1" stop-color="#1A2338"/></linearGradient>` +
    `<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A2236"/><stop offset="1" stop-color="#05080F"/></linearGradient>` +
    `<linearGradient id="steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2A3550"/><stop offset="0.5" stop-color="#3C4A6B"/><stop offset="1" stop-color="#232D44"/></linearGradient>` +
    `<linearGradient id="desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B2640"/><stop offset="1" stop-color="#0B1120"/></linearGradient>`;
  let s = `<rect width="${W}" height="${floor}" fill="url(#wall)"/>`;
  // wall panels
  for (let x = 0; x < W; x += 100) s += `<rect x="${x}" y="0" width="98" height="${floor}" fill="#fff" opacity="${n(0.01 + rand() * 0.025)}"/>`;
  // feature wall with light strip
  s += `<rect x="300" y="120" width="600" height="300" fill="#121A2C"/><rect x="300" y="120" width="600" height="4" fill="${C.amber}" opacity="0.8"/><rect x="300" y="124" width="600" height="80" fill="url(#beamDown)" opacity="0.6"/>`;
  s += `<text x="600" y="300" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" letter-spacing="14" fill="${C.amberSoft}" opacity="0.18">RESIDENCES</text>`;
  // parcel shelves
  s += `<rect x="60" y="220" width="200" height="300" fill="#0E1525"/>`;
  for (let r = 0; r < 4; r++) {
    s += `<rect x="60" y="${290 + r * 70}" width="200" height="4" fill="#26314A"/>`;
    let x = 70;
    while (x < 245) {
      const bw = 26 + rand() * 30, bh = 22 + rand() * 30;
      if (x + bw > 252) break;
      s += `<rect x="${n(x)}" y="${n(290 + r * 70 - bh)}" width="${n(bw)}" height="${n(bh)}" fill="${pick(rand, ["#6B5232", "#7D6038", "#5C4A33", "#8A6A3E"])}" opacity="0.8"/>`;
      x += bw + 4;
    }
  }
  // elevators
  for (const ex of [960, 1080]) {
    s += `<rect x="${ex - 6}" y="200" width="112" height="${floor - 200}" fill="#0A0F1A"/><rect x="${ex}" y="210" width="49" height="${floor - 210}" fill="url(#steel)"/><rect x="${ex + 51}" y="210" width="49" height="${floor - 210}" fill="url(#steel)"/>`;
    s += `<rect x="${ex + 30}" y="180" width="40" height="12" rx="2" fill="${C.amber}" opacity="0.85"/>`;
  }
  // pendant lights
  for (const px of [420, 600, 780]) {
    s += `<path d="M${px} 0V70" stroke="#2A3550" stroke-width="2"/><path d="M${px - 26} 92L${px - 14} 70H${px + 14}L${px + 26} 92Z" fill="#1E2840"/><circle cx="${px}" cy="96" r="70" fill="url(#glow)" opacity="0.55"/><ellipse cx="${px}" cy="94" rx="22" ry="4" fill="${C.warm}"/>`;
  }
  // floor with reflections
  s += `<rect y="${floor}" width="${W}" height="${H - floor}" fill="url(#floor)"/>`;
  s += `<rect x="300" y="${floor}" width="600" height="80" fill="${C.amber}" opacity="0.05"/>`;
  for (const ex of [960, 1080]) s += `<rect x="${ex}" y="${floor + 4}" width="100" height="60" fill="#3C4A6B" opacity="0.15"/>`;
  // plant
  s += `<rect x="290" y="${floor - 70}" width="50" height="70" fill="#1B2438"/>`;
  for (let i = 0; i < 9; i++) s += `<ellipse cx="${n(315 + (rand() - 0.5) * 60)}" cy="${n(floor - 90 - rand() * 120)}" rx="12" ry="34" transform="rotate(${n((rand() - 0.5) * 60)} 315 ${floor - 120})" fill="#0D1B1C"/>`;
  // concierge behind desk (upper body facing viewer)
  const gx = 600, gy = 500;
  s += `<g fill="#05080F"><path d="M${gx - 62} ${gy + 40}Q${gx - 62} ${gy - 30} ${gx - 30} ${gy - 38}H${gx + 30}Q${gx + 62} ${gy - 30} ${gx + 62} ${gy + 40}Z"/><rect x="${gx - 9}" y="${gy - 54}" width="18" height="20"/><ellipse cx="${gx}" cy="${gy - 78}" rx="22" ry="27"/></g>`;
  s += `<path d="M${gx - 12} ${gy - 38}L${gx} ${gy - 8}L${gx + 12} ${gy - 38}Z" fill="#D9DEE8" opacity="0.8"/><path d="M${gx - 3} ${gy - 32}L${gx} ${gy - 2}L${gx + 3} ${gy - 32}Z" fill="#141B2B"/>`;
  s += `<path d="M${gx + 21} ${gy - 82}q10 8 4 26" stroke="#3C4A6B" stroke-width="2" fill="none"/>`;
  s += `<rect x="${gx + 34}" y="${gy - 24}" width="16" height="6" fill="${C.amber}" opacity="0.9"/>`;
  // desk
  s += `<path d="M300 520H900Q930 520 930 548V720H270V548Q270 520 300 520Z" fill="url(#desk)"/>`;
  s += `<rect x="280" y="512" width="640" height="10" rx="5" fill="#2A3653"/>`;
  s += `<rect x="290" y="528" width="620" height="3" fill="${C.amber}" opacity="0.9"/><rect x="290" y="531" width="620" height="40" fill="url(#beamDown)" opacity="0.5"/>`;
  // monitor backs with glow on the concierge
  s += `<ellipse cx="${gx}" cy="${gy - 40}" rx="120" ry="70" fill="url(#glowCool)" opacity="0.18"/>`;
  s += `<rect x="440" y="455" width="110" height="62" rx="4" fill="#0B1120"/><rect x="650" y="455" width="110" height="62" rx="4" fill="#0B1120"/>`;
  s += `<rect y="${H - 100}" width="${W}" height="100" fill="url(#fadeBottom)"/>`;
  return doc(W, H, "Concierge security officer at the front desk of a condo lobby", s, defs);
}

function commercial() {
  const W = 1200, H = 800, rand = seeded(41);
  const g = 640;
  const defs = `<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1D3358"/><stop offset="0.55" stop-color="#0F1D36"/><stop offset="1" stop-color="#0A1426"/></linearGradient>` +
    `<linearGradient id="glass2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22395F"/><stop offset="1" stop-color="#0C172C"/></linearGradient>`;
  let s = sky(rand, W, H, { stars: 90, horizonY: g });
  s += skyline(rand, { to: W + 20, ground: g, minH: 50, maxH: 260, minW: 34, maxW: 70, fill: C.far, lit: 0.12 });
  const glassTower = (x, w, h, grad, seed) => {
    const r = seeded(seed);
    const y = g - h;
    let t = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${grad})"/>`;
    for (let fy = y + 14; fy < g; fy += 14) {
      if (r() < 0.16) t += `<rect x="${x}" y="${fy - 13}" width="${w}" height="12" fill="${C.warm}" opacity="${n(0.12 + r() * 0.25)}"/>`;
      t += `<rect x="${x}" y="${fy}" width="${w}" height="1" fill="#fff" opacity="0.05"/>`;
    }
    for (let mx = x + 12; mx < x + w; mx += 12) t += `<rect x="${mx}" y="${y}" width="1" height="${h}" fill="#fff" opacity="0.06"/>`;
    t += `<path d="M${x} ${y}L${x + w * 0.35} ${y}L${x} ${y + h * 0.4}Z" fill="#fff" opacity="0.05"/>`;
    t += `<rect x="${x - 6}" y="${y - 8}" width="${w + 12}" height="8" fill="#0B1527"/>`;
    return t;
  };
  s += glassTower(90, 220, 520, "glass", 2);
  s += glassTower(350, 160, 400, "glass2", 3);
  s += glassTower(760, 260, 470, "glass", 4);
  s += `<path d="M890 ${g - 470}V${g - 540}" stroke="#0B1527" stroke-width="3"/><circle cx="890" cy="${g - 540}" r="8" fill="url(#glowRed)"/>`;
  // entrance canopies
  s += `<rect x="130" y="${g - 80}" width="140" height="80" fill="${C.warm}" opacity="0.4"/><rect x="110" y="${g - 92}" width="180" height="12" fill="#0B1527"/>`;
  s += `<rect x="830" y="${g - 90}" width="120" height="90" fill="${C.warm}" opacity="0.45"/><rect x="810" y="${g - 102}" width="160" height="12" fill="#0B1527"/><circle cx="890" cy="${g - 40}" r="110" fill="url(#glowSoft)"/>`;
  // plaza
  s += `<rect y="${g}" width="${W}" height="${H - g}" fill="${C.ground}"/>`;
  for (let x = -200; x < W + 200; x += 70) s += `<path d="M${x} ${g}L${x - 140} ${H}" stroke="#fff" stroke-opacity="0.03"/>`;
  s += lampPost(580, g + 30, 170);
  s += lampPost(1090, g + 30, 170);
  // planters
  s += `<rect x="620" y="${g + 8}" width="110" height="30" fill="#0D1729"/><ellipse cx="675" cy="${g + 6}" rx="56" ry="14" fill="#0B1A1A"/>`;
  s += shadow(470, g + 102, 50);
  s += guard({ x: 470, ground: g + 100, s: 0.85, beam: 460, radio: true });
  s += `<rect y="${H - 140}" width="${W}" height="140" fill="url(#fadeBottom)"/>`;
  return doc(W, H, "Security guard on patrol in a downtown office plaza at night", s, defs);
}

function car(x, ground, s = 1) {
  const body =
    `<path d="M0 -26V-58Q2 -66 12 -67L78 -70L118 -104Q122 -108 130 -108H222Q232 -108 238 -101L272 -70L300 -64Q314 -61 314 -48V-28Q314 -20 306 -20H0Z" fill="#E8ECF4"/>` +
    `<path d="M128 -100H170V-72H92Z" fill="#132038"/><path d="M178 -100H226L258 -72H178Z" fill="#132038"/>` +
    `<path d="M136 -96H160L128 -76H112Z" fill="#fff" opacity="0.12"/>` +
    `<rect x="0" y="-52" width="314" height="12" fill="#0F1B30"/><rect x="0" y="-40" width="314" height="5" fill="${C.amber}"/>` +
    `<text x="196" y="-43" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" letter-spacing="2" fill="#E8ECF4">APEX PATROL</text>` +
    `<rect x="140" y="-118" width="76" height="10" rx="3" fill="#1A2440"/><rect x="144" y="-117" width="30" height="7" rx="2" fill="${C.amber}"/><rect x="182" y="-117" width="30" height="7" rx="2" fill="${C.amber}"/>` +
    `<circle cx="160" cy="-113" r="70" fill="url(#glow)" opacity="0.8"/><circle cx="198" cy="-113" r="40" fill="url(#glow)" opacity="0.6"/>` +
    `<rect x="300" y="-60" width="14" height="8" rx="2" fill="${C.warm}"/><rect x="0" y="-60" width="8" height="10" fill="${C.red}"/>` +
    `<circle cx="-4" cy="-55" r="22" fill="url(#glowRed)" opacity="0.6"/>` +
    `<path d="M314 -58L640 -96V-6L314 -46Z" fill="url(#beam)" opacity="0.7"/>`;
  const wheel = (wx) => `<circle cx="${wx}" cy="-20" r="25" fill="#05080F"/><circle cx="${wx}" cy="-20" r="12" fill="#39465F"/><circle cx="${wx}" cy="-20" r="4" fill="#0B1120"/>`;
  return `<g transform="translate(${x} ${ground}) scale(${s})">${body}${wheel(66)}${wheel(250)}</g>`;
}

function mobilePatrol() {
  const W = 1200, H = 800, rand = seeded(53);
  const g = 560;
  let s = sky(rand, W, H, { stars: 100, horizonY: g });
  s += skyline(rand, { to: W + 20, ground: g, minH: 60, maxH: 330, minW: 36, maxW: 80, fill: C.far, lit: 0.14, shape: bell(800, 400, 0.3) });
  s += skyline(rand, { to: W + 20, ground: g + 20, minH: 40, maxH: 170, minW: 60, maxW: 130, fill: C.mid, lit: 0.22, cell: [9, 13], win: [5, 7] });
  // road
  s += `<rect y="${g + 20}" width="${W}" height="${H - g}" fill="${C.ground}"/>`;
  s += `<rect y="${g + 20}" width="${W}" height="8" fill="#14213A"/>`;
  s += lampPost(160, g + 34, 200);
  s += lampPost(1040, g + 34, 200);
  s += `<rect y="${g + 46}" width="${W}" height="${H - g}" fill="#070C16"/>`;
  s += `<path d="M0 ${g + 190}H${W}" stroke="${C.amber}" stroke-opacity="0.5" stroke-width="4" stroke-dasharray="60 40"/>`;
  // motion streaks
  for (let i = 0; i < 14; i++) {
    const y = g + 70 + rand() * 120, x = rand() * 360, len = 80 + rand() * 180;
    s += `<rect x="${n(x)}" y="${n(y)}" width="${n(len)}" height="2" rx="1" fill="${C.amber}" opacity="${n(0.08 + rand() * 0.2)}"/>`;
  }
  s += `<ellipse cx="490" cy="${g + 200}" rx="290" ry="22" fill="#000" opacity="0.6"/>`;
  s += car(270, g + 202, 1.45);
  s += `<rect y="${H - 120}" width="${W}" height="120" fill="url(#fadeBottom)"/>`;
  return doc(W, H, "Marked mobile patrol vehicle driving through the city at night", s);
}

function eventScene() {
  const W = 1200, H = 800, rand = seeded(61);
  let s = `<rect width="${W}" height="${H}" fill="${C.sky0}"/>`;
  s += `<rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.5"/>`;
  // stage
  const sy = 470;
  s += `<rect x="140" y="140" width="920" height="16" fill="#151F33"/><path d="M140 156V${sy}M1060 156V${sy}" stroke="#151F33" stroke-width="14"/>`;
  for (let x = 150; x < 1060; x += 22) s += `<path d="M${x} 140L${x + 11} 156L${x + 22} 140" stroke="#26314A" stroke-width="1.5" fill="none"/>`;
  s += `<rect x="330" y="200" width="540" height="200" rx="6" fill="#0E1830"/><rect x="340" y="210" width="520" height="180" rx="4" fill="#12264A"/>`;
  s += `<circle cx="600" cy="300" r="160" fill="url(#glowCool)" opacity="0.25"/>`;
  s += `<rect x="120" y="${sy}" width="960" height="40" fill="#0B1222"/><rect x="120" y="${sy}" width="960" height="3" fill="${C.amber}" opacity="0.6"/>`;
  // spotlights
  const spots = [[200, C.amber], [340, "cool"], [480, C.amber], [720, C.amber], [860, "cool"], [1000, C.amber]];
  for (const [x, c] of spots) {
    const tilt = (rand() - 0.5) * 300;
    s += `<path d="M${x - 6} 158L${x + tilt - 90} ${H}H${x + tilt + 90}L${x + 6} 158Z" fill="url(#${c === "cool" ? "beamCool" : "beamDown"})" opacity="0.55"/>`;
    s += `<rect x="${x - 10}" y="152" width="20" height="14" rx="3" fill="#1E2840"/><circle cx="${x}" cy="166" r="20" fill="url(#${c === "cool" ? "glowCool" : "glow"})"/>`;
  }
  // guards in front of the stage, facing the crowd
  for (const gx of [250, 470, 730, 950]) s += guard({ x: gx, ground: 600, s: 0.62, cap: false, radio: true });
  // barricade
  s += `<rect y="600" width="${W}" height="10" fill="#2A3550"/><rect y="640" width="${W}" height="6" fill="#2A3550"/>`;
  for (let x = 10; x < W; x += 40) s += `<rect x="${x}" y="600" width="4" height="60" fill="#2A3550"/>`;
  // crowd, backs to the viewer
  for (let row = 0; row < 3; row++) {
    const base = 690 + row * 45;
    for (let x = -20; x < W + 20; x += 34 + rand() * 18) {
      const hgt = 70 + rand() * 30;
      const shade = row === 2 ? "#010307" : row === 1 ? "#03060C" : "#060A13";
      s += `<g fill="${shade}"><circle cx="${n(x)}" cy="${n(base - hgt)}" r="15"/><path d="M${n(x - 28)} ${H}V${n(base - hgt + 34)}Q${n(x - 26)} ${n(base - hgt + 16)} ${n(x - 8)} ${n(base - hgt + 14)}H${n(x + 8)}Q${n(x + 26)} ${n(base - hgt + 16)} ${n(x + 28)} ${n(base - hgt + 34)}V${H}Z"/></g>`;
      if (rand() > 0.88) {
        s += `<path d="M${n(x + 18)} ${n(base - hgt + 20)}L${n(x + 30)} ${n(base - hgt - 50)}" stroke="${shade}" stroke-width="9" stroke-linecap="round"/><rect x="${n(x + 24)}" y="${n(base - hgt - 72)}" width="13" height="22" rx="2" fill="${C.cool}" opacity="0.85"/>`;
      }
    }
  }
  return doc(W, H, "Event security team in front of a concert stage", s);
}

function fireWatch() {
  const W = 1200, H = 800, rand = seeded(71);
  const vx = 600;
  const L = 470, R = 730, T = 270, B = 470;
  const defs = `<linearGradient id="wallL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0A101C"/><stop offset="1" stop-color="#1C2740"/></linearGradient>` +
    `<linearGradient id="wallR" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#0A101C"/><stop offset="1" stop-color="#1C2740"/></linearGradient>` +
    `<linearGradient id="flr" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#05080F"/><stop offset="1" stop-color="#1A2338"/></linearGradient>` +
    `<radialGradient id="pool" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.amberSoft}" stop-opacity="0.5"/><stop offset="1" stop-color="${C.amberSoft}" stop-opacity="0"/></radialGradient>`;
  let s = `<rect width="${W}" height="${H}" fill="#070B14"/>`;
  s += `<path d="M0 0H${W}L${R} ${T}H${L}Z" fill="#0B111D"/>`;
  s += `<path d="M0 0L${L} ${T}V${B}L0 ${H}Z" fill="url(#wallL)"/>`;
  s += `<path d="M${W} 0L${R} ${T}V${B}L${W} ${H}Z" fill="url(#wallR)"/>`;
  s += `<path d="M0 ${H}H${W}L${R} ${B}H${L}Z" fill="url(#flr)"/>`;
  s += `<rect x="${L}" y="${T}" width="${R - L}" height="${B - T}" fill="#1E2A44"/>`;
  // end wall door + exit sign
  s += `<rect x="560" y="340" width="80" height="130" fill="#141D31"/><rect x="598" y="340" width="2" height="130" fill="#0A101C"/>`;
  s += `<circle cx="600" cy="312" r="60" fill="url(#glowGreen)" opacity="0.7"/><rect x="570" y="300" width="60" height="22" rx="2" fill="${C.green}"/><text x="600" y="317" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#06210F">EXIT</text>`;
  // ceiling lights, mostly off, emergency lights on
  for (let i = 0; i < 6; i++) {
    const t = 0.1 + i * 0.15;
    const yy = lerp(0, T, t), hw = lerp(110, 26, t), hh = lerp(26, 6, t);
    const on = i % 2 === 0;
    s += `<path d="M${n(vx - hw)} ${n(yy)}H${n(vx + hw)}L${n(vx + hw * 0.85)} ${n(yy + hh)}H${n(vx - hw * 0.85)}Z" fill="${on ? C.warm : "#1A2338"}" opacity="${on ? 0.6 : 1}"/>`;
  }
  // doors along the walls
  const wallPt = (side, t, f) => {
    const xTop = side < 0 ? lerp(0, L, t) : lerp(W, R, t);
    const yTop = lerp(0, T, t), yBot = lerp(H, B, t);
    return [xTop, lerp(yBot, yTop, f)];
  };
  for (const side of [-1, 1]) {
    for (const [t1, t2] of [[0.12, 0.3], [0.45, 0.58], [0.72, 0.8]]) {
      const a = wallPt(side, t1, 0), b = wallPt(side, t2, 0), c = wallPt(side, t2, 0.62), d = wallPt(side, t1, 0.62);
      s += `<path d="M${n(a[0])} ${n(a[1])}L${n(b[0])} ${n(b[1])}L${n(c[0])} ${n(c[1])}L${n(d[0])} ${n(d[1])}Z" fill="#0D1424" stroke="#26314A" stroke-width="2"/>`;
    }
  }
  // fire extinguisher on the right wall
  const [ex, ey] = wallPt(1, 0.38, 0.34);
  s += `<rect x="${n(ex - 10)}" y="${n(ey - 50)}" width="20" height="52" rx="6" fill="#C8352B"/><rect x="${n(ex - 6)}" y="${n(ey - 60)}" width="12" height="10" fill="#222"/><path d="M${n(ex + 6)} ${n(ey - 56)}q16 6 12 30" stroke="#222" stroke-width="3" fill="none"/>`;
  // strobe on the left wall
  const [sx, sy] = wallPt(-1, 0.36, 0.78);
  s += `<circle cx="${n(sx)}" cy="${n(sy)}" r="70" fill="url(#glowRed)" opacity="0.55"/><rect x="${n(sx - 12)}" y="${n(sy - 10)}" width="24" height="20" rx="3" fill="${C.red}"/>`;
  // light pool and beam from the guard
  s += `<ellipse cx="600" cy="520" rx="210" ry="46" fill="url(#pool)"/>`;
  s += `<path d="M640 590L470 520H760Z" fill="${C.amberSoft}" opacity="0.08"/>`;
  s += `<ellipse cx="560" cy="742" rx="80" ry="12" fill="#000" opacity="0.5"/>`;
  // guard seen from behind
  s += guard({ x: 560, ground: 740, s: 1.55, radio: true });
  s += `<circle cx="640" cy="590" r="26" fill="url(#glow)"/>`;
  // clipboard log hint
  s += `<rect x="${W - 210}" y="${H - 150}" width="150" height="100" rx="8" fill="#0F1A2E" opacity="0.92" stroke="${C.amber}" stroke-opacity="0.5"/>`;
  for (let i = 0; i < 4; i++) s += `<rect x="${W - 192}" y="${H - 130 + i * 20}" width="${n(70 + rand() * 40)}" height="5" rx="2" fill="#3C4A6B"/><circle cx="${W - 80}" cy="${H - 127 + i * 20}" r="5" fill="${C.amber}" opacity="${i < 3 ? 0.9 : 0.25}"/>`;
  return doc(W, H, "Fire watch guard patrolling a building corridor", s, defs);
}

function lossPrevention() {
  const W = 1200, H = 800, rand = seeded(83);
  const g = 640;
  const defs = `<linearGradient id="inside" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7B3" stop-opacity="0.85"/><stop offset="1" stop-color="#F6B23C" stop-opacity="0.55"/></linearGradient>` +
    `<linearGradient id="brick" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1424"/><stop offset="1" stop-color="#151D31"/></linearGradient>`;
  let s = sky(rand, W, H, { stars: 50, starBand: 0.15 });
  s += `<rect y="40" width="${W}" height="${g - 40}" fill="url(#brick)"/>`;
  for (let y = 60; y < 240; y += 60) for (let x = 40; x < W; x += 140) s += `<rect x="${x}" y="${y}" width="80" height="36" fill="${rand() > 0.6 ? C.warm : "#0A1020"}" opacity="${rand() > 0.6 ? 0.4 : 1}"/>`;
  // sign
  s += `<rect x="300" y="250" width="600" height="70" rx="4" fill="#0A0F1C"/><text x="600" y="298" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" letter-spacing="16" fill="${C.amberSoft}">MARKET</text><rect x="300" y="320" width="600" height="60" fill="url(#beamDown)" opacity="0.5"/>`;
  // shop windows
  const win = (x, w) => {
    let t = `<rect x="${x}" y="350" width="${w}" height="${g - 350}" fill="url(#inside)"/>`;
    for (let sy = 400; sy < g - 20; sy += 60) {
      t += `<rect x="${x + 10}" y="${sy}" width="${w - 20}" height="5" fill="#8A6A3E" opacity="0.6"/>`;
      for (let px = x + 16; px < x + w - 26; px += 14 + rand() * 10) t += `<rect x="${n(px)}" y="${n(sy - 14 - rand() * 14)}" width="10" height="${n(14 + rand() * 12)}" fill="${pick(rand, ["#B9502F", "#3F6E8C", "#7A8B3D", "#9C7A3B", "#5B4C7A"])}" opacity="0.55"/>`;
    }
    t += `<rect x="${x}" y="350" width="${w}" height="${g - 350}" fill="none" stroke="#0A0F1C" stroke-width="10"/>`;
    return t;
  };
  s += win(60, 400);
  s += win(740, 400);
  // shoppers inside
  for (const [px, ps] of [[180, 0.55], [320, 0.5], [900, 0.52], [1050, 0.56]]) s += `<g transform="translate(${px} ${g - 8}) scale(${ps})" fill="#2B2116" opacity="0.65"><circle cx="0" cy="-160" r="14"/><path d="M-22 -142Q-22 -148 -14 -148H14Q22 -148 22 -142L20 0H-20Z"/></g>`;
  // entrance with EAS gates
  s += `<rect x="460" y="350" width="280" height="${g - 350}" fill="url(#inside)" opacity="0.9"/><rect x="460" y="350" width="280" height="${g - 350}" fill="none" stroke="#0A0F1C" stroke-width="10"/><rect x="597" y="350" width="6" height="${g - 350}" fill="#0A0F1C"/>`;
  for (const ex of [500, 690]) s += `<rect x="${ex}" y="${g - 150}" width="12" height="150" rx="4" fill="#E9EEF8" opacity="0.9"/><rect x="${ex - 8}" y="${g - 150}" width="28" height="150" fill="url(#glowCool)" opacity="0.5"/>`;
  // guard backlit at the entrance
  s += guard({ x: 600, ground: g, s: 1.05, radio: true });
  // sidewalk
  s += `<rect y="${g}" width="${W}" height="${H - g}" fill="${C.ground}"/>`;
  s += `<rect x="460" y="${g}" width="280" height="${H - g}" fill="${C.amber}" opacity="0.08"/>`;
  s += `<rect x="60" y="${g}" width="400" height="60" fill="${C.amber}" opacity="0.05"/><rect x="740" y="${g}" width="400" height="60" fill="${C.amber}" opacity="0.05"/>`;
  s += `<rect y="${H - 90}" width="${W}" height="90" fill="url(#fadeBottom)"/>`;
  return doc(W, H, "Loss prevention officer at the entrance of a retail store", s, defs);
}

function remoteMonitoring() {
  const W = 1200, H = 800, rand = seeded(97);
  const defs = `<linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#122A44"/><stop offset="1" stop-color="#081626"/></linearGradient>`;
  let s = `<rect width="${W}" height="${H}" fill="#04070D"/>`;
  s += `<rect width="${W}" height="${H}" fill="url(#grid)"/>`;
  // wall of monitors
  const cols = 4, rows = 3, mw = 250, mh = 150, gx = 16, ox = (W - (cols * mw + (cols - 1) * gx)) / 2, oy = 60;
  s += `<rect x="${ox - 20}" y="${oy - 20}" width="${cols * mw + (cols - 1) * gx + 40}" height="${rows * mh + (rows - 1) * gx + 40}" rx="8" fill="#0A101C"/>`;
  s += `<ellipse cx="600" cy="300" rx="560" ry="260" fill="url(#glowCool)" opacity="0.12"/>`;
  let cam = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ox + c * (mw + gx), y = oy + r * (mh + gx);
      s += `<rect x="${x}" y="${y}" width="${mw}" height="${mh}" rx="3" fill="url(#screen)"/>`;
      // a simple feed: horizon, buildings, fence posts
      const hz = y + mh * (0.55 + rand() * 0.2);
      s += `<rect x="${x}" y="${n(hz)}" width="${mw}" height="${n(y + mh - hz)}" fill="#0B1E33"/>`;
      let bx = x + 6;
      while (bx < x + mw - 20) {
        const bw = 20 + rand() * 40, bh = 20 + rand() * (hz - y - 30);
        if (bx + bw > x + mw - 6) break;
        s += `<rect x="${n(bx)}" y="${n(hz - bh)}" width="${n(bw)}" height="${n(bh)}" fill="#163250" opacity="0.9"/>`;
        bx += bw + 6 + rand() * 20;
      }
      if (rand() > 0.5) for (let fx = x + 8; fx < x + mw; fx += 18) s += `<rect x="${fx}" y="${n(hz + 10)}" width="2" height="22" fill="#2B4A6E"/>`;
      s += `<rect x="${x + 8}" y="${y + 8}" width="64" height="14" rx="2" fill="#000" opacity="0.45"/><text x="${x + 14}" y="${y + 19}" font-family="Consolas, Menlo, monospace" font-size="10" fill="#BFD3EE">CAM ${String(cam).padStart(2, "0")}</text>`;
      s += `<circle cx="${x + mw - 14}" cy="${y + 15}" r="4" fill="${C.red}" opacity="${n(0.6 + rand() * 0.4)}"/>`;
      // the alert feed
      if (r === 1 && c === 2) {
        const px = x + 150, py = hz + 24;
        s += `<g transform="translate(${px} ${n(py)}) scale(0.32)" fill="#9FB6D6">${guardBody()}</g>`;
        s += `<rect x="${px - 18}" y="${n(py - 64)}" width="36" height="70" fill="none" stroke="${C.amber}" stroke-width="2"/><rect x="${px - 18}" y="${n(py - 78)}" width="58" height="14" fill="${C.amber}"/><text x="${px - 14}" y="${n(py - 67)}" font-family="Consolas, Menlo, monospace" font-size="10" font-weight="700" fill="#1A1100">MOTION</text>`;
        s += `<rect x="${x - 3}" y="${y - 3}" width="${mw + 6}" height="${mh + 6}" rx="5" fill="none" stroke="${C.amber}" stroke-width="3"/>`;
      }
      cam++;
    }
  }
  // desk and operator
  s += `<path d="M0 640Q600 560 1200 640V800H0Z" fill="#0B1222"/><path d="M0 640Q600 560 1200 640" stroke="${C.cool}" stroke-opacity="0.3" stroke-width="2" fill="none"/>`;
  s += `<rect x="470" y="600" width="260" height="22" rx="4" fill="#141E33"/>`;
  for (let i = 0; i < 12; i++) s += `<rect x="${480 + i * 20}" y="604" width="16" height="6" rx="1" fill="#26324D"/>`;
  s += `<g fill="#010306"><path d="M470 800Q470 640 540 622H660Q730 640 730 800Z"/><ellipse cx="600" cy="565" rx="44" ry="52"/></g>`;
  s += `<path d="M552 560Q552 505 600 505Q648 505 648 560" stroke="#26324D" stroke-width="7" fill="none"/><rect x="540" y="550" width="16" height="30" rx="5" fill="#26324D"/><path d="M548 580q0 30 30 34" stroke="#26324D" stroke-width="3" fill="none"/>`;
  s += `<path d="M560 520Q600 505 640 520" stroke="${C.cool}" stroke-opacity="0.35" stroke-width="2" fill="none"/>`;
  return doc(W, H, "Operator watching live camera feeds in a monitoring centre", s, defs);
}

function guardBody() {
  return `<path d="M-15 0L-12 -90H-2L-1 0Z"/><path d="M1 0L2 -90H12L15 0Z"/><path d="M-23 -144Q-23 -152 -15 -153H15Q23 -152 23 -144L20 -86H-20Z"/><path d="M-23 -146L-29 -98L-22 -96L-16 -136Z"/><path d="M23 -146L29 -98L22 -96L16 -136Z"/><rect x="-5" y="-158" width="10" height="7"/><circle cx="0" cy="-168" r="12"/>`;
}

function team() {
  const W = 1200, H = 800, rand = seeded(109);
  const g = 640;
  let s = sky(rand, W, H, { stars: 120, horizonY: g });
  s += skyline(rand, { to: W + 20, ground: g - 30, minH: 40, maxH: 260, minW: 30, maxW: 70, fill: C.far, lit: 0.12, shape: bell(700, 360, 0.3) });
  s += cnTower(860, g - 30, 470, C.far);
  s += skyline(rand, { to: W + 20, ground: g, minH: 30, maxH: 150, minW: 50, maxW: 110, fill: C.mid, lit: 0.18, cell: [9, 13], win: [5, 7] });
  s += `<rect y="${g}" width="${W}" height="${H - g}" fill="${C.ground}"/>`;
  s += `<ellipse cx="600" cy="${g + 70}" rx="480" ry="60" fill="url(#glowSoft)"/>`;
  for (const [x, sc, rd] of [[420, 1.32, false], [600, 1.5, true], [780, 1.32, false]]) {
    s += shadow(x, g + 132, 80 * sc);
    s += guard({ x, ground: g + 130, s: sc, radio: rd });
  }
  s += `<rect y="${H - 120}" width="${W}" height="120" fill="url(#fadeBottom)"/>`;
  return doc(W, H, "Three uniformed security guards in front of the Toronto skyline", s);
}

const scenes = {
  "hero-skyline.svg": hero,
  "construction-security.svg": construction,
  "residential-security.svg": residential,
  "concierge-security.svg": concierge,
  "commercial-security.svg": commercial,
  "mobile-patrol.svg": mobilePatrol,
  "event-security.svg": eventScene,
  "fire-watch.svg": fireWatch,
  "loss-prevention.svg": lossPrevention,
  "remote-monitoring.svg": remoteMonitoring,
  "team.svg": team,
};

for (const [file, draw] of Object.entries(scenes)) {
  const svg = draw();
  writeFileSync(join(OUT, file), svg);
  console.log(`${file.padEnd(28)} ${(svg.length / 1024).toFixed(0)} KB`);
}
