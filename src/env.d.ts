/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_PORTFOLIO_MODE?: "demo" | "authentic";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
