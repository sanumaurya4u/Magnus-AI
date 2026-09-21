import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F3EB] px-4 text-center">
      <div className="w-full max-w-md bg-[#FBF8F2] border border-[#E6E0D4] rounded-3xl p-8 sm:p-10 shadow-sm text-center relative overflow-hidden">
        <div className="flex items-center justify-center space-x-2 pb-4 mb-6 border-b border-[#EFE9DF]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="text-[10px] font-mono tracking-widest text-[#8C8375] uppercase ml-2">404 // NOT_FOUND</span>
        </div>

        <div className="text-6xl sm:text-7xl font-black font-mono text-[#D9531E] tracking-tighter mb-4">
          404
        </div>
        
        <h2 className="text-2xl font-black text-[#1C1A18] tracking-tight mb-2">
          Route Not Registered
        </h2>
        
        <p className="text-sm text-[#736B5E] mb-8 leading-relaxed">
          The requested platform route does not exist in the current competency registry or has been relocated.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1C1A18] hover:bg-black text-white text-sm font-bold transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
