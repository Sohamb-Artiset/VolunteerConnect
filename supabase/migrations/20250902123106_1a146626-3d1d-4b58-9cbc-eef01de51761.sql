-- Create enum for opportunity categories
CREATE TYPE public.opportunity_category AS ENUM (
  'Food Security',
  'Environment', 
  'Education',
  'Healthcare',
  'Youth Development',
  'Community Development',
  'Animal Welfare',
  'Disaster Relief'
);

-- Create organizations table
CREATE TABLE public.organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  logo_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for volunteers
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  bio TEXT,
  skills TEXT[],
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create opportunities table
CREATE TABLE public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  duration TEXT NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 1,
  current_participants INTEGER DEFAULT 0,
  required_skills TEXT[],
  category opportunity_category NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(opportunity_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for organizations (public read, authenticated create/update)
CREATE POLICY "Organizations are viewable by everyone" 
ON public.organizations 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create organizations" 
ON public.organizations 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- RLS Policies for opportunities (public read)
CREATE POLICY "Opportunities are viewable by everyone" 
ON public.opportunities 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create opportunities" 
ON public.opportunities 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- RLS Policies for applications
CREATE POLICY "Users can view their own applications" 
ON public.applications 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" 
ON public.applications 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
ON public.applications 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_opportunities_updated_at
BEFORE UPDATE ON public.opportunities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
INSERT INTO public.organizations (name, description, email, verified) VALUES
('City Food Bank', 'Providing food security to families in need across the city', 'info@cityfoodbank.org', true),
('Green Earth Initiative', 'Environmental conservation and cleanup organization', 'contact@greenearth.org', true),
('Future Leaders Foundation', 'Youth mentorship and educational support programs', 'hello@futureleaders.org', true);

-- Insert sample opportunities
INSERT INTO public.opportunities (
  organization_id, 
  title, 
  description, 
  location, 
  date, 
  duration, 
  max_participants, 
  current_participants,
  required_skills, 
  category
) VALUES
(
  (SELECT id FROM public.organizations WHERE name = 'City Food Bank'),
  'Community Food Bank Volunteer',
  'Help sort and distribute food to families in need. Perfect for individuals or groups looking to make a direct impact.',
  'Downtown Community Center',
  'Every Saturday',
  '3-4 hours',
  15,
  12,
  ARRAY['Organization', 'Customer Service', 'Physical Work'],
  'Food Security'
),
(
  (SELECT id FROM public.organizations WHERE name = 'Green Earth Initiative'),
  'Environmental Cleanup Drive',
  'Join us for a community cleanup to preserve our local environment and waterways.',
  'Riverside Park',
  'March 15, 2025',
  '2-3 hours',
  50,
  25,
  ARRAY['Outdoors', 'Environmental Awareness'],
  'Environment'
),
(
  (SELECT id FROM public.organizations WHERE name = 'Future Leaders Foundation'),
  'Youth Mentorship Program',
  'Mentor high school students in academic and life skills. Long-term commitment preferred.',
  'Lincoln High School',
  'Weekdays 4-6 PM',
  '2 hours',
  20,
  8,
  ARRAY['Teaching', 'Communication', 'Leadership'],
  'Education'
);