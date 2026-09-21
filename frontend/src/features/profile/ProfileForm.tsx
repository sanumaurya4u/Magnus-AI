import React, { useState } from 'react';
import type { LearnerProfile } from './types';
import { Save } from 'lucide-react';

interface Props {
  initialProfile: LearnerProfile;
  onSave: (profile: LearnerProfile) => void;
}

export const ProfileForm: React.FC<Props> = ({ initialProfile, onSave }) => {
  const [profile, setProfile] = useState<LearnerProfile>(initialProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onSave(profile);
      setIsSaving(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-[#E6E0D4] shadow-[0_2px_8px_rgba(28,26,24,0.03)] space-y-6">
      <div className="border-b border-[#EFE9DF] pb-4">
        <span className="text-[10px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
          Profile Editor
        </span>
        <h2 className="text-xl font-extrabold text-[#1A1816]">Edit Official Profile</h2>
        <p className="text-xs text-[#6B645B] mt-0.5 font-medium">Update your MoSPI official designation, training history, and educational background.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Full Name</label>
          <input 
            type="text" name="fullName" value={profile.fullName} onChange={handleChange} required
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Employee Code</label>
          <input 
            type="text" name="employeeCode" value={profile.employeeCode} onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Designation</label>
          <input 
            type="text" name="designation" value={profile.designation} onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Job Role</label>
          <select 
            name="jobRole" value={profile.jobRole} onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
          >
            <option value="">Select a role...</option>
            <option value="Junior Statistical Officer">Junior Statistical Officer</option>
            <option value="Statistical Officer">Statistical Officer</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Department / Division</label>
          <select 
            name="department" value={profile.department} onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
          >
            <option value="">Select a department...</option>
            <option value="Labour Statistics">Labour Statistics</option>
            <option value="National Accounts">National Accounts</option>
            <option value="Agricultural Statistics">Agricultural Statistics</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Years of Experience</label>
          <input 
            type="number" name="yearsOfExperience" value={profile.yearsOfExperience} onChange={handleChange} min="0"
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all font-mono"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Education Summary</label>
          <input 
            type="text" name="educationSummary" value={profile.educationSummary} onChange={handleChange}
            placeholder="e.g. Master's in Statistics, Delhi University"
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Previous Training Programmes</label>
          <textarea 
            name="previousTraining" value={profile.previousTraining} onChange={handleChange} rows={2}
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-[#4A443C] uppercase tracking-wider mb-1.5">Certifications</label>
          <input 
            type="text" name="certifications" value={profile.certifications} onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8D1C3] rounded-xl text-sm text-[#1A1816] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#EFE9DF]">
        <button 
          type="submit" 
          disabled={isSaving}
          className="bg-[#1C1A18] hover:bg-[#2B2825] text-[#F7F3EB] font-bold py-2.5 px-6 rounded-full transition-all flex items-center shadow-sm hover:-translate-y-0.5 active:translate-y-0 text-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2 text-[#D9531E]" />
          {isSaving ? 'Saving Updates...' : 'Save Profile Changes'}
        </button>
      </div>
    </form>
  );
};
