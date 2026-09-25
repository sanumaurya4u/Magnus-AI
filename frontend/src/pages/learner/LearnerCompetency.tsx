import React from 'react';
import { CompetencyMatrix } from '../../features/competency/CompetencyMatrix';

export const LearnerCompetencyPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <CompetencyMatrix />
    </div>
  );
};
