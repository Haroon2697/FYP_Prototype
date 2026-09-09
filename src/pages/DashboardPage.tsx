import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/layout/Sidebar';
import { ProjectFilters } from '../components/dashboard/ProjectFilters';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { useProjects } from '../context/ProjectContext';
import {
  Plus,
  Sparkles,
  FolderDot,
  GitFork,
  Target,
  ShieldCheck,
  Radio
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    filteredProjects,
    projects,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
  } = useProjects();

  const totalWorkflows = projects.reduce((acc, p) => acc + p.workflowsCount, 0);
  const avgScore =
    projects.length > 0
      ? Math.round((projects.reduce((acc, p) => acc + p.explanatoryScore, 0) / projects.length) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-start gap-8">
        
        {/* Left Sidebar Filters */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 space-y-6">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Projects
                </h1>
                <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-200/80">
                  {projects.length} Repositories
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Manage and monitor your autonomous SaaS explainer video projects
              </p>
            </div>

            <Button
              variant="gradient"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => navigate('/new')}
              className="shadow-md shadow-violet-600/20 flex-shrink-0"
            >
              New Project
            </Button>
          </div>

          {/* Quick Metrics KPI Bar (Clean, Colorful & Production-Grade) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
                <GitFork className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-slate-900">{totalWorkflows}</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Discovered Workflows</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-emerald-700">{avgScore}%</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Avg Explanatory Score</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-black text-cyan-700">100%</div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Grounded Selectors</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-lg font-black text-amber-700">
                  {projects.filter(p => p.status === 'Processing').length > 0 ? '1 Active' : 'Idle'}
                </div>
                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Crawler Status</div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <ProjectFilters />

          {/* Projects Content Grid or Empty State */}
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : projects.length === 0 ? (
            <EmptyState
              icon={<FolderDot className="w-8 h-8 text-violet-500" />}
              title="No projects yet"
              description="Create your first explainer video project by pasting any SaaS product URL."
              actionText="Create First Project"
              onAction={() => navigate('/new')}
            />
          ) : (
            <EmptyState
              icon={<Sparkles className="w-8 h-8 text-violet-500" />}
              title="No matching projects"
              description={
                searchQuery
                  ? `No projects matched "${searchQuery}". Try adjusting your search query or filter.`
                  : `No projects found with status "${activeFilter}".`
              }
              actionText="Reset Filters"
              onAction={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
            />
          )}

        </div>

      </div>
    </div>
  );
};
