/**
 * Temporary Mission 11 accent explorer palette — development/review only.
 * Not a public customization feature. Final site ships ONE approved accent.
 */

export type AccentFamily =
  "blues" | "cyans" | "violets" | "warm" | "greens" | "reds" | "neutrals";

export interface AccentSwatch {
  id: string;
  family: AccentFamily;
  /** Hex color, e.g. #2146d6 */
  value: string;
  fr: string;
  en: string;
}

export const accentFamilies: Array<{
  id: AccentFamily;
  fr: string;
  en: string;
}> = [
  { id: "blues", fr: "Bleus", en: "Blues" },
  { id: "cyans", fr: "Cyans & teal", en: "Cyans & teal" },
  { id: "violets", fr: "Violets", en: "Violets" },
  { id: "warm", fr: "Chauds", en: "Warm" },
  { id: "greens", fr: "Verts", en: "Greens" },
  { id: "reds", fr: "Rouges", en: "Reds" },
  { id: "neutrals", fr: "Neutres", en: "Neutrals" },
];

/** Curated ~30 distinguishable accents for rapid comparison. */
export const accentPalette: AccentSwatch[] = [
  {
    id: "electric-cobalt",
    family: "blues",
    value: "#2f5bff",
    fr: "Cobalt électrique",
    en: "Electric cobalt",
  },
  {
    id: "ultramarine",
    family: "blues",
    value: "#2146d6",
    fr: "Outremer",
    en: "Ultramarine",
  },
  {
    id: "royal-blue",
    family: "blues",
    value: "#1d4ed8",
    fr: "Bleu royal",
    en: "Royal blue",
  },
  {
    id: "ink-blue",
    family: "blues",
    value: "#1e3a8a",
    fr: "Bleu encre",
    en: "Ink blue",
  },
  {
    id: "sky-professional",
    family: "blues",
    value: "#2563eb",
    fr: "Ciel pro",
    en: "Pro sky",
  },

  { id: "cyan", family: "cyans", value: "#0891b2", fr: "Cyan", en: "Cyan" },
  { id: "teal", family: "cyans", value: "#0f6a6a", fr: "Teal", en: "Teal" },
  {
    id: "turquoise",
    family: "cyans",
    value: "#0d9488",
    fr: "Turquoise",
    en: "Turquoise",
  },
  {
    id: "sea-glass",
    family: "cyans",
    value: "#0e7490",
    fr: "Verre de mer",
    en: "Sea glass",
  },

  {
    id: "violet",
    family: "violets",
    value: "#7c3aed",
    fr: "Violet",
    en: "Violet",
  },
  {
    id: "purple",
    family: "violets",
    value: "#6d28d9",
    fr: "Pourpre",
    en: "Purple",
  },
  {
    id: "magenta",
    family: "violets",
    value: "#c026d3",
    fr: "Magenta",
    en: "Magenta",
  },
  {
    id: "orchid",
    family: "violets",
    value: "#9333ea",
    fr: "Orchidée",
    en: "Orchid",
  },

  { id: "coral", family: "warm", value: "#f97316", fr: "Corail", en: "Coral" },
  {
    id: "vermilion",
    family: "warm",
    value: "#ea580c",
    fr: "Vermillon",
    en: "Vermilion",
  },
  {
    id: "orange",
    family: "warm",
    value: "#d97706",
    fr: "Orange",
    en: "Orange",
  },
  { id: "amber", family: "warm", value: "#b45309", fr: "Ambre", en: "Amber" },
  {
    id: "golden",
    family: "warm",
    value: "#ca8a04",
    fr: "Jaune doré",
    en: "Golden yellow",
  },

  {
    id: "lime",
    family: "greens",
    value: "#65a30d",
    fr: "Citron vert",
    en: "Lime",
  },
  {
    id: "emerald",
    family: "greens",
    value: "#059669",
    fr: "Émeraude",
    en: "Emerald",
  },
  {
    id: "forest",
    family: "greens",
    value: "#166534",
    fr: "Forêt",
    en: "Forest",
  },
  { id: "sage", family: "greens", value: "#4d7c0f", fr: "Sauge", en: "Sage" },

  {
    id: "crimson",
    family: "reds",
    value: "#dc2626",
    fr: "Cramoisi",
    en: "Crimson",
  },
  {
    id: "burgundy",
    family: "reds",
    value: "#9f1239",
    fr: "Bourgogne",
    en: "Burgundy",
  },
  {
    id: "rose",
    family: "reds",
    value: "#e11d48",
    fr: "Rose profond",
    en: "Deep rose",
  },

  {
    id: "graphite",
    family: "neutrals",
    value: "#475569",
    fr: "Graphite",
    en: "Graphite",
  },
  {
    id: "slate",
    family: "neutrals",
    value: "#334155",
    fr: "Ardoise",
    en: "Slate",
  },
  {
    id: "bronze",
    family: "neutrals",
    value: "#78716c",
    fr: "Bronze",
    en: "Bronze",
  },
  {
    id: "ink-neutral",
    family: "neutrals",
    value: "#3f3f46",
    fr: "Encre neutre",
    en: "Neutral ink",
  },
  {
    id: "steel",
    family: "neutrals",
    value: "#64748b",
    fr: "Acier",
    en: "Steel",
  },
];

/** Recommended default until the user approves (matches studio ultramarine). */
export const DEFAULT_ACCENT_ID = "ultramarine";

export function getAccentById(id: string | null | undefined): AccentSwatch {
  return (
    accentPalette.find((swatch) => swatch.id === id) ??
    accentPalette.find((swatch) => swatch.id === DEFAULT_ACCENT_ID)!
  );
}

export function isAccentId(value: string | null | undefined): boolean {
  return accentPalette.some((swatch) => swatch.id === value);
}
