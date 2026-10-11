import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Headphones, CheckCircle2 } from 'lucide-react';

export default function AudioPlayerModal({ isOpen, onClose, item, packageData }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const totalSeconds = 18 * 60; // 18 mins default

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setProgress(25);
    }
  }, [isOpen, item]);

  // Simulate progress when playing
  useEffect(() => {
    let interval;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.25 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed]);

  if (!isOpen || !item) return null;

  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const speeds = [1, 1.25, 1.5, 2];
  const cycleSpeed = () => {
    const idx = speeds.indexOf(playbackSpeed);
    const nextIdx = (idx + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Audio Player Sheet / Card */}
      <div className="relative z-10 w-full sm:max-w-md bg-white rounded-t-[28px] sm:rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Mobile drag handle */}
        <div className="w-full flex justify-center pt-3 pb-1 sm:hidden bg-white shrink-0" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[12px] uppercase tracking-wider">
            <Headphones className="w-4 h-4" />
            <span>Audio Masterclass</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Artwork & Track Information */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* Cover Thumbnail */}
          <div className="w-28 h-36 rounded-2xl overflow-hidden shadow-lg shadow-indigo-950/20 mb-4 border border-slate-200/60 relative group">
            <img
              src={packageData?.image}
              alt={packageData?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-indigo-900/10" />
          </div>

          <span className="text-[12px] font-bold text-indigo-600 uppercase tracking-wider mb-0.5">
            {item.number} • {item.duration || '18m audio'}
          </span>
          <h3 className="text-[18px] font-extrabold text-slate-900 leading-snug mb-1">
            {item.title}
          </h3>
          <p className="text-[12px] text-slate-500 font-medium max-w-xs mb-4">
            {packageData?.title}
          </p>

          {/* Animated Waveform Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-8 my-2">
            {[40, 75, 25, 90, 60, 100, 30, 80, 50, 95, 70, 35, 85, 45, 65].map((height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying ? 'bg-indigo-600 animate-pulse' : 'bg-slate-300'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(16, (height * progress) % 32)}px` : '10px',
                  animationDelay: `${i * 80}ms`
                }}
              />
            ))}
          </div>

          {/* Scrubber Bar */}
          <div className="w-full flex flex-col gap-1.5 mt-4">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>{formatTime(currentSeconds)}</span>
              <span>{formatTime(totalSeconds)}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between w-full mt-4 px-2">
            <button
              onClick={cycleSpeed}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-bold transition-colors"
            >
              {playbackSpeed}x
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setProgress((p) => Math.max(0, p - 5))}
                className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
                title="Rewind 15 seconds"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              <button
                onClick={() => setProgress((p) => Math.min(100, p + 5))}
                className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
                title="Forward 15 seconds"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Background playback active</span>
          </div>
          <button
            onClick={onClose}
            className="font-bold text-indigo-600 hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
