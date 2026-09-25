export interface Option {
  text: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  question_text: string;
  options: Option[];
  explanation: string;
  difficulty: string;
  competency: string;
}

export interface PendingQuiz {
  id: string;
  sourceMaterial: string;
  competencyName: string;
  difficultyLevel: string;
  status: 'pending' | 'approved';
  questions: Question[];
}

export const INITIAL_QUIZZES: PendingQuiz[] = [
  {
    id: 'q1',
    sourceMaterial: 'Introduction_to_Sampling_v2.pdf',
    competencyName: 'Sampling',
    difficultyLevel: 'L3',
    status: 'pending',
    questions: [
      {
        id: '1',
        question_text: 'In a stratified random sample, what is the primary purpose of dividing the population into strata?',
        options: [
          { text: 'To increase the overall margin of error intentionally.', is_correct: false },
          { text: 'To ensure representation of specific subgroups and reduce variance.', is_correct: true },
          { text: 'To make the sampling process entirely non-random.', is_correct: false },
          { text: 'To eliminate the need for calculating a sample mean.', is_correct: false }
        ],
        explanation: 'Stratification ensures subgroups are proportionally represented, often reducing standard error compared to simple random sampling.',
        difficulty: 'L3',
        competency: 'Sampling'
      },
      {
        id: '2',
        question_text: 'Which scenario best justifies using cluster sampling instead of simple random sampling?',
        options: [
          { text: 'When the population is highly homogenous.', is_correct: false },
          { text: 'When a comprehensive sampling frame of all individuals is readily available.', is_correct: false },
          { text: 'When the population is geographically dispersed and travel costs are high.', is_correct: true },
          { text: 'When you want to survey every single unit in the population.', is_correct: false }
        ],
        explanation: 'Cluster sampling is highly cost-effective when populations are spread over wide areas, as entire clusters (like villages) are sampled at once.',
        difficulty: 'L3',
        competency: 'Sampling'
      }
    ]
  }
];

export const INITIAL_UPLOADS = [
  {
    id: 'mock1',
    title: 'Intro to Python for Statistics',
    fileName: 'python_stats_v1.pdf',
    fileSize: '4.2 MB',
    competencyId: 'c6',
    difficulty: 'L2',
    status: 'Processed',
    uploadedAt: '2026-09-24T12:00:00.000Z'
  }
];
