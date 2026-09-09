import React, { useState } from 'react';
import { Workflow } from '../../types';
import { WorkflowCard } from './WorkflowCard';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export interface WorkflowsTabProps {
  workflows: Workflow[];
  onInspectWorkflow: (wf: Workflow) => void;
}

export const WorkflowsTab: React.FC<WorkflowsTabProps> = ({
  workflows,
  onInspectWorkflow,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(workflows.map((w) => w.category)))];

  const filtered = workflows.filter((w) =>
    selectedCategory === 'all' ? true : w.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Tab Header & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Autonomous Discovered Workflows</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by explanatory value, feature novelty, and user journey clarity.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:inline" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? `All (${workflows.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ranked Workflow Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((wf, idx) => (
          <WorkflowCard
            key={wf.id}
            workflow={wf}
            rank={idx + 1}
            onInspect={onInspectWorkflow}
          />
        ))}
      </div>
    </div>
  );
};
