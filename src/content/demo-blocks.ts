/**
 * Demonstration interactive blocks — Missions 11–12.
 * Explicitly fictional UI patterns. Never authentic evidence.
 */
import {
  allDemoBlockKinds,
  countDenseBlockInstances,
  denseChapterBlocks,
} from "./demo-dense";
import type { Locale } from "./site";

export type DemoBlockKind =
  | "rich-intro"
  | "expand-note"
  | "step-sequence"
  | "approach-compare"
  | "gallery-select"
  | "before-after"
  | "decision-list"
  | "timeline"
  | "tech-flow"
  | "annotation-media"
  | "concept-chips"
  | "checklist"
  | "glossary"
  | "media-text-split"
  | "param-explorer"
  | "related-chapters";

export interface DemoBlockBase {
  id: string;
  kind: DemoBlockKind;
  title: string;
  eyebrow?: string;
}

export interface RichIntroBlock extends DemoBlockBase {
  kind: "rich-intro";
  lead: string;
  body: string;
}

export interface ExpandNoteBlock extends DemoBlockBase {
  kind: "expand-note";
  summary: string;
  detail: string;
  openLabel: string;
  closeLabel: string;
}

export interface StepSequenceBlock extends DemoBlockBase {
  kind: "step-sequence";
  steps: Array<{ id: string; label: string; body: string }>;
}

export interface ApproachCompareBlock extends DemoBlockBase {
  kind: "approach-compare";
  leftLabel: string;
  rightLabel: string;
  leftBody: string;
  rightBody: string;
}

export interface GallerySelectBlock extends DemoBlockBase {
  kind: "gallery-select";
  items: Array<{ id: string; src: string; alt: string; caption: string }>;
}

export interface BeforeAfterBlock extends DemoBlockBase {
  kind: "before-after";
  beforeLabel: string;
  afterLabel: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  note: string;
}

export interface DecisionListBlock extends DemoBlockBase {
  kind: "decision-list";
  items: Array<{ id: string; title: string; body: string }>;
}

export interface TimelineBlock extends DemoBlockBase {
  kind: "timeline";
  items: Array<{ id: string; label: string; body: string }>;
}

export interface TechFlowBlock extends DemoBlockBase {
  kind: "tech-flow";
  nodes: Array<{ id: string; label: string }>;
  note: string;
}

export interface AnnotationMediaBlock extends DemoBlockBase {
  kind: "annotation-media";
  src: string;
  alt: string;
  annotations: Array<{ id: string; label: string; body: string }>;
}

export interface ConceptChipsBlock extends DemoBlockBase {
  kind: "concept-chips";
  concepts: Array<{ id: string; label: string; body: string }>;
}

export interface ChecklistBlock extends DemoBlockBase {
  kind: "checklist";
  items: Array<{ id: string; label: string; done?: boolean }>;
}

export interface GlossaryBlock extends DemoBlockBase {
  kind: "glossary";
  terms: Array<{ id: string; term: string; definition: string }>;
}

export interface MediaTextSplitBlock extends DemoBlockBase {
  kind: "media-text-split";
  src: string;
  alt: string;
  body: string;
}

export interface ParamExplorerBlock extends DemoBlockBase {
  kind: "param-explorer";
  params: Array<{
    id: string;
    label: string;
    value: string;
    explanation: string;
  }>;
}

export interface RelatedChaptersBlock extends DemoBlockBase {
  kind: "related-chapters";
  links: Array<{ id: string; label: string }>;
  note: string;
}

export type DemoBlock =
  | RichIntroBlock
  | ExpandNoteBlock
  | StepSequenceBlock
  | ApproachCompareBlock
  | GallerySelectBlock
  | BeforeAfterBlock
  | DecisionListBlock
  | TimelineBlock
  | TechFlowBlock
  | AnnotationMediaBlock
  | ConceptChipsBlock
  | ChecklistBlock
  | GlossaryBlock
  | MediaTextSplitBlock
  | ParamExplorerBlock
  | RelatedChaptersBlock;

function t<T>(locale: Locale, fr: T, en: T): T {
  return locale === "fr" ? fr : en;
}

/** Compact overview extras (not counted toward the 180 chapter blocks). */
export function overviewBlocksFor(
  projectId: string,
  locale: Locale,
): DemoBlock[] {
  switch (projectId) {
    case "demo-combat-systems":
      return [
        {
          id: "ov-combat-concepts",
          kind: "concept-chips",
          title: t(locale, "Concepts mis en avant", "Highlighted concepts"),
          eyebrow: t(locale, "Démo", "Demo"),
          concepts: [
            {
              id: "windows",
              label: t(locale, "Fenêtres", "Windows"),
              body: t(
                locale,
                "Exemple fictif : lisibilité des fenêtres d’engagement.",
                "Fictional example: readable engagement windows.",
              ),
            },
            {
              id: "feedback",
              label: "Feedback",
              body: t(
                locale,
                "Exemple fictif : couche de feedback partagée.",
                "Fictional example: shared feedback layer.",
              ),
            },
            {
              id: "dash",
              label: "Dash",
              body: t(
                locale,
                "Exemple fictif : déplacement intégré au kit.",
                "Fictional example: movement integrated into the kit.",
              ),
            },
          ],
        },
      ];
    case "demo-coop-arena":
      return [
        {
          id: "ov-coop-gallery",
          kind: "gallery-select",
          title: t(locale, "Galerie sélectionnable", "Selectable gallery"),
          items: [
            {
              id: "a",
              src: "/demo/media-coop-a.svg",
              alt: "A",
              caption: t(locale, "Rôle A", "Role A"),
            },
            {
              id: "b",
              src: "/demo/media-coop-b.svg",
              alt: "B",
              caption: t(locale, "Rôle B", "Role B"),
            },
            {
              id: "c",
              src: "/demo/media-coop-c.svg",
              alt: "C",
              caption: t(locale, "Arène", "Arena"),
            },
          ],
        },
      ];
    default:
      return [];
  }
}

export function chapterBlocksFor(
  projectId: string,
  chapterId: string,
  locale: Locale,
): DemoBlock[] {
  return denseChapterBlocks(projectId, chapterId, locale);
}

export function countDemoInteractiveInstances(locale: Locale = "fr"): number {
  return countDenseBlockInstances(locale);
}

export function listDistinctBlockKinds(): DemoBlockKind[] {
  return allDemoBlockKinds();
}
