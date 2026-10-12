type Locale = "fr" | "en";

export type ProfileTimelineEntry = {
  label: string;
  detail: string;
  meta: string;
};

export type ProfilePair = {
  key: string;
  value: string;
};

export type ProfilePanel =
  | {
      id: string;
      title: string;
      kind: "timeline";
      entries: ProfileTimelineEntry[];
    }
  | {
      id: string;
      title: string;
      kind: "chips";
      chips: string[];
    }
  | {
      id: string;
      title: string;
      kind: "pairs";
      pairs: ProfilePair[];
    }
  | {
      id: string;
      title: string;
      kind: "text";
      body: string;
    };

export type ProfileContent = {
  eyebrow: string;
  title: string;
  role: string;
  location: string;
  availability: string;
  pitch: string;
  /** Optional secondary line under pitch; keep short or null for density. */
  storyBeat: string | null;
  focusTitle: string;
  focus: string[];
  /** Reserved; kept null (banner removed for single-screen). */
  notice: string | null;
  panels: ProfilePanel[];
  contactTitle: string;
  contactNote: string;
  contactItems: ProfilePair[];
};

function t<T>(locale: Locale, fr: T, en: T): T {
  return locale === "fr" ? fr : en;
}

/** Demo profile for layout review. Fictional where marked; not real experience. */
export function buildDemoProfile(locale: Locale): ProfileContent {
  return {
    eyebrow: t(locale, "Présentation", "Overview"),
    title: t(locale, "Profil", "Profile"),
    role: t(
      locale,
      "Gameplay Programmer · Unreal Engine / C++",
      "Gameplay Programmer · Unreal Engine / C++",
    ),
    location: t(locale, "France", "France"),
    availability: t(locale, "Ouvert aux échanges", "Open to conversations"),
    pitch: t(
      locale,
      "Gameplay programmer orienté systèmes Unreal / C++. Les études de cas portent la preuve technique ; cette vue donne le cadre.",
      "Gameplay programmer focused on Unreal / C++ systems. Case studies carry the technical proof; this view sets the frame.",
    ),
    storyBeat: null,
    focusTitle: t(locale, "Axes", "Focus"),
    focus: t(
      locale,
      ["Combat & abilities", "IA / comportements", "Outils gameplay"],
      ["Combat & abilities", "AI / behaviors", "Gameplay tools"],
    ),
    notice: null,
    panels: [
      {
        id: "path",
        title: t(locale, "Parcours", "Background"),
        kind: "timeline",
        entries: [
          {
            label: "EPITA",
            detail: t(
              locale,
              "Diplôme d’ingénieur — formation logicielle.",
              "Engineering degree — software education.",
            ),
            meta: t(locale, "Formation", "Education"),
          },
          {
            label: t(locale, "Prototype Unreal", "Unreal prototype"),
            detail: t(
              locale,
              "Rencontres, GAS, State Tree — placeholder démo.",
              "Encounters, GAS, State Tree — demo placeholder.",
            ),
            meta: t(locale, "Projet", "Project"),
          },
          {
            label: t(locale, "Studio / équipe", "Studio / team"),
            detail: t(
              locale,
              "Gameplay en équipe — à remplacer par faits réels.",
              "Team gameplay — replace with real facts.",
            ),
            meta: t(locale, "Placeholder", "Placeholder"),
          },
        ],
      },
      {
        id: "skills",
        title: t(locale, "Domaines", "Domains"),
        kind: "chips",
        chips: t(
          locale,
          ["Combat", "Abilities", "IA", "Outils éditeur", "Netcode léger"],
          ["Combat", "Abilities", "AI", "Editor tools", "Light netcode"],
        ),
      },
      {
        id: "stack",
        title: t(locale, "Stack", "Stack"),
        kind: "pairs",
        pairs: [
          {
            key: t(locale, "Moteur", "Engine"),
            value: "Unreal Engine 5",
          },
          {
            key: t(locale, "Langages", "Languages"),
            value: "C++ · Blueprints",
          },
          {
            key: t(locale, "Versioning", "Versioning"),
            value: "Git / Perforce",
          },
        ],
      },
      {
        id: "highlights",
        title: t(locale, "Approche", "Approach"),
        kind: "pairs",
        pairs: [
          {
            key: t(locale, "Preuve", "Proof"),
            value: t(locale, "Études de cas", "Case studies"),
          },
          {
            key: t(locale, "Itération", "Iteration"),
            value: t(locale, "Prototypes courts", "Short prototypes"),
          },
          {
            key: t(locale, "Collab", "Collab"),
            value: t(locale, "Design ↔ engineering", "Design ↔ engineering"),
          },
        ],
      },
      {
        id: "seeking",
        title: t(locale, "Objectif", "Goal"),
        kind: "text",
        body: t(
          locale,
          "Poste Gameplay Programmer (Unreal / C++) — texte placeholder pour la densité UI.",
          "Gameplay Programmer role (Unreal / C++) — placeholder copy for UI density.",
        ),
      },
      {
        id: "values",
        title: t(locale, "Méthode", "Method"),
        kind: "chips",
        chips: t(
          locale,
          ["Debug visible", "Décisions explicites", "Pas de KPI inventé"],
          ["Visible debug", "Named decisions", "No invented KPIs"],
        ),
      },
    ],
    contactTitle: t(locale, "Contact", "Contact"),
    contactNote: t(
      locale,
      "Coordonnées non publiées dans cette démo.",
      "Contact details are not published in this demo.",
    ),
    contactItems: [
      {
        key: t(locale, "E-mail", "Email"),
        value: t(locale, "à brancher", "to wire"),
      },
      {
        key: "LinkedIn",
        value: t(locale, "à brancher", "to wire"),
      },
    ],
  };
}

/** Authentic shell: verified short facts + empty slots, no invented jobs. */
export function buildAuthenticProfile(locale: Locale): ProfileContent {
  return {
    eyebrow: t(locale, "Présentation", "Overview"),
    title: t(locale, "Profil", "Profile"),
    role: t(
      locale,
      "Gameplay Programmer · Unreal Engine / C++",
      "Gameplay Programmer · Unreal Engine / C++",
    ),
    location: t(locale, "France", "France"),
    availability: t(locale, "Sur demande", "On request"),
    pitch: t(
      locale,
      "Diplômé EPITA, orienté gameplay programming Unreal / C++. Les projets portent la preuve.",
      "EPITA graduate focused on Unreal / C++ gameplay programming. Projects carry the proof.",
    ),
    storyBeat: null,
    focusTitle: t(locale, "Axes", "Focus"),
    focus: t(
      locale,
      ["Gameplay systems", "Unreal / C++", "Preuve par projet"],
      ["Gameplay systems", "Unreal / C++", "Proof through projects"],
    ),
    notice: null,
    panels: [
      {
        id: "path",
        title: t(locale, "Parcours", "Background"),
        kind: "timeline",
        entries: [
          {
            label: "EPITA",
            detail: t(
              locale,
              "Diplôme d’ingénieur — formation logicielle.",
              "Engineering degree — software education.",
            ),
            meta: t(locale, "Formation", "Education"),
          },
          {
            label: t(locale, "Expérience", "Experience"),
            detail: t(
              locale,
              "À renseigner — aucun rôle inventé.",
              "To provide — no invented roles.",
            ),
            meta: t(locale, "Placeholder", "Placeholder"),
          },
          {
            label: t(locale, "Projets", "Projects"),
            detail: t(
              locale,
              "À brancher sur les études de cas.",
              "To wire to case studies.",
            ),
            meta: t(locale, "Placeholder", "Placeholder"),
          },
        ],
      },
      {
        id: "skills",
        title: t(locale, "Domaines", "Domains"),
        kind: "chips",
        chips: t(
          locale,
          ["Gameplay", "Unreal / C++", "À compléter"],
          ["Gameplay", "Unreal / C++", "To complete"],
        ),
      },
      {
        id: "stack",
        title: t(locale, "Stack", "Stack"),
        kind: "pairs",
        pairs: [
          { key: t(locale, "Moteur", "Engine"), value: "Unreal Engine 5" },
          {
            key: t(locale, "Autres", "Other"),
            value: t(locale, "À renseigner", "To provide"),
          },
        ],
      },
      {
        id: "highlights",
        title: t(locale, "Approche", "Approach"),
        kind: "pairs",
        pairs: [
          {
            key: t(locale, "Preuve", "Proof"),
            value: t(locale, "Via les projets", "Via projects"),
          },
          {
            key: t(locale, "Métrique", "Metrics"),
            value: t(locale, "Jamais inventée", "Never invented"),
          },
        ],
      },
      {
        id: "seeking",
        title: t(locale, "Objectif", "Goal"),
        kind: "text",
        body: t(
          locale,
          "Candidature Gameplay Programmer — détail à valider.",
          "Gameplay Programmer applications — detail to validate.",
        ),
      },
      {
        id: "values",
        title: t(locale, "Méthode", "Method"),
        kind: "chips",
        chips: t(
          locale,
          ["Projets d’abord", "Clarté"],
          ["Projects first", "Clarity"],
        ),
      },
    ],
    contactTitle: t(locale, "Contact", "Contact"),
    contactNote: t(
      locale,
      "Aucune coordonnée publique tant qu’elle n’est pas approuvée.",
      "No public contact until explicitly approved.",
    ),
    contactItems: [
      {
        key: t(locale, "E-mail", "Email"),
        value: t(locale, "Non publié", "Not published"),
      },
      {
        key: "LinkedIn",
        value: t(locale, "Non publié", "Not published"),
      },
    ],
  };
}
