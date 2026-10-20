// =====================================================
// PROFAYCEL — Certificat de réussite (affichage + impression + QR de vérification)
//   renderCertificat(c) → HTML ; c = { numero, nom_complet|nom, titre, niveau, score, total, etoiles, etoiles_max, delivre_le }
//   monterCertificat(el, c) : affiche, met à l'échelle et génère le QR code
// =====================================================

const CERT_URL = "https://profaycel.github.io/parcours/certificat.html?n=";
const MOIS_AR = ["جانفي","فيفري","مارس","أفريل","ماي","جوان","جويلية","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

function dateCert(iso) {
    const d = new Date(iso);
    return d.getDate() + " " + MOIS_AR[d.getMonth()] + " " + d.getFullYear();
}

function echapper(t) {
    return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
}

// Sceau circulaire (texte sur un cercle)
function sceauSVG(annee) {
    return `<svg viewBox="0 0 140 140" class="cert-sceau" aria-hidden="true" direction="ltr" style="direction:ltr">
      <defs><path id="cercleSceau" d="M70,70 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"/></defs>
      <circle cx="70" cy="70" r="66" fill="#fff7e0" stroke="#b8860b" stroke-width="3"/>
      <circle cx="70" cy="70" r="60" fill="none" stroke="#b8860b" stroke-width="1" stroke-dasharray="2 3"/>
      <circle cx="70" cy="70" r="38" fill="none" stroke="#b8860b" stroke-width="1.5"/>
      <text font-family="Tajawal, Arial" font-size="12.5" font-weight="800" fill="#8a6408" letter-spacing="2.2" direction="ltr" text-anchor="start">
        <textPath href="#cercleSceau" startOffset="0">PROFAYCEL ★ FAYCEL KHLIFI ★ ${annee} ★</textPath></text>
      <text x="70" y="64" text-anchor="middle" font-size="26">🎓</text>
      <text x="70" y="90" text-anchor="middle" font-family="Tajawal, Arial" font-size="11" font-weight="800" fill="#8a6408">مُعتمَدة</text>
    </svg>`;
}

// Signature : prénom et nom en écriture « رقعة » + paraphe
function signatureHTML() {
    return `<div class="cert-signature">
      <div class="cert-sig-trace">فيصل خليفي</div>
      <svg viewBox="0 0 220 34" class="cert-paraphe" aria-hidden="true">
        <path d="M6,22 C40,6 70,30 104,16 S168,4 214,20" fill="none" stroke="#1e3a8a" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M150,26 C165,30 185,30 200,24" fill="none" stroke="#1e3a8a" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
      <div class="cert-sig-nom">الأستاذ فيصل خليفي</div>
    </div>`;
}

function renderCertificat(c) {
    const nom = echapper(c.nom_complet || c.nom);
    const annee = new Date(c.delivre_le).getFullYear();
    const stats = (c.score != null && c.total)
        ? `<div class="cert-stats"><span>نتائج الامتحانات: <b class="ltr">${c.score} / ${c.total}</b></span>${c.etoiles != null ? `<span>النجوم: <b class="ltr">${c.etoiles}${c.etoiles_max ? " / " + c.etoiles_max : ""}</b> ⭐</span>` : ""}</div>`
        : "";
    return `<div class="cert-cadre"><div class="cert" dir="rtl">
      <div class="cert-coin tl"></div><div class="cert-coin tr"></div><div class="cert-coin bl"></div><div class="cert-coin br"></div>
      <div class="cert-entete">
        <div class="cert-logo">Profaycel</div>
        <div class="cert-prof">الأستاذ فيصل خليفي</div>
        <div class="cert-site">منصّة تعليميّة · profaycel.github.io</div>
      </div>
      <h1 class="cert-titre">شهادة نجاح</h1>
      <div class="cert-sous">Certificat de réussite</div>
      <p class="cert-texte">تشهد منصّة <b>Profaycel</b> أنّ التلميذ(ة)</p>
      <div class="cert-nom">${nom}</div>
      <p class="cert-texte">قد أتمّ(ت) بنجاح جميع دروس</p>
      <div class="cert-lecon">« ${echapper(c.titre)} »</div>
      <p class="cert-texte petit">رياضيات${c.niveau ? " · <bdi>" + echapper(c.niveau) + "</bdi>" : ""}${c.detail ? " · " + echapper(c.detail) : ""}</p>
      ${stats}
      <div class="cert-bas">
        <div class="cert-col">
          <div class="cert-qr" data-qr="${CERT_URL + encodeURIComponent(c.numero)}"></div>
          <div class="cert-num">رقم الشهادة<br><b class="ltr">${echapper(c.numero)}</b></div>
        </div>
        <div class="cert-col">${sceauSVG(annee)}<div class="cert-date">حُرّرت في ${dateCert(c.delivre_le)}</div></div>
        <div class="cert-col">${signatureHTML()}</div>
      </div>
    </div></div>`;
}

// Affiche le certificat dans el, l'adapte à la largeur de l'écran, et génère le QR code
function monterCertificat(el, c) {
    el.innerHTML = `<div class="cert-echelle">${renderCertificat(c)}</div>`;
    const ech = el.querySelector(".cert-echelle"), cadre = el.querySelector(".cert-cadre");
    function ajuster() {
        const s = Math.min(1, el.clientWidth / 1000);
        cadre.style.transform = "scale(" + s + ")";
        ech.style.height = (707 * s) + "px";
    }
    ajuster();
    window.addEventListener("resize", ajuster);
    const qr = el.querySelector(".cert-qr");
    if (qr && window.QRCode) {
        new QRCode(qr, { text: qr.dataset.qr, width: 92, height: 92, colorDark: "#1e3a8a", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
    }
}
