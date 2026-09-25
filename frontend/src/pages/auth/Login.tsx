import React, { useState, useEffect } from 'react';
import { useAuth, type Role } from '../../app/providers/AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { Book, AlertCircle, Loader2 } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // For SIH Demo purposes, allow selecting a mock role
  const [demoRole, setDemoRole] = useState<Role>('learner');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname;
      if (from && from !== '/login' && from !== '/unauthorized') {
        navigate(from, { replace: true });
      } else {
        const dest = user.role === 'trainer' ? '/trainer'
          : user.role === 'admin' || user.role === 'superadmin' ? '/admin'
          : '/learner';
        navigate(dest, { replace: true });
      }
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password, demoRole);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-[#D9531E] rounded-2xl flex items-center justify-center mb-4 text-white shadow-sm">
          <Book className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold tracking-widest text-[#D9531E] uppercase mb-1">
          Official Statistics Portal
        </span>
        <h1 className="text-2xl font-extrabold text-[#1A1816] tracking-tight">
          Sign in to <span className="text-[#D9531E]">Magnus AI</span>
        </h1>
        <p className="text-[#6B645B] text-sm mt-1 text-center font-medium">
          AI-Powered Skill Intelligence &amp; Learning
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-[#FDF0ED] text-[#C93B2B] text-sm rounded-xl border border-[#F8D0C9] flex items-center font-medium">
          <AlertCircle className="w-4 h-4 mr-2.5 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input 
            type="email" 
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] placeholder-[#A8A195] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
            placeholder="official@mospi.gov.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">
            Password
          </label>
          <input 
            type="password" 
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] placeholder-[#A8A195] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="pt-2 pb-2 bg-[#FAF8F5] rounded-2xl border border-[#EFE9DF] p-4">
          <label className="block text-[11px] font-bold text-[#8C8375] uppercase tracking-widest mb-1.5">
            Demo Role Selection
          </label>
          <select 
            className="w-full px-3.5 py-2.5 text-sm font-medium border border-[#D8D1C3] rounded-xl bg-white text-[#1A1816] focus:outline-none focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E]"
            value={demoRole}
            onChange={(e) => setDemoRole(e.target.value as Role)}
          >
            <option value="learner">Learner (Ananya Sharma • MoSPI)</option>
            <option value="trainer">Trainer (Dr. Rahul Verma • NSSTA)</option>
            <option value="admin">Administrator (Vikram Singh • MoSPI)</option>
          </select>
          <p className="text-[11px] text-[#8C8375] mt-1.5 font-medium">
            Select a prototype persona to demo role-tailored dashboards.
          </p>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#1C1A18] hover:bg-[#2B2825] text-[#F7F3EB] font-bold py-3 px-4 rounded-full transition-all flex justify-center items-center shadow-sm hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#D9531E]" />
              Signing in...
            </span>
          ) : (
            'Continue to Platform →'
          )}
        </button>
      </form>
    </div>
  );
};
