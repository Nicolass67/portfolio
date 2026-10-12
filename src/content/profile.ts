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
  focusTitle: string;
  focus: string[];
  /** Banner when content is illustrative / awaiting real copy. */
  notice: string | null;
  panels: ProfilePanel[];
  contactTitle: string;
  contactNote: string;
  contactItems: ProfilePair[];
};

function t<T>(locale: Locale, fr: T, en: T): T {
  return locale === "fr" ? fr : en;
}

/** Rich fictional profile for UI review (demo mode). Not real experience. */
export function buildDemoProfile(locale: Locale): ProfileContent {
  return {
    eyebrow: t(locale, "Profil illustratif", "Illustrative profile"),
    title: t(locale, "Profil", "Profile"),
    role: t(
      locale,
      "Gameplay Programmer · Unreal Engine / C++",
      "Gameplay Programmer · Unreal Engine / C++",
    ),
    location: t(
      locale,
      "France · Hybride / remote (placeholder)",
      "France · Hybrid / remote (placeholder)",
    ),
    availability: t(
      locale,
      "Ouvert aux opportunités",
      "Open to opportunities",
    ),
    pitch: t(
      locale,
      "Texte fictif pour juger la densité du profil : systèmes de gameplay lisibles, itérations rapides, et preuve technique via les études de cas plutôt qu’un CV générique.",
      "Fictional copy to judge profile density: readable gameplay systems, fast iteration, and technical proof through case studies rather than a generic résumé.",
    ),
    focusTitle: t(locale, "Axes", "Focus"),
    focus: t(
      locale,
      ["Combat & abilities", "IA / comportements", "Outils gameplay", "Netcode léger"],
      ["Combat & abilities", "AI / behaviors", "Gameplay tools", "Light netcode"],
    ),
    notice: t(
      locale,
      "Contenu placeholder — fictif, pour revue de mise en page uniquement.",
      "Placeholder content — fictional, layout review only.",
    ),
    panels: [
      {
        id: "path",
        title: t(locale, "Parcours (exemple)", "Path (sample)"),
        kind: "timeline",
        entries: [
          {
            label: t(locale, "Studio Exemple", "Example Studio"),
            detail: t(
              locale,
              "Gameplay programmer (stage / fictif) — prototypage combat, debug tools.",
              "Gameplay programmer (intern / fictional) — combat prototyping, debug tools.",
            ),
            meta: t(locale, "2025 · Placeholder", "2025 · Placeholder"),
          },
          {
            label: t(locale, "Projet perso TEL", "Personal project TEL"),
            detail: t(
              locale,
              "Prototype Unreal solo — rencontres, GAS, State Tree (preuve technique réelle à brancher).",
              "Solo Unreal prototype — encounters, GAS, State Tree (real proof to wire in).",
            ),
            meta: t(locale, "En cours · Placeholder", "Ongoing · Placeholder"),
          },
          {
            label: "EPITA",
            detail: t(
              locale,
              "Diplôme d’ingénieur — socle logiciel (fait vérifié côté formation).",
              "Engineering degree — software foundation (verified education fact).",
            ),
            meta: t(locale, "Formation", "Education"),
          },
        ],
      },
      {
        id: "skills",
        title: t(locale, "Compétences (placeholder)", "Skills (placeholder)"),
        kind: "chips",
        chips: t(
          locale,
          [
            "C++",
            "Unreal Engine 5",
            "Gameplay Ability System",
            "State Tree",
            "Replication de base",
            "Outils éditeur",
            "Profiling gameplay",
            "Design collab",
          ],
          [
            "C++",
            "Unreal Engine 5",
            "Gameplay Ability System",
            "State Tree",
            "Basic replication",
            "Editor tools",
            "Gameplay profiling",
            "Design collab",
          ],
        ),
      },
      {
        id: "stack",
        title: t(locale, "Stack & outils", "Stack & tools"),
        kind: "pairs",
        pairs: [
          {
            key: t(locale, "Moteur", "Engine"),
            value: "Unreal Engine 5.x",
          },
          {
            key: t(locale, "Langages", "Languages"),
            value: "C++, Blueprints (ponctuel)",
          },
          {
            key: t(locale, "Versioning", "Versioning"),
            value: "Git / Perforce (placeholder)",
          },
          {
            key: t(locale, "Suivi", "Tracking"),
            value: t(locale, "Jira / Notion (exemple)", "Jira / Notion (sample)"),
          },
        ],
      },
      {
        id: "languages",
        title: t(locale, "Langues", "Languages"),
        kind: "pairs",
        pairs: [
          {
            key: t(locale, "Français", "French"),
            value: t(locale, "Natif", "Native"),
          },
          {
            key: t(locale, "Anglais", "English"),
            value: t(
              locale,
              "Professionnel (placeholder)",
              "Professional (placeholder)",
            ),
          },
        ],
      },
      {
        id: "seeking",
        title: t(locale, "Ce que je cherche", "What I’m looking for"),
        kind: "text",
        body: t(
          locale,
          "Poste Gameplay Programmer (CDI / freelance ponctuel — texte fictif). Environnement qui valorise les prototypes mesurables, la clarté des systèmes et la collaboration design/engineering.",
          "Gameplay Programmer role (permanent / short freelance — fictional copy). An environment that values measurable prototypes, clear systems, and design/engineering collaboration.",
        ),
      },
      {
        id: "values",
        title: t(locale, "Manière de travailler", "How I work"),
        kind: "chips",
        chips: t(
          locale,
          [
            "Preuve avant slide",
            "Boucles courtes",
            "Debug visible",
            "Docs utiles",
            "Pas de métriques inventées",
          ],
          [
            "Proof before slides",
            "Short loops",
            "Visible debug",
            "Useful docs",
            "No invented metrics",
          ],
        ),
      },
    ],
    contactTitle: t(locale, "Contact", "Contact"),
    contactNote: t(
      locale,
      "Coordonnées non publiées dans cette démo. Remplacer par e-mail / LinkedIn validés.",
      "Contact details are not published in this demo. Replace with approved email / LinkedIn.",
    ),
    contactItems: [
      {
        key: t(locale, "E-mail", "Email"),
        value: t(locale, "prenom.nom@exemple.fr", "name@example.com"),
      },
      {
        key: "LinkedIn",
        value: t(locale, "linkedin.com/in/exemple", "linkedin.com/in/example"),
      },
      {
        key: t(locale, "Disponibilité", "Availability"),
        value: t(
          locale,
          "Réponse sous 48h (placeholder)",
          "Reply within 48h (placeholder)",
        ),
      },
    ],
  };
}

/** Structured authentic shell: verified short facts + empty slots, no invented jobs. */
export function buildAuthenticProfile(locale: Locale): ProfileContent {
  return {
    eyebrow: t(locale, "Parcours", "Background"),
    title: t(locale, "Profil", "Profile"),
    role: t(
      locale,
      "Gameplay Programmer · Unreal Engine / C++",
      "Gameplay Programmer · Unreal Engine / C++",
    ),
    location: t(locale, "France", "France"),
    availability: t(
      locale,
      "Coordonnées sur demande",
      "Contact details on request",
    ),
    pitch: t(
      locale,
      "Développeur logiciel français diplômé de l’EPITA, orienté vers le gameplay programming avec Unreal Engine et C++. Les projets et choix techniques priment sur la biographie.",
      "A French EPITA graduate with software development experience, moving towards gameplay programming with Unreal Engine and C++. Projects and technical choices come before biography.",
    ),
    focusTitle: t(locale, "Axes", "Focus"),
    focus: t(
      locale,
      ["Gameplay systems", "Unreal / C++", "Preuves par projet"],
      ["Gameplay systems", "Unreal / C++", "Proof through projects"],
    ),
    notice: t(
      locale,
      "Sections ci-dessous en attente de contenu validé — structure UI seulement.",
      "Sections below await validated content — UI structure only.",
    ),
    panels: [
      {
        id: "path",
        title: t(locale, "Parcours", "Path"),
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
            label: t(locale, "Expérience pro", "Professional experience"),
            detail: t(
              locale,
              "À renseigner — aucun rôle inventé ici.",
              "To be provided — no invented roles here.",
            ),
            meta: t(locale, "Placeholder", "Placeholder"),
          },
        ],
      },
      {
        id: "skills",
        title: t(locale, "Compétences", "Skills"),
        kind: "chips",
        chips: t(
          locale,
          ["C++", "Unreal Engine", "À compléter…"],
          ["C++", "Unreal Engine", "To complete…"],
        ),
      },
      {
        id: "stack",
        title: t(locale, "Stack & outils", "Stack & tools"),
        kind: "pairs",
        pairs: [
          { key: t(locale, "Moteur", "Engine"), value: "Unreal Engine 5" },
          {
            key: t(locale, "Autres", "Other"),
            value: t(locale, "À renseigner", "To be provided"),
          },
        ],
      },
      {
        id: "languages",
        title: t(locale, "Langues", "Languages"),
        kind: "pairs",
        pairs: [
          {
            key: t(locale, "Français", "French"),
            value: t(locale, "Natif", "Native"),
          },
          {
            key: t(locale, "Anglais", "English"),
            value: t(locale, "À préciser", "To confirm"),
          },
        ],
      },
      {
        id: "seeking",
        title: t(locale, "Objectif", "Goal"),
        kind: "text",
        body: t(
          locale,
          "Candidature Gameplay Programmer — détail d’objectif à valider.",
          "Gameplay Programmer applications — goal detail to validate.",
        ),
      },
      {
        id: "values",
        title: t(locale, "Principes", "Principles"),
        kind: "chips",
        chips: t(
          locale,
          ["Projets d’abord", "Pas de métrique inventée", "Clarté"],
          ["Projects first", "No invented metrics", "Clarity"],
        ),
      },
    ],
    contactTitle: t(locale, "Contact", "Contact"),
    contactNote: t(
      locale,
      "Aucune coordonnée publique n’est affichée tant qu’elle n’a pas été explicitement approuvée.",
      "No public contact detail is displayed until it has been explicitly approved.",
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
