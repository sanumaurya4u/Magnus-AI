import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_ASSESSMENTS } from '../../features/assessment/mockData';
import { AssessmentRunner } from '../../features/assessment/AssessmentRunner';
import type { AssessmentAttempt } from '../../features/assessment/types';
import { Award, ArrowRight } from 'lucide-react';

export const AssessmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);

  const assessment = MOCK_ASSESSMENTS.find(a => a.id === id);

  if (!assessment) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <div className="bg-[#FBF8F2] border border-[#E6E0D4] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-center space-x-1.5 pb-3 mb-4 border-b border-[#EFE9DF]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
            <span className="text-[10px] font-mono tracking-widest text-[#8C8375] uppercase ml-2">Assessment // Not Found</span>
          </div>
          <h2 className="text-xl font-black text-[#1C1A18] tracking-tight mb-2">Assessment Not Found</h2>
          <p className="text-sm text-[#736B5E] mb-6">The requested competency evaluation is not registered or has expired.</p>
          <button 
            onClick={() => navigate('/learner')} 
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#1C1A18] text-white text-xs font-bold hover:bg-black transition-all cursor-pointer"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = (result: AssessmentAttempt) => {
    setAttempt(result);
  };

  const handleCancel = () => {
    navigate('/learner');
  };

  if (attempt) {
    return (
      <div className="max-w-2xl mx-auto mt-6">
        <div className="bg-white border border-[#E6E0D4] rounded-3xl shadow-[0_4px_24px_rgba(28,26,24,0.06)] p-8 md:p-10 text-center relative overflow-hidden">
          {/* Window Bar */}
          <div className="flex items-center space-x-1.5 mb-8 pb-3 border-b border-[#EFE9DF]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <span className="text-[10px] font-mono text-[#8C8375] ml-auto uppercase tracking-wider">
              results &bull; certified evaluation
            </span>
          </div>

          <div className="w-20 h-20 bg-[#EDF7EF] border border-[#CCEBD3] rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xs">
            <Award className="w-10 h-10 text-[#237A3C]" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-[#1A1816] tracking-tight mb-1">
            Assessment Completed!
          </h2>
          <p className="text-xs text-[#6B645B] mb-8 font-medium">
            You have successfully completed the official verification for <span className="font-bold text-[#1A1816]">{assessment.title}</span>.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EFE9DF]">
              <span className="text-[11px] font-bold text-[#8C8375] uppercase tracking-wider block mb-1">Final Score</span>
              <p className="text-4xl font-extrabold text-[#1A1816] font-mono-code">{attempt.percentage}%</p>
              <p className="text-xs text-[#8C8375] mt-1.5 font-medium">{attempt.score} of {assessment.totalQuestions} correct</p>
            </div>
            <div className="bg-[#FDF2EC] p-6 rounded-2xl border border-[#F7D2C0]">
              <span className="text-[11px] font-bold text-[#D9531E] uppercase tracking-wider block mb-1">Awarded Level</span>
              <p className="text-4xl font-extrabold text-[#D9531E] font-mono-code">{attempt.awardedLevel}</p>
              <p className="text-xs text-[#6B645B] mt-1.5 font-medium">Competency updated in Passport</p>
            </div>
          </div>
          
          <div className="flex justify-center items-center space-x-3">
            <Link 
              to="/learner/profile"
              className="px-6 py-3 border border-[#DDD6C8] bg-white text-[#1A1816] font-bold text-xs rounded-full hover:bg-[#F2ECE0] transition-all shadow-2xs"
            >
              View Updated Passport
            </Link>
            <Link 
              to="/learner"
              className="flex items-center px-7 py-3 bg-[#1C1A18] hover:bg-[#2B2825] text-white font-bold text-xs rounded-full transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
            >
              Return to Dashboard
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <AssessmentRunner 
        assessment={assessment} 
        onComplete={handleComplete} 
        onCancel={handleCancel} 
      />
    </div>
  );
};
