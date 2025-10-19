-- ===================================
-- Modern Life Database Schema
-- ===================================
-- For Supabase PostgreSQL
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================
-- WAITLIST TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    signup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    position INTEGER,
    referral_code VARCHAR(50) UNIQUE,
    referral_count INTEGER DEFAULT 0,
    referred_by UUID REFERENCES public.waitlist(id),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'activated', 'expired')),
    metadata JSONB DEFAULT '{}',
    source VARCHAR(100), -- 'landing_page', 'referral', 'social', etc.
    ip_address INET,
    user_agent TEXT,
    converted_at TIMESTAMP WITH TIME ZONE,
    invited_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_signup_date ON public.waitlist(signup_date);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON public.waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON public.waitlist(position);

-- Function to generate unique referral codes
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate referral code
CREATE OR REPLACE FUNCTION set_referral_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referral_code IS NULL THEN
        NEW.referral_code := generate_referral_code();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_referral_code
    BEFORE INSERT ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION set_referral_code();

-- Trigger to update position
CREATE OR REPLACE FUNCTION update_waitlist_position()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.position IS NULL THEN
        SELECT COALESCE(MAX(position), 0) + 1 INTO NEW.position
        FROM public.waitlist
        WHERE status = 'pending';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_waitlist_position
    BEFORE INSERT ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_waitlist_position();

-- Trigger to update referral count
CREATE OR REPLACE FUNCTION increment_referral_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referred_by IS NOT NULL THEN
        UPDATE public.waitlist
        SET referral_count = referral_count + 1
        WHERE id = NEW.referred_by;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_referral_count
    AFTER INSERT ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION increment_referral_count();

-- ===================================
-- USERS TABLE
-- ===================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    tier VARCHAR(50) DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum', 'founder')),
    mastery_points INTEGER DEFAULT 0,
    total_achievements INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    onboarding_step INTEGER DEFAULT 0,
    settings JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_tier ON public.users(tier);
CREATE INDEX IF NOT EXISTS idx_users_mastery_points ON public.users(mastery_points DESC);

-- ===================================
-- USER ACHIEVEMENTS
-- ===================================
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    achievement_type VARCHAR(100) NOT NULL,
    achievement_data JSONB DEFAULT '{}',
    points_earned INTEGER DEFAULT 0,
    tier_unlocked VARCHAR(50),
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON public.achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_earned_at ON public.achievements(earned_at DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_type ON public.achievements(achievement_type);

-- ===================================
-- HABIT TRACKING
-- ===================================
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    hub_type VARCHAR(50) NOT NULL CHECK (hub_type IN ('meditation', 'sleep', 'nutrition', 'study', 'childcare', 'schedule')),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    frequency VARCHAR(50) DEFAULT 'daily',
    target_count INTEGER DEFAULT 1,
    reminder_time TIME,
    reminder_enabled BOOLEAN DEFAULT TRUE,
    chakra VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habits_hub_type ON public.habits(hub_type);
CREATE INDEX IF NOT EXISTS idx_habits_active ON public.habits(is_active);

-- ===================================
-- HABIT COMPLETIONS
-- ===================================
CREATE TABLE IF NOT EXISTS public.habit_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    mood VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_completions_habit_id ON public.habit_completions(habit_id);
CREATE INDEX IF NOT EXISTS idx_completions_user_id ON public.habit_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_completions_completed_at ON public.habit_completions(completed_at DESC);

-- ===================================
-- TEMPLATES (Marketplace)
-- ===================================
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    hub_type VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    difficulty VARCHAR(50) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    duration_minutes INTEGER,
    template_data JSONB NOT NULL,
    price_points INTEGER DEFAULT 0,
    downloads_count INTEGER DEFAULT 0,
    rating_average DECIMAL(3, 2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    tags TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'rejected')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_templates_creator_id ON public.templates(creator_id);
CREATE INDEX IF NOT EXISTS idx_templates_hub_type ON public.templates(hub_type);
CREATE INDEX IF NOT EXISTS idx_templates_status ON public.templates(status);
CREATE INDEX IF NOT EXISTS idx_templates_rating ON public.templates(rating_average DESC);
CREATE INDEX IF NOT EXISTS idx_templates_downloads ON public.templates(downloads_count DESC);
CREATE INDEX IF NOT EXISTS idx_templates_tags ON public.templates USING GIN(tags);

-- ===================================
-- TEMPLATE PURCHASES/DOWNLOADS
-- ===================================
CREATE TABLE IF NOT EXISTS public.template_downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    points_spent INTEGER NOT NULL,
    downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(template_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_downloads_template_id ON public.template_downloads(template_id);
CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON public.template_downloads(user_id);

-- ===================================
-- TEMPLATE RATINGS
-- ===================================
CREATE TABLE IF NOT EXISTS public.template_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(template_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ratings_template_id ON public.template_ratings(template_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON public.template_ratings(user_id);

-- Function to update template rating average
CREATE OR REPLACE FUNCTION update_template_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.templates
    SET 
        rating_average = (
            SELECT AVG(rating)::DECIMAL(3,2)
            FROM public.template_ratings
            WHERE template_id = NEW.template_id
        ),
        rating_count = (
            SELECT COUNT(*)
            FROM public.template_ratings
            WHERE template_id = NEW.template_id
        )
    WHERE id = NEW.template_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_template_rating
    AFTER INSERT OR UPDATE OR DELETE ON public.template_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_template_rating();

-- ===================================
-- AUDIO LIBRARY
-- ===================================
CREATE TABLE IF NOT EXISTS public.audio_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    duration_seconds INTEGER NOT NULL,
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    frequency_hz INTEGER,
    binaural_beat BOOLEAN DEFAULT FALSE,
    tier_requirement VARCHAR(50) DEFAULT 'bronze',
    tags TEXT[],
    play_count INTEGER DEFAULT 0,
    favorite_count INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audio_category ON public.audio_content(category);
CREATE INDEX IF NOT EXISTS idx_audio_tier ON public.audio_content(tier_requirement);
CREATE INDEX IF NOT EXISTS idx_audio_tags ON public.audio_content USING GIN(tags);

-- ===================================
-- USER AUDIO FAVORITES
-- ===================================
CREATE TABLE IF NOT EXISTS public.audio_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    audio_id UUID NOT NULL REFERENCES public.audio_content(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, audio_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.audio_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_audio_id ON public.audio_favorites(audio_id);

-- ===================================
-- ROW LEVEL SECURITY (RLS)
-- ===================================

-- Enable RLS on all tables
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audio_favorites ENABLE ROW LEVEL SECURITY;

-- Waitlist policies (public can insert, no one can update/delete)
CREATE POLICY "Public can insert waitlist" ON public.waitlist
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Users can view own waitlist entry" ON public.waitlist
    FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Achievements policies
CREATE POLICY "Users can view own achievements" ON public.achievements
    FOR SELECT USING (auth.uid() = user_id);

-- Habits policies
CREATE POLICY "Users can view own habits" ON public.habits
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits" ON public.habits
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" ON public.habits
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own habits" ON public.habits
    FOR DELETE USING (auth.uid() = user_id);

-- Habit completions policies
CREATE POLICY "Users can view own completions" ON public.habit_completions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completions" ON public.habit_completions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Templates policies
CREATE POLICY "Anyone can view approved templates" ON public.templates
    FOR SELECT USING (status = 'approved' OR creator_id = auth.uid());

CREATE POLICY "Users can insert own templates" ON public.templates
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own templates" ON public.templates
    FOR UPDATE USING (auth.uid() = creator_id);

-- Audio content policies
CREATE POLICY "Anyone can view active audio" ON public.audio_content
    FOR SELECT USING (is_active = true);

-- Audio favorites policies
CREATE POLICY "Users can manage own favorites" ON public.audio_favorites
    FOR ALL USING (auth.uid() = user_id);

-- ===================================
-- FUNCTIONS & STORED PROCEDURES
-- ===================================

-- Function to calculate user streak
CREATE OR REPLACE FUNCTION calculate_user_streak(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    streak INTEGER := 0;
    check_date DATE := CURRENT_DATE;
BEGIN
    LOOP
        IF EXISTS (
            SELECT 1 FROM public.habit_completions
            WHERE user_id = p_user_id
            AND DATE(completed_at) = check_date
        ) THEN
            streak := streak + 1;
            check_date := check_date - INTERVAL '1 day';
        ELSE
            EXIT;
        END IF;
    END LOOP;
    
    RETURN streak;
END;
$$ LANGUAGE plpgsql;

-- Function to award achievement
CREATE OR REPLACE FUNCTION award_achievement(
    p_user_id UUID,
    p_achievement_type VARCHAR,
    p_points INTEGER,
    p_data JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    achievement_id UUID;
BEGIN
    INSERT INTO public.achievements (user_id, achievement_type, points_earned, achievement_data)
    VALUES (p_user_id, p_achievement_type, p_points, p_data)
    RETURNING id INTO achievement_id;
    
    -- Update user's mastery points
    UPDATE public.users
    SET 
        mastery_points = mastery_points + p_points,
        total_achievements = total_achievements + 1
    WHERE id = p_user_id;
    
    RETURN achievement_id;
END;
$$ LANGUAGE plpgsql;

-- ===================================
-- SAMPLE DATA (Optional - for testing)
-- ===================================

-- Insert sample audio content
-- INSERT INTO public.audio_content (title, description, category, duration_seconds, file_url, frequency_hz, tier_requirement)
-- VALUES 
--     ('Morning Meditation', 'Start your day with clarity', 'Meditation', 600, 'https://example.com/audio1.mp3', 432, 'bronze'),
--     ('Deep Sleep Journey', 'Fall asleep naturally', 'Sleep', 1800, 'https://example.com/audio2.mp3', 528, 'silver');

-- ===================================
-- MAINTENANCE
-- ===================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.habits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Cleanup old waitlist entries (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_waitlist()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM public.waitlist
    WHERE status = 'expired'
    AND created_at < NOW() - INTERVAL '90 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ===================================
-- COMPLETE! 
-- ===================================
-- Next steps:
-- 1. Run this schema in Supabase SQL Editor
-- 2. Configure RLS policies as needed
-- 3. Set up Edge Functions for complex business logic
-- 4. Enable realtime on tables you need live updates
