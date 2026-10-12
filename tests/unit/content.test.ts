import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  DEFAULT_ACCENT_ID,
  accentPalette,
} from "../../src/content/accent-palette";
import { DEFAULT_BG_ID } from "../../src/content/bg-palette";
import {
  chapterBlocksFor,
  countDemoInteractiveInstances,
  listDistinctBlockKinds,
  overviewBlocksFor,
} from "../../src/content/demo-blocks";
import {
  countDenseChapters,
  DENSE_TARGET_BLOCKS,
  DENSE_TARGET_CHAPTERS,
} from "../../src/content/demo-dense";
import {
  DEMO_PROJECT_COUNT,
  buildDemoProjects,
} from "../../src/content/demo-projects";
import {
  DEFAULT_VISUAL_DIRECTION,
  isVisualDirection,
  visualDirections,
} from "../../src/content/portfolio-mode";
import {
  assertLocaleCompleteness,
  getAlternatePath,
  getAuthenticProjects,
  getFeaturedProject,
  getSiteContent,
  locales,
} from "../../src/content/site";

describe("bilingual project content model", () => {
  it("keeps both locales complete and aligned for authentic and demo sets", () => {
    expect(assertLocaleCompleteness()).toBe(true);
    expect(locales).toEqual(["fr", "en"]);
  });

  it("uses French as the default route and English under /en/", () => {
    expect(getAlternatePath("fr")).toBe("/en/");
    expect(getAlternatePath("en")).toBe("/");
  });

  it("keeps authentic TEL content separate from demonstration projects", () => {
    for (const locale of locales) {
      const authentic = getAuthenticProjects(locale);
      expect(authentic).toHaveLength(1);
      expect(authentic[0].id).toBe("tactical-encounter-lab");
      expect(authentic[0].demonstrationOnly).toBe(false);

      const demo = buildDemoProjects(locale);
      expect(demo).toHaveLength(DEMO_PROJECT_COUNT);
      expect(demo.every((project) => project.demonstrationOnly)).toBe(true);
    }
  });

  it("exposes workspace labels for case study navigation", () => {
    for (const locale of locales) {
      const content = getSiteContent(locale);
      expect(content.explorer.caseStudyAction.trim()).not.toBe("");
      expect(content.explorer.caseStudyHint.trim()).not.toBe("");
      expect(content.explorer.openStudyAction.trim()).not.toBe("");
      expect(content.explorer.backToProject.trim()).not.toBe("");
      expect(content.explorer.projectIndexLabel.trim()).not.toBe("");
      expect(
        getFeaturedProject(locale).caseStudy.chapters.length,
      ).toBeGreaterThan(0);
    }
  });

  it("covers the required demo media variety", () => {
    const demo = buildDemoProjects("fr");
    const kinds = demo.map((project) => project.featuredMedia?.kind);
    expect(kinds).toContain("image");
    expect(kinds).toContain("video");
    expect(kinds).toContain("gallery");
    expect(kinds).toContain("diagram");
    expect(kinds).toContain("none");
  });

  it("resolves every referenced local demo media asset on disk", () => {
    const demo = buildDemoProjects("fr");
    const paths = new Set<string>();

    for (const project of demo) {
      const media = project.featuredMedia;
      if (!media) continue;
      if (media.src) paths.add(media.src);
      if (media.poster) paths.add(media.poster);
      for (const source of media.sources ?? []) paths.add(source);
      for (const chapter of project.caseStudy.chapters) {
        if (chapter.media?.src) paths.add(chapter.media.src);
        if (chapter.media?.poster) paths.add(chapter.media.poster);
        for (const source of chapter.media?.sources ?? []) paths.add(source);
      }
      for (const block of overviewBlocksFor(project.id, "fr")) {
        if (block.kind === "gallery-select") {
          for (const item of block.items) paths.add(item.src);
        }
        if (block.kind === "before-after") {
          paths.add(block.beforeSrc);
          paths.add(block.afterSrc);
        }
        if (block.kind === "annotation-media") paths.add(block.src);
      }
      for (const chapter of project.caseStudy.chapters) {
        for (const block of chapterBlocksFor(project.id, chapter.id, "fr")) {
          if (block.kind === "gallery-select") {
            for (const item of block.items) paths.add(item.src);
          }
          if (block.kind === "before-after") {
            paths.add(block.beforeSrc);
            paths.add(block.afterSrc);
          }
          if (block.kind === "annotation-media") paths.add(block.src);
          if (block.kind === "media-text-split") paths.add(block.src);
        }
      }
    }

    for (const assetPath of paths) {
      expect(assetPath.startsWith("/")).toBe(true);
      const diskPath = join(process.cwd(), "public", assetPath.slice(1));
      expect(existsSync(diskPath), `missing asset ${assetPath}`).toBe(true);
    }
  });

  it("exposes three light visual candidates with studio as default", () => {
    expect(visualDirections).toEqual(["precision", "immersive", "studio"]);
    expect(DEFAULT_VISUAL_DIRECTION).toBe("studio");
    expect(isVisualDirection("dark")).toBe(false);
    expect(isVisualDirection("light")).toBe(false);
  });

  it("provides a substantial accent palette and rich demo interactives", () => {
    expect(accentPalette.length).toBeGreaterThanOrEqual(24);
    expect(accentPalette.length).toBeLessThanOrEqual(40);
    expect(DEFAULT_ACCENT_ID).toBe("slate");
    expect(DEFAULT_BG_ID).toBe("chalk");
    expect(countDemoInteractiveInstances("fr")).toBeGreaterThanOrEqual(
      DENSE_TARGET_BLOCKS,
    );
    expect(countDenseChapters()).toBeGreaterThanOrEqual(DENSE_TARGET_CHAPTERS);
    expect(listDistinctBlockKinds().length).toBeGreaterThanOrEqual(12);
  });

  it("gives every demo project at least six dense chapters", () => {
    for (const project of buildDemoProjects("fr")) {
      expect(project.caseStudy.chapters.length).toBeGreaterThanOrEqual(6);
      for (const chapter of project.caseStudy.chapters) {
        expect(
          chapterBlocksFor(project.id, chapter.id, "fr").length,
        ).toBeGreaterThanOrEqual(5);
      }
    }
  });
});
