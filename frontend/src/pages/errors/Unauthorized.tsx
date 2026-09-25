import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '../../app/providers/AuthProvider';

export const Unauthorized: React.FC = () => {
  const { user } = useAuth();

  // Route back to correct dashboard based on user role
  const dashboardPath = user?.role === 'trainer' ? '/trainer'
    : user?.role === 'admin' || user?.role === 'superadmin' ? '/admin'
    : user ? '/learner'
    : '/login';

  const dashboardLabel = user ? 'Return to Dashboard' : 'Sign In';
  const DashboardIcon = user ? ArrowLeft : LogIn;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F3EB] px-4 text-center">
      <div className="w-full max-w-md bg-[#FBF8F2] border border-[#E6E0D4] rounded-3xl p-8 sm:p-10 shadow-sm text-center relative overflow-hidden">
        <div className="flex items-center justify-center space-x-2 pb-4 mb-6 border-b border-[#EFE9DF]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="text-[10px] font-mono tracking-widest text-[#8C8375] uppercase ml-2">403 // ACCESS_RESTRICTED</span>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#FAF0E6] border border-[#F3C4B2] flex items-center justify-center mx-auto mb-5">
          <ShieldAlert className="w-7 h-7 text-[#D9531E]" />
        </div>

        <h1 className="text-2xl font-black text-[#1C1A18] tracking-tight mb-2">Access Restricted</h1>
        <p className="text-sm text-[#736B5E] mb-8 leading-relaxed">
          Your current cadre or account role lacks required permissions to view this workbench or audit trail.
        </p>

        <Link 
          to={dashboardPath} 
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1C1A18] hover:bg-black text-white text-sm font-bold transition-all shadow-xs cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <DashboardIcon className="w-4 h-4 mr-2" />
          {dashboardLabel}
        </Link>
      </div>
    </div>
  );
};
