import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';

export const AuthLayout: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F7F3EB]">
        <div className="text-xs font-mono text-[#8C8375] tracking-wider uppercase flex items-center">
          <span className="w-2 h-2 rounded-full bg-[#D9531E] animate-ping mr-2.5" />
          Initializing Session...
        </div>
      </div>
    );
  }

  // Redirect to dashboard if already logged in
  if (user) {
    if (user.role === 'admin' || user.role === 'superadmin') {
      return <Navigate to="/admin" replace />;
    }
    if (user.role === 'trainer') {
      return <Navigate to="/trainer" replace />;
    }
    return <Navigate to="/learner" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F3EB] p-4 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_4px_24px_rgba(28,26,24,0.06)] border border-[#E6E0D4] relative">
        <div className="flex items-center space-x-1.5 mb-6 pb-4 border-b border-[#F0EAE1]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]"></div>
          <span className="text-[10px] font-mono text-[#8C8375] ml-auto uppercase tracking-wider">
            auth &bull; secure access
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
