-- Profiles
CREATE INDEX idx_profiles_department_id ON profiles(department_id);
CREATE INDEX idx_profiles_job_role_id ON profiles(job_role_id);

-- User Competencies
CREATE INDEX idx_user_competencies_user_id ON user_competencies(user_id);
CREATE INDEX idx_user_competencies_competency_id ON user_competencies(competency_id);

-- Role Competencies
CREATE INDEX idx_role_competencies_job_role_id ON role_competencies(job_role_id);
CREATE INDEX idx_role_competencies_competency_id ON role_competencies(competency_id);
