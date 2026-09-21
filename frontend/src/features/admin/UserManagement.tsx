import React, { useState } from 'react';
import { Search, Filter, Shield, User, GraduationCap, Settings, Check } from 'lucide-react';

type UserRole = 'learner' | 'trainer' | 'admin';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  department: string;
  role: UserRole;
  lastActive: string;
}

const MOCK_USERS: SystemUser[] = [
  { id: 'u1', name: 'Ananya Sharma', email: 'ananya.s@mospi.gov.in', department: 'Labour Statistics', role: 'learner', lastActive: '2 hrs ago' },
  { id: 'u2', name: 'Dr. Rahul Verma', email: 'r.verma@nssta.gov.in', department: 'Methodology', role: 'trainer', lastActive: '1 day ago' },
  { id: 'u3', name: 'Priya Patel', email: 'p.patel@mospi.gov.in', department: 'National Accounts', role: 'learner', lastActive: '5 mins ago' },
  { id: 'u4', name: 'Vikram Singh', email: 'v.singh@mospi.gov.in', department: 'IT / Operations', role: 'admin', lastActive: 'Just now' },
  { id: 'u5', name: 'Neha Gupta', email: 'n.gupta@mospi.gov.in', department: 'Price Statistics', role: 'learner', lastActive: '3 days ago' },
];

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setEditingUserId(null); // Close edit mode after selection
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Shield className="w-3.5 h-3.5 text-white" />;
      case 'trainer': return <GraduationCap className="w-3.5 h-3.5 text-[#D9531E]" />;
      case 'learner': return <User className="w-3.5 h-3.5 text-[#237A3C]" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-[#1C1A18] text-white border-[#1C1A18]';
      case 'trainer': return 'bg-[#FAF0E6] text-[#D9531E] border-[#F3C4B2]';
      case 'learner': return 'bg-[#EAF3EC] text-[#237A3C] border-[#BCE1C7]';
    }
  };

  return (
    <div className="bg-[#FBF8F2] border border-[#E6E0D4] rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-[#E6E0D4] bg-[#FAF8F5]">
        <div className="flex items-center space-x-1.5 pb-2 mb-3 border-b border-[#EFE9DF]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
          <span className="text-[10px] font-mono tracking-widest text-[#8C8375] uppercase ml-2">Access Control // Directory</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-[#1C1A18] tracking-tight">User Role Management</h2>
            <p className="text-sm text-[#736B5E] mt-1">Assign and calibrate access levels for learners, trainers, and administrators across departments.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8375]" />
              <input 
                type="text" 
                placeholder="Search by name, email, dept..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-[#E6E0D4] rounded-full text-xs font-mono text-[#1C1A18] focus:outline-none focus:border-[#D9531E] focus:ring-1 focus:ring-[#D9531E] w-full md:w-64 placeholder:text-[#A8A095] transition-all"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-white border border-[#E6E0D4] rounded-full text-xs font-bold text-[#3D372E] hover:bg-[#EFE9DF] hover:border-[#D9531E] transition-all cursor-pointer">
              <Filter className="w-3.5 h-3.5 mr-2 text-[#8C8375]" /> Filter
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5EFE6] border-b border-[#E6E0D4] text-[10px] font-mono font-bold text-[#736B5E] uppercase tracking-wider">
              <th className="p-4">User</th>
              <th className="p-4 hidden md:table-cell">Department</th>
              <th className="p-4">System Role</th>
              <th className="p-4 hidden sm:table-cell">Last Active</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFE9DF]">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-[#FAF8F5] transition-colors">
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-[#EFE9DF] border border-[#E6E0D4] text-[#1C1A18] flex items-center justify-center font-bold text-xs mr-3 shrink-0 font-mono">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1C1A18] leading-tight">{user.name}</p>
                      <p className="text-xs font-mono text-[#8C8375] mt-0.5">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell text-xs font-medium text-[#595247]">
                  {user.department}
                </td>
                <td className="p-4">
                  {editingUserId === user.id ? (
                    <select 
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      className="text-xs font-mono font-bold p-1.5 border border-[#D9531E] rounded-lg bg-white text-[#1C1A18] focus:outline-none focus:ring-1 focus:ring-[#D9531E]"
                      autoFocus
                      onBlur={() => setEditingUserId(null)}
                    >
                      <option value="learner">Learner</option>
                      <option value="trainer">Trainer</option>
                      <option value="admin">Administrator</option>
                    </select>
                  ) : (
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-bold border ${getRoleBadgeColor(user.role)}`}>
                      <span className="mr-1.5">{getRoleIcon(user.role)}</span>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  )}
                </td>
                <td className="p-4 hidden sm:table-cell text-xs font-mono text-[#8C8375]">
                  {user.lastActive}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setEditingUserId(editingUserId === user.id ? null : user.id)}
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      editingUserId === user.id 
                        ? 'bg-[#1C1A18] text-white hover:bg-black border border-[#1C1A18]' 
                        : 'bg-white border border-[#E6E0D4] text-[#3D372E] hover:border-[#D9531E] hover:bg-[#FAF0E6] hover:text-[#D9531E]'
                    }`}
                  >
                    {editingUserId === user.id ? (
                      <span className="flex items-center"><Check className="w-3.5 h-3.5 mr-1 text-[#237A3C]" /> Done</span>
                    ) : (
                      <span className="flex items-center"><Settings className="w-3.5 h-3.5 mr-1.5 text-[#8C8375]" /> Change Role</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center font-mono text-xs text-[#8C8375]">
                  No users found matching "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
