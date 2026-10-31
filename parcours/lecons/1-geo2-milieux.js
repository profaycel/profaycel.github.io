// Théorème des milieux — 1ère année secondaire (1er trimestre)
(function () {
const R = "rouge", B = "bleu", V = "vert";
const lerp = (P, Q, t) => [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])];
const A = [150, 22], Bb = [40, 160], C = [270, 160];
const I = lerp(A, Bb, 0.5), J = lerp(A, C, 0.5);
const figMil = dessin({ w:310, h:185, P:{ A, B:Bb, C, I, J }, polys:[[["A","B","C"]]], segs:[["I","J",R]], codes:[["A","I",1,B],["I","B",1,B],["A","J",2,V],["J","C",2,V]],
  lab:{ A:[0,-14], B:[-12,10], C:[12,10], I:[-14,0], J:[14,0] } });
const figRec = dessin({ w:310, h:185, P:{ A, B:Bb, C, I, J:lerp(A, C, 0.5) }, polys:[[["A","B","C"]]], segs:[["I","J",R,true]], codes:[["A","I",1,B],["I","B",1,B]],
  lab:{ A:[0,-14], B:[-12,10], C:[12,10], I:[-14,0], J:[14,0] } });
// trapèze ABCD (AB // DC), I milieu de [AD], J milieu de [BC]
const T = { A:[70,40], B:[250,40], C:[290,150], D:[30,150] };
T.I = lerp(T.A, T.D, 0.5); T.J = lerp(T.B, T.C, 0.5);
const figTrap = dessin({ w:320, h:185, P:T, polys:[[["A","B","C","D"]]], segs:[["I","J",R]], codes:[["A","I",1,B],["I","D",1,B],["B","J",2,V],["J","C",2,V]],
  lab:{ A:[-10,-12], B:[10,-12], C:[12,10], D:[-12,10], I:[-14,0], J:[14,0] } });

const LECON = {
  id: "1-maths-milieux",
  langue: "fr",
  titre: "Théorème des milieux",
  niveaux: [
    {
      titre: "Le théorème des milieux",
      sous: "Parallélisme et moitié",
      cours: `
        <div class="regle"><b>Théorème :</b> dans un triangle, la droite qui passe par les milieux de deux côtés est <b>parallèle au troisième côté</b>, et le segment joignant ces deux milieux mesure <b>la moitié</b> du troisième côté.</div>
        <div style="text-align:center">${figMil}<div class="legende">${N("I")} milieu de ${N("[AB]")}, ${N("J")} milieu de ${N("[AC]")}</div></div>
        <div class="regle" style="text-align:center">${N("(IJ) ∥ (BC)")} et ${N("IJ = BC / 2")}</div>`,
      questions: [
        { type:"nombre", enonce:`${N("I")} est le milieu de ${N("[AB]")}, ${N("J")} celui de ${N("[AC]")} et ${N("BC = 10")} cm. Calculer ${N("IJ")} :${figMil}`, rep:[5], indice:`${N("IJ = BC / 2")}.`, expl:`${N("IJ = 10 ÷ 2 = 5")} cm.` },
        { type:"nombre", enonce:`Même configuration, avec ${N("IJ = 7,5")} cm. Calculer ${N("BC")} :`, rep:[15], decimal:true, indice:`${N("BC = 2 × IJ")}.`, expl:`${N("15")} cm.` },
        { type:"nombre", enonce:`Un triangle ${N("ABC")} a pour côtés ${N("AB = 6")}, ${N("AC = 8")} et ${N("BC = 10")}. On joint les milieux des trois côtés. Quel est le <b>périmètre</b> du triangle obtenu ?`, rep:[12], indice:`Chaque côté est la moitié d'un côté de ${N("ABC")}.`, expl:`${N("3 + 4 + 5 = 12")} (moitié du périmètre ${N("24")}).` },
        { type:"qcm", enonce:`Dans la figure, quelle est la relation entre ${N("(IJ)")} et ${N("(BC)")} ?${figMil}`, options:["Elles sont parallèles","Elles sont perpendiculaires","Elles sont sécantes sans être perpendiculaires"], rep:0, indice:`Théorème des milieux.`, expl:`${N("(IJ) ∥ (BC)")}.` },
        { type:"vf", enonce:`Dans un triangle, le segment qui joint les milieux de deux côtés mesure le tiers du troisième côté.`, rep:false, indice:`Relis le théorème.`, expl:`Faux : il mesure la moitié.` },
      ]
    },
    {
      titre: "Réciproque du théorème des milieux",
      sous: "Une parallèle passant par un milieu",
      cours: `
        <div class="regle"><b>Réciproque :</b> dans un triangle, si une droite passe par le milieu d'un côté et est <b>parallèle</b> à un deuxième côté, alors elle coupe le troisième côté <b>en son milieu</b>.</div>
        <div style="text-align:center">${figRec}<div class="legende">${N("I")} milieu de ${N("[AB]")} et ${N("(IJ) ∥ (BC)")} ⟹ ${N("J")} milieu de ${N("[AC]")}</div></div>`,
      questions: [
        { type:"qcm", enonce:`Dans le triangle ${N("ABC")}, ${N("I")} est le milieu de ${N("[AB]")} et la parallèle à ${N("(BC)")} passant par ${N("I")} coupe ${N("(AC)")} en ${N("J")}. Alors :`, options:[N("J est le milieu de [AC]"), N("J est le milieu de [BC]"), N("AJ = BC")], rep:0, indice:`Réciproque du théorème des milieux.`, expl:`${N("J")} est le milieu de ${N("[AC]")}.` },
        { type:"nombre", enonce:`Avec la configuration précédente, ${N("AC = 9")}. Calculer ${N("AJ")} :`, rep:[4.5], decimal:true, indice:`${N("J")} est le milieu de ${N("[AC]")}.`, expl:`${N("AJ = 4,5")}.` },
        { type:"vf", enonce:`Une droite parallèle à ${N("(BC)")} qui passe par un point quelconque de ${N("[AB]")} coupe toujours ${N("[AC]")} en son milieu.`, rep:false, indice:`Il faut que le point soit le <b>milieu</b> de ${N("[AB]")}.`, expl:`Faux : c'est le théorème de Thalès qui s'applique dans le cas général.` },
        { type:"nombre", enonce:`${N("I")} est le milieu de ${N("[AB]")}, ${N("(IJ) ∥ (BC)")} avec ${N("J")} sur ${N("[AC]")}, et ${N("IJ = 6")}. Calculer ${N("BC")} :`, rep:[12], indice:`${N("J")} est le milieu de ${N("[AC]")}, donc ${N("BC = 2 × IJ")}.`, expl:`${N("12")}.` },
      ]
    },
    {
      titre: "Droite des milieux dans un trapèze",
      sous: "(a + b) / 2",
      cours: `
        <div class="regle"><b>Dans un trapèze</b> ${N("ABCD")} de bases ${N("[AB]")} et ${N("[DC]")} (${N("AB ∥ DC")}), le segment joignant les milieux ${N("I")} de ${N("[AD]")} et ${N("J")} de ${N("[BC]")} est parallèle aux bases et mesure la <b>demi-somme</b> des bases :
          <div style="text-align:center;margin:6px 0">${N("IJ = (AB + DC) / 2")}</div></div>
        <div style="text-align:center">${figTrap}</div>`,
      questions: [
        { type:"nombre", enonce:`Dans un trapèze, les bases mesurent ${N("6")} cm et ${N("10")} cm. Quelle est la longueur du segment joignant les milieux des côtés non parallèles ?${figTrap}`, rep:[8], indice:`${N("(6 + 10) / 2")}.`, expl:`${N("8")} cm.` },
        { type:"nombre", enonce:`Un trapèze a une petite base de ${N("5")} cm et un segment des milieux de ${N("8")} cm. Quelle est la grande base (en cm) ?`, rep:[11], indice:`${N("5 + DC = 16")}.`, expl:`${N("2 × 8 − 5 = 11")}.` },
        { type:"vf", enonce:`Le segment des milieux d'un trapèze est parallèle aux bases.`, rep:true, indice:`Voir le cours.`, expl:`Vrai.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`${N("I")} et ${N("J")} sont les milieux de ${N("[AB]")} et ${N("[AC]")}. Si ${N("BC = 18")}, calculer ${N("IJ")} :`, rep:[9], expl:`${N("18 ÷ 2")}.` },
      { type:"nombre", enonce:`Même figure avec ${N("IJ = 3,5")}. Calculer ${N("BC")} :`, rep:[7], decimal:true, expl:`${N("2 × 3,5")}.` },
      { type:"nombre", enonce:`Un triangle a pour périmètre ${N("30")} cm. Quel est le périmètre du triangle formé en joignant les milieux de ses côtés ?`, rep:[15], expl:`Moitié.` },
      { type:"qcm", enonce:`${N("(IJ)")} et ${N("(BC)")} sont :`, options:["parallèles","perpendiculaires","confondues"], rep:0, expl:`Théorème des milieux.` },
      { type:"nombre", enonce:`Trapèze de bases ${N("12")} et ${N("20")} : longueur du segment joignant les milieux des côtés non parallèles :`, rep:[16], expl:`${N("(12 + 20) / 2")}.` },
      { type:"vf", enonce:`Dans un triangle ${N("ABC")}, si ${N("I")} est le milieu de ${N("[AB]")} et ${N("(IJ) ∥ (BC)")} (${N("J ∈ (AC)")}), alors ${N("J")} est le milieu de ${N("[AC]")}.`, rep:true, expl:`Réciproque du théorème des milieux.` },
      { type:"nombre", enonce:`${N("ABC")} a pour côtés ${N("AB = 14")}, ${N("AC = 10")}, ${N("BC = 12")}. Quelle est la longueur ${N("IJ")} avec ${N("I")} milieu de ${N("[AB]")} et ${N("J")} milieu de ${N("[AC]")} ?`, rep:[6], expl:`${N("12 ÷ 2")}.` },
      { type:"vf", enonce:`Le segment joignant les milieux de deux côtés d'un triangle mesure toujours la moitié du troisième côté.`, rep:true, expl:`Vrai.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
