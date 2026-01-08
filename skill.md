# Expert On-Site SEO Knowledge Base

**Purpose**: AI agent reference for on-site SEO optimization
**Scope**: Technology-agnostic SEO principles
**Level**: Expert (technical + strategic)

---

## 1. FOUNDATION - SEO FUNDAMENTALS

### How Search Engines Work

**Crawling → Indexing → Ranking**

1. **Crawling**: Bots (Googlebot) discover pages via links and sitemaps
2. **Indexing**: Content analyzed, stored in search index
3. **Ranking**: Algorithm determines relevance and authority for queries

**Key Concepts**:
- **PageRank**: Link equity flows through internal/external links
- **Render Queue**: JavaScript-heavy sites may be indexed in two passes
- **Crawl Budget**: Limited resources per site (optimize for important pages)

### On-Site vs Off-Site SEO

**On-Site SEO** (you control):
- Technical infrastructure (speed, mobile, structure)
- Content quality and optimization
- Internal linking
- Meta tags and structured data
- User experience signals

**Off-Site SEO** (external):
- Backlinks from other domains
- Brand mentions and citations
- Social signals
- Domain authority accumulation

### Critical Metrics

| Metric | Target | Impact |
|--------|--------|--------|
| Organic Traffic | Increasing trend | Direct business value |
| Keyword Rankings | Top 3 positions | 75%+ of clicks |
| CTR from SERPs | 3-5%+ average | Indicates relevance |
| Core Web Vitals | All green | Ranking factor |
| Indexed Pages | Match site size | Crawlability health |
| Dwell Time | 2+ minutes | Engagement signal |

---

## 2. TECHNICAL SEO

### Site Architecture

**URL Structure Best Practices**:
```
✅ Good:
https://example.com/services/seo/
https://example.com/blog/on-site-seo-guide/
https://example.com/products/shoes/running/

❌ Bad:
https://example.com/page?id=123&session=xyz
https://example.com/index.php?cat=5
https://example.com////multiple-slashes
```

**Rules**:
- Use semantic, readable URLs
- Hyphens for word separation (not underscores)
- Lowercase only
- Consistent trailing slash policy
- Avoid parameters when possible

**Internal Linking Strategy**:
- **Hub & Spoke**: Pillar pages link to cluster content
- **Contextual Links**: Anchor text describes destination
- **Depth Rule**: Important pages ≤3 clicks from homepage
- **Orphan Prevention**: All pages have ≥1 internal link
- **Link Equity**: Distribute authority strategically

### Robots.txt

**Purpose**: Control crawler access and crawl budget

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Block admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /cart/
Disallow: /checkout/

# Don't block CSS/JS (Google needs them)
Allow: /assets/
Allow: /*.css$
Allow: /*.js$

# Sitemap reference
Sitemap: https://example.com/sitemap.xml

# Crawl delay (use sparingly)
Crawl-delay: 1
```

**Common Mistakes**:
- Blocking CSS/JS files (prevents proper rendering)
- Blocking entire site with `Disallow: /`
- Conflicting with meta robots tags

### Indexing Control

**Meta Robots Tags**:
```html
<!-- Index page, follow links (default) -->
<meta name="robots" content="index, follow">

<!-- Don't index, but follow links -->
<meta name="robots" content="noindex, follow">

<!-- Index but don't follow links -->
<meta name="robots" content="index, nofollow">

<!-- Block everything -->
<meta name="robots" content="noindex, nofollow">

<!-- Prevent snippet -->
<meta name="robots" content="nosnippet">

<!-- Max snippet length -->
<meta name="robots" content="max-snippet:160">
```

**Canonical URLs**:
```html
<!-- Self-referencing canonical (best practice) -->
<link rel="canonical" href="https://example.com/page/">

<!-- Cross-page canonical (duplicate content) -->
<link rel="canonical" href="https://example.com/original-page/">
```

**Rules**:
- Every page needs canonical tag
- Use absolute URLs (not relative)
- HTTPS only
- Match your preferred domain (www vs non-www)
- Avoid canonical chains (A→B→C)

**Redirects**:
- **301 Permanent**: Page moved forever (passes 90-99% link equity)
- **302 Temporary**: Page moved temporarily (no link equity)
- Avoid redirect chains (max 1 redirect)
- Never redirect to redirected URLs

### Site Speed & Core Web Vitals

**Core Web Vitals Thresholds**:
| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | <2.5s | 2.5-4.0s | >4.0s |
| FID (First Input Delay) | <100ms | 100-300ms | >300ms |
| CLS (Cumulative Layout Shift) | <0.1 | 0.1-0.25 | >0.25 |

**Optimization Techniques**:

**Images**:
```html
<!-- Modern formats -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy" width="800" height="600">
</picture>

<!-- Responsive images -->
<img
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  src="medium.jpg"
  alt="Description"
  loading="lazy"
>
```

**JavaScript/CSS**:
```html
<!-- Defer non-critical JS -->
<script src="analytics.js" defer></script>

<!-- Async independent scripts -->
<script src="ads.js" async></script>

<!-- Preload critical resources -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- Critical CSS inline, defer rest -->
<style>/* Critical CSS here */</style>
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

**Server Performance**:
- TTFB (Time to First Byte) <600ms
- Use CDN for static assets
- Enable compression (Gzip/Brotli)
- Implement caching headers
- Consider SSR/SSG for faster initial load

### Mobile-First Optimization

**Critical**: Google uses mobile version for indexing (since 2021)

```html
<!-- Viewport configuration -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

**Requirements**:
- Responsive design (single URL, adaptive CSS)
- Touch-friendly tap targets (≥48px)
- Readable text without zooming (≥16px base)
- No horizontal scrolling
- Fast mobile performance (even more critical than desktop)

### HTTPS & Security

```html
<!-- Force HTTPS -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

<!-- HSTS header (server-side) -->
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

**Requirements**:
- Valid SSL certificate
- No mixed content (HTTP resources on HTTPS pages)
- HTTPS is a ranking signal

### Structured Data (Schema.org)

**Prefer JSON-LD** (easier to manage, Google recommended):

```html
<!-- Organization -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://facebook.com/company",
    "https://twitter.com/company"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-1234",
    "contactType": "Customer Service"
  }
}
</script>

<!-- LocalBusiness -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "telephone": "+1-555-1234",
  "openingHours": "Mo-Fr 09:00-17:00"
}
</script>

<!-- Article/BlogPosting -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Article Title",
  "image": "https://example.com/image.jpg",
  "datePublished": "2024-01-15T08:00:00+00:00",
  "dateModified": "2024-01-20T10:30:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Publisher Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "description": "Article description",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/article/"
  }
}
</script>

<!-- BreadcrumbList -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Category",
      "item": "https://example.com/category/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Page",
      "item": "https://example.com/category/page/"
    }
  ]
}
</script>

<!-- FAQPage -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text here."
      }
    }
  ]
}
</script>

<!-- Product (E-commerce) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "image": "https://example.com/product.jpg",
  "description": "Product description",
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "offers": {
    "@type": "Offer",
    "price": "99.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/product/"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "127"
  }
}
</script>
```

**Validation**: Use Google Rich Results Test (search.google.com/test/rich-results)

---

## 3. CONTENT OPTIMIZATION

### Keyword Research

**Search Intent Types**:
1. **Informational**: "how to optimize SEO"
2. **Navigational**: "Google Search Console login"
3. **Transactional**: "buy running shoes online"
4. **Commercial**: "best CRM software 2024"

**Selection Criteria**:
- Search volume vs competition balance
- Intent matches content type
- Business relevance
- Long-tail opportunities (3-5+ words, lower competition)

### On-Page Elements

**Title Tags**:
```html
<!-- Optimal structure -->
<title>Primary Keyword - Secondary Keyword | Brand Name</title>

<!-- Guidelines -->
- Length: 50-60 characters (desktop), 78 (mobile)
- Primary keyword near beginning
- Unique per page
- Compelling (improves CTR)
- Brand name at end (or omit on non-homepage)
```

**Meta Descriptions**:
```html
<meta name="description" content="Compelling description that includes primary keyword, answers search intent, and includes a call-to-action. Keep it natural and engaging.">

<!-- Guidelines -->
- Length: 150-160 characters
- Include primary + secondary keywords naturally
- Call-to-action when appropriate
- Unique per page
- NOT a direct ranking factor (but impacts CTR)
```

**Heading Hierarchy**:
```html
<h1>Main Page Topic - Only ONE per page</h1>
  <h2>Major Section 1</h2>
    <h3>Subsection 1.1</h3>
    <h3>Subsection 1.2</h3>
  <h2>Major Section 2</h2>
    <h3>Subsection 2.1</h3>
      <h4>Detail 2.1.1</h4>
```

**Rules**:
- One H1 per page (main topic)
- Don't skip levels (H2 → H4 without H3)
- Include keywords naturally
- Use for structure, not styling

**Body Content**:
- **Keyword Density**: 1-2% (avoid stuffing)
- **LSI Keywords**: Related terms (Google understands context)
- **Length**: Quality > quantity, but 1500+ words often rank well
- **Readability**: Short paragraphs, clear language (Flesch score 60+)
- **E-E-A-T**: Experience, Expertise, Authoritativeness, Trustworthiness

**Image Optimization**:
```html
<img
  src="descriptive-keyword-filename.webp"
  alt="Descriptive text that includes keyword naturally"
  width="800"
  height="600"
  loading="lazy"
>

<!-- Guidelines -->
- Descriptive filenames (seo-audit-checklist.jpg not IMG_1234.jpg)
- Alt text describes image (screen readers + SEO)
- Specify dimensions (prevents CLS)
- Compress images (WebP/AVIF formats)
- Lazy load below fold
```

**Internal Linking**:
```html
<!-- Good anchor text -->
<a href="/services/technical-seo/">Learn about technical SEO audits</a>

<!-- Bad anchor text -->
<a href="/services/technical-seo/">click here</a>
```

**Rules**:
- Descriptive anchor text (not "click here")
- Link to relevant content
- Vary anchor text (not same phrase every time)
- 2-5 internal links per 1000 words

**External Links**:
```html
<!-- Link to authoritative sources -->
<a href="https://developers.google.com/search" rel="noopener">Google Search Central</a>

<!-- Paid/sponsored links -->
<a href="https://example.com" rel="sponsored">Partner Site</a>

<!-- User-generated content -->
<a href="https://example.com" rel="ugc">User Comment Link</a>

<!-- Untrusted content -->
<a href="https://example.com" rel="nofollow">Untrusted Link</a>
```

### Content Freshness

**Signals**:
- Publish date (structured data)
- Last modified date (HTTP header + schema)
- Regular content updates
- New content publishing frequency

**Strategy**:
- **Evergreen Content**: Update annually with new data
- **Timely Content**: Date in URL/title when relevant
- **Historical Optimization**: Update old posts (change dates)
- **Content Pruning**: Remove/consolidate thin/outdated pages

### Duplicate Content

**Solutions**:
```html
<!-- Canonical consolidation -->
<link rel="canonical" href="https://example.com/original/">

<!-- For parameters -->
Original: https://example.com/product/?color=red
Canonical: https://example.com/product/

<!-- For pagination -->
Page 2: <link rel="canonical" href="https://example.com/category/?page=2">
(Each page is self-canonical, not to page 1)
```

**Prevention**:
- Use canonical tags consistently
- 301 redirect moved content
- Handle URL parameters in Search Console
- Avoid session IDs in URLs
- Use hreflang for multilingual (not canonical)

---

## 4. USER EXPERIENCE & SEO

### UX Signals Impacting Rankings

| Signal | What It Measures | How to Improve |
|--------|------------------|----------------|
| Dwell Time | Time on page before returning to SERPs | Engaging content, clear layout |
| Bounce Rate | % who leave after one page | Improve relevance, internal links |
| Pages/Session | Exploration depth | Strong internal linking |
| Pogo-Sticking | Quick back-to-SERP bounces | Match search intent better |
| Return Visitors | Repeat traffic | Quality content, brand building |

### Navigation Best Practices

- **Clear hierarchy**: Main nav with 5-7 categories max
- **Mega menus**: For large sites (organize by category)
- **Breadcrumbs**: Show location (+ BreadcrumbList schema)
- **Search functionality**: For 100+ pages
- **Footer nav**: Secondary links, sitemap link
- **Custom 404s**: Helpful (search box, popular pages, contact)

### Readability & Formatting

```html
<!-- Scannable content -->
<p>Short paragraphs (2-4 sentences max).</p>

<ul>
  <li>Bullet points for lists</li>
  <li>Numbered lists for steps</li>
</ul>

<blockquote>
  Quotes for emphasis and authority
</blockquote>

<strong>Bold for important terms</strong>
<em>Italics for emphasis</em>

<!-- Tables for data -->
<table>
  <thead>
    <tr><th>Feature</th><th>Value</th></tr>
  </thead>
  <tbody>
    <tr><td>Data</td><td>Info</td></tr>
  </tbody>
</table>
```

**Typography**:
- Font size ≥16px (mobile)
- Line height 1.5-1.8
- Contrast ratio ≥4.5:1 (WCAG AA)
- Max line length ~70 characters
- Generous white space

---

## 5. INTERNATIONAL & MULTILINGUAL SEO

### Hreflang Implementation

**Purpose**: Tell Google which language/region version to show

```html
<!-- English US version -->
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/">

<!-- Spanish Spain -->
<link rel="alternate" hreflang="es-es" href="https://example.com/es-es/">

<!-- Spanish Chile -->
<link rel="alternate" hreflang="es-cl" href="https://example.com/es-cl/">

<!-- Default fallback -->
<link rel="alternate" hreflang="x-default" href="https://example.com/">

<!-- Self-referencing (required) -->
<link rel="alternate" hreflang="en-us" href="https://example.com/en-us/">
```

**Rules**:
- ISO 639-1 language codes (en, es, fr)
- ISO 3166-1 Alpha 2 region codes (US, ES, CL)
- All versions must link to each other (reciprocal)
- Include self-referencing tag
- Use x-default for global/language selector
- Can be in HTML head or XML sitemap

**Common Mistakes**:
- Missing reciprocal tags
- Incorrect language/region codes
- Mixing hreflang with canonical (use both, don't conflict)

### URL Structure Options

| Method | Example | Pros | Cons |
|--------|---------|------|------|
| ccTLD | example.fr | Strongest geo-signal | Expensive, complex management |
| Subdomain | fr.example.com | Easy to set up | Treated as separate site |
| Subdirectory | example.com/fr/ | Consolidates authority | Weaker geo-signal |
| Parameters | example.com?lang=fr | Easiest | Poor UX, weak signal |

**Recommendation**: Subdirectories for most cases (balance of SEO + management)

---

## 6. E-COMMERCE SEO

### Product Pages

```html
<!-- Title: Product Name + Key Attribute -->
<title>Nike Air Max 90 - Men's Running Shoes | Store Name</title>

<!-- Unique descriptions (never use manufacturer copy) -->
<p>Custom product description highlighting unique value...</p>

<!-- Product Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nike Air Max 90",
  "image": ["https://example.com/product1.jpg", "https://example.com/product2.jpg"],
  "description": "Product description",
  "sku": "0446310786",
  "mpn": "925807",
  "brand": {
    "@type": "Brand",
    "name": "Nike"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/product/",
    "priceCurrency": "USD",
    "price": "119.99",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "89"
  },
  "review": [{
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
    "reviewBody": "Great shoes, very comfortable!"
  }]
}
</script>
```

**Requirements**:
- High-quality images (multiple angles)
- Unique descriptions (500+ words for competitive products)
- Reviews and ratings (schema + visible)
- Clear pricing and availability
- Structured data for rich snippets
- FAQ section for common questions

### Category Pages

```html
<h1>Men's Running Shoes</h1>

<!-- Category description (200-500 words) -->
<div class="category-description">
  <p>Keyword-rich description at top or bottom of page...</p>
</div>

<!-- Products grid -->
<div class="products">
  <!-- Product listings -->
</div>
```

**Faceted Navigation** (filters/sorting):
```html
<!-- Use canonical to prevent duplicate content -->
Filtered URL: example.com/shoes/?color=red&size=10
Canonical: <link rel="canonical" href="https://example.com/shoes/">

<!-- Or allow indexing if significant search volume -->
Filtered URL: example.com/shoes/red/
(Self-canonical, unique content)
```

### E-commerce Technical Issues

**Out of Stock**:
```html
<!-- Keep page indexed, update schema -->
"offers": {
  "@type": "Offer",
  "availability": "https://schema.org/OutOfStock"
}
```

**Product Variants**:
```html
<!-- Option 1: Canonical to main product -->
example.com/shirt/blue/ → canonical → example.com/shirt/

<!-- Option 2: Separate pages if significant differences -->
example.com/shirt/blue/ (self-canonical)
```

**Pagination**:
```html
<!-- Each page is self-canonical -->
<link rel="canonical" href="https://example.com/category/?page=2">

<!-- No rel=prev/next (deprecated by Google) -->
```

---

## 7. LOCAL SEO (ON-SITE)

### NAP Consistency

**NAP = Name, Address, Phone**

```html
<!-- Must match EXACTLY across all pages -->
<footer>
  <p>Business Name</p>
  <p>123 Main Street, Suite 100</p>
  <p>City, State 12345</p>
  <p>(555) 123-4567</p>
</footer>

<!-- Schema.org -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street, Suite 100",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "telephone": "+15551234567"
}
</script>
```

### Location Pages

**Multi-location businesses**:
```
example.com/locations/new-york/
example.com/locations/chicago/
example.com/locations/los-angeles/
```

**Requirements**:
- Unique content per location (not templated)
- Local keywords (city/neighborhood names)
- Embedded Google Map
- Local testimonials
- Service area description
- Geo-coordinates in schema

---

## 8. BLOG & CONTENT MARKETING SEO

### Blog Architecture

```
example.com/blog/ (index)
example.com/blog/category/seo/
example.com/blog/category/content-marketing/
example.com/blog/author/john-smith/
example.com/blog/2024/01/article-title/
```

**Best Practices**:
- Clear category structure (noindex tag archives if thin)
- Author pages with bios (builds E-E-A-T)
- Related posts section (internal linking)
- Tag pages (sparingly, avoid thin content)

### Content Clusters

**Model**: Pillar + Cluster

```
Pillar: example.com/complete-seo-guide/ (5000+ words)
├─ Cluster: example.com/technical-seo/
├─ Cluster: example.com/on-page-seo/
├─ Cluster: example.com/link-building/
└─ Cluster: example.com/local-seo/
```

**Internal Linking**:
- Clusters link to pillar
- Pillar links to all clusters
- Clusters link to related clusters
- Use descriptive anchor text

---

## 9. ADVANCED TECHNIQUES

### JavaScript SEO

**Rendering Methods**:
1. **Client-Side Rendering (CSR)**: React/Vue default (SEO challenges)
2. **Server-Side Rendering (SSR)**: HTML generated on server (SEO friendly)
3. **Static Site Generation (SSG)**: Pre-built HTML (best for SEO)

**Google's Two-Pass Indexing**:
1. Initial HTML crawl
2. Render queue (may take hours/days)

**Testing**:
```bash
# View as Googlebot
# Google Search Console → URL Inspection → View Crawled Page

# Or fetch with user-agent
curl -A "Googlebot" https://example.com/
```

**Meta Tag Management** (SPA):
```javascript
// React Helmet example
<Helmet>
  <title>{dynamicTitle}</title>
  <meta name="description" content={dynamicDescription} />
  <link rel="canonical" href={dynamicCanonical} />
</Helmet>
```

### Video SEO

```html
<!-- Video Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Video Title",
  "description": "Video description",
  "thumbnailUrl": "https://example.com/thumbnail.jpg",
  "uploadDate": "2024-01-15T08:00:00+08:00",
  "duration": "PT1M33S",
  "contentUrl": "https://example.com/video.mp4",
  "embedUrl": "https://example.com/embed/video"
}
</script>
```

**Best Practices**:
- Provide transcript (full text on page)
- Captions/subtitles file
- Descriptive title and description
- High-quality thumbnail
- Video sitemap (optional)

### Voice Search Optimization

**Strategy**:
- Target question-based queries ("How do I...", "What is...")
- Natural language content
- FAQ schema for featured snippets
- Local SEO (many voice searches are local)
- Page speed (voice prioritizes fast sites)

---

## 10. MONITORING & ANALYSIS

### Essential Tools

**Google Search Console**:
- Performance (clicks, impressions, CTR, position)
- Index coverage (errors, warnings, valid pages)
- Mobile usability
- Core Web Vitals
- Manual actions
- Security issues

**Google Analytics 4**:
- Organic traffic sources
- Landing pages performance
- Conversion tracking
- Behavior flow
- Engagement metrics

**Third-Party**:
- **SEMrush/Ahrefs**: Keyword tracking, backlinks, competitor analysis
- **Screaming Frog**: Technical audits (crawl site like Googlebot)
- **PageSpeed Insights**: Performance metrics
- **Schema Validator**: Structured data testing

### Key Performance Indicators

| KPI | Target | Frequency |
|-----|--------|-----------|
| Organic Traffic | Month-over-month growth | Monthly |
| Keyword Rankings | Top 3 for priority keywords | Weekly |
| CTR from SERPs | 3-5% average | Monthly |
| Conversion Rate | Varies by industry | Monthly |
| Core Web Vitals | All green | Weekly |
| Indexed Pages | Match total pages | Weekly |
| Crawl Errors | Zero critical | Weekly |

---

## 11. COMMON MISTAKES

### Technical Mistakes

❌ **Blocking CSS/JS in robots.txt**
```txt
# Bad
Disallow: /*.css$
Disallow: /*.js$

# Good
Allow: /*.css$
Allow: /*.js$
```

❌ **Redirect Chains**
```
example.com/old → example.com/temp → example.com/new
# Fix: Direct redirect
example.com/old → example.com/new
```

❌ **Mixed HTTP/HTTPS**
```html
<!-- Bad: HTTP resource on HTTPS page -->
<img src="http://example.com/image.jpg">

<!-- Good -->
<img src="https://example.com/image.jpg">
```

❌ **Missing Canonical Tags**
```html
<!-- Every page needs this -->
<link rel="canonical" href="https://example.com/page/">
```

### Content Mistakes

❌ **Keyword Stuffing**
```
Bad: "SEO services, best SEO services, affordable SEO services, SEO services company"
Good: "Professional SEO services to improve your search rankings"
```

❌ **Duplicate Title Tags**
```
Bad: All pages have title "Company Name"
Good: Each page has unique, descriptive title
```

❌ **Thin Content**
```
Bad: 100-word product descriptions
Good: 500+ words with details, benefits, FAQ
```

❌ **Generic Meta Descriptions**
```
Bad: "Welcome to our website. We offer services."
Good: "Get expert SEO audits with detailed recommendations. Improve rankings in 30 days. Free consultation."
```

### UX Mistakes

❌ **Intrusive Interstitials**
- Full-screen popups on mobile (Google penalty)
- Fix: Use banners or delayed popups

❌ **Poor Mobile Experience**
- Small text, horizontal scrolling
- Fix: Responsive design, mobile testing

❌ **Slow Page Speed**
- 5+ second load times
- Fix: Image optimization, caching, CDN

---

## 12. SEO CHECKLIST

### Pre-Launch Checklist

Technical:
- [ ] Robots.txt configured (allows important pages)
- [ ] XML sitemap generated and submitted
- [ ] All pages have unique title tags (50-60 chars)
- [ ] All pages have unique meta descriptions (150-160 chars)
- [ ] Canonical URLs set correctly on every page
- [ ] Trailing slash policy consistent
- [ ] HTTPS enabled (valid SSL certificate)
- [ ] No mixed HTTP/HTTPS content
- [ ] 301 redirects for moved pages
- [ ] Custom 404 error page
- [ ] Favicon configured

Performance:
- [ ] Core Web Vitals in green zone (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Images optimized (WebP/AVIF, lazy loading)
- [ ] JavaScript/CSS minified and compressed
- [ ] CDN configured for static assets
- [ ] Caching headers implemented

Content:
- [ ] H1 on every page (one per page)
- [ ] Logical heading hierarchy (H1→H2→H3)
- [ ] Alt text on all images
- [ ] Internal links with descriptive anchors
- [ ] No broken links (404s)

Mobile:
- [ ] Mobile-responsive design verified
- [ ] Viewport meta tag configured
- [ ] Touch-friendly elements (≥48px)
- [ ] Readable text (≥16px)
- [ ] Mobile page speed optimized

Structured Data:
- [ ] Organization schema on homepage
- [ ] BreadcrumbList on all pages
- [ ] Product schema (if e-commerce)
- [ ] Article/BlogPosting schema (if blog)
- [ ] LocalBusiness schema (if local)
- [ ] All schema validated (no errors)

Analytics:
- [ ] Google Search Console verified
- [ ] Google Analytics installed
- [ ] Conversion tracking configured
- [ ] Search Console sitemap submitted

### Ongoing Optimization

Monthly:
- [ ] Review organic traffic trends
- [ ] Check keyword ranking changes
- [ ] Monitor Core Web Vitals
- [ ] Review Search Console errors
- [ ] Publish new content (2-4+ posts)
- [ ] Update old content (1-2 posts)

Quarterly:
- [ ] Full technical audit (Screaming Frog)
- [ ] Broken link check
- [ ] Competitor analysis
- [ ] Content gap analysis
- [ ] Backlink profile review

---

## 13. ALGORITHM UPDATES

### Major Google Updates (Historical)

| Year | Update | Focus |
|------|--------|-------|
| 2011 | Panda | Content quality (thin content penalty) |
| 2012 | Penguin | Link spam (unnatural backlinks) |
| 2013 | Hummingbird | Semantic search (meaning vs keywords) |
| 2015 | Mobile-Friendly | Mobile usability (ranking factor) |
| 2015 | RankBrain | Machine learning (query interpretation) |
| 2018 | Medic | E-A-T for YMYL sites (health, finance) |
| 2019 | BERT | Natural language processing (context) |
| 2021 | Page Experience | Core Web Vitals (UX ranking factor) |
| 2022 | Helpful Content | Reward people-first content |
| 2023 | Core Updates | Multiple ranking factors (ongoing) |

### Staying Current

**Official Sources**:
- Google Search Central Blog: developers.google.com/search/blog
- @searchliaison on Twitter
- Google Search Central YouTube

**Industry News**:
- Search Engine Journal
- Search Engine Land
- Moz Blog
- Ahrefs Blog

---

## 14. QUICK REFERENCE

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>Primary Keyword - Secondary Keyword | Brand</title>
  <meta name="description" content="Compelling 150-160 character description with keywords and CTA.">
  <link rel="canonical" href="https://example.com/page/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com/page/">
  <meta property="og:title" content="Title for social sharing">
  <meta property="og:description" content="Description for social sharing">
  <meta property="og:image" content="https://example.com/image.jpg">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://example.com/page/">
  <meta name="twitter:title" content="Title for Twitter">
  <meta name="twitter:description" content="Description for Twitter">
  <meta name="twitter:image" content="https://example.com/image.jpg">

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png">

  <!-- CSS -->
  <link rel="stylesheet" href="/styles.css">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Name",
    "description": "Page description",
    "url": "https://example.com/page/"
  }
  </script>
</head>
<body>
  <!-- Content here -->
</body>
</html>
```

### robots.txt Template

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /cart/
Disallow: /checkout/
Disallow: /search?
Allow: /*.css$
Allow: /*.js$

Sitemap: https://example.com/sitemap.xml
```

### .htaccess (Apache)

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [L,R=301]

# Force www (or non-www)
RewriteCond %{HTTP_HOST} !^www\.
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [L,R=301]

# Trailing slash redirect
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1/ [L,R=301]
```

---

## 15. E-E-A-T PRINCIPLES

**Experience, Expertise, Authoritativeness, Trustworthiness**

**Critical for YMYL** (Your Money Your Life) sites:
- Health, medical, safety
- Financial advice
- Legal information
- News and current events

**How to Demonstrate E-E-A-T**:

**Experience**:
- First-hand product reviews
- Case studies with results
- Behind-the-scenes content
- User testimonials

**Expertise**:
- Author bios with credentials
- Citations and references
- Detailed, accurate content
- Industry certifications

**Authoritativeness**:
- Backlinks from reputable sites
- Brand mentions
- Awards and recognition
- Guest posts on authority sites

**Trustworthiness**:
- HTTPS security
- Privacy policy and terms
- Contact information visible
- Customer reviews
- Transparent business practices
- About page with company info

---

## FINAL NOTES

This knowledge base covers universal on-site SEO principles applicable to any technology stack. When implementing:

1. **Prioritize Technical Foundation**: Speed, mobile, indexing
2. **Create Quality Content**: Match search intent, answer questions
3. **Implement Structured Data**: Help search engines understand
4. **Monitor and Iterate**: SEO is ongoing, not one-time
5. **Stay Updated**: Algorithm changes require adaptation

**Remember**: SEO is a long-term strategy. Results typically appear in 3-6 months, with full impact at 6-12 months. Focus on sustainable, white-hat practices that provide genuine value to users.
