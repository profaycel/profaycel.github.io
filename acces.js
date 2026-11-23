// Accès des personnes déjà inscrites (index.html et register.html).
// - Quelqu'un de connecté (ou qui s'est déjà connecté sur cet appareil) ne voit plus « التسجيل » :
//   il voit un grand « فضائي » (Mon espace) à la place.
// - register.html : une personne déjà connectée est envoyée directement dans son espace.
// La session Supabase est gardée dans le navigateur (persistSession) : pas besoin de se reconnecter à chaque visite.
(function () {

    const CLE = "profaycel_deja_inscrit";

    function dejaInscrit() {
        try { return localStorage.getItem(CLE) === "1"; } catch (e) { return false; }
    }

    function memoriser() {
        try { localStorage.setItem(CLE, "1"); } catch (e) { /* stockage indisponible : sans importance */ }
    }

    function pageEspace(session) {
        const role = session.user.user_metadata.role;
        return role === "admin" ? "admin.html" : (role === "parent" ? "parent.html" : "eleve.html");
    }

    function banniere(session) {

        const section = document.querySelector(".hm-inscrire");

        if (!section) {
            return;
        }

        const conteneur = section.querySelector(".container");

        if (!conteneur) {
            return;
        }

        const lien = session ? pageEspace(session) : "login.html";
        const titre = session ? "🏠 Mon espace" : "Se connecter";
        const texte = session
            ? "Content de te revoir ! Accède à tes séries, tes séances et tes cours."
            : "Tu es déjà inscrit : connecte-toi en un clic avec Google.";
        const sous = session ? "Tes séries, tes séances et tes cours" : "Pas besoin de t'inscrire une deuxième fois";

        conteneur.innerHTML =
            '<h2 class="hm-inscrire-mot" lang="ar" dir="rtl" data-no-i18n>فضائي</h2>' +
            '<p class="hm-inscrire-texte">' + texte + '</p>' +
            '<a class="hm-inscrire-btn" href="' + lien + '"><b>' + titre + '</b><span>' + sous + '</span></a>';

    }

    function demarrer() {

        if (!window.supabaseClient) {
            setTimeout(demarrer, 200);
            return;
        }

        window.supabaseClient.auth.getSession().then(function (resultat) {

            const session = resultat.data.session;
            const page = window.location.pathname.split("/").pop();

            if (session) {
                memoriser();
            }

            if (page === "register.html" && session) {
                window.location.replace(pageEspace(session));
                return;
            }

            if (page === "" || page === "index.html") {
                if (session || dejaInscrit()) {
                    banniere(session);
                }
            }

        });

    }

    demarrer();

})();
