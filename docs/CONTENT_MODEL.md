# Modèle conceptuel de contenu

## État (Mission 12)

- Authentic : `site.ts` (TEL).
- Démo projets : `demo-projects.ts` (métadonnées + médias overview).
- Chapitres denses : `demo-dense.ts` (`buildDenseChapters`, générateur de blocs).
- Blocs interactifs démo : `demo-blocks.ts` (`overviewBlocksFor`, `chapterBlocksFor`, kinds).
- Médias : `image` | `video` | `gallery` | `diagram` | `youtube` | `none`.
- Lightbox : `fullSrc` optionnel (sinon `src`) + `caption` ; fallback si chargement échoue.
- YouTube : `youtubeId` / embed configurable ; sans id → placeholder click-to-load (pas de faux gameplay).
- Validation chemins locaux + fallback runtime (jamais d’icône image cassée).

## Volume démo (cibles)

| Métrique | Cible | Source |
| -------- | ----- | ------ |
| Projets | 6 | `demo-projects.ts` |
| Chapitres / projet | ≥6 | `CHAPTER_IDS` × thèmes |
| Chapitres total | ≥36 | `DENSE_TARGET_CHAPTERS` |
| Instances de blocs | ≥180 | 6×6×5 via cycle de kinds |
| Kinds distincts | ≥12 (16 implémentés) | `allDemoBlockKinds()` |

## Patterns de blocs (démo)

`rich-intro`, `expand-note`, `step-sequence`, `approach-compare`, `gallery-select`, `before-after`, `decision-list`, `timeline`, `tech-flow`, `annotation-media`, `concept-chips`, `checklist`, `glossary`, `media-text-split`, `param-explorer`, `related-chapters`.

Tous bilingues FR/EN. Jamais présentés comme preuves ou métriques réelles.

## Remplacement futur

1. Fournir chapitres authentiques par projet (même forme `ChapterContent`).
2. Brancher des blocs authentiques ou retirer les appels `overviewBlocksFor` / `chapterBlocksFor` hors mode démo (déjà le cas).
3. Configurer `youtubeId` / `src` réels uniquement avec médias autorisés.
4. Le build `PUBLIC_PORTFOLIO_MODE=authentic` ne doit jamais embarquer le catalogue dense fictif comme preuve.
