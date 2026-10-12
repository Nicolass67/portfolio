import { DEFAULT_BG_ID, getBgById, isBgId } from "../content/bg-palette";

const STORAGE_KEY = "portfolio-bg-review";

function applyBackground(value: string, id: string | "custom") {
  const root = document.documentElement;
  root.style.setProperty("--bg", value);
  root.style.setProperty(
    "--bg-deep",
    `color-mix(in srgb, ${value} 88%, #17140f)`,
  );
  root.style.setProperty("--shell-pattern", value);
  root.dataset.bgId = id;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", value);
  }

  document.querySelectorAll<HTMLElement>("[data-bg-preview]").forEach((el) => {
    el.style.background = value;
  });

  document
    .querySelectorAll<HTMLButtonElement>("[data-bg-option]")
    .forEach((button) => {
      const active = button.dataset.bgId === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

  const custom = document.querySelector<HTMLInputElement>("[data-bg-custom]");
  if (custom && custom.value.toLowerCase() !== value.toLowerCase()) {
    custom.value = value;
  }
}

function persist(id: string, value: string) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id, value }));
  } catch {
    /* ignore */
  }
}

function restore(): { id: string; value: string } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { id?: string; value?: string };
    if (typeof parsed.value === "string" && parsed.value.startsWith("#")) {
      return {
        id: typeof parsed.id === "string" ? parsed.id : "custom",
        value: parsed.value,
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

function initBackgroundExplorer() {
  const root = document.querySelector<HTMLElement>("[data-bg-explorer]");
  if (!root) return;

  const toggle = root.querySelector<HTMLButtonElement>("[data-bg-toggle]");
  const panel = root.querySelector<HTMLElement>("[data-bg-panel]");
  if (!toggle || !panel) return;

  const stored = restore();
  if (stored) {
    applyBackground(stored.value, stored.id);
  } else {
    const fallback = getBgById(DEFAULT_BG_ID);
    applyBackground(fallback.value, fallback.id);
  }

  toggle.addEventListener("click", () => {
    const open = panel.hasAttribute("hidden");
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  root.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const option = target.closest<HTMLButtonElement>("[data-bg-option]");
    if (option?.dataset.bgValue && option.dataset.bgId) {
      applyBackground(option.dataset.bgValue, option.dataset.bgId);
      persist(option.dataset.bgId, option.dataset.bgValue);
    }
  });

  const custom = root.querySelector<HTMLInputElement>("[data-bg-custom]");
  custom?.addEventListener("input", () => {
    if (!custom.value) return;
    applyBackground(custom.value, "custom");
    persist("custom", custom.value);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}

initBackgroundExplorer();

export { applyBackground, isBgId };
