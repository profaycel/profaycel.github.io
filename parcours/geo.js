// ============================================================
// geo.js — رسوم هندسيّة (SVG) لدروس الهندسة
//   repere({...})  : معيّن متعامد بشبكة ونقاط
//   para({...})    : مستقيمان متوازيان وقاطع مع زوايا ملوّنة
//   fig({...})     : شكل هندسي حرّ (نقاط، قطع، مضلّعات، دوائر، زوايا)
// ============================================================
const COUL = { rouge:"#dc2626", bleu:"#2563eb", vert:"#16a34a", or:"#d97706", gris:"#64748b", noir:"#0f172a", violet:"#7c3aed" };
const col = c => COUL[c] || c || COUL.noir;
const svg = (w, h, inner, maxw) => `<svg class="fig" viewBox="0 0 ${w} ${h}" width="${w}" style="max-width:${maxw || w}px" xmlns="http://www.w3.org/2000/svg" font-family="Tajawal, Arial, sans-serif">${inner}</svg>`;
const txt = (x, y, t, o = {}) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${o.fs || 15}" fill="${col(o.c)}" text-anchor="${o.anchor || "middle"}" dominant-baseline="middle" font-weight="${o.fw || 700}" ${o.italic ? 'font-style="italic"' : ""}>${t}</text>`;
const ligne = (x1, y1, x2, y2, o = {}) => `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col(o.c)}" stroke-width="${o.w || 2}" ${o.dash ? 'stroke-dasharray="5 4"' : ""} stroke-linecap="round"/>`;
const croix = (x, y, c) => ligne(x - 4, y - 4, x + 4, y + 4, { c, w: 2.2 }) + ligne(x - 4, y + 4, x + 4, y - 4, { c, w: 2.2 });

// قوس زاوية: مركز (cx,cy) بإحداثيّات SVG، زوايا a1→a2 بالدرجات (اتّجاه رياضي، عكس عقارب الساعة)
function arc(cx, cy, r, a1, a2, o = {}) {
  while (a2 < a1) a2 += 360;
  const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)];
  const [x1, y1] = p(a1), [x2, y2] = p(a2), large = (a2 - a1) > 180 ? 1 : 0;
  let s = `<path d="M${cx.toFixed(1)},${cy.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 0 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${col(o.c)}" fill-opacity="${o.op ?? 0.22}" stroke="none"/>`;
  s += `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 0 ${x2.toFixed(1)},${y2.toFixed(1)}" fill="none" stroke="${col(o.c)}" stroke-width="2.2"/>`;
  if (o.t) { const m = (a1 + a2) / 2, R = r + (o.dt || 15); s += txt(cx + R * Math.cos(m * Math.PI / 180), cy - R * Math.sin(m * Math.PI / 180), o.t, { c: o.c, fs: 13 }); }
  return s;
}

// ---------------- معيّن متعامد ----------------
// o = { x:[-4,5], y:[-3,4], u:30, pts:[{n:"A", x:4, y:2, c:"rouge", proj:true}], segs:[{a:[x,y], b:[x,y], c, dash}], poly:[[[x,y],...], c] }
function repere(o) {
  const [x0, x1] = o.x, [y0, y1] = o.y, u = o.u || 30, m = 14;
  const X = x => m + (x - x0) * u, Y = y => m + (y1 - y) * u;
  const W = 2 * m + (x1 - x0) * u, H = 2 * m + (y1 - y0) * u;
  let s = `<rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="#fff"/>`;
  for (let x = x0; x <= x1; x++) s += ligne(X(x), Y(y1), X(x), Y(y0), { c: "#e2e8f0", w: 1 });
  for (let y = y0; y <= y1; y++) s += ligne(X(x0), Y(y), X(x1), Y(y), { c: "#e2e8f0", w: 1 });
  const ax = o.axes !== false;
  if (ax && y0 <= 0 && y1 >= 0) s += ligne(X(x0), Y(0), X(x1), Y(0), { c: "noir", w: 1.6 });
  if (ax && x0 <= 0 && x1 >= 0) s += ligne(X(0), Y(y0), X(0), Y(y1), { c: "noir", w: 1.6 });
  for (let x = x0; x <= x1; x++) if (ax && x !== 0 && y0 <= 0 && y1 >= 0) s += ligne(X(x), Y(0) - 3, X(x), Y(0) + 3, { c: "noir", w: 1.4 }) + txt(X(x), Y(0) + 12, String(x).replace("-", "−"), { fs: 11, fw: 500, c: "gris" });
  for (let y = y0; y <= y1; y++) if (ax && y !== 0 && x0 <= 0 && x1 >= 0) s += ligne(X(0) - 3, Y(y), X(0) + 3, Y(y), { c: "noir", w: 1.4 }) + txt(X(0) - 9, Y(y), String(y).replace("-", "−"), { fs: 11, fw: 500, c: "gris", anchor: "end" });
  if (ax && x0 <= 0 && y0 <= 0) s += txt(X(0) - 9, Y(0) + 12, "O", { fs: 13, italic: true, anchor: "end" });
  (o.poly || []).forEach(([pts, c]) => s += `<polygon points="${pts.map(p => X(p[0]) + "," + Y(p[1])).join(" ")}" fill="${col(c)}" fill-opacity="0.12" stroke="${col(c)}" stroke-width="2"/>`);
  (o.segs || []).forEach(g => s += ligne(X(g.a[0]), Y(g.a[1]), X(g.b[0]), Y(g.b[1]), { c: g.c || "bleu", dash: g.dash, w: 2 }));
  (o.pts || []).forEach(p => {
    if (p.proj) s += ligne(X(p.x), Y(p.y), X(p.x), Y(0), { c: "gris", dash: true, w: 1.3 }) + ligne(X(p.x), Y(p.y), X(0), Y(p.y), { c: "gris", dash: true, w: 1.3 });
    s += croix(X(p.x), Y(p.y), p.c || "rouge");
    const dx = p.dx ?? 11, dy = p.dy ?? -11;
    s += txt(X(p.x) + dx, Y(p.y) + dy, p.n, { c: p.c || "rouge", fs: 15, italic: true });
  });
  return svg(W, H, s, o.max || 340);
}

// ---------------- مستقيمان متوازيان وقاطع ----------------
// المناطق حول كلّ نقطة تقاطع (A فوق، B تحت): 1 = يمين/أعلى ، 2 = أعلى/يسار ، 3 = يسار/أسفل ، 4 = أسفل/يمين
// o = { theta:60, marks:[{at:"A", reg:3, c:"rouge", t:"65°"}], par:true, noms:true }
function para(o) {
  const th = o.theta || 60, W = 320, H = 210, yA = 65, yB = 150, t = Math.tan(th * Math.PI / 180);
  const xA = 160 + 42.5 / t, xB = 160 - 42.5 / t;
  const ux = Math.cos(th * Math.PI / 180), uy = Math.sin(th * Math.PI / 180);
  let s = `<rect x="0" y="0" width="${W}" height="${H}" rx="10" fill="#fff"/>`;
  s += ligne(20, yA, W - 20, yA, { w: 2.2 }) + ligne(20, yB, W - 20, yB, { w: 2.2 });
  s += ligne(xB - 55 * ux, yB + 55 * uy, xA + 55 * ux, yA - 55 * uy, { w: 2.2, c: "gris" });
  if (o.par !== false) [yA, yB].forEach(y => s += `<path d="M44,${y - 6} L52,${y} L44,${y + 6} M52,${y - 6} L60,${y} L52,${y + 6}" fill="none" stroke="${COUL.noir}" stroke-width="1.8"/>`);
  const regs = { 1: [0, th], 2: [th, 180], 3: [180, 180 + th], 4: [180 + th, 360] };
  (o.marks || []).forEach(k => {
    const [cx, cy] = k.at === "A" ? [xA, yA] : [xB, yB], [a1, a2] = regs[k.reg];
    s += arc(cx, cy, (a2 - a1) > 100 ? 17 : 22, a1, a2, { c: k.c || "rouge", t: k.t });
  });
  if (o.noms !== false) s += txt(xA - 12, yA - 14, "A", { italic: true }) + txt(xB + 13, yB + 15, "B", { italic: true });
  if (o.lettres) Object.entries(o.lettres).forEach(([k, l]) => {
    const pos = { gA: [26, yA - 12], dA: [W - 26, yA - 12], gB: [26, yB - 12], dB: [W - 26, yB - 12],
      hT: [xA + 55 * ux + 8, yA - 55 * uy + 4], bT: [xB - 55 * ux - 8, yB + 55 * uy - 4] }[k];
    s += txt(pos[0], pos[1], l, { italic: true, fw: 500, c: "gris" });
  });
  return svg(W, H, s, 320);
}

// ---------------- شكل حرّ ----------------
// o = { w, h, P:{A:[x,y],...}, poly:[["A","B","C"], c], segs:[["A","B", c, dash]], cercles:[[cx,cy,r,c]],
//       angles:[["B","A","C", c, "50°"]], noms:true, lab:{A:[dx,dy]} }
function fig(o) {
  const P = o.P || {};
  let s = `<rect x="0" y="0" width="${o.w}" height="${o.h}" rx="10" fill="#fff"/>`;
  (o.cercles || []).forEach(([cx, cy, r, c]) => s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col(c || "bleu")}" stroke-width="2"/>`);
  (o.polys || []).forEach(([ns, c]) => s += `<polygon points="${ns.map(n => P[n].join(",")).join(" ")}" fill="${col(c || "bleu")}" fill-opacity="0.08" stroke="${col(c || "noir")}" stroke-width="2.2" stroke-linejoin="round"/>`);
  (o.segs || []).forEach(([a, b, c, dash]) => s += ligne(P[a][0], P[a][1], P[b][0], P[b][1], { c: c || "noir", dash, w: 2.2 }));
  (o.angles || []).forEach(([a, v, b, c, t]) => {
    const [vx, vy] = P[v], ang = n => (Math.atan2(vy - P[n][1], P[n][0] - vx) * 180 / Math.PI + 360) % 360;
    let a1 = ang(a), a2 = ang(b); if (((a2 - a1 + 360) % 360) > 180) [a1, a2] = [a2, a1];
    s += arc(vx, vy, 20, a1, a2, { c: c || "rouge", t });
  });
  const ns = Object.keys(P), gx = ns.reduce((t, n) => t + P[n][0], 0) / ns.length, gy = ns.reduce((t, n) => t + P[n][1], 0) / ns.length;
  ns.forEach(n => {
    if (o.cachés && o.cachés.includes(n)) return;
    const [x, y] = P[n]; s += `<circle cx="${x}" cy="${y}" r="3" fill="${COUL.noir}"/>`;
    let [dx, dy] = (o.lab && o.lab[n]) || [x - gx, y - gy]; const d = Math.hypot(dx, dy) || 1;
    if (!(o.lab && o.lab[n])) { dx = 15 * dx / d; dy = 15 * dy / d; }
    s += txt(x + dx, y + dy, n, { italic: true });
  });
  (o.textes || []).forEach(([x, y, t, c]) => s += txt(x, y, t, { c, fs: 13 }));
  return svg(o.w, o.h, s, o.max || o.w);
}
