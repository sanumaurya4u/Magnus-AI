import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_ASSESSMENTS } from '../../features/assessment/mockData';
import { AssessmentRunner } from '../../features/assessment/AssessmentRunner';
import type { AssessmentAttempt } from '../../features/assessment/types';
import { Award, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';

export const AssessmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState<AssessmentAttempt | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);

  const assessment = MOCK_ASSESSMENTS.find(a => a.id === id);

  // Animate the score bar when result is shown
  useEffect(() => {
    if (attempt) {
      setAnimatedScore(0);
      const timer = setTimeout(() => {
        setAnimatedScore(attempt.percentage);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [attempt]);

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
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#1C1A18] text-white text-xs font-bold hover:bg-black transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
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

  // Result screen
  if (attempt) {
    const isPassing = attempt.percentage >= 50;
    const scoreColor = attempt.percentage >= 75 ? '#237A3C' : attempt.percentage >= 50 ? '#B86B00' : '#C93B2B';
    const scoreBg = attempt.percentage >= 75 ? '#EDF7EF' : attempt.percentage >= 50 ? '#FEF8EC' : '#FDF0ED';
    const scoreBorder = attempt.percentage >= 75 ? '#CCEBD3' : attempt.percentage >= 50 ? '#FBE3B5' : '#F8D0C9';

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
          
          {/* Score cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: scoreBg, borderColor: scoreBorder }}>
              <span className="text-[11px] font-bold uppercase tracking-wider block mb-1" style={{ color: scoreColor }}>Final Score</span>
              <p className="text-4xl font-extrabold font-mono-code" style={{ color: scoreColor }}>{attempt.percentage}%</p>
              <p className="text-xs mt-1.5 font-medium text-[#8C8375]">{attempt.score} of {assessment.totalQuestions} correct</p>
            </div>
            <div className="bg-[#FDF2EC] p-6 rounded-2xl border border-[#F7D2C0]">
              <span className="text-[11px] font-bold text-[#D9531E] uppercase tracking-wider block mb-1">Awarded Level</span>
              <p className="text-4xl font-extrabold text-[#D9531E] font-mono-code">{attempt.awardedLevel}</p>
              <p className="text-xs text-[#6B645B] mt-1.5 font-medium">Competency updated in Passport</p>
            </div>
          </div>

          {/* Animated Score Progress Bar */}
          <div className="mb-8 text-left bg-[#FAF8F5] border border-[#EFE9DF] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#D9531E]" />
                <span className="text-xs font-bold text-[#1A1816] uppercase tracking-wider">Score Breakdown</span>
              </div>
              <span className="text-xs font-mono text-[#8C8375]">{attempt.percentage}% — {isPassing ? 'Passing' : 'Needs Improvement'}</span>
            </div>
            <div className="w-full bg-[#E5DFD4] h-3 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${animatedScore}%`,
                  backgroundColor: scoreColor
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-mono text-[#8C8375]">
              <span>0%</span>
              <span className="text-[#B86B00]">50% Pass</span>
              <span className="text-[#237A3C]">75% Merit</span>
              <span>100%</span>
            </div>
          </div>

          {/* Next steps suggestion */}
          {!isPassing && (
            <div className="mb-6 p-4 bg-[#FEF8EC] border border-[#FBE3B5] rounded-2xl flex items-start gap-3 text-left">
              <BookOpen className="w-4 h-4 text-[#B86B00] mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-[#1A1816]">Recommended Next Step</p>
                <p className="text-xs text-[#6B645B] mt-0.5">Review the Learning Path resources for this competency and retake the assessment after completing them.</p>
              </div>
            </div>
          )}
          
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
