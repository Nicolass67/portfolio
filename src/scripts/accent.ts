import {
  DEFAULT_ACCENT_ID,
  getAccentById,
  isAccentId,
} from "../content/accent-palette";

const STORAGE_KEY = "portfolio-accent-review";

function applyAccent(value: string, id: string | "custom") {
  const root = document.documentElement;
  root.style.setProperty("--accent", value);
  root.style.setProperty(
    "--accent-soft",
    `color-mix(in srgb, ${value} 12%, transparent)`,
  );
  root.dataset.accentId = id;

  document
    .querySelectorAll<HTMLElement>("[data-accent-preview]")
    .forEach((el) => {
      el.style.background = value;
    });

  document
    .querySelectorAll<HTMLButtonElement>("[data-accent-option]")
    .forEach((button) => {
      const active = button.dataset.accentId === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

  const custom = document.querySelector<HTMLInputElement>(
    "[data-accent-custom]",
  );
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

function initAccentExplorer() {
  const root = document.querySelector<HTMLElement>("[data-accent-explorer]");
  if (!root) return;

  const toggle = root.querySelector<HTMLButtonElement>("[data-accent-toggle]");
  const panel = root.querySelector<HTMLElement>("[data-accent-panel]");
  if (!toggle || !panel) return;

  const stored = restore();
  if (stored) {
    applyAccent(stored.value, stored.id);
  } else {
    const fallback = getAccentById(DEFAULT_ACCENT_ID);
    applyAccent(fallback.value, fallback.id);
  }

  toggle.addEventListener("click", () => {
    const open = panel.hasAttribute("hidden");
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  root.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const option = target.closest<HTMLButtonElement>("[data-accent-option]");
    if (option?.dataset.accentValue && option.dataset.accentId) {
      applyAccent(option.dataset.accentValue, option.dataset.accentId);
      persist(option.dataset.accentId, option.dataset.accentValue);
    }
  });

  const custom = root.querySelector<HTMLInputElement>("[data-accent-custom]");
  custom?.addEventListener("input", () => {
    if (!custom.value) return;
    applyAccent(custom.value, "custom");
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

initAccentExplorer();

export { applyAccent, isAccentId };
