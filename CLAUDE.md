# Profaycel — plateforme du Professeur Faycel Khlifi

## Le site

- **Adresse officielle (la seule) : https://profaycel.github.io/index.html**
  Quand on parle « du site », c'est toujours de cette adresse.
- Ancienne adresse (avant le 20/10/2026) : `https://faycel018-del.github.io/profaycel/` — ne plus l'utiliser.
- Dépôt GitHub : `profaycel/profaycel.github.io` (organisation `profaycel`).
- Hébergement : GitHub Pages, publié automatiquement depuis la branche `main`
  (2–3 minutes après chaque fusion de Pull Request).
- Les anciennes copies Netlify (`profaycel.netlify.app`, `tranquil-swan-a4ca4c`) ont été
  supprimées : ne plus les mentionner ni y publier.
- Base de données et connexion : Supabase, projet `dmykwuyivwcprhpghbxc` (Francfort).
- Compte administrateur unique : `faycel.khlifiii@gmail.com` (aussi vérifié côté base
  par `public.is_admin()`). Le compte `faysalalkhlifi@gmail.com` est bloqué volontairement :
  ne pas le supprimer (il serait recréé à la prochaine connexion Google).

## Pages

- Public : `index.html` (accueil), `register.html`, `login.html`, `confidentialite.html`,
  `inscription-enfant.html` (demande d'inscription aux **cours privés payants à distance**, 60 DT par mois ; le formulaire
  demande aussi le gouvernorat (obligatoire) et la ville ; il n'est plus proposé dans l'accueil ni dans `eleve.html` : seulement
  par le lien discret « 💰 Cours payants » dans le menu du haut de chaque page publique ; bouton « ✅ Accepter » dans
  « 📩 Demandes » qui complète la fiche élève trouvée par l'email (et met `date_debut`) → table `demandes_inscription`
  (colonnes `gouvernorat`, `ville`), visible dans l'onglet « 📩 Demandes » de `eleves.html` ; un élève accepté passe dans l'onglet
  « 💰 Payants » de `eleves.html` (= élèves à distance avec `date_debut`) et sort de « 💻 À distance », qui ne garde que les inscrits libres)
  - Téléphone : bouton rouge qui clignote « S'inscrire » dans la barre du haut (`.header-cta-inscription`,
    ajouté par `script.js` quand personne n'est connecté).
  - Inscription élève : `register.html` ne demande plus ni nom ni niveau (élève) ; au premier passage dans
    `eleve.html`, l'écran « Complète ton profil » (nom + niveau, fonction `completer_profil`) s'affiche une seule fois.
- Élève : `eleve.html` (séances, documents par matière → trimestre, série + correction)
- Tableau d'honneur hebdomadaire (31/10/2026) : `honneur.js` + `honneur.css`, affiché dans la section `#honneur` de `index.html`
  (public, sans connexion) et en haut de `parcours/index.html` (« لوحة الشرف », onglet du niveau de l'élève). Il montre les 3 premiers
  de chaque niveau sur les 7 derniers jours : prénom + initiale du nom, leçons réussies, étoiles, pourcentage (tri dans cet ordre).
  Données : fonction Supabase `tableau_honneur()` (n'expose jamais email, téléphone ni nom complet) qui lit `progression_journal`
  (rempli automatiquement par le trigger `prive.noter_progres()` à chaque progrès ; aucun accès API direct). Si la fonction est
  absente, la section se cache toute seule. Le compte administrateur et les fiches « archive » sont exclus.
- « رسائلي » (31/10/2026) : `messages.js` (+ `honneur.css`), carte en haut de `eleve.html` (`#messages-zone`). Table `messages`
  (lecture seule pour l'élève ; écriture uniquement par fonctions) : message de félicitations hebdomadaire créé par
  `generer_mes_messages()` quand l'élève ouvre son espace et se trouve dans le top 3 (un par semaine ISO), message automatique à la
  délivrance d'un certificat (trigger `prive.message_certificat()`), message personnel du professeur via `envoyer_message(uuid, titre,
  texte)` (administrateur seulement, pas encore de bouton dans les pages d'administration). Les 30 derniers messages sont gardés.
- Parent : `parent.html` (code de l'enfant, présences, paiements)
- Administration (en français) : `admin.html`, `eleves.html` (fiche élève + paiements),
  `parents.html`, `classes.html`, `seances-admin.html`, `presence-admin.html`
  (appel par classe + registre), `documents-admin.html` (photos / PDF),
  `parcours-admin.html` (suivi des cours par niveaux : progression, questions ratées, certificats)
  `annonces-admin.html` (annonces affichées en haut de `eleve.html` / `parent.html`, par public et niveau)
- Cours par niveaux (élèves, en arabe) : dossier `parcours/`
  - `index.html` (« دروسي », leçons du niveau de l'élève), `lecon.html?l=<id>` (une leçon),
    `certificat.html?n=PF-AAAA-NNNN` (vérification publique d'un certificat, QR code).
  - `moteur.js` (moteur des leçons), `geo.js` (figures SVG), `certificat.js` (certificat),
    `catalogue.js` (liste des leçons), contenu de chaque leçon : stockage privé `lecons` (voir « Sécurité »).
  - Tables Supabase `progression` (une ligne par élève et par leçon), `parties` et `certificats`
    (UN certificat par partie : algèbre, géométrie ; numéro unique, nom pris dans la fiche élève) ;
    fonctions `delivrer_certificat_partie`,
    `verifier_certificat` (section 10 de `supabase/schema.sql`).
  - Le « mode professeur » (toutes les réponses) n'apparaît que pour l'administrateur.
  - 7 أساسي (trimestre 1) complet : 8 leçons d'algèbre `7-lecon1…8-*.js` et 4 de géométrie `7-geo1…4-*.js`
    (ids `7-geo-droites`, `7-geo-mediatrice`, `7-geo-cercle-droite`, `7-geo-angles`), parties `7-algebre-t1` / `7-geometrie-t1`.
  - Figures de géométrie : `geo.js` contient aussi `dessin({...})` (droites infinies, demi-droites, angle droit, codage
    des longueurs, arcs de compas, angles) et `pol(P, r, angle)`. Ne pas écrire de texte arabe dans les SVG (mettre les
    légendes en HTML sous la figure).
  - Réponses numériques : le moteur accepte une unité facultative à la fin (« 60° », « 3 cm »).
  - Niveaux en ligne (trimestre 1) : 8 أساسي (8 leçons) et 9 أساسي (9 leçons : 6 algèbre `9-lecon*.js`,
    3 géométrie `9-geo*.js`), avec les parties `8-algebre-t1`, `8-geometrie-t1`, `9-algebre-t1`, `9-geometrie-t1`.
  - 1 ثانوي (trimestre 1, **en français** car c'est la langue d'enseignement en Tunisie) : 8 leçons d'algèbre `1-lecon1…8-*.js` et 5 de géométrie `1-geo1…5-*.js`,
    parties `1-algebre-t1` / `1-geometrie-t1` (certificats en arabe). Une leçon française déclare `langue: "fr"` : le moteur affiche le contenu en LTR
    (fonctions `T()` / `B()`, classe `.fr` dans `moteur.css`), les boutons et messages restent en arabe. Titres du catalogue en français.
    Trimestres 2 et 3 de 1 ثانوي : pas encore faits.
  - Aperçu « comme un élève » (`apercu.js`, administrateur uniquement) : barre en haut de `admin.html`,
    `eleve.html`, `parcours/` et `parcours-admin.html` ; le niveau choisi (7, 8, 9 أساسي, 1 ثانوي) est gardé
    dans le navigateur (`localStorage` « pf_apercu ») et affiche un « تلميذ مستوى … (تجريبي) ».
  - Types `expr` / `facteur` : le moteur accepte `a`, `b` et aussi `x`, `y`, `x²` (ou `x^2`) ; une question peut
    préciser `aide` (texte sous la case) et `ph` (texte d'exemple dans la case).

## Règles de fonctionnement

- Niveaux : 7, 8, 9 أساسي et 1 ثانوي.
- Élèves en présentiel (classe + parent + code d'accès envoyé par WhatsApp) ou à distance
  (inscription libre, choix du niveau).
- Appel : tous présents par défaut, on touche les absents ; la séance est créée
  automatiquement. Un élève n'est compté qu'à partir de sa `date_debut`.
- Paiements : en **nombre de séances** (4, 8, 12…), **1 séance = 25 DT**, avec la date.
  Reste à payer = séances suivies (présent) − séances payées. Pas de notion de « mois ».

## Façon de travailler avec Faycel

- Expliquer en **dialecte tunisien**, **étape par étape**, une étape à la fois, **toujours avec
  les liens** à ouvrir.
- Textes du site côté élèves / parents en arabe **فصحى** (et français) ; pages
  d'administration en français.
- Proposer et se mettre d'accord avant une grosse refonte ; pour le reste, faire soi-même.
- Pas de prix pour les livres ; ne pas citer les collèges où il enseigne.

## Notes techniques

- Les fichiers HTML / CSS / `script.js` sont en fins de ligne CRLF : les conserver.
- Après une modification de CSS / JS, augmenter le numéro `?v=` dans les pages et
  `CACHE_NAME` dans `sw.js`.
- Le schéma de la base est tenu à jour dans `supabase/schema.sql`.
- Ne pas supprimer `googled179e0f4796b59bb.html` ni `google25415fdafefb95f9.html`
  (validation Google Search Console).

## Sécurité (28/10/2026)

- **Chaque élève ne voit que son niveau** (et un parent, celui de ses enfants) : fonction `prive.niveaux_autorises()` et
  policies `*_lecture` (documents, séances, annonces, cours, devoirs, parties). Un nouveau tableau qui contient un
  niveau doit suivre le même modèle. Une fiche élève « archive » ne donne plus accès au contenu.
- **Texte venant d'un visiteur** (noms, email, téléphone, message…) : toujours afficher avec `echapperHtml()` dans
  `script.js`. En plus, la base retire `< > " \`` à l'écriture (triggers `prive.nettoyer_*`, `prive.controler_demande`).
- `demandes_inscription` : 3 demandes max par numéro WhatsApp et par jour, 40 par heure (anti-spam).
- Certificats : numéro `PF-AAAA-NNNN-XXXXXX` (suffixe aléatoire, non devinable) ; un élève ne reçoit que les
  certificats de son niveau.
- `supabase-js` est épinglé (version 2.118.0) avec une empreinte SRI dans `script.js` et les pages `parcours/`.
  Pour changer de version, recalculer l'empreinte (sha384) du fichier `dist/umd/supabase.js` correspondant.
- **PDF des séries privés (02/11/2026)** : les PDF sont dans le stockage Supabase **privé** `documents` (chemin `series/<nom>.pdf`
  = colonne `documents.lien`), jamais dans le dépôt GitHub. Le site crée un lien temporaire de 10 minutes au clic
  (`urlSignee()` dans `script.js`, boutons `.doc-pdf`) ; sans compte connecté, ou hors du niveau de l'élève, le lien est refusé
  (policy `documents_lecture_fichiers`, section 13 de `supabase/schema.sql`). Pour ajouter un PDF : l'envoyer par
  « documents-admin.html » (jamais dans le dossier `series/` du dépôt, supprimé).
- **Leçons interactives privées (02/11/2026)** : le contenu des leçons (réponses comprises) n'est plus dans le dépôt : il est dans le
  stockage Supabase privé `lecons` (objets `lecons/<f>.js`). `parcours/lecon.html` et `parcours-admin.html` le lisent avec
  `storage.download()` puis l'exécutent ; refusé sans compte connecté ou hors du niveau de l'élève (section 14 de `supabase/schema.sql`,
  niveau déduit du préfixe du fichier). Pour ajouter une leçon : envoyer `lecons/<f>.js` dans le bucket `lecons` (tableau de bord
  Supabase → Storage) puis l'ajouter dans `catalogue.js` (titre et sous-titre restent publics) ; ne plus créer de `parcours/lecons/`.
- **QCM par niveau (02/11/2026)** : `parcours/qcm.html` (élève) + `qcm-admin.html` (administrateur : import du fichier `qcm-tout.json` et suivi).
  400 questions : 100 par niveau (7, 8, 9 أساسي ; 1 ثانوي en français) = série « قبل فرض المراقبة عدد 2 » (`dc2`, 50) puis « قبل الفرض
  التأليفي عدد 1 » (`ds1`, 50), numérotées `ordre` 1..100. Tables `qcm_questions` (lisible par l'administrateur seulement : la bonne réponse
  et l'explication ne sortent que par les fonctions) et `qcm_reponses` ; fonctions `qcm_charger` (liste sans bonne réponse), `qcm_repondre`
  (une seule réponse par question, il faut avoir répondu à la précédente), `qcm_certificat` (après les 100 questions ; certificat `lecon = 'qcm-<niveau>'`,
  titre « تدريبات QCM », note = nombre de bonnes réponses), `qcm_importer`, `qcm_suivi` (section 15 de `supabase/schema.sql`). Le niveau vient de la fiche
  élève ; l'administrateur teste avec l'aperçu (`apercu.js`) ou `?niv=`. Cartes d'accès dans `parcours/index.html` et `eleve.html`.
  Pour ajouter ou corriger des questions : modifier le JSON et le réimporter (mêmes `id` = mise à jour).
- **Avis des élèves sur le site (13/11/2026)** : carte « ما رأيك في الموقع؟ / Que penses-tu du site ? » dans `eleve.html` (`#avis-zone`, `avis.js` + `avis.css`).
  L'élève donne de 1 à 5 étoiles (modifiable) ; juste après, il voit le pourcentage d'élèves satisfaits (notes 4 et 5), la moyenne et le nombre d'avis.
  Les chiffres ne sont visibles qu'après avoir noté. Table `avis_site` (aucun accès direct) + fonctions `donner_avis_site(int)` et `mon_avis_site()`
  (section 16 de `supabase/schema.sql`, déjà appliquée). Réservé aux élèves (fiche non archivée) ; la note du compte administrateur n'est jamais enregistrée ni comptée
  (il voit les chiffres en aperçu). Ne PAS publier ces notes comme « AggregateRating » dans le balisage Google : un site qui s'évalue lui-même n'est pas éligible aux étoiles.
- **Pages publiques pour Google (13/11/2026)** : dossier `exercices/` (`exercices.css`) : une page d'accueil `exercices/index.html` (choix du niveau) et une page par niveau et par partie
  (`7-algebre`, `7-geometrie`, `8-…`, `9-…`, `1-…` ; les pages de 1 ثانوي sont en français, `dir="ltr"`). Contenu ouvert à tous : titre, présentation des leçons (titres du catalogue),
  2 exercices d'échantillon sans réponse, bouton d'inscription, liens vers les pages voisines. JAMAIS de correction, de réponse ni de PDF ici (le contenu complet reste privé).
  Les pages sont générées avec un petit script (non gardé dans le dépôt) ; pour une nouvelle page (ex. trimestre 2), copier une page existante, changer titre / leçons / exercices,
  l'ajouter à `sitemap.xml` et à `exercices/index.html`. Texte arabe (فصحى), lettres et symboles mathématiques dans `<span class="ltr">`, aucun balisage d'avis/étoiles.
  L'accueil (`index.html`) renvoie vers `exercices/index.html` depuis son pied de page.
- Limite connue : un élève connecté peut toujours enregistrer ou partager ce qu'il a le droit de voir (PDF, leçon).
- À activer dans Supabase (Authentication → Policies/Passwords) : « Leaked password protection ».
- **Cours de français, 7 أساسي, trimestre 1 (13/11/2026)** : 15 leçons interactives en français (`matiere: "francais"` dans `parcours/catalogue.js`, ids `7-fr-<module>-<sujet>`,
  `module` 0 = rappels, 1 = « En famille », 2 = « Vivre en ville, vivre à la campagne »), chacune de 4 niveaux + un examen. Affichées par `parcours/index.html?m=francais`
  (tuile « Cours de français » dans `eleve.html`, onglet Français) ; les mathématiques restent la vue par défaut. **Un seul certificat** (partie `7-francais-t1`, titre « اللغة الفرنسية »,
  table `public.parties`, section 10 bis de `supabase/schema.sql`) après réussite des 15 examens. Les fichiers de leçon sont dans le stockage privé `lecons` comme les autres (`lecons/7-fr-….js`).
  Le moteur (`moteur.js`) a un nouveau type de question `ordre` (remettre des mots dans l'ordre, `rep` = mots dans l'ordre, `alt` = autres ordres acceptés), l'option `texte` (texte de lecture
  affiché au-dessus de la question), `numDepart` (numérotation des niveaux) et accepte l'apostrophe typographique. Pour ajouter une leçon de français : même procédé que pour les maths.
- **QCM de français, 7 أساسي (13/11/2026)** : 100 questions (`id` `fr7dc1-01…`, `fr7ds1-01…`, colonne `matiere = 'francais'` de `qcm_questions`) : 50 « قبل فرض المراقبة عدد 1 » (`dc1`) puis 50 « قبل الفرض التأليفي عدد 1 » (`ds1`), `ordre` 1..100. Même système que les maths (fonctions `qcm_charger(p_niveau, p_matiere)`, `qcm_certificat(p_niveau, p_matiere)`, section 17 de `supabase/schema.sql`), ouvert par `parcours/qcm.html?m=francais` ; certificat `lecon = 'qcm-fr-7'` (titre « تدريبات QCM الفرنسية »). Les ids des maths commencent par `q`, ceux du français par `fr` (utilisé par `parcours/index.html` pour compter les réponses). Un texte de lecture se met dans l'énoncé (retours à la ligne gardés).
