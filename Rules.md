# Rules.md — Magnus AI

## 1. Purpose

These rules define the boundaries for AI-assisted development and runtime behavior of Magnus AI.

They apply to:
- Google Antigravity agents
- Coding agents
- AI/LLM services
- Frontend/backend implementation
- Supabase operations
- External integrations
- Generated learning content

## 2. Core Product Rules

1. Magnus AI must remain aligned with SIH 2026 Problem Statement 26101.
2. The product is an AI-enabled competency and learning platform, not a replacement for iGOT Karmayogi.
3. Do not claim an external integration is live unless it has been technically verified.
4. Demo/mock data must be clearly identified in development and presentation environments.
5. Do not use real government employee data during prototype development.
6. Core competency calculations must remain explainable.
7. AI output must not silently modify critical competency records.

## 3. AI Development Rules

### Use AI for
- Natural-language explanations
- MCQ generation
- Quiz generation
- Learning-content summarization
- Semantic matching
- Recommendation explanations
- RAG-based Q&A
- Personalized feedback
- Optional narrative analytics

### Do not rely on AI alone for
- Authorization
- Role assignment
- RLS/security
- Final access decisions
- Financial operations
- Government identity verification
- Critical database migrations
- Deterministic competency calculations
- Audit records
- Security policy enforcement

## 4. AI Output Rules

Every generated educational object should, where applicable, contain:
- Source
- Topic
- Competency
- Difficulty
- Explanation

Generated MCQs must be validated before publication.

AI-generated content must not be presented as an official government statement unless it comes from an authoritative source and is explicitly identified.

## 5. Hallucination Control

For document-grounded answers:
1. Retrieve relevant source content.
2. Generate only from retrieved context where factual grounding is required.
3. Preserve source metadata.
4. If evidence is insufficient, say that the information is unavailable.
5. Do not invent page numbers, course IDs, API responses or government policies.

For recommendations:
- Recommendations can be generated from stored metadata.
- The system must explain the matching factors.
- Do not invent a course/programme that does not exist in the current resource catalogue.

## 6. Competency Rules

### Levels

```text
L1 = Awareness
L2 = Basic
L3 = Working
L4 = Advanced
L5 = Expert
```

1. Each competency must have a definition.
2. Each level must have a description.
3. Required levels are defined by role/assignment.
4. Current levels must have evidence.
5. Skill gaps must be reproducible from stored inputs.
6. AI may explain or interpret results but must not obscure the underlying calculation.
7. Competency updates must store evidence and timestamp.
8. No competency should jump to a higher level without evidence according to the configured policy.

## 7. Recommendation Rules

Recommendations must consider, where available:
- Skill gap
- Role relevance
- Competency relevance
- Previous learning
- Current level
- Resource difficulty
- Department priority
- Future requirements
- Career progression

Do not recommend:
- Already completed mandatory resources unless revision is explicitly useful
- Resources above the learner's reasonable level without prerequisite support
- Non-existent resources
- Unverified external links

Every recommendation should provide a short rationale.

## 8. iGOT Rules

1. Use an adapter.
2. Do not scrape or bypass authentication.
3. Do not fabricate API responses.
4. Do not store credentials in frontend code.
5. Do not call an undocumented endpoint in production.
6. Mock iGOT data is allowed for the SIH prototype.
7. Mock data must be marked as demo/mock internally.
8. Replace mock adapter only after official integration details are available.

## 9. NSSTA/TPAC Rules

1. Use authoritative source material where available.
2. Store programme metadata with source information.
3. Do not invent programme eligibility, dates or schedules.
4. Clearly distinguish:
   - Official programme
   - Prototype/demo record
   - Recommended learning resource
5. Do not claim endorsement by NSSTA/TPAC without evidence.

## 10. Library Rules

### Preferred
- React
- TypeScript
- Vite
- Tailwind CSS
- Accessible UI primitives
- Recharts
- React Router
- TanStack Query
- FastAPI
- Pydantic
- Supabase client
- PostgreSQL
- pgvector
- Python document-processing libraries
- Standard validation libraries

### Avoid unless justified
- Large UI frameworks that duplicate Tailwind/component functionality
- Multiple state-management libraries for the same purpose
- Multiple HTTP clients
- Unmaintained packages
- Paid-only dependencies
- Proprietary infrastructure that prevents local/demo execution

### Never introduce a dependency only for
- A trivial helper that can be written safely
- Decorative effects
- Duplicating an existing utility
- A feature already provided by the chosen stack

Before adding a new library, check:
- License
- Maintenance
- Bundle/runtime impact
- Security history
- Free availability
- Whether an existing dependency already solves it

## 11. Free-First Rule

The initial development target is zero investment.

Prefer:
1. Free/open-source
2. Local execution
3. Free-tier services
4. Existing student/developer benefits
5. Paid services only as future optional integrations

Do not design the MVP so that it requires paid API calls to demonstrate core functionality.

Provide local/mock fallbacks for:
- AI generation where practical
- iGOT
- NSSTA/TPAC
- Sample course catalogues

## 12. Supabase Rules

1. RLS is mandatory for user-owned and role-sensitive data.
2. Never disable RLS to “make the app work.”
3. Service-role credentials are server-only.
4. Frontend uses anon/public credentials only.
5. Storage buckets must have explicit policies.
6. Database migrations must be version-controlled.
7. Do not manually modify production schema without documenting the change.
8. Test policies with learner, trainer and administrator scenarios.

## 13. Authentication Rules

- Use Supabase Auth.
- Never store passwords manually.
- Never expose session tokens unnecessarily.
- Protected routes must verify authentication.
- Role permissions must be enforced server-side/database-side, not only in UI.
- UI hiding is not security.

## 14. File Upload Rules

Allowed prototype formats:
- PDF
- PPT/PPTX
- DOC/DOCX
- TXT

Rules:
- Validate MIME type.
- Validate size.
- Generate unique storage paths.
- Do not execute uploaded files.
- Sanitize extracted text.
- Track processing status.
- Reject unsupported files with a clear message.

## 15. AI Prompt Rules

Prompts should:
- Define role
- Define task
- Define output schema
- Provide relevant context
- Specify source-grounding requirements
- Explicitly prohibit fabrication
- Request structured JSON when machine parsing is required

Do not place:
- API keys
- Passwords
- service-role credentials
- unnecessary PII

inside prompts.

## 16. JSON Generation Rules

For machine-consumed AI output:
- Define a schema.
- Validate output.
- Retry only with controlled limits.
- Reject malformed output.
- Never blindly execute generated JSON.

Example MCQ schema:

```json
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correct_option": "A",
  "explanation": "string",
  "difficulty": "easy|medium|hard",
  "competency_id": "string",
  "source_reference": "string"
}
```

## 17. Error Handling Rules

Every failure must be:
- Logged safely
- Classified
- Converted to a useful user message
- Recoverable where possible

Use categories:
- Validation error
- Authentication error
- Authorization error
- Not found
- External integration error
- AI generation error
- File processing error
- Database error
- Unknown error

Never display:
- Stack traces
- API keys
- SQL internals
- Server paths
- Provider secrets

to normal users.

## 18. Loading Rules

Every long operation must have visible state:
- Uploading
- Processing
- Generating
- Evaluating
- Refreshing recommendations

Never leave the user with a frozen interface.

## 19. Empty State Rules

Every list/dashboard section must handle:
- No data
- Loading
- Error
- Partial data

Example:

> No competency assessment has been completed yet. Start your assessment to generate your competency profile.

## 20. UI Rules

- Responsive design.
- Keyboard accessible.
- Visible focus states.
- Good color contrast.
- Do not use color alone to communicate skill-gap severity.
- Use labels/icons/text in addition to colors.
- Avoid unnecessary animation.
- Never sacrifice readability for visual effects.

## 21. Data Rules

Use synthetic data for SIH demonstration.

Synthetic records must be realistic enough to demonstrate:
- Different roles
- Different departments
- Different competency levels
- Different learning histories
- Different skill gaps

Do not copy sensitive real employee data.

## 22. Logging Rules

Never log:
- Passwords
- Auth tokens
- API keys
- Service-role keys
- Full private documents
- Unnecessary personal information

Log:
- Event type
- User/system actor ID where appropriate
- Timestamp
- Result
- Error code
- Safe metadata

## 23. Git Rules

Commit logical changes.

Suggested format:

```text
feat: add competency assessment
fix: correct recommendation filtering
docs: update database rules
refactor: isolate AI provider
```

Never commit:
- `.env`
- secrets
- service-role keys
- private credentials
- generated sensitive datasets

## 24. Antigravity Agent Rules

Before editing:
1. Read PRD.md.
2. Read Architecture.md.
3. Read Rules.md.
4. Read relevant Phases.md section.
5. Read Design.md for UI work.
6. Read Database.md for database work.

Agents must:
- Inspect existing code before changing it.
- Preserve working features.
- Make small changes.
- Validate after changes.
- Avoid unrelated refactors.
- Report files changed.
- Report unresolved issues.

## 25. MCP Rules

Use MCP tools only for their intended purpose.

### Supabase MCP
Use for:
- Inspecting schema
- Applying controlled migrations
- Checking database objects
- Testing database state

Do not use it to bypass security policies.

### Other MCP tools
- Verify the tool's purpose before use.
- Do not expose credentials.
- Do not make destructive changes without confirmation in development workflows.

## 26. Database Migration Rules

Every schema change must be:
- Reproducible
- Documented
- Safe to re-run where practical
- Compatible with RLS
- Tested against application queries

Never solve a permission problem by dropping RLS.

## 27. Testing Rules

Minimum:
- Unit tests for competency calculations
- Unit tests for recommendation scoring
- API validation tests
- RLS tests
- MCQ schema validation
- File upload validation
- Critical frontend flow tests

Manual SIH demo test:
1. Login
2. Profile
3. Assessment
4. Gap analysis
5. Recommendation
6. Learning
7. Quiz
8. Competency update
9. Admin analytics

## 28. AI Safety Boundary

Magnus AI must not:
- Make employment decisions
- Penalize employees automatically
- Infer sensitive personal attributes
- Diagnose health/mental conditions
- Generate fabricated official policy
- Pretend to be a government authority
- Claim an official recommendation without source evidence
- Expose another user's private data

It should provide learning/capacity-building assistance and transparent evidence-based insights.

## 29. Definition of Done

A feature is done only when:
- UI works
- API/database works where applicable
- Authorization works
- Error/loading states exist
- Data validation exists
- No secrets are exposed
- Relevant tests pass
- Documentation is updated
- Existing functionality is not broken
