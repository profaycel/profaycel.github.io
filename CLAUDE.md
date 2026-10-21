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

- Public : `index.html` (accueil), `register.html`, `login.html`, `confidentialite.html`
- Élève : `eleve.html` (séances, documents par matière → trimestre, série + correction)
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
    `catalogue.js` (liste des leçons), `lecons/*.js` (contenu de chaque leçon).
  - Ajouter une leçon : créer `parcours/lecons/<f>.js` puis l'ajouter dans `catalogue.js`
    (et dans la liste des scripts de `parcours-admin.html`).
  - Tables Supabase `progression` (une ligne par élève et par leçon), `parties` et `certificats`
    (UN certificat par partie : algèbre, géométrie ; numéro unique, nom pris dans la fiche élève) ;
    fonctions `delivrer_certificat_partie`,
    `verifier_certificat` (section 10 de `supabase/schema.sql`).
  - Le « mode professeur » (toutes les réponses) n'apparaît que pour l'administrateur.
  - Niveaux en ligne (trimestre 1) : 8 أساسي (8 leçons) et 9 أساسي (9 leçons : 6 algèbre `9-lecon*.js`,
    3 géométrie `9-geo*.js`), avec les parties `8-algebre-t1`, `8-geometrie-t1`, `9-algebre-t1`, `9-geometrie-t1`.
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
