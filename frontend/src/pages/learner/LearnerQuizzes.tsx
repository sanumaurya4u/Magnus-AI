import React, { useState } from 'react';
import { Brain, Settings2, AlertCircle, ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import { COMPETENCIES } from '../../features/competency/mockData';
import { AssessmentRunner } from '../../features/assessment/AssessmentRunner';
import type { Assessment, AssessmentAttempt } from '../../features/assessment/types';
import { generateQuestions } from '../../lib/api';

const MOCK_GAPS = ['STAT_SAMPLING', 'TECH_PYTHON', 'TECH_SQL'];

export const LearnerQuizzes: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<Assessment | null>(null);
  const [attemptResult, setAttemptResult] = useState<AssessmentAttempt | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const [form, setForm] = useState({
    competencyId: MOCK_GAPS[0],
    level: 'L2',
    numQuestions: 5
  });

  const timeLimitMinutes = Math.ceil(form.numQuestions * 1.5);

  const handleGenerateAndStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    const compName = COMPETENCIES.find(c => c.id === form.competencyId)?.name || 'General';
    
    try {
      const result = await generateQuestions({
        competency_name: compName,
        difficulty_level: form.level,
        num_questions: form.numQuestions
      });

      const mappedQuestions = result.questions.map((q, i) => {
        const correctIndex = q.options.findIndex(o => o.is_correct);
        return {
          id: `q-${i}-${Date.now()}`,
          text: q.question_text,
          options: q.options.map(o => o.text),
          correctOptionIndex: correctIndex === -1 ? 0 : correctIndex, // fallback to 0 if none marked correct
          explanation: q.explanation,
          competencyId: form.competencyId
        };
      });

      const newQuiz: Assessment = {
        id: `practice-${Date.now()}`,
        title: `${compName} Practice Quiz (${form.level})`,
        description: `Targeted practice generated for ${compName}.`,
        timeLimitMinutes,
        totalQuestions: mappedQuestions.length,
        competencyId: form.competencyId,
        questions: mappedQuestions
      };

      setActiveQuiz(newQuiz);
      setAttemptResult(null);
    } catch (error) {
      console.warn('Backend API request failed — using offline demo fallback:', error);
      
      // Fallback: Generate mock questions based on config
      const mockQuestions = Array.from({ length: form.numQuestions }).map((_, i) => ({
        id: `q-${i}`,
        text: `[OFFLINE MODE] The AI backend is currently unreachable. This is a placeholder question ${i + 1} for ${compName} at level ${form.level}. Which of the following is correct?`,
        options: [
          'Incorrect option A',
          'Correct option B',
          'Incorrect option C',
          'Incorrect option D'
        ],
        correctOptionIndex: 1,
        explanation: `Please start the FastAPI backend to generate real questions using Gemini RAG.`,
        competencyId: form.competencyId
      }));

      const newQuiz: Assessment = {
        id: `practice-${Date.now()}`,
        title: `${compName} Practice Quiz (${form.level})`,
        description: `Targeted practice generated for ${compName}.`,
        timeLimitMinutes,
        totalQuestions: form.numQuestions,
        competencyId: form.competencyId,
        questions: mockQuestions
      };

      setActiveQuiz(newQuiz);
      setAttemptResult(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleComplete = (result: AssessmentAttempt) => {
    setAttemptResult(result);
    // trigger animation
    setTimeout(() => setAnimatedScore(result.percentage), 200);
  };

  const handleCancel = () => {
    setActiveQuiz(null);
  };

  const resetGenerator = () => {
    setActiveQuiz(null);
    setAttemptResult(null);
    setAnimatedScore(0);
  };

  // If showing result
  if (attemptResult && activeQuiz) {
    const scoreColor = attemptResult.percentage >= 75 ? '#237A3C' : attemptResult.percentage >= 50 ? '#B86B00' : '#C93B2B';

    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white border border-[#E6E0D4] rounded-3xl shadow-[0_4px_24px_rgba(28,26,24,0.06)] p-8 md:p-10 text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-[#EDF7EF] border border-[#CCEBD3] rounded-3xl flex items-center justify-center mx-auto mb-5">
            <Brain className="w-10 h-10 text-[#237A3C]" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#1A1816] tracking-tight mb-2">
            Practice Completed
          </h2>
          <p className="text-xs text-[#6B645B] mb-8 font-medium">
            Review your performance on <span className="font-bold">{activeQuiz.title}</span>.
          </p>

          <div className="mb-8 text-left bg-[#FAF8F5] border border-[#EFE9DF] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#1A1816] uppercase tracking-wider">Score</span>
              <span className="text-xs font-mono text-[#8C8375]">{attemptResult.score} / {activeQuiz.totalQuestions}</span>
            </div>
            <div className="w-full bg-[#E5DFD4] h-3 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${animatedScore}%`, backgroundColor: scoreColor }}
              />
            </div>
          </div>

          <button 
            onClick={resetGenerator}
            className="px-8 py-3 bg-[#1C1A18] hover:bg-[#2B2825] text-white font-bold text-sm rounded-full transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0"
          >
            Configure Another Quiz
          </button>
        </div>
      </div>
    );
  }

  // If quiz is active
  if (activeQuiz) {
    return (
      <div className="py-4">
        <AssessmentRunner 
          assessment={activeQuiz} 
          onComplete={handleComplete} 
          onCancel={handleCancel} 
        />
      </div>
    );
  }

  // Quiz Configurator
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
          Skill Builder &bull; AI Generator
        </span>
        <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight flex items-center">
          <Brain className="w-8 h-8 text-[#D9531E] mr-3" />
          Practice Quizzes
        </h1>
        <p className="text-[#6B645B] text-sm mt-1 font-medium">
          Generate targeted mock assessments to validate your proficiency and prepare for official evaluations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E6E0D4] shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#EFE9DF] flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-[#8C8375]" />
          <h2 className="font-bold text-[#1A1816]">Quiz Configuration</h2>
        </div>
        
        <form onSubmit={handleGenerateAndStart} className="p-6 md:p-8 space-y-8">
          
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-2 block">
                Target Competency
              </span>
              <div className="relative">
                <select 
                  value={form.competencyId}
                  onChange={e => setForm({...form, competencyId: e.target.value})}
                  className="w-full pl-4 pr-10 py-3 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm font-bold text-[#1A1816] appearance-none focus:outline-none focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E]"
                >
                  <optgroup label="Recommended for You (Identified Gaps)">
                    {COMPETENCIES.filter(c => MOCK_GAPS.includes(c.id)).map(c => (
                      <option key={c.id} value={c.id}>⭐ {c.name} ({c.code})</option>
                    ))}
                  </optgroup>
                  <optgroup label="All Competencies">
                    {COMPETENCIES.filter(c => !MOCK_GAPS.includes(c.id)).map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown className="w-5 h-5 text-[#8C8375] absolute right-4 top-3 pointer-events-none" />
              </div>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-2 block">
                  Toughness Level
                </span>
                <div className="relative">
                  <select 
                    value={form.level}
                    onChange={e => setForm({...form, level: e.target.value})}
                    className="w-full pl-4 pr-10 py-3 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm font-bold text-[#1A1816] appearance-none focus:outline-none focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E]"
                  >
                    <option value="L1">L1 • Awareness</option>
                    <option value="L2">L2 • Basic</option>
                    <option value="L3">L3 • Working</option>
                    <option value="L4">L4 • Advanced</option>
                    <option value="L5">L5 • Expert</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#8C8375] absolute right-4 top-3 pointer-events-none" />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-2 block">
                  Number of Questions
                </span>
                <div className="relative">
                  <select 
                    value={form.numQuestions}
                    onChange={e => setForm({...form, numQuestions: Number(e.target.value)})}
                    className="w-full pl-4 pr-10 py-3 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm font-bold text-[#1A1816] appearance-none focus:outline-none focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E]"
                  >
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                    <option value={20}>20 Questions</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#8C8375] absolute right-4 top-3 pointer-events-none" />
                </div>
              </label>
            </div>
          </div>

          <div className="bg-[#FEF8EC] border border-[#FBE3B5] rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#B86B00] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#1A1816]">Automatic Time Allocation</p>
              <p className="text-xs text-[#6B645B] mt-1 leading-relaxed">
                Based on your selection of {form.numQuestions} questions, you will have a strict time limit of <span className="font-bold text-[#B86B00]">{timeLimitMinutes} minutes</span> (1.5 mins per question). The quiz will auto-submit when time expires.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EFE9DF] flex justify-end gap-4">
            <button
              type="submit"
              disabled={isGenerating}
              className="flex items-center px-8 py-3.5 bg-[#D9531E] hover:bg-[#C24513] text-white font-bold text-sm rounded-full transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate & Start Quiz
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
