# Modern Life - Troubleshooting Guide

## Common Issues & Quick Fixes

---

## 🔴 ERROR: "Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')"

### Problem
Environment variables are not being loaded properly.

### Solution

**Step 1: Create .env.local file**
```bash
cp .env.example .env.local
```

**Step 2: Verify the file exists**
```bash
ls -la .env.local
```

**Step 3: Restart the dev server**
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

**Step 4: Check if it's working**
- You should see a green banner if configured
- Or an orange banner with setup instructions if not configured
- The app should load without errors

### Why This Happens
- Vite only loads `.env.local` files on server start
- Changes to `.env.local` require a restart
- The file must be in the project root directory

---

## 🟡 WARNING: "Supabase environment variables not configured"

### This is NORMAL for first-time setup!

The app is running in **demo mode**, which means:
- ✅ The landing page works perfectly
- ✅ You can test the UI/UX
- ✅ Signup form works (data saved to console only)
- ❌ Data is NOT saved to database
- ❌ Emails are NOT sent

### To Fix (Connect to Real Database)

1. **Create Supabase Account**
   - Go to: https://supabase.com/dashboard
   - Click "New Project"
   - Name: `modern-life-production`
   - Wait 2 minutes for provisioning

2. **Get Your Credentials**
   - Project Settings → API
   - Copy `Project URL`
   - Copy `anon public` key

3. **Add to .env.local**
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...your-key...
   ```

4. **Restart Dev Server**
   ```bash
   npm run dev
   ```

5. **Create Database Tables**
   - In Supabase: SQL Editor → New Query
   - Copy all contents from `backend/schema.sql`
   - Click "Run"

---

## 📧 Email Service Not Working

### Symptoms
- Signups work but no emails sent
- No subscribers in ConvertKit

### Solution

1. **Create ConvertKit Account**
   - Go to: https://app.convertkit.com/users/signup
   - Free account is fine to start

2. **Create a Form**
   - Grow → Forms
   - Create new inline form
   - Name: "Modern Life Waitlist"
   - Note the Form ID from URL

3. **Get API Keys**
   - Profile → Account Settings
   - Advanced → API & Webhooks
   - Copy API Key and Secret

4. **Add to .env.local**
   ```env
   CONVERTKIT_API_KEY=your-api-key
   CONVERTKIT_FORM_ID=1234567
   CONVERTKIT_SECRET_KEY=your-secret
   ```

5. **Add to Vercel (for production)**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Add all three variables
   - Redeploy

---

## 🌐 Domain Issues

### "Domain not working" / "Site not loading"

**Issue 1: DNS Not Propagated**
- **Wait:** DNS changes take 10 mins - 48 hours (usually 1 hour)
- **Check:** https://dnschecker.org/#A/modernlife-ai.app
- **Try:** Incognito mode (clears cache)

**Issue 2: Wrong DNS Records**
- **Verify:** Nameservers OR A/CNAME records are correct
- **Vercel:** Shows exact records needed in dashboard
- **Update:** At your domain registrar (where you bought the domain)

**Issue 3: SSL Certificate**
- **Vercel auto-generates:** Wait 10 minutes after DNS propagates
- **Force refresh:** Vercel → Domains → Force SSL certificate

---

## 🏗️ Build Errors on Vercel

### "Build failed" / "Module not found"

**Fix 1: Clear Cache**
```bash
# In Vercel dashboard
Deployments → ... → Redeploy → Clear cache and redeploy
```

**Fix 2: Check Environment Variables**
- All VITE_* variables must be in Vercel
- Select all 3 environments (Production, Preview, Development)
- Redeploy after adding variables

**Fix 3: Verify package.json**
```bash
# Test build locally first
npm run build
```

---

## 🗄️ Database Issues

### "Can't connect to Supabase"

**Check 1: Project Not Paused**
- Supabase free tier pauses after 7 days inactivity
- Go to dashboard and unpause

**Check 2: Correct Region**
- URL should match your project
- Copy exact URL from Supabase dashboard

**Check 3: Using Correct Key**
- Frontend: Use `anon` key (safe to expose)
- Backend: Use `service_role` key (never expose)

### "RLS policy violation"

**Fix:** Check Row Level Security policies
```sql
-- In Supabase SQL Editor, verify:
SELECT * FROM waitlist; -- Should work as anon user

-- If not, check policies:
SELECT * FROM pg_policies WHERE tablename = 'waitlist';
```

---

## 💻 Development Environment

### "npm install" failing

**Fix 1: Update Node.js**
```bash
node --version  # Should be v18+
```

**Fix 2: Clear npm cache**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### "Port already in use"

**Fix: Kill the process**
```bash
# On Mac/Linux
lsof -ti:5173 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID [process_id] /F
```

---

## 📱 Mobile Issues

### "Layout broken on mobile"

**Check 1: Viewport meta tag**
- Should be in index.html automatically

**Check 2: Test with real device**
- Chrome DevTools mobile emulation is not perfect
- Test on actual phone

**Check 3: Clear mobile cache**
- Settings → Clear cache
- Hard refresh

---

## 🔐 Security Warnings

### ".env.local committed to git"

**DANGER! Remove immediately:**
```bash
# Remove from git history
git rm --cached .env.local
git commit -m "Remove .env.local from git"

# Verify it's in .gitignore
cat .gitignore | grep .env.local

# Rotate all API keys immediately
# - Generate new Supabase keys
# - Generate new ConvertKit keys
# - Update in .env.local and Vercel
```

---

## 🚀 Performance Issues

### "Site loading slowly"

**Check 1: Lighthouse Score**
```bash
# In Chrome DevTools
F12 → Lighthouse → Run analysis
```

**Fix 1: Optimize images**
- Use WebP format
- Compress images
- Lazy load offscreen images

**Fix 2: Check Vercel Analytics**
- Vercel Dashboard → Analytics
- Look for slow API calls
- Check Web Vitals

---

## 📊 Analytics Not Tracking

### Google Analytics not working

**Check 1: Measurement ID**
```bash
# Should be in .env.local
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Check 2: Script loaded**
- F12 → Network → Filter: gtag
- Should see gtag.js loading

**Check 3: Ad blockers**
- Disable ad blockers for testing
- Use privacy-friendly alternative (Plausible)

---

## 🆘 Still Stuck?

### Quick Debug Checklist

1. **Check browser console** (F12 → Console)
   - Red errors? Read the message carefully
   - Copy full error and search Google

2. **Check dev server output**
   - Look in terminal where you ran `npm run dev`
   - Errors usually show there first

3. **Verify file structure**
   ```bash
   ls -la
   # Should see: .env.local, package.json, components/, etc.
   ```

4. **Test in incognito mode**
   - Rules out cache/extension issues

5. **Restart everything**
   ```bash
   # Stop dev server (Ctrl+C)
   # Close terminal
   # Reopen terminal
   npm run dev
   ```

### Get Help

1. **Check the guides:**
   - `QUICK_SETUP.md` - Fast setup
   - `GETTING_STARTED.md` - Detailed walkthrough
   - `DEPLOYMENT_CHECKLIST.md` - Complete checklist

2. **Review documentation:**
   - Supabase Docs: https://supabase.com/docs
   - Vercel Docs: https://vercel.com/docs
   - Vite Docs: https://vitejs.dev

3. **Common solutions:**
   - 90% of issues = environment variables not set
   - Restart dev server after ANY .env changes
   - Check Vercel deployment logs for production issues

---

## ✅ Everything Working?

Your checklist when all is good:

- [ ] No errors in browser console
- [ ] Green setup banner shows (or no banner in production)
- [ ] Can sign up on landing page
- [ ] Email appears in Supabase `waitlist` table
- [ ] Email appears in ConvertKit subscribers
- [ ] Domain loads with HTTPS
- [ ] Mobile responsive
- [ ] Fast page loads (< 3 seconds)

**You're ready to launch! 🚀**

---

**Last Updated:** October 2025
