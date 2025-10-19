# Modern Life - Complete Connection Flow
## Visual Guide: How Everything Connects

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER VISITS WEBSITE                          │
│                  https://modernlife-ai.app                       │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL (Hosting)                              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  React App (Vite)                                         │  │
│  │  - WaitlistLanding.tsx renders                            │  │
│  │  - Countdown timer shows                                  │  │
│  │  - Email form displayed                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  Environment Variables:                                          │
│  ✓ VITE_SUPABASE_URL                                            │
│  ✓ VITE_SUPABASE_ANON_KEY                                       │
│  ✓ CONVERTKIT_API_KEY                                           │
│  ✓ CONVERTKIT_FORM_ID                                           │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ User enters email & clicks submit
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              FRONTEND (React Component)                          │
│                                                                   │
│  const handleSubmit = async (e) => {                            │
│    // 1. Validate email                                         │
│    // 2. Call API endpoint                                      │
│    const response = await fetch('/api/waitlist', {              │
│      method: 'POST',                                             │
│      body: JSON.stringify({ email, referralCode })              │
│    });                                                           │
│  }                                                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│         SERVERLESS FUNCTION (Vercel Edge Function)               │
│                   /api/waitlist.ts                               │
│                                                                   │
│  1. Rate limiting check ────────────┐                           │
│  2. Email validation                │                           │
│  3. Check for duplicates            │                           │
│  4. Generate referral code          │                           │
│                                     │                           │
│                                     ▼                           │
│  ┌────────────────────────────────────────────┐                │
│  │  Parallel Operations (async)                │                │
│  │                                              │                │
│  │  ┌─────────────────┐  ┌──────────────────┐ │                │
│  │  │  Insert into    │  │  Subscribe to    │ │                │
│  │  │  Supabase       │  │  ConvertKit      │ │                │
│  │  └────────┬────────┘  └────────┬─────────┘ │                │
│  └───────────│─────────────────────│───────────┘                │
│              │                     │                             │
└──────────────┼─────────────────────┼─────────────────────────────┘
               │                     │
               ▼                     ▼
┌──────────────────────┐   ┌──────────────────────────┐
│   SUPABASE           │   │   CONVERTKIT             │
│   (Database)         │   │   (Email Marketing)       │
│                      │   │                          │
│  waitlist table:     │   │  Subscribers:            │
│  ┌────────────────┐  │   │  ┌────────────────────┐  │
│  │ id (UUID)      │  │   │  │ email              │  │
│  │ email          │  │   │  │ tags: [waitlist]   │  │
│  │ position: 1    │  │   │  │ fields:            │  │
│  │ referral_code  │  │   │  │  - position        │  │
│  │ referred_by    │  │   │  │  - referral_code   │  │
│  │ status: pending│  │   │  └────────────────────┘  │
│  │ created_at     │  │   │                          │
│  └────────────────┘  │   │  Triggers:               │
│                      │   │  ✓ Welcome Email         │
│  Auto triggers:      │   │  ✓ Email Sequence        │
│  ✓ Generate ref code │   │                          │
│  ✓ Set position      │   └──────────────────────────┘
│  ✓ Update ref count  │
│                      │
│  RLS Policies:       │
│  ✓ Allow INSERT anon │
│  ✓ User can view own │
└──────────────────────┘
               │
               │ Return data
               ▼
┌─────────────────────────────────────────────────────────────────┐
│              API RESPONSE TO FRONTEND                            │
│                                                                   │
│  {                                                               │
│    success: true,                                                │
│    data: {                                                       │
│      position: 1,                                                │
│      referralCode: "ABC12345",                                   │
│      referralUrl: "modernlife-ai.app?ref=ABC12345"              │
│    }                                                             │
│  }                                                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│              FRONTEND SUCCESS STATE                              │
│                                                                   │
│  - Hide email form                                               │
│  - Show success message                                          │
│  - Display position number                                       │
│  - Show referral code                                            │
│  - Copy link button                                              │
│                                                                   │
│  Track event:                                                    │
│  analytics.signup(position)                                      │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                   ANALYTICS TRACKING                             │
│                                                                   │
│  ┌──────────────────┐        ┌──────────────────────┐           │
│  │  Plausible.io    │        │  Google Analytics    │           │
│  │                  │        │                      │           │
│  │  Event:          │        │  Event:              │           │
│  │  "Waitlist       │        │  "waitlist_signup"   │           │
│  │   Signup"        │        │                      │           │
│  │  Props:          │        │  Parameters:         │           │
│  │   position: 1    │        │   position: 1        │           │
│  └──────────────────┘        └──────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Referral Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  User A signs up                                                 │
│  ├─ Gets position: 1                                             │
│  └─ Gets referral code: "ABC12345"                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ Shares link
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  User B visits: modernlife-ai.app?ref=ABC12345                  │
│  ├─ Frontend detects 'ref' parameter                             │
│  ├─ Shows "You were referred!" message                           │
│  └─ Stores referral code in state                                │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          │ User B signs up
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  Backend processes signup                                        │
│  1. Lookup User A by referral code                               │
│  2. Create User B entry with referred_by = User A's ID           │
│  3. Increment User A's referral_count                            │
│  4. (Optional) Move User A up in queue                           │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  Result in Supabase:                                             │
│                                                                   │
│  User A:                        User B:                          │
│  ├─ position: 1                 ├─ position: 2                   │
│  ├─ referral_code: ABC12345     ├─ referral_code: XYZ98765      │
│  ├─ referral_count: 1           ├─ referral_count: 0            │
│  └─ referred_by: null           └─ referred_by: User A's ID      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📧 Email Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  User signs up on website                                        │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  API sends to ConvertKit                                         │
│  POST https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe   │
│  {                                                               │
│    api_key: "...",                                               │
│    email: "user@example.com",                                    │
│    tags: ["waitlist"],                                           │
│    fields: {                                                     │
│      waitlist_position: 1,                                       │
│      referral_code: "ABC12345"                                   │
│    }                                                             │
│  }                                                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  ConvertKit processes subscription                               │
│  ├─ Adds to subscriber list                                      │
│  ├─ Applies tags                                                 │
│  ├─ Stores custom fields                                         │
│  └─ Triggers automation                                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  Email Sequence (ConvertKit Automation)                          │
│                                                                   │
│  Day 0 (Immediate):                                              │
│  ┌────────────────────────────────────────────┐                 │
│  │ Subject: "🎉 You're on the Modern Life     │                 │
│  │          waitlist!"                         │                 │
│  │                                             │                 │
│  │ Body:                                       │                 │
│  │ - Welcome message                           │                 │
│  │ - Position: {{waitlist_position}}           │                 │
│  │ - Your code: {{referral_code}}              │                 │
│  │ - Share link to move up                     │                 │
│  └────────────────────────────────────────────┘                 │
│                                                                   │
│  Day 3:                                                          │
│  ┌────────────────────────────────────────────┐                 │
│  │ Subject: "Share and climb the list"        │                 │
│  │ Body: Referral benefits + how to share     │                 │
│  └────────────────────────────────────────────┘                 │
│                                                                   │
│  Day 7:                                                          │
│  ┌────────────────────────────────────────────┐                 │
│  │ Subject: "Sneak peek at Modern Life"       │                 │
│  │ Body: Feature preview + screenshots        │                 │
│  └────────────────────────────────────────────┘                 │
│                                                                   │
│  Day 14 (Launch):                                                │
│  ┌────────────────────────────────────────────┐                 │
│  │ Subject: "🚀 Modern Life is LIVE!"         │                 │
│  │ Body: Login link + getting started         │                 │
│  └────────────────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔍 DNS & Domain Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  User types: modernlife-ai.app                                   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  DNS Resolution                                                  │
│                                                                   │
│  Option A: Vercel Nameservers                                    │
│  ┌────────────────────────────────────────┐                     │
│  │ Domain Registrar                       │                     │
│  │ Nameservers:                           │                     │
│  │  - ns1.vercel-dns.com                  │                     │
│  │  - ns2.vercel-dns.com                  │                     │
│  └────────────────┬───────────────────────┘                     │
│                   │                                              │
│                   └──► Vercel handles all DNS                    │
│                                                                   │
│  Option B: A Record                                              │
│  ┌────────────────────────────────────────┐                     │
│  │ Your DNS Provider                      │                     │
│  │ A Record:                              │                     │
│  │  @ → 76.76.21.21 (Vercel IP)          │                     │
│  │ CNAME Record:                          │                     │
│  │  www → cname.vercel-dns.com           │                     │
│  └────────────────┬───────────────────────┘                     │
│                   │                                              │
│                   └──► Points to Vercel                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  Vercel Edge Network                                             │
│  ├─ SSL/TLS certificate (auto-generated)                         │
│  ├─ Global CDN (fast from anywhere)                              │
│  ├─ DDoS protection                                              │
│  └─ Serves your React app                                        │
└─────────────────────────┬───────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  User sees: https://modernlife-ai.app                            │
│  ✓ Secure (HTTPS)                                                │
│  ✓ Fast (Edge cached)                                            │
│  ✓ Global (CDN)                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Complete Data Flow

```
┌──────────────┐
│    USER      │
└──────┬───────┘
       │
       │ 1. Visit site
       ▼
┌──────────────────┐
│     VERCEL       │ ◄── Domain: modernlife-ai.app
│   (Frontend)     │ ◄── SSL: Auto-configured
└──────┬───────────┘
       │
       │ 2. Submit email
       ▼
┌──────────────────┐
│  Edge Function   │ ◄── Rate limiting
│  /api/waitlist   │ ◄── Email validation
└──────┬───────────┘
       │
       ├─── 3a. Insert ────►┌──────────────┐
       │                    │  SUPABASE    │
       │                    │  (Database)  │
       │                    └──────────────┘
       │
       └─── 3b. Subscribe ─►┌──────────────┐
                            │ CONVERTKIT   │
                            │ (Email)      │
                            └──────┬───────┘
                                   │
                                   │ 4. Send email
                                   ▼
                            ┌──────────────┐
                            │  User Inbox  │
                            └──────────────┘

Meanwhile:

┌──────────────┐
│ ANALYTICS    │ ◄── Page views
│ - Plausible  │ ◄── Events
│ - GA4        │ ◄── Conversions
└──────────────┘

┌──────────────┐
│ MONITORING   │ ◄── Uptime checks
│ - BetterUp   │ ◄── Error tracking
│ - Sentry     │ ◄── Performance
└──────────────┘
```

---

## 🎯 Environment Variables Flow

```
Development (Local):
┌──────────────────────┐
│   .env.local         │  ◄── Never committed to git
│   (Your machine)     │  ◄── Contains real credentials
└──────────────────────┘

Production (Vercel):
┌──────────────────────┐
│ Vercel Dashboard     │
│ Environment Vars     │  ◄── Encrypted at rest
│ ├─ Production        │  ◄── Used in prod builds
│ ├─ Preview           │  ◄── Used in PR previews
│ └─ Development       │  ◄── Used in dev server
└──────────────────────┘
         │
         │ Build time
         ▼
┌──────────────────────┐
│  Built Application   │
│  (Serverless)        │
│  - Frontend has      │
│    VITE_* vars       │
│  - Backend has       │
│    all vars          │
└──────────────────────┘
```

---

## ✅ Connection Checklist

Use this to verify all connections are working:

**Frontend → Backend:**
- [ ] Clicking "Join Waitlist" button calls `/api/waitlist`
- [ ] Loading state shows while processing
- [ ] Success/error messages display correctly

**Backend → Supabase:**
- [ ] Email inserted into `waitlist` table
- [ ] Position number auto-generated
- [ ] Referral code auto-created
- [ ] Referred_by link established (if ref code used)

**Backend → ConvertKit:**
- [ ] Subscriber added to list
- [ ] Tags applied
- [ ] Custom fields populated
- [ ] Welcome email sent

**Domain → Vercel:**
- [ ] DNS resolves to Vercel
- [ ] SSL certificate active
- [ ] www redirect works (if configured)

**Analytics:**
- [ ] Page views tracked
- [ ] Signup events tracked
- [ ] Traffic sources visible

**End-to-End:**
- [ ] User can sign up
- [ ] Data saved to database
- [ ] Email delivered
- [ ] Referral system works
- [ ] Analytics record event

---

## 🆘 Troubleshooting Connection Issues

**Issue: Can't connect to Supabase**
→ Check: VITE_SUPABASE_URL is correct
→ Check: Using ANON key (not service role) in frontend
→ Check: Project not paused in Supabase dashboard

**Issue: Email not sending to ConvertKit**
→ Check: CONVERTKIT_API_KEY is correct
→ Check: FORM_ID matches your form
→ Check: API endpoint URL is correct
→ Test: Try direct API call with curl

**Issue: Domain not resolving**
→ Check: DNS propagation (https://dnschecker.org)
→ Check: Nameservers/A records correct
→ Wait: Can take up to 48 hours
→ Try: Incognito mode to avoid cache

**Issue: Environment variables not working**
→ Check: Variables set in Vercel dashboard
→ Check: Selected correct environment (Production/Preview/Dev)
→ Check: Redeployed after adding variables
→ Check: VITE_ prefix for frontend variables

---

This visual guide shows exactly how every piece connects together!
