# Quick Reference: Fix Netlify Redirect Chains

## 🎯 Goal
Change `http://www.pixory.cl/` from **2-hop redirect** to **1-hop redirect**

---

## ⚡ Quick Steps (5 minutes)

### 1. Open Netlify Dashboard
→ https://app.netlify.com/ → Login → Click "pixory.cl" site

### 2. Disable Force HTTPS
```
Site configuration → Domain management → HTTPS
Find: "Force HTTPS" toggle
Action: Turn OFF ❌
```

### 3. Remove Auto WWW Redirect
```
Site configuration → Domain management → Domains
Find: www.pixory.cl domain
Action: Remove any "Redirect to pixory.cl" setting
```

### 4. Wait & Test (3 minutes)
```bash
# Wait 3 minutes, then test:
curl -I http://www.pixory.cl/

# Expected:
# HTTP/1.1 301 Moved Permanently
# Location: https://pixory.cl/   ← ONE redirect only!
```

---

## ✅ Success Criteria

All these should be **single-hop redirects**:

| URL | Should Redirect To | Status |
|-----|-------------------|--------|
| `http://www.pixory.cl/` | `https://pixory.cl/` | 1 hop ✅ |
| `https://www.pixory.cl/` | `https://pixory.cl/` | 1 hop ✅ |
| `http://pixory.cl/` | `https://pixory.cl/` | 1 hop ✅ |
| `https://pixory.cl/` | *(stays same)* | 200 OK ✅ |

---

## 🔍 Testing Commands

```bash
# Test 1: The problematic one
curl -I http://www.pixory.cl/

# Test 2: Should already work
curl -I https://www.pixory.cl/

# Test 3: Should already work
curl -I http://pixory.cl/

# Test 4: Canonical (no redirect)
curl -I https://pixory.cl/
```

**Or use online tool:**
- https://www.redirect-checker.org/
- Enter: `http://www.pixory.cl/`
- Should show: **1 redirect total**

---

## 📍 Where to Find Settings in Netlify

### Option A: New Netlify UI (2024+)
```
pixory.cl site → Site configuration → Domain management
```

### Option B: Classic Netlify UI
```
pixory.cl site → Site settings → Domain management
```

### Visual Path:
```
🏠 Sites
  └─ 📁 pixory.cl
      └─ ⚙️ Site configuration (or Site settings)
          └─ 🌐 Domain management
              ├─ 🔒 HTTPS
              │   └─ Force HTTPS: [Turn OFF]
              └─ 🌍 Domains
                  └─ www.pixory.cl: [Remove auto-redirect]
```

---

## ❓ Can't Find the Settings?

**Try these locations:**

1. **Force HTTPS** might be in:
   - `Domain management` → `HTTPS`
   - `Environment` → `HTTPS`
   - `Security` → `HTTPS`

2. **WWW redirect** might be in:
   - Click gear icon ⚙️ next to `www.pixory.cl` domain
   - `Custom domains` section
   - `Primary domain` dropdown

3. **Search feature:**
   - Use Netlify's search bar (top right)
   - Type: "HTTPS" or "redirect"

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Settings grayed out | Need admin access - ask site owner |
| Can't find "Force HTTPS" | Search for "HTTPS" or check Environment settings |
| Still 2 hops after 10 min | Clear browser cache, test in incognito |
| Netlify UI looks different | Try both paths: "Site configuration" and "Site settings" |

---

## 📊 What Happens After Fix

**Immediate (1-2 weeks):**
- Google re-crawls your site
- Redirect errors disappear from Google Search Console
- Crawl budget improves

**Short-term (2-4 weeks):**
- Indexation improves: 26% → 50%+
- More pages appear in search results

**Mid-term (4-8 weeks):**
- Organic impressions: 1,083 → 3,000+
- Organic clicks: 8 → 20-40+

---

## 📝 After Netlify Changes

1. **Request re-indexing in Google Search Console:**
   - URL Inspection tool
   - Test each blog post URL
   - Click "Request Indexing"

2. **Monitor weekly:**
   - Check GSC Coverage report
   - Watch indexation rate improve

---

**Full detailed guide:** See `NETLIFY_REDIRECT_FIX.md`
**Questions?** Let me know if you get stuck at any step!
