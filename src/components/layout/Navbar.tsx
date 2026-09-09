import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Bell,
  ChevronDown,
  RotateCcw,
  BookOpen,
  FolderDot,
  Layers,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Video
} from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetToDefaults } = useProjects();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: FolderDot },
    { name: 'New Project', path: '/new', icon: Plus },
    { name: 'Architecture', path: '/#features', icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      {/* Top micro-gradient hairline for high-end polish */}
      <div className="h-0.5 w-full bg-gradient-to-r from-violet-600 via-cyan-500 to-amber-500 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-violet-600/20 group-hover:shadow-glow-violet transition-all duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                  <Video className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  Explainer<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600">AI</span>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-50 to-cyan-50 text-violet-700 border border-violet-200/80">
                    FYP
                  </span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide -mt-0.5">
                  Autonomous SaaS Discovery
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/70 rounded-xl border border-slate-200/60">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/dashboard'
                    ? location.pathname === '/dashboard' || location.pathname.startsWith('/project')
                    : location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-slate-900 bg-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <link.icon
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-violet-600' : 'text-slate-400'
                      }`}
                    />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* New Project CTA */}
            {location.pathname !== '/new' && (
              <Button
                variant="gradient"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => navigate('/new')}
                className="hidden sm:inline-flex shadow-sm font-semibold"
              >
                New Project
              </Button>
            )}

            {/* Notifications Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-colors border border-transparent hover:border-slate-200"
                title="Telemetry & Activity"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500 ring-2 ring-white" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 rounded-2xl bg-white p-3.5 shadow-2xl border border-slate-200/90 z-50"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                        Crawler Telemetry
                      </span>
                      <span className="text-[10px] text-violet-600 font-semibold cursor-pointer">
                        Clear all
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-violet-50/70 border border-violet-100 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-violet-900 mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Linear Exploration Complete</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          Discovered 3 high-value workflows with 0.96 explanatory score.
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">15m ago</span>
                      </div>

                      <div className="p-3 rounded-xl bg-cyan-50/50 border border-cyan-100 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-cyan-900 mb-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                          <span>DOM Evidence Verified</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          All narration sentences mathematically grounded to UI nodes.
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">1h ago</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-slate-100/80 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-xs">
                  EA
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    FYP Evaluator
                  </span>
                  <span className="text-[10px] text-slate-400">admin@explainer.ai</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200/90 z-50 text-xs"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1 bg-slate-50/60 rounded-xl">
                      <p className="font-bold text-slate-900">Final Year Project</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">ExplainerAI Prototype v1.2</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                    >
                      <FolderDot className="w-4 h-4 text-violet-500" />
                      <span>Projects Dashboard</span>
                    </Link>

                    <Link
                      to="/"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                    >
                      <ExternalLink className="w-4 h-4 text-cyan-500" />
                      <span>Public Landing Page</span>
                    </Link>

                    <button
                      onClick={() => {
                        window.open('https://demosmith.ai', '_blank');
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-left font-medium"
                    >
                      <BookOpen className="w-4 h-4 text-amber-500" />
                      <span>Reference (Demosmith.ai)</span>
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      onClick={() => {
                        resetToDefaults();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-700 hover:bg-rose-50 transition-colors text-left font-bold"
                    >
                      <RotateCcw className="w-4 h-4 text-rose-500" />
                      <span>Reset Demo Data</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
