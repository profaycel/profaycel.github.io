// Ordre dans ℝ et valeur absolue — 1ère année secondaire (1er trimestre)
(function () {
const LECON = {
  id: "1-maths-ordre-valeur-absolue",
  langue: "fr",
  titre: "Ordre dans ℝ et valeur absolue",
  niveaux: [
    {
      titre: "Comparer deux réels",
      sous: "Étude du signe de a − b",
      cours: `
        <div class="regle"><b>Méthode de la différence :</b> pour comparer ${N("a")} et ${N("b")}, on étudie le signe de ${N("a − b")} :<br>
          ${N("a − b > 0 ⟺ a > b")} ; ${N("a − b = 0 ⟺ a = b")} ; ${N("a − b < 0 ⟺ a < b")}.</div>
        <div class="regle"><b>Propriétés :</b><br>
          • on peut ajouter le même nombre aux deux membres d'une inégalité ;<br>
          • on peut multiplier par un nombre <b>positif</b> sans changer le sens ; par un nombre <b>négatif</b>, le sens <b>change</b>.</div>
        <div class="exemple"><b>Exemple :</b> ${N("a = 2/3")} et ${N("b = 3/4")} : ${N("a − b = 8/12 − 9/12 = −1/12 < 0")} donc ${N("2/3 < 3/4")}.</div>`,
      questions: [
        { type:"qcm", enonce:`Comparer ${N("5/7")} et ${N("3/4")} : lequel est le plus grand ?`, options:[N("5/7"), N("3/4")], rep:5/7 > 3/4 ? 0 : 1, indice:`${N("5/7 − 3/4 = (20 − 21)/28")}.`, expl:`${N("5/7 − 3/4 = −1/28 < 0")} donc ${N("5/7 < 3/4")}.` },
        { type:"qcm", enonce:`Si ${N("a < b")}, alors ${N("−2a")} et ${N("−2b")} vérifient :`, options:[N("−2a < −2b"), N("−2a > −2b"), N("−2a = −2b")], rep:1, indice:`On multiplie par un nombre négatif.`, expl:`Le sens de l'inégalité change : ${N("−2a > −2b")}.` },
        { type:"qcm", enonce:`Pour tout réel ${N("x")}, comparer ${N("x² + 1")} et ${N("2x")} :`, options:[N("x² + 1 ≥ 2x"), N("x² + 1 ≤ 2x"), N("x² + 1 < 2x")], rep:0, indice:`${N("x² + 1 − 2x = (x − 1)²")}.`, expl:`${N("(x − 1)² ≥ 0")} donc ${N("x² + 1 ≥ 2x")}.` },
        { type:"vf", enonce:`Si ${N("a < b")} alors ${N("a² < b²")}.`, rep:false, indice:`Essaie ${N("a = −3")} et ${N("b = 2")}.`, expl:`Faux : ${N("−3 < 2")} mais ${N("9 > 4")}.` },
        { type:"vf", enonce:`Si ${N("0 < a < b")} alors ${N("1/a > 1/b")}.`, rep:true, indice:`Essaie ${N("a = 2")}, ${N("b = 4")}.`, expl:`Vrai : ${N("1/2 > 1/4")}. L'inverse renverse l'ordre pour des nombres positifs.` },
      ]
    },
    {
      titre: "Valeur absolue d'un réel",
      sous: "|x| et distance à zéro",
      cours: `
        <div class="regle"><b>Définition :</b> la valeur absolue de ${N("x")}, notée ${N("|x|")}, est sa distance à ${N("0")} sur la droite réelle :<br>
          ${N("|x| = x")} si ${N("x ≥ 0")} ; ${N("|x| = −x")} si ${N("x < 0")}.</div>
        <div class="exemple"><b>Exemples :</b> ${N("|5| = 5")} ; ${N("|−3,2| = 3,2")} ; ${N("|2 − √5| = √5 − 2")} car ${N("2 − √5 < 0")}.</div>
        <div class="astuce"><b>Propriétés :</b> ${N("|x| ≥ 0")} ; ${N("|−x| = |x|")} ; ${N("|ab| = |a| × |b|")} ; ${N("√(x²) = |x|")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Calculer ${N("|−7|")}.`, rep:[7], indice:`Distance de ${N("−7")} à ${N("0")}.`, expl:`${N("|−7| = 7")}.` },
        { type:"nombre", enonce:`Calculer ${N("|3 − 8|")}.`, rep:[5], indice:`${N("3 − 8 = −5")}.`, expl:`${N("|−5| = 5")}.` },
        { type:"nombre", enonce:`Calculer ${N("|−2| × |6|")}.`, rep:[12], indice:`${N("2 × 6")}.`, expl:`${N("12")}.` },
        { type:"qcm", enonce:`${N("|3 − π|")} est égal à : (rappel : ${N("π ≈ 3,14")})`, options:[N("3 − π"), N("π − 3"), N("0")], rep:1, indice:`Le signe de ${N("3 − π")}.`, expl:`${N("3 − π < 0")} donc ${N("|3 − π| = −(3 − π) = π − 3")}.` },
        { type:"nombre", enonce:`Calculer ${N("√((−9)²)")}.`, rep:[9], indice:`${N("√(x²) = |x|")}.`, expl:`${N("|−9| = 9")}.` },
        { type:"vf", enonce:`Pour tout réel ${N("x")}, ${N("|x| = x")}.`, rep:false, indice:`Essaie ${N("x = −4")}.`, expl:`Faux : ${N("|−4| = 4 ≠ −4")}.` },
      ]
    },
    {
      titre: "Distance entre deux réels",
      sous: "d(a, b) = |a − b|",
      cours: `
        <div class="regle"><b>Distance :</b> sur la droite réelle, la distance entre ${N("a")} et ${N("b")} est ${N("|a − b|")} (= ${N("|b − a|")}).</div>
        <div class="exemple"><b>Exemple :</b> la distance entre ${N("−3")} et ${N("4")} est ${N("|−3 − 4| = 7")}.</div>
        <div class="astuce">${N("|x − a| = r")} signifie : « ${N("x")} est à la distance ${N("r")} de ${N("a")} », donc ${N("x = a − r")} ou ${N("x = a + r")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Quelle est la distance entre ${N("−3")} et ${N("4")} ?`, rep:[7], indice:`${N("|−3 − 4|")}.`, expl:`${N("7")}.` },
        { type:"nombre", enonce:`Quelle est la distance entre ${N("−8")} et ${N("−2")} ?`, rep:[6], indice:`${N("|−8 − (−2)|")}.`, expl:`${N("|−6| = 6")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("|x − 3| = 5")}. Écrire les solutions :`, rep:["8","-2"], indice:`${N("x − 3 = 5")} ou ${N("x − 3 = −5")}.`, expl:`${N("S = {−2 ; 8}")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("|x + 4| = 1")}. Écrire les solutions :`, rep:["-3","-5"], indice:`${N("|x − (−4)| = 1")}.`, expl:`${N("S = {−5 ; −3}")}.` },
        { type:"nombre", enonce:`Combien de solutions l'équation ${N("|x − 2| = −3")} a-t-elle dans ${N("ℝ")} ?`, rep:[0], indice:`Une valeur absolue n'est jamais négative.`, expl:`Aucune solution.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("|2x − 1| = 7")}. Écrire les solutions :`, rep:["4","-3"], indice:`${N("2x − 1 = 7")} ou ${N("2x − 1 = −7")}.`, expl:`${N("x = 4")} ou ${N("x = −3")}.` },
      ]
    },
    {
      titre: "Inégalités avec valeur absolue",
      sous: "|x − a| ≤ r et |x − a| ≥ r",
      cours: `
        <div class="regle"><b>Pour ${N("r > 0")} :</b><br>
          • ${N("|x − a| ≤ r ⟺ a − r ≤ x ≤ a + r")} (distance au plus égale à ${N("r")})<br>
          • ${N("|x − a| ≥ r ⟺ x ≤ a − r")} ou ${N("x ≥ a + r")}</div>
        <div class="exemple"><b>Exemple :</b> ${N("|x − 2| ≤ 3 ⟺ −1 ≤ x ≤ 5")}.</div>`,
      questions: [
        { type:"qcm", enonce:`${N("|x − 2| ≤ 3")} équivaut à :`, options:[N("−1 ≤ x ≤ 5"), N("−5 ≤ x ≤ 1"), N("x ≤ −1 ou x ≥ 5")], rep:0, indice:`${N("2 − 3")} et ${N("2 + 3")}.`, expl:`${N("−1 ≤ x ≤ 5")}.` },
        { type:"qcm", enonce:`${N("|x + 1| ≥ 4")} équivaut à :`, options:[N("−5 ≤ x ≤ 3"), N("x ≤ −5 ou x ≥ 3"), N("x ≤ −3 ou x ≥ 5")], rep:1, indice:`${N("|x − (−1)| ≥ 4")} : ${N("−1 − 4 = −5")} et ${N("−1 + 4 = 3")}.`, expl:`${N("x ≤ −5")} ou ${N("x ≥ 3")}.` },
        { type:"nombre", enonce:`Combien d'entiers ${N("x")} vérifient ${N("|x − 1| ≤ 3")} ?`, rep:[7], indice:`${N("−2 ≤ x ≤ 4")}.`, expl:`${N("−2, −1, 0, 1, 2, 3, 4")} : 7 entiers.` },
        { type:"vf", enonce:`${N("x = 0")} vérifie ${N("|x − 5| < 4")}.`, rep:false, indice:`${N("|0 − 5| = 5")}.`, expl:`Faux : ${N("5 > 4")}.` },
        { type:"vf", enonce:`${N("|x| < 2 ⟺ −2 < x < 2")}.`, rep:true, indice:`Distance à ${N("0")} inférieure à ${N("2")}.`, expl:`Vrai.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`Calculer ${N("|5 − 11|")}.`, rep:[6], expl:`${N("|−6| = 6")}.` },
      { type:"qcm", enonce:`${N("|2 − √7|")} est égal à :`, options:[N("2 − √7"), N("√7 − 2"), N("−2 − √7")], rep:1, expl:`${N("√7 ≈ 2,65 > 2")} donc ${N("2 − √7 < 0")}.` },
      { type:"nombre", enonce:`Distance entre ${N("−5")} et ${N("9")} :`, rep:[14], expl:`${N("|−5 − 9| = 14")}.` },
      { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("|x − 6| = 2")}.`, rep:["8","4"], expl:`${N("S = {4 ; 8}")}.` },
      { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("|3x + 2| = 11")}.`, rep:["3","-13/3"], expl:`${N("3x + 2 = 11")} donne ${N("x = 3")} ; ${N("3x + 2 = −11")} donne ${N("x = −13/3")}.` },
      { type:"qcm", enonce:`${N("|x − 4| ≤ 2")} équivaut à :`, options:[N("2 ≤ x ≤ 6"), N("x ≤ 2 ou x ≥ 6"), N("−2 ≤ x ≤ 2")], rep:0, expl:`${N("4 − 2 ≤ x ≤ 4 + 2")}.` },
      { type:"vf", enonce:`Si ${N("a < b")} et ${N("c < 0")} alors ${N("ac > bc")}.`, rep:true, expl:`Multiplier par un négatif renverse l'inégalité.` },
      { type:"vf", enonce:`${N("|a + b| = |a| + |b|")} pour tous réels ${N("a")} et ${N("b")}.`, rep:false, expl:`Faux : ${N("a = 3")}, ${N("b = −3")} donne ${N("0 ≠ 6")}.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
