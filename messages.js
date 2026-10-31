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
        const nonLus = messages.filter(function (m) { return !m.lu; }).length;

        const corps = messages.length
            ? messages.map(function (m) {
                return '<div class="msg-item' + (m.lu ? "" : " msg-nouveau") + '">' +
                    '<h3 dir="auto">' + esc(m.titre) + (m.lu ? "" : ' <span class="msg-badge">' + esc(t.nouveau) + "</span>") + "</h3>" +
                    '<p dir="auto">' + esc(m.texte) + "</p>" +
                    '<span class="msg-date">' + esc(dateTxt(m.cree_le)) + "</span>" +
                    "</div>";
            }).join("")
            : '<p class="msg-vide">' + esc(t.vide) + "</p>";

        // Ouverte automatiquement s'il y a du nouveau (ou si la boîte est encore vide, pour expliquer à quoi elle sert)
        const ouvert = nonLus > 0 || messages.length === 0;

        zone.innerHTML =
            '<section class="student-welcome-card is-stacked msg-carte">' +
            '<button type="button" class="msg-tete" aria-expanded="' + ouvert + '">' +
            '<span class="msg-titre">💌 ' + esc(t.titre) + "</span>" +
            (nonLus ? '<span class="msg-badge">' + esc(t.nouveaux(nonLus)) + "</span>" : "") +
            '<span class="msg-fleche">▾</span>' +
            "</button>" +
            '<div class="msg-corps"' + (ouvert ? "" : " hidden") + ">" + corps + "</div>" +
            "</section>";

        const bouton = zone.querySelector(".msg-tete");
        const contenu = zone.querySelector(".msg-corps");

        function marquerLus() {
            if (!nonLus) { return; }
            sb().rpc("marquer_messages_lus").then(function () {
                const pastille = bouton.querySelector(".msg-badge");
                if (pastille) { pastille.remove(); }
            }, function () { /* on réessaiera à la prochaine visite */ });
        }

        bouton.addEventListener("click", function () {
            const ouvrir = contenu.hidden;
            contenu.hidden = !ouvrir;
            bouton.setAttribute("aria-expanded", String(ouvrir));
            if (ouvrir) { marquerLus(); }
        });

        if (ouvert) { marquerLus(); }

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
