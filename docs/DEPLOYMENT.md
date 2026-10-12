# Déploiement — GitHub Pages + Actions

Source de vérité pour la publication du portfolio.

## Architecture

| Élément | Valeur |
| ------- | ------ |
| Plateforme | GitHub Pages (Actions) |
| Dépôt | `Nicolass67/portfolio` |
| Branche production | `main` |
| Workflow | `.github/workflows/deploy.yml` |
| Déclencheur | `push` sur `main` + `workflow_dispatch` |
| Node CI | 24 (LTS aligné sur `engines`) |
| Gestionnaire | npm + `package-lock.json` (`npm ci`) |
| Sortie | `dist/` (Astro `output: "static"`) |
| URL attendue | `https://Nicolass67.github.io/portfolio/` |

## Configuration Astro

Dans `astro.config.mjs` :

- `site: "https://Nicolass67.github.io"`
- `base: "/portfolio/"` (nom du dépôt)

Les chemins publics passent par `withBase()` (`src/lib/paths.ts`).

Build Pages (temporaire) : `PUBLIC_PORTFOLIO_MODE=demo` — même catalogue / explorateurs que le localhost de revue. Repasser à `authentic` avant une vraie mise en ligne portfolio.

## Contrôles CI (obligatoires)

1. `npm ci`
2. `npm run format:check`
3. `npm run lint`
4. `npm run typecheck`
5. `npm run test` (Vitest)
6. `npm run build` (demo temporaire)
7. Vérification `dist/index.html`, `dist/en/index.html`, `dist/favicon.svg`
8. Upload artefact Pages + deploy

Les tests Playwright (`npm run test:e2e`) restent **locaux** (navigateur + durée) ; ils ne bloquent pas encore la CI.

Si le build ou un contrôle échoue, le job `deploy` ne s’exécute pas. La dernière publication réussie reste en ligne.

## Permissions workflow

- `contents: read`
- `pages: write`
- `id-token: write`

Pas de Personal Access Token dans les secrets pour Pages.

## Vérifications locales (Windows / PowerShell)

```powershell
npm ci
npm run check
$env:PUBLIC_PORTFOLIO_MODE="authentic"; npm run build
$env:PUBLIC_PORTFOLIO_MODE="demo"; npm run test:e2e
```

Prévisualiser le build avec le `base` Pages :

```powershell
npm run preview -- --host 127.0.0.1 --port 4321
# Ouvrir http://127.0.0.1:4321/portfolio/
```

## Consulter la CI

1. Ouvrir le dépôt GitHub → onglet **Actions**.
2. Sélectionner le run du commit concerné.
3. Inspecter `build` puis `deploy`.

CLI :

```powershell
gh run list --repo Nicolass67/portfolio --branch main --limit 5
gh run watch --repo Nicolass67/portfolio
gh run view <id> --repo Nicolass67/portfolio --log-failed
```

## Configurer Pages (Actions)

1. Dépôt `Nicolass67/portfolio` → **Settings** → **Pages**.
2. **Build and deployment** → **Source** = **GitHub Actions**.
3. Enregistrer.

Ou via API après le premier push du workflow (si les droits le permettent).

## Visibilité

- État actuel : dépôt **public** (accord explicite 2026-10-12) — requis pour GitHub Pages sur le plan gratuit.
- Pas de secrets, `.env`, mots de passe ni jetons dans le dépôt ; `.gitignore` exclut `.env*`.
- Contenu portfolio (nom, parcours, études) autorisé ; tout secret / credential reste interdit sans accord séparé.

## Diagnostic rapide

| Symptôme | Piste |
| -------- | ----- |
| CSS/images 404 | `base` / `withBase` incorrects |
| Workflow rouge à format/lint/types/tests | Corriger localement avec `npm run check` |
| Build OK, deploy absent | Job build en échec ou Pages non configuré en source Actions |
| Site 404 après deploy vert | Attendre la propagation ; vérifier l’URL `/portfolio/` |
| Secrets dans le dépôt | Ne jamais committer `.env*` ; révoquer le secret si exposé |
