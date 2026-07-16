-- Create the project_meetings table
CREATE TABLE IF NOT EXISTS public.project_meetings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.client_projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
    meeting_link TEXT NOT NULL,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.project_meetings ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins have full access to meetings" ON public.project_meetings
FOR ALL USING (public.is_admin());

-- Clients can view meetings for their projects
CREATE POLICY "Clients can view their project meetings" ON public.project_meetings
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.client_projects
        WHERE client_projects.id = project_meetings.project_id
        AND client_projects.client_id = auth.uid()
    )
);
