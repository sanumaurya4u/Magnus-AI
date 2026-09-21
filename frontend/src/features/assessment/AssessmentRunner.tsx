import React, { useState, useEffect } from 'react';
import type { Assessment, AssessmentAttempt } from './types';
import { Clock, CheckCircle, ArrowRight, ArrowLeft, Flag, X } from 'lucide-react';

interface Props {
  assessment: Assessment;
  onComplete: (attempt: AssessmentAttempt) => void;
  onCancel: () => void;
}

export const AssessmentRunner: React.FC<Props> = ({ assessment, onComplete, onCancel }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(assessment.timeLimitMinutes * 60);

  // Feedback State
  const [feedbackQuestionId, setFeedbackQuestionId] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState('confusing');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<string[]>([]);

  // Timer logic
  useEffect(() => {
    if (!hasStarted) return;
    
    if (timeLeft <= 0) {
      handleSubmit(); // Auto-submit when time is up
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    const qId = assessment.questions[currentQuestionIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleSubmit = () => {
    let score = 0;
    assessment.questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionIndex) {
        score++;
      }
    });

    const percentage = Math.round((score / assessment.totalQuestions) * 100);
    
    // Simple logic for awarded level based on score
    let awardedLevel = 'L1';
    if (percentage >= 90) awardedLevel = 'L4';
    else if (percentage >= 75) awardedLevel = 'L3';
    else if (percentage >= 50) awardedLevel = 'L2';

    onComplete({
      assessmentId: assessment.id,
      answers,
      score,
      percentage,
      status: 'evaluated',
      awardedLevel
    });
  };

  const handleSubmitFeedback = () => {
    if (feedbackQuestionId) {
      console.log(`Feedback submitted for Q: ${feedbackQuestionId}`, { feedbackType, feedbackText });
      setFeedbackSubmitted(prev => [...prev, feedbackQuestionId]);
      setFeedbackQuestionId(null);
      setFeedbackText('');
      setFeedbackType('confusing');
    }
  };

  if (!hasStarted) {
    return (
      <div className="bg-white border border-[#E6E0D4] rounded-3xl p-8 md:p-10 max-w-2xl mx-auto text-center shadow-[0_4px_24px_rgba(28,26,24,0.06)] relative overflow-hidden">
        {/* Window Bar */}
        <div className="flex items-center space-x-1.5 mb-8 pb-3 border-b border-[#EFE9DF]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          <span className="text-[10px] font-mono text-[#8C8375] ml-auto uppercase tracking-wider">
            assessment &bull; readiness check
          </span>
        </div>

        <div className="w-16 h-16 bg-[#FDF2EC] border border-[#F7D2C0] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#D9531E] shadow-2xs">
          <Clock className="w-7 h-7 text-[#D9531E]" />
        </div>
        <span className="text-[10px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
          Official Skill Verification
        </span>
        <h2 className="text-2xl font-extrabold text-[#1A1816] tracking-tight mb-2">{assessment.title}</h2>
        <p className="text-xs text-[#6B645B] mb-8 max-w-md mx-auto leading-relaxed">{assessment.description}</p>
        
        <div className="flex items-center justify-center space-x-4 mb-8 text-xs font-semibold text-[#8C8375]">
          <div className="flex items-center bg-[#FAF8F5] border border-[#EFE9DF] px-4 py-2 rounded-full">
            <span className="text-[#1A1816] font-bold font-mono mr-1.5">{assessment.totalQuestions}</span> Questions
          </div>
          <div className="flex items-center bg-[#FAF8F5] border border-[#EFE9DF] px-4 py-2 rounded-full">
            <span className="text-[#1A1816] font-bold font-mono mr-1.5">{assessment.timeLimitMinutes}</span> Minutes
          </div>
        </div>

        <div className="flex justify-center space-x-3">
          <button 
            onClick={onCancel}
            className="px-6 py-2.5 font-bold text-xs text-[#665F55] border border-[#DDD6C8] bg-white hover:bg-[#F2ECE0] rounded-full transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={() => setHasStarted(true)}
            className="px-8 py-2.5 bg-[#D9531E] hover:bg-[#C24513] text-white font-bold text-xs rounded-full transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Assessment →
          </button>
        </div>
      </div>
    );
  }

  const currentQ = assessment.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-[#D9531E] uppercase block mb-0.5">
            Active Evaluation
          </span>
          <h1 className="text-xl font-extrabold text-[#1A1816] line-clamp-1">{assessment.title}</h1>
          <p className="text-xs font-mono text-[#8C8375] mt-0.5">
            Question {currentQuestionIndex + 1} of {assessment.totalQuestions}
          </p>
        </div>
        <div className={`flex items-center px-4 py-1.5 rounded-full font-mono text-xs font-bold shadow-2xs ${
          timeLeft < 60 ? 'bg-[#FDF0ED] text-[#C93B2B] border border-[#F8D0C9]' : 'bg-[#1C1A18] text-[#F7F3EB]'
        }`}>
          <Clock className="w-3.5 h-3.5 mr-1.5 opacity-80" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-[#E5DFD4] h-1.5 rounded-full mb-6 overflow-hidden">
        <div 
          className="bg-[#D9531E] h-full transition-all duration-300 rounded-full"
          style={{ width: `${(answeredCount / assessment.totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white border border-[#E6E0D4] rounded-3xl shadow-[0_2px_12px_rgba(28,26,24,0.04)] p-6 md:p-8 mb-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#EFE9DF]">
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          </div>
          {!feedbackSubmitted.includes(currentQ.id) ? (
            <button 
              onClick={() => setFeedbackQuestionId(currentQ.id)}
              className="flex items-center text-[11px] font-bold text-[#8C8375] hover:text-[#D9531E] transition-colors bg-[#FAF8F5] hover:bg-[#FDF2EC] border border-[#EFE9DF] px-3 py-1 rounded-full"
            >
              <Flag className="w-3 h-3 mr-1.5" />
              Report Issue
            </button>
          ) : (
            <div className="flex items-center text-[11px] font-bold text-[#237A3C] bg-[#EDF7EF] border border-[#CCEBD3] px-3 py-1 rounded-full">
              <CheckCircle className="w-3 h-3 mr-1.5" />
              Feedback Sent
            </div>
          )}
        </div>

        <h3 className="text-base md:text-lg font-extrabold text-[#1A1816] mb-6 leading-relaxed">
          {currentQ.text}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = answers[currentQ.id] === idx;
            return (
              <div 
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center ${
                  isSelected 
                    ? 'border-[#D9531E] bg-[#FDF2EC] shadow-2xs' 
                    : 'border-[#E6E0D4] bg-[#FAF8F5] hover:border-[#D5CEC2] hover:bg-white text-[#1A1816]'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3.5 shrink-0 ${
                  isSelected ? 'border-[#D9531E] bg-[#D9531E]' : 'border-[#D5CEC2]'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <span className={`text-sm ${isSelected ? 'font-bold text-[#1A1816]' : 'font-medium text-[#4A443C]'}`}>
                  {option}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          disabled={currentQuestionIndex === 0}
          className="flex items-center px-6 py-2.5 text-[#554E45] font-bold text-xs rounded-full border border-[#DDD6C8] bg-white hover:bg-[#F2ECE0] disabled:opacity-40 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Previous
        </button>
        
        {currentQuestionIndex === assessment.totalQuestions - 1 ? (
          <button
            onClick={handleSubmit}
            className="flex items-center px-8 py-2.5 bg-[#237A3C] hover:bg-[#1E6934] text-white font-bold text-xs rounded-full transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
          >
            Submit Assessment <CheckCircle className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
            className="flex items-center px-7 py-2.5 bg-[#1C1A18] hover:bg-[#2B2825] text-white font-bold text-xs rounded-full transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
          >
            Next Question <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>

      {/* Feedback Modal Overlay */}
      {feedbackQuestionId && (
        <div className="fixed inset-0 bg-[#1C1A18]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden border border-[#E6E0D4]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#EFE9DF] bg-[#FAF8F5]">
              <h3 className="text-sm font-extrabold text-[#1A1816] flex items-center">
                <Flag className="w-4 h-4 text-[#D9531E] mr-2" />
                Report Question Issue
              </h3>
              <button 
                onClick={() => setFeedbackQuestionId(null)}
                className="text-[#8C8375] hover:text-[#1A1816] rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">What is the problem?</label>
                <select 
                  value={feedbackType}
                  onChange={e => setFeedbackType(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-xs font-medium text-[#1A1816] focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] focus:outline-none"
                >
                  <option value="confusing">Confusing wording</option>
                  <option value="incorrect_options">No correct option / Multiple correct</option>
                  <option value="too_hard">Too difficult for this level</option>
                  <option value="off_topic">Not relevant to the competency</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Additional Details</label>
                <textarea 
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  placeholder="Provide context for NSSTA trainers to refine..."
                  className="w-full p-3 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-xs text-[#1A1816] focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] focus:outline-none h-24 resize-none"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#EFE9DF] flex justify-end space-x-3">
              <button 
                onClick={() => setFeedbackQuestionId(null)}
                className="px-5 py-2 font-bold text-xs text-[#665F55] hover:bg-[#EAE4D7] rounded-full transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitFeedback}
                className="px-6 py-2 font-bold text-xs text-white bg-[#D9531E] hover:bg-[#C24513] rounded-full transition-colors shadow-2xs"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
