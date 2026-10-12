# Wireframes basse fidélité — premier écran (historique Mission 03)

**Statut :** **historique** — l’arbitrage utilisateur (Mission 04 / D-014) retient l’**hybride A+B**.  
**Suite opérationnelle :** `docs/wireframes/AB_HYBRID_REFINED.md` (+ SVG).  
**Base réelle :** inventaire `docs/projects/TACTICAL_ENCOUNTER_LAB.md` + brief produit.  
**Libellés `[…]` :** placeholders non inventés (identité, contact, etc.).

Ce fichier conserve les variantes A/B/C pour traçabilité ; ne plus les traiter comme options ouvertes.

Principe commun aux trois variantes :

- Projet principal visible immédiatement.
- Fonctionne **sans média** (emplacement média optionnel ou absent).
- One-page : détail technique dans la page, pas de nouvelle route obligatoire.
- Extensible à d’autres projets via un index discret (un seul projet aujourd’hui).

---

## Variante A — Dossier éditorial typographique

### Principe

Composition asymétrique : colonne identité étroite + grand dossier projet. Le projet se lit comme la couverture d’un dossier technique.

### Desktop (schéma)

```text
┌──────────────────────────────────────────────────────────────┐
│ [Nom] · Gameplay Programmer              Projets · Profil · Contact │
├──────────────┬───────────────────────────────────────────────┤
│              │  01 / Tactical Encounter Lab                  │
│  [Nom]       │  Slice de combat tactique · UE 5.6 · C++/GAS  │
│  Gameplay    │                                               │
│  Programmer  │  Kit V1 : épée · arc · parry · dash · focus   │
│              │  IA State Tree · rencontres data-driven       │
│  [1 ligne]   │                                               │
│              │  [ Examiner le dossier ]  [ Systèmes ]        │
│              │                                               │
│              │  Sommaire d’inspection                        │
│              │  · GAS joueur/ennemi                          │
│              │  · State Tree / archétypes                    │
│              │  · Encounter run                              │
│              │  · Feedback combat                            │
│              │  · Décisions & limites                        │
└──────────────┴───────────────────────────────────────────────┘
   ↓ scroll : chapitres dépliables / ancrés, puis profil
```

### Mobile

```text
┌─────────────────────┐
│ [Nom] · GP     Menu │
│ Tactical Encounter… │
│ UE5.6 · GAS · ST    │
│ Kit V1 (chips)      │
│ [ Examiner ]        │
│ Sommaire            │
│ · …                 │
└─────────────────────┘
```

### Détail technique

Sommaire ancré + chapitres `details`/accordéons dans le flux. URL optionnelle `#gas`, `#ai`.

### Avantages / risques

- Avantages : crédible sans média ; hiérarchie claire ; aligné « dossier technique éditorial ».
- Risques : austérité ; exige une rédaction précise.
- Mobile : pile naturelle ; sommaire en liste.
- Futurs projets : index sous le dossier principal.
- Médias : non requis ; un schéma peut s’insérer dans un chapitre plus tard.
- Distinctif : typographie + sommaire d’inspection, pas de carte média dominante.

---

## Variante B — Fiche système / lab sheet

### Principe

Le premier écran est une **fiche technique dense** : métadonnées, kit, systèmes, preuves. Sensation « lab notebook / inspect panel » maîtrisée, sans cliché terminal.

### Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ [Nom]  Gameplay Programmer · Unreal / C++     Contact · CV   │
├──────────────────────────────────────────────────────────────┤
│ TACTICAL ENCOUNTER LAB                         Status V1.0.0 │
│ Portfolio combat slice                                         │
├────────────────────────────┬─────────────────────────────────┤
│ META                       │  SYSTEMS (étiquettes)           │
│ Engine   UE 5.6            │  GAS · State Tree · Encounter   │
│ Lang     C++               │  Combat feedback · UI · Audio   │
│ Focus    GAS + AI          │                                 │
│ Loop     Menu→Waves→End    │  PLAYER KIT                     │
│ Map      L_Arena           │  Melee · Bow · Parry · Dash     │
│                            │  Focus                          │
│ EVIDENCE                   │  (no player spells/mana — V1)   │
│ Code     [si autorisé]     │                                 │
│ Media    — pending —       │  [ Open systems dossier ]       │
│ Repo     private / TBD     │                                 │
└────────────────────────────┴─────────────────────────────────┘
```

### Mobile

```text
┌─────────────────────┐
│ [Nom] · Contact     │
│ TEL · V1.0.0        │
│ Meta (liste)        │
│ Kit (liste)         │
│ Systems (chips)     │
│ Evidence: pending   │
│ [ Open dossier ]    │
└─────────────────────┘
```

### Détail technique

La fiche reste visible ; « Open systems dossier » développe des panneaux sous la fiche (ou scroll vers sections). Favorise la scanabilité recruteur technique.

### Avantages / risques

- Avantages : très rapide pour un lead ; honnête sur preuves absentes ; data-driven.
- Risques : froideur ; surcharge si trop de champs ; dérive « HUD » si stylisation excessive.
- Mobile : listes empilées ; chips pour systèmes.
- Futurs projets : nouvelles fiches dans un index.
- Médias : champ Evidence explicite « pending » sans fake.
- Distinctif : densité informative contrôlée vs A plus littéraire.

---

## Variante C — Ancre visuelle + média optionnel

### Principe

Grand plan de composition à droite (ou dessous) réservé à un **média futur** ; à gauche (ou au-dessus) le même contenu projet. Sans média : le plan devient un **diagramme placeholder structurel** (blocs nommés GAS / AI / Encounter) — pas une capture inventée.

### Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ [Nom] · Gameplay Programmer              Projets · Profil    │
├────────────────────────────┬─────────────────────────────────┤
│ Tactical Encounter Lab     │  ┌───────────────────────────┐  │
│ Combat slice · UE 5.6      │  │  MEDIA OR DIAGRAM SLOT    │  │
│                            │  │  empty → system map:      │  │
│ Lire · décider · exécuter  │  │  [GAS] [StateTree] [Run]  │  │
│ (State Tree → GAS)         │  │  (no fake gameplay shot)  │  │
│                            │  └───────────────────────────┘  │
│ [ Voir systèmes ]          │                                 │
│ [ Profil ]                 │                                 │
└────────────────────────────┴─────────────────────────────────┘
```

### Mobile

```text
┌─────────────────────┐
│ [Nom]               │
│ TEL title + pitch   │
│ [diagramme compact] │
│ CTA systèmes        │
└─────────────────────┘
```

### Détail technique

CTA mène à une section ancrée ; expansion progressive sous le fold. Le slot média accepte vidéo/capture plus tard sans changer la grille.

### Avantages / risques

- Avantages : évolutif média ; impact visuel ; réserve l’espace honnêtement.
- Risques : moitié d’écran « vide » perçue ; tentation de fake screenshot ; JS pour diagramme interactif non nécessaire au départ (SVG/statique OK).
- Mobile : diagramme sous le titre.
- Futurs projets : même template avec slot média.
- Médias : conçue pour ; viable sans.
- Distinctif : plan média/diagramme vs A/B purement textuels.

---

## Mécanismes d’expansion — comparaison

| Option                             | A   | B   | C   | Accessibilité | Partage   | Mobile    |
| ---------------------------------- | --- | --- | --- | ------------- | --------- | --------- |
| Accordéon / `details` dans le flux | ●   | ●   | ○   | Bon natif     | Moyen     | Bon       |
| Sommaire + ancres                  | ●   | ○   | ●   | Excellent     | Bon (`#`) | Bon       |
| Panneau latéral                    | ○   | ○   | ○   | Risqué focus  | Moyen     | Difficile |
| Page séparée                       | ○   | ○   | ○   | Simple        | Excellent | OK        | Contredit one-page prioritaire |

**Recommandation proposée (non validée) :** hybride sommaire + ancres + chapitres `details` dans le flux (proche A, utilisable aussi après B/C). Éviter panneau latéral comme seul accès.

## Compatibilité stack (rappel)

Les trois variantes restent majoritairement documentaires/statiques. React n’est requis que si l’état d’expansion partagé / synchronisation sommaire dépasse HTML natif. Cela **renforce** la proposition Astro + îlots, sans la valider.

## Arbitrage demandé

Choisir une variante (ou hybride A+B / A+C) pour la direction visuelle suivante, puis valider langue et contenu publiable TEL.
