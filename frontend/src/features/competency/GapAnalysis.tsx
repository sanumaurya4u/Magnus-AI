import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { AlertCircle, TrendingUp } from 'lucide-react';

interface GapData {
  subject: string;
  required: number;
  current: number;
  gap: number;
  fullMark: number;
}

interface Props {
  roleName: string;
}

export const GapAnalysis: React.FC<Props> = ({ roleName }) => {
  // Hardcoded mock data combining Phase 3 and Phase 4 logic 
  // (In production, this is joined via Supabase user_competencies & role_competencies)
  const data: GapData[] = [
    { subject: 'Survey Design', required: 2, current: 2, gap: 0, fullMark: 5 },
    { subject: 'Sampling', required: 3, current: 2, gap: 1, fullMark: 5 },
    { subject: 'Python', required: 2, current: 1, gap: 1, fullMark: 5 },
    { subject: 'SQL', required: 3, current: 2, gap: 1, fullMark: 5 },
    { subject: 'Data Viz', required: 2, current: 3, gap: 0, fullMark: 5 },
    { subject: 'Communication', required: 3, current: 4, gap: 0, fullMark: 5 },
  ];

  // Calculate gaps
  const gaps = data.filter(d => d.required > d.current).sort((a, b) => b.gap - a.gap);

  return (
    <div className="bg-white border border-[#E6E0D4] rounded-2xl shadow-[0_2px_8px_rgba(28,26,24,0.03)] overflow-hidden">
      {/* Editorial Window Bar */}
      <div className="bg-[#FAF8F5] border-b border-[#EFE9DF] px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          </div>
          <span className="text-[10px] font-mono text-[#8C8375] uppercase tracking-wider">
            diagnostic &bull; competency gap radar
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#8C8375] font-medium">Role Target:</span>
          <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#FDF2EC] text-[#D9531E] border border-[#F7D2C0]">
            {roleName}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Radar Chart Section */}
        <div className="h-80 w-full bg-[#FDFBF7] rounded-2xl border border-[#EDE7DC] flex items-center justify-center pt-6 pb-2 px-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
              <PolarGrid stroke="#E6E0D4" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A443C', fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#8C8375', fontSize: 10 }} />
              <Radar
                name="Required Level"
                dataKey="required"
                stroke="#D9531E"
                fill="#D9531E"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name="Current Level"
                dataKey="current"
                stroke="#237A3C"
                fill="#237A3C"
                fillOpacity={0.35}
                strokeWidth={2}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #E6E0D4', 
                  boxShadow: '0 4px 12px rgba(28,26,24,0.06)',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Priorities Section */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-[#D9531E]" />
              <h3 className="text-base font-extrabold text-[#1A1816]">
                Priority Growth Areas
              </h3>
            </div>
            <p className="text-xs text-[#6B645B] leading-relaxed">
              Identified <span className="font-bold text-[#D9531E]">{gaps.length} areas</span> where your verified proficiency is below the required baseline for a <span className="font-semibold text-[#1A1816]">{roleName}</span>.
            </p>
          </div>

          <div className="space-y-3">
            {gaps.length > 0 ? gaps.map((gap, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 border border-[#E6E0D4] rounded-2xl bg-[#FDFBF7] hover:border-[#D5CEC2] hover:bg-white transition-all shadow-2xs"
              >
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-xl bg-[#FEF8EC] border border-[#FBE3B5] flex items-center justify-center mr-3.5 shrink-0">
                    <AlertCircle className="w-5 h-5 text-[#B86B00]" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#1A1816]">{gap.subject}</p>
                    <p className="text-xs text-[#8C8375] mt-0.5 font-medium">
                      Required: <span className="font-bold text-[#1A1816]">L{gap.required}</span> &bull; Current: <span className="font-bold text-[#1A1816]">L{gap.current}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-[#FEF8EC] text-[#B86B00] text-xs font-bold px-3 py-1 rounded-full border border-[#FBE3B5] font-mono">
                  -{gap.gap} Level
                </div>
              </div>
            )) : (
              <div className="p-6 text-center border border-[#CCEBD3] bg-[#EDF7EF] rounded-2xl">
                <p className="text-[#237A3C] font-bold text-sm">You meet or exceed all core requirements for this role!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
