# Database.md — Magnus AI

## 1. Database Objective

Magnus AI uses Supabase PostgreSQL as the primary transactional database.

The database must support:
- Authentication
- User profiles
- Roles
- Departments
- Competency framework
- Job roles
- Required competencies
- Current competency evidence
- Skill-gap analysis
- Learning resources
- iGOT/NSSTA/TPAC sources
- Recommendations
- Learning paths
- Learning progress
- Assessments
- Questions
- Attempts
- Uploaded materials
- AI-generated questions
- Analytics
- Audit logs

The database must enforce security using PostgreSQL Row Level Security (RLS).

## 2. Database Principles

1. Use UUID primary keys.
2. Use foreign keys for relationships.
3. Use timestamps for important records.
4. Prefer normalized transactional tables.
5. Use indexes for frequent filters.
6. Enable RLS on user-sensitive tables.
7. Keep audit evidence for important AI/competency events.
8. Do not store secrets in the database unless explicitly required and securely handled.
9. Use synthetic/demo records for SIH development.
10. Use migrations for schema changes.

## 3. High-Level ER Model

```text
auth.users
    |
    v
profiles ----< user_roles >---- roles
    |
    +---- departments
    |
    +---- job_roles
    |
    +---- user_competencies ----> competencies
    |
    +---- assessment_attempts ----> assessments
    |
    +---- learning_progress ----> learning_resources
    |
    +---- recommendations
    |
    +---- learning_paths
    |
    +---- audit_logs

job_roles ----< role_competencies >---- competencies

competencies ----< competency_levels

learning_resources ----< resource_competencies >---- competencies

materials ----< generated_assessments ----< assessment_questions

assessment_questions ----> competencies

assessment_attempts ----< attempt_answers

training_programmes ----< programme_competencies >---- competencies
```

## 4. Authentication

Supabase Auth owns authentication identity.

Do not duplicate password storage.

Use:

```text
auth.users.id
      |
      v
public.profiles.id
```

The `profiles.id` should reference `auth.users.id`.

## 5. Table: profiles

Stores professional profile data.

```sql
profiles
--------
id uuid PK references auth.users(id)
full_name text
employee_code text nullable
designation text
department_id uuid FK
job_role_id uuid FK
current_assignment text
education_summary text
years_of_experience numeric
bio text nullable
avatar_url text nullable
is_active boolean default true
created_at timestamptz
updated_at timestamptz
```

### Security
Learner:
- SELECT own profile
- INSERT own profile
- UPDATE own profile

Administrator:
- SELECT according to organizational permission

Super Administrator:
- Full administrative management

## 6. Table: roles

```sql
roles
-----
id uuid PK
code text unique
name text
description text
created_at timestamptz
```

Seed:

```text
learner
trainer
administrator
super_admin
```

## 7. Table: user_roles

```sql
user_roles
----------
id uuid PK
user_id uuid FK -> profiles.id
role_id uuid FK -> roles.id
created_at timestamptz
unique(user_id, role_id)
```

### Security
Users should not be allowed to self-assign privileged roles.

Role changes must be performed by authorized administrators or secure server-side workflows.

## 8. Table: departments

```sql
departments
-----------
id uuid PK
name text
code text unique
description text
is_active boolean
created_at timestamptz
updated_at timestamptz
```

Examples may include demo divisions relevant to Official Statistics.

Do not invent real organizational hierarchy as official data without source verification.

## 9. Table: job_roles

```sql
job_roles
---------
id uuid PK
name text
code text unique
description text
career_level text nullable
is_active boolean
created_at timestamptz
updated_at timestamptz
```

## 10. Table: competency_domains

```sql
competency_domains
------------------
id uuid PK
name text unique
description text
sort_order integer
created_at timestamptz
```

Seed domains:

```text
Statistical
Technical
Digital Governance
Behavioural & Managerial
```

## 11. Table: competencies

```sql
competencies
------------
id uuid PK
domain_id uuid FK
name text
code text unique
description text
is_active boolean
created_at timestamptz
updated_at timestamptz
```

Seed competencies from the problem statement.

### Statistical
- Survey Design
- Sampling
- National Accounts
- Price Statistics
- Labour Statistics
- Agricultural Statistics
- Industrial Statistics
- SDG Indicators
- Metadata Standards
- Data Quality Frameworks

### Technical
- Python
- R
- SQL
- Stata
- SPSS
- SAS
- GIS
- Data Visualization
- AI/ML
- Cloud Computing
- APIs
- Open Data

### Digital Governance
- Cybersecurity
- Data Privacy
- Digital Signatures
- Government Cloud
- Digital Public Infrastructure

### Behavioural & Managerial
- Leadership
- Communication
- Project Management
- Ethics
- Decision Making
- Change Management

## 12. Table: competency_levels

```sql
competency_levels
-----------------
id uuid PK
level_no integer unique
code text unique
name text
description text
created_at timestamptz
```

Seed:

```text
1 | L1 | Awareness
2 | L2 | Basic
3 | L3 | Working
4 | L4 | Advanced
5 | L5 | Expert
```

## 13. Table: role_competencies

Defines required competency level for each job role.

```sql
role_competencies
-----------------
id uuid PK
job_role_id uuid FK
competency_id uuid FK
required_level integer
priority_weight numeric default 1
required boolean default true
source_reference text nullable
created_at timestamptz
updated_at timestamptz
unique(job_role_id, competency_id)
```

This is the core required-competency matrix.

## 14. Table: user_competencies

Stores the current competency state.

```sql
user_competencies
-----------------
id uuid PK
user_id uuid FK -> profiles.id
competency_id uuid FK
current_level integer
confidence numeric
status text
last_assessed_at timestamptz nullable
evidence_count integer default 0
created_at timestamptz
updated_at timestamptz
unique(user_id, competency_id)
```

Allowed `status` values may be:

```text
not_assessed
developing
on_track
strong
```

Do not use status as a replacement for the numeric level.

## 15. Table: competency_evidence

Every competency update should have evidence.

```sql
competency_evidence
-------------------
id uuid PK
user_id uuid FK
competency_id uuid FK
source_type text
source_id uuid nullable
previous_level integer nullable
observed_level integer
score numeric nullable
confidence numeric nullable
evidence_summary text
created_at timestamptz
```

Possible `source_type`:

```text
initial_profile
competency_assessment
quiz
course_completion
trainer_review
manual_admin_review
```

## 16. Table: assessments

Represents a competency assessment or published quiz.

```sql
assessments
-----------
id uuid PK
title text
description text
assessment_type text
created_by uuid FK -> profiles.id
status text
difficulty text nullable
time_limit_minutes integer nullable
total_questions integer
created_at timestamptz
updated_at timestamptz
published_at timestamptz nullable
```

Example `assessment_type`:

```text
competency_assessment
generated_quiz
manual_quiz
```

Status:

```text
draft
review
published
archived
```

## 17. Table: assessment_questions

```sql
assessment_questions
--------------------
id uuid PK
assessment_id uuid FK
question_text text
options jsonb
correct_option text
explanation text
difficulty text
competency_id uuid FK nullable
source_reference text nullable
question_order integer
generated_by_ai boolean default false
review_status text default 'pending'
created_at timestamptz
updated_at timestamptz
```

### Important
AI-generated questions should not automatically become published questions.

Review status:

```text
pending
approved
rejected
edited
```

## 18. Table: assessment_attempts

```sql
assessment_attempts
-------------------
id uuid PK
assessment_id uuid FK
user_id uuid FK
started_at timestamptz
submitted_at timestamptz nullable
score numeric nullable
percentage numeric nullable
status text
```

Status:

```text
in_progress
submitted
evaluated
abandoned
```

## 19. Table: attempt_answers

```sql
attempt_answers
---------------
id uuid PK
attempt_id uuid FK
question_id uuid FK
selected_option text
is_correct boolean
answered_at timestamptz
```

## 20. Table: learning_resources

Unified learning-resource catalogue.

```sql
learning_resources
------------------
id uuid PK
external_id text nullable
title text
description text
resource_type text
provider_name text
source_system text
url text nullable
difficulty text nullable
duration_minutes integer nullable
language text default 'English'
metadata jsonb default '{}'
is_active boolean default true
created_at timestamptz
updated_at timestamptz
```

`source_system` examples:

```text
igot
nssta
tpac
internal
demo
```

## 21. Table: resource_competencies

```sql
resource_competencies
---------------------
id uuid PK
resource_id uuid FK
competency_id uuid FK
relevance_score numeric default 1
target_level integer nullable
created_at timestamptz
unique(resource_id, competency_id)
```

This allows one learning resource to support multiple competencies.

## 22. Table: training_programmes

For structured NSSTA/TPAC programme metadata.

```sql
training_programmes
-------------------
id uuid PK
external_id text nullable
name text
description text
provider_name text
source_system text
eligibility text nullable
schedule_text text nullable
duration_text text nullable
source_url text nullable
metadata jsonb default '{}'
is_demo boolean default false
created_at timestamptz
updated_at timestamptz
```

Do not populate official programme claims without authoritative source data.

## 23. Table: programme_competencies

```sql
programme_competencies
----------------------
id uuid PK
programme_id uuid FK
competency_id uuid FK
target_level integer nullable
relevance_score numeric default 1
created_at timestamptz
unique(programme_id, competency_id)
```

## 24. Table: learning_paths

```sql
learning_paths
--------------
id uuid PK
user_id uuid FK
title text
description text
status text
generated_reason text nullable
created_at timestamptz
updated_at timestamptz
```

Status:

```text
draft
active
completed
archived
```

## 25. Table: learning_path_items

```sql
learning_path_items
-------------------
id uuid PK
learning_path_id uuid FK
resource_id uuid FK nullable
programme_id uuid FK nullable
sequence_no integer
stage text
status text
is_required boolean
recommended_reason text
created_at timestamptz
completed_at timestamptz nullable
```

Exactly one of `resource_id` or `programme_id` should normally be populated.

## 26. Table: learning_progress

```sql
learning_progress
-----------------
id uuid PK
user_id uuid FK
resource_id uuid FK
status text
progress_percent numeric default 0
learning_minutes integer default 0
started_at timestamptz nullable
completed_at timestamptz nullable
last_activity_at timestamptz
created_at timestamptz
updated_at timestamptz
unique(user_id, resource_id)
```

Status:

```text
not_started
in_progress
completed
```

## 27. Table: recommendations

Stores explainable recommendation results.

```sql
recommendations
---------------
id uuid PK
user_id uuid FK
resource_id uuid FK nullable
programme_id uuid FK nullable
competency_id uuid FK nullable
score numeric
rank integer
reason jsonb
generated_by text
model_version text nullable
status text
created_at timestamptz
expires_at timestamptz nullable
```

`reason` may contain:

```json
{
  "gap_match": 0.94,
  "role_match": 0.91,
  "difficulty_match": 0.88,
  "history_match": 0.80,
  "explanation": "Addresses the learner's Python gap..."
}
```

## 28. Table: materials

Stores uploaded learning material metadata.

```sql
materials
---------
id uuid PK
uploaded_by uuid FK -> profiles.id
file_name text
storage_path text
mime_type text
file_size_bytes bigint
status text
processing_error text nullable
extracted_text_path text nullable
created_at timestamptz
processed_at timestamptz nullable
```

Status:

```text
uploaded
processing
ready
failed
deleted
```

## 29. Table: material_chunks

For RAG.

```sql
material_chunks
---------------
id uuid PK
material_id uuid FK
chunk_index integer
content text
page_number integer nullable
section_title text nullable
embedding vector nullable
metadata jsonb default '{}'
created_at timestamptz
```

If pgvector is enabled, use an embedding dimension matching the selected embedding model.

Do not hard-code an embedding dimension until the model is selected.

## 30. Table: generated_assessments

Tracks AI-generated assessment jobs.

```sql
generated_assessments
---------------------
id uuid PK
material_id uuid FK
requested_by uuid FK
question_count integer
difficulty text
competency_id uuid FK nullable
status text
model_provider text nullable
model_name text nullable
prompt_version text nullable
error_message text nullable
created_at timestamptz
completed_at timestamptz nullable
```

Status:

```text
queued
processing
generated
review
published
failed
```

## 31. Table: ai_generation_events

Optional but recommended for auditability.

```sql
ai_generation_events
--------------------
id uuid PK
user_id uuid FK nullable
generation_type text
entity_type text
entity_id uuid nullable
provider text
model text
prompt_version text
input_reference text nullable
output_hash text nullable
status text
created_at timestamptz
```

Do not store raw sensitive prompts/outputs unless necessary.

## 32. Table: audit_logs

```sql
audit_logs
----------
id uuid PK
actor_user_id uuid FK nullable
action text
entity_type text
entity_id uuid nullable
metadata jsonb
created_at timestamptz
```

Examples:
- profile_updated
- role_changed
- assessment_submitted
- recommendation_generated
- material_uploaded
- question_approved
- competency_updated

## 33. Optional: notifications

```sql
notifications
-------------
id uuid PK
user_id uuid FK
title text
message text
type text
read_at timestamptz nullable
created_at timestamptz
```

## 34. RLS Strategy

RLS is mandatory for:
- profiles
- user_roles
- user_competencies
- competency_evidence
- assessment_attempts
- attempt_answers
- learning_progress
- recommendations
- learning_paths
- materials
- audit_logs

Public catalogue data can have controlled read policies.

## 35. RLS Role Helper

Do not repeatedly implement role logic inconsistently.

Create secure helper functions where appropriate, such as:

```sql
has_role(user_id, role_code)
```

or equivalent secure SQL functions.

Ensure helper functions do not introduce recursive RLS evaluation or privilege escalation.

## 36. Profile Policy Concept

### Learner
```text
SELECT own profile
INSERT own profile
UPDATE own profile
```

### Admin
```text
SELECT authorized organizational data
```

### Super Admin
```text
full administrative access
```

## 37. User Competency Policy

Learner:
- SELECT own
- Cannot directly set arbitrary competency levels

Competency updates should occur through controlled server-side/business workflows.

Trainer:
- Read authorized learner assessment evidence where permitted.

Admin:
- Read authorized aggregated/organizational competency information.

## 38. Assessment Policy

Published assessments:
- Learners can read questions necessary to attempt them.
- Correct answers should not be exposed before submission.

Draft/review assessments:
- Trainers who own/are authorized for them can manage them.

## 39. Material Policy

Trainer:
- Upload
- Read own/authorized materials
- Delete own materials where policy permits

Learner:
- Access only materials/resources intentionally published to them.

Never expose raw storage paths as authorization.

## 40. Learning Progress Policy

Learner:
- Read/write own progress.

Admin:
- Read aggregated progress.

## 41. Recommendation Policy

Learner:
- Read own recommendations.

System:
- Create recommendations.

Admin:
- Read aggregated recommendation analytics.

## 42. Audit Log Policy

Normal users should not be allowed to edit or delete audit logs.

Only authorized server-side administrative processes may write sensitive audit events.

## 43. Storage Buckets

Recommended buckets:

```text
learning-materials
avatars
generated-assets
```

Keep private learning materials in a private bucket.

Use signed URLs or authorized access mechanisms when files need to be downloaded.

## 44. Indexing

Recommended indexes:

```sql
profiles(department_id)
profiles(job_role_id)

user_competencies(user_id)
user_competencies(competency_id)

role_competencies(job_role_id)
role_competencies(competency_id)

competency_evidence(user_id, competency_id)

assessment_questions(assessment_id)
assessment_questions(competency_id)

assessment_attempts(user_id, assessment_id)

learning_progress(user_id)
recommendations(user_id, rank)

learning_resources(source_system)
learning_resources(resource_type)

resource_competencies(competency_id)

materials(uploaded_by)
material_chunks(material_id)
```

Add indexes based on actual query plans as the dataset grows.

## 45. Constraints

Use database constraints for:
- Unique codes
- Foreign keys
- Valid competency levels
- Valid status values
- Non-negative scores
- Progress 0–100
- Positive duration where applicable

Example:

```sql
CHECK (progress_percent >= 0 AND progress_percent <= 100)
```

## 46. Competency Score Policy

The database stores evidence and outcomes.

The application/service layer calculates the competency level using a documented policy.

Do not allow arbitrary client-side writes such as:

```text
UPDATE user_competencies SET current_level = 5
```

from a normal learner client.

## 47. Skill-Gap Query Concept

Conceptually:

```sql
SELECT
    rc.job_role_id,
    rc.competency_id,
    rc.required_level,
    COALESCE(uc.current_level, 0) AS current_level,
    GREATEST(rc.required_level - COALESCE(uc.current_level, 0), 0) AS gap
FROM role_competencies rc
LEFT JOIN user_competencies uc
  ON uc.competency_id = rc.competency_id
WHERE uc.user_id = :user_id
  AND rc.job_role_id = :job_role_id;
```

The final implementation must ensure query security and correct RLS context.

## 48. Recommendation Data Flow

```text
role_competencies
        +
user_competencies
        +
learning_progress
        +
learning_resources
        +
resource_competencies
        ↓
Recommendation Service
        ↓
recommendations
```

## 49. Analytics Data Flow

Use database queries/materialized views where appropriate.

```text
Profiles
Competencies
Skill Gaps
Learning Progress
Assessment Attempts
        ↓
Aggregations
        ↓
Admin Dashboard
```

Avoid loading every learner record into the browser just to calculate aggregate statistics.

## 50. Demo Seed Data

Create deterministic synthetic data for:

### Users
- 5–10 learner personas
- 1 trainer
- 1 administrator
- 1 super administrator

### Roles
- Junior Statistical Officer
- Statistical Officer
- Data Analyst
- Training/Capacity Building Officer
- Administrator

### Competencies
At least 25–30 initial records spanning all four domains.

### Resources
At least 30–50 synthetic/demo learning resources.

### Training programmes
A small clearly-labelled demo set based on verified source material where available.

## 51. Migration Structure

Recommended:

```text
supabase/
├── migrations/
│   ├── 001_extensions.sql
│   ├── 002_roles_departments.sql
│   ├── 003_competencies.sql
│   ├── 004_profiles.sql
│   ├── 005_learning.sql
│   ├── 006_assessments.sql
│   ├── 007_materials_rag.sql
│   ├── 008_rls.sql
│   ├── 009_indexes.sql
│   └── 010_seed_demo.sql
└── config.toml
```

Migration numbers can be adjusted by the actual Supabase CLI workflow.

## 52. Database Environment

Frontend:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Backend:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

The service-role key must never be shipped to the browser.

## 53. Supabase MCP Workflow

When using Supabase MCP through Google Antigravity:

1. Inspect current schema.
2. Confirm intended migration.
3. Apply migration.
4. Verify tables.
5. Verify constraints.
6. Verify indexes.
7. Verify RLS enabled.
8. Test policies.
9. Seed only safe synthetic data.
10. Update Database.md if schema changes materially.

## 54. RLS Testing Matrix

| Action | Learner | Trainer | Admin | Super Admin |
|---|---:|---:|---:|---:|
| Read own profile | Yes | Yes | Yes | Yes |
| Edit own profile | Yes | Yes | Yes | Yes |
| Read another learner private profile | No | Controlled | Controlled | Yes |
| Read own competencies | Yes | Yes | Yes | Yes |
| Arbitrarily edit competency level | No | No | Controlled | Controlled |
| Submit assessment | Yes | Yes if allowed | Optional | Yes |
| Manage own generated quiz | No | Yes | Controlled | Yes |
| View org analytics | No | Limited | Yes | Yes |
| Manage roles | No | No | Controlled | Yes |
| View audit logs | No | Limited | Controlled | Yes |

## 55. Data Retention

Prototype policy:
- Keep only data needed for demonstration and testing.
- Remove unnecessary personal data.
- Use synthetic users.
- Do not upload confidential government documents.

Production retention must be defined by the deploying organization and applicable policies.

## 56. Database Success Criteria

The database is ready when:

- All core tables exist.
- Foreign keys work.
- RLS is enabled.
- Role policies are tested.
- User-owned records are isolated.
- Competency evidence is auditable.
- Learning resources map to competencies.
- Assessment attempts are linked to users.
- Uploaded materials can be tracked.
- RAG chunks can be stored.
- Recommendation results are explainable.
- Admin analytics can be calculated without exposing unnecessary PII.
