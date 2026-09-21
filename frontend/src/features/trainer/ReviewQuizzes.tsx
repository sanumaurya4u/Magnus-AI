import React, { useState } from 'react';
import { Edit3, CheckCircle, Save, X, BrainCircuit, AlertCircle } from 'lucide-react';

interface Option {
  text: string;
  is_correct: boolean;
}

interface Question {
  id: string;
  question_text: string;
  options: Option[];
  explanation: string;
  difficulty: string;
  competency: string;
}

interface PendingQuiz {
  id: string;
  sourceMaterial: string;
  competencyName: string;
  difficultyLevel: string;
  status: 'pending' | 'approved';
  questions: Question[];
}

// Mock data simulating the output of Phase 11
const INITIAL_QUIZZES: PendingQuiz[] = [
  {
    id: 'q1',
    sourceMaterial: 'Introduction_to_Sampling_v2.pdf',
    competencyName: 'Sampling',
    difficultyLevel: 'L3',
    status: 'pending',
    questions: [
      {
        id: '1',
        question_text: 'In a stratified random sample, what is the primary purpose of dividing the population into strata?',
        options: [
          { text: 'To increase the overall margin of error intentionally.', is_correct: false },
          { text: 'To ensure representation of specific subgroups and reduce variance.', is_correct: true },
          { text: 'To make the sampling process entirely non-random.', is_correct: false },
          { text: 'To eliminate the need for calculating a sample mean.', is_correct: false }
        ],
        explanation: 'Stratification ensures subgroups are proportionally represented, often reducing standard error compared to simple random sampling.',
        difficulty: 'L3',
        competency: 'Sampling'
      },
      {
        id: '2',
        question_text: 'Which scenario best justifies using cluster sampling instead of simple random sampling?',
        options: [
          { text: 'When the population is highly homogenous.', is_correct: false },
          { text: 'When a comprehensive sampling frame of all individuals is readily available.', is_correct: false },
          { text: 'When the population is geographically dispersed and travel costs are high.', is_correct: true },
          { text: 'When you want to survey every single unit in the population.', is_correct: false }
        ],
        explanation: 'Cluster sampling is highly cost-effective when populations are spread over wide areas, as entire clusters (like villages) are sampled at once.',
        difficulty: 'L3',
        competency: 'Sampling'
      }
    ]
  }
];

export const ReviewQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<PendingQuiz[]>(INITIAL_QUIZZES);
  const [selectedQuiz, setSelectedQuiz] = useState<PendingQuiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const pendingCount = quizzes.filter(q => q.status === 'pending').length;

  const handleApproveQuiz = (quizId: string) => {
    setQuizzes(prev => prev.map(q => q.id === quizId ? { ...q, status: 'approved' } : q));
    setSelectedQuiz(null);
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion || !selectedQuiz) return;
    
    // Update the question inside the selected quiz
    const updatedQuestions = selectedQuiz.questions.map(q => 
      q.id === editingQuestion.id ? editingQuestion : q
    );
    
    const updatedQuiz = { ...selectedQuiz, questions: updatedQuestions };
    
    setSelectedQuiz(updatedQuiz);
    setQuizzes(prev => prev.map(q => q.id === updatedQuiz.id ? updatedQuiz : q));
    setEditingQuestion(null);
  };

  return (
    <div className="bg-white border border-[#E6E0D4] rounded-3xl shadow-[0_2px_12px_rgba(28,26,24,0.04)] overflow-hidden h-full flex flex-col min-h-[600px]">
      <div className="bg-[#FAF8F5] px-6 py-4 flex justify-between items-center border-b border-[#EFE9DF]">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#1A1816]">AI Quiz Verification & Approval</h2>
            <p className="text-[11px] text-[#8C8375]">Review, edit, and approve MCQs generated from uploaded materials.</p>
          </div>
        </div>
        <div className="bg-[#FEF8EC] text-[#B86B00] border border-[#FBE3B5] text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-2xs font-mono">
          <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
          {pendingCount} Pending Reviews
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Quiz List */}
        <div className="w-full lg:w-1/3 border-r border-[#E6E0D4] bg-[#FAF8F5] overflow-y-auto">
          {quizzes.map(quiz => (
            <div 
              key={quiz.id}
              onClick={() => setSelectedQuiz(quiz)}
              className={`p-5 border-b border-[#EFE9DF] cursor-pointer transition-colors ${
                selectedQuiz?.id === quiz.id ? 'bg-white border-l-4 border-l-[#D9531E] shadow-2xs' : 'hover:bg-[#F2ECE0] border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  quiz.status === 'pending' ? 'bg-[#FEF8EC] text-[#B86B00] border-[#FBE3B5]' : 'bg-[#EDF7EF] text-[#237A3C] border-[#CCEBD3]'
                }`}>
                  {quiz.status.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#8C8375] bg-[#EFE9DF] px-2 py-0.5 rounded-full">{quiz.questions.length} Qs</span>
              </div>
              <h3 className="text-sm font-extrabold text-[#1A1816] line-clamp-1">{quiz.competencyName} Assessment</h3>
              <p className="text-xs text-[#8C8375] mt-1 font-mono line-clamp-1">From: {quiz.sourceMaterial}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Quiz Detail & Editor */}
        <div className="w-full lg:w-2/3 bg-white overflow-y-auto relative">
          {!selectedQuiz ? (
            <div className="flex flex-col items-center justify-center h-full text-[#8C8375] p-8 text-center">
              <BrainCircuit className="w-14 h-14 mb-4 text-[#D5CEC2]" />
              <p className="text-base font-extrabold text-[#1A1816]">Select a quiz to review</p>
              <p className="text-xs text-[#8C8375] mt-1">Verify AI-generated questions before they are published to learners.</p>
            </div>
          ) : (
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-[#EFE9DF] pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#1A1816]">{selectedQuiz.competencyName} Assessment</h2>
                  <p className="text-xs text-[#8C8375] font-mono">Generated from {selectedQuiz.sourceMaterial}</p>
                </div>
                {selectedQuiz.status === 'pending' && (
                  <button 
                    onClick={() => handleApproveQuiz(selectedQuiz.id)}
                    className="flex items-center px-5 py-2 bg-[#237A3C] text-white text-xs font-bold rounded-full hover:bg-[#1E6934] transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                    Approve All Questions
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {selectedQuiz.questions.map((q, idx) => (
                  <div key={q.id} className="border border-[#E6E0D4] rounded-2xl p-5 bg-[#FAF8F5] hover:border-[#D5CEC2] transition-colors relative group">
                    {editingQuestion?.id === q.id ? (
                      /* Editing View */
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1">Question Text</label>
                          <textarea 
                            value={editingQuestion.question_text}
                            onChange={(e) => setEditingQuestion({...editingQuestion, question_text: e.target.value})}
                            className="w-full text-xs p-3 bg-white border border-[#D8D1C3] rounded-xl focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] focus:outline-none"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider">Options</label>
                          {editingQuestion.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center space-x-3">
                              <input 
                                type="radio" 
                                name="correct_option"
                                checked={opt.is_correct}
                                onChange={() => {
                                  const newOpts = editingQuestion.options.map((o, i) => ({...o, is_correct: i === oIdx}));
                                  setEditingQuestion({...editingQuestion, options: newOpts});
                                }}
                                className="w-4 h-4 text-[#D9531E] focus:ring-[#D9531E]"
                              />
                              <input 
                                type="text" 
                                value={opt.text}
                                onChange={(e) => {
                                  const newOpts = [...editingQuestion.options];
                                  newOpts[oIdx].text = e.target.value;
                                  setEditingQuestion({...editingQuestion, options: newOpts});
                                }}
                                className={`flex-1 text-xs p-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] ${opt.is_correct ? 'border-[#CCEBD3] bg-[#EDF7EF]' : 'border-[#D8D1C3] bg-white'}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1">Explanation</label>
                          <textarea 
                            value={editingQuestion.explanation}
                            onChange={(e) => setEditingQuestion({...editingQuestion, explanation: e.target.value})}
                            className="w-full text-xs p-2.5 bg-white border border-[#D8D1C3] rounded-xl focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] focus:outline-none text-[#6B645B]"
                            rows={2}
                          />
                        </div>
                        <div className="flex justify-end space-x-3 pt-3 border-t border-[#EFE9DF]">
                          <button 
                            onClick={() => setEditingQuestion(null)}
                            className="flex items-center px-4 py-1.5 border border-[#DDD6C8] text-xs font-bold text-[#554E45] rounded-full hover:bg-[#F2ECE0]"
                          >
                            <X className="w-3.5 h-3.5 mr-1" /> Cancel
                          </button>
                          <button 
                            onClick={handleSaveQuestion}
                            className="flex items-center px-5 py-1.5 bg-[#1C1A18] hover:bg-[#2B2825] text-xs font-bold text-white rounded-full shadow-2xs"
                          >
                            <Save className="w-3.5 h-3.5 mr-1 text-[#D9531E]" /> Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Read-Only View */
                      <>
                        <button 
                          onClick={() => setEditingQuestion(q)}
                          className="absolute top-4 right-4 p-2 text-[#8C8375] hover:text-[#D9531E] hover:bg-[#FDF2EC] rounded-xl opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-[#F7D2C0]"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <h4 className="text-sm font-extrabold text-[#1A1816] pr-10 leading-relaxed mb-4">
                          <span className="text-[#8C8375] mr-2 font-mono">{idx + 1}.</span> 
                          {q.question_text}
                        </h4>
                        <div className="space-y-2 mb-4">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className={`p-3 rounded-xl border text-xs flex items-start ${
                              opt.is_correct ? 'bg-[#EDF7EF] border-[#CCEBD3] text-[#1A1816] font-semibold' : 'bg-white border-[#E6E0D4] text-[#6B645B]'
                            }`}>
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center mr-3 mt-0.5 shrink-0 ${
                                opt.is_correct ? 'border-[#237A3C] bg-[#237A3C]' : 'border-[#D5CEC2]'
                              }`}>
                                {opt.is_correct && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                              <span>{opt.text}</span>
                            </div>
                          ))}
                        </div>
                        <div className="bg-[#F2ECE1] border border-[#E5DFD4] p-3 rounded-xl text-xs text-[#6B645B]">
                          <span className="font-bold text-[#1A1816] block mb-1">Official Explanation:</span>
                          {q.explanation}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
