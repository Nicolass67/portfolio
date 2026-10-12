# Règles de travail des agents

## Autorité et ordre de lecture

Avant toute tâche, lire dans cet ordre :

1. le présent fichier ;
2. `README.md` ;
3. `docs/PROGRESS.md` et `docs/DECISIONS.md` ;
4. `docs/DOCUMENTATION_MAP.md` pour identifier le document de référence du sujet ;
5. les documents métier concernés ;
6. `docs/OPEN_QUESTIONS.md`.

En cas de conflit, les instructions explicites de l’utilisateur priment, puis ce fichier, puis les décisions marquées **validées**. Signaler le conflit au lieu de choisir silencieusement. Ne pas résoudre un arbitrage humain par une préférence locale.

## Principes non négociables

- Les projets et les preuves techniques sont le cœur du portfolio.
- Ne jamais inventer une fonctionnalité, un résultat, une métrique, un rôle, un média, une licence ou une expérience.
- Distinguer : **fait vérifié**, **information fournie par l’utilisateur**, **hypothèse**, **recommandation**, **décision validée**.
- Une proposition d’agent n’est pas une décision. Seul un arbitrage explicite de l’utilisateur (ou un brief explicite cité) valide.
- Préférer une solution simple, accessible et mesurable à une dépendance sans besoin démontré.
- Ne pas transformer le portfolio en CV générique, page marketing de jeu, boutique, HUD ou démonstration d’effets.
- Limiter les changements au périmètre demandé. Ne pas masquer les erreurs. Ne pas remplacer une décision sans documenter la raison et le statut.
- Ne jamais inventer un résultat de test, une capacité technique confirmée ou une validation non exécutée.

## Gouvernance documentaire

- Chaque sujet a **une** source de vérité (`docs/DOCUMENTATION_MAP.md`).
- Avant de proposer une décision : vérifier `DECISIONS.md` et le document de référence.
- Respecter les décisions **validées** ; conserver l’historique utile avec statut **remplacé** / **abandonné**.
- Mettre à jour dans **la même mission** les documents affectés par un changement structurant (pas reporter).
- Ne créer un nouveau fichier que si aucun document existant ne peut porter le sujet ; expliquer sa responsabilité.
- Éviter journaux redondants, rapports de complétion et doubles procédures.
- Avant de terminer : vérifier références croisées, contradictions, liens internes critiques, et distinction proposé/validé.
- Le dépôt courant prime sur une archive ZIP ancienne.

## Avant de modifier

1. Examiner l’état réel des fichiers et de Git.
2. Définir le résultat attendu et les contrôles applicables.
3. Vérifier prérequis, décisions et questions ouvertes.
4. Lire les fichiers qui seront modifiés.
5. Pour une information susceptible d’avoir changé, utiliser une source officielle actuelle ou la qualifier d’inconnue.

## Pendant la tâche

- Conserver le contenu structuré séparé de sa présentation.
- Maintenir accessibilité clavier, `prefers-reduced-motion`, sémantique et performance comme contraintes.
- Ajouter une dépendance uniquement avec rôle précis, alternative examinée et coût acceptable.
- Ne jamais lancer plusieurs agents en écriture sur les mêmes fichiers.
- Les sous-agents reçoivent le contexte nécessaire ; ils ne connaissent pas automatiquement le dépôt.
- Les sorties de recherche sont relues et intégrées par le responsable.

## Après la tâche

1. Exécuter les contrôles applicables (`docs/QUALITY_GATES.md`).
2. Examiner erreurs et diff réel.
3. Mettre à jour uniquement les documents durablement affectés.
4. Mettre à jour `PROGRESS`, `DECISIONS`, `OPEN_QUESTIONS` si l’état change.
5. Pour une **mission substantielle**, générer et vérifier l’archive ZIP (`docs/AGENT_WORKFLOW.md`).
6. Rapporter séparément contrôles réussis, échoués et non exécutés ; indiquer le chemin du ZIP.

Un contrôle non lancé n’est jamais « réussi ». Une inspection visuelle exige observation réelle ou capture.

## Archive ZIP de transmission (obligatoire)

À la fin de chaque mission substantielle :

- Fichier : `artifacts/reviews/portfolio-review-YYYYMMDD-HHMM.zip`
- Horodatage réel de l’environnement
- Contenu : documentation pertinente + `REVIEW_README.md` (racine du ZIP uniquement)
- Exclusions : `node_modules/`, caches, builds volumineux, `.git/`, secrets, fichiers privés non nécessaires
- Vérifier existence, ouverture, inventaire, absences, taille et chemin
- Ne pas écraser une archive précédente sans demande explicite
- **Ne pas créer** `docs/reports/LAST_ACTION_REPORT.md` (mécanisme **abandonné**)

Détail : `docs/AGENT_WORKFLOW.md`. Le ZIP n’est pas une source de vérité alternative.

## Documentation et continuité

- `DECISIONS.md` — décisions durables et statuts
- `PROGRESS.md` — état global synthétique
- `OPEN_QUESTIONS.md` — arbitrages encore pertinents
- `DOCUMENTATION_MAP.md` — carte des responsabilités
- Archives `artifacts/reviews/` — instantanés de transmission

## Règles Cursor

`AGENTS.md` reste la règle globale. N’ajouter `.cursor/rules/*.mdc` que pour une contrainte ciblée démontrée, sans contradiction avec ce fichier. Pas de hooks anticipés.
