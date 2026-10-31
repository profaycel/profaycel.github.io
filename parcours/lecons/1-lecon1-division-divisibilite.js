// Division euclidienne et divisibilité — 1ère année secondaire (1er trimestre)
// Sources : cours « Activités numériques I » (1ère année), série Pyramide (devoir de contrôle n°1), séries de 1ère année
(function () {
const dv  = (a, b) => ({ q: Math.floor(a / b), r: a % b });
const eq  = (a, b, q, r) => N(`${a} = ${b} × ${q} + ${r}`);
const som = n => String(n).split("").reduce((s, c) => s + (+c), 0);
const par = (n, d) => n % d === 0;
const choisir = (L, f) => L.map((x, i) => f(x) ? i : -1).filter(i => i >= 0);
const chif = (pre, suf, f) => [...Array(10).keys()].filter(d => f(+(pre + d + suf)));
const liste = L => L.map(x => N(x)).join(" ; ");
const OK = "✅", KO = "❌";

const LECON = {
  id: "1-maths-division-divisibilite",
  langue: "fr",
  titre: "Division euclidienne et divisibilité",
  niveaux: [
    // ---------------------------------------------------------------- 0
    {
      titre: "Division euclidienne",
      sous: "Dividende, diviseur, quotient et reste",
      cours: `
        <div class="regle"><b>Définition :</b> Soit ${N("a")} et ${N("b")} deux entiers naturels avec ${N("b ≠ 0")}.<br>
          Effectuer la division euclidienne de ${N("a")} par ${N("b")}, c'est déterminer les entiers naturels ${N("q")} et ${N("r")} tels que :
          <div style="text-align:center;margin:8px 0">${N("a = b × q + r")} &nbsp; avec &nbsp; ${N("0 ≤ r < b")}</div>
          ${N("a")} est le <b>dividende</b>, ${N("b")} le <b>diviseur</b>, ${N("q")} le <b>quotient</b> et ${N("r")} le <b>reste</b>.</div>
        <div class="exemple"><b>Exemple :</b> ${N("1974 = 25 × 78 + 24")} : le quotient est ${N("78")} et le reste ${N("24")} (et ${N("24 < 25")} ${OK}).</div>
        <div class="astuce"><b>Remarques :</b><br>
          • Le reste est toujours <b>strictement inférieur</b> au diviseur.<br>
          • Si ${N("r = 0")}, on dit que ${N("b")} <b>divise</b> ${N("a")} (${N("a")} est un multiple de ${N("b")}).</div>`,
      questions: [
        { type:"nombre", enonce:`Quel est le <b>quotient</b> de la division euclidienne de ${N("487")} par ${N("12")} ?`, rep:[dv(487,12).q],
          indice:`Cherche le plus grand multiple de ${N("12")} qui ne dépasse pas ${N("487")}.`,
          expl:`${eq(487,12,dv(487,12).q,dv(487,12).r)} donc le quotient est ${N(dv(487,12).q)}.` },
        { type:"nombre", enonce:`Quel est le <b>reste</b> de la division euclidienne de ${N("487")} par ${N("12")} ?`, rep:[dv(487,12).r],
          indice:`Le reste est ${N("487 − 12 × " + dv(487,12).q)}.`,
          expl:`${eq(487,12,dv(487,12).q,dv(487,12).r)} et ${N(dv(487,12).r + " < 12")} ${OK}.` },
        (function () {
          const O = [[1000,7,141,13],[1000,7,142,6],[1000,7,140,20],[1000,7,143,5]];
          const val = o => o[1]*o[2] + o[3] === o[0] && o[3] < o[1];
          return { type:"qcm", enonce:`Quelle égalité traduit la division euclidienne de ${N("1000")} par ${N("7")} ?`,
            options:O.map(o => eq(...o)), rep:O.findIndex(val),
            indice:`Deux conditions : l'égalité est vraie et le reste est strictement inférieur à ${N("7")}.`,
            expl:`${eq(1000,7,142,6)} ${OK} (${N("7 × 142 = 994")} et ${N("6 < 7")}). Avec ${N("141")} et ${N("140")}, le reste est trop grand ; avec ${N("143")}, l'égalité est fausse (${N("7 × 143 + 5 = 1006")}).` };
        })(),
        { type:"vf", enonce:`${N("50 = 6 × 7 + 8")} est la division euclidienne de ${N("50")} par ${N("6")}.`, rep:false,
          indice:`Compare le reste au diviseur.`,
          expl:`L'égalité est vraie (${N("42 + 8 = 50")}) mais le reste ${N("8")} n'est pas inférieur à ${N("6")}. La bonne division est ${eq(50,6,8,2)}.` },
        { type:"nombre", enonce:`Dans une division euclidienne, le diviseur est ${N("17")}, le quotient ${N("23")} et le reste ${N("9")}. Quel est le dividende ?`, rep:[17*23+9],
          indice:`${N("a = b × q + r")}.`,
          expl:`${N("a = 17 × 23 + 9 = " + (17*23) + " + 9 = " + (17*23+9))}.` },
        { type:"vf", enonce:`Le reste de la division de ${N("36")} par ${N("9")} est ${N("0")}, donc ${N("9")} divise ${N("36")}.`, rep:true,
          indice:`Relis la remarque du cours.`,
          expl:`${eq(36,9,4,0)} donc ${N("36")} est un multiple de ${N("9")}.` },
      ]
    },
    // ---------------------------------------------------------------- 1
    {
      titre: "Problèmes sur la division euclidienne",
      sous: "Plus grand reste, dividende, reste d'une somme",
      cours: `
        <div class="regle"><b>À retenir :</b> dans la division par ${N("b")}, le reste ${N("r")} prend l'une des valeurs :
          <div style="text-align:center;margin:6px 0">${N("0 , 1 , 2 , … , b − 1")}</div>
          Le <b>plus grand reste possible</b> est donc ${N("b − 1")}.</div>
        <div class="exemple"><b>Exemple :</b> si ${N("a = 7q + 3")}, alors ${N("a + 4 = 7q + 7 = 7(q + 1)")} : le reste de la division de ${N("a + 4")} par ${N("7")} est ${N("0")}.</div>
        <div class="astuce"><b>Méthode :</b> dans les problèmes, on écrit toujours ${N("a = b × q + r")} puis on remplace.</div>`,
      questions: [
        { type:"nombre", enonce:`Quel est le plus grand reste possible dans une division euclidienne par ${N("15")} ?`, rep:[14],
          indice:`Le reste est strictement inférieur à ${N("15")}.`, expl:`${N("15 − 1 = 14")}.` },
        { type:"nombre", enonce:`Dans une division euclidienne par ${N("9")}, le quotient est ${N("11")} et le reste est <b>le plus grand possible</b>. Quel est le dividende ?`, rep:[9*11+8],
          indice:`Le plus grand reste possible dans la division par ${N("9")} est ${N("8")}.`,
          expl:`${N("a = 9 × 11 + 8 = " + (9*11+8))}.` },
        { type:"multi", enonce:`Choisir <u>tous</u> les nombres qui peuvent être un <b>reste</b> dans une division euclidienne par ${N("6")} :`,
          options:["0","3","5","6","8"], rep:choisir([0,3,5,6,8], x => x < 6),
          indice:`Le reste est strictement inférieur à ${N("6")}.`,
          expl:`${N("0")}, ${N("3")} et ${N("5")} ${OK}. ${N("6")} et ${N("8")} ne sont pas strictement inférieurs à ${N("6")}.` },
        { type:"nombre", enonce:`On range ${N("250")} livres dans des boîtes de ${N("12")} livres. Combien de boîtes <b>complètes</b> obtient-on ?`, rep:[dv(250,12).q],
          indice:`On effectue la division euclidienne de ${N("250")} par ${N("12")}.`,
          expl:`${eq(250,12,dv(250,12).q,dv(250,12).r)} donc ${N(dv(250,12).q)} boîtes complètes.` },
        { type:"nombre", enonce:`Dans la situation précédente (${N("250")} livres, ${N("12")} par boîte), combien de livres restent en dehors des boîtes complètes ?`, rep:[dv(250,12).r],
          indice:`C'est le reste de la division.`,
          expl:`${eq(250,12,dv(250,12).q,dv(250,12).r)} donc il reste ${N(dv(250,12).r)} livres.` },
        { type:"nombre", enonce:`Le reste de la division de ${N("a")} par ${N("7")} est ${N("3")}. Quel est le reste de la division de ${N("a + 4")} par ${N("7")} ?`, rep:[0],
          indice:`Écris ${N("a = 7q + 3")} puis ajoute ${N("4")}.`,
          expl:`${N("a + 4 = 7q + 7 = 7(q + 1)")} : le reste est ${N("0")}.` },
        { type:"vf", enonce:`Si le reste de la division de ${N("a")} par ${N("5")} est ${N("2")}, alors ${N("a + 3")} est divisible par ${N("5")}.`, rep:true,
          indice:`${N("a = 5q + 2")}.`,
          expl:`${N("a + 3 = 5q + 5 = 5(q + 1)")} ${OK}.` },
      ]
    },
    // ---------------------------------------------------------------- 2
    (function () {
      const L3 = [1452, 7083, 3790, 5445, 9006, 2218], L9 = [4518, 2763, 7005, 6372, 8091, 3999];
      return {
        titre: "Divisibilité par 2, 5, 10, 3 et 9",
        sous: "Chiffre des unités et somme des chiffres",
        cours: `
          <div class="regle"><b>Critères de divisibilité :</b> un entier naturel est divisible par :<br>
            • ${N("2")} : si son chiffre des unités est ${N("0")}, ${N("2")}, ${N("4")}, ${N("6")} ou ${N("8")}.<br>
            • ${N("5")} : si son chiffre des unités est ${N("0")} ou ${N("5")}.<br>
            • ${N("10")} : si son chiffre des unités est ${N("0")}.<br>
            • ${N("3")} : si la <b>somme de ses chiffres</b> est un multiple de ${N("3")}.<br>
            • ${N("9")} : si la <b>somme de ses chiffres</b> est un multiple de ${N("9")}.</div>
          <div class="exemple"><b>Exemple :</b> ${N("5445")} : ${N("5 + 4 + 4 + 5 = 18")} donc divisible par ${N("3")} et par ${N("9")}.<br>
            Son chiffre des unités est ${N("5")} : divisible par ${N("5")}, mais ni par ${N("2")} ni par ${N("10")}.</div>
          <div class="astuce"><b>Attention :</b> la somme des chiffres ne sert que pour ${N("3")} et ${N("9")}. Le nombre ${N("12")} est divisible par ${N("3")} mais pas par ${N("9")}.</div>`,
        questions: [
          { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("3")} :`, options:L3.map(String), rep:choisir(L3, n => par(n,3)),
            indice:`Calcule la somme des chiffres de chaque nombre.`,
            expl:L3.map(n => `${N(n)} → ${N(som(n))} ${par(n,3) ? OK : KO}`).join(" ; ") },
          { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("9")} :`, options:L9.map(String), rep:choisir(L9, n => par(n,9)),
            indice:`La somme des chiffres doit être un multiple de ${N("9")}.`,
            expl:L9.map(n => `${N(n)} → ${N(som(n))} ${par(n,9) ? OK : KO}`).join(" ; ") },
          { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles à la fois par ${N("2")} <u>et</u> par ${N("5")} :`, options:["3790","5445","1280","2218","7005"], rep:choisir([3790,5445,1280,2218,7005], n => par(n,10)),
            indice:`Quel chiffre des unités convient aux deux critères ?`,
            expl:`Divisible par ${N("2")} et par ${N("5")} signifie que le chiffre des unités est ${N("0")} : ${N("3790")} et ${N("1280")}.` },
          { type:"vf", enonce:`Tout nombre divisible par ${N("9")} est divisible par ${N("3")}.`, rep:true,
            indice:`${N("9 = 3 × 3")}.`,
            expl:`Vrai : tout multiple de ${N("9")} est un multiple de ${N("3")}.` },
          { type:"vf", enonce:`Tout nombre divisible par ${N("3")} est divisible par ${N("9")}.`, rep:false,
            indice:`Essaie avec ${N("12")}.`,
            expl:`Faux : ${N("12")} est divisible par ${N("3")} (${N("1 + 2 = 3")}) mais pas par ${N("9")}.` },
          { type:"nombre", enonce:`Quel est le plus petit nombre de trois chiffres divisible par ${N("9")} ?`, rep:[108],
            indice:`Divise ${N("100")} par ${N("9")}.`,
            expl:`${eq(100,9,11,1)} donc le premier multiple de ${N("9")} après ${N("100")} est ${N("9 × 12 = 108")} (somme des chiffres ${N("9")}).` },
        ]
      };
    })(),
    // ---------------------------------------------------------------- 3
    (function () {
      const L4 = [1316, 2750, 3902, 5124, 8808, 4075], L25 = [3150, 4725, 1260, 6075, 2580, 9900], L8 = [5128, 3416, 7084, 2000, 6310, 1816];
      return {
        titre: "Divisibilité par 4, 25 et 8",
        sous: "Deux ou trois derniers chiffres",
        cours: `
          <div class="regle"><b>Critères de divisibilité :</b> un entier naturel est divisible par :<br>
            • ${N("4")} : si le nombre formé par ses <b>deux derniers chiffres</b> est divisible par ${N("4")}.<br>
            • ${N("25")} : si le nombre formé par ses <b>deux derniers chiffres</b> est divisible par ${N("25")}, c'est-à-dire ${N("00")}, ${N("25")}, ${N("50")} ou ${N("75")}.<br>
            • ${N("8")} : si le nombre formé par ses <b>trois derniers chiffres</b> est divisible par ${N("8")}.</div>
          <div class="exemple"><b>Exemples :</b> ${N("5124")} : ${N("24 = 4 × 6")} donc divisible par ${N("4")}.<br>
            ${N("6075")} : ${N("75 = 25 × 3")} donc divisible par ${N("25")}.<br>
            ${N("3416")} : ${N("416 = 8 × 52")} donc divisible par ${N("8")}.</div>
          <div class="astuce"><b>Pourquoi ?</b> ${N("100")} est un multiple de ${N("4")} et de ${N("25")}, et ${N("1000")} est un multiple de ${N("8")}. Seuls les derniers chiffres comptent.</div>`,
        questions: [
          { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("4")} :`, options:L4.map(String), rep:choisir(L4, n => par(n,4)),
            indice:`Regarde le nombre formé par les deux derniers chiffres.`,
            expl:L4.map(n => `${N(n)} → ${N(String(n).slice(-2))} ${par(n,4) ? OK : KO}`).join(" ; ") },
          { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("25")} :`, options:L25.map(String), rep:choisir(L25, n => par(n,25)),
            indice:`Les deux derniers chiffres doivent être ${N("00")}, ${N("25")}, ${N("50")} ou ${N("75")}.`,
            expl:L25.map(n => `${N(n)} → ${N(String(n).slice(-2))} ${par(n,25) ? OK : KO}`).join(" ; ") },
          { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("8")} :`, options:L8.map(String), rep:choisir(L8, n => par(n,8)),
            indice:`Regarde le nombre formé par les trois derniers chiffres.`,
            expl:L8.map(n => `${N(n)} → ${N(String(n).slice(-3))} ${par(n,8) ? OK : KO}`).join(" ; ") },
          { type:"vf", enonce:`Le nombre ${N("3750")} est divisible par ${N("25")} mais pas par ${N("4")}.`, rep:par(3750,25) && !par(3750,4),
            indice:`Les deux derniers chiffres sont ${N("50")}.`,
            expl:`${N("50 = 25 × 2")} ${OK} et ${N("50 = 4 × 12 + 2")} donc pas divisible par ${N("4")}.` },
          { type:"vf", enonce:`Tout nombre divisible par ${N("8")} est divisible par ${N("4")}.`, rep:true,
            indice:`${N("8 = 4 × 2")}.`,
            expl:`Vrai : ${N("4")} divise ${N("8")}, donc divise tous les multiples de ${N("8")}.` },
          { type:"nombre", enonce:`Quel est le plus petit nombre de quatre chiffres divisible par ${N("25")} ?`, rep:[1000],
            indice:`${N("1000 = 25 × 40")}.`,
            expl:`${N("1000 = 25 × 40")} : c'est le plus petit nombre de quatre chiffres, et c'est un multiple de ${N("25")}.` },
        ]
      };
    })(),
    // ---------------------------------------------------------------- 4
    {
      titre: "Chiffres manquants",
      sous: "Quel chiffre mettre dans la case ?",
      cours: `
        <div class="regle"><b>Méthode :</b> on applique le critère de divisibilité adapté :<br>
          • par ${N("3")} ou ${N("9")} : on calcule la somme des chiffres connus, puis on cherche ce qu'il faut ajouter pour obtenir un multiple de ${N("3")} ou ${N("9")} ;<br>
          • par ${N("4")}, ${N("8")} ou ${N("25")} : on regarde les deux ou trois derniers chiffres ;<br>
          • par ${N("2")} ou ${N("5")} : on regarde le chiffre des unités.</div>
        <div class="exemple"><b>Exemple :</b> quels chiffres peut-on mettre pour que ${P("57☐2")} soit divisible par ${N("3")} ?<br>
          ${N("5 + 7 + 2 = 14")} : on ajoute ${N("1")}, ${N("4")} ou ${N("7")} pour obtenir ${N("15")}, ${N("18")} ou ${N("21")}.<br>
          Chiffres possibles : ${N("1 , 4 , 7")}.</div>`,
      questions: [
        { type:"chiffres", enonce:`Choisir <u>tous</u> les chiffres possibles pour que ${P("57☐2")} soit divisible par ${N("3")} :`, rep:chif("57","2",n=>par(n,3)),
          indice:`${N("5 + 7 + 2 = 14")}. Que faut-il ajouter pour obtenir un multiple de ${N("3")} ?`,
          expl:`Chiffres : ${N(chif("57","2",n=>par(n,3)).join(" , "))} (sommes ${N("15 , 18 , 21")}).` },
        { type:"chiffres", enonce:`Choisir <u>tous</u> les chiffres possibles pour que ${P("3☐48")} soit divisible par ${N("9")} :`, rep:chif("3","48",n=>par(n,9)),
          indice:`${N("3 + 4 + 8 = 15")}. Cherche un multiple de ${N("9")} supérieur à ${N("15")}.`,
          expl:`${N("15 + ☐ = 18")} donc le chiffre est ${N(chif("3","48",n=>par(n,9)).join(" , "))} (${N("3348 = 9 × 372")}).` },
        { type:"chiffres", enonce:`Choisir <u>tous</u> les chiffres possibles pour que ${P("25☐6")} soit divisible par ${N("4")} :`, rep:chif("25","6",n=>par(n,4)),
          indice:`Le nombre formé par les deux derniers chiffres est ${N("☐6")}.`,
          expl:`${N("16 , 36 , 56 , 76 , 96")} sont des multiples de ${N("4")} donc les chiffres sont ${N(chif("25","6",n=>par(n,4)).join(" , "))}.` },
        { type:"chiffres", enonce:`Choisir <u>tous</u> les chiffres possibles pour que ${P("2☐6")} soit divisible par ${N("8")} :`, rep:chif("2","6",n=>par(n,8)),
          indice:`Essaie ${N("206 , 216 , 226 …")} et divise par ${N("8")}.`,
          expl:`${N("216 = 8 × 27")}, ${N("256 = 8 × 32")}, ${N("296 = 8 × 37")} donc les chiffres sont ${N(chif("2","6",n=>par(n,8)).join(" , "))}.` },
        { type:"chiffres", enonce:`Choisir <u>tous</u> les chiffres possibles pour que ${P("4☐70")} soit divisible par ${N("15")} :`, rep:chif("4","70",n=>par(n,15)),
          indice:`Le chiffre des unités est ${N("0")} ${OK} (divisible par ${N("5")}). Il reste la divisibilité par ${N("3")}.`,
          expl:`${N("4 + 7 + 0 = 11")} : on ajoute ${N("1")}, ${N("4")} ou ${N("7")} donc les chiffres sont ${N(chif("4","70",n=>par(n,15)).join(" , "))}.` },
        (function () {
          let c = 0; const sol = [];
          for (let a = 0; a < 10; a++) for (let b = 0; b < 10; b++) if (par(+("2" + a + "7" + b), 45)) { c++; sol.push("2" + a + "7" + b) }
          return { type:"nombre", enonce:`Combien de nombres de la forme ${N("2a7b")} (où ${N("a")} et ${N("b")} sont des chiffres) sont divisibles par ${N("5")} et par ${N("9")} ?`, rep:[c],
            indice:`${N("b")} vaut ${N("0")} ou ${N("5")}. Pour chaque cas, cherche ${N("a")} pour que la somme des chiffres soit un multiple de ${N("9")}.`,
            expl:`${N("b = 0")} : ${N("9 + a")} donc ${N("a = 0")} ou ${N("9")}. ${N("b = 5")} : ${N("14 + a")} donc ${N("a = 4")}. Nombres : ${liste(sol)} soit ${N(c)} nombres.` };
        })(),
      ]
    },
    // ---------------------------------------------------------------- 5
    {
      titre: "Divisibilité par 6, 12, 15 et 45",
      sous: "Deux nombres premiers entre eux",
      cours: `
        <div class="regle"><b>Théorème :</b> si un nombre est divisible par ${N("a")} et par ${N("b")}, et si ${N("a")} et ${N("b")} sont <b>premiers entre eux</b> (leur seul diviseur commun est ${N("1")}), alors il est divisible par ${N("a × b")}.</div>
        <div class="regle">
          • divisible par ${N("6")} ⟸ divisible par ${N("2")} et par ${N("3")} ;<br>
          • divisible par ${N("12")} ⟸ divisible par ${N("3")} et par ${N("4")} ;<br>
          • divisible par ${N("15")} ⟸ divisible par ${N("3")} et par ${N("5")} ;<br>
          • divisible par ${N("45")} ⟸ divisible par ${N("5")} et par ${N("9")}.</div>
        <div class="astuce"><b>Erreur fréquente :</b> ${N("60")} est divisible par ${N("4")} et par ${N("6")}, mais <b>pas</b> par ${N("24")}, car ${N("4")} et ${N("6")} ne sont pas premiers entre eux (diviseur commun ${N("2")}).</div>`,
      questions: [
        (function () {
          const O = [[2,6],[3,4],[4,6],[2,12]];
          return { type:"qcm", enonce:`Pour montrer qu'un nombre est divisible par ${N("12")}, on vérifie qu'il est divisible par :`,
            options:O.map(o => `${N(o[0])} et ${N(o[1])}`), rep:O.findIndex(o => o[0]*o[1] === 12 && pgcd(o[0], o[1]) === 1),
            indice:`On cherche deux nombres de produit ${N("12")} qui sont premiers entre eux.`,
            expl:`${N("12 = 3 × 4")} et ${N("3")} et ${N("4")} sont premiers entre eux. (${N("2")} et ${N("6")} ont pour diviseur commun ${N("2")}, ${N("4")} et ${N("6")} aussi.)` };
        })(),
        (function () {
          const L = [2742, 1565, 3564, 4664, 1776];
          return { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("6")} :`, options:L.map(String), rep:choisir(L, n => par(n,6)),
            indice:`Il faut qu'il soit pair <b>et</b> que la somme de ses chiffres soit un multiple de ${N("3")}.`,
            expl:L.map(n => `${N(n)} → ${n % 2 ? "impair" : "pair"}, ${N(som(n))} ${par(n,6) ? OK : KO}`).join(" ; ") };
        })(),
        (function () {
          const L = [1765, 7245, 2730, 4655, 3015];
          return { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("15")} :`, options:L.map(String), rep:choisir(L, n => par(n,15)),
            indice:`Chiffre des unités ${N("0")} ou ${N("5")} <b>et</b> somme des chiffres multiple de ${N("3")}.`,
            expl:L.map(n => `${N(n)} → ${N(som(n))} ${par(n,15) ? OK : KO}`).join(" ; ") };
        })(),
        { type:"qcm", enonce:`Le nombre ${N("4664")} est divisible par :`, options:["3","4","12","6"], rep:1,
          indice:`${N("64")} est-il un multiple de ${N("4")} ? Et la somme ${N("4 + 6 + 6 + 4")} ?`,
          expl:`${N("64 = 4 × 16")} ${OK} mais la somme de ses chiffres est ${N("20")} ${KO} : il est divisible par ${N("4")} seulement.` },
        { type:"vf", enonce:`${N("60")} est divisible par ${N("4")} et par ${N("6")}, donc il est divisible par ${N("24")}.`, rep:par(60,24),
          indice:`${N("4")} et ${N("6")} sont-ils premiers entre eux ?`,
          expl:`Faux : ${eq(60,24,2,12)}. Le théorème ne s'applique pas car ${N("4")} et ${N("6")} ne sont pas premiers entre eux.` },
        (function () {
          const L = [7245, 3150, 2565, 4810, 9035];
          return { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("45")} :`, options:L.map(String), rep:choisir(L, n => par(n,45)),
            indice:`${N("45 = 5 × 9")} : chiffre des unités ${N("0")} ou ${N("5")} <b>et</b> somme des chiffres multiple de ${N("9")}.`,
            expl:L.map(n => `${N(n)} → ${N(som(n))} ${par(n,45) ? OK : KO}`).join(" ; ") };
        })(),
      ]
    },
  ],
  // -------------------------------------------------------------------- Examen
  examen: {
    titre: "Examen final",
    seuil: 6,
    questions: [
      { type:"nombre", enonce:`Quel est le reste de la division euclidienne de ${N("1974")} par ${N("25")} ?`, rep:[dv(1974,25).r],
        expl:`${eq(1974,25,dv(1974,25).q,dv(1974,25).r)} donc le reste est ${N(dv(1974,25).r)}.` },
      { type:"nombre", enonce:`Dans une division euclidienne, le diviseur est ${N("13")}, le quotient ${N("8")} et le reste est le plus grand possible. Quel est le dividende ?`, rep:[13*8+12],
        expl:`Le plus grand reste est ${N("12")} donc ${N("a = 13 × 8 + 12 = " + (13*8+12))}.` },
      { type:"vf", enonce:`${N("100 = 7 × 13 + 9")} est la division euclidienne de ${N("100")} par ${N("7")}.`, rep:false,
        expl:`L'égalité est vraie mais le reste ${N("9")} est supérieur à ${N("7")}. La bonne division est ${eq(100,7,14,2)}.` },
      (function () {
        const L = [4518, 2763, 7005, 6372, 8091];
        return { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("9")} :`, options:L.map(String), rep:choisir(L, n => par(n,9)),
          expl:L.map(n => `${N(n)} → ${N(som(n))} ${par(n,9) ? OK : KO}`).join(" ; ") };
      })(),
      (function () {
        const L = [3150, 4725, 1260, 6075, 2580];
        return { type:"multi", enonce:`Choisir <u>tous</u> les nombres divisibles par ${N("25")} :`, options:L.map(String), rep:choisir(L, n => par(n,25)),
          expl:L.map(n => `${N(n)} → ${N(String(n).slice(-2))} ${par(n,25) ? OK : KO}`).join(" ; ") };
      })(),
      { type:"chiffres", enonce:`Choisir <u>tous</u> les chiffres possibles pour que ${P("6☐35")} soit divisible par ${N("9")} :`, rep:chif("6","35",n=>par(n,9)),
        expl:`${N("6 + 3 + 5 = 14")} : on ajoute ${N("4")} pour obtenir ${N("18")} donc le chiffre est ${N(chif("6","35",n=>par(n,9)).join(" , "))}.` },
      { type:"chiffres", enonce:`Choisir <u>tous</u> les chiffres possibles pour que ${P("1☐96")} soit divisible par ${N("12")} :`, rep:chif("1","96",n=>par(n,12)),
        expl:`${N("96 = 4 × 24")} ${OK}. Par ${N("3")} : ${N("1 + 9 + 6 = 16")} : on ajoute ${N("2")}, ${N("5")} ou ${N("8")} donc les chiffres sont ${N(chif("1","96",n=>par(n,12)).join(" , "))}.` },
      (function () {
        const O = [[2,6],[4,6],[3,4],[3,5]];
        return { type:"qcm", enonce:`Pour montrer qu'un nombre est divisible par ${N("15")}, on vérifie qu'il est divisible par :`,
          options:O.map(o => `${N(o[0])} et ${N(o[1])}`), rep:O.findIndex(o => o[0]*o[1] === 15),
          expl:`${N("15 = 3 × 5")} et ${N("3")} et ${N("5")} sont premiers entre eux.` };
      })(),
    ]
  }
};
window.LECONS = window.LECONS || {};
window.LECONS[LECON.id] = LECON;
})();
