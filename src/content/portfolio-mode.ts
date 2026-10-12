export type PortfolioMode = "authentic" | "demo";

/**
 * Temporary Mission 10 light design candidates — development/review only.
 * Not a public theme feature. Final site ships ONE approved light theme.
 */
export type VisualDirection = "precision" | "immersive" | "studio";

export const visualDirections: VisualDirection[] = [
  "precision",
  "immersive",
  "studio",
];

/**
 * Authentic = real portfolio projects only (safe for publication).
 * Demo = six fictional projects for layout/interaction review.
 */
export function getPortfolioMode(): PortfolioMode {
  const configured = import.meta.env.PUBLIC_PORTFOLIO_MODE;
  if (configured === "demo" || configured === "authentic") {
    return configured;
  }
  return import.meta.env.PROD ? "authentic" : "demo";
}

export function isDemoMode(): boolean {
  return getPortfolioMode() === "demo";
}

export function isVisualDirection(
  value: string | null | undefined,
): value is VisualDirection {
  return value === "precision" || value === "immersive" || value === "studio";
}

/** Recommended candidate until the user approves. */
export const DEFAULT_VISUAL_DIRECTION: VisualDirection = "studio";
