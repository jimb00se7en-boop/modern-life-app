# Modern Life - Quick Setup Guide
## Get live in 30 minutes! ⚡

---

## 🎯 What You Need

Before starting, have these ready:
- [ ] GitHub account
- [ ] Credit card (for Vercel/Supabase - both have free tiers)
- [ ] Domain registrar login (where you bought modernlife-ai.app)

---

## ⚡ 30-Minute Setup

### Minute 0-5: Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Create local environment file
cp .env.example .env.local

# 3. Start dev server to verify it works
npm run dev
```

✅ **Checkpoint:** Visit http://localhost:5173 - see landing page

---

### Minute 5-12: Supabase (Database)

1. **Go to:** https://supabase.com/dashboard
2. **Click:** "New Project"
3. **Fill in:**
   - Name: `modern-life-production`
   - Password: (generate strong password - save it!)
   - Region: `East US (North Virginia)` or closest to you
4. **Wait 2 minutes** for project to provision

5. **Get credentials:**
   - Go to: Project Settings ⚙️ → API
   - Copy: `Project URL` and `anon public` key

6. **Add to `.env.local`:**
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

7. **Create database:**
   - Go to: SQL Editor (lightning icon)
   - Click: "New Query"
   - Copy entire contents of `backend/schema.sql`
   - Paste and click "Run"

✅ **Checkpoint:** See "Success" message, check Table Editor shows 10+ tables

---

### Minute 12-18: Vercel (Hosting)

1. **Go to:** https://vercel.com/signup
2. **Sign up with GitHub**
3. **Authorize Vercel**

4. **Push code to GitHub:**
```bash
# If you haven't already:
git init
git add .
git commit -m "Initial commit"

# Create repo on github.com/new, then:
git remote add origin https://github.com/YOUR-USERNAME/modern-life.git
git push -u origin main
```

5. **Import to Vercel:**
   - Click "Add New..." → "Project"
   - Select your `modern-life` repository
   - Click "Import"

6. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

7. **Add Environment Variables:**

Click "Environment Variables" and add these:

```
VITE_SUPABASE_URL = [paste from step above]
VITE_SUPABASE_ANON_KEY = [paste from step above]
VITE_APP_NAME = Modern Life
VITE_APP_URL = https://modernlife-ai.app
```

**Important:** Select all three environments (Production, Preview, Development)

8. **Click "Deploy"** and wait 2-3 minutes

✅ **Checkpoint:** Get URL like `modern-life-abc123.vercel.app` - test it loads!

---

### Minute 18-25: Connect Domain

1. **In Vercel:**
   - Go to: Project → Settings → Domains
   - Click: "Add Domain"
   - Enter: `modernlife-ai.app`
   - Click "Add"

2. **Vercel will show you DNS settings**

3. **Option A - Use Vercel DNS (Easiest):**
   - Vercel shows nameservers like:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```
   - Go to your domain registrar
   - Find "Nameservers" or "DNS Settings"
   - Replace with Vercel's nameservers
   - Save

4. **Option B - Keep Current DNS:**
   - Add these records at your registrar:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   ```

5. **Wait 10-60 minutes** for DNS to propagate

✅ **Checkpoint:** https://modernlife-ai.app loads (might take up to 1 hour)

---

### Minute 25-30: Email Setup (ConvertKit)

1. **Go to:** https://app.convertkit.com/users/signup
2. **Create free account** (no credit card needed for free tier)
3. **After login:**
   - Click: "Grow" → "Landing Pages & Forms"
   - Click: "Create New" → "Form"
   - Choose: "Inline" form
   - Name: "Modern Life Waitlist"
   - Click: "Create"

4. **Get Form ID:**
   - Look at URL: `/forms/XXXXXX` (the numbers are your Form ID)

5. **Get API Keys:**
   - Click profile icon → "Account Settings"
   - Click: "Advanced"
   - Under "API": Click "Show" to reveal keys
   - Copy: API Key and API Secret

6. **Add to Vercel:**
   - Go to: Vercel → Project → Settings → Environment Variables
   - Add:
   ```
   CONVERTKIT_API_KEY = [your-api-key]
   CONVERTKIT_FORM_ID = [123456]
   CONVERTKIT_SECRET_KEY = [your-secret]
   ```

7. **Redeploy:**
   - Go to: Deployments tab
   - Click "..." → "Redeploy"

✅ **Checkpoint:** Done! Everything is connected!

---

## 🧪 Test Everything (5 minutes)

1. **Test Signup Flow:**
   ```
   - Go to: https://modernlife-ai.app
   - Enter your email
   - Click "Join Waitlist"
   - Should see success message
   ```

2. **Verify Data:**
   ```
   - Go to: Supabase → Table Editor → waitlist
   - See your email entry
   - Check position number assigned
   ```

3. **Check Email:**
   ```
   - Go to: ConvertKit → Subscribers
   - See your email added
   - (Welcome email won't send until you set that up)
   ```

4. **Test Referral:**
   ```
   - Copy your referral code from success screen
   - Open incognito window
   - Go to: https://modernlife-ai.app?ref=YOUR-CODE
   - Sign up with different email
   - Check Supabase - referral should be tracked
   ```

✅ **All working?** You're LIVE! 🎉

---

## 🎨 Optional: Setup Analytics (5 minutes)

### Plausible (Recommended - Privacy-first)

1. Go to: https://plausible.io/register
2. Add site: `modernlife-ai.app`
3. Start free trial
4. Add to Vercel env vars:
```
VITE_PLAUSIBLE_DOMAIN = modernlife-ai.app
```

### Google Analytics (Free)

1. Go to: https://analytics.google.com
2. Create account → Create property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to Vercel env vars:
```
VITE_GA_MEASUREMENT_ID = G-XXXXXXXXXX
```

5. Redeploy in Vercel

---

## 📧 Optional: Setup Email Sequences (10 minutes)

In ConvertKit:

1. **Go to:** "Automate" → "Visual Automations"
2. **Click:** "Create Automation"
3. **Add trigger:** "Subscribes to form" → Select "Modern Life Waitlist"
4. **Add sequence:**

```
Day 0 (Immediately):
- Subject: "🎉 You're on the Modern Life waitlist!"
- Body: Welcome + referral code + what to expect

Day 3:
- Subject: "Share Modern Life and move up the list"
- Body: Referral link + benefits of referring

Day 7:
- Subject: "A sneak peek at what's coming..."
- Body: Feature preview + excitement building

Day 10:
- Subject: "The science behind Modern Life"
- Body: Research, benefits, chakra system

Day 14 (Launch Day):
- Subject: "🚀 Modern Life is LIVE!"
- Body: Login link + getting started guide
```

---

## 🎯 You're Live! What's Next?

### Immediate (Today):
- [ ] Post on social media announcing launch
- [ ] Share in relevant communities (Reddit, ProductHunt, etc.)
- [ ] Email your network
- [ ] Set up monitoring (BetterUptime)

### This Week:
- [ ] Create social media content calendar
- [ ] Set up Pinterest campaign (see `/marketing/PINTEREST_MARKETING_STRATEGY.md`)
- [ ] Monitor analytics daily
- [ ] Engage with early signups

### Next 2 Weeks:
- [ ] Reach 100 waitlist signups
- [ ] Launch full platform to first users
- [ ] Set up Stripe for payments
- [ ] Build community engagement

---

## 🆘 Common Issues

### "Database connection failed"
- Check Supabase project is not paused
- Verify `.env.local` has correct URL and key
- Restart dev server: `npm run dev`

### "Domain not working"
- DNS can take up to 48 hours (usually 1 hour)
- Check at: https://dnschecker.org
- Verify nameservers are correct
- Clear browser cache

### "Form not submitting"
- Check browser console for errors (F12)
- Verify Supabase RLS policies allow INSERT
- Check ConvertKit keys are correct
- Test API directly: `/api/waitlist`

### "Build failing on Vercel"
- Check build logs in Vercel dashboard
- Run `npm run build` locally first
- Verify all env vars are set in Vercel
- Check Node version (should be 18+)

---

## ✅ Success Checklist

Before announcing launch:
- [ ] Landing page loads at modernlife-ai.app
- [ ] HTTPS works (green padlock)
- [ ] Signup form works end-to-end
- [ ] Email appears in Supabase
- [ ] Subscriber added to ConvertKit
- [ ] Referral system tracking works
- [ ] Mobile responsive (test on phone)
- [ ] Analytics tracking (check dashboard)
- [ ] No console errors (F12 → Console)
- [ ] Page loads in < 3 seconds

---

## 🚀 Ready to Launch!

**You now have:**
✅ Production website live  
✅ Database collecting signups  
✅ Email marketing connected  
✅ Referral system working  
✅ Analytics tracking visitors  
✅ Professional domain with SSL  

**Time to drive traffic and get those first 100 signups!**

Need more detailed help? Check:
- `GETTING_STARTED.md` - Full walkthrough
- `DEPLOYMENT_CHECKLIST.md` - Complete checklist
- `LAUNCH_INFRASTRUCTURE_GUIDE.md` - Infrastructure details

Good luck! 🎉
