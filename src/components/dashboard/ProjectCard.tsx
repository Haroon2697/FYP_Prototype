import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MoreVertical,
  Play,
  Copy,
  Trash2,
  ExternalLink,
  GitFork,
  Clock,
  Sparkles,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Project } from '../../types';
import { Badge } from '../common/Badge';
import { useProjects } from '../../context/ProjectContext';
import { ConfirmDialog } from '../common/ConfirmDialog';

export interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const { duplicateProject, deleteProject } = useProjects();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formattedDate = new Date(project.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const getFaviconUrl = (domain: string) => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  };

  // Get distinctive gradient accent bar based on domain/name
  const getAccentGradient = (domain: string) => {
    if (domain.includes('linear')) return 'from-violet-600 via-indigo-600 to-purple-600';
    if (domain.includes('supabase')) return 'from-emerald-500 via-teal-500 to-cyan-500';
    if (domain.includes('stripe')) return 'from-indigo-600 via-violet-600 to-purple-600';
    if (domain.includes('posthog')) return 'from-amber-500 via-orange-500 to-rose-500';
    if (domain.includes('cal')) return 'from-cyan-500 via-sky-500 to-blue-600';
    if (domain.includes('resend')) return 'from-fuchsia-500 via-pink-500 to-rose-500';
    return 'from-violet-600 via-indigo-600 to-cyan-500';
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="group relative flex flex-col justify-between bg-white rounded-3xl border border-slate-200/90 hover:border-violet-300 shadow-sm hover:shadow-premium transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/project/${project.id}`)}
      >
        {/* Top vibrant hairline accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${getAccentGradient(project.domain)}`} />

        {/* Card Header & Content */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-3">
            
            {/* Domain Favicon & Title */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-violet-200 group-hover:bg-violet-50/50 transition-all duration-200 shadow-2xs">
                <img
                  src={getFaviconUrl(project.domain)}
                  alt={project.name}
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-violet-700 transition-colors truncate tracking-tight">
                  {project.name}
                </h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors truncate font-mono mt-0.5"
                >
                  <span>{project.domain}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Status & Menu */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Badge
                variant={project.status === 'Completed' ? 'emerald' : 'amber'}
                dot
                size="sm"
              >
                {project.status}
              </Badge>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                  }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 4 }}
                      className="absolute right-0 mt-1 w-44 rounded-2xl bg-white p-1.5 shadow-2xl border border-slate-200 z-30 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          navigate(`/project/${project.id}`);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-left font-medium"
                      >
                        <Play className="w-3.5 h-3.5 text-violet-600" />
                        <span>Open Details</span>
                      </button>

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          duplicateProject(project.id);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-left font-medium"
                      >
                        <Copy className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Duplicate</span>
                      </button>

                      <div className="my-1 border-t border-slate-100" />

                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          setDeleteDialogOpen(true);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Delete</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Tagline / Summary */}
          <p className="mt-3.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Middle Telemetry / Explanatory Metrics */}
        <div className="px-6 py-3 bg-slate-50/80 border-y border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <GitFork className="w-3.5 h-3.5 text-violet-600" />
            <span>{project.workflowsCount} Workflows</span>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            <span>{project.videoDuration}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200/90 text-[11px] shadow-2xs">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>{Math.round(project.explanatoryScore * 100)}% Score</span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-5 pt-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 group-hover:text-violet-900 group-hover:translate-x-0.5 transition-all">
            <span>Inspect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </motion.div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => deleteProject(project.id)}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.name}" (${project.domain})? This will remove all discovered workflows, grounded scripts, and video metadata.`}
        confirmText="Delete Project"
      />
    </>
  );
};
