# Magnus AI — Skill Intelligence & Learning Platform
**Smart India Hackathon 2026 (Problem Statement 26101 - MoSPI/DIID)**

Magnus AI is an advanced, AI-powered competency framework designed for the Ministry of Statistics and Programme Implementation (MoSPI). It bridges the gap between static skill mapping (iGOT) and dynamic, personalized learning paths utilizing cutting-edge Retrieval-Augmented Generation (RAG) and Psychometric analytics.

---

## Architecture Overview

### 1. Frontend (Vite + React + TypeScript)
- **Role-Based Portals**: Dedicated workspaces for Learners, Trainers, and Administrators.
- **Competency Gap Analytics**: Radar charts via `recharts` mapping current proficiency vs target roles.
- **Assessment Engine**: Simulated testing environment with countdown timers and automated level generation.
- **Styling**: `TailwindCSS` with `lucide-react` for responsive, accessible, government-grade UI components.

### 2. Backend (FastAPI + Python)
- **Document Ingestion Adapter**: Utilizes `PyMuPDF` to chunk complex Training PDFs.
- **RAG Engine**: Google `text-embedding-004` mapped to LangChain and Supabase `pgvector` for hyper-accurate document retrieval.
- **Generative AI Adapter**: Utilizes Gemini 1.5 Flash via `google-genai` and Pydantic structured schemas to autonomously generate psychometric Multiple-Choice Questions (MCQs) directly sourced from uploaded MoSPI documentation.

### 3. Database (Supabase / PostgreSQL)
- **Schema**: Fully typed relations connecting `profiles`, `competencies`, `assessments`, and `document_chunks`.
- **Security**: Row-Level Security (RLS) protects cross-tenant and inter-departmental visibility.

---

## Setup & Run Instructions

### Prerequisites
1. **Node.js** (v18+)
2. **Python** (v3.10+)
3. **Supabase** instance (Local or Cloud)
4. **Google Gemini API Key**

### 1. Database Provisioning
1. Execute the SQL migrations located in `@Database.md` sequentially in your Supabase SQL Editor.
2. Ensure the `vector` extension is enabled.

### 2. Backend Setup (FastAPI)
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```
Create `backend/.env` with your API keys:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-key
GEMINI_API_KEY=your-gemini-key
```
Run the Python server:
```powershell
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup (React)
```powershell
cd frontend
npm install
```
Create `frontend/.env` with your frontend keys:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
Run the Vite development server:
```powershell
npm run dev
```

---

## Demo Script Walkthrough

1. **Login**: Navigate to `http://localhost:5173`. Select your role (Learner, Trainer, or Admin).
2. **Learner Experience**: View your *Competency Passport*, take an assessment, and see your *Gap Analysis* dynamically change. Click into the *Learning Path* to see AI-recommended resources.
3. **Trainer Experience**: Upload a mock `.pdf` in the Material Upload tab. Behind the scenes, the Python backend chunks it and stores vectors. Click *Generate Quizzes* to see the Gemini AI draft questions, which you can then edit and approve in the UI.
4. **Admin Experience**: Review high-level system analytics, audit logs, and freely shift user access levels using the unified tabular interface.

---

*Developed by Team SIH 2026 for the Government of India.*
