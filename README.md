# Web 9apoble9 (Astro)

Web estática hecha con [Astro](https://docs.astro.build), publicada en GitHub Pages.

- Catalán: `https://escola9a.github.io/escola9a/`
- Castellano: `https://escola9a.github.io/escola9a/es/`
- Inglés: `https://escola9a.github.io/escola9a/en/`

## Cambiar un texto

Los textos están en `src/i18n/`:

- `ca.json` (catalán), `es.json` (castellano), `en.json` (inglés)

Las preguntas frecuentes están en la clave `"faq"` de esos mismos archivos (precios y horarios se cambian ahí).
Cada respuesta es una lista de bloques: `{ "p": "párrafo" }`, `{ "ol": ["punto 1", "punto 2"] }` (lista numerada)
o `{ "p": "...", "link": { "text": "texto del párrafo que será enlace", "url": "https://..." } }`.

Los tres archivos tienen las mismas claves. Si cambias un texto en uno, revisa los otros dos.
Datos comunes a todos los idiomas (WhatsApp, Instagram, dirección, feed de Behold): `src/i18n/index.ts`.

## Cambiar colores, tipografías o espacios

`src/styles/tokens.css`. Los estilos propios de cada sección están dentro de su componente en `src/components/`.

Puntos de corte (responsive), solo estos tres: **600px** (móvil), **768px** (tableta), **900px** (portátil pequeño).

## Cambiar una foto

Sustituye el archivo en `src/assets/` manteniendo el nombre (`foto-climbing.jpeg`, `foto-kallpa.jpeg`, `foto-kids.jpeg`). Al generar la web, Astro crea versiones optimizadas.

## Publicar la web

GitHub Actions genera y publica la web automáticamente al subir cambios a la rama `main`. También se puede iniciar manualmente desde la pestaña **Actions** del repositorio. La configuración de GitHub Pages debe tener **Source: GitHub Actions**.

Para probar la web en tu ordenador, instala **Node.js 22.22 o superior** desde https://nodejs.org (versión LTS). Después, en una terminal dentro de esta carpeta:

```
npm install
npm run dev
```

Para generar la web localmente:

```
npm run build
```

El resultado se crea en `dist/`. La configuración `base: "/escola9a"` es necesaria para publicar en la URL de proyecto de GitHub Pages.

### Cambiar al dominio propio

Cuando se quiera publicar en `escolaescalada9a.com`, cambia `site` en `astro.config.mjs` a `https://escolaescalada9a.com` y elimina la opción `base`. Añade `public/CNAME` con el texto `escolaescalada9a.com` y configura el dominio personalizado y sus DNS según GitHub Pages. El sitio dejará de publicarse en la ruta `/escola9a`.

GitHub Pages no aplica el `.htaccess` del antiguo hosting cdmon. Si se cambia el DNS, las reglas configuradas allí, incluida la CSP, dejarán de aplicarse; configura las cabeceras de seguridad en un servicio compatible si siguen siendo necesarias.

## Estructura

```
src/
  i18n/        textos por idioma + datos comunes
  styles/      tokens.css (colores, tipos, espacios) · base.css (reset y piezas comunes)
  components/  una sección por archivo (Nav, Hero, About, Activities, Booking, Location, Footer…)
  layouts/     Base.astro (head, idioma, hreflang)
  lib/         instagram.ts (lógica del feed, sin depender de Astro)
  pages/       index.astro (ca) · es/index.astro · en/index.astro
```

## Instagram

Los últimos 4 posts vienen de Behold (plan gratis: 1.200 visualizaciones/mes, se actualiza cada 24 h).
La CSP del `.htaccess` superior del servidor debe incluir `https://feeds.behold.so` en `connect-src`.
Si el feed falla, la sección se oculta sola y queda el botón @9apoble9.

## Cuando haya base de datos (VPS)

1. Añadir el adaptador de Node: `npx astro add node`.
2. Las páginas que necesiten servidor llevan `export const prerender = false`; el resto sigue estático.
3. Las partes interactivas, como componentes de React (`npx astro add react`), reutilizables en Next.js si algún día se migra.

Documentación: https://docs.astro.build/en/guides/on-demand-rendering/
