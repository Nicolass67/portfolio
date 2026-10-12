# Cahier des charges produit

## Statut

Document de cadrage. Les faits issus du brief utilisateur sont établis ; les solutions décrites comme « proposées » restent à valider.

## Positionnement

Le produit est un **portfolio de projets techniques**, pas un CV en ligne ni une page commerciale de jeu. Sa promesse :

> Donner rapidement une vue crédible du profil, puis permettre d’inspecter la façon dont des problèmes de gameplay sont compris, conçus, implémentés et évalués.

Le candidat est un développeur français diplômé de l’EPITA, avec une expérience professionnelle en logiciel, en transition vers le gameplay programming orienté Unreal Engine et C++.

## Publics et besoins

### Recruteur ou talent acquisition

- Comprendre le poste visé et le niveau de séniorité revendiqué.
- Identifier immédiatement le projet principal et les compétences pertinentes.
- Accéder facilement au CV, aux coordonnées et aux liens vérifiables.
- Décider rapidement si une lecture technique approfondie est utile.

### Lead Gameplay Programmer / Technical Director

- Distinguer responsabilité personnelle, contexte d’équipe et technologies.
- Examiner le raisonnement, les contraintes, les compromis et les preuves.
- Repérer la qualité de l’architecture, du C++, de l’usage d’Unreal/GAS et de la démarche de débogage.
- Identifier ce qui est démontré, ce qui est déclaré et ce qui reste non mesuré.

### Développeur pair

- Suivre un récit technique compréhensible.
- Accéder à des schémas, extraits et démonstrations contextualisés.
- Évaluer la capacité à communiquer et à apprendre.

## Objectifs produit

1. Rendre le projet principal visible dans le premier écran ou immédiatement après une introduction compacte.
2. Établir le positionnement « Gameplay Programmer — Unreal Engine / C++ » sans longue autobiographie.
3. Organiser plusieurs niveaux de lecture : survol, synthèse, étude détaillée, preuve.
4. Fonctionner honnêtement avant l’arrivée des médias, puis les intégrer sans refonte structurelle.
5. Accueillir de nouveaux projets sans modifier le parcours fondamental.
6. Offrir un rendu professionnel, distinctif, accessible et rapide sur mobile comme sur ordinateur.

## Non-objectifs

- Vendre Tactical Encounter Lab comme un produit commercial.
- Simuler un grand catalogue de projets.
- Reproduire une interface de jeu, un HUD ou une esthétique « gaming » générique.
- Construire un back-office, un compte utilisateur, une base de données ou un backend sans besoin futur démontré.
- Utiliser l’animation comme substitut à une hiérarchie éditoriale.
- Publier des affirmations techniques non vérifiées.

## Principes produit

- **Projet d’abord** : identité compacte, projet principal prioritaire.
- **Preuve avant décoration** : chaque média ou animation sert une explication.
- **Divulgation progressive** : synthèse toujours lisible ; approfondissement via sommaire + chapitres dépliables (D-019).
- **Contexte explicite** : rôle, contraintes, état, contribution et résultat sont séparés.
- **Honnêteté éditoriale** : les champs absents sont omis, pas remplis par des placeholders fictifs.
- **Évolutivité locale** : l’ajout d’un projet est surtout une opération de contenu.
- **Accessibilité native** : clavier, focus, structure sémantique, contraste et mouvement réduit dès la conception.
- **Bilingue FR/EN** (D-016) : structure commune ; français par défaut.

## Arbitrages produit validés (Mission 04)

- Composition premier écran : **hybride A+B** (D-014).
- Publication TEL : **présentation générale** uniquement (D-017) — pas de code/extraits/médias tiers sans droits vérifiés.
- Contribution TEL : **projet personnel réalisé seul** (D-018) — sans inférer un état « terminé » de toutes les fonctionnalités.
- Navigation détail : **sommaire à ancres + chapitres dépliables** (D-019).

## Structure de contenu envisagée

1. En-tête compact : identité, rôle cible, navigation, sélecteur de langue, contact principal.
2. Premier écran projet (A+B) : titre éditorial + synthèse technique scannable + accès au dossier.
3. Index des projets : un projet principal aujourd’hui ; aucun faux emplacement.
4. Dossier technique dans la page (chapitres dépliables, périmètre général pour l’instant).
5. Parcours, expérience et méthode de travail.
6. Compétences contextualisées par des preuves, pas sous forme de jauges.
7. Contact, CV et liens professionnels.

Cette séquence est une hypothèse de travail. Détail : `UX_STRATEGY.md` ; wireframes : `docs/wireframes/AB_HYBRID_REFINED.md`.

## Traitement de l’absence de médias

Le lancement ne dépend pas de captures finales. Le contenu initial peut reposer sur :

- un synopsis technique bref ;
- des faits et responsabilités confirmés (dont contribution solo) ;
- une carte d’architecture ou un diagramme ultérieurement validé ;
- des encarts « problème → décision → conséquence » lorsque factuels ;
- des preuves textuelles et liens de dépôt **si** leur publication est autorisée.

**Hors périmètre actuel (D-017)** : extraits de code et médias non autorisés.

Les composants média devront être optionnels : aucune zone vide, fausse capture ou promesse « bientôt » dominante. Lorsque les médias arrivent, ils enrichissent des entrées déjà structurées sans changer l’ordre général.

## Critères de réussite provisoires

- En test utilisateur, un visiteur peut identifier le rôle cible, le projet principal et l’accès au détail en moins de 15 secondes, sans défilement prolongé.
- Les principales informations projet sont accessibles au clavier et sans animation.
- Le contenu reste compréhensible lorsque JavaScript échoue, sauf interactions explicitement non essentielles.
- Aucun fait publié n’est dépourvu d’un statut de vérification interne.
- Un deuxième projet peut être ajouté via le modèle de contenu sans nouvelle route ni refonte de la navigation.
- Les budgets de performance et critères d’accessibilité sont définis après le premier prototype mesurable, puis suivis en CI.

## Contraintes et dépendances

- Une seule page est privilégiée ; les ancres et états ouverts ne doivent pas rendre l’historique ou le focus confus.
- Les contenus réels et droits de publication conditionnent la profondeur au-delà de la présentation générale.
- Le site est bilingue FR/EN ; français par défaut sur `/`, anglais sur `/en/`.
- Astro + TypeScript, architecture statique et D1 sont validés et implémentés.
- Les informations personnelles et la publication restent conditionnées aux validations correspondantes.
