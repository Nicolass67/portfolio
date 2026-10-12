# Plan d'implementation

**Statut Mission 06 :** J0 à J10 réalisés pour la première version locale ; J11 publication reste ouverte.  
**Principe :** jalons petits, verifiables ; pas d'abstraction sans besoin ; contenu general TEL (D-017).

## Pré-requis (résolus en Mission 06)

| Prealable                                                          | Statut                                                           |
| ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Composition A+B, bilingue, solo, nav hybride, publication generale | Valide                                                           |
| Direction visuelle D1                                              | **Validée et implémentée**                                       |
| Stack Astro + TypeScript (sans React)                              | **Validée et implémentée**                                       |
| Langue par défaut                                                  | **Français sur `/`**, anglais complet sur `/en/`                 |
| Pitch / profondeur / medias                                        | Peuvent avancer avec placeholders provisoires et contenu general |

---

## J0 — Setup projet et outillage

- **Livrable :** depot Git initialise ; scaffold Astro + TS ; npm lockfile ; scripts `dev` `build` `preview` `check` ; ESLint/Prettier ; structure dossiers minimale (`src/pages`, `src/styles`, `src/content`, `tests`).
- **Validation :** `npm run build` OK ; preview sert une page HTML ; pas de React tant que non necessaire.
- **Avant suite :** build vert.

## J1 — Tokens et typographie

- **Livrable :** CSS variables D1 ; polices self-host ou chargement documente ; styles de base `html/body` ; focus visible.
- **Validation :** page tokens de demo ou home vide avec echelles ; contraste AA sur paires principales (outil ou revue).
- **Avant suite :** tokens stables, pas de refonte palette en cours de route sans decision.

## J2 — Structure de page responsive

- **Livrable :** layout header + hero A+B + zones chapitres + footer ; breakpoints mobile/desktop ; sans contenu invente.
- **Validation :** preview desktop + mobile (viewport) ; hierarchie lisible sans media.
- **Avant suite :** composition A+B reconnaissable.

## J3 — Contenu bilingue et selecteur

- **Livrable :** collections/contenu FR+EN ; routes ou prefixes `/en` `/fr` ; selecteur ; une langue par page ; ancres stables.
- **Validation :** switch conserve section si possible ; meta title/description localises ; build echoue si locale publiee incomplete (garde-fou minimal).
- **Avant suite :** defaut de langue applique selon arbitrage.

## J4 — Synthese TEL

- **Livrable :** bloc projet featured avec faits inventaire + solo + kit V1 ; CTA vers dossier ; pas de code/media non autorises.
- **Validation :** relecture contre `TACTICAL_ENCOUNTER_LAB.md` ; aucun fait invente.
- **Avant suite :** textes provisoires marques si pitch non final.

## J5 — Sommaire + chapitres depliables

- **Livrable :** sommaire ancres ; chapitres `<details>` (ou equivalent accessible) ; defaut ferme + open si hash ; scroll-padding.
- **Validation :** clavier Enter/Espace ; `prefers-reduced-motion` ; sans JS si details natif ; deep-link.
- **Avant suite :** React non introduit sauf ecart prouve.

## J6 — Autres projets + profil/contact

- **Livrable :** section autres projets absente ou vide honnete ; profil/contact avec seuls champs approuves (placeholders internes sinon).
- **Validation :** projets restent avant bio ; pas de fausse liste de projets.
- **Avant suite :** coordonnees publiees seulement si Q-09 OK.

## J7 — Accessibilite et clavier

- **Livrable :** ordre de focus ; skip link si utile ; headings ; contrastes ; labels langue.
- **Validation :** parcours clavier manuel + axe (Playwright) sur parcours principal.
- **Avant suite :** zero violation critique ouverte sans justification.

## J8 — Tests automatises

- **Livrable :** Vitest (contenu/ancres) ; Playwright (nav, langue, chapitre, a11y smoke).
- **Validation :** CI locale ou scripts verts sur build preview.
- **Avant suite :** tests du parcours principal verts.

## J9 — Revue visuelle navigateur

- **Livrable :** captures desktop/mobile FR+EN ; notes ecarts vs `HI_FI_PROPOSAL.md`.
- **Validation :** inspection reelle (Cursor browser et/ou Playwright) — **declaree seulement si executee**.
- **Avant suite :** ecarts bloquants corriges.

## J10 — Performance et SEO

- **Livrable :** meta/OG de base ; `hreflang` ; Lighthouse CI ou run manuel calibre ; poids polices/JS.
- **Validation :** HTML complet indexable ; pas de JS inutile sur hero ; budgets initiaux documentes.
- **Avant suite :** pas de regression perf majeure.

## J11 — Contenu final et publication

- **Livrable :** textes finaux FR/EN dans le perimetre D-017 ; checklist publication ; hebergement selon Q-10.
- **Validation :** revue humaine contenu + droits ; ZIP release si workflow le demande.
- **Avant suite :** go explicite utilisateur pour mise en ligne.

---

## Hors scope jusqu'a besoin demontre

CMS, backend, lib d'animation, design system npm, React global, traduction runtime, faux medias.
