# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based portfolio/marketing website built on the Aether theme, customized for Pixory Marketing (a Chilean marketing agency). The site is a single-page application with multiple sections, featuring React components for interactive elements and Markdown-based blog posts.


DISTILLED_AESTHETICS_PROMPT = """
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>
"""

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

## Architecture

### Configuration-Driven Content

The entire site content is centralized in `src/data.js`. This single file controls:
- Site identity (name, bio, navigation)
- Selected projects/services
- Skills and work experience
- Contact information
- Feature flags (e.g., `isTransitionEnabled`, `showDeveloperText`)

When updating site content, always modify `src/data.js` first.

### Page Structure

The main page (`src/pages/index.astro`) is composed of section components:
- `MainSection` - Hero/intro with selected projects sidebar
- `AboutSection` - About text, skills grid, and work experience cards
- `BlogSection` - Blog posts listing with intro text
- `ContactSection` - Contact options grid
- `Footer` - Navigation links

All sections receive their data as props from `src/data.js`.

### Layouts

- `MainLayout.astro` - Base HTML shell with Poppins font imports, SEO meta tags, and optional ViewTransitions
- `BlogLayout.astro` (and variants `BlogLayout2`, `BlogLayout3`, `BlogLayout4`) - Blog post layout with frontmatter-driven metadata

### Blog Posts

Blog posts are Markdown files in `src/pages/blogs/` with this required frontmatter:

```markdown
---
layout: ../../layouts/BlogLayout.astro
title: "Post Title"
description: "Post description"
pubDate: "Month Year"
heroImage: /image.webp
badge: "Category Badge"
author: "Author Name"
tags:
  - tag1
  - tag2
---
```

### Styling

- **TailwindCSS** is the primary styling system
- Custom Tailwind config in `tailwind.config.mjs` includes `@tailwindcss/typography` plugin with a custom `tight` variant for compact lists
- Global styles in `src/styles/styles.css`
- Blog-specific styles in `src/styles/blog.css`

### React Components

The site uses React with Framer Motion for animations:
- `Navbar.jsx` - Mobile-responsive navigation with animated hamburger menu
- React is configured via `tsconfig.json` with `jsx: "react-jsx"`

### Astro Configuration

Key settings in `astro.config.mjs`:
- **Site URL**: `https://pixory.cl/` - Important for sitemap generation
- **Output Mode**: `'server'` - Enables SSR with Netlify adapter
- **Trailing Slash**: `'always'` - Ensures consistent URLs (e.g., `/blog/` not `/blog`)
- **Integrations**: Tailwind, React, Sitemap (with filters for dev pages)

## CRITICAL: URL Canonicalization & Redirect Configuration

**⚠️ PERMANENT CHECKPOINT - READ BEFORE ANY URL/REDIRECT CHANGES ⚠️**

### Canonical Domain Decision

This site uses **non-www (`https://pixory.cl/`)** as the canonical domain.

**DO NOT change this without understanding the implications below.**

### The Infinite Redirect Loop Issue (Dec 2024)

**What Happened:**
- Created `public/_redirects` file attempting to redirect `pixory.cl` → `www.pixory.cl`
- Netlify project settings were configured to redirect `www.pixory.cl` → `pixory.cl`
- This created an infinite redirect loop that broke the entire site

**Root Cause:**
- Netlify has TWO places where redirects can be configured:
  1. **Project-level settings** (in Netlify dashboard)
  2. **`public/_redirects` file** (in codebase)
- These configurations conflicted, creating a loop

**The Fix:**
1. Removed `public/_redirects` file entirely
2. Changed `astro.config.mjs` site URL to `https://pixory.cl/` (non-www)
3. Let Netlify's project-level redirect handle www → non-www

### The Canonical URL Mismatch Issue (Dec 2024)

**⚠️ CRITICAL: Changing astro.config.mjs is NOT enough! ⚠️**

**What Happened:**
After fixing the infinite redirect loop by changing `astro.config.mjs` to use `https://pixory.cl/`, the site still showed as "not indexable" in Screaming Frog. The homepage returned HTTP 200 OK but was marked as duplicate content.

**Root Cause:**
Individual page files had **hardcoded canonical URLs** pointing to the old www domain:
```astro
<MainLayout
  url="https://www.pixory.cl/"  <!-- ❌ Still using www! -->
  ...
>
```

This created a mismatch:
- Page served from: `https://pixory.cl/`
- Canonical tag says: `<link rel="canonical" href="https://www.pixory.cl/">`
- Result: Page tells search engines "I'm a duplicate, index the www version instead"

**Files with Hardcoded URLs:**
All `.astro` pages pass `url` prop to `MainLayout`:
- `src/pages/index.astro` - Homepage
- `src/pages/blog.astro` - Blog listing
- `src/pages/contacto.astro` - Contact page
- `src/pages/servicios/index.astro` - Services listing
- `src/pages/servicios/seo.astro` - SEO service page
- `src/pages/servicios/google-ads.astro` - Google Ads page
- `src/pages/servicios/inteligencia-artificial.astro` - IA page
- `src/pages/servicios/data-analytics.astro` - Analytics page

Additionally, Schema.org JSON-LD blocks in these pages also contained hardcoded www URLs.

**The Complete Fix Required:**
1. ✅ Update `astro.config.mjs` to `https://pixory.cl/`
2. ✅ Update ALL page `url` props to remove www
3. ✅ Update ALL Schema.org JSON-LD URLs to remove www
4. ✅ Verify with grep search (see commands below)

**How to Find All www URLs:**
```bash
# Search for hardcoded www URLs in page files
grep -r "www\.pixory\.cl" src/pages/*.astro src/pages/**/*.astro 2>/dev/null | grep -v "node_modules"

# Check HTML output for canonical mismatch
curl -s https://pixory.cl/ | grep -i "canonical\|og:url"
```

**Why This Is Critical:**
- Screaming Frog marks mismatched URLs as "not indexable"
- Google sees duplicate content (page points to different canonical)
- PageRank dilution across two URLs
- Search Console will show "Duplicate without user-selected canonical" errors

**Prevention for Future:**
When changing canonical domain, you MUST update:
1. Netlify dashboard domain settings
2. `astro.config.mjs` site URL
3. **ALL page-level `url` props in MainLayout calls**
4. **ALL Schema.org JSON-LD URLs**
5. Blog layout canonical generation (already dynamic, safe)

### How URL Canonicalization Works Now

**Netlify Configuration (Project-Level):**
- Redirects `www.pixory.cl/*` → `pixory.cl/*` (301 Moved Permanently)
- This is configured in Netlify's dashboard/settings
- **DO NOT override this with `_redirects` file**

**Astro Configuration:**
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://pixory.cl/',  // MUST match Netlify's canonical domain
  trailingSlash: 'always',
  // ...
});
```

**Page-Level Canonical URLs:**
All `.astro` pages should generate canonical URLs like this:
```astro
---
const canonicalURL = new URL(Astro.url.pathname, Astro.site).href;
---

<head>
  <link rel="canonical" href={canonicalURL} />
  <meta property="og:url" content={canonicalURL} />
</head>
```

### Rules for Future Changes

**✅ SAFE to do:**
- Update page content, components, styles
- Add new pages with canonical URLs following the pattern above
- Modify trailing slash behavior in `astro.config.mjs`

**❌ NEVER do (without careful planning):**
- Create `public/_redirects` file without checking Netlify dashboard settings
- Change `site` in `astro.config.mjs` without updating Netlify configuration
- Add redirect rules that conflict with Netlify's project-level redirects
- Switch between www/non-www without coordinating both Netlify and Astro config

**🔍 MUST verify before deployment:**
- Test both `pixory.cl` and `www.pixory.cl` redirect correctly
- Check that canonical URLs match the actual served domain
- Verify no redirect chains (URL should redirect max once, if at all)
- Run Screaming Frog or similar crawler to detect redirect issues

### How to Verify Configuration

```bash
# Check non-www (should return 200 OK)
curl -I https://pixory.cl/

# Check www (should return 301 to non-www)
curl -I https://www.pixory.cl/

# Verify trailing slash redirect
curl -I https://pixory.cl/blog  # Should 301 to /blog/
```

**Expected Results:**
- `https://pixory.cl/` → 200 OK
- `https://www.pixory.cl/` → 301 → `https://pixory.cl/`
- `https://pixory.cl/blog` → 301 → `https://pixory.cl/blog/`

### SEO Implications

**Why This Matters:**
- Google sees www and non-www as different sites
- Inconsistent canonical URLs cause duplicate content penalties
- Redirect loops prevent indexing entirely (catastrophic SEO failure)
- Every 301 redirect loses ~1-5% link equity

**Current SEO Setup:**
- ✅ Single canonical domain (non-www)
- ✅ Consistent trailing slashes
- ✅ Canonical tags on all pages
- ✅ Open Graph og:url matches canonical
- ✅ No redirect chains or loops

**If You Need to Change Canonical Domain:**

1. **Update Netlify Dashboard:**
   - Go to Site Settings → Domain Management
   - Configure primary domain
   - Set up redirect from alternate domain

2. **Update Astro Config:**
   ```javascript
   // astro.config.mjs
   site: 'https://[your-canonical-domain]/'
   ```

3. **⚠️ CRITICAL: Update ALL Page Files (this step is often forgotten!):**
   ```bash
   # First, find all files with the old domain
   grep -r "www\.pixory\.cl" src/pages/*.astro src/pages/**/*.astro 2>/dev/null

   # Then update each MainLayout url prop, for example:
   # src/pages/index.astro
   url="https://[your-canonical-domain]/"

   # Also update Schema.org JSON-LD URLs in:
   # - src/pages/contacto.astro
   # - src/pages/servicios/*.astro
   ```

   Files that need manual updates:
   - `src/pages/index.astro`
   - `src/pages/blog.astro`
   - `src/pages/contacto.astro` (including Schema.org)
   - `src/pages/servicios/index.astro` (including Schema.org)
   - `src/pages/servicios/seo.astro` (including Schema.org)
   - `src/pages/servicios/google-ads.astro` (including Schema.org)
   - `src/pages/servicios/inteligencia-artificial.astro` (including Schema.org)
   - `src/pages/servicios/data-analytics.astro` (including Schema.org)

4. **Verify All URLs Are Consistent:**
   ```bash
   # Should return ZERO results (no www URLs)
   grep -r "www\.pixory\.cl" src/pages/*.astro src/pages/**/*.astro 2>/dev/null | grep -v node_modules

   # Check live HTML output
   curl -s https://pixory.cl/ | grep -i "canonical"
   # Should output: <link rel="canonical" href="https://pixory.cl/">
   ```

5. **Test Thoroughly:**
   - Build locally: `npm run build && npm run preview`
   - Test all URLs with curl
   - Run Screaming Frog crawl
   - Check Google Search Console for errors
   - Verify no "not indexable" warnings

6. **Monitor After Deployment:**
   - Watch for redirect errors in Netlify logs
   - Check Google Search Console for indexing issues
   - Monitor site uptime (redirect loops cause downtime)
   - Re-run Screaming Frog after 24 hours

## Common Development Tasks

### Adding a New Blog Post

1. Create a new `.md` file in `src/pages/blogs/`
2. Copy the frontmatter structure from existing posts
3. Use one of the BlogLayout variants (BlogLayout, BlogLayout2, BlogLayout3, or BlogLayout4)
4. Add hero image to `/public/` directory

### Updating Site Content

Edit `src/data.js`:
- `myName`, `myBio` - Hero section text
- `navLinks` - Navigation and footer links
- `selectedProjects` - Services/projects sidebar
- `skills` - Skills grid items
- `workExperiences` - Service offerings cards
- `contactOptions` - Contact methods

### Modifying Sections

Section components are in `src/components/sections/`. Each section is self-contained and receives data via props.

### Adding New Pages

Create `.astro` files in `src/pages/`. The file-based routing follows Astro conventions.

## Project-Specific Conventions

- Language: Site content is in Spanish (targeting Chilean market)
- Font: Poppins (weights 100-900 loaded in MainLayout)
- View Transitions: Can be toggled via `isTransitionEnabled` in `src/data.js`
- WhatsApp integration: Fixed button component configured in MainLayout with phone number `56956460570`
