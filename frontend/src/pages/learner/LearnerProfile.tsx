import React, { useState } from 'react';
import { CompetencyPassport } from '../../features/profile/CompetencyPassport';
import { ProfileForm } from '../../features/profile/ProfileForm';
import type { LearnerProfile, CompetencyLevel } from '../../features/profile/types';
import { useAuth } from '../../app/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export const LearnerProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Demo data state (in a real app, this would be fetched via TanStack Query from the API/Supabase)
  const [profile, setProfile] = useState<LearnerProfile>({
    id: user?.id || 'demo-123',
    fullName: user?.name || 'Ananya Sharma',
    employeeCode: 'MOSPI-7842',
    designation: 'Junior Statistical Officer',
    department: 'Labour Statistics',
    jobRole: 'Junior Statistical Officer',
    currentAssignment: 'Annual Survey of Industries',
    educationSummary: 'M.Sc. Statistics, Delhi University',
    yearsOfExperience: 2,
    certifications: 'Data Analysis with Python (iGOT)',
    previousTraining: 'Official Statistics Foundation Course (NSSTA)',
  });

  const [competencies] = useState<CompetencyLevel[]>([
    { id: '1', domain: 'Statistical', name: 'Sampling', level: 'L2', levelName: 'Basic' },
    { id: '2', domain: 'Technical', name: 'Python', level: 'L1', levelName: 'Awareness' },
    { id: '3', domain: 'Technical', name: 'SQL', level: 'L2', levelName: 'Basic' },
    { id: '4', domain: 'Technical', name: 'Data Visualization', level: 'L3', levelName: 'Working' },
    { id: '5', domain: 'Statistical', name: 'Statistics', level: 'L3', levelName: 'Working' },
    { id: '6', domain: 'Behavioural & Managerial', name: 'Communication', level: 'L4', levelName: 'Advanced' },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedProfile: LearnerProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
    // Here we would typically show a Toast notification for success
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
            Credentials &bull; Competency Passport
          </span>
          <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight">
            Professional Profile
          </h1>
          <p className="text-[#6B645B] text-sm mt-1 font-medium">
            Manage your official designation, verified training records, and Competency Passport.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-2xs border ${
              isEditing
                ? 'bg-[#1C1A18] text-white border-[#1C1A18]'
                : 'border-[#DDD6C8] bg-white hover:bg-[#F2ECE0] text-[#1A1816]'
            }`}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile Details'}
          </button>
          
          <button 
            onClick={async () => {
              await logout();
              navigate('/login', { replace: true });
            }}
            className="flex items-center px-4 py-2.5 bg-[#C93B2B] hover:bg-[#A92A1D] text-white font-bold text-xs rounded-full transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0"
          >
            <LogOut className="w-3.5 h-3.5 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
      
      {isEditing ? (
        <ProfileForm initialProfile={profile} onSave={handleSave} />
      ) : (
        <CompetencyPassport profile={profile} competencies={competencies} />
      )}
    </div>
  );
};
