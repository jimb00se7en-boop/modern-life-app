# ⚡ Modern Life Backend - Quick Start Guide

## 🎯 Choose Your Path

### **Path 1: Supabase (Recommended for MVP)**
**Time: 30 minutes | Cost: Free**

✅ Perfect if you want to launch ASAP
✅ All-in-one solution (auth, database, storage)
✅ No backend code to write
✅ Auto-scaling

👉 **Follow: [BACKEND_SUPABASE_SETUP.md](./BACKEND_SUPABASE_SETUP.md)**

### **Path 2: Custom Node.js API**
**Time: 2-3 days | Cost: $5-20/month**

✅ Full control over business logic
✅ Custom achievement system
✅ Complex MP calculations
✅ Custom AI integrations

👉 **Follow: [BACKEND_CUSTOM_SETUP.md](./BACKEND_CUSTOM_SETUP.md)**

### **Path 3: Hybrid (Best Long-term)**
**Time: 1-2 days | Cost: $10-30/month**

✅ Supabase for data & auth
✅ Custom API for business logic
✅ Best of both worlds

👉 **Follow: [BACKEND_HYBRID_SETUP.md](./BACKEND_HYBRID_SETUP.md)**

---

## 🚀 Fastest Setup (Supabase)

### **1. Create Supabase Project (5 min)**

```bash
1. Go to https://supabase.com
2. Sign up with GitHub
3. Create project: "modern-life-prod"
4. Save your credentials:
   - Project URL
   - anon (public) key
   - service_role (secret) key
```

### **2. Run Database Setup (5 min)**

In Supabase SQL Editor, copy/paste and run:

```sql
-- 1. Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Run the full schema from BACKEND_SUPABASE_SETUP.md
-- (All the CREATE TABLE statements)

-- 3. Enable Row Level Security
-- (All the RLS policies)

-- 4. Create storage buckets
-- (avatars, audio-files, template-assets)
```

### **3. Install Frontend Package (1 min)**

```bash
npm install @supabase/supabase-js
```

### **4. Add Environment Variables (2 min)**

Create `.env.local`:

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### **5. Create Supabase Client (2 min)**

Create `/utils/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### **6. Update AuthContext (10 min)**

Replace your mock auth with real Supabase auth:

```typescript
// See BACKEND_INTEGRATION.md for complete code
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

### **7. Test It (5 min)**

```typescript
// Try signing up
const { data } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'Test123!',
  options: {
    data: { full_name: 'Test User' }
  }
});

console.log('User created:', data.user);
```

---

## 📊 Database Schema Summary

### **Core Tables:**

```
profiles              → User profiles (extends auth.users)
templates             → User-created templates
audio_files           → Audio library content
achievements          → Available achievements
user_achievements     → User's achievement progress
hub_activities        → All hub activity logs
marketplace_transactions → MP purchases
user_favorites        → Favorited items
notifications         → User notifications
```

### **Key Relationships:**

```
profiles (1) ──→ (many) templates
profiles (1) ──→ (many) audio_files
profiles (1) ──→ (many) hub_activities
profiles (1) ──→ (many) user_achievements

achievements (1) ──→ (many) user_achievements
templates (1) ──→ (many) hub_activities
```

---

## 🔐 Authentication Flow

```
1. User signs up
   ↓
2. Supabase creates auth.users entry
   ↓
3. Trigger auto-creates profiles entry
   ↓
4. JWT token returned
   ↓
5. Frontend stores session
   ↓
6. User is logged in
```

---

## 💾 Data Access Pattern

```typescript
// 1. Install client
import { supabase } from './utils/supabase';

// 2. Fetch data
const { data, error } = await supabase
  .from('templates')
  .select('*')
  .eq('category', 'meditation');

// 3. Insert data
const { data, error } = await supabase
  .from('hub_activities')
  .insert({
    user_id: user.id,
    hub_type: 'meditation',
    title: 'Morning meditation',
    duration_minutes: 20
  });

// 4. Update data
const { data, error } = await supabase
  .from('profiles')
  .update({ mastery_points: newPoints })
  .eq('id', user.id);

// 5. Delete data
const { error } = await supabase
  .from('templates')
  .delete()
  .eq('id', templateId);
```

---

## 🎯 Common Operations

### **Log a Hub Activity:**

```typescript
const logActivity = async () => {
  const { data, error } = await supabase
    .from('hub_activities')
    .insert({
      hub_type: 'meditation',
      title: 'Morning Session',
      duration_minutes: 20,
      activity_date: new Date().toISOString().split('T')[0]
    })
    .select()
    .single();

  if (error) console.error('Error:', error);
  else console.log('Logged:', data);
};
```

### **Create a Template:**

```typescript
const createTemplate = async () => {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('templates')
    .insert({
      creator_id: user.id,
      title: 'Morning Meditation',
      description: 'Start your day right',
      category: 'meditation',
      content: { /* template data */ },
      tags: ['beginner', 'morning']
    })
    .select()
    .single();

  return data;
};
```

### **Get User Stats:**

```typescript
const getStats = async (hubType: string) => {
  const { data: { user } } = await supabase.auth.getUser();

  const { data } = await supabase
    .from('hub_activities')
    .select('duration_minutes, activity_date')
    .eq('user_id', user.id)
    .eq('hub_type', hubType);

  const totalSessions = data.length;
  const totalMinutes = data.reduce((sum, a) => sum + (a.duration_minutes || 0), 0);

  return { totalSessions, totalMinutes };
};
```

### **Award Achievement:**

```typescript
const awardAchievement = async (achievementId: string) => {
  const { data: { user } } = await supabase.auth.getUser();

  // Get achievement details
  const { data: achievement } = await supabase
    .from('achievements')
    .select('*')
    .eq('id', achievementId)
    .single();

  // Mark as completed
  await supabase
    .from('user_achievements')
    .upsert({
      user_id: user.id,
      achievement_id: achievementId,
      is_completed: true,
      completed_at: new Date().toISOString(),
      progress: achievement.requirement_value
    });

  // Award MP
  await supabase.rpc('increment_mastery_points', {
    user_id: user.id,
    amount: achievement.mp_reward
  });

  // Create notification
  await supabase
    .from('notifications')
    .insert({
      user_id: user.id,
      type: 'achievement_unlocked',
      title: 'Achievement Unlocked!',
      message: `You earned ${achievement.mp_reward} MP`
    });
};
```

---

## 📡 Real-time Subscriptions

### **Listen for New Notifications:**

```typescript
useEffect(() => {
  const subscription = supabase
    .channel('notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      },
      (payload) => {
        toast.success(payload.new.title);
      }
    )
    .subscribe();

  return () => subscription.unsubscribe();
}, [user?.id]);
```

---

## 📦 File Upload (Audio/Images)

### **Upload Avatar:**

```typescript
const uploadAvatar = async (file: File) => {
  const { data: { user } } = await supabase.auth.getUser();
  const fileName = `${user.id}/avatar.${file.name.split('.').pop()}`;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, { upsert: true });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  // Update profile
  await supabase
    .from('profiles')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id);

  return publicUrl;
};
```

### **Upload Audio File:**

```typescript
const uploadAudio = async (file: File, metadata: any) => {
  const { data: { user } } = await supabase.auth.getUser();
  const fileName = `${user.id}/${Date.now()}-${file.name}`;

  // Upload file
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('audio-files')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('audio-files')
    .getPublicUrl(fileName);

  // Create database entry
  const { data: audioData } = await supabase
    .from('audio_files')
    .insert({
      creator_id: user.id,
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      file_url: publicUrl,
      file_size: file.size,
      format: file.type.split('/')[1]
    })
    .select()
    .single();

  return audioData;
};
```

---

## 🔍 Search & Filtering

### **Search Templates:**

```typescript
const searchTemplates = async (query: string) => {
  const { data } = await supabase
    .from('templates')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .eq('status', 'published')
    .limit(20);

  return data;
};
```

### **Filter by Tags:**

```typescript
const filterByTags = async (tags: string[]) => {
  const { data } = await supabase
    .from('templates')
    .select('*')
    .contains('tags', tags);

  return data;
};
```

---

## 🎮 Usage Examples by Component

### **Dashboard:**

```typescript
function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    // Get all hub stats in parallel
    const [meditation, sleep, nutrition] = await Promise.all([
      supabase.from('hub_activities')
        .select('*')
        .eq('user_id', user.id)
        .eq('hub_type', 'meditation'),
      supabase.from('hub_activities')
        .select('*')
        .eq('user_id', user.id)
        .eq('hub_type', 'sleep'),
      supabase.from('hub_activities')
        .select('*')
        .eq('user_id', user.id)
        .eq('hub_type', 'nutrition')
    ]);

    setStats({
      meditation: meditation.data?.length || 0,
      sleep: sleep.data?.length || 0,
      nutrition: nutrition.data?.length || 0
    });
  };

  return <div>Dashboard with {stats?.meditation} meditations</div>;
}
```

### **TemplatesHub:**

```typescript
function TemplatesHub() {
  const [templates, setTemplates] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    loadTemplates();
    loadFavorites();
  }, []);

  const loadTemplates = async () => {
    const { data } = await supabase
      .from('templates')
      .select('*, creator:profiles(username, avatar_url)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    setTemplates(data);
  };

  const loadFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('user_favorites')
      .select('item_id')
      .eq('user_id', user.id)
      .eq('item_type', 'template');

    setFavorites(new Set(data.map(f => f.item_id)));
  };

  const toggleFavorite = async (templateId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (favorites.has(templateId)) {
      await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', templateId);
      
      favorites.delete(templateId);
    } else {
      await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          item_type: 'template',
          item_id: templateId
        });
      
      favorites.add(templateId);
    }

    setFavorites(new Set(favorites));
  };

  return (
    <div>
      {templates.map(template => (
        <div key={template.id}>
          <h3>{template.title}</h3>
          <button onClick={() => toggleFavorite(template.id)}>
            {favorites.has(template.id) ? '♥' : '♡'}
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## ✅ Testing Checklist

### **Test Authentication:**
```bash
✓ Sign up new user
✓ Login existing user
✓ Logout
✓ Update profile
✓ Upload avatar
```

### **Test Data Operations:**
```bash
✓ Create template
✓ Fetch templates
✓ Update template
✓ Delete template
✓ Search templates
```

### **Test Hub Activities:**
```bash
✓ Log meditation session
✓ Fetch activity history
✓ Calculate stats
✓ Track streaks
```

### **Test Marketplace:**
```bash
✓ Purchase with MP
✓ Award MP
✓ Check balance
✓ View transaction history
```

---

## 🚨 Common Issues & Solutions

### **Issue: RLS blocking queries**
**Solution:** Check your RLS policies match your auth state

```sql
-- Temporarily disable RLS for testing
ALTER TABLE templates DISABLE ROW LEVEL SECURITY;

-- Re-enable after fixing policies
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
```

### **Issue: Auth session not persisting**
**Solution:** Ensure localStorage is enabled and session is being saved

```typescript
// Check session
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
```

### **Issue: File upload fails**
**Solution:** Check storage bucket policies and file size limits

```sql
-- Check bucket policies in Supabase dashboard
-- Storage → Buckets → Policies
```

---

## 🎉 You're Ready!

**Your backend is set up! Now you can:**

✅ Authenticate users
✅ Store data in PostgreSQL
✅ Upload files to Storage
✅ Track activities
✅ Award achievements
✅ Manage Mastery Points
✅ Build the marketplace
✅ Send notifications

---

## 📚 Next Steps

1. **Deploy Frontend:** Update to use Supabase client
2. **Seed Data:** Add initial templates and achievements
3. **Test Features:** Run through all user flows
4. **Monitor:** Set up Supabase dashboard alerts
5. **Scale:** Upgrade plan as you grow

---

## 🔗 Complete Documentation

- **[BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md)** - Full architecture overview
- **[BACKEND_SUPABASE_SETUP.md](./BACKEND_SUPABASE_SETUP.md)** - Detailed Supabase guide
- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - Frontend integration examples
- **[BACKEND_API_REFERENCE.md](./BACKEND_API_REFERENCE.md)** - Complete API docs

---

**Total Setup Time: 30 minutes** ⚡
**Launch Ready!** 🚀
