// Angles — 1ère année secondaire (1er trimestre)
(function () {
const R = "rouge", B = "bleu", V = "vert";
const deg = d => N(d + "°");

// ---------- figures ----------
const figPar = para({ theta:60, marks:[{ at:"A", reg:1, c:R, t:"α" }, { at:"B", reg:1, c:B, t:"β" }] });
const figAlt = para({ theta:60, marks:[{ at:"A", reg:3, c:R, t:"α" }, { at:"B", reg:1, c:B, t:"β" }] });
const figSup = para({ theta:60, marks:[{ at:"A", reg:1, c:R, t:"α" }, { at:"B", reg:2, c:B, t:"β" }] });
const figQ = (a, b) => para({ theta:70, marks:[{ at:"A", reg:a, c:R, t:"65°" }, { at:"B", reg:b, c:B, t:"?" }] });

const figTri = (t) => dessin({ w:300, h:170, P:{ A:[40,140], B:[260,140], C:[170,30] }, polys:[[["A","B","C"]]], lab:{ A:[-10,10], B:[10,10], C:[0,-14] }, ...t });
const figExt = t => dessin({ w:320, h:170, P:{ A:[40,140], B:[200,140], C:[130,30], D:[300,140] }, polys:[[["A","B","C"]]], segs:[["B","D"]], lab:{ A:[-10,10], B:[0,16], C:[0,-14], D:[10,10] },
  angles:[["B","A","C",R,"50°",26],["A","C","B",B,"60°",24],["C","B","D",V,t,22]] });
const O = [150, 108], rc = 76;
const figCircle = (M, o = {}) => dessin({ w:300, h:200, P:{ O, A:pol(O,rc,200), B:pol(O,rc,340), M:pol(O,rc,M) }, cercles:[["O",rc]], segs:[["O","A"],["O","B"],["M","A"],["M","B"]], lab:{ O:[0,16], A:[-14,4], B:[14,4], M:[0,-14] },
  angles:[["A","O","B",R,o.c || "?",20],["A","M","B",B,o.i || "?",24]] });
const figDiam = dessin({ w:300, h:200, P:{ O, A:pol(O,rc,180), B:pol(O,rc,0), M:pol(O,rc,70) }, cercles:[["O",rc]], segs:[["A","B"],["M","A"],["M","B"]], droits:[["A","M","B",R]], lab:{ O:[0,16], A:[-14,4], B:[14,4], M:[0,-14] } });
const figMemeArc = dessin({ w:300, h:200, P:{ O, A:pol(O,rc,215), B:pol(O,rc,325), M:pol(O,rc,70), N:pol(O,rc,125) }, cercles:[["O",rc]], segs:[["M","A"],["M","B"],["N","A"],["N","B"]], lab:{ O:[0,16], A:[-14,8], B:[14,8], M:[8,-13], N:[-8,-13] },
  angles:[["A","M","B",R,"",22],["A","N","B",B,"",30]] });

const LECON = {
  id: "1-maths-angles",
  langue: "fr",
  titre: "Angles",
  niveaux: [
    {
      titre: "Parallèles et sécante",
      sous: "Angles correspondants, alternes-internes",
      cours: `
        <div class="regle"><b>Deux droites parallèles coupées par une sécante :</b><br>
          • les angles <b>correspondants</b> sont égaux ;<br>
          • les angles <b>alternes-internes</b> sont égaux ;<br>
          • deux angles <b>du même côté</b> de la sécante et entre les parallèles (co-intérieurs) sont <b>supplémentaires</b> (somme ${N("180°")}).</div>
        <div style="text-align:center">${figPar}<div class="legende">Correspondants : ${N("α = β")}</div></div>
        <div style="text-align:center">${figAlt}<div class="legende">Alternes-internes : ${N("α = β")}</div></div>
        <div class="astuce"><b>Réciproque :</b> si deux angles correspondants (ou alternes-internes) sont égaux, alors les deux droites sont parallèles.</div>`,
      questions: [
        { type:"nombre", enonce:`Les droites sont parallèles. L'angle rouge mesure ${deg(65)} et est <b>correspondant</b> à l'angle bleu. Quelle est la mesure de l'angle bleu (en degrés) ?${para({ theta:70, marks:[{ at:"A", reg:1, c:R, t:"65°" }, { at:"B", reg:1, c:B, t:"?" }] })}`, rep:[65], indice:`Correspondants : angles égaux.`, expl:`${deg(65)}.` },
        { type:"nombre", enonce:`Les droites sont parallèles. L'angle rouge mesure ${deg(65)}. L'angle bleu est son <b>alterne-interne</b>. Mesure de l'angle bleu :${para({ theta:70, marks:[{ at:"A", reg:3, c:R, t:"65°" }, { at:"B", reg:1, c:B, t:"?" }] })}`, rep:[65], indice:`Alternes-internes : angles égaux.`, expl:`${deg(65)}.` },
        { type:"nombre", enonce:`Les droites sont parallèles. Les angles rouge (${deg(65)}) et bleu sont du même côté de la sécante, entre les parallèles. Mesure de l'angle bleu :${para({ theta:70, marks:[{ at:"A", reg:3, c:R, t:"65°" }, { at:"B", reg:4, c:B, t:"?" }] })}`, rep:[115], indice:`Co-intérieurs : somme ${N("180°")}.`, expl:`${N("180 − 65 = 115")}.` },
        { type:"qcm", enonce:`Quelle est la relation entre les angles rouge et bleu ?${figSup}`, options:["Ils sont égaux","Ils sont supplémentaires","Ils sont complémentaires"], rep:1, indice:`Ils forment un angle plat.`, expl:`Ils sont adjacents sur une droite : leur somme vaut ${N("180°")}.` },
        { type:"vf", enonce:`Si deux angles alternes-internes sont égaux, alors les deux droites sont parallèles.`, rep:true, indice:`Relis la réciproque.`, expl:`Vrai : c'est la réciproque de la propriété.` },
      ]
    },
    {
      titre: "Angles d'un triangle",
      sous: "Somme = 180° et angle extérieur",
      cours: `
        <div class="regle"><b>Somme des angles :</b> dans un triangle, la somme des mesures des trois angles est ${N("180°")}.</div>
        <div class="regle"><b>Angle extérieur :</b> un angle extérieur d'un triangle est égal à la <b>somme des deux angles intérieurs non adjacents</b>.</div>
        <div style="text-align:center">${figExt("110°")}<div class="legende">${N("C B D = 50° + 60° = 110°")}</div></div>
        <div class="astuce"><b>Cas particuliers :</b> triangle isocèle : deux angles égaux à la base ; équilatéral : trois angles de ${N("60°")} ; rectangle : deux angles aigus complémentaires.</div>`,
      questions: [
        { type:"nombre", enonce:`Dans un triangle ${N("ABC")}, ${N("Â = 50°")} et ${N("B̂ = 60°")}. Mesure de ${N("Ĉ")} (en degrés) :`, rep:[70], indice:`${N("180 − 50 − 60")}.`, expl:`${N("70°")}.` },
        { type:"nombre", enonce:`Un triangle isocèle en ${N("A")} a un angle au sommet ${N("Â = 40°")}. Mesure de ${N("B̂")} :`, rep:[70], indice:`${N("(180 − 40) ÷ 2")}.`, expl:`${N("70°")}.` },
        { type:"nombre", enonce:`Un triangle isocèle a un angle à la base de ${deg(65)}. Mesure de l'angle au sommet :`, rep:[50], indice:`${N("180 − 2 × 65")}.`, expl:`${N("50°")}.` },
        { type:"nombre", enonce:`Dans la figure, quelle est la mesure de l'angle extérieur ${N("C B D")} ?${figExt("?")}`, rep:[110], indice:`Somme des deux angles non adjacents : ${N("50° + 60°")}.`, expl:`${N("110°")}.` },
        { type:"nombre", enonce:`Un triangle rectangle a un angle aigu de ${deg(35)}. Mesure de l'autre angle aigu :`, rep:[55], indice:`Complémentaires.`, expl:`${N("90 − 35 = 55")}.` },
        { type:"vf", enonce:`Un triangle peut avoir deux angles obtus.`, rep:false, indice:`${N("2 × 91 > 180")}.`, expl:`Faux : la somme dépasserait ${N("180°")}.` },
      ]
    },
    {
      titre: "Angle au centre et angle inscrit",
      sous: "L'angle inscrit vaut la moitié de l'angle au centre",
      cours: `
        <div class="regle"><b>Définitions :</b> dans un cercle de centre ${N("O")}, un <b>angle au centre</b> a son sommet en ${N("O")} ; un <b>angle inscrit</b> a son sommet ${N("M")} sur le cercle. Ils <b>interceptent le même arc</b> ${N("AB")} quand leurs côtés passent par ${N("A")} et ${N("B")}.</div>
        <div class="regle"><b>Propriété :</b> un angle inscrit mesure <b>la moitié</b> de l'angle au centre qui intercepte le même arc :
          <div style="text-align:center;margin:6px 0">${N("A M B = ½ × A O B")}</div></div>
        <div style="text-align:center">${figCircle(80, { c:"80°", i:"40°" })}</div>`,
      questions: [
        { type:"nombre", enonce:`L'angle au centre ${N("A O B = 100°")}. Mesure de l'angle inscrit ${N("A M B")} qui intercepte le même arc :${figCircle(80, { c:"100°" })}`, rep:[50], indice:`Moitié.`, expl:`${N("100 ÷ 2 = 50")}.` },
        { type:"nombre", enonce:`L'angle inscrit ${N("A M B = 35°")}. Mesure de l'angle au centre ${N("A O B")} :${figCircle(80, { i:"35°" })}`, rep:[70], indice:`Le double.`, expl:`${N("2 × 35 = 70")}.` },
        { type:"nombre", enonce:`Un angle inscrit vaut ${deg(48)}. Combien mesure l'angle au centre correspondant ?`, rep:[96], indice:`Double.`, expl:`${N("96°")}.` },
        { type:"nombre", enonce:`${N("A B")} est un diamètre et ${N("M")} un point du cercle. Mesure de l'angle ${N("A M B")} :${figDiam}`, rep:[90], indice:`L'angle au centre ${N("A O B")} est plat (${N("180°")}).`, expl:`${N("180 ÷ 2 = 90")} : un triangle inscrit dont un côté est un diamètre est rectangle.` },
        { type:"vf", enonce:`Un angle inscrit peut être plus grand que l'angle au centre qui intercepte le même arc.`, rep:false, indice:`Il en vaut la moitié.`, expl:`Faux.` },
      ]
    },
    {
      titre: "Angles inscrits et quadrilatère inscrit",
      sous: "Même arc, côté diamètre, angles opposés",
      cours: `
        <div class="regle"><b>Même arc :</b> deux angles inscrits qui interceptent le même arc sont <b>égaux</b>.</div>
        <div style="text-align:center">${figMemeArc}<div class="legende">${N("A M B = A N B")}</div></div>
        <div class="regle"><b>Diamètre :</b> si ${N("[AB]")} est un diamètre et ${N("M")} est sur le cercle, alors ${N("A M B = 90°")}.</div>
        <div class="regle"><b>Quadrilatère inscrit :</b> dans un quadrilatère inscrit dans un cercle, les angles <b>opposés</b> sont <b>supplémentaires</b>.</div>`,
      questions: [
        { type:"nombre", enonce:`${N("M")} et ${N("N")} sont deux points du cercle du même côté de ${N("[AB]")}. Si ${N("A M B = 42°")}, mesure de ${N("A N B")} :${figMemeArc}`, rep:[42], indice:`Même arc.`, expl:`${N("42°")}.` },
        { type:"nombre", enonce:`Un quadrilatère ${N("ABCD")} est inscrit dans un cercle, avec ${N("Â = 80°")}. Mesure de l'angle opposé ${N("Ĉ")} :`, rep:[100], indice:`${N("180 − 80")}.`, expl:`${N("100°")}.` },
        { type:"nombre", enonce:`Un triangle ${N("ABC")} est inscrit dans un cercle de diamètre ${N("[BC]")} et ${N("B̂ = 38°")}. Mesure de ${N("Ĉ")} :`, rep:[52], indice:`Le triangle est rectangle en ${N("A")}.`, expl:`${N("90 − 38 = 52")}.` },
        { type:"nombre", enonce:`${N("O")} est le centre d'un cercle ; ${N("A B")} est un arc et l'angle au centre ${N("A O B = 130°")}. Un angle inscrit qui intercepte cet arc mesure :`, rep:[65], indice:`Moitié.`, expl:`${N("65°")}.` },
        { type:"vf", enonce:`Un triangle ${N("ABC")} rectangle en ${N("A")} est inscrit dans le cercle de diamètre ${N("[BC]")}.`, rep:true, indice:`Réciproque de la propriété du diamètre.`, expl:`Vrai : le centre du cercle circonscrit est le milieu de l'hypoténuse.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`Deux droites parallèles sont coupées par une sécante. Un angle mesure ${deg(72)}. Son correspondant mesure :`, rep:[72], expl:`Correspondants égaux.` },
      { type:"nombre", enonce:`Deux angles co-intérieurs entre deux parallèles : l'un mesure ${deg(72)}. L'autre mesure :`, rep:[108], expl:`${N("180 − 72 = 108")}.` },
      { type:"nombre", enonce:`Un triangle a des angles de ${deg(45)} et ${deg(85)}. Le troisième mesure :`, rep:[50], expl:`${N("180 − 130 = 50")}.` },
      { type:"nombre", enonce:`Angle extérieur d'un triangle dont deux angles intérieurs non adjacents mesurent ${deg(30)} et ${deg(75)} :`, rep:[105], expl:`${N("30 + 75")}.` },
      { type:"nombre", enonce:`Un angle inscrit mesure ${deg(27)}. L'angle au centre correspondant mesure :`, rep:[54], expl:`Le double.` },
      { type:"nombre", enonce:`Dans un cercle de centre ${N("O")}, ${N("[AB]")} est un diamètre et ${N("M")} un point du cercle avec ${N("M A B = 28°")}. Mesure de ${N("M B A")} :`, rep:[62], expl:`${N("A M B = 90°")} donc ${N("90 − 28 = 62")}.` },
      { type:"nombre", enonce:`Un quadrilatère inscrit a un angle de ${deg(110)}. Son angle opposé mesure :`, rep:[70], expl:`${N("180 − 110")}.` },
      { type:"vf", enonce:`Deux angles inscrits qui interceptent le même arc sont égaux.`, rep:true, expl:`Vrai.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
