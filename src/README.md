# Modern Life - Wellness Platform

> Transform your life in 21 days with AI-powered wellness management.

Modern Life is a comprehensive wellness platform that combines meditation, sleep, nutrition, study management, and childcare coordination into one intelligent system. Built with React, TypeScript, and Supabase.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/modern-life.git
cd modern-life
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:
- Supabase URL and keys
- ConvertKit API credentials
- Stripe keys (when ready)
- Analytics tokens

4. **Set up Supabase database**
- Create a new project at [supabase.com](https://supabase.com)
- Run the SQL schema: `backend/schema.sql`
- Copy your project URL and anon key to `.env.local`

5. **Start development server**
```bash
npm run dev
```

Visit http://localhost:5173

## 📁 Project Structure

```
modern-life/
├── components/          # React components
│   ├── ui/             # Shadcn UI components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── WaitlistLanding.tsx  # Waitlist page
│   └── ...             # Hub components
├── contexts/           # React contexts
├── data/              # Mock data & databases
├── utils/             # Utility functions
│   └── supabaseClient.ts  # Supabase setup
├── api/               # API routes (Vercel)
│   └── waitlist.ts    # Waitlist signup
├── backend/           # Backend documentation
│   ├── schema.sql     # Database schema
│   └── *.md          # Backend guides
├── marketing/         # Marketing materials
├── styles/            # Global styles & Chakra colors
└── App.tsx            # Root component
```

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + Shadcn UI
- Motion (animations)
- Recharts (data visualization)
- Lucide React (icons)

**Backend:**
- Supabase (PostgreSQL + Auth + Storage + Realtime)
- Vercel (hosting + serverless functions)

**Services:**
- ConvertKit (email marketing)
- Stripe (payments)
- Plausible/GA4 (analytics)
- Sentry (error tracking)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Connect repository to Vercel**
```bash
npm i -g vercel
vercel login
vercel
```

2. **Configure project**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

3. **Add environment variables**
- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Add all variables from `.env.example`

4. **Deploy to production**
```bash
vercel --prod
```

5. **Set up custom domain**
- Go to Vercel Dashboard → Project → Settings → Domains
- Add `modernlife-ai.app`
- Update DNS records at your domain registrar

### Alternative Deployment Options

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**AWS Amplify:**
- Connect Git repository
- Build settings: `npm run build` → `dist`

## 📊 Database Schema

See `backend/schema.sql` for complete schema with:
- Waitlist management with referral tracking
- User profiles & achievements
- Habit tracking & completions
- Template marketplace
- Audio library
- Row Level Security policies

## 🔐 Environment Variables

Required variables (see `.env.example`):

```env
# Supabase
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email
CONVERTKIT_API_KEY=your-api-key
CONVERTKIT_FORM_ID=your-form-id

# Payments (when ready)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint

# Type checking
npm run type-check
```

## 📈 Monitoring

**Production monitoring stack:**
- **Vercel Analytics** - Web Vitals & performance
- **Sentry** - Error tracking & monitoring
- **Plausible** - Privacy-friendly analytics
- **BetterUptime** - Uptime monitoring
- **Supabase Dashboard** - Database metrics

## 🎨 Design System

Modern Life uses a chakra-inspired color system:
- **Root Chakra** 🔴 - Nutrition Hub (Red tones)
- **Sacral Chakra** 🟠 - Childcare Hub (Orange tones)
- **Solar Plexus** ☀️ - Study Hub (Yellow tones)
- **Heart Chakra** 💚 - Meditation Hub (Green tones)
- **Throat Chakra** 💙 - Schedule Hub (Blue tones)
- **Third Eye** 🔮 - Sleep Hub (Indigo tones)
- **Crown Chakra** 👑 - Mastery Center (Purple tones)

See `CHAKRA_DESIGN_SYSTEM.md` for complete guidelines.

## 📚 Documentation

- `DEPLOYMENT_CHECKLIST.md` - Complete deployment guide
- `LAUNCH_INFRASTRUCTURE_GUIDE.md` - Infrastructure best practices
- `COMPLETE_PLATFORM_SUMMARY.md` - Full platform overview
- `backend/BACKEND_COMPLETE_GUIDE.md` - Backend architecture
- `marketing/21_DAY_TEASER_CAMPAIGN.md` - Marketing strategy

## 🤝 Contributing

We're not accepting external contributions at this time, but feel free to fork for personal use.

## 📄 License

Copyright © 2025 Modern Life. All rights reserved.

## 🆘 Support

- Email: hello@modernlife-ai.app
- Documentation: See `/docs` folder
- Issues: Check deployment guides first

## 🗺️ Roadmap

**Phase 1: Waitlist (Current)**
- ✅ Landing page with countdown
- ✅ Email collection & referral system
- 🔄 Launch teaser campaign

**Phase 2: MVP Launch (Week 2-4)**
- 21-day onboarding flow
- All 6 wellness hubs
- Achievement system
- Audio library basics

**Phase 3: Growth (Month 2-6)**
- Template marketplace
- AI features (voice commands, scheduling)
- Community features
- Premium tier system

**Phase 4: Scale (Month 6+)**
- Mobile apps (iOS/Android)
- API for third-party integrations
- Advanced AI capabilities
- Enterprise plans

## 🎯 Success Metrics

**Week 1 Goals:**
- 100+ waitlist signups
- < 3s page load time
- > 99% uptime

**Month 1 Goals:**
- 2,000+ waitlist signups
- Launch to first 100 users
- First paying customers

**Month 3 Goals:**
- 1,000+ active users
- 70%+ retention rate
- Template marketplace launched

---

**Built with ❤️ for modern wellness**

🚀 Launch Status: Pre-launch (Waitlist Active)
🌐 Live at: https://modernlife-ai.app
📧 Contact: hello@modernlife-ai.app
