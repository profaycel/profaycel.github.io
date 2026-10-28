// Théorème de Thalès et réciproque — 1ère année secondaire (1er trimestre)
(function () {
const R = "rouge", B = "bleu", V = "vert";
const lerp = (P, Q, t) => [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])];
const A = [150, 20], Bb = [30, 165], C = [280, 165];
const M = lerp(A, Bb, 0.4), Nn = lerp(A, C, 0.4);
const figT = dessin({ w:310, h:190, P:{ A, B:Bb, C, M, N:Nn }, polys:[[["A","B","C"]]], segs:[["M","N",R]],
  lab:{ A:[0,-14], B:[-12,10], C:[12,10], M:[-14,0], N:[14,0] } });
// papillon : A entre M et B, et entre N et C
const A2 = [160, 100], B2 = [60, 35], C2 = [250, 45], M2 = lerp(A2, B2, -1 / 3), N2 = lerp(A2, C2, -1 / 3);
const figPap = dessin({ w:310, h:190, P:{ A:A2, B:B2, C:C2, M:M2, N:N2 }, segs:[["B","M"],["C","N"],["B","C"],["M","N",R]], lab:{ A:[12,-10], B:[-12,-8], C:[12,-8], M:[12,10], N:[-12,10] } });
const LECON = {
  id: "1-maths-thales",
  langue: "fr",
  titre: "Théorème de Thalès et sa réciproque",
  niveaux: [
    {
      titre: "Le théorème de Thalès",
      sous: "Rapports égaux dans un triangle",
      cours: `
        <div class="regle"><b>Théorème de Thalès :</b> soit ${N("ABC")} un triangle, ${N("M")} un point de ${N("(AB)")} et ${N("N")} un point de ${N("(AC)")}. Si ${N("(MN) ∥ (BC)")}, alors :
          <div style="text-align:center;margin:8px 0">${F("AM","AB")} = ${F("AN","AC")} = ${F("MN","BC")}</div></div>
        <div style="text-align:center">${figT}</div>
        <div class="exemple"><b>Exemple :</b> ${N("AM = 3")}, ${N("AB = 9")}, ${N("AN = 2")} : ${N("AM/AB = 3/9 = 1/3")} donc ${N("AC = 3 × AN = 6")}.</div>`,
      questions: [
        { type:"qcm", enonce:`${N("(MN) ∥ (BC)")}. Quel rapport est égal à ${F("AM","AB")} ?${figT}`, options:[F("AN","AC"), F("AN","NC"), F("MN","AC"), F("MB","AB")], rep:0, indice:`Les rapports portent sur les côtés <b>du grand triangle au petit triangle</b> dans le même ordre.`, expl:`${F("AM","AB")} = ${F("AN","AC")} = ${F("MN","BC")}.` },
        { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AM = 3")}, ${N("AB = 9")} et ${N("AN = 2")}. Calculer ${N("AC")} :`, rep:[6], indice:`${N("AM/AB = AN/AC")} donc ${N("AC = AN × AB / AM")}.`, expl:`${N("AC = 2 × 9 ÷ 3 = 6")}.` },
        { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AM = 4")}, ${N("AB = 10")} et ${N("BC = 15")}. Calculer ${N("MN")} :`, rep:[6], indice:`${N("MN = BC × AM / AB")}.`, expl:`${N("15 × 4 ÷ 10 = 6")}.` },
        { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AM = 2")}, ${N("MB = 3")} et ${N("AN = 3")}. Calculer ${N("AC")} :`, rep:[7.5], decimal:true, indice:`${N("AB = AM + MB = 5")}.`, expl:`${N("AC = AN × AB / AM = 3 × 5 / 2 = 7,5")}.` },
        { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AB = 12")}, ${N("AM = 8")} et ${N("AC = 9")}. Calculer ${N("AN")} :`, rep:[6], indice:`${N("AN = AC × AM / AB")}.`, expl:`${N("9 × 8 ÷ 12 = 6")}.` },
        { type:"vf", enonce:`Pour appliquer le théorème de Thalès, il faut que ${N("(MN) ∥ (BC)")}.`, rep:true, indice:`Hypothèse du théorème.`, expl:`Vrai.` },
      ]
    },
    {
      titre: "Rédiger avec Thalès",
      sous: "Hypothèses, rapports, conclusion",
      cours: `
        <div class="regle"><b>Rédaction type :</b><br>
          1. <i>Dans le triangle ${N("ABC")}, ${N("M ∈ (AB)")}, ${N("N ∈ (AC)")} et ${N("(MN) ∥ (BC)")}.</i><br>
          2. <i>D'après le théorème de Thalès :</i> ${N("AM/AB = AN/AC = MN/BC")}.<br>
          3. <i>On remplace par les valeurs connues</i> puis on calcule (produit en croix).</div>
        <div class="exemple"><b>Produit en croix :</b> ${N("3/9 = 2/x")} donne ${N("3x = 18")} donc ${N("x = 6")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Résoudre le produit en croix : ${N("5/8 = 10/x")}. Valeur de ${N("x")} :`, rep:[16], indice:`${N("5x = 80")}.`, expl:`${N("x = 16")}.` },
        { type:"qcm", enonce:`Dans le triangle ${N("ABC")}, ${N("M ∈ [AB]")}, ${N("N ∈ [AC]")} et ${N("(MN) ∥ (BC)")} : quelles longueurs faut-il connaître pour calculer ${N("MN")} ?`, options:[N("AM, AB et BC"), N("AM, AN et AC"), N("AB, AC et MB")], rep:0, indice:`On utilise ${N("AM/AB = MN/BC")}.`, expl:`Trois longueurs connues parmi ces rapports permettent de calculer la quatrième.` },
        { type:"nombre", enonce:`${N("(MN) ∥ (BC)")} ; ${N("AM = 6")}, ${N("MB = 4")} et ${N("MN = 9")}. Calculer ${N("BC")} :`, rep:[15], indice:`${N("AB = 10")}, puis ${N("BC = MN × AB / AM")}.`, expl:`${N("9 × 10 ÷ 6 = 15")}.` },
        { type:"nombre", enonce:`${N("(MN) ∥ (BC)")} ; ${N("AN = 4")}, ${N("NC = 6")}, ${N("AM = 3")}. Calculer ${N("AB")} :`, rep:[7.5], decimal:true, indice:`${N("AC = 10")}, ${N("AM/AB = AN/AC")}.`, expl:`${N("AB = AM × AC / AN = 3 × 10 / 4 = 7,5")}.` },
        { type:"nombre", enonce:`Un arbre projette une ombre de ${N("12")} m. Au même moment, un bâton de ${N("1,5")} m projette une ombre de ${N("2")} m. Hauteur de l'arbre (en m) :`, rep:[9], decimal:true, indice:`Les rayons du soleil sont parallèles : ${N("h/1,5 = 12/2")}.`, expl:`${N("h = 1,5 × 12 ÷ 2 = 9")} m.` },
      ]
    },
    {
      titre: "Réciproque du théorème de Thalès",
      sous: "Démontrer que deux droites sont parallèles",
      cours: `
        <div class="regle"><b>Réciproque :</b> soit ${N("ABC")} un triangle, ${N("M ∈ (AB)")}, ${N("N ∈ (AC)")}. Si ${N("AM/AB = AN/AC")} <b>et</b> si les points ${N("A, M, B")} et ${N("A, N, C")} sont <b>alignés dans le même ordre</b>, alors ${N("(MN) ∥ (BC)")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("AM = 2")}, ${N("AB = 5")}, ${N("AN = 3")}, ${N("AC = 7,5")} : ${N("2/5 = 0,4")} et ${N("3/7,5 = 0,4")}. Les rapports sont égaux donc ${N("(MN) ∥ (BC)")}.</div>
        <div class="astuce">Si les rapports sont <b>différents</b>, les droites ne sont pas parallèles.</div>`,
      questions: [
        { type:"vf", enonce:`${N("AM = 2")}, ${N("AB = 5")}, ${N("AN = 3")}, ${N("AC = 7,5")} (points alignés dans le même ordre). Alors ${N("(MN) ∥ (BC)")}.`, rep:true, indice:`${N("2/5")} et ${N("3/7,5")}.`, expl:`${N("0,4 = 0,4")} : parallèles.` },
        { type:"vf", enonce:`${N("AM = 3")}, ${N("AB = 7")}, ${N("AN = 4")}, ${N("AC = 9")}. Alors ${N("(MN) ∥ (BC)")}.`, rep:3/7 === 4/9, indice:`${N("3/7")} et ${N("4/9")}.`, expl:`${N("27 ≠ 28")} : les rapports sont différents, les droites ne sont pas parallèles.` },
        { type:"qcm", enonce:`${N("AM = 4")}, ${N("MB = 2")}, ${N("AN = 6")}, ${N("NC = 3")}. Les droites ${N("(MN)")} et ${N("(BC)")} sont-elles parallèles ?`, options:["Oui","Non"], rep:0, indice:`${N("AM/AB = 4/6")} et ${N("AN/AC = 6/9")}.`, expl:`${N("4/6 = 2/3 = 6/9")} : oui.` },
        { type:"nombre", enonce:`${N("AM = 3")} et ${N("AB = 5")}. Pour que ${N("(MN) ∥ (BC)")}, quelle longueur ${N("AN")} faut-il si ${N("AC = 10")} ?`, rep:[6], indice:`${N("AN / 10 = 3 / 5")}.`, expl:`${N("AN = 6")}.` },
        { type:"vf", enonce:`La réciproque de Thalès permet de démontrer un <b>parallélisme</b>.`, rep:true, indice:`C'est son usage.`, expl:`Vrai.` },
      ]
    },
    {
      titre: "Configuration « papillon »",
      sous: "Points A entre M et B, et entre N et C",
      cours: `
        <div class="regle"><b>Cas du papillon :</b> les droites ${N("(BM)")} et ${N("(CN)")} se coupent en ${N("A")} avec ${N("A")} <b>entre</b> ${N("B")} et ${N("M")}, et <b>entre</b> ${N("C")} et ${N("N")}. Si ${N("(MN) ∥ (BC)")}, le théorème de Thalès donne encore :
          <div style="text-align:center;margin:8px 0">${F("AM","AB")} = ${F("AN","AC")} = ${F("MN","BC")}</div></div>
        <div style="text-align:center">${figPap}</div>`,
      questions: [
        { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AM = 2")}, ${N("AB = 6")} et ${N("AN = 3")}. Calculer ${N("AC")} :${figPap}`, rep:[9], indice:`${N("AM/AB = AN/AC")}.`, expl:`${N("AC = 3 × 6 ÷ 2 = 9")}.` },
        { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AB = 4")}, ${N("AM = 6")} et ${N("BC = 10")}. Calculer ${N("MN")} :`, rep:[15], indice:`${N("MN/BC = AM/AB")}.`, expl:`${N("MN = 10 × 6 ÷ 4 = 15")}.` },
        { type:"vf", enonce:`Dans la configuration papillon, les rapports de Thalès sont les mêmes que dans la configuration triangle.`, rep:true, indice:`Voir le cours.`, expl:`Vrai.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AM = 3")}, ${N("AB = 5")}, ${N("AN = 4,5")}. Calculer ${N("AC")} :`, rep:[7.5], decimal:true, expl:`${N("4,5 × 5 ÷ 3 = 7,5")}.` },
      { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AM = 2")}, ${N("AB = 8")}, ${N("MN = 3")}. Calculer ${N("BC")} :`, rep:[12], expl:`${N("3 × 8 ÷ 2 = 12")}.` },
      { type:"nombre", enonce:`${N("(MN) ∥ (BC)")}, ${N("AM = 6")}, ${N("MB = 3")}, ${N("AC = 12")}. Calculer ${N("AN")} :`, rep:[8], expl:`${N("AB = 9")} puis ${N("AN = 12 × 6 ÷ 9 = 8")}.` },
      { type:"vf", enonce:`${N("AM = 2")}, ${N("AB = 6")}, ${N("AN = 3")}, ${N("AC = 9")} (même ordre). Alors ${N("(MN) ∥ (BC)")}.`, rep:true, expl:`${N("2/6 = 3/9")}.` },
      { type:"vf", enonce:`${N("AM = 2")}, ${N("AB = 5")}, ${N("AN = 3")}, ${N("AC = 8")}. Alors ${N("(MN) ∥ (BC)")}.`, rep:false, expl:`${N("2/5 = 0,4")} et ${N("3/8 = 0,375")}.` },
      { type:"nombre", enonce:`Configuration papillon, ${N("(MN) ∥ (BC)")}, ${N("AM = 2")}, ${N("AB = 5")}, ${N("MN = 4")}. Calculer ${N("BC")} :`, rep:[10], expl:`${N("4 × 5 ÷ 2 = 10")}.` },
      { type:"nombre", enonce:`Résoudre ${N("4/x = 6/9")} :`, rep:[6], expl:`${N("6x = 36")}.` },
      { type:"qcm", enonce:`La réciproque de Thalès permet de démontrer :`, options:["un parallélisme","une perpendicularité","une égalité d'angles"], rep:0, expl:`Si les rapports sont égaux, les droites sont parallèles.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
