import type { LearningResource, Recommendation } from './types';

export const MOCK_RESOURCES: LearningResource[] = [
  {
    id: 'r1',
    title: 'Introduction to Official Statistics & Sampling',
    description: 'A foundational course covering national sampling schemas, NSSO methodologies, and error calculation.',
    sourceSystem: 'NSSTA',
    resourceType: 'Workshop',
    durationMinutes: 120,
    difficulty: 'L2',
    targetCompetencyIds: ['c2'] // Sampling
  },
  {
    id: 'r2',
    title: 'Advanced Sampling Theory',
    description: 'In-depth theory and application of stratified, cluster, and multi-stage sampling designs.',
    sourceSystem: 'NSSTA',
    resourceType: 'Course',
    durationMinutes: 300,
    difficulty: 'L4',
    targetCompetencyIds: ['c2']
  },
  {
    id: 'r3',
    title: 'Python for Data Analysis - Basics',
    description: 'Learn the fundamentals of Python, pandas, and numpy for processing raw survey data.',
    sourceSystem: 'iGOT',
    resourceType: 'Course',
    durationMinutes: 180,
    difficulty: 'L2',
    targetCompetencyIds: ['c6'] // Python
  },
  {
    id: 'r4',
    title: 'SQL Masterclass for Government Databases',
    description: 'Comprehensive guide to querying, joining, and aggregating large datasets in secure environments.',
    sourceSystem: 'iGOT',
    resourceType: 'Course',
    durationMinutes: 240,
    difficulty: 'L3',
    targetCompetencyIds: ['c8'] // SQL
  },
  {
    id: 'r5',
    title: 'Cybersecurity Awareness for Officers',
    description: 'Mandatory training on data privacy, DPI integration, and secure data handling.',
    sourceSystem: 'TPAC',
    resourceType: 'Document',
    durationMinutes: 60,
    difficulty: 'L1',
    targetCompetencyIds: ['c11', 'c12'] // Cyber, Privacy
  },
  {
    id: 'r6',
    title: 'Leadership in the Public Sector',
    description: 'Managerial frameworks for driving change in official statistics units.',
    sourceSystem: 'iGOT',
    resourceType: 'Course',
    durationMinutes: 360,
    difficulty: 'L4',
    targetCompetencyIds: ['c14', 'c16'] // Leadership, PM
  }
];

// Based on the gaps identified in Phase 6 for Junior Statistical Officer
// Gaps were: Sampling (L2->L3), Python (L1->L2), SQL (L2->L3)
export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    resourceId: 'r1',
    competencyId: 'c2',
    reason: 'Addresses your -1 gap in Sampling (Required: L3, Current: L2) with a foundational methodology workshop.',
    matchScore: 92
  },
  {
    resourceId: 'r3',
    competencyId: 'c6',
    reason: 'Perfectly targets your required progression to L2 in Python for Data Analysis.',
    matchScore: 98
  },
  {
    resourceId: 'r4',
    competencyId: 'c8',
    reason: 'Builds your SQL proficiency from L2 to the required L3 level for Junior Statistical Officers.',
    matchScore: 95
  }
];
