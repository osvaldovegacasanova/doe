# TODO List

Project task tracking for Pixory Marketing website.

---

## Completed ✅

### 2025-12-26 - SEO Indexing Fixes
- [x] **Rename blog file for case consistency** - 2025-12-26
  - Renamed `cloudflare-bloquea-IA.md` → `cloudflare-bloquea-ia.md`
  - Status: ✅ Completed
  - Commit: `ad2fe5c3`

- [x] **Fix Schema.org URL in contacto.astro** - 2025-12-26
  - Added trailing slash to ContactPage schema URL
  - Changed: `"url": "https://pixory.cl/contacto"` → `"url": "https://pixory.cl/contacto/"`
  - Status: ✅ Completed
  - File: `src/pages/contacto.astro:198`
  - Commit: `ad2fe5c3`

- [x] **Fix MainLayout default URL** - 2025-12-26
  - Updated default URL to canonical domain (non-www with trailing slash)
  - Changed: `url = 'https://www.pixory.cl'` → `url = 'https://pixory.cl/'`
  - Status: ✅ Completed
  - File: `src/layouts/MainLayout.astro:6`
  - Commit: `ad2fe5c3`

- [x] **Build and verify sitemap** - 2025-12-26
  - Verified all URLs use canonical format
  - Confirmed no www references in dist/ folder
  - Status: ✅ Completed

- [x] **Deploy to production** - 2025-12-26
  - Pushed SEO fixes to GitHub
  - Status: ✅ Completed (awaiting Netlify rebuild)

### 2025-12-20 - Trailing Slash Fixes
- [x] **Fix 404 errors on service pages**
  - Added trailing slashes to all internal links
  - Updated Schema.org URLs
  - Status: ✅ Completed
  - Commit: `d2985046`

- [x] **Update CLAUDE.md documentation**
  - Added URL canonicalization checkpoint
  - Documented trailing slash requirements
  - Status: ✅ Completed
  - Commit: `0b7447aa`

### 2025-12-19 - SEO Page Expansion
- [x] **Expand SEO page FAQ section**
  - Increased from 4 to 6 questions
  - Improved messaging and clarity
  - Status: ✅ Completed
  - Commit: `5f161bfa`

- [x] **SEO optimization improvements**
  - Improved SEO score from 87% to 95%+
  - Added meta descriptions, alt tags, structured data
  - Status: ✅ Completed
  - Commit: `32b702de`

---

## In Progress 🔄

### Google Search Console
- [ ] **Submit updated sitemap** - Started: 2025-12-26
  - URL: `https://pixory.cl/sitemap-index.xml`
  - Action: Re-submit in Search Console Sitemaps section
  - Status: 🔄 Waiting for Netlify deployment

- [ ] **Request indexing for blog posts** - Started: 2025-12-26
  - 8 blog posts need manual indexing request
  - URLs:
    - `https://pixory.cl/blogs/cloudflare-bloquea-ia/` (renamed)
    - `https://pixory.cl/blogs/estrategia-go-to-market/`
    - `https://pixory.cl/blogs/marketing-para-emprendedores/`
    - `https://pixory.cl/blogs/como-implementar-agentes-ia/`
    - `https://pixory.cl/blogs/costos-inteligencia-artificial/`
    - `https://pixory.cl/blogs/odoo-inteligencia-artificial/`
    - `https://pixory.cl/blogs/core-update-google/`
    - `https://pixory.cl/blogs/que-son-los-embeddings/`
  - Status: 🔄 Waiting for successful deployment
  - Note: Submit ~10-12 URLs per day (Google limit)

---

## Pending 📋

### High Priority
- [ ] **Monitor Google Search Console indexing** - Due: 2026-01-09
  - Check "Pages" report for decrease in "Page with redirect" errors
  - Expected: 14 errors → 0 errors
  - Timeline: 1-2 weeks after deployment

- [ ] **Verify live deployment** - Due: 2025-12-27
  - Test renamed blog URL: `curl -I https://pixory.cl/blogs/cloudflare-bloquea-ia/`
  - Test contacto canonical: `curl -s https://pixory.cl/contacto/ | grep canonical`
  - Verify sitemap has no www URLs

### Medium Priority
- [ ] **SEO performance monitoring** - Ongoing
  - Track indexed page count increase
  - Monitor blog posts appearing in search results
  - Check for duplicate content issues

- [ ] **Content updates**
  - Add hero images to blog posts without them
  - Update blog publication dates from placeholder months
  - Add more internal linking between blog posts

### Low Priority
- [ ] **Technical improvements**
  - Consider adding blog post categories/tags navigation
  - Implement related posts suggestions
  - Add social sharing buttons to blog posts

---

## Backlog 💤

- [ ] Add blog RSS feed
- [ ] Implement search functionality for blog
- [ ] Create case studies section
- [ ] Add testimonials to service pages
- [ ] Optimize images with next-gen formats (WebP/AVIF)
- [ ] Implement i18n for English version
- [ ] Add newsletter signup form
- [ ] Create sitemap.xml for images

---

## Blocked/Waiting ⏸️

- [ ] **Netlify deployment retry** - Blocked: 2025-12-26
  - Issue: DNS resolution error "Could not resolve host: github.com"
  - Action needed: Trigger manual re-deploy in Netlify dashboard
  - Status: ⏸️ Infrastructure issue, waiting for re-deploy

---

## Notes

### URL Format Rules
- All URLs MUST use: `https://pixory.cl/` (non-www)
- All URLs MUST have trailing slashes
- Schema.org URLs must match actual page URLs
- Blog post filenames should be lowercase for consistency

### Google Search Console Workflow
1. Wait for Netlify deployment success
2. Submit sitemap in Search Console
3. Manually request indexing for priority URLs
4. Monitor "Pages" report weekly
5. Check "Coverage" report for errors

### Future Considerations
- Add structured data for FAQ pages
- Implement breadcrumb navigation on service pages
- Consider blog post series/categories
- Add estimated reading time to blog posts
