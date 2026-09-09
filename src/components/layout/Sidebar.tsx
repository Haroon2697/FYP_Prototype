import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  CheckCircle2,
  Clock,
  Plus,
  Compass,
  Cpu,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { Button } from '../common/Button';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { projects, activeFilter, setActiveFilter } = useProjects();

  const totalCount = projects.length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const processingCount = projects.filter((p) => p.status === 'Processing').length;

  const filters = [
    {
      id: 'all',
      label: 'All Projects',
      count: totalCount,
      icon: Layers,
      activeClass: 'bg-violet-50 text-violet-800 font-bold border-violet-200/90 shadow-2xs',
      badgeClass: 'bg-violet-100 text-violet-800',
      iconColor: 'text-violet-600',
    },
    {
      id: 'completed',
      label: 'Completed',
      count: completedCount,
      icon: CheckCircle2,
      activeClass: 'bg-emerald-50 text-emerald-800 font-bold border-emerald-200/90 shadow-2xs',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      iconColor: 'text-emerald-600',
    },
    {
      id: 'processing',
      label: 'Processing',
      count: processingCount,
      icon: Clock,
      activeClass: 'bg-amber-50 text-amber-800 font-bold border-amber-200/90 shadow-2xs',
      badgeClass: 'bg-amber-100 text-amber-800',
      iconColor: 'text-amber-600',
    },
  ] as const;

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block">
      <div className="sticky top-20 space-y-6">
        
        {/* Primary CTA */}
        <div className="p-0.5">
          <Button
            variant="gradient"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => navigate('/new')}
            className="w-full justify-center shadow-md shadow-violet-600/20 py-2.5"
          >
            New Project
          </Button>
        </div>

        {/* Status Filters */}
        <div className="space-y-1 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="px-3 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Status Filters
          </div>
          {filters.map((filter) => {
            const isSelected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? filter.activeClass
                    : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <filter.icon
                    className={`w-4 h-4 ${
                      isSelected ? filter.iconColor : 'text-slate-400'
                    }`}
                  />
                  <span>{filter.label}</span>
                </div>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isSelected ? filter.badgeClass : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* AI Capabilities Quick Peek */}
        <div className="relative p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 text-white shadow-xl border border-slate-800/80 overflow-hidden space-y-3.5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span className="tracking-wide uppercase text-[10px]">Autonomous Engine</span>
          </div>

          <p className="relative z-10 text-xs text-slate-300 leading-relaxed font-normal">
            Headless browser crawl maps UI state transitions, discovering and grounding workflows mathematically.
          </p>

          <div className="relative z-10 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Zap className="w-3.5 h-3.5" /> 98.4% Match
            </div>
            <div className="flex items-center gap-1.5 text-violet-400 font-semibold">
              <Compass className="w-3.5 h-3.5" /> BFS Crawl
            </div>
          </div>
        </div>

        {/* Project Context Info */}
        <div className="px-3.5 py-3 rounded-2xl bg-gradient-to-r from-violet-50/70 via-cyan-50/50 to-amber-50/50 border border-violet-200/60 text-[11px] text-slate-600 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
          <span className="leading-snug">
            <strong>ExplainerAI v1.2</strong> — Grounded SaaS explainer synthesis for FYP defense.
          </span>
        </div>

      </div>
    </aside>
  );
};
