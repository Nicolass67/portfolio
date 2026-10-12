import {
  DEFAULT_VISUAL_DIRECTION,
  isVisualDirection,
  type VisualDirection,
} from "../content/portfolio-mode";

/**
 * Development/review only: `?visual=precision|immersive|studio` in demo mode.
 * No public theme selector. All candidates are light.
 */
function resolveDirection(): VisualDirection {
  const demo = document.documentElement.dataset.portfolioMode === "demo";
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("visual");
  if (demo && isVisualDirection(fromQuery)) {
    return fromQuery;
  }
  return DEFAULT_VISUAL_DIRECTION;
}

function applyDirection(direction: VisualDirection) {
  document.documentElement.dataset.theme = direction;
  document.documentElement.style.colorScheme = "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const colors: Record<VisualDirection, string> = {
      precision: "#f4f6fa",
      immersive: "#f7f3ec",
      studio: "#fbfbf9",
    };
    meta.setAttribute("content", colors[direction]);
  }
}

applyDirection(resolveDirection());

/** Replace broken images with the designed empty fallback. */
document
  .querySelectorAll<HTMLImageElement>("[data-media-asset]")
  .forEach((image) => {
    image.addEventListener("error", () => {
      const frame = image.closest<HTMLElement>("[data-media-frame]");
      if (!frame) return;
      frame.classList.add("media-frame--empty", "media-frame--failed");
      frame
        .querySelectorAll(
          "img, video, .media-frame__gallery, .media-frame__video-slot",
        )
        .forEach((node) => {
          if (node instanceof HTMLElement) node.hidden = true;
        });
      const fallback = frame.querySelector<HTMLElement>(
        "[data-media-fallback]",
      );
      if (fallback) fallback.hidden = false;
    });
  });
