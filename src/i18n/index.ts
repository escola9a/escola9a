// Textos de la web per idioma. Per canviar un text, edita ca.json / es.json / en.json.
// Els tres fitxers han de tenir exactament les mateixes claus.
import ca from "./ca.json";
import es from "./es.json";
import en from "./en.json";

export const LOCALES = ["ca", "es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ca";

export type Dict = typeof ca;

const dicts: Record<Locale, Dict> = { ca, es, en };

export function getDict(locale: string | undefined): Dict {
  return dicts[(locale as Locale) ?? DEFAULT_LOCALE] ?? dicts[DEFAULT_LOCALE];
}

// Dades comunes a tots els idiomes.
export const SITE = {
  whatsapp: "34620081205",
  instagramUser: "9apoble9",
  instagramUrl: "https://instagram.com/9apoble9",
  mapsUrl: "https://maps.google.com/?q=Carrer+d%27Espronceda+21+08005+Barcelona",
  addressLine1: "Carrer d'Espronceda, 21",
  addressLine2: "Sant Martí · 08005 Barcelona",
  beholdFeedUrl: "https://feeds.behold.so/w0FXX76QLZ149MZE5zrp",
};
