# Stratégie UX

## Workspace

1. **Projets** — index + projet actif (média large + copie + blocs démo optionnels).
2. **Étude de cas** — remplace l’overview ; chapitres un à la fois ; blocs interactifs denses.
3. **Profil** — remplace le workspace projets.

Contraintes : projet 1 par défaut, pas de collapse, pas de modale de navigation, pas de changement d’URL, desktop sans scroll document, **scrollbars jamais visibles**.

## Navigation contextuelle (Mission 13)

| État | Rail gauche | Zone principale |
| ---- | ----------- | --------------- |
| Overview | Liste des 6 projets : **n° + titre uniquement** | Média + synthèse + métadonnées |
| Étude de cas | Titre du projet actif + **bandeau de saut** (n° 01–06, un clic) + index chapitres | Contenu du chapitre |
| Retour overview | Rail titres restauré | Overview du projet courant |

### Règles

- Le sidebar n’affiche ni description, ni technologies, ni sous-titres.
- En case study, le saut projet est un rang de pastilles numérotées (distinct des chapitres) — **un clic** ouvre l’overview du projet choisi (`chapterId` null, URL inchangée).
- Pas de bouton « Changer de projet », pas de seconde liste déroulante/plein écran, pas de modale de switch.

## Lightbox image

Les images inspectables (média featured, galeries, annotations, splits, expand before/after) ouvrissent un `<dialog>` plein viewport relatif, avec légende, fermeture Escape / bouton / backdrop, restauration du focus. Quand plusieurs images appartiennent au même groupe, des flèches gauche/droite, les touches ←/→ et un swipe horizontal permettent de parcourir le set avec une transition directionnelle (fondu + léger glissement) et un compteur ; le mouvement est réduit si `prefers-reduced-motion`. Sur tactile : pinch-to-zoom, pan et double-tap ; le swipe entre images reste actif à zoom 1×. Vidéo et YouTube restent hors lightbox.

## Contenu dense (démo)

Toujours fictif ; un chapitre à la fois ; divulgation progressive.

## Mobile (≤ 52.99rem)

L’expérience étroite n’est **pas** une transposition du rail desktop. Voir `docs/MOBILE_UX.md`. En bas de chaque chapitre, un CTA ouvre le **chapitre suivant** ; au dernier chapitre, le **projet suivant** (étude de cas).

- Overview : chips projets sticky + lecture verticale ; entrée étude explicite (bandeau média + CTA « Lire l’étude technique », D-035).
- Case study : barre basse (Aperçu / Chapitre / Projets) + feuilles `<dialog>` ; scroll document.
- Feuille Projets : libellé « Ouvrir l’étude » sur chaque item.
- Desktop ≥ 53rem : CTA étude renforcé aussi ; layout rail inchangé (D-030 / D-033).
