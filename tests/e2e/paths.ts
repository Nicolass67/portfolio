/** Astro `base` for GitHub Pages project site — keep in sync with astro.config.mjs */
export const SITE_BASE = "/portfolio";

export function appPath(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_BASE}/`;
  return `${SITE_BASE}${normalized}`;
}
