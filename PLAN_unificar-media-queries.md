# Plan: Unificar media queries raw en un solo archivo CSS

**Proyecto:** Easyweb / Sitio Astro  
**Fecha:** junio 2026  
**Estado:** ✅ COMPLETADO — junio 2026

---

## Contexto

El proyecto usa Tailwind CDN para clases responsive (`sm:`, `md:`, `lg:`, etc.).
Sin embargo, 13 archivos HTML contienen bloques `<style>` con media queries CSS raw duplicados en cada página.

Esto no fue un error — fue una workaround válida porque Tailwind CDN no soporta
`grid-column: 1 / -1` (necesario para el footer) ni la lógica de clase JS `.scrolled` del navbar.

El problema: esos bloques están **copy-pasteados en 13 archivos** sin fuente de verdad.
Cualquier cambio al footer o navbar exige editar los 13 archivos a mano.

---

## Archivos afectados (13)

```
/Sitio Astro/index.html
/Sitio Astro/about.html
/Sitio Astro/contact.html
/Sitio Astro/our-work.html
/Sitio Astro/pricing.html
/Sitio Astro/services-corporate.html
/Sitio Astro/services-ecommerce.html
/Sitio Astro/services-speed-optimization.html
/Sitio Astro/services-care-plan.html
/Sitio Astro/blog/index.html
/Sitio Astro/blog/post.html
/Sitio Astro/blog/category.html
/Sitio Astro/design-system/index.html
```

---

## Los dos patrones que se repiten en cada archivo

### Patrón A — Navbar pill on scroll (1 media query)

```css
/* ── Navbar pill effect on scroll ── */
#navbar-inner {
  transition: border-radius 200ms ease, margin 200ms ease,
              background 200ms ease, box-shadow 200ms ease;
}
#navbar.scrolled #navbar-inner {
  border-radius: var(--radius-pill);
  margin: .5rem auto;
  width: 95vw;
  max-width: 1680px;
  background: rgba(255,255,255,.80);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow-md);
}
#navbar.scrolled #navbar-inner #nav-content {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}
@media (max-width: 768px) {
  #navbar.scrolled #navbar-inner {
    border-radius: 0;
    margin: 0;
    width: 100%;
    max-width: none;
    background: rgba(255,255,255,.95);
    backdrop-filter: blur(10px);
  }
  #navbar.scrolled #navbar-inner #nav-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

### Patrón B — Footer grid responsive (2 media queries)

```css
/* ── Footer ── */
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-7);
  margin-bottom: 80px;
}
@media (max-width: 1024px) {
  .footer-grid { grid-template-columns: 1fr 1fr 1fr; }
  .footer-grid > div:first-child { grid-column: 1 / -1; }
}
@media (max-width: 640px) {
  .footer-grid { grid-template-columns: 1fr; }
}
footer a.footer-link {
  color: var(--fg-on-dark-muted);
  text-decoration: none;
  display: inline;
  padding-bottom: 8px;
  border-bottom: 2px solid transparent;
  transition: color .15s, border-color .15s;
}
footer a.footer-link:hover { color: #fff; border-bottom-color: var(--secundario-300); }
footer a.social-icon {
  color: var(--fg-1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-pill);
  background: var(--white);
  transition: color .15s, background .15s;
}
footer a.social-icon:hover { background: var(--primario-500); color: var(--fg-1); }
```

---

## Excepciones — media queries de página específica

Algunos archivos tienen media queries adicionales que NO son boilerplate.
Estas **no se mueven** al archivo compartido — se quedan en el `<style>` de su página.

| Archivo | CSS específico de página |
|---|---|
| `about.html` | `.bg-about-grid { grid-template-columns: 1fr !important; }` a max-width 768px |

Al ejecutar cada paso, leer el bloque `<style>` completo y verificar que no haya más excepciones antes de eliminar.

---

## Solución

Crear `design-system/responsive-overrides.css` con los Patrones A y B.
Reemplazar los bloques duplicados en cada HTML por un `<link>` a ese archivo.

El `<link>` va **después** del link a `colors_and_type.css` y **antes** del cierre `</head>`:

```html
<link rel="stylesheet" href="/design-system/responsive-overrides.css">
```

> **Nota de ruta:** Ajustar la ruta relativa según la profundidad del archivo.  
> - Páginas raíz: `design-system/responsive-overrides.css`  
> - Páginas en `/blog/`: `../design-system/responsive-overrides.css`

---

## Por qué NO se convierten a Tailwind puro

- `grid-column: 1 / -1` requiere Tailwind JIT (`[grid-column:1/-1]`) — no disponible en CDN
- El navbar `.scrolled` es estado JS-driven — las clases Tailwind no se pueden aplicar condicionalmente desde CSS puro
- Ambos se resolverán solos al migrar a Astro + Tailwind real (Fase 2 del roadmap)

---

## Pasos de ejecución

### ✅ Paso 1 — Auditoría de variantes
**Qué hacer:** Leer el bloque `<style>` completo de cada uno de los 13 archivos.
Confirmar si los Patrones A y B son 100% idénticos en todos, o si hay variantes menores.
Documentar cualquier excepción encontrada (como la de `about.html`).

**Cómo verificar:** `grep -n "@media"` en cada archivo + leer el contexto de cada hit.

**Output esperado:** Lista de archivos con sus excepciones (si las hay). Confirmación de que los patrones son canónicos.

---

### ✅ Paso 2 — Crear `design-system/responsive-overrides.css`
**Qué hacer:** Crear el archivo con los Patrones A y B exactos (los bloques de código de arriba).
No inventar ni cambiar nada — copiar el CSS canónico confirmado en el Paso 1.

**Archivo a crear:** `/Sitio Astro/design-system/responsive-overrides.css`

**Output esperado:** Archivo creado. Verificar que existe y tiene contenido.

---

### ✅ Paso 3 — Migrar `index.html`
**Qué hacer:**
1. Leer el bloque `<style>` de `index.html`
2. Identificar qué CSS es Patrón A/B (se elimina) y qué es específico de página (se deja)
3. Agregar `<link rel="stylesheet" href="design-system/responsive-overrides.css">` en `<head>`
4. Eliminar el CSS duplicado del `<style>`

**Output esperado:** `index.html` sin `@media` de nav/footer. `<link>` añadido. Abrir en browser y confirmar que footer y navbar se ven iguales.

---

### ✅ Paso 4 — Migrar los 4 archivos de servicios
Mismo procedimiento del Paso 3 para:
- `services-corporate.html`
- `services-ecommerce.html`
- `services-speed-optimization.html`
- `services-care-plan.html`

Ruta del `<link>`: `design-system/responsive-overrides.css` (mismo nivel que `index.html`).

---

### ✅ Paso 5 — Migrar los archivos restantes
Mismo procedimiento para:
- `about.html` — **ojo:** tiene excepción `.bg-about-grid`, no eliminarla
- `contact.html`
- `our-work.html`
- `pricing.html`
- `blog/index.html` — ruta: `../design-system/responsive-overrides.css`
- `blog/post.html` — ruta: `../design-system/responsive-overrides.css`
- `blog/category.html` — ruta: `../design-system/responsive-overrides.css`
- `design-system/index.html` — verificar si aplica o si este archivo es especial

---

### ✅ Paso 6 — Verificación final
**Qué hacer:** Correr el siguiente comando desde la raíz del proyecto:

```bash
grep -rn "@media" "/Volumes/BACKUPS/Claude Cowork/Projects/Easyweb/Sitio Astro" --include="*.html" --include="*.css"
```

**Resultado esperado:**
- El único archivo `.css` con `@media` es `responsive-overrides.css`
- Los `.html` solo muestran `@media` si son excepciones de página documentadas (como `about.html`)
- Ningún archivo tiene los Patrones A o B inline

---

## Lo que NO cambia con este plan

- Las clases Tailwind `sm:`, `md:`, `lg:`, `xl:`, `2xl:` — correctas, no se tocan
- El JavaScript del navbar — no hay nada que cambiar ahí
- La arquitectura de los HTMLs — siguen siendo prototipos estáticos con Tailwind CDN
- La migración a Astro — este plan es preparación, no migración

---

## Contexto de proyecto necesario para ejecutar

Este sitio es un **prototipo HTML estático** de Easyweb (agencia web LLC en EEUU).
Usa **Tailwind CDN** (no compilado) + **variables CSS propias** definidas en `design-system/colors_and_type.css`.

Los HTMLs son la Fase 1 del roadmap — validación de diseño/copy antes de migrar a Astro.
Este plan de limpieza de media queries es mantenimiento de la Fase 1, no parte de la migración.

El `design-system/` ya contiene `colors_and_type.css` — el nuevo `responsive-overrides.css` va en esa misma carpeta.
