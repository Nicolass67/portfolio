# Carte des sources de vérité

Chaque sujet important a **un document de référence**. Les autres fichiers peuvent résumer ou pointer vers lui, jamais maintenir une version concurrente.

| Sujet                                 | Document de référence                                    | Notes                                                       |
| ------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| Règles impératives agents             | `AGENTS.md`                                              | Ordre de lecture, vérité vs hypothèse, ZIP, anti-redondance |
| Présentation / navigation docs        | `README.md`                                              | État court, liens, archives                                 |
| Objectifs produit                     | `docs/PRODUCT_BRIEF.md`                                  | Publics, non-objectifs, critères                            |
| UX / parcours                         | `docs/UX_STRATEGY.md`                                    | Niveaux de lecture, interactions                            |
| Direction artistique / système visuel | `docs/DESIGN_DIRECTION.md`                               | Light ; défauts provisoires Craie/Ardoise ; Q-18/Q-19 ouverts |
| Proposition visuelle hi-fi            | `docs/wireframes/HI_FI_PROPOSAL.md` (+ `svg/hifi-*.svg`) | Référence de conception                                     |
| Wireframes A+B basse fidélité         | `docs/wireframes/AB_HYBRID_REFINED.md`                   | Support                                                     |
| Wireframes historiques A/B/C          | `docs/wireframes/FIRST_SCREEN_VARIANTS.md`               | Historique                                                  |
| Stack technique                       | `docs/TECH_STACK_EVALUATION.md`                          | Astro+TS validé et installé                                 |
| Architecture technique                | `docs/ARCHITECTURE.md`                                   | Structure réelle                                            |
| Plan d’implémentation                 | `docs/IMPLEMENTATION_PLAN.md`                            | Jalons J0–J11                                               |
| Modèle de contenu                     | `docs/CONTENT_MODEL.md`                                  | Schéma conceptuel                                           |
| Inventaire projet TEL                 | `docs/projects/TACTICAL_ENCOUNTER_LAB.md`                | Faits vs à confirmer                                        |
| Tests / inspection                    | `docs/TEST_STRATEGY.md`                                  |                                                             |
| Workflow agents / Cursor / ZIP        | `docs/AGENT_WORKFLOW.md`                                 | Capacités **vérifiées** vs **documentées**                  |
| Portes qualité                        | `docs/QUALITY_GATES.md`                                  |                                                             |
| Décisions                             | `docs/DECISIONS.md`                                      | Statuts : proposé / validé / remplacé / abandonné           |
| Questions ouvertes                    | `docs/OPEN_QUESTIONS.md`                                 | Uniquement questions encore pertinentes                     |
| Roadmap                               | `docs/ROADMAP.md`                                        | Phases et critères de sortie                                |
| Progression                           | `docs/PROGRESS.md`                                       | Instantané actuel, pas un journal                           |
| Captures de référence UI              | `artifacts/screenshots/` + `docs/QUALITY_GATES.md` (Gate 6) | PNG du site réel ; règles de mise à jour                  |
| Déploiement / CI / GitHub Pages       | `docs/DEPLOYMENT.md`                                     | Workflow Actions, `site`/`base`, diagnostics              |

## Statuts de décision

- **Proposé** — option ou recommandation d’agent, non retenue.
- **À confirmer** — fait ou hypothèse non vérifié(e).
- **Validé** — arbitrage explicite de l’utilisateur ou brief utilisateur explicite.
- **Remplacé** — ancienne décision conservée pour historique, non opérationnelle.
- **Abandonné** — option écartée avec justification.

Une formulation dans un document ne devient **validée** que via `DECISIONS.md` (ou brief utilisateur clairement cité).

## Discipline de mise à jour

Lorsqu’une mission change un élément structurant, mettre à jour dans **la même mission** : le document de référence, les documents dépendants, `DECISIONS.md` / `OPEN_QUESTIONS.md` / `PROGRESS.md` si nécessaire, puis le ZIP si la mission est substantielle.

Ne pas créer un fichier par réflexion. Avant création : chercher une couverture existante, mettre à jour si suffisant, sinon documenter la responsabilité propre du nouveau fichier.
