import React, { useState } from 'react';
import { MOCK_RESOURCES, MOCK_RECOMMENDATIONS } from '../../features/learning/mockData';
import { ResourceCard } from '../../features/learning/ResourceCard';
import { Target, Search, BookOpen, Layers } from 'lucide-react';

export const LearningPathPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'catalog'>('recommendations');
  const [searchQuery, setSearchQuery] = useState('');

  // Map recommendations to resources
  const recommendedResources = MOCK_RECOMMENDATIONS.map(rec => {
    return {
      resource: MOCK_RESOURCES.find(r => r.id === rec.resourceId)!,
      recommendation: rec
    };
  }).filter(r => r.resource);

  // Filter catalog based on search
  const filteredCatalog = MOCK_RESOURCES.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#D9531E] uppercase block mb-1">
            Curated Pathways &bull; Capacity Building
          </span>
          <h1 className="text-3xl font-extrabold text-[#1A1816] tracking-tight">Learning Pathways</h1>
          <p className="text-[#6B645B] text-sm mt-1 font-medium">Discover validated learning resources from iGOT Karmayogi, NSSTA, and TPAC mapped directly to your official competency goals.</p>
        </div>

        {/* Segmented Pill Tabs */}
        <div className="inline-flex p-1 bg-[#EFE9DF] rounded-full border border-[#E5DFD4] shrink-0">
          <button 
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center ${
              activeTab === 'recommendations' 
                ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-2xs' 
                : 'text-[#665F55] hover:text-[#1A1816]'
            }`}
          >
            <Target className="w-3.5 h-3.5 mr-1.5" />
            AI Recommendations
          </button>
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center ${
              activeTab === 'catalog' 
                ? 'bg-[#1C1A18] text-[#F7F3EB] shadow-2xs' 
                : 'text-[#665F55] hover:text-[#1A1816]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 mr-1.5" />
            Resource Catalog
          </button>
        </div>
      </div>

      <div>
        {activeTab === 'recommendations' ? (
          <div className="space-y-6">
            <div className="bg-[#FAF8F5] border border-[#E6E0D4] p-5 rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm font-extrabold text-[#1A1816]">Targeted for your Skill Gaps</h2>
                <p className="text-xs text-[#6B645B] mt-0.5">Based on your Gap Analysis, these resources are tailored to accelerate proficiency in Sampling, Python, and SQL.</p>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-bold bg-[#EDF7EF] text-[#237A3C] border border-[#CCEBD3]">
                3 Gaps Targeted
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedResources.map(({ resource, recommendation }) => (
                <ResourceCard key={resource.id} resource={resource} recommendation={recommendation} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-[#8C8375] absolute left-3.5 top-3" />
              <input 
                type="text" 
                placeholder="Search resources by title or topic..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#D8D1C3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D9531E]/20 focus:border-[#D9531E] shadow-2xs text-sm text-[#1A1816]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalog.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
              {filteredCatalog.length === 0 && (
                <div className="col-span-full py-16 text-center text-[#8C8375] bg-white border border-[#E6E0D4] rounded-2xl">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-[#D5CEC2]" />
                  <p className="font-bold text-sm text-[#1A1816]">No resources found</p>
                  <p className="text-xs mt-1">Try another search keyword</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
