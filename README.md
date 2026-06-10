# Easyweb — Sitio Web

Prototipos HTML del sitio de [easyweb.monster](https://easyweb.monster), la agencia web de Sergio Arcibar. Estos archivos validan copy, estructura y arquitectura de información antes de migrar a componentes Astro.

## Stack objetivo

**Astro** (frontend estático) + **WordPress headless** (CMS) + **Hostinger** (hosting) + **Cloudflare** (CDN)

## Estructura

```
├── index.html                  # Homepage
├── about.html                  # About — equipo, proceso, LLC
├── pricing.html                # Planes y comparativa de precios
├── contact.html                # Formulario de contacto
├── our-work.html               # Portfolio (case studies)
├── services-corporate.html     # Business Websites ($899)
├── services-ecommerce.html     # Online Stores ($1,499)
├── services-speed-optimization.html  # Landing Pages ($499)
├── services-care-plan.html     # Monthly Care Plan ($99/mo)
├── terms-privacy.html          # Terms & Privacy
├── work/                       # Case studies individuales
│   ├── frikko-hvac.html
│   ├── imperial-cfs.html
│   ├── pmas-arquitectos.html
│   └── poder-de-la-nuez.html
├── blog/                       # Wireframes del blog
│   ├── index.html
│   ├── post.html
│   └── category.html
├── lp/                         # Landing pages
│   └── get-a-website.html
├── design-system/              # Tokens CSS, componentes, docs
├── brand_assets/               # Logos, fonts, iconos, mascota
└── photos/                     # Assets fotográficos (no trackeado)
```

## Flujo de trabajo

1. **HTML puro** — prototipos de contenido y diseño (etapa actual)
2. **Migración a Astro** — convertir secciones en componentes `.astro`
3. **WordPress REST API** — blog y contenido dinámico
4. **Deploy** — sitio estático Astro + WordPress backend

## Design system

Los estilos están modularizados en `design-system/`:

- `01tokens.css` — variables de color, tipografía, espaciado
- `02base.css` — reset y estilos base
- `03layout.css` — grid y layout
- `04components.css` — botones, cards, formularios
- `05docs.css` — estilos de documentación

## Notas

- Los HTMLs usan Tailwind via CDN como herramienta de prototipado. En producción será dependencia real.
- `photos/` está en `.gitignore` — los assets fotográficos se manejan fuera del repo.
- El formulario de contacto usa Formspree como placeholder. En producción usará Resend + SSR.
