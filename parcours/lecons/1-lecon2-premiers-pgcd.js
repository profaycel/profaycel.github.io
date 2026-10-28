// Nombres premiers, diviseurs et PGCD — 1ère année secondaire (1er trimestre)
// Sources : cours « Activités numériques I » (1ère année), série Pyramide (devoir de contrôle n°1), séries de 1ère année
(function () {
const S   = (a, n) => n === 1 ? String(a) : `${a}<sup>${n}</sup>`;
const eq  = (a, b, q, r) => N(`${a} = ${b} × ${q} + ${r}`);
const choisir = (L, f) => L.map((x, i) => f(x) ? i : -1).filter(i => i >= 0);
const estPremier = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true };
const fact = n => { const r = []; for (let p = 2; n > 1; p++) { let e = 0; while (n % p === 0) { n /= p; e++ } if (e) r.push([p, e]) } return r };
const factTxt = n => fact(n).map(([p, e]) => S(p, e)).join(" × ");
const dvs = n => { const r = []; for (let d = 1; d <= n; d++) if (n % d === 0) r.push(d); return r };
const euclide = (a, b) => { const r = []; while (b) { r.push([a, b, Math.floor(a / b), a % b]); [a, b] = [b, a % b] } return r };
const liste = L => L.map(x => N(x)).join(" ; ");
const OK = "✅", KO = "❌";

const LECON = {
  id: "1-maths-premiers-pgcd",
  langue: "fr",
  titre: "Nombres premiers, diviseurs et PGCD",
  niveaux: [
    // ---------------------------------------------------------------- 0
    (function () {
      const L1 = [21, 29, 39, 41, 51, 57, 59, 63], L2 = [1, 2, 9, 15, 17, 25];
      const E = [...Array(21).keys()].map(i => i + 20).filter(estPremier);
      return {
        titre: "Nombres premiers",
        sous: "Exactement deux diviseurs",
        cours: `
          <div class="regle"><b>Définition :</b> un entier naturel est <b>premier</b> s'il est <b>différent de ${N("1")}</b> et s'il possède <b>exactement deux diviseurs</b> : ${N("1")} et lui-même.</div>
          <div class="exemple"><b>Les premiers nombres premiers :</b>
            <div style="text-align:center;margin:6px 0">${N("2 , 3 , 5 , 7 , 11 , 13 , 17 , 19 , 23 , 29 , 31 , 37 , 41 , 43 , 47 , …")}</div>
            ${N("12")} n'est pas premier (diviseurs ${N("1 , 2 , 3 , 4 , 6 , 12")}) ; ${N("5")} est premier (diviseurs ${N("1")} et ${N("5")}).</div>
          <div class="astuce"><b>Remarques :</b><br>
            • ${N("1")} n'est pas premier : il n'a qu'un seul diviseur.<br>
            • ${N("2")} est le <b>seul nombre premier pair</b>.<br>
            • Il existe une infinité de nombres premiers.</div>`,
        questions: [
          { type:"multi", enonce:`Choisir <u>tous</u> les nombres premiers :`, options:L1.map(String), rep:choisir(L1, estPremier),
            indice:`Cherche un diviseur autre que ${N("1")} et le nombre lui-même (essaie ${N("3")} et ${N("7")}).`,
            expl:L1.map(n => estPremier(n) ? `${N(n)} ${OK}` : `${N(n + " = " + factTxt(n))} ${KO}`).join(" ; ") },
          { type:"multi", enonce:`Choisir <u>tous</u> les nombres premiers :`, options:L2.map(String), rep:choisir(L2, estPremier),
            indice:`Rappel : ${N("1")} n'est pas premier et ${N("2")} est premier.`,
            expl:`${N("2")} et ${N("17")} seulement. ${N("1")} n'a qu'un diviseur ; ${N("9 = 3 × 3")}, ${N("15 = 3 × 5")}, ${N("25 = 5 × 5")}.` },
          { type:"vf", enonce:`Le nombre ${N("1")} est un nombre premier.`, rep:false,
            indice:`Combien de diviseurs a ${N("1")} ?`,
            expl:`Faux : ${N("1")} n'a qu'un seul diviseur, alors qu'un nombre premier en a exactement deux.` },
          { type:"vf", enonce:`${N("2")} est le seul nombre premier pair.`, rep:true,
            indice:`Tout nombre pair supérieur à ${N("2")} est divisible par…`,
            expl:`Vrai : tout nombre pair supérieur à ${N("2")} est divisible par ${N("2")}, il a donc plus de deux diviseurs.` },
          { type:"nombre", enonce:`Combien y a-t-il de nombres premiers entre ${N("20")} et ${N("40")} ?`, rep:[E.length],
            indice:`Teste les nombres impairs ${N("21 , 23 , 25 …")} et élimine les multiples de ${N("3")} et de ${N("5")}.`,
            expl:`Ce sont : ${liste(E)}.` },
          { type:"nombre", enonce:`Quel est le plus petit nombre premier supérieur à ${N("50")} ?`, rep:[[...Array(30).keys()].map(i => i + 51).find(estPremier)],
            indice:`${N("51 = 3 × 17")}, ${N("52")} est pair, ${N("53")} …`,
            expl:`${N("51 = 3 × 17")} et ${N("52")} est pair ; ${N("53")} n'est divisible ni par ${N("2")}, ni par ${N("3")}, ni par ${N("5")}, ni par ${N("7")} : il est premier.` },
        ]
      };
    })(),
    // ---------------------------------------------------------------- 1
    {
      titre: "Décomposition en produit de facteurs premiers",
      sous: "Tout entier supérieur à 1 s'écrit comme produit de nombres premiers",
      cours: `
        <div class="regle"><b>Théorème :</b> tout entier naturel supérieur à ${N("1")} peut s'écrire comme un <b>produit de facteurs premiers</b>.</div>
        <div class="exemple"><b>Exemple :</b> décomposition de ${N("180")} : on divise à chaque fois par le plus petit nombre premier possible :<br>
          ${N("180 ÷ 2 = 90")} ; ${N("90 ÷ 2 = 45")} ; ${N("45 ÷ 3 = 15")} ; ${N("15 ÷ 3 = 5")} ; ${N("5 ÷ 5 = 1")}<br>
          <div style="text-align:center;margin:6px 0">${N("180 = 2 × 2 × 3 × 3 × 5 = " + factTxt(180))}</div></div>
        <div class="astuce"><b>Rappel :</b> on écrit les répétitions avec une puissance : ${N("2 × 2 = 2²")}. On teste la divisibilité par ${N("2 , 3 , 5 , 7 , 11 …")} dans l'ordre.</div>`,
      questions: [
        (function () {
          const O = [[2,2,3,7],[2,3,14],[2,2,21],[4,3,7]];
          const val = o => o.reduce((a, b) => a * b, 1) === 84 && o.every(estPremier);
          return { type:"qcm", enonce:`Quelle écriture est la décomposition de ${N("84")} en produit de facteurs premiers ?`,
            options:O.map(o => N(o.join(" × "))), rep:O.findIndex(val),
            indice:`Tous les facteurs doivent être des nombres premiers.`,
            expl:`${N("84 = 2 × 2 × 3 × 7 = " + factTxt(84))}. Les autres écritures contiennent des facteurs non premiers (${N("14 , 21 , 4")}).` };
        })(),
        { type:"nombre", enonce:`Quel est le nombre dont la décomposition est ${N(S(2,3) + " × 3 × 5")} ?`, rep:[8*3*5],
          indice:`${N(S(2,3) + " = 8")}.`,
          expl:`${N(S(2,3) + " × 3 × 5 = 8 × 15 = 120")}.` },
        { type:"nombre", enonce:`Combien de facteurs premiers <u>différents</u> apparaissent dans la décomposition de ${N("210")} ?`, rep:[fact(210).length],
          indice:`${N("210 = 2 × 105")}, puis décompose ${N("105")}.`,
          expl:`${N("210 = " + factTxt(210))} : ${N(fact(210).length)} facteurs différents : ${N(fact(210).map(f => f[0]).join(" , "))}.` },
        (function () {
          const O = [`${N("360 = " + factTxt(360))}`, `${N("360 = " + S(2,2) + " × " + S(3,2) + " × 5")}`, `${N("360 = " + S(2,3) + " × 3 × " + S(5,2))}`, `${N("360 = " + S(2,3) + " × " + S(3,2) + " × 10")}`];
          return { type:"qcm", enonce:`Quelle écriture est la bonne décomposition de ${N("360")} ?`, options:O, rep:0,
            indice:`Calcule chaque produit et vérifie que ses facteurs sont premiers.`,
            expl:`${N("360 = " + factTxt(360))} ${OK} (${N("8 × 9 × 5 = 360")}). La deuxième donne ${N("180")}, la troisième ${N("600")}, et la quatrième contient ${N("10")}, qui n'est pas premier.` };
        })(),
        { type:"multi", enonce:`Choisir <u>tous</u> les nombres qui apparaissent parmi les facteurs premiers de ${N("252")} :`, options:["2","3","4","6","7","9"], rep:choisir([2,3,4,6,7,9], p => fact(252).some(f => f[0] === p)),
          indice:`${N("252 = 4 × 63")}. Décompose aussi ${N("4")} et ${N("63")}.`,
          expl:`${N("252 = " + factTxt(252))} : facteurs premiers ${N("2 , 3 , 7")}. ${N("4 , 6 , 9")} ne sont pas premiers.` },
        { type:"vf", enonce:`${N("450 = 2 × " + S(3,2) + " × " + S(5,2))}.`, rep:2*9*25 === 450,
          indice:`Calcule ${N("2 × 9 × 25")}.`,
          expl:`${N("2 × 9 × 25 = 450")} ${OK} et tous les facteurs sont premiers.` },
      ]
    },
    // ---------------------------------------------------------------- 2
    {
      titre: "Ensemble des diviseurs d'un entier",
      sous: "On décompose, puis on fait un tableau de multiplication",
      cours: `
        <div class="regle"><b>Notation :</b> on note ${N("D<sub>a</sub>")} l'<b>ensemble des diviseurs</b> de l'entier ${N("a")}.<br>
          Exemple : ${N("D<sub>18</sub> = { 1 , 2 , 3 , 6 , 9 , 18 }")}.</div>
        <div class="exemple"><b>Méthode :</b> diviseurs de ${N("108")} :<br>
          ${N("108 = 4 × 27")} ; diviseurs de ${N("4")} : ${N("1 , 2 , 4")} ; diviseurs de ${N("27")} : ${N("1 , 3 , 9 , 27")}<br>
          On multiplie chaque diviseur de ${N("27")} par chaque diviseur de ${N("4")} (tableau).<br>
          ${N("D<sub>108</sub> = { 1 , 2 , 3 , 4 , 6 , 9 , 12 , 18 , 27 , 36 , 54 , 108 }")} : ${N("12")} diviseurs.</div>
        <div class="astuce"><b>Rappel :</b> les diviseurs vont <b>par paires</b> : si ${N("d")} divise ${N("a")}, alors ${N("a ÷ d")} divise aussi ${N("a")}. ${N("1")} et ${N("a")} sont toujours des diviseurs de ${N("a")}.</div>`,
      questions: [
        { type:"multi", enonce:`Choisir <u>tous</u> les diviseurs de ${N("48")} :`, options:["3","5","6","8","9","12","16"], rep:choisir([3,5,6,8,9,12,16], d => 48 % d === 0),
          indice:`Divise ${N("48")} par chaque nombre : le reste est-il ${N("0")} ?`,
          expl:`${N("D<sub>48</sub> = { " + dvs(48).join(" , ") + " }")}.` },
        { type:"nombre", enonce:`Combien ${N("36")} a-t-il de diviseurs ?`, rep:[dvs(36).length],
          indice:`${N("36 = 4 × 9")} : fais le tableau des diviseurs de ${N("4")} et de ${N("9")}.`,
          expl:`${N("D<sub>36</sub> = { " + dvs(36).join(" , ") + " }")} : ${N(dvs(36).length)} diviseurs.` },
        { type:"nombre", enonce:`Combien ${N("60")} a-t-il de diviseurs ?`, rep:[dvs(60).length],
          indice:`${N("60 = 4 × 15")}.`,
          expl:`${N("D<sub>60</sub> = { " + dvs(60).join(" , ") + " }")} : ${N(dvs(60).length)} diviseurs.` },
        (function () {
          const O = [[1,2,3,6,9,18],[1,2,3,6,9],[1,2,3,4,6,9,18],[1,2,6,9,18]];
          return { type:"qcm", enonce:`Quel est l'ensemble des diviseurs de ${N("18")} ?`, options:O.map(o => N("{ " + o.join(" , ") + " }")), rep:O.findIndex(o => o.join() === dvs(18).join()),
            indice:`Cherche les paires : ${N("1 × 18")}, ${N("2 × 9")}, ${N("3 × 6")}.`,
            expl:`${N("18 = 1 × 18 = 2 × 9 = 3 × 6")} donc ${N("D<sub>18</sub> = { 1 , 2 , 3 , 6 , 9 , 18 }")}.` };
        })(),
        { type:"multi", enonce:`Choisir <u>tous</u> les diviseurs communs de ${N("24")} et ${N("36")} :`, options:["2","3","4","6","8","12"], rep:choisir([2,3,4,6,8,12], d => 24 % d === 0 && 36 % d === 0),
          indice:`Le nombre doit diviser à la fois ${N("24")} et ${N("36")}.`,
          expl:`${N("D<sub>24</sub> ∩ D<sub>36</sub> = { " + dvs(24).filter(d => 36 % d === 0).join(" , ") + " }")}. ${N("8")} divise ${N("24")} seulement.` },
        { type:"vf", enonce:`Le nombre ${N("17")} n'a que deux diviseurs, donc ${N("D<sub>17</sub> = { 1 , 17 }")}.`, rep:dvs(17).length === 2,
          indice:`${N("17")} est un nombre premier.`,
          expl:`Vrai : un nombre premier a exactement deux diviseurs.` },
      ]
    },
    // ---------------------------------------------------------------- 3
    {
      titre: "PGCD : plus grand commun diviseur",
      sous: "Par les diviseurs communs et par la décomposition",
      cours: `
        <div class="regle"><b>Définition :</b> le <b>PGCD</b> de deux entiers naturels non nuls ${N("a")} et ${N("b")} est le plus grand entier qui divise à la fois ${N("a")} et ${N("b")}. On le note ${N("PGCD(a , b)")}.</div>
        <div class="exemple"><b>Méthode 1 : diviseurs communs</b> — ${N("PGCD(24 ; 36)")} :<br>
          ${N("D<sub>24</sub> = { 1 , 2 , 3 , 4 , 6 , 8 , 12 , 24 }")} et ${N("D<sub>36</sub> = { 1 , 2 , 3 , 4 , 6 , 9 , 12 , 18 , 36 }")}<br>
          Diviseurs communs : ${N("1 , 2 , 3 , 4 , 6 , 12")} donc ${N("PGCD(24 ; 36) = 12")}.</div>
        <div class="exemple"><b>Méthode 2 : décomposition</b> — ${N("PGCD(168 ; 180)")} :<br>
          ${N("168 = " + factTxt(168))} et ${N("180 = " + factTxt(180))}<br>
          On prend les <b>facteurs communs</b> avec leur <b>plus petit exposant</b> : ${N(S(2,2) + " × 3 = 12")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Quel est le PGCD de ${N("36")} et ${N("24")} ?`, rep:[pgcd(36,24)],
          indice:`${N("36 = " + factTxt(36))} et ${N("24 = " + factTxt(24))}.`,
          expl:`Facteurs communs : ${N(S(2,2) + " × 3 = 12")}.` },
        { type:"nombre", enonce:`Quel est le PGCD de ${N("84")} et ${N("126")} ?`, rep:[pgcd(84,126)],
          indice:`${N("84 = " + factTxt(84))} et ${N("126 = " + factTxt(126))}.`,
          expl:`Facteurs communs avec le plus petit exposant : ${N("2 × 3 × 7 = " + pgcd(84,126))}.` },
        { type:"nombre", enonce:`Quel est le PGCD de ${N("150")} et ${N("225")} ?`, rep:[pgcd(150,225)],
          indice:`${N("150 = " + factTxt(150))} et ${N("225 = " + factTxt(225))}.`,
          expl:`Facteurs communs : ${N("3 × " + S(5,2) + " = " + pgcd(150,225))}.` },
        { type:"nombre", enonce:`Quel est le PGCD de ${N("168")} et ${N("180")} ?`, rep:[pgcd(168,180)],
          indice:`Relis l'exemple du cours.`,
          expl:`${N(S(2,2) + " × 3 = " + pgcd(168,180))}.` },
        { type:"vf", enonce:`${N("PGCD(a ; b)")} divise ${N("a")} et divise ${N("b")}.`, rep:true,
          indice:`Relis la définition.`,
          expl:`Vrai : c'est un diviseur commun de ${N("a")} et ${N("b")}, et c'est le plus grand.` },
        { type:"vf", enonce:`Le PGCD de ${N("12")} et ${N("30")} est ${N("12")}.`, rep:pgcd(12,30) === 12,
          indice:`${N("12")} divise-t-il ${N("30")} ?`,
          expl:`Faux : ${N("30 = 12 × 2 + 6")}. ${N("PGCD(12 ; 30) = " + pgcd(12,30))}.` },
      ]
    },
    // ---------------------------------------------------------------- 4
    {
      titre: "Algorithme d'Euclide",
      sous: "Des divisions successives jusqu'à un reste nul",
      cours: `
        <div class="regle"><b>Algorithme d'Euclide :</b> pour calculer le PGCD de ${N("a > b")} :<br>
          • on divise ${N("a")} par ${N("b")} : on obtient le reste ${N("r<sub>1</sub>")} ;<br>
          • on divise ${N("b")} par ${N("r<sub>1</sub>")} : on obtient ${N("r<sub>2</sub>")}, et ainsi de suite ;<br>
          • on s'arrête quand le reste est nul. <b>Le PGCD est le dernier reste non nul.</b></div>
        <div class="exemple"><b>Exemple :</b> ${N("PGCD(255 ; 221)")} :<br>
          ${eq(255,221,1,34)}<br>${eq(221,34,6,17)}<br>${eq(34,17,2,0)}<br>
          Le dernier reste non nul est ${N("17")} donc ${N("PGCD(255 ; 221) = 17")}.</div>`,
      questions: [
        { type:"nombre", enonce:`Dans l'algorithme d'Euclide pour ${N("385")} et ${N("140")}, quel est le reste de la première division (${N("385")} par ${N("140")}) ?`, rep:[385 % 140],
          indice:`${N("140 × 2 = 280")}.`, expl:`${eq(385,140,2,105)} donc le reste est ${N("105")}.` },
        { type:"nombre", enonce:`Quel est le PGCD de ${N("385")} et ${N("140")} ?`, rep:[pgcd(385,140)],
          indice:`${N("385 = 140 × 2 + 105")}, puis divise ${N("140")} par ${N("105")} …`,
          expl:euclide(385,140).map(s => eq(...s)).join("<br>") + `<br>Dernier reste non nul : ${N(pgcd(385,140))}.` },
        { type:"nombre", enonce:`Quel est le PGCD de ${N("168")} et ${N("90")} ?`, rep:[pgcd(168,90)],
          indice:`${N("168 = 90 × 1 + 78")}.`,
          expl:euclide(168,90).map(s => eq(...s)).join("<br>") + `<br>Dernier reste non nul : ${N(pgcd(168,90))}.` },
        { type:"nombre", enonce:`Quel est le PGCD de ${N("1599")} et ${N("1081")} ?`, rep:[pgcd(1599,1081)],
          indice:`${N("1599 = 1081 × 1 + 518")}.`,
          expl:euclide(1599,1081).map(s => eq(...s)).join("<br>") + `<br>Dernier reste non nul : ${N(pgcd(1599,1081))}.` },
        { type:"nombre", enonce:`Combien de divisions euclidiennes (y compris la dernière, de reste nul) effectue-t-on pour calculer ${N("PGCD(255 ; 221)")} ?`, rep:[euclide(255,221).length],
          indice:`Relis l'exemple du cours.`,
          expl:`${N("255 = 221 × 1 + 34")} ; ${N("221 = 34 × 6 + 17")} ; ${N("34 = 17 × 2 + 0")} : ${N(euclide(255,221).length)} divisions.` },
        { type:"vf", enonce:`Si le reste de la division de ${N("a")} par ${N("b")} est nul, alors ${N("PGCD(a ; b) = b")}.`, rep:true,
          indice:`Exemple : ${N("48")} et ${N("12")}.`,
          expl:`Vrai : ${N("b")} divise ${N("a")}, c'est donc le plus grand diviseur commun. Par exemple ${N("PGCD(48 ; 12) = 12")}.` },
      ]
    },
    // ---------------------------------------------------------------- 5
    (function () {
      const sols = [...Array(60).keys()].filter(n => (3 * n + 27) % (n + 3) === 0);
      return {
        titre: "Nombres premiers entre eux et problèmes",
        sous: "PGCD = 1, carrelage, recherche de n",
        cours: `
          <div class="regle"><b>Définition :</b> deux entiers naturels sont <b>premiers entre eux</b> si leur PGCD est égal à ${N("1")}.<br>
            Exemple : ${N("PGCD(35 ; 26) = 1")} donc ${N("35")} et ${N("26")} sont premiers entre eux (alors qu'aucun des deux n'est premier).</div>
          <div class="exemple"><b>Problème de carrelage :</b> on veut carreler un sol rectangulaire de ${N("180 × 150")} (en cm) avec des carreaux carrés les plus grands possible, sans les couper.<br>
            Le côté d'un carreau est ${N("PGCD(180 ; 150) = 30")} cm.</div>
          <div class="exemple"><b>Recherche de n :</b> cherchons les entiers naturels ${N("n")} tels que ${N("(3n + 27) ÷ (n + 3)")} soit un entier naturel :<br>
            ${N("3n + 27 = 3(n + 3) + 18")} donc ${N("n + 3")} doit diviser ${N("18")}.<br>
            Diviseurs de ${N("18")} supérieurs ou égaux à ${N("3")} : ${N("3 , 6 , 9 , 18")} donc ${N("n = 0 , 3 , 6 , 15")}.</div>`,
        questions: [
          { type:"multi", enonce:`Choisir <u>tous</u> les couples formés de deux nombres premiers entre eux :`,
            options:["6 et 35","12 et 18","9 et 28","15 et 25","14 et 21"], rep:choisir([[6,35],[12,18],[9,28],[15,25],[14,21]], o => pgcd(o[0], o[1]) === 1),
            indice:`Pour chaque couple, cherche un diviseur commun autre que ${N("1")}.`,
            expl:`${N("PGCD(6 ; 35) = 1")} ${OK} et ${N("PGCD(9 ; 28) = 1")} ${OK}. Pas ${N("12 , 18")} (${N("6")}), ${N("15 , 25")} (${N("5")}), ${N("14 , 21")} (${N("7")}) ${KO}` },
          { type:"vf", enonce:`Deux entiers naturels consécutifs (comme ${N("20")} et ${N("21")}) sont toujours premiers entre eux.`, rep:true,
            indice:`Un diviseur commun de ${N("n")} et ${N("n + 1")} divise aussi leur différence.`,
            expl:`Vrai : un diviseur commun divise ${N("(n + 1) − n = 1")}, donc le PGCD est ${N("1")}.` },
          { type:"vf", enonce:`Si deux entiers sont premiers entre eux, alors chacun d'eux est un nombre premier.`, rep:false,
            indice:`Essaie avec ${N("8")} et ${N("15")}.`,
            expl:`Faux : ${N("8")} et ${N("15")} sont premiers entre eux, mais aucun des deux n'est premier.` },
          { type:"nombre", enonce:`On carrelle un sol rectangulaire de ${N("180")} cm sur ${N("150")} cm avec des carreaux carrés les plus grands possible. Quel est le côté d'un carreau, en cm ?`, rep:[pgcd(180,150)],
            indice:`Le côté divise ${N("180")} et ${N("150")}, et on le veut le plus grand possible.`,
            expl:`${N("PGCD(180 ; 150) = " + pgcd(180,150))} cm.` },
          { type:"nombre", enonce:`Combien de carreaux faut-il dans la situation précédente ?`, rep:[(180 / pgcd(180,150)) * (150 / pgcd(180,150))],
            indice:`Nombre de carreaux dans la longueur × nombre de carreaux dans la largeur.`,
            expl:`${N("180 ÷ 30 = 6")} et ${N("150 ÷ 30 = 5")} donc ${N("6 × 5 = 30")} carreaux.` },
          { type:"nombre", enonce:`Combien y a-t-il d'entiers naturels ${N("n")} tels que ${N("(3n + 27) ÷ (n + 3)")} soit un entier naturel ?`, rep:[sols.length],
            indice:`${N("3n + 27 = 3(n + 3) + 18")} donc ${N("n + 3")} doit diviser ${N("18")}.`,
            expl:`${N("n + 3 ∈ { 3 , 6 , 9 , 18 }")} donc ${N("n ∈ { " + sols.join(" , ") + " }")} : ${N(sols.length)} entiers.` },
        ]
      };
    })(),
  ],
  // -------------------------------------------------------------------- Examen
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"multi", enonce:`Choisir <u>tous</u> les nombres premiers :`, options:["1","23","27","31","39","49"], rep:choisir([1,23,27,31,39,49], estPremier),
        expl:`${N("23")} et ${N("31")} seulement. ${N("27 = 3 × 9")}, ${N("39 = 3 × 13")}, ${N("49 = 7 × 7")}, et ${N("1")} n'est pas premier.` },
      { type:"qcm", enonce:`Quelle est la décomposition de ${N("300")} en produit de facteurs premiers ?`,
        options:[N(S(2,2) + " × 3 × " + S(5,2)), N(S(2,3) + " × 3 × 5"), N("2 × 3 × 50"), N(S(2,2) + " × " + S(3,2) + " × 5")], rep:0,
        expl:`${N("300 = " + factTxt(300))} (${N("4 × 3 × 25 = 300")}).` },
      { type:"nombre", enonce:`Combien ${N("48")} a-t-il de diviseurs ?`, rep:[dvs(48).length],
        expl:`${N("D<sub>48</sub> = { " + dvs(48).join(" , ") + " }")}.` },
      { type:"nombre", enonce:`Quel est le PGCD de ${N("330")} et ${N("378")} ?`, rep:[pgcd(330,378)],
        expl:`${N("330 = " + factTxt(330))} et ${N("378 = " + factTxt(378))} donc ${N("2 × 3 = " + pgcd(330,378))}.` },
      { type:"nombre", enonce:`À l'aide de l'algorithme d'Euclide, quel est le PGCD de ${N("255")} et ${N("221")} ?`, rep:[pgcd(255,221)],
        expl:euclide(255,221).map(s => eq(...s)).join("<br>") + `<br>Dernier reste non nul : ${N(pgcd(255,221))}.` },
      { type:"vf", enonce:`${N("35")} et ${N("26")} sont premiers entre eux.`, rep:pgcd(35,26) === 1,
        expl:`${N("35 = 5 × 7")} et ${N("26 = 2 × 13")} donc leur PGCD est ${N("1")}.` },
      { type:"nombre", enonce:`On partage ${N("96")} billes rouges et ${N("72")} billes bleues dans le plus grand nombre possible de sacs identiques (même nombre de billes de chaque couleur dans chaque sac). Combien de sacs obtient-on ?`, rep:[pgcd(96,72)],
        expl:`Le nombre de sacs divise ${N("96")} et ${N("72")} et il est maximal : ${N("PGCD(96 ; 72) = " + pgcd(96,72))}.` },
      { type:"nombre", enonce:`Combien y a-t-il d'entiers naturels ${N("n")} tels que ${N("(2n + 20) ÷ (n + 2)")} soit un entier naturel ?`, rep:[[...Array(60).keys()].filter(n => (2*n + 20) % (n + 2) === 0).length],
        expl:`${N("2n + 20 = 2(n + 2) + 16")} donc ${N("n + 2")} divise ${N("16")} et ${N("n + 2 ≥ 2")} : ${N("n + 2 ∈ { 2 , 4 , 8 , 16 }")} donc ${N("n ∈ { 0 , 2 , 6 , 14 }")} : ${N("4")} entiers.` },
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
