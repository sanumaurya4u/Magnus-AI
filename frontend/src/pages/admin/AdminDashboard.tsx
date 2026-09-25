import React, { useState } from 'react';
import { UserManagement } from '../../features/admin/UserManagement';
import { SystemHealth } from '../../features/admin/SystemHealth';
import { ShieldCheck, Users, Target, Activity, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const MOCK_SKILL_GAPS = [
  { subject: 'Python', required: 4, actual: 2, fullMark: 5 },
  { subject: 'SQL', required: 4, actual: 3, fullMark: 5 },
  { subject: 'Sampling', required: 5, actual: 2, fullMark: 5 },
  { subject: 'Data Viz', required: 3, actual: 3, fullMark: 5 },
  { subject: 'Machine Learning', required: 2, actual: 1, fullMark: 5 },
];

const MOCK_COMPLETION = [
  { name: 'Jan', courses: 400, assessments: 240 },
  { name: 'Feb', courses: 300, assessments: 139 },
  { name: 'Mar', courses: 200, assessments: 980 },
  { name: 'Apr', courses: 278, assessments: 390 },
  { name: 'May', courses: 189, assessments: 480 },
  { name: 'Jun', courses: 239, assessments: 380 },
];

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'health' | 'analytics'>('analytics');

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
            Governance &bull; Capacity Building
          </span>
          <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight flex items-center">
            <ShieldCheck className="w-8 h-8 text-[#D9531E] mr-3" />
            System Administration
          </h1>
          <p className="text-[#6B645B] text-sm mt-1 font-medium">Monitor cadre skill gaps, manage official user roles, and inspect real-time platform system telemetry.</p>
        </div>

        {/* Segmented Pill Tabs */}
        <div className="inline-flex p-1 bg-[#EFE9DF] rounded-full border border-[#E5DFD4] shrink-0">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center ${
              activeTab === 'analytics' 
                ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-2xs' 
                : 'text-[#665F55] hover:text-[#1A1816]'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 mr-1.5" />
            Workforce Analytics
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center ${
              activeTab === 'users' 
                ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-2xs' 
                : 'text-[#665F55] hover:text-[#1A1816]'
            }`}
          >
            <Users className="w-3.5 h-3.5 mr-1.5" />
            User Roles
          </button>
          <button 
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center ${
              activeTab === 'health' 
                ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-2xs' 
                : 'text-[#665F55] hover:text-[#1A1816]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 mr-1.5" />
            System Health
          </button>
        </div>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Enrolled', value: '4,281', icon: Users, color: 'text-[#1A1816]', bg: 'bg-[#FAF8F5]', border: 'border-[#E6E0D4]' },
          { label: 'Active Trainers', value: '142', icon: Activity, color: 'text-[#D9531E]', bg: 'bg-[#FDF2EC]', border: 'border-[#F7D2C0]' },
          { label: 'Critical Skill Gaps', value: '847', icon: AlertTriangle, color: 'text-[#B86B00]', bg: 'bg-[#FEF8EC]', border: 'border-[#FBE3B5]' },
          { label: 'System Uptime', value: '99.9%', icon: Target, color: 'text-[#237A3C]', bg: 'bg-[#EDF7EF]', border: 'border-[#CCEBD3]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-[#E6E0D4] shadow-[0_2px_8px_rgba(28,26,24,0.03)] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#8C8375] uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-extrabold text-[#1A1816] mt-0.5 font-mono-code">{stat.value}</p>
            </div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${stat.bg} ${stat.border}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Active Tab Content */}
      <div>
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'health' && <SystemHealth />}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6E0D4] shadow-[0_2px_8px_rgba(28,26,24,0.03)]">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#EFE9DF]">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-[#D9531E]" />
                  <h3 className="text-sm font-extrabold text-[#1A1816]">
                    Organization Skill Gaps
                  </h3>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MOCK_SKILL_GAPS}>
                    <PolarGrid stroke="#E6E0D4" />
                    <PolarAngleAxis dataKey="subject" textAnchor="middle" tick={{ fill: '#4A443C', fontSize: 11, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#8C8375', fontSize: 10 }} />
                    <Radar name="Required Level" dataKey="required" stroke="#8C8375" fill="#FAF8F5" fillOpacity={0.6} />
                    <Radar name="Actual Workforce Level" dataKey="actual" stroke="#D9531E" fill="#D9531E" fillOpacity={0.25} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E6E0D4', backgroundColor: '#FFFFFF', fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6E0D4] shadow-[0_2px_8px_rgba(28,26,24,0.03)]">
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#EFE9DF]">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-[#237A3C]" />
                  <h3 className="text-sm font-extrabold text-[#1A1816]">
                    Training & Assessment Throughput
                  </h3>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#E5DFD4]"></div>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_COMPLETION} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFE9DF" />
                    <XAxis dataKey="name" tick={{ fill: '#8C8375', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#8C8375', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: '#FAF8F5' }} contentStyle={{ borderRadius: '12px', border: '1px solid #E6E0D4', backgroundColor: '#FFFFFF', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="courses" name="Courses Completed" fill="#D9531E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="assessments" name="Assessments Passed" fill="#237A3C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
