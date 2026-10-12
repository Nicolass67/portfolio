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
- Case study : `[data-project-switch]` sur `.case-project-jump__item` (un clic → overview du projet).
- Chapitres : `[data-chapter-select]` (index distinct).

## Lightbox (`lightbox.ts`)

- Triggers : `[data-lightbox-open]` + `data-lightbox-src` / `alt` / `caption`.
- Source plein format : `MediaItem.fullSrc` si présent, sinon `src`.
- Dialog créé au runtime ; `showModal()` ; classe `html.is-lightbox-open`.
- Exclusions : YouTube, slots vidéo, thumbs galerie (changent le featured).

## Scripts client

| Script | Rôle |
| ------ | ---- |
| `workspace.ts` | Vues, projets, chapitres, rail contextuel |
| `lightbox.ts` | Modal image accessible |
| `theme.ts` | `?visual=` démo + fallback images |
| `accent.ts` | Explorateur accent |
| `interactives.ts` | Blocs démo |

## Contenu

- Mode `demo` / `authentic` via `PUBLIC_PORTFOLIO_MODE`.
- Dense démo : `demo-dense.ts` + `demo-blocks.ts`.
- Médias : `MediaFrame.astro` (+ inspect buttons).
