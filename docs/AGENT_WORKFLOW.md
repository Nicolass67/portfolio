# Workflow des agents et capacités Cursor

## Portée

Ce document relie la documentation officielle Cursor consultée le 12 octobre 2026 aux capacités réellement observées dans cette session. « Disponible dans le produit » ne signifie pas « testé localement ».

## Audit Cursor local

### Version et agent principal

- **Documentation officielle :** l’agent combine instructions, outils et modèle ; il peut rechercher, modifier des fichiers, exécuter le terminal et contrôler un navigateur. Les notes de publication consultées indiquent Cursor Desktop `3.23` comme version produit la plus récente visible. Sources : [Cursor Agent](https://cursor.com/docs/agent/overview) et [Release Notes](https://cursor.com/docs/release-notes).
- **Vérifié ici :** CLI Cursor `3.20.0`, commit `4c0fe9acf024d051c47ffe28c48918ef6835f370`, x64. L’agent principal a lu/recherché, lancé des commandes, fait des recherches web et créé des fichiers Markdown.
- **Limites :** le poste est donc en retrait de la version documentaire observée. Le numéro CLI n’établit pas à lui seul la disponibilité de toutes les fonctions ; modèle, forfait et politiques du compte/workspace peuvent aussi restreindre des outils.
- **Impact :** consigner les actions réellement exécutées (et le ZIP de revue), jamais la capacité théorique.
- **Repli :** commandes locales et procédures manuelles documentées.

### Règles et instructions persistantes

- **Documentation officielle :** `AGENTS.md` à la racine ou dans des sous-dossiers ; les fichiers imbriqués s’appliquent à leur arbre. Les Project Rules sont des `.mdc` dans `.cursor/rules` avec métadonnées et portée. Source : [Rules](https://cursor.com/docs/rules).
- **Vérifié ici :** aucun fichier d’instruction n’existait initialement. Le présent dépôt utilise maintenant `AGENTS.md`.
- **Limites :** des règles trop longues ou dupliquées peuvent diverger ; un `.md` simple dans `.cursor/rules` est ignoré par le système de Project Rules.
- **Impact :** conserver les principes globaux dans `AGENTS.md`; créer une `.mdc` uniquement pour une contrainte ciblée.
- **Repli :** lecture explicite des documents au début de la tâche.

### Sous-agents

- **Documentation officielle :** sous-agents intégrés Explore et Browser ; agents personnalisés possibles dans `.cursor/agents/`. Chaque sous-agent possède sa propre fenêtre de contexte et peut fonctionner au premier plan ou en arrière-plan. Source : [Subagents](https://cursor.com/docs/subagents).
- **Vérifié ici :** l’outil de sous-agent est disponible ; trois recherches spécialisées ont été lancées en arrière-plan avec des contextes explicitement fournis et ont rendu des synthèses sans modifier les fichiers.
- **Limites :** un sous-agent ne connaît pas automatiquement la conversation ni toutes les décisions. Les lancements imbriqués et permissions dépendent du mode/politiques. Aucun plafond numérique général de parallélisme local n’est publié ; coût en tokens, mémoire et checkout partagé limitent la pratique. Les modifications concurrentes d’un même fichier créent des conflits.
- **Impact :** déléguer recherche ou inspection isolée ; un responsable unique intègre les résultats.
- **Repli :** recherche séquentielle par l’agent principal.

### Hooks et automatisations

- **Documentation officielle :** hooks projet dans `.cursor/hooks.json` ou utilisateur, exécutés à différents événements de session, outils, shell, MCP, fichiers et sous-agents ; communication JSON sur stdio. Les Automations déclenchent des Cloud Agents selon calendrier ou événements externes. Sources : [Hooks](https://cursor.com/docs/hooks) et [Automations](https://cursor.com/docs/cloud-agent/automations).
- **Vérifié ici :** capacités documentées, mais aucun hook ni Automation n’a été créé ou exécuté dans ce dossier.
- **Limites :** un hook peut bloquer une action, dépend du poste et augmente la surface de maintenance/sécurité. Les Automations requièrent dépôt, authentification, environnement Cloud Agent et facturation adaptés.
- **Impact :** ne pas automatiser avant que les commandes qualité soient stables. Un futur hook pourrait rappeler l’export ZIP, mais ne doit pas simuler les résultats.
- **Repli :** checklist `AGENTS.md` et `QUALITY_GATES.md`.

### Terminal

- **Documentation officielle :** l’agent peut exécuter des commandes terminal selon les autorisations. Source : [Cursor Agent](https://cursor.com/docs/agent/overview).
- **Vérifié ici :** PowerShell 5.1, exécution persistante dans le workspace, Git/Node/npm/gh/Docker accessibles. Accès au registre npm confirmé par `npm ping`.
- **Limites :** pnpm, Yarn et Bun absents ; la commande `python` pointe vers un alias non fonctionnel, tandis que `py` lance Python 3.13.15. Aucun serveur local n’a été lancé pendant le cadrage.
- **Impact :** npm est le gestionnaire immédiatement utilisable ; les futurs scripts doivent être Windows-safe et exécutés en CI Linux.
- **Repli :** utiliser npm et Node ; documenter toute installation nécessaire avant de la faire.

### Navigateur intégré

- **Documentation officielle :** webview sécurisé contrôlé via MCP, avec navigation et interactions soumises aux politiques allow/block et, en entreprise, aux origines autorisées. Source : [Browser](https://cursor.com/docs/agent/browser).
- **Vérifié ici :** namespace navigateur prêt ; création/liste d’onglet, navigation vers `https://cursor.com/docs`, snapshot d’accessibilité, capture PNG, clic sémantique et appel CDP ont été exécutés. La page et son titre ont été observés.
- **Limites observées :** une première navigation a laissé `about:blank` avant un second essai réussi ; un ref de clic est devenu obsolète et a nécessité un nouveau snapshot ; le clic testé a reçu le focus mais n’a pas changé l’URL, avec un panneau de cookies présent. `Performance.getMetrics` a répondu avec une liste vide, donc aucune métrique n’a été validée.
- **Non testé (ne pas présenter comme confirmé) :** saisie, glisser-déposer, redimensionnement viewport, lecture effective des logs console, interception/analyse réseau, parcours complets sur une app locale.
- **Impact :** le navigateur est une voie viable pour l’inspection future, avec snapshots frais et captures comme preuves. Les contrôles console/réseau/viewport devront être **re-vérifiés** sur la première interface réelle.
- **Repli :** Playwright (interactions, console, réseau, viewports, traces, screenshots déterministes) en complément ou si Cursor Browser est insuffisant.

### Console, réseau et débogage

- **Documentation officielle / outils exposés :** Cursor documente console, erreurs JS et trafic HTTP ; CDP local peut cibler Runtime/DOM/CSS/Log/Network/Performance/Profiler dans les limites de sécurité ; Playwright Trace Viewer couvre actions, DOM, console et réseau.
- **Vérifié ici :** un appel CDP `Performance.getMetrics` a été accepté mais a renvoyé une liste vide — **aucune métrique utile validée**. Console et réseau **non inspectés**.
- **Limites :** méthodes CDP sensibles bloquées ; iframes inaccessibles dans cet environnement navigateur.
- **Impact :** jusqu’à test sur interface réelle, traiter console/réseau Cursor comme **documentés non confirmés**. CI Playwright reste le repli reproductible.
- **Repli :** traces Playwright, journaux serveur, artefacts de test.

### Contrôles à exécuter dès la première interface

1. Navigation locale vers `preview` / `dev`.
2. Snapshot + capture desktop et mobile (redimensionnement ou viewports Playwright).
3. Ouverture d’un chapitre / accordéon au clavier.
4. Lecture console et requêtes réseau (Cursor Browser **ou** Playwright — noter lequel a réussi).
5. Comparer aux critères `TEST_STRATEGY.md` / `QUALITY_GATES.md`.

## Environnement local observé

- Windows `10.0.26200`, x64.
- PowerShell `5.1.26100.9549`.
- Node `24.14.1`, npm `11.11.0`, Corepack `0.34.6`.
- Git `2.47.0.windows.2`.
- Deno `2.8.0`.
- Python via launcher `3.13.15`.
- GitHub CLI `2.96.0`.
- Docker `29.4.1`.
- Aucun dépôt Git au début de la mission.
- Aucun fichier détecté au début de la mission.
- Réseau vérifié vers npm et documentation web.

Les capacités d’ouverture de port et les navigateurs Playwright installés ne sont pas testés. Node rend un serveur local techniquement plausible, mais il faudra le vérifier après initialisation.

## Procédure avant tâche

1. Lire `AGENTS.md`, `PROGRESS`, `DECISIONS`, `DOCUMENTATION_MAP` et le document métier de référence.
2. Vérifier si une décision existe déjà avant d’en proposer une nouvelle.
3. Vérifier état Git et fichiers concernés.
4. Reformuler le livrable et les non-objectifs.
5. Identifier les contrôles applicables.
6. Rechercher les faits changeants dans les sources officielles.
7. Si un sous-agent est utile, lui fournir contexte, format de sortie et interdiction d’écrire si recherche seulement.

## Pendant la tâche

- Un seul agent est propriétaire des fichiers en écriture.
- Les sous-agents spécialisés travaillent sur des sujets disjoints.
- Chaque résultat est relu pour sources, date, contradictions et portée.
- Une erreur d’outil déclenche au maximum une relance fondée sur une nouvelle observation ; éviter les boucles.
- Une permission, connexion ou captcha bloquant est rapporté et laissé à l’utilisateur.
- Les décisions structurelles proposées sont enregistrées sans passer à « validé ».

## Procédure de contrôle et correction

1. Lancer les contrôles les plus proches du changement.
2. Démarrer le build/preview si l’application existe.
3. Attendre la disponibilité par polling.
4. Inspecter navigateur, console, réseau et captures.
5. Corriger une cause à la fois.
6. Relancer le test en échec et les gates associés.
7. Examiner le diff et les documents affectés.
8. Pour une mission substantielle, produire et vérifier l’archive ZIP de transmission.

## Fin de mission substantielle — archive ZIP

### Quand produire l’archive

Produire un ZIP à la fin d’une mission substantielle : cadrage, recherche, décision d’architecture ou de direction artistique, conception, implémentation fonctionnelle, modification majeure d’architecture, tests/audit, correction significative, revue ou préparation à la publication. Une série de petites modifications appartenant à la même mission donne une seule archive. Une modification mineure isolée n’exige pas d’archive. Une interruption ou un blocage nécessitant une revue humaine peut produire une archive intermédiaire explicitement incomplète.

### Contenu attendu

Inclure, lorsqu’ils existent :

- `AGENTS.md` et `README.md` ;
- le contenu pertinent de `docs/` (brief produit, UX, design, stack, architecture, tests, workflow, modèle de contenu, qualité, décisions, roadmap, questions, progression) ;
- schémas ou références de conception utiles et non sensibles ;
- **captures de référence actuelles** sous `artifacts/screenshots/` (site réel, pas wireframes) ;
- fichiers applicatifs pertinents et raisonnablement volumineux lorsque utiles à la revue ;
- un `REVIEW_README.md` généré à la racine de l’archive uniquement, indexant la revue sans devenir une source de vérité du dépôt.

Ne pas inclure `node_modules/`, caches, builds volumineux, `.git/`, secrets, jetons, identifiants ni fichiers privés non nécessaires. Ne pas créer `LAST_ACTION_REPORT.md` dans l’archive ni dans le dépôt.

### Captures de référence (workflow)

- Dossier stable : `artifacts/screenshots/`
- Régénérer via `npx playwright test tests/e2e/screenshots.spec.ts` après tout changement d’apparence ou d’état d’interaction.
- Mission 10+ : variantes `variant-*` utiles pour la comparaison DA ; Mission 12+ : capturer aussi nav case, project switcher, chapitres denses et switch projet→étude de cas (D-033).
- Inspecter chaque PNG à pleine taille avant livraison ; ne pas conserver une capture obsolète (ex. ancienne nav compacte double-liste).
- Le ZIP de revue d’une mission UI doit contenir les PNG à jour ; documenter l’inventaire dans `REVIEW_README.md`.

### Emplacement et nommage

- Répertoire : `artifacts/reviews/`
- Nom : `portfolio-review-YYYYMMDD-HHMM.zip`
- Horodatage : heure réelle de l’environnement ; ne pas inventer la date
- Chaque mission substantielle produit un nouvel instantané ; ne pas écraser une archive précédente sauf demande explicite de l’utilisateur
- Ne laisser aucun fichier de staging, copie redondante ou intermédiaire dans `artifacts/reviews/`

### `REVIEW_README.md` (dans le ZIP seulement)

Générer à partir de l’état réel : objectif du portfolio, phase actuelle, périmètre de la dernière mission, documents à lire en priorité, décisions validées, recommandations en attente, problèmes connus, questions ouvertes, prochaine étape proposée et limites de l’archive. Ne pas dupliquer inutilement les documents permanents.

### Vérifications obligatoires après compression

1. Le fichier ZIP existe.
2. L’archive s’ouvre.
3. Son contenu est listé.
4. Les documents attendus sont présents.
5. Aucun secret, chemin inattendu ou fichier volumineux inutile n’est inclus.
6. La structure documentaire reste compréhensible.
7. Les absences éventuelles sont signalées avec leur cause.
8. Le chemin exact et la taille sont communiqués à l’utilisateur.

Ne jamais déclarer l’export réussi sans ces contrôles. En cas d’échec, corriger ou signaler clairement que l’archive n’a pas pu être produite.

### Workflow de clôture

1. Vérifier le travail réellement effectué.
2. Exécuter les tests et contrôles applicables.
3. Mettre à jour la documentation permanente.
4. Vérifier la cohérence des décisions et de l’état du projet.
5. Générer l’archive ZIP documentaire.
6. Vérifier l’intégrité et le contenu de l’archive.
7. Fournir un résumé succinct à l’utilisateur.
8. Indiquer le chemin exact du ZIP.

La réponse conversationnelle ne remplace pas l’archive. Le ZIP est le livrable de transmission principal.

## Coordination des sous-agents

Répartition recommandée :

- recherche technique : sources/versions/compatibilités ;
- UX/design : références, parcours et risques ;
- qualité : scénarios et procédures ;
- implémentation : uniquement après décisions validées ;
- vérification : lecture indépendante sans modification.

Le responsable principal :

1. fournit les décisions et contraintes dans chaque prompt ;
2. interdit les éditions concurrentes ;
3. compare les divergences ;
4. revient aux sources primaires ;
5. consolide les documents ;
6. assume l’archive ZIP de transmission et le résumé de clôture.

## Critères d’arrêt

Arrêter et demander un arbitrage lorsque :

- deux options changent sensiblement coût, accessibilité ou architecture ;
- le contenu réel est insuffisant pour une décision irréversible ;
- une action requiert secret, publication, suppression ou dépense ;
- les preuves contredisent une décision validée ;
- quatre tentatives d’outil n’apportent aucun nouvel élément.

Continuer avec une hypothèse signalée si elle est secondaire, réversible et sans effet sur les données.
