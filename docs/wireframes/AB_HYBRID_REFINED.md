# Wireframes affinés — hybride A+B

**Statut : référence basse fidélité historique — l’interface Mission 06 est la source opérationnelle.**  
**Composition validée et implémentée :** A+B (D-014).  
**Périmètre contenu :** présentation générale TEL (D-017) ; contribution solo (D-018).  
**Libellés `[…]` :** placeholders non inventés (identité personnelle, contact).

Les variantes A/B/C de `FIRST_SCREEN_VARIANTS.md` restent **historiques**.

Fichiers SVG (statiques) :

| Fichier                            | Contenu                    |
| ---------------------------------- | -------------------------- |
| `svg/desktop-first-screen.svg`     | Premier écran desktop      |
| `svg/mobile-first-screen.svg`      | Premier écran mobile       |
| `svg/desktop-technical-access.svg` | Accès sommaire / chapitres |
| `svg/desktop-chapter-expanded.svg` | Un chapitre déplié         |
| `svg/language-selector.svg`        | Sélecteur de langue        |
| `svg/bilingual-structure.svg`      | Structure contenu bilingue |

---

## 1. Premier écran desktop (A+B)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ [Nom]  Gameplay Programmer          Projets  Profil  Contact   FR│EN* │
├────────────┬───────────────────────────────────────────────────────────┤
│            │  01                                                     │
│  [Nom]     │  Tactical Encounter Lab                                 │
│  Gameplay  │  Slice de combat tactique — présentation générale       │
│  Programmer│                                                         │
│            │  UE 5.6 · C++ · GAS · State Tree                        │
│  [1 ligne  │  Projet personnel · réalisé seul                        │
│  position] │  Kit V1 : épée · arc · parry · dash · focus             │
│            │                                                         │
│            │  [ Examiner le dossier ]    Systèmes ↓                  │
│            │                                                         │
│            │  Sommaire d’inspection                                  │
│            │  01 Concept    02 Systèmes    03 Architecture           │
│            │  04 Défis      05 Apprentissages    06 État / limites   │
└────────────┴───────────────────────────────────────────────────────────┘
* EN = exemple si défaut EN ; actif = poids + aria-current
```

- **De A :** rail identité, titre display, respiration, pas de carte.
- **De B :** ligne stack + solo + kit + sommaire scannable.
- **Sans média** dans le viewport principal.

---

## 2. Premier écran mobile

```text
┌─────────────────────────────┐
│ [Nom] · GP        FR│EN  ≡  │
├─────────────────────────────┤
│ [Nom]                       │
│ Gameplay Programmer         │
│ [1 ligne positionnement]    │
├─────────────────────────────┤
│ 01                          │
│ Tactical Encounter Lab      │
│ Slice combat tactique       │
│                             │
│ UE 5.6 · C++ · GAS · …      │
│ Solo · kit V1 listé         │
│                             │
│ [ Examiner le dossier ]     │
│                             │
│ Sommaire                    │
│ · Concept                   │
│ · Systèmes                  │
│ · Architecture              │
│ · …                         │
└─────────────────────────────┘
```

---

## 3. Accès au contenu technique (desktop)

Sous le fold du premier écran : chapitres en liste, titres = contrôles dépliables, filets séparateurs. Sommaire peut rester visible (sticky optionnel desktop — **proposé**, non imposé).

---

## 4. Chapitre déplié (exemple)

```text
▶ 01 Concept et objectifs          (fermé)
▼ 02 Systèmes de gameplay          (ouvert — filet accent)
    Texte de présentation générale…
    · GAS joueur / ennemi (niveau descriptif)
    · IA State Tree
    · Encounter / run data-driven
    Pas d’extrait de code (D-017)
▶ 03 Architecture et choix…
```

---

## 5. Sélecteur de langue

En-tête droite : `FR` | `EN` — langue active soulignée ou en accent ; liens vers locale + ancre courante si possible.

---

## 6. Exemple de structure bilingue (contenu)

```text
Project id: tactical-encounter-lab
technologies: [UE 5.6, C++, GAS, State Tree]   ← partagé
teamContext: solo                              ← partagé (D-018)
publicationScope: general-presentation         ← partagé (D-017)

title.fr: "Tactical Encounter Lab"
title.en: "Tactical Encounter Lab"
shortDescription.fr: "Slice de combat tactique…"
shortDescription.en: "Tactical combat slice…"
chapters[].id: "systems"                       ← ancre stable
chapters[].title.fr / .en                      ← libellés localisés
```

---

## 7. État

La Mission 06 a implémenté D1, le français par défaut et les chapitres fermés. Les écarts éventuels se jugent désormais dans l’application réelle.
