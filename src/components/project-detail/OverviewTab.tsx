import React from 'react';
import { Project, Workflow } from '../../types';
import {
  Compass,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GitFork,
  FileText,
  Video,
  Target
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export interface OverviewTabProps {
  project: Project;
  onSelectTab: (tab: 'workflows' | 'script' | 'video') => void;
  onInspectWorkflow: (wf: Workflow) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  project,
  onSelectTab,
  onInspectWorkflow,
}) => {
  const primaryWorkflow = project.workflows.find((w) => w.isPrimary) || project.workflows[0];

  return (
    <div className="space-y-6">
      {/* Telemetry Stat Cards Grid with distinct, vibrant colors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* DOM Nodes Card (Violet) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-violet-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              DOM Nodes Explored
            </span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center border border-violet-100 shadow-2xs">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">
            {project.telemetry.domNodesExplored.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] text-violet-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Interactive graph parsed</span>
          </div>
        </div>

        {/* Routes Crawled Card (Cyan) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-cyan-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Routes Crawled
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100 shadow-2xs">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">
            {project.telemetry.routesCrawled} Views
          </div>
          <div className="mt-1 text-[11px] text-cyan-700 font-semibold">
            Across authenticated paths
          </div>
        </div>

        {/* Explanatory Value Card (Emerald) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Explanatory Value
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-emerald-700">
            {Math.round(project.explanatoryScore * 100)}%
          </div>
          <div className="mt-1 text-[11px] text-emerald-800 font-bold">
            Ranked for {project.targetAudience}
          </div>
        </div>

        {/* Grounding Integrity Card (Coral / Amber) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs hover:border-rose-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Grounding Integrity
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-rose-700">
            {Math.round(project.telemetry.confidenceScore * 100)}%
          </div>
          <div className="mt-1 text-[11px] text-rose-800 font-semibold">
            Zero hallucinated actions
          </div>
        </div>

      </div>

      {/* Primary Highlighted Workflow Card (Rich Dark Studio Aesthetic) */}
      {primaryWorkflow && (
        <div className="relative rounded-3xl p-7 text-white shadow-xl bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 border border-slate-800 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-xs">
                  Highest Ranked Workflow
                </span>
                <span className="text-xs text-cyan-300 font-mono font-semibold">
                  {primaryWorkflow.stepsCount} Steps • {primaryWorkflow.estimatedDuration}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {primaryWorkflow.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {primaryWorkflow.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="text-xs px-3 py-1 rounded-xl bg-white/10 text-cyan-200 font-semibold border border-white/15 backdrop-blur-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={() => onInspectWorkflow(primaryWorkflow)}
                className="bg-white hover:bg-slate-100 text-slate-900 border-none shadow-lg font-bold"
              >
                Inspect Step Breakdown
              </Button>
              <Button
                variant="gradient"
                size="md"
                onClick={() => onSelectTab('video')}
                icon={<Video className="w-4 h-4" />}
                className="shadow-lg shadow-violet-600/40 font-bold"
              >
                Watch Explainer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Layout: Tech Stack & Fast Nav */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Discovered Tech Stack & Grounding Info */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-600" />
              <span>Crawler Telemetry & Tech Signatures</span>
            </h4>
            <Badge variant="violet" size="sm">
              Auto-Detected
            </Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="font-medium">Target Domain:</span>
              <strong className="text-slate-900 font-mono">{project.domain}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="font-medium">Target Persona:</span>
              <Badge variant="cyan" size="sm">{project.targetAudience}</Badge>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span className="font-medium">Total Workflows Discovered:</span>
              <span className="font-bold text-slate-900">{project.workflowsCount} journeys</span>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                Identified Technologies in Target DOM
              </span>
              <div className="flex flex-wrap gap-2">
                {project.telemetry.detectedTechStack.map((tech, i) => {
                  const colors = [
                    'bg-violet-50 text-violet-800 border-violet-200',
                    'bg-cyan-50 text-cyan-800 border-cyan-200',
                    'bg-emerald-50 text-emerald-800 border-emerald-200',
                    'bg-amber-50 text-amber-800 border-amber-200',
                  ];
                  return (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold border ${colors[i % colors.length]}`}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Sections */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>Synthesis Pipeline Sections</span>
            </h4>
            <span className="text-xs text-slate-400 font-medium">Ready to present</span>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => onSelectTab('workflows')}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-violet-50/60 border border-slate-200/80 hover:border-violet-200 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-violet-600 flex items-center justify-center shadow-2xs">
                  <GitFork className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-violet-700">
                    Discovered Workflows ({project.workflowsCount})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Step-by-step element graphs and screenshot bounding boxes
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div
              onClick={() => onSelectTab('script')}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/80 hover:border-emerald-200 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-2xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                    Evidence-Grounded Script ({project.script.wordCount} words)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Interactive tokens with popover DOM tooltips
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>

            <div
              onClick={() => onSelectTab('video')}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-cyan-50/60 border border-slate-200/80 hover:border-cyan-200 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-cyan-600 flex items-center justify-center shadow-2xs">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-700">
                    Interactive Explainer Studio ({project.videoDuration})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Synchronized voiceover and animated UI focus
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
