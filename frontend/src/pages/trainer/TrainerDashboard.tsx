import React, { useState } from 'react';
import { INITIAL_UPLOADS, INITIAL_QUIZZES } from '../../features/trainer/mockData';
import { FileCheck, Layers, Clock, Settings, UploadCloud, ListChecks, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TrainerDashboard: React.FC = () => {
  const [uploads] = useState<any[]>(INITIAL_UPLOADS);
  const [quizzes] = useState<any[]>(INITIAL_QUIZZES);

  const pendingProcessingCount = uploads.filter(u => u.status === 'Processing' || u.status === 'Ingesting...').length;
  const pendingCount = quizzes.filter(q => q.status === 'pending').length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div>
        <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
          Trainer Workbench &bull; NSSTA & MoSPI
        </span>
        <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight">Trainer Dashboard</h1>
        <p className="text-[#6B645B] text-sm mt-1 font-medium">Overview of training materials and generated assessments.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Materials Uploaded', value: uploads.length.toString(), icon: Layers, color: 'text-[#D9531E]', bg: 'bg-[#FDF2EC]', border: 'border-[#F7D2C0]' },
          { label: 'Assessments Gen.', value: quizzes.reduce((acc, q) => acc + q.questions.length, 0).toString(), icon: FileCheck, color: 'text-[#237A3C]', bg: 'bg-[#EDF7EF]', border: 'border-[#CCEBD3]' },
          { label: 'Pending Processing', value: pendingProcessingCount.toString(), icon: Clock, color: 'text-[#B86B00]', bg: 'bg-[#FEF8EC]', border: 'border-[#FBE3B5]' },
          { label: 'Model Accuracy', value: '94%', icon: Settings, color: 'text-[#1A1816]', bg: 'bg-[#F2ECE1]', border: 'border-[#DDD6C8]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-[#E6E0D4] shadow-[0_2px_8px_rgba(28,26,24,0.03)] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#8C8375] uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-extrabold text-[#1A1816] mt-0.5 font-mono-code">{stat.value}</p>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${stat.bg} ${stat.border}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Quick Link */}
        <Link to="/trainer/upload" className="group bg-white rounded-2xl border border-[#E6E0D4] shadow-[0_4px_24px_rgba(28,26,24,0.02)] p-8 hover:shadow-md hover:border-[#D8D1C3] transition-all relative overflow-hidden block">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <UploadCloud className="w-32 h-32 text-[#D9531E]" />
          </div>
          <div className="w-14 h-14 bg-[#FDF2EC] border border-[#F7D2C0] rounded-2xl flex items-center justify-center mb-6 relative z-10">
            <UploadCloud className="w-7 h-7 text-[#D9531E]" />
          </div>
          <h2 className="text-xl font-extrabold text-[#1A1816] mb-2 relative z-10">Upload Materials</h2>
          <p className="text-[#6B645B] text-sm mb-6 relative z-10 max-w-sm">
            Upload new syllabus documents or training PDFs to generate verifiable mock tests via AI.
          </p>
          <div className="flex items-center text-[#D9531E] font-bold text-sm relative z-10 group-hover:translate-x-1 transition-transform">
            Go to Upload Pipeline <ArrowRight className="w-4 h-4 ml-1.5" />
          </div>
        </Link>

        {/* Review Quick Link */}
        <Link to="/trainer/review" className="group bg-white rounded-2xl border border-[#E6E0D4] shadow-[0_4px_24px_rgba(28,26,24,0.02)] p-8 hover:shadow-md hover:border-[#D8D1C3] transition-all relative overflow-hidden block">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <ListChecks className="w-32 h-32 text-[#D9531E]" />
          </div>
          <div className="w-14 h-14 bg-[#F2ECE1] border border-[#DDD6C8] rounded-2xl flex items-center justify-center mb-6 relative z-10">
            <ListChecks className="w-7 h-7 text-[#1A1816]" />
            {pendingCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-[#D9531E] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full shadow-sm">
                {pendingCount}
              </div>
            )}
          </div>
          <h2 className="text-xl font-extrabold text-[#1A1816] mb-2 relative z-10">Review Quizzes</h2>
          <p className="text-[#6B645B] text-sm mb-6 relative z-10 max-w-sm">
            Review, edit, and approve newly generated quizzes before they are pushed to learners.
          </p>
          <div className="flex items-center text-[#1A1816] font-bold text-sm relative z-10 group-hover:translate-x-1 transition-transform">
            Go to Review Queue <ArrowRight className="w-4 h-4 ml-1.5" />
          </div>
        </Link>
      </div>
    </div>
  );
};
