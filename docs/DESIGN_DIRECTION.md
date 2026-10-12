# Direction visuelle

## Statut

- Direction light Mission 10 **conservée** comme fondation (typo Syne/Outfit/Fraunces selon variante, titres forts, média large).
- Accent / fond publics : **Craie + Ardoise** figés en production ; explorateurs uniquement en local (`astro dev`).
- Baseline sombre/verte/dashboard : **rejetée**.

## Candidats de composition (revue)

| Clé `?visual=` | Notes |
| -------------- | ----- |
| `precision` | Grille froide, cobalt |
| `immersive` | Fraunces, teal, média dominant |
| `studio` | Baseline composition — **recommandé** ; couleurs provisoires Craie + Ardoise |

## Explorateur d’accent (temporaire)

- UI : bouton **Accent** dans le header — **mode démo uniquement**.
- ~30 swatches + input couleur libre.
- Met à jour `--accent` / `--accent-soft` sans changer layout ni état.
- Persistance revue : `sessionStorage` (`portfolio-accent-review`).
- Présente tant que le build Pages est en mode démo temporaire ; absente du build `authentic`.
- Retrait prévu après validation Q-18.

## Explorateur de fond (temporaire)

- UI : bouton **Fond** dans le header — **mode démo uniquement** (même interaction que l’accent).
- ~25 swatches light + input couleur libre.
- Met à jour `--bg` / `--bg-deep` / `--shell-pattern` (et `theme-color`) sans changer layout ni état.
- Persistance revue : `sessionStorage` (`portfolio-bg-review`).
- Absente du build public ; retrait prévu après arbitrage de fond public.

## Défauts couleurs (provisoires)

- Fond : **Craie** (`chalk` / `#fbfbf9`) — `DEFAULT_BG_ID`.
- Accent : **Ardoise** (`slate` / `#334155`) — `DEFAULT_ACCENT_ID`.
- Sélecteurs Accent / Fond : **conservés** en mode démo jusqu’à validation définitive.
