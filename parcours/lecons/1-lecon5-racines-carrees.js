// Racines carrées — 1ère année secondaire (1er trimestre)
(function () {
const R = x => `√${x}`;
const sq = n => Math.sqrt(n);
// plus grand carré parfait qui divise n
const carreMax = n => { let k = 1; for (let i = 2; i * i <= n; i++) if (n % (i * i) === 0) k = i; return k };

const LECON = {
  id: "1-maths-racines-carrees",
  langue: "fr",
  titre: "Racines carrées",
  niveaux: [
    {
      titre: "Définition de la racine carrée",
      sous: "Carrés parfaits et √a",
      cours: `
        <div class="regle"><b>Définition :</b> pour un réel ${N("a ≥ 0")}, la <b>racine carrée</b> de ${N("a")}, notée ${N("√a")}, est <b>le nombre positif</b> dont le carré est ${N("a")}.<br>
          ${N("(√a)² = a")} et ${N("√(a²) = a")} si ${N("a ≥ 0")}.</div>
        <div class="exemple"><b>Exemples :</b> ${N("√49 = 7")} ; ${N("√0,25 = 0,5")} ; ${N("√(9/16) = 3/4")}.<br>
          ${N("√(−4)")} n'existe pas : un carré n'est jamais négatif.</div>
        <div class="astuce"><b>Carrés parfaits à connaître :</b> ${N("1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Calculer ${N("√169")}.`, rep:[13], indice:`${N("13² = ?")}`, expl:`${N("13² = 169")} donc ${N("√169 = 13")}.` },
        { type:"nombre", enonce:`Calculer ${N("√0,36")}.`, rep:[0.6], decimal:true, indice:`${N("0,6 × 0,6")}.`, expl:`${N("0,6² = 0,36")}.` },
        { type:"nombre", enonce:`Calculer ${N("√(25/49)")} (écrire sous la forme ${N("a/b")}).`, rep:["5/7"], irr:true, indice:`${N("√25 = 5")} et ${N("√49 = 7")}.`, expl:`${N("5/7")}.` },
        { type:"nombre", enonce:`Calculer ${N("(√11)²")}.`, rep:[11], indice:`${N("(√a)² = a")}.`, expl:`${N("11")}.` },
        { type:"nombre", enonce:`Calculer ${N("√((−6)²)")}.`, rep:[6], indice:`D'abord ${N("(−6)² = 36")}.`, expl:`${N("√36 = 6")} (la racine est toujours positive).` },
        (function () {
          const L = ["√(−9)", "√0", "√(3²)", "−√16", "√(−5)²"]; // √(−5)² : on lit √((−5)²) ... ambigu -> on l'évite
          const O = ["√(−9)", "√0", "√(−2)", "√(10)"];
          return { type:"multi", enonce:`Choisir <u>tous</u> les nombres qui existent :`, options:O, rep:[1, 3], indice:`Le nombre sous la racine doit être positif ou nul.`, expl:`${N("√(−9)")} et ${N("√(−2)")} n'existent pas.` };
        })(),
        { type:"vf", enonce:`${N("√(x²) = x")} pour tout réel ${N("x")}.`, rep:false, indice:`Essaie ${N("x = −3")}.`, expl:`Faux : ${N("√((−3)²) = √9 = 3 ≠ −3")}. En fait ${N("√(x²) = |x|")}.` },
      ]
    },
    {
      titre: "Produit et quotient de racines",
      sous: "√a × √b = √(ab)",
      cours: `
        <div class="regle"><b>Pour ${N("a ≥ 0")} et ${N("b ≥ 0")} :</b> ${N("√a × √b = √(a × b)")}.<br>
          <b>Pour ${N("a ≥ 0")} et ${N("b > 0")} :</b> ${N("√a / √b = √(a / b)")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("√2 × √8 = √16 = 4")} ; ${N("√75 / √3 = √25 = 5")}.</div>
        <div class="astuce"><b>Attention :</b> en général ${N("√(a + b) ≠ √a + √b")}. Par exemple ${N("√(9 + 16) = 5")} mais ${N("√9 + √16 = 7")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Calculer ${N("√2 × √8")}.`, rep:[4], indice:`${N("√(2 × 8)")}.`, expl:`${N("√16 = 4")}.` },
        { type:"nombre", enonce:`Calculer ${N("√5 × √20")}.`, rep:[10], indice:`${N("5 × 20 = 100")}.`, expl:`${N("√100 = 10")}.` },
        { type:"nombre", enonce:`Calculer ${N("√75 / √3")}.`, rep:[5], indice:`${N("√(75/3)")}.`, expl:`${N("√25 = 5")}.` },
        { type:"nombre", enonce:`Calculer ${N("√18 × √50")}.`, rep:[30], indice:`${N("18 × 50 = 900")}.`, expl:`${N("√900 = 30")}.` },
        { type:"nombre", enonce:`Calculer ${N("(√3 + 1)(√3 − 1)")}.`, rep:[2], indice:`Identité remarquable ${N("(a + b)(a − b) = a² − b²")}.`, expl:`${N("(√3)² − 1² = 3 − 1 = 2")}.` },
        { type:"vf", enonce:`${N("√(9 + 16) = √9 + √16")}.`, rep:false, indice:`Calcule chaque membre.`, expl:`Faux : ${N("√25 = 5")} alors que ${N("3 + 4 = 7")}.` },
      ]
    },
    {
      titre: "Simplifier une racine carrée",
      sous: "Écrire √n sous la forme a√b",
      cours: `
        <div class="regle"><b>Méthode :</b> on cherche le plus grand carré parfait qui divise ${N("n")}.<br>
          ${N("√72 = √(36 × 2) = √36 × √2 = 6√2")}.</div>
        <div class="exemple"><b>Exemples :</b> ${N("√50 = 5√2")} ; ${N("√12 = 2√3")} ; ${N("3√5 = √45")} (on rentre ${N("3")} : ${N("3 = √9")}).</div>`,
      questions: [72, 50, 48, 98, 125].map(n => ({
        type:"nombre", enonce:`${N("√" + n + " = a√" + (n / (carreMax(n) ** 2)))}. Quelle est la valeur de ${N("a")} ?`, rep:[carreMax(n)],
        indice:`Cherche le plus grand carré parfait qui divise ${N(n)} : ${N(carreMax(n) ** 2)}.`,
        expl:`${N("√" + n + " = √(" + carreMax(n) ** 2 + " × " + n / carreMax(n) ** 2 + ") = " + carreMax(n) + "√" + n / carreMax(n) ** 2)}.` }))
        .concat([
          { type:"nombre", enonce:`${N("4√3 = √n")}. Quelle est la valeur de ${N("n")} ?`, rep:[48], indice:`${N("4 = √16")}, donc ${N("4√3 = √(16 × 3)")}.`, expl:`${N("√48")}.` },
        ])
    },
    {
      titre: "Calculs avec des racines",
      sous: "Sommes, développements et inverses",
      cours: `
        <div class="regle"><b>Somme :</b> on ne peut additionner que des racines identiques : ${N("3√2 + 5√2 = 8√2")}. Si besoin, on simplifie d'abord : ${N("√8 + √18 = 2√2 + 3√2 = 5√2")}.</div>
        <div class="regle"><b>Inverse (rendre le dénominateur rationnel) :</b> ${N("1/√2 = √2/2")} ; ${N("1/(√3 − 1) = (√3 + 1)/2")} (on multiplie par la quantité conjuguée).</div>`,
      questions: [
        { type:"nombre", enonce:`${N("√8 + √18 = a√2")}. Quelle est la valeur de ${N("a")} ?`, rep:[5], indice:`${N("√8 = 2√2")} et ${N("√18 = 3√2")}.`, expl:`${N("2 + 3 = 5")}.` },
        { type:"nombre", enonce:`${N("√75 − √12 = a√3")}. Quelle est la valeur de ${N("a")} ?`, rep:[3], indice:`${N("√75 = 5√3")} et ${N("√12 = 2√3")}.`, expl:`${N("5 − 2 = 3")}.` },
        { type:"nombre", enonce:`Calculer ${N("(2 + √5)(2 − √5)")}.`, rep:[-1], indice:`${N("a² − b²")} avec ${N("a = 2")}, ${N("b = √5")}.`, expl:`${N("4 − 5 = −1")}.` },
        { type:"nombre", enonce:`${N("(√2 + 1)² = a + 2√2")}. Quelle est la valeur de ${N("a")} ?`, rep:[3], indice:`${N("(√2)² + 2 × √2 × 1 + 1²")}.`, expl:`${N("2 + 2√2 + 1 = 3 + 2√2")}.` },
        { type:"qcm", enonce:`${N("1/√5")} est égal à :`, options:[N("√5/5"), N("5/√5"), N("1/5"), N("√5")], rep:0, indice:`Multiplie le numérateur et le dénominateur par ${N("√5")}.`, expl:`${N("1/√5 = √5/(√5 × √5) = √5/5")}.` },
        { type:"vf", enonce:`${N("√3 + √3 = √6")}.`, rep:false, indice:`${N("√3 + √3 = 2√3")}.`, expl:`Faux : ${N("√3 + √3 = 2√3")}.` },
      ]
    },
    {
      titre: "Équations x² = a et comparaison",
      sous: "Résoudre x² = a, comparer des racines",
      cours: `
        <div class="regle"><b>Équation ${N("x² = a")} :</b> si ${N("a > 0")}, deux solutions ${N("√a")} et ${N("−√a")} ; si ${N("a = 0")}, une solution ${N("0")} ; si ${N("a < 0")}, aucune solution.</div>
        <div class="regle"><b>Comparaison :</b> pour ${N("a ≥ 0")} et ${N("b ≥ 0")} : ${N("a < b ⟺ √a < √b")}.</div>`,
      questions: [
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("x² = 49")}. Écrire les solutions :`, rep:["7","-7"], indice:`Deux solutions opposées.`, expl:`${N("S = {−7 ; 7}")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("x² = 25/9")}. Écrire les solutions (forme ${N("a/b")}) :`, rep:["5/3","-5/3"], indice:`${N("√(25/9) = 5/3")}.`, expl:`${N("S = {−5/3 ; 5/3}")}.` },
        { type:"nombre", enonce:`Combien de solutions l'équation ${N("x² = −4")} a-t-elle dans ${N("ℝ")} ?`, rep:[0], indice:`Un carré est positif ou nul.`, expl:`Aucune solution.` },
        { type:"qcm", enonce:`Quel est le plus grand : ${N("√7")} ou ${N("2,6")} ?`, options:[N("√7"), N("2,6")], rep:Math.sqrt(7) > 2.6 ? 0 : 1, indice:`Compare les carrés : ${N("7")} et ${N("2,6² = 6,76")}.`, expl:`${N("7 > 6,76")} donc ${N("√7 > 2,6")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("(x − 1)² = 16")}. Écrire les solutions :`, rep:["5","-3"], indice:`${N("x − 1 = 4")} ou ${N("x − 1 = −4")}.`, expl:`${N("x = 5")} ou ${N("x = −3")}.` },
        { type:"vf", enonce:`${N("√10")} est compris entre ${N("3")} et ${N("4")}.`, rep:true, indice:`${N("9 < 10 < 16")}.`, expl:`Vrai : ${N("√9 < √10 < √16")}.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`Calculer ${N("√196")}.`, rep:[14], expl:`${N("14² = 196")}.` },
      { type:"nombre", enonce:`Calculer ${N("√12 × √3")}.`, rep:[6], expl:`${N("√36 = 6")}.` },
      { type:"nombre", enonce:`${N("√180 = a√5")}. Quelle est la valeur de ${N("a")} ?`, rep:[6], expl:`${N("180 = 36 × 5")}.` },
      { type:"nombre", enonce:`${N("√27 + √12 = a√3")}. Quelle est la valeur de ${N("a")} ?`, rep:[5], expl:`${N("3√3 + 2√3 = 5√3")}.` },
      { type:"nombre", enonce:`Calculer ${N("(3 − √2)(3 + √2)")}.`, rep:[7], expl:`${N("9 − 2 = 7")}.` },
      { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("x² = 81")}.`, rep:["9","-9"], expl:`${N("S = {−9 ; 9}")}.` },
      { type:"vf", enonce:`${N("√(−16) = −4")}.`, rep:false, expl:`Faux : la racine d'un nombre négatif n'existe pas.` },
      { type:"qcm", enonce:`${N("2/√2")} est égal à :`, options:[N("√2"), N("2"), N("1"), N("2√2")], rep:0, expl:`${N("2/√2 = 2√2/2 = √2")}.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
