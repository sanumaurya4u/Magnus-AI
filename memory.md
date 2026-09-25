# Magnus AI — Project Memory & Progress Tracker (`memory.md`)

> **Note for AI Assistants & LLMs:**  
> This file is the **single source of ground truth** for Magnus AI. Read this file first in every new chat or when switching AI tools. It preserves full project context, architecture decisions, database schema, active endpoints, and current implementation progress. **Do not re-scan the entire repository or make up schemas, endpoints, or government integrations.**

---

## 1. Project Overview & Context

* **Project Name:** Magnus AI
* **Competition / Event:** Smart India Hackathon (SIH) 2026 — Problem Statement **PS 26101**
* **Organization:** Ministry of Statistics & Programme Implementation (MoSPI)
* **Department:** Data Informatics & Innovation Division (DIID)
* **Theme:** Smart Education | **Category:** Software
* **Core Mission:** An AI-enabled Skill Intelligence and Continuous Learning Platform designed specifically for officials and professionals in India's Official Statistical System.
* **Core Product Principle:** Competency-first, explainable, role-aware, interoperable, and learning-loop driven.
* **Closed-Loop Workflow:**  
  $$\text{Profile} \to \text{Competency Assessment} \to \text{Gap Analysis} \to \text{Personalized Recommendations} \to \text{Learning} \to \text{Material Upload \& AI Quiz} \to \text{Evaluation} \to \text{Competency Recalculation} \to \text{Updated Recommendations}$$

### Critical Project Guardrails
1. **Decision Support, Not Replacement:** Magnus AI does **not** replace iGOT Karmayogi. It is a decision-support, gap-analysis, and content-to-assessment layer.
2. **No Hallucinated Government Endpoints:** Never claim a live integration with iGOT or government SSO unless real, authorized credentials exist. All external integrations must use the **Adapter Pattern** with clear synthetic/demo fallbacks.
3. **Deterministic Math for Competency:** AI may explain results, but competency levels and gaps must follow deterministic formulas:
   $$\text{Gap} = \text{Required Level} - \text{Current Level}$$
4. **Free-Tier First:** Built with zero mandatory infrastructure cost (Supabase free tier, Gemini API free tier / developer key, Vercel frontend, Railway/local backend).

---

## 2. Technology Stack & Runtime Specifications

| Layer | Technologies & Libraries | Key Details |
|---|---|---|
| **Frontend** | React 19, Vite 8, TypeScript 6, Tailwind CSS 4, React Router v7, Lucide React, Recharts | Single Page Application (SPA), role-based protected routing (`/learner`, `/trainer`, `/admin`), Supabase JS SDK (`@supabase/supabase-js`) |
| **Backend** | Python 3.12+, FastAPI, Uvicorn, Pydantic, PyMuPDF (`fitz`), Python-multipart | REST API for AI orchestration, document parsing, embeddings generation, vector storage, and MCQ generation |
| **AI / GenAI** | LangChain (`langchain`, `langchain-google-genai`), Google Gemini API | Model: `gemini-2.5-flash` (Structured Outputs for MCQs), Embeddings: `models/text-embedding-004` (768 dimensions) |
| **Database & Vector** | Supabase PostgreSQL 15+, `pgvector` extension, Supabase Auth, Row Level Security (RLS) | Relational schema for profiles, competencies, roles, assessments; `document_chunks` table with pgvector cosine similarity search |
| **Deployment Config** | Frontend: Vercel (`vercel.json`), Backend: Railway (`Procfile`) | Production-ready routing and build scripts configured |

---

## 3. Competency Framework Specifications

### Four Core Domains
1. **Statistical:** Survey Design, Sampling, National Accounts, Price Statistics, Labour Statistics, Agricultural Statistics, Industrial Statistics, SDG Indicators, Metadata Standards, Data Quality Frameworks.
2. **Technical:** Python, R, SQL, Stata, SPSS, SAS, GIS, Data Visualization, AI/ML, Cloud Computing, APIs, Open Data.
3. **Digital Governance:** Cybersecurity, Data Privacy, Digital Signatures, Government Cloud, Digital Public Infrastructure (DPI).
4. **Behavioural & Managerial:** Leadership, Communication, Project Management, Ethics, Decision Making, Change Management.

### Five Proficiency Levels
* **L1 (Awareness):** Basic conceptual knowledge and terminology.
* **L2 (Basic):** Can perform fundamental tasks with supervision/assistance.
* **L3 (Working):** Can perform tasks independently in daily official assignments.
* **L4 (Advanced):** Can guide others, solve complex operational challenges, and lead projects.
* **L5 (Expert):** Strategic understanding, policy design, institutional innovation.

---

## 4. Repository Structure & File Map

```text
Magnus AI/
├── memory.md                                # <-- THIS FILE: Context & Progress tracker for AI agents
├── README.md                                # Project introduction and high-level readme
├── Architecture.md                          # Technical architecture specification
├── Database.md                              # Comprehensive DB schema and entity definitions
├── Design.md                                # UI/UX design language, color codes, guidelines
├── Phases.md                                # 26-phase incremental roadmap for SIH
├── PRD.md                                   # Product Requirements Document
├── Rules.md                                 # Behavioral and architectural rules for development
├── Magnus_AI_Specifications/                # Authoritative reference specifications directory
│   ├── Architecture.md
│   ├── Database.md
│   ├── Design.md
│   ├── Phases.md
│   ├── PRD.md
│   └── Rules.md
│
├── backend/                                 # FastAPI Backend
│   ├── Procfile                             # Railway deployment entrypoint (`web: uvicorn app.main:app...`)
│   ├── requirements.txt                     # fastapi, uvicorn, pydantic, PyMuPDF, langchain-google-genai, etc.
│   ├── .env.example                         # SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY
│   └── app/
│       ├── main.py                          # FastAPI application, CORS, `/health`, `/api/upload`, `/api/generate-questions`
│       └── services/
│           ├── pdf_parser.py                # Extracts text page-by-page and splits into ~1000 char chunks
│           ├── vector_store.py              # Generates text-embedding-004 vectors, stores in `document_chunks`, similarity RPC search
│           └── question_generator.py        # Gemini 2.5 Flash structured output prompt for psychometric MCQs (L1-L5)
│
├── frontend/                                # React 19 + Vite 8 SPA
│   ├── vercel.json                          # SPA routing rewrites for Vercel
│   ├── package.json                         # Dependencies & scripts (`npm run dev`, `npm run build`)
│   ├── vite.config.ts                       # Vite configuration
│   ├── tailwind.config.js                   # Tailwind CSS configuration
│   ├── .env.example                         # VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_BACKEND_URL
│   ├── src/
│   │   ├── main.tsx                         # React entrypoint
│   │   ├── App.tsx                          # App root with AuthProvider and RouterProvider
│   │   ├── app/
│   │   │   ├── router.tsx                   # Declarative route configuration with role checks
│   │   │   └── providers/
│   │   │       └── AuthProvider.tsx         # Supabase Auth session state + Mock role-switching helper
│   │   ├── components/layout/
│   │   │   ├── AuthLayout.tsx               # Minimal container for login/register
│   │   │   └── MainLayout.tsx               # Topbar, role indicator, navigation links, logout
│   │   ├── features/
│   │   │   ├── admin/
│   │   │   │   ├── SystemHealth.tsx         # Service status monitors, API latency, DB health
│   │   │   │   └── UserManagement.tsx       # User list, role assignments, department filters
│   │   │   ├── assessment/
│   │   │   │   ├── AssessmentRunner.tsx     # MCQ test runner UI with timer, progress, feedback
│   │   │   │   ├── mockData.ts              # Demo assessment questions
│   │   │   │   └── types.ts                 # Assessment, Question, and Attempt TypeScript types
│   │   │   ├── competency/
│   │   │   │   ├── CompetencyMatrix.tsx     # Domain cards, proficiency radar/bars
│   │   │   │   ├── GapAnalysis.tsx          # Required vs. Current level difference visualization
│   │   │   │   ├── mockData.ts              # Domains, competencies, and role benchmarks
│   │   │   │   └── types.ts                 # Competency, Domain, and Gap types
│   │   │   ├── learning/
│   │   │   │   ├── ResourceCard.tsx         # Course/programme card with provider badges (iGOT, NSSTA)
│   │   │   │   ├── mockData.ts              # Curated mock courses mapped to competencies
│   │   │   │   └── types.ts                 # LearningResource types
│   │   │   ├── profile/
│   │   │   │   ├── CompetencyPassport.tsx   # Verified competency credentials card
│   │   │   │   ├── ProfileForm.tsx          # Designation, department, experience editing
│   │   │   │   └── types.ts                 # UserProfile types
│   │   │   └── trainer/
│   │   │       ├── UploadMaterial.tsx       # PDF drag & drop, backend vectorization trigger, MCQ auto-generation
│   │   │       ├── ReviewQuizzes.tsx        # Trainer question review, option editor, publish flow
│   │   │       └── mockData.ts              # Stored training materials & pending review quizzes
│   │   ├── lib/
│   │   │   ├── api.ts                       # Backend client: `uploadDocument`, `generateQuestions`, `checkBackendHealth`
│   │   │   └── supabase.ts                  # Supabase client singleton using Vite env vars
│   │   └── pages/
│   │       ├── auth/Login.tsx               # Login page with quick persona switcher for demo
│   │       ├── learner/                     # LearnerDashboard, LearnerProfile, LearnerCompetency, LearningPath, Assessment
│   │       ├── trainer/TrainerDashboard.tsx # Material upload tab + Quiz review tab
│   │       ├── admin/AdminDashboard.tsx     # Organization metrics, user admin, system health
│   │       └── errors/                      # 404 NotFound & 403 Unauthorized pages
│
└── supabase/
    └── migrations/                          # Sequential PostgreSQL DDL migrations
        ├── 001_extensions.sql               # uuid-ossp, pgvector
        ├── 002_roles_departments.sql        # roles, departments, competency_domains, competencies, job_roles
        ├── 003_competencies.sql             # competency_levels, role_competencies
        ├── 004_profiles.sql                 # profiles, user_roles, user_competencies, audit_logs
        ├── 005_rls.sql                      # Row Level Security policies for all tables
        ├── 006_indexes.sql                  # Performance B-Tree indexes on FKs
        └── 007_seed_demo.sql                # Initial roles, domains, levels, sample competencies
```

---

## 5. Database Schema & Current State

### Applied Migrations
1. `001_extensions.sql`: Enables `uuid-ossp` and `vector` (pgvector).
2. `002_roles_departments.sql`:
   - `roles`: `id`, `code` (`learner`, `trainer`, `administrator`, `super_admin`), `name`, `description`.
   - `departments`: `id`, `name`, `code`, `description`.
   - `competency_domains`: `id`, `name` (`Statistical`, `Technical`, `Digital Governance`, `Behavioural & Managerial`), `sort_order`.
   - `competencies`: `id`, `domain_id` (FK), `name`, `code`, `description`.
   - `job_roles`: `id`, `department_id` (FK), `title`, `code`, `description`.
3. `003_competencies.sql`:
   - `competency_levels`: `id`, `level_no` (1-5), `code` (L1-L5), `name` (Awareness, Basic, Working, Advanced, Expert), `description`.
   - `role_competencies`: `id`, `job_role_id` (FK), `competency_id` (FK), `required_level` (INT 1-5), `priority_weight`, `required`.
4. `004_profiles.sql`:
   - `profiles`: `id` (PK references `auth.users.id`), `full_name`, `employee_code`, `designation`, `department_id` (FK), `job_role_id` (FK), `current_assignment`, `education_summary`, `years_of_experience`, `bio`, `avatar_url`.
   - `user_roles`: `id`, `user_id` (FK to profiles), `role_id` (FK to roles).
   - `user_competencies`: `id`, `user_id` (FK to profiles), `competency_id` (FK), `current_level` (INT 1-5), `confidence`, `status`, `last_assessed_at`, `evidence_count`.
   - `audit_logs`: `id`, `actor_user_id` (FK), `action`, `entity_type`, `entity_id`, `metadata` (JSONB).
5. `005_rls.sql`:
   - RLS enabled on all tables.
   - Self-read/update policies for `profiles`, `user_roles`, `user_competencies`.
   - Authenticated read for reference tables (`roles`, `departments`, `competencies`, `job_roles`, `competency_levels`).
   - `audit_logs` restricted to service role only.
6. `006_indexes.sql`: Foreign key indexes on `profiles`, `user_competencies`, `role_competencies`.
7. `007_seed_demo.sql`: Seeds default roles, 4 competency domains, 5 competency levels, and 10 core competencies.

### Vector Storage Table (RAG / AI Service)
* `document_chunks`: Stores text chunks and vectors.
  - Columns: `id` (UUID), `document_name` (TEXT), `content` (TEXT), `embedding` (vector(768)), `metadata` (JSONB), `created_at`.
  - RPC Function: `match_document_chunks(query_embedding vector(768), match_threshold float, match_count int, filter_document_name text)` performs cosine similarity search.

---

## 6. Backend API Endpoints & Interfaces

| Method | Endpoint | Description | Request Body / Params | Status |
|---|---|---|---|---|
| `GET` | `/health` | Backend status check | None | **Live & Working** |
| `POST` | `/api/upload` | Ingests PDF, chunks text via PyMuPDF, embeds using Gemini `text-embedding-004`, stores in Supabase | `multipart/form-data` (`file`) | **Live & Working** |
| `POST` | `/api/generate-questions` | Retrieves document chunks via vector similarity & prompts `gemini-2.5-flash` with structured outputs | `QuestionGenerationRequest`: `{ competency_name, difficulty_level, document_name, num_questions }` | **Live & Working** |
| `GET` | `/api/v1/profile` | Fetches learner profile & competencies | Auth Bearer JWT | *Planned* |
| `PUT` | `/api/v1/profile` | Updates profile data | `UserProfileUpdate` payload | *Planned* |
| `GET` | `/api/v1/recommendations` | Computes personalized course recommendations based on current skill gaps | Query param: `user_id` | *Planned (Phase 9)* |
| `POST` | `/api/v1/assessments/{id}/attempt` | Submits quiz answers, evaluates score, triggers competency update | `{ attempt_answers: [...] }` | *Planned (Phase 13)* |
| `POST` | `/api/v1/assistant/chat` | RAG-based context-aware Q&A for learners | `{ message: string, context_id: string }` | *Planned (Phase 15)* |

---

## 7. SIH Roadmap & Current Implementation Status (Phases 0–25)

| Phase | Phase Name | Status | Summary of Current State |
|---|---|---|---|
| **Phase 0** | Project Initialization | **DONE** | React 19 + Vite 8 frontend, FastAPI backend, Git repository, environment templates. |
| **Phase 1** | Auth & Shell | **DONE** | Supabase Auth provider, AuthLayout, MainLayout, Role-based route guard (`learner`, `trainer`, `admin`), Persona switcher for demo. |
| **Phase 2** | Database Foundation | **DONE** | Supabase migrations 001-007 written with tables, RLS, indexes, and initial seeds. |
| **Phase 3** | Learner Profile & Passport | **PARTIAL** | UI built (`LearnerProfile.tsx`, `CompetencyPassport.tsx`, `ProfileForm.tsx`); currently using local mock state. Needs DB integration. |
| **Phase 4** | Competency Framework | **PARTIAL** | Competency catalogue & radar matrix UI built (`CompetencyMatrix.tsx`); DB has domain/competency tables seeded. |
| **Phase 5** | Competency Assessment | **PARTIAL** | `AssessmentRunner.tsx` UI built with timer, question navigation, option selection, and score calculation on mock questions. |
| **Phase 6** | Skill-Gap Engine | **PARTIAL** | `GapAnalysis.tsx` UI renders gap cards ($L_{\text{required}} - L_{\text{current}}$); deterministic formulas drafted. |
| **Phase 7** | Learning Catalogue | **PARTIAL** | `ResourceCard.tsx` UI with provider filters (iGOT Karmayogi, NSSTA, TPAC) and mock datasets. |
| **Phase 8** | Integration Adapters | **PLANNED** | Adapter interface for iGOT and NSSTA with mock fallback mode. |
| **Phase 9** | Recommendation Engine | **PLANNED** | Deterministic ranking algorithm matching top skill gaps to candidate courses. |
| **Phase 10** | Personalized Learning Path | **PARTIAL** | `LearningPathPage.tsx` UI with staged journey (Foundation $\to$ Skill-Building $\to$ Advanced $\to$ Quiz). |
| **Phase 11** | Learning Material Upload | **DONE** | PDF upload, PyMuPDF extraction, text chunking, Gemini 768-dim embeddings stored into Supabase `document_chunks`. |
| **Phase 12** | AI MCQ/Quiz Generator | **DONE** | RAG retrieval from uploaded PDF + Gemini 2.5 Flash structured output MCQs + Trainer Quiz Review/Edit/Publish UI. |
| **Phase 13** | Quiz Evaluation & Feedback | **IN-PROGRESS** | UI scoring works; needs backend submission endpoint to record attempt answers and evidence. |
| **Phase 14** | Continuous Competency Update | **PLANNED** | Automated update of `user_competencies` table following successful assessment attempt. |
| **Phase 15** | AI Learning Assistant | **PLANNED** | Floating RAG chatbot widget grounded in MoSPI / NSSTA material and learner's gaps. |
| **Phase 16** | Learner Dashboard | **DONE** | Comprehensive dashboard overview (`LearnerDashboard.tsx`) with domain progress, quick actions, and recent activity. |
| **Phase 17** | Trainer Dashboard | **DONE** | Tabbed workspace (`TrainerDashboard.tsx`) integrating Upload Material and Quiz Review pipelines. |
| **Phase 18** | Administrator Dashboard | **PARTIAL** | `AdminDashboard.tsx`, `UserManagement.tsx`, `SystemHealth.tsx` implemented with mock organization metrics. |
| **Phase 19** | Emerging Skill Intelligence | **PLANNED** | Capacity building projection signals for administrator role. |
| **Phase 20** | Security Hardening | **IN-PROGRESS** | Supabase RLS active; CORS configured; service-role key restricted to backend only. |
| **Phase 21** | Testing | **PLANNED** | Integration tests for RAG pipeline, assessment scoring, and RLS checks. |
| **Phase 22** | Demo Scenario (SIH Persona) | **READY** | Persona "Ananya Sharma" (Junior Statistical Officer, Labour Statistics) configured for 3-5 min live hackathon demo. |
| **Phase 23** | UI/UX Polish | **IN-PROGRESS** | Tailwind responsive layout, Government-Tech theme, crisp cards and badges. |
| **Phase 24** | Deployment | **READY** | Vercel rewrites configured (`vercel.json`), Railway Procfile configured (`backend/Procfile`). |
| **Phase 25** | Final Readiness & Presentation | **PENDING** | Pitch deck alignment, screen recordings, architecture diagrams. |

---

## 8. Development Environment & Quick Start

### Frontend Setup
```powershell
cd "c:\Team SIH 2026\Magnus AI\frontend"
npm install
npm run dev
# Running on http://localhost:5173
```
*Required `.env` in `frontend/`:*
```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_BACKEND_URL=http://localhost:8000
```

### Backend Setup
```powershell
cd "c:\Team SIH 2026\Magnus AI\backend"
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# Running on http://localhost:8000
# Docs at http://localhost:8000/docs
```
*Required `.env` in `backend/`:*
```env
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
GEMINI_API_KEY=<your-google-gemini-api-key>
```

---

## 9. Rules for AI Agents Updating this Codebase

1. **Check this file (`memory.md`) first** before modifying or writing code to confirm active architecture, table names, and endpoints.
2. **Execute one phase at a time** as outlined in `Phases.md`. Do not attempt to refactor the entire app in one turn.
3. **Preserve existing functionality.** When adding live database connections to pages that currently use `mockData.ts`, retain demo fallback values so the application remains demoable if the database is offline or unseeded.
4. **Never disable or bypass RLS** in Supabase migrations.
5. **Never expose the Supabase `service_role` key** or `GEMINI_API_KEY` to the frontend client.
6. **Update this `memory.md` file** at the conclusion of every major feature or phase implementation to keep subsequent sessions perfectly synchronized.
