import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../context/ProjectContext';
import { Workflow } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { OverviewTab } from '../components/project-detail/OverviewTab';
import { WorkflowsTab } from '../components/project-detail/WorkflowsTab';
import { ScriptTab } from '../components/project-detail/ScriptTab';
import { VideoTab } from '../components/project-detail/VideoTab';
import { WorkflowDetailModal } from '../components/project-detail/WorkflowDetailModal';
import {
  ArrowLeft,
  ExternalLink,
  RotateCw,
  Share2,
  Trash2,
  Layers,
  GitFork,
  FileText,
  Video,
  Check
} from 'lucide-react';

type TabType = 'overview' | 'workflows' | 'script' | 'video';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById, deleteProject, showToast } = useProjects();

  const project = id ? getProjectById(id) : undefined;

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedWorkflowForModal, setSelectedWorkflowForModal] = useState<Workflow | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">
          The requested project does not exist or may have been deleted.
        </p>
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    showToast('Project link copied to clipboard!');
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    showToast('Regenerating workflows & script grounded to target DOM...');
    setTimeout(() => {
      setIsRegenerating(false);
      showToast('Project telemetry & narration refreshed!');
    }, 1200);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layers, count: null },
    { id: 'workflows', label: 'Workflows', icon: GitFork, count: project.workflowsCount },
    { id: 'script', label: 'Script', icon: FileText, count: `${project.script.wordCount}w` },
    { id: 'video', label: 'Video Studio', icon: Video, count: project.videoDuration },
  ] as const;

  const getFaviconUrl = (domain: string) => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Back to Dashboard Breadcrumb */}
      <div>
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </button>
      </div>

      {/* Project Header Banner with subtle colorful top gradient */}
      <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500" />

        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Left Side: Brand Logo, Domain, Status */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 p-2.5 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <img
                src={getFaviconUrl(project.domain)}
                alt={project.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {project.name}
                </h1>
                <Badge
                  variant={project.status === 'Completed' ? 'emerald' : 'amber'}
                  dot
                  size="md"
                >
                  {project.status}
                </Badge>
                <Badge variant="cyan" size="sm">
                  {Math.round(project.explanatoryScore * 100)}% Explanatory Score
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-violet-700 flex items-center gap-1 font-mono transition-colors font-medium text-slate-600"
                >
                  <span>{project.url}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <span>•</span>
                <span>Target: <strong className="text-slate-800">{project.targetAudience}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRegenerate}
              disabled={isRegenerating}
              icon={<RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-violet-600' : ''}`} />}
            >
              Regenerate
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleShare}
              icon={copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-cyan-600" />}
            >
              {copiedShare ? 'Copied' : 'Share'}
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              icon={<Trash2 className="w-3.5 h-3.5" />}
            >
              Delete
            </Button>
          </div>

        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-b border-slate-200/90 flex items-center gap-2 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`relative flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'text-violet-700'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 rounded-t-xl'
              }`}
            >
              <tab.icon
                className={`w-4 h-4 ${
                  isActive ? 'text-violet-600' : 'text-slate-400'
                }`}
              />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    isActive
                      ? 'bg-violet-100 text-violet-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {activeTab === 'overview' && (
            <OverviewTab
              project={project}
              onSelectTab={(tab) => setActiveTab(tab)}
              onInspectWorkflow={(wf) => setSelectedWorkflowForModal(wf)}
            />
          )}

          {activeTab === 'workflows' && (
            <WorkflowsTab
              workflows={project.workflows}
              onInspectWorkflow={(wf) => setSelectedWorkflowForModal(wf)}
            />
          )}

          {activeTab === 'script' && <ScriptTab project={project} />}

          {activeTab === 'video' && <VideoTab project={project} />}
        </motion.div>
      </AnimatePresence>

      {/* Workflow Detail Modal */}
      <WorkflowDetailModal
        isOpen={Boolean(selectedWorkflowForModal)}
        onClose={() => setSelectedWorkflowForModal(null)}
        workflow={selectedWorkflowForModal}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          deleteProject(project.id);
          navigate('/dashboard');
        }}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${project.name}"? This action cannot be undone.`}
        confirmText="Delete Project"
      />

    </div>
  );
};
