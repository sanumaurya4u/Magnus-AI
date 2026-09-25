import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { DOMAINS, COMPETENCIES } from '../competency/mockData';
import { uploadDocument, generateQuestions } from '../../lib/api';
import type { PendingQuiz } from './ReviewQuizzes';

interface Props {
  onUploadComplete: (data: any, generatedQuiz?: PendingQuiz) => void;
}

export const UploadMaterial: React.FC<Props> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    domainId: '',
    competencyId: '',
    difficulty: 'L1'
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setNotification(null);

    const compName = COMPETENCIES.find(c => c.id === formData.competencyId)?.name || 'General Statistics';
    const uploadId = Math.random().toString(36).substr(2, 9);
    const fileTitle = formData.title || file.name;

    try {
      // 1. Upload & Vectorize Document via FastAPI backend
      const uploadRes = await uploadDocument(file);
      
      // 2. Generate Real MCQs using Gemini LLM via FastAPI backend
      const qRes = await generateQuestions({
        competency_name: compName,
        difficulty_level: formData.difficulty,
        document_name: file.name,
        num_questions: 3
      });

      const newQuiz: PendingQuiz = {
        id: `quiz-${uploadId}`,
        sourceMaterial: file.name,
        competencyName: compName,
        difficultyLevel: formData.difficulty,
        status: 'pending',
        questions: (qRes.questions || []).map((q, idx) => ({
          id: `q-${uploadId}-${idx}`,
          question_text: q.question_text,
          options: q.options,
          explanation: q.explanation,
          difficulty: q.difficulty || formData.difficulty,
          competency: q.competency || compName
        }))
      };

      onUploadComplete({
        id: uploadId,
        title: fileTitle,
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        competencyId: formData.competencyId,
        difficulty: formData.difficulty,
        status: `RAG Active (${uploadRes.total_chunks} chunks)`,
        uploadedAt: new Date().toISOString()
      }, newQuiz);

      setNotification({
        type: 'success',
        message: `Success! Processed ${uploadRes.total_chunks} chunks and generated ${newQuiz.questions.length} AI MCQs.`
      });
    } catch (err) {
      console.warn('Backend API request failed — using offline demo fallback:', err);
      
      const fallbackQuiz: PendingQuiz = {
        id: `quiz-${uploadId}`,
        sourceMaterial: file.name,
        competencyName: compName,
        difficultyLevel: formData.difficulty,
        status: 'pending',
        questions: [
          {
            id: `q-${uploadId}-1`,
            question_text: `What core principle is essential for assessing ${compName} at the ${formData.difficulty} level?`,
            options: [
              { text: 'Standardization and data integrity verification', is_correct: true },
              { text: 'Unverified manual aggregation of records', is_correct: false },
              { text: 'Ignoring non-sampling systematic errors', is_correct: false },
              { text: 'Arbitrary estimation without metadata tracking', is_correct: false }
            ],
            explanation: `At level ${formData.difficulty}, rigorous verification of data integrity and standardized procedures are required.`,
            difficulty: formData.difficulty,
            competency: compName
          }
        ]
      };

      onUploadComplete({
        id: uploadId,
        title: fileTitle,
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        competencyId: formData.competencyId,
        difficulty: formData.difficulty,
        status: 'Processed (Demo)',
        uploadedAt: new Date().toISOString()
      }, fallbackQuiz);

      setNotification({
        type: 'info',
        message: 'Material processed. (Live Gemini RAG available when backend is connected).'
      });
    } finally {
      setIsUploading(false);
      setFile(null);
      setFormData({ title: '', domainId: '', competencyId: '', difficulty: 'L1' });
    }
  };

  const filteredCompetencies = formData.domainId 
    ? COMPETENCIES.filter(c => c.domainId === formData.domainId)
    : [];

  return (
    <div className="bg-white border border-[#E6E0D4] rounded-2xl shadow-[0_2px_8px_rgba(28,26,24,0.03)] overflow-hidden">
      <div className="bg-[#FAF8F5] border-b border-[#EFE9DF] px-6 py-3.5">
        <div className="flex items-center space-x-1.5 mb-1.5">
          <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
          <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
          <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
          <span className="text-[10px] font-mono text-[#8C8375] uppercase tracking-wider ml-auto">
            pipeline &bull; parser
          </span>
        </div>
        <h2 className="text-sm font-extrabold text-[#1A1816]">Upload Learning Material</h2>
        <p className="text-[11px] text-[#6B645B] mt-0.5">Upload syllabus or course PDFs to generate verified MCQs via AI.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {notification && (
          <div className={`p-3 rounded-xl text-xs flex items-center justify-between ${
            notification.type === 'success' 
              ? 'bg-[#EDF7EF] border border-[#CCEBD3] text-[#237A3C]' 
              : 'bg-[#FEF8EC] border border-[#FBE3B5] text-[#B86B00]'
          }`}>
            <div className="flex items-center space-x-2">
              {notification.type === 'success' ? (
                <Sparkles className="w-4 h-4 shrink-0 text-[#237A3C]" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-[#B86B00]" />
              )}
              <span>{notification.message}</span>
            </div>
            <button type="button" onClick={() => setNotification(null)} className="ml-2 text-current opacity-70 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* File Dropzone */}
        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Resource Document</label>
          {!file ? (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging ? 'border-[#D9531E] bg-[#FDF2EC]' : 'border-[#D8D1C3] hover:border-[#D9531E] bg-[#FAF8F5]'
              }`}
            >
              <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${isDragging ? 'text-[#D9531E]' : 'text-[#8C8375]'}`} />
              <p className="text-xs font-bold text-[#1A1816]">Click to upload or drag and drop</p>
              <p className="text-[11px] text-[#8C8375] mt-0.5 font-mono">PDF, PPTX, or DOCX (Max 20MB)</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.ppt,.pptx,.doc,.docx" 
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-3.5 border border-[#F7D2C0] bg-[#FDF2EC] rounded-xl">
              <div className="flex items-center">
                <FileText className="w-6 h-6 text-[#D9531E] mr-3 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#1A1816] truncate max-w-[170px]">{file.name}</p>
                  <p className="text-[10px] text-[#8C8375] font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setFile(null)}
                className="p-1 text-[#8C8375] hover:text-[#1A1816] rounded-full hover:bg-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Metadata Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Resource Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Introduction to Survey Sampling"
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-xs text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Competency Domain</label>
            <select 
              value={formData.domainId}
              onChange={e => setFormData({...formData, domainId: e.target.value, competencyId: ''})}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-xs text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E]"
              required
            >
              <option value="">Select Domain...</option>
              {DOMAINS.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Target Competency</label>
            <select 
              value={formData.competencyId}
              onChange={e => setFormData({...formData, competencyId: e.target.value})}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-xs text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] disabled:opacity-40"
              required
              disabled={!formData.domainId}
            >
              <option value="">Select Competency...</option>
              {filteredCompetencies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Target Difficulty Level</label>
            <select 
              value={formData.difficulty}
              onChange={e => setFormData({...formData, difficulty: e.target.value})}
              className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-xs text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E]"
            >
              <option value="L1">L1 &bull; Awareness</option>
              <option value="L2">L2 &bull; Basic</option>
              <option value="L3">L3 &bull; Working</option>
              <option value="L4">L4 &bull; Advanced</option>
              <option value="L5">L5 &bull; Expert</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-[#EFE9DF] flex justify-end">
          <button 
            type="submit"
            disabled={!file || isUploading}
            className="w-full flex justify-center items-center px-6 py-2.5 bg-[#D9531E] hover:bg-[#C24513] text-white font-bold text-xs rounded-full disabled:opacity-40 transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Ingesting & Generating MCQs...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Parse & Generate Quizzes →
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
