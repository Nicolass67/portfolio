# Portfolio Gameplay Programmer

Interface bilingue (FR par défaut) en workspace plein viewport : Projets, étude de cas, Profil — sans navigation d’URL.

**Stack :** Astro 7 · TypeScript · npm  
**Publication :** GitHub Pages via GitHub Actions (`main` → build → deploy)

## URL publique

Lorsque le déploiement est actif :

`https://Nicolass67.github.io/portfolio/`

Statut CI : onglet [Actions](https://github.com/Nicolass67/portfolio/actions) du dépôt.

## Modes contenu

| Mode | Usage |
| ---- | ----- |
| `demo` | Défaut en `npm run dev` — 6 projets fictifs + outils revue |
| `authentic` | Défaut en `npm run build` / CI — contenu réel (TEL) |

```powershell
$env:PUBLIC_PORTFOLIO_MODE="demo"; npm run dev
$env:PUBLIC_PORTFOLIO_MODE="authentic"; npm run build
```

En local avec le `base` Pages, ouvrir `http://127.0.0.1:4321/portfolio/`.

## Commandes

```powershell
npm ci
npm run dev
npm run check
npm run test:e2e
npm run build
npm run preview
```

## Déploiement automatique

1. Modifier le site dans Cursor.
2. Vérifier (`npm run check`, e2e si besoin).
3. Committer.
4. Pousser sur `main`.
5. GitHub Actions exécute format, lint, types, tests unitaires, build.
6. Si succès → publication GitHub Pages.
7. Consulter **Actions** en cas d’échec (aucune nouvelle version défectueuse n’est publiée).

Détail : [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Fichiers clés

- `src/components/ProjectWorkspace.astro` — workspace
- `.github/workflows/deploy.yml` — CI/CD
- `astro.config.mjs` — `site` / `base` Pages
- `artifacts/screenshots/` — captures

Docs : [DOCUMENTATION_MAP](docs/DOCUMENTATION_MAP.md).
