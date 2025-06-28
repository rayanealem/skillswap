-- SkillSwap Database Schema Migration
-- Location: supabase/migrations/20241216120000_skillswap_schema.sql

-- 1. Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'student', 'instructor');
CREATE TYPE public.skill_category AS ENUM (
    'programming', 'design', 'marketing', 'writing', 
    'language', 'music', 'tutoring', 'business', 'other'
);

-- 2. Create user profiles table (critical intermediary for PostgREST compatibility)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    university TEXT,
    major TEXT,
    bio TEXT CHECK (char_length(bio) <= 500),
    reputation_points INTEGER DEFAULT 0,
    social_links JSONB DEFAULT '{}',
    role public.user_role DEFAULT 'student'::public.user_role,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create skills table
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category public.skill_category NOT NULL,
    price NUMERIC(10,2) DEFAULT 0,
    is_barter BOOLEAN DEFAULT true,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT true,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    reviewee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    rating SMALLINT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create essential indexes
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_university ON public.profiles(university);
CREATE INDEX idx_skills_owner_id ON public.skills(owner_id);
CREATE INDEX idx_skills_category ON public.skills(category);
CREATE INDEX idx_skills_is_active ON public.skills(is_active);
CREATE INDEX idx_reviews_skill_id ON public.reviews(skill_id);
CREATE INDEX idx_reviews_reviewer_id ON public.reviews(reviewer_id);

-- 6. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 7. Create helper functions for RLS policies
CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = profile_uuid AND p.id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.is_skill_owner(skill_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.skills s
    WHERE s.id = skill_uuid AND s.owner_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_review(review_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.reviews r
    WHERE r.id = review_uuid AND (
        r.reviewer_id = auth.uid() OR 
        r.reviewee_id = auth.uid()
    )
)
$$;

-- 8. Create RLS policies
-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "public_can_read_profiles" ON public.profiles FOR SELECT TO public USING (true);
CREATE POLICY "users_manage_own_profile" ON public.profiles FOR ALL TO authenticated
USING (public.is_profile_owner(id)) WITH CHECK (public.is_profile_owner(id));

-- Skills: Public read access, authenticated users can create, owners can manage
CREATE POLICY "public_can_read_skills" ON public.skills FOR SELECT TO public USING (is_active = true);
CREATE POLICY "authenticated_can_create_skills" ON public.skills FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "owners_manage_skills" ON public.skills FOR UPDATE TO authenticated USING (public.is_skill_owner(id));
CREATE POLICY "owners_delete_skills" ON public.skills FOR DELETE TO authenticated USING (public.is_skill_owner(id));

-- Reviews: Participants can read their reviews, authenticated users can create
CREATE POLICY "participants_read_reviews" ON public.reviews FOR SELECT TO authenticated USING (public.can_access_review(id));
CREATE POLICY "authenticated_create_reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = reviewer_id);

-- 9. Create trigger function for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- 10. Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. Create storage bucket and policies
INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true);

-- Storage policies for avatars
CREATE POLICY "Public avatar access" ON storage.objects FOR SELECT USING (bucket_id = 'public-assets');
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own avatars" ON storage.objects FOR UPDATE 
USING (bucket_id = 'public-assets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 12. Sample data for development
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    student_uuid UUID := gen_random_uuid();
    skill1_uuid UUID := gen_random_uuid();
    skill2_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete field structure
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@university.edu', crypt('SkillSwap123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Alex Johnson", "username": "alexj", "role": "admin"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (student_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'student@university.edu', crypt('SkillSwap123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sam Wilson", "username": "samw", "role": "student"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create skills
    INSERT INTO public.skills (id, owner_id, title, description, category, price, tags) VALUES
        (skill1_uuid, admin_uuid, 'React Development Tutoring', 
         'Learn modern React development with hooks, context, and best practices. Perfect for beginners to intermediate developers.',
         'programming'::public.skill_category, 25.00, 
         ARRAY['React', 'JavaScript', 'Frontend', 'Web Development']),
        (skill2_uuid, student_uuid, 'Spanish Conversation Practice', 
         'Native Spanish speaker offering conversation practice sessions. Improve your fluency and confidence!',
         'language'::public.skill_category, 15.00, 
         ARRAY['Spanish', 'Conversation', 'Language Learning', 'Tutoring']);

    -- Create a sample review
    INSERT INTO public.reviews (skill_id, reviewer_id, reviewee_id, rating, comment) VALUES
        (skill1_uuid, student_uuid, admin_uuid, 5, 'Excellent tutoring! Alex explained React concepts very clearly and patiently.');

EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Sample data already exists, skipping insertion';
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error in sample data: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating sample data: %', SQLERRM;
END $$;