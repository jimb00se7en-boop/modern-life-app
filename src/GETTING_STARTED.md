# Modern Life - Getting Started Guide
## Step-by-Step Setup for modernlife-ai.app

Let's get your platform live! Follow these steps in order.

---

## ✅ Step 1: Local Environment Setup (5 minutes)

### 1.1 Create your local environment file

```bash
cp .env.example .env.local
```

**Important:** `.env.local` is gitignored and will never be committed. This is where your real credentials go.

### 1.2 Install dependencies

```bash
npm install
```

If you see any errors, make sure you have Node.js 18+ installed:
```bash
node --version  # Should be v18 or higher
```

### 1.3 Test local development server

```bash
npm run dev
```

Visit http://localhost:5173 - you should see the waitlist landing page!

**✓ Checkpoint:** Landing page loads locally

---

## 🗄️ Step 2: Supabase Database Setup (10 minutes)

### 2.1 Create Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - **Name:** modern-life-production
   - **Database Password:** (generate a strong one - save it!)
   - **Region:** Choose closest to your users (e.g., US East)
   - **Pricing Plan:** Free (perfect for launch)

4. Wait 2-3 minutes for project to provision

### 2.2 Get Your Supabase Credentials

Once project is ready:

1. Go to **Project Settings** (gear icon) → **API**
2. Copy these values:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGc...
service_role key: eyJhbGc... (click "Reveal" first)
```

3. Add to `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key...
```

### 2.3 Run Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open your local file `backend/schema.sql`
4. Copy ALL the contents
5. Paste into Supabase SQL Editor
6. Click **Run** (or press Ctrl/Cmd + Enter)

You should see: "Success. No rows returned"

### 2.4 Verify Tables Created

1. Go to **Table Editor** (left sidebar)
2. You should see these tables:
   - waitlist
   - users
   - achievements
   - habits
   - habit_completions
   - templates
   - template_downloads
   - template_ratings
   - audio_content
   - audio_favorites

**✓ Checkpoint:** All tables visible in Table Editor

### 2.5 Test Database Connection

In your terminal (with dev server running):

```bash
# Open browser console (F12) and paste this:
# (We'll test this after updating the waitlist component)
```

---

## 📧 Step 3: Email Service Setup (10 minutes)

You have two options - choose ONE:

### Option A: ConvertKit (Recommended - Best for launches)

1. Go to https://app.convertkit.com/users/signup
2. Create free account
3. Once logged in:
   - Click **Grow** → **Landing Pages & Forms**
   - Click **Create New** → **Form**
   - Choose "Inline" form
   - Name it: "Modern Life Waitlist"
4. After creating:
   - Click **Settings** tab
   - Find **Form ID** (number in URL: `/forms/XXXXXX`)
5. Get API Key:
   - Click profile icon → **Account Settings**
   - Click **Advanced** → **API & Webhooks**
   - Copy **API Key** and **API Secret**

6. Add to `.env.local`:

```env
CONVERTKIT_API_KEY=your-api-key-here
CONVERTKIT_FORM_ID=1234567
CONVERTKIT_SECRET_KEY=your-secret-here
```

### Option B: Mailchimp (Alternative)

1. Go to https://mailchimp.com/signup/
2. Create free account
3. Create an audience (list)
4. Get credentials:
   - Profile → **Account & Billing** → **Extras** → **API Keys**
   - Create a key, copy it
   - Get Audience ID from **Audience** → **Settings** → **Audience name and defaults**

5. Add to `.env.local`:

```env
MAILCHIMP_API_KEY=your-key-here
MAILCHIMP_AUDIENCE_ID=your-audience-id
```

**✓ Checkpoint:** Email service credentials in `.env.local`

---

## ☁️ Step 4: Vercel Deployment (15 minutes)

### 4.1 Create Vercel Account

1. Go to https://vercel.com/signup
2. Sign up with GitHub (recommended)
3. Authorize Vercel to access your repositories

### 4.2 Push Code to GitHub

If you haven't already:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make sure .env.local is NOT added
git status  # Should NOT show .env.local

# Commit
git commit -m "Initial commit - Modern Life platform"

# Create GitHub repo (go to github.com/new)
# Then connect and push:
git remote add origin https://github.com/yourusername/modern-life.git
git branch -M main
git push -u origin main
```

### 4.3 Import Project to Vercel

**Via Web Dashboard:**

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your `modern-life` repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Add Environment Variables**

Click **Environment Variables**, then add ALL variables from your `.env.local`:

```
VITE_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
CONVERTKIT_API_KEY = your-key
CONVERTKIT_FORM_ID = 123456
CONVERTKIT_SECRET_KEY = your-secret

# Add these too:
VITE_APP_NAME = Modern Life
VITE_APP_URL = https://modernlife-ai.app
```

**Important:** Make sure to set variables for **Production**, **Preview**, AND **Development**

6. Click **Deploy**

Wait 2-3 minutes. You'll get a URL like: `https://modern-life-xxxxx.vercel.app`

### 4.4 Test Deployment

1. Click the deployment URL
2. Verify waitlist landing page loads
3. Try signing up with your email
4. Check Supabase Table Editor → `waitlist` table for your entry

**✓ Checkpoint:** App deployed and signup works

---

## 🌐 Step 5: Connect Custom Domain (10 minutes)

### 5.1 Add Domain in Vercel

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `modernlife-ai.app`
5. Click **Add**

Vercel will show you DNS records to configure.

### 5.2 Configure DNS at Your Domain Registrar

**Where you bought modernlife-ai.app** (GoDaddy, Namecheap, etc.):

**Option A: Use Vercel Nameservers (Recommended - Easiest)**

Vercel will show nameservers like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

1. Go to your domain registrar
2. Find DNS/Nameserver settings
3. Change nameservers to Vercel's
4. Save

**Option B: Add A and CNAME Records**

If you want to keep your current nameservers:

Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### 5.3 Add www Redirect (Optional)

In Vercel Domains, also add:
- `www.modernlife-ai.app` → redirects to `modernlife-ai.app`

### 5.4 Wait for DNS Propagation

- DNS changes take 5 minutes - 48 hours (usually ~1 hour)
- Check status at: https://dnschecker.org/#A/modernlife-ai.app

**✓ Checkpoint:** https://modernlife-ai.app loads (may take up to 1 hour)

---

## 📊 Step 6: Analytics Setup (10 minutes)

### Option A: Plausible (Recommended - Privacy-friendly)

1. Go to https://plausible.io/register
2. Start free trial (or $9/mo)
3. Add website: `modernlife-ai.app`
4. Copy the script tag they give you
5. We'll add it in Step 7

### Option B: Google Analytics 4 (Free)

1. Go to https://analytics.google.com
2. Create account → Create property
3. Property name: "Modern Life"
4. Get Measurement ID (looks like `G-XXXXXXXXXX`)
5. Add to `.env.local` and Vercel env vars:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🔧 Step 7: Update Code for Production

Now let's connect the waitlist form to your actual backend.

### 7.1 Update WaitlistLanding Component

I'll create an updated version that uses the real API:

```typescript
// This will be the updated component
```

### 7.2 Add Analytics Script

We need to add the analytics tracking code.

---

## 🧪 Step 8: Test Everything (10 minutes)

### End-to-End Test Checklist:

1. **Visit your site:** https://modernlife-ai.app
   - [ ] Page loads in < 3 seconds
   - [ ] No console errors (F12 → Console)
   - [ ] All images load
   - [ ] Countdown timer shows correct date

2. **Test Waitlist Signup:**
   - [ ] Enter test email
   - [ ] Click "Join Waitlist"
   - [ ] See success message
   - [ ] Check Supabase `waitlist` table - entry appears
   - [ ] Check ConvertKit - subscriber added
   - [ ] Check email - welcome email received

3. **Test Referral System:**
   - [ ] Copy your referral code from success message
   - [ ] Open incognito window
   - [ ] Go to: `https://modernlife-ai.app?ref=YOUR-CODE`
   - [ ] Sign up with different email
   - [ ] Check Supabase - `referred_by` field is set
   - [ ] Original user's `referral_count` increased

4. **Test Mobile:**
   - [ ] Open on phone
   - [ ] Signup flow works
   - [ ] Countdown timer displays correctly
   - [ ] Images load

5. **Check Analytics:**
   - [ ] Visit Plausible/GA dashboard
   - [ ] See your test visit tracked

**✓ Final Checkpoint:** All tests pass!

---

## 🚀 Step 9: Launch! (5 minutes)

### 9.1 Pre-Launch Checklist

- [ ] All environment variables set in Vercel
- [ ] Database schema deployed to Supabase
- [ ] Domain pointing to Vercel (DNS propagated)
- [ ] SSL certificate active (https works)
- [ ] Email service configured and tested
- [ ] Analytics tracking
- [ ] Tested signup flow end-to-end
- [ ] Checked mobile responsiveness

### 9.2 Launch Announcement

**Social Media Post Template:**

```
🎉 Excited to announce Modern Life!

Transform your wellness journey in 21 days with our AI-powered platform combining:
💚 Meditation
🔮 Sleep optimization  
🔴 Nutrition tracking
☀️ Study management
🟠 Childcare coordination
💙 Smart scheduling

First 100 signups get LIFETIME platinum access ($2,400+ value)

Join the waitlist: https://modernlife-ai.app

#WellnessTech #ModernLife #AIWellness
```

**Launch Channels:**
- [ ] Twitter/X
- [ ] LinkedIn
- [ ] Instagram
- [ ] ProductHunt (optional)
- [ ] Reddit (r/SideProject, r/wellness)
- [ ] Hacker News "Show HN" (optional)

### 9.3 Monitor First 24 Hours

**Watch These Metrics:**

1. **Vercel Dashboard:**
   - Response times (should be < 500ms)
   - Error rate (should be < 1%)
   - Bandwidth usage

2. **Supabase Dashboard:**
   - Database size
   - Active connections
   - Query performance

3. **Email Service:**
   - Delivery rate (should be > 95%)
   - Open rate (first emails)

4. **Set Up Alerts:**
   - Vercel: Project Settings → Notifications
   - Supabase: Project Settings → Email Alerts

---

## 🎯 Step 10: Next Steps (Optional)

### Immediate (Week 1):

1. **Set up monitoring:**
   ```bash
   # Add Sentry for error tracking
   npm install @sentry/react
   ```

2. **Add uptime monitoring:**
   - BetterUptime: https://betteruptime.com
   - Or UptimeRobot (free): https://uptimerobot.com

3. **Create email sequences in ConvertKit:**
   - Welcome email (Day 0)
   - Share referral link (Day 3)  
   - Feature preview (Day 7)
   - Launch announcement (Day 14)

### Short-term (Week 2-4):

4. **Stripe Integration** (when ready for payments)
5. **Build out full platform** (Dashboard, Hubs)
6. **Launch to first 100 users**

---

## 🆘 Troubleshooting

### Issue: "Supabase connection failed"

**Fix:**
1. Check `.env.local` has correct `VITE_SUPABASE_URL`
2. Check Supabase project is not paused (happens after 7 days inactivity on free plan)
3. Verify API key is the **anon** key, not service role (for frontend)

### Issue: "Waitlist signup not working"

**Fix:**
1. Open browser console (F12) - check for errors
2. Verify Supabase `waitlist` table exists
3. Check RLS policies allow INSERT from anon users
4. Test with simple INSERT in Supabase SQL Editor

### Issue: "Domain not connecting"

**Fix:**
1. Check DNS propagation: https://dnschecker.org
2. Wait up to 48 hours for DNS to propagate
3. Verify nameservers/A records are correct
4. Clear browser cache
5. Try incognito/private browsing

### Issue: "Emails not sending"

**Fix:**
1. Check ConvertKit API key is correct
2. Verify Form ID is accurate
3. Check ConvertKit dashboard for failed subscribers
4. Test API directly with curl:
   ```bash
   curl -X POST https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe \
     -d "api_key=YOUR_API_KEY" \
     -d "email=test@example.com"
   ```

### Issue: "Vercel build failing"

**Fix:**
1. Check build logs in Vercel dashboard
2. Verify `package.json` has all dependencies
3. Run `npm run build` locally first
4. Check Node version matches (18+)
5. Verify environment variables are set

---

## 📞 Need Help?

**Check these first:**
1. `DEPLOYMENT_CHECKLIST.md` - Detailed deployment steps
2. `LAUNCH_INFRASTRUCTURE_GUIDE.md` - Infrastructure best practices
3. Supabase Docs: https://supabase.com/docs
4. Vercel Docs: https://vercel.com/docs

**Still stuck?**
- Review error messages carefully
- Check all environment variables are set correctly
- Verify each service dashboard shows no issues

---

## ✅ You're Ready!

Once you've completed Steps 1-9, you're LIVE! 🎉

**Your Modern Life Platform:**
- ✅ Landing page live at modernlife-ai.app
- ✅ Waitlist collecting emails
- ✅ Database storing signups
- ✅ Email marketing active
- ✅ Analytics tracking visitors
- ✅ SSL secured
- ✅ Ready to scale!

**Next up:** Start driving traffic and collecting those first 100 signups for lifetime platinum access!

Good luck! 🚀
