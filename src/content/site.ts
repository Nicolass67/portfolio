import { buildDemoProjects } from "./demo-projects";
import { getPortfolioMode, type PortfolioMode } from "./portfolio-mode";
import {
  buildAuthenticProfile,
  buildDemoProfile,
  type ProfileContent,
} from "./profile";

export type { ProfileContent, ProfilePanel } from "./profile";

export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

/** Stable chapter identifier within a project (shared across locales). */
export type ChapterId = string;

export type MediaKind =
  "image" | "video" | "diagram" | "gallery" | "youtube" | "none";

export interface MediaItem {
  id: string;
  kind: MediaKind;
  src?: string;
  /** Optional larger source for the image lightbox; falls back to `src`. */
  fullSrc?: string;
  /** Poster / illustrative frame for video slots without a real clip. */
  poster?: string;
  /** Gallery frames (SVG or images). */
  sources?: string[];
  /** Optional YouTube video id for click-to-load embeds (demo/review). */
  youtubeId?: string;
  /** Accessible title for iframe embeds. */
  embedTitle?: string;
  alt?: string;
  caption?: string;
  /** CSS aspect-ratio value, e.g. "16 / 9" */
  aspectRatio?: string;
}

export interface ChapterContent {
  id: ChapterId;
  title: string;
  eyebrow: string;
  intro: string;
  paragraphs: string[];
  points?: string[];
  media?: MediaItem | null;
}

export interface ProjectContent {
  id: string;
  /** True for fictional Mission 08 demo projects — never treat as real work. */
  demonstrationOnly?: boolean;
  featured: boolean;
  index: string;
  featuredLabel: string;
  /** Compact label for the project index (optional). */
  navLabel?: string;
  title: string;
  kind: string;
  summary: string;
  contribution: string;
  technologiesLabel: string;
  technologies: string[];
  kitLabel: string;
  kit: string[];
  systemsLabel: string;
  systems: string[];
  expandLabel: string;
  collapseLabel: string;
  mediaEmptyLabel: string;
  mediaEmptyHint: string;
  featuredMedia: MediaItem | null;
  caseStudy: {
    eyebrow: string;
    title: string;
    description: string;
    contentsLabel: string;
    idleHint: string;
    openLabel: string;
    closeLabel: string;
    chapters: ChapterContent[];
  };
}

export interface SiteContent {
  locale: Locale;
  mode: PortfolioMode;
  languageName: string;
  alternateLanguageName: string;
  meta: {
    title: string;
    description: string;
  };
  navigation: {
    projects: string;
    profile: string;
    top: string;
  };
  identity: {
    label: string;
    role: string;
    positioning: string;
  };
  explorer: {
    eyebrow: string;
    title: string;
    description: string;
    activeLabel: string;
    otherProjectsLabel: string;
    projectIndexLabel: string;
    caseStudyAction: string;
    /** Short line under the primary study CTA (chapter count filled in UI). */
    caseStudyHint: string;
    /** Affordance in the mobile projects sheet. */
    openStudyAction: string;
    backToProject: string;
  };
  /** Shown only when mode === "demo". */
  demoNotice: {
    title: string;
    body: string;
  } | null;
  projects: ProjectContent[];
  profile: ProfileContent;
  footer: {
    note: string;
  };
}

const sharedTechnologies = [
  "Unreal Engine 5.6",
  "C++",
  "GAS",
  "State Tree",
] as const;

const emptyFeaturedMedia: MediaItem = {
  id: "featured-empty",
  kind: "none",
  aspectRatio: "16 / 9",
};

function buildChapters(locale: Locale): ChapterContent[] {
  if (locale === "fr") {
    return [
      {
        id: "concept",
        title: "Concept et objectifs",
        eyebrow: "01 / Intention",
        intro:
          "Un slice de combat tactique conçu comme projet de portfolio Unreal.",
        paragraphs: [
          "Le prototype prend place dans une arène compacte et organise une boucle Menu → Run par vagues → Pause ou fin de partie → Menu.",
          "Le périmètre vise une rencontre lisible et pilotée par données plutôt qu’un jeu complet. La présentation publique reste volontairement générale.",
        ],
        media: null,
      },
      {
        id: "systems",
        title: "Systèmes de gameplay",
        eyebrow: "02 / Systèmes",
        intro:
          "L’inventaire du dépôt confirme la présence de systèmes joueur, ennemi, rencontre et feedback.",
        paragraphs: [
          "Le kit joueur V1 réunit épée, arc, parry, dash et focus. Les sorts et le mana joueur ne font pas partie de ce périmètre V1.",
          "Les fichiers du projet montrent des abilities GAS pour le joueur, les ennemis et le boss, ainsi que des tâches et conditions State Tree pour plusieurs comportements de combat.",
        ],
        points: [
          "Abilities de mêlée, distance, défense et mobilité",
          "IA de poursuite, kite, orbite, attaque et états de contrôle",
          "Configuration des archétypes, vagues, difficulté et pickups",
          "Feedback : dégâts, caméra, hit-stop et ralentis de combat",
        ],
        media: null,
      },
      {
        id: "architecture",
        title: "Architecture technique",
        eyebrow: "03 / Organisation",
        intro:
          "Le projet associe GAS, State Tree et des sous-systèmes Unreal spécialisés.",
        paragraphs: [
          "GAS porte les capacités de combat observées ; State Tree structure les comportements IA. Des sous-systèmes distincts gèrent notamment le déroulement des rencontres, le flux de jeu et le feedback de combat.",
          "Cette page ne publie ni extrait de code ni détail d’implémentation sensible. Une lecture architecturale plus fine demandera une validation supplémentaire du code V1 et des droits de publication.",
        ],
        media: null,
      },
      {
        id: "scope",
        title: "Décisions de périmètre",
        eyebrow: "04 / Arbitrages",
        intro:
          "Le périmètre V1 privilégie un kit joueur restreint et une boucle de combat identifiable.",
        paragraphs: [
          "Les documents historiques évoquaient des sorts et du mana joueur. L’état V1 confirmé les abandonne au profit du kit épée, arc, parry, dash et focus.",
          "Ce choix est présenté comme une limitation de périmètre vérifiée, pas comme une preuve de qualité ou de complétude du prototype.",
        ],
        media: null,
      },
      {
        id: "status",
        title: "État actuel et limites",
        eyebrow: "05 / Transparence",
        intro:
          "Le README du projet déclare une version 1.0.0 et décrit une boucle de jeu complète à son échelle.",
        paragraphs: [
          "La présence de classes et de fichiers confirme l’existence structurelle des systèmes cités. Elle ne suffit pas à établir leur finition, leurs performances ou leur comportement dans toutes les situations.",
          "Aucune métrique de performance, capture publique ou vidéo autorisée n’est utilisée ici. Le dépôt distant reste privé et les droits des assets tiers doivent être vérifiés avant toute publication de média.",
        ],
        media: null,
      },
    ];
  }

  return [
    {
      id: "concept",
      title: "Concept and goals",
      eyebrow: "01 / Intent",
      intro: "A tactical combat slice built as an Unreal portfolio project.",
      paragraphs: [
        "The prototype takes place in a compact arena and organises a Menu → wave-based Run → Pause or end state → Menu loop.",
        "Its scope targets a readable, data-driven encounter rather than a complete game. This public presentation intentionally stays at a general level.",
      ],
      media: null,
    },
    {
      id: "systems",
      title: "Gameplay systems",
      eyebrow: "02 / Systems",
      intro:
        "The repository inventory confirms player, enemy, encounter and feedback systems.",
      paragraphs: [
        "The V1 player kit combines sword, bow, parry, dash and focus. Player spells and mana are not part of the V1 scope.",
        "The project files show GAS abilities for the player, enemies and boss, along with State Tree tasks and conditions for several combat behaviours.",
      ],
      points: [
        "Melee, ranged, defensive and mobility abilities",
        "Chase, kite, orbit, attack and control-state AI",
        "Archetype, wave, difficulty and pickup configuration",
        "Damage, camera, hit-stop and combat slow-motion feedback",
      ],
      media: null,
    },
    {
      id: "architecture",
      title: "Technical architecture",
      eyebrow: "03 / Organisation",
      intro:
        "The project combines GAS, State Tree and specialised Unreal subsystems.",
      paragraphs: [
        "GAS carries the observed combat abilities; State Tree structures AI behaviours. Separate subsystems handle areas including encounter progression, game flow and combat feedback.",
        "This page publishes neither code excerpts nor sensitive implementation details. A deeper architecture review requires further V1 code verification and publication approval.",
      ],
      media: null,
    },
    {
      id: "scope",
      title: "Scope decisions",
      eyebrow: "04 / Trade-offs",
      intro:
        "The V1 scope prioritises a constrained player kit and an identifiable combat loop.",
      paragraphs: [
        "Historical documents mentioned player spells and mana. The confirmed V1 replaces that direction with the sword, bow, parry, dash and focus kit.",
        "This is presented as a verified scope limitation, not as evidence of the prototype’s quality or completeness.",
      ],
      media: null,
    },
    {
      id: "status",
      title: "Current state and limits",
      eyebrow: "05 / Transparency",
      intro:
        "The project README declares version 1.0.0 and describes a complete loop at the prototype’s scale.",
      paragraphs: [
        "The presence of classes and files confirms the structural existence of the systems listed here. It does not establish their polish, performance or behaviour in every situation.",
        "No performance metric, public screenshot or authorised video is used here. The remote repository remains private, and third-party asset rights must be reviewed before publishing media.",
      ],
      media: null,
    },
  ];
}

function buildTelProject(locale: Locale): ProjectContent {
  const chapters = buildChapters(locale);

  if (locale === "fr") {
    return {
      id: "tactical-encounter-lab",
      demonstrationOnly: false,
      featured: true,
      index: "01",
      featuredLabel: "Projet principal",
      title: "Tactical Encounter Lab",
      kind: "Prototype de combat tactique pour portfolio Unreal",
      summary:
        "Une rencontre en arène compacte centrée sur un kit d’actions limité, des ennemis pilotés par State Tree et une boucle de vagues orientée systèmes.",
      contribution: "Projet personnel · développé en solo",
      technologiesLabel: "Technologies confirmées",
      technologies: [...sharedTechnologies],
      kitLabel: "Kit joueur V1",
      kit: ["épée", "arc", "parry", "dash", "focus"],
      systemsLabel: "Systèmes observés",
      systems: [
        "abilities joueur et ennemi avec GAS",
        "comportements IA avec State Tree",
        "rencontres et vagues pilotées par données",
        "feedback de combat",
      ],
      expandLabel: "Explorer le projet",
      collapseLabel: "Replier le projet",
      mediaEmptyLabel: "Composition visuelle",
      mediaEmptyHint:
        "Espace prévu pour une capture ou une vidéo de gameplay lorsque leur publication sera autorisée.",
      featuredMedia: emptyFeaturedMedia,
      caseStudy: {
        eyebrow: "Étude de cas",
        title: "Explorer les sujets techniques",
        description:
          "Présentation générale fondée sur l’inventaire actuel. Les systèmes sont décrits sans revendiquer une finition, des performances ou une validation non mesurée.",
        contentsLabel: "Sujets techniques",
        idleHint:
          "Choisissez un sujet pour l’afficher dans l’espace de travail.",
        openLabel: "Ouvrir",
        closeLabel: "Fermer",
        chapters,
      },
    };
  }

  return {
    id: "tactical-encounter-lab",
    demonstrationOnly: false,
    featured: true,
    index: "01",
    featuredLabel: "Featured project",
    title: "Tactical Encounter Lab",
    kind: "Tactical combat prototype for an Unreal portfolio",
    summary:
      "A compact arena encounter focused on a constrained action kit, State Tree-driven enemies and a systems-oriented wave loop.",
    contribution: "Personal project · developed solo",
    technologiesLabel: "Confirmed technologies",
    technologies: [...sharedTechnologies],
    kitLabel: "V1 player kit",
    kit: ["sword", "bow", "parry", "dash", "focus"],
    systemsLabel: "Observed systems",
    systems: [
      "player and enemy abilities with GAS",
      "AI behaviours with State Tree",
      "data-driven encounters and waves",
      "combat feedback",
    ],
    expandLabel: "Explore the project",
    collapseLabel: "Collapse the project",
    mediaEmptyLabel: "Visual composition",
    mediaEmptyHint:
      "Reserved space for a gameplay screenshot or video once publication is authorised.",
    featuredMedia: emptyFeaturedMedia,
    caseStudy: {
      eyebrow: "Case study",
      title: "Explore technical topics",
      description:
        "A general presentation based on the current project inventory. It describes systems that are present without claiming unmeasured polish, performance or validation.",
      contentsLabel: "Technical topics",
      idleHint: "Choose a topic to display it in the workspace.",
      openLabel: "Open",
      closeLabel: "Close",
      chapters,
    },
  };
}

const authenticShell = {
  fr: {
    locale: "fr" as const,
    languageName: "Français",
    alternateLanguageName: "English",
    meta: {
      title: "Gameplay Programmer — Portfolio",
      description:
        "Portfolio bilingue de Gameplay Programmer : exploration modulaire de Tactical Encounter Lab, prototype Unreal Engine 5.6 développé en solo.",
    },
    navigation: {
      projects: "Projets",
      profile: "Profil",
      top: "Retour en haut",
    },
    identity: {
      label: "Portfolio professionnel",
      role: "Gameplay Programmer",
      positioning:
        "Développement de systèmes de gameplay avec Unreal Engine et C++.",
    },
    explorer: {
      eyebrow: "Travaux",
      title: "Projets",
      description:
        "Un projet actif occupe l’espace de travail. Passez d’un projet à l’autre, puis ouvrez l’étude de cas.",
      activeLabel: "Projet actif",
      otherProjectsLabel: "Autres projets",
      projectIndexLabel: "Projets",
      caseStudyAction: "Lire l’étude technique",
      caseStudyHint: "sujets techniques",
      openStudyAction: "Ouvrir l’étude",
      backToProject: "Tous les projets",
    },
    profile: buildAuthenticProfile("fr"),
    footer: {
      note: "Portfolio de Gameplay Programmer · version française",
    },
  },
  en: {
    locale: "en" as const,
    languageName: "English",
    alternateLanguageName: "Français",
    meta: {
      title: "Gameplay Programmer — Portfolio",
      description:
        "Bilingual Gameplay Programmer portfolio: a modular exploration of Tactical Encounter Lab, a solo Unreal Engine 5.6 prototype.",
    },
    navigation: {
      projects: "Projects",
      profile: "Profile",
      top: "Back to top",
    },
    identity: {
      label: "Professional portfolio",
      role: "Gameplay Programmer",
      positioning: "Gameplay systems development with Unreal Engine and C++.",
    },
    explorer: {
      eyebrow: "Work",
      title: "Projects",
      description:
        "One active project fills the workspace. Switch projects, then open the case study.",
      activeLabel: "Active project",
      otherProjectsLabel: "Other projects",
      projectIndexLabel: "Projects",
      caseStudyAction: "Read the technical study",
      caseStudyHint: "technical topics",
      openStudyAction: "Open study",
      backToProject: "All projects",
    },
    profile: buildAuthenticProfile("en"),
    footer: {
      note: "Gameplay Programmer portfolio · English version",
    },
  },
};

const authenticProjects = {
  fr: [buildTelProject("fr")],
  en: [buildTelProject("en")],
};

function demoNotice(locale: Locale): SiteContent["demoNotice"] {
  return locale === "fr"
    ? {
        title: "Mode démonstration",
        body: "Six projets fictifs pour tester la structure et les interactions. Ce ne sont pas des réalisations personnelles publiables. Publication : PUBLIC_PORTFOLIO_MODE=authentic.",
      }
    : {
        title: "Demonstration mode",
        body: "Six fictional projects for testing structure and interactions. They are not publishable personal work. Publication: PUBLIC_PORTFOLIO_MODE=authentic.",
      };
}

function demoExplorer(locale: Locale): SiteContent["explorer"] {
  return locale === "fr"
    ? {
        eyebrow: "Démonstration",
        title: "Projets",
        description:
          "Six concepts fictifs. Le premier est actif. Changez de projet pour remplacer l’espace de travail, puis ouvrez l’étude technique.",
        activeLabel: "Projet actif",
        otherProjectsLabel: "Autres projets",
        projectIndexLabel: "Index des projets",
        caseStudyAction: "Lire l’étude technique",
        caseStudyHint: "sujets techniques",
        openStudyAction: "Ouvrir l’étude",
        backToProject: "Tous les projets",
      }
    : {
        eyebrow: "Demonstration",
        title: "Projects",
        description:
          "Six fictional concepts. The first is active. Switch projects to replace the workspace, then open the technical study.",
        activeLabel: "Active project",
        otherProjectsLabel: "Other projects",
        projectIndexLabel: "Project index",
        caseStudyAction: "Read the technical study",
        caseStudyHint: "technical topics",
        openStudyAction: "Open study",
        backToProject: "All projects",
      };
}

/** Authentic TEL content only — never include demo projects here. */
export function getAuthenticProjects(locale: Locale): ProjectContent[] {
  return authenticProjects[locale];
}

export function getSiteContent(locale: Locale): SiteContent {
  const mode = getPortfolioMode();
  const shell = authenticShell[locale];

  if (mode === "demo") {
    return {
      ...shell,
      mode,
      explorer: demoExplorer(locale),
      demoNotice: demoNotice(locale),
      projects: buildDemoProjects(locale),
      profile: buildDemoProfile(locale),
      meta: {
        ...shell.meta,
        title:
          locale === "fr"
            ? "Gameplay Programmer — Démo interface (6 projets)"
            : "Gameplay Programmer — Interface demo (6 projects)",
        description:
          locale === "fr"
            ? "Environnement de démonstration avec six projets fictifs pour revue visuelle et interactions."
            : "Demonstration environment with six fictional projects for visual and interaction review.",
      },
      footer: {
        note:
          locale === "fr"
            ? "Mode démonstration · projets fictifs · ne pas publier tels quels"
            : "Demonstration mode · fictional projects · do not publish as-is",
      },
    };
  }

  return {
    ...shell,
    mode,
    demoNotice: null,
    projects: getAuthenticProjects(locale),
    profile: buildAuthenticProfile(locale),
  };
}

export function getAlternatePath(locale: Locale): string {
  return locale === "fr" ? "/en/" : "/";
}

export function getFeaturedProject(locale: Locale): ProjectContent {
  const projects = getSiteContent(locale).projects;
  return projects.find((project) => project.featured) ?? projects[0];
}

function assertProjectSet(
  label: string,
  frProjects: ProjectContent[],
  enProjects: ProjectContent[],
): void {
  if (frProjects.length === 0 || enProjects.length === 0) {
    throw new Error(`No projects defined for ${label}.`);
  }

  for (const [locale, projects] of [
    ["fr", frProjects],
    ["en", enProjects],
  ] as const) {
    const featuredCount = projects.filter((p) => p.featured).length;
    if (featuredCount !== 1) {
      throw new Error(
        `Expected exactly one featured project for ${label}/${locale}.`,
      );
    }

    for (const project of projects) {
      if (
        !project.id.trim() ||
        !project.title.trim() ||
        !project.summary.trim()
      ) {
        throw new Error(`Incomplete project for ${label}/${locale}.`);
      }

      if (project.caseStudy.chapters.length === 0) {
        throw new Error(
          `No chapters for project ${project.id} (${label}/${locale}).`,
        );
      }

      for (const chapter of project.caseStudy.chapters) {
        if (!chapter.title.trim() || !chapter.intro.trim()) {
          throw new Error(
            `Incomplete chapter "${chapter.id}" in ${project.id} (${label}/${locale}).`,
          );
        }
      }
    }
  }

  const frIds = frProjects.map(({ id }) => id).join("|");
  const enIds = enProjects.map(({ id }) => id).join("|");
  if (frIds !== enIds) {
    throw new Error(`${label}: French and English project ids differ.`);
  }

  for (let i = 0; i < frProjects.length; i += 1) {
    const frChapters = frProjects[i].caseStudy.chapters
      .map(({ id }) => id)
      .join("|");
    const enChapters = enProjects[i].caseStudy.chapters
      .map(({ id }) => id)
      .join("|");
    if (frChapters !== enChapters) {
      throw new Error(
        `${label}: chapter anchors differ for project ${frProjects[i].id}.`,
      );
    }
  }
}

export function assertLocaleCompleteness(): true {
  assertProjectSet(
    "authentic",
    getAuthenticProjects("fr"),
    getAuthenticProjects("en"),
  );
  assertProjectSet("demo", buildDemoProjects("fr"), buildDemoProjects("en"));

  const demoFr = buildDemoProjects("fr");
  if (demoFr.length !== 6) {
    throw new Error(`Expected 6 demo projects, got ${demoFr.length}.`);
  }
  if (!demoFr.every((project) => project.demonstrationOnly === true)) {
    throw new Error("Every demo project must be marked demonstrationOnly.");
  }
  if (getAuthenticProjects("fr").some((project) => project.demonstrationOnly)) {
    throw new Error("Authentic projects must not be marked demonstrationOnly.");
  }

  for (const locale of locales) {
    const content = getSiteContent(locale);
    if (content.locale !== locale) {
      throw new Error(`Locale key mismatch for ${locale}.`);
    }
  }

  return true;
}
