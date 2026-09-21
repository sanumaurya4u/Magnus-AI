# Design.md — Magnus AI

## 1. Design Objective

Magnus AI should look like a modern, trustworthy, government-oriented learning intelligence platform.

The visual language should communicate:
- Intelligence
- Trust
- Professionalism
- Clarity
- Accessibility
- Data-driven decision making
- Modern learning technology

Avoid making it look like:
- A generic social network
- A gaming dashboard
- A flashy consumer AI app
- A cryptocurrency/fintech dashboard
- An overly decorative education website

## 2. Design Direction

### Style
**Modern Government-Tech + AI Learning Intelligence**

Use:
- Clean cards
- Clear information hierarchy
- Spacious layouts
- Subtle borders
- Soft shadows
- Data visualizations
- Accessible status indicators
- Consistent iconography
- Minimal motion

## 3. Brand

### Name
**Magnus AI**

### Product descriptor
**AI-Powered Skill Intelligence & Learning Platform**

### Suggested short descriptor
> Understand your skills. Close your gaps. Grow continuously.

The descriptor is product copy and may be changed during UI implementation without changing functionality.

## 4. Color System

Use a restrained professional palette.

### Primary
Deep Navy:
```text
#0F172A
```

Purpose:
- Navigation
- Headings
- Primary text
- Strong UI elements

### Primary Accent
Royal/AI Blue:
```text
#2563EB
```

Purpose:
- Primary actions
- Links
- Active navigation
- Focus states

### Secondary Accent
Indigo:
```text
#4F46E5
```

Purpose:
- AI-related features
- Secondary highlights
- Gradient accents used sparingly

### Success
```text
#16A34A
```

Purpose:
- Completed learning
- Positive progress
- Competency improvement

### Warning
```text
#D97706
```

Purpose:
- Medium-priority gaps
- Attention states

### Critical
```text
#DC2626
```

Purpose:
- High-priority skill gaps
- Errors
- Critical alerts

### Neutral
Use a slate/gray scale:

```text
#F8FAFC
#F1F5F9
#E2E8F0
#CBD5E1
#64748B
#334155
```

## 5. Color Accessibility Rules

Do not use color alone to communicate meaning.

Example:

Bad:
```text
red = high gap
```

Good:
```text
High Gap
[Critical icon] [Red indicator]
```

Charts should include:
- Labels
- Tooltips
- Legends
- Text summaries

## 6. Typography

Preferred:
- Inter

Fallback:
```text
system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

### Type hierarchy

#### Display
Large dashboard headline.

```text
32–40px
font-weight: 700
```

#### H1
```text
28–32px
font-weight: 700
```

#### H2
```text
22–26px
font-weight: 600
```

#### H3
```text
18–20px
font-weight: 600
```

#### Body
```text
14–16px
font-weight: 400
line-height: 1.5–1.7
```

#### Caption
```text
12–13px
```

Avoid excessive use of uppercase text.

## 7. Spacing

Use a consistent 4px-based spacing system.

Common values:

```text
4
8
12
16
20
24
32
40
48
64
```

Default card padding:
```text
20–24px
```

Dashboard section spacing:
```text
24–32px
```

## 8. Border Radius

Use moderate rounding.

- Buttons: 8–10px
- Inputs: 8–10px
- Cards: 12–16px
- Large containers: 16–20px
- Pills/tags: 9999px

Avoid excessive rounded/pill UI.

## 9. Shadows

Use subtle shadows only.

Cards should primarily use:
- Border
- Surface contrast

Use shadows for:
- Dropdowns
- Dialogs
- Floating assistant
- Important elevated surfaces

## 10. Layout

### Desktop

```text
┌───────────────┬──────────────────────────────┐
│ Sidebar       │ Header                       │
│               ├──────────────────────────────┤
│ Navigation    │ Main Content                 │
│               │                              │
│               │ Dashboard                    │
│               │                              │
└───────────────┴──────────────────────────────┘
```

### Sidebar
Sections:
- Overview
- Competency
- Skill Gaps
- Learning Path
- Recommendations
- Assessments
- AI Assistant
- Progress

Admin:
- Overview
- Workforce
- Competencies
- Skill Gaps
- Training
- Assessments
- Analytics
- Settings

Trainer:
- Overview
- Materials
- Question Generator
- Assessments
- Learners
- Analytics

## 11. Header

Header should contain:
- Page title
- Breadcrumb/context where useful
- Search if needed
- Notifications
- User menu

Avoid overcrowding.

## 12. Dashboard Design

### Learner dashboard

Top KPI cards:

```text
Overall Competency
Skill Gaps
Learning Hours
Courses Completed
```

Second row:
- Competency overview
- Skill-gap distribution

Third row:
- Personalized learning path
- Recommended resources

Fourth:
- Recent assessments
- AI assistant prompt

## 13. Competency Visualization

Preferred:
- Horizontal progress bars
- Radar chart for domain overview
- Competency cards
- Heatmap for role vs competency

Avoid using a radar chart as the only competency representation.

Each competency must also have:
- Name
- Current level
- Required level
- Gap
- Status

## 14. Skill-Gap Cards

Example:

```text
┌───────────────────────────────────────┐
│ Python                         HIGH   │
│ Technical Competency                  │
│                                       │
│ Current     L1                       │
│ Required    L3                       │
│ Gap         2 levels                 │
│                                       │
│ Why? Assessment + Role Requirement   │
│                                       │
│ [View Learning Path]                 │
└───────────────────────────────────────┘
```

Status labels:
- High
- Medium
- Low
- On Track
- Strong

## 15. Recommendation Card

Every recommendation should show:

```text
Source
Title
Competency
Difficulty
Duration
Match
Why recommended
CTA
```

Example:

```text
iGOT
Python for Data Analysis

Addresses:
Python

Level:
Intermediate

Match:
94%

[View Resource]
```

## 16. Learning Path UI

Use a vertical timeline:

```text
● Foundation
│
├── Completed
│
● Skill Building
│
├── In Progress
│
● Applied Learning
│
├── Locked
│
● Assessment
```

Show:
- Completion
- Duration
- Prerequisite
- Competency
- Next action

## 17. Assessment UI

Design for focus.

Header:
- Assessment title
- Progress
- Question number
- Optional timer

Question:
- Clear readable text
- Four-option layout
- Keyboard accessible
- Selected state

Bottom:
- Previous
- Next
- Submit

Do not show the correct answer before submission.

## 18. MCQ Generator UI

Three-column workflow when desktop allows:

```text
Source Material | Configuration | Generated Questions
```

Configuration:
- Number of questions
- Difficulty
- Competency
- Question type

Generated question card:
- Question
- Options
- Correct answer
- Explanation
- Source
- Approve/Edit/Reject

## 19. AI Assistant

Use a floating button or dedicated page.

### Button
Label:
**Ask Magnus**

### Assistant interface

```text
┌───────────────────────────────────┐
│ Ask Magnus                        │
├───────────────────────────────────┤
│ AI-generated learning support     │
│                                   │
│ User question                     │
│                                   │
│ Grounded answer                   │
│ Source references                 │
│                                   │
│ [Ask a follow-up...]              │
└───────────────────────────────────┘
```

Do not visually imply that the assistant is an official government authority.

## 20. Admin Analytics

Use a clean data-dashboard layout.

Top:
- Total learners
- Average competency
- Critical gaps
- Completion rate

Middle:
- Competency distribution
- Skill-gap heatmap
- Department comparison

Bottom:
- Training effectiveness
- Emerging skills
- Recent activity

Always include filters.

## 21. Charts

Use Recharts or an equivalent lightweight charting library.

Recommended:
- Bar chart
- Line chart
- Donut chart
- Heatmap
- Progress bars

Charts must have:
- Accessible labels
- Tooltips
- Legends where necessary
- Empty state
- Loading state

## 22. Responsive Design

### Mobile
- Sidebar becomes drawer
- Cards stack
- Tables become scrollable or card-based
- Charts resize
- Assessment controls remain usable

### Tablet
- Two-column dashboard where practical

### Desktop
- Sidebar + multi-column dashboard

Do not design desktop-only functionality.

## 23. Components

Create reusable components:

```text
Button
Card
Badge
Input
Select
Modal
Drawer
Tabs
ProgressBar
MetricCard
CompetencyCard
SkillGapCard
RecommendationCard
LearningPathItem
AssessmentQuestion
ChartCard
EmptyState
LoadingState
ErrorState
Toast
```

## 24. Iconography

Use one icon system consistently.

Recommended:
- Lucide Icons

Icons must:
- Have labels/tooltips where not obvious
- Not replace essential text
- Use consistent sizing

## 25. Motion

Motion should be subtle.

Allowed:
- Fade
- Slide
- Progress animation
- Skeleton loading
- Small hover transitions

Avoid:
- Large parallax
- Constant animated backgrounds
- Excessive bouncing
- Distracting AI effects

## 26. AI Visual Language

AI features may use a subtle indigo/blue accent.

Do not use:
- Neon sci-fi visuals
- Robot-heavy imagery
- Excessive glowing effects

Magnus AI should look like a serious professional intelligence system.

## 27. Empty States

Every major module must have useful empty states.

Example:

> No skill gaps identified yet.
> Complete your competency assessment to generate a personalized gap analysis.

CTA:
`Start Assessment`

## 28. Loading States

Use skeletons for:
- Dashboard cards
- Tables
- Recommendations
- Competency lists

For AI operations use progress text:

```text
Analyzing learning material…
Extracting concepts…
Generating questions…
Validating output…
```

## 29. Error States

Errors should state:
- What happened
- What the user can do

Example:

> We couldn't process this document. Please verify that it is a supported file type and try again.

Avoid technical stack traces.

## 30. Accessibility

Target:
- WCAG-oriented accessible design
- Keyboard navigation
- Focus visibility
- Semantic HTML
- Accessible labels
- Screen-reader friendly controls
- Sufficient contrast

## 31. Design Tokens

Centralize visual tokens.

Example:

```css
:root {
  --color-primary: #2563EB;
  --color-primary-dark: #1D4ED8;
  --color-indigo: #4F46E5;
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-danger: #DC2626;
  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-text: #0F172A;
  --color-muted: #64748B;
}
```

These are implementation defaults; Tailwind theme tokens should remain the single source of truth once configured.

## 32. Do Not

- Do not redesign the product as a generic LMS.
- Do not overload every screen with charts.
- Do not use color as the only status indicator.
- Do not use excessive gradients.
- Do not use dark mode as the only presentation.
- Do not hide important explanations behind icons.
- Do not make AI features visually dominant over the actual learning workflow.

## 33. Design Success Criteria

A first-time judge should understand within seconds:
1. What Magnus AI is.
2. What their competency level is.
3. What their skill gaps are.
4. What they should learn next.
5. Why it was recommended.
6. How assessment improves their competency profile.
