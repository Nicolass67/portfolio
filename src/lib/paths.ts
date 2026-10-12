/**
 * Prefix a public/asset path with Astro `base` (GitHub Pages project sites).
 */
export function withBase(path: string): string {
  if (!path) return import.meta.env.BASE_URL;
  if (/^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.replace(/^\//, "");
  return `${base}${clean}`;
}
