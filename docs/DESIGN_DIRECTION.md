# Direction visuelle

## Statut

- Direction light Mission 10 **conservée** comme fondation (typo Syne/Outfit/Fraunces selon variante, titres forts, média large).
- Accent public : **non validé** — exploration Mission 11 (Q-18).
- Baseline sombre/verte/dashboard : **rejetée**.

## Candidats de composition (revue)

| Clé `?visual=` | Notes |
| -------------- | ----- |
| `precision` | Grille froide, cobalt |
| `immersive` | Fraunces, teal, média dominant |
| `studio` | Ivoire, outremer — **recommandé** |

## Explorateur d’accent (temporaire)

- UI : bouton **Accent** dans le header — **mode démo uniquement**.
- ~30 swatches + input couleur libre.
- Met à jour `--accent` / `--accent-soft` sans changer layout ni état.
- Persistance revue : `sessionStorage` (`portfolio-accent-review`).
- Absente du build public (`PUBLIC_PORTFOLIO_MODE=authentic` / prod par défaut).
- Retrait prévu après validation Q-18.

## Recommandation accent

**Ultramarine `#2146d6`** jusqu’à arbitrage utilisateur.
