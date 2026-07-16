-- Fix client_projects admin policy that was reverted by the V2 migration script

DROP POLICY IF EXISTS "Admins manage all projects" ON client_projects;

CREATE POLICY "Admins manage all projects" 
ON client_projects 
FOR ALL 
USING (public.is_admin());
