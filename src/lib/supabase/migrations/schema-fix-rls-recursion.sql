-- Fix infinite recursion in RLS policies by using a SECURITY DEFINER function

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
  RETURN user_role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop all old recursive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can view all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can view all quotes" ON quotes;
DROP POLICY IF EXISTS "Admins manage all projects" ON client_projects;
DROP POLICY IF EXISTS "Admins manage services" ON services;
DROP POLICY IF EXISTS "Admins manage portfolio" ON portfolio;
DROP POLICY IF EXISTS "Admins manage updates" ON updates;
DROP POLICY IF EXISTS "Admins can view visitor logs" ON site_visitors;

-- Drop old storage policies
DROP POLICY IF EXISTS "Admin Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Admin Updates" ON storage.objects;
DROP POLICY IF EXISTS "Admin Deletes" ON storage.objects;

-- Recreate policies using the is_admin() function
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can view all contact messages" ON contact_messages FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can view all quotes" ON quotes FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins manage all projects" ON client_projects FOR ALL USING (public.is_admin());

CREATE POLICY "Admins manage services" ON services FOR ALL USING (public.is_admin());

CREATE POLICY "Admins manage portfolio" ON portfolio FOR ALL USING (public.is_admin());

CREATE POLICY "Admins manage updates" ON updates FOR ALL USING (public.is_admin());

CREATE POLICY "Admins can view visitor logs" ON site_visitors FOR SELECT USING (public.is_admin());

-- Recreate storage policies
CREATE POLICY "Admin Uploads" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'public-assets' AND public.is_admin() );
CREATE POLICY "Admin Updates" ON storage.objects FOR UPDATE USING ( bucket_id = 'public-assets' AND public.is_admin() );
CREATE POLICY "Admin Deletes" ON storage.objects FOR DELETE USING ( bucket_id = 'public-assets' AND public.is_admin() );
