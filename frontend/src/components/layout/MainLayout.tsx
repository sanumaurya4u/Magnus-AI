import React from 'react';
import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';
import { LogOut, User as UserIcon, BookOpen, LayoutDashboard, Target, Book } from 'lucide-react';

interface SidebarItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

export const MainLayout: React.FC<{ allowedRoles?: string[] }> = ({ allowedRoles }) => {
  const { user, isLoading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

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
        ];
      case 'trainer':
        return [
          { label: 'Overview', path: '/trainer', icon: LayoutDashboard },
        ];
      default: // learner
        return [
          { label: 'Overview', path: '/learner', icon: LayoutDashboard },
          { label: 'Profile', path: '/learner/profile', icon: UserIcon },
          { label: 'Competency', path: '/learner/competency', icon: Target },
          { label: 'Learning Path', path: '/learner/learning-path', icon: BookOpen },
        ];
    }
  };

  const navItems = getSidebarItems();
  const currentItem = navItems.find(item => location.pathname === item.path || location.pathname.startsWith(item.path + '/'));

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F3EB] text-[#1A1816]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#F3EFE6] border-r border-[#E5DFD3] flex flex-col">
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
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive 
                    ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-sm' 
                    : 'text-[#665F55] hover:bg-[#EAE2D5] hover:text-[#1A1816]'
                }`}
              >
                <item.icon className={`w-4 h-4 mr-3 shrink-0 ${isActive ? 'text-[#D9531E]' : 'text-[#8C8375]'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        {/* User Card Footer */}
        <div className="p-4 border-t border-[#E5DFD3] bg-[#EFE9DE]/50">
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-[#E5DFD3] border border-[#DDD5C5] text-[#3D372F] flex items-center justify-center mr-3 shrink-0 font-bold text-xs">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="font-bold text-sm text-[#1A1816] truncate">{user.name}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8E1D2] text-[#554E45] uppercase tracking-wider">
                {user.role}
              </span>
            </div>
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
            <button 
              onClick={handleLogout}
              className="flex items-center px-3.5 py-1.5 rounded-full border border-[#DDD6C8] bg-white/70 hover:bg-[#EAE4D7] text-[#554E45] hover:text-[#1A1816] text-xs font-semibold transition-all shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5 text-[#8C8375]" />
              Sign Out
            </button>
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
