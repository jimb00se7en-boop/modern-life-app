# 🔄 Template System - User Flow Diagrams

## 🎯 Template Creation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER LANDS ON DASHBOARD                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │  Click "Templates"    │
         │  in Sidebar           │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   Templates Hub       │
         │   Opens               │
         └───────────┬───────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  Free Tier      │    │  Bronze+ Tier   │
│  User           │    │  User           │
└────────┬────────┘    └────────┬────────┘
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│ Browse Tab      │    │ Can Access All  │
│ Only            │    │ 3 Tabs          │
├─────────────────┤    ├─────────────────┤
│ ✅ View         │    │ ✅ Browse       │
│ ✅ Search       │    │ ✅ My Templates │
│ ✅ Use          │    │ ✅ Create New   │
│ ❌ Create       │    └────────┬────────┘
└────────┬────────┘             │
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│ See Locked      │    │ Click "Create   │
│ Message         │    │ New" Button     │
├─────────────────┤    └────────┬────────┘
│ 🔒 "Unlock at   │             │
│ Bronze tier"    │             ▼
├─────────────────┤    ┌─────────────────┐
│ "View           │    │ Template        │
│ Achievements"   │    │ Creator Opens   │
└─────────────────┘    └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ 3-Tab Interface │
                       ├─────────────────┤
                       │ 1. Basic Info   │
                       │ 2. Steps        │
                       │ 3. Advanced     │
                       └────────┬────────┘
                                │
                                ▼
                  ┌─────────────────────────┐
                  │   Fill Basic Info       │
                  ├─────────────────────────┤
                  │ • Title                 │
                  │ • Description           │
                  │ • Category              │
                  │ • Difficulty            │
                  │ • Tags                  │
                  └────────┬────────────────┘
                           │
                           ▼
                  ┌─────────────────────────┐
                  │   Add Steps             │
                  ├─────────────────────────┤
                  │ For each step:          │
                  │ • Title                 │
                  │ • Description           │
                  │ • Duration              │
                  │ • Icon/Emoji            │
                  │ • Optional?             │
                  └────────┬────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
    ┌────────┐      ┌──────────┐      ┌──────────┐
    │ Bronze │      │ Premium  │      │ Platinum │
    │ Max: 5 │      │ Max: 15  │      │ Max: ∞   │
    └────┬───┘      └─────┬────┘      └─────┬────┘
         │                │                  │
         │                ▼                  │
         │        ┌──────────────┐           │
         │        │ + Scheduling │           │
         │        │   Features   │           │
         │        └──────────────┘           │
         │                                   │
         │                                   ▼
         │                          ┌────────────────┐
         │                          │ + AI Features  │
         │                          │ "Generate      │
         │                          │  Suggestion"   │
         │                          └────────────────┘
         │                                   │
         └────────────────┬──────────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Preview         │
                 │ Template        │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Validation      │
                 ├─────────────────┤
                 │ ✓ Title filled? │
                 │ ✓ Description?  │
                 │ ✓ Steps > 0?    │
                 │ ✓ All steps OK? │
                 └────────┬────────┘
                          │
                  ┌───────┴────────┐
                  │                │
            Errors│                │Valid
                  ▼                ▼
         ┌─────────────┐  ┌─────────────┐
         │ Show Error  │  │ Save        │
         │ Messages    │  │ Template    │
         └─────────────┘  └──────┬──────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ Go to           │
                        │ "My Templates"  │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ Achievement     │
                        │ Unlocked!       │
                        ├─────────────────┤
                        │ 📝 Template     │
                        │    Creator      │
                        │ +100 MP 🎁      │
                        └─────────────────┘
```

---

## 💎 Mastery Points Earning Flow

```
┌──────────────────────────────────────────────────────┐
│         USER CREATES & SAVES TEMPLATE                │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ Template appears in  │
         │ Community Marketplace│
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ Other users discover │
         │ and download         │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ Downloads tracked    │
         │ Every 10 = +1 MP     │
         └──────────┬───────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
    ▼               ▼               ▼
┌────────┐    ┌──────────┐    ┌──────────┐
│100 DLs │    │ 500 DLs  │    │ 1,000 DLs│
│        │    │          │    │          │
│ +10 MP │    │ +50 MP   │    │ +100 MP  │
└────────┘    └──────────┘    └─────┬────┘
                                    │
                                    ▼
                          ┌──────────────────┐
                          │ 1,000+ downloads │
                          │ Achievement!     │
                          ├──────────────────┤
                          │ ⭐ Template      │
                          │    Master        │
                          │ +500 MP Bonus! 🎉│
                          └──────────────────┘
                                    │
                                    ▼
         ┌──────────────────────────────────────┐
         │ Users rate template                   │
         └──────────┬───────────────────────────┘
                    │
        ┌───────────┴────────────┐
        │                        │
        ▼                        ▼
┌───────────────┐      ┌─────────────────┐
│ Rating < 4.5  │      │ Rating ≥ 4.5    │
│               │      │                 │
│ No bonus      │      │ +100 MP Bonus!  │
└───────────────┘      └────────┬────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │ 100+ reviews?         │
                    └───────┬───────────────┘
                            │
                    ┌───────┴────────┐
                    │                │
                    ▼                ▼
            ┌──────────┐     ┌──────────────┐
            │ No       │     │ Yes          │
            │          │     │              │
            │ No bonus │     │ +50 MP Bonus!│
            └──────────┘     └──────────────┘
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │ TOTAL CALCULATION     │
                        ├───────────────────────┤
                        │ Downloads: +100 MP    │
                        │ Rating:    +100 MP    │
                        │ Reviews:   +50 MP     │
                        │ Achievement: +500 MP  │
                        ├───────────────────────┤
                        │ TOTAL:     750 MP! 💰 │
                        └───────────────────────┘
```

---

## 🔓 Tier Unlock Progression

```
┌──────────────────────────────────────────────────────┐
│                  FREE TIER (0 MP)                    │
├──────────────────────────────────────────────────────┤
│ ✅ Browse all templates                              │
│ ✅ Use templates in schedule                         │
│ ✅ See tier progression                              │
│ ❌ Cannot create templates                           │
└────────────────────┬─────────────────────────────────┘
                     │
                     │ Complete activities
                     │ Earn Mastery Points
                     ▼
┌──────────────────────────────────────────────────────┐
│              BRONZE TIER (1,000 MP) 🎯               │
├──────────────────────────────────────────────────────┤
│ ✅ All Free features +                               │
│ ✅ CREATE TEMPLATES (up to 5 steps)                  │
│ ✅ Share in marketplace                              │
│ ✅ Earn MP from downloads                            │
│ ❌ No scheduling automation                          │
│ ❌ No AI features                                    │
└────────────────────┬─────────────────────────────────┘
                     │
                     │ Create templates
                     │ Earn from downloads
                     │ Complete achievements
                     ▼
┌──────────────────────────────────────────────────────┐
│             PREMIUM TIER (2,000 MP) 📝               │
├──────────────────────────────────────────────────────┤
│ ✅ All Bronze features +                             │
│ ✅ CREATE TEMPLATES (up to 15 steps)                 │
│ ✅ Scheduling automation                             │
│   • Daily/Weekly/Custom frequency                    │
│   • Set time of day                                  │
│   • Enable reminders                                 │
│ ✅ Premium marketplace placement                     │
│ ❌ No AI features                                    │
└────────────────────┬─────────────────────────────────┘
                     │
                     │ Create advanced templates
                     │ High download counts
                     │ Top ratings
                     ▼
┌──────────────────────────────────────────────────────┐
│            PLATINUM TIER (5,000 MP) ✨               │
├──────────────────────────────────────────────────────┤
│ ✅ All Premium features +                            │
│ ✅ CREATE TEMPLATES (UNLIMITED steps)                │
│ ✅ AI-POWERED FEATURES:                              │
│   • Generate step suggestions                        │
│   • Optimize durations                               │
│   • Recommend frequencies                            │
│   • Smart timing advice                              │
│ ✅ Highest MP earning multiplier                     │
│ ✅ Featured creator badge                            │
│ ✅ Early access to new features                      │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 Achievement Unlocking Flow

```
                    ┌──────────────────┐
                    │ User creates     │
                    │ first template   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ ✅ UNLOCKED!     │
                    ├──────────────────┤
                    │ 📝 Template      │
                    │    Creator       │
                    │                  │
                    │ +100 MP 🎁       │
                    └────────┬─────────┘
                             │
                             ▼
         ┌───────────────────────────────────┐
         │ User continues creating...        │
         └────────┬──────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌────────┐   ┌────────┐   ┌────────┐
│Template│   │Template│   │Template│
│   #2   │   │   #3   │   │   #4   │
└────────┘   └────────┘   └────────┘
    │             │             │
    └─────────────┼─────────────┘
                  │
                  ▼ (5 templates shared)
         ┌──────────────────┐
         │ ✅ UNLOCKED!     │
         ├──────────────────┤
         │ 🤝 Community     │
         │    Contributor   │
         │                  │
         │ +250 MP 🎁       │
         └────────┬─────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │ Templates gain popularity   │
    └────────┬────────────────────┘
             │
    ┌────────┼────────┐
    │        │        │
    ▼        ▼        ▼
┌────────┐┌────────┐┌────────┐
│200 DLs ││ 400 DLs││ 600 DLs│
└────────┘└────────┘└────────┘
    │        │        │
    └────────┼────────┘
             │
             ▼ (1,000+ total downloads)
    ┌──────────────────┐
    │ ✅ UNLOCKED!     │
    ├──────────────────┤
    │ ⭐ Template      │
    │    Master        │
    │                  │
    │ +500 MP 🎁       │
    └──────────────────┘
```

---

## 🔄 Community Engagement Loop

```
        ┌─────────────────────────────────┐
        │  USER CREATES TEMPLATE          │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Shares in Marketplace          │
        └────────────┬────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌───────┐   ┌───────┐   ┌───────┐
    │User A │   │User B │   │User C │
    │sees it│   │sees it│   │sees it│
    └───┬───┘   └───┬───┘   └───┬───┘
        │           │           │
        ▼           ▼           ▼
    ┌───────┐   ┌───────┐   ┌───────┐
    │Downloads  │Downloads  │Downloads
    │Uses it│   │Uses it│   │Uses it│
    └───┬───┘   └───┬───┘   └───┬───┘
        │           │           │
        └───────────┼───────────┘
                    │
                    ▼
        ┌─────────────────────────────────┐
        │  Creator earns MP               │
        └────────────┬────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌───────┐   ┌───────┐   ┌───────┐
    │User A │   │User B │   │User C │
    │rates  │   │rates  │   │rates  │
    │ ⭐⭐⭐⭐⭐ │   │ ⭐⭐⭐⭐  │   │ ⭐⭐⭐⭐⭐ │
    └───┬───┘   └───┬───┘   └───┬───┘
        │           │           │
        └───────────┼───────────┘
                    │
                    ▼
        ┌─────────────────────────────────┐
        │  High rating = Bonus MP!        │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Creator unlocks next tier      │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Creates even better templates  │
        └────────────┬────────────────────┘
                     │
                     ▼
            [LOOP CONTINUES] 🔄
```

---

## 📱 Mobile Navigation Flow

```
┌──────────────────────────────────────┐
│         MOBILE DASHBOARD             │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Tap ☰ (Menu Icon)                  │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Mobile Sidebar Opens                │
├──────────────────────────────────────┤
│  • Dashboard                         │
│  • Meditation                        │
│  • Sleep                             │
│  • Audio Library                     │
│  • Schedule                          │
│  • Nutrition                         │
│  • Childcare                         │
│  • Study                             │
│  • 📝 Templates ← TAP THIS          │
│  • Marketplace                       │
│  • Mastery Points                    │
└────────────┬─────────────────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│  Templates Hub (Mobile View)         │
├──────────────────────────────────────┤
│  [Browse] [My Templates] [Create]    │
│                                      │
│  🔍 Search...                        │
│  🏷️ [All Categories ▼]              │
│                                      │
│  Popular This Week                   │
│  ┌──────────────────┐                │
│  │ Template Card    │                │
│  └──────────────────┘                │
│  ┌──────────────────┐                │
│  │ Template Card    │                │
│  └──────────────────┘                │
└──────────────────────────────────────┘
```

---

## 🎨 Template Preview Flow

```
        ┌─────────────────────────┐
        │ User browsing templates │
        └───────────┬─────────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │ Clicks template card    │
        └───────────┬─────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│       TEMPLATE DETAIL VIEW               │
├──────────────────────────────────────────┤
│  📝 Morning Mindfulness Routine          │
│  by Sarah Chen              ⭐ 4.8       │
│  [Meditation] [Beginner] [✨ AI]         │
│                                          │
│  "30-minute morning routine combining    │
│   meditation, breathwork, journaling..." │
│                                          │
│  ⏱️ 30 min  📥 1,847  💬 234 reviews    │
│                                          │
│  [Use This Template] [Share]             │
├──────────────────────────────────────────┤
│  Template Steps:                         │
│                                          │
│  ┌────────────────────────────┐          │
│  │ 1. Wake-Up Stretch    5min │          │
│  │ 🧘 Gentle full-body...     │          │
│  └────────────────────────────┘          │
│                                          │
│  ┌────────────────────────────┐          │
│  │ 2. Breathing          5min │          │
│  │ 🌬️ 4-7-8 technique...     │          │
│  │ 💡 AI: Try Delta Waves     │          │
│  └────────────────────────────┘          │
│                                          │
│  ┌────────────────────────────┐          │
│  │ 3. Meditation        15min │          │
│  │ 🧠 Body scan meditation... │          │
│  └────────────────────────────┘          │
│                                          │
│  ┌────────────────────────────┐          │
│  │ 4. Journaling         5min │          │
│  │ 📝 Write 3 things...       │          │
│  │ (Optional)                 │          │
│  └────────────────────────────┘          │
├──────────────────────────────────────────┤
│  Creator Info:                           │
│  👤 Sarah Chen                           │
│  💎 Earned 920 MP from this template     │
└──────────────────────────────────────────┘
```

---

## 🎁 Success Indicators

```
        USER JOURNEY METRICS
        
Day 1  ─┐  Sign up, complete onboarding
        │  Earn 500 MP from activities
        │
Day 3  ─┤  Hit 1,000 MP
        │  🔓 BRONZE TIER UNLOCKED
        │  Template Creator available!
        │
Day 5  ─┤  Create first template
        │  🎉 +100 MP Achievement
        │  Total: 1,600 MP
        │
Day 10 ─┤  Template gets 50 downloads
        │  💰 +5 MP earned
        │  Total: 1,605 MP
        │
Day 15 ─┤  Template hits 4.8 rating
        │  ⭐ +100 MP Rating Bonus
        │  Total: 1,705 MP
        │
Day 20 ─┤  Create 4 more templates
        │  🤝 +250 MP Achievement
        │  Total: 2,055 MP
        │  🔓 PREMIUM TIER UNLOCKED
        │
Day 30 ─┤  Advanced templates with scheduling
        │  All templates: 500 downloads
        │  💰 +50 MP from downloads
        │  Total: 2,205 MP
        │
Day 60 ─┤  Templates hit 1,000+ downloads
        │  ⭐ +500 MP Template Master
        │  Total: 2,805 MP
        │  Working toward PLATINUM!
```

---

## 📊 Analytics Dashboard (Future)

```
┌──────────────────────────────────────────────────┐
│         MY TEMPLATE ANALYTICS                    │
├──────────────────────────────────────────────────┤
│                                                  │
│  Total Templates Created:           12           │
│  Total Downloads:                   2,847        │
│  Average Rating:                    4.7 ⭐       │
│  Total MP Earned:                   1,450 💎     │
│                                                  │
│  ┌────────────────────────────────────────┐      │
│  │ Top Performing Template:               │      │
│  │ "Morning Mindfulness Routine"          │      │
│  │ 📥 1,847 downloads                     │      │
│  │ ⭐ 4.8 rating                          │      │
│  │ 💎 920 MP earned                       │      │
│  └────────────────────────────────────────┘      │
│                                                  │
│  Recent Downloads (Last 7 days):                 │
│  ─────────────────────────────                   │
│  Mon  ███████ 35                                 │
│  Tue  █████ 25                                   │
│  Wed  ████████ 40                                │
│  Thu  ██████ 28                                  │
│  Fri  ████████████ 55                            │
│  Sat  ██████████ 45                              │
│  Sun  ███████ 32                                 │
│                                                  │
│  Category Distribution:                          │
│  Meditation    ████████ 40%                      │
│  Sleep         ██████ 30%                        │
│  Study         ████ 20%                          │
│  General       ██ 10%                            │
└──────────────────────────────────────────────────┘
```

---

**All flows fully integrated and ready to drive community engagement!** 🚀
