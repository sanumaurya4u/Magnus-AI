export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  competencyId?: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  totalQuestions: number;
  competencyId: string; // The primary competency being assessed
  questions: Question[];
}

export interface AssessmentAttempt {
  assessmentId: string;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  score: number;
  percentage: number;
  status: 'in_progress' | 'submitted' | 'evaluated';
  awardedLevel?: string; // e.g. 'L2'
}
