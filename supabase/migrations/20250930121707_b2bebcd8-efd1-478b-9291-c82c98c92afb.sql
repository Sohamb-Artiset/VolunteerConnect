-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN role text DEFAULT 'volunteer' CHECK (role IN ('volunteer', 'organization'));

-- Create index for better performance
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- Update existing profiles to set role based on whether they have an organization
UPDATE public.profiles
SET role = CASE 
  WHEN user_id IN (
    SELECT DISTINCT user_id 
    FROM auth.users 
    WHERE email IN (SELECT email FROM public.organizations)
  ) THEN 'organization'
  ELSE 'volunteer'
END;