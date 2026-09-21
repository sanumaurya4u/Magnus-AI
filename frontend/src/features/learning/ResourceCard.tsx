import React from 'react';
import type { LearningResource, Recommendation } from './types';
import { PlayCircle, FileText, Users, MonitorPlay, Clock, ShieldCheck, Bookmark } from 'lucide-react';

interface Props {
  resource: LearningResource;
  recommendation?: Recommendation;
}

export const ResourceCard: React.FC<Props> = ({ resource, recommendation }) => {
  const getSourceIcon = () => {
    switch(resource.sourceSystem) {
      case 'iGOT': return <MonitorPlay className="w-5 h-5" />;
      case 'NSSTA': return <Users className="w-5 h-5" />;
      case 'TPAC': return <ShieldCheck className="w-5 h-5" />;
      default: return <Bookmark className="w-5 h-5" />;
    }
  };

  const getSourceColor = () => {
    switch(resource.sourceSystem) {
      case 'iGOT': return 'bg-[#EDF7EF] text-[#237A3C] border-[#CCEBD3]';
      case 'NSSTA': return 'bg-[#FDF2EC] text-[#D9531E] border-[#F7D2C0]';
      case 'TPAC': return 'bg-[#FEF8EC] text-[#B86B00] border-[#FBE3B5]';
      default: return 'bg-[#FAF8F5] text-[#665F55] border-[#E6E0D4]';
    }
  };

  const getTypeIcon = () => {
    switch(resource.resourceType) {
      case 'Video': return <PlayCircle className="w-3.5 h-3.5 mr-1.5 text-[#8C8375]" />;
      case 'Document': return <FileText className="w-3.5 h-3.5 mr-1.5 text-[#8C8375]" />;
      case 'Course': return <MonitorPlay className="w-3.5 h-3.5 mr-1.5 text-[#8C8375]" />;
      case 'Workshop': return <Users className="w-3.5 h-3.5 mr-1.5 text-[#8C8375]" />;
    }
  };

  const formatDuration = (mins: number) => {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  return (
    <div className="bg-white border border-[#E6E0D4] rounded-2xl shadow-[0_2px_8px_rgba(28,26,24,0.03)] hover:border-[#D5CEC2] hover:shadow-[0_4px_16px_rgba(28,26,24,0.06)] transition-all flex flex-col h-full overflow-hidden">
      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3.5">
          <div className={`px-2.5 py-1 rounded-full border font-bold text-xs flex items-center ${getSourceColor()}`}>
            <span className="mr-1.5">{getSourceIcon()}</span>
            {resource.sourceSystem}
          </div>
          <span className="bg-[#FAF8F5] text-[#1A1816] border border-[#E6E0D4] px-2.5 py-0.5 rounded-full text-xs font-bold font-mono">
            {resource.difficulty}
          </span>
        </div>

        <h3 className="text-base font-extrabold text-[#1A1816] leading-snug mb-2 line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-xs text-[#6B645B] line-clamp-3 mb-4 flex-1 leading-relaxed">
          {resource.description}
        </p>
        
        {recommendation && (
          <div className="bg-[#FDF2EC] border border-[#F7D2C0] p-3.5 rounded-xl mb-4 mt-auto">
            <div className="text-[11px] font-bold text-[#1A1816] mb-1 flex justify-between items-center">
              <span className="uppercase tracking-wider text-[10px] text-[#D9531E]">Why Recommended:</span>
              <span className="text-[#D9531E] font-mono font-extrabold">{recommendation.matchScore}% Match</span>
            </div>
            <p className="text-xs text-[#6B645B] leading-relaxed">{recommendation.reason}</p>
          </div>
        )}
      </div>

      {/* Metadata Row */}
      <div className="border-t border-[#EFE9DF] bg-[#FAF8F5] px-5 py-3 flex justify-between items-center text-xs font-semibold text-[#8C8375]">
        <div className="flex items-center">
          {getTypeIcon()}
          {resource.resourceType}
        </div>
        <div className="flex items-center font-mono">
          <Clock className="w-3.5 h-3.5 mr-1.5 text-[#8C8375]" />
          {formatDuration(resource.durationMinutes)}
        </div>
      </div>
      
      {/* Action button */}
      <div className="px-5 pb-5 pt-2 bg-[#FAF8F5]">
        <button className="w-full bg-[#1C1A18] hover:bg-[#2B2825] text-[#F7F3EB] font-bold text-xs py-2.5 rounded-full transition-all shadow-2xs hover:-translate-y-0.5 active:translate-y-0">
          Start Learning →
        </button>
      </div>
    </div>
  );
};
