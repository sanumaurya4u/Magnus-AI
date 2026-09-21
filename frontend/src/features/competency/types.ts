export interface Domain {
  id: string;
  name: string;
  description: string;
}

export interface CompetencyLevelDef {
  level: string; // 'L1', 'L2', etc.
  name: string;
  description: string;
}

export interface Competency {
  id: string;
  domainId: string;
  name: string;
  code: string;
}

export interface JobRole {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface RoleCompetencyRequirement {
  jobRoleId: string;
  competencyId: string;
  requiredLevel: string; // 'L1' - 'L5'
}
