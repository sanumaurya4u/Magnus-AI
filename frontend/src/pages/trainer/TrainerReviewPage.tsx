import React, { useState } from 'react';
import { ReviewQuizzes } from '../../features/trainer/ReviewQuizzes';
import { INITIAL_QUIZZES, type PendingQuiz } from '../../features/trainer/mockData';
import { CheckSquare } from 'lucide-react';

export const TrainerReviewPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<PendingQuiz[]>(INITIAL_QUIZZES);

  const handleApproveQuiz = (quizId: string) => {
    setQuizzes(prev => prev.map(q => q.id === quizId ? { ...q, status: 'approved' } : q));
  };

  const handleUpdateQuiz = (updatedQuiz: PendingQuiz) => {
    setQuizzes(prev => prev.map(q => q.id === updatedQuiz.id ? updatedQuiz : q));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div>
        <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
          Trainer Workbench &bull; NSSTA & MoSPI
        </span>
        <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight flex items-center">
          <CheckSquare className="w-8 h-8 text-[#D9531E] mr-3" />
          Review AI Quizzes
        </h1>
        <p className="text-[#6B645B] text-sm mt-1 font-medium">Review and approve AI-generated competency assessments.</p>
      </div>

      <div>
        <ReviewQuizzes 
          quizzes={quizzes} 
          onApproveQuiz={handleApproveQuiz} 
          onUpdateQuiz={handleUpdateQuiz} 
        />
      </div>
    </div>
  );
};
