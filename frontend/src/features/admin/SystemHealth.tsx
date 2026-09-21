import React, { useState } from 'react';
import { Server, Database, Cpu, HardDrive, Clock, FileText } from 'lucide-react';

interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

const MOCK_LOGS: AuditLog[] = [
  { id: '1', actor: 'Ananya Sharma', action: 'Completed Assessment', entityType: 'Assessment', timestamp: '10 mins ago', status: 'success' },
  { id: '2', actor: 'System', action: 'RAG Pipeline Sync', entityType: 'VectorDB', timestamp: '45 mins ago', status: 'success' },
  { id: '3', actor: 'Vikram Singh', action: 'Modified Role', entityType: 'User', timestamp: '1 hour ago', status: 'warning' },
  { id: '4', actor: 'Dr. Rahul Verma', action: 'Uploaded Document', entityType: 'Material', timestamp: '2 hours ago', status: 'success' },
  { id: '5', actor: 'System', action: 'LLM Timeout', entityType: 'Gemini API', timestamp: '3 hours ago', status: 'error' },
  { id: '6', actor: 'System', action: 'Database Backup', entityType: 'Backup', timestamp: '12 hours ago', status: 'success' },
];

export const SystemHealth: React.FC = () => {
  const [logs] = useState<AuditLog[]>(MOCK_LOGS);
  const [filter, setFilter] = useState<'all' | 'error' | 'warning'>('all');

  const filteredLogs = logs.filter(log => filter === 'all' || log.status === filter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'success': return 'text-[#237A3C] bg-[#EAF3EC] border-[#BCE1C7]';
      case 'warning': return 'text-[#D9531E] bg-[#FAF0E6] border-[#F3C4B2]';
      case 'error': return 'text-[#991B1B] bg-[#FEE2E2] border-[#FECACA]';
      default: return 'text-[#736B5E] bg-[#FAF8F5] border-[#E6E0D4]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#FBF8F2] p-5 rounded-2xl border border-[#E6E0D4] shadow-xs relative overflow-hidden group hover:border-[#D9531E] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#EAF3EC] p-2.5 rounded-xl border border-[#BCE1C7]">
              <Server className="w-5 h-5 text-[#237A3C]" />
            </div>
            <span className="flex items-center text-[10px] font-mono font-bold text-[#237A3C] bg-[#EAF3EC] border border-[#BCE1C7] px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#237A3C] mr-1.5 animate-pulse" />
              ONLINE
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8375]">API Gateway</p>
          <p className="text-xl font-mono font-bold text-[#1C1A18] mt-1">45ms avg</p>
          <p className="text-xs text-[#8C8375] mt-1 font-mono">0.01% error rate</p>
        </div>

        <div className="bg-[#FBF8F2] p-5 rounded-2xl border border-[#E6E0D4] shadow-xs relative overflow-hidden group hover:border-[#D9531E] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#FAF0E6] p-2.5 rounded-xl border border-[#F3C4B2]">
              <Database className="w-5 h-5 text-[#D9531E]" />
            </div>
            <span className="flex items-center text-[10px] font-mono font-bold text-[#237A3C] bg-[#EAF3EC] border border-[#BCE1C7] px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#237A3C] mr-1.5" />
              SYNCED
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8375]">Vector Database</p>
          <p className="text-xl font-mono font-bold text-[#1C1A18] mt-1">24,592</p>
          <p className="text-xs text-[#8C8375] mt-1 font-mono">Document chunks</p>
        </div>

        <div className="bg-[#FBF8F2] p-5 rounded-2xl border border-[#E6E0D4] shadow-xs relative overflow-hidden group hover:border-[#D9531E] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E6E0D4]">
              <Cpu className="w-5 h-5 text-[#1C1A18]" />
            </div>
            <span className="flex items-center text-[10px] font-mono font-bold text-[#D9531E] bg-[#FAF0E6] border border-[#F3C4B2] px-2.5 py-0.5 rounded-full">
              34% LOAD
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8375]">Backend Compute</p>
          <p className="text-xl font-mono font-bold text-[#1C1A18] mt-1">4 Cores Active</p>
          <div className="w-full bg-[#EFE9DF] rounded-full h-1.5 mt-3">
            <div className="bg-[#D9531E] h-1.5 rounded-full" style={{ width: '34%' }}></div>
          </div>
        </div>

        <div className="bg-[#FBF8F2] p-5 rounded-2xl border border-[#E6E0D4] shadow-xs relative overflow-hidden group hover:border-[#D9531E] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#F5EFE6] p-2.5 rounded-xl border border-[#E6E0D4]">
              <HardDrive className="w-5 h-5 text-[#595247]" />
            </div>
            <span className="flex items-center text-[10px] font-mono font-bold text-[#595247] bg-[#FAF8F5] border border-[#E6E0D4] px-2.5 py-0.5 rounded-full">
              12% USED
            </span>
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#8C8375]">Storage Bucket</p>
          <p className="text-xl font-mono font-bold text-[#1C1A18] mt-1">1.2 GB / 10 GB</p>
          <div className="w-full bg-[#EFE9DF] rounded-full h-1.5 mt-3">
            <div className="bg-[#1C1A18] h-1.5 rounded-full" style={{ width: '12%' }}></div>
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-[#FBF8F2] border border-[#E6E0D4] rounded-2xl shadow-sm overflow-hidden flex flex-col h-[520px]">
        <div className="p-6 border-b border-[#E6E0D4] bg-[#FAF8F5]">
          <div className="flex items-center space-x-1.5 pb-2 mb-3 border-b border-[#EFE9DF]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5DFD4]" />
            <span className="text-[10px] font-mono tracking-widest text-[#8C8375] uppercase ml-2">Telemetry // Audit Stream</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-[#1C1A18] tracking-tight flex items-center">
                <FileText className="w-5 h-5 mr-2 text-[#D9531E]" /> System Audit Logs
              </h2>
              <p className="text-sm text-[#736B5E] mt-1">Real-time immutable trace of platform events, service health, and security exceptions.</p>
            </div>
            
            <div className="bg-[#EFE9DF] p-1 rounded-full inline-flex space-x-1 border border-[#E6E0D4]">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${filter === 'all' ? 'bg-[#1C1A18] text-white shadow-xs' : 'text-[#736B5E] hover:text-[#1C1A18]'}`}
              >
                All Events
              </button>
              <button 
                onClick={() => setFilter('warning')}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${filter === 'warning' ? 'bg-[#D9531E] text-white shadow-xs' : 'text-[#736B5E] hover:text-[#1C1A18]'}`}
              >
                Warnings
              </button>
              <button 
                onClick={() => setFilter('error')}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${filter === 'error' ? 'bg-[#991B1B] text-white shadow-xs' : 'text-[#736B5E] hover:text-[#1C1A18]'}`}
              >
                Errors
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-0">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#F5EFE6] border-b border-[#E6E0D4] z-10">
              <tr className="text-[10px] font-mono font-bold text-[#736B5E] uppercase tracking-wider">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Action</th>
                <th className="p-4">Entity Type</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE9DF]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="p-4 text-xs font-mono text-[#8C8375]">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-[#A8A095]" /> {log.timestamp}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-[#1C1A18]">
                    {log.actor}
                  </td>
                  <td className="p-4 text-xs font-medium text-[#3D372E]">
                    {log.action}
                  </td>
                  <td className="p-4 text-xs font-mono text-[#736B5E]">
                    {log.entityType}
                  </td>
                  <td className="p-4 text-right">
                    <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full border ${getStatusBadge(log.status)}`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-mono text-xs text-[#8C8375]">
                    No logs found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
