import React, { useState } from 'react';
import { Project, ScriptTone } from '../../types';
import { GroundedTooltip } from './GroundedTooltip';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useProjects } from '../../context/ProjectContext';
import {
  FileText,
  Sparkles,
  Check,
  Copy,
  RotateCw,
  ShieldCheck,
  Languages,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export interface ScriptTabProps {
  project: Project;
}

export const ScriptTab: React.FC<ScriptTabProps> = ({ project }) => {
  const { updateScriptTone, toggleScriptApproval, showToast } = useProjects();
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  const handleCopy = () => {
    const fullText = project.script.sentences.map((s) => s.fullText).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('Narration script copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = (tone: ScriptTone) => {
    setIsRegenerating(true);
    setTimeout(() => {
      updateScriptTone(project.id, tone);
      setIsRegenerating(false);
    }, 600);
  };

  const languages = ['English (US)', 'Spanish (ES)', 'German (DE)', 'Urdu (PK)', 'Japanese (JA)'];

  return (
    <div className="space-y-6">
      {/* Script Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-600" />
              <span>Evidence-Grounded Narration Script</span>
            </h3>
            {project.script.approved && (
              <Badge variant="emerald" size="sm" dot>
                Approved & Locked
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Hover over highlighted terms with <span className="font-extrabold text-violet-700">*</span> to inspect the linked DOM element and confidence score.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Tone Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 px-3 py-1.5 rounded-xl text-xs border border-slate-200/80">
            <Sliders className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-slate-500 font-semibold">Tone:</span>
            <select
              value={project.script.tone}
              onChange={(e) => handleRegenerate(e.target.value as ScriptTone)}
              disabled={isRegenerating}
              className="bg-transparent font-bold text-violet-800 focus:outline-none cursor-pointer capitalize"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="technical">Technical</option>
              <option value="executive">Executive</option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 px-3 py-1.5 rounded-xl text-xs border border-slate-200/80">
            <Languages className="w-3.5 h-3.5 text-cyan-600" />
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                showToast(`Language set to ${e.target.value}`);
              }}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>

          <Button
            variant={project.script.approved ? 'secondary' : 'gradient'}
            size="sm"
            onClick={() => toggleScriptApproval(project.id)}
            icon={project.script.approved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Check className="w-3.5 h-3.5" />}
          >
            {project.script.approved ? 'Approved' : 'Approve Script'}
          </Button>
        </div>
      </div>

      {/* Main Document Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        
        {/* Document Header Metadata Bar */}
        <div className="px-7 py-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-5">
            <span>Word Count: <strong className="text-slate-900 font-bold">{project.script.wordCount} words</strong></span>
            <span>Duration: <strong className="text-slate-900 font-bold">{project.script.estimatedDuration}</strong></span>
            <span>Sentences: <strong className="text-slate-900 font-bold">{project.script.sentences.length}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200/90 font-bold text-[11px] shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mathematical DOM Grounding: 100%</span>
          </div>
        </div>

        {/* Script Content Paragraphs */}
        <div className="p-8 sm:p-10 space-y-6 max-w-4xl mx-auto">
          {project.script.sentences.map((sentence, idx) => (
            <div
              key={sentence.id}
              className="group p-4 rounded-2xl hover:bg-slate-50/80 transition-colors border border-transparent hover:border-slate-200/80 flex items-start gap-4"
            >
              {/* Sentence index & timestamp */}
              <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                <span className="w-7 h-7 rounded-xl bg-violet-50 text-violet-700 font-mono text-xs font-black flex items-center justify-center border border-violet-200/80 shadow-2xs">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-mono text-slate-400 mt-1.5 whitespace-nowrap font-semibold">
                  {sentence.timestamp.split(' - ')[0]}
                </span>
              </div>

              {/* Tokens with interactive grounding */}
              <div className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
                {sentence.tokens.map((token, tIdx) => {
                  if (token.isGrounded && token.groundingDetails) {
                    return (
                      <GroundedTooltip
                        key={`${sentence.id}-tok-${tIdx}`}
                        grounding={token.groundingDetails}
                      >
                        {token.text}
                      </GroundedTooltip>
                    );
                  }
                  return <span key={`${sentence.id}-tok-${tIdx}`}>{token.text}</span>;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Document Footer Callout */}
        <div className="px-7 py-4 bg-gradient-to-r from-violet-50/70 via-indigo-50/50 to-cyan-50/70 border-t border-violet-100 flex items-center justify-between text-xs text-slate-800">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-violet-600 flex-shrink-0" />
            <span>
              Grounding verified against target DOM tree. Each phrase corresponds to verified user actions.
            </span>
          </div>
          <button
            onClick={() => handleRegenerate(project.script.tone)}
            disabled={isRegenerating}
            className="font-bold text-violet-700 hover:text-violet-900 flex items-center gap-1.5 flex-shrink-0"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate Narration</span>
          </button>
        </div>

      </div>
    </div>
  );
};
