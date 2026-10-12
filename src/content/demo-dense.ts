/**
 * Mission 12 — dense demonstration catalog.
 * Fictional content for layout stress-testing. Never authentic credentials.
 */
import type { DemoBlock, DemoBlockKind } from "./demo-blocks";
import type { ChapterContent, Locale, MediaItem } from "./site";

export const DENSE_CHAPTER_COUNT_PER_PROJECT = 6;
export const DENSE_TARGET_CHAPTERS = 36;
export const DENSE_TARGET_BLOCKS = 180;

type ProjectTheme = {
  id: string;
  focusFr: string;
  focusEn: string;
};

const THEMES: ProjectTheme[] = [
  { id: "demo-combat-systems", focusFr: "combat", focusEn: "combat" },
  { id: "demo-ai-sandbox", focusFr: "IA", focusEn: "AI" },
  { id: "demo-coop-arena", focusFr: "coop", focusEn: "co-op" },
  { id: "demo-traversal-lab", focusFr: "traversal", focusEn: "traversal" },
  { id: "demo-systems-toolkit", focusFr: "outil", focusEn: "tooling" },
  { id: "demo-encounter-director", focusFr: "rencontre", focusEn: "encounter" },
];

const CHAPTER_IDS = [
  "intent",
  "architecture",
  "systems",
  "tradeoffs",
  "tooling",
  "validation",
] as const;

const ASSETS = {
  combat: "/demo/media-combat.svg",
  ai: "/demo/media-ai.svg",
  coopA: "/demo/media-coop-a.svg",
  coopB: "/demo/media-coop-b.svg",
  coopC: "/demo/media-coop-c.svg",
  traversal: "/demo/media-traversal.svg",
  diagram: "/demo/media-diagram.svg",
};

function t<T>(locale: Locale, fr: T, en: T): T {
  return locale === "fr" ? fr : en;
}

function chapterMeta(
  locale: Locale,
  theme: ProjectTheme,
  chapterId: (typeof CHAPTER_IDS)[number],
  index: number,
): Pick<ChapterContent, "title" | "eyebrow" | "intro" | "paragraphs"> {
  const n = String(index + 1).padStart(2, "0");
  const focus = t(locale, theme.focusFr, theme.focusEn);
  const titles: Record<
    (typeof CHAPTER_IDS)[number],
    { fr: string; en: string }
  > = {
    intent: {
      fr: `Intention ${focus}`,
      en: `${focus} intent`,
    },
    architecture: {
      fr: `Architecture ${focus}`,
      en: `${focus} architecture`,
    },
    systems: {
      fr: `Boucles système`,
      en: `System loops`,
    },
    tradeoffs: {
      fr: `Arbitrages techniques`,
      en: `Technical trade-offs`,
    },
    tooling: {
      fr: `Outils & debug`,
      en: `Tools & debug`,
    },
    validation: {
      fr: `Validation démo`,
      en: `Demo validation`,
    },
  };
  const title = t(locale, titles[chapterId].fr, titles[chapterId].en);
  return {
    title,
    eyebrow: t(locale, `Chapitre ${n}`, `Chapter ${n}`),
    intro: t(
      locale,
      `Contenu fictif dense pour évaluer une étude de cas ${focus} — aucune preuve réelle.`,
      `Dense fictional content to evaluate a ${focus} case study — no authentic evidence.`,
    ),
    paragraphs: [
      t(
        locale,
        `Ce chapitre démontre une lecture technique progressive : synthèse, média, détails interactifs. Les formulations restent illustratives et marquées comme démonstration.`,
        `This chapter demonstrates progressive technical reading: summary, media, interactive details. Wording stays illustrative and marked as demonstration.`,
      ),
      t(
        locale,
        `Les blocs suivants stress-testent la densité d’information sans prétendre à des métriques ou résultats mesurés.`,
        `The following blocks stress-test information density without claiming metrics or measured outcomes.`,
      ),
    ],
  };
}

function chapterMedia(
  theme: ProjectTheme,
  chapterIndex: number,
  locale: Locale,
): MediaItem | null {
  const focus = t(locale, theme.focusFr, theme.focusEn);
  const mode = chapterIndex % 6;
  switch (mode) {
    case 0:
      return {
        id: `${theme.id}-ch-img`,
        kind: "image",
        src: ASSETS.combat,
        alt: t(locale, `Illustration ${focus}`, `${focus} illustration`),
        caption: t(
          locale,
          "Asset illustratif · démo",
          "Illustrative asset · demo",
        ),
        aspectRatio: "16 / 9",
      };
    case 1:
      return {
        id: `${theme.id}-ch-diagram`,
        kind: "diagram",
        src: ASSETS.diagram,
        alt: t(locale, `Diagramme ${focus}`, `${focus} diagram`),
        caption: t(locale, "Schéma fictif", "Fictional schematic"),
        aspectRatio: "16 / 9",
      };
    case 2:
      return {
        id: `${theme.id}-ch-gallery`,
        kind: "gallery",
        sources: [ASSETS.coopA, ASSETS.coopB, ASSETS.coopC],
        alt: t(locale, "Galerie démo", "Demo gallery"),
        caption: t(locale, "Séquence illustrative", "Illustrative sequence"),
        aspectRatio: "16 / 9",
      };
    case 3:
      return {
        id: `${theme.id}-ch-video`,
        kind: "video",
        poster: ASSETS.ai,
        alt: t(locale, "Emplacement vidéo", "Video slot"),
        caption: t(
          locale,
          "Aperçu vidéo illustratif · aucun clip réel",
          "Illustrative video preview · no real clip",
        ),
        aspectRatio: "16 / 9",
      };
    case 4:
      return {
        id: `${theme.id}-ch-yt`,
        kind: "youtube",
        poster: ASSETS.traversal,
        // No public gameplay video claimed — click-to-load stays placeholder unless configured.
        youtubeId: undefined,
        embedTitle: t(locale, `Lecteur démo ${focus}`, `${focus} demo player`),
        alt: t(locale, "Emplacement YouTube démo", "Demo YouTube slot"),
        caption: t(
          locale,
          "YouTube configurable · placeholder tant qu’aucun id n’est fourni",
          "Configurable YouTube · placeholder until an id is provided",
        ),
        aspectRatio: "16 / 9",
      };
    default:
      return {
        id: `${theme.id}-ch-none`,
        kind: "none",
        aspectRatio: "16 / 9",
      };
  }
}

export function buildDenseChapters(
  projectId: string,
  locale: Locale,
): ChapterContent[] {
  const theme = THEMES.find((item) => item.id === projectId);
  if (!theme) return [];
  return CHAPTER_IDS.map((chapterId, index) => ({
    id: chapterId,
    ...chapterMeta(locale, theme, chapterId, index),
    media: chapterMedia(theme, index, locale),
  }));
}

function blockKindsCycle(): DemoBlockKind[] {
  return [
    "rich-intro",
    "expand-note",
    "step-sequence",
    "approach-compare",
    "gallery-select",
    "before-after",
    "decision-list",
    "timeline",
    "tech-flow",
    "annotation-media",
    "concept-chips",
    "checklist",
    "glossary",
    "media-text-split",
    "param-explorer",
    "related-chapters",
  ];
}

export function allDemoBlockKinds(): DemoBlockKind[] {
  return blockKindsCycle();
}

function makeBlock(
  kind: DemoBlockKind,
  locale: Locale,
  projectId: string,
  chapterId: string,
  slot: number,
): DemoBlock {
  const id = `${projectId}-${chapterId}-b${slot}-${kind}`;
  const demo = t(locale, "Démo", "Demo");
  const fictional = t(
    locale,
    "Exemple fictif pour stress-tester l’interface.",
    "Fictional example to stress-test the interface.",
  );

  switch (kind) {
    case "rich-intro":
      return {
        id,
        kind,
        title: t(locale, "Lecture technique", "Technical reading"),
        eyebrow: demo,
        lead: t(
          locale,
          "Synthèse dense : contexte, contraintes, et points d’attention pour ce chapitre de démonstration.",
          "Dense summary: context, constraints, and focus points for this demonstration chapter.",
        ),
        body: t(
          locale,
          "Le texte reste volontairement crédible sans inventer de résultats. Il sert à évaluer wrap, densité et hiérarchie typographique FR/EN.",
          "The text stays deliberately plausible without inventing outcomes. It evaluates wrap, density and FR/EN typographic hierarchy.",
        ),
      };
    case "expand-note":
      return {
        id,
        kind,
        title: t(locale, "Note d’implémentation", "Implementation note"),
        summary: fictional,
        detail: t(
          locale,
          "Détail étendu : hypothèses, limites assumées, et ce qui resterait à confirmer sur un vrai projet. Aucune métrique inventée.",
          "Expanded detail: assumptions, accepted limits, and what would still need confirmation on a real project. No invented metrics.",
        ),
        openLabel: t(locale, "Développer", "Expand"),
        closeLabel: t(locale, "Réduire", "Collapse"),
      };
    case "step-sequence":
      return {
        id,
        kind,
        title: t(locale, "Séquence", "Sequence"),
        steps: [1, 2, 3].map((n) => ({
          id: `s${n}`,
          label: t(locale, `Étape ${n}`, `Step ${n}`),
          body: t(
            locale,
            `Description illustrative de l’étape ${n} — contenu de démonstration.`,
            `Illustrative description of step ${n} — demonstration content.`,
          ),
        })),
      };
    case "approach-compare":
      return {
        id,
        kind,
        title: t(locale, "Deux approches", "Two approaches"),
        leftLabel: t(locale, "Option A", "Option A"),
        rightLabel: t(locale, "Option B", "Option B"),
        leftBody: t(
          locale,
          "Approche A (fictive) : plus simple à démarrer, couplage plus fort.",
          "Approach A (fictional): simpler to start, tighter coupling.",
        ),
        rightBody: t(
          locale,
          "Approche B (fictive) : plus découpée, coût d’intégration plus visible.",
          "Approach B (fictional): more split, integration cost more visible.",
        ),
      };
    case "gallery-select":
      return {
        id,
        kind,
        title: t(locale, "Galerie", "Gallery"),
        eyebrow: demo,
        items: [
          {
            id: "g1",
            src: ASSETS.coopA,
            alt: "A",
            caption: t(locale, "Vue A (illustratif)", "View A (illustrative)"),
          },
          {
            id: "g2",
            src: ASSETS.coopB,
            alt: "B",
            caption: t(locale, "Vue B (illustratif)", "View B (illustrative)"),
          },
          {
            id: "g3",
            src: ASSETS.diagram,
            alt: "C",
            caption: t(locale, "Vue C (illustratif)", "View C (illustrative)"),
          },
        ],
      };
    case "before-after":
      return {
        id,
        kind,
        title: t(locale, "Comparaison", "Comparison"),
        beforeLabel: t(locale, "Avant", "Before"),
        afterLabel: t(locale, "Après", "After"),
        beforeSrc: ASSETS.traversal,
        afterSrc: ASSETS.diagram,
        beforeAlt: t(locale, "État A", "State A"),
        afterAlt: t(locale, "État B", "State B"),
        note: t(
          locale,
          "Comparaison illustrative — aucun résultat mesuré.",
          "Illustrative comparison — no measured result.",
        ),
      };
    case "decision-list":
      return {
        id,
        kind,
        title: t(locale, "Décisions", "Decisions"),
        items: [1, 2, 3].map((n) => ({
          id: `d${n}`,
          title: t(locale, `Décision ${n}`, `Decision ${n}`),
          body: t(
            locale,
            `Rationale fictive ${n} : trade-off exposé pour la revue UI.`,
            `Fictional rationale ${n}: trade-off exposed for UI review.`,
          ),
        })),
      };
    case "timeline":
      return {
        id,
        kind,
        title: t(locale, "Timeline", "Timeline"),
        items: [1, 2, 3].map((n) => ({
          id: `t${n}`,
          label: t(locale, `Événement ${n}`, `Event ${n}`),
          body: t(
            locale,
            `Contexte fictif pour l’événement ${n}.`,
            `Fictional context for event ${n}.`,
          ),
        })),
      };
    case "tech-flow":
      return {
        id,
        kind,
        title: t(locale, "Flux", "Flow"),
        nodes: [
          { id: "n1", label: t(locale, "Entrée", "Input") },
          { id: "n2", label: t(locale, "Traitement", "Process") },
          { id: "n3", label: t(locale, "Sortie", "Output") },
        ],
        note: fictional,
      };
    case "annotation-media":
      return {
        id,
        kind,
        title: t(locale, "Annotations", "Annotations"),
        src: ASSETS.ai,
        alt: t(locale, "Schéma annoté démo", "Annotated demo schematic"),
        annotations: [
          {
            id: "a1",
            label: t(locale, "Zone A", "Zone A"),
            body: fictional,
          },
          {
            id: "a2",
            label: t(locale, "Zone B", "Zone B"),
            body: t(
              locale,
              "Seconde annotation illustrative.",
              "Second illustrative annotation.",
            ),
          },
        ],
      };
    case "concept-chips":
      return {
        id,
        kind,
        title: t(locale, "Concepts", "Concepts"),
        concepts: ["Alpha", "Beta", "Gamma"].map((label, i) => ({
          id: `c${i}`,
          label,
          body: t(
            locale,
            `Concept ${label} — explication fictive courte.`,
            `Concept ${label} — short fictional explanation.`,
          ),
        })),
      };
    case "checklist":
      return {
        id,
        kind,
        title: t(locale, "Checklist démo", "Demo checklist"),
        items: [1, 2, 3, 4].map((n) => ({
          id: `k${n}`,
          label: t(locale, `Point de revue ${n}`, `Review point ${n}`),
          done: n % 2 === 0,
        })),
      };
    case "glossary":
      return {
        id,
        kind,
        title: t(locale, "Glossaire", "Glossary"),
        terms: [
          {
            id: "term1",
            term: "GAS",
            definition: t(
              locale,
              "Terme illustratif dans ce contexte de démo.",
              "Illustrative term in this demo context.",
            ),
          },
          {
            id: "term2",
            term: t(locale, "Fenêtre", "Window"),
            definition: fictional,
          },
          {
            id: "term3",
            term: "State Tree",
            definition: t(
              locale,
              "Libellé technique volontairement générique.",
              "Deliberately generic technical label.",
            ),
          },
        ],
      };
    case "media-text-split":
      return {
        id,
        kind,
        title: t(locale, "Média + texte", "Media + text"),
        src: ASSETS.diagram,
        alt: t(locale, "Visuel d’accompagnement", "Supporting visual"),
        body: t(
          locale,
          "Composition split pour tester image + explication côte à côte dans le canvas chapitre.",
          "Split composition to test image + explanation side by side in the chapter canvas.",
        ),
      };
    case "param-explorer":
      return {
        id,
        kind,
        title: t(locale, "Paramètres (démo)", "Parameters (demo)"),
        params: [
          {
            id: "p1",
            label: t(locale, "Seuil", "Threshold"),
            value: t(locale, "Moyen", "Medium"),
            explanation: fictional,
          },
          {
            id: "p2",
            label: t(locale, "Délai", "Delay"),
            value: "120 ms",
            explanation: t(
              locale,
              "Valeur illustrative — non mesurée.",
              "Illustrative value — not measured.",
            ),
          },
          {
            id: "p3",
            label: "Blend",
            value: "0.35",
            explanation: t(
              locale,
              "Curseur conceptuel pour la revue UI.",
              "Conceptual control for UI review.",
            ),
          },
        ],
      };
    case "related-chapters":
      return {
        id,
        kind,
        title: t(locale, "Chapitres liés", "Related chapters"),
        links: CHAPTER_IDS.filter((c) => c !== chapterId)
          .slice(0, 3)
          .map((c) => ({
            id: c,
            label: c,
          })),
        note: t(
          locale,
          "Navigation interne démo — sélectionne le chapitre lié.",
          "Internal demo navigation — selects the related chapter.",
        ),
      };
    default:
      return {
        id,
        kind: "expand-note",
        title: demo,
        summary: fictional,
        detail: fictional,
        openLabel: t(locale, "Ouvrir", "Open"),
        closeLabel: t(locale, "Fermer", "Close"),
      };
  }
}

/** Five varied blocks per chapter → 6 projects × 6 chapters × 5 = 180. */
export function denseChapterBlocks(
  projectId: string,
  chapterId: string,
  locale: Locale,
): DemoBlock[] {
  const themeIndex = Math.max(
    0,
    THEMES.findIndex((theme) => theme.id === projectId),
  );
  const chapterIndex = Math.max(0, CHAPTER_IDS.indexOf(chapterId as never));
  const kinds = blockKindsCycle();
  const start = (themeIndex * 6 + chapterIndex) % kinds.length;
  const selected = [0, 1, 2, 3, 4].map(
    (offset) => kinds[(start + offset) % kinds.length],
  );
  return selected.map((kind, slot) =>
    makeBlock(kind, locale, projectId, chapterId, slot),
  );
}

export function countDenseBlockInstances(locale: Locale = "fr"): number {
  let total = 0;
  for (const theme of THEMES) {
    for (const chapterId of CHAPTER_IDS) {
      total += denseChapterBlocks(theme.id, chapterId, locale).length;
    }
  }
  return total;
}

export function countDenseChapters(): number {
  return THEMES.length * CHAPTER_IDS.length;
}
