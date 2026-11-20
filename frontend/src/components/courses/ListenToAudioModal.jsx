import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Play, Pause, SkipBack, SkipForward, 
  CheckCircle2, ChevronDown, AlertCircle, Headphones, Music
} from 'lucide-react';

export default function ListenToAudioModal({ 
  isOpen, 
  onClose, 
  chapterNumber = "N/A",
  chapterTitle = "N/A",
  chapterDesc = "N/A",
  audioUrlPath = null,
  audioDurationSeconds = 0
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Total duration from database or 0
  const totalSeconds = Number(audioDurationSeconds) || 0;
  const currentSeconds = totalSeconds > 0 ? Math.floor((progress / 100) * totalSeconds) : 0;

  const formatTime = (secs) => {
    if (!secs || secs <= 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      // Reset play state if no audio track exists
      if (!audioUrlPath && totalSeconds <= 0) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
      setIsPlaying(false);
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, audioUrlPath, totalSeconds]);

  // Simulated playback ticker (if duration is available)
  useEffect(() => {
    let interval;
    if (isOpen && isPlaying && totalSeconds > 0) {
      const speedMultiplier = parseFloat(playbackSpeed) || 1;
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const step = (1 / totalSeconds) * 100 * speedMultiplier;
          return Math.min(100, prev + step);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed, totalSeconds]);

  if (!isOpen) return null;

  const speeds = ['0.75x', '1.0x', '1.25x', '1.5x', '2.0x'];

  const skipSeconds = (secs) => {
    if (totalSeconds <= 0) return;
    const percentChange = (secs / totalSeconds) * 100;
    setProgress((p) => Math.min(100, Math.max(0, p + percentChange)));
  };

  const hasAudio = !!audioUrlPath || totalSeconds > 0;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full md:max-w-[560px] bg-white rounded-t-3xl md:rounded-[28px] shadow-2xl flex flex-col mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in border-t md:border border-slate-100 max-h-[92vh]">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header with Title & Close Button */}
        <div className="flex items-center justify-between px-5 md:px-7 py-3 border-b border-slate-100">
          <h3 className="text-[16px] md:text-[20px] font-black text-slate-900 tracking-tight">
            Listen to Audio
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close audio player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 md:p-7 flex flex-col gap-5 md:gap-6 overflow-y-auto custom-scrollbar">
          
          {/* Track Artwork & Info Row */}
          <div className="flex items-center sm:items-start gap-4 sm:gap-5">
            {/* Dynamic Artwork Card / Placeholder */}
            <div className="w-[92px] h-[92px] sm:w-[130px] sm:h-[130px] rounded-2xl overflow-hidden relative shrink-0 shadow-md border border-slate-200/60 group bg-slate-900 flex items-center justify-center p-2 text-center">
              {audioUrlPath && typeof audioUrlPath === 'string' && (audioUrlPath.endsWith('.jpg') || audioUrlPath.endsWith('.png') || audioUrlPath.endsWith('.webp')) ? (
                <>
                  <img
                    src={audioUrlPath}
                    alt="Chapter Artwork"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Number badge on artwork */}
                  <div className="absolute top-2 left-2 text-white font-black text-[22px] sm:text-[28px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {chapterNumber || "N/A"}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1.5 text-slate-400">
                  <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-300">
                    Ch {chapterNumber || "N/A"}
                  </span>
                  <span className="text-[8px] font-semibold text-slate-500 uppercase tracking-wider">
                    Artwork: N/A
                  </span>
                </div>
              )}
            </div>

            {/* Track Details */}
            <div className="flex flex-col text-left flex-1 min-w-0 pt-0.5">
              <span className="text-[11px] sm:text-[13px] font-bold text-indigo-600 mb-0.5 sm:mb-1">
                Chapter {chapterNumber || "N/A"}
              </span>
              <h4 className="text-[16px] sm:text-[20px] font-extrabold text-slate-900 leading-snug mb-1 sm:mb-2">
                {chapterTitle || "N/A"}
              </h4>
              <p className="text-[11px] sm:text-[13px] text-slate-500 font-medium leading-relaxed">
                {chapterDesc || "N/A"}
              </p>
            </div>
          </div>

          {/* Audio Unavailable Notice if no track in DB */}
          {!hasAudio && (
            <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center gap-2.5 text-amber-800 text-[12px] font-medium">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Audio track file is currently N/A for this chapter in the database.</span>
            </div>
          )}

          {/* Progress Bar & Timers */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-600 min-w-[34px] sm:min-w-[38px] text-right">
                {formatTime(currentSeconds)}
              </span>
              <div className="relative flex-1 flex items-center group py-1.5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  disabled={!hasAudio}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4f3bf3] focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                />
              </div>
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-600 min-w-[34px] sm:min-w-[38px]">
                {totalSeconds > 0 ? formatTime(totalSeconds) : 'N/A'}
              </span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-center gap-2.5 xs:gap-3.5 sm:gap-6 py-1">
            {/* Rewind 10s */}
            <button
              onClick={() => skipSeconds(-10)}
              disabled={!hasAudio}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Rewind 10 seconds"
              aria-label="Rewind 10 seconds"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 10A8 8 0 1 1 4.5 14" />
                <polyline points="1.5 6 4.5 10 8.5 7" />
                <text x="12" y="15" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="currentColor" stroke="none">10</text>
              </svg>
            </button>

            {/* Previous / Skip Back */}
            <button
              onClick={() => skipSeconds(-30)}
              disabled={!hasAudio}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Previous chapter"
              aria-label="Previous chapter"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>

            {/* Center Play/Pause Button */}
            <button
              onClick={() => {
                if (hasAudio) setIsPlaying(!isPlaying);
              }}
              disabled={!hasAudio}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#4f3bf3] hover:bg-[#4330ea] text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 shrink-0 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
              )}
            </button>

            {/* Next / Skip Forward */}
            <button
              onClick={() => skipSeconds(30)}
              disabled={!hasAudio}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Next chapter"
              aria-label="Next chapter"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </button>

            {/* Forward 10s */}
            <button
              onClick={() => skipSeconds(10)}
              disabled={!hasAudio}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all active:scale-95 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Forward 10 seconds"
              aria-label="Forward 10 seconds"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19.5 10A8 8 0 1 0 19.5 14" />
                <polyline points="22.5 6 19.5 10 15.5 7" />
                <text x="12" y="15" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="currentColor" stroke="none">10</text>
              </svg>
            </button>

            {/* Speed Selector Dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="px-2.5 py-1.5 border border-slate-200 hover:border-slate-300 rounded-xl text-[11px] sm:text-[12px] font-bold text-slate-700 flex items-center gap-1 transition-colors bg-white shadow-2xs active:scale-95 cursor-pointer"
              >
                <span>{playbackSpeed}</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              </button>

              {showSpeedMenu && (
                <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-1.5 w-24 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30 animate-fade-in">
                  {speeds.map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        setPlaybackSpeed(spd);
                        setShowSpeedMenu(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-[11px] sm:text-[12px] font-bold transition-colors flex items-center justify-between cursor-pointer ${
                        playbackSpeed === spd
                          ? 'text-indigo-600 bg-indigo-50/70 font-extrabold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{spd}</span>
                      {playbackSpeed === spd && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>,
    document.body
  );
}
