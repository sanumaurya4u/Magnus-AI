import React, { useState } from 'react';
import { UploadMaterial } from '../../features/trainer/UploadMaterial';
import { ReviewQuizzes } from '../../features/trainer/ReviewQuizzes';
import { FileText, Clock, Settings, FileCheck, Layers, UploadCloud, ListChecks } from 'lucide-react';
import { COMPETENCIES } from '../../features/competency/mockData';

export const TrainerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'review'>('upload');
  
  const [uploads, setUploads] = useState<any[]>([
    {
      id: 'mock1',
      title: 'Intro to Python for Statistics',
      fileName: 'python_stats_v1.pdf',
      fileSize: '4.2 MB',
      competencyId: 'c6',
      difficulty: 'L2',
      status: 'Processed',
      uploadedAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  const handleUploadComplete = (newUpload: any) => {
    setUploads(prev => [newUpload, ...prev]);
  };

  const getCompetencyName = (id: string) => {
    return COMPETENCIES.find(c => c.id === id)?.name || id;
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
            Trainer Workbench &bull; NSSTA & MoSPI
          </span>
          <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight">Trainer Dashboard</h1>
          <p className="text-[#6B645B] text-sm mt-1 font-medium">Upload training course materials to automatically generate and verify competency assessments.</p>
        </div>

        {/* Segmented Pill Tabs */}
        <div className="inline-flex p-1 bg-[#EFE9DF] rounded-full border border-[#E5DFD4] shrink-0">
          <button 
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center ${
              activeTab === 'upload' 
                ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-2xs' 
                : 'text-[#665F55] hover:text-[#1A1816]'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 mr-1.5" />
            Upload Pipeline
          </button>
          <button 
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center ${
              activeTab === 'review' 
                ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-2xs' 
                : 'text-[#665F55] hover:text-[#1A1816]'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5 mr-1.5" />
            Review AI Quizzes
            <span className="ml-1.5 bg-[#D9531E] text-white py-0.2 px-1.5 rounded-full text-[10px] font-mono font-bold">1</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Materials Uploaded', value: uploads.length.toString(), icon: Layers, color: 'text-[#D9531E]', bg: 'bg-[#FDF2EC]', border: 'border-[#F7D2C0]' },
          { label: 'Assessments Gen.', value: (uploads.length * 4).toString(), icon: FileCheck, color: 'text-[#237A3C]', bg: 'bg-[#EDF7EF]', border: 'border-[#CCEBD3]' },
          { label: 'Pending Processing', value: '0', icon: Clock, color: 'text-[#B86B00]', bg: 'bg-[#FEF8EC]', border: 'border-[#FBE3B5]' },
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

      {activeTab === 'upload' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UploadMaterial onUploadComplete={handleUploadComplete} />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E6E0D4] rounded-2xl shadow-[0_2px_8px_rgba(28,26,24,0.03)] overflow-hidden h-full flex flex-col">
              <div className="bg-[#FAF8F5] border-b border-[#EFE9DF] px-6 py-3.5 flex justify-between items-center">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
                  <h2 className="text-xs font-bold text-[#1A1816] uppercase tracking-wider ml-2">Upload History & Processing Status</h2>
                </div>
              </div>
              
              <div className="p-0 overflow-y-auto max-h-[600px]">
                {uploads.length === 0 ? (
                  <div className="p-8 text-center text-[#8C8375]">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-[#D5CEC2]" />
                    No materials uploaded yet.
                  </div>
                ) : (
                  <ul className="divide-y divide-[#EFE9DF]">
                    {uploads.map(upload => (
                      <li key={upload.id} className="p-6 hover:bg-[#FAF8F5] transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            <div className="bg-[#FDF2EC] border border-[#F7D2C0] p-3 rounded-xl mr-4 shrink-0">
                              <FileText className="w-6 h-6 text-[#D9531E]" />
                            </div>
                            <div>
                              <h3 className="text-sm font-extrabold text-[#1A1816]">{upload.title}</h3>
                              <p className="text-xs text-[#8C8375] mt-0.5 font-mono">{upload.fileName} &bull; {upload.fileSize}</p>
                              
                              <div className="flex items-center space-x-2 mt-3">
                                <span className="inline-flex items-center text-[11px] font-bold text-[#4A443C] bg-[#FAF8F5] border border-[#E6E0D4] px-2.5 py-0.5 rounded-full">
                                  {getCompetencyName(upload.competencyId)}
                                </span>
                                <span className="inline-flex items-center text-[11px] font-mono font-bold text-[#D9531E] bg-[#FDF2EC] border border-[#F7D2C0] px-2 py-0.5 rounded-full">
                                  {upload.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EDF7EF] text-[#237A3C] border border-[#CCEBD3]">
                              {upload.status}
                            </span>
                            <p className="text-[11px] text-[#8C8375] mt-2 font-mono">{formatDate(upload.uploadedAt)}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ReviewQuizzes />
        </div>
      )}
    </div>
  );
};
