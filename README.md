# Web 9apoble9 (Astro)

Web estática hecha con [Astro](https://docs.astro.build) y publicada en GitHub Pages. El dominio propio queda listo en la configuración; estará activo cuando se configure en GitHub Pages y se actualice el DNS.

- Catalán: `https://escolaescalada9a.com/`
- Castellano: `https://escolaescalada9a.com/es/`
- Inglés: `https://escolaescalada9a.com/en/`

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

El resultado se crea en `dist/`. La configuración de Astro usa el dominio propio y la raíz del sitio como base.

### Dominio propio

En GitHub, configura `escolaescalada9a.com` como dominio personalizado en **Settings → Pages**. Después, en cdmon, apunta los registros `A` del dominio raíz (`@`) a `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`. No cambies los nameservers ni elimines los registros de correo. La propagación puede tardar hasta 24 horas. Con el despliegue de GitHub Actions no hace falta añadir un archivo `CNAME` al repositorio.

GitHub Pages no aplica el `.htaccess` del antiguo hosting cdmon. Al cambiar el DNS, las reglas configuradas allí, incluida la CSP, dejarán de aplicarse; configura las cabeceras de seguridad en un servicio compatible si siguen siendo necesarias.

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
Si el feed falla, la sección se oculta sola y queda el botón @9apoble9.

## Cuando haya base de datos (VPS)

1. Añadir el adaptador de Node: `npx astro add node`.
2. Las páginas que necesiten servidor llevan `export const prerender = false`; el resto sigue estático.
3. Las partes interactivas, como componentes de React (`npx astro add react`), reutilizables en Next.js si algún día se migra.

Documentación: https://docs.astro.build/en/guides/on-demand-rendering/
