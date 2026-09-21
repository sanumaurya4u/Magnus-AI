export interface LearnerProfile {
  id: string;
  fullName: string;
  employeeCode: string;
  designation: string;
  department: string;
  jobRole: string;
  currentAssignment: string;
  educationSummary: string;
  yearsOfExperience: number;
  certifications: string;
  previousTraining: string;
}

export interface CompetencyLevel {
  id: string;
  domain: string;
  name: string;
  level: string; // 'L1', 'L2', 'L3', 'L4', 'L5'
  levelName: string; // 'Awareness', 'Basic', etc.
}
