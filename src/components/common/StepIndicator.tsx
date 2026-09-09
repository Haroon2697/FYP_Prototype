import React from 'react';
import { Check, Loader2 } from 'lucide-react';

export interface StepItem {
  id: string;
  label: string;
  sublabel?: string;
}

export interface StepIndicatorProps {
  steps: StepItem[];
  currentStepIndex: number;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStepIndex,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => {
        const isDone = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;

        return (
          <div key={step.id} className="flex items-start gap-3.5">
            {/* Circle status */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                    : isCurrent
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-4 ring-indigo-100'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-0.5 h-6 my-1 transition-colors duration-300 ${
                    isDone ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>

            {/* Labels */}
            <div className="pt-0.5">
              <div
                className={`text-sm font-medium transition-colors ${
                  isCurrent
                    ? 'text-indigo-900 font-semibold'
                    : isDone
                    ? 'text-slate-800'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </div>
              {step.sublabel && (
                <div
                  className={`text-xs mt-0.5 transition-colors ${
                    isCurrent
                      ? 'text-indigo-600 font-medium'
                      : isDone
                      ? 'text-slate-500'
                      : 'text-slate-400'
                  }`}
                >
                  {step.sublabel}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
