-- Add unique constraint to email column in profiles table
ALTER TABLE public.profiles 
ADD CONSTRAINT unique_email UNIQUE (email);

-- Add index for better performance on email lookups
CREATE INDEX idx_profiles_email ON public.profiles(email);
