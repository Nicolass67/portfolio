# Progression du projet

## État global

- Phase : **Refonte UX mobile dédiée** (D-034) + déploiement Pages opérationnel.
- Mobile ≤ 52.99rem : chips sticky, barre case + feuilles chapitres/projets, scroll page, CTA bas de chapitre (suivant / projet suivant) — desktop préservé.
- Dépôt : [`Nicolass67/portfolio`](https://github.com/Nicolass67/portfolio) — **public** (accord explicite 2026-10-12) ; branche `main`.
- Site publié : [https://nicolass67.github.io/portfolio/](https://nicolass67.github.io/portfolio/) (HTTP 200 vérifié).
- Workflow : `.github/workflows/deploy.yml` — CI (format/lint/typecheck/unit/build) + deploy Pages.
- Astro : `site` + `base: /portfolio/` ; chemins via `withBase()`.
- Phase UI précédente (M13) : sidebar titres, jump 1 clic, lightbox, scrollbars masquées.
- Direction visuelle light **conservée**.
- Outils revue : explorateurs **Accent** + **Fond** uniquement en local ; site en ligne = Craie / Ardoise figés.
- Rail projets : **titres (+ n°) uniquement** — métadonnées réservées au workspace principal.
- Case Study : titre du projet actif + bandeau compact de saut projet (n°) + index chapitres ; pastilles → page projet (étude de cas) ; « Tous les projets » en haut à droite (niveau bandeau démo) → overview.
- Lightbox image accessible (`<dialog>`) pour images inspectables ; navigation multi-images (flèches, clavier, swipe, crossfade) ; pinch-zoom / pan / double-tap mobile ; vidéo/YouTube séparés.
- Scrollbars visuellement masquées (Firefox + WebKit) ; le défilement reste possible.
- Captures : `artifacts/screenshots/`.
- Git local : initialisé, remote `origin` → `Nicolass67/portfolio`.

- Couleurs provisoires : fond **Craie**, accent **Ardoise** (sélecteurs démo conservés).
- Site Pages : mode **démo temporaire** (aligné sur localhost) — contenu fictif OK ; repasser en `authentic` avant lancement réel.

## Décisions attendues

1. Validation définitive accent / fond (Q-18 / Q-19) — défauts provisoires déjà posés.
2. Direction visuelle light (Q-17) — `studio` recommandé.
