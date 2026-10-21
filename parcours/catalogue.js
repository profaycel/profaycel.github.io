// =====================================================
// PROFAYCEL — Catalogue des cours par niveaux (parcours)
// Ajouter une leçon : créer parcours/lecons/<f>.js puis l'ajouter ici.
// =====================================================

window.CATALOGUE = [
    { id: "8-maths-divisibilite",            f: "lecon1-divisibilite",          niveau: "8 أساسي", partie: "algebre", n: 5, titre: "قابليّة القسمة",             sous: "القسمة على 3 و9 و4 و8" },
    { id: "8-maths-entiers-relatifs",        f: "lecon2-entiers-relatifs",      niveau: "8 أساسي", partie: "algebre", n: 5, titre: "الأعداد الصحيحة النسبيّة",    sous: "ℕ و ℤ، الاحتواء، التقاطع والاتّحاد، القيمة المطلقة، المستقيم المدرّج" },
    { id: "8-maths-addition-soustraction-z", f: "lecon3-addition-soustraction", niveau: "8 أساسي", partie: "algebre", n: 8, titre: "الجمع والطرح في ℤ",          sous: "الجمع، الطرح، العدد المجهول، حذف الأقواس، المقارنة" },
    { id: "8-maths-multiplication-z",        f: "lecon4-multiplication",        niveau: "8 أساسي", partie: "algebre", n: 8, titre: "الضرب في ℤ",                 sous: "قاعدة العلامات، الأولويّات، النشر، التفكيك إلى جذاء عوامل" },
    { id: "8-maths-rationnels",              f: "lecon5-rationnels",            niveau: "8 أساسي", partie: "algebre", n: 5, titre: "الأعداد الكسريّة النسبيّة",   sous: "D و ℚ، العدد العشري، المقارنة والترتيب، القيمة المطلقة" },
    { id: "8-maths-addition-q",              f: "lecon6-addition-q",            niveau: "8 أساسي", partie: "algebre", n: 8, titre: "الجمع والطرح في ℚ",          sous: "توحيد المقامات، الطرح، حذف الأقواس، المقارنة، المستقيم المدرّج" },
    { id: "8-geo-symetrie-centrale",         f: "geo1-symetrie-centrale",       niveau: "8 أساسي", partie: "geometrie", n: 7, titre: "التناظر المركزي",          sous: "مناظرة نقطة وأشكال، مركز التناظر، المعيّن المتعامد" },
    { id: "8-geo-angles-paralleles",         f: "geo2-angles",                  niveau: "8 أساسي", partie: "geometrie", n: 5, titre: "الزوايا والمستقيمات المتوازية", sous: "المتبادلة داخليّا، المتماثلة، الداخليّة من نفس الجهة" },
    // ----- 9 أساسي (الثلاثي الأوّل) -----
    { id: "9-maths-divisibilite",            f: "9-lecon1-divisibilite",        niveau: "9 أساسي", partie: "algebre", n: 7, titre: "قابليّة القسمة",             sous: "الأعداد الأوّليّة فيما بينها، القسمة على 6 و12 و15 و18 و36 و45، الأرقام الناقصة" },
    { id: "9-maths-denombrement",            f: "9-lecon2-denombrement",        niveau: "9 أساسي", partie: "algebre", n: 7, titre: "التعداد",                    sous: "كَمّ مجموعة، التقاطع والاتّحاد، شجرة الاختيار، الأزواج، المستقيمات والأقطار" },
    { id: "9-maths-reels",                   f: "9-lecon3-reels",               niveau: "9 أساسي", partie: "algebre", n: 7, titre: "مجموعة الأعداد الحقيقيّة ℝ", sous: "الكتابة العشريّة الدوريّة، ℕ ⊂ ℤ ⊂ ID ⊂ ℚ ⊂ ℝ، الجذر التربيعي، المستقيم المدرّج" }
];

window.CATALOGUE_PAR_ID = Object.fromEntries(window.CATALOGUE.map(function (l) { return [l.id, l]; }));

// Un certificat par partie (même liste que la table Supabase public.parties)
window.PARTIES = [
    { id: "8-algebre-t1",   titre: "الجبر والحساب", niveau: "8 أساسي", partie: "algebre",
      lecons: ["8-maths-divisibilite", "8-maths-entiers-relatifs", "8-maths-addition-soustraction-z", "8-maths-multiplication-z", "8-maths-rationnels", "8-maths-addition-q"] },
    { id: "8-geometrie-t1", titre: "الهندسة",       niveau: "8 أساسي", partie: "geometrie",
      lecons: ["8-geo-symetrie-centrale", "8-geo-angles-paralleles"] },
    // 9 أساسي : la liste contient aussi les leçons prévues (ajoutées au fur et à mesure)
    { id: "9-algebre-t1",   titre: "الجبر والحساب", niveau: "9 أساسي", partie: "algebre",
      lecons: ["9-maths-divisibilite", "9-maths-denombrement", "9-maths-reels", "9-maths-operations-r", "9-maths-inverse-valeur-absolue", "9-maths-produits-remarquables"] }
];
window.partieDe = function (lid) { return window.PARTIES.find(function (p) { return p.lecons.includes(lid); }); };
