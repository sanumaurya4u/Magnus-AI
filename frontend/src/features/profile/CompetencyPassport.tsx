import React from 'react';
import type { LearnerProfile, CompetencyLevel } from './types';
import { User, Briefcase, Building, GraduationCap, Award, BookOpen } from 'lucide-react';

interface Props {
  profile: LearnerProfile;
  competencies: CompetencyLevel[];
}

export const CompetencyPassport: React.FC<Props> = ({ profile, competencies }) => {
  // Simple calculation for profile completeness
  const fields = Object.values(profile);
  const completedFields = fields.filter(val => val !== '' && val !== 0).length;
  const completeness = Math.round((completedFields / fields.length) * 100);

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'L5': return 'bg-[#1C1A18] text-[#F7F3EB] border border-[#1C1A18]';
      case 'L4': return 'bg-[#FDF2EC] text-[#D9531E] border border-[#F7D2C0]';
      case 'L3': return 'bg-[#EDF7EF] text-[#237A3C] border border-[#CCEBD3]';
      case 'L2': return 'bg-[#FEF8EC] text-[#B86B00] border border-[#FBE3B5]';
      case 'L1': return 'bg-[#F2ECE1] text-[#665F55] border border-[#DDD6C8]';
      default: return 'bg-[#F2ECE1] text-[#8C8375] border border-[#DDD6C8]';
    }
  };

  return (
    <div className="bg-white border border-[#E6E0D4] rounded-3xl shadow-[0_2px_12px_rgba(28,26,24,0.04)] overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#1C1A18] p-6 md:p-8 text-[#F7F3EB]">
        <div className="flex items-center space-x-1.5 mb-6 pb-3 border-b border-[#2E2A25]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3E3831]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#3E3831]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#3E3831]"></div>
          <span className="text-[10px] font-mono text-[#A8A196] ml-auto uppercase tracking-wider">
            passport &bull; {profile.employeeCode || 'MOSPI-RECORD'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#2B2723] rounded-2xl flex items-center justify-center border border-[#3E3832] text-white">
              <User className="w-8 h-8 text-[#E5DFD4]" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#F7F3EB]">
                {profile.fullName || 'Complete Your Profile'}
              </h2>
              <p className="text-[#D9531E] font-bold text-xs uppercase tracking-wider mt-0.5">
                {profile.designation || 'No Designation Set'}
              </p>
            </div>
          </div>

          <div className="mt-2 md:mt-0 text-left md:text-right">
            <p className="text-[10px] font-mono text-[#A8A196] uppercase tracking-wider mb-1">
              Profile Completeness
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-32 h-2 bg-[#2E2A25] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#D9531E] transition-all duration-500 rounded-full" 
                  style={{ width: `${completeness}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-white font-mono">{completeness}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Role & Info */}
        <div className="space-y-6 lg:col-span-1">
          <div>
            <h3 className="text-[11px] font-bold text-[#8C8375] uppercase tracking-widest mb-3">
              Official Position
            </h3>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-[#FAF8F5] border border-[#EFE9DF] rounded-xl">
                <Briefcase className="w-4 h-4 text-[#8C8375] mr-3 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#1A1816]">Job Role</p>
                  <p className="text-xs text-[#6B645B] mt-0.5">{profile.jobRole || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-[#FAF8F5] border border-[#EFE9DF] rounded-xl">
                <Building className="w-4 h-4 text-[#8C8375] mr-3 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#1A1816]">Department / Division</p>
                  <p className="text-xs text-[#6B645B] mt-0.5">{profile.department || 'Not specified'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-[11px] font-bold text-[#8C8375] uppercase tracking-widest mb-3">
              Academic & Experience
            </h3>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-[#FAF8F5] border border-[#EFE9DF] rounded-xl">
                <GraduationCap className="w-4 h-4 text-[#8C8375] mr-3 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#1A1816]">Education</p>
                  <p className="text-xs text-[#6B645B] mt-0.5">{profile.educationSummary || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-[#FAF8F5] border border-[#EFE9DF] rounded-xl">
                <Award className="w-4 h-4 text-[#8C8375] mr-3 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#1A1816]">Experience</p>
                  <p className="text-xs text-[#6B645B] mt-0.5">{profile.yearsOfExperience} Years Official Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle & Right Column: Competencies & Training */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-bold text-[#8C8375] uppercase tracking-widest">
                Verified Competency Summary
              </h3>
              <span className="text-[10px] font-mono text-[#8C8375]">{competencies.length} Evaluated</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {competencies.map((comp) => (
                <div key={comp.id} className="flex items-center justify-between p-3.5 rounded-xl border border-[#E6E0D4] bg-[#FAF8F5] hover:border-[#D5CEC2] transition-colors">
                  <div>
                    <p className="text-xs font-extrabold text-[#1A1816]">{comp.name}</p>
                    <p className="text-[11px] text-[#8C8375]">{comp.domain}</p>
                  </div>
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${getLevelColor(comp.level)}`}>
                    {comp.level} &bull; {comp.levelName}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-[11px] font-bold text-[#8C8375] uppercase tracking-widest mb-3">
              Official Training & Certifications
            </h3>
            <div className="space-y-3">
              {profile.previousTraining && (
                <div className="flex items-start p-3.5 rounded-xl border border-[#E6E0D4] bg-[#FAF8F5]">
                  <BookOpen className="w-4 h-4 text-[#D9531E] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#1A1816]">Training History</p>
                    <p className="text-xs text-[#6B645B] mt-0.5">{profile.previousTraining}</p>
                  </div>
                </div>
              )}
              {profile.certifications && (
                <div className="flex items-start p-3.5 rounded-xl border border-[#E6E0D4] bg-[#FAF8F5]">
                  <Award className="w-4 h-4 text-[#B86B00] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-[#1A1816]">Certifications</p>
                    <p className="text-xs text-[#6B645B] mt-0.5">{profile.certifications}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
