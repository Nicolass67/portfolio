# UX mobile — architecture dédiée

Source de vérité pour l’expérience smartphone / tablette étroite. Le desktop validé reste décrit dans `UX_STRATEGY.md` et n’est pas modifié par cette architecture.

## Analyse initiale (faits observés)

Observation navigateur réel (`390×844`, mode démo, état case study restauré) avant refonte :

1. **Transposition desktop** — le rail contextuel est empilé au-dessus du contenu ; la grille 2 colonnes des chapitres occupe le premier écran avant le média.
2. **Charge cognitive** — bandeau démo + pastilles projets + identité case + index chapitres + toolbar « Tous les projets » concurrencent la lecture.
3. **Zones tactiles / découvrabilité** — index projets en scroll horizontal sans affordance de débordement claire ; pastilles numériques peu explicites hors case.
4. **Scroll** — logique héritée des panneaux desktop ; sur mobile le document scroll mais la navigation reste « app shell compressé ».
5. **Contexte** — `sessionStorage` restaure une étude de cas dense sans landing overview compréhensible.

## Décisions (implémentation)

| Sujet | Choix |
| ----- | ----- |
| Breakpoint | `max-width: 52.99rem` (aligné sur le shell existant) ; tablette portrait 768 px dans ce mode |
| Overview | Une colonne : média → titre → synthèse → meta → **CTA étude fort** → blocs ; chips = aperçu seulement |
| Case study | **Barre sticky** : Retour · chapitre courant · Projets ; **feuilles** (`<dialog>`) chapitres/projets avec slide-up ; focus sur la feuille (pas Fermer) ; clic backdrop → fermer |
| Projet → projet | Une action dans la feuille Projets (`data-project-switch`) → étude de cas du projet cible (D-033) |
| Chapitre | Sélection dans la feuille → ferme la feuille → contenu seul → **scroll document en haut** |
| Fin de chapitre | CTA « Chapitre suivant » en bas du contenu (mobile) ; dernier chapitre → **projet suivant** (étude de cas) |
| Lightbox | Pinch-to-zoom + pan + double-tap ; swipe entre images seulement à zoom 1× |
| Scroll | Scroll de page uniquement sous le breakpoint ; pas de scroll interne workspace |
| Scrollbars | Toujours masquées (contrainte projet) |
| Desktop | Aucun changement de layout hors media query ; rail / grille / panneaux inchangés ≥ 53 rem |
| Header mobile | Titre plus grand ; langues en rangée pleine largeur (≥ ~3.25 rem), drapeaux SVG FR/EN (pas d’emoji) |

## Niveaux UX

1. Exploration projets (overview + chips)
2. Vue d’ensemble projet (même vue, contenu actif)
3. Étude de cas (barre + feuille chapitres + contenu)

URL unique et monopage **conservés**.

## Composants touchés

- `src/styles/mobile.css` — variantes mobile
- `src/components/ProjectWorkspace.astro` — barre + dialogs mobile
- `src/scripts/workspace.ts` — feuilles, scroll, labels
- Styles header / lightbox raffinés sous le même breakpoint

## Vérifications (mission)

| Contrôle | Résultat |
| -------- | -------- |
| `npm run check` (format, lint, typecheck, unit, build) | OK |
| Playwright `portfolio.spec.ts` desktop + mobile | 46 passed, 2 skipped |
| Navigateur réel 390×844 overview / case / feuille chapitres | Observé |
| Desktop 1440 — rail + colonnes | Préservé (mesuré) |
| Viewports 320 / 360 / 375 / 430 / 768 / 1280 / 1920 | Non tous capturés en PNG ; logique media unique ≤52.99rem |

Captures : `artifacts/screenshots/mobile-m14-*.png`, `desktop-m14-case-fr-1440.png`.
