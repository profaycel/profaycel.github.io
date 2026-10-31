// Relations métriques dans un triangle rectangle — 1ère année secondaire (1er trimestre)
(function () {
const R = "rouge", B = "bleu", V = "vert";
// ABC rectangle en A, H pied de la hauteur issue de A sur [BC]
const Pb = [30, 150], Pc = [280, 150], Pa = [110, 150 - Math.sqrt(80 * 170)];
const Ph = [110, 150];
const figH = dessin({ w:310, h:180, P:{ A:Pa, B:Pb, C:Pc, H:Ph }, polys:[[["A","B","C"]]], segs:[["A","H",R]], droits:[["B","A","C"],["A","H","C"]],
  lab:{ A:[0,-14], B:[-12,10], C:[12,10], H:[0,16] } });
const figPyth = dessin({ w:300, h:175, P:{ A:[40,140], B:[270,140], C:[40,30] }, polys:[[["A","B","C"]]], droits:[["B","A","C"]], lab:{ A:[-12,10], B:[12,10], C:[-12,-8] } });
const hyp = (a, b) => Math.sqrt(a * a + b * b);

const LECON = {
  id: "1-maths-relations-metriques",
  langue: "fr",
  titre: "Relations métriques dans un triangle rectangle",
  niveaux: [
    {
      titre: "Théorème de Pythagore",
      sous: "BC² = AB² + AC²",
      cours: `
        <div class="regle"><b>Théorème de Pythagore :</b> si ${N("ABC")} est rectangle en ${N("A")}, alors
          <div style="text-align:center;margin:6px 0">${N("BC² = AB² + AC²")}</div>
          (le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés).</div>
        <div style="text-align:center">${figPyth}</div>
        <div class="regle"><b>Réciproque :</b> si ${N("BC² = AB² + AC²")}, alors ${N("ABC")} est rectangle en ${N("A")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("AB = 6")}, ${N("AC = 8")} : ${N("BC² = 36 + 64 = 100")} donc ${N("BC = 10")}.</div>`,
      questions: [
        { type:"nombre", enonce:`${N("ABC")} est rectangle en ${N("A")} avec ${N("AB = 6")} et ${N("AC = 8")}. Calculer ${N("BC")} :`, rep:[10], indice:`${N("36 + 64")}.`, expl:`${N("BC² = 100")} donc ${N("BC = 10")}.` },
        { type:"nombre", enonce:`${N("ABC")} est rectangle en ${N("A")} avec ${N("BC = 13")} et ${N("AB = 5")}. Calculer ${N("AC")} :`, rep:[12], indice:`${N("AC² = 169 − 25")}.`, expl:`${N("144")} donc ${N("AC = 12")}.` },
        { type:"nombre", enonce:`Quelle est la diagonale (en cm) d'un rectangle de ${N("9")} cm sur ${N("12")} cm ?`, rep:[15], indice:`${N("81 + 144 = 225")}.`, expl:`${N("15")} cm.` },
        { type:"vf", enonce:`Un triangle de côtés ${N("7")}, ${N("24")} et ${N("25")} est rectangle.`, rep:7*7 + 24*24 === 25*25, indice:`${N("49 + 576")} et ${N("625")}.`, expl:`${N("49 + 576 = 625 = 25²")} : rectangle (réciproque de Pythagore).` },
        { type:"vf", enonce:`Un triangle de côtés ${N("4")}, ${N("5")} et ${N("7")} est rectangle.`, rep:16 + 25 === 49, indice:`${N("16 + 25")} et ${N("49")}.`, expl:`${N("41 ≠ 49")} : il n'est pas rectangle.` },
        { type:"nombre", enonce:`Calculer l'hypoténuse d'un triangle rectangle de côtés ${N("1,5")} et ${N("2")} :`, rep:[2.5], decimal:true, indice:`${N("2,25 + 4 = 6,25")}.`, expl:`${N("2,5")}.` },
      ]
    },
    {
      titre: "La hauteur relative à l'hypoténuse",
      sous: "AH² = BH × CH",
      cours: `
        <div class="regle"><b>Configuration :</b> ${N("ABC")} rectangle en ${N("A")}, ${N("H")} le pied de la hauteur issue de ${N("A")} sur ${N("[BC]")}.</div>
        <div style="text-align:center">${figH}</div>
        <div class="regle"><b>Relations :</b><br>
          • ${N("AH² = BH × CH")}<br>
          • ${N("AB² = BH × BC")} et ${N("AC² = CH × CB")}<br>
          • ${N("AB × AC = AH × BC")} (aire du triangle calculée de deux façons)</div>`,
      questions: [
        { type:"nombre", enonce:`${N("BH = 4")} et ${N("CH = 9")}. Calculer ${N("AH")} :${figH}`, rep:[6], indice:`${N("AH² = 4 × 9 = 36")}.`, expl:`${N("AH = 6")}.` },
        { type:"nombre", enonce:`${N("BH = 2")} et ${N("BC = 8")}. Calculer ${N("AB²")} :`, rep:[16], indice:`${N("AB² = BH × BC")}.`, expl:`${N("2 × 8 = 16")}.` },
        { type:"nombre", enonce:`${N("AB = 3")}, ${N("AC = 4")}, ${N("BC = 5")}. Calculer ${N("AH")} (en décimal) :`, rep:[2.4], decimal:true, indice:`${N("AB × AC = AH × BC")} donc ${N("AH = 12/5")}.`, expl:`${N("AH = 2,4")}.` },
        { type:"nombre", enonce:`${N("AB = 3")}, ${N("BC = 5")}. Calculer ${N("BH")} (en décimal) :`, rep:[1.8], decimal:true, indice:`${N("AB² = BH × BC")} donc ${N("9 = BH × 5")}.`, expl:`${N("BH = 1,8")}.` },
        { type:"nombre", enonce:`${N("AH = 6")} et ${N("BH = 3")}. Calculer ${N("CH")} :`, rep:[12], indice:`${N("36 = 3 × CH")}.`, expl:`${N("CH = 12")}.` },
        { type:"qcm", enonce:`Laquelle de ces égalités est correcte ?`, options:[N("AH² = BH × CH"), N("AH² = BH + CH"), N("AH = BH × CH")], rep:0, indice:`Voir le cours.`, expl:`${N("AH² = BH × CH")}.` },
      ]
    },
    {
      titre: "Problèmes",
      sous: "Combiner les relations",
      cours: `
        <div class="regle"><b>Stratégie :</b> repérer le triangle rectangle, choisir la relation qui contient l'inconnue et deux données (ou plus), puis calculer pas à pas.</div>
        <div class="exemple"><b>Exemple :</b> ${N("BH = 4")}, ${N("CH = 9")} : ${N("BC = 13")}, ${N("AH = 6")}, ${N("AB² = 4 × 13 = 52")}, ${N("AC² = 9 × 13 = 117")}. Vérification : ${N("52 + 117 = 169 = 13²")}.</div>`,
      questions: [
        { type:"nombre", enonce:`${N("BH = 4")} et ${N("CH = 9")}. Calculer ${N("BC")} :`, rep:[13], indice:`${N("BC = BH + CH")}.`, expl:`${N("13")}.` },
        { type:"nombre", enonce:`Même configuration : calculer ${N("AB²")} :`, rep:[52], indice:`${N("AB² = BH × BC")}.`, expl:`${N("4 × 13 = 52")}.` },
        { type:"nombre", enonce:`Même configuration : calculer ${N("AC²")} :`, rep:[117], indice:`${N("AC² = CH × BC")}.`, expl:`${N("9 × 13 = 117")}.` },
        { type:"nombre", enonce:`Un triangle ${N("ABC")} est rectangle en ${N("A")}, avec ${N("AB = 5")} et ${N("AC = 12")}. Calculer ${N("AH")} (fraction ${N("a/b")}) :`, rep:["60/13"], irr:true, indice:`${N("BC = 13")} puis ${N("AH = AB × AC / BC")}.`, expl:`${N("AH = 60/13 ≈ 4,6")}.` },
        { type:"nombre", enonce:`Une échelle de ${N("5")} m touche un mur à ${N("4")} m de hauteur. À quelle distance (en m) du mur se trouve son pied ?`, rep:[3], indice:`${N("25 − 16 = 9")}.`, expl:`${N("3")} m.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`${N("ABC")} rectangle en ${N("A")}, ${N("AB = 9")} et ${N("AC = 12")}. Calculer ${N("BC")} :`, rep:[15], expl:`${N("81 + 144 = 225")}.` },
      { type:"nombre", enonce:`${N("ABC")} rectangle en ${N("A")}, ${N("BC = 17")} et ${N("AB = 8")}. Calculer ${N("AC")} :`, rep:[15], expl:`${N("289 − 64 = 225")}.` },
      { type:"vf", enonce:`Un triangle de côtés ${N("9")}, ${N("40")} et ${N("41")} est rectangle.`, rep:true, expl:`${N("81 + 1600 = 1681 = 41²")}.` },
      { type:"nombre", enonce:`${N("H")} est le pied de la hauteur issue de ${N("A")} (triangle rectangle en ${N("A")}). ${N("BH = 3")} et ${N("CH = 12")}. Calculer ${N("AH")} :`, rep:[6], expl:`${N("AH² = 36")}.` },
      { type:"nombre", enonce:`Mêmes données : calculer ${N("AB²")} :`, rep:[45], expl:`${N("AB² = BH × BC = 3 × 15 = 45")}.` },
      { type:"nombre", enonce:`${N("AB = 6")}, ${N("AC = 8")}, ${N("BC = 10")} (rectangle en ${N("A")}). Calculer ${N("AH")} :`, rep:[4.8], decimal:true, expl:`${N("6 × 8 ÷ 10 = 4,8")}.` },
      { type:"nombre", enonce:`La diagonale d'un carré mesure ${N("√50")} cm. Quel est son côté (cm) ?`, rep:[5], expl:`Le côté ${N("c")} vérifie ${N("c² + c² = 50")} donc ${N("c = 5")}.` },
      { type:"qcm", enonce:`Dans un triangle rectangle en ${N("A")} de hauteur ${N("AH")}, on a :`, options:[N("AB × AC = AH × BC"), N("AB + AC = BC"), N("AH = BC / 2")], rep:0, expl:`Aire calculée de deux façons.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
