# 🏗️ Modern Life - Backend Architecture Guide

## 🎯 Overview

This guide provides a complete backend architecture for Modern Life, designed to seamlessly integrate with your existing React/TypeScript frontend while maintaining the spiritual, achievement-based philosophy of the platform.

---

## 📐 Technology Stack Recommendations

### **Option 1: Node.js/Express (Recommended for Full Control)**

**Pros:**
- JavaScript/TypeScript across full stack
- Massive ecosystem
- Easy real-time with Socket.io
- Great for complex business logic

**Tech Stack:**
```
Backend Framework: Express.js + TypeScript
Database: PostgreSQL (primary) + Redis (cache)
ORM: Prisma or TypeORM
Authentication: Passport.js + JWT
File Storage: AWS S3 or Cloudflare R2
Real-time: Socket.io
Email: SendGrid or Resend
Payments: Stripe
Hosting: Railway, Render, or AWS
```

### **Option 2: Supabase (Fastest Time-to-Market)**

**Pros:**
- Backend-as-a-Service (instant setup)
- Built-in auth, database, storage
- Real-time subscriptions
- Auto-generated APIs
- Perfect for MVP/launch

**Tech Stack:**
```
Platform: Supabase (all-in-one)
Database: PostgreSQL (managed)
Auth: Supabase Auth (built-in)
Storage: Supabase Storage (built-in)
Real-time: Supabase Realtime
Functions: Edge Functions (Deno)
Hosting: Included with Supabase
```

### **Option 3: Firebase (Google Ecosystem)**

**Pros:**
- Great real-time database
- Excellent mobile support
- Built-in analytics
- Easy scaling

**Tech Stack:**
```
Platform: Firebase
Database: Firestore
Auth: Firebase Auth
Storage: Firebase Storage
Functions: Cloud Functions
Hosting: Firebase Hosting
Analytics: Firebase Analytics
```

---

## 🏛️ Recommended Architecture: Hybrid Approach

**Best of Both Worlds:**
- **Supabase** for auth, database, storage (fast setup)
- **Custom Node.js API** for complex business logic
- **Redis** for caching and session management
- **AWS S3** for audio files (large media)

```
┌─────────────────────────────────────────────────┐
│            FRONTEND (React/TS)                   │
│  • Modern Life Web App                          │
│  • Mobile App (future)                          │
└───────────────┬─────────────────────────────────┘
                │
                ├──────────────────┬──────────────────┐
                │                  │                  │
┌───────────────▼──────┐ ┌─────────▼───────┐ ┌──────▼──────┐
│   SUPABASE           │ │  CUSTOM API      │ │   STRIPE    │
│  • Auth              │ │  (Node.js/TS)    │ │  • Payments │
│  • PostgreSQL        │ │  • Business      │ │  • Webhooks │
│  • Storage           │ │    Logic         │ └─────────────┘
│  • Real-time         │ │  • Achievements  │
└──────────────────────┘ │  • MP System     │
                         │  • AI Features   │
                         └─────────┬────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
          ┌─────────▼────┐  ┌──────▼─────┐  ┌───▼─────┐
          │    REDIS     │  │  AWS S3    │  │ SendGrid│
          │  • Cache     │  │  • Audio   │  │ • Email │
          │  • Sessions  │  │  • Images  │  └─────────┘
          └──────────────┘  └────────────┘
```

---

## 🗄️ Database Schema Design

### **Core Tables:**

#### **1. Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  
  -- Authentication
  password_hash TEXT, -- If using custom auth
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,
  
  -- Profile
  bio TEXT,
  timezone VARCHAR(50) DEFAULT 'UTC',
  language VARCHAR(10) DEFAULT 'en',
  
  -- Tier System
  current_tier VARCHAR(20) DEFAULT 'Bronze',
  tier_unlocked_at TIMESTAMP DEFAULT NOW(),
  
  -- Mastery Points
  mastery_points INTEGER DEFAULT 0,
  lifetime_mp_earned INTEGER DEFAULT 0,
  
  -- Preferences
  preferences JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{}',
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_completed_at TIMESTAMP,
  onboarding_progress JSONB DEFAULT '{}',
  
  -- Habit Builder (21-day)
  habit_builder_active BOOLEAN DEFAULT FALSE,
  habit_builder_start_date DATE,
  habit_builder_current_day INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  
  -- Soft delete
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tier ON users(current_tier);
CREATE INDEX idx_users_created ON users(created_at);
```

#### **2. Templates Table**
```sql
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- meditation, sleep, nutrition, etc.
  subcategory VARCHAR(50),
  
  -- Content
  content JSONB NOT NULL, -- Flexible schema for different template types
  
  -- Creator
  creator_id UUID REFERENCES users(id),
  is_community_template BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Marketplace
  mp_price INTEGER DEFAULT 0, -- 0 = free
  total_downloads INTEGER DEFAULT 0,
  total_favorites INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2),
  
  -- Access Control
  required_tier VARCHAR(20) DEFAULT 'Bronze',
  is_premium BOOLEAN DEFAULT FALSE,
  
  -- Tags & Search
  tags TEXT[], -- Array of tags
  search_vector tsvector, -- Full-text search
  
  -- Metadata
  difficulty_level VARCHAR(20), -- beginner, intermediate, advanced
  estimated_duration INTEGER, -- in minutes
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_creator ON templates(creator_id);
CREATE INDEX idx_templates_tier ON templates(required_tier);
CREATE INDEX idx_templates_status ON templates(status);
CREATE INDEX idx_templates_tags ON templates USING GIN(tags);
CREATE INDEX idx_templates_search ON templates USING GIN(search_vector);
```

#### **3. Audio Library Table**
```sql
CREATE TABLE audio_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL, -- frequency, guided, ambient, etc.
  
  -- File Info
  file_url TEXT NOT NULL,
  file_size BIGINT, -- bytes
  duration INTEGER, -- seconds
  format VARCHAR(10), -- mp3, wav, etc.
  
  -- Audio Properties
  frequency_hz DECIMAL(10,2), -- For frequency tracks
  binaural_beat BOOLEAN DEFAULT FALSE,
  
  -- Creator & Source
  creator_id UUID REFERENCES users(id),
  is_system_audio BOOLEAN DEFAULT FALSE, -- Built-in vs user-uploaded
  
  -- Marketplace
  mp_price INTEGER DEFAULT 0,
  total_plays INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  total_favorites INTEGER DEFAULT 0,
  
  -- Access Control
  required_tier VARCHAR(20) DEFAULT 'Bronze',
  is_premium BOOLEAN DEFAULT FALSE,
  
  -- Tags & Search
  tags TEXT[],
  search_vector tsvector,
  
  -- Metadata
  mood VARCHAR(50), -- relaxing, energizing, focusing, etc.
  use_case VARCHAR(50), -- meditation, sleep, study, etc.
  
  -- Status
  status VARCHAR(20) DEFAULT 'active',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_audio_category ON audio_files(category);
CREATE INDEX idx_audio_creator ON audio_files(creator_id);
CREATE INDEX idx_audio_frequency ON audio_files(frequency_hz);
CREATE INDEX idx_audio_tags ON audio_files USING GIN(tags);
```

#### **4. Achievements Table**
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255), -- Icon identifier
  category VARCHAR(50), -- meditation, sleep, general, etc.
  
  -- Requirements
  requirement_type VARCHAR(50), -- streak, count, total_time, etc.
  requirement_value INTEGER,
  requirement_details JSONB, -- Additional criteria
  
  -- Rewards
  mp_reward INTEGER DEFAULT 0,
  tier_unlock VARCHAR(20), -- If this unlocks a tier
  feature_unlock TEXT[], -- Array of features unlocked
  
  -- Display
  badge_color VARCHAR(50),
  rarity VARCHAR(20), -- common, rare, epic, legendary
  
  -- Order
  sort_order INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_hidden BOOLEAN DEFAULT FALSE, -- Secret achievements
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **5. User Achievements (Join Table)**
```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  achievement_id UUID REFERENCES achievements(id),
  
  -- Progress
  progress INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_id)
);

-- Indexes
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_completed ON user_achievements(is_completed);
```

#### **6. Hub Activities Table**
```sql
CREATE TABLE hub_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  
  -- Activity Info
  hub_type VARCHAR(50) NOT NULL, -- meditation, sleep, nutrition, etc.
  activity_type VARCHAR(50), -- session, meal, study, etc.
  
  -- Content
  title VARCHAR(255),
  notes TEXT,
  data JSONB DEFAULT '{}', -- Flexible data for different hubs
  
  -- Tracking
  duration_minutes INTEGER,
  completed BOOLEAN DEFAULT TRUE,
  
  -- Date/Time
  activity_date DATE NOT NULL,
  activity_time TIME,
  
  -- Template Reference
  template_id UUID REFERENCES templates(id),
  
  -- Audio Reference
  audio_id UUID REFERENCES audio_files(id),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activities_user ON hub_activities(user_id);
CREATE INDEX idx_activities_hub ON hub_activities(hub_type);
CREATE INDEX idx_activities_date ON hub_activities(activity_date);
CREATE INDEX idx_activities_template ON hub_activities(template_id);
```

#### **7. Marketplace Transactions Table**
```sql
CREATE TABLE marketplace_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Parties
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  
  -- Item
  item_type VARCHAR(50), -- template, audio
  item_id UUID NOT NULL,
  
  -- Transaction
  mp_amount INTEGER NOT NULL,
  transaction_type VARCHAR(50), -- purchase, tip, gift
  
  -- Status
  status VARCHAR(20) DEFAULT 'completed', -- pending, completed, refunded
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_buyer ON marketplace_transactions(buyer_id);
CREATE INDEX idx_transactions_seller ON marketplace_transactions(seller_id);
CREATE INDEX idx_transactions_item ON marketplace_transactions(item_id);
```

#### **8. User Favorites Table**
```sql
CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  
  -- Item Reference
  item_type VARCHAR(50), -- template, audio
  item_id UUID NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, item_type, item_id)
);

-- Indexes
CREATE INDEX idx_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_favorites_item ON user_favorites(item_id);
```

#### **9. Reviews/Ratings Table**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Reviewer
  user_id UUID REFERENCES users(id),
  
  -- Item
  item_type VARCHAR(50), -- template, audio
  item_id UUID NOT NULL,
  
  -- Review
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  
  -- Engagement
  helpful_count INTEGER DEFAULT 0,
  
  -- Status
  is_verified BOOLEAN DEFAULT FALSE, -- Verified purchase
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'active', -- active, hidden, flagged
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, item_type, item_id)
);

-- Indexes
CREATE INDEX idx_reviews_item ON reviews(item_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
```

#### **10. Notifications Table**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  
  -- Notification
  type VARCHAR(50), -- achievement, mp_earned, tier_up, etc.
  title VARCHAR(255),
  message TEXT,
  
  -- Action
  action_url TEXT,
  action_label VARCHAR(100),
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);
```

---

## 🔐 Authentication & Authorization

### **JWT Token Structure:**

```typescript
interface JWTPayload {
  userId: string;
  email: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  iat: number; // Issued at
  exp: number; // Expiry
}
```

### **Tier-Based Access Control:**

```typescript
// Middleware example
const tierLevels = {
  Bronze: 0,
  Silver: 1,
  Gold: 2,
  Platinum: 3,
  Diamond: 4,
};

function requireTier(minTier: string) {
  return (req, res, next) => {
    const userTier = req.user.tier;
    if (tierLevels[userTier] >= tierLevels[minTier]) {
      next();
    } else {
      res.status(403).json({ error: 'Insufficient tier access' });
    }
  };
}

// Usage
app.post('/api/templates/create', requireTier('Bronze'), createTemplate);
app.post('/api/ai/generate', requireTier('Platinum'), generateAI);
```

---

## 📡 API Endpoints Design

### **Authentication Endpoints:**

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/verify-email
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

### **User Endpoints:**

```
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id
GET    /api/users/:id/achievements
GET    /api/users/:id/activities
GET    /api/users/:id/stats
PATCH  /api/users/:id/preferences
```

### **Template Endpoints:**

```
GET    /api/templates                # List/search
GET    /api/templates/:id            # Get one
POST   /api/templates                # Create (Bronze+)
PATCH  /api/templates/:id            # Update own
DELETE /api/templates/:id            # Delete own
POST   /api/templates/:id/favorite   # Toggle favorite
POST   /api/templates/:id/download   # Download (MP transaction)
GET    /api/templates/my             # My templates
GET    /api/templates/favorites      # My favorites
```

### **Audio Endpoints:**

```
GET    /api/audio                    # List/search
GET    /api/audio/:id                # Get one
POST   /api/audio                    # Upload (Platinum+)
PATCH  /api/audio/:id                # Update own
DELETE /api/audio/:id                # Delete own
POST   /api/audio/:id/favorite       # Toggle favorite
POST   /api/audio/:id/play           # Track play count
GET    /api/audio/my                 # My uploads
GET    /api/audio/favorites          # My favorites
```

### **Hub Activity Endpoints:**

```
GET    /api/activities/:hub          # Get hub activities
POST   /api/activities/:hub          # Log activity
PATCH  /api/activities/:id           # Update activity
DELETE /api/activities/:id           # Delete activity
GET    /api/activities/stats/:hub    # Hub statistics
```

### **Achievement Endpoints:**

```
GET    /api/achievements             # All achievements
GET    /api/achievements/my          # My achievements
GET    /api/achievements/:id         # Get one
POST   /api/achievements/check       # Check/claim achievements
```

### **Marketplace Endpoints:**

```
GET    /api/marketplace              # Browse marketplace
GET    /api/marketplace/featured     # Featured items
POST   /api/marketplace/purchase     # Purchase with MP
GET    /api/marketplace/my-sales     # My sales
GET    /api/marketplace/earnings     # My earnings
```

### **Mastery Points Endpoints:**

```
GET    /api/mastery-points/balance   # Current balance
GET    /api/mastery-points/history   # Transaction history
POST   /api/mastery-points/redeem    # Redeem for discount
GET    /api/mastery-points/leaderboard # Top earners
```

---

## 🚀 Next Steps

Continue to the following documents for detailed implementation:

1. **[BACKEND_IMPLEMENTATION.md](./BACKEND_IMPLEMENTATION.md)** - Step-by-step setup
2. **[BACKEND_API_REFERENCE.md](./BACKEND_API_REFERENCE.md)** - Complete API docs
3. **[BACKEND_SUPABASE_SETUP.md](./BACKEND_SUPABASE_SETUP.md)** - Supabase quick start
4. **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - Frontend integration

---

**Your backend architecture is ready to bring Modern Life to life!** 🚀
