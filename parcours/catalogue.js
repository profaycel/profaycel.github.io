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
    { id: "8-geo-angles-paralleles",         f: "geo2-angles",                  niveau: "8 أساسي", partie: "geometrie", n: 5, titre: "الزوايا والمستقيمات المتوازية", sous: "المتبادلة داخليّا، المتماثلة، الداخليّة من نفس الجهة" }
];

window.CATALOGUE_PAR_ID = Object.fromEntries(window.CATALOGUE.map(function (l) { return [l.id, l]; }));
