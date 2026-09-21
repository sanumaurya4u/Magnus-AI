export interface LearningResource {
  id: string;
  title: string;
  description: string;
  sourceSystem: 'iGOT' | 'NSSTA' | 'TPAC' | 'Internal';
  resourceType: 'Course' | 'Workshop' | 'Document' | 'Video';
  durationMinutes: number;
  difficulty: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  targetCompetencyIds: string[];
  url?: string;
}

export interface Recommendation {
  resourceId: string;
  competencyId: string; // The gap it is trying to fill
  reason: string;
  matchScore: number;
}
