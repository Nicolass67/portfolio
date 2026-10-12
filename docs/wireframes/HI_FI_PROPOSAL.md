# Proposition visuelle haute fidelite — D1 (A+B)

**Statut : référence de conception D1 — validée et implémentée en Mission 06.**  
**Base :** D1 Mission 04 + composition A+B validee. Pas de nouvelle variante concurrente.  
**Contenu :** faits inventaire TEL + D-017/D-018. Placeholders `[...]` = info provisoire.

Artefacts SVG (UTF-8) :

- `svg/hifi-desktop.svg` — page desktop (header → projet → chapitres → profil/contact)
- `svg/hifi-mobile.svg` — premier ecran + chapitres mobiles
- Wireframes basse fidelite : `AB_HYBRID_REFINED.md` (historique utile)

---

## Personnalite

Portfolio editorial technique : calme, precis, credibilite gameplay/Unreal. Pas de cartes SaaS, pas de neon jeu, pas de badges techno colores. Identite portee par typographie, grille asymetrique et synthese systeme.

---

## Tokens retenus (proposition)

| Token         | Valeur                   | Role                                       |
| ------------- | ------------------------ | ------------------------------------------ |
| `--surface-0` | `#F2F3F1`                | Fond page                                  |
| `--surface-1` | `#FFFFFF`                | Bloc synthese                              |
| `--ink-0`     | `#171916`                | Texte principal                            |
| `--ink-1`     | `#4A524C`                | Meta / secondaire                          |
| `--accent`    | `#0F5C4C`                | Liens, CTA, chapitre ouvert, langue active |
| `--rule`      | `#C8CDC6`                | Separateurs                                |
| `--focus`     | `#0F5C4C` + offset clair | Focus clavier 2px                          |

Contraste cible : AA corps/fond. Accent sur fond clair pour liens.

**Typos :** Source Serif 4 (titres projet) · Source Sans 3 (UI/corps) · IBM Plex Mono (meta technique).

**Echelle desktop :** display ~clamp(2–3.25rem) · H2 1.5rem · body 1.0625–1.125rem / 1.55 · meta 0.8125–0.875rem.

**Grille :** max ~1160px · rail identite ~220px · dossier reste · corps chapitre ~38rem · rythme 0.5–4rem · filets, pas de cards hero.

---

## Structure page (desktop)

1. **Header** compact : `[Nom]` · Gameplay Programmer · ancres Projets / Profil / Contact · `FR | EN` (actif souligne).
2. **Hero A+B** : rail gauche identite courte ; droite titre TEL (serif), ligne nature, bloc synthese blanc (stack, solo, kit V1), CTA « Examiner le dossier », sommaire d'inspection.
3. **Chapitres** : liste depliable sous le fold ; ferme par defaut sauf ancre ; filet accent si ouvert.
4. **Profil / contact** : apres projets ; pas de longue bio avant TEL.
5. **Pas de slot media obligatoire** ; composition stable sans capture.

## Mobile

Pile : header (nom + FR/EN + menu) → identite courte → TEL plein largeur → synthese → CTA → sommaire → chapitres → contact. Cibles >= 44px.

---

## Contenu TEL realiste (general)

- Titre : Tactical Encounter Lab
- Nature : tactical combat slice / Unreal portfolio prototype
- Stack : Unreal Engine 5.6 · C++ · GAS · State Tree
- Contribution : personal project, developed solo
- Kit V1 : sword · bow · parry · dash · focus (no player spells/mana in V1)
- Chapters (general only) : Concept · Systems · Architecture · Challenges · Learnings · Status / limits
- Pitch exact / period : `[provisional — confirm with user]`

---

## Etats

| Etat            | Traitement                     |
| --------------- | ------------------------------ |
| Lien / CTA      | accent ; hover accent-strong   |
| Focus           | anneau accent visible          |
| Chapitre ferme  | chevron `>` + titre            |
| Chapitre ouvert | filet 6px accent + `v` + corps |
| Langue active   | accent + underline             |
| Sans media      | normal (pas de trou)           |
| Reduced motion  | expand instantane              |

---

## Points de validation humaine

1. Accepter D1 (couleurs + typos) ou amender rapidement.
2. Langue par defaut (reco EN).
3. Densite synthese B acceptable.
4. Defaut chapitres fermes OK.
