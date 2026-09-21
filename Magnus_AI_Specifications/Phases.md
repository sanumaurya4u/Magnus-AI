# Phases.md — Magnus AI

## 1. Development Strategy

Magnus AI must be developed incrementally. Do not ask an AI coding agent to build the entire platform in one pass.

Each phase must:
- Have a clear objective
- Build on the previous phase
- End with a working state
- Include validation
- Avoid unrelated changes

The sequence below is the recommended SIH development roadmap.

---

# Phase 0 — Project Initialization

## Goal
Create the development foundation.

### Tasks
- Initialize Git repository.
- Create React/Vite frontend.
- Create FastAPI backend.
- Configure TypeScript/Python tooling.
- Configure Tailwind CSS.
- Configure Supabase project.
- Configure Antigravity MCP.
- Add environment variable templates.
- Create documentation files.

### Deliverable

```text
Frontend runs
Backend runs
Supabase connects
Git works
Environment configuration exists
```

### Validation
- `npm run dev` works.
- Backend health endpoint works.
- Supabase connection can be verified safely.
- No secrets committed.

---

# Phase 1 — Authentication & Application Shell

## Goal
Create the secure application foundation.

### Features
- Login
- Logout
- Session handling
- Protected routes
- Role-based navigation
- Learner layout
- Trainer layout
- Admin layout
- Error page
- Loading states

### Roles
- Learner
- Trainer
- Administrator
- Super Administrator

### Deliverable

A user can log in and reach the correct dashboard based on role.

### Validation
- Unauthenticated users cannot access protected pages.
- Learner cannot access admin pages.
- Logout invalidates the session.

---

# Phase 2 — Database Foundation

## Goal
Implement the core Supabase schema.

### Tables
- profiles
- roles
- departments
- competencies
- competency_levels
- job_roles
- role_competencies
- user_competencies
- audit_logs

### Tasks
- Create migrations.
- Add indexes.
- Add foreign keys.
- Enable RLS.
- Create policies.
- Seed synthetic competency data.

### Deliverable

A functioning competency data model with tested RLS.

### Validation
Test:
- Learner can access own profile.
- Learner cannot access another learner's private data.
- Admin can access authorized aggregate data.
- Trainer cannot perform super-admin operations.

---

# Phase 3 — Learner Profile & Competency Passport

## Goal
Create the professional profile required by the problem statement.

### Features
- Profile creation
- Profile editing
- Designation
- Department
- Job role
- Current assignment
- Education
- Experience
- Previous training
- Certifications

### UI
Create a visual:

> Competency Passport

showing:
- Profile completeness
- Current role
- Competency summary
- Training history

### Deliverable

A learner can complete a profile and view their competency passport.

---

# Phase 4 — Competency Framework

## Goal
Build the Official Statistics competency model.

### Domains

```text
Statistical
Technical
Digital Governance
Behavioural & Managerial
```

### Initial competency seed

Include the competencies specified by the problem statement.

### Level system

```text
L1 Awareness
L2 Basic
L3 Working
L4 Advanced
L5 Expert
```

### Tasks
- Competency catalogue
- Level definitions
- Job-role catalogue
- Role competency matrix

### Deliverable

Selecting a role produces its required competency profile.

---

# Phase 5 — Competency Assessment

## Goal
Determine evidence for current competency.

### Features
- Assessment selection
- Competency-linked questions
- MCQ interface
- Progress indicator
- Timer where appropriate
- Submit
- Evaluation
- Result screen

### Data
Store:
- Assessment
- Questions
- Options
- Correct answer
- Competency
- Attempt
- Responses
- Score
- Evidence

### Deliverable

A learner completes an assessment and receives competency evidence.

---

# Phase 6 — Skill-Gap Engine

## Goal
Compare current competency with required competency.

### Formula

```text
Gap = Required Level - Current Level
```

### Output
For each competency:

```text
Current
Required
Gap
Priority
Evidence
```

### UI
Create:
- Skill-gap cards
- Domain breakdown
- Competency heatmap
- Priority indicators

### Deliverable

The system identifies high, medium and low priority gaps.

### Validation
Use deterministic test cases.

---

# Phase 7 — Learning Resource Catalogue

## Goal
Create the learning resource foundation.

### Resource types

```text
iGOT Course
NSSTA Programme
TPAC Recommended Programme
Internal Resource
```

### Metadata
- Title
- Description
- Provider
- Competencies
- Difficulty
- Duration
- Role relevance
- URL/source
- Status

### Prototype
Seed synthetic/demo catalogue data.

### Deliverable

Searchable/filterable learning catalogue.

---

# Phase 8 — iGOT/NSSTA Integration Layer

## Goal
Prepare interoperability without depending on unavailable credentials.

### Tasks
- Create adapter interface.
- Create mock iGOT adapter.
- Create mock NSSTA/TPAC adapter.
- Normalize resource metadata.
- Add source labels.

### Future adapter
Prepare for authorized:
- Catalogue retrieval
- Course status
- Enrolment
- Completion

### Deliverable

The recommendation engine can consume learning resources through a common interface.

### Validation
Switch between mock data and adapter without changing recommendation business logic.

---

# Phase 9 — Recommendation Engine

## Goal
Generate personalized recommendations.

### Inputs
- Role
- Skill gaps
- Competency levels
- Learning history
- Department
- Priority
- Future requirements
- Resource metadata

### Pipeline

```text
Gap
 ↓
Candidate resources
 ↓
Filter
 ↓
Match
 ↓
Rank
 ↓
Explain
```

### Deliverable

Each learner receives a personalized set of learning recommendations.

### Explainability

Every recommendation should show:

```text
Why recommended
Skill addressed
Current level
Required level
Resource difficulty
```

---

# Phase 10 — Personalized Learning Path

## Goal
Turn recommendations into an ordered journey.

### Example

```text
Foundation
 ↓
Skill Building
 ↓
Applied Learning
 ↓
Advanced Learning
 ↓
Assessment
```

### Features
- Start learning
- Mark progress
- Learning hours
- Completion
- Next recommendation

### Deliverable

Learner sees a clear sequence rather than a random course list.

---

# Phase 11 — Learning Material Upload

## Goal
Create the trainer content pipeline.

### Supported formats
- PDF
- PPT/PPTX
- DOC/DOCX
- TXT

### Pipeline

```text
Upload
 ↓
Validate
 ↓
Storage
 ↓
Extract
 ↓
Clean
 ↓
Chunk
```

### Deliverable

Trainer can upload material and see processing status.

---

# Phase 12 — AI MCQ/Quiz Generator

## Goal
Generate assessments from uploaded learning content.

### Input
- Material
- Number of questions
- Difficulty
- Competency/topic
- Question type

### Output

```text
Question
Options
Correct answer
Explanation
Difficulty
Competency
Source reference
```

### Required control
Trainer reviews questions before publication.

### Deliverable

A trainer uploads a document and generates a reviewable quiz.

---

# Phase 13 — Quiz Evaluation & Feedback

## Goal
Create continuous assessment.

### Features
- Take quiz
- Instant scoring
- Explanations
- Competency-linked result
- Feedback
- Attempt history

### Deliverable

Learner receives meaningful feedback after every assessment.

---

# Phase 14 — Continuous Competency Update

## Goal
Close the learning loop.

### Flow

```text
Learning
 ↓
Assessment
 ↓
Evidence
 ↓
Competency update
 ↓
Gap update
 ↓
Recommendation update
```

### Rules
- Use configured scoring policy.
- Store evidence.
- Store before/after values.
- Make changes auditable.

### Deliverable

A learner's competency profile changes based on new evidence.

---

# Phase 15 — AI Learning Assistant

## Goal
Create Magnus AI Assistant.

### Features
- Ask about competency
- Explain skill gap
- Explain course
- Ask questions about uploaded material
- Provide learning guidance
- Explain quiz answers

### Architecture
Use RAG for document-grounded answers.

### Deliverable

Context-aware AI assistant inside the learner experience.

---

# Phase 16 — Learner Dashboard

## Goal
Build the primary learner command center.

### Widgets
- Overall competency
- Competency domains
- Skill gaps
- Learning path
- Recommendations
- Learning hours
- Assessment scores
- Recent activity

### Deliverable

One dashboard communicates the learner's complete learning status.

---

# Phase 17 — Trainer Dashboard

## Goal
Give trainers control over assessment content.

### Features
- Materials
- Generated quizzes
- Review queue
- Published assessments
- Learner performance
- Question quality controls

### Deliverable

Trainer can manage the complete material-to-assessment workflow.

---

# Phase 18 — Administrator Dashboard

## Goal
Provide organization-level workforce intelligence.

### Metrics
- Workforce competency
- Skill-gap distribution
- Training participation
- Completion
- Assessment performance
- Training effectiveness
- Emerging skills

### Filters
- Department
- Job role
- Competency domain
- Time period

### Deliverable

Admin can identify organization-level capability gaps.

---

# Phase 19 — Emerging Skill Intelligence

## Goal
Support future capacity-building analysis.

### Inputs
- Existing gaps
- Department priorities
- Future job requirements
- Emerging technology metadata
- Historical learning trends

### Output
- Emerging skill areas
- Workforce readiness indicators
- Training priority signals

### Important
Do not present speculative predictions as facts. Label analytical projections clearly.

---

# Phase 20 — Security Hardening

## Goal
Review the entire application for security.

### Checklist
- RLS
- Role authorization
- File upload security
- API authorization
- Secret handling
- Input validation
- Rate limits
- Error sanitization
- Audit logging
- Storage policies

### Deliverable

Security review completed before public demo.

---

# Phase 21 — Testing

## Goal
Validate the complete platform.

### Unit tests
- Competency calculations
- Gap calculation
- Recommendation ranking
- MCQ schema validation

### Integration tests
- Auth
- Database
- RLS
- File upload
- AI generation
- Assessment evaluation

### End-to-end
```text
Login
→ Profile
→ Assessment
→ Gap
→ Recommendation
→ Learning
→ Quiz
→ Competency update
→ Dashboard
```

---

# Phase 22 — Demo Dataset & SIH Scenario

## Goal
Create a deterministic hackathon demonstration.

### Demo persona
Use a fictional official.

Example:

```text
Name:
Ananya Sharma

Role:
Junior Statistical Officer

Department:
Labour Statistics

Experience:
2 years
```

### Demo gaps

```text
Python
Sampling
SQL
```

### Demo journey
1. Login
2. View profile
3. Start competency assessment
4. Show skill gaps
5. Show personalized recommendations
6. Open learning resource
7. Upload learning material as trainer
8. Generate MCQs
9. Take quiz
10. Show competency update
11. Open admin analytics

### Deliverable

A repeatable 3–5 minute demonstration.

---

# Phase 23 — UI/UX Polish

## Goal
Make the prototype presentation-ready.

### Tasks
- Responsive layout
- Empty states
- Loading states
- Error states
- Accessible components
- Consistent spacing
- Chart cleanup
- Navigation polish
- Mobile/tablet support
- Demo-safe fallback data

Do not add decorative complexity that can introduce instability.

---

# Phase 24 — Deployment

## Goal
Deploy a stable SIH prototype.

### Frontend
Deploy to Vercel/free tier.

### Backend
Deploy to a suitable free-tier or approved environment.

### Database
Supabase.

### Final checks
- Environment variables
- CORS
- RLS
- Storage
- API connectivity
- AI provider
- Mock integration fallback

---

# Phase 25 — SIH Final Readiness

## Goal
Prepare the complete submission/demo.

### Verify
- Problem statement alignment
- Architecture
- Innovation
- Security
- Scalability
- Demo
- Pitch deck
- Q&A
- Screenshots
- Deployment URL
- Source code
- Documentation

### Final story

```text
Problem
 ↓
Magnus AI
 ↓
Competency Intelligence
 ↓
Skill Gap
 ↓
Personalized Learning
 ↓
AI Assessment
 ↓
Competency Improvement
 ↓
Workforce Intelligence
```

---

# 3. Phase Execution Rule for Antigravity

Never ask the coding agent:

> “Build the entire Magnus AI application.”

Instead issue one phase at a time.

For each phase:

```text
1. Read all project MD files.
2. Identify the current phase.
3. Inspect existing implementation.
4. Implement only the phase scope.
5. Test it.
6. Fix errors.
7. Verify no previous feature broke.
8. Summarize changed files.
9. Stop.
```

Only proceed to the next phase after the current phase is stable.

---

# 4. Recommended SIH MVP Cut Line

If time becomes limited, complete these first:

```text
Phase 0
Phase 1
Phase 2
Phase 3
Phase 4
Phase 5
Phase 6
Phase 7
Phase 8
Phase 9
Phase 10
Phase 11
Phase 12
Phase 13
Phase 14
Phase 16
Phase 18
Phase 22
Phase 23
Phase 24
```

The remaining phases can be presented as extensions if necessary.

---

# 5. Phase Completion Standard

A phase is complete only if:

- Feature works
- Database state is correct
- RLS is tested where applicable
- Error state exists
- Loading state exists
- No secrets are exposed
- No existing feature is broken
- Relevant tests pass
- Documentation remains consistent

