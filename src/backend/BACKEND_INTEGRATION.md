# 🔌 Modern Life - Frontend-Backend Integration Guide

## 🎯 Overview

This guide shows how to integrate your existing Modern Life frontend with the Supabase backend, replacing localStorage with real database operations.

---

## 📦 Installation

```bash
npm install @supabase/supabase-js
```

---

## 🔧 Setup

### **1. Create Supabase Client**

Create `/utils/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Helper: Get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper: Get user profile
export const getUserProfile = async (userId?: string) => {
  const uid = userId || (await getCurrentUser())?.id;
  if (!uid) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', uid)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
};
```

### **2. Update Environment Variables**

Update `.env.local`:

```bash
# Supabase
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Keep existing vars
VITE_APP_URL=http://localhost:5173
VITE_ENCRYPTION_KEY=your_32_character_key_here
```

---

## 🔐 Update AuthContext

### **Replace AuthContext with Supabase Auth:**

Update `/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, getUserProfile } from '../utils/supabase';
import { PerformanceMonitor } from '../utils/PerformanceMonitor';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatar_url?: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  mastery_points: number;
  onboardingComplete: boolean;
  preferences: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const perfMonitor = PerformanceMonitor.start('auth-init');

      try {
        // Get session
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          await loadUserData(session.user.id);
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setIsLoading(false);
        perfMonitor.end();
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserData(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load user data from profiles table
  const loadUserData = async (userId: string) => {
    const profile = await getUserProfile(userId);

    if (profile) {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      setUser({
        id: profile.id,
        email: authUser?.email || '',
        name: profile.full_name || '',
        username: profile.username || undefined,
        avatar_url: profile.avatar_url || undefined,
        tier: profile.current_tier,
        mastery_points: profile.mastery_points,
        onboardingComplete: profile.onboarding_completed,
        preferences: profile.preferences,
      });

      // Update last login
      await supabase
        .from('profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', userId);

      PerformanceMonitor.trackEvent('user_loaded', { userId });
    }
  };

  // Login
  const login = async (email: string, password: string): Promise<void> => {
    const perfMonitor = PerformanceMonitor.start('login');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await loadUserData(data.user.id);
      }

      PerformanceMonitor.trackEvent('user_login', { userId: data.user?.id });
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
      perfMonitor.end();
    }
  };

  // Signup
  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    const perfMonitor = PerformanceMonitor.start('signup');
    setIsLoading(true);

    try {
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

      if (data.user) {
        // Profile is auto-created by trigger
        await loadUserData(data.user.id);
      }

      PerformanceMonitor.trackEvent('user_signup', { userId: data.user?.id });
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed');
    } finally {
      setIsLoading(false);
      perfMonitor.end();
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    const perfMonitor = PerformanceMonitor.start('logout');
    setIsLoading(true);

    try {
      await supabase.auth.signOut();
      setUser(null);

      PerformanceMonitor.trackEvent('user_logout', { userId: user?.id });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
      perfMonitor.end();
    }
  };

  // Update user profile
  const updateUser = async (updates: Partial<User>): Promise<void> => {
    if (!user) return;

    const perfMonitor = PerformanceMonitor.start('update-user');

    try {
      const dbUpdates: any = {};

      if (updates.name) dbUpdates.full_name = updates.name;
      if (updates.username) dbUpdates.username = updates.username;
      if (updates.avatar_url) dbUpdates.avatar_url = updates.avatar_url;
      if (updates.tier) dbUpdates.current_tier = updates.tier;
      if (updates.preferences) dbUpdates.preferences = updates.preferences;

      const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setUser({ ...user, ...updates });

      PerformanceMonitor.trackEvent('user_updated', {
        userId: user.id,
        fields: Object.keys(updates),
      });
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Failed to update profile');
    } finally {
      perfMonitor.end();
    }
  };

  // Refresh session
  const refreshSession = async (): Promise<void> => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Refresh session error:', error);
      await logout();
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// ProtectedRoute remains the same
export const ProtectedRoute: React.FC<{
  children: ReactNode;
  requireOnboarding?: boolean;
  minTier?: User['tier'];
}> = ({ children, requireOnboarding = false, minTier }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (requireOnboarding && !user?.onboardingComplete) {
        navigate('/onboarding');
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, requireOnboarding]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
};
```

---

## 📚 Data Access Patterns

### **Templates:**

```typescript
// /utils/api/templates.ts
import { supabase } from '../supabase';

export const templateAPI = {
  // Get all templates
  async getAll(filters?: { category?: string; tier?: string }) {
    let query = supabase
      .from('templates')
      .select('*, creator:profiles(username, avatar_url)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  // Get single template
  async getById(id: string) {
    const { data, error } = await supabase
      .from('templates')
      .select('*, creator:profiles(username, avatar_url, current_tier)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create template
  async create(template: {
    title: string;
    description: string;
    category: string;
    content: any;
    tags?: string[];
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('templates')
      .insert({
        ...template,
        creator_id: user.id,
        status: 'published',
      })
      .select()
      .single();

    if (error) throw error;

    PerformanceMonitor.trackEvent('template_created', {
      templateId: data.id,
      category: template.category,
    });

    return data;
  },

  // Update template
  async update(id: string, updates: Partial<typeof template>) {
    const { data, error } = await supabase
      .from('templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete template
  async delete(id: string) {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Search templates
  async search(query: string) {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('status', 'published')
      .limit(20);

    if (error) throw error;
    return data;
  },

  // Get user's templates
  async getMyTemplates() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('creator_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};
```

### **Activities (Hub Tracking):**

```typescript
// /utils/api/activities.ts
import { supabase } from '../supabase';

export const activityAPI = {
  // Log activity
  async create(activity: {
    hub_type: string;
    title: string;
    duration_minutes?: number;
    notes?: string;
    data?: any;
    template_id?: string;
    audio_id?: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('hub_activities')
      .insert({
        ...activity,
        user_id: user.id,
        activity_date: new Date().toISOString().split('T')[0],
      })
      .select()
      .single();

    if (error) throw error;

    PerformanceMonitor.trackEvent('activity_logged', {
      hubType: activity.hub_type,
      activityId: data.id,
    });

    return data;
  },

  // Get activities for a hub
  async getForHub(hubType: string, limit = 30) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('hub_activities')
      .select('*, template:templates(title), audio:audio_files(title)')
      .eq('user_id', user.id)
      .eq('hub_type', hubType)
      .order('activity_date', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Get stats for a hub
  async getStats(hubType: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('hub_activities')
      .select('duration_minutes, activity_date')
      .eq('user_id', user.id)
      .eq('hub_type', hubType);

    if (error) throw error;

    // Calculate stats
    const totalSessions = data.length;
    const totalMinutes = data.reduce((sum, a) => sum + (a.duration_minutes || 0), 0);
    const streak = calculateStreak(data.map(a => a.activity_date));

    return { totalSessions, totalMinutes, streak };
  },
};

function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sorted = [...new Set(dates)].sort().reverse();
  let streak = 0;
  const today = new Date().toISOString().split('T')[0];
  let checkDate = new Date(today);

  for (const date of sorted) {
    const activityDate = new Date(date).toISOString().split('T')[0];
    const expectedDate = checkDate.toISOString().split('T')[0];

    if (activityDate === expectedDate) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
```

### **Favorites:**

```typescript
// /utils/api/favorites.ts
import { supabase } from '../supabase';

export const favoritesAPI = {
  // Toggle favorite
  async toggle(itemType: string, itemId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Check if exists
    const { data: existing } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .single();

    if (existing) {
      // Remove favorite
      await supabase
        .from('user_favorites')
        .delete()
        .eq('id', existing.id);

      return false; // Not favorited
    } else {
      // Add favorite
      await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          item_type: itemType,
          item_id: itemId,
        });

      return true; // Favorited
    }
  },

  // Get all favorites
  async getAll(itemType?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    let query = supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', user.id);

    if (itemType) {
      query = query.eq('item_type', itemType);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  // Check if favorited
  async isFavorited(itemType: string, itemId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .single();

    return !!data;
  },
};
```

---

## 🎮 Usage in Components

### **Example: MeditationHub with Backend:**

```typescript
import { useState, useEffect } from 'react';
import { activityAPI } from '../utils/api/activities';
import { templateAPI } from '../utils/api/templates';

export function MeditationHub() {
  const [activities, setActivities] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [activitiesData, templatesData, statsData] = await Promise.all([
        activityAPI.getForHub('meditation', 10),
        templateAPI.getAll({ category: 'meditation' }),
        activityAPI.getStats('meditation'),
      ]);

      setActivities(activitiesData);
      setTemplates(templatesData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const logSession = async (templateId: string, duration: number) => {
    try {
      await activityAPI.create({
        hub_type: 'meditation',
        title: 'Meditation Session',
        duration_minutes: duration,
        template_id: templateId,
      });

      // Reload data
      loadData();
    } catch (error) {
      console.error('Failed to log session:', error);
    }
  };

  if (loading) return <HubSkeleton />;

  return (
    <div>
      <h1>Meditation Hub</h1>
      
      {/* Stats */}
      <div className="stats">
        <p>Sessions: {stats.totalSessions}</p>
        <p>Minutes: {stats.totalMinutes}</p>
        <p>Streak: {stats.streak} days</p>
      </div>

      {/* Recent Activities */}
      <div className="activities">
        {activities.map(activity => (
          <div key={activity.id}>
            {activity.title} - {activity.duration_minutes} min
          </div>
        ))}
      </div>

      {/* Templates */}
      <div className="templates">
        {templates.map(template => (
          <div key={template.id}>
            <h3>{template.title}</h3>
            <button onClick={() => logSession(template.id, 20)}>
              Start Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📡 Real-time Updates

### **Subscribe to Changes:**

```typescript
// Subscribe to new achievements
useEffect(() => {
  const subscription = supabase
    .channel('achievements')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'user_achievements',
        filter: `user_id=eq.${user.id}`,
      },
      (payload) => {
        console.log('New achievement!', payload.new);
        toast.success('Achievement unlocked!');
        // Reload achievements
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, [user?.id]);
```

---

## ✅ Migration Checklist

- [ ] Install `@supabase/supabase-js`
- [ ] Add environment variables
- [ ] Create Supabase client
- [ ] Update AuthContext
- [ ] Create API utility files
- [ ] Update components to use API
- [ ] Test authentication
- [ ] Test data operations
- [ ] Test real-time subscriptions
- [ ] Remove localStorage fallbacks
- [ ] Deploy!

---

**You're now fully integrated with Supabase!** 🎉
