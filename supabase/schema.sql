-- =====================================================
-- PROFAYCEL — Base de données complète
-- À exécuter UNE SEULE FOIS dans un nouveau projet Supabase :
-- Dashboard → SQL Editor → New query → coller tout → Run
-- =====================================================


-- -----------------------------------------------------
-- 1. ADMIN
-- L'admin est reconnu par son email (vérifié par Supabase),
-- pas par user_metadata que chaque utilisateur peut modifier.
-- -----------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
    select lower(coalesce(auth.jwt() ->> 'email', '')) = 'faycel.khlifiii@gmail.com';
$$;


-- -----------------------------------------------------
-- 2. TABLES
-- -----------------------------------------------------

create table if not exists public.classes (
    id          bigint generated always as identity primary key,
    nom         text not null,
    niveau      text,
    groupe      text,
    enseignant  text,
    statut      text default 'active',
    created_at  timestamptz not null default now()
);

create table if not exists public.parents (
    id          bigint generated always as identity primary key,
    user_id     uuid references auth.users (id) on delete set null,
    nom         text not null,
    prenom      text not null,
    email       text,
    telephone   text,
    statut      text default 'actif',
    created_at  timestamptz not null default now()
);

create table if not exists public.eleves (
    id          bigint generated always as identity primary key,
    user_id     uuid references auth.users (id) on delete set null,
    parent_id   bigint references public.parents (id) on delete set null,
    nom         text not null,
    prenom      text not null,
    email       text,
    telephone   text,
    classe      text,
    statut      text default 'actif',
    created_at  timestamptz not null default now()
);

create table if not exists public.cours (
    id          bigint generated always as identity primary key,
    titre       text not null,
    matiere     text,
    niveau      text,
    classe      text,
    trimestre   int,
    categorie   text,
    numero      int,
    statut      text default 'publie',
    created_at  timestamptz not null default now()
);

create table if not exists public.devoirs (
    id           bigint generated always as identity primary key,
    titre        text not null,
    matiere      text,
    classe       text,
    date_limite  date,
    statut       text,
    created_at   timestamptz not null default now()
);

create table if not exists public.seances (
    id           bigint generated always as identity primary key,
    matiere      text not null,
    classe       text,
    date_seance  date,
    heure_debut  time,
    heure_fin    time,
    salle        text,
    lien_visio   text,
    statut       text default 'prévue',
    created_at   timestamptz not null default now()
);

create table if not exists public.resultats (
    id               bigint generated always as identity primary key,
    eleve_id         bigint references public.eleves (id) on delete cascade,
    matiere          text,
    evaluation       text,
    note             numeric,
    bareme           numeric default 20,
    date_evaluation  date,
    created_at       timestamptz not null default now()
);

create table if not exists public.documents (
    id            bigint generated always as identity primary key,
    nom           text not null,
    type_fichier  text,
    niveau        text,
    lien          text,
    classe        text,
    statut        text,
    created_at    timestamptz not null default now()
);

create table if not exists public.annonces (
    id              bigint generated always as identity primary key,
    titre           text not null,
    type_annonce    text,
    destinataires   text,
    statut          text,
    created_at      timestamptz not null default now()
);


-- -----------------------------------------------------
-- 3. LIAISON AUTOMATIQUE COMPTE ↔ FICHE
-- Quand un élève ou un parent crée son compte avec le même
-- email que sa fiche, la fiche est liée automatiquement
-- (et inversement quand l'admin crée la fiche après).
-- Les fonctions sont dans le schéma "prive", non exposé par l'API.
-- -----------------------------------------------------

create schema if not exists prive;

create or replace function prive.lier_compte_nouvel_utilisateur()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    update public.eleves  set user_id = new.id
        where user_id is null and lower(email) = lower(new.email);
    update public.parents set user_id = new.id
        where user_id is null and lower(email) = lower(new.email);
    return new;
end;
$$;

drop trigger if exists on_auth_user_created_lier on auth.users;
create trigger on_auth_user_created_lier
    after insert on auth.users
    for each row execute function prive.lier_compte_nouvel_utilisateur();

create or replace function prive.lier_fiche_compte_existant()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
    if new.user_id is null and new.email is not null and new.email <> '' then
        select id into new.user_id
            from auth.users
            where lower(email) = lower(new.email)
            limit 1;
    end if;
    return new;
end;
$$;

drop trigger if exists eleves_lier_compte on public.eleves;
create trigger eleves_lier_compte
    before insert or update of email on public.eleves
    for each row execute function prive.lier_fiche_compte_existant();

drop trigger if exists parents_lier_compte on public.parents;
create trigger parents_lier_compte
    before insert or update of email on public.parents
    for each row execute function prive.lier_fiche_compte_existant();


-- -----------------------------------------------------
-- 4. SÉCURITÉ (Row Level Security)
-- -----------------------------------------------------

alter table public.classes   enable row level security;
alter table public.parents   enable row level security;
alter table public.eleves    enable row level security;
alter table public.cours     enable row level security;
alter table public.devoirs   enable row level security;
alter table public.seances   enable row level security;
alter table public.resultats enable row level security;
alter table public.documents enable row level security;
alter table public.annonces  enable row level security;

-- L'admin peut tout faire sur toutes les tables
do $$
declare
    t text;
begin
    foreach t in array array['classes','parents','eleves','cours','devoirs',
                             'seances','resultats','documents','annonces']
    loop
        execute format('drop policy if exists admin_tout on public.%I', t);
        execute format(
            'create policy admin_tout on public.%I for all to authenticated
             using (public.is_admin()) with check (public.is_admin())', t);
    end loop;
end $$;

-- Contenu pédagogique : lisible par tous les utilisateurs connectés
do $$
declare
    t text;
begin
    foreach t in array array['classes','cours','devoirs','seances','documents','annonces']
    loop
        execute format('drop policy if exists lecture_connectes on public.%I', t);
        execute format(
            'create policy lecture_connectes on public.%I for select to authenticated
             using (true)', t);
    end loop;
end $$;

-- Un parent voit sa propre fiche
drop policy if exists parent_sa_fiche on public.parents;
create policy parent_sa_fiche on public.parents
    for select to authenticated
    using (user_id = auth.uid());

-- Un élève voit sa fiche ; un parent voit la fiche de ses enfants
drop policy if exists eleve_sa_fiche on public.eleves;
create policy eleve_sa_fiche on public.eleves
    for select to authenticated
    using (
        user_id = auth.uid()
        or parent_id in (select id from public.parents where user_id = auth.uid())
    );

-- Résultats : l'élève voit les siens, le parent ceux de ses enfants
drop policy if exists resultats_eleve_parent on public.resultats;
create policy resultats_eleve_parent on public.resultats
    for select to authenticated
    using (
        eleve_id in (
            select id from public.eleves
            where user_id = auth.uid()
               or parent_id in (select id from public.parents where user_id = auth.uid())
        )
    );


-- -----------------------------------------------------
-- 5. SUIVI : CODE D'ACCÈS, PRÉSENCES, PAIEMENTS
-- -----------------------------------------------------

alter table public.eleves add column if not exists code_acces text unique;
alter table public.eleves add column if not exists date_debut date;
alter table public.eleves add column if not exists seances_anterieures int not null default 0;
alter table public.eleves add column if not exists tarif_mensuel numeric not null default 100;
alter table public.parents add column if not exists lien_parente text;

-- Code lisible, sans caractères ambigus (0/O, 1/I/L)
create or replace function prive.generer_code()
returns text
language plpgsql
set search_path = ''
as $$
declare
    alphabet text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    code text;
begin
    loop
        code := 'PF-';
        for i in 1..6 loop
            code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
        end loop;
        exit when not exists (select 1 from public.eleves where code_acces = code);
    end loop;
    return code;
end;
$$;

create or replace function prive.eleve_code_defaut()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    if new.code_acces is null or new.code_acces = '' then
        new.code_acces := prive.generer_code();
    end if;
    return new;
end;
$$;

create trigger eleves_code_defaut
    before insert on public.eleves
    for each row execute function prive.eleve_code_defaut();

create table if not exists public.presences (
    id          bigint generated always as identity primary key,
    seance_id   bigint not null references public.seances (id) on delete cascade,
    eleve_id    bigint not null references public.eleves (id) on delete cascade,
    present     boolean not null default true,
    created_at  timestamptz not null default now(),
    unique (seance_id, eleve_id)
);

-- Une mensualité = 4 séances
create table if not exists public.paiements (
    id             bigint generated always as identity primary key,
    eleve_id       bigint not null references public.eleves (id) on delete cascade,
    date_paiement  date not null default current_date,
    montant        numeric not null default 100,
    note           text,
    created_at     timestamptz not null default now()
);

alter table public.presences enable row level security;
alter table public.paiements enable row level security;

create policy admin_tout on public.presences for all to authenticated
    using (public.is_admin()) with check (public.is_admin());
create policy admin_tout on public.paiements for all to authenticated
    using (public.is_admin()) with check (public.is_admin());

create policy presences_eleve_parent on public.presences
    for select to authenticated
    using (
        eleve_id in (
            select id from public.eleves
            where user_id = auth.uid()
               or parent_id in (select id from public.parents where user_id = auth.uid())
        )
    );

create policy paiements_eleve_parent on public.paiements
    for select to authenticated
    using (
        eleve_id in (
            select id from public.eleves
            where user_id = auth.uid()
               or parent_id in (select id from public.parents where user_id = auth.uid())
        )
    );

-- Lier son compte (parent ou élève) à une fiche élève avec le code reçu par WhatsApp
create or replace function public.utiliser_code(code text)
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
    uid uuid := auth.uid();
    role_utilisateur text := coalesce(auth.jwt() -> 'user_metadata' ->> 'role', 'eleve');
    nom_utilisateur text := coalesce(auth.jwt() -> 'user_metadata' ->> 'nom',
                                     auth.jwt() -> 'user_metadata' ->> 'full_name',
                                     auth.jwt() ->> 'email');
    e public.eleves%rowtype;
    p_id bigint;
    ancien_parent public.parents%rowtype;
begin
    if uid is null then
        raise exception 'Non connecté';
    end if;

    select * into e from public.eleves
        where code_acces = upper(trim(code));

    if not found then
        raise exception 'Code invalide';
    end if;

    if role_utilisateur = 'parent' then

        select id into p_id from public.parents where user_id = uid limit 1;

        if e.parent_id is not null then
            select * into ancien_parent from public.parents where id = e.parent_id;

            if ancien_parent.user_id is not null and ancien_parent.user_id <> uid then
                raise exception 'Cet élève est déjà lié à un autre compte parent';
            end if;

            -- La fiche parent créée par l'enseignant devient celle de ce compte
            if p_id is null and ancien_parent.user_id is null then
                update public.parents set user_id = uid where id = ancien_parent.id;
                p_id := ancien_parent.id;
            end if;
        end if;

        if p_id is null then
            insert into public.parents (nom, prenom, user_id)
                values ('', coalesce(nom_utilisateur, 'Parent'), uid)
                returning id into p_id;
        end if;

        update public.eleves set parent_id = p_id where id = e.id;

    else

        if e.user_id is not null and e.user_id <> uid then
            raise exception 'Ce code est déjà utilisé par un autre compte élève';
        end if;

        -- La fiche « à distance » créée automatiquement pour ce compte est archivée
        update public.eleves
            set user_id = null, statut = 'archive'
            where user_id = uid and id <> e.id;

        update public.eleves set user_id = uid where id = e.id;

    end if;

    return json_build_object('prenom', e.prenom, 'nom', e.nom, 'classe', e.classe);
end;
$$;

revoke execute on function public.utiliser_code(text) from anon, public;
grant execute on function public.utiliser_code(text) to authenticated;


-- -----------------------------------------------------
-- 6. PRÉSENTIEL / À DISTANCE
-- -----------------------------------------------------

alter table public.eleves add column if not exists mode text not null default 'distance'
    check (mode in ('presentiel', 'distance'));

-- Un compte « élève » créé en ligne reçoit automatiquement sa fiche « à distance »
-- (à la création, ou quand le rôle est choisi après une connexion Google)
create or replace function prive.creer_fiche_distance()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if coalesce(new.raw_user_meta_data ->> 'role', '') = 'eleve'
       and not exists (select 1 from public.eleves where user_id = new.id) then

        insert into public.eleves (nom, prenom, email, user_id, mode, statut, classe)
        values (
            '',
            coalesce(
                nullif(new.raw_user_meta_data ->> 'nom', ''),
                nullif(new.raw_user_meta_data ->> 'full_name', ''),
                nullif(new.raw_user_meta_data ->> 'name', ''),
                split_part(new.email, '@', 1)
            ),
            new.email,
            new.id,
            'distance',
            'actif',
            nullif(new.raw_user_meta_data ->> 'niveau', '')
        );

    end if;

    return new;
end;
$$;

create trigger on_auth_user_zz_fiche_distance
    after insert or update of raw_user_meta_data on auth.users
    for each row execute function prive.creer_fiche_distance();


-- Un élève à distance sans niveau le choisit une seule fois depuis son espace
create or replace function public.choisir_niveau(niveau text)
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
    uid uuid := auth.uid();
    n int;
begin
    if uid is null then
        raise exception 'Non connecté';
    end if;

    if niveau not in ('7 أساسي', '8 أساسي', '9 أساسي', '1 ثانوي', '2 ثانوي', '3 ثانوي', 'باكالوريا') then
        raise exception 'Niveau inconnu';
    end if;

    update public.eleves
        set classe = niveau
        where user_id = uid and mode = 'distance' and coalesce(classe, '') = '';

    get diagnostics n = row_count;

    if n = 0 then
        raise exception 'Niveau déjà choisi : demandez au professeur pour le changer';
    end if;

    return json_build_object('classe', niveau);
end;
$$;

revoke execute on function public.choisir_niveau(text) from anon, public;
grant execute on function public.choisir_niveau(text) to authenticated;


-- =================================================
-- 7. DOCUMENTS : TRIMESTRE, MATIÈRE, FICHIERS (photos / PDF)
-- =================================================

alter table public.documents add column if not exists trimestre int check (trimestre in (1, 2, 3));
alter table public.documents add column if not exists matiere text;
alter table public.documents add column if not exists fichiers jsonb not null default '[]'::jsonb;

-- les élèves et parents ne voient que les documents publiés
alter policy lecture_connectes on public.documents using (statut = 'publie');

-- stockage des photos et PDF (lecture publique, envoi réservé au professeur)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents', 'documents', true, 15728640,
        array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf'])
on conflict (id) do nothing;

create policy documents_admin_envoi on storage.objects
    for insert to authenticated with check (bucket_id = 'documents' and public.is_admin());
create policy documents_admin_modif on storage.objects
    for update to authenticated using (bucket_id = 'documents' and public.is_admin());
create policy documents_admin_retrait on storage.objects
    for delete to authenticated using (bucket_id = 'documents' and public.is_admin());


-- =================================================
-- 8. NUMÉRO DE SÉRIE + NIVEAUX : 7, 8, 9 أساسي et 1 ثانوي
-- =================================================

-- la correction prend le même numéro que sa série (affichées ensemble)
alter table public.documents add column if not exists numero int check (numero between 1 and 50);

create or replace function public.choisir_niveau(niveau text)
 returns json
 language plpgsql
 security definer
 set search_path to ''
as $function$
declare
    uid uuid := auth.uid();
    n int;
begin
    if uid is null then
        raise exception 'Non connecté';
    end if;

    if niveau not in ('7 أساسي', '8 أساسي', '9 أساسي', '1 ثانوي') then
        raise exception 'Niveau inconnu';
    end if;

    update public.eleves
        set classe = niveau
        where user_id = uid and mode = 'distance' and coalesce(classe, '') = '';

    get diagnostics n = row_count;

    if n = 0 then
        raise exception 'Niveau déjà choisi : demandez au professeur pour le changer';
    end if;

    return json_build_object('classe', niveau);
end;
$function$;


-- =================================================
-- 9. PAIEMENTS EN NOMBRE DE SÉANCES (1 séance = 25 DT)
-- =================================================

alter table public.paiements add column if not exists seances int not null default 4 check (seances > 0);


-- =================================================
-- 10. COURS PAR NIVEAUX (parcours) : PROGRESSION + CERTIFICATS
-- =================================================

-- Progression d'un élève dans une leçon (une ligne par élève et par leçon)
create table if not exists public.progression (
    id            bigint generated always as identity primary key,
    user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
    lecon         text not null,                      -- ex. '8-maths-divisibilite'
    etoiles       int[] not null default '{}',        -- étoiles (1 à 3) par niveau, 0 = pas fait
    erreurs       jsonb not null default '{}'::jsonb, -- erreurs par question : {"2-3": 4, ...}
    examen_score  int,                                -- meilleure note à l'examen réussi
    examen_total  int,
    examen_essais int not null default 0,
    examen_le     timestamptz,
    updated_at    timestamptz not null default now(),
    unique (user_id, lecon)
);

-- Certificats : numéro unique, nom tiré de la fiche élève (pas modifiable par l'élève)
create sequence if not exists public.certificat_seq start 1;

create table if not exists public.certificats (
    id          bigint generated always as identity primary key,
    numero      text not null unique,                 -- ex. 'PF-2026-0001'
    user_id     uuid not null references auth.users (id) on delete cascade,
    lecon       text not null,
    titre       text not null,
    nom_complet text not null,
    niveau      text,
    score       int,
    total       int,
    etoiles     int,
    delivre_le  timestamptz not null default now(),
    unique (user_id, lecon)
);

alter table public.progression enable row level security;
alter table public.certificats enable row level security;

create policy admin_tout on public.progression for all to authenticated
    using (public.is_admin()) with check (public.is_admin());
create policy admin_tout on public.certificats for all to authenticated
    using (public.is_admin()) with check (public.is_admin());

-- L'élève lit et écrit SA progression
create policy progression_eleve on public.progression for all to authenticated
    using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Le parent lit la progression et les certificats de ses enfants
create policy progression_parent on public.progression for select to authenticated
    using (user_id in (select e.user_id from public.eleves e
                       join public.parents p on p.id = e.parent_id
                       where p.user_id = auth.uid()));

create policy certificats_lecture on public.certificats for select to authenticated
    using (user_id = auth.uid()
           or user_id in (select e.user_id from public.eleves e
                          join public.parents p on p.id = e.parent_id
                          where p.user_id = auth.uid()));

-- Délivrer le certificat (une seule fois par leçon) après la réussite de l'examen
create or replace function public.delivrer_certificat(p_lecon text, p_titre text)
 returns json
 language plpgsql
 security definer
 set search_path to ''
as $function$
declare
    uid uuid := auth.uid();
    pr public.progression;
    c public.certificats;
    e public.eleves;
    nom text;
    nb int;
begin
    if uid is null then
        raise exception 'Non connecté';
    end if;

    select * into c from public.certificats where user_id = uid and lecon = p_lecon;
    if found then
        return row_to_json(c);
    end if;

    select * into pr from public.progression where user_id = uid and lecon = p_lecon;
    if not found or pr.examen_score is null then
        raise exception 'Examen non réussi';
    end if;

    select * into e from public.eleves where user_id = uid order by id limit 1;
    nom := trim(coalesce(e.prenom, '') || ' ' || coalesce(e.nom, ''));
    if nom = '' then
        select trim(coalesce(raw_user_meta_data ->> 'full_name', raw_user_meta_data ->> 'nom', ''))
            into nom from auth.users where id = uid;
    end if;
    if coalesce(nom, '') = '' then
        nom := 'تلميذ(ة) Profaycel';
    end if;

    select coalesce(sum(x), 0) into nb from unnest(pr.etoiles) as x;

    insert into public.certificats (numero, user_id, lecon, titre, nom_complet, niveau, score, total, etoiles)
    values ('PF-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.certificat_seq')::text, 4, '0'),
            uid, p_lecon, p_titre, nom, e.classe, pr.examen_score, pr.examen_total, nb)
    returning * into c;

    return row_to_json(c);
end;
$function$;

-- Vérifier un certificat à partir de son numéro (page publique certificat.html)
create or replace function public.verifier_certificat(p_numero text)
 returns json
 language sql
 security definer
 set search_path to ''
as $function$
    select json_build_object('numero', numero, 'nom', nom_complet, 'titre', titre,
                             'niveau', niveau, 'delivre_le', delivre_le)
    from public.certificats where numero = upper(trim(p_numero));
$function$;

grant execute on function public.delivrer_certificat(text, text) to authenticated;
grant execute on function public.verifier_certificat(text) to anon, authenticated;

-- =================================================
-- 10 bis. UN CERTIFICAT PAR PARTIE (algèbre, géométrie)
-- =================================================
-- Ajouter une partie : insérer une ligne ici ET dans window.PARTIES (parcours/catalogue.js).

create table if not exists public.parties (
    id      text primary key,
    titre   text not null,
    niveau  text,
    detail  text,
    lecons  text[] not null
);
alter table public.parties enable row level security;
create policy admin_tout on public.parties for all to authenticated
    using (public.is_admin()) with check (public.is_admin());
create policy lecture_connectes on public.parties for select to authenticated using (true);

insert into public.parties (id, titre, niveau, detail, lecons) values
 ('8-algebre-t1', 'الجبر والحساب', '8 أساسي', '6 دروس · الثلاثي الأوّل',
  array['8-maths-divisibilite','8-maths-entiers-relatifs','8-maths-addition-soustraction-z','8-maths-multiplication-z','8-maths-rationnels','8-maths-addition-q']),
 ('8-geometrie-t1', 'الهندسة', '8 أساسي', 'درسان · الثلاثي الأوّل',
  array['8-geo-symetrie-centrale','8-geo-angles-paralleles']),
 ('9-algebre-t1', 'الجبر والحساب', '9 أساسي', '6 دروس · الثلاثي الأوّل',
  array['9-maths-divisibilite','9-maths-denombrement','9-maths-reels','9-maths-operations-r','9-maths-inverse-valeur-absolue','9-maths-produits-remarquables']),
 ('9-geometrie-t1', 'الهندسة', '9 أساسي', '3 دروس · الثلاثي الأوّل',
  array['9-geo-reperage','9-geo-milieux','9-geo-thales'])
on conflict (id) do update set titre = excluded.titre, niveau = excluded.niveau, detail = excluded.detail, lecons = excluded.lecons;

alter table public.certificats add column if not exists detail text;
alter table public.certificats add column if not exists etoiles_max int;

-- delivrer_certificat_partie(p_partie) : vérifie que toutes les leçons de la partie ont un examen réussi,
-- puis crée le certificat (numéro PF-AAAA-NNNN, nom de la fiche élève, total des notes et des étoiles).
-- verifier_certificat renvoie aussi « detail ». L'ancienne delivrer_certificat (par leçon) n'est plus exécutable.
-- (Corps complet des fonctions : migration Supabase « parcours_certificats_par_partie ».)
revoke execute on function public.delivrer_certificat(text, text) from public, anon, authenticated;


-- =================================================
-- 11. ANNONCES DU PROFESSEUR (annonces-admin.html → eleve.html / parent.html)
-- =================================================

alter table public.annonces add column if not exists contenu    text;
alter table public.annonces add column if not exists lien       text;
alter table public.annonces add column if not exists lien_texte text;
alter table public.annonces add column if not exists cible      text not null default 'tous';   -- tous / eleves / parents
alter table public.annonces add column if not exists niveau     text;                            -- null = tous les niveaux
alter table public.annonces add column if not exists epingle    boolean not null default false;
alter table public.annonces add column if not exists expire_le  date;
alter table public.annonces alter column statut set default 'publie';                        -- publie / masque
do $$ begin
    alter table public.annonces add constraint annonces_cible_check check (cible in ('tous', 'eleves', 'parents'));
exception when duplicate_object then null; end $$;
alter policy lecture_connectes on public.annonces using (statut = 'publie');


-- =================================================
-- 12. PROFIL DE L'ÉLÈVE À DISTANCE + DEMANDES D'INSCRIPTION DES PARENTS
-- =================================================

-- L'élève inscrit en ligne écrit son nom et choisit son niveau une seule fois (eleve.html)
create or replace function public.completer_profil(p_prenom text, p_nom text, p_niveau text)
returns json
language plpgsql
security definer
set search_path = ''
as $function$
declare
    uid uuid := auth.uid();
    pr text := btrim(coalesce(p_prenom, ''));
    nm text := btrim(coalesce(p_nom, ''));
    n int;
begin
    if uid is null then
        raise exception 'Non connecté';
    end if;

    if char_length(pr) < 2 or char_length(pr) > 60 or char_length(nm) < 2 or char_length(nm) > 60 then
        raise exception 'Nom invalide';
    end if;

    if p_niveau not in ('7 أساسي', '8 أساسي', '9 أساسي', '1 ثانوي') then
        raise exception 'Niveau inconnu';
    end if;

    update public.eleves
        set prenom = pr, nom = nm, classe = p_niveau
        where user_id = uid and mode = 'distance' and coalesce(classe, '') = '';

    get diagnostics n = row_count;

    if n = 0 then
        raise exception 'Niveau déjà choisi : demandez au professeur pour le changer';
    end if;

    return json_build_object('prenom', pr, 'nom', nm, 'classe', p_niveau);
end;
$function$;

revoke execute on function public.completer_profil(text, text, text) from anon, public;
grant execute on function public.completer_profil(text, text, text) to authenticated;

-- Demandes d'inscription envoyées par les parents (inscription-enfant.html → onglet « Demandes » de eleves.html)
create table if not exists public.demandes_inscription (
    id            bigint generated always as identity primary key,
    prenom        text not null check (char_length(btrim(prenom)) between 2 and 60),
    nom           text not null check (char_length(btrim(nom)) between 2 and 60),
    niveau        text not null check (niveau in ('7 أساسي', '8 أساسي', '9 أساسي', '1 ثانوي')),
    etablissement text not null check (char_length(btrim(etablissement)) between 2 and 120),
    niveau_maths  text not null check (niveau_maths in ('excellent', 'moyen', 'faible')),
    whatsapp      text not null check (whatsapp ~ '^\+?[0-9]{8,15}$'),
    message       text check (message is null or char_length(message) <= 1000),
    email         text check (email is null or char_length(email) <= 120),
    statut        text not null default 'nouvelle' check (statut in ('nouvelle', 'traitee')),
    created_at    timestamptz not null default now()
);

alter table public.demandes_inscription add column if not exists email text check (email is null or char_length(email) <= 120);

alter table public.demandes_inscription enable row level security;

create policy admin_tout on public.demandes_inscription
    for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- les visiteurs peuvent seulement envoyer une demande (jamais lire celles des autres)
create policy envoi_public on public.demandes_inscription
    for insert to anon, authenticated with check (statut = 'nouvelle');

-- Élèves dont l'email n'est pas confirmé (administrateur seulement) : masqués dans la liste « À distance »
create or replace function public.eleves_non_confirmes()
returns setof bigint
language sql
stable
security definer
set search_path = ''
as $function$
    select e.id
    from public.eleves e
    join auth.users u on u.id = e.user_id
    where public.is_admin()
      and u.email_confirmed_at is null;
$function$;

revoke execute on function public.eleves_non_confirmes() from anon, public;
grant execute on function public.eleves_non_confirmes() to authenticated;
