-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_competencies ENABLE ROW LEVEL SECURITY;

-- Profiles: Learner can read/update their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Public Catalogue Data: Anyone authenticated can read
CREATE POLICY "Authenticated users can read roles" ON roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read departments" ON departments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read job_roles" ON job_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read competency_domains" ON competency_domains FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read competencies" ON competencies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read competency_levels" ON competency_levels FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read role_competencies" ON role_competencies FOR SELECT TO authenticated USING (true);

-- User Roles
CREATE POLICY "Users can view their own roles" 
ON user_roles FOR SELECT 
USING (auth.uid() = user_id);

-- User Competencies
CREATE POLICY "Users can view own competencies" 
ON user_competencies FOR SELECT 
USING (auth.uid() = user_id);

-- Audit Logs
-- Regular users cannot read or write audit logs directly (should be done via service_role key)
CREATE POLICY "Service role only for audit logs" 
ON audit_logs 
USING (false);

-- System Admin policies can be added using a helper function in a future phase
