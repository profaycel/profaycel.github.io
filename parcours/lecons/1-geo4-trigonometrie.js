// Rapports trigonométriques d'un angle aigu — 1ère année secondaire (1er trimestre)
(function () {
const R = "rouge", B = "bleu", V = "vert";
const arr = (x, d) => Number(x.toFixed(d));
const rad = d => d * Math.PI / 180;
// triangle ABC rectangle en A, angle B marqué
const figTri = (t = "α") => dessin({ w:300, h:175, P:{ A:[40,140], B:[270,140], C:[40,30] }, polys:[[["A","B","C"]]], droits:[["B","A","C"]],
  angles:[["A","B","C",R,t,34]], lab:{ A:[-12,10], B:[12,10], C:[-12,-8] } });
const figTri2 = (ab, ac, bc) => dessin({ w:300, h:175, P:{ A:[40,140], B:[270,140], C:[40,30] }, polys:[[["A","B","C"]]], droits:[["B","A","C"]],
  textes:[[155,158,ab,B],[22,85,ac,V],[170,75,bc,R]], lab:{ A:[-12,10], B:[12,10], C:[-12,-8] } });

const LECON = {
  id: "1-maths-trigonometrie",
  langue: "fr",
  titre: "Rapports trigonométriques d'un angle aigu",
  niveaux: [
    {
      titre: "Sinus, cosinus, tangente",
      sous: "Définitions dans un triangle rectangle",
      cours: `
        <div class="regle"><b>Dans un triangle rectangle</b> ${N("ABC")} (rectangle en ${N("A")}), pour l'angle aigu ${N("B̂")} :<br>
          • côté <b>opposé</b> : ${N("[AC]")} ; côté <b>adjacent</b> : ${N("[AB]")} ; <b>hypoténuse</b> : ${N("[BC]")}.<br>
          <div style="text-align:center;margin:8px 0">${N("sin B̂")} = ${F("opposé","hypoténuse")} = ${F("AC","BC")} &nbsp; ; &nbsp; ${N("cos B̂")} = ${F("adjacent","hypoténuse")} = ${F("AB","BC")} &nbsp; ; &nbsp; ${N("tan B̂")} = ${F("opposé","adjacent")} = ${F("AC","AB")}</div></div>
        <div style="text-align:center">${figTri("B̂")}</div>
        <div class="astuce"><b>Mnémotechnique :</b> SOH-CAH-TOA (Sinus = Opposé/Hypoténuse, Cosinus = Adjacent/Hypoténuse, Tangente = Opposé/Adjacent). Ces rapports ne dépendent que de l'angle, pas de la taille du triangle.</div>`,
      questions: [
        { type:"qcm", enonce:`Dans le triangle ${N("ABC")} rectangle en ${N("A")}, ${N("sin B̂")} est égal à :${figTri("B̂")}`, options:[F("AC","BC"), F("AB","BC"), F("AC","AB"), F("BC","AC")], rep:0, indice:`Opposé sur hypoténuse.`, expl:`${N("sin B̂")} = ${F("AC","BC")}.` },
        { type:"qcm", enonce:`${N("cos B̂")} est égal à :`, options:[F("AC","BC"), F("AB","BC"), F("AC","AB"), F("AB","AC")], rep:1, indice:`Adjacent sur hypoténuse.`, expl:`${N("cos B̂")} = ${F("AB","BC")}.` },
        { type:"qcm", enonce:`${N("tan B̂")} est égal à :`, options:[F("AC","BC"), F("AB","BC"), F("AC","AB"), F("AB","AC")], rep:2, indice:`Opposé sur adjacent.`, expl:`${N("tan B̂")} = ${F("AC","AB")}.` },
        { type:"nombre", enonce:`Triangle rectangle en ${N("A")} avec ${N("AB = 4")}, ${N("AC = 3")} et ${N("BC = 5")}. Calculer ${N("sin B̂")} (en décimal) :${figTri2("4","3","5")}`, rep:[0.6], decimal:true, indice:`${N("AC/BC = 3/5")}.`, expl:`${N("0,6")}.` },
        { type:"nombre", enonce:`Même triangle : calculer ${N("cos B̂")} :`, rep:[0.8], decimal:true, indice:`${N("AB/BC = 4/5")}.`, expl:`${N("0,8")}.` },
        { type:"nombre", enonce:`Même triangle : calculer ${N("tan B̂")} (fraction irréductible, par exemple ${N("2/5")}) :`, rep:["3/4"], irr:true, indice:`${N("AC/AB")}.`, expl:`${N("3/4")}.` },
      ]
    },
    {
      titre: "Valeurs remarquables",
      sous: "30°, 45°, 60°",
      cours: `
        <div class="regle"><b>Tableau à connaître :</b>
          <div style="overflow:auto"><table class="tab" dir="ltr" style="margin:8px auto;border-collapse:collapse;text-align:center">
          <tr><th style="border:1px solid #cbd5e1;padding:4px 10px"></th><th style="border:1px solid #cbd5e1;padding:4px 10px">30°</th><th style="border:1px solid #cbd5e1;padding:4px 10px">45°</th><th style="border:1px solid #cbd5e1;padding:4px 10px">60°</th></tr>
          <tr><td style="border:1px solid #cbd5e1;padding:4px 10px"><b>sin</b></td><td style="border:1px solid #cbd5e1;padding:4px 10px">1/2</td><td style="border:1px solid #cbd5e1;padding:4px 10px">√2/2</td><td style="border:1px solid #cbd5e1;padding:4px 10px">√3/2</td></tr>
          <tr><td style="border:1px solid #cbd5e1;padding:4px 10px"><b>cos</b></td><td style="border:1px solid #cbd5e1;padding:4px 10px">√3/2</td><td style="border:1px solid #cbd5e1;padding:4px 10px">√2/2</td><td style="border:1px solid #cbd5e1;padding:4px 10px">1/2</td></tr>
          <tr><td style="border:1px solid #cbd5e1;padding:4px 10px"><b>tan</b></td><td style="border:1px solid #cbd5e1;padding:4px 10px">√3/3</td><td style="border:1px solid #cbd5e1;padding:4px 10px">1</td><td style="border:1px solid #cbd5e1;padding:4px 10px">√3</td></tr></table></div></div>
        <div class="exemple"><b>Exemple :</b> hypoténuse ${N("10")} cm, angle ${N("30°")} : côté opposé ${N("= 10 × sin 30° = 5")} cm.</div>`,
      questions: [
        { type:"nombre", enonce:`Dans un triangle rectangle, l'hypoténuse mesure ${N("10")} cm et un angle aigu ${N("30°")}. Longueur du côté opposé à cet angle (cm) :`, rep:[5], indice:`${N("sin 30° = 1/2")}.`, expl:`${N("10 × 1/2 = 5")}.` },
        { type:"nombre", enonce:`Hypoténuse ${N("8")} cm, angle de ${N("60°")}. Longueur du côté <b>adjacent</b> (cm) :`, rep:[4], indice:`${N("cos 60° = 1/2")}.`, expl:`${N("8 × 1/2 = 4")}.` },
        { type:"nombre", enonce:`Dans un triangle rectangle, l'angle aigu vaut ${N("45°")} et le côté adjacent ${N("7")} cm. Longueur du côté opposé (cm) :`, rep:[7], indice:`${N("tan 45° = 1")}.`, expl:`${N("7 × 1 = 7")} : le triangle est isocèle.` },
        { type:"qcm", enonce:`Quel angle aigu vérifie ${N("cos x = 1/2")} ?`, options:["30°","45°","60°"], rep:2, indice:`Cherche dans le tableau.`, expl:`${N("cos 60° = 1/2")}.` },
        { type:"qcm", enonce:`${N("sin 30° + cos 60°")} est égal à :`, options:["1","1/2","√3"], rep:0, indice:`${N("1/2 + 1/2")}.`, expl:`${N("1")}.` },
        { type:"vf", enonce:`${N("sin 45° = cos 45°")}.`, rep:true, indice:`Un angle de ${N("45°")} : triangle isocèle.`, expl:`Vrai : les deux valent ${N("√2/2")}.` },
      ]
    },
    {
      titre: "Relations entre les rapports",
      sous: "cos² + sin² = 1 et tan = sin/cos",
      cours: `
        <div class="regle"><b>Pour tout angle aigu ${N("x")} :</b><br>
          • ${N("0 < sin x < 1")} et ${N("0 < cos x < 1")}<br>
          • ${N("cos² x + sin² x = 1")}<br>
          • ${N("tan x = sin x / cos x")}</div>
        <div class="exemple"><b>Exemple :</b> si ${N("cos x = 0,6")} alors ${N("sin² x = 1 − 0,36 = 0,64")} donc ${N("sin x = 0,8")} et ${N("tan x = 0,8/0,6 = 4/3")}.</div>`,
      questions: [
        { type:"nombre", enonce:`${N("x")} est un angle aigu avec ${N("cos x = 0,6")}. Calculer ${N("sin x")} :`, rep:[0.8], decimal:true, indice:`${N("sin² x = 1 − 0,6² = 0,64")}.`, expl:`${N("sin x = 0,8")}.` },
        { type:"nombre", enonce:`${N("sin x = 0,6")} (angle aigu). Calculer ${N("cos x")} :`, rep:[0.8], decimal:true, indice:`${N("cos² x = 1 − 0,36")}.`, expl:`${N("0,8")}.` },
        { type:"nombre", enonce:`${N("sin x = 0,6")} et ${N("cos x = 0,8")}. Calculer ${N("tan x")} (fraction irréductible) :`, rep:["3/4"], irr:true, indice:`${N("0,6/0,8")}.`, expl:`${N("3/4")}.` },
        { type:"nombre", enonce:`${N("cos x = 5/13")} (angle aigu). Calculer ${N("sin x")} (fraction) :`, rep:["12/13"], irr:true, indice:`${N("sin² x = 1 − 25/169 = 144/169")}.`, expl:`${N("sin x = 12/13")}.` },
        { type:"vf", enonce:`Il existe un angle aigu ${N("x")} tel que ${N("sin x = 1,2")}.`, rep:false, indice:`Pour un angle aigu, ${N("sin x < 1")}.`, expl:`Faux : dans un triangle rectangle, un côté est plus petit que l'hypoténuse.` },
      ]
    },
    {
      titre: "Calculer des longueurs et des angles",
      sous: "Avec la calculatrice",
      cours: `
        <div class="regle"><b>Longueur :</b> on choisit le rapport qui contient la longueur cherchée et une donnée.<br>
          Exemple : ${N("BC = 10")}, ${N("B̂ = 40°")} : ${N("AC = BC × sin 40° ≈ 6,4")}.</div>
        <div class="regle"><b>Angle :</b> on utilise la touche ${N("sin⁻¹")}, ${N("cos⁻¹")} ou ${N("tan⁻¹")} de la calculatrice (mode <b>degrés</b>).<br>
          Exemple : ${N("tan B̂ = 3/4")} donne ${N("B̂ ≈ 36,9°")}.</div>`,
      questions: [
        { type:"nombre", enonce:`${N("ABC")} rectangle en ${N("A")}, ${N("BC = 10")} cm, ${N("B̂ = 40°")}. Calculer ${N("AC")} arrondi à ${N("0,1")} près :`, rep:[arr(10 * Math.sin(rad(40)), 1)], decimal:true, indice:`${N("AC = BC × sin B̂")}.`, expl:`${N("10 × sin 40° ≈ " + arr(10 * Math.sin(rad(40)), 1))} cm.` },
        { type:"nombre", enonce:`Même triangle : calculer ${N("AB")} arrondi à ${N("0,1")} près :`, rep:[arr(10 * Math.cos(rad(40)), 1)], decimal:true, indice:`${N("AB = BC × cos B̂")}.`, expl:`${N("10 × cos 40° ≈ " + arr(10 * Math.cos(rad(40)), 1))} cm.` },
        { type:"nombre", enonce:`${N("ABC")} rectangle en ${N("A")}, ${N("AB = 5")} cm, ${N("B̂ = 50°")}. Calculer ${N("AC")} arrondi à ${N("0,1")} près :`, rep:[arr(5 * Math.tan(rad(50)), 1)], decimal:true, indice:`${N("AC = AB × tan B̂")}.`, expl:`${N("5 × tan 50° ≈ " + arr(5 * Math.tan(rad(50)), 1))} cm.` },
        { type:"nombre", enonce:`${N("ABC")} rectangle en ${N("A")}, ${N("AB = 4")} et ${N("BC = 8")}. Quelle est la mesure de ${N("B̂")} (en degrés) ?`, rep:[60], indice:`${N("cos B̂ = 4/8 = 1/2")}.`, expl:`${N("B̂ = 60°")}.` },
        { type:"nombre", enonce:`Une échelle de ${N("4")} m est appuyée contre un mur et forme un angle de ${N("60°")} avec le sol. À quelle hauteur (en m) touche-t-elle le mur ? Arrondir à ${N("0,1")} près.`, rep:[arr(4 * Math.sin(rad(60)), 1)], decimal:true, indice:`${N("h = 4 × sin 60°")}.`, expl:`${N("4 × √3/2 ≈ " + arr(4 * Math.sin(rad(60)), 1))} m.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"qcm", enonce:`Dans un triangle rectangle, ${N("sin")} d'un angle aigu est égal à :`, options:["opposé / hypoténuse","adjacent / hypoténuse","opposé / adjacent"], rep:0, expl:`SOH.` },
      { type:"nombre", enonce:`Triangle rectangle de côtés ${N("5")}, ${N("12")} et ${N("13")}. ${N("sin")} de l'angle opposé au côté ${N("5")} (fraction) :`, rep:["5/13"], irr:true, expl:`${N("5/13")}.` },
      { type:"nombre", enonce:`Même triangle : ${N("tan")} de cet angle (fraction) :`, rep:["5/12"], irr:true, expl:`${N("5/12")}.` },
      { type:"nombre", enonce:`Hypoténuse ${N("12")} cm, angle ${N("30°")}. Côté opposé (cm) :`, rep:[6], expl:`${N("12 × 1/2")}.` },
      { type:"nombre", enonce:`${N("x")} est un angle aigu avec ${N("cos x = 0,6")}. Calculer ${N("sin x")} :`, rep:[0.8], decimal:true, expl:`${N("sin² x = 0,64")}.` },
      { type:"nombre", enonce:`Angle aigu ${N("x")} tel que ${N("sin x = √2/2")}. Mesure de ${N("x")} (degrés) :`, rep:[45], expl:`${N("45°")}.` },
      { type:"nombre", enonce:`${N("ABC")} rectangle en ${N("A")}, ${N("AB = 6")}, ${N("B̂ = 35°")}. ${N("AC")} arrondi à ${N("0,1")} :`, rep:[arr(6 * Math.tan(rad(35)), 1)], decimal:true, expl:`${N("6 × tan 35° ≈ " + arr(6 * Math.tan(rad(35)), 1))}.` },
      { type:"vf", enonce:`${N("cos² x + sin² x = 1")} pour tout angle aigu ${N("x")}.`, rep:true, expl:`Vrai.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
