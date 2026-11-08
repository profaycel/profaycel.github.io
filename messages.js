// =====================================================
// PROFAYCEL — « رسائلي » : messages personnels de l'élève (eleve.html)
// Messages de félicitations (3 premiers de la semaine), de certificat,
// ou envoyés par le professeur. Lecture seule pour l'élève.
// Au chargement : generer_mes_messages() crée (si besoin) le message de la
// semaine, puis on lit les 30 derniers messages de l'élève connecté.
// Si la table n'existe pas encore, rien ne s'affiche.
// =====================================================

(function () {

    const zone = document.getElementById("messages-zone");
    if (!zone) { return; }

    const sb = function () { return window.supabaseClient; };

    let langue = "fr";
    try { langue = localStorage.getItem("profaycel_lang") === "ar" ? "ar" : "fr"; } catch (e) { /* navigation privée */ }

    const T = {
        fr: {
            titre: "Mes messages",
            nouveaux: function (n) { return n + (n > 1 ? " nouveaux" : " nouveau"); },
            nouveau: "Nouveau",
            vide: "Pas encore de message. Continue tes cours : des messages d'encouragement t'attendent ici ! 🌟"
        },
        ar: {
            titre: "رسائلي",
            nouveaux: function (n) { return n === 1 ? "جديدة" : n + " جديدة"; },
            nouveau: "جديد",
            vide: "لا توجد رسائل بعد. تابع دروسك وستصلك هنا رسائل تشجيع! 🌟"
        }
    };

    function esc(t) {
        return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function dateTxt(iso) {
        try {
            return new Date(iso).toLocaleDateString(langue === "ar" ? "ar-TN-u-nu-latn" : "fr-FR", { day: "numeric", month: "long", year: "numeric" });
        } catch (e) {
            return "";
        }
    }

    function dessiner(messages) {

        const t = T[langue];
        let nonLus = messages.filter(function (m) { return !m.lu; }).length;

        const corps = messages.length
            ? messages.map(function (m) {
                return '<div class="msg-item' + (m.lu ? "" : " msg-nouveau") + '">' +
                    '<h3 dir="auto">' + esc(m.titre) + (m.lu ? "" : ' <span class="msg-badge">' + esc(t.nouveau) + "</span>") + "</h3>" +
                    '<p dir="auto">' + esc(m.texte) + "</p>" +
                    '<span class="msg-date">' + esc(dateTxt(m.cree_le)) + "</span>" +
                    "</div>";
            }).join("")
            : '<p class="msg-vide">' + esc(t.vide) + "</p>";

        // Icône d'enveloppe dans l'en-tête, avec pastille rouge (nombre de nouveaux messages)
        zone.innerHTML =
            '<button type="button" class="msg-icone" aria-expanded="false" aria-label="' + esc(t.titre) + '" title="' + esc(t.titre) + '">' +
            '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<rect x="3" y="5" width="18" height="14" rx="3"></rect><path d="M3.5 7.5l8.5 6 8.5-6"></path></svg>' +
            '<span class="msg-pastille"' + (nonLus ? "" : " hidden") + ">" + (nonLus > 9 ? "9+" : nonLus) + "</span>" +
            "</button>" +
            '<div class="msg-panneau" hidden>' +
            '<div class="msg-panneau-tete"><strong>' + esc(t.titre) + "</strong>" +
            '<button type="button" class="msg-fermer" aria-label="×">×</button></div>' +
            '<div class="msg-corps">' + corps + "</div>" +
            "</div>";

        const bouton = zone.querySelector(".msg-icone");
        const panneau = zone.querySelector(".msg-panneau");
        const pastille = zone.querySelector(".msg-pastille");

        function marquerLus() {
            if (!nonLus) { return; }
            nonLus = 0;
            sb().rpc("marquer_messages_lus").then(function () {
                pastille.hidden = true;
            }, function () { nonLus = messages.filter(function (m) { return !m.lu; }).length; /* on réessaiera */ });
        }

        function placer() {
            const r = bouton.getBoundingClientRect();
            panneau.style.top = Math.round(r.bottom + 10) + "px";
        }

        function fermer() {
            panneau.hidden = true;
            bouton.setAttribute("aria-expanded", "false");
        }

        function ouvrir() {
            placer();
            panneau.hidden = false;
            bouton.setAttribute("aria-expanded", "true");
            marquerLus();
        }

        bouton.addEventListener("click", function (e) {
            e.stopPropagation();
            if (panneau.hidden) { ouvrir(); } else { fermer(); }
        });
        zone.querySelector(".msg-fermer").addEventListener("click", fermer);
        panneau.addEventListener("click", function (e) { e.stopPropagation(); });
        document.addEventListener("click", function () { if (!panneau.hidden) { fermer(); } });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") { fermer(); } });
        window.addEventListener("resize", function () { if (!panneau.hidden) { placer(); } });

    }

    async function demarrer() {

        for (let i = 0; i < 100 && !sb(); i++) {
            await new Promise(function (r) { setTimeout(r, 100); });
        }
        if (!sb()) { return; }

        const reponse = await sb().auth.getSession();
        const session = reponse.data && reponse.data.session;
        if (!session) { return; }

        try {
            await sb().rpc("generer_mes_messages");
        } catch (e) { /* fonction pas encore installée : on continue */ }

        const lecture = await sb()
            .from("messages")
            .select("id,type,titre,texte,lu,cree_le")
            .eq("user_id", session.user.id)
            .order("cree_le", { ascending: false })
            .limit(30);

        if (lecture.error) { return; }

        dessiner(lecture.data || []);

    }

    demarrer();

})();
