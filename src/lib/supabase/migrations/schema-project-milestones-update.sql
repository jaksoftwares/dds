-- Add new columns to project_milestones table
ALTER TABLE public.project_milestones
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS report_file_url TEXT,
ADD COLUMN IF NOT EXISTS report_file_name TEXT;

-- Drop the old select policy
DROP POLICY IF EXISTS "Clients can view their project milestones" ON public.project_milestones;

-- Recreate policy to ONLY show published milestones to clients
CREATE POLICY "Clients can view their published project milestones" ON public.project_milestones
FOR SELECT USING (
    is_published = true AND
    EXISTS (
        SELECT 1 FROM public.client_projects
        WHERE client_projects.id = project_milestones.project_id
        AND client_projects.client_id = auth.uid()
    )
);






