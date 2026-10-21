// =====================================================
// PROFAYCEL — Aperçu « comme un élève » (administrateur uniquement)
// Barre en haut des pages : le professeur choisit un niveau (7, 8, 9 أساسي, 1 ثانوي)
// et voit l'espace élève et les cours par niveaux comme un « تلميذ تجريبي » de ce niveau.
// Le choix est gardé dans le navigateur (localStorage « pf_apercu »).
// =====================================================
(function () {
    const NIVEAUX = ["7 أساسي", "8 أساسي", "9 أساسي", "1 ثانوي"];
    const CLE = "pf_apercu";
    const lire = () => { try { return localStorage.getItem(CLE) || ""; } catch (e) { return ""; } };
    const ecrire = v => { try { v ? localStorage.setItem(CLE, v) : localStorage.removeItem(CLE); } catch (e) { } };
    const estAdmin = u => !!u && (((u.user_metadata || {}).role === "admin") || (u.email || "").toLowerCase() === "faycel.khlifiii@gmail.com");

    // Niveau d'aperçu actif (null si pas administrateur ou pas d'aperçu)
    window.pfApercu = function (user) {
        const v = lire();
        return estAdmin(user) && NIVEAUX.includes(v) ? v : null;
    };

    const racine = location.pathname.includes("/parcours/") ? "../" : "";
    const pageEleve = /(eleve\.html|\/parcours\/(index|lecon)\.html|\/parcours\/?$)/.test(location.pathname);

    function choisir(v) {
        ecrire(v);
        if (!v) { location.href = racine + "admin.html"; return; }
        if (pageEleve) location.reload(); else location.href = racine + "eleve.html";
    }

    async function barre() {
        for (let i = 0; i < 100 && !window.supabaseClient; i++) await new Promise(r => setTimeout(r, 100));
        if (!window.supabaseClient) return;
        const { data } = await window.supabaseClient.auth.getSession();
        const user = data && data.session && data.session.user;
        if (!estAdmin(user)) return;

        const actif = window.pfApercu(user);
        const st = document.createElement("style");
        st.textContent = `
            .pf-apercu{direction:rtl;font-family:Tajawal,Arial,sans-serif;background:${actif ? "#7c3aed" : "#0f172a"};color:#fff;
                padding:8px 12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;font-size:15px;position:relative;z-index:50}
            .pf-apercu b{font-weight:800}
            .pf-apercu button,.pf-apercu a{font:inherit;font-size:14px;border:1px solid rgba(255,255,255,.45);background:transparent;color:#fff;
                border-radius:99px;padding:3px 12px;cursor:pointer;text-decoration:none}
            .pf-apercu button.on{background:#fff;color:#7c3aed;font-weight:800}
            .pf-apercu .pf-sortir{background:#fef3c7;color:#92400e;border-color:#fef3c7;font-weight:700}
            @media print{.pf-apercu{display:none}}`;
        document.head.appendChild(st);

        const div = document.createElement("div");
        div.className = "pf-apercu";
        div.innerHTML = (actif
            ? `<span>🧪 أنت ترى الموقع كـ<b>تلميذ مستوى <bdi>${actif}</bdi> (تجريبي)</b></span>`
            : `<span>👁️ معاينة الموقع كتلميذ:</span>`)
            + NIVEAUX.map(n => `<button type="button" data-n="${n}" class="${n === actif ? "on" : ""}"><bdi>${n}</bdi></button>`).join("")
            + (actif
                ? `<a href="${racine}eleve.html">🏠 فضاء التلميذ</a><a href="${racine}parcours/index.html">📚 دروسي</a><button type="button" class="pf-sortir" data-n="">✖ الخروج من المعاينة</button>`
                : "");
        div.addEventListener("click", e => {
            const b = e.target.closest("button[data-n]");
            if (b) choisir(b.dataset.n);
        });
        document.body.insertBefore(div, document.body.firstChild);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", barre);
    else barre();
})();
