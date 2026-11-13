// =====================================================
// PROFAYCEL — « Que penses-tu du site ? » (eleve.html)
// L'élève donne de 1 à 5 étoiles au site. Juste après sa note, il voit le résultat
// global : pourcentage d'élèves satisfaits (notes de 4 et 5), moyenne, nombre d'avis.
// Les chiffres ne sont visibles qu'après avoir noté (fonctions Supabase
// mon_avis_site() et donner_avis_site() : section 16 de supabase/schema.sql).
// L'élève peut changer sa note ; les statistiques se mettent à jour pour tout le monde.
// Si les fonctions n'existent pas ou si personne n'est connecté, la carte reste cachée.
// =====================================================

(function () {

    const zone = document.getElementById("avis-zone");
    if (!zone) { return; }

    const sb = function () { return window.supabaseClient; };

    let langue = "fr";
    try { langue = localStorage.getItem("profaycel_lang") === "ar" ? "ar" : "fr"; } catch (e) { /* navigation privée */ }

    function avisAr(n) {
        if (n === 1) { return "تقييم واحد"; }
        if (n === 2) { return "تقييمان"; }
        if (n >= 3 && n <= 10) { return n + " تقييمات"; }
        return n + " تقييمًا";
    }

    const T = {
        fr: {
            titre: "Que penses-tu du site ?",
            sous: "Donne-lui une note de 1 à 5 étoiles",
            etoile: function (n) { return n + (n > 1 ? " étoiles" : " étoile"); },
            merci: "Merci pour ta note ! 💙",
            pctTexte: "des élèves aiment le site",
            detail: function (moy, total) {
                return "Moyenne " + moy + " / 5 · " + total + " avis";
            },
            peu: "Les chiffres seront plus précis quand il y aura plus d'avis.",
            modifier: "Tu peux changer ta note en touchant une autre étoile.",
            apercu: "Aperçu professeur : ta note n'est pas comptée.",
            erreur: "Impossible d'enregistrer ta note pour le moment. Réessaie dans un instant."
        },
        ar: {
            titre: "ما رأيك في الموقع؟",
            sous: "امنحه تقييمًا من 1 إلى 5 نجوم",
            etoile: function (n) { return n === 1 ? "نجمة واحدة" : n === 2 ? "نجمتان" : n + " نجوم"; },
            merci: "شكرًا على تقييمك! 💙",
            pctTexte: "من التلاميذ يحبّون الموقع",
            detail: function (moy, total) {
                return "المعدّل " + moy + " من 5 · " + avisAr(total);
            },
            peu: "ستكون الأرقام أدقّ كلّما زاد عدد المقيِّمين.",
            modifier: "يمكنك تغيير تقييمك بالضغط على نجمة أخرى.",
            apercu: "معاينة الأستاذ: تقييمك لا يُحتسب.",
            erreur: "تعذّر حفظ تقييمك الآن. أعد المحاولة بعد قليل."
        }
    };

    const t = T[langue];

    function esc(x) {
        return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    // Les chiffres restent de gauche à droite, même au milieu d'un texte arabe
    function nb(x) { return '<bdi dir="ltr">' + esc(x) + "</bdi>"; }

    function construire() {

        let boutons = "";
        for (let i = 1; i <= 5; i++) {
            boutons += '<button type="button" class="avis-etoile" data-n="' + i + '" aria-label="' + esc(t.etoile(i)) + '">★</button>';
        }

        zone.innerHTML =
            '<section class="avis-carte" aria-live="polite">' +
            '<h2 class="avis-titre">' + esc(t.titre) + "</h2>" +
            '<p class="avis-sous">' + esc(t.sous) + "</p>" +
            '<div class="avis-etoiles" role="group" aria-label="' + esc(t.titre) + '">' + boutons + "</div>" +
            '<p class="avis-erreur" hidden>' + esc(t.erreur) + "</p>" +
            '<div class="avis-resultat" hidden></div>' +
            "</section>";

        return {
            carte: zone.querySelector(".avis-carte"),
            etoiles: Array.prototype.slice.call(zone.querySelectorAll(".avis-etoile")),
            erreur: zone.querySelector(".avis-erreur"),
            resultat: zone.querySelector(".avis-resultat")
        };
    }

    async function demarrer() {

        for (let i = 0; i < 100 && !sb(); i++) {
            await new Promise(function (r) { setTimeout(r, 100); });
        }
        if (!sb()) { return; }

        const reponse = await sb().auth.getSession();
        const session = reponse.data && reponse.data.session;
        if (!session) { return; }

        let etat;
        try {
            const lecture = await sb().rpc("mon_avis_site");
            if (lecture.error) { return; }
            etat = lecture.data || {};
        } catch (e) {
            return; // fonction pas encore installée : la carte reste cachée
        }

        const ui = construire();
        let note = Number(etat.etoiles) || 0;
        let occupe = false;
        // Le compte du professeur voit les chiffres sans avoir noté, et sa note n'est jamais comptée
        const admin = !note && !!etat.stats;

        function colorer(n) {
            ui.etoiles.forEach(function (b) {
                b.classList.toggle("avis-pleine", Number(b.dataset.n) <= n);
            });
        }

        function montrer(stats, apercu) {

            if (!stats) {
                ui.resultat.hidden = true;
                return;
            }

            const pct = Math.max(0, Math.min(100, Math.round(Number(stats.pct) || 0)));
            const total = Number(stats.total) || 0;
            const moyenne = (Number(stats.moyenne) || 0).toFixed(1);

            ui.resultat.innerHTML =
                (apercu ? "" : '<p class="avis-merci">' + esc(t.merci) + "</p>") +
                '<p class="avis-pct">' + nb(pct + "%") + "</p>" +
                '<p class="avis-pct-texte">' + esc(t.pctTexte) + "</p>" +
                '<div class="avis-barre"><span></span></div>' +
                '<p class="avis-detail">' + esc(t.detail(moyenne, total)).replace(/(\d+(?:\.\d)?)/g, function (m) { return nb(m); }) + "</p>" +
                (total < 5 ? '<p class="avis-detail">' + esc(t.peu) + "</p>" : "") +
                '<p class="avis-modifier">' + esc(apercu ? t.apercu : t.modifier) + "</p>";
            ui.resultat.hidden = false;

            const barre = ui.resultat.querySelector(".avis-barre > span");
            requestAnimationFrame(function () {
                requestAnimationFrame(function () { barre.style.width = pct + "%"; });
            });
        }

        colorer(note);
        montrer(etat.stats, admin);

        ui.etoiles.forEach(function (b) {

            b.addEventListener("mouseenter", function () { if (!occupe) { colorer(Number(b.dataset.n)); } });
            b.addEventListener("mouseleave", function () { if (!occupe) { colorer(note); } });

            b.addEventListener("click", async function () {

                if (occupe) { return; }
                occupe = true;

                const n = Number(b.dataset.n);
                ui.erreur.hidden = true;
                ui.etoiles.forEach(function (x) { x.disabled = true; });
                colorer(n);

                try {
                    const envoi = await sb().rpc("donner_avis_site", { p_etoiles: n });
                    if (envoi.error || !envoi.data) { throw new Error("avis"); }
                    note = Number(envoi.data.etoiles) || n;
                    montrer(envoi.data.stats, admin);
                } catch (e) {
                    ui.erreur.hidden = false;
                }

                colorer(note);
                ui.etoiles.forEach(function (x) { x.disabled = false; });
                occupe = false;

            });

        });

    }

    demarrer();

})();
