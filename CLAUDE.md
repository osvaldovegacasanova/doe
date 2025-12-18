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
- **Site URL**: `https://www.pixory.cl/` - Important for sitemap generation
- **Integrations**: Tailwind, React, Sitemap
- Update the `site` property before deployment to ensure correct sitemap/robots.txt generation

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
