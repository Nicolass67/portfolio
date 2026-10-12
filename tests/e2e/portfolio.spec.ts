import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { appPath } from "./paths";

const DEMO_IDS = [
  "demo-combat-systems",
  "demo-ai-sandbox",
  "demo-coop-arena",
  "demo-traversal-lab",
  "demo-systems-toolkit",
  "demo-encounter-director",
] as const;

async function documentOverflow(page: Page) {
  return page.evaluate(() => ({
    vertical: document.documentElement.scrollHeight > window.innerHeight + 1,
    horizontal: document.documentElement.scrollWidth > window.innerWidth + 1,
  }));
}

test.describe("fullscreen portfolio workspace", () => {
  test("starts on Projects with project 1 active and no collapse control", async ({
    page,
  }) => {
    await page.goto(appPath("/"));

    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-view",
      "projects",
    );
    await expect(
      page.locator(
        '[data-project-card][data-project-id="demo-combat-systems"].is-active',
      ),
    ).toHaveCount(1);
    await expect(
      page.locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-combat-systems"][aria-pressed="true"]',
      ),
    ).toHaveCount(1);
    await expect(
      page.getByRole("button", {
        name: /Replier le projet|Collapse the project/,
      }),
    ).toHaveCount(0);
    await expect(page.locator("[data-theme-switcher]")).toHaveCount(0);
    await expect(page).toHaveURL(/\/$/);
  });

  test("selecting another project replaces the workspace without URL change", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    const before = page.url();

    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-ai-sandbox"]',
      )
      .click();

    await expect(page).toHaveURL(before);
    await expect(
      page.locator(
        '[data-project-card][data-project-id="demo-ai-sandbox"].is-active',
      ),
    ).toHaveCount(1);
    await expect(
      page.locator(
        '[data-project-card][data-project-id="demo-combat-systems"].is-active',
      ),
    ).toHaveCount(0);
  });

  test("can select every demonstration project", async ({ page }) => {
    await page.goto(appPath("/"));
    for (const id of DEMO_IDS) {
      await page
        .locator(
          `[data-rail-panel="overview"] [data-project-select][data-project-id="${id}"]`,
        )
        .click();
      await expect(
        page.locator(`[data-project-card][data-project-id="${id}"].is-active`),
      ).toHaveCount(1);
    }
  });

  test("case study replaces overview in place without URL change", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    const before = page.url();

    await page
      .locator(
        '[data-project-card][data-project-id="demo-combat-systems"] [data-open-case-study]',
      )
      .click();

    await expect(page).toHaveURL(before);
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-project-mode",
      "case-study",
    );
    await expect(
      page.locator(
        '[data-project-card].is-active [data-project-mode-panel="case-study"]',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-project-card].is-active [data-project-mode-panel="overview"]',
      ),
    ).toHaveAttribute("hidden", "");
    await expect(page.locator('[data-rail-panel="overview"]')).toBeHidden();
    await expect(page.locator('[data-rail-panel="case"]')).toBeVisible();
    await expect(
      page.locator(
        '[data-case-rail][data-project-id="demo-combat-systems"] .case-identity__title',
      ),
    ).toBeVisible();

    await page
      .locator(
        '[data-case-rail].is-active [data-chapter-select][data-chapter-id="systems"]',
      )
      .click();

    await expect(page).toHaveURL(before);
    await expect(page.locator("[data-chapter-panel].is-open")).toHaveCount(1);
  });

  test("profile replaces the projects workspace and restores state", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-coop-arena"]',
      )
      .click();
    await page
      .locator(
        '[data-project-card][data-project-id="demo-coop-arena"] [data-open-case-study]',
      )
      .click();

    await page.locator('[data-view-nav="profile"]').click();
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-view",
      "profile",
    );
    await expect(page.locator('[data-view-panel="profile"]')).toBeVisible();
    await expect(page.locator('[data-view-panel="projects"]')).toBeHidden();

    await page.locator('[data-view-nav="projects"]').click();
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-view",
      "projects",
    );
    await expect(
      page.locator(
        '[data-project-card][data-project-id="demo-coop-arena"].is-active',
      ),
    ).toHaveCount(1);
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-project-mode",
      "case-study",
    );
  });

  test("switching projects from case study opens new project overview", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    await page
      .locator(
        '[data-project-card][data-project-id="demo-combat-systems"] [data-open-case-study]',
      )
      .click();
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-project-mode",
      "case-study",
    );
    await expect(page.locator("[data-chapter-panel].is-open")).toHaveCount(1);

    await page
      .locator(
        '[data-case-rail].is-active [data-project-switch][data-project-id="demo-ai-sandbox"]',
      )
      .click();

    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-active-project",
      "demo-ai-sandbox",
    );
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-project-mode",
      "overview",
    );
    await expect(
      page.locator(
        '[data-project-card][data-project-id="demo-ai-sandbox"].is-active',
      ),
    ).toHaveCount(1);
    await expect(
      page.locator(
        '[data-project-card].is-active [data-project-mode-panel="overview"]',
      ),
    ).toBeVisible();
    await expect(page.locator("[data-chapter-panel].is-open")).toHaveCount(0);
  });

  test("language switch preserves workspace state", async ({ page }) => {
    await page.goto(appPath("/"));
    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-ai-sandbox"]',
      )
      .click();
    await page
      .locator(
        '[data-project-card][data-project-id="demo-ai-sandbox"] [data-open-case-study]',
      )
      .click();

    await page.getByRole("link", { name: "EN", exact: true }).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.locator(
        '[data-project-card][data-project-id="demo-ai-sandbox"].is-active',
      ),
    ).toHaveCount(1);
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-project-mode",
      "case-study",
    );
  });

  test("media kinds and no-media state render", async ({ page }) => {
    const overviewMedia = (kind: string) =>
      page.locator(
        `[data-project-card].is-active [data-project-mode-panel="overview"] [data-media-kind="${kind}"]`,
      );

    await page.goto(appPath("/"));
    await expect(overviewMedia("image")).toBeVisible();
    const combatNatural = await overviewMedia("image")
      .locator("img")
      .evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(combatNatural).toBeGreaterThan(0);

    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-ai-sandbox"]',
      )
      .click();
    await expect(overviewMedia("video")).toBeVisible();

    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-coop-arena"]',
      )
      .click();
    await expect(overviewMedia("gallery").locator("img")).toHaveCount(3);

    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-encounter-director"]',
      )
      .click();
    await expect(overviewMedia("none")).toBeVisible();
    await expect(
      page.locator(
        '[data-project-card].is-active [data-project-mode-panel="overview"] .media-frame__empty .media-frame__empty-label',
      ),
    ).toBeVisible();
  });

  test("broken image falls back without broken-image icon", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    await page.evaluate(() => {
      const img = document.querySelector<HTMLImageElement>(
        "[data-project-card].is-active [data-media-asset]",
      );
      if (!img) throw new Error("expected media asset");
      img.src = "/demo/does-not-exist.svg";
    });
    await expect(
      page.locator(
        "[data-project-card].is-active [data-media-frame].media-frame--failed",
      ),
    ).toBeVisible({ timeout: 5000 });
    await expect(
      page.locator(
        "[data-project-card].is-active [data-media-fallback]:not([hidden])",
      ),
    ).toBeVisible();
  });

  test("demo visual directions apply light themes only", async ({ page }) => {
    for (const visual of ["precision", "immersive", "studio"] as const) {
      await page.goto(appPath(`/?visual=${visual}`));
      await expect(page.locator("html")).toHaveAttribute("data-theme", visual);
      const scheme = await page.evaluate(
        () => getComputedStyle(document.documentElement).colorScheme,
      );
      expect(scheme).toBe("light");
      await expect(page.locator("[data-theme-switcher]")).toHaveCount(0);
    }
  });

  test("desktop viewports have no document overflow", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "desktop only");

    for (const size of [
      { width: 1440, height: 900 },
      { width: 1280, height: 720 },
      { width: 1920, height: 1080 },
    ]) {
      await page.setViewportSize(size);
      await page.goto(appPath("/"));
      await page.evaluate(() =>
        sessionStorage.removeItem("portfolio-workspace-state"),
      );
      await page.reload();
      await page.locator('[data-view-nav="projects"]').click();

      let overflow = await documentOverflow(page);
      expect(overflow, `overview ${size.width}x${size.height}`).toEqual({
        vertical: false,
        horizontal: false,
      });

      await page
        .locator("[data-project-card].is-active [data-open-case-study]")
        .click();
      overflow = await documentOverflow(page);
      expect(overflow, `case ${size.width}x${size.height}`).toEqual({
        vertical: false,
        horizontal: false,
      });

      await page.locator('[data-view-nav="profile"]').click();
      overflow = await documentOverflow(page);
      expect(overflow, `profile ${size.width}x${size.height}`).toEqual({
        vertical: false,
        horizontal: false,
      });
    }
  });

  test("reduced motion keeps navigation functional", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(appPath("/"));
    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-systems-toolkit"]',
      )
      .click();
    await expect(
      page.locator(
        '[data-project-card][data-project-id="demo-systems-toolkit"].is-active',
      ),
    ).toHaveCount(1);
  });

  test("keyboard can open case study from active project", async ({ page }) => {
    await page.goto(appPath("/"));
    const action = page.locator(
      "[data-project-card].is-active [data-open-case-study]",
    );
    await action.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-project-mode",
      "case-study",
    );
  });

  test("has no critical accessibility violations on main states", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    let results = await new AxeBuilder({ page }).analyze();
    let serious = results.violations.filter(({ impact }) =>
      ["critical", "serious"].includes(impact ?? ""),
    );
    expect(serious).toEqual([]);

    await page.locator('[data-view-nav="profile"]').click();
    results = await new AxeBuilder({ page }).analyze();
    serious = results.violations.filter(({ impact }) =>
      ["critical", "serious"].includes(impact ?? ""),
    );
    expect(serious).toEqual([]);
  });

  test("no console errors on core journeys", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.goto(appPath("/"));
    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-ai-sandbox"]',
      )
      .click();
    await page.locator('[data-view-nav="profile"]').click();
    await page.locator('[data-view-nav="projects"]').click();
    expect(consoleErrors).toEqual([]);
  });

  test("accent explorer updates tokens without changing state or URL", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-ai-sandbox"]',
      )
      .click();
    const before = page.url();

    await page.locator("[data-accent-toggle]").click();
    await expect(page.locator("[data-accent-panel]")).toBeVisible();
    await page
      .locator('[data-accent-option][data-accent-id="crimson"]')
      .click();

    await expect(page).toHaveURL(before);
    await expect(page.locator("[data-workspace]")).toHaveAttribute(
      "data-active-project",
      "demo-ai-sandbox",
    );
    const accent = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim(),
    );
    expect(accent.toLowerCase()).toBe("#dc2626");

    await page
      .locator("[data-project-card].is-active [data-open-case-study]")
      .click();
    const accentAfter = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim(),
    );
    expect(accentAfter.toLowerCase()).toBe("#dc2626");
  });

  test("case study swaps left rail to chapter navigation", async ({ page }) => {
    await page.goto(appPath("/"));
    await expect(page.locator('[data-rail-panel="overview"]')).toBeVisible();
    await page
      .locator("[data-project-card].is-active [data-open-case-study]")
      .click();
    await expect(page.locator("[data-projects-layout]")).toHaveClass(
      /is-case-mode/,
    );
    await expect(page.locator('[data-rail-panel="overview"]')).toBeHidden();
    await expect(
      page.locator("[data-case-rail].is-active [data-chapter-nav]"),
    ).toBeVisible();
    await expect(page.locator(".project-index").first()).toBeHidden();
    await expect(page.locator("[data-project-picker-toggle]")).toHaveCount(0);
    await expect(
      page.locator("[data-case-rail].is-active [data-project-switch]"),
    ).toHaveCount(6);
    await page
      .locator("[data-case-rail].is-active [data-close-case-study]")
      .click();
    await expect(page.locator('[data-rail-panel="overview"]')).toBeVisible();
  });

  test("project sidebar shows titles only without metadata", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    const active = page.locator(
      '[data-rail-panel="overview"] [data-project-select][aria-pressed="true"]',
    );
    await expect(active.locator(".project-index__label")).toBeVisible();
    await expect(active.locator(".project-index__meta")).toHaveCount(0);
    await expect(active.locator(".project-index__tech")).toHaveCount(0);
    await expect(active).not.toContainText("Unreal Engine");
    await expect(active).not.toContainText("Abilities");
  });

  test("image lightbox opens and closes accessibly", async ({ page }) => {
    await page.goto(appPath("/"));
    const trigger = page
      .locator(
        '[data-project-card].is-active [data-project-mode-panel="overview"] [data-lightbox-open]',
      )
      .first();
    await trigger.focus();
    await trigger.click();
    const dialog = page.locator("[data-lightbox]");
    await expect(dialog).toBeVisible();
    await expect(page.locator("[data-lightbox-image]")).toBeVisible();

    await page
      .locator("[data-lightbox-panel]")
      .click({ position: { x: 20, y: 20 } });
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await page.locator("[data-lightbox-close]").click();
    await expect(dialog).toBeHidden();

    await trigger.click();
    await expect(dialog).toBeVisible();
    // Click viewport corner (backdrop), not the dialog panel.
    await page.mouse.click(8, 8);
    await expect(dialog).toBeHidden();
  });

  test("video slots do not open the image lightbox", async ({ page }) => {
    await page.goto(appPath("/"));
    await page
      .locator(
        '[data-rail-panel="overview"] [data-project-select][data-project-id="demo-ai-sandbox"]',
      )
      .click();
    await page
      .locator(
        '[data-project-card].is-active [data-project-mode-panel="overview"] [data-media-kind="video"]',
      )
      .click({ position: { x: 40, y: 40 } });
    await expect(page.locator("[data-lightbox]")).toBeHidden();
  });

  test("scrollbars are visually hidden while content remains scrollable", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name.includes("mobile"), "desktop composition");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(appPath("/"));
    await page
      .locator("[data-project-card].is-active [data-open-case-study]")
      .click();
    const metrics = await page.evaluate(() => {
      const chapter = document.querySelector<HTMLElement>(
        "[data-chapter-panel].is-open .chapter-panel__body",
      );
      const style = chapter ? getComputedStyle(chapter) : null;
      return {
        scrollbarWidth: style?.scrollbarWidth ?? "",
        canScroll: chapter
          ? chapter.scrollHeight > chapter.clientHeight
          : false,
        webkitHidden: true,
      };
    });
    expect(metrics.scrollbarWidth).toBe("none");
  });

  test("interactive demo patterns respond without leaving the workspace", async ({
    page,
  }) => {
    await page.goto(appPath("/"));
    const before = page.url();

    await page
      .locator(
        '[data-project-card].is-active [data-concept-select][data-concept-id="feedback"]',
      )
      .click();
    await expect(
      page.locator(
        '[data-project-card].is-active [data-concept-body][data-concept-id="feedback"]',
      ),
    ).toBeVisible();

    await page
      .locator("[data-project-card].is-active [data-open-case-study]")
      .click();
    await expect(page.locator("[data-chapter-panel].is-open")).toHaveCount(1);
    await expect(
      page.locator("[data-chapter-panel].is-open [data-demo-block]").first(),
    ).toBeVisible();
    await expect(page).toHaveURL(before);
  });
});
