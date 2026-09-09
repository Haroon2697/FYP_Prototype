import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoData, Workflow } from '../../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Layers,
  MousePointer,
  Radio,
  Sliders
} from 'lucide-react';

export interface InteractiveVideoPlayerProps {
  video: VideoData;
  workflows: Workflow[];
}

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({
  video,
  workflows,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);

  const lastTickRef = useRef<number>(Date.now());

  // Find active scene based on currentTime
  const activeScene =
    video.scenes.find(
      (s) => currentTime >= s.startTime && currentTime < s.endTime
    ) || video.scenes[video.scenes.length - 1];

  // Find associated workflow step if any
  const allSteps = workflows.flatMap((w) => w.steps);
  const activeStep = allSteps.find((st) => st.id === activeScene?.workflowStepId);

  // Playback timer tick
  useEffect(() => {
    if (isPlaying) {
      lastTickRef.current = Date.now();
      const interval = setInterval(() => {
        const now = Date.now();
        const delta = (now - lastTickRef.current) / 1000;
        lastTickRef.current = now;

        setCurrentTime((prev) => {
          const next = prev + delta * playbackSpeed;
          if (next >= video.durationSeconds) {
            setIsPlaying(false);
            return video.durationSeconds;
          }
          return next;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isPlaying, playbackSpeed, video.durationSeconds]);

  const togglePlay = () => {
    if (currentTime >= video.durationSeconds) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Video Canvas Container with Cinematic Ambient Glow */}
      <div className="relative rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden aspect-[16/9] flex flex-col group select-none">
        
        {/* Animated Virtual Screen / Explainer Scene */}
        <div className="relative flex-1 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6 flex flex-col justify-between overflow-hidden">
          
          {/* Top Bar: Simulated SaaS Navbar with Explainer Live Overlay */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                {activeScene?.title || video.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-violet-950/90 text-cyan-300 border border-violet-800 flex items-center gap-1">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                {video.resolution}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {formatSeconds(currentTime)} / {formatSeconds(video.durationSeconds)}
              </span>
            </div>
          </div>

          {/* Center Stage: Simulated UI Interaction & Highlights */}
          <div className="relative flex-1 my-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 flex flex-col justify-center items-center">
            
            {/* Visual SaaS Wireframe Representation */}
            <div className="w-full max-w-lg space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold">
                    E
                  </div>
                  <div className="w-24 h-2.5 bg-slate-700 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-slate-800 rounded-full" />
                  <div className="px-2.5 py-1 bg-violet-500/20 border border-violet-500/40 rounded-lg text-[10px] text-violet-300 flex items-center justify-center font-bold">
                    Target UI View
                  </div>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 rounded-xl bg-slate-800/40 border border-slate-700/50 p-3 space-y-2">
                  <div className="w-14 h-2 bg-cyan-400/80 rounded" />
                  <div className="w-full h-1.5 bg-slate-700/60 rounded" />
                  <div className="w-3/4 h-1.5 bg-slate-700/60 rounded" />
                </div>
                <div className="h-20 rounded-xl bg-slate-800/40 border border-slate-700/50 p-3 space-y-2">
                  <div className="w-20 h-2 bg-violet-400/80 rounded" />
                  <div className="w-full h-1.5 bg-slate-700/60 rounded" />
                  <div className="w-1/2 h-1.5 bg-slate-700/60 rounded" />
                </div>
              </div>
            </div>

            {/* Glowing Focus Callout if activeStep exists */}
            <AnimatePresence>
              {activeStep && (
                <motion.div
                  key={activeStep.id}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  className="absolute inset-x-8 top-12 p-3.5 rounded-2xl bg-slate-950/95 border border-cyan-500/80 shadow-glow-cyan backdrop-blur-md flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                      {activeStep.stepNumber}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{activeStep.action}</span>
                      </div>
                      <div className="font-mono text-[10px] text-cyan-300 mt-0.5">
                        {activeStep.targetElement}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/80">
                    Step Grounded
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Subtitle / Narration Banner */}
          <div className="min-h-[44px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene?.id || 'none'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="px-5 py-2.5 rounded-2xl bg-black/80 backdrop-blur-md border border-slate-700 text-center max-w-xl shadow-xl"
              >
                <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
                  "{activeScene?.narration}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Video Controls Bar */}
        <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex flex-col gap-2">
          
          {/* Progress / Scrubber Bar */}
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={video.durationSeconds}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:h-2 transition-all"
            />
            {/* Scene Milestone Dots */}
            {video.scenes.map((scene) => (
              <div
                key={scene.id}
                style={{
                  left: `${(scene.startTime / video.durationSeconds) * 100}%`,
                }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950 pointer-events-none"
                title={scene.title}
              />
            ))}
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between pt-1 text-slate-400 text-xs">
            <div className="flex items-center gap-3">
              {/* Play / Pause with colorful gradient button */}
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/30 transition-transform active:scale-95 cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              {/* Restart */}
              <button
                onClick={handleRestart}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Mute toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Timestamp */}
              <span className="font-mono text-slate-200 font-bold">
                {formatSeconds(currentTime)}{' '}
                <span className="text-slate-500 font-normal">/ {formatSeconds(video.durationSeconds)}</span>
              </span>
            </div>

            {/* Right side: Speed and Audio indicator */}
            <div className="flex items-center gap-3">
              {/* Multi-color audio waveform animation */}
              {isPlaying && (
                <div className="hidden sm:flex items-center gap-1 h-5 px-2.5 py-1 bg-slate-800/90 rounded-lg border border-slate-700/60">
                  <span className="w-0.5 h-3 bg-violet-400 animate-pulse" />
                  <span className="w-0.5 h-4 bg-cyan-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-2.5 bg-emerald-400 animate-pulse delay-150" />
                  <span className="w-0.5 h-3.5 bg-amber-400 animate-pulse delay-100" />
                  <span className="text-[10px] text-cyan-300 ml-1.5 font-mono font-bold">Neural Speech</span>
                </div>
              )}

              {/* Speed selector */}
              <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-0.5">
                {([1, 1.25, 1.5] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                      playbackSpeed === spd
                        ? 'bg-violet-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Video Scene Timeline Cards with distinctive highlights */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 space-y-3.5 shadow-2xs">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-violet-600" />
            <span>Scene Breakdown ({video.scenes.length} Scenes)</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Click scene to jump timestamp</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {video.scenes.map((sc, i) => {
            const isCurrent =
              currentTime >= sc.startTime && currentTime < sc.endTime;

            return (
              <button
                key={sc.id}
                onClick={() => {
                  setCurrentTime(sc.startTime);
                  setIsPlaying(true);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-gradient-to-br from-violet-50 via-cyan-50/50 to-white border-violet-300 ring-2 ring-violet-500/20 shadow-xs'
                    : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-extrabold text-violet-700">Scene {i + 1}</span>
                  <span className="font-mono text-slate-400 font-semibold">
                    {formatSeconds(sc.startTime)}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">
                  {sc.title}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                  {sc.narration}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
