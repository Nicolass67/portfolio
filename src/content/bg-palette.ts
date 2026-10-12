/**
 * Temporary background explorer palette — development/review only.
 * Not a public customization feature. Final site ships ONE approved light ground.
 */

export type BgFamily = "warm" | "cool" | "paper" | "tinted" | "neutral";

export interface BgSwatch {
  id: string;
  family: BgFamily;
  /** Hex color, e.g. #f6f1e8 */
  value: string;
  fr: string;
  en: string;
}

export const bgFamilies: Array<{
  id: BgFamily;
  fr: string;
  en: string;
}> = [
  { id: "warm", fr: "Chauds", en: "Warm" },
  { id: "cool", fr: "Froids", en: "Cool" },
  { id: "paper", fr: "Papiers", en: "Papers" },
  { id: "tinted", fr: "Teintés", en: "Tinted" },
  { id: "neutral", fr: "Neutres", en: "Neutrals" },
];

/** Curated light grounds for rapid comparison (light UI only). */
export const bgPalette: BgSwatch[] = [
  {
    id: "studio-ivory",
    family: "warm",
    value: "#f6f1e8",
    fr: "Ivoire studio",
    en: "Studio ivory",
  },
  {
    id: "immersive-cream",
    family: "warm",
    value: "#f7f3ec",
    fr: "Crème immersive",
    en: "Immersive cream",
  },
  {
    id: "warm-linen",
    family: "warm",
    value: "#f3ebe0",
    fr: "Lin chaud",
    en: "Warm linen",
  },
  {
    id: "sand",
    family: "warm",
    value: "#f0e6d6",
    fr: "Sable",
    en: "Sand",
  },
  {
    id: "peach-mist",
    family: "warm",
    value: "#f8ece4",
    fr: "Pêche voilée",
    en: "Peach mist",
  },
  {
    id: "honey-wash",
    family: "warm",
    value: "#f5efd8",
    fr: "Lavis miel",
    en: "Honey wash",
  },

  {
    id: "precision-mist",
    family: "cool",
    value: "#f4f6fa",
    fr: "Brume précision",
    en: "Precision mist",
  },
  {
    id: "cool-slate",
    family: "cool",
    value: "#eef1f6",
    fr: "Ardoise claire",
    en: "Cool slate",
  },
  {
    id: "sky-wash",
    family: "cool",
    value: "#eef4fb",
    fr: "Lavis ciel",
    en: "Sky wash",
  },
  {
    id: "ice",
    family: "cool",
    value: "#f0f7f8",
    fr: "Glace",
    en: "Ice",
  },
  {
    id: "lavender-mist",
    family: "cool",
    value: "#f3f0f8",
    fr: "Lavande voilée",
    en: "Lavender mist",
  },

  {
    id: "cotton",
    family: "paper",
    value: "#faf8f5",
    fr: "Coton",
    en: "Cotton",
  },
  {
    id: "bone",
    family: "paper",
    value: "#f7f5f0",
    fr: "Os",
    en: "Bone",
  },
  {
    id: "chalk",
    family: "paper",
    value: "#fbfbf9",
    fr: "Craie",
    en: "Chalk",
  },
  {
    id: "newsprint",
    family: "paper",
    value: "#f2efe8",
    fr: "Papier journal",
    en: "Newsprint",
  },
  {
    id: "vellum",
    family: "paper",
    value: "#f8f4ea",
    fr: "Vélin",
    en: "Vellum",
  },

  {
    id: "sage-wash",
    family: "tinted",
    value: "#eef3ec",
    fr: "Lavis sauge",
    en: "Sage wash",
  },
  {
    id: "rose-wash",
    family: "tinted",
    value: "#f7eef0",
    fr: "Lavis rose",
    en: "Rose wash",
  },
  {
    id: "teal-wash",
    family: "tinted",
    value: "#e9f3f1",
    fr: "Lavis teal",
    en: "Teal wash",
  },
  {
    id: "amber-wash",
    family: "tinted",
    value: "#f7f0e2",
    fr: "Lavis ambre",
    en: "Amber wash",
  },
  {
    id: "clay-wash",
    family: "tinted",
    value: "#f3ebe6",
    fr: "Lavis argile",
    en: "Clay wash",
  },

  {
    id: "soft-gray",
    family: "neutral",
    value: "#f3f3f1",
    fr: "Gris doux",
    en: "Soft gray",
  },
  {
    id: "stone",
    family: "neutral",
    value: "#ececea",
    fr: "Pierre",
    en: "Stone",
  },
  {
    id: "ash",
    family: "neutral",
    value: "#e8e8e6",
    fr: "Cendre",
    en: "Ash",
  },
  {
    id: "pearl",
    family: "neutral",
    value: "#f5f5f4",
    fr: "Perle",
    en: "Pearl",
  },
  {
    id: "gallery",
    family: "neutral",
    value: "#f9f9f7",
    fr: "Galerie",
    en: "Gallery",
  },
];

/** Provisional default (user: Craie) — explorers kept until final Q-19. */
export const DEFAULT_BG_ID = "chalk";

export function getBgById(id: string | null | undefined): BgSwatch {
  return (
    bgPalette.find((swatch) => swatch.id === id) ??
    bgPalette.find((swatch) => swatch.id === DEFAULT_BG_ID)!
  );
}

export function isBgId(value: string | null | undefined): boolean {
  return bgPalette.some((swatch) => swatch.id === value);
}
