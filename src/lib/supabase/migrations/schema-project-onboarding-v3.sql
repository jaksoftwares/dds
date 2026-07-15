-- ==========================================
-- PROJECT ONBOARDING DEEP TAXONOMY V3
-- ==========================================

-- 1. ADD NEW COLUMNS TO project_briefs
ALTER TABLE project_briefs
ADD COLUMN solution_category TEXT,
ADD COLUMN specific_type TEXT,
ADD COLUMN industry TEXT,
ADD COLUMN client_segment TEXT,
ADD COLUMN target_market_details JSONB,
ADD COLUMN competitors_list JSONB,
ADD COLUMN payment_policy_accepted BOOLEAN DEFAULT false;

-- 2. ADD NEW COLUMNS TO project_financials
ALTER TABLE project_financials
ADD COLUMN currency TEXT DEFAULT 'USD';
