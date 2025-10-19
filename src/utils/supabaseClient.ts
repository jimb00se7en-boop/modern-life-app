import { createClient } from '@supabase/supabase-js';
import { config } from '../config';

// Supabase configuration - using config file for Figma Make compatibility
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || config.supabase.url;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || config.supabase.anonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  // Running in demo mode - this is normal for development
  // To connect real database, see QUICK_SETUP.md
}

// Create Supabase client (or mock client for demo mode)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : {
      // Mock client for demo mode
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: new Error('Supabase not configured') }),
        update: () => ({ data: null, error: new Error('Supabase not configured') }),
        delete: () => ({ data: null, error: new Error('Supabase not configured') }),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
    } as any;

// Database types (auto-generated from Supabase)
export interface WaitlistEntry {
  id: string;
  email: string;
  signup_date: string;
  position: number;
  referral_code: string;
  referral_count: number;
  referred_by?: string;
  status: 'pending' | 'invited' | 'activated' | 'expired';
  metadata?: Record<string, any>;
  source?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'founder';
  mastery_points: number;
  total_achievements: number;
  current_streak: number;
  longest_streak: number;
  onboarding_completed: boolean;
  onboarding_step: number;
  settings?: Record<string, any>;
  metadata?: Record<string, any>;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  achievement_data?: Record<string, any>;
  points_earned: number;
  tier_unlocked?: string;
  earned_at: string;
  created_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  hub_type: 'meditation' | 'sleep' | 'nutrition' | 'study' | 'childcare' | 'schedule';
  title: string;
  description?: string;
  frequency: string;
  target_count: number;
  reminder_time?: string;
  reminder_enabled: boolean;
  chakra?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface HabitCompletion {
  id: string;
  habit_id: string;
  user_id: string;
  completed_at: string;
  notes?: string;
  mood?: string;
  created_at: string;
}

export interface Template {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  hub_type: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration_minutes?: number;
  template_data: Record<string, any>;
  price_points: number;
  downloads_count: number;
  rating_average: number;
  rating_count: number;
  tags?: string[];
  is_featured: boolean;
  is_approved: boolean;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AudioContent {
  id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  duration_seconds: number;
  file_url: string;
  thumbnail_url?: string;
  frequency_hz?: number;
  binaural_beat: boolean;
  tier_requirement: 'bronze' | 'silver' | 'gold' | 'platinum';
  tags?: string[];
  play_count: number;
  favorite_count: number;
  metadata?: Record<string, any>;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Helper functions
export const waitlistService = {
  async subscribe(email: string, source?: string, referralCode?: string) {
    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        email,
        source: source || 'landing_page',
        referred_by: referralCode
          ? (await supabase
              .from('waitlist')
              .select('id')
              .eq('referral_code', referralCode)
              .single()).data?.id
          : null,
      })
      .select()
      .single();

    return { data, error };
  },

  async getPosition(email: string) {
    const { data, error } = await supabase
      .from('waitlist')
      .select('position, referral_code, referral_count')
      .eq('email', email)
      .single();

    return { data, error };
  },

  async getStats() {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    return { count: count || 0, error };
  },
};

export const userService = {
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    return { data, error };
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  async getAchievements(userId: string) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false });

    return { data, error };
  },

  async calculateStreak(userId: string) {
    const { data, error } = await supabase.rpc('calculate_user_streak', {
      p_user_id: userId,
    });

    return { data, error };
  },
};

export const habitService = {
  async getUserHabits(userId: string) {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  async createHabit(habit: Partial<Habit>) {
    const { data, error } = await supabase
      .from('habits')
      .insert(habit)
      .select()
      .single();

    return { data, error };
  },

  async completeHabit(habitId: string, userId: string, notes?: string, mood?: string) {
    const { data, error } = await supabase
      .from('habit_completions')
      .insert({
        habit_id: habitId,
        user_id: userId,
        notes,
        mood,
      })
      .select()
      .single();

    return { data, error };
  },

  async getCompletions(userId: string, fromDate?: Date, toDate?: Date) {
    let query = supabase
      .from('habit_completions')
      .select('*, habits(*)')
      .eq('user_id', userId);

    if (fromDate) {
      query = query.gte('completed_at', fromDate.toISOString());
    }
    if (toDate) {
      query = query.lte('completed_at', toDate.toISOString());
    }

    const { data, error } = await query.order('completed_at', { ascending: false });

    return { data, error };
  },
};

export const templateService = {
  async getTemplates(filters?: {
    hubType?: string;
    category?: string;
    difficulty?: string;
    sortBy?: 'rating' | 'downloads' | 'recent';
  }) {
    let query = supabase
      .from('templates')
      .select('*, users!creator_id(display_name, avatar_url)')
      .eq('status', 'approved');

    if (filters?.hubType) {
      query = query.eq('hub_type', filters.hubType);
    }
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }

    // Sorting
    if (filters?.sortBy === 'rating') {
      query = query.order('rating_average', { ascending: false });
    } else if (filters?.sortBy === 'downloads') {
      query = query.order('downloads_count', { ascending: false });
    } else {
      query = query.order('published_at', { ascending: false });
    }

    const { data, error } = await query;

    return { data, error };
  },

  async createTemplate(template: Partial<Template>) {
    const { data, error } = await supabase
      .from('templates')
      .insert(template)
      .select()
      .single();

    return { data, error };
  },

  async downloadTemplate(templateId: string, userId: string) {
    const { data, error } = await supabase
      .from('template_downloads')
      .insert({
        template_id: templateId,
        user_id: userId,
        points_spent: 0, // Calculate based on template price
      })
      .select()
      .single();

    if (!error) {
      // Increment download count
      await supabase.rpc('increment', {
        table_name: 'templates',
        row_id: templateId,
        column_name: 'downloads_count',
      });
    }

    return { data, error };
  },

  async rateTemplate(templateId: string, userId: string, rating: number, review?: string) {
    const { data, error } = await supabase
      .from('template_ratings')
      .upsert({
        template_id: templateId,
        user_id: userId,
        rating,
        review,
      })
      .select()
      .single();

    return { data, error };
  },
};

export const audioService = {
  async getAudioContent(filters?: {
    category?: string;
    tier?: string;
    featured?: boolean;
  }) {
    let query = supabase
      .from('audio_content')
      .select('*')
      .eq('is_active', true);

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.tier) {
      query = query.eq('tier_requirement', filters.tier);
    }
    if (filters?.featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    return { data, error };
  },

  async getFavorites(userId: string) {
    const { data, error } = await supabase
      .from('audio_favorites')
      .select('*, audio_content(*)')
      .eq('user_id', userId);

    return { data, error };
  },

  async toggleFavorite(userId: string, audioId: string) {
    // Check if already favorited
    const { data: existing } = await supabase
      .from('audio_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('audio_id', audioId)
      .single();

    if (existing) {
      // Remove favorite
      const { error } = await supabase
        .from('audio_favorites')
        .delete()
        .eq('id', existing.id);

      return { favorited: false, error };
    } else {
      // Add favorite
      const { error } = await supabase
        .from('audio_favorites')
        .insert({ user_id: userId, audio_id: audioId });

      return { favorited: true, error };
    }
  },

  async incrementPlayCount(audioId: string) {
    await supabase.rpc('increment', {
      table_name: 'audio_content',
      row_id: audioId,
      column_name: 'play_count',
    });
  },
};

// Real-time subscriptions
export const subscribeToUserChanges = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('user-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'users',
        filter: `id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};

export const subscribeToAchievements = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('achievements')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'achievements',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};
