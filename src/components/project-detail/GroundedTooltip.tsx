import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GroundingDetail } from '../../types';
import { Sparkles, Code2, ExternalLink, ShieldCheck } from 'lucide-react';

export interface GroundedTooltipProps {
  children: React.ReactNode;
  grounding: GroundingDetail;
}

export const GroundedTooltip: React.FC<GroundedTooltipProps> = ({
  children,
  grounding,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {/* Grounded Text Highlight with electric violet + cyan styling */}
      <span className="cursor-pointer bg-gradient-to-r from-violet-50 via-indigo-50 to-cyan-50 text-slate-900 border-b-2 border-violet-500 hover:border-cyan-500 hover:bg-violet-100/70 px-1.5 py-0.5 rounded-md transition-all font-semibold relative group shadow-2xs">
        {children}
        <span className="inline-block ml-0.5 align-top text-[10px] text-violet-700 font-black">
          *
        </span>
      </span>

      {/* Floating Inspector Popover */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3.5 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-700 z-50 text-xs pointer-events-auto select-none"
          >
            {/* Popover Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950" />

            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1 font-bold text-violet-400 text-[11px]">
                <Sparkles className="w-3 h-3 text-violet-400" />
                DOM Grounding Evidence
              </span>
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/80">
                <ShieldCheck className="w-3 h-3" />
                {Math.round(grounding.confidence * 100)}% Match
              </span>
            </div>

            <div className="mt-2.5 space-y-2">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Linked UI Target:
                </span>
                <p className="font-bold text-slate-100 mt-0.5">
                  {grounding.targetLabel}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                  <Code2 className="w-3 h-3 text-cyan-400" /> Selector:
                </span>
                <code className="block mt-0.5 font-mono text-[11px] bg-slate-900 px-2.5 py-1.5 rounded-lg text-cyan-300 border border-slate-800 overflow-x-auto">
                  {grounding.domSelector}
                </code>
              </div>

              <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="truncate max-w-[170px]">{grounding.pageUrl}</span>
                <ExternalLink className="w-3 h-3 opacity-60 flex-shrink-0" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
