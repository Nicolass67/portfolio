# Registre des décisions

## Légende

- **Validé** : instruction explicite de l’utilisateur ou arbitrage confirmé.
- **Proposé** : recommandation à approuver.
- **En attente** : options encore ouvertes.
- **Rejeté** : option écartée explicitement.

## D-001 — Priorité aux projets

- Contexte : le portfolio doit soutenir une candidature Gameplay Programmer.
- Options : introduction personnelle longue ; CV d’abord ; projets d’abord.
- Décision : projets visibles immédiatement ou presque, identité compacte.
- Justification : demande explicite et meilleure qualification technique.
- Conséquences : le parcours personnel vient après les études de cas.
- Statut : **validé par le brief utilisateur**.

## D-002 — Expérience one-page

- Contexte : éviter la fragmentation en pages projet/CV/compétences.
- Options : multi-page ; one-page stricte ; one-page avec détails progressifs.
- Décision : privilégier une page unique avec ancres et détails intégrés.
- Justification : demande explicite, continuité de lecture.
- Conséquences : gérer longueur, focus, URL et performances ; réévaluer si le catalogue devient important.
- Statut : **validé comme orientation** ; mécanisme de détail précisé en D-019.

## D-003 — Stack de rendu

- Contexte : site principalement statique, SEO, JS maîtrisé, interactions localisées, bilingue.
- Options : Astro + TS ; Astro + React îlots ; Vite SPA React ; Next.js.
- Recommandation Mission 05 : **Astro + TypeScript strict** ; chapitres via HTML natif ; **React non installé au J0** ; ajouter React seulement si besoin prouvé.
- Justification : fit document éditorial + i18n SSG + JS minimal ; Vite SPA et Next écartés pour ce produit (voir `TECH_STACK_EVALUATION.md`).
- Conséquences : scaffold Astro ; content collections FR/EN ; pas de double modèle de composants au démarrage.
- Niveau de confiance : élevé.
- Statut : **validé par l’utilisateur (Mission 06) et implémenté**.

## D-004 — Backend et modèle de contenu

- Contexte : contenu éditorial versionné, un seul auteur connu.
- Options : fichiers locaux ; CMS headless ; base de données/backend.
- Recommandation : contenu local typé et validé au build ; aucun backend.
- Justification : besoin actuel entièrement statique, coût et risques moindres.
- Conséquences : édition via dépôt ; migration possible si plusieurs auteurs ou previews distantes deviennent nécessaires.
- Niveau de confiance : élevé.
- Statut : **proposé**.

## D-005 — Direction artistique

- Contexte : éviter template IA, HUD et marketing de jeu.
- Options : dossier éditorial ; carnet d’ingénierie ; index cinétique.
- Recommandation : dossier technique éditorial comme base, annotations de carnet et mouvement d’index limité ; composition A+B (D-014).
- Justification : fonctionne sans média, met le raisonnement au centre et reste extensible.
- Conséquences : exige rédaction, grille et typographie de haut niveau ; proposition détaillée Mission 04 dans `DESIGN_DIRECTION.md`.
- Niveau de confiance : moyen à élevé — **proposition visuelle à valider**, pas DA figée.
- Statut : **D1 validée par l’utilisateur (Mission 06) et implémentée**.

## D-006 — Bibliothèque d’animation

- Contexte : interactions encore non définies.
- Options : CSS ; bibliothèque généraliste ; animation sur mesure.
- Recommandation : CSS natif au démarrage ; bibliothèque seulement après preuve d’un besoin complexe.
- Justification : poids, accessibilité et maintenance.
- Conséquences : storyboard et mesure avant ajout.
- Niveau de confiance : élevé.
- Statut : **proposé**.

## D-007 — Système de composants

- Contexte : une bibliothèque visuelle risquerait une apparence générique.
- Options : design system préfabriqué ; composants headless ; composants maison/natifs.
- Recommandation : HTML natif et composants maison ; headless ponctuel si interaction complexe.
- Justification : contrôle visuel et sémantique.
- Conséquences : responsabilité accrue sur accessibilité et documentation.
- Niveau de confiance : élevé.
- Statut : **proposé**.

## D-008 — Tests et validation visuelle

- Contexte : les agents doivent observer le résultat réel.
- Options : tests unitaires seulement ; E2E seulement ; stratégie combinée.
- Recommandation : Vitest ciblé + Playwright E2E/visuel + axe + inspection réelle + Lighthouse calibré.
- Justification : couches complémentaires, traces et captures reproductibles.
- Conséquences : environnement CI déterministe et revue humaine des baselines.
- Niveau de confiance : élevé.
- Statut : **proposé**.

## D-009 — Instructions agents

- Contexte : continuité sans dépendre de l’historique de chat.
- Options : `AGENTS.md` ; `.cursor/rules` ; duplication.
- Décision de cadrage : `AGENTS.md` global ; `.cursor/rules/*.mdc` seulement pour une future portée ciblée.
- Justification : support officiel Cursor, lisibilité humaine, moins de duplication.
- Conséquences : tout agent doit lire la documentation référencée.
- Statut : **appliqué dans la documentation**, à réévaluer si des règles spécifiques apparaissent.

## D-010 — Hooks Cursor

- Contexte : possibilité d’automatiser validations et rapport.
- Options : hooks immédiats ; aucun hook ; hooks après stabilisation.
- Recommandation : aucun hook pendant le cadrage ; évaluer après création de commandes fiables.
- Justification : ne pas automatiser un workflow inexistant ni bloquer l’agent.
- Niveau de confiance : élevé.
- Statut : **proposé et respecté pour cette mission**.

## D-011 — Gestionnaire de paquets

- Contexte : npm est disponible ; pnpm/Yarn/Bun ne le sont pas.
- Options : npm ; installation d’un autre gestionnaire.
- Recommandation : npm et lockfile npm, sauf avantage démontré avant initialisation.
- Justification : zéro installation supplémentaire et support universel.
- Niveau de confiance : moyen, choix facilement réversible avant scaffold.
- Statut : **proposé**.

## D-012 — Transmission de fin de mission

- Contexte : un assistant externe doit pouvoir examiner le cadrage et les décisions sans dépendre de l’historique de conversation.
- Options : rapport temporaire `docs/reports/LAST_ACTION_REPORT.md` ; archive ZIP documentaire ; les deux.
- Décision : remplacer le mécanisme obligatoire `LAST_ACTION_REPORT.md` par une archive ZIP documentaire `artifacts/reviews/portfolio-review-YYYYMMDD-HHMM.zip` à chaque mission substantielle.
- Justification : instruction explicite de l’utilisateur ; transmission autonome, complète et vérifiable.
- Conséquences : `PROGRESS.md`, `DECISIONS.md` et `OPEN_QUESTIONS.md` restent les sources permanentes ; un `REVIEW_README.md` n’existe que dans le ZIP ; les archives sont listées dans `.gitignore` (`artifacts/reviews/*.zip`).
- Statut : **validé par instruction utilisateur (Mission 02)**.

## D-013 — Gouvernance documentaire

- Contexte : risque de contradictions, redondance et instructions obsolètes entre missions.
- Options : laisser la documentation ad hoc ; imposer une carte de sources de vérité et une discipline de mise à jour.
- Décision : `docs/DOCUMENTATION_MAP.md` + règles dans `AGENTS.md` / `AGENT_WORKFLOW.md` ; une source de vérité par sujet ; mises à jour dans la même mission ; statuts explicites.
- Justification : instruction Mission 03.
- Statut : **validé par instruction utilisateur (Mission 03)**.

## D-014 — Composition du premier écran (A+B)

- Contexte : besoin d’une composition distinctive et techniquement lisible sans médias garantis.
- Options : A dossier éditorial ; B fiche système ; C ancre visuelle + slot média ; hybrides.
- Décision : **hybride A+B** — identité éditoriale / typographie / composition distinctive de A, combinée à la synthèse technique et à la lisibilité rapide de B. Ne pas reproduire intégralement A ni B.
- Justification : arbitrage explicite utilisateur (Mission 04).
- Conséquences : wireframes affinés dans `docs/wireframes/AB_HYBRID_REFINED.md` ; Variantes A/B/C de Mission 03 restent historiques.
- Date : 2026-10-12.
- Statut : **validé par l’utilisateur (Mission 04)**.

## D-015 — Stack (rappel d’état)

- Voir D-003 et mise à jour Mission 05 : recommandation resserrée **Astro + TypeScript**, React non requis au démarrage.
- Statut : **validé et implémenté (Mission 06)**.

## D-016 — Langues du portfolio

- Contexte : recrutement gameplay international et auteur francophone.
- Options : anglais seul ; français seul ; bilingue FR/EN.
- Décision : le portfolio est **bilingue français et anglais**. Structure commune, contenus maintenus dans les deux langues sans dupliquer inutilement la structure du site.
- Justification : arbitrage explicite utilisateur (Mission 04).
- Conséquences : français par défaut sur `/`, anglais complet sur `/en/`.
- Date : 2026-10-12.
- Statut : **validé et implémenté** ; français par défaut confirmé en Mission 06.

## D-017 — Périmètre de publication TEL

- Contexte : dépôt jeu privé ; médias et droits non tous clarifiés.
- Options : présentation générale ; profondeur code/extraits ; médias tiers.
- Décision : à ce stade, **présentation générale** du projet uniquement. Pas de code source, d’extraits de code ni de médias tiers sans vérification préalable des droits. Aucune autorisation inventée.
- Justification : arbitrage explicite utilisateur (Mission 04).
- Conséquences : inventaire et wireframes n’exposent que des faits généraux étayés ; profondeur technique publiable reste conditionnée (Q-01, Q-02).
- Date : 2026-10-12.
- Statut : **validé**.

## D-018 — Contribution TEL

- Contexte : clarification du rôle pour les recruteurs.
- Options : solo ; équipe ; rôle partiel non précisé.
- Décision : présenter Tactical Encounter Lab comme **projet personnel réalisé seul**.
- Justification : arbitrage explicite utilisateur (Mission 04).
- Conséquences : champ `teamContext` / contribution = solo ; **ne pas** déduire que toutes les fonctionnalités sont terminées ou validées — les faits techniques restent vérifiés indépendamment.
- Date : 2026-10-12.
- Statut : **validé**.

## D-019 — Navigation hybride (sommaire + chapitres dépliables)

- Contexte : besoin d’accès rapide et d’approfondissement sur la même page.
- Options : accordéon seul ; ancres seules ; panneau latéral ; hybride.
- Décision : mécanisme **hybride** — sommaire avec ancres + chapitres dépliables dans le flux de la page.
- Justification : arbitrage explicite utilisateur (Mission 04).
- Conséquences : `<details>` natifs, sommaire ancré, tous les chapitres fermés par défaut ; une ancre ouvre sa cible.
- Date : 2026-10-12.
- Statut : **validé et implémenté (Mission 06)**.

## D-020 — Direction visuelle D1 (proposition finalisée)

- Contexte : Mission 05 doit permettre de décider et construire ensuite.
- Options : D1 pierre/editorial ; D2 graphite ; nouvelle exploration.
- Recommandation : **retenir D1** comme unique proposition pour implémentation (tokens, typos, hi-fi dans `HI_FI_PROPOSAL.md`).
- Justification : déjà alignée A+B, sans média, distinctive sans clichés IA ; D2 n’apporte pas de gain suffisant pour retarder le build.
- Conséquences : amender D1 si besoin ; ne pas rouvrir une galerie de variantes.
- Date : 2026-10-12.
- Statut : **validé par l’utilisateur et implémenté (Mission 06)**.

## D-021 — Architecture d’implémentation

- Contexte : première version complète du site.
- Décision : Astro statique + TypeScript strict ; contenu bilingue centralisé dans un module typé ; composants Astro partagés ; aucun React.
- Justification : le HTML natif couvre ancres et disclosures ; aucune SPA ni dépendance d’interaction n’est nécessaire.
- Conséquences : script client limité à l’état d’exploration et à la synchro d’URL ; tests Vitest/Playwright.
- Date : 2026-10-12.
- Statut : **implémenté (Mission 06)** ; **étendu Mission 07** (explorateur, voir D-022).

## D-022 — Explorateur de projets modulaire (Mission 07)

- Contexte : la page empilée (synthèse + tous les chapitres) ne scale pas et confond chapitres et projets.
- Options : landing statique ; multi-pages ; explorateur in-place à deux niveaux.
- Décision : **interface unique modulaire** — un projet actif à la fois ; chapitres techniques uniquement dans le projet actif ; un chapitre actif à la fois (toggle pour fermer) ; pas de modale ; hash `#project/{id}` et `#project/{id}/{chapter}` ; média dans le modèle avec états vides conçus.
- Justification : brief Mission 07 (instruction utilisateur) + continuité D1/A+B.
- Conséquences : `ProjectExplorer.astro` + `explorer.ts` + modèle `projects[]` ; profil en retrait quand un projet est actif ; captures `artifacts/screenshots/`.
- Date : 2026-10-12.
- Statut : **validé par instruction utilisateur et implémenté (Mission 07)**.

## D-023 — Captures de référence persistantes

- Contexte : les ZIP de revue ne doivent pas se limiter à de la doc et des wireframes.
- Décision : stocker des captures du site réel sous `artifacts/screenshots/` avec convention de noms ; les régénérer quand l’UI change ; les inclure dans le ZIP de revue.
- Justification : brief Mission 07.
- Statut : **appliqué (Mission 07)** ; étendu Mission 08 (thèmes + 6 projets).

## D-024 — Contenu de démonstration isolé

- Contexte : un seul projet réel ne permet pas de valider la grille et les transitions.
- Décision : six projets fictifs dans `demo-projects.ts`, flag `demonstrationOnly`, mode `PUBLIC_PORTFOLIO_MODE` (`demo` en dev, `authentic` par défaut en production).
- Justification : brief Mission 08.
- Statut : **implémenté** ; les projets fictifs ne sont pas du contenu professionnel publié.

## D-025 — Direction visuelle post-D1

- Remplacé successivement par D-026/D-027 puis **rejeté** comme DA sombre/verte (Mission 10).
- Statut : **remplacé / rejeté**.

## D-026 — Workspace plein viewport sans URL d’état

- Décision : shell 100dvh desktop ; vues Projets / Étude de cas / Profil ; projet 1 actif ; pas de collapse ; pas de changement d’URL.
- Justification : brief Mission 09.
- Statut : **validé par instruction utilisateur et implémenté** (architecture d’interaction conservée en Mission 10).

## D-027 — Thème public unique (mécanisme)

- Décision : un seul thème public ; pas de sélecteur dans l’UI.
- Variantes de revue via `?visual=` en mode démo uniquement.
- Statut : **mécanisme validé** ; contenu des variantes **remplacé** par D-028.

## D-028 — Redesign light radical (Mission 10)

- Contexte : rejet explicite de la DA sombre/verte/dashboard (Mission 09).
- Décision d’implémentation : **light only** ; trois candidats distincts `precision` / `immersive` / `studio` ; index rail typographique ; hero média + copie ; fallback médias cassés ; pas de sélecteur public.
- Recommandation agent : **studio**.
- Statut : **candidats implémentés** ; **choix final en attente** (Q-17).

## D-029 — Expérience interactive & explorateur d’accent (Mission 11)

- Décision : conserver la DA light réussie ; ajouter explorateur d’accent **démo-only** ; blocs interactifs démo réutilisables ; transitions CSS reconstructives sans grosse lib.
- Navigation case study : **partiellement remplacé** par D-030 (le rail projets compact concurrent a été rejeté).
- Défauts provisoires (utilisateur 2026-10-12) : fond **Craie** (`chalk` / `#fbfbf9`), accent **Ardoise** (`slate` / `#334155`) ; explorateurs **conservés**.
- Statut : **implémenté** (accent / interactifs / fond) ; validation définitive encore ouverte (Q-18 / Q-19).

## D-030 — Navigation contextuelle & playground dense (Mission 12)

- Contexte : double liste numérotée (rail projets + chapitres) rejetée ; contenu case study trop sparse.
- Décision d’implémentation :
  - Rail gauche **contextuel** ; switch projet depuis case study → overview (`chapterId` null) — **remplacé par D-033** (pastilles → étude de cas du projet cible).
  - Catalogue dense démo (`demo-dense.ts`).
- Statut : **implémenté** ; raffiné par D-031 / D-033.

## D-031 — Sidebar titres, lightbox & scrollbars (Mission 13)

- Sidebar overview : **n° + titre uniquement** (métadonnées dans le workspace).
- Case study : bandeau de pastilles projet (un clic) — suppression du bouton « Changer de projet » + liste secondaire.
- Lightbox image via `<dialog>` pour images inspectables ; vidéo/YouTube exclus.
- Raffinement UX : parcours multi-images dans un groupe (flèches, clavier, swipe, compteur, transition directionnelle).
- Scrollbars masquées (`scrollbar-width` / `::-webkit-scrollbar`) sans désactiver le scroll.
- Statut : **implémenté** ; raffiné par D-033 (emplacement retour).

## D-033 — Retour projets & saut pastilles (arbitrage UI)

- Contexte : depuis l’étude de cas, les pastilles 1/2/3 doivent ouvrir l’autre projet sans détour ; le retour ne doit plus être en bas du rail.
- Décision (instruction utilisateur, corrigée) :
  - Pastilles `[data-project-switch]` → **étude de cas** du projet cible (premier chapitre), pas l’overview.
  - Bouton « Tous les projets » / « All projects » dans la barre d’outils workspace, **haut droite**, même niveau que le bandeau « Mode démonstration » → overview.
- Remplace partiellement D-030 pour le comportement du saut pastilles.
- Statut : **validé par l’utilisateur**.

## D-034 — Refonte UX mobile dédiée

- Contexte : mobile = desktop compressé (rail empilé, grille chapitres trop haute, charge cognitive).
- Décision d’implémentation (mission utilisateur 2026-10-12) :
  - Breakpoint `max-width: 52.99rem` ; styles dans `src/styles/mobile.css`.
  - Overview : index projets en chips sticky ; contenu une colonne ; scroll page.
  - Case study : barre fixe basse + feuilles chapitres/projets ; rail desktop masqué (conservé en DOM).
  - Changement de projet : une action (`data-project-switch`) ; scroll haut sur changement de vue/chapitre.
  - Bas de chapitre (mobile) : CTA « Chapitre suivant » ; dernier chapitre → projet suivant (`data-project-switch`).
  - Desktop ≥ 53rem : aucune modification de layout intentionnelle.
- Statut : **implémenté** (validation visuelle navigateur + contrôles projet).

## D-032 — Déploiement GitHub Pages + Actions

- Plateforme : GitHub Pages avec source **GitHub Actions** (pas de branche `gh-pages`).
- Dépôt : `Nicolass67/portfolio` ; branche `main` ; Node 24 ; `npm ci`.
- Astro : `site` + `base: "/portfolio/"` ; chemins via `withBase()`.
- CI obligatoire : format, lint, typecheck, unit, build authentic ; e2e Playwright local.
- Visibilité : créé **privé**, puis passé **public** le 2026-10-12 sur accord explicite (Pages gratuit nécessite un dépôt public) ; pas de mots de passe / secrets — infos portfolio (nom, études, etc.) OK.
- Statut : **validé / en production** — site live `https://nicolass67.github.io/portfolio/` (HTTP 200).
- Temporary override (utilisateur 2026-10-12) : Pages construit en `PUBLIC_PORTFOLIO_MODE=demo` pour coller au localhost de revue ; `noindex` reste actif en démo. Revenir à `authentic` avant lancement portfolio réel.
