/**
 * Fictional demonstration projects for layout / interaction review.
 * NOT real portfolio work. Never publish as authentic achievements.
 * Mission 12: chapters replaced by dense catalog from demo-dense.ts.
 */
import { buildDenseChapters } from "./demo-dense";
import type { ChapterContent, Locale, ProjectContent } from "./site";

function demoChapters(
  locale: Locale,
  variants: Array<{
    id: string;
    fr: Pick<ChapterContent, "title" | "eyebrow" | "intro" | "paragraphs">;
    en: Pick<ChapterContent, "title" | "eyebrow" | "intro" | "paragraphs">;
  }>,
): ChapterContent[] {
  return variants.map((variant) => {
    const copy = locale === "fr" ? variant.fr : variant.en;
    return {
      id: variant.id,
      title: copy.title,
      eyebrow: copy.eyebrow,
      intro: copy.intro,
      paragraphs: copy.paragraphs,
    };
  });
}

function labels(locale: Locale) {
  return locale === "fr"
    ? {
        expandLabel: "Explorer le projet",
        collapseLabel: "Replier le projet",
        mediaEmptyLabel: "Composition visuelle",
        mediaEmptyHint:
          "Espace conçu pour une capture ou une vidéo — aucune image réelle de gameplay ici.",
        technologiesLabel: "Technologies (démo)",
        kitLabel: "Axes mis en avant",
        systemsLabel: "Thèmes techniques",
        contribution:
          "Données de démonstration · non publiables comme références",
        caseStudy: {
          eyebrow: "Étude de cas (démo)",
          title: "Explorer les sujets techniques",
          description:
            "Contenu fictif et volontairement court, uniquement pour tester la structure.",
          contentsLabel: "Sujets techniques",
          idleHint:
            "Choisissez un sujet pour l’afficher dans l’espace de travail.",
          openLabel: "Ouvrir",
          closeLabel: "Fermer",
        },
      }
    : {
        expandLabel: "Explore the project",
        collapseLabel: "Collapse the project",
        mediaEmptyLabel: "Visual composition",
        mediaEmptyHint:
          "Designed space for a capture or video — no real gameplay imagery here.",
        technologiesLabel: "Technologies (demo)",
        kitLabel: "Focus areas",
        systemsLabel: "Technical themes",
        contribution: "Demonstration data · not publishable as credentials",
        caseStudy: {
          eyebrow: "Case study (demo)",
          title: "Explore technical topics",
          description:
            "Fictional, deliberately short content used only to test structure.",
          contentsLabel: "Technical topics",
          idleHint: "Choose a topic to display it in the workspace.",
          openLabel: "Open",
          closeLabel: "Close",
        },
      };
}

export function buildDemoProjects(locale: Locale): ProjectContent[] {
  const L = labels(locale);
  const fr = locale === "fr";

  const projects: ProjectContent[] = [
    {
      id: "demo-combat-systems",
      demonstrationOnly: true,
      featured: true,
      index: "01",
      featuredLabel: fr ? "Démo · combat" : "Demo · combat",
      navLabel: fr ? "Combat" : "Combat",
      title: fr ? "Prototype systèmes de combat" : "Combat Systems Prototype",
      kind: fr
        ? "Abilities, fenêtres de hit et feedback"
        : "Abilities, hit windows and feedback",
      summary: fr
        ? "Concept fictif pour évaluer une mise en avant média image et une synthèse combat dense."
        : "Fictional concept to evaluate an image media lead and a dense combat summary.",
      contribution: L.contribution,
      technologiesLabel: L.technologiesLabel,
      technologies: ["Unreal Engine", "C++", "GAS"],
      kitLabel: L.kitLabel,
      kit: fr
        ? ["fenêtres d’attaque", "parade", "dash", "feedback"]
        : ["attack windows", "parry", "dash", "feedback"],
      systemsLabel: L.systemsLabel,
      systems: fr
        ? ["GAS abilities", "hit detection", "combat UI feedback"]
        : ["GAS abilities", "hit detection", "combat UI feedback"],
      expandLabel: L.expandLabel,
      collapseLabel: L.collapseLabel,
      mediaEmptyLabel: L.mediaEmptyLabel,
      mediaEmptyHint: L.mediaEmptyHint,
      featuredMedia: {
        id: "demo-combat-image",
        kind: "image",
        src: "/demo/media-combat.svg",
        alt: fr
          ? "Cadre abstrait de démonstration — systèmes de combat"
          : "Abstract demonstration frame — combat systems",
        caption: fr
          ? "Asset illustratif · ne représente aucun gameplay réel"
          : "Illustrative asset · does not depict real gameplay",
        aspectRatio: "16 / 9",
      },
      caseStudy: {
        ...L.caseStudy,
        chapters: demoChapters(locale, [
          {
            id: "concept",
            fr: {
              title: "Intention combat",
              eyebrow: "01 / Concept",
              intro:
                "Un kit d’actions limité pour tester la lisibilité des fenêtres d’engagement.",
              paragraphs: [
                "Texte fictif : la structure doit rester claire sans prétendre à des résultats mesurés.",
              ],
            },
            en: {
              title: "Combat intent",
              eyebrow: "01 / Concept",
              intro:
                "A constrained action kit to test readable engagement windows.",
              paragraphs: [
                "Fictional text: the structure must stay clear without claiming measured results.",
              ],
            },
          },
          {
            id: "systems",
            fr: {
              title: "Boucle d’actions",
              eyebrow: "02 / Systèmes",
              intro:
                "Attaque, défense et déplacement partagent la même couche de feedback.",
              paragraphs: [
                "Les détails ici restent génériques ; ils servent uniquement à remplir un chapitre.",
              ],
            },
            en: {
              title: "Action loop",
              eyebrow: "02 / Systems",
              intro:
                "Attack, defence and movement share the same feedback layer.",
              paragraphs: [
                "Details stay generic; they only fill a chapter slot for the demo.",
              ],
            },
          },
        ]),
      },
    },
    {
      id: "demo-ai-sandbox",
      demonstrationOnly: true,
      featured: false,
      index: "02",
      featuredLabel: fr ? "Démo · IA" : "Demo · AI",
      navLabel: fr ? "IA" : "AI",
      title: fr ? "Bac à sable comportements IA" : "AI Behavior Sandbox",
      kind: fr
        ? "State Tree, perception et décisions"
        : "State Tree, perception and decisions",
      summary: fr
        ? "Projet fictif centré sur l’organisation des comportements ennemis et la lisibilité de la logique."
        : "Fictional project focused on enemy behaviour organisation and readable decision logic.",
      contribution: L.contribution,
      technologiesLabel: L.technologiesLabel,
      technologies: ["Unreal Engine", "State Tree", "C++"],
      kitLabel: L.kitLabel,
      kit: fr
        ? ["perception", "états", "transitions"]
        : ["perception", "states", "transitions"],
      systemsLabel: L.systemsLabel,
      systems: fr
        ? ["arbres d’états", "stimuli", "sélection de cible"]
        : ["state trees", "stimuli", "target selection"],
      expandLabel: L.expandLabel,
      collapseLabel: L.collapseLabel,
      mediaEmptyLabel: L.mediaEmptyLabel,
      mediaEmptyHint: L.mediaEmptyHint,
      featuredMedia: {
        id: "demo-ai-video",
        kind: "video",
        poster: "/demo/media-ai.svg",
        alt: fr
          ? "Emplacement vidéo de démonstration — bac IA"
          : "Demonstration video slot — AI sandbox",
        caption: fr
          ? "Emplacement vidéo illustratif · aucun clip de gameplay"
          : "Illustrative video slot · no gameplay footage",
        aspectRatio: "16 / 9",
      },
      caseStudy: {
        ...L.caseStudy,
        chapters: demoChapters(locale, [
          {
            id: "concept",
            fr: {
              title: "Objectifs IA",
              eyebrow: "01 / Concept",
              intro: "Rendre visible la chaîne perception → décision → action.",
              paragraphs: [
                "Contenu fictif pour tester un panneau chapitre sous une zone vidéo.",
              ],
            },
            en: {
              title: "AI goals",
              eyebrow: "01 / Concept",
              intro: "Make the perception → decision → action chain readable.",
              paragraphs: [
                "Fictional content to test a chapter panel under a video region.",
              ],
            },
          },
          {
            id: "architecture",
            fr: {
              title: "Découpage State Tree",
              eyebrow: "02 / Architecture",
              intro:
                "Séparer détection, évaluation et exécution pour limiter les couplages.",
              paragraphs: [
                "Aucune architecture réelle n’est documentée ici ; seuls les libellés importent pour la démo.",
              ],
            },
            en: {
              title: "State Tree split",
              eyebrow: "02 / Architecture",
              intro:
                "Separate detection, evaluation and execution to limit coupling.",
              paragraphs: [
                "No real architecture is documented here; labels exist for the demo only.",
              ],
            },
          },
          {
            id: "status",
            fr: {
              title: "Limites assumées",
              eyebrow: "03 / Limites",
              intro:
                "Pas de métriques de performance ni de validation inventées.",
              paragraphs: ["Le chapitre ferme proprement le parcours de démo."],
            },
            en: {
              title: "Assumed limits",
              eyebrow: "03 / Limits",
              intro: "No invented performance metrics or validation claims.",
              paragraphs: ["This chapter cleanly closes the demo path."],
            },
          },
        ]),
      },
    },
    {
      id: "demo-coop-arena",
      demonstrationOnly: true,
      featured: false,
      index: "03",
      featuredLabel: fr ? "Démo · coop" : "Demo · co-op",
      navLabel: fr ? "Coop" : "Co-op",
      title: fr ? "Prototype arène coopérative" : "Cooperative Arena Prototype",
      kind: fr
        ? "Hypothèse multi-joueurs et rôles"
        : "Hypothetical multiplayer and roles",
      summary: fr
        ? "Scénario fictif pour tester une galerie compacte et un résumé multi-joueurs."
        : "Fictional scenario to test a compact gallery and a multiplayer-style summary.",
      contribution: L.contribution,
      technologiesLabel: L.technologiesLabel,
      technologies: ["Unreal Engine", "C++", "Replication (hypothèse)"],
      kitLabel: L.kitLabel,
      kit: fr
        ? ["rôles", "objectifs partagés", "sync"]
        : ["roles", "shared objectives", "sync"],
      systemsLabel: L.systemsLabel,
      systems: fr
        ? ["sessions", "objectifs d’équipe", "feedback partagé"]
        : ["sessions", "team objectives", "shared feedback"],
      expandLabel: L.expandLabel,
      collapseLabel: L.collapseLabel,
      mediaEmptyLabel: L.mediaEmptyLabel,
      mediaEmptyHint: L.mediaEmptyHint,
      featuredMedia: {
        id: "demo-coop-gallery",
        kind: "gallery",
        sources: [
          "/demo/media-coop-a.svg",
          "/demo/media-coop-b.svg",
          "/demo/media-coop-c.svg",
        ],
        alt: fr
          ? "Galerie abstraite de démonstration"
          : "Abstract demonstration gallery",
        caption: fr
          ? "Galerie illustrative · assets de démonstration"
          : "Illustrative gallery · demonstration assets",
        aspectRatio: "16 / 9",
      },
      caseStudy: {
        ...L.caseStudy,
        chapters: demoChapters(locale, [
          {
            id: "concept",
            fr: {
              title: "Hypothèse coop",
              eyebrow: "01 / Concept",
              intro: "Deux rôles complémentaires autour d’une arène courte.",
              paragraphs: [
                "Texte fictif ; la galerie doit rester lisible à côté du contenu.",
              ],
            },
            en: {
              title: "Co-op hypothesis",
              eyebrow: "01 / Concept",
              intro: "Two complementary roles around a short arena.",
              paragraphs: [
                "Fictional text; the gallery must stay readable beside the content.",
              ],
            },
          },
          {
            id: "scope",
            fr: {
              title: "Périmètre volontairement étroit",
              eyebrow: "02 / Périmètre",
              intro:
                "Pas de lobby, pas d’économie, seulement la boucle d’arène.",
              paragraphs: ["Utile pour tester un second chapitre plus court."],
            },
            en: {
              title: "Deliberately narrow scope",
              eyebrow: "02 / Scope",
              intro: "No lobby, no economy — only the arena loop.",
              paragraphs: ["Useful for testing a shorter second chapter."],
            },
          },
        ]),
      },
    },
    {
      id: "demo-traversal-lab",
      demonstrationOnly: true,
      featured: false,
      index: "04",
      featuredLabel: fr ? "Démo · traversal" : "Demo · traversal",
      navLabel: "Traversal",
      title: fr ? "Laboratoire de traversal" : "Traversal Mechanics Lab",
      kind: fr
        ? "Mouvement, réponse et intégration anim"
        : "Movement, responsiveness and anim integration",
      summary: fr
        ? "Concept fictif pour une composition média mixte (image mise en avant + chapitre diagramme)."
        : "Fictional concept for a mixed media layout (featured image + diagram chapter).",
      contribution: L.contribution,
      technologiesLabel: L.technologiesLabel,
      technologies: ["Unreal Engine", "C++", "Animation"],
      kitLabel: L.kitLabel,
      kit: fr
        ? ["sprint", "grapple", "mantling"]
        : ["sprint", "grapple", "mantling"],
      systemsLabel: L.systemsLabel,
      systems: fr
        ? ["mouvement", "montage anim", "caméra"]
        : ["movement", "anim montage", "camera"],
      expandLabel: L.expandLabel,
      collapseLabel: L.collapseLabel,
      mediaEmptyLabel: L.mediaEmptyLabel,
      mediaEmptyHint: L.mediaEmptyHint,
      featuredMedia: {
        id: "demo-traversal-image",
        kind: "image",
        src: "/demo/media-traversal.svg",
        alt: fr
          ? "Cadre abstrait de démonstration — traversal"
          : "Abstract demonstration frame — traversal",
        caption: fr
          ? "Asset illustratif · parcours fictif"
          : "Illustrative asset · fictional path",
        aspectRatio: "21 / 9",
      },
      caseStudy: {
        ...L.caseStudy,
        chapters: [
          ...demoChapters(locale, [
            {
              id: "systems",
              fr: {
                title: "Chaîne mouvement",
                eyebrow: "01 / Systèmes",
                intro:
                  "Priorité à la réponse input et aux transitions d’animation.",
                paragraphs: [
                  "Contenu fictif pour un projet à ratio média large.",
                ],
              },
              en: {
                title: "Movement chain",
                eyebrow: "01 / Systems",
                intro: "Prioritise input response and animation transitions.",
                paragraphs: [
                  "Fictional content for a wide-media project layout.",
                ],
              },
            },
          ]),
          {
            id: "architecture",
            title: fr ? "Schéma de flux" : "Flow diagram",
            eyebrow: fr ? "02 / Diagramme" : "02 / Diagram",
            intro: fr
              ? "Le chapitre porte un diagramme technique illustratif."
              : "This chapter carries an illustrative technical diagram.",
            paragraphs: [
              fr
                ? "Le diagramme n’est pas une capture d’éditeur réelle."
                : "The diagram is not a real editor capture.",
            ],
            media: {
              id: "demo-traversal-diagram-inline",
              kind: "diagram",
              src: "/demo/media-diagram.svg",
              alt: fr
                ? "Diagramme de démonstration — flux traversal"
                : "Demonstration diagram — traversal flow",
              caption: fr ? "Diagramme fictif" : "Fictional diagram",
              aspectRatio: "16 / 9",
            },
          },
        ],
      },
    },
    {
      id: "demo-systems-toolkit",
      demonstrationOnly: true,
      featured: false,
      index: "05",
      featuredLabel: fr ? "Démo · toolkit" : "Demo · toolkit",
      navLabel: "Toolkit",
      title: fr ? "Boîte à outils gameplay" : "Gameplay Systems Toolkit",
      kind: fr
        ? "Outils et systèmes réutilisables (hypothèse)"
        : "Hypothetical reusable tools and systems",
      summary: fr
        ? "Entrée fictive pour un emplacement diagramme technique en média principal."
        : "Fictional entry for a technical-diagram slot as primary media.",
      contribution: L.contribution,
      technologiesLabel: L.technologiesLabel,
      technologies: ["Unreal Engine", "Editor Utility", "C++"],
      kitLabel: L.kitLabel,
      kit: fr
        ? ["data assets", "debug overlay", "presets"]
        : ["data assets", "debug overlay", "presets"],
      systemsLabel: L.systemsLabel,
      systems: fr
        ? ["outil éditeur", "pipeline data", "tests manuels"]
        : ["editor tool", "data pipeline", "manual tests"],
      expandLabel: L.expandLabel,
      collapseLabel: L.collapseLabel,
      mediaEmptyLabel: L.mediaEmptyLabel,
      mediaEmptyHint: L.mediaEmptyHint,
      featuredMedia: {
        id: "demo-toolkit-diagram",
        kind: "diagram",
        src: "/demo/media-diagram.svg",
        alt: fr
          ? "Diagramme technique de démonstration"
          : "Demonstration technical diagram",
        caption: fr
          ? "Diagramme illustratif · non issu d’un projet réel"
          : "Illustrative diagram · not from a real project",
        aspectRatio: "16 / 9",
      },
      caseStudy: {
        ...L.caseStudy,
        chapters: demoChapters(locale, [
          {
            id: "architecture",
            fr: {
              title: "Modules réutilisables",
              eyebrow: "01 / Architecture",
              intro: "Séparer runtime, données et utilitaires éditeur.",
              paragraphs: ["Texte fictif pour un projet à dominante outil."],
            },
            en: {
              title: "Reusable modules",
              eyebrow: "01 / Architecture",
              intro: "Separate runtime, data and editor utilities.",
              paragraphs: ["Fictional text for a tool-oriented project."],
            },
          },
          {
            id: "scope",
            fr: {
              title: "Ce qui reste hors scope",
              eyebrow: "02 / Périmètre",
              intro:
                "Pas d’outil marketplace, seulement une hypothèse interne.",
              paragraphs: ["Sert à tester un second chapitre court."],
            },
            en: {
              title: "What stays out of scope",
              eyebrow: "02 / Scope",
              intro: "No marketplace tool — only an internal hypothesis.",
              paragraphs: ["Used to test a short second chapter."],
            },
          },
        ]),
      },
    },
    {
      id: "demo-encounter-director",
      demonstrationOnly: true,
      featured: false,
      index: "06",
      featuredLabel: fr ? "Démo · encounter" : "Demo · encounter",
      navLabel: fr ? "Encounter" : "Encounter",
      title: fr ? "Directeur de rencontres" : "Encounter Director",
      kind: fr
        ? "Vagues, pacing et organisation d’ennemis"
        : "Waves, pacing and enemy organisation",
      summary: fr
        ? "Projet fictif sans média : la composition typographique doit rester intentionnelle."
        : "Fictional project with no media: the typographic composition must still feel intentional.",
      contribution: L.contribution,
      technologiesLabel: L.technologiesLabel,
      technologies: ["Unreal Engine", "C++", "Data-driven waves"],
      kitLabel: L.kitLabel,
      kit: fr ? ["vagues", "budget", "pacing"] : ["waves", "budget", "pacing"],
      systemsLabel: L.systemsLabel,
      systems: fr
        ? ["spawning", "intensité", "conditions de fin"]
        : ["spawning", "intensity", "end conditions"],
      expandLabel: L.expandLabel,
      collapseLabel: L.collapseLabel,
      mediaEmptyLabel: fr ? "Sans média" : "No media",
      mediaEmptyHint: fr
        ? "État vide conçu : aucune capture n’est requise pour explorer le projet."
        : "Designed empty state: no capture is required to explore the project.",
      featuredMedia: {
        id: "demo-encounter-none",
        kind: "none",
        aspectRatio: "16 / 9",
      },
      caseStudy: {
        ...L.caseStudy,
        chapters: demoChapters(locale, [
          {
            id: "concept",
            fr: {
              title: "Pacing de rencontre",
              eyebrow: "01 / Concept",
              intro: "Organiser l’intensité sans dépendre d’une image.",
              paragraphs: [
                "Ce projet valide l’état sans média dans l’explorateur.",
              ],
            },
            en: {
              title: "Encounter pacing",
              eyebrow: "01 / Concept",
              intro: "Organise intensity without depending on an image.",
              paragraphs: [
                "This project validates the no-media state in the explorer.",
              ],
            },
          },
          {
            id: "systems",
            fr: {
              title: "Règles de vague",
              eyebrow: "02 / Systèmes",
              intro: "Budgets, délais et conditions de transition.",
              paragraphs: [
                "Contenu fictif — utile pour basculer entre chapitres sans média.",
              ],
            },
            en: {
              title: "Wave rules",
              eyebrow: "02 / Systems",
              intro: "Budgets, delays and transition conditions.",
              paragraphs: [
                "Fictional content — useful for switching chapters without media.",
              ],
            },
          },
          {
            id: "status",
            fr: {
              title: "État de la démo",
              eyebrow: "03 / Statut",
              intro:
                "Données temporaires destinées uniquement à la revue visuelle.",
              paragraphs: [
                "Remplacer ce projet par un vrai contenu dès qu’il est disponible.",
              ],
            },
            en: {
              title: "Demo status",
              eyebrow: "03 / Status",
              intro: "Temporary data intended only for visual review.",
              paragraphs: [
                "Replace this project with real content as soon as it is available.",
              ],
            },
          },
        ]),
      },
    },
  ];

  return projects.map((project) => ({
    ...project,
    caseStudy: {
      ...project.caseStudy,
      chapters: buildDenseChapters(project.id, locale),
    },
  }));
}

export const DEMO_PROJECT_COUNT = 6;
