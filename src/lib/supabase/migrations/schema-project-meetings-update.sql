-- Add is_published to project_meetings table
ALTER TABLE public.project_meetings
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false;

-- Drop the old select policy
DROP POLICY IF EXISTS "Clients can view their project meetings" ON public.project_meetings;

-- Recreate policy to ONLY show published meetings to clients
CREATE POLICY "Clients can view their published project meetings" ON public.project_meetings
FOR SELECT USING (
    is_published = true AND
    EXISTS (
        SELECT 1 FROM public.client_projects
        WHERE client_projects.id = project_meetings.project_id
        AND client_projects.client_id = auth.uid()
    )
);
