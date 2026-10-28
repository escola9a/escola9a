# Web 9apoble9 (Astro)

Web estática hecha con [Astro](https://docs.astro.build). Se genera en tu ordenador y se sube por FTP a cdmon.

- Catalán: `escolaescalada9a.com/`
- Castellano: `escolaescalada9a.com/es/`
- Inglés: `escolaescalada9a.com/en/`

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

## Generar la web y subirla

Solo la primera vez: instala **Node.js 22.22 o superior** desde https://nodejs.org (versión LTS). Después, en una terminal dentro de esta carpeta:

```
npm install
```

Cada vez que cambies algo:

```
npm run build
```

Se crea la carpeta `dist/`. Sube **su contenido** (no la carpeta en sí) a la carpeta de la web en el FTP:

- `index.html`
- `es/`
- `en/`
- `_astro/`

Puedes borrar del servidor los `_astro/` antiguos si quieres, pero no hace falta. **No borres el `.htaccess`** del servidor.

Para ver la web en tu ordenador mientras editas: `npm run dev` y abre la dirección que aparece (normalmente http://localhost:4321).

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
