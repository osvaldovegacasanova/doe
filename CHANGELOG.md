# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Monitor Google Search Console for indexing improvements
- Verify all blog posts are indexed within 2-4 weeks
- Add more blog content for SEO growth

---

## [2.1] - 2025-12-26

### Added
- Nuevo artículo de blog: "Actualización de Google: Impacto en el Tráfico y Nuevas Funciones de Anuncios" (`google-core-update-impacto-trafico-2025.md`)
- Navbar agregado a BlogLayout4 para mejorar navegación en artículos

### Fixed
- **Navegación en artículos**: Header desaparecía al abrir artículos del blog
  - Agregado componente Navbar a `BlogLayout4.astro`
  - Los usuarios ahora pueden navegar de vuelta al home desde cualquier artículo
- **Link "Ver Artículos"**: Agregado trailing slash (`/blog/` en lugar de `/blog`)
  - Arreglado en `BlogSection.astro` línea 44
- **Nuevo artículo no aparecía en lista**: Problema de formato de fecha
  - Cambiado `pubDate` de "Diciembre 2025" a "Dec 2025" para correcta ordenación
  - JavaScript `Date.parse()` no reconocía nombres de meses en español
- **Estilos rotos en nuevo artículo**: Layout incorrecto
  - Cambiado de `BlogLayout.astro` a `BlogLayout4.astro` para consistencia

### Changed
- Versión del sitio incrementada de v2.0 a v2.1 en Footer
- Sistema de versionado documentado en CHANGELOG.md

### Technical Details
- Archivos modificados:
  - `src/layouts/BlogLayout4.astro` (agregado Navbar componente)
  - `src/components/sections/BlogSection.astro` (trailing slash en link)
  - `src/components/Footer.astro` (versión actualizada a v2.1)
  - `src/pages/blogs/google-core-update-impacto-trafico-2025.md` (layout y formato de fecha)
  - `CHANGELOG.md` (nueva estructura de versionado)

---

## [1.1.0] - 2025-12-26

### Fixed
- **SEO Indexing Issues**: Fixed 14 pages showing "Page with redirect" errors in Google Search Console
  - Renamed `cloudflare-bloquea-IA.md` to `cloudflare-bloquea-ia.md` for case consistency
  - Fixed Schema.org URL in `contacto.astro` to include trailing slash (`/contacto/`)
  - Updated MainLayout default URL from `www.pixory.cl` to `pixory.cl/` (canonical domain)
- All URLs now use canonical format: `https://pixory.cl/` (non-www with trailing slashes)
- Sitemap now generates only canonical URLs (verified in `dist/sitemap-0.xml`)

### Technical Details
- Files modified:
  - `src/pages/blogs/cloudflare-bloquea-IA.md` → `cloudflare-bloquea-ia.md`
  - `src/pages/contacto.astro` (line 198)
  - `src/layouts/MainLayout.astro` (line 6)
- Commit: `ad2fe5c3` - "Fix SEO indexing issues: Canonical URLs and trailing slashes"

---

## [1.0.1] - 2025-12-20

### Fixed
- 404 errors on service pages and blog links
- Added trailing slashes to all clickable links in `/servicios/`
- Updated Schema.org URLs to include trailing slashes
- Fixed BreadcrumbList navigation paths

### Changed
- Updated CLAUDE.md with critical documentation about trailing slash requirements
- Added URL canonicalization checkpoint to prevent redirect loops

---

## [1.0.0] - 2025-12-19

### Added
- Initial Astro website deployment on Netlify
- SEO service page with comprehensive FAQ section (6 questions)
- Blog system with 8 articles using BlogLayout4
- Schema.org structured data (Organization, Service, BlogPosting, ContactPage)
- Responsive navigation with React + Framer Motion
- Contact form integration
- WhatsApp floating button
- Google Analytics integration

### Features
- **Pages**: Home, Services, Blog, Contact
- **Services**: SEO, Google Ads, AI Automation, Data Analytics
- **Blog Posts**: 8 marketing and AI-focused articles
- **SEO**: Sitemap generation, robots.txt, canonical URLs
- **Performance**: Optimized images, lazy loading, code splitting

### Infrastructure
- Astro 5.x with SSR (Netlify adapter)
- TailwindCSS for styling
- Poppins font family (100-900 weights)
- Trailing slash enforcement: `always`
- Canonical domain: `https://pixory.cl/` (non-www)

---

## Format Legend

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements
