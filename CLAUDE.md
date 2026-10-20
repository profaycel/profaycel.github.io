# Profaycel — plateforme du Professeur Faycel Khlifi

## Le site

- **Adresse officielle (la seule) : https://faycel018-del.github.io/profaycel/index.html**
  Quand on parle « du site », c'est toujours de cette adresse.
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
  (appel par classe + registre), `documents-admin.html` (photos / PDF)

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
