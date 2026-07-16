-- Create the project_milestones table
CREATE TABLE IF NOT EXISTS public.project_milestones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.client_projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins have full access to milestones" ON public.project_milestones
FOR ALL USING (public.is_admin());

-- Clients can view milestones for their projects
CREATE POLICY "Clients can view their project milestones" ON public.project_milestones
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.client_projects
        WHERE client_projects.id = project_milestones.project_id
        AND client_projects.client_id = auth.uid()
    )
);
