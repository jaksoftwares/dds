-- Fix project_milestones by adding due_date
ALTER TABLE public.project_milestones
ADD COLUMN IF NOT EXISTS due_date TIMESTAMP WITH TIME ZONE;

-- Fix project_meetings by matching column names used by our codebase
ALTER TABLE public.project_meetings
RENAME COLUMN scheduled_at TO meeting_date;

ALTER TABLE public.project_meetings
RENAME COLUMN notes TO description;

-- Make client_id optional in project_meetings so the preset generator works without it
ALTER TABLE public.project_meetings
ALTER COLUMN client_id DROP NOT NULL;
