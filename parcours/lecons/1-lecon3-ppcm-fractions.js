// PPCM et fractions irréductibles — 1ère année secondaire (1er trimestre)
// Sources : cours « Activités numériques I » (1ère année), série Pyramide (devoir de contrôle n°1), séries de 1ère année
(function () {
const S   = (a, n) => n === 1 ? String(a) : `${a}<sup>${n}</sup>`;
const choisir = (L, f) => L.map((x, i) => f(x) ? i : -1).filter(i => i >= 0);
const fact = n => { const r = []; for (let p = 2; n > 1; p++) { let e = 0; while (n % p === 0) { n /= p; e++ } if (e) r.push([p, e]) } return r };
const factTxt = n => fact(n).map(([p, e]) => S(p, e)).join(" × ");
const ppcm = (a, b) => a / pgcd(a, b) * b;
const mult = (a, k) => Array.from({ length: k }, (_, i) => a * (i + 1));
const red = (a, b) => `${a / pgcd(a, b)}/${b / pgcd(a, b)}`;
const liste = L => L.map(x => N(x)).join(" ; ");
const OK = "✅", KO = "❌";

const LECON = {
  id: "1-maths-ppcm-fractions",
  langue: "fr",
  titre: "PPCM et fractions irréductibles",
  niveaux: [
    // ---------------------------------------------------------------- 0
    {
      titre: "Multiples et PPCM",
      sous: "Le plus petit multiple commun non nul",
      cours: `
        <div class="regle"><b>Définition :</b> le <b>PPCM</b> de deux entiers naturels non nuls ${N("a")} et ${N("b")} est le plus petit entier non nul qui est à la fois un multiple de ${N("a")} et de ${N("b")}. On le note ${N("PPCM(a , b)")}.</div>
        <div class="exemple"><b>Exemple :</b> ${N("PPCM(12 ; 18)")} :<br>
          multiples de ${N("12")} : ${N("12 , 24 , 36 , 48 , 60 , 72 , …")}<br>
          multiples de ${N("18")} : ${N("18 , 36 , 54 , 72 , …")}<br>
          multiples communs : ${N("36 , 72 , …")} donc ${N("PPCM(12 ; 18) = 36")}.</div>
        <div class="astuce"><b>Remarques :</b><br>
          • ${N("PPCM(a ; b)")} est supérieur ou égal à ${N("a")} et à ${N("b")}.<br>
          • Si ${N("a")} est un multiple de ${N("b")}, alors ${N("PPCM(a ; b) = a")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Quel est le PPCM de ${N("6")} et ${N("8")} ?`, rep:[ppcm(6,8)],
          indice:`Multiples de ${N("8")} : ${N("8 , 16 , 24 , …")}. Lequel est divisible par ${N("6")} ?`,
          expl:`Multiples de ${N("8")} : ${liste(mult(8,4))}. Le premier multiple de ${N("6")} est ${N(ppcm(6,8))}.` },
        { type:"nombre", enonce:`Quel est le PPCM de ${N("12")} et ${N("15")} ?`, rep:[ppcm(12,15)],
          indice:`Multiples de ${N("15")} : ${N("15 , 30 , 45 , 60 …")}`,
          expl:`${liste(mult(15,4))} : ${N("60 = 12 × 5")} donc ${N("PPCM = " + ppcm(12,15))}.` },
        { type:"nombre", enonce:`Quel est le PPCM de ${N("9")} et ${N("27")} ?`, rep:[ppcm(9,27)],
          indice:`${N("27")} est-il un multiple de ${N("9")} ?`,
          expl:`${N("27 = 9 × 3")} donc ${N("PPCM(9 ; 27) = 27")}.` },
        { type:"multi", enonce:`Choisir <u>tous</u> les multiples communs de ${N("4")} et ${N("6")} :`, options:["12","16","18","24","30","36"], rep:choisir([12,16,18,24,30,36], m => m % 4 === 0 && m % 6 === 0),
          indice:`Le nombre doit être divisible par ${N("4")} et par ${N("6")}.`,
          expl:`${N("12 , 24 , 36")} ${OK} (multiples de ${N("12 = PPCM(4 ; 6)")}). ${N("16")} n'est pas divisible par ${N("6")} ; ${N("18")} et ${N("30")} ne sont pas divisibles par ${N("4")}.` },
        { type:"vf", enonce:`Le PPCM de ${N("7")} et ${N("21")} est ${N("21")}.`, rep:ppcm(7,21) === 21,
          indice:`${N("21 = 7 × 3")}.`,
          expl:`Vrai : ${N("21")} est un multiple de ${N("7")}, c'est donc le plus petit multiple commun.` },
        { type:"vf", enonce:`Le PPCM de ${N("10")} et ${N("4")} peut être inférieur à ${N("10")}.`, rep:false,
          indice:`Un multiple commun est un multiple de ${N("10")}.`,
          expl:`Faux : c'est un multiple de ${N("10")}, donc il est supérieur ou égal à ${N("10")}. En fait ${N("PPCM(10 ; 4) = " + ppcm(10,4))}.` },
      ]
    },
    // ---------------------------------------------------------------- 1
    {
      titre: "PPCM par décomposition",
      sous: "Tous les facteurs avec leur plus grand exposant",
      cours: `
        <div class="regle"><b>Méthode :</b> on décompose les deux nombres en produit de facteurs premiers, puis on prend <b>tous les facteurs</b> (communs et non communs) avec leur <b>plus grand exposant</b>.</div>
        <div class="exemple"><b>Exemple :</b> ${N("PPCM(210 ; 126)")} :<br>
          ${N("210 = " + factTxt(210))} et ${N("126 = " + factTxt(126))}<br>
          ${N("PPCM = 2 × " + S(3,2) + " × 5 × 7 = " + ppcm(210,126))}.</div>
        <div class="astuce"><b>Pour comparer :</b> PGCD → facteurs <b>communs</b> avec le <b>plus petit</b> exposant ; PPCM → <b>tous</b> les facteurs avec le <b>plus grand</b> exposant.</div>`,
      questions: [
        { type:"nombre", enonce:`Quel est le PPCM de ${N("210")} et ${N("126")} ?`, rep:[ppcm(210,126)],
          indice:`${N("210 = " + factTxt(210))} et ${N("126 = " + factTxt(126))}.`,
          expl:`${N("2 × " + S(3,2) + " × 5 × 7 = " + ppcm(210,126))}.` },
        { type:"nombre", enonce:`Quel est le PPCM de ${N("72")} et ${N("60")} ?`, rep:[ppcm(72,60)],
          indice:`${N("72 = " + factTxt(72))} et ${N("60 = " + factTxt(60))}.`,
          expl:`${N(S(2,3) + " × " + S(3,2) + " × 5 = " + ppcm(72,60))}.` },
        { type:"nombre", enonce:`Quel est le PPCM de ${N("45")} et ${N("50")} ?`, rep:[ppcm(45,50)],
          indice:`${N("45 = " + factTxt(45))} et ${N("50 = " + factTxt(50))}.`,
          expl:`${N("2 × " + S(3,2) + " × " + S(5,2) + " = " + ppcm(45,50))}.` },
        { type:"nombre", enonce:`Quel est le PPCM de ${N("264")} et ${N("630")} ?`, rep:[ppcm(264,630)],
          indice:`${N("264 = " + factTxt(264))} et ${N("630 = " + factTxt(630))}.`,
          expl:`${N(S(2,3) + " × " + S(3,2) + " × 5 × 7 × 11 = " + ppcm(264,630))}.` },
        (function () {
          const O = [N(S(2,3) + " × " + S(3,2) + " × 5"), N(S(2,2) + " × 3 × 5"), N(S(2,3) + " × 3 × 5"), N(S(2,2) + " × " + S(3,2) + " × 5")];
          const vals = [8*9*5, 4*3*5, 8*3*5, 4*9*5];
          return { type:"qcm", enonce:`Le PPCM de ${N("24 = " + factTxt(24))} et ${N("45 = " + factTxt(45))} est :`, options:O, rep:vals.findIndex(x => x === ppcm(24,45)),
            indice:`On prend tous les facteurs avec le plus grand exposant : ${N("2")}, ${N("3")} et ${N("5")}.`,
            expl:`${N(S(2,3) + " × " + S(3,2) + " × 5 = " + ppcm(24,45))}.` };
        })(),
        { type:"vf", enonce:`Dans la décomposition du PPCM, on trouve tous les facteurs premiers qui apparaissent dans ${N("a")} ou dans ${N("b")}.`, rep:true,
          indice:`Relis la méthode du cours.`,
          expl:`Vrai : on prend tous les facteurs (communs et non communs) avec leur plus grand exposant.` },
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      titre: "Relation entre PGCD et PPCM",
      sous: "PGCD × PPCM = a × b",
      cours: `
        <div class="regle"><b>Propriété :</b> pour tous entiers naturels non nuls ${N("a")} et ${N("b")} :
          <div style="text-align:center;margin:8px 0">${N("PGCD(a , b) × PPCM(a , b) = a × b")}</div></div>
        <div class="exemple"><b>Exemple :</b> ${N("PGCD(264 ; 630) = 6")} et ${N("264 × 630 = 166320")}<br>
          donc ${N("PPCM(264 ; 630) = 166320 ÷ 6 = 27720")}.</div>
        <div class="astuce"><b>Deux cas particuliers :</b><br>
          • si ${N("a")} et ${N("b")} sont premiers entre eux, alors ${N("PPCM(a ; b) = a × b")} ;<br>
          • si ${N("a")} est un multiple de ${N("b")}, alors ${N("PGCD(a ; b) = b")} et ${N("PPCM(a ; b) = a")}.</div>`,
      questions: [
        { type:"nombre", enonce:`${N("PGCD(36 ; 60) = 12")}. Quel est le PPCM de ${N("36")} et ${N("60")} ?`, rep:[36*60/12],
          indice:`${N("PPCM = (a × b) ÷ PGCD")}.`,
          expl:`${N("36 × 60 = 2160")} donc ${N("2160 ÷ 12 = 180")}.` },
        { type:"nombre", enonce:`Quel est le PPCM de ${N("35")} et ${N("26")} ? (utilise le fait qu'ils sont premiers entre eux)`, rep:[35*26],
          indice:`${N("PGCD(35 ; 26) = 1")}.`,
          expl:`${N("PPCM = 35 × 26 = " + (35*26))}.` },
        { type:"nombre", enonce:`Le PGCD de ${N("48")} et ${N("180")} est ${N("12")}. Quel est leur PPCM ?`, rep:[48*180/pgcd(48,180)],
          indice:`Calcule ${N("48 × 180")} puis divise par ${N("12")}.`,
          expl:`${N("48 × 180 = 8640")} donc ${N("8640 ÷ 12 = " + ppcm(48,180))}.` },
        { type:"nombre", enonce:`Deux entiers ${N("a")} et ${N("b")} ont pour PGCD ${N("7")} et pour PPCM ${N("210")}. Si ${N("a = 21")}, quelle est la valeur de ${N("b")} ?`, rep:[7*210/21],
          indice:`${N("a × b = PGCD × PPCM = 7 × 210")}.`,
          expl:`${N("a × b = 7 × 210 = 1470")} donc ${N("b = 1470 ÷ 21 = 70")}. (Vérification : ${N("PGCD(21 ; 70) = 7")} ${OK})` },
        { type:"vf", enonce:`Si ${N("b")} est un multiple de ${N("a")}, alors ${N("PPCM(a ; b) = b")}.`, rep:true,
          indice:`Exemple : ${N("a = 6")} et ${N("b = 18")}.`,
          expl:`Vrai : ${N("b")} est un multiple de ${N("a")} et de ${N("b")}, et c'est le plus petit possible. Par exemple ${N("PPCM(6 ; 18) = 18")}.` },
        { type:"vf", enonce:`Le PPCM de ${N("12")} et ${N("30")} est égal à ${N("12 × 30 = 360")}.`, rep:ppcm(12,30) === 360,
          indice:`${N("12")} et ${N("30")} sont-ils premiers entre eux ?`,
          expl:`Faux : ${N("PGCD(12 ; 30) = 6")} donc ${N("PPCM = 360 ÷ 6 = " + ppcm(12,30))}.` },
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      titre: "Fraction irréductible",
      sous: "On divise numérateur et dénominateur par leur PGCD",
      cours: `
        <div class="regle"><b>Définition :</b> la fraction ${F("a","b")} est <b>irréductible</b> si ${N("PGCD(a ; b) = 1")}.</div>
        <div class="regle"><b>Rendre une fraction irréductible :</b> on divise le numérateur et le dénominateur par leur PGCD.<br>
          Si ${N("PGCD(a ; b) = d")}, alors ${F("a","b")} ${N("=")} ${F("a ÷ d","b ÷ d")} et cette dernière fraction est irréductible.</div>
        <div class="exemple"><b>Exemple :</b> ${N("PGCD(385 ; 140) = 35")} donc ${F("385","140")} ${N("=")} ${F("385 ÷ 35","140 ÷ 35")} ${N("=")} ${F("11","4")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Écrire la fraction ${F("385","140")} sous forme irréductible (écrire par exemple ${N("3/4")}).`, rep:[red(385,140)], irr:true,
          indice:`${N("PGCD(385 ; 140) = 35")}.`,
          expl:`${N("385 ÷ 35 = 11")} et ${N("140 ÷ 35 = 4")} donc ${F("11","4")}.` },
        { type:"nombre", enonce:`Écrire la fraction ${F("330","378")} sous forme irréductible.`, rep:[red(330,378)], irr:true,
          indice:`${N("330 = " + factTxt(330))} et ${N("378 = " + factTxt(378))}.`,
          expl:`${N("PGCD = " + pgcd(330,378))} donc ${N("330 ÷ 6 = 55")} et ${N("378 ÷ 6 = 63")} : ${F("55","63")}.` },
        { type:"nombre", enonce:`Écrire la fraction ${F("168","180")} sous forme irréductible.`, rep:[red(168,180)], irr:true,
          indice:`${N("PGCD(168 ; 180) = 12")}.`,
          expl:`${N("168 ÷ 12 = 14")} et ${N("180 ÷ 12 = 15")} donc ${F("14","15")}.` },
        (function () {
          const L = [[6,35],[12,18],[9,28],[15,25],[21,22]];
          return { type:"multi", enonce:`Choisir <u>toutes</u> les fractions irréductibles :`, options:L.map(o => `${o[0]}/${o[1]}`), rep:choisir(L, o => pgcd(o[0], o[1]) === 1),
            indice:`La fraction ${F("a","b")} est irréductible si ${N("PGCD(a ; b) = 1")}.`,
            expl:L.map(o => `${N(o[0] + " , " + o[1])} : PGCD ${N(pgcd(o[0], o[1]))} ${pgcd(o[0], o[1]) === 1 ? OK : KO}`).join(" ; ") };
        })(),
        { type:"vf", enonce:`La fraction ${F("1155","15")} est un entier naturel.`, rep:1155 % 15 === 0,
          indice:`${N("15")} divise-t-il ${N("1155")} ?`,
          expl:`${N("1155 = 15 × 77")} donc la fraction est égale à ${N("77")}.` },
        { type:"vf", enonce:`${F("330","378")} ${N("=")} ${F("55","63")}.`, rep:true,
          indice:`${N("330 ÷ 6")} et ${N("378 ÷ 6")}.`,
          expl:`Vrai : ${N("330 = 6 × 55")}, ${N("378 = 6 × 63")} et ${N("PGCD(55 ; 63) = 1")}.` },
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      titre: "Problèmes de PPCM",
      sous: "Quand les deux événements coïncident-ils à nouveau ?",
      cours: `
        <div class="regle"><b>Quand utiliser le PPCM ?</b> Quand on cherche <b>la première fois</b> que deux événements de périodes différentes coïncident, ou le plus petit nombre divisible par deux nombres.</div>
        <div class="exemple"><b>Exemple :</b> deux feux clignotent, l'un toutes les ${N("12")} secondes et l'autre toutes les ${N("18")} secondes ; ils clignotent ensemble maintenant. Dans combien de secondes clignoteront-ils de nouveau ensemble ?<br>
          Réponse : ${N("PPCM(12 ; 18) = 36")} secondes.</div>`,
      questions: [
        { type:"nombre", enonce:`Deux bus quittent la gare ensemble maintenant. Le premier part toutes les ${N("15")} minutes et le second toutes les ${N("20")} minutes. Dans combien de minutes repartiront-ils ensemble ?`, rep:[ppcm(15,20)],
          indice:`On cherche le PPCM de ${N("15")} et ${N("20")}.`,
          expl:`${N("15 = 3 × 5")} et ${N("20 = " + factTxt(20))} donc ${N("PPCM = " + ppcm(15,20))} minutes.` },
        { type:"nombre", enonce:`Dans la situation précédente, combien de fois le premier bus part-il pendant cette durée (sans compter le départ initial) ?`, rep:[ppcm(15,20)/15],
          indice:`${N("60 ÷ 15")}.`,
          expl:`${N("60 ÷ 15 = 4")} départs (le dernier est le départ commun).` },
        { type:"nombre", enonce:`On veut assembler des rectangles de ${N("12")} cm sur ${N("18")} cm pour former le <b>plus petit carré</b> possible. Quel est le côté de ce carré, en cm ?`, rep:[ppcm(12,18)],
          indice:`Le côté doit être un multiple de ${N("12")} et un multiple de ${N("18")}.`,
          expl:`${N("PPCM(12 ; 18) = 36")} cm.` },
        { type:"nombre", enonce:`Combien de rectangles (${N("12 × 18")}) faut-il pour former ce carré de côté ${N("36")} cm ?`, rep:[(36/12)*(36/18)],
          indice:`Dans la longueur ${N("36 ÷ 18")}, dans la largeur ${N("36 ÷ 12")}.`,
          expl:`${N("(36 ÷ 12) × (36 ÷ 18) = 3 × 2 = 6")} rectangles.` },
        { type:"nombre", enonce:`Quel est le plus petit entier non nul divisible par ${N("12")}, par ${N("15")} et par ${N("20")} ?`, rep:[ppcm(ppcm(12,15),20)],
          indice:`${N("PPCM(12 ; 15) = 60")}, puis ${N("PPCM(60 ; 20)")}.`,
          expl:`${N("12 = " + factTxt(12))}, ${N("15 = 3 × 5")}, ${N("20 = " + factTxt(20))} donc ${N(S(2,2) + " × 3 × 5 = 60")}.` },
        { type:"vf", enonce:`Si deux événements de périodes ${N("a")} et ${N("b")} ont lieu ensemble maintenant, ils coïncident de nouveau après ${N("PPCM(a ; b)")}.`, rep:true,
          indice:`Relis l'exemple.`,
          expl:`Vrai : c'est le premier instant qui est un multiple des deux périodes.` },
      ]
    },
    // ---------------------------------------------------------------- 5
    {
      titre: "PGCD ou PPCM ?",
      sous: "Choisir le bon outil puis calculer",
      cours: `
        <div class="regle"><b>Comment choisir ?</b><br>
          • « le plus grand nombre qui divise… », « le plus grand côté », « partager en le plus grand nombre possible de groupes identiques » → <b>PGCD</b>.<br>
          • « le plus petit nombre divisible par… », « dans combien de temps coïncident-ils à nouveau ? » → <b>PPCM</b>.</div>
        <div class="exemple"><b>Exemple :</b> on partage ${N("84")} pommes et ${N("126")} oranges dans le plus grand nombre possible d'assiettes identiques → ${N("PGCD(84 ; 126) = 42")} : ${N("42")} assiettes, avec ${N("2")} pommes et ${N("3")} oranges dans chacune.</div>`,
      questions: [
        { type:"qcm", enonce:`On partage ${N("84")} pommes et ${N("126")} oranges dans le plus grand nombre possible d'assiettes identiques. On calcule :`, options:["le PGCD","le PPCM"], rep:0,
          indice:`« Le plus grand nombre » d'assiettes : cherche-t-on un diviseur ou un multiple ?`,
          expl:`Le nombre d'assiettes divise ${N("84")} et ${N("126")} → PGCD.` },
        { type:"nombre", enonce:`Combien d'assiettes obtient-on dans la situation précédente ?`, rep:[pgcd(84,126)],
          indice:`${N("PGCD(84 ; 126)")}.`,
          expl:`${N("PGCD(84 ; 126) = " + pgcd(84,126))} assiettes.` },
        { type:"qcm", enonce:`Deux feux clignotent toutes les ${N("8")} secondes et toutes les ${N("12")} secondes. Pour savoir quand ils clignotent de nouveau ensemble, on calcule :`, options:["le PGCD","le PPCM"], rep:1,
          indice:`On cherche le premier instant multiple des deux périodes.`,
          expl:`On cherche le plus petit multiple commun → PPCM.` },
        { type:"nombre", enonce:`Dans combien de secondes les deux feux clignotent-ils de nouveau ensemble ?`, rep:[ppcm(8,12)],
          indice:`${N("8 = " + factTxt(8))} et ${N("12 = " + factTxt(12))}.`,
          expl:`${N("PPCM(8 ; 12) = " + S(2,3) + " × 3 = " + ppcm(8,12))} secondes.` },
        { type:"nombre", enonce:`On coupe une corde de ${N("360")} cm et une corde de ${N("420")} cm en morceaux de même longueur, la plus grande possible, sans chute. Quelle est la longueur d'un morceau, en cm ?`, rep:[pgcd(360,420)],
          indice:`La longueur divise ${N("360")} et ${N("420")}.`,
          expl:`${N("PGCD(360 ; 420) = " + pgcd(360,420))} cm.` },
        { type:"nombre", enonce:`Combien de morceaux obtient-on au total dans la situation précédente ?`, rep:[(360 + 420) / pgcd(360,420)],
          indice:`${N("360 ÷ 60")} et ${N("420 ÷ 60")}.`,
          expl:`${N("360 ÷ 60 = 6")} et ${N("420 ÷ 60 = 7")} donc ${N("6 + 7 = 13")} morceaux.` },
      ]
    },
  ],
  // -------------------------------------------------------------------- Examen
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`Quel est le PPCM de ${N("18")} et ${N("24")} ?`, rep:[ppcm(18,24)],
        expl:`${N("18 = 2 × " + S(3,2))} et ${N("24 = " + factTxt(24))} donc ${N(S(2,3) + " × " + S(3,2) + " = " + ppcm(18,24))}.` },
      { type:"nombre", enonce:`Quel est le PPCM de ${N("210")} et ${N("126")} ?`, rep:[ppcm(210,126)],
        expl:`${N("2 × " + S(3,2) + " × 5 × 7 = " + ppcm(210,126))}.` },
      { type:"nombre", enonce:`${N("PGCD(264 ; 630) = 6")}. Quel est leur PPCM ?`, rep:[ppcm(264,630)],
        expl:`${N("264 × 630 ÷ 6 = " + ppcm(264,630))}.` },
      { type:"vf", enonce:`Si ${N("a")} et ${N("b")} sont premiers entre eux, alors ${N("PPCM(a ; b) = a × b")}.`, rep:true,
        expl:`Car ${N("PGCD × PPCM = a × b")} et ${N("PGCD = 1")}.` },
      { type:"nombre", enonce:`Écrire la fraction ${F("330","378")} sous forme irréductible (écrire par exemple ${N("3/4")}).`, rep:[red(330,378)], irr:true,
        expl:`${N("PGCD = 6")} donc ${F("55","63")}.` },
      (function () {
        const L = [[14,15],[8,12],[21,35],[9,16],[18,25]];
        return { type:"multi", enonce:`Choisir <u>tous</u> les couples formés de deux nombres premiers entre eux :`, options:L.map(o => `${o[0]} et ${o[1]}`), rep:choisir(L, o => pgcd(o[0], o[1]) === 1),
          expl:L.map(o => `${N(o[0] + " , " + o[1])} : ${N(pgcd(o[0], o[1]))} ${pgcd(o[0], o[1]) === 1 ? OK : KO}`).join(" ; ") };
      })(),
      { type:"nombre", enonce:`Deux bus quittent la gare ensemble maintenant. Le premier part toutes les ${N("12")} minutes et le second toutes les ${N("16")} minutes. Dans combien de minutes repartiront-ils ensemble ?`, rep:[ppcm(12,16)],
        expl:`${N("PPCM(12 ; 16) = " + ppcm(12,16))} minutes.` },
      { type:"nombre", enonce:`On répartit ${N("96")} stylos et ${N("72")} cahiers dans le plus grand nombre possible de paquets identiques. Combien de cahiers y a-t-il dans chaque paquet ?`, rep:[72 / pgcd(96,72)],
        expl:`${N("PGCD(96 ; 72) = " + pgcd(96,72))} paquets ; chaque paquet contient ${N("96 ÷ 24 = 4")} stylos et ${N("72 ÷ 24 = 3")} cahiers.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
