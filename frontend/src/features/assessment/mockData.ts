import type { Assessment } from './types';

export const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: 'a1',
    title: 'Python for Data Analysis - Level Assessment',
    description: 'This assessment evaluates your practical ability to use Python for statistical data manipulation, matching the requirements of the TECH_PYTHON competency.',
    timeLimitMinutes: 10,
    totalQuestions: 4,
    competencyId: 'c6', // Maps to TECH_PYTHON
    questions: [
      {
        id: 'q1',
        text: 'Which pandas function is used to handle missing data by filling it with a specified value?',
        options: [
          'dropna()',
          'fillna()',
          'replace()',
          'impute()'
        ],
        correctOptionIndex: 1,
        explanation: 'fillna() is specifically designed in pandas to fill NA/NaN values using specified methods or values.'
      },
      {
        id: 'q2',
        text: 'What is the primary difference between a list and a tuple in Python?',
        options: [
          'Lists can only store numbers, tuples can store any data type.',
          'Lists are mutable, while tuples are immutable.',
          'Tuples are mutable, while lists are immutable.',
          'There is no difference, they are just different names.'
        ],
        correctOptionIndex: 1,
        explanation: 'Lists are mutable (can be changed after creation), whereas tuples are immutable (cannot be changed).'
      },
      {
        id: 'q3',
        text: 'Which library is standard for creating static, interactive, and animated visualizations in Python?',
        options: [
          'numpy',
          'scikit-learn',
          'matplotlib',
          'requests'
        ],
        correctOptionIndex: 2,
        explanation: 'matplotlib is the foundational plotting library for Python.'
      },
      {
        id: 'q4',
        text: 'How do you read a CSV file into a pandas DataFrame?',
        options: [
          'pd.read_csv("file.csv")',
          'pd.open("file.csv")',
          'pandas.load_csv("file.csv")',
          'df.read("file.csv")'
        ],
        correctOptionIndex: 0,
        explanation: 'pd.read_csv() is the standard pandas function to read a comma-separated values (CSV) file into a DataFrame.'
      }
    ]
  }
];
