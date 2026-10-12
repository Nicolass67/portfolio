# Inventaire factuel — Tactical Encounter Lab

**Statut du document :** inventaire Mission 03 (2026-10-12).  
**Source opérationnelle du portfolio :** ce fichier.  
**Sources projet consultées :** dépôt local `D:\GameDev\Unreal\TacticalEncounterLab`, `README.md`, `docs/preproduction/*`, `TacticalEncounterLab.uproject`, arborescence `Source/`, inspection GitHub via `gh`.

Les documents de préproduction du dépôt jeu sont marqués historiques lorsqu’ils contredisent le `README.md` V1.

## Accès

| Élément                     | Observation                                                                                        | Statut           |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ---------------- |
| Chemin local                | `D:\GameDev\Unreal\TacticalEncounterLab\` (projet UE dans le sous-dossier `TacticalEncounterLab/`) | **Fait vérifié** |
| `.uproject`                 | `TacticalEncounterLab/TacticalEncounterLab.uproject`                                               | **Fait vérifié** |
| Association moteur          | `"EngineAssociation": "5.6"`                                                                       | **Fait vérifié** |
| Description `.uproject`     | « portfolio combat slice (GAS + State Tree) »                                                      | **Fait vérifié** |
| Dépôt Git distant           | `https://github.com/Nicolass67/TacticalEncounterLab.git`                                           | **Fait vérifié** |
| Visibilité GitHub           | **PRIVATE** (`gh repo view`)                                                                       | **Fait vérifié** |
| Git dans le dépôt portfolio | Non initialisé                                                                                     | **Fait vérifié** |

## Concept (sources projet)

**Fait vérifié (README projet) :** portfolio Unreal — slice de combat tactique (GAS + State Tree + boss). Version déclarée **1.0.0**, boucle Menu → Run (vagues) → Pause / Fin → Menu.

**Fait vérifié (project-spec, préproduction) :** laboratoire de combat en arène compacte, rencontre data-driven, kit d’abilities limité, IA lisible ; positionné comme slice de rencontre, pas jeu complet.

**Validé (utilisateur, Mission 04 / D-018) :** projet personnel **réalisé seul**. Ne pas en déduire que toutes les fonctionnalités sont terminées ou validées.

**Validé (utilisateur, Mission 04 / D-017) :** périmètre public actuel = **présentation générale** uniquement (pas de code / extraits / médias tiers sans droits vérifiés).

**À confirmer (utilisateur) :** formulation publique exacte du pitch, période, profondeur au-delà du général, et autorisation de citer le dépôt privé.

## Kit joueur V1

**Fait vérifié (README) :** kit définitif — épée, arc, parry, dash, focus. **Pas de sorts / mana joueur.**

**Fait vérifié (code) :** abilities joueur présentes sous `Source/.../Public/GAS/Abilities/Player/` :

- `GA_MeleeAttack`, `GA_BowAttack`, `GA_ParryAbility`, `GA_Dash`, `GA_Focus`

**Fait vérifié (code) :** commentaire dans `TacticalAttributeSet.h` — mana/sorts joueur abandonnés en V1 (attribut conservé à 0).

**Remplacé / historique :** la préproduction évoque déblocage feu/mana/éclair pour le joueur ; **ne pas présenter cela comme l’état V1** sans confirmation contraire.

## Technologies et plugins

**Fait vérifié (`.uproject` + `Build.cs`) :**

- Unreal Engine **5.6**
- Module runtime `TacticalEncounterLab`
- Plugins : GameplayAbilities, StateTree, GameplayStateTree, AnimationWarping, AnimationLocomotionLibrary (+ ModelingToolsEditorMode éditeur)
- Modules notables : EnhancedInput, GameplayTags/Tasks/Abilities, AIModule, NavigationSystem, StateTreeModule, GameplayStateTreeModule, UMG, Niagara, EngineCameras

## Systèmes observés dans le code (présence de fichiers)

Inventaire **structurel** (classes/fichiers existent). Cela ne prouve pas à lui seul la qualité, les performances ou le niveau de finition en jeu.

| Domaine               | Éléments observés                                                                                                          | Statut                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| GAS joueur            | Melee, Bow, Parry, Dash, Focus ; AttributeSets joueur/ennemi                                                               | **Fait vérifié** (fichiers)          |
| GAS ennemi            | Melee, Bow, ArrowRain, SpellAttack, SpellBarrage, Parry ; boss AOE / RockFall / ThrowRock                                  | **Fait vérifié** (fichiers)          |
| IA                    | `AIC_TacticalEnemy` ; tâches/conditions State Tree (chase, kite, orbit, melee, ranged, parry, stunned, boss…)              | **Fait vérifié** (fichiers)          |
| Encounter / run       | `EncounterRunSubsystem`, spawn points, `EnemyType`, rows Data (archétypes, vagues, difficulté, pickups, `RunConfig`)       | **Fait vérifié** (fichiers)          |
| Game flow             | `GameFlowSubsystem`, `TacticalGameMode`, `TacticalPlayerController`                                                        | **Fait vérifié** (fichiers)          |
| Combat feedback       | Damage numbers, hit/dash/boss camera shakes, hit-stop helpers, `CombatSlowMoSubsystem`, `CombatFeedbackSubsystem`, preload | **Fait vérifié** (fichiers + README) |
| Projectiles / pickups | Arrow (joueur/ennemi), rock, spell enemy, rock-fall warning ; pickup base/subsystem                                        | **Fait vérifié** (fichiers)          |
| UI                    | Main/Pause/Options/Credits, Combat HUD, EndRun, enemy health bar, damage number, cinematic letterbox, menu orbit camera    | **Fait vérifié** (fichiers)          |
| Audio                 | `AudioFeedbackSubsystem`                                                                                                   | **Fait vérifié** (fichier)           |
| Map                   | Contenu `L_Arena.umap` à la racine Content ; README indique `/Game/L_Arena`                                                | **Fait vérifié**                     |
| Volume source         | ~196 fichiers `.h`/`.cpp` sous le module                                                                                   | **Fait vérifié** (compte)            |

## Architecture (interprétation documentée)

**Interprétation / recommandation (docs préproduction du jeu) :** composition plutôt que logique dans le Character ; State Tree décide, GAS exécute ; UI observe ; data-driven ; un chemin dégâts via GE.

À traiter dans le portfolio comme **décisions de conception à expliquer**, après validation que le code V1 les respecte encore (non audité fichier par fichier ici).

## Preuves et médias

| Preuve                     | Observation                                                                                                                                                       | Publication                            |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Code source                | Local + GitHub privé                                                                                                                                              | **À confirmer** — dépôt privé          |
| README / docs jeu          | Présents dans le dépôt jeu                                                                                                                                        | **À confirmer** pour citation publique |
| Captures / vidéo portfolio | Aucune capture/vidéo de présentation trouvée hors assets UI internes                                                                                              | **Manquant**                           |
| Build Shipping Windows     | Dossier `Windows/` présent ; exécutable Shipping nommé dans Intermediate ; exécutable `Windows\...\TacticalEncounterLab.exe` non trouvé à ce chemin lors du check | **À confirmer**                        |
| Métriques perf             | Non mesurées dans cette mission                                                                                                                                   | **Non établi**                         |

## Contenu tiers / licences (risque publication)

**Fait vérifié (dossiers Content) :** présence de packs/noms tiers tels que Paragon* (Gideon, Greystone, Kwang, Rampage, Sparrow, Props), GoodSky, EuropeanBeech, Maxtree, Vefects, CrosshairFreePack, SueHealthBar, MSPresets, etc.

**À confirmer :** licences Epic/Fab/Marketplace et droits de capture/vidéo pour un site public. Ne pas publier de médias issus de ces assets sans revue licence.

## Contribution personnelle

**Validé (utilisateur, D-018) :** projet personnel réalisé seul.

**Fait vérifié (contexte) :** dépôt distant sous le compte `Nicolass67` (cohérent avec solo, non suffisant à lui seul avant D-018).

## Ce que le portfolio peut montrer sans médias

Dans le périmètre **présentation générale** (D-017) : fiche synthèse (nature, UE 5.6, C++, GAS, State Tree, kit V1, contribution solo), sommaire de systèmes observés, chapitres textuels de haut niveau, limites du prototype.

Hors périmètre tant que non autorisé : extraits de code, médias issus d’assets tiers, métriques non mesurées.

Ne pas inventer FPS, pourcentages, ni captures.

## Informations encore requises de l’utilisateur (priorisées)

1. Pitch public exact et période.
2. Profondeur autorisée au-delà de la présentation générale.
3. Autorisation d’ouvrir le dépôt GitHub ou de publier des extraits (si souhaité plus tard).
4. Droits de captures/vidéos et assets tiers.
5. Liste des chapitres techniques à prioriser (3 à 5).
6. Médias disponibles ou plan de production.
