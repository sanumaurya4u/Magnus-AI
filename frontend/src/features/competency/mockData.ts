import type { Domain, Competency, JobRole, RoleCompetencyRequirement, CompetencyLevelDef } from './types';

export const DOMAINS: Domain[] = [
  { id: 'd1', name: 'Statistical', description: 'Core statistical and methodological skills' },
  { id: 'd2', name: 'Technical', description: 'Tools, programming, and data engineering' },
  { id: 'd3', name: 'Digital Governance', description: 'Data privacy, security, and digital public infrastructure' },
  { id: 'd4', name: 'Behavioural & Managerial', description: 'Leadership, communication, and project management' },
];

export const LEVELS: CompetencyLevelDef[] = [
  { level: 'L1', name: 'Awareness', description: 'Basic knowledge and awareness' },
  { level: 'L2', name: 'Basic', description: 'Can perform tasks with assistance' },
  { level: 'L3', name: 'Working', description: 'Can perform tasks independently' },
  { level: 'L4', name: 'Advanced', description: 'Can guide others and handle complex tasks' },
  { level: 'L5', name: 'Expert', description: 'Strategic understanding and innovation' },
];

export const COMPETENCIES: Competency[] = [
  // Statistical
  { id: 'c1', domainId: 'd1', name: 'Survey Design', code: 'STAT_SURVEY' },
  { id: 'c2', domainId: 'd1', name: 'Sampling', code: 'STAT_SAMPLING' },
  { id: 'c3', domainId: 'd1', name: 'National Accounts', code: 'STAT_NAT_ACC' },
  { id: 'c4', domainId: 'd1', name: 'Price Statistics', code: 'STAT_PRICE' },
  { id: 'c5', domainId: 'd1', name: 'Labour Statistics', code: 'STAT_LABOUR' },
  
  // Technical
  { id: 'c6', domainId: 'd2', name: 'Python', code: 'TECH_PYTHON' },
  { id: 'c7', domainId: 'd2', name: 'R', code: 'TECH_R' },
  { id: 'c8', domainId: 'd2', name: 'SQL', code: 'TECH_SQL' },
  { id: 'c9', domainId: 'd2', name: 'Data Visualization', code: 'TECH_DATAVIZ' },
  { id: 'c10', domainId: 'd2', name: 'AI/ML', code: 'TECH_AIML' },

  // Digital Governance
  { id: 'c11', domainId: 'd3', name: 'Cybersecurity', code: 'GOV_CYBER' },
  { id: 'c12', domainId: 'd3', name: 'Data Privacy', code: 'GOV_PRIVACY' },
  { id: 'c13', domainId: 'd3', name: 'Digital Public Infrastructure', code: 'GOV_DPI' },

  // Behavioural & Managerial
  { id: 'c14', domainId: 'd4', name: 'Leadership', code: 'BEHAV_LEAD' },
  { id: 'c15', domainId: 'd4', name: 'Communication', code: 'BEHAV_COMM' },
  { id: 'c16', domainId: 'd4', name: 'Project Management', code: 'BEHAV_PM' },
];

export const JOB_ROLES: JobRole[] = [
  { id: 'jr1', name: 'Junior Statistical Officer', code: 'JSO', description: 'Entry-level statistical analysis and survey execution.' },
  { id: 'jr2', name: 'Statistical Officer', code: 'SO', description: 'Mid-level statistical design and reporting.' },
  { id: 'jr3', name: 'Data Analyst', code: 'DA', description: 'Technical role focusing on programming and data engineering.' },
];

export const ROLE_REQUIREMENTS: RoleCompetencyRequirement[] = [
  // JSO Requirements
  { jobRoleId: 'jr1', competencyId: 'c1', requiredLevel: 'L2' }, // Survey Design
  { jobRoleId: 'jr1', competencyId: 'c2', requiredLevel: 'L3' }, // Sampling
  { jobRoleId: 'jr1', competencyId: 'c6', requiredLevel: 'L2' }, // Python
  { jobRoleId: 'jr1', competencyId: 'c8', requiredLevel: 'L3' }, // SQL
  { jobRoleId: 'jr1', competencyId: 'c9', requiredLevel: 'L2' }, // Data Visualization
  { jobRoleId: 'jr1', competencyId: 'c12', requiredLevel: 'L2' }, // Data Privacy
  { jobRoleId: 'jr1', competencyId: 'c15', requiredLevel: 'L3' }, // Communication

  // SO Requirements (Higher levels, more managerial)
  { jobRoleId: 'jr2', competencyId: 'c1', requiredLevel: 'L4' },
  { jobRoleId: 'jr2', competencyId: 'c2', requiredLevel: 'L4' },
  { jobRoleId: 'jr2', competencyId: 'c3', requiredLevel: 'L3' },
  { jobRoleId: 'jr2', competencyId: 'c6', requiredLevel: 'L3' },
  { jobRoleId: 'jr2', competencyId: 'c9', requiredLevel: 'L4' },
  { jobRoleId: 'jr2', competencyId: 'c14', requiredLevel: 'L3' },
  { jobRoleId: 'jr2', competencyId: 'c16', requiredLevel: 'L3' },

  // DA Requirements (High technical, lower survey)
  { jobRoleId: 'jr3', competencyId: 'c2', requiredLevel: 'L2' },
  { jobRoleId: 'jr3', competencyId: 'c6', requiredLevel: 'L4' }, // Python
  { jobRoleId: 'jr3', competencyId: 'c8', requiredLevel: 'L5' }, // SQL
  { jobRoleId: 'jr3', competencyId: 'c9', requiredLevel: 'L4' }, // Data Viz
  { jobRoleId: 'jr3', competencyId: 'c10', requiredLevel: 'L3' }, // AI/ML
  { jobRoleId: 'jr3', competencyId: 'c11', requiredLevel: 'L3' }, // Cyber
];
