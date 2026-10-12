# Stratégie de tests

## Mission 13

- `npm run check` — format, lint, types, unit, build
- `npm run test:e2e` — sidebar titres seuls, jump projet 1 clic, lightbox, scrollbars masquées, overflow, axe, screenshots
- Sidebar : pas de meta/tech dans le rail overview
- Case study : 6 pastilles `[data-project-switch]` ; plus de picker toggle
- Lightbox : ouverture, Escape, close, backdrop, focus restore ; vidéo n’ouvre pas la lightbox
- Scrollbars : `scrollbar-width: none` sur régions concernées
