-- Competency Domains
CREATE TABLE competency_domains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    sort_order INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Competencies
CREATE TABLE competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    domain_id UUID REFERENCES competency_domains(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Competency Levels
CREATE TABLE competency_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level_no INTEGER UNIQUE NOT NULL,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role Competencies (Required competencies for a job role)
CREATE TABLE role_competencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_role_id UUID REFERENCES job_roles(id) ON DELETE CASCADE,
    competency_id UUID REFERENCES competencies(id) ON DELETE CASCADE,
    required_level INTEGER NOT NULL,
    priority_weight NUMERIC DEFAULT 1,
    required BOOLEAN DEFAULT TRUE,
    source_reference TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(job_role_id, competency_id)
);
