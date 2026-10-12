# Architecture technique

## Shell

`app-shell` → header (+ explorateur accent si démo) + `ProjectWorkspace`.

Desktop ≥53rem : `100dvh`, overflow document masqué. Mobile : scroll OK.  
Scrollbars masquées globalement (`scrollbar-width: none` + `::-webkit-scrollbar`).

## État (`workspace.ts`)

| Champ | Valeurs |
| ----- | ------- |
| `view` | `projects` \| `profile` |
| `projectId` | toujours défini |
| `projectMode` | `overview` \| `case-study` |
| `chapterId` | `string \| null` |

Persistance : `sessionStorage`. Pas de `pushState` / hash.

### Navigation (Mission 13)

- Overview : `[data-project-select]` (titres seuls).
- Case study (desktop) : libellé « Projets » + pastilles `[data-project-switch]` **au-dessus** du titre du projet actif, puis index chapitres.
- Pastilles : un clic → étude de cas du projet cible (premier chapitre).
- Retour « Tous les projets » : `[data-close-case-study]` dans `.workspace-toolbar` (haut droite, même rangée que le bandeau démo) → overview.
- Chapitres : `[data-chapter-select]` (index distinct).

## Lightbox (`lightbox.ts`)

- Triggers : `[data-lightbox-open]` + `data-lightbox-src` / `alt` / `caption`.
- Source plein format : `MediaItem.fullSrc` si présent, sinon `src`.
- Dialog créé au runtime ; `showModal()` ; focus sur le `<dialog>` (pas la croix — évite la sélection iOS) ; classe `html.is-lightbox-open`.
- Groupes multi-images : `[data-lightbox-group]`, `.media-frame__gallery`, ou thumbs `[data-gallery-select]` — flèches, clavier (←/→), swipe, compteur, crossfade directionnel (respect `prefers-reduced-motion`).
- Zoom tactile : pinch + pan + double-tap sur `[data-lightbox-zoom]` ; swipe/flèches désactivés tant que zoomé ; reset au changement d’image / fermeture.
- Exclusions : YouTube, slots vidéo, thumbs galerie (changent le featured).

## Scripts client

| Script | Rôle |
| ------ | ---- |
| `workspace.ts` | Vues, projets, chapitres, rail contextuel |
| `lightbox.ts` | Modal image accessible |
| `theme.ts` | `?visual=` démo + fallback images |
| `accent.ts` | Explorateur accent |
| `background.ts` | Explorateur fond |
| `mobile.css` | UX mobile dédiée (≤ 52.99rem) ; barre case + feuilles |
| `interactives.ts` | Blocs démo |

## Contenu

- Mode `demo` / `authentic` via `PUBLIC_PORTFOLIO_MODE`.
- Dense démo : `demo-dense.ts` + `demo-blocks.ts`.
- Médias : `MediaFrame.astro` (+ inspect buttons).
