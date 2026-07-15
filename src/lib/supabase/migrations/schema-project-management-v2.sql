-- ==========================================
-- PROJECT MANAGEMENT MODULE V2 SCHEMA
-- ==========================================

-- 1. PROJECT BRIEFS (Onboarding)
CREATE TABLE project_briefs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT,
  project_goals TEXT,
  target_audience TEXT,
  competitors TEXT,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PROJECT ASSETS (Cloudinary Uploads)
CREATE TABLE project_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PROJECT TASKS (Linked to Milestones)
CREATE TABLE project_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  milestone_id UUID REFERENCES project_milestones(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done')),
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PROJECT REVIEWS
CREATE TABLE project_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE NOT NULL,
  milestone_id UUID REFERENCES project_milestones(id) ON DELETE CASCADE,
  preview_link TEXT NOT NULL,
  description TEXT,
  feedback TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PROJECT MEETINGS
CREATE TABLE project_meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  meeting_link TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. PROJECT COMMUNICATIONS (Isolated Chat)
CREATE TABLE project_communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. PROJECT FINANCIALS (Budget Proposals, Quotes, Invoices)
CREATE TABLE project_financials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES client_projects(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('budget_proposal', 'quotation', 'invoice', 'receipt')),
  amount DECIMAL(10, 2),
  description TEXT NOT NULL,
  file_url TEXT, -- Link to Cloudinary PDF if generated externally
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid', 'sent')),
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE project_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_financials ENABLE ROW LEVEL SECURITY;


-- PROJECT BRIEFS: Admins manage all, Clients manage their own projects
CREATE POLICY "Admins manage all briefs" ON project_briefs FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Clients manage their own project briefs" ON project_briefs FOR ALL USING (auth.uid() IN (SELECT client_id FROM client_projects WHERE id = project_briefs.project_id));

-- PROJECT ASSETS: Admins manage all, Clients manage their own
CREATE POLICY "Admins manage all assets" ON project_assets FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Clients manage their own project assets" ON project_assets FOR ALL USING (auth.uid() IN (SELECT client_id FROM client_projects WHERE id = project_assets.project_id));

-- PROJECT TASKS: Admins manage all, Clients read tasks on their milestones
CREATE POLICY "Admins manage all tasks" ON project_tasks FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Clients read tasks on their milestones" ON project_tasks FOR SELECT USING (
  auth.uid() IN (
    SELECT cp.client_id 
    FROM client_projects cp
    JOIN project_milestones pm ON cp.id = pm.project_id
    WHERE pm.id = project_tasks.milestone_id
  )
);

-- PROJECT REVIEWS: Admins manage all, Clients update their own reviews (leave feedback)
CREATE POLICY "Admins manage all reviews" ON project_reviews FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Clients manage their own project reviews" ON project_reviews FOR ALL USING (auth.uid() IN (SELECT client_id FROM client_projects WHERE id = project_reviews.project_id));

-- PROJECT MEETINGS: Admins manage all, Clients read their own meetings
CREATE POLICY "Admins manage all meetings" ON project_meetings FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Clients read their own project meetings" ON project_meetings FOR SELECT USING (auth.uid() IN (SELECT client_id FROM client_projects WHERE id = project_meetings.project_id));

-- PROJECT COMMUNICATIONS: Admins read/write all, Clients read/write in their projects
CREATE POLICY "Admins manage all communications" ON project_communications FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Clients manage their own project communications" ON project_communications FOR ALL USING (auth.uid() IN (SELECT client_id FROM client_projects WHERE id = project_communications.project_id));

-- PROJECT FINANCIALS: Admins manage all, Clients manage their own (submit proposals, read invoices)
CREATE POLICY "Admins manage all financials" ON project_financials FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Clients manage their own project financials" ON project_financials FOR ALL USING (auth.uid() IN (SELECT client_id FROM client_projects WHERE id = project_financials.project_id));
