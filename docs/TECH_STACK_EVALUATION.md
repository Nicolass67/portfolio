# Évaluation de la stack technique

## Statut et méthode

**Astro + TypeScript validé par l’utilisateur et implémenté en Mission 06.** Les comparaisons ci-dessous sont conservées comme justification historique ; `package.json` et le lockfile sont la vérité des versions installées.

L’environnement local dispose de Node 24.14.1 et npm 11.11.0. Le registre npm était accessible. Versions `latest` observées : Astro 7.3.8, intégration React Astro 7.0.1, React 19.3.0, Vite 8.3.4, Next 16.4.0, TypeScript 7.0.2, ESLint 10.12.0, Prettier 3.9.10, Vitest 5.0.4 et Playwright 1.64.0.

`latest` signifie ici le dist-tag npm au moment de la requête, pas une recommandation. Une divergence notable existe entre le registre et les pages de référence consultées : la documentation TypeScript décrit encore 6.0 comme version disponible/de transition vers 7, tandis que npm renvoie 7.0.2 ; certaines pages Next consultées affichent également un patch antérieur à npm. Ces écarts interdisent de déduire la maturité depuis le seul numéro le plus élevé. La version à installer devra être recontrôlée avec le générateur officiel, les release notes et les plugins compatibles après validation.

**Runtime utilisé : Node 24.14.1**, npm 11.11.0.

## Stack installée

- Astro 7.3.8, sortie statique ;
- TypeScript 6.0.2, configuration stricte ;
- aucun React, aucune bibliothèque d’animation ou d’i18n ;
- fontes OFL locales via Fontsource ;
- Vitest 5.0.4 ;
- Playwright 1.64.0 + `@axe-core/playwright` ;
- ESLint 10.12.0 sur TypeScript/config et `astro check` sur les composants Astro ;
- Prettier 3.9.10 + plugin Astro.

`npm audit` : 0 vulnérabilité au contrôle Mission 06. Une version d’`eslint-plugin-astro` a été écartée car incompatible avec Node 24.14 ; une ancienne version compatible a été retirée après audit défavorable.

## Critères prioritaires

1. HTML initial complet et métadonnées fiables.
2. JavaScript envoyé uniquement pour les interactions.
3. Bonne ergonomie pour une page statique avec îlots interactifs.
4. Modèle de contenu local, typé et validé au build.
5. Tests unitaires, E2E, visuels et accessibilité sans montage exotique.
6. Faible coût conceptuel pour les agents et l’exploitation.
7. Déploiement statique, sans backend par défaut.

## A — Astro + React + TypeScript

### Évaluation

- **Rendu initial / SEO : très adapté.** Astro génère par défaut du HTML statique ; les composants de framework sont rendus en HTML sans JavaScript client tant qu’aucune directive `client:*` n’est ajoutée.
- **JavaScript : contrôle explicite.** Hydratation par îlot (`client:load`, `idle`, `visible`, etc.). C’est un avantage direct pour une page surtout éditoriale.
- **Interactions : adaptées si localisées.** React peut porter l’index, les panneaux ou états partagés ; le reste reste en Astro/HTML/CSS.
- **Contenu : fort.** Les content collections offrent types et validation de schéma, sans CMS.
- **Complexité : modérée.** Deux modèles de composant existent (Astro et React), ce qui impose une règle claire : React seulement lorsqu’un état client le justifie.
- **Tests : bons.** Vitest fonctionne dans l’écosystème Vite ; Playwright teste le site produit comme n’importe quel site.
- **Déploiement : simple.** Sortie statique par défaut, aucun adaptateur serveur nécessaire.
- **Risque principal :** transformer trop de sections en îlots React et perdre l’avantage de l’architecture.

### Compatibilité observée

Astro 7 et `@astrojs/react` 7 déclarent Node `>=22.12.0`. Le poste en Node 24.14.1 est compatible. L’hôte de build devra offrir une version également supportée.

## B — Vite + React + TypeScript

### Évaluation

- **Rendu initial / SEO : moyen par défaut.** Une SPA React livre généralement un document shell puis rend dans le navigateur. Des métadonnées statiques peuvent exister dans `index.html`, mais un HTML de contenu complet demande du prerendering/SSR ou une discipline manuelle supplémentaire.
- **JavaScript : plus élevé par défaut.** Toute la racine React et les dépendances de l’application sont candidates au bundle client.
- **Interactions : excellent.** Modèle mental unique et souple pour un état client riche.
- **Simplicité : excellente pour une SPA, moins bonne dès qu’on ajoute SSG/SSR.**
- **Tests : excellent.** Vitest et Vite sont naturellement alignés ; Playwright reste direct.
- **Déploiement : simple** pour `dist`, avec attention aux fallbacks SPA si plusieurs routes apparaissent.
- **Risque principal :** choisir une architecture d’application cliente alors que le produit est d’abord un document statique.

### Compatibilité observée

Vite 8.3.4 et le plugin React 6.1.2 déclarent Node `^20.19.0 || >=22.12.0`. Le poste est compatible.

### Cas où Vite deviendrait préférable

Si les wireframes prouvent que presque tout le premier écran et les études de cas partagent un état client complexe, ou si le site devient une application interactive plutôt qu’un portfolio éditorial. Ce besoin n’est pas établi.

## C — Next.js + React + TypeScript

### Évaluation

- **Rendu initial / SEO : très bon.** App Router, Server Components et API de métadonnées couvrent le besoin.
- **Export statique : possible.** `output: 'export'` produit un dossier `out`, mais certaines fonctions serveur, redirections, optimisation d’image par défaut et routes dynamiques non pré-générées sont incompatibles.
- **JavaScript : maîtrisable, mais dépend des frontières client.** Une one-page très interactive peut étendre le composant client et réduire le bénéfice.
- **Interactions : excellent.**
- **Architecture : la plus lourde des trois.** Conventions serveur/client, cache, routage et fonctionnalités non utilisées augmentent la surface cognitive.
- **Tests : très bons**, mais sans avantage déterminant ici.
- **Déploiement : simple sur certains hébergeurs, portable en export statique avec limites.**
- **Risque principal :** surarchitecture et dépendance à des conventions destinées à des applications plus dynamiques.

### Compatibilité observée

Next 16.4.0 déclare Node `>=20.9.0`. La documentation Next 16 recommande React 19 et indique React 18 comme déprécié. Le poste est compatible.

### Cas où Next deviendrait préférable

Routes multiples, contenu dynamique côté serveur, prévisualisation éditoriale complexe, authentification ou API intégrée. Aucun de ces besoins n’est confirmé.

## Comparaison synthétique justifiée

Échelle qualitative : **favorable**, **acceptable**, **défavorable pour ce cas**.

- HTML/SEO : Astro favorable ; Next favorable ; Vite acceptable seulement avec ajout de prerendering ou contenu HTML manuel.
- JavaScript minimal : Astro favorable par défaut ; Next acceptable selon frontières client ; Vite défavorable si SPA intégrale.
- Interactions complexes : Vite et Next favorables ; Astro acceptable à favorable avec îlots React.
- Simplicité pour site statique : Astro favorable ; Vite favorable tant que le SEO n’exige pas de couche ; Next défavorable par excès de surface.
- Modèle de contenu : Astro favorable nativement ; Next et Vite acceptables avec schéma local à assembler.
- Agents IA : Astro favorable si la frontière Astro/React est documentée ; Vite favorable par modèle unique ; Next acceptable mais plus sensible aux conventions/version.
- Build/déploiement statique : Astro et Vite favorables ; Next acceptable avec contraintes d’export.
- Évolution vidéo/médias : équivalente ; l’optimisation explicite des formats et le chargement importent plus que le framework.
- Backend futur : Next offre plus d’intégration, mais ce n’est pas un avantage sans besoin.

## Impact conception (Missions 04–05)

Besoins réels du site : one-page éditoriale bilingue, synthèse projet, ancres, chapitres dépliables, SEO, tests, déploiement statique, **sans** SPA riche ni backend.

| Besoin                  | Astro + TS                        | Vite SPA React                      | Next export          |
| ----------------------- | --------------------------------- | ----------------------------------- | -------------------- |
| HTML/SEO bilingue       | Fort (routes locales SSG)         | Faible sans prerender               | Fort mais plus lourd |
| JS minimal              | Fort (`details` sans hydratation) | Faible par défaut                   | Moyen                |
| Chapitres + ancres      | Natif HTML suffit                 | Possible, JS plus large             | Possible             |
| Content FR/EN typé      | Content collections               | À assembler                         | À assembler          |
| Tests Playwright/Vitest | Direct sur `dist`                 | Direct                              | Direct               |
| Complexité long terme   | Modérée si React rare             | Simple modèle / mauvais fit produit | Surarchitecture      |

**Vite+React SPA** écarté pour ce produit : le site est un document, pas une app. Next n’apporte rien de requis (pas d’API, auth, ni routes dynamiques serveur).

## Décision Mission 06

**Astro + TypeScript strict. React non installé.**

Réserver `@astrojs/react` uniquement si un besoin client dépasse `<details>`, liens d’ancres et CSS (ex. synchronisation d’index complexe). Première implémentation : HTML/CSS/Astro seuls pour chapitres et i18n.

**Statut : validé et implémenté.**

Pourquoi :

- HTML initial complet, perf et SEO bilingue ;
- chapitres accessibles sans JS (`<details>`) ;
- content collections pour parité FR/EN ;
- surface cognitive plus faible qu’Astro+React dès J0 ;
- npm déjà disponible sur le poste (Node 24).

Compromis : deux modèles de composants **seulement si** React est ajouté plus tard ; discipline i18n fichiers ; versions npm à recontrôler au scaffold.

Règle : natif d’abord ; React seulement avec justification écrite dans `DECISIONS.md`.

## Outils de qualité implémentés

### Nécessaires au démarrage

- **TypeScript strict** : contrats du contenu et logique d’interaction.
- **ESLint 10 en flat config** : erreurs et règles sémantiques. ESLint 10 n’accepte plus `.eslintrc`; préférer `eslint.config.mjs` pour éviter les options expérimentales de config TypeScript.
- **Prettier 3** : formatage déterministe ; vérifier la prise en charge Astro via plugin maintenu au moment de l’installation.
- **Vitest 5** : logique pure, validation de contenu et composants interactifs ciblés. Il exige Node `>=22.12.0` et Vite `>=6.4`.
- **Testing Library** : uniquement pour tester les comportements accessibles des composants React ; pas pour reproduire les tests E2E.
- **Playwright 1.64** : E2E, clavier, viewports et captures visuelles.
- **`@axe-core/playwright`** : scans automatisés sur les états réellement ouverts ; complément, pas preuve d’accessibilité complète.

### À introduire après un premier rendu mesurable

- **Lighthouse CI** : tendances et budgets de ressources/performance ; les scores variables ne doivent pas être l’unique gate bloquante.
- **Sharp ou traitement d’image intégré** : selon le pipeline Astro retenu et les sources réelles.
- **Analyse de bundle** : seulement si le budget JavaScript est menacé.

### Redondances à éviter

- Vitest Browser Mode et Playwright ne doivent pas tester les mêmes parcours. Vitest garde les unités/composants rapides ; Playwright couvre le navigateur complet.
- Une seconde bibliothèque de composants ou de tests E2E n’est pas justifiée.
- Une cible arbitraire de couverture globale encouragerait des tests peu utiles.

## Styles, composants et animations

### Proposition

- CSS natif moderne : custom properties, cascade layers, container queries si utiles, grid et transitions.
- Composants maison, à faible API, dérivés du contenu et des besoins d’accessibilité.
- Tokens limités : couleurs sémantiques, espacements, typographie, durées et focus.
- Pas de design system préfabriqué généraliste : il ferait converger l’apparence vers des cartes et patterns génériques.

### Bibliothèques d’animation

Ne pas en installer au démarrage. CSS couvre focus, expansion légère, apparition et mouvement réduit. Évaluer une bibliothèque seulement après storyboard d’une interaction impossible à maintenir proprement en CSS (séquençage complexe, layout partagé, contrôle fin). Dans ce cas, comparer le poids, l’API d’annulation, la compatibilité avec `prefers-reduced-motion` et le nettoyage React.

### Composants accessibles

Privilégier les éléments HTML natifs. Une bibliothèque headless pourrait être retenue pour un mécanisme réellement complexe, mais pas comme kit visuel global. Vérifier d’abord si `details/summary`, boutons, ancres et régions suffisent.

## CI recommandée (non implémentée)

GitHub Actions si le dépôt est hébergé sur GitHub ; sinon utiliser le moteur du forge retenu. Pipeline minimal :

1. installation reproductible (`npm ci`) ;
2. format check, lint et typecheck ;
3. tests unitaires ;
4. build statique ;
5. E2E/a11y sur artefact servi ;
6. visuel sur environnement Linux déterministe ;
7. Lighthouse non bloquant au début, puis budgets calibrés.

## Déploiement

Le build statique rend possibles GitHub Pages, Cloudflare Pages, Netlify, Vercel ou un hébergeur d’objets/CDN. Le choix doit comparer domaine personnalisé, previews de PR, en-têtes, analytics respectueux de la vie privée, coût et portabilité. Aucun backend n’est requis.

Les vidéos futures ne changent pas ce choix : quelques clips optimisés peuvent être des fichiers statiques avec poster et chargement différé ; un volume ou trafic important justifierait un CDN/service vidéo, pas nécessairement un backend applicatif.

## Sources officielles principales

- Astro, [architecture en îlots](https://docs.astro.build/en/concepts/islands/), [directives client](https://docs.astro.build/en/reference/directives-reference/), [content collections](https://docs.astro.build/en/guides/content-collections/), [migration v7](https://docs.astro.build/en/guides/upgrade-to/v7/)
- Node.js, [calendrier des versions](https://nodejs.org/en/about/previous-releases)
- TypeScript, [notes 6.0](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
- Vite, [guide](https://vite.dev/guide/), [déploiement statique](https://vite.dev/guide/static-deploy), [annonce Vite 8](https://vite.dev/blog/announcing-vite8)
- Next.js, [installation](https://nextjs.org/docs/app/getting-started/installation), [export statique](https://nextjs.org/docs/app/guides/static-exports), [métadonnées](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- Vitest, [migration](https://vitest.dev/guide/migration/), [Browser Mode](https://vitest.dev/guide/browser/), [couverture](https://vitest.dev/guide/coverage)
- Playwright, [comparaisons visuelles](https://playwright.dev/docs/test-snapshots), [accessibilité](https://playwright.dev/docs/accessibility-testing), [trace viewer](https://playwright.dev/docs/trace-viewer)
- ESLint, [migration v10](https://eslint.org/docs/latest/use/migrate-to-10.0.0), [configuration](https://eslint.org/docs/latest/use/configure/configuration-files)
- Lighthouse CI, [configuration officielle du projet](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)

## Implications de conception appliquées

La composition A+B, le bilinguisme et la navigation hybride **renforcent** l’intérêt d’un site majoritairement statique ; elles ne valident pas Astro.

| Besoin conception                         | Implication technique proposée                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------- |
| Page éditoriale + SEO bilingue            | HTML statique par locale (`/en`, `/fr`) ; métadonnées localisées                      |
| Contenu FR/EN sans dupliquer la structure | Content collections / fichiers typés à variantes de locale                            |
| Sommaire + ancres                         | Liens HTML natifs ; pas de framework obligatoire                                      |
| Chapitres dépliables                      | `<details>`/`<summary>` ou bouton + région ; **React non requis** pour le cas de base |
| Sélecteur de langue                       | Liens vers l’autre locale (+ ancre stable) ; pas de runtime i18n payant               |
| Accessibilité / reduced motion            | CSS + sémantique ; tests Playwright/axe plus tard                                     |
| Workflow de tests                         | Inchangé : build + preview + E2E ; ajouter cas FR/EN et chapitres                     |

**Quand React serait justifié :** état partagé complexe (ex. index cinétique synchronisé, panneau non native) — **non exigé** par la spec A+B actuelle.

**Risque de sur-complexité :** i18n runtime, CMS, lib d’accordéon, animation library avant preuve de besoin.

Statut stack : **validé et installé** (D-003 / D-015 mis à jour en Mission 06).

## Points à revalider avant installation

- versions `latest` et notes de sécurité ;
- compatibilité Astro/React/TypeScript/ESLint et plugins ;
- version Node disponible en CI/hébergement ;
- traitement d’images/vidéos choisi ;
- stratégie i18n de fichiers retenue ;
- décision de stack explicite de l’utilisateur.
