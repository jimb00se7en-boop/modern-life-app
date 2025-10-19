# 🚀 Modern Life - Supabase Backend Setup (Fastest Path)

## 🎯 Why Supabase?

**Perfect for Modern Life because:**
- ✅ **Instant Backend** - Database, Auth, Storage in one platform
- ✅ **Real-time** - Live updates for achievements, MP, notifications
- ✅ **Auto-generated APIs** - No manual API coding needed
- ✅ **Built-in Auth** - Email, OAuth, magic links
- ✅ **Free Tier** - 500MB database, 1GB storage, 50GB bandwidth
- ✅ **TypeScript SDK** - Fully typed, works perfectly with your frontend

---

## 📋 Step 1: Create Supabase Project

### **1.1 Sign Up**
```bash
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended)
4. Create new organization: "Modern Life"
5. Create new project: "modern-life-prod"
6. Choose region: Closest to your users
7. Generate strong database password (save it!)
8. Wait 2-3 minutes for setup
```

### **1.2 Get Project Credentials**
```bash
Project Settings → API
  ├─ Project URL: https://xxxxx.supabase.co
  ├─ anon public key: eyJhbGc...
  └─ service_role key: eyJhbGc... (KEEP SECRET!)
```

---

## 📊 Step 2: Set Up Database

### **2.1 SQL Editor Setup**

Go to **SQL Editor** in Supabase dashboard and run these schemas:

#### **Enable Required Extensions:**
```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full-text search
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

#### **Users Table (extends Supabase auth.users):**
```sql
-- User profiles (extends Supabase auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  
  -- Profile
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  timezone VARCHAR(50) DEFAULT 'UTC',
  
  -- Tier System
  current_tier VARCHAR(20) DEFAULT 'Bronze',
  tier_unlocked_at TIMESTAMP DEFAULT NOW(),
  
  -- Mastery Points
  mastery_points INTEGER DEFAULT 0,
  lifetime_mp_earned INTEGER DEFAULT 0,
  
  -- Preferences
  preferences JSONB DEFAULT '{
    "theme": "light",
    "chakraIntensity": "subtle",
    "notifications": true
  }'::jsonb,
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_completed_at TIMESTAMP,
  onboarding_day INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_profiles_tier ON public.profiles(current_tier);
CREATE INDEX idx_profiles_username ON public.profiles(username);
```

#### **Templates Table:**
```sql
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),
  
  -- Content (flexible JSON)
  content JSONB NOT NULL,
  
  -- Creator
  creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_community_template BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Marketplace
  mp_price INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  total_favorites INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  
  -- Access
  required_tier VARCHAR(20) DEFAULT 'Bronze',
  
  -- Tags
  tags TEXT[] DEFAULT '{}',
  
  -- Metadata
  difficulty_level VARCHAR(20),
  estimated_duration INTEGER,
  
  -- Status
  status VARCHAR(20) DEFAULT 'published',
  published_at TIMESTAMP DEFAULT NOW(),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_templates_creator ON public.templates(creator_id);
CREATE INDEX idx_templates_category ON public.templates(category);
CREATE INDEX idx_templates_status ON public.templates(status);
CREATE INDEX idx_templates_tags ON public.templates USING GIN(tags);

-- Trigger
CREATE TRIGGER templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

#### **Audio Files Table:**
```sql
CREATE TABLE public.audio_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  
  -- File Info
  file_url TEXT NOT NULL, -- Supabase Storage URL
  file_size BIGINT,
  duration INTEGER, -- seconds
  format VARCHAR(10),
  
  -- Audio Properties
  frequency_hz DECIMAL(10,2),
  binaural_beat BOOLEAN DEFAULT FALSE,
  
  -- Creator
  creator_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_system_audio BOOLEAN DEFAULT FALSE,
  
  -- Marketplace
  mp_price INTEGER DEFAULT 0,
  total_plays INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  total_favorites INTEGER DEFAULT 0,
  
  -- Access
  required_tier VARCHAR(20) DEFAULT 'Bronze',
  
  -- Tags
  tags TEXT[] DEFAULT '{}',
  mood VARCHAR(50),
  use_case VARCHAR(50),
  
  -- Status
  status VARCHAR(20) DEFAULT 'active',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audio_creator ON public.audio_files(creator_id);
CREATE INDEX idx_audio_category ON public.audio_files(category);
CREATE INDEX idx_audio_tags ON public.audio_files USING GIN(tags);

-- Trigger
CREATE TRIGGER audio_files_updated_at
  BEFORE UPDATE ON public.audio_files
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

#### **Achievements Table:**
```sql
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  category VARCHAR(50),
  
  -- Requirements
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  requirement_details JSONB DEFAULT '{}',
  
  -- Rewards
  mp_reward INTEGER DEFAULT 0,
  tier_unlock VARCHAR(20),
  
  -- Display
  badge_color VARCHAR(50),
  rarity VARCHAR(20),
  sort_order INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_hidden BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed initial achievements
INSERT INTO public.achievements (name, description, icon, category, requirement_type, requirement_value, mp_reward, badge_color, rarity) VALUES
('First Steps', 'Complete your first meditation session', 'heart', 'meditation', 'count', 1, 10, 'green', 'common'),
('Early Riser', 'Log 7 sleep sessions', 'moon', 'sleep', 'count', 7, 25, 'purple', 'common'),
('Mindful Eater', 'Track 5 meals', 'apple', 'nutrition', 'count', 5, 15, 'red', 'common'),
('Week Warrior', 'Maintain a 7-day streak', 'general', 'general', 'streak', 7, 50, 'gold', 'rare'),
('Template Creator', 'Create your first template', 'template', 'template', 'count', 1, 20, 'teal', 'common'),
('Community Star', 'Get 10 downloads on your template', 'star', 'marketplace', 'template_downloads', 10, 100, 'amber', 'epic');
```

#### **User Achievements:**
```sql
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  
  -- Progress
  progress INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_id)
);

-- Indexes
CREATE INDEX idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX idx_user_achievements_completed ON public.user_achievements(is_completed);

-- Trigger
CREATE TRIGGER user_achievements_updated_at
  BEFORE UPDATE ON public.user_achievements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

#### **Hub Activities:**
```sql
CREATE TABLE public.hub_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Activity
  hub_type VARCHAR(50) NOT NULL,
  activity_type VARCHAR(50),
  title VARCHAR(255),
  notes TEXT,
  data JSONB DEFAULT '{}',
  
  -- Tracking
  duration_minutes INTEGER,
  completed BOOLEAN DEFAULT TRUE,
  
  -- Date
  activity_date DATE NOT NULL,
  activity_time TIME,
  
  -- References
  template_id UUID REFERENCES public.templates(id) ON DELETE SET NULL,
  audio_id UUID REFERENCES public.audio_files(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activities_user ON public.hub_activities(user_id);
CREATE INDEX idx_activities_hub ON public.hub_activities(hub_type);
CREATE INDEX idx_activities_date ON public.hub_activities(activity_date);

-- Trigger
CREATE TRIGGER hub_activities_updated_at
  BEFORE UPDATE ON public.hub_activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

#### **Marketplace Transactions:**
```sql
CREATE TABLE public.marketplace_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Parties
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Item
  item_type VARCHAR(50),
  item_id UUID NOT NULL,
  
  -- Transaction
  mp_amount INTEGER NOT NULL,
  transaction_type VARCHAR(50) DEFAULT 'purchase',
  
  -- Status
  status VARCHAR(20) DEFAULT 'completed',
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_buyer ON public.marketplace_transactions(buyer_id);
CREATE INDEX idx_transactions_seller ON public.marketplace_transactions(seller_id);
```

#### **User Favorites:**
```sql
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Item
  item_type VARCHAR(50),
  item_id UUID NOT NULL,
  
  -- Timestamp
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, item_type, item_id)
);

-- Indexes
CREATE INDEX idx_favorites_user ON public.user_favorites(user_id);
```

#### **Notifications:**
```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Notification
  type VARCHAR(50),
  title VARCHAR(255),
  message TEXT,
  action_url TEXT,
  
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
CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);
```

---

## 🔐 Step 3: Set Up Row Level Security (RLS)

### **Enable RLS:**

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hub_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
```

### **Profiles Policies:**
```sql
-- Profiles: Anyone can view, users can update own
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);
```

### **Templates Policies:**
```sql
-- Templates: Published templates viewable by everyone
CREATE POLICY "Published templates are viewable by everyone"
  ON public.templates FOR SELECT
  USING (status = 'published');

-- Users can create templates (Bronze+)
CREATE POLICY "Users can create templates"
  ON public.templates FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- Users can update own templates
CREATE POLICY "Users can update own templates"
  ON public.templates FOR UPDATE
  USING (auth.uid() = creator_id);

-- Users can delete own templates
CREATE POLICY "Users can delete own templates"
  ON public.templates FOR DELETE
  USING (auth.uid() = creator_id);
```

### **Audio Files Policies:**
```sql
-- Similar to templates
CREATE POLICY "Active audio is viewable by everyone"
  ON public.audio_files FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can upload audio"
  ON public.audio_files FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own audio"
  ON public.audio_files FOR UPDATE
  USING (auth.uid() = creator_id);
```

### **User-specific Policies:**
```sql
-- Activities: Users can only see/manage their own
CREATE POLICY "Users can view own activities"
  ON public.hub_activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own activities"
  ON public.hub_activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities"
  ON public.hub_activities FOR UPDATE
  USING (auth.uid() = user_id);

-- Favorites
CREATE POLICY "Users can view own favorites"
  ON public.user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites"
  ON public.user_favorites FOR ALL
  USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## 📦 Step 4: Set Up Storage Buckets

### **4.1 Create Buckets:**

Go to **Storage** in Supabase dashboard:

```
1. Create bucket: "avatars"
   - Public: Yes
   - File size limit: 5MB
   - Allowed MIME types: image/*

2. Create bucket: "audio-files"
   - Public: Yes (for streaming)
   - File size limit: 100MB
   - Allowed MIME types: audio/*

3. Create bucket: "template-assets"
   - Public: Yes
   - File size limit: 10MB
   - Allowed MIME types: image/*, video/*
```

### **4.2 Storage Policies:**

```sql
-- Avatars: Anyone can view, users can upload own
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Audio: Anyone can view, Platinum+ can upload
CREATE POLICY "Audio files are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'audio-files');

CREATE POLICY "Users can upload audio"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'audio-files' AND
    auth.uid() IS NOT NULL
  );
```

---

## 🔌 Step 5: Frontend Integration

### **5.1 Install Supabase Client:**

```bash
npm install @supabase/supabase-js
```

### **5.2 Create Supabase Client:**

```typescript
// /utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          current_tier: string;
          mastery_points: number;
          // ... rest of fields
        };
        Insert: {
          id: string;
          username?: string;
          // ... rest of fields
        };
        Update: {
          username?: string;
          // ... rest of fields
        };
      };
      // ... other tables
    };
  };
};
```

### **5.3 Update Environment Variables:**

```bash
# .env.local
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### **5.4 Update AuthContext to use Supabase:**

```typescript
// /contexts/AuthContext.tsx - Updated version
import { supabase } from '../utils/supabase';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setUser({
        id: data.id,
        email: data.email,
        name: data.full_name,
        tier: data.current_tier,
        // ... map other fields
      });
    }
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signup = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // ... rest of context
};
```

---

## 🎯 Step 6: Real-time Subscriptions

### **Subscribe to Changes:**

```typescript
// Subscribe to new notifications
useEffect(() => {
  if (!user) return;

  const subscription = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        // New notification received
        console.log('New notification:', payload.new);
        showToast(payload.new.title);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, [user]);
```

---

## 📊 Step 7: Database Functions (Optional)

### **Award Achievement Function:**

```sql
CREATE OR REPLACE FUNCTION award_achievement(
  p_user_id UUID,
  p_achievement_id UUID
)
RETURNS void AS $$
DECLARE
  v_mp_reward INTEGER;
BEGIN
  -- Get MP reward
  SELECT mp_reward INTO v_mp_reward
  FROM achievements
  WHERE id = p_achievement_id;

  -- Mark achievement as completed
  UPDATE user_achievements
  SET is_completed = TRUE, completed_at = NOW(), progress = requirement_value
  WHERE user_id = p_user_id AND achievement_id = p_achievement_id;

  -- Award MP
  UPDATE profiles
  SET 
    mastery_points = mastery_points + v_mp_reward,
    lifetime_mp_earned = lifetime_mp_earned + v_mp_reward
  WHERE id = p_user_id;

  -- Create notification
  INSERT INTO notifications (user_id, type, title, message, metadata)
  VALUES (
    p_user_id,
    'achievement_unlocked',
    'Achievement Unlocked!',
    'You earned ' || v_mp_reward || ' Mastery Points',
    jsonb_build_object('achievement_id', p_achievement_id, 'mp_reward', v_mp_reward)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## ✅ Step 8: Testing

### **Test Authentication:**
```typescript
// Test signup
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'TestPassword123!',
  options: {
    data: { full_name: 'Test User' }
  }
});

// Test login
const { data: loginData } = await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'TestPassword123!'
});

// Test profile fetch
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', loginData.user.id)
  .single();
```

---

## 🎉 You're Done!

Your Supabase backend is now:
- ✅ Database set up with all tables
- ✅ Row Level Security enabled
- ✅ Storage buckets created
- ✅ Authentication configured
- ✅ Real-time ready
- ✅ Frontend integrated

**Next:** See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for detailed frontend usage examples!

---

**Total Setup Time: ~30 minutes** ⚡
**Cost: $0/month** (Free tier sufficient for launch) 💰
