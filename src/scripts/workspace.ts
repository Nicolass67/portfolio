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

  function knownChapter(projectId: string, chapterId: string | null) {
    if (!chapterId) return true;
    const card = cards.find((item) => item.dataset.projectId === projectId);
    return !!card?.querySelector(
      `[data-chapter-panel][data-chapter-id="${chapterId}"]`,
    );
  }

  function applyChapter(projectId: string, chapterId: string | null) {
    const card = cards.find((item) => item.dataset.projectId === projectId);
    const caseRail = root.querySelector<HTMLElement>(
      `[data-case-rail][data-project-id="${projectId}"]`,
    );
    const idle = card?.querySelector<HTMLElement>("[data-chapter-idle]");
    const buttons = caseRail?.querySelectorAll<HTMLButtonElement>(
      "[data-chapter-select]",
    );
    const panels = card?.querySelectorAll<HTMLElement>("[data-chapter-panel]");

    buttons?.forEach((button) => {
      const active =
        chapterId != null && button.dataset.chapterId === chapterId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    panels?.forEach((panel) => {
      const active = chapterId != null && panel.dataset.chapterId === chapterId;
      panel.classList.toggle("is-open", active);
      panel.setAttribute("aria-hidden", active ? "false" : "true");
      setInert(panel, !active);
    });

    if (idle) {
      idle.hidden = chapterId != null;
      idle.classList.toggle("is-hidden", chapterId != null);
    }
  }

  const reduceMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

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
    const inCaseStudy =
      state.view === "projects" && state.projectMode === "case-study";
    root.classList.toggle("is-case-study", inCaseStudy);

    root
      .querySelectorAll<HTMLButtonElement>("[data-close-case-study]")
      .forEach((button) => {
        button.hidden = !inCaseStudy;
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
      overviewRail.hidden = inCase;
      overviewRail.classList.toggle("is-active", !inCase);
    }
    if (caseRailPanel) {
      caseRailPanel.hidden = !inCase;
      caseRailPanel.classList.toggle("is-active", inCase);
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
    }

    if (profilePanel) {
      const show = state.view === "profile";
      profilePanel.classList.toggle("is-active", show);
      profilePanel.hidden = !show;
      profilePanel.setAttribute("aria-hidden", show ? "false" : "true");
      setInert(profilePanel, !show);
      if (show && previousView !== "profile") {
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
      const enteringCase = active && previousMode !== "case-study" && showCase;
      const leavingCase =
        active && previousMode === "case-study" && showOverview;
      const chapterChanged =
        active &&
        showCase &&
        !enteringCase &&
        !projectChanged &&
        (state.chapterId ?? "") !== previousChapter;

      applyChapter(
        id,
        active && state.projectMode === "case-study" ? state.chapterId : null,
      );

      // Arm fade-in before reveal to avoid a full-opacity flash then jump.
      if (active && projectChanged && showOverview) {
        pulseMotion(card, "project-swap");
      }
      if (enteringCase || (active && projectChanged && showCase)) {
        pulseMotion(caseStudy, "case-enter");
      } else if (leavingCase) {
        pulseMotion(overview, "overview-enter");
      } else if (chapterChanged && state.chapterId) {
        const openPanel = card.querySelector<HTMLElement>(
          `[data-chapter-panel][data-chapter-id="${state.chapterId}"]`,
        );
        pulseMotion(openPanel, "chapter-enter");
      }

      if (overview) {
        overview.hidden = !showOverview;
        overview.classList.toggle("is-visible", showOverview);
        setInert(overview, !showOverview);
      }
      if (caseStudy) {
        caseStudy.hidden = !showCase;
        caseStudy.classList.toggle("is-visible", showCase);
        setInert(caseStudy, !showCase);
      }
    });

    writeStoredState(state);
  }

  function setState(partial: Partial<WorkspaceState>) {
    const next: WorkspaceState = { ...state, ...partial };
    if (!knownProject(next.projectId)) {
      next.projectId = firstId;
    }
    if (!knownChapter(next.projectId, next.chapterId)) {
      next.chapterId = null;
    }
    if (next.view === "profile") {
      // Keep project/chapter memory while profile is shown.
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
    state = next;
    applyState();
  }

  const stored = readStoredState(firstId);
  if (stored && knownProject(stored.projectId)) {
    state = {
      ...stored,
      chapterId: knownChapter(stored.projectId, stored.chapterId)
        ? stored.chapterId
        : null,
    };
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

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
      // Pastilles 1/2/3 → ouvrir directement la page (étude de cas) du projet cible.
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
      setState({ projectMode: "overview", chapterId: null });
      return;
    }

    const chapterSelect = target.closest<HTMLButtonElement>(
      "[data-chapter-select]",
    );
    if (chapterSelect?.dataset.chapterId) {
      const projectId = chapterSelect.dataset.projectId ?? state.projectId;
      const chapterId = chapterSelect.dataset.chapterId;
      const nextChapter =
        state.projectId === projectId &&
        state.projectMode === "case-study" &&
        state.chapterId === chapterId
          ? null
          : chapterId;
      setState({
        projectId,
        projectMode: "case-study",
        chapterId: nextChapter,
      });
    }
  });

  applyState();
}

const workspace = document.querySelector<HTMLElement>("[data-workspace]");
if (workspace) {
  initWorkspace(workspace);
}
