// =====================================================
// PROFAYCEL — Tableau d'honneur hebdomadaire
// Affiche les 3 premiers de chaque niveau (7 derniers jours) :
// prénom + initiale du nom, leçons réussies, étoiles, pourcentage.
// Les données viennent de la fonction Supabase tableau_honneur()
// (appelable sans connexion ; elle ne renvoie rien d'autre).
//
// Utilisation : Honneur.monter(element, { langue: "fr" | "ar", niveau: "8 أساسي" })
//   - langue : par défaut celle choisie sur le site (localStorage « profaycel_lang »)
//   - niveau : onglet affiché en premier (le niveau de l'élève)
// Si la fonction n'existe pas encore ou si le réseau échoue, la section est cachée.
// =====================================================

(function () {

    const URL_BASE = "https://dmykwuyivwcprhpghbxc.supabase.co";
    const CLE = "sb_publishable_0-yL0Dmvh4TCHAQToVurhA_oQa_sQGY";

    // Les niveaux sont enregistrés ainsi dans la base (colonne classe de la fiche élève)
    const ORDRE = ["7 أساسي", "8 أساسي", "9 أساسي", "1 ثانوي"];

    const NOMS = {
        fr: {
            "7 أساسي": "7ème année de base",
            "8 أساسي": "8ème année de base",
            "9 أساسي": "9ème année de base",
            "1 ثانوي": "1ère année secondaire"
        },
        ar: {
            "7 أساسي": "السابعة أساسي",
            "8 أساسي": "الثامنة أساسي",
            "9 أساسي": "التاسعة أساسي",
            "1 ثانوي": "الأولى ثانوي"
        }
    };

    const MEDAILLES = ["🥇", "🥈", "🥉"];

    function lecons(n, l) {
        if (l === "fr") {
            return n + (n > 1 ? " leçons" : " leçon");
        }
        if (n === 1) { return "درس واحد"; }
        if (n === 2) { return "درسان"; }
        if (n >= 3 && n <= 10) { return n + " دروس"; }
        return n + " درسًا";
    }

    const TXT = {
        fr: {
            vide: "Pas encore d'activité cette semaine : sois le premier à apparaître ici ! 🚀",
            note: "Classement des 7 derniers jours : leçons réussies, puis étoiles, puis pourcentage d'avancement.",
            charge: "Chargement…"
        },
        ar: {
            vide: "لا نشاط بعد هذا الأسبوع: كن أوّل من يظهر اسمه هنا! 🚀",
            note: "الترتيب حسب آخر 7 أيّام: الدروس المنجزة ثمّ النجوم ثمّ نسبة التقدّم.",
            charge: "جارٍ التحميل…"
        }
    };

    // Première lettre en majuscule (les élèves écrivent parfois leur prénom en minuscules)
    function maj(t) {
        t = String(t == null ? "" : t);
        return t.charAt(0).toLocaleUpperCase() + t.slice(1);
    }

    function esc(t) {
        return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function langueDuSite() {
        try {
            return localStorage.getItem("profaycel_lang") === "ar" ? "ar" : "fr";
        } catch (e) {
            return "fr";
        }
    }

    async function charger() {
        const reponse = await fetch(URL_BASE + "/rest/v1/rpc/tableau_honneur", {
            method: "POST",
            headers: {
                "apikey": CLE,
                "Authorization": "Bearer " + CLE,
                "Content-Type": "application/json"
            },
            body: "{}"
        });
        if (!reponse.ok) {
            throw new Error("tableau_honneur : " + reponse.status);
        }
        return reponse.json();
    }

    function cacherSection(zone) {
        const section = zone.closest("[data-honneur-section]");
        if (section) { section.hidden = true; }
    }

    function dessiner(zone, lignes, options) {

        const l = options.langue;
        const t = TXT[l];

        // Niveaux qui ont au moins un élève cette semaine, dans l'ordre habituel
        const presents = ORDRE.filter(function (n) {
            return lignes.some(function (x) { return x.niveau === n; });
        });

        if (!presents.length) {
            zone.innerHTML = '<p class="hn-vide">' + esc(t.vide) + "</p>";
            return;
        }

        let actif = options.niveau && presents.indexOf(options.niveau) !== -1 ? options.niveau : presents[0];

        function afficher() {

            const onglets = presents.map(function (n) {
                return '<button type="button" class="hn-tab" data-n="' + esc(n) + '" aria-pressed="' + (n === actif) + '">' + esc(NOMS[l][n]) + "</button>";
            }).join("");

            const cartes = lignes
                .filter(function (x) { return x.niveau === actif; })
                .sort(function (a, b) { return a.rang - b.rang; })
                .map(function (x, i) {
                    const nom = esc(maj(x.prenom)) + " " + esc(String(x.initiale || "").toLocaleUpperCase()) + ".";
                    const nbLecons = Number(x.lecons) || 0;
                    const pct = Math.max(0, Math.min(100, Number(x.pct) || 0));
                    return '<div class="hn-carte' + (i === 0 ? " hn-premier" : "") + '">' +
                        '<div class="hn-medaille">' + MEDAILLES[i] + "</div>" +
                        '<div class="hn-info">' +
                        '<div class="hn-nom"><bdi>' + nom + "</bdi></div>" +
                        '<div class="hn-stats">' + (nbLecons > 0 ? "<span>✅ " + lecons(nbLecons, l) + "</span>" : "") + "<span>⭐ " + (Number(x.etoiles) || 0) + "</span></div>" +
                        '<div class="hn-barre"><i style="width:' + pct + '%"></i></div>' +
                        "</div>" +
                        '<div class="hn-pct">' + pct + "%</div>" +
                        "</div>";
                }).join("");

            zone.innerHTML =
                '<div class="hn-tabs">' + onglets + "</div>" +
                cartes +
                '<p class="hn-note">' + esc(t.note) + "</p>";

            zone.querySelectorAll(".hn-tab").forEach(function (b) {
                b.addEventListener("click", function () {
                    actif = b.dataset.n;
                    afficher();
                });
            });

        }

        afficher();

    }

    async function monter(zone, options) {

        if (typeof zone === "string") { zone = document.querySelector(zone); }
        if (!zone) { return; }

        options = options || {};
        options.langue = options.langue || langueDuSite();

        zone.classList.add("hn");
        zone.innerHTML = '<p class="hn-note">' + esc(TXT[options.langue].charge) + "</p>";

        try {
            dessiner(zone, await charger(), options);
        } catch (erreur) {
            console.warn("Tableau d'honneur indisponible :", erreur);
            cacherSection(zone);
            zone.innerHTML = "";
        }

    }

    window.Honneur = { monter: monter };

    // Page d'accueil : montage automatique
    document.addEventListener("DOMContentLoaded", function () {
        const zone = document.getElementById("honneur-zone");
        if (zone && zone.dataset.auto !== "non") { monter(zone); }
    });

})();
