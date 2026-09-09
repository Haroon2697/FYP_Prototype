import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Loader2,
  Terminal,
  Cpu,
  Zap
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { StepIndicator, StepItem } from '../components/common/StepIndicator';
import { useProjects } from '../context/ProjectContext';
import { AudienceType, VideoLengthOption, ScriptTone } from '../types';

export const NewProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { createProject } = useProjects();

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [targetAudience, setTargetAudience] = useState<AudienceType>('Technical Evaluators');
  const [videoLength, setVideoLength] = useState<VideoLengthOption>('60s');
  const [tone, setTone] = useState<ScriptTone>('professional');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([
    'Core Feature',
    'Onboarding',
  ]);

  // Loading & Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logMessages, setLogMessages] = useState<{ time: string; tag: string; msg: string; color: string }[]>([]);

  const presets = [
    { label: 'Linear', url: 'https://linear.app', tag: 'Issue Tracker', color: 'border-violet-300 text-violet-700 bg-violet-50/80' },
    { label: 'Supabase', url: 'https://supabase.com', tag: 'Postgres & Auth', color: 'border-emerald-300 text-emerald-700 bg-emerald-50/80' },
    { label: 'Stripe', url: 'https://stripe.com', tag: 'Billing API', color: 'border-indigo-300 text-indigo-700 bg-indigo-50/80' },
    { label: 'PostHog', url: 'https://posthog.com', tag: 'Product Analytics', color: 'border-amber-300 text-amber-700 bg-amber-50/80' },
    { label: 'Cal.com', url: 'https://cal.com', tag: 'Scheduling', color: 'border-cyan-300 text-cyan-700 bg-cyan-50/80' },
  ];

  const focusOptions = [
    { name: 'Core Feature', color: 'bg-violet-50 text-violet-800 border-violet-200/90' },
    { name: 'Onboarding', color: 'bg-emerald-50 text-emerald-800 border-emerald-200/90' },
    { name: 'Admin & Settings', color: 'bg-purple-50 text-purple-800 border-purple-200/90' },
    { name: 'Analytics & Reports', color: 'bg-amber-50 text-amber-800 border-amber-200/90' },
    { name: 'Integrations', color: 'bg-cyan-50 text-cyan-800 border-cyan-200/90' },
  ];

  const pipelineSteps: StepItem[] = [
    { id: '1', label: 'Exploring application…', sublabel: 'Launching headless browser & mapping DOM tree' },
    { id: '2', label: 'Discovering workflows…', sublabel: 'Extracting interactive action sequences' },
    { id: '3', label: 'Ranking workflows…', sublabel: 'Evaluating instructional & explanatory value' },
    { id: '4', label: 'Generating script…', sublabel: 'Mathematically grounding narration to selectors' },
    { id: '5', label: 'Composing video…', sublabel: 'Synthesizing voiceover & scene highlights' },
  ];

  const handleToggleFocus = (area: string) => {
    if (selectedFocusAreas.includes(area)) {
      if (selectedFocusAreas.length > 1) {
        setSelectedFocusAreas(selectedFocusAreas.filter((a) => a !== area));
      }
    } else {
      setSelectedFocusAreas([...selectedFocusAreas, area]);
    }
  };

  const getTimeString = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsProcessing(true);
    setCurrentStepIndex(0);
    setProgress(8);
    setLogMessages([
      { time: getTimeString(), tag: 'INIT', msg: `Initialized headless exploration container for ${url}`, color: 'text-violet-400' }
    ]);

    const newProject = await createProject({
      url,
      name: name.trim() || undefined,
      targetAudience,
      videoLength,
      focusAreas: selectedFocusAreas,
      tone,
    });

    const stages = [
      {
        step: 0,
        progress: 24,
        delay: 800,
        log: { time: getTimeString(), tag: 'BROWSER', msg: `Navigated to ${url}. Loaded 1,420 DOM interactive elements.`, color: 'text-cyan-400' },
      },
      {
        step: 1,
        progress: 48,
        delay: 1700,
        log: { time: getTimeString(), tag: 'STATE-GRAPH', msg: `Synthesized interaction DAG with 3 candidate user paths.`, color: 'text-emerald-400' },
      },
      {
        step: 2,
        progress: 72,
        delay: 2600,
        log: { time: getTimeString(), tag: 'RANKER', msg: `Ranked primary workflow with 0.94 explanatory score.`, color: 'text-amber-400' },
      },
      {
        step: 3,
        progress: 88,
        delay: 3500,
        log: { time: getTimeString(), tag: 'SYNTHESIS', msg: `Grounded 12 narration tokens directly to target CSS selectors.`, color: 'text-purple-400' },
      },
      {
        step: 4,
        progress: 100,
        delay: 4300,
        log: { time: getTimeString(), tag: 'RENDER', msg: `Synthesized 1080p video with ElevenLabs neural voiceover. Done!`, color: 'text-rose-400' },
      },
    ];

    stages.forEach((s) => {
      setTimeout(() => {
        setCurrentStepIndex(s.step);
        setProgress(s.progress);
        setLogMessages((prev) => [...prev, s.log]);
      }, s.delay);
    });

    setTimeout(() => {
      navigate(`/project/${newProject.id}`);
    }, 5000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl">
        
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Top Decorative Spark */}
          <div className="absolute top-0 right-0 p-8 opacity-15 pointer-events-none">
            <Sparkles className="w-32 h-32 text-violet-500" />
          </div>

          <div className="max-w-xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200/80">
              Autonomous Video Pipeline
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Create New Explainer Project
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Paste your product’s website or web application URL. ExplainerAI will autonomously explore the interface, discover key workflows, and generate a grounded explainer video.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prominent URL Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Paste your product URL
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-cyan-600">
                  <Globe className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-saas-product.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/90 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-mono font-medium shadow-xs"
                />
              </div>

              {/* Preset 1-Click Suggestions with colorful badges */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs text-slate-500">
                <span className="font-bold text-slate-600">Preset Samples:</span>
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setUrl(preset.url);
                      setName(preset.label);
                    }}
                    className={`px-3 py-1 rounded-xl transition-all font-semibold border ${preset.color} hover:scale-105 shadow-2xs`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Collapsible Advanced Settings (Target audience, length, focus) */}
            <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/60">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                <span>Advanced Exploration & Video Configuration</span>
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 space-y-4 text-xs overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Project Name (Optional Override) */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Product Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Linear, Acme Analytics"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                        />
                      </div>

                      {/* Target Audience */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Target Persona
                        </label>
                        <select
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value as AudienceType)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 font-medium"
                        >
                          <option value="Technical Evaluators">Technical Evaluators</option>
                          <option value="New users">New Users & Signups</option>
                          <option value="Admins">Admins & Decision Makers</option>
                          <option value="Power users">Power Users & Developers</option>
                        </select>
                      </div>

                      {/* Video Length */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Target Video Duration
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {(['30s', '60s', '90s', '120s'] as const).map((len) => (
                            <button
                              key={len}
                              type="button"
                              onClick={() => setVideoLength(len)}
                              className={`py-1.5 rounded-xl font-bold transition-all ${
                                videoLength === len
                                  ? 'bg-violet-600 text-white shadow-xs'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {len}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tone */}
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Narration Tone
                        </label>
                        <select
                          value={tone}
                          onChange={(e) => setTone(e.target.value as ScriptTone)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 capitalize font-medium"
                        >
                          <option value="professional">Professional & Crisp</option>
                          <option value="friendly">Friendly & Casual</option>
                          <option value="technical">Technical & In-depth</option>
                          <option value="executive">Executive & ROI focused</option>
                        </select>
                      </div>
                    </div>

                    {/* Focus Areas Multi-select with vibrant chips */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1.5">
                        Workflow Focus Areas (Select at least one)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {focusOptions.map((opt) => {
                          const isSelected = selectedFocusAreas.includes(opt.name);
                          return (
                            <button
                              key={opt.name}
                              type="button"
                              onClick={() => handleToggleFocus(opt.name)}
                              className={`px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                                isSelected
                                  ? opt.color + ' ring-2 ring-violet-400/30 shadow-2xs scale-105'
                                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {opt.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Primary Action CTA */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full justify-center py-4 text-base shadow-xl shadow-violet-600/25 font-bold"
              >
                Generate Demo
              </Button>
            </div>
          </form>
        </motion.div>

      </div>

      {/* Multi-Stage Full Screen Processing Simulation Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl border border-slate-100 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-violet-600/30">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Synthesizing Explainer for {name || url}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Autonomous state exploration & multi-modal rendering
                    </p>
                  </div>
                </div>

                <Loader2 className="w-5 h-5 text-violet-600 animate-spin" />
              </div>

              {/* Progress Bar with vibrant fill */}
              <ProgressBar
                progress={progress}
                showLabel
                label="Autonomous Discovery Pipeline"
                size="md"
                color="indigo"
              />

              {/* Stepper Breakdown */}
              <div className="py-2">
                <StepIndicator
                  steps={pipelineSteps}
                  currentStepIndex={currentStepIndex}
                />
              </div>

              {/* Live Crawler Console Log Stream with colorful syntax */}
              <div className="rounded-2xl bg-slate-950 p-4 font-mono text-[11px] text-slate-300 space-y-1.5 max-h-36 overflow-y-auto border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between text-slate-500 font-bold mb-2 border-b border-slate-800/80 pb-1 text-[10px]">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <Terminal className="w-3 h-3 text-emerald-400" />
                    <span>AUTONOMOUS AGENT TELEMETRY</span>
                  </div>
                  <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                    <Zap className="w-3 h-3" /> LIVE
                  </span>
                </div>
                {logMessages.map((entry, idx) => (
                  <div key={idx} className="leading-tight flex items-start gap-2">
                    <span className="text-slate-600 text-[10px]">{entry.time}</span>
                    <span className={`font-bold text-[10px] ${entry.color}`}>[{entry.tag}]</span>
                    <span className="text-slate-200">{entry.msg}</span>
                  </div>
                ))}
              </div>

              <div className="text-center text-xs text-slate-400 font-medium">
                Redirecting to project workspace upon pipeline completion...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
