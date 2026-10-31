// Développement, factorisation, identités remarquables, équations produit nul — 1ère année secondaire (1er trimestre)
(function () {
const AIDE_E = `<span dir="ltr" lang="fr" style="display:block">Écris l'expression développée et réduite (exemple : <span class="ltr">x² + 6x + 9</span>).</span>`;
const AIDE_F = `<span dir="ltr" lang="fr" style="display:block">Écris l'expression factorisée (exemple : <span class="ltr">(x + 3)(x − 3)</span> ou <span class="ltr">2(x + 5)</span>).</span>`;
const sg = (n, first) => (n < 0 ? "−" : first ? "" : "+");
const mon = (c, v) => c === 1 ? v : String(c) + v;
const lin = (c, d) => { // cx + d  (x ← lettre)
  const t = (Math.abs(c) === 1 ? "" : Math.abs(c)) + "x";
  return `${c < 0 ? "−" : ""}${t}${d === 0 ? "" : (d < 0 ? " − " : " + ") + Math.abs(d)}`;
};
const polyTxt = (a, b, c) => { // ax² + bx + c
  let s = (a === 1 ? "" : a === -1 ? "−" : a) + "x²";
  if (b) s += (b < 0 ? " − " : " + ") + (Math.abs(b) === 1 ? "" : Math.abs(b)) + "x";
  if (c) s += (c < 0 ? " − " : " + ") + Math.abs(c);
  return s;
};
const repPoly = (a, b, c) => `${a}x^2${b >= 0 ? "+" : ""}${b}x${c >= 0 ? "+" : ""}${c}`;

const LECON = {
  id: "1-maths-identites-remarquables",
  langue: "fr",
  titre: "Développement, factorisation et identités remarquables",
  niveaux: [
    {
      titre: "Développer avec la distributivité",
      sous: "k(a + b) = ka + kb et (a + b)(c + d)",
      cours: `
        <div class="regle"><b>Distributivité simple :</b> ${N("k(a + b) = ka + kb")}.<br>
          <b>Double distributivité :</b> ${N("(a + b)(c + d) = ac + ad + bc + bd")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("(3x + 1)(x + 2) = 3x² + 6x + x + 2 = 3x² + 7x + 2")}.</div>`,
      questions: [
        { type:"expr", enonce:`Développer et réduire : ${N("3(x + 4)")}`, rep:"3x+12", aide:AIDE_E, indice:`${N("3 × x + 3 × 4")}.`, expl:`${N("3x + 12")}.` },
        { type:"expr", enonce:`Développer et réduire : ${N("−2(x − 5)")}`, rep:"-2x+10", aide:AIDE_E, indice:`Attention au signe : ${N("−2 × (−5) = +10")}.`, expl:`${N("−2x + 10")}.` },
        { type:"expr", enonce:`Développer et réduire : ${N("(x + 2)(x + 5)")}`, rep:repPoly(1,7,10), aide:AIDE_E, indice:`${N("x² + 5x + 2x + 10")}.`, expl:`${N("x² + 7x + 10")}.` },
        { type:"expr", enonce:`Développer et réduire : ${N("(2x − 3)(x + 4)")}`, rep:repPoly(2,5,-12), aide:AIDE_E, indice:`${N("2x² + 8x − 3x − 12")}.`, expl:`${N("2x² + 5x − 12")}.` },
        { type:"expr", enonce:`Développer et réduire : ${N("(x − 1)(x² + x + 1)")}`, rep:"x^3-1", aide:AIDE_E, indice:`${N("x³ + x² + x − x² − x − 1")}.`, expl:`${N("x³ − 1")}.` },
        { type:"vf", enonce:`${N("(x + 3)(x − 3) = x² − 6x + 9")}.`, rep:false, indice:`Développe : ${N("x² − 3x + 3x − 9")}.`, expl:`Faux : ${N("(x + 3)(x − 3) = x² − 9")}.` },
      ]
    },
    {
      titre: "Les trois identités remarquables",
      sous: "(a+b)², (a−b)², (a+b)(a−b)",
      cours: `
        <div class="regle"><b>Pour tous réels ${N("a")} et ${N("b")} :</b><br>
          • ${N("(a + b)² = a² + 2ab + b²")}<br>
          • ${N("(a − b)² = a² − 2ab + b²")}<br>
          • ${N("(a + b)(a − b) = a² − b²")}</div>
        <div class="exemple"><b>Exemples :</b> ${N("(x + 3)² = x² + 6x + 9")} ; ${N("(2x − 5)² = 4x² − 20x + 25")} ; ${N("(x − 4)(x + 4) = x² − 16")}.<br>
          Calcul mental : ${N("101² = (100 + 1)² = 10201")}.</div>`,
      questions: [
        { type:"expr", enonce:`Développer : ${N("(x + 6)²")}`, rep:repPoly(1,12,36), aide:AIDE_E, indice:`${N("x² + 2 × x × 6 + 6²")}.`, expl:`${N("x² + 12x + 36")}.` },
        { type:"expr", enonce:`Développer : ${N("(x − 7)²")}`, rep:repPoly(1,-14,49), aide:AIDE_E, indice:`${N("x² − 2 × x × 7 + 7²")}.`, expl:`${N("x² − 14x + 49")}.` },
        { type:"expr", enonce:`Développer : ${N("(3x + 2)²")}`, rep:repPoly(9,12,4), aide:AIDE_E, indice:`${N("(3x)² + 2 × 3x × 2 + 2²")}.`, expl:`${N("9x² + 12x + 4")}.` },
        { type:"expr", enonce:`Développer : ${N("(5x − 1)(5x + 1)")}`, rep:repPoly(25,0,-1), aide:AIDE_E, indice:`${N("(5x)² − 1²")}.`, expl:`${N("25x² − 1")}.` },
        { type:"nombre", enonce:`Calculer mentalement ${N("99²")} (aide : ${N("(100 − 1)²")}).`, rep:[9801], indice:`${N("10000 − 200 + 1")}.`, expl:`${N("99² = 9801")}.` },
        { type:"nombre", enonce:`Calculer mentalement ${N("52 × 48")} (aide : ${N("(50 + 2)(50 − 2)")}).`, rep:[2496], indice:`${N("2500 − 4")}.`, expl:`${N("52 × 48 = 2496")}.` },
        { type:"vf", enonce:`${N("(x + 5)² = x² + 25")}.`, rep:false, indice:`Il manque le double produit.`, expl:`Faux : ${N("(x + 5)² = x² + 10x + 25")}.` },
      ]
    },
    {
      titre: "Factoriser avec un facteur commun",
      sous: "ka + kb = k(a + b)",
      cours: `
        <div class="regle"><b>Factoriser</b> une somme, c'est l'écrire sous forme d'un <b>produit</b>. On cherche un facteur commun : ${N("ka + kb = k(a + b)")}.</div>
        <div class="exemple"><b>Exemples :</b> ${N("6x + 9 = 3(2x + 3)")} ; ${N("x² − 5x = x(x − 5)")} ; ${N("(x + 1)(x − 2) + 3(x + 1) = (x + 1)(x − 2 + 3) = (x + 1)(x + 1)")}.</div>`,
      questions: [
        { type:"facteur", enonce:`Factoriser : ${N("6x + 9")}`, rep:"3(2x+3)", aide:AIDE_F, indice:`Le plus grand diviseur commun de ${N("6")} et ${N("9")} est ${N("3")}.`, expl:`${N("3(2x + 3)")}.` },
        { type:"facteur", enonce:`Factoriser : ${N("x² − 5x")}`, rep:"x(x-5)", aide:AIDE_F, indice:`Le facteur commun est ${N("x")}.`, expl:`${N("x(x − 5)")}.` },
        { type:"facteur", enonce:`Factoriser : ${N("4x² + 8x")}`, rep:"4x(x+2)", aide:AIDE_F, indice:`Facteur commun : ${N("4x")}.`, expl:`${N("4x(x + 2)")}.` },
        { type:"facteur", enonce:`Factoriser : ${N("(x + 1)(x − 2) + 3(x + 1)")}`, rep:"(x+1)(x+1)", aide:AIDE_F, indice:`Le facteur commun est ${N("(x + 1)")}.`, expl:`${N("(x + 1)(x − 2 + 3) = (x + 1)²")}.` },
        { type:"facteur", enonce:`Factoriser : ${N("(2x − 1)(x + 3) − (2x − 1)(x − 4)")}`, rep:"7(2x-1)", aide:AIDE_F, indice:`${N("(2x − 1)[(x + 3) − (x − 4)]")}.`, expl:`${N("(2x − 1) × 7")}.` },
      ]
    },
    {
      titre: "Factoriser avec les identités remarquables",
      sous: "a² − b², a² + 2ab + b², a² − 2ab + b²",
      cours: `
        <div class="regle"><b>Dans l'autre sens :</b><br>
          • ${N("a² − b² = (a − b)(a + b)")}<br>
          • ${N("a² + 2ab + b² = (a + b)²")}<br>
          • ${N("a² − 2ab + b² = (a − b)²")}</div>
        <div class="exemple"><b>Exemples :</b> ${N("x² − 25 = (x − 5)(x + 5)")} ; ${N("4x² + 12x + 9 = (2x + 3)²")} ; ${N("x² − 8x + 16 = (x − 4)²")}.</div>`,
      questions: [
        { type:"facteur", enonce:`Factoriser : ${N("x² − 25")}`, rep:"(x-5)(x+5)", aide:AIDE_F, indice:`${N("25 = 5²")}.`, expl:`${N("(x − 5)(x + 5)")}.` },
        { type:"facteur", enonce:`Factoriser : ${N("4x² − 9")}`, rep:"(2x-3)(2x+3)", aide:AIDE_F, indice:`${N("(2x)² − 3²")}.`, expl:`${N("(2x − 3)(2x + 3)")}.` },
        { type:"facteur", enonce:`Factoriser : ${N("x² + 10x + 25")}`, rep:"(x+5)^2", aide:AIDE_F, indice:`${N("x² + 2 × x × 5 + 5²")}.`, expl:`${N("(x + 5)²")}.` },
        { type:"facteur", enonce:`Factoriser : ${N("9x² − 12x + 4")}`, rep:"(3x-2)^2", aide:AIDE_F, indice:`${N("(3x)² − 2 × 3x × 2 + 2²")}.`, expl:`${N("(3x − 2)²")}.` },
        { type:"facteur", enonce:`Factoriser : ${N("(x + 3)² − 16")}`, rep:"(x-1)(x+7)", aide:AIDE_F, indice:`${N("a² − b²")} avec ${N("a = x + 3")} et ${N("b = 4")}.`, expl:`${N("(x + 3 − 4)(x + 3 + 4) = (x − 1)(x + 7)")}.` },
        { type:"vf", enonce:`${N("x² + 9")} peut se factoriser avec une identité remarquable.`, rep:false, indice:`Il y a un signe « plus » entre deux carrés.`, expl:`Faux : une somme de deux carrés ne se factorise pas dans ${N("ℝ")}.` },
      ]
    },
    {
      titre: "Équations produit nul",
      sous: "A × B = 0",
      cours: `
        <div class="regle"><b>Propriété :</b> un produit est nul si et seulement si l'un de ses facteurs est nul : ${N("A × B = 0 ⟺ A = 0 ou B = 0")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("(x − 3)(x + 2) = 0")} ⟺ ${N("x = 3")} ou ${N("x = −2")}. ${N("S = {−2 ; 3}")}.<br>
          Pour ${N("x² − 16 = 0")} : on factorise ${N("(x − 4)(x + 4) = 0")} donc ${N("S = {−4 ; 4}")}.</div>`,
      questions: [
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("(x − 3)(x + 2) = 0")}. Écrire les solutions :`, rep:["3","-2"], indice:`Chaque facteur égal à zéro.`, expl:`${N("S = {−2 ; 3}")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("(2x − 1)(x + 5) = 0")}. Écrire les solutions :`, rep:["1/2","-5"], indice:`${N("2x − 1 = 0")} donne ${N("x = 1/2")}.`, expl:`${N("S = {−5 ; 1/2}")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("x² − 16 = 0")}. Écrire les solutions :`, rep:["4","-4"], indice:`Factorise d'abord.`, expl:`${N("(x − 4)(x + 4) = 0")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("x² + 6x = 0")}. Écrire les solutions :`, rep:["0","-6"], indice:`${N("x(x + 6) = 0")}.`, expl:`${N("S = {−6 ; 0}")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("(x − 2)² = 0")}. Écrire la solution :`, rep:["2"], indice:`Un carré est nul si et seulement si la base est nulle.`, expl:`${N("S = {2}")}.` },
        { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("4x² − 9 = 0")}. Écrire les solutions :`, rep:["3/2","-3/2"], indice:`${N("(2x − 3)(2x + 3) = 0")}.`, expl:`${N("S = {−3/2 ; 3/2}")}.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"expr", enonce:`Développer et réduire : ${N("(x + 4)²")}`, rep:repPoly(1,8,16), aide:AIDE_E, expl:`${N("x² + 8x + 16")}.` },
      { type:"expr", enonce:`Développer et réduire : ${N("(2x − 3)(2x + 3)")}`, rep:repPoly(4,0,-9), aide:AIDE_E, expl:`${N("4x² − 9")}.` },
      { type:"expr", enonce:`Développer et réduire : ${N("(x − 2)(3x + 1)")}`, rep:repPoly(3,-5,-2), aide:AIDE_E, expl:`${N("3x² + x − 6x − 2 = 3x² − 5x − 2")}.` },
      { type:"facteur", enonce:`Factoriser : ${N("9x² − 25")}`, rep:"(3x-5)(3x+5)", aide:AIDE_F, expl:`${N("(3x − 5)(3x + 5)")}.` },
      { type:"facteur", enonce:`Factoriser : ${N("x² − 6x + 9")}`, rep:"(x-3)^2", aide:AIDE_F, expl:`${N("(x − 3)²")}.` },
      { type:"facteur", enonce:`Factoriser : ${N("10x + 15")}`, rep:"5(2x+3)", aide:AIDE_F, expl:`${N("5(2x + 3)")}.` },
      { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("(x − 5)(3x + 6) = 0")}.`, rep:["5","-2"], expl:`${N("x = 5")} ou ${N("x = −2")}.` },
      { type:"ensemble", enonce:`Résoudre dans ${N("ℝ")} : ${N("x² − 49 = 0")}.`, rep:["7","-7"], expl:`${N("(x − 7)(x + 7) = 0")}.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
