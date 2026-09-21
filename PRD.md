# PRD.md — Magnus AI

## 1. Product Overview

**Product Name:** Magnus AI  
**Problem Statement:** Smart India Hackathon 2026 — PS 26101  
**Organization:** Ministry of Statistics & Programme Implementation (MoSPI)  
**Department:** Data Informatics & Innovation Division (DIID)  
**Theme:** Smart Education  
**Category:** Software

Magnus AI is an AI-enabled Skill Intelligence and Learning Platform for professionals in India's Official Statistical System. It identifies competency gaps, recommends personalized learning pathways using iGOT Karmayogi resources and NSSTA/TPAC-recommended training programmes, and generates MCQs/quizzes from uploaded learning materials.

The platform is designed as a decision-support and continuous-learning layer. It should not replace iGOT Karmayogi or claim access to government APIs unless authorized credentials/endpoints are actually available.

## 2. Problem

Officials working in data collection, processing, analysis, dissemination and policy support need continuous upskilling in statistics, technology, digital governance and managerial competencies.

The target problem is that learning resources can be difficult to align with:
- Job role and responsibilities
- Current competency level
- Previous training
- Departmental priorities
- Future skill requirements
- Career progression

Magnus AI closes this gap through competency assessment, skill-gap analysis, explainable recommendations, learning tracking and continuous reassessment.

## 3. Product Vision

> Convert an official's profile and learning evidence into an explainable competency profile, identify what is missing, recommend what to learn next, and verify whether learning improved competency.

## 4. Target Users

### 4.1 Learner / Official
Officials and employees involved in India's Official Statistical System.

Needs:
- Build/update professional profile
- Assess competencies
- See skill gaps
- Receive personalized learning pathways
- Discover iGOT and NSSTA/TPAC resources
- Take quizzes and assessments
- Ask the AI assistant for learning support
- Track progress and competency growth

### 4.2 Trainer / Content Manager
Authorized personnel who create or manage learning assessments.

Needs:
- Upload learning materials
- Generate MCQs/quizzes with AI
- Review/edit generated questions
- Publish assessments
- View learner performance

### 4.3 Administrator
Organization-level capacity-building manager.

Needs:
- Monitor workforce competencies
- View skill-gap distribution
- Track training completion
- Analyze training effectiveness
- Identify emerging skill requirements
- View organization-level analytics

### 4.4 Super Administrator
System operator for the prototype.

Needs:
- Manage users, roles, competency frameworks and integrations
- Configure system settings
- Review audit logs
- Manage demo datasets

## 5. Core Competency Domains

Magnus AI shall support the competency domains specified by the problem statement:

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

## 6. Competency Model

Use five explainable levels:

| Level | Meaning |
|---|---|
| L1 | Awareness |
| L2 | Basic |
| L3 | Working |
| L4 | Advanced |
| L5 | Expert |

The framework must allow each competency to define level-specific descriptions.

## 7. Functional Requirements

### FR-01 Authentication & Access
- Email/password authentication for prototype.
- Role-based access control.
- Learner, Trainer, Administrator and Super Administrator roles.
- Supabase Auth shall be used.
- Government SSO is an integration-ready future capability, not a simulated claim.

### FR-02 Professional Profile
Capture:
- Name
- Designation
- Department
- Job role
- Current assignment
- Educational qualifications
- Work experience
- Previous training
- Certifications
- Learning history

### FR-03 Competency Assessment
- Present competency-based assessment questions.
- Map questions to competencies.
- Calculate assessment performance.
- Produce competency evidence.
- Store assessment attempts.
- Show explainable results.

### FR-04 Skill-Gap Analysis
Compare:
`Current Competency Level` against `Required Competency Level for Role`.

For each competency show:
- Current level
- Required level
- Gap
- Priority
- Evidence
- Recommended action

### FR-05 Personalized Recommendation
Recommendations shall consider:
- Current competency
- Skill gaps
- Job role
- Previous learning
- Departmental priorities
- Future requirements
- Emerging technologies
- Career progression
- Resource level/difficulty

Recommendation sources:
- iGOT Karmayogi
- NSSTA/TPAC programmes
- Approved internal learning resources

### FR-06 iGOT Integration Layer
The application shall use an adapter-based integration design.

The adapter should support, when authorized APIs are available:
- Course catalogue retrieval
- Course metadata synchronization
- Course links
- Enrolment/completion status
- Learning-history synchronization

During no-fund prototype development, mock/static course data may be used, but it must be clearly marked as demo data.

### FR-07 NSSTA/TPAC Training
Maintain structured training-programme metadata and map programmes to competencies, roles and levels.

### FR-08 Learning Path
Generate an ordered pathway:
1. Foundational learning
2. Skill-building
3. Domain application
4. Advanced learning
5. Assessment/reassessment

### FR-09 AI Material-to-Assessment
Trainer can upload supported learning content.

Prototype formats:
- PDF
- PPT/PPTX
- DOC/DOCX
- TXT

Future extension:
- Video/transcript sources

Pipeline:
Upload → Extract → Chunk → Retrieve → Generate → Validate → Review → Publish.

### FR-10 MCQ/Quiz Generation
Generated question object must include:
- Question
- Options
- Correct answer
- Explanation
- Difficulty
- Competency/topic
- Source reference/page when available

AI-generated questions must be reviewable before publishing.

### FR-11 Quiz Evaluation
- Instant objective evaluation.
- Score calculation.
- Answer explanations.
- Competency-linked performance.
- Personalized feedback.
- Assessment history.

### FR-12 Continuous Competency Update
Assessment and learning evidence can update competency evidence according to the configured scoring policy.

No competency change should occur silently. The system should store the evidence and calculation event.

### FR-13 AI Learning Assistant
Provide contextual support for:
- Competency explanation
- Course explanation
- Uploaded-material Q&A
- Learning guidance
- Assessment feedback

The assistant should use grounded sources where applicable.

### FR-14 Learner Dashboard
Display:
- Overall competency
- Competency by domain
- Skill gaps
- Recommended learning
- Learning path
- Learning hours
- Course progress
- Assessment performance
- Recent competency changes

### FR-15 Administrator Dashboard
Display aggregated:
- Workforce competency distribution
- Skill-gap distribution
- Training participation
- Completion rates
- Assessment performance
- Training effectiveness
- Emerging skill requirements
- Department/role filters

No personally identifiable learner details should appear to administrators unless their role permits it.

### FR-16 Auditability
Record important events:
- Login
- Role changes
- Profile changes
- Assessment attempts
- Recommendation generation
- Material uploads
- Question generation
- Question approval/publication
- Administrative changes

## 8. Non-Functional Requirements

### Security
- RBAC
- Supabase RLS
- Secure authentication
- HTTPS in deployment
- Protected storage
- Input validation
- File type/size validation
- Secrets only in environment variables

### Privacy
- Collect only necessary data.
- Never expose secrets to the frontend.
- Do not send unnecessary personal data to LLM providers.
- Use synthetic/demo data during SIH development.

### Performance
- Dashboard should load efficiently.
- Long AI operations should show progress/loading states.
- Use pagination for large lists.
- Cache course/catalogue metadata where appropriate.

### Scalability
- Modular service boundaries.
- API adapter pattern.
- Database indexes.
- Vector search isolated from transactional data.
- AI provider abstraction.

### Explainability
Recommendations and competency changes should expose:
- Evidence
- Relevant competency
- Required level
- Current level
- Gap
- Recommendation rationale

## 9. MVP Scope for SIH

Must demonstrate:
1. Authentication
2. Learner profile
3. Competency framework
4. Role-to-competency mapping
5. Competency assessment
6. Skill-gap analysis
7. Personalized recommendations
8. iGOT-style/API-ready course integration
9. NSSTA/TPAC training data
10. Upload learning material
11. AI MCQ/quiz generation
12. Quiz evaluation
13. Competency update
14. Learner dashboard
15. Admin dashboard
16. Basic AI assistant

## 10. Out of Scope for Initial No-Fund Prototype

- Production government SSO
- Real government employee data
- Unverified direct iGOT API access
- Full replacement of iGOT
- Large-scale enterprise deployment
- Paid AI infrastructure
- Paid vector databases
- Paid analytics tools
- Native mobile application

These can be future integrations.

## 11. Success Criteria

A successful SIH prototype should demonstrate one complete closed loop:

Profile → Assessment → Competency Profile → Gap Analysis → Recommendation → Learning → AI Quiz → Evaluation → Competency Update → New Recommendation.

The demo should also show the same data producing organization-level insights on the administrator dashboard.

## 12. Product Principle

Magnus AI is **competency-first, explainable, role-aware, interoperable and learning-loop driven**.
