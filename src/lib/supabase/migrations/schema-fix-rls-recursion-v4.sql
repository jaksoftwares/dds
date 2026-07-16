-- Definitive fix for client_projects RLS policies

-- 1. Safely drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admins manage all projects" ON client_projects;
DROP POLICY IF EXISTS "Users can view own projects" ON client_projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON client_projects;
DROP POLICY IF EXISTS "Users can create own projects" ON client_projects;
DROP POLICY IF EXISTS "Users can update own projects" ON client_projects;

-- 2. Create proper INSERT policy for users (this was missing because the V2 script failed to complete)
CREATE POLICY "Users can insert own projects" 
ON client_projects FOR INSERT 
WITH CHECK (auth.uid() = client_id);

-- 3. Create SELECT policy for users
CREATE POLICY "Users can view own projects" 
ON client_projects FOR SELECT 
USING (auth.uid() = client_id);

-- 4. Create UPDATE policy for users
CREATE POLICY "Users can update own projects" 
ON client_projects FOR UPDATE 
USING (auth.uid() = client_id);

-- 5. Create safe Admin policy using our custom function
CREATE POLICY "Admins manage all projects" 
ON client_projects FOR ALL 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());
