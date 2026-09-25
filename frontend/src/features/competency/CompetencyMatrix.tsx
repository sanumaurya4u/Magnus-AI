import React, { useState } from 'react';
import { DOMAINS, COMPETENCIES, JOB_ROLES, ROLE_REQUIREMENTS, LEVELS } from './mockData';
import { Target, ChevronDown, Info } from 'lucide-react';

export const CompetencyMatrix: React.FC = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(JOB_ROLES[0].id);

  const selectedRole = JOB_ROLES.find((r) => r.id === selectedRoleId);
  
  // Get all requirements for the selected role
  const roleReqs = ROLE_REQUIREMENTS.filter((req) => req.jobRoleId === selectedRoleId);

  const getLevelName = (levelCode: string) => {
    return LEVELS.find(l => l.level === levelCode)?.name || levelCode;
  };

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
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
            Framework &bull; Official Statistical System
          </span>
          <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight">Competency Framework</h1>
          <p className="text-[#6B645B] text-sm mt-1 font-medium">Explore standardized competency profiles and proficiency baselines for Official Statistics cadres.</p>
        </div>
        
        <div className="w-full md:w-80">
          <label className="block text-[11px] font-bold text-[#8C8375] mb-2 uppercase tracking-widest">Select Target Cadre Role</label>
          <div className="relative">
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-[#D8D1C3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] shadow-2xs appearance-none font-bold text-sm text-[#1A1816]"
            >
              {JOB_ROLES.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#8C8375] absolute right-4 top-3.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {selectedRole && (
        <div className="bg-[#FDF2EC] border border-[#F7D2C0] p-5 rounded-2xl flex items-start shadow-2xs">
          <Info className="w-5 h-5 text-[#D9531E] mr-3.5 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-extrabold text-sm text-[#1A1816]">{selectedRole.name} ({selectedRole.code})</h3>
            <p className="text-xs text-[#6B645B] mt-1 leading-relaxed">{selectedRole.description}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {DOMAINS.map((domain) => {
          // Find all competencies for this domain that are required for the selected role
          const domainCompetencies = COMPETENCIES.filter(c => c.domainId === domain.id);
          const requiredInDomain = domainCompetencies.map(comp => {
            const req = roleReqs.find(r => r.competencyId === comp.id);
            return req ? { ...comp, requiredLevel: req.requiredLevel } : null;
          }).filter(Boolean) as (typeof COMPETENCIES[0] & { requiredLevel: string })[];

          if (requiredInDomain.length === 0) return null;

          return (
            <div key={domain.id} className="bg-white border border-[#E6E0D4] rounded-2xl shadow-[0_2px_8px_rgba(28,26,24,0.03)] overflow-hidden flex flex-col">
              <div className="bg-[#FAF8F5] border-b border-[#EFE9DF] px-5 py-3.5 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-extrabold text-[#1A1816]">{domain.name}</h2>
                  <p className="text-[11px] text-[#8C8375] mt-0.5">{domain.description}</p>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
                </div>
              </div>
              <div className="p-4 flex-1 space-y-2.5">
                {requiredInDomain.map((comp) => (
                  <div key={comp.id} className="flex items-center justify-between p-3 border border-[#EFE9DF] bg-[#FAF8F5]/50 rounded-xl hover:border-[#D5CEC2] hover:bg-white transition-all">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 text-[#8C8375] mr-3 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#1A1816]">{comp.name}</p>
                        <p className="text-[10px] text-[#8C8375] font-mono">{comp.code}</p>
                      </div>
                    </div>
                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${getLevelColor(comp.requiredLevel)}`}>
                      {comp.requiredLevel} &bull; {getLevelName(comp.requiredLevel)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {roleReqs.length === 0 && (
        <div className="text-center py-12 bg-white border border-[#E6E0D4] rounded-2xl shadow-sm">
          <Target className="w-12 h-12 text-[#D5CEC2] mx-auto mb-3" />
          <p className="text-[#8C8375] font-medium text-sm">No competencies defined for this role yet.</p>
        </div>
      )}
    </div>
  );
};
