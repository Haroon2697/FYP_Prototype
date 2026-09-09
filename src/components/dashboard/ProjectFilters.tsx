import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';

export const ProjectFilters: React.FC = () => {
  const {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredProjects,
    projects,
  } = useProjects();

  const total = projects.length;
  const completed = projects.filter((p) => p.status === 'Completed').length;
  const processing = projects.filter((p) => p.status === 'Processing').length;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-5">
      {/* Modern Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by SaaS name, domain, or workflow..."
          className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Mobile/Responsive Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        <div className="flex sm:hidden items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-violet-800 shadow-xs'
                : 'text-slate-600'
            }`}
          >
            All ({total})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
              activeFilter === 'completed'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600'
            }`}
          >
            Completed ({completed})
          </button>
          <button
            onClick={() => setActiveFilter('processing')}
            className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
              activeFilter === 'processing'
                ? 'bg-white text-amber-800 shadow-xs'
                : 'text-slate-600'
            }`}
          >
            Processing ({processing})
          </button>
        </div>

        {/* Counter Summary */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600" />
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong> of{' '}
            {projects.length} projects
          </span>
        </div>
      </div>
    </div>
  );
};
