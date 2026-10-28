// Puissances, notation scientifique et valeurs approchées — 1ère année secondaire (1er trimestre)
(function () {
const P = (a, n) => `${a}<sup>${n}</sup>`;
const R = x => String(x).replace(".", ",");
const arr = (x, d) => Number(x.toFixed(d));
const OK = "✅";

const LECON = {
  id: "1-maths-puissances-sci",
  langue: "fr",
  titre: "Puissances, notation scientifique, valeurs approchées",
  niveaux: [
    // ---------------------------------------------------------------- 0
    {
      titre: "Puissances d'un nombre",
      sous: "a puissance n, exposant 0 et exposant négatif",
      cours: `
        <div class="regle"><b>Définition :</b> pour un réel ${N("a")} et un entier ${N("n ≥ 1")} : ${N("a<sup>n</sup> = a × a × … × a")} (${N("n")} facteurs).<br>
          ${N("a<sup>0</sup> = 1")} (si ${N("a ≠ 0")}) et ${N("a<sup>−n</sup> = 1 / a<sup>n</sup>")}.</div>
        <div class="exemple"><b>Exemples :</b> ${N(P(2,5) + " = 32")} ; ${N(P("(−2)",3) + " = −8")} ; ${N(P("(−3)",2) + " = 9")} mais ${N("−" + P(3,2) + " = −9")} ; ${N(P(2,"−3") + " = 1/8")}.</div>
        <div class="astuce"><b>Signe :</b> une puissance de nombre négatif est positive si l'exposant est pair, négative s'il est impair. Attention : ${N("−3<sup>2</sup>")} et ${N("(−3)<sup>2</sup>")} ne sont pas égaux !</div>`,
      questions: [
        { type:"nombre", enonce:`Calculer ${N(P(3,4))}.`, rep:[Math.pow(3,4)], indice:`${N("3 × 3 × 3 × 3")}.`, expl:`${N(P(3,4) + " = 9 × 9 = 81")}.` },
        { type:"nombre", enonce:`Calculer ${N(P("(−2)",5))}.`, rep:[Math.pow(-2,5)], indice:`Exposant impair : le résultat est négatif.`, expl:`${N(P("(−2)",5) + " = −32")}.` },
        { type:"nombre", enonce:`Calculer ${N("−" + P(4,2))}.`, rep:[-16], indice:`Le signe « moins » n'est pas dans la puissance : on calcule ${N(P(4,2))} puis on change le signe.`, expl:`${N("−" + P(4,2) + " = −16")}, alors que ${N(P("(−4)",2) + " = 16")}.` },
        { type:"nombre", enonce:`Calculer ${N(P(7,0))}.`, rep:[1], indice:`Tout nombre non nul à la puissance 0 vaut 1.`, expl:`${N(P(7,0) + " = 1")}.` },
        { type:"nombre", enonce:`Calculer ${N(P(2,"−3"))} sous forme de fraction (écrire par exemple ${N("1/5")}).`, rep:["1/8"], irr:true, indice:`${N(P("a","−n") + " = 1 / " + P("a","n"))}.`, expl:`${N(P(2,"−3") + " = 1 / " + P(2,3) + " = 1/8")}.` },
        { type:"vf", enonce:`${N(P("(−5)",4) + " > 0")}.`, rep:true, indice:`Exposant pair.`, expl:`Vrai : ${N(P("(−5)",4) + " = 625")}.` },
      ]
    },
    // ---------------------------------------------------------------- 1
    {
      titre: "Règles de calcul sur les puissances",
      sous: "Produit, quotient, puissance d'une puissance",
      cours: `
        <div class="regle"><b>Pour ${N("a")}, ${N("b")} non nuls et ${N("m")}, ${N("n")} entiers :</b><br>
          • ${N("a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup>")}<br>
          • ${N("a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup>")}<br>
          • ${N("(a<sup>m</sup>)<sup>n</sup> = a<sup>m×n</sup>")}<br>
          • ${N("(a × b)<sup>n</sup> = a<sup>n</sup> × b<sup>n</sup>")}</div>
        <div class="exemple"><b>Exemple :</b> ${N(P(2,3) + " × " + P(2,4) + " = " + P(2,7) + " = 128")} ; ${N("(" + P(3,2) + ")<sup>4</sup> = " + P(3,8))}.</div>`,
      questions: [
        { type:"nombre", enonce:`${N(P(5,3) + " × " + P(5,4) + " = " + P(5,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[7], indice:`On additionne les exposants.`, expl:`${N("3 + 4 = 7")}.` },
        { type:"nombre", enonce:`${N(P(7,9) + " ÷ " + P(7,6) + " = " + P(7,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[3], indice:`On soustrait les exposants.`, expl:`${N("9 − 6 = 3")}.` },
        { type:"nombre", enonce:`${N("(" + P(3,2) + ")<sup>5</sup> = " + P(3,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[10], indice:`On multiplie les exposants.`, expl:`${N("2 × 5 = 10")}.` },
        { type:"nombre", enonce:`${N(P(2,4) + " × " + P(5,4) + " = " + P(10,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[4], indice:`${N(P("a","n") + " × " + P("b","n") + " = (a × b)<sup>n</sup>")}.`, expl:`${N("(2 × 5)<sup>4</sup> = " + P(10,4))}.` },
        { type:"nombre", enonce:`Calculer ${N(P(2,5) + " × " + P(2,"−2"))}.`, rep:[Math.pow(2,3)], indice:`${N("5 + (−2) = 3")}.`, expl:`${N(P(2,3) + " = 8")}.` },
        (function () {
          const O = [N(P(3,10)), N(P(3,"−2")), N(P(3,6)), N(P(3,8))];
          return { type:"qcm", enonce:`${N("(" + P(3,2) + ")<sup>4</sup> × " + P(3,2))} est égal à :`, options:O, rep:0, indice:`D'abord ${N("(" + P(3,2) + ")<sup>4</sup> = " + P(3,8))}.`, expl:`${N(P(3,8) + " × " + P(3,2) + " = " + P(3,10))}.` };
        })(),
        { type:"vf", enonce:`${N(P(2,3) + " + " + P(2,4) + " = " + P(2,7))}.`, rep:false, indice:`Les règles concernent les <b>produits</b>, pas les sommes.`, expl:`Faux : ${N("8 + 16 = 24")} alors que ${N(P(2,7) + " = 128")}.` },
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      titre: "Puissances de 10",
      sous: "Écritures décimales et exposants",
      cours: `
        <div class="regle"><b>Puissances de 10 :</b> ${N(P(10,3) + " = 1000")} ; ${N(P(10,0) + " = 1")} ; ${N(P(10,"−1") + " = 0,1")} ; ${N(P(10,"−3") + " = 0,001")}.<br>
          Multiplier par ${N(P(10,"n"))} décale la virgule de ${N("n")} rangs vers la droite ; par ${N(P(10,"−n"))}, de ${N("n")} rangs vers la gauche.</div>
        <div class="exemple"><b>Exemples :</b> ${N("3,5 × " + P(10,4) + " = 35000")} ; ${N("4200 × " + P(10,"−5") + " = 0,042")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Écrire ${N(P(10,"−2"))} sous forme décimale.`, rep:[0.01], decimal:true, indice:`Deux rangs après la virgule.`, expl:`${N(P(10,"−2") + " = 0,01")}.` },
        { type:"nombre", enonce:`Écrire ${N("2,7 × " + P(10,3))} sous forme décimale.`, rep:[2700], indice:`Virgule décalée de 3 rangs vers la droite.`, expl:`${N("2700")}.` },
        { type:"nombre", enonce:`Écrire ${N("45 × " + P(10,"−3"))} sous forme décimale.`, rep:[0.045], decimal:true, indice:`Virgule décalée de 3 rangs vers la gauche.`, expl:`${N("0,045")}.` },
        { type:"nombre", enonce:`${N("0,0008 = 8 × " + P(10,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[-4], indice:`Il faut décaler la virgule de 4 rangs.`, expl:`${N("0,0008 = 8 × " + P(10,"−4"))}.` },
        { type:"nombre", enonce:`${N(P(10,5) + " × " + P(10,"−8") + " = " + P(10,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[-3], indice:`${N("5 + (−8)")}.`, expl:`${N(P(10,"−3"))}.` },
        { type:"nombre", enonce:`Calculer ${N("(" + P(10,"−2") + ")<sup>3</sup>")} sous la forme ${N(P(10,"n"))} : donner ${N("n")}.`, rep:[-6], indice:`${N("(−2) × 3")}.`, expl:`${N(P(10,"−6"))}.` },
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      titre: "Notation scientifique",
      sous: "a × 10ⁿ avec 1 ≤ a < 10",
      cours: `
        <div class="regle"><b>Définition :</b> l'écriture scientifique d'un nombre décimal positif ${N("x")} est ${N("x = a × 10<sup>n</sup>")} où ${N("1 ≤ a < 10")} et ${N("n")} est un entier relatif.</div>
        <div class="exemple"><b>Exemples :</b> ${N("45000 = 4,5 × " + P(10,4))} ; ${N("0,00072 = 7,2 × " + P(10,"−4"))}.<br>
          ${N("(3,2 × " + P(10,5) + ") × (2 × " + P(10,3) + ") = 6,4 × " + P(10,8))} (on multiplie les décimaux, on additionne les exposants).</div>
        <div class="astuce">${N("25 × " + P(10,3))} n'est <b>pas</b> une écriture scientifique car ${N("25 ≥ 10")} : on écrit ${N("2,5 × " + P(10,4))}.</div>`,
      questions: [
        { type:"nombre", enonce:`${N("45000 = 4,5 × " + P(10,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[4], indice:`La virgule doit passer de la fin à après le 4 : 4 rangs.`, expl:`${N("n = 4")}.` },
        { type:"nombre", enonce:`${N("0,00072 = 7,2 × " + P(10,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[-4], indice:`La virgule se décale de 4 rangs vers la droite.`, expl:`${N("n = −4")}.` },
        (function () {
          const L = ["3,4 × 10<sup>5</sup>", "34 × 10<sup>4</sup>", "0,34 × 10<sup>6</sup>", "9,9 × 10<sup>−2</sup>", "10 × 10<sup>3</sup>"];
          const ok = [0, 3];
          return { type:"multi", enonce:`Choisir <u>toutes</u> les écritures scientifiques :`, options:L.map(x => x), rep:ok, indice:`Il faut ${N("1 ≤ a < 10")}.`, expl:`${N("34")}, ${N("0,34")} et ${N("10")} ne sont pas dans ${N("[1 ; 10[")}.` };
        })(),
        { type:"nombre", enonce:`${N("(3,2 × " + P(10,5) + ") × (2 × " + P(10,3) + ") = a × " + P(10,"n"))} avec ${N("a")} entre 1 et 10 : donner ${N("a")}.`, rep:[6.4], decimal:true, indice:`${N("3,2 × 2")}.`, expl:`${N("6,4 × " + P(10,8))}.` },
        { type:"nombre", enonce:`Dans le calcul précédent, quelle est la valeur de ${N("n")} ?`, rep:[8], indice:`${N("5 + 3")}.`, expl:`${N("n = 8")}.` },
        { type:"nombre", enonce:`${N("(6 × " + P(10,8) + ") ÷ (3 × " + P(10,3) + ") = 2 × " + P(10,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[5], indice:`${N("8 − 3")}.`, expl:`${N("2 × " + P(10,5))}.` },
        { type:"nombre", enonce:`La vitesse de la lumière est environ ${N("300 000")} km/s. Écrite sous la forme ${N("3 × " + P(10,"n"))}, quelle est la valeur de ${N("n")} ?`, rep:[5], indice:`${N("300000 = 3 × 100000")}.`, expl:`${N("3 × " + P(10,5))} km/s.` },
        { type:"nombre", enonce:`${N("(4 × " + P(10,5) + ") × (5 × " + P(10,3) + ") = 2 × " + P(10,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[9], indice:`${N("4 × 5 = 20 = 2 × 10")}, puis on ajoute les exposants : ${N("5 + 3 + 1")}.`, expl:`${N("20 × " + P(10,8) + " = 2 × " + P(10,9))}.` },
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      titre: "Valeurs approchées",
      sous: "Troncature, arrondi, par défaut et par excès",
      cours: `
        <div class="regle"><b>Valeur approchée d'un nombre ${N("x")} à ${N("10<sup>−n</sup>")} près :</b><br>
          • <b>par défaut</b> : le plus grand décimal à ${N("n")} chiffres après la virgule qui est ≤ ${N("x")} (on <b>tronque</b>) ;<br>
          • <b>par excès</b> : le décimal suivant (on ajoute ${N("10<sup>−n</sup>")}) ;<br>
          • <b>arrondi</b> : celle des deux qui est la plus proche de ${N("x")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("x = 3,14159")} à ${N("0,01")} près : par défaut ${N("3,14")}, par excès ${N("3,15")}, arrondi ${N("3,14")}. À ${N("0,001")} près : par défaut ${N("3,141")}, par excès ${N("3,142")}, arrondi ${N("3,142")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Arrondi de ${N("3,14159")} à ${N("0,001")} près :`, rep:[3.142], decimal:true, indice:`Le chiffre suivant est ${N("5")} : on arrondit au supérieur.`, expl:`${N("3,142")}.` },
        { type:"nombre", enonce:`Valeur approchée par défaut de ${N("2,7183")} à ${N("0,01")} près :`, rep:[2.71], decimal:true, indice:`On tronque après deux chiffres.`, expl:`${N("2,71")}.` },
        { type:"nombre", enonce:`Valeur approchée par excès de ${N("2,7183")} à ${N("0,01")} près :`, rep:[2.72], decimal:true, indice:`C'est la valeur par défaut plus ${N("0,01")}.`, expl:`${N("2,71 + 0,01 = 2,72")}.` },
        { type:"nombre", enonce:`Arrondi de ${N("2/3")} à ${N("0,01")} près :`, rep:[arr(2/3,2)], decimal:true, indice:`${N("2/3 = 0,6666…")}.`, expl:`${N("0,67")}.` },
        { type:"nombre", enonce:`Valeur approchée par défaut de ${N("7/3")} à ${N("0,1")} près :`, rep:[2.3], decimal:true, indice:`${N("7/3 = 2,333…")}.`, expl:`${N("2,3")}.` },
        { type:"vf", enonce:`L'arrondi de ${N("4,2951")} à ${N("0,01")} près est ${N("4,29")}.`, rep:false, indice:`Regarde le chiffre suivant : ${N("5")}.`, expl:`Faux : ${N("4,2951")} est plus proche de ${N("4,30")} que de ${N("4,29")}, l'arrondi est ${N("4,30")}.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`Calculer ${N(P("(−3)",3))}.`, rep:[-27], expl:`${N("−27")}.` },
      { type:"nombre", enonce:`${N(P(2,7) + " × " + P(2,"−3") + " = " + P(2,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[4], expl:`${N("7 + (−3) = 4")}.` },
      { type:"nombre", enonce:`${N("(" + P(5,3) + ")<sup>4</sup> ÷ " + P(5,8) + " = " + P(5,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[4], expl:`${N("(" + P(5,3) + ")<sup>4</sup> = " + P(5,12) + " ; 12 − 8 = 4")}.` },
      { type:"nombre", enonce:`Écrire ${N("38 × " + P(10,"−4"))} sous forme décimale.`, rep:[0.0038], decimal:true, expl:`${N("0,0038")}.` },
      { type:"nombre", enonce:`${N("52000000 = 5,2 × " + P(10,"n"))}. Quelle est la valeur de ${N("n")} ?`, rep:[7], expl:`${N("n = 7")}.` },
      { type:"nombre", enonce:`${N("(1,5 × " + P(10,4) + ") × (4 × " + P(10,"−7") + ") = a × " + P(10,"n"))} avec ${N("1 ≤ a < 10")} : donner ${N("n")}.`, rep:[-3], expl:`${N("1,5 × 4 = 6")} et ${N("4 + (−7) = −3")} : ${N("6 × " + P(10,"−3"))}.` },
      { type:"nombre", enonce:`Arrondi de ${N("5/6")} à ${N("0,01")} près :`, rep:[arr(5/6,2)], decimal:true, expl:`${N("5/6 = 0,8333…")} donc ${N("0,83")}.` },
      { type:"vf", enonce:`${N("−" + P(2,4) + " = " + P("(−2)",4))}.`, rep:false, expl:`Faux : ${N("−" + P(2,4) + " = −16")} et ${N(P("(−2)",4) + " = 16")}.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
