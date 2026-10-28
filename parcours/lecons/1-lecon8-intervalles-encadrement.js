// Intervalles et encadrement — 1ère année secondaire (1er trimestre)
(function () {
const LECON = {
  id: "1-maths-intervalles-encadrement",
  langue: "fr",
  titre: "Intervalles et encadrement",
  niveaux: [
    {
      titre: "Intervalles de ℝ",
      sous: "Notation, crochets ouverts et fermés",
      cours: `
        <div class="regle"><b>Intervalles bornés (${N("a < b")}) :</b><br>
          • ${N("[a ; b]")} = ${N("{x ∈ ℝ : a ≤ x ≤ b}")} (fermé)<br>
          • ${N("]a ; b[")} = ${N("{x : a < x < b}")} (ouvert)<br>
          • ${N("[a ; b[")} et ${N("]a ; b]")} (semi-ouverts)</div>
        <div class="regle"><b>Intervalles non bornés :</b> ${N("[a ; +∞[")} = ${N("{x : x ≥ a}")} ; ${N("]−∞ ; a[")} = ${N("{x : x < a}")}. Le crochet est <b>toujours ouvert</b> du côté de ${N("±∞")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("3 ∈ [1 ; 3]")} mais ${N("3 ∉ [1 ; 3[")}.</div>`,
      questions: [
        { type:"qcm", enonce:`L'ensemble ${N("{x ∈ ℝ : −2 ≤ x < 5}")} s'écrit :`, options:[N("[−2 ; 5]"), N("[−2 ; 5["), N("]−2 ; 5["), N("]−2 ; 5]")], rep:1, indice:`${N("−2")} est inclus, ${N("5")} est exclu.`, expl:`${N("[−2 ; 5[")}.` },
        { type:"qcm", enonce:`L'ensemble ${N("{x ∈ ℝ : x > 4}")} s'écrit :`, options:[N("[4 ; +∞["), N("]4 ; +∞["), N("]−∞ ; 4["), N("]4 ; +∞]")], rep:1, indice:`${N("4")} est exclu, et le crochet est ouvert en ${N("+∞")}.`, expl:`${N("]4 ; +∞[")}.` },
        { type:"multi", enonce:`Choisir <u>tous</u> les éléments de l'intervalle ${N("[−1 ; 2[")} :`, options:["−1","0","2","1,99","2,5"], rep:[0,1,3], indice:`${N("−1")} inclus, ${N("2")} exclu.`, expl:`${N("−1")}, ${N("0")} et ${N("1,99")} appartiennent à ${N("[−1 ; 2[")}.` },
        { type:"vf", enonce:`${N("√2 ∈ ]1 ; 2[")}.`, rep:true, indice:`${N("√2 ≈ 1,41")}.`, expl:`Vrai.` },
        { type:"vf", enonce:`${N("−∞ ∈ ]−∞ ; 0[")}.`, rep:false, indice:`${N("−∞")} n'est pas un nombre réel.`, expl:`Faux : le crochet est ouvert du côté de ${N("−∞")}.` },
        { type:"nombre", enonce:`Combien d'entiers appartiennent à ${N("]−2 ; 3]")} ?`, rep:[5], indice:`${N("−1, 0, 1, 2, 3")}.`, expl:`5 entiers.` },
      ]
    },
    {
      titre: "Intersection et réunion d'intervalles",
      sous: "I ∩ J et I ∪ J",
      cours: `
        <div class="regle"><b>Définitions :</b> ${N("I ∩ J")} = les réels qui sont dans ${N("I")} <b>et</b> dans ${N("J")} ; ${N("I ∪ J")} = les réels qui sont dans ${N("I")} <b>ou</b> dans ${N("J")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("I = [−1 ; 4[")} et ${N("J = ]2 ; 7]")} : ${N("I ∩ J = ]2 ; 4[")} et ${N("I ∪ J = [−1 ; 7]")}.</div>
        <div class="astuce">On dessine les intervalles sur une droite graduée pour ne pas se tromper aux bornes.</div>`,
      questions: [
        { type:"qcm", enonce:`${N("[−1 ; 4[ ∩ ]2 ; 7]")} est égal à :`, options:[N("]2 ; 4["), N("[2 ; 4]"), N("]2 ; 4]"), N("[−1 ; 7]")], rep:0, indice:`Les deux bornes intérieures sont exclues : ${N("2")} (de ${N("J")}) et ${N("4")} (de ${N("I")}).`, expl:`${N("]2 ; 4[")}.` },
        { type:"qcm", enonce:`${N("[−1 ; 4[ ∪ ]2 ; 7]")} est égal à :`, options:[N("[−1 ; 7]"), N("]−1 ; 7["), N("[−1 ; 7["), N("]2 ; 4[")], rep:0, indice:`Les intervalles se chevauchent.`, expl:`${N("[−1 ; 7]")}.` },
        { type:"qcm", enonce:`${N("]−∞ ; 3] ∩ [0 ; +∞[")} est égal à :`, options:[N("[0 ; 3]"), N("]0 ; 3["), N("]−∞ ; +∞["), N("∅")], rep:0, indice:`Les réels ${N("x ≤ 3")} et ${N("x ≥ 0")}.`, expl:`${N("[0 ; 3]")}.` },
        { type:"qcm", enonce:`${N("[1 ; 2[ ∩ ]3 ; 5]")} est égal à :`, options:[N("∅"), N("[1 ; 5]"), N("]2 ; 3[")], rep:0, indice:`Ces deux intervalles se touchent-ils ?`, expl:`Ils sont disjoints : l'intersection est vide.` },
        { type:"vf", enonce:`${N("[0 ; 2] ∪ [2 ; 5] = [0 ; 5]")}.`, rep:true, indice:`Le réel ${N("2")} est dans les deux.`, expl:`Vrai.` },
        { type:"vf", enonce:`${N("[0 ; 2[ ∪ ]2 ; 5] = [0 ; 5]")}.`, rep:false, indice:`Que devient ${N("2")} ?`, expl:`Faux : ${N("2")} n'appartient à aucun des deux intervalles.` },
      ]
    },
    {
      titre: "Encadrement d'une somme et d'une différence",
      sous: "a ≤ x ≤ b et c ≤ y ≤ d",
      cours: `
        <div class="regle"><b>Somme :</b> si ${N("a ≤ x ≤ b")} et ${N("c ≤ y ≤ d")} alors ${N("a + c ≤ x + y ≤ b + d")}.<br>
          <b>Différence :</b> ${N("a − d ≤ x − y ≤ b − c")} (on retourne d'abord l'encadrement de ${N("y")} : ${N("−d ≤ −y ≤ −c")}).</div>
        <div class="exemple"><b>Exemple :</b> ${N("2 ≤ x ≤ 3")} et ${N("1 ≤ y ≤ 4")} : ${N("3 ≤ x + y ≤ 7")} et ${N("2 − 4 ≤ x − y ≤ 3 − 1")} soit ${N("−2 ≤ x − y ≤ 2")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Si ${N("2 ≤ x ≤ 3")} et ${N("1 ≤ y ≤ 4")}, quelle est la borne <b>inférieure</b> de ${N("x + y")} ?`, rep:[3], indice:`${N("2 + 1")}.`, expl:`${N("3")}.` },
        { type:"nombre", enonce:`Quelle est la borne <b>supérieure</b> de ${N("x + y")} ?`, rep:[7], indice:`${N("3 + 4")}.`, expl:`${N("7")}.` },
        { type:"nombre", enonce:`Quelle est la borne inférieure de ${N("x − y")} ?`, rep:[-2], indice:`${N("a − d = 2 − 4")}.`, expl:`${N("−2")}.` },
        { type:"nombre", enonce:`Quelle est la borne supérieure de ${N("x − y")} ?`, rep:[2], indice:`${N("b − c = 3 − 1")}.`, expl:`${N("2")}.` },
        { type:"nombre", enonce:`Si ${N("−1 ≤ x ≤ 2")}, quelle est la borne supérieure de ${N("3x + 1")} ?`, rep:[7], indice:`On multiplie par ${N("3 > 0")} : ${N("−3 ≤ 3x ≤ 6")}, puis on ajoute ${N("1")}.`, expl:`${N("−2 ≤ 3x + 1 ≤ 7")}.` },
        { type:"nombre", enonce:`Si ${N("−1 ≤ x ≤ 2")}, quelle est la borne inférieure de ${N("−2x + 5")} ?`, rep:[1], indice:`On multiplie par ${N("−2")} : le sens change : ${N("−4 ≤ −2x ≤ 2")}.`, expl:`${N("1 ≤ −2x + 5 ≤ 9")}.` },
      ]
    },
    {
      titre: "Encadrement d'un produit et d'un quotient",
      sous: "Cas des réels positifs",
      cours: `
        <div class="regle"><b>Pour des réels positifs :</b> si ${N("0 < a ≤ x ≤ b")} et ${N("0 < c ≤ y ≤ d")} alors ${N("ac ≤ xy ≤ bd")}.<br>
          Pour le quotient : ${N("a/d ≤ x/y ≤ b/c")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("2 ≤ x ≤ 3")} et ${N("4 ≤ y ≤ 5")} : ${N("8 ≤ xy ≤ 15")} et ${N("2/5 ≤ x/y ≤ 3/4")}.</div>
        <div class="astuce"><b>Application :</b> encadrer l'aire ${N("A = L × l")} d'un rectangle dont on connaît des encadrements de ${N("L")} et ${N("l")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Si ${N("2 ≤ x ≤ 3")} et ${N("4 ≤ y ≤ 5")}, quelle est la borne inférieure de ${N("xy")} ?`, rep:[8], indice:`${N("2 × 4")}.`, expl:`${N("8")}.` },
        { type:"nombre", enonce:`Quelle est la borne supérieure de ${N("xy")} ?`, rep:[15], indice:`${N("3 × 5")}.`, expl:`${N("15")}.` },
        { type:"nombre", enonce:`Quelle est la borne inférieure de ${N("x / y")} ? (forme ${N("a/b")})`, rep:["2/5"], irr:true, indice:`${N("a/d = 2/5")}.`, expl:`${N("2/5")}.` },
        { type:"nombre", enonce:`Un rectangle a pour longueur ${N("L")} avec ${N("5,1 ≤ L ≤ 5,2")} (cm) et pour largeur ${N("l")} avec ${N("2,0 ≤ l ≤ 2,1")} (cm). Quelle est la borne supérieure de l'aire en cm² ?`, rep:[10.92], decimal:true, indice:`${N("5,2 × 2,1")}.`, expl:`${N("5,2 × 2,1 = 10,92")}.` },
        { type:"nombre", enonce:`Pour le même rectangle, quelle est la borne inférieure du périmètre ${N("2(L + l)")} en cm ?`, rep:[14.2], decimal:true, indice:`${N("2 × (5,1 + 2,0)")}.`, expl:`${N("2 × 7,1 = 14,2")}.` },
        { type:"vf", enonce:`Si ${N("1 ≤ x ≤ 2")} alors ${N("1/2 ≤ 1/x ≤ 1")}.`, rep:true, indice:`L'inverse renverse l'ordre.`, expl:`Vrai.` },
      ]
    },
  ],
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"qcm", enonce:`L'ensemble ${N("{x : −3 < x ≤ 1}")} s'écrit :`, options:[N("]−3 ; 1]"), N("[−3 ; 1["), N("]−3 ; 1["), N("[−3 ; 1]")], rep:0, expl:`${N("−3")} exclu, ${N("1")} inclus.` },
      { type:"qcm", enonce:`${N("[−2 ; 3[ ∩ ]0 ; 5]")} est égal à :`, options:[N("]0 ; 3["), N("[0 ; 3]"), N("[−2 ; 5]")], rep:0, expl:`${N("]0 ; 3[")}.` },
      { type:"qcm", enonce:`${N("]−∞ ; 1[ ∪ [1 ; +∞[")} est égal à :`, options:[N("ℝ"), N("ℝ privé de 1"), N("∅")], rep:0, expl:`${N("1")} appartient au deuxième intervalle : on obtient ${N("ℝ")}.` },
      { type:"nombre", enonce:`Si ${N("1 ≤ x ≤ 4")} et ${N("2 ≤ y ≤ 3")}, borne supérieure de ${N("x + y")} :`, rep:[7], expl:`${N("4 + 3")}.` },
      { type:"nombre", enonce:`Mêmes données : borne inférieure de ${N("x − y")} :`, rep:[-2], expl:`${N("1 − 3 = −2")}.` },
      { type:"nombre", enonce:`Mêmes données : borne supérieure de ${N("xy")} :`, rep:[12], expl:`${N("4 × 3")}.` },
      { type:"nombre", enonce:`Si ${N("−2 ≤ x ≤ 1")}, borne supérieure de ${N("5 − 3x")} :`, rep:[11], expl:`${N("−2 ≤ x ≤ 1")} donne ${N("−3 ≤ −3x ≤ 6")}, donc ${N("2 ≤ 5 − 3x ≤ 11")}.` },
      { type:"vf", enonce:`${N("0 ∈ ]0 ; 1[")}.`, rep:false, expl:`Faux : le crochet est ouvert en ${N("0")}.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
