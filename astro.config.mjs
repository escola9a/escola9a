// @ts-check
import { defineConfig } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://escolaescalada9a.com",

  // Web estàtica: es genera la carpeta dist/ i es puja per FTP.
  // Quan hi hagi servidor (VPS), s'afegirà l'adaptador @astrojs/node
  // i només les pàgines amb `export const prerender = false` aniran a servidor.
  output: "static",

  // Cada pàgina com a carpeta: /es/ → dist/es/index.html (funciona a qualsevol hosting Apache).
  build: { format: "directory" },
  trailingSlash: "ignore",

  // Manté l'eliminació d'espais "clàssica" (a v7 el valor per defecte és "jsx").
  compressHTML: true,

  // Català a l'arrel (/), castellà a /es/ i anglès a /en/.
  i18n: {
    locales: ["ca", "es", "en"],
    defaultLocale: "ca",
    routing: { prefixDefaultLocale: false },
  },
});
