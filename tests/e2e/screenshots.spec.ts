import { expect, test } from "@playwright/test";
import { appPath } from "./paths";

const shotDir = "artifacts/screenshots";
const ACCENTS = ["ultramarine", "teal", "crimson"] as const;

test.describe("reference screenshots", () => {
  test("captures workspace states", async ({ page }, testInfo) => {
    test.setTimeout(120_000);
    const isMobile = testInfo.project.name.includes("mobile");
    const suffix = isMobile ? "mobile" : "desktop";

    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 900 });
    }

    await page.goto(appPath("/"));
    await page.evaluate(() => {
      sessionStorage.removeItem("portfolio-workspace-state");
      sessionStorage.removeItem("portfolio-accent-review");
      sessionStorage.removeItem("portfolio-bg-review");
    });
    await page.reload();
    await page.locator("[data-project-card].is-active").waitFor();

    await page.screenshot({
      path: `${shotDir}/projects-p1-fr-${suffix}.png`,
      fullPage: false,
    });

    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-ai-sandbox"]',
      )
      .click();
    await page.screenshot({
      path: `${shotDir}/projects-p2-fr-${suffix}.png`,
      fullPage: false,
    });

    await page
      .locator('[data-project-card].is-active [data-open-case-study="copy"]')
      .click();
    await page.screenshot({
      path: `${shotDir}/case-overview-fr-${suffix}.png`,
      fullPage: false,
    });

    await page
      .locator(
        '[data-case-rail].is-active [data-chapter-select][data-chapter-id="systems"]',
      )
      .click();
    await page.screenshot({
      path: `${shotDir}/case-chapter-fr-${suffix}.png`,
      fullPage: false,
    });

    if (!isMobile) {
      await page.screenshot({
        path: `${shotDir}/nav-case-chapters-fr-desktop.png`,
        fullPage: false,
      });
      await page.screenshot({
        path: `${shotDir}/nav-project-jump-fr-desktop.png`,
        fullPage: false,
      });
      await page.screenshot({
        path: `${shotDir}/case-no-scrollbar-fr-desktop.png`,
        fullPage: false,
      });

      await page
        .locator(
          '[data-case-rail].is-active [data-project-switch][data-project-id="demo-combat-systems"]',
        )
        .click();
      await expect(page.locator("[data-workspace]")).toHaveAttribute(
        "data-project-mode",
        "overview",
      );
      await page.screenshot({
        path: `${shotDir}/case-project-switch-fr-desktop.png`,
        fullPage: false,
      });
    }

    const closeCase = page.locator("[data-case-rail-back]");
    if (await closeCase.isVisible()) {
      await closeCase.click();
    }
    await page.locator('[data-view-nav="profile"]').click();
    await page.screenshot({
      path: `${shotDir}/profile-fr-${suffix}.png`,
      fullPage: false,
    });

    await page.locator('[data-view-nav="projects"]').click();
    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-encounter-director"]',
      )
      .click();
    await page.screenshot({
      path: `${shotDir}/project-no-media-fr-${suffix}.png`,
      fullPage: false,
    });

    if (!isMobile) {
      await page.evaluate(() => {
        sessionStorage.removeItem("portfolio-workspace-state");
        sessionStorage.removeItem("portfolio-accent-review");
        sessionStorage.removeItem("portfolio-bg-review");
      });
      await page.goto(appPath("/"));
      await page.locator("[data-project-card].is-active").waitFor();

      for (const accent of ACCENTS) {
        await page.locator("[data-accent-toggle]").click();
        await page
          .locator(`[data-accent-option][data-accent-id="${accent}"]`)
          .click();
        await page.locator("[data-accent-panel]").evaluate((el) => {
          (el as HTMLElement).hidden = true;
        });
        await page.screenshot({
          path: `${shotDir}/accent-${accent}-p1-fr-desktop.png`,
          fullPage: false,
        });
      }

      await page
        .locator(
          '[data-project-card].is-active [data-project-mode-panel="overview"] [data-lightbox-open]',
        )
        .first()
        .click();
      await expect(page.locator("[data-lightbox]")).toBeVisible();
      await page.screenshot({
        path: `${shotDir}/lightbox-image-fr-desktop.png`,
        fullPage: false,
      });
      await page.keyboard.press("Escape");

      await page
        .locator(
          '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-coop-arena"]',
        )
        .click();
      await page
        .locator(
          '[data-project-card].is-active [data-project-mode-panel="overview"] [data-gallery-thumb]',
        )
        .nth(1)
        .click();
      await page.screenshot({
        path: `${shotDir}/interactive-gallery-fr-desktop.png`,
        fullPage: false,
      });

      await page
        .locator(
          '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-combat-systems"]',
        )
        .click();
      await page
        .locator('[data-project-card].is-active [data-open-case-study="copy"]')
        .click();
      await page
        .locator(
          '[data-case-rail].is-active [data-chapter-select][data-chapter-id="architecture"]',
        )
        .click();
      await page.screenshot({
        path: `${shotDir}/case-dense-chapter-fr-desktop.png`,
        fullPage: false,
      });

      await page.evaluate(() =>
        sessionStorage.removeItem("portfolio-workspace-state"),
      );
      await page.goto(appPath("/en/"));
      await page.locator("[data-project-card].is-active").waitFor();
      await page.screenshot({
        path: `${shotDir}/projects-p1-en-desktop.png`,
        fullPage: false,
      });

      await page
        .locator('[data-project-card].is-active [data-open-case-study="copy"]')
        .click();
      await page.screenshot({
        path: `${shotDir}/case-overview-en-desktop.png`,
        fullPage: false,
      });
    } else {
      await page
        .locator(
          '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-combat-systems"]',
        )
        .click();
      await page
        .locator(
          '[data-project-card].is-active [data-project-mode-panel="overview"] [data-lightbox-open]',
        )
        .first()
        .click();
      await expect(page.locator("[data-lightbox]")).toBeVisible();
      await page.screenshot({
        path: `${shotDir}/lightbox-image-fr-mobile.png`,
        fullPage: false,
      });
      await page.keyboard.press("Escape");
    }
  });
});
