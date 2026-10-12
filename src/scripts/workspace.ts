type AppView = "projects" | "profile";
type ProjectMode = "overview" | "case-study";

type WorkspaceState = {
  view: AppView;
  projectId: string;
  projectMode: ProjectMode;
  chapterId: string | null;
};

const STORAGE_KEY = "portfolio-workspace-state";

function setInert(element: HTMLElement, inert: boolean) {
  if (inert) {
    element.setAttribute("inert", "");
  } else {
    element.removeAttribute("inert");
  }
}

function readStoredState(fallbackProjectId: string): WorkspaceState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<WorkspaceState>;
    if (
      (parsed.view !== "projects" && parsed.view !== "profile") ||
      typeof parsed.projectId !== "string"
    ) {
      return null;
    }
    return {
      view: parsed.view,
      projectId: parsed.projectId || fallbackProjectId,
      projectMode:
        parsed.projectMode === "case-study" ? "case-study" : "overview",
      chapterId: typeof parsed.chapterId === "string" ? parsed.chapterId : null,
    };
  } catch {
    return null;
  }
}

function writeStoredState(state: WorkspaceState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function syncNavIndicator(animate = true) {
  const nav = document.querySelector<HTMLElement>("[data-site-nav]");
  const indicator = nav?.querySelector<HTMLElement>("[data-nav-indicator]");
  const active = nav?.querySelector<HTMLButtonElement>(
    "[data-view-nav].is-active, [data-view-nav][aria-pressed='true']",
  );
  if (!nav || !indicator || !active) return;

  const navRect = nav.getBoundingClientRect();
  const btnRect = active.getBoundingClientRect();
  // Prefer the label text width so flex:1 mobile buttons don't get a full-half underline.
  let labelLeft = btnRect.left;
  let labelWidth = btnRect.width;
  const range = document.createRange();
  range.selectNodeContents(active);
  const textRect = range.getBoundingClientRect();
  if (textRect.width > 0) {
    labelLeft = textRect.left;
    labelWidth = textRect.width;
  }
  const left = labelLeft - navRect.left + nav.scrollLeft;
  const width = labelWidth;
  const canAnimate = animate && indicator.dataset.ready === "true";

  if (!canAnimate) {
    indicator.style.transition = "none";
  }
  indicator.style.width = `${width}px`;
  indicator.style.transform = `translate3d(${left}px, 0, 0)`;
  if (!canAnimate) {
    void indicator.offsetWidth;
    indicator.style.transition = "";
    indicator.dataset.ready = "true";
  }
}

function initWorkspace(root: HTMLElement) {
  const cards = Array.from(
    root.querySelectorAll<HTMLElement>("[data-project-card]"),
  );
  const firstId = cards[0]?.dataset.projectId ?? "";
  if (!firstId) return;

  let state: WorkspaceState = {
    view: "projects",
    projectId: firstId,
    projectMode: "overview",
    chapterId: null,
  };

  function knownProject(id: string) {
    return cards.some((card) => card.dataset.projectId === id);
  }

  function firstChapterId(projectId: string): string | null {
    const card = cards.find((item) => item.dataset.projectId === projectId);
    return (
      card?.querySelector<HTMLElement>("[data-chapter-panel]")?.dataset
        .chapterId ?? null
    );
  }

  function knownChapter(projectId: string, chapterId: string | null) {
    if (!chapterId) return false;
    const card = cards.find((item) => item.dataset.projectId === projectId);
    return !!card?.querySelector(
      `[data-chapter-panel][data-chapter-id="${chapterId}"]`,
    );
  }

  const mobileQuery = window.matchMedia("(max-width: 52.99rem)");
  const reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  function isMobileLayout() {
    return mobileQuery.matches;
  }

  const syncChapterBodyScrollFade = (body: HTMLElement) => {
    const panel = body.closest<HTMLElement>(".chapter-panel");
    const shell = body.closest<HTMLElement>("[data-chapter-scroll]");
    if (!panel || !shell) return;
    // Mobile uses document scroll — no desktop edge cue.
    if (isMobileLayout() || !panel.classList.contains("is-open")) {
      delete shell.dataset.scrollFade;
      return;
    }
    const maxScroll = body.scrollHeight - body.clientHeight;
    if (maxScroll <= 2) {
      shell.dataset.scrollFade = "none";
      return;
    }
    const atStart = body.scrollTop <= 2;
    const atEnd = body.scrollTop >= maxScroll - 2;
    if (atStart && atEnd) shell.dataset.scrollFade = "none";
    else if (atStart) shell.dataset.scrollFade = "bottom";
    else if (atEnd) shell.dataset.scrollFade = "top";
    else shell.dataset.scrollFade = "both";
  };

  function syncOpenChapterScrollFades() {
    root
      .querySelectorAll<HTMLElement>(
        ".chapter-panel.is-open .chapter-panel__body",
      )
      .forEach(syncChapterBodyScrollFade);
  }

  function closeMobileSheet(sheet: HTMLDialogElement) {
    if (!sheet.open || sheet.classList.contains("is-closing")) return;
    if (reduceMotionQuery.matches) {
      sheet.classList.remove("is-opening", "is-closing");
      sheet.close();
      return;
    }

    sheet.classList.remove("is-opening");
    sheet.classList.add("is-closing");

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      sheet.removeEventListener("animationend", onEnd);
      window.clearTimeout(fallback);
      sheet.classList.remove("is-closing");
      if (sheet.open) sheet.close();
    };
    const onEnd = (event: AnimationEvent) => {
      if (event.target !== sheet) return;
      finish();
    };
    sheet.addEventListener("animationend", onEnd);
    const fallback = window.setTimeout(finish, 320);
  }

  function closeMobileSheets() {
    root
      .querySelectorAll<HTMLDialogElement>("dialog[data-mobile-sheet]")
      .forEach((sheet) => {
        if (sheet.open) closeMobileSheet(sheet);
      });
  }

  function openMobileSheet(sheet: HTMLDialogElement) {
    sheet.tabIndex = -1;
    sheet.classList.remove("is-closing");
    sheet.classList.add("is-opening");
    if (!sheet.open) {
      sheet.showModal();
    }
    // Focus the sheet itself — never the close control (iOS selection / ghost tap).
    sheet.focus({ preventScroll: true });
    window.setTimeout(() => {
      sheet.classList.remove("is-opening");
    }, 320);
  }

  root
    .querySelectorAll<HTMLDialogElement>("dialog[data-mobile-sheet]")
    .forEach((sheet) => {
      sheet.addEventListener("click", (event) => {
        // Native modal: click on ::backdrop has the dialog as event.target.
        if (
          event.target === sheet &&
          sheet.open &&
          !sheet.classList.contains("is-opening") &&
          !sheet.classList.contains("is-closing")
        ) {
          closeMobileSheet(sheet);
        }
      });
      // Escape: animate out instead of an instant native close.
      sheet.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeMobileSheet(sheet);
      });
    });

  function syncChapterIndicator(
    projectId: string,
    chapterId: string,
    animate = true,
  ) {
    const nav = root.querySelector<HTMLElement>(
      `[data-case-rail][data-project-id="${projectId}"] [data-chapter-nav]`,
    );
    const indicator = nav?.querySelector<HTMLElement>(
      "[data-chapter-indicator]",
    );
    const active = nav?.querySelector<HTMLButtonElement>(
      `[data-chapter-select][data-chapter-id="${chapterId}"]`,
    );
    if (!nav || !indicator || !active) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = active.getBoundingClientRect();
    const left = btnRect.left - navRect.left + nav.scrollLeft;
    const top = btnRect.top - navRect.top + nav.scrollTop;
    const canAnimate = animate && indicator.classList.contains("is-ready");

    if (!canAnimate) {
      indicator.style.transition = "none";
    }
    indicator.style.width = `${btnRect.width}px`;
    indicator.style.height = `${btnRect.height}px`;
    indicator.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    if (!canAnimate) {
      void indicator.offsetWidth;
      indicator.style.transition = "";
      indicator.classList.add("is-ready");
    }
  }

  function applyChapter(projectId: string, chapterId: string) {
    const card = cards.find((item) => item.dataset.projectId === projectId);
    const buttons = root.querySelectorAll<HTMLButtonElement>(
      `[data-chapter-select][data-project-id="${projectId}"]`,
    );
    const panels = card?.querySelectorAll<HTMLElement>("[data-chapter-panel]");
    const previousChapter =
      root.querySelector<HTMLButtonElement>(
        `[data-case-rail][data-project-id="${projectId}"] [data-chapter-select].is-active`,
      )?.dataset.chapterId ?? "";

    buttons.forEach((button) => {
      const active = button.dataset.chapterId === chapterId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    panels?.forEach((panel) => {
      const active = panel.dataset.chapterId === chapterId;
      panel.classList.toggle("is-open", active);
      panel.setAttribute("aria-hidden", active ? "false" : "true");
      setInert(panel, !active);
    });

    syncChapterIndicator(
      projectId,
      chapterId,
      previousChapter !== "" && previousChapter !== chapterId,
    );

    const chapterLabel = root.querySelector<HTMLElement>(
      "[data-mobile-chapter-label]",
    );
    // Only the active project owns the shared mobile chapter label.
    if (chapterLabel && projectId === state.projectId) {
      const title = card
        ?.querySelector(
          `[data-chapter-panel][data-chapter-id="${chapterId}"] h3`,
        )
        ?.textContent?.trim();
      if (title) chapterLabel.textContent = title;
    }
  }

  function pulseMotion(element: HTMLElement | null, token: string) {
    if (!element || reduceMotionQuery.matches) return;

    element.classList.remove("is-motion");
    element.dataset.motion = token;
    // Start invisible before paint so the first frame is the fade-in, not a flash.
    element.classList.add("is-motion-pending");

    requestAnimationFrame(() => {
      element.classList.remove("is-motion-pending");
      element.classList.add("is-motion");
      const clear = () => {
        element.classList.remove("is-motion");
        delete element.dataset.motion;
      };
      element.addEventListener("animationend", clear, { once: true });
      window.setTimeout(clear, 280);
    });
  }

  function applyState() {
    const previousMode = root.dataset.projectMode;
    const previousView = root.dataset.view;
    const previousProject = root.dataset.activeProject;
    const previousChapter = root.dataset.activeChapter || "";

    root.dataset.view = state.view;
    root.dataset.projectMode = state.projectMode;
    root.dataset.activeProject = state.projectId;
    root.dataset.activeChapter = state.chapterId ?? "";
    root.classList.toggle("is-profile", state.view === "profile");
    document.documentElement.classList.toggle(
      "is-profile-view",
      state.view === "profile",
    );
    const inCaseStudy =
      state.view === "projects" && state.projectMode === "case-study";
    root.classList.toggle("is-case-study", inCaseStudy);

    root
      .querySelectorAll<HTMLButtonElement>("[data-close-case-study]")
      .forEach((button) => {
        // Mobile case bar always keeps its control; desktop back lives in the case rail.
        if (button.closest("[data-mobile-case-bar]")) {
          button.hidden = false;
          return;
        }
        button.hidden = !inCaseStudy;
      });

    const mobileCaseBar = root.querySelector<HTMLElement>(
      "[data-mobile-case-bar]",
    );
    if (mobileCaseBar) {
      mobileCaseBar.hidden = !inCaseStudy;
    }

    root
      .querySelectorAll<HTMLElement>("[data-mobile-chapter-group]")
      .forEach((group) => {
        const active = group.dataset.projectId === state.projectId;
        group.hidden = !active;
      });

    const layout = root.querySelector<HTMLElement>("[data-projects-layout]");
    const overviewRail = root.querySelector<HTMLElement>(
      '[data-rail-panel="overview"]',
    );
    const caseRailPanel = root.querySelector<HTMLElement>(
      '[data-rail-panel="case"]',
    );
    const inCase =
      state.view === "projects" && state.projectMode === "case-study";

    layout?.classList.toggle("is-case-mode", inCase);
    if (overviewRail) {
      overviewRail.hidden = false;
      overviewRail.classList.toggle("is-active", !inCase);
      overviewRail.setAttribute("aria-hidden", inCase ? "true" : "false");
      setInert(overviewRail, inCase);
    }
    if (caseRailPanel) {
      caseRailPanel.hidden = false;
      caseRailPanel.classList.toggle("is-active", inCase);
      caseRailPanel.setAttribute("aria-hidden", inCase ? "false" : "true");
      setInert(caseRailPanel, !inCase);
    }
    root.querySelectorAll<HTMLElement>("[data-case-rail]").forEach((rail) => {
      const active = inCase && rail.dataset.projectId === state.projectId;
      rail.hidden = !active;
      rail.classList.toggle("is-active", active);
    });

    document
      .querySelectorAll<HTMLButtonElement>("[data-view-nav]")
      .forEach((button) => {
        const active = button.dataset.viewNav === state.view;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    syncNavIndicator(previousView !== state.view);

    const projectsPanel = root.querySelector<HTMLElement>(
      '[data-view-panel="projects"]',
    );
    const profilePanel = root.querySelector<HTMLElement>(
      '[data-view-panel="profile"]',
    );

    if (projectsPanel) {
      const show = state.view === "projects";
      projectsPanel.classList.toggle("is-active", show);
      projectsPanel.hidden = !show;
      projectsPanel.setAttribute("aria-hidden", show ? "false" : "true");
      setInert(projectsPanel, !show);
      if (show && previousView === "profile") {
        pulseMotion(
          projectsPanel.querySelector("[data-projects-layout]"),
          "projects-enter",
        );
      }
    }

    if (profilePanel) {
      const show = state.view === "profile";
      profilePanel.classList.toggle("is-active", show);
      profilePanel.hidden = !show;
      profilePanel.setAttribute("aria-hidden", show ? "false" : "true");
      setInert(profilePanel, !show);
      if (show && previousView === "projects") {
        pulseMotion(
          profilePanel.querySelector("[data-profile-stage]"),
          "profile-enter",
        );
      }
    }

    root
      .querySelectorAll<HTMLButtonElement>(
        "[data-project-select], [data-project-switch]",
      )
      .forEach((button) => {
        const active = button.dataset.projectId === state.projectId;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

    if (previousProject !== state.projectId) {
      const activeTab = root.querySelector<HTMLButtonElement>(
        `[data-rail-panel="overview"] [data-project-select][data-project-id="${state.projectId}"]`,
      );
      activeTab?.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: reduceMotionQuery.matches ? "auto" : "smooth",
      });
    }

    cards.forEach((card) => {
      const id = card.dataset.projectId ?? "";
      const active = id === state.projectId && state.view === "projects";
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-hidden", active ? "false" : "true");
      setInert(card, !active);

      const overview = card.querySelector<HTMLElement>(
        '[data-project-mode-panel="overview"]',
      );
      const caseStudy = card.querySelector<HTMLElement>(
        '[data-project-mode-panel="case-study"]',
      );
      const showCase = active && state.projectMode === "case-study";
      const showOverview = active && state.projectMode === "overview";
      const projectChanged = previousProject !== id;
      const chapterChanged =
        active &&
        showCase &&
        previousMode === "case-study" &&
        !projectChanged &&
        (state.chapterId ?? "") !== previousChapter;

      // Ne pas vider les chapitres des cartes inactives : évite le flash
      // du canvas vide pendant le fondu de changement de projet.
      if (active && state.projectMode === "case-study" && state.chapterId) {
        applyChapter(id, state.chapterId);
      }

      const enteringCase = active && previousMode !== "case-study" && showCase;
      const leavingCase =
        active && previousMode === "case-study" && showOverview;

      // Swap projet / chapitre : soft-enter. Mode overview↔case : CSS desktop ; pulse sur mobile.
      if (active && projectChanged && showOverview) {
        pulseMotion(card, "project-swap");
      } else if (active && projectChanged && showCase) {
        pulseMotion(caseStudy, "case-enter");
      } else if (isMobileLayout() && (enteringCase || leavingCase)) {
        pulseMotion(
          enteringCase ? caseStudy : overview,
          enteringCase ? "case-enter" : "overview-enter",
        );
      } else if (chapterChanged && state.chapterId) {
        const openPanel = card.querySelector<HTMLElement>(
          `[data-chapter-panel][data-chapter-id="${state.chapterId}"]`,
        );
        pulseMotion(openPanel, "chapter-enter");
      }

      if (overview) {
        overview.hidden = !showOverview;
        overview.classList.toggle("is-visible", showOverview);
        overview.setAttribute("aria-hidden", showOverview ? "false" : "true");
        setInert(overview, !showOverview);
      }
      if (caseStudy) {
        caseStudy.hidden = !showCase;
        caseStudy.classList.toggle("is-visible", showCase);
        caseStudy.setAttribute("aria-hidden", showCase ? "false" : "true");
        setInert(caseStudy, !showCase);
      }
    });

    const shouldResetScroll =
      isMobileLayout() &&
      state.view === "projects" &&
      (previousProject !== state.projectId ||
        previousMode !== state.projectMode ||
        (state.projectMode === "case-study" &&
          (state.chapterId ?? "") !== previousChapter));
    if (shouldResetScroll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: reduceMotionQuery.matches ? "auto" : "smooth",
      });
    }

    if (!inCaseStudy) {
      closeMobileSheets();
    }

    writeStoredState(state);
    syncOpenChapterScrollFades();
  }

  function setState(partial: Partial<WorkspaceState>) {
    const next: WorkspaceState = { ...state, ...partial };
    if (!knownProject(next.projectId)) {
      next.projectId = firstId;
    }
    if (
      partial.projectId != null &&
      partial.projectId !== state.projectId &&
      partial.chapterId === undefined
    ) {
      next.chapterId = null;
      if (partial.projectMode === undefined) {
        next.projectMode = "overview";
      }
    }
    if (!knownChapter(next.projectId, next.chapterId)) {
      next.chapterId = null;
    }
    // Étude de cas : toujours un chapitre ouvert (plus d’état idle).
    if (next.projectMode === "case-study" && !next.chapterId) {
      next.chapterId = firstChapterId(next.projectId);
    }
    if (next.projectMode === "overview") {
      next.chapterId = null;
    }
    state = next;
    applyState();
  }

  const stored = readStoredState(firstId);
  if (stored && knownProject(stored.projectId)) {
    let chapterId = knownChapter(stored.projectId, stored.chapterId)
      ? stored.chapterId
      : null;
    if (stored.projectMode === "case-study" && !chapterId) {
      chapterId = firstChapterId(stored.projectId);
    }
    if (stored.projectMode === "overview") {
      chapterId = null;
    }
    state = {
      ...stored,
      chapterId,
    };
  }

  const chapterLabelEl = root.querySelector<HTMLElement>(
    "[data-mobile-chapter-label]",
  );
  if (chapterLabelEl && !chapterLabelEl.dataset.placeholder) {
    chapterLabelEl.dataset.placeholder =
      chapterLabelEl.textContent?.trim() ?? "";
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    // Backdrop click on a mobile sheet (greyed area above the panel).
    if (
      target instanceof HTMLDialogElement &&
      target.matches("dialog[data-mobile-sheet]") &&
      target.open &&
      !target.classList.contains("is-opening") &&
      !target.classList.contains("is-closing")
    ) {
      closeMobileSheet(target);
      return;
    }

    const sheetClose = target.closest<HTMLButtonElement>(
      "[data-mobile-sheet-close]",
    );
    if (sheetClose) {
      const sheet = sheetClose.closest<HTMLDialogElement>("dialog");
      if (sheet) closeMobileSheet(sheet);
      return;
    }

    const sheetOpen = target.closest<HTMLButtonElement>(
      "[data-mobile-sheet-open]",
    );
    if (sheetOpen?.dataset.mobileSheetOpen) {
      const sheet = root.querySelector<HTMLDialogElement>(
        `dialog[data-mobile-sheet="${sheetOpen.dataset.mobileSheetOpen}"]`,
      );
      if (sheet) openMobileSheet(sheet);
      return;
    }

    const viewNav = target.closest<HTMLButtonElement>("[data-view-nav]");
    if (viewNav?.dataset.viewNav === "projects") {
      setState({ view: "projects" });
      return;
    }
    if (viewNav?.dataset.viewNav === "profile") {
      setState({ view: "profile" });
      return;
    }

    if (state.view !== "projects") return;

    const projectJump = target.closest<HTMLButtonElement>(
      "[data-project-switch]",
    );
    if (projectJump?.dataset.projectId) {
      // Pastilles / feuille Projets → étude de cas du projet cible.
      const projectId = projectJump.dataset.projectId;
      const card = cards.find((item) => item.dataset.projectId === projectId);
      const firstChapter =
        root.querySelector<HTMLButtonElement>(
          `[data-case-rail][data-project-id="${projectId}"] [data-chapter-select]`,
        )?.dataset.chapterId ??
        card?.querySelector<HTMLElement>("[data-chapter-panel]")?.dataset
          .chapterId ??
        null;
      setState({
        view: "projects",
        projectId,
        projectMode: "case-study",
        chapterId: firstChapter,
      });
      closeMobileSheets();
      return;
    }

    const projectSelect = target.closest<HTMLButtonElement>(
      "[data-project-select]",
    );
    if (projectSelect?.dataset.projectId) {
      setState({
        view: "projects",
        projectId: projectSelect.dataset.projectId,
        projectMode: "overview",
        chapterId: null,
      });
      return;
    }

    const openCase = target.closest<HTMLButtonElement>(
      "[data-open-case-study]",
    );
    if (openCase) {
      const projectId = openCase.dataset.projectId ?? state.projectId;
      const card = cards.find((item) => item.dataset.projectId === projectId);
      const firstChapter =
        root.querySelector<HTMLButtonElement>(
          `[data-case-rail][data-project-id="${projectId}"] [data-chapter-select]`,
        )?.dataset.chapterId ??
        card?.querySelector<HTMLElement>("[data-chapter-panel]")?.dataset
          .chapterId ??
        null;
      setState({
        projectId,
        projectMode: "case-study",
        chapterId: firstChapter,
      });
      return;
    }

    const closeCase = target.closest<HTMLButtonElement>(
      "[data-close-case-study]",
    );
    if (closeCase) {
      closeMobileSheets();
      setState({ projectMode: "overview", chapterId: null });
      return;
    }

    const chapterSelect = target.closest<HTMLButtonElement>(
      "[data-chapter-select]",
    );
    if (chapterSelect?.dataset.chapterId) {
      const projectId = chapterSelect.dataset.projectId ?? state.projectId;
      const chapterId = chapterSelect.dataset.chapterId;
      // Recliquer le chapitre actif ne le désélectionne pas (pas d’état idle).
      setState({
        projectId,
        projectMode: "case-study",
        chapterId,
      });
      if (chapterSelect.closest("dialog[data-mobile-sheet]")) {
        closeMobileSheets();
      }
    }
  });

  applyState();
  // Place the underline without animating on first paint / restored state.
  syncNavIndicator(false);

  const syncMobileHeaderStack = () => {
    if (!isMobileLayout()) {
      document.documentElement.style.removeProperty("--mobile-header-stack");
      return;
    }
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!header) return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    if (height > 0) {
      document.documentElement.style.setProperty(
        "--mobile-header-stack",
        `${height}px`,
      );
    }
  };

  syncMobileHeaderStack();
  const headerEl = document.querySelector(".site-header");
  if (headerEl && typeof ResizeObserver !== "undefined") {
    const headerObserver = new ResizeObserver(() => syncMobileHeaderStack());
    headerObserver.observe(headerEl);
  }
  mobileQuery.addEventListener("change", syncMobileHeaderStack);

  const syncProjectIndexFade = (index: HTMLElement) => {
    const maxScroll = index.scrollWidth - index.clientWidth;
    if (maxScroll <= 1) {
      index.dataset.scrollFade = "none";
      return;
    }
    const atStart = index.scrollLeft <= 1;
    const atEnd = index.scrollLeft >= maxScroll - 1;
    if (atStart && atEnd) index.dataset.scrollFade = "none";
    else if (atStart) index.dataset.scrollFade = "right";
    else if (atEnd) index.dataset.scrollFade = "left";
    else index.dataset.scrollFade = "both";
  };

  const projectIndexes = [
    ...root.querySelectorAll<HTMLElement>(".project-index"),
  ];
  const syncAllProjectIndexFades = () => {
    projectIndexes.forEach(syncProjectIndexFade);
  };
  projectIndexes.forEach((index) => {
    index.addEventListener("scroll", () => syncProjectIndexFade(index), {
      passive: true,
    });
    if (typeof ResizeObserver !== "undefined") {
      const indexObserver = new ResizeObserver(() =>
        syncProjectIndexFade(index),
      );
      indexObserver.observe(index);
    }
  });
  syncAllProjectIndexFades();
  mobileQuery.addEventListener("change", syncAllProjectIndexFades);

  root.querySelectorAll<HTMLElement>(".chapter-panel__body").forEach((body) => {
    body.addEventListener("scroll", () => syncChapterBodyScrollFade(body), {
      passive: true,
    });
    if (typeof ResizeObserver !== "undefined") {
      const bodyObserver = new ResizeObserver(() =>
        syncChapterBodyScrollFade(body),
      );
      bodyObserver.observe(body);
    }
  });
  syncOpenChapterScrollFades();
  mobileQuery.addEventListener("change", syncOpenChapterScrollFades);

  window.addEventListener(
    "resize",
    () => {
      syncNavIndicator(false);
      if (
        state.view === "projects" &&
        state.projectMode === "case-study" &&
        state.chapterId
      ) {
        syncChapterIndicator(state.projectId, state.chapterId, false);
      }
      syncMobileHeaderStack();
      syncAllProjectIndexFades();
      syncOpenChapterScrollFades();
    },
    { passive: true },
  );
}

function syncLanguageIndicator(animate = true) {
  const nav = document.querySelector<HTMLElement>("[data-language-nav]");
  const indicator = nav?.querySelector<HTMLElement>(
    "[data-language-indicator]",
  );
  const active = nav?.querySelector<HTMLAnchorElement>(
    "[data-language-link][aria-current='page'], [data-language-link].is-active",
  );
  if (!nav || !indicator || !active) return;

  const navRect = nav.getBoundingClientRect();
  const linkRect = active.getBoundingClientRect();
  const left = linkRect.left - navRect.left + nav.scrollLeft;
  const width = linkRect.width;
  const canAnimate = animate && indicator.dataset.ready === "true";

  if (!canAnimate) {
    indicator.style.transition = "none";
  }
  indicator.style.width = `${width}px`;
  indicator.style.transform = `translate3d(${left}px, 0, 0)`;
  if (!canAnimate) {
    void indicator.offsetWidth;
    indicator.style.transition = "";
    indicator.dataset.ready = "true";
  }
}

function initLanguageSwitcher() {
  const nav = document.querySelector<HTMLElement>("[data-language-nav]");
  if (!nav) return;

  syncLanguageIndicator(false);

  nav.addEventListener("click", (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
      "[data-language-link]",
    );
    if (!link || link.getAttribute("aria-current") === "page") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    event.preventDefault();
    nav
      .querySelectorAll<HTMLAnchorElement>("[data-language-link]")
      .forEach((item) => {
        item.removeAttribute("aria-current");
        item.classList.remove("is-active");
      });
    link.classList.add("is-active");
    syncLanguageIndicator(true);
    window.setTimeout(() => {
      window.location.assign(link.href);
    }, 300);
  });

  window.addEventListener(
    "resize",
    () => {
      syncLanguageIndicator(false);
    },
    { passive: true },
  );
}

const workspace = document.querySelector<HTMLElement>("[data-workspace]");
if (workspace) {
  initWorkspace(workspace);
}
initLanguageSwitcher();
