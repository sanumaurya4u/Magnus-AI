-- Seed Roles
INSERT INTO roles (code, name, description) VALUES
('learner', 'Learner', 'Standard user who participates in learning'),
('trainer', 'Trainer', 'User who creates assessments and uploads materials'),
('administrator', 'Administrator', 'User who views organization analytics'),
('super_admin', 'Super Administrator', 'Full system access')
ON CONFLICT (code) DO NOTHING;

-- Seed Competency Domains
INSERT INTO competency_domains (name, sort_order) VALUES
('Statistical', 1),
('Technical', 2),
('Digital Governance', 3),
('Behavioural & Managerial', 4)
ON CONFLICT (name) DO NOTHING;

-- Seed Competency Levels
INSERT INTO competency_levels (level_no, code, name, description) VALUES
(1, 'L1', 'Awareness', 'Basic knowledge and awareness'),
(2, 'L2', 'Basic', 'Can perform tasks with assistance'),
(3, 'L3', 'Working', 'Can perform tasks independently'),
(4, 'L4', 'Advanced', 'Can guide others and handle complex tasks'),
(5, 'L5', 'Expert', 'Strategic understanding and innovation')
ON CONFLICT (level_no) DO NOTHING;

-- Seed Competencies (We'll use a subset for demo)
-- Assuming we look up domain_ids using a DO block or subqueries
DO $$
DECLARE
    stat_id UUID;
    tech_id UUID;
    gov_id UUID;
    behav_id UUID;
BEGIN
    SELECT id INTO stat_id FROM competency_domains WHERE name = 'Statistical';
    SELECT id INTO tech_id FROM competency_domains WHERE name = 'Technical';
    SELECT id INTO gov_id FROM competency_domains WHERE name = 'Digital Governance';
    SELECT id INTO behav_id FROM competency_domains WHERE name = 'Behavioural & Managerial';

    -- Statistical
    INSERT INTO competencies (domain_id, name, code) VALUES
    (stat_id, 'Survey Design', 'STAT_SURVEY'),
    (stat_id, 'Sampling', 'STAT_SAMPLING'),
    (stat_id, 'National Accounts', 'STAT_NAT_ACC')
    ON CONFLICT (code) DO NOTHING;

    -- Technical
    INSERT INTO competencies (domain_id, name, code) VALUES
    (tech_id, 'Python', 'TECH_PYTHON'),
    (tech_id, 'SQL', 'TECH_SQL'),
    (tech_id, 'Data Visualization', 'TECH_DATAVIZ')
    ON CONFLICT (code) DO NOTHING;

    -- Digital Governance
    INSERT INTO competencies (domain_id, name, code) VALUES
    (gov_id, 'Cybersecurity', 'GOV_CYBER'),
    (gov_id, 'Data Privacy', 'GOV_PRIVACY')
    ON CONFLICT (code) DO NOTHING;

    -- Behavioural & Managerial
    INSERT INTO competencies (domain_id, name, code) VALUES
    (behav_id, 'Leadership', 'BEHAV_LEAD'),
    (behav_id, 'Communication', 'BEHAV_COMM')
    ON CONFLICT (code) DO NOTHING;
END $$;
