# Architecture.md — Magnus AI

## 1. Architecture Goal

Magnus AI shall use a modular, API-first architecture that can start with free/open-source or free-tier services and later connect to authorized government systems.

The architecture must support:
- Competency intelligence
- Skill-gap analysis
- Personalized recommendations
- iGOT integration
- NSSTA/TPAC training
- AI assessment generation
- RAG-based learning assistance
- Learner/admin analytics
- Secure Supabase backend
- Future government SSO/API integration

## 2. Recommended No-Fund Stack

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui or equivalent accessible component primitives
- Recharts for analytics
- React Router
- TanStack Query where useful

### Backend
Preferred:
- Python
- FastAPI
- Pydantic
- SQLAlchemy or Supabase client where appropriate

The backend is responsible for AI orchestration, document processing, recommendation logic and protected server-side operations.

### Database
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- PostgreSQL Row Level Security
- pgvector when vector search is required and available in the selected Supabase project

### AI
Use a provider abstraction:
- LLM provider with a usable free tier/free development quota
- Local/open-source models through Ollama when suitable
- Sentence-transformer/open embedding models when local execution is practical

The application must not hard-code one AI vendor into business logic.

### Deployment
Prototype target:
- Frontend: Vercel/free tier
- Backend: a suitable free-tier or local/demo deployment
- Database/Auth/Storage: Supabase free tier

The team must verify current free-tier limits before relying on them.

### Development
- Google Antigravity
- Antigravity MCP configuration
- Supabase MCP
- Git
- GitHub
- Environment variables for secrets

## 3. High-Level System

```text
Browser
  |
  v
React/Vite Frontend
  |
  | HTTPS / REST
  v
FastAPI Backend
  |
  +--------------------+
  |                    |
  v                    v
Business Services    AI Services
  |                    |
  |                    +--> LLM
  |                    +--> Embeddings
  |                    +--> RAG
  |
  +--> Supabase
  |      +--> Auth
  |      +--> PostgreSQL
  |      +--> Storage
  |      +--> pgvector
  |
  +--> Integration Adapters
         +--> iGOT
         +--> NSSTA/TPAC
```

## 4. Core Application Flow

### 4.1 Authentication

```text
User
 ↓
Supabase Auth
 ↓
Authenticated Session
 ↓
Role lookup
 ↓
Protected Route
 ↓
Dashboard
```

### 4.2 Competency Flow

```text
Profile
 ↓
Role
 ↓
Required Competencies
 ↓
Assessment
 ↓
Evidence
 ↓
Current Competency
 ↓
Skill Gap
```

### 4.3 Recommendation Flow

```text
Skill Gap
 ↓
Candidate Learning Resources
 ↓
Competency Match
 ↓
Role Match
 ↓
Priority/Level/History Filters
 ↓
Recommendation Ranking
 ↓
Personalized Learning Path
```

### 4.4 AI Assessment Flow

```text
File Upload
 ↓
Storage
 ↓
Document Extraction
 ↓
Text Cleaning
 ↓
Chunking
 ↓
Embeddings / Retrieval Index
 ↓
LLM Question Generation
 ↓
Validation
 ↓
Trainer Review
 ↓
Publish
```

### 4.5 Continuous Learning Flow

```text
Course / Quiz
 ↓
Performance
 ↓
Assessment Evidence
 ↓
Competency Recalculation
 ↓
Gap Recalculation
 ↓
Recommendation Refresh
```

## 5. Frontend Structure

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   └── providers/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── charts/
│   ├── competency/
│   ├── learning/
│   ├── assessment/
│   └── common/
│
├── features/
│   ├── auth/
│   ├── profile/
│   ├── competencies/
│   ├── skill-gaps/
│   ├── recommendations/
│   ├── learning-path/
│   ├── assessments/
│   ├── materials/
│   ├── assistant/
│   └── analytics/
│
├── pages/
│   ├── auth/
│   ├── learner/
│   ├── trainer/
│   ├── admin/
│   └── errors/
│
├── hooks/
├── lib/
│   ├── supabase.ts
│   ├── api.ts
│   ├── auth.ts
│   └── utils.ts
│
├── types/
├── constants/
├── assets/
└── main.tsx
```

## 6. Backend Structure

```text
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── dependencies.py
│   │
│   ├── api/
│   │   ├── auth.py
│   │   ├── profile.py
│   │   ├── competencies.py
│   │   ├── assessments.py
│   │   ├── recommendations.py
│   │   ├── learning.py
│   │   ├── materials.py
│   │   ├── assistant.py
│   │   └── analytics.py
│   │
│   ├── services/
│   │   ├── competency_service.py
│   │   ├── gap_service.py
│   │   ├── recommendation_service.py
│   │   ├── assessment_service.py
│   │   ├── document_service.py
│   │   ├── rag_service.py
│   │   └── analytics_service.py
│   │
│   ├── ai/
│   │   ├── provider.py
│   │   ├── prompts/
│   │   ├── embeddings.py
│   │   ├── mcq_generator.py
│   │   └── evaluator.py
│   │
│   ├── integrations/
│   │   ├── igot/
│   │   │   ├── adapter.py
│   │   │   └── client.py
│   │   └── nssta/
│   │       ├── adapter.py
│   │       └── client.py
│   │
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   ├── security/
│   └── utils/
│
├── tests/
└── requirements.txt
```

## 7. Integration Adapter Pattern

External systems must never be called directly from business logic.

Use:

```text
Recommendation Service
        |
        v
Learning Resource Repository
        |
        v
Integration Interface
    /           \
   v             v
iGOT Adapter   NSSTA Adapter
```

Example interface responsibilities:
- `list_courses()`
- `get_course()`
- `get_learning_status()`
- `get_training_programmes()`

For the prototype, provide a mock adapter implementing the same interface.

## 8. Supabase Connection

### Frontend
Use only public client configuration:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Backend
Use server-side credentials only where necessary.

Never expose:
- service-role key
- LLM API keys
- private integration credentials

### Connection principle

```text
Frontend
 ↓
Supabase Auth / safe client operations
 ↓
RLS

Frontend
 ↓
Backend API
 ↓
Protected AI/integration operation
 ↓
Supabase
```

## 9. API Boundaries

Suggested endpoints:

### Profile
- `GET /api/v1/profile`
- `PUT /api/v1/profile`

### Competency
- `GET /api/v1/competencies`
- `GET /api/v1/competencies/me`
- `POST /api/v1/competency-assessments`
- `GET /api/v1/competency-gaps`

### Recommendations
- `GET /api/v1/recommendations`
- `POST /api/v1/recommendations/refresh`

### Learning
- `GET /api/v1/learning-path`
- `POST /api/v1/learning-progress`

### Materials
- `POST /api/v1/materials`
- `GET /api/v1/materials`
- `DELETE /api/v1/materials/{id}`

### AI Assessment
- `POST /api/v1/assessments/generate`
- `POST /api/v1/assessments/{id}/review`
- `POST /api/v1/assessments/{id}/publish`
- `POST /api/v1/assessments/{id}/attempt`

### Assistant
- `POST /api/v1/assistant/chat`

### Admin
- `GET /api/v1/admin/analytics`
- `GET /api/v1/admin/skill-gaps`
- `GET /api/v1/admin/training-effectiveness`

## 10. AI Service Architecture

```text
AIProvider
├── generate_text()
├── generate_json()
└── embed()

Implementations:
├── FreeCloudLLMProvider
└── OllamaProvider
```

The rest of the application calls `AIProvider`, not a vendor SDK directly.

## 11. RAG Architecture

```text
Material
 ↓
Extract text
 ↓
Normalize
 ↓
Chunk
 ↓
Embed
 ↓
pgvector
 ↓
Similarity Search
 ↓
Top-K Context
 ↓
LLM
 ↓
Grounded Response
```

Every generated MCQ or assistant answer should preserve source metadata when possible.

## 12. Competency Engine

Inputs:
- Role
- Required competency matrix
- Profile
- Previous training
- Assessment results
- Learning evidence

Outputs:
- Current level
- Required level
- Gap
- Evidence
- Priority

Use deterministic calculations for the core score and AI for interpretation/explanation where appropriate.

## 13. Recommendation Engine

```text
Candidate Resources
 ↓
Metadata Filtering
 ↓
Competency Similarity
 ↓
Role Relevance
 ↓
Priority
 ↓
Learning History
 ↓
Difficulty Match
 ↓
Ranking
 ↓
Explainable Recommendation
```

Recommendation logic must be testable independently of the LLM.

## 14. Analytics Architecture

Use SQL/database aggregation for factual counts and metrics.

Use AI only where interpretation or narrative explanation adds value.

Examples:
- Total learners → SQL
- Average competency → SQL
- Completion rate → SQL
- Skill-gap distribution → SQL
- Narrative summary → optional AI

## 15. File Processing

Allowed prototype flow:

```text
User
 ↓
Validate extension/size
 ↓
Upload to Supabase Storage
 ↓
Create material record
 ↓
Background/queued processing
 ↓
Extract text
 ↓
Chunk/index
 ↓
Ready for AI
```

Never trust file extension alone. Validate MIME type and size.

## 16. Error Handling Architecture

Every API response should follow a predictable structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": {}
  }
}
```

Frontend must convert technical errors into useful user messages.

## 17. Observability

For prototype:
- Structured server logs
- Error logging
- AI request status
- Processing status
- Audit events

Never log:
- passwords
- API keys
- access tokens
- unnecessary personal information
- full sensitive documents

## 18. Environment Configuration

Frontend:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_BASE_URL=
```

Backend:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
LLM_PROVIDER=
LLM_API_KEY=
EMBEDDING_PROVIDER=
IGOT_BASE_URL=
IGOT_API_KEY=
NSSTA_SOURCE_URL=
```

Secrets are placeholders only in source control.

## 19. Deployment Model

```text
GitHub
  |
  +--> Vercel --> Frontend
  |
  +--> Backend deployment
             |
             +--> Supabase
             +--> AI provider
             +--> external adapters
```

Local development should work even when external integrations are unavailable by using mock adapters.

## 20. Architecture Principles

1. API-first
2. Modular
3. Secure by default
4. Explainable AI
5. Provider-independent AI
6. Integration adapters
7. Database-enforced authorization
8. Synthetic demo data
9. Free/open-source first
10. Government-integration ready
