import React from 'react';
import { motion } from 'framer-motion';
import { Workflow } from '../../types';
import { Badge } from '../common/Badge';
import {
  GitCommit,
  Clock,
  Sparkles,
  ChevronRight,
  Target
} from 'lucide-react';
import { Button } from '../common/Button';

export interface WorkflowCardProps {
  workflow: Workflow;
  rank: number;
  onInspect: (wf: Workflow) => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  rank,
  onInspect,
}) => {
  const getCategoryVariant = (cat: Workflow['category']) => {
    switch (cat) {
      case 'Core Feature':
        return 'violet';
      case 'Onboarding':
        return 'emerald';
      case 'Admin & Settings':
        return 'purple';
      case 'Analytics & Reports':
        return 'amber';
      case 'Integration':
        return 'cyan';
      default:
        return 'slate';
    }
  };

  const percentageScore = Math.round(workflow.explanatoryScore * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl border border-slate-200/90 p-6 hover:border-violet-300 hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        {/* Header Row: Rank, Category & Score */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 font-extrabold text-xs flex items-center justify-center border border-slate-200">
              #{rank}
            </span>
            <Badge variant={getCategoryVariant(workflow.category)} size="sm">
              {workflow.category}
            </Badge>
            {workflow.isPrimary && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80 flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 text-amber-600" /> Primary Flow
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/90 shadow-2xs">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>{percentageScore}% Score</span>
          </div>
        </div>

        {/* Workflow Title & Description */}
        <h4 className="text-base font-extrabold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug tracking-tight">
          {workflow.title}
        </h4>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
          {workflow.description}
        </p>

        {/* Step Preview Chips */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Sequence Preview
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
            {workflow.steps.slice(0, 3).map((s, idx) => (
              <React.Fragment key={s.id}>
                <span className="px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200/80 font-mono text-[11px] font-medium truncate max-w-[180px] text-slate-700">
                  {idx + 1}. {s.action}
                </span>
                {idx < Math.min(workflow.steps.length, 3) - 1 && (
                  <span className="text-slate-300 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
            {workflow.steps.length > 3 && (
              <span className="text-[11px] text-violet-600 font-bold">
                +{workflow.steps.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Metrics & Inspect Button */}
      <div className="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-bold text-slate-700">
            <GitCommit className="w-3.5 h-3.5 text-violet-600" />
            {workflow.stepsCount} Steps
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            {workflow.estimatedDuration}
          </span>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onInspect(workflow)}
          icon={<ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all" />}
          iconPosition="right"
          className="group-hover:border-violet-200 group-hover:text-violet-700 font-bold"
        >
          Inspect Steps
        </Button>
      </div>
    </motion.div>
  );
};
