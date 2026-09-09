import React, { useState } from 'react';
import { Project } from '../../types';
import { InteractiveVideoPlayer } from '../video/InteractiveVideoPlayer';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useProjects } from '../../context/ProjectContext';
import {
  Download,
  Share2,
  Code,
  Check,
  Radio
} from 'lucide-react';
import { Modal } from '../common/Modal';

export interface VideoTabProps {
  project: Project;
}

export const VideoTab: React.FC<VideoTabProps> = ({ project }) => {
  const { showToast } = useProjects();
  const [copiedLink, setCopiedLink] = useState(false);
  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Shareable video preview link copied!');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownload = () => {
    showToast(`Downloading "${project.name}-explainer.mp4" (1080p 60fps)...`);
  };

  const embedCode = `<iframe src="${window.location.origin}/embed/${project.id}" width="100%" height="480" frameborder="0" allowfullscreen></iframe>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    showToast('Embed snippet copied!');
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Video Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              {project.video.title}
            </h3>
            <Badge variant="cyan" size="sm">
              {project.video.aspectRatio}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1 font-bold text-slate-800">
              <Radio className="w-3.5 h-3.5 text-cyan-600" />
              {project.video.resolution}
            </span>
            <span>•</span>
            <span>Voice Model: <strong className="text-violet-700 font-bold">{project.video.voiceoverModel}</strong></span>
          </div>
        </div>

        {/* Video Actions */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setEmbedModalOpen(true)}
            icon={<Code className="w-3.5 h-3.5" />}
          >
            Embed
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            icon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-cyan-600" />}
          >
            {copiedLink ? 'Link Copied' : 'Share'}
          </Button>

          <Button
            variant="gradient"
            size="sm"
            onClick={handleDownload}
            icon={<Download className="w-3.5 h-3.5" />}
            className="shadow-md shadow-violet-600/25 font-bold"
          >
            Download MP4
          </Button>
        </div>
      </div>

      {/* Interactive Video Player Canvas */}
      <InteractiveVideoPlayer
        video={project.video}
        workflows={project.workflows}
      />

      {/* Embed Modal */}
      <Modal
        isOpen={embedModalOpen}
        onClose={() => setEmbedModalOpen(false)}
        title="Embed Video on Landing Page or Docs"
        description="Paste this responsive iframe tag directly into your documentation or marketing page."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-3.5 bg-slate-950 rounded-2xl font-mono text-xs text-cyan-300 border border-slate-800 break-all select-all">
            {embedCode}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEmbedModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={handleCopyEmbed}
              icon={copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
            >
              {copiedEmbed ? 'Snippet Copied' : 'Copy HTML'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
