# Google Search Console Re-Indexing Guide
**Step-by-step instructions to request re-indexing after SEO fixes**

---

## 🎯 Goal

Tell Google to re-crawl your fixed pages so they can be indexed properly. This will:
- Clear redirect errors from Google Search Console
- Start improving your indexation rate (26% → 50%+ over 2-4 weeks)
- Make your pages eligible for search results

---

## 📋 **Step-by-Step Instructions**

### Step 1: Open Google Search Console

1. **Go to:** https://search.google.com/search-console
2. **Sign in** with your Google account
3. **Select property:** `pixory.cl` (or `sc-domain:pixory.cl`)
   - Click the property dropdown in the top-left corner
   - Select the pixory.cl property

**Screenshot reference:**
```
┌─────────────────────────────────────┐
│  [pixory.cl ▼]     [Search Console]│
│                                     │
│  ┌─ Overview                        │
│  ├─ Performance                     │
│  ├─ URL Inspection  ← We'll use this│
│  ├─ Coverage/Indexing               │
│  └─ ...                             │
└─────────────────────────────────────┘
```

---

### Step 2: Use the URL Inspection Tool

1. **Find the search bar at the top** of Google Search Console
   - It says: "Inspect any URL from pixory.cl"

2. **Enter the first URL** to test:
   ```
   https://pixory.cl/
   ```

3. **Press Enter** or click the magnifying glass icon

4. **Wait 5-10 seconds** for Google to fetch data

---

### Step 3: Test Live URL

After Google shows the current status, you'll see one of these:

#### If it says "URL is on Google" (Green):
1. Click **"Test live URL"** button (top right)
2. Wait 30-60 seconds for Google to crawl
3. Look for: "Live URL is indexable" ✅

#### If it says "URL is not on Google" or "Page with redirect" (Red/Yellow):
1. Click **"Test live URL"** button
2. Wait for crawl to complete
3. Check results

---

### Step 4: Request Indexing

1. After the live test completes, click **"Request indexing"** button
   - It's usually at the bottom right of the screen

2. Google will show a confirmation dialog:
   ```
   ┌──────────────────────────────────────┐
   │  Request Indexing?                   │
   │                                      │
   │  We'll crawl this URL and update     │
   │  it in Google's index if it passes   │
   │  quality checks.                     │
   │                                      │
   │  [Cancel]  [Request Indexing]        │
   └──────────────────────────────────────┘
   ```

3. Click **"Request Indexing"**

4. **Wait 1-2 minutes** for the request to process

5. You'll see: "Indexing requested" ✅

---

### Step 5: Repeat for All Important URLs

**⚠️ Important:** Google rate-limits indexing requests. You can only request ~10-20 per day.

**Wait 2-3 minutes between each request** to avoid getting rate-limited.

---

## 📝 **Priority URL List (Request in This Order)**

Copy and paste these URLs one by one into the URL Inspection tool:

### **Priority 1: Homepage & Main Pages (Do Today)**

```
https://pixory.cl/
https://pixory.cl/contacto/
https://pixory.cl/servicios/
```

**After each URL:**
1. Paste into URL Inspection
2. Click "Test live URL"
3. Wait for test to complete
4. Click "Request Indexing"
5. Wait 2 minutes before next URL

---

### **Priority 2: Service Pages (Do Today)**

```
https://pixory.cl/servicios/seo/
https://pixory.cl/servicios/google-ads/
https://pixory.cl/servicios/inteligencia-artificial/
https://pixory.cl/servicios/data-analytics/
```

**Total: 4 URLs** - Should take ~10 minutes with 2-min gaps

---

### **Priority 3: Blog Posts with Redirect Issues (Do Tomorrow)**

These were mentioned in your SEO report as having redirect problems:

```
https://pixory.cl/blogs/estrategia-go-to-market/
https://pixory.cl/blogs/cloudflare-bloquea-ia/
https://pixory.cl/blogs/marketing-para-emprendedores/
https://pixory.cl/blogs/como-implementar-agentes-ia/
```

**Total: 4 URLs** - Spread over day 2

---

### **Priority 4: All Other Blog Posts (Do Over Next Week)**

```
https://pixory.cl/blog/
https://pixory.cl/blogs/core-update-google/
https://pixory.cl/blogs/costos-inteligencia-artificial/
https://pixory.cl/blogs/google-core-update-impacto-trafico-2025/
https://pixory.cl/blogs/odoo-inteligencia-artificial/
https://pixory.cl/blogs/que-son-los-embeddings/
```

**Total: 6 URLs** - Do 2-3 per day over next 3 days

---

## ⏰ **Recommended Schedule**

### **Day 1 (Today) - 15 minutes:**
- ✅ Homepage (1 URL)
- ✅ Contacto + Servicios (2 URLs)
- ✅ All 4 service pages (4 URLs)
- **Total: 7 URLs**

### **Day 2 (Tomorrow) - 10 minutes:**
- ✅ 4 blog posts with redirect issues
- **Total: 4 URLs**

### **Day 3-5 (Rest of week) - 5 min/day:**
- ✅ 2-3 remaining blog posts per day
- **Total: 6 URLs**

---

## 🚨 **Common Issues & Solutions**

### Issue 1: "You've reached the daily quota"

**What it means:** Google limits indexing requests per day (usually 10-20)

**Solution:**
- Stop for today
- Continue tomorrow
- Prioritize most important pages first

---

### Issue 2: "URL is already indexed"

**What it means:** Google already has this page in the index

**What to do:**
- Still click "Test live URL"
- Still request re-indexing
- This tells Google to refresh the cached version

---

### Issue 3: "Page with redirect"

**What it means:** Google found a redirect chain (this is what we fixed!)

**What to do:**
- Click "Test live URL" anyway
- If it now shows "Live URL is indexable" ✅, request indexing
- This confirms our fix worked!

---

### Issue 4: "Crawled - currently not indexed"

**What it means:** Google crawled but chose not to index (content quality issue)

**What to do:**
- Note which pages show this
- These are the 8 pages for Phase 2 (content improvements)
- Request indexing anyway - sometimes Google reconsiders

---

### Issue 5: "Server error (5xx)" or "Soft 404"

**What it means:** Page might have an issue

**What to do:**
- Test the URL directly in your browser: `https://pixory.cl/[page]/`
- If it loads fine, request indexing anyway
- If it shows 404, let me know which page

---

## 📊 **What Happens After Requesting Indexing**

### Immediate (Minutes after request):
- Google adds your URL to the crawl queue
- Status shows: "Indexing requested"

### Short-term (1-3 days):
- Google re-crawls the page
- Validates there are no errors
- Updates the index

### Mid-term (1-2 weeks):
- Pages start appearing in search results
- Coverage report shows improvements
- "Not indexed" count decreases

### Long-term (2-4 weeks):
- Indexation rate improves: 26% → 50%+
- Organic impressions increase
- You start seeing traffic from fixed pages

---

## ✅ **Verification Checklist**

After requesting indexing, verify your progress:

### **Day 1 (After requests):**
- [ ] Requested indexing for homepage
- [ ] Requested indexing for 4 service pages
- [ ] Noted any errors or issues
- [ ] Recorded how many requests succeeded

### **Week 1 (Check daily):**
- [ ] Check GSC Coverage report
- [ ] Look for "Indexing requested" status changes
- [ ] Note any pages that move from "Not indexed" → "Valid"

### **Week 2 (Check 2x):**
- [ ] Count total indexed pages (should increase from 11)
- [ ] Check if redirect errors decreased
- [ ] Monitor "Crawled - currently not indexed" count

### **Week 4 (Full review):**
- [ ] Calculate new indexation rate (target: 40-50%)
- [ ] Review organic impressions trend
- [ ] Identify which pages improved most

---

## 🔍 **How to Monitor Progress in GSC**

### **Check Coverage/Indexing Report:**

1. **Navigate:**
   ```
   Google Search Console → Indexing → Pages
   ```
   (Or "Coverage" in older GSC UI)

2. **Look at the graph:**
   - **Green line** = Valid (indexed) pages
   - **Red/Yellow areas** = Not indexed pages

3. **Goal:** Watch green line go UP over 2-4 weeks

---

### **Check Specific Issues:**

1. **Click on issue types** to see affected URLs:
   - "Page with redirect" ← Should decrease
   - "Crawled - currently not indexed" ← Track these
   - "Not found (404)" ← Should be ZERO after our fixes

2. **Export the "Crawled - currently not indexed" list:**
   - Click the issue
   - Click "Export" button
   - Save the CSV
   - **This is your Phase 2 content improvement list**

---

## 📈 **Expected Results Timeline**

| Time | What to Expect | What to Check |
|------|----------------|---------------|
| **Day 1-3** | Indexing requests processed | GSC shows "Indexing requested" status |
| **Week 1** | Google re-crawls pages | Coverage report shows validation activity |
| **Week 2** | First pages get indexed | Indexed count: 11 → 15-18 |
| **Week 3** | More pages indexed | Indexed count: 18 → 20-23 |
| **Week 4** | Indexation stabilizes | Indexation rate: 26% → 40-50% |
| **Week 6-8** | Full impact visible | Impressions 2-5x, clicks 3-10x |

---

## 🎯 **Success Metrics**

### **Short-term Success (Week 2):**
- ✅ All requested URLs show "Indexing requested" or "Indexed"
- ✅ "Page with redirect" errors decrease by 50%+
- ✅ At least 3-5 new pages indexed

### **Mid-term Success (Week 4):**
- ✅ 18-21 pages indexed (from 11)
- ✅ Indexation rate: 40-50% (from 26%)
- ✅ Redirect errors mostly cleared
- ✅ 404 errors: ZERO

### **Long-term Success (Week 8):**
- ✅ 25-30 pages indexed (60-70%)
- ✅ Organic impressions: 2,000-4,000+ (from 1,083)
- ✅ Organic clicks: 15-30+ (from 8)
- ✅ Average position improving

---

## 📞 **Need Help?**

**If you encounter issues:**
1. Take a screenshot of the GSC error message
2. Note which URL is causing the issue
3. Let me know and I can help troubleshoot

**Common questions:**
- "How long should I wait between requests?" → **2-3 minutes**
- "What if quota runs out?" → **Continue tomorrow, prioritize important pages**
- "Should I request pages already indexed?" → **Yes, to refresh Google's cache**
- "What about the crawled-not-indexed pages?" → **Request indexing anyway, we'll improve content in Phase 2**

---

## 🎉 **You're Ready!**

**Start here:**
1. Open: https://search.google.com/search-console
2. Copy first URL: `https://pixory.cl/`
3. Paste into URL Inspection tool
4. Test → Request indexing
5. Wait 2 minutes
6. Repeat with next URL

**This is the single most impactful action for your SEO right now!** 🚀

---

**Estimated time:** 30-40 minutes total (spread over 3-5 days)
**Expected ROI:** 2-5x increase in organic visibility within 4-8 weeks
