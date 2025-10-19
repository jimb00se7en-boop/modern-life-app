# Modern Life Deployment Checklist
## Pre-Launch Verification

---

## ⚡ Phase 1: Immediate Setup (Day 1)

### 1. Environment Setup
- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in all required environment variables
- [ ] Test environment variables are loading correctly
- [ ] Add `.env.local` to `.gitignore` (verify it's ignored)

### 2. Supabase Setup
- [ ] Create Supabase account at https://supabase.com
- [ ] Create new project: "modern-life-production"
- [ ] Copy project URL and anon key to `.env.local`
- [ ] Run `backend/schema.sql` in Supabase SQL Editor
- [ ] Verify all tables created successfully
- [ ] Test Row Level Security (RLS) policies
- [ ] Enable realtime on required tables
- [ ] Configure database backups (Pro plan)

### 3. Vercel Setup
- [ ] Create Vercel account at https://vercel.com
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Connect GitHub repository to Vercel
- [ ] Import project from Git
- [ ] Configure project settings:
  - [ ] Framework Preset: Vite
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
  - [ ] Install Command: `npm install`
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy to preview environment
- [ ] Test preview deployment

### 4. Domain Configuration
- [ ] Go to domain registrar (where you bought modernlife-ai.app)
- [ ] Add Vercel nameservers OR configure A/CNAME records
- [ ] Add custom domain in Vercel: `modernlife-ai.app`
- [ ] Add `www.modernlife-ai.app` (optional redirect)
- [ ] Verify SSL certificate issued automatically
- [ ] Test HTTPS works: https://modernlife-ai.app
- [ ] Force HTTPS redirect (should be automatic in Vercel)

### 5. Email Setup (ConvertKit)
- [ ] Create ConvertKit account: https://convertkit.com
- [ ] Create new form: "Modern Life Waitlist"
- [ ] Get API key from Account Settings
- [ ] Get Form ID from form settings
- [ ] Add to `.env.local` and Vercel env vars
- [ ] Create email sequence:
  - [ ] Welcome email (immediately)
  - [ ] Day 3: Share your referral link
  - [ ] Day 7: Behind the scenes update
  - [ ] Day 10: Feature preview
  - [ ] Day 14: Launch announcement
- [ ] Test email delivery with your own email

### 6. Analytics Setup
- [ ] **Plausible Analytics**:
  - [ ] Sign up at https://plausible.io
  - [ ] Add site: modernlife-ai.app
  - [ ] Copy tracking script
  - [ ] Add to index.html
  - [ ] Verify tracking in Plausible dashboard
  
- [ ] **Google Analytics 4** (optional):
  - [ ] Create GA4 property
  - [ ] Get Measurement ID
  - [ ] Add gtag.js to site
  - [ ] Test events firing

### 7. Testing Before Launch
- [ ] Test waitlist signup flow end-to-end
- [ ] Verify email received after signup
- [ ] Check data in Supabase dashboard
- [ ] Test referral code functionality
- [ ] Test on mobile devices
- [ ] Test in different browsers (Chrome, Safari, Firefox)
- [ ] Check page load speed (Lighthouse)
- [ ] Verify all images load correctly
- [ ] Test countdown timer shows correct date
- [ ] Check all links work
- [ ] Verify social meta tags (Open Graph, Twitter Cards)

---

## 🚀 Phase 2: Pre-Launch (Week 1)

### 8. Monitoring Setup
- [ ] **Sentry** (Error Tracking):
  - [ ] Create account: https://sentry.io
  - [ ] Create project: "modern-life-frontend"
  - [ ] Install SDK: `npm install @sentry/react`
  - [ ] Add Sentry init to main.tsx
  - [ ] Test error capture
  - [ ] Set up alerts for critical errors

- [ ] **BetterUptime** (Uptime Monitoring):
  - [ ] Create account: https://betteruptime.com
  - [ ] Add monitor for modernlife-ai.app
  - [ ] Set up status page (optional)
  - [ ] Configure alert channels (email, Slack)

- [ ] **Vercel Analytics**:
  - [ ] Enable in Vercel dashboard (free)
  - [ ] Check Web Vitals data

### 9. Performance Optimization
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Optimize images (use WebP, proper sizing)
- [ ] Enable lazy loading for images
- [ ] Minimize JavaScript bundle size
- [ ] Check Core Web Vitals:
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Test on slow 3G connection
- [ ] Enable Vercel Edge Caching

### 10. Security Hardening
- [ ] Enable HTTPS everywhere (forced)
- [ ] Configure Content Security Policy (CSP)
- [ ] Add security headers (already in vercel.json)
- [ ] Test rate limiting on API endpoints
- [ ] Review Supabase RLS policies
- [ ] Set up CORS properly
- [ ] Test SQL injection prevention
- [ ] Verify no sensitive data in client code
- [ ] Check for exposed API keys (use git-secrets)

### 11. Legal & Compliance
- [ ] Create Privacy Policy page:
  - [ ] Use template from Termly or iubenda
  - [ ] Customize for your data collection
  - [ ] Add link in footer
- [ ] Create Terms of Service page:
  - [ ] Use template (modify for your needs)
  - [ ] Add link in footer
- [ ] Add Cookie Consent (if using tracking):
  - [ ] Install Cookiebot or similar ($9/mo)
  - [ ] Configure cookie categories
- [ ] GDPR compliance:
  - [ ] Add data deletion mechanism
  - [ ] Add data export mechanism
  - [ ] Document data retention policies
- [ ] CAN-SPAM compliance:
  - [ ] Unsubscribe link in all emails
  - [ ] Physical address in email footer
  - [ ] Honor unsubscribe within 10 days

### 12. Social Media Setup
- [ ] Create social media accounts:
  - [ ] Twitter/X: @ModernLifeAI
  - [ ] Instagram: @ModernLifeApp
  - [ ] LinkedIn: Modern Life
  - [ ] Pinterest: Modern Life (for marketing)
- [ ] Add Open Graph meta tags to landing page
- [ ] Add Twitter Card meta tags
- [ ] Test social share previews:
  - [ ] https://cards-dev.twitter.com/validator
  - [ ] Facebook Sharing Debugger
- [ ] Create social media graphics (1200x630px)

---

## 📈 Phase 3: Launch Day

### 13. Pre-Launch Final Checks
- [ ] All team members ready
- [ ] Support email set up (hello@modernlife-ai.app)
- [ ] Social media posts scheduled
- [ ] Email announcement drafted
- [ ] Launch blog post written (optional)
- [ ] Press kit ready (if doing PR)

### 14. Launch Sequence
- [ ] **T-1 hour**: Final smoke test
  - [ ] Test signup flow
  - [ ] Check all monitoring dashboards
  - [ ] Verify email delivery working
  - [ ] Check database backups enabled
  
- [ ] **T-0**: Deploy to production
  - [ ] Merge to `main` branch
  - [ ] Verify Vercel auto-deployment
  - [ ] Check production site live
  
- [ ] **T+15 min**: Post-launch monitoring
  - [ ] Check Sentry for errors
  - [ ] Monitor Vercel analytics
  - [ ] Check Supabase metrics
  - [ ] Test signup flow again
  
- [ ] **T+1 hour**: Announce launch
  - [ ] Post on social media
  - [ ] Send to email list (if you have one)
  - [ ] Post in relevant communities
  - [ ] Share on ProductHunt (optional)

### 15. Launch Day Monitoring
- [ ] Monitor error rates (Sentry)
- [ ] Watch server response times (Vercel)
- [ ] Check database performance (Supabase)
- [ ] Monitor email deliverability
- [ ] Track signup conversion rate
- [ ] Watch social media engagement
- [ ] Respond to any issues immediately
- [ ] Engage with early users

---

## 🔧 Phase 4: Post-Launch (Week 1-2)

### 16. Data Collection & Analysis
- [ ] Review analytics daily:
  - [ ] Pageviews & unique visitors
  - [ ] Bounce rate
  - [ ] Time on site
  - [ ] Conversion rate (visitors → signups)
  - [ ] Traffic sources
- [ ] Track waitlist growth:
  - [ ] Total signups
  - [ ] Daily signup rate
  - [ ] Referral conversion rate
- [ ] Monitor user feedback:
  - [ ] Support emails
  - [ ] Social media mentions
  - [ ] Twitter replies/DMs

### 17. Optimization Iterations
- [ ] A/B test headlines (if needed)
- [ ] Test CTA button colors/text
- [ ] Optimize page load speed
- [ ] Improve mobile experience
- [ ] Test different email sequences
- [ ] Refine referral incentives

### 18. Payment Integration (Before Full Launch)
- [ ] Create Stripe account: https://stripe.com
- [ ] Verify business information
- [ ] Enable subscription products
- [ ] Create subscription tiers:
  - [ ] Bronze (free)
  - [ ] Silver ($4/month)
  - [ ] Gold ($8/month)
  - [ ] Platinum ($20/month)
- [ ] Test payment flow in test mode
- [ ] Set up webhooks for subscription events
- [ ] Configure tax collection (Stripe Tax)
- [ ] Test subscription cancellation flow
- [ ] Go live with live API keys

### 19. Full Platform Deployment
- [ ] Complete user authentication setup
- [ ] Deploy all hub components:
  - [ ] Meditation Hub
  - [ ] Sleep Hub
  - [ ] Nutrition Hub
  - [ ] Study Hub
  - [ ] Childcare Hub
  - [ ] Schedule Hub
- [ ] Test 21-day onboarding flow
- [ ] Verify achievement system working
- [ ] Test template marketplace
- [ ] Deploy audio library
- [ ] Test real-time features

### 20. Scale Preparation
- [ ] Set up database connection pooling
- [ ] Configure Redis caching (Upstash)
- [ ] Optimize database queries
- [ ] Add database indexes for common queries
- [ ] Set up CDN for audio files (BunnyCDN)
- [ ] Configure auto-scaling (Vercel auto-scales)
- [ ] Load test with 1000+ concurrent users
- [ ] Set up backup payment processor (backup)

---

## 📊 Success Metrics

### Week 1 Goals
- [ ] 100+ waitlist signups
- [ ] < 2% error rate
- [ ] < 3s page load time
- [ ] 30%+ referral rate
- [ ] 0 major incidents

### Week 2 Goals
- [ ] 500+ waitlist signups
- [ ] Featured on 1+ platform (ProductHunt, etc.)
- [ ] 20+ social media mentions
- [ ] Email open rate > 40%
- [ ] Site uptime > 99.9%

### Month 1 Goals
- [ ] 2,000+ waitlist signups
- [ ] Launch full platform to first 100 users
- [ ] First paying customers (Founders)
- [ ] NPS score collected
- [ ] User retention > 70%

---

## 🆘 Emergency Contacts & Runbook

### Critical Issues Response Plan

**Site Down:**
1. Check Vercel dashboard for deployment errors
2. Check Supabase status page
3. Review Sentry errors
4. Post status update on Twitter
5. Roll back to previous deployment if needed

**Database Issues:**
1. Check Supabase metrics
2. Review slow queries
3. Check connection pool usage
4. Contact Supabase support (Pro plan)
5. Restore from backup if needed

**Email Issues:**
1. Check ConvertKit deliverability
2. Test with mail-tester.com
3. Check DNS records (SPF, DKIM)
4. Review spam complaints
5. Contact ESP support

**Payment Issues:**
1. Check Stripe dashboard for errors
2. Test payment flow yourself
3. Review webhook logs
4. Contact Stripe support
5. Communicate with affected users

### Support Contacts
- Vercel Support: support@vercel.com
- Supabase Support: https://supabase.com/support
- Stripe Support: https://support.stripe.com
- ConvertKit Support: help@convertkit.com

---

## 🎉 You're Ready to Launch!

### Final Pre-Launch Affirmation
- [ ] All critical systems tested ✅
- [ ] Monitoring in place ✅
- [ ] Backup plan ready ✅
- [ ] Team aligned ✅
- [ ] Excited and ready! ✅

**Remember:**
- Launch is just the beginning
- Iterate based on user feedback
- Monitor closely for first 48 hours
- Engage with every early user
- Have fun! You've built something amazing 🚀

---

## 📚 Quick Reference Links

- **Production Site**: https://modernlife-ai.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **ConvertKit Dashboard**: https://app.convertkit.com
- **Sentry Dashboard**: https://sentry.io
- **Stripe Dashboard**: https://dashboard.stripe.com
- **Analytics**: https://plausible.io/modernlife-ai.app

---

**Need Help?** Review the `LAUNCH_INFRASTRUCTURE_GUIDE.md` for detailed technical setup instructions.

**Good luck! 🍀**
