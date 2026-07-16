-- Fix infinite recursion in RLS policies for V2 Project Management tables
-- This script ONLY updates policies and will NOT attempt to recreate existing tables.

-- 1. Drop old recursive admin policies
DROP POLICY IF EXISTS "Admins manage all project briefs" ON project_briefs;
DROP POLICY IF EXISTS "Admins manage all assets" ON project_assets;
DROP POLICY IF EXISTS "Admins manage all milestones" ON project_milestones;
DROP POLICY IF EXISTS "Admins manage all tasks" ON project_tasks;
DROP POLICY IF EXISTS "Admins manage all reviews" ON project_reviews;
DROP POLICY IF EXISTS "Admins manage all meetings" ON project_meetings;
DROP POLICY IF EXISTS "Admins manage all communications" ON project_communications;
DROP POLICY IF EXISTS "Admins manage all financials" ON project_financials;

-- 2. Recreate admin policies using the safe public.is_admin() function
CREATE POLICY "Admins manage all project briefs" ON project_briefs FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage all assets" ON project_assets FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage all milestones" ON project_milestones FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage all tasks" ON project_tasks FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage all reviews" ON project_reviews FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage all meetings" ON project_meetings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage all communications" ON project_communications FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage all financials" ON project_financials FOR ALL USING (public.is_admin());

-- 3. Fix missing INSERT policy for Clients on project_financials
-- (Clients need to be able to submit budget proposals during onboarding)
DROP POLICY IF EXISTS "Clients manage their own project financials" ON project_financials;

CREATE POLICY "Clients manage their own project financials" 
ON project_financials 
FOR ALL 
USING (
  auth.uid() IN (SELECT client_id FROM client_projects WHERE id = project_financials.project_id)
)
WITH CHECK (
  auth.uid() IN (SELECT client_id FROM client_projects WHERE id = project_financials.project_id)
);
