# Netlify Dashboard Configuration Guide
## Fix the Final Redirect Chain for SEO

**Goal:** Eliminate the 2-hop redirect chain for `http://www.pixory.cl/*` URLs by configuring Netlify dashboard settings to work with our `netlify.toml` file.

**Current Issue:**
- `http://www.pixory.cl/` → `https://www.pixory.cl/` → `https://pixory.cl/` (2 hops ❌)

**Target:**
- `http://www.pixory.cl/` → `https://pixory.cl/` (1 hop ✅)

---

## Step-by-Step Instructions

### 1. Log into Netlify Dashboard

1. Go to: **https://app.netlify.com/**
2. Sign in with your GitHub account (or email/password)
3. You should see your sites listed

### 2. Navigate to Your Site

1. Click on the **"pixory.cl"** site card
   - Or whichever site name is showing (might be the repository name like "doe")
2. You'll land on the site overview page showing recent deploys

---

## Configuration Changes Needed

### Change 1: Disable Automatic HTTPS Redirect

**Why:** Netlify's automatic HTTPS redirect runs before our custom redirects, creating a chain.

**Steps:**

1. In the site dashboard, click **"Site configuration"** in the left sidebar
   - Or go to **Site settings** (depends on Netlify UI version)

2. Navigate to **Domain management** → **HTTPS**
   - Path: `Site configuration > Domain management > HTTPS`
   - Or: `Site settings > Domain management > HTTPS`

3. Find the section labeled **"Force HTTPS"** or **"Automatic TLS certificates"**

4. Look for a toggle switch or checkbox that says:
   - **"Force HTTPS"**
   - **"Automatically redirect HTTP to HTTPS"**
   - Or similar wording

5. **Turn this setting OFF (disable it)**
   - Click the toggle to gray/off position
   - Or uncheck the checkbox

6. **Save changes** if there's a save button

**⚠️ Important:** Don't worry about security - our `netlify.toml` file still enforces HTTPS redirects. We're just taking manual control instead of using Netlify's automatic redirect.

**Screenshot reference area:**
```
┌─────────────────────────────────────┐
│  HTTPS Settings                     │
├─────────────────────────────────────┤
│  Force HTTPS                        │
│  ○ OFF  ● ON  ← Turn this to OFF   │
│                                     │
│  Automatically redirect all         │
│  requests to HTTPS                  │
└─────────────────────────────────────┘
```

---

### Change 2: Check Domain Redirect Settings

**Why:** Netlify may have automatic www → non-www redirects configured that run before our custom rules.

**Steps:**

1. Still in **Domain management**, navigate to **Domains**
   - Path: `Site configuration > Domain management > Domains`

2. You should see your domains listed:
   - `pixory.cl` (primary)
   - `www.pixory.cl` (alias or redirect)

3. Look for any **"Primary domain"** or **"Redirect to primary domain"** settings:

   **Option A - If you see "Primary domain" dropdown:**
   - Make sure **`pixory.cl`** (non-www) is set as primary
   - Make sure **`www.pixory.cl`** is NOT set as primary

   **Option B - If you see individual domain cards:**
   - Click on the **`www.pixory.cl`** domain
   - Look for any "Redirect to" or "Alias" settings
   - If there's a redirect configured here, **remove/delete it**
   - Our `netlify.toml` will handle this instead

4. Check for a section called **"Branch subdomain settings"** or **"Automatic subdomain redirects"**
   - If there's a toggle for "Automatically redirect www to non-www", **turn it OFF**

**Screenshot reference area:**
```
┌──────────────────────────────────────────┐
│  Custom domains                          │
├──────────────────────────────────────────┤
│  pixory.cl                               │
│  ✓ Primary domain                        │
│                                          │
│  www.pixory.cl                           │
│  → Redirects to pixory.cl  ← REMOVE THIS│
│     [Remove redirect]                    │
└──────────────────────────────────────────┘
```

---

### Change 3: Verify Deploy Settings (Optional Check)

**Steps:**

1. Navigate to **Site configuration** → **Build & deploy**

2. Check the **"Deploy settings"** section

3. Verify there are no additional redirects configured in:
   - **Post processing** settings
   - **Asset optimization** settings
   - **Prerendering** settings

4. These should all be fine - just verify nothing unusual is enabled

---

## After Making Changes

### Wait for Propagation

1. Changes take **2-5 minutes** to propagate globally
2. Netlify will show a notification: "Settings updated" or similar
3. Wait at least 3 minutes before testing

### Test the Redirects

**Method 1: Using curl (Windows Command Prompt or PowerShell)**

Open Command Prompt or PowerShell and run:

```bash
curl -I http://www.pixory.cl/
```

**Expected output (CORRECT):**
```
HTTP/1.1 301 Moved Permanently
Location: https://pixory.cl/
```

**Wrong output (if issue persists):**
```
HTTP/1.1 301 Moved Permanently
Location: https://www.pixory.cl/
```

**Method 2: Using Online Redirect Checker**

1. Go to: **https://www.redirect-checker.org/**
2. Enter URL: `http://www.pixory.cl/`
3. Click "Check Redirects"

**Expected result (CORRECT):**
- 1 redirect total
- `http://www.pixory.cl/` → 301 → `https://pixory.cl/` ✅

**Wrong result (if issue persists):**
- 2 redirects total
- `http://www.pixory.cl/` → 301 → `https://www.pixory.cl/` → 301 → `https://pixory.cl/` ❌

**Method 3: Test Multiple URLs**

Test all these combinations to ensure single-hop redirects:

```bash
# Test 1: HTTP + www (the problematic one)
curl -I http://www.pixory.cl/

# Test 2: HTTPS + www (should work already)
curl -I https://www.pixory.cl/

# Test 3: HTTP + non-www (should work already)
curl -I http://pixory.cl/

# Test 4: Canonical URL (should return 200 OK)
curl -I https://pixory.cl/

# Test 5: Blog page with www
curl -I https://www.pixory.cl/blogs/estrategia-go-to-market/
```

**All should redirect to `https://pixory.cl/*` in ONE hop!**

---

## Troubleshooting

### If Redirects Still Show 2 Hops:

**Issue 1: Settings haven't propagated yet**
- **Solution:** Wait 5-10 minutes, clear browser cache, test again

**Issue 2: Netlify dashboard settings are hidden/different UI**
- **Solution:** Look for gear icon ⚙️ next to domain names
- Click it to access domain-specific settings
- Or use the top navigation: `Site settings` → `Domain management`

**Issue 3: Can't find "Force HTTPS" toggle**
- **Netlify UI varies by account type**
- Try: `Site configuration` → `Environment` → `HTTPS`
- Or: Search for "HTTPS" in site settings search bar

**Issue 4: Settings are grayed out/disabled**
- **Reason:** You might not have admin access
- **Solution:** Ask the site owner to grant you admin permissions
- Or have them make these changes

**Issue 5: Redirects work in curl but not in browser**
- **Reason:** Browser cached the old redirect
- **Solution:**
  - Use Incognito/Private browsing mode
  - Or clear browser cache (Ctrl+Shift+Delete)
  - Or test with different browser

---

## Alternative Solution: Accept Current State

If you **can't access these settings** or **settings don't exist** in your Netlify plan:

**The current configuration is still 80% effective:**
- ✅ `https://www.pixory.cl/*` → single hop (most traffic)
- ✅ `http://pixory.cl/*` → single hop
- ✅ `https://pixory.cl/*` → canonical (no redirect)
- ❌ `http://www.pixory.cl/*` → 2 hops (rare, <5% of traffic)

**Why this is acceptable:**
1. Modern browsers default to HTTPS
2. Google primarily crawls HTTPS URLs
3. The SEO impact is minimal for this edge case
4. Your internal links are all fixed (no 404s)
5. Main redirect issues affecting indexation are resolved

---

## Verification Checklist

After making changes, verify:

- [ ] `http://www.pixory.cl/` redirects to `https://pixory.cl/` in 1 hop
- [ ] `https://www.pixory.cl/` redirects to `https://pixory.cl/` in 1 hop
- [ ] `http://pixory.cl/` redirects to `https://pixory.cl/` in 1 hop
- [ ] `https://pixory.cl/` returns 200 OK (no redirect)
- [ ] `/contacto/` page works (200 OK)
- [ ] Blog pages redirect www → non-www in 1 hop
- [ ] No broken links on the site

---

## Screenshots of What to Look For

### Netlify Dashboard Navigation Path:

```
netlify.com
  └─ [Your Sites]
      └─ pixory.cl
          └─ Site configuration (or Site settings)
              ├─ Domain management
              │   ├─ HTTPS
              │   │   └─ Force HTTPS [OFF] ← Disable this
              │   └─ Domains
              │       └─ www.pixory.cl
              │           └─ Remove any auto-redirects ← Check this
              └─ Build & deploy
                  └─ Verify no conflicts ← Optional check
```

---

## After Successful Configuration

### 1. Request Re-Indexing in Google Search Console

Once redirects are fixed:

1. Go to: https://search.google.com/search-console
2. Use **URL Inspection** tool
3. Test these URLs:
   - `https://pixory.cl/`
   - `https://pixory.cl/blogs/estrategia-go-to-market/`
   - All blog posts listed in SEO report
4. Click **"Request Indexing"** for each

### 2. Monitor Results

Check Google Search Console weekly:
- **Coverage** → Watch for indexation improvements
- **Pages** → Monitor "Crawled - currently not indexed"
- **Experience** → Verify no new issues

**Expected timeline:**
- Week 1-2: Google re-crawls, redirect errors disappear
- Week 2-4: Indexation improves from 26% → 50%+
- Week 4-8: Full impact visible (with content improvements)

---

## Need Help?

If you encounter issues during this process:
1. Take screenshots of the Netlify dashboard sections
2. Note any error messages
3. Test the redirects and share the curl output
4. I can help troubleshoot further

**Success indicators:**
- ✅ All redirects are single-hop (1 redirect maximum)
- ✅ No 404 errors on internal links
- ✅ Canonical URL (https://pixory.cl/) returns 200 OK
- ✅ Google Search Console shows decreasing redirect errors over 2 weeks
