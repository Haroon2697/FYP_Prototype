import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow,
  WorkflowStep
} from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Code2,
  Layers,
  MousePointer,
  CheckCircle2,
  Target
} from 'lucide-react';

export interface WorkflowDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: Workflow | null;
}

export const WorkflowDetailModal: React.FC<WorkflowDetailModalProps> = ({
  isOpen,
  onClose,
  workflow,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copiedSelector, setCopiedSelector] = useState(false);

  if (!workflow) return null;

  const currentStep: WorkflowStep = workflow.steps[activeStepIndex] || workflow.steps[0];
  const highlight = currentStep.screenshotMockup.highlightBox;

  const handleCopySelector = () => {
    navigator.clipboard.writeText(currentStep.targetElement);
    setCopiedSelector(true);
    setTimeout(() => setCopiedSelector(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="4xl"
      title={
        <div className="flex items-center gap-3">
          <span className="text-lg font-black text-slate-900 tracking-tight truncate">
            {workflow.title}
          </span>
          <Badge variant="cyan" size="sm">
            {Math.round(workflow.explanatoryScore * 100)}% Score
          </Badge>
        </div>
      }
      description={workflow.description}
    >
      <div className="space-y-6">
        
        {/* Step Navigation Pill Stepper */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {workflow.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/25'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isActive ? 'bg-white text-violet-700 font-black' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="truncate max-w-[120px]">{step.action}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-500 px-1 font-mono">
              {activeStepIndex + 1} / {workflow.steps.length}
            </span>
            <button
              disabled={activeStepIndex === workflow.steps.length - 1}
              onClick={() =>
                setActiveStepIndex((prev) => Math.min(workflow.steps.length - 1, prev + 1))
              }
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area: Visual Mockup vs Metadata Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: UI Wireframe / Screenshot with Neon Cyan Bounding Box */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <Layers className="w-3.5 h-3.5 text-cyan-600" />
                <span>Captured DOM Context View</span>
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                {currentStep.screenshotMockup.route}
              </span>
            </div>

            {/* Browser Window Frame Mockup */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden aspect-[16/10] flex flex-col select-none">
              
              {/* Window Header */}
              <div className="h-8 bg-slate-900 px-3.5 flex items-center justify-between border-b border-slate-800 text-slate-400 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-slate-300 font-semibold truncate max-w-[200px]">
                    {currentStep.screenshotMockup.pageTitle}
                  </span>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono font-bold">LIVE STATE</span>
              </div>

              {/* Simulated SaaS Page Canvas */}
              <div className="relative flex-1 bg-slate-950 p-4 overflow-hidden">
                <div className="w-full h-full rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 flex flex-col justify-between opacity-90">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-cyan-500" />
                      <div className="w-20 h-2 bg-slate-700 rounded" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-slate-800 rounded" />
                      <div className="w-6 h-6 rounded-full bg-violet-600/40" />
                    </div>
                  </div>

                  {/* Body elements */}
                  <div className="grid grid-cols-3 gap-3 my-auto">
                    <div className="h-16 rounded-lg bg-slate-800/60 p-2 space-y-1.5 border border-slate-700/40">
                      <div className="w-12 h-2 bg-violet-400/80 rounded" />
                      <div className="w-full h-1.5 bg-slate-700 rounded" />
                      <div className="w-3/4 h-1.5 bg-slate-700 rounded" />
                    </div>
                    <div className="h-16 rounded-lg bg-slate-800/60 p-2 space-y-1.5 border border-slate-700/40">
                      <div className="w-16 h-2 bg-cyan-400/80 rounded" />
                      <div className="w-full h-1.5 bg-slate-700 rounded" />
                      <div className="w-2/3 h-1.5 bg-slate-700 rounded" />
                    </div>
                    <div className="h-16 rounded-lg bg-slate-800/60 p-2 space-y-1.5 border border-slate-700/40">
                      <div className="w-14 h-2 bg-amber-400/80 rounded" />
                      <div className="w-full h-1.5 bg-slate-700 rounded" />
                      <div className="w-4/5 h-1.5 bg-slate-700 rounded" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
                    <span className="text-cyan-400">Grounding Bounding Target</span>
                    <span>Node #{currentStep.stepNumber}</span>
                  </div>
                </div>

                {/* Animated Bounding Box in Neon Cyan */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: 'absolute',
                      top: `${highlight.top}%`,
                      left: `${highlight.left}%`,
                      width: `${highlight.width}%`,
                      height: `${highlight.height}%`,
                    }}
                    className="z-20 pointer-events-none"
                  >
                    <div className="w-full h-full rounded-lg border-2 border-cyan-400 bg-cyan-500/20 ring-4 ring-cyan-500/30 shadow-glow-cyan flex items-center justify-center relative animate-pulse">
                      <span className="absolute -top-7 left-0 bg-cyan-600 text-white font-mono text-[10px] font-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap flex items-center gap-1">
                        <MousePointer className="w-2.5 h-2.5" />
                        {highlight.label}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>Timestamp: <strong className="text-slate-800 font-mono font-bold">{currentStep.timestamp}</strong></span>
              <span className="text-cyan-700 font-bold flex items-center gap-1">
                <Target className="w-3 h-3 text-cyan-600" />
                Headless crawler bounding box verified
              </span>
            </div>
          </div>

          {/* Right: Step Metadata & Grounding Evidence Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-slate-50/80 p-5 rounded-3xl border border-slate-200/90">
            <div className="space-y-4">
              
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-200">
                  Step {currentStep.stepNumber} of {workflow.steps.length}
                </span>
                <h4 className="text-base font-black text-slate-900 mt-2 tracking-tight">
                  {currentStep.action}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {currentStep.elementDescription}
                </p>
              </div>

              {/* DOM Target Element Grounding Box */}
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-600" />
                    Target DOM Selector
                  </span>
                  <Badge variant="cyan" size="sm">
                    {currentStep.selectorType}
                  </Badge>
                </div>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs border border-slate-800">
                  <span className="truncate">{currentStep.targetElement}</span>
                  <button
                    onClick={handleCopySelector}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors flex-shrink-0"
                    title="Copy Selector"
                  >
                    {copiedSelector ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Explanatory Importance Analysis */}
              <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Why ExplainerAI Ranked This Step
                </span>
                <p className="text-xs text-emerald-900/90 leading-relaxed">
                  {currentStep.importance}. Essential state mutation for product activation.
                </p>
              </div>

            </div>

            {/* Step Controls */}
            <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                Close Inspector
              </Button>

              <Button
                variant="gradient"
                size="sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={onClose}
              >
                Selected For Video
              </Button>
            </div>

          </div>

        </div>

      </div>
    </Modal>
  );
};
