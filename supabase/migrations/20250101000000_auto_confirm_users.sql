-- Auto-confirm users migration
-- This migration creates a function to automatically confirm users after signup

-- Create function to auto-confirm users
CREATE OR REPLACE FUNCTION public.auto_confirm_user() 
RETURNS trigger AS $$
BEGIN
  -- Update the user's email_confirmed_at to current timestamp
  UPDATE auth.users 
  SET email_confirmed_at = NOW()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-confirm users after signup
DROP TRIGGER IF EXISTS auto_confirm_user_trigger ON auth.users;
CREATE TRIGGER auto_confirm_user_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_user();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.auto_confirm_user() TO postgres, anon, authenticated, service_role;
ALTER FUNCTION public.auto_confirm_user() OWNER TO postgres;
