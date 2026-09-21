import React from 'react';
import { Link } from 'react-router-dom';
import { Target, BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { GapAnalysis } from '../../features/competency/GapAnalysis';

export const LearnerDashboard: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Editorial Welcome Header */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase">
            Official Learner &bull; JSO Track
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDF7EF] text-[#237A3C] border border-[#CCEBD3]">
            &bull; On Track
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1816] tracking-tight">
          Welcome back, <span className="text-[#D9531E]">Ananya</span>.
        </h1>
        <p className="text-[#6B645B] mt-1.5 text-sm font-medium">
          Here is your competency gap analysis and personalized training progression.
        </p>
      </div>
      
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Current Level (Avg)', value: 'L2.8', sub: 'Target: L3.0', icon: Target, color: 'text-[#D9531E]', bg: 'bg-[#FDF2EC]', border: 'border-[#F7D2C0]' },
          { label: 'Learning Hours', value: '42h', sub: '+4h this week', icon: Clock, color: 'text-[#B86B00]', bg: 'bg-[#FEF8EC]', border: 'border-[#FBE3B5]' },
          { label: 'Courses Completed', value: '7', sub: '3 certificates active', icon: BookOpen, color: 'text-[#237A3C]', bg: 'bg-[#EDF7EF]', border: 'border-[#CCEBD3]' },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-2xl border border-[#E6E0D4] shadow-[0_2px_8px_rgba(28,26,24,0.03)] hover:border-[#D5CEC2] transition-all flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#8C8375] uppercase tracking-wider block">
                {stat.label}
              </span>
              <p className="text-3xl font-extrabold text-[#1A1816] tracking-tight font-mono-code">
                {stat.value}
              </p>
              <p className="text-xs text-[#8C8375] font-medium">
                {stat.sub}
              </p>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${stat.bg} ${stat.border}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Competency Gap Analysis */}
      <div>
        <GapAnalysis roleName="Junior Statistical Officer" />
      </div>

      {/* Pending Assessments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D9531E]" />
            <h2 className="text-lg font-extrabold text-[#1A1816]">
              Pending Verification Assessments
            </h2>
          </div>
          <span className="text-xs font-bold text-[#8C8375]">1 Required</span>
        </div>

        <div className="bg-white border border-[#E6E0D4] rounded-2xl shadow-[0_2px_8px_rgba(28,26,24,0.03)] overflow-hidden">
          {/* Card Window Bar */}
          <div className="px-6 py-2.5 bg-[#FAF8F5] border-b border-[#EFE9DF] flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            </div>
            <span className="text-[10px] font-mono text-[#8C8375] uppercase tracking-wider">
              evaluation &bull; official level check
            </span>
          </div>

          <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-[#FAF8F4]/60 transition-colors">
            <div className="mb-4 md:mb-0 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FDF2EC] text-[#D9531E] border border-[#F7D2C0]">
                  High Priority
                </span>
                <span className="text-xs font-mono text-[#8C8375]">
                  ID: a1-python-stats
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#1A1816]">
                Python for Data Analysis — Practical Level Assessment
              </h3>
              <p className="text-sm text-[#6B645B] max-w-xl">
                Evaluate your practical proficiency with pandas, numpy, and descriptive statistics for MoSPI surveys.
              </p>
              <div className="flex items-center space-x-3 pt-1">
                <span className="inline-flex items-center text-xs font-semibold text-[#665F55] bg-[#F2ECE1] px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 mr-1 text-[#8C8375]" />
                  10 Minutes
                </span>
                <span className="inline-flex items-center text-xs font-semibold text-[#665F55] bg-[#F2ECE1] px-3 py-1 rounded-full font-mono">
                  Competency: TECH_PYTHON
                </span>
              </div>
            </div>
            <Link 
              to="/learner/assessment/a1"
              className="flex items-center px-6 py-2.5 bg-[#D9531E] hover:bg-[#C24513] text-white font-bold text-sm rounded-full transition-all shrink-0 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
