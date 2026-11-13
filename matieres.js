/* Choix de la matière dans l'espace élève : Mathématiques / Français.
   Un clic ouvre la matière ; un second clic la referme. */
(function () {
    var boutons = document.querySelectorAll(".matiere-btn");
    if (!boutons.length) { return; }

    boutons.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            var ouvrir = !bouton.classList.contains("is-active");

            boutons.forEach(function (b) {
                var panneau = document.getElementById("matiere-" + b.getAttribute("data-matiere"));
                var actif = ouvrir && b === bouton;
                b.classList.toggle("is-active", actif);
                b.setAttribute("aria-expanded", actif ? "true" : "false");
                if (panneau) { panneau.hidden = !actif; }
            });
        });
    });

    /* lien direct vers les devoirs (#devoirs) : ouvre les Mathématiques */
    if (location.hash === "#devoirs") {
        var maths = document.querySelector('.matiere-btn[data-matiere="maths"]');
        if (maths) { maths.click(); }
    }
})();
