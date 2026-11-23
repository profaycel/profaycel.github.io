// Envoi groupé de séries PDF (documents-admin.html, administrateur seulement).
// Nom de fichier attendu : <quelque-chose>-serie<N>-enonce.pdf ou <quelque-chose>-serie<N>-correction.pdf
// Les PDF vont dans le stockage PRIVÉ « documents » (series/<nom>.pdf) et une ligne est ajoutée dans la table `documents`
// (mêmes règles que l'envoi normal : seuls les élèves du niveau, connectés, peuvent les ouvrir).
(function () {

    const zone = document.querySelector("#groupe-form");

    if (!zone) {
        return;
    }

    const champFichiers = document.querySelector("#groupe-fichiers");
    const resume = document.querySelector("#groupe-resume");
    const bouton = document.querySelector("#groupe-envoyer");
    const journal = document.querySelector("#groupe-journal");

    const MOTIF = /serie(\d+)-(enonce|correction)\.pdf$/i;

    function valeur(id) {
        return document.querySelector(id).value;
    }

    function plan() {

        const decalage = Number(valeur("#groupe-decalage"));
        const fichiers = Array.from(champFichiers.files || []);
        const lignes = [];
        const ignores = [];

        fichiers.forEach(function (f) {
            const m = f.name.match(MOTIF);
            if (!m) {
                ignores.push(f.name);
                return;
            }
            const n = Number(m[1]);
            const correction = m[2].toLowerCase() === "correction";
            const synthese = decalage === 100;
            const base = synthese ? `فرض تأليفي نموذجي ${n}` : `سلسلة تمارين عدد ${n}`;
            lignes.push({
                fichier: f,
                chemin: "series/" + f.name,
                nom: correction ? (synthese ? `إصلاح ${base}` : `إصلاح سلسلة عدد ${n}`) : base,
                type: correction ? "Correction" : "Série d'exercices",
                numero: n + decalage
            });
        });

        lignes.sort(function (a, b) { return a.numero - b.numero || (a.type === "Correction" ? 1 : -1); });

        return { lignes: lignes, ignores: ignores };

    }

    function afficherResume() {

        const p = plan();

        if (p.lignes.length === 0 && p.ignores.length === 0) {
            resume.textContent = "";
            return;
        }

        resume.textContent = `${p.lignes.length} fichier(s) prêt(s)` + (p.ignores.length ? ` · ${p.ignores.length} ignoré(s) (nom non reconnu : ${p.ignores.join(", ")})` : "");

    }

    champFichiers.addEventListener("change", afficherResume);
    document.querySelector("#groupe-decalage").addEventListener("change", afficherResume);

    function ecrire(texte) {
        const li = document.createElement("li");
        li.textContent = texte;
        journal.appendChild(li);
    }

    zone.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!window.supabaseClient) {
            ecrire("Connexion à la base pas encore prête, réessayez dans un instant.");
            return;
        }

        const p = plan();

        if (p.lignes.length === 0) {
            ecrire("Aucun fichier reconnu (nom attendu : …-serie1-enonce.pdf / …-serie1-correction.pdf).");
            return;
        }

        const niveau = valeur("#groupe-niveau");
        const matiere = valeur("#groupe-matiere");
        const trimestre = Number(valeur("#groupe-trimestre"));

        bouton.disabled = true;
        journal.innerHTML = "";

        let ok = 0;

        for (let i = 0; i < p.lignes.length; i++) {

            const l = p.lignes[i];

            try {

                // déjà publié ? (même chemin) → on saute
                const deja = await window.supabaseClient.from("documents").select("id").eq("lien", l.chemin).limit(1);

                if (deja.error) { throw deja.error; }

                if ((deja.data || []).length > 0) {
                    ecrire(`⏭️ ${l.nom} : déjà publié, ignoré.`);
                    continue;
                }

                const envoi = await window.supabaseClient.storage.from("documents")
                    .upload(l.chemin, l.fichier, { contentType: "application/pdf", upsert: false });

                if (envoi.error) { throw envoi.error; }

                const ligne = await window.supabaseClient.from("documents").insert([{
                    nom: l.nom,
                    type_fichier: l.type,
                    classe: niveau,
                    niveau: niveau,
                    trimestre: trimestre,
                    numero: l.numero,
                    matiere: matiere,
                    statut: "publie",
                    lien: l.chemin,
                    fichiers: []
                }]);

                if (ligne.error) {
                    await window.supabaseClient.storage.from("documents").remove([l.chemin]);
                    throw ligne.error;
                }

                ok++;
                ecrire(`✅ ${l.nom} (n°${l.numero})`);

            } catch (erreur) {

                console.error("Envoi groupé :", erreur);
                ecrire(`❌ ${l.nom} : ${erreur.message || erreur}`);

            }

        }

        ecrire(`Terminé : ${ok} / ${p.lignes.length} publié(s). Rechargez la page pour voir la liste.`);
        bouton.disabled = false;

    });

})();
