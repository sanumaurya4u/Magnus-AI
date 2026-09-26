import React from 'react';
import { useAuth } from '../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail, Shield, Building2 } from 'lucide-react';

export const TrainerProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
          Settings &bull; Authentication
        </span>
        <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight">
          Trainer Profile
        </h1>
        <p className="text-[#6B645B] text-sm mt-1 font-medium">
          Manage your account settings, view your details, and securely sign out.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E6E0D4] shadow-[0_4px_24px_rgba(28,26,24,0.04)] overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-[#F2ECE1] to-[#EAE4D7] border-b border-[#E5DFD3] relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden text-[#D9531E]">
              <div className="w-full h-full bg-[#FEF8EC] flex items-center justify-center text-3xl font-bold uppercase">
                {user?.name.split(' ').map(n => n[0]).join('').slice(0,2) || 'TR'}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14 px-8 pb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1A1816]">{user?.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8E1D2] text-[#554E45] uppercase tracking-wider">
                  {user?.role || 'Trainer'}
                </span>
                <span className="text-sm font-medium text-[#8C8375]">
                  National Statistical Systems Training Academy (NSSTA)
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center px-5 py-2.5 bg-[#C93B2B] hover:bg-[#A92A1D] text-white font-bold text-sm rounded-full transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out Securely
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE9DF]">
              <div className="flex items-center gap-3 text-[#6B645B] mb-1">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Email Address</span>
              </div>
              <p className="text-sm font-semibold text-[#1A1816] pl-7">
                {user?.email}
              </p>
            </div>
            
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE9DF]">
              <div className="flex items-center gap-3 text-[#6B645B] mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Access Level</span>
              </div>
              <p className="text-sm font-semibold text-[#1A1816] pl-7">
                Content Authoring & Assessment Review
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE9DF]">
              <div className="flex items-center gap-3 text-[#6B645B] mb-1">
                <User className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Employee ID</span>
              </div>
              <p className="text-sm font-semibold text-[#1A1816] pl-7">
                NSSTA-TR-0042
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EFE9DF]">
              <div className="flex items-center gap-3 text-[#6B645B] mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Department</span>
              </div>
              <p className="text-sm font-semibold text-[#1A1816] pl-7">
                Training & Capacity Building Division
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
