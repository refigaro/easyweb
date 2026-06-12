# Brand Migration Plan — New Easyweb Design System → Site

> Written 2026-06-09. Picks up after fetching a Claude Design handoff bundle
> (`Marketing Site.html`) and analyzing it against the current site. **No
> implementation has started** — this is the plan for the next session(s).

---

## 0. Context

A Claude Design project ("Easyweb Design System") was iterated over 7 chat
sessions (2026-06-02 → 2026-06-10) and produced a full **brand refresh of the
homepage**: new typography (Rethink Sans), new palette (cyan `#21d2f2` /
green `#4be337` / teal `#8fd4c2` / orange `#ff9100` / ink `#242424`), the
"Webie" mascot, hand-drawn line icons, pill-shaped buttons with color-shift
hover states, scroll-reveal animations, and a navbar pill-on-scroll effect.

**`Marketing Site.html` is the canonical output** (confirmed in chat7: user
explicitly said "Marketing Site.html → index.html en tu repo"). A sibling
file `Marketing Site v2.html` was a discarded structural experiment (different
hero/wireframe layout pulled from another repo) — only its nav (Blog link,
Monthly Care Plan dropdown item) and footer CSS classes were merged back into
`Marketing Site.html`. **Do not use v2 as a base.**

### The core problem
- `design-system/01tokens.css` (in this repo) already has the new
  cyan/green/teal/orange color tokens, but **no Rethink Sans, no `.btn-primary`,
  no `.reveal`, no component classes** — it's an earlier, incomplete snapshot.
- The bundle's `colors_and_type.css` (339 lines) is a **more complete, later
  iteration** of the same system — includes type scale, button states, the
  `.reveal`/`.reveal-right` scroll-animation utilities (with
  `prefers-reduced-motion` support), and section/card component classes.
- **All 17 current HTML pages** (including `index.html` and `contact.html`,
  the nav/footer source of truth) still use the OLD generic Tailwind theme:
  Plus Jakarta Sans + indigo (`primary: #6366f1`, `accent: #10b981`).
- So implementing `Marketing Site.html` as the new `index.html` makes the
  homepage visually inconsistent with every other page until they migrate too.

### Why now is a reasonable time
Per project roadmap, outreach hasn't started yet — no live traffic will see
the inconsistency window. This is the cheapest point to absorb it.

---

## 1. Source bundle — where to find it

The design export was fetched as a gzip tarball via WebFetch from:
```
https://api.anthropic.com/v1/design/h/N-t2NDc9JAfD4aw_ZtColw?open_file=Marketing+Site.html
```

It was extracted to (likely **ephemeral**, may be gone next session):
```
/tmp/design_extract/easyweb-design-system/
```

If `/tmp` has been cleared, the raw gzip is persisted at:
```
/Users/sergio/.claude/projects/-Volumes-BACKUPS-Claude-Cowork-Projects-Easyweb-Sitio-Astro/f9c7225b-63be-4642-b638-c0464f34a722/tool-results/webfetch-1781057260766-ehv7or.bin
```
Re-extract with: `gunzip -c <file>.bin > archive.out && tar -xf archive.out`

**First action of the next session: re-fetch/re-extract if needed, then copy
the whole `easyweb-design-system/project/` folder somewhere persistent inside
this repo (e.g. a temp `_handoff/` dir) before doing anything else** — don't
rely on `/tmp` surviving.

### Bundle contents worth knowing about
- `project/Marketing Site.html` (853 lines) — **the file to implement**
- `project/colors_and_type.css` (339 lines) — new DS source of truth, incl.
  `.reveal`/`.reveal-right` animation utilities
- `project/README.md` — full design system documentation (palette, type,
  spacing scale, WCAG contrast rules, iconography, voice/tone)
- `project/assets/` — logos (horizontal/vertical/inverted/on-primary, svg+png),
  Webie mascot (3 poses, webp), 6 new hand-drawn line-icon SVGs
  (`icon--audience.svg`, `icon--connection.svg`, `icon--design.svg`,
  `icon--easy.svg`, `icon--multimedia.svg`, `icon--reach.svg`), `icono-0[1-6].webp`
- `project/uploads/` — hero photos, FAQ illustration, broken-site image, etc.
- `project/image-slot.js`, `_ds_bundle.js`, `tweaks-panel.jsx`,
  `.image-slots.state.json`, `.thumbnail` — **design-tool-only, do not ship**
- `project/preview/`, `project/screenshots/`, `project/ui_kits/` — design
  system reference material, not needed for implementation but useful context
- `chats/chat1-7.md` — full session transcripts; chat6 ("Homepage Spacing
  Audit") and chat7 ("Animación entrada") have the most recent refinements

---

## 2. Asset reconciliation map

Most assets the new homepage needs **already exist locally** under different
names/paths — this is a path-mapping exercise, not a re-acquisition one.

| Marketing Site.html reference | Existing local file |
|---|---|
| `assets/logo-horizontal.svg` / `.png` | `brand_assets/logotipo.svg` / `.png` |
| `assets/logo-invertido.svg` | `brand_assets/logotipo-invertido.svg` |
| `assets/logo-sobre-primario.svg` | `brand_assets/logotipo-sobre-primario.svg` |
| `assets/logo-vertical.svg` | `brand_assets/logo-vertical.svg` (same name) |
| `assets/webie-hello.webp` | `brand_assets/mascot/mascota-webie-hello@3x.webp` |
| `assets/webie-coding.webp` | `brand_assets/mascot/mascota-webie-coding@3x.webp` |
| `assets/webie-thumbs-up.webp` | `brand_assets/mascot/mascota-webie-thumbs-up@3x.webp` |
| `assets/icons/icono-0[1-6].webp` | `brand_assets/icons/icono-0[1-6].webp` (same) |
| `uploads/FAQs@3x.webp` | `brand_assets/mascot/FAQs@3x.webp` (same) |
| `uploads/hero-photo1.webp` | `photos/collages/hero-photo1.webp` (same) |
| `uploads/show-trustworthyness.webp` | `photos/collages/show-trustworthyness.webp` (same) |
| `uploads/03-your-website.webp` | `photos/collages/03-your-website.webp` (same) |
| `uploads/gain-visibility.webp` | `photos/collages/gain-visibility.webp` (same) |
| `uploads/broken-5836430d.webp` | **not found** — closest is `photos/collages/broken.webp` (verify visually before substituting) |
| `assets/icons/icon--audience.svg`, `icon--connection.svg`, `icon--design.svg`, `icon--easy.svg`, `icon--multimedia.svg`, `icon--reach.svg` | **NEW** — not in `brand_assets/icons/`, must be copied from bundle |

---

## 3. Step-by-step plan

### Step 1 — Implement `index.html` from `Marketing Site.html`
- Use `Marketing Site.html` (NOT v2) as the structural/visual base.
- Preserve from current `index.html`: meta description, OG tags, Schema.org
  `ProfessionalService` JSON-LD block (the design file has none of this).
- Fix known issues in the design file while porting:
  - `hello@easyweb.io` → `hello@easyweb.monster` (wrong domain, appears in
    contact section + footer)
  - Placeholder `#` links in nav/footer → real internal page paths
    (`/pricing.html`, `/our-work.html`, `/about.html`, `/services-*.html`, etc.)
  - Remove `<image-slot>` custom element + `image-slot.js` script tag —
    replace with the real `<img>` (the "I need a website" card uses
    `<image-slot id="who-we-help-new">`, needs a real image — check
    `photos/collages/` for a suitable "new website" image, or flag to Sergio
    if none exists)
  - Drop `_ds_bundle.js`, `tweaks-panel.jsx`, the `<style id="__om-edit-overrides">`
    block at the end — design-tool artifacts
- Apply asset path mapping from Section 2 above (rewrite `assets/...` and
  `uploads/...` paths to actual local paths).
- New 6 line icons (`icon--*.svg`) used? — check; if `Marketing Site.html`
  references them, copy into `brand_assets/icons/`.

### Step 2 — Promote `colors_and_type.css` into `design-system/`
- Diff `colors_and_type.css` (bundle) against `design-system/01tokens.css` +
  `04components.css`.
- `colors_and_type.css` is the newer/more complete version — likely becomes
  the new `01tokens.css` (or a new consolidated file), bringing in: Rethink
  Sans, `.btn-primary`/`.btn-secondary`/`.btn-ghost`, `.reveal`/`.reveal-right`
  + `prefers-reduced-motion`, section/card classes (`.stat-card`,
  `.pricing-card`, `.cost-card`, `.faq-grid`, etc.)
- Update `design-system/index.html` (Design System tab / docs) to reflect the
  consolidated tokens — check `05docs.css` for anything that needs updating.

### Step 3 — Propagate new nav + footer to remaining 16 pages
- New nav adds: "Blog" link, "Monthly Care Plan" in the Services dropdown,
  navbar pill-on-scroll behavior, `.nav-link` styling (font-weight 300 +
  orange underline hover).
- New footer: cleaned-up grid classes (`.footer-grid`, `.footer-link`,
  `.social-icon`), inverted logo, same link structure as before.
- This is mechanical (similar to the "Nav global estandarizada en 17 archivos"
  pass already done previously per CLAUDE.md) — swap nav/footer markup +
  pull in `colors_and_type.css` + Rethink Sans + Tailwind config block from
  the new `index.html` into all 16 other pages.
- **Scope check**: this only updates chrome (nav/footer/fonts/colors at the
  page-shell level), not full body redesigns.

### Step 4 — Defer: full body redesign of remaining 16 pages
- Pricing, About, Services (x4), Care Plan, Our Work, Blog (x3), case studies
  (x4), Contact, Terms — none of these have a new-brand design yet.
- This is real per-page design work, likely needs its own Claude Design
  sessions or careful manual application of the new DS tokens/components.
- Out of scope for the immediate migration; track separately.

---

## 4. Open questions for Sergio (carry into implementation session)

1. `uploads/broken-5836430d.webp` has no exact local match — confirm
   `photos/collages/broken.webp` is the same image, or source the right one.
2. The "I need a website" card uses an `<image-slot>` placeholder with no
   real image behind it — need a photo for this slot.
3. Confirm Step 3 (nav/footer propagation) should happen in the same pass as
   Step 1, or as a separate follow-up session.
