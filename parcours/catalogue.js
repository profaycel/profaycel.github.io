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
    // ----- 7 أساسي (الثلاثي الأوّل) -----
    { id: "7-maths-ensembles",               f: "7-lecon1-ensembles",           niveau: "7 أساسي", partie: "algebre", n: 6, titre: "المجموعات",                  sous: "العنصر، الكَمّ، الاحتواء، التقاطع والاتّحاد، مخطّط فان" },
    { id: "7-maths-addition-soustraction",   f: "7-lecon2-addition-soustraction", niveau: "7 أساسي", partie: "algebre", n: 6, titre: "الجمع والطرح في ℕ",       sous: "الكتابة الجمعيّة والطرحيّة، العدد الناقص، خاصيّة المجموع والفرق، الحساب بأيسر طريقة" },
    { id: "7-maths-multiplication-priorites", f: "7-lecon3-multiplication-priorites", niveau: "7 أساسي", partie: "algebre", n: 6, titre: "الضرب والأولويّات",   sous: "خاصيّات الضرب، التوزيعيّة، العامل المشترك، الأولويّات والأقواس" },
    { id: "7-maths-puissances",              f: "7-lecon4-puissances",          niveau: "7 أساسي", partie: "algebre", n: 7, titre: "القوى والمربّعات الكاملة",   sous: "القاعدة والدليل، الوحدات العشريّة، خاصيّات القوّة، الأولويّات، الجذر التربيعي" },
    { id: "7-maths-division-diviseurs",      f: "7-lecon5-division-diviseurs",  niveau: "7 أساسي", partie: "algebre", n: 6, titre: "القسمة الإقليديّة والقواسم", sous: "الخارج والباقي، الكتابة الأفقيّة، وضعيّات، القاسم، قواعد قابليّة القسمة، مجموعة القواسم" },
    { id: "7-maths-premiers",                f: "7-lecon6-premiers",            niveau: "7 أساسي", partie: "algebre", n: 6, titre: "الأعداد الأوّليّة والتفكيك", sous: "العدد الأوّلي، القواسم الأوّليّة، التفكيك إلى جذاء عوامل أوّليّة، قواسم عدد" },
    { id: "7-maths-multiples",               f: "7-lecon7-multiples",           niveau: "7 أساسي", partie: "algebre", n: 6, titre: "القواسم المشتركة والمضاعفات", sous: "ق.م.أ، الأعداد الأوّليّة فيما بينها، المضاعفات، م.م.أ، وضعيّات" },
    { id: "7-maths-fractions",               f: "7-lecon8-fractions",           niveau: "7 أساسي", partie: "algebre", n: 8, titre: "الأعداد الكسريّة",            sous: "الاختزال، التوحيد، الأعداد الكسريّة العشريّة، المقارنة، الجمع والطرح، الضرب والقسمة" },
    { id: "7-geo-droites",                   f: "7-geo1-droites",               niveau: "7 أساسي", partie: "geometrie", n: 6, titre: "المستقيمات: التوازي والتعامد", sous: "المستقيم ونصف المستقيم والقطعة، المنتصف، قواعد التوازي والتعامد، البناء" },
    { id: "7-geo-mediatrice",                f: "7-geo2-mediatrice",            niveau: "7 أساسي", partie: "geometrie", n: 6, titre: "الموسّط العمودي والبعد",       sous: "الموسّط العمودي وخاصيّته، البناء بالبركار، البعد بين نقطة ومستقيم وبين مستقيمين متوازيين" },
    { id: "7-geo-cercle-droite",             f: "7-geo3-cercle-droite",         niveau: "7 أساسي", partie: "geometrie", n: 5, titre: "الدائرة والمستقيم",            sous: "الشعاع والقطر، الوضعيّات النسبيّة، المماسّ، الدائرة والموسّط العمودي" },
    { id: "7-geo-angles",                    f: "7-geo4-angles",                niveau: "7 أساسي", partie: "geometrie", n: 7, titre: "الزوايا",                      sous: "أنواع الزوايا، المتجاورتان، المتتامّتان والمتكاملتان، المتقابلتان بالرأس، المنصّف، زوايا المثلّث والرباعي" },
    // ----- 9 أساسي (الثلاثي الأوّل) -----
    { id: "9-maths-divisibilite",            f: "9-lecon1-divisibilite",        niveau: "9 أساسي", partie: "algebre", n: 7, titre: "قابليّة القسمة",             sous: "الأعداد الأوّليّة فيما بينها، القسمة على 6 و12 و15 و18 و36 و45، الأرقام الناقصة" },
    { id: "9-maths-denombrement",            f: "9-lecon2-denombrement",        niveau: "9 أساسي", partie: "algebre", n: 7, titre: "التعداد",                    sous: "كَمّ مجموعة، التقاطع والاتّحاد، شجرة الاختيار، الأزواج، المستقيمات والأقطار" },
    { id: "9-maths-reels",                   f: "9-lecon3-reels",               niveau: "9 أساسي", partie: "algebre", n: 7, titre: "مجموعة الأعداد الحقيقيّة ℝ", sous: "الكتابة العشريّة الدوريّة، ℕ ⊂ ℤ ⊂ ID ⊂ ℚ ⊂ ℝ، الجذر التربيعي، المستقيم المدرّج" },
    { id: "9-maths-operations-r",            f: "9-lecon4-operations-r",        niveau: "9 أساسي", partie: "algebre", n: 7, titre: "العمليات في ℝ",              sous: "الحدود المتشابهة، حذف الأقواس، ضرب الجذور، الشكل a√b، النشر" },
    { id: "9-maths-inverse-valeur-absolue",  f: "9-lecon5-inverse-valeur-absolue", niveau: "9 أساسي", partie: "algebre", n: 7, titre: "المقلوب والقيمة المطلقة",   sous: "مقلوب عدد، إزالة الجذر من المقام، القيمة المطلقة ومعادلاتها" },
    { id: "9-maths-produits-remarquables",   f: "9-lecon6-produits-remarquables", niveau: "9 أساسي", partie: "algebre", n: 7, titre: "الجداءات المعتبرة",          sous: "المتطابقات الثلاث، النشر، التفكيك، الجذاء المعدوم" },
    { id: "9-geo-reperage",                  f: "9-geo1-reperage",              niveau: "9 أساسي", partie: "geometrie", n: 7, titre: "التعيين في المستوى",        sous: "الإحداثيّات، التناظر، المنتصف، متوازي الأضلاع، البعد" },
    { id: "9-geo-milieux",                   f: "9-geo2-milieux",               niveau: "9 أساسي", partie: "geometrie", n: 6, titre: "المستقيم المارّ من منتصفي ضلعين", sous: "مبرهنة المنتصفين، شبه المنحرف، المثلّث القائم ومركز الثقل" },
    { id: "9-geo-thales",                    f: "9-geo3-thales",                niveau: "9 أساسي", partie: "geometrie", n: 6, titre: "مبرهنة طالس",               sous: "طالس في المثلّث، شكل الفراشة، المستقيمات المتوازية، تجزئة قطعة" },
    // ----- 1 ثانوي (الثلاثي الأوّل) -----
    { id: "1-maths-division-divisibilite",   f: "1-lecon1-division-divisibilite", niveau: "1 ثانوي", partie: "algebre", n: 6, titre: "Division euclidienne et divisibilité", sous: "Quotient et reste, critères de divisibilité (2, 3, 5, 9, 4, 25, 8, 6, 12, 15, 45), chiffres manquants" },
    { id: "1-maths-premiers-pgcd",           f: "1-lecon2-premiers-pgcd",       niveau: "1 ثانوي", partie: "algebre", n: 6, titre: "Nombres premiers, diviseurs et PGCD", sous: "Nombre premier, décomposition, diviseurs, PGCD (décomposition et algorithme d'Euclide), nombres premiers entre eux" },
    { id: "1-maths-ppcm-fractions",          f: "1-lecon3-ppcm-fractions",      niveau: "1 ثانوي", partie: "algebre", n: 6, titre: "PPCM et fractions irréductibles", sous: "Multiples, PPCM, lien avec le PGCD, fractions irréductibles, problèmes" },
    { id: "1-maths-puissances-sci", f: "1-lecon4-puissances-scientifique", niveau: "1 ثانوي", partie: "algebre", n: 5, titre: "Puissances, notation scientifique, valeurs approchées", sous: "Puissances et règles de calcul, puissances de 10, notation scientifique, troncature et arrondi" },
    { id: "1-maths-racines-carrees", f: "1-lecon5-racines-carrees", niveau: "1 ثانوي", partie: "algebre", n: 5, titre: "Racines carrées", sous: "Définition, produit et quotient, simplification, calculs, équations x² = a" },
    { id: "1-maths-identites-remarquables", f: "1-lecon6-identites-remarquables", niveau: "1 ثانوي", partie: "algebre", n: 5, titre: "Développement, factorisation et identités remarquables", sous: "Distributivité, (a ± b)², (a + b)(a − b), facteur commun, équations produit nul" },
    { id: "1-maths-ordre-valeur-absolue", f: "1-lecon7-ordre-valeur-absolue", niveau: "1 ثانوي", partie: "algebre", n: 4, titre: "Ordre dans ℝ et valeur absolue", sous: "Comparer des réels, valeur absolue, distance, équations et inégalités avec |x − a|" },
    { id: "1-maths-intervalles-encadrement", f: "1-lecon8-intervalles-encadrement", niveau: "1 ثانوي", partie: "algebre", n: 4, titre: "Intervalles et encadrement", sous: "Intervalles, intersection et réunion, encadrement d'une somme, d'un produit" },
    { id: "1-maths-angles", f: "1-geo1-angles", niveau: "1 ثانوي", partie: "geometrie", n: 4, titre: "Angles", sous: "Parallèles et sécante, angles d'un triangle, angle au centre et angle inscrit" },
    { id: "1-maths-milieux", f: "1-geo2-milieux", niveau: "1 ثانوي", partie: "geometrie", n: 3, titre: "Théorème des milieux", sous: "Théorème et réciproque, droite des milieux dans un trapèze" },
    { id: "1-maths-thales", f: "1-geo3-thales", niveau: "1 ثانوي", partie: "geometrie", n: 4, titre: "Théorème de Thalès et sa réciproque", sous: "Rapports égaux, calculs de longueurs, parallélisme, configuration papillon" },
    { id: "1-maths-trigonometrie", f: "1-geo4-trigonometrie", niveau: "1 ثانوي", partie: "geometrie", n: 4, titre: "Rapports trigonométriques d'un angle aigu", sous: "Sinus, cosinus, tangente, valeurs remarquables, calculs de longueurs et d'angles" },
    { id: "1-maths-relations-metriques", f: "1-geo5-relations-metriques", niveau: "1 ثانوي", partie: "geometrie", n: 3, titre: "Relations métriques dans un triangle rectangle", sous: "Pythagore, hauteur relative à l'hypoténuse, problèmes" }
];

window.CATALOGUE_PAR_ID = Object.fromEntries(window.CATALOGUE.map(function (l) { return [l.id, l]; }));

// Un certificat par partie (même liste que la table Supabase public.parties)
window.PARTIES = [
    { id: "8-algebre-t1",   titre: "الجبر والحساب", niveau: "8 أساسي", partie: "algebre",
      lecons: ["8-maths-divisibilite", "8-maths-entiers-relatifs", "8-maths-addition-soustraction-z", "8-maths-multiplication-z", "8-maths-rationnels", "8-maths-addition-q"] },
    { id: "8-geometrie-t1", titre: "الهندسة",       niveau: "8 أساسي", partie: "geometrie",
      lecons: ["8-geo-symetrie-centrale", "8-geo-angles-paralleles"] },
    // 7 أساسي (8 دروس جبر و4 دروس هندسة ؛ الشهادة لا تُمنح إلّا بعد نجاح كلّ الدروس)
    { id: "7-algebre-t1",   titre: "الجبر والحساب", niveau: "7 أساسي", partie: "algebre",
      lecons: ["7-maths-ensembles", "7-maths-addition-soustraction", "7-maths-multiplication-priorites", "7-maths-puissances", "7-maths-division-diviseurs", "7-maths-premiers", "7-maths-multiples", "7-maths-fractions"] },
    { id: "7-geometrie-t1", titre: "الهندسة",       niveau: "7 أساسي", partie: "geometrie",
      lecons: ["7-geo-droites", "7-geo-mediatrice", "7-geo-cercle-droite", "7-geo-angles"] },
    // 9 أساسي
    { id: "9-algebre-t1",   titre: "الجبر والحساب", niveau: "9 أساسي", partie: "algebre",
      lecons: ["9-maths-divisibilite", "9-maths-denombrement", "9-maths-reels", "9-maths-operations-r", "9-maths-inverse-valeur-absolue", "9-maths-produits-remarquables"] },
    { id: "9-geometrie-t1", titre: "الهندسة",       niveau: "9 أساسي", partie: "geometrie",
      lecons: ["9-geo-reperage", "9-geo-milieux", "9-geo-thales"] },
    // 1 ثانوي (بالفرنسية ؛ 8 دروس جبر و5 دروس هندسة ؛ الشهادة بعد نجاح كلّ الدروس)
    { id: "1-algebre-t1",   titre: "الجبر والحساب", niveau: "1 ثانوي", partie: "algebre",
      lecons: ["1-maths-division-divisibilite", "1-maths-premiers-pgcd", "1-maths-ppcm-fractions", "1-maths-puissances-sci", "1-maths-racines-carrees", "1-maths-identites-remarquables", "1-maths-ordre-valeur-absolue", "1-maths-intervalles-encadrement"] },
    { id: "1-geometrie-t1", titre: "الهندسة",       niveau: "1 ثانوي", partie: "geometrie",
      lecons: ["1-maths-angles", "1-maths-milieux", "1-maths-thales", "1-maths-trigonometrie", "1-maths-relations-metriques"] }
];
window.partieDe = function (lid) { return window.PARTIES.find(function (p) { return p.lecons.includes(lid); }); };
