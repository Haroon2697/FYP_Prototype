import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Play,
  ShieldCheck,
  Globe,
  Compass,
  Video,
  Target
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const featureCards = [
    {
      title: 'Autonomous Workflow Discovery',
      badge: 'Headless Crawler',
      badgeVariant: 'cyan' as const,
      description:
        'ExplainerAI crawls SaaS applications autonomously, analyzing DOM interactions, forms, and navigation graphs to identify key user journeys without manual scripting.',
      icon: Compass,
      gradient: 'from-cyan-500/15 to-blue-500/15',
      iconColor: 'text-cyan-600',
      accentBorder: 'hover:border-cyan-300',
    },
    {
      title: 'Evidence-Grounded Scripts',
      badge: 'Mathematical Verification',
      badgeVariant: 'emerald' as const,
      description:
        'Every single narration sentence is mathematically linked to actual DOM selectors, ensuring 100% factual accuracy and zero hallucinated UI actions.',
      icon: ShieldCheck,
      gradient: 'from-emerald-500/15 to-teal-500/15',
      iconColor: 'text-emerald-600',
      accentBorder: 'hover:border-emerald-300',
    },
    {
      title: 'One-Click Video Generation',
      badge: 'Multi-Modal Studio',
      badgeVariant: 'violet' as const,
      description:
        'Compiles high-resolution 1080p explainer videos with synchronized neural voiceovers, smooth cursor paths, and glowing bounding highlights.',
      icon: Video,
      gradient: 'from-blue-500/15 to-sky-500/15',
      iconColor: 'text-blue-600',
      accentBorder: 'hover:border-blue-300',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#f8fafc]">
      {/* Dynamic colorful ambient mesh background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-50 overflow-hidden">
        <div className="absolute -top-24 left-1/5 w-[500px] h-[500px] bg-gradient-to-tr from-violet-400 to-indigo-300 rounded-full blur-[140px] mix-blend-multiply" />
        <div className="absolute top-12 right-1/5 w-[450px] h-[450px] bg-gradient-to-bl from-cyan-300 to-blue-400 rounded-full blur-[140px] mix-blend-multiply" />
        <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gradient-to-r from-amber-200 to-rose-300 rounded-full blur-[130px] mix-blend-multiply opacity-60" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 sm:pt-28 sm:pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* FYP Project Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-violet-200/90 shadow-xs mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-500 ring-4 ring-cyan-100 animate-pulse" />
          <span className="text-xs font-bold text-slate-800">Final Year Project</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-violet-700 font-semibold">Autonomous SaaS Understanding</span>
        </motion.div>

        {/* Hero Title with distinctive color punch */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.12]"
        >
          Autonomous SaaS Understanding & <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500">
            Explainer Video Generation
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          ExplainerAI autonomously explores any SaaS application, discovers meaningful workflows,
          ranks them by explanatory value, and generates evidence-grounded explainer videos in minutes.
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="gradient"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => navigate('/new')}
            className="w-full sm:w-auto shadow-lg shadow-violet-600/25 text-base py-3.5 px-8"
          >
            Create New Project
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={<Play className="w-4 h-4 text-violet-600" />}
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto text-base py-3.5 px-8 font-bold"
          >
            Explore Dashboard
          </Button>
        </motion.div>

        {/* Interactive URL Bar Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 max-w-2xl mx-auto p-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2 group hover:border-violet-300 transition-all"
        >
          <div className="pl-3 text-cyan-600">
            <Globe className="w-5 h-5" />
          </div>
          <input
            type="text"
            readOnly
            value="https://linear.app"
            className="flex-1 bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-default font-mono"
          />
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-200">
            <span>Score: 0.96</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/new')}
            className="shadow-sm font-bold"
          >
            Generate Demo
          </Button>
        </motion.div>

      </section>

      {/* Feature Highlights Section (3 Cards inspired by Demosmith) */}
      <section id="features" className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="gradient" size="sm" className="mb-2">
              <Sparkles className="w-3 h-3 text-violet-600" />
              Core FYP Innovations
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Autonomous Intelligence Behind ExplainerAI
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Replacing manual screencasting with stateful DOM graph exploration and multi-modal grounding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative bg-slate-50/70 rounded-3xl border border-slate-200/90 p-8 shadow-xs hover:shadow-premium ${card.accentBorder} transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-2xs`}>
                    <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                  </div>

                  <Badge variant={card.badgeVariant} size="sm">
                    {card.badge}
                  </Badge>

                  <h3 className="text-lg font-bold text-slate-900 mt-3.5 group-hover:text-violet-700 transition-colors">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-500 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-bold text-violet-700">
                  <span>Explore in Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Technical Architecture Flow Banner */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute -top-40 right-10 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
              Autonomous Pipeline
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 text-white">
              From Raw SaaS URL to Verified Explainer Video
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-2.5 hover:border-cyan-500/50 transition-colors">
              <span className="text-cyan-400 font-mono text-xs font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Stage 01
              </span>
              <h4 className="font-bold text-sm text-white">Stateful DOM Crawl</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Headless browser navigates pages, identifies buttons, inputs, and builds an interaction transition graph.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-2.5 hover:border-emerald-500/50 transition-colors">
              <span className="text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Stage 02
              </span>
              <h4 className="font-bold text-sm text-white">Explanatory Ranking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Heuristic scoring rates workflows by user value, uniqueness, and instructional clarity.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-2.5 hover:border-violet-500/50 transition-colors">
              <span className="text-violet-400 font-mono text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Stage 03
              </span>
              <h4 className="font-bold text-sm text-white">Evidence Grounding</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Narration sentences are tied to bounding boxes and CSS selectors to guarantee factual fidelity.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-2.5 hover:border-amber-500/50 transition-colors">
              <span className="text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" /> Stage 04
              </span>
              <h4 className="font-bold text-sm text-white">Video Synthesis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Neural voiceover models sync with UI highlights to produce 1080p 60fps explainer media.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="shadow-xl shadow-violet-600/30 font-bold px-8"
            >
              Launch Dashboard Experience
            </Button>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800/90 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-sm">ExplainerAI</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Final Year Project Defense Prototype</span>
          </div>
          <div className="text-slate-500">
            Inspired by Demosmith UI/UX design language • React, TypeScript & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
};
