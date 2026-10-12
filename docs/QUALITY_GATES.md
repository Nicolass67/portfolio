# Portes qualité

## Règle générale

Une tâche n’est terminée que lorsque les gates applicables ont été exécutés ou explicitement marqués non applicables avec justification. « Non exécuté » n’équivaut pas à « réussi ».

## Gate 1 — Périmètre et vérité

- Le changement répond au besoin demandé.
- Aucun contenu, résultat ou média fictif n’est présenté comme réel.
- Les hypothèses et recommandations sont identifiées.
- Aucune décision en attente n’est formulée comme validée.
- Aucun secret, donnée personnelle non approuvée ou élément soumis à restriction n’est ajouté.

Applicable à toutes les tâches.

## Gate 2 — Cohérence documentaire

- Les documents concernés ont été lus.
- `DECISIONS`, `OPEN_QUESTIONS` et `PROGRESS` concordent.
- Une information n’est pas dupliquée avec des variantes contradictoires.
- Les sources et dates sont présentes pour les faits changeants.
- Les liens internes existent.

Applicable à tout changement de documentation ou d’architecture.

## Gate 3 — Qualité statique

Commandes actuelles :

- `format:check`
- `lint`
- `typecheck`
- validation de contenu (`npm run test`)
- `build`

Via `npm run check` pour format/lint/typecheck/unit/build, puis `npm run test:e2e` pour navigateur. Obligatoire pour tout changement de code/configuration.

## Gate 4 — Tests ciblés

- Tests unitaires/composants proches du changement.
- Test de régression pour bug reproductible.
- Pas de snapshot massif accepté sans justification.

Applicable lorsque de la logique ou un comportement est modifié.

## Gate 5 — Parcours navigateur

- Build servi, prêt et inspecté.
- Parcours critique concerné exécuté.
- Clavier et focus vérifiés.
- Console sans erreur bloquante.
- Requêtes essentielles sans échec.
- Viewports concernés contrôlés.

Applicable aux changements d’interface, navigation, médias ou hydratation.

## Gate 6 — Visuel

- Captures avant/après ou comparaison de référence.
- Aucune différence inexpliquée.
- Pas de débordement, saut de layout ou contenu tronqué.
- Rendu mobile et desktop concernés inspectés.
- Mise à jour de baseline revue par un humain.

### Captures de référence persistantes

- Emplacement : `artifacts/screenshots/`
- Convention : `projects-p1-fr-{desktop|mobile}.png`, `projects-p2-fr-*`, `case-overview-fr-*`, `case-chapter-fr-*`, `case-dense-chapter-fr-desktop.png`, `case-project-switch-fr-desktop.png`, `nav-case-chapters-fr-desktop.png`, `nav-project-switcher-fr-desktop.png`, `profile-fr-*`, `project-no-media-fr-*`, accents, `projects-p1-en-desktop.png`, `case-overview-en-desktop.png`.
- Supprimer les captures obsolètes (ex. ancienne nav compacte double-liste).
- Source : site réellement rendu (Playwright).
- Régénération : `npx playwright test tests/e2e/screenshots.spec.ts`.
- Inclure les PNG à jour dans le ZIP ; **exclure tout `.env*`**.

### Gate médias

- Chaque `src` / `poster` / `sources` local référencé existe sous `public/`.
- Aucune icône d’image cassée visible : asset valide **ou** fallback `media-frame--failed` / état `none`.

### Gate Mission 11–13

- Explorateur Accent présent en démo, absent en build authentic.
- Rail overview : **titres (+ n°) uniquement** — pas de description/tech dans le sidebar.
- Case study : titre projet + saut projet 1 clic + chapitres ; pas de bouton « Changer de projet » ni seconde liste.
- Switch projet depuis case study → overview ; chapitre effacé ; URL inchangée.
- Lightbox image accessible (Escape, close, backdrop, focus) ; navigation multi-images (flèches / clavier) si groupe ; vidéo séparée.
- Scrollbars **visuellement masquées** partout ; défilement souris/clavier/touch conservé.
- Densité démo : ≥36 chapitres, ≥180 blocs, ≥12 kinds.

### Gate viewport desktop

- À 1440×900 (et contrôle 1280×720 / 1920×1080) : `scrollHeight ≤ innerHeight` et `scrollWidth ≤ innerWidth` sur overview, étude de cas et profil.

Applicable aux changements visuels. Une lecture du CSS ne satisfait pas ce gate.

## Gate 7 — Accessibilité

- axe sur les états concernés.
- Navigation clavier et focus visible.
- Nom, rôle et état accessibles.
- Structure de titres/landmarks cohérente.
- Contraste et mouvement réduit inspectés.
- Contrôle manuel requis planifié si non automatisable.

Applicable à toute interface. Avant livraison, la revue manuelle complète est obligatoire.

## Gate 8 — Performance

- Taille des nouveaux scripts/styles/médias connue.
- Aucun média lourd chargé sans besoin.
- Dimensions et stratégie de chargement définies.
- Budget respecté ou évolution justifiée.
- Profil réalisé si animation ou interaction saccade.

Applicable aux dépendances, médias, animations et changements de rendu.

## Gate 9 — Dépendances et sécurité

- Besoin et alternatives documentés.
- Version/compatibilité vérifiées.
- Licence et maintenance acceptables.
- Audit de vulnérabilités examiné sans correction automatique aveugle.
- Lockfile mis à jour de façon cohérente.

Applicable à chaque ajout/mise à jour de dépendance.

## Gate 10 — Livraison et continuité

- Diff relu.
- Contrôles réussis/échoués/non exécutés listés.
- `PROGRESS`, `DECISIONS` et questions mis à jour si nécessaire.
- Pour une mission substantielle : archive ZIP documentaire créée sous `artifacts/reviews/portfolio-review-YYYYMMDD-HHMM.zip`, ouverte, inventoriée et sans secret ni fichier inutile ; chemin et taille indiqués à l’utilisateur.
- Prochaine étape limitée et explicite.

Applicable à toute intervention substantielle. Une modification mineure isolée peut marquer le ZIP comme non applicable, avec justification.

## Matrice minimale par type de changement

- Documentation seule : 1, 2, vérification liens/cohérence, 10.
- Contenu projet : 1, 2, validation de schéma, build, rendu concerné, 10.
- Style : 3, 5, 6, 7, éventuellement 8, 10.
- Interaction : 3, 4, 5, 6, 7, 8, 10.
- Média : 1, 3, 5, 6, 7, 8, 10.
- Dépendance/configuration : 2, 3, 4 selon impact, 8, 9, 10.
- Déploiement : 3 à 9 selon impact, test de l’URL produite, 10.

## Gestion d’un échec

1. Conserver le message exact.
2. Identifier si l’échec est produit, test, environnement ou flakiness.
3. Ne pas assouplir un seuil uniquement pour rendre la CI verte.
4. Corriger ou documenter le blocage.
5. Relancer le gate concerné.
6. Rapporter honnêtement l’état final.
