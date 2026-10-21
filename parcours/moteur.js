// ============================================================
// محتوى الدرس: المستويات، الشرح، والأسئلة
// Types : qcm (choix unique), multi (plusieurs bonnes réponses),
//         vf (vrai/faux), nombre, mot, chiffres (choisir tous les chiffres possibles)
// ============================================================
const C = '<span class="case"></span>';          // خانة الرقم الناقص
const N = s => `<span class="ltr">${s}</span>`;  // عدد أو عملية (من اليسار لليمين)
const P = s => N(s.replace("☐", C));              // عدد فيه خانة ناقصة
const F = (a,b) => `<span class="frac"><span>${a}</span><span>${b}</span></span>`; // كسر
const estNum = o => /^[\d\s−\-{},.\/]+$/.test(o);       // اختيار رقمي ← من اليسار لليمين
// عدد مكتوب كنصّ: "−3/7" أو "0,75" أو 5 ← قيمته
function toNum(x){
  if (typeof x === "number") return x;
  const t = String(x).replace(/[−–]/g,"-").replace(/\s+/g,"").replace(",",".");
  if (t.includes("/")){ const [a,b] = t.split("/"); return Number(a) / Number(b) }
  return t === "" ? NaN : Number(t);
}
const egal = (x,y) => Math.abs(x - y) < 1e-9;
const pgcd = (a,b) => b ? pgcd(b, a % b) : a;
// عرض عدد: الكسر "−3/7" يظهر بخطّ الكسر
function fmt(r){
  const t = String(r).replace(/-/g,"−").replace(".",",");
  const m = t.match(/^(−?)(\d+)\/(\d+)$/);
  return m ? N(m[1] + F(m[2], m[3])) : N(t);
}
const opt = o => /^−?\d+\/\d+$/.test(o) ? fmt(o) : estNum(o) ? N(o) : o;

// ============================================================
// حفظ التقدّم في Supabase (جدول progression) + نسخة محلّيّة احتياطيّة
// ============================================================
let CLE, etat, app, nbNiv, UTIL = null;
const sb = () => window.supabaseClient;
function sauverLocal(){ try{ localStorage.setItem(CLE, JSON.stringify(etat)) }catch(e){} }
let minuterie = null;
function sauver(){
  sauverLocal();
  clearTimeout(minuterie);
  minuterie = setTimeout(envoyer, 400);
}
async function envoyer(){
  if (!UTIL) return;
  const ligne = {
    user_id: UTIL.id, lecon: LECON.id,
    etoiles: LECON.niveaux.map((n,i)=>etat.etoiles[i] || 0),
    erreurs: etat.erreurs || {},
    examen_score: etat.examen ? etat.examen.score : null,
    examen_total: LECON.examen.questions.length,
    examen_essais: etat.essais || 0,
    examen_le: etat.examen ? etat.examen.date : null,
    updated_at: new Date().toISOString()
  };
  const { error } = await sb().from("progression").upsert(ligne, { onConflict: "user_id,lecon" });
  if (error){ console.error("Sauvegarde:", error); avertir("⚠️ لم يُحفظ تقدّمك (تحقّق من الأنترنت). سنعيد المحاولة."); setTimeout(envoyer, 5000) }
}
function avertir(t){
  let b = document.getElementById("avert");
  if (!b){ b = document.createElement("div"); b.id = "avert"; b.className = "retour indice no-print"; b.style.cssText = "display:block;position:fixed;bottom:12px;left:12px;right:12px;z-index:9;max-width:740px;margin:auto"; document.body.appendChild(b) }
  b.textContent = t; clearTimeout(b._t); b._t = setTimeout(()=>b.remove(), 6000);
}

function etoilesTxt(n){ return "★".repeat(n) + "☆".repeat(3-n) }
function niveauOuvert(i){ return i === 0 || etat.etoiles[i-1] > 0 }
function pct(){ return Math.round(100 * (etat.etoiles.filter(x=>x>0).length + (etat.examen ? 1 : 0)) / (nbNiv + 1)) }

// ---------------- الخريطة ----------------
function carte(){
  const total = etat.etoiles.reduce((a,b)=>a+(b||0),0);
  let h = `<div class="carte">
    <h2>${LECON.titre}</h2>
    <div style="color:var(--gris)">أكمل المستويات بالترتيب. كلّ مستوى يُفتح عندما تجيب عن أسئلة المستوى الذي قبله.</div>
    <div class="prog"><div style="width:${pct()}%"></div></div>
    <small style="color:var(--gris)">التقدّم: ${pct()}% · النجوم: ${total} / ${nbNiv*3} ⭐</small>
  </div>`;
  LECON.niveaux.forEach((nv,i)=>{
    const fait = etat.etoiles[i] > 0, ouvert = niveauOuvert(i);
    h += `<button class="niveau ${fait?"fait":ouvert?"":"ferme"}" ${ouvert?`onclick="ouvrirNiveau(${i})"`:"disabled"}>
      <span class="num">${fait?"✓":ouvert?i:"🔒"}</span>
      <span class="info"><span class="titre">المستوى ${i}: ${nv.titre}</span><br><span class="sous">${nv.sous}</span></span>
      ${fait?`<span class="etoiles">${etoilesTxt(etat.etoiles[i])}</span>`:""}
    </button>`;
  });
  const exOuvert = etat.etoiles.filter(x=>x>0).length === nbNiv;
  h += `<button class="niveau ${etat.examen?"fait":exOuvert?"":"ferme"}" ${exOuvert?`onclick="ouvrirExamen()"`:"disabled"}>
      <span class="num">${etat.examen?"🎓":exOuvert?"🏁":"🔒"}</span>
      <span class="info"><span class="titre">${LECON.examen.titre}</span><br><span class="sous">${LECON.examen.questions.length} أسئلة · تنجح بـ ${LECON.examen.seuil} إجابات صحيحة على الأقلّ</span></span>
      ${etat.examen?`<span class="etoiles">${etat.examen.score}/${LECON.examen.questions.length}</span>`:""}
    </button>`;
  h += `<div id="partieEtat"></div>`;
  h += `<div class="actions no-print"><a class="btn sec" href="index.html" style="text-decoration:none">← كلّ الدروس</a>${window.PF_ADMIN ? `<button class="btn sec" onclick="toutesQuestions()">👨‍🏫 وضع الأستاذ</button>` : ""}</div>`;
  app.innerHTML = h; scrollTo(0,0);
  majPartie();
}

// ---------------- الشهادة: واحدة لكلّ جزء (الجبر، الهندسة) ----------------
async function majPartie(){
  const zone = document.getElementById("partieEtat"), pa = window.partieDe && partieDe(LECON.id);
  if (!zone || !pa || !UTIL) return;
  clearTimeout(minuterie); await envoyer();
  const [pr, ce] = await Promise.all([
    sb().from("progression").select("lecon,examen_score").eq("user_id", UTIL.id).in("lecon", pa.lecons),
    sb().from("certificats").select("numero").eq("user_id", UTIL.id).eq("lecon", pa.id)
  ]);
  const reussies = new Set((pr.data || []).filter(p => p.examen_score != null).map(p => p.lecon));
  const n = pa.lecons.length, k = reussies.size, dejaCert = (ce.data || []).length > 0;
  const restantes = pa.lecons.filter(id => !reussies.has(id)).map(id => window.CATALOGUE_PAR_ID[id]).filter(Boolean);
  let h = `<div class="carte" style="background:#fffbeb;border-color:#fde68a">
    <h3>🎓 شهادة « ${pa.titre} »</h3>
    <div class="prog"><div style="width:${Math.round(100 * k / n)}%"></div></div>
    <small style="color:var(--gris)">الدروس الناجحة: ${N(k + " / " + n)}</small>`;
  if (dejaCert || k === n){
    h += `<p>${dejaCert ? "شهادتك جاهزة 👏" : "🎉 نجحت في كلّ دروس هذا الجزء! تستحقّ شهادتك."}</p>
      <div class="actions"><button class="btn vert" onclick="certificat('${pa.id}')">🎓 ${dejaCert ? "عرض شهادتي" : "احصل على شهادتي"}</button></div>`;
  } else {
    h += `<p>${reussies.has(LECON.id) ? "✅ نجحت في هذا الدرس. " : ""}أكمل الدروس الباقية لتحصل على الشهادة:</p>`
      + restantes.map(l => `<a href="lecon.html?l=${l.id}" style="display:block;color:var(--bleu);font-weight:700;text-decoration:none;margin:4px 0">← ${l.titre}</a>`).join("");
  }
  zone.innerHTML = h + `</div>`;
}

// ---------------- المستوى: الشرح ثمّ الأسئلة ----------------
let session = null;
function ouvrirNiveau(i){
  const nv = LECON.niveaux[i];
  app.innerHTML = `<div class="carte">
      <div class="qhead"><span>المستوى ${i}</span><span>📖 الدرس</span></div>
      <h2>${nv.titre}</h2>${nv.cours}
      <div class="actions"><button class="btn" onclick="commencer(${i})">فهمت، نبدأ الأسئلة ✏️</button>
      <button class="btn sec" onclick="carte()">رجوع</button></div></div>`;
  scrollTo(0,0);
}
function commencer(i){
  session = { mode:"niveau", i, qs:LECON.niveaux[i].questions, q:0, erreurs:0, essais:0 };
  question();
}
function ouvrirExamen(){
  const qs = LECON.examen.questions.map((q,k)=>Object.assign({}, q, { __k:k })).sort(()=>Math.random()-.5);
  session = { mode:"examen", qs, q:0, score:0 };
  app.innerHTML = `<div class="carte centre"><div class="grand">🏁</div><h2>${LECON.examen.titre}</h2>
    <p>${qs.length} أسئلة تجمع كلّ المستويات.<br><b>محاولة واحدة لكلّ سؤال، وبدون تلميحات.</b><br>تنجح إذا أجبت عن ${LECON.examen.seuil} أسئلة على الأقلّ إجابة صحيحة.</p>
    <div class="actions" style="justify-content:center"><button class="btn" onclick="question()">ابدأ الامتحان</button><button class="btn sec" onclick="carte()">رجوع</button></div></div>`;
  scrollTo(0,0);
}

let choix = null;
function question(){
  const s = session, q = s.qs[s.q];
  choix = q.type === "multi" || q.type === "chiffres" ? new Set() : null;
  s.essais = 0;
  let zone = "";
  if (q.type === "qcm" || q.type === "multi"){
    zone = `<div class="opts">${q.options.map((o,k)=>`<button class="opt" data-k="${k}" onclick="choisir(this)">${opt(o)}</button>`).join("")}</div>`;
  } else if (q.type === "vf"){
    zone = `<div class="opts"><button class="opt" data-k="1" onclick="choisir(this)">✔️ صحيح</button><button class="opt" data-k="0" onclick="choisir(this)">✖️ خطأ</button></div>`;
  } else if (q.type === "chiffres"){
    zone = `<div class="chiffres">${[0,1,2,3,4,5,6,7,8,9].map(d=>`<button class="opt" data-k="${d}" onclick="choisir(this)">${d}</button>`).join("")}</div>`;
  } else {
    const num = ["nombre","ensemble","expr","facteur","coord"].includes(q.type);
    const clavier = q.type === "nombre" && q.rep.every(r=>r>=0) ? 'inputmode="numeric"' : "";
    const ph = q.ph || { nombre:"اكتب العدد", ensemble:"2 , -6", expr:"a - 3", facteur:"2(a + 3)", coord:"(-3 , 2)", mot:"اكتب الكلمة" }[q.type];
    zone = `<input class="rep" id="rep" ${num?'dir="ltr"':''} ${clavier} placeholder="${ph}" autocomplete="off" onkeydown="if(event.key==='Enter')verifier()">`
      + (q.type==="expr" && q.aide ? `<small style="color:var(--gris)">${q.aide}</small>` : "")
      + (q.type==="expr" && !q.aide ? '<small style="color:var(--gris)">اكتب العبارة مختصرة، بدون أقواس (مثال: <span class="ltr">a - 3</span> أو <span class="ltr">7 - a</span>).</small>' : "")
      + (q.type==="facteur" && q.aide ? `<small style="color:var(--gris)">${q.aide}</small>` : "")
      + (q.type==="facteur" && !q.aide ? '<small style="color:var(--gris)">اكتب العبارة في شكل جذاء (مثال: <span class="ltr">2(a + 3)</span> أو <span class="ltr">(a + 1)(2a - 5)</span>).</small>' : "")
      + (q.type==="coord" ? '<small style="color:var(--gris)">اكتب <b>الفاصلة</b> ثمّ <b>الترتيبة</b> بينهما فاصلة: <span class="ltr">(-3 , 2)</span></small>' : "")
      + (q.type==="ensemble" ? '<small style="color:var(--gris)">اكتب العناصر مفصولة بفاصلة ( , ) وبأيّ ترتيب.</small>' : "");
  }
  const titre = s.mode === "examen" ? LECON.examen.titre : `المستوى ${s.i}: ${LECON.niveaux[s.i].titre}`;
  app.innerHTML = `<div class="carte">
    <div class="qhead"><span>${titre}</span><span style="white-space:nowrap">سؤال ${s.q+1} / ${s.qs.length}</span></div>
    <div class="prog"><div style="width:${100*s.q/s.qs.length}%"></div></div>
    <div class="enonce">${q.enonce}</div>
    ${q.type==="multi"||q.type==="chiffres"?'<small style="color:var(--gris)">يمكن اختيار أكثر من إجابة.</small>':""}
    ${zone}
    <div class="retour" id="retour"></div>
    <div class="actions">
      <button class="btn" id="bVerif" onclick="verifier()">تحقّق</button>
      ${s.mode==="niveau"?`<button class="btn sec" onclick="ouvrirNiveau(${s.i})">📖 راجع الدرس</button>`:""}
    </div></div>`;
  const inp = document.getElementById("rep"); if (inp) inp.focus();
  scrollTo(0,0);
}
function choisir(b){
  if (b.disabled) return;
  const k = +b.dataset.k;
  if (choix){ choix.has(k) ? choix.delete(k) : choix.add(k); b.classList.toggle("sel"); b.classList.remove("ko") }
  else { document.querySelectorAll(".opt").forEach(x=>x.classList.remove("sel","ko")); b.classList.add("sel"); choix = k }
  document.getElementById("retour").className = "retour";
}
function normaliser(t){
  return String(t).trim().replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[إأآ]/g,"ا").replace(/ة/g,"ه").replace(/[ًٌٍَُِّْـ]/g,"").replace(/[−–]/g,"-").replace(/\s+/g," ").toLowerCase();
}
// عبارة حرفيّة: نقارن القيم من أجل عدّة قيم لـ a و b، ونتثبّت أنّها مختصرة
function versJS(t){ t = nettoyer(t); return t.replace(/\[/g,"(").replace(/\]/g,")").replace(/(\d)(?=[ab(])/g,"$1*").replace(/([ab)])(?=[ab(\d])/g,"$1*") }
function evalExpr(t, a, b){ return Function("a","b","return (" + versJS(t) + ")")(a, b) }
// عدد الحدود في المستوى الأعلى (خارج الأقواس)
function nbTermes(t){
  let n = 1, p = 0;
  for (let i = 0; i < t.length; i++){
    const c = t[i];
    if (c === "(") p++; else if (c === ")") p--;
    else if ((c === "+" || c === "-") && p === 0 && i > 0 && !"(*".includes(t[i-1])) n++;
  }
  return n;
}
function nettoyer(t){ return t.replace(/[−–]/g,"-").replace(/[×·]/g,"*").replace(/\s+/g,"").replace(/^[A-Z]=/,"").replace(/\[/g,"(").replace(/\]/g,")")
  .replace(/[xX]/g,"a").replace(/[yY]/g,"b").replace(/²/g,"^2").replace(/³/g,"^3").replace(/\^/g,"**") }   // x ← a ، y ← b ، x² ← a**2
// expr : نشر/اختصار ← يجب أن تكون بدون أقواس وبنفس عدد الحدود (أو أقلّ)
// facteur : تفكيك ← يجب أن تكون جذاءً (حدّ واحد فيه أقواس)
function verifierExpr(q){
  const v = nettoyer(document.getElementById("rep").value);
  if (!/^[0-9ab+\-*\/()]+$/.test(v)) return false;
  try{
    for (const [a,b] of [[2,1],[7,-4],[-3,5],[11,0],[-6,-7]]){
      if (Math.abs(evalExpr(v,a,b) - evalExpr(q.rep,a,b)) > 1e-9) return false;
    }
  }catch(e){ return false }
  if (q.type === "facteur") return (nbTermes(v.replace(/^-/,"")) === 1 && v.includes("(")) ? true : "pasFacteur";
  return (!v.includes("(") && nbTermes(v) <= nbTermes(nettoyer(q.rep))) ? true : "pasSimple";
}
function estJuste(q){
  if (q.type === "expr" || q.type === "facteur") return verifierExpr(q);
  if (q.type === "qcm") return choix === q.rep;
  if (q.type === "vf") return choix === (q.rep ? 1 : 0);
  if (q.type === "multi" || q.type === "chiffres"){
    return choix.size === q.rep.length && q.rep.every(r=>choix.has(r));
  }
  const v = normaliser(document.getElementById("rep").value);
  if (q.type === "nombre"){
    if (q.decimal && v.includes("/")) return "pasDecimal";
    const x = toNum(v);
    if (isNaN(x) || !q.rep.some(r=>egal(x, toNum(r)))) return false;
    const m = v.replace(/\s/g,"").match(/^-?(\d+)\/(\d+)$/);
    if (q.irr && m && pgcd(+m[1], +m[2]) > 1) return "pasIrreductible";
    return true;
  }
  if (q.type === "coord"){
    const nb = (v.match(/-?\d+(\.\d+)?(\/\d+)?/g) || []).map(toNum);
    return nb.length === 2 && egal(nb[0], toNum(q.rep[0])) && egal(nb[1], toNum(q.rep[1]));
  }
  if (q.type === "ensemble"){
    const nb = (v.match(/-?\d+(\.\d+)?(\/\d+)?/g) || []).map(toNum).filter((x,i,t)=>t.findIndex(y=>egal(x,y)) === i);
    return nb.length === q.rep.length && q.rep.every(r=>nb.some(x=>egal(x, toNum(r))));
  }
  return q.rep.some(r=>normaliser(r) === v);
}
function vide(q){
  if (["nombre","mot","ensemble","expr","facteur","coord"].includes(q.type)) return document.getElementById("rep").value.trim() === "";
  if (choix instanceof Set) return choix.size === 0;
  return choix === null;
}
function verifier(){
  const s = session, q = s.qs[s.q], r = document.getElementById("retour");
  if (vide(q)){ r.className = "retour indice"; r.innerHTML = "اختر أو اكتب إجابة أوّلا 🙂"; return }
  const ok = estJuste(q);
  if (ok === "pasIrreductible"){ r.className = "retour indice"; r.innerHTML = "👍 النتيجة صحيحة، لكن <b>اختزل الكسر إلى أقصى حدّ</b> (اقسم البسط والمقام على نفس العدد)."; return }
  if (ok === "pasDecimal"){ r.className = "retour indice"; r.innerHTML = "✍️ المطلوب <b>الكتابة العشريّة</b>: اكتب العدد بالفاصل (مثال: 3,5) وليس كسرا."; return }
  if (ok === "pasFacteur"){ r.className = "retour indice"; r.innerHTML = "👍 العبارة تساوي الإجابة، لكن المطلوب <b>تفكيكها</b>: اكتبها في شكل <b>جذاء</b> (العامل المشترك × قوس)."; return }
  if (ok === "pasSimple"){ r.className = "retour indice"; r.innerHTML = "👍 النتيجة صحيحة، لكن <b>انشر واختصر أكثر</b>: احذف الأقواس واجمع الحدود المتشابهة."; return }
  if (!ok) noterErreur(s.mode === "examen" ? "E-" + q.__k : s.i + "-" + s.q);
  if (s.mode === "examen"){
    if (ok) s.score++;
    bloquer(q, true);
    r.className = "retour " + (ok?"ok":"ko");
    r.innerHTML = (ok ? "✅ إجابة صحيحة! " : "❌ إجابة خاطئة. ") + (q.expl ? "<br>" + q.expl : "");
    suivantBtn(); return;
  }
  if (ok){
    bloquer(q, true);
    r.className = "retour ok";
    r.innerHTML = `✅ ${["ممتاز!","برافو!","أحسنت!","رائع!"][Math.floor(Math.random()*4)]}<br>${q.expl}`;
    suivantBtn();
  } else {
    s.erreurs++; s.essais++;
    marquerFaux(q);
    if (s.essais === 1){ r.className = "retour indice"; r.innerHTML = `🤔 ليست الإجابة الصحيحة بعد. <b>تلميح:</b> ${q.indice}` }
    else { r.className = "retour ko"; r.innerHTML = `❌ ما زالت خاطئة. ارجع إلى الدرس 📖 ثمّ حاول من جديد.<br><b>تلميح:</b> ${q.indice}` }
  }
}
function noterErreur(cle){
  etat.erreurs = etat.erreurs || {};
  etat.erreurs[cle] = (etat.erreurs[cle] || 0) + 1;
}
function marquerFaux(q){
  document.querySelectorAll(".opt.sel").forEach(b=>{
    const k = +b.dataset.k;
    const bon = q.type==="qcm" ? k===q.rep : q.type==="vf" ? k===(q.rep?1:0) : q.rep.includes(k);
    if (!bon) b.classList.add("ko");
  });
}
function bloquer(q, montrer){
  document.querySelectorAll(".opt").forEach(b=>{
    b.disabled = true; const k = +b.dataset.k;
    const bon = q.type==="qcm" ? k===q.rep : q.type==="vf" ? k===(q.rep?1:0) : (q.rep.includes ? q.rep.includes(k) : false);
    if (montrer && bon) b.classList.add("ok");
    else if (b.classList.contains("sel")) b.classList.add("ko");
  });
  const inp = document.getElementById("rep"); if (inp) inp.disabled = true;
}
function suivantBtn(){
  const b = document.getElementById("bVerif");
  const dernier = session.q === session.qs.length - 1;
  b.textContent = dernier ? "النتيجة 🎉" : "السؤال الموالي ←";
  b.onclick = ()=>{ if (dernier) fin(); else { session.q++; question() } };
  b.focus();
}
function fin(){
  const s = session;
  if (s.mode === "niveau"){
    const et = s.erreurs === 0 ? 3 : s.erreurs <= 2 ? 2 : 1;
    etat.etoiles[s.i] = Math.max(etat.etoiles[s.i]||0, et); sauver();
    const suivant = s.i + 1 < nbNiv;
    app.innerHTML = `<div class="carte centre"><div class="grand">${etoilesTxt(et).replace(/★/g,"⭐").replace(/☆/g,"☆")}</div>
      <h2>أكملت المستوى ${s.i}! 🎉</h2>
      <p>${s.erreurs===0?"ولا خطأ! أداء ممتاز 👏":`عدد الأخطاء: ${s.erreurs}. ${et===2?"عمل جيّد!":"واصل، أنت تتحسّن!"}`}</p>
      <p>${suivant?`🔓 فُتح <b>المستوى ${s.i+1}: ${LECON.niveaux[s.i+1].titre}</b>`:"🔓 فُتح <b>الامتحان النهائي</b>!"}</p>
      <div class="actions" style="justify-content:center">
        ${suivant?`<button class="btn" onclick="ouvrirNiveau(${s.i+1})">المستوى الموالي ←</button>`:`<button class="btn" onclick="ouvrirExamen()">إلى الامتحان 🏁</button>`}
        <button class="btn sec" onclick="carte()">الخريطة</button>
        ${et<3?`<button class="btn sec" onclick="commencer(${s.i})">أعد للحصول على 3 نجوم</button>`:""}
      </div></div>`;
  } else {
    const n = s.qs.length, reussi = s.score >= LECON.examen.seuil;
    etat.essais = (etat.essais || 0) + 1;
    if (reussi){ etat.examen = { score: Math.max(s.score, etat.examen?etat.examen.score:0), date: (etat.examen && etat.examen.date) || new Date().toISOString() } }
    sauver();
    app.innerHTML = `<div class="carte centre"><div class="grand">${reussi?"🎓":"💪"}</div>
      <h2>${reussi?"نجحت في الامتحان!":"لم تنجح هذه المرّة"}</h2>
      <p>نتيجتك: <b>${s.score} / ${n}</b></p>
      <p>${reussi?"✅ نجحت في هذا الدرس، أحسنت 👏":`تحتاج ${LECON.examen.seuil} إجابات صحيحة. راجع المستويات ثمّ أعد المحاولة، الأسئلة ستأتي بترتيب جديد.`}</p>
      <div class="actions" style="justify-content:center">
        ${reussi?"":`<button class="btn" onclick="ouvrirExamen()">أعد الامتحان</button>`}
        <button class="btn sec" onclick="carte()">الخريطة</button></div></div>
      <div id="partieEtat"></div>`;
    if (reussi) majPartie();
  }
  scrollTo(0,0);
}

// ---------------- وضع الأستاذ: كلّ الأسئلة مع الإجابات ----------------
const NOMS_TYPES = { qcm:"اختيار من متعدّد", multi:"اختيار عدّة إجابات", vf:"صحيح / خطأ", nombre:"يكتب عددًا", mot:"يكتب كلمة", ensemble:"يكتب مجموعة", expr:"ينشر / يختصر عبارة", facteur:"يفكّك إلى جذاء عوامل", coord:"يكتب إحداثيّات نقطة", chiffres:"الرقم الناقص (يختار الأرقام)" };
function reponseTxt(q){
  const o = opt;
  if (q.type === "qcm") return o(q.options[q.rep]);
  if (q.type === "multi") return q.rep.map(k=>o(q.options[k])).join(" ، ");
  if (q.type === "vf") return q.rep ? "صحيح" : "خطأ";
  if (q.type === "chiffres") return N(q.rep.join(" , "));
  if (q.type === "nombre") return q.rep.map(fmt).join(" أو ");
  if (q.type === "expr" || q.type === "facteur") return N(q.rep.replace(/\^2/g,"²").replace(/-/g," − ").replace(/\+/g," + ").trim().replace(/(\d+)\/(\d+)/g,(m,x,y)=>F(x,y)));
  if (q.type === "coord") return N(`( ${fmt(q.rep[0])} , ${fmt(q.rep[1])} )`);
  if (q.type === "ensemble") return N("{ " + q.rep.map(fmt).join(" , ") + " }");
  return q.rep[0] + (q.rep.length > 1 ? ` <small style="color:var(--gris)">(يقبل أيضا: ${q.rep.slice(1).join("، ")})</small>` : "");
}
function blocQuestions(qs){
  return qs.map((q,k)=>`<div style="border-top:1px solid var(--bord);padding:12px 0">
      <div class="qhead"><span>سؤال ${k+1}</span><span>${NOMS_TYPES[q.type]}</span></div>
      <div style="font-weight:600;margin:4px 0">${q.enonce}</div>
      ${q.options?`<div style="color:var(--gris);font-size:16px">الاختيارات: ${q.options.map(opt).join(" · ")}</div>`:""}
      <div style="background:var(--vert-clair);padding:6px 10px;border-radius:8px;margin:6px 0">✅ <b>الإجابة:</b> ${reponseTxt(q)}</div>
      ${q.indice?`<div style="font-size:16px;color:#78350f">💡 <b>التلميح:</b> ${q.indice}</div>`:""}
      <div style="font-size:16px;color:var(--gris)">📝 <b>الشرح:</b> ${q.expl}</div>
    </div>`).join("");
}
function toutesQuestions(){
  let h = `<div class="carte"><h2>👨‍🏫 وضع الأستاذ</h2>
    <div style="color:var(--gris)">كلّ الأسئلة مع الإجابات الصحيحة والتلميحات. (هذه الصفحة لن يراها التلاميذ في الموقع.)</div>
    <div class="actions no-print"><button class="btn sec" onclick="carte()">رجوع</button><button class="btn sec" onclick="print()">🖨️ طباعة</button></div></div>`;
  LECON.niveaux.forEach((nv,i)=>{
    h += `<div class="carte"><h3>المستوى ${i}: ${nv.titre}</h3>
      <details><summary style="cursor:pointer;color:var(--bleu)">📖 عرض الدرس</summary>${nv.cours}</details>
      ${blocQuestions(nv.questions)}</div>`;
  });
  h += `<div class="carte"><h3>🏁 ${LECON.examen.titre} (ينجح بـ ${LECON.examen.seuil} / ${LECON.examen.questions.length})</h3>${blocQuestions(LECON.examen.questions)}</div>
    <div class="actions no-print"><button class="btn sec" onclick="carte()">رجوع</button></div>`;
  app.innerHTML = h; scrollTo(0,0);
}

// ---------------- الشهادة ----------------
async function certificat(partie){
  app.innerHTML = `<div class="carte chargement">⏳ نحضّر شهادتك…</div>`;
  clearTimeout(minuterie); await envoyer();
  const { data, error } = await sb().rpc("delivrer_certificat_partie", { p_partie: partie });
  if (error){
    console.error(error);
    app.innerHTML = `<div class="carte centre"><h2>😕 تعذّر إصدار الشهادة</h2><p>تحقّق من اتّصالك بالأنترنت ثمّ أعد المحاولة.</p>
      <div class="actions" style="justify-content:center"><button class="btn" onclick="certificat('${partie}')">أعد المحاولة</button><button class="btn sec" onclick="carte()">الخريطة</button></div></div>`;
    return;
  }
  app.innerHTML = `<div class="cert-ok no-print">🎉 مبروك! هذه شهادتك الرسميّة. رقمها <b class="ltr">${data.numero}</b> ويمكن التحقّق منها بمسح الرمز.</div>
    <div id="certZone"></div>
    <div class="actions no-print" style="justify-content:center">
      <button class="btn" onclick="print()">🖨️ طباعة / حفظ PDF</button>
      <button class="btn sec" onclick="partager('${data.numero}')">🔗 مشاركة الرابط</button>
      <button class="btn sec" onclick="carte()">الخريطة</button></div>
    <p class="no-print" style="text-align:center;color:var(--gris);font-size:15px">الاسم مأخوذ من بطاقتك في المنصّة. إذا كان فيه خطأ، اتّصل بالأستاذ.</p>`;
  monterCertificat(document.getElementById("certZone"), data);
  scrollTo(0,0);
}
function partager(numero){
  const url = CERT_URL + encodeURIComponent(numero);
  if (navigator.share) navigator.share({ title: "شهادتي — Profaycel", url }).catch(()=>{});
  else { if (navigator.clipboard) navigator.clipboard.writeText(url); avertir("✅ نُسخ الرابط: " + url) }
}

// ---------------- البداية: التثبّت من الحساب ثمّ تحميل التقدّم ----------------
async function attendreSupabase(){
  for (let i = 0; i < 100 && !sb(); i++) await new Promise(r=>setTimeout(r, 100));
  return sb();
}
async function demarrer(){
  CLE = "profaycel_" + LECON.id;
  app = document.getElementById("app");
  nbNiv = LECON.niveaux.length;
  document.title = LECON.titre + " | Profaycel";
  app.innerHTML = `<div class="carte chargement">⏳ تحميل…</div>`;
  if (!await attendreSupabase()){ app.innerHTML = `<div class="carte centre">تعذّر الاتّصال. أعد تحميل الصفحة.</div>`; return }
  const { data: { session } } = await sb().auth.getSession();
  if (!session){ location.href = "../login.html"; return }
  UTIL = session.user;
  const role = (UTIL.user_metadata || {}).role;
  const admin = role === "admin" || (UTIL.email || "").toLowerCase() === "faycel.khlifiii@gmail.com";
  // En aperçu « تلميذ تجريبي » (apercu.js), le professeur voit la leçon exactement comme un élève (sans « وضع الأستاذ »)
  window.PF_ADMIN = admin && !(window.pfApercu && window.pfApercu(UTIL));
  if (!admin && role !== "eleve"){ location.href = "../index.html"; return }
  const { data, error } = await sb().from("progression").select("*").eq("user_id", UTIL.id).eq("lecon", LECON.id).maybeSingle();
  if (error) console.error(error);
  etat = { etoiles:[], erreurs:{}, examen:null, essais:0 };
  if (data){
    etat.etoiles = data.etoiles || [];
    etat.erreurs = data.erreurs || {};
    etat.essais = data.examen_essais || 0;
    if (data.examen_score != null) etat.examen = { score: data.examen_score, date: data.examen_le };
  }
  carte();
}
