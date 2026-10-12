import { defineConfig } from "astro/config";

// GitHub Pages project site: https://Nicolass67.github.io/portfolio/
// Keep `base` aligned with the GitHub repository name.
export default defineConfig({
  site: "https://Nicolass67.github.io",
  base: "/portfolio/",
  output: "static",
  trailingSlash: "always",
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "directory",
  },
});
