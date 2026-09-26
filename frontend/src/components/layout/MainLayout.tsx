import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { User as UserIcon, BookOpen, LayoutDashboard, Target, Book, Brain, UploadCloud, CheckSquare, Users, Activity, LogOut } from 'lucide-react';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

export const MainLayout: React.FC<{ allowedRoles?: string[] }> = ({ allowedRoles }) => {
  const { user, isLoading, logout } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F7F3EB]">
        <div className="text-[#8C8375] font-medium tracking-wide animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D9531E] animate-ping" />
          Loading platform...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  const getSidebarItems = (): SidebarItem[] => {
    switch (user.role) {
      case 'admin':
      case 'superadmin':
        return [
          { label: 'Overview', path: '/admin', icon: LayoutDashboard },
          { label: 'User Roles', path: '/admin/users', icon: Users },
          { label: 'System Health', path: '/admin/health', icon: Activity },
        ];
      case 'trainer':
        return [
          { label: 'Overview', path: '/trainer', icon: LayoutDashboard },
          { label: 'Upload Materials', path: '/trainer/upload', icon: UploadCloud },
          { label: 'Review Quizzes', path: '/trainer/review', icon: CheckSquare },
          { label: 'Profile', path: '/trainer/profile', icon: UserIcon },
        ];
      default: // learner
        return [
          { label: 'Overview', path: '/learner', icon: LayoutDashboard },
          { label: 'Profile', path: '/learner/profile', icon: UserIcon },
          { label: 'Competency', path: '/learner/competency', icon: Target },
          { label: 'Learning Path', path: '/learner/learning-path', icon: BookOpen },
          { label: 'Practice Quizzes', path: '/learner/quizzes', icon: Brain },
        ];
    }
  };

  const navItems = getSidebarItems();
  const currentItem = navItems.find(item => location.pathname === item.path || (item.path !== '/learner' && item.path !== '/trainer' && item.path !== '/admin' && location.pathname.startsWith(item.path + '/')));

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F3EB] text-[#1A1816]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#F3EFE6] border-r border-[#E5DFD3] flex flex-col shadow-[4px_0_24px_rgba(28,26,24,0.02)] z-10 relative">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-[#E5DFD3]">
          <div className="w-9 h-9 bg-[#D9531E] rounded-xl flex items-center justify-center text-white shadow-sm mr-3 shrink-0">
            <Book className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-[#1A1816] flex items-center gap-1.5">
              Magnus AI
            </div>
            <span className="text-[10px] font-bold tracking-widest text-[#D9531E] uppercase">
              Skill Intelligence
            </span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2">
            <span className="text-[10px] font-bold tracking-widest text-[#8C8375] uppercase">
              Navigation
            </span>
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/learner' && item.path !== '/trainer' && item.path !== '/admin' && location.pathname.startsWith(item.path + '/'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ease-out ${
                  isActive 
                    ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-md shadow-[#1C1A18]/10' 
                    : 'text-[#665F55] hover:bg-[#EAE4D8] hover:text-[#1A1816]'
                }`}
              >
                <item.icon className={`w-4 h-4 mr-3 shrink-0 transition-transform duration-200 ${
                  isActive ? 'text-[#D9531E]' : 'text-[#8C8375] group-hover:text-[#D9531E] group-hover:scale-110'
                }`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        {/* User Card Footer */}
        <div className="p-4 border-t border-[#E5DFD3] bg-[#EFE9DE]/50 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-[#E5DFD3] border border-[#DDD5C5] text-[#3D372F] flex items-center justify-center mr-3 shrink-0 font-bold text-xs">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 truncate pr-2">
                <p className="font-bold text-sm text-[#1A1816] truncate">{user.name}</p>
                <div className="flex items-center mt-0.5">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#E8E1D2] text-[#554E45] uppercase tracking-wider mr-1.5">
                    {user.role}
                  </span>
                  <span className="text-[10px] text-[#665F55] truncate">{user.email}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => logout()}
              className="p-2 rounded-xl text-[#8C8375] hover:bg-[#E5DFD3] hover:text-[#D9531E] transition-colors shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#F7F3EB]">
        {/* Header */}
        <header className="h-16 bg-[#F7F3EB]/90 backdrop-blur-md border-b border-[#E5DFD3] flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase">
              Section &bull;
            </span>
            <span className="text-sm font-bold text-[#1A1816]">
              {currentItem?.label || 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {/* Removed Sign Out button, now placed in profile sections */}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
