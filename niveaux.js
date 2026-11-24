// =====================================================
// PROFAYCEL — Comptes « famille » à plusieurs niveaux (24/11/2026)
// Pour les comptes inscrits dans la liste blanche `prive.niveaux_multiples` (ex. un parent avec
// un enfant en 7 أساسي et un autre en 8 أساسي sur le même compte) : une barre en haut des pages
// élève permet de passer d'un niveau à l'autre. Pour tous les autres comptes : rien ne s'affiche.
// Le changement se fait côté base par la fonction `changer_niveau(niveau)` (refuse tout niveau
// qui n'est pas dans la liste du compte) ; le reste du site lit toujours `eleves.classe`.
// =====================================================
(function () {
    async function barre() {
        for (let i = 0; i < 100 && !window.supabaseClient; i++) await new Promise(r => setTimeout(r, 100));
        const sb = window.supabaseClient;
        if (!sb) return;
        const { data: s } = await sb.auth.getSession();
        if (!s || !s.session) return;

        const { data, error } = await sb.rpc("mes_niveaux");
        if (error || !data || !Array.isArray(data.niveaux) || data.niveaux.length < 2) return;
        const actuel = data.actuel || "";

        const racine = location.pathname.includes("/parcours/") ? "../" : "";
        const st = document.createElement("style");
        st.textContent = `
            .pf-niveaux{direction:rtl;font-family:Tajawal,Arial,sans-serif;background:#1d4ed8;color:#fff;padding:10px 12px;
                display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;font-size:16px;position:relative;z-index:50}
            .pf-niveaux b{font-weight:800}
            .pf-niveaux button{font:inherit;font-weight:700;border:2px solid rgba(255,255,255,.6);background:transparent;color:#fff;
                border-radius:99px;padding:5px 16px;cursor:pointer}
            .pf-niveaux button.on{background:#fff;color:#1d4ed8;border-color:#fff}
            .pf-niveaux button:disabled{opacity:.6;cursor:wait}
            @media print{.pf-niveaux{display:none}}`;
        document.head.appendChild(st);

        const div = document.createElement("div");
        div.className = "pf-niveaux";
        div.innerHTML = `<b>📚 اختر المستوى:</b>`
            + data.niveaux.map(n => `<button type="button" data-n="${n}" class="${n === actuel ? "on" : ""}"><bdi>${n}</bdi></button>`).join("");
        div.addEventListener("click", async e => {
            const b = e.target.closest("button[data-n]");
            if (!b || b.dataset.n === actuel) return;
            div.querySelectorAll("button").forEach(x => { x.disabled = true; });
            const { error: err } = await sb.rpc("changer_niveau", { p_niveau: b.dataset.n });
            if (err) {
                div.querySelectorAll("button").forEach(x => { x.disabled = false; });
                alert("تعذّر تغيير المستوى. حاول مرّة أخرى.");
                return;
            }
            // On revient à l'espace élève du nouveau niveau (page propre, sans état de l'ancien niveau)
            if (/\/parcours\//.test(location.pathname)) location.href = racine + "eleve.html";
            else location.reload();
        });
        document.body.insertBefore(div, document.body.firstChild);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", barre);
    else barre();
})();
