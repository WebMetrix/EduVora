import React, { useState, useEffect } from 'react';
import { 
  X, Play, Pause, SkipBack, SkipForward, 
  CheckCircle2, ChevronDown 
} from 'lucide-react';
import chapter1PlantImg from '../../assets/images/chapter1_plant.jpg';

export default function ListenToAudioModal({ 
  isOpen, 
  onClose, 
  chapterNumber = "01",
  chapterTitle = "What is Financial Freedom?",
  chapterDesc = "Listen to the audio version of this chapter and learn on the go."
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25.5); // ~02:15 of 08:45
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Total duration: 8m 45s = 525 seconds
  const totalSeconds = 8 * 60 + 45;
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Simulated playback ticker
  useEffect(() => {
    let interval;
    if (isOpen && isPlaying) {
      const speedMultiplier = parseFloat(playbackSpeed) || 1;
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + (0.19 * speedMultiplier);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed]);

  if (!isOpen) return null;

  const speeds = ['0.75x', '1.0x', '1.25x', '1.5x', '2.0x'];

  const skipSeconds = (secs) => {
    const percentChange = (secs / totalSeconds) * 100;
    setProgress((p) => Math.min(100, Math.max(0, p + percentChange)));
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-[560px] bg-white rounded-[24px] sm:rounded-[28px] shadow-2xl p-5 sm:p-7 flex flex-col gap-6 animate-slide-up border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-[19px] sm:text-[21px] font-black text-slate-900 tracking-tight">
            Listen to Audio
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close audio player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Artwork & Info Row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
          {/* Artwork Card */}
          <div className="w-[125px] h-[125px] sm:w-[140px] sm:h-[140px] rounded-2xl overflow-hidden relative shrink-0 shadow-md border border-slate-200/60 group bg-slate-900">
            <img
              src={chapter1PlantImg}
              alt="Chapter Artwork"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Number badge on artwork */}
            <div className="absolute top-2 left-2 text-white font-black text-[24px] sm:text-[28px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              {chapterNumber}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Track Details */}
          <div className="flex flex-col text-center sm:text-left flex-1 min-w-0 pt-1">
            <span className="text-[12px] sm:text-[13px] font-bold text-indigo-600 mb-1">
              Chapter {chapterNumber}
            </span>
            <h4 className="text-[18px] sm:text-[20px] font-extrabold text-slate-900 leading-snug mb-2">
              {chapterTitle}
            </h4>
            <p className="text-[12px] sm:text-[13px] text-slate-500 font-medium leading-relaxed">
              {chapterDesc}
            </p>
          </div>
        </div>

        {/* Progress Bar & Timers */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold text-slate-600 min-w-[38px] text-right">
              {formatTime(currentSeconds)}
            </span>
            <div className="relative flex-1 flex items-center group py-2">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4f3bf3] focus:outline-none"
              />
            </div>
            <span className="text-[12px] font-bold text-slate-600 min-w-[38px]">
              08:45
            </span>
          </div>
        </div>

        {/* Controls Row - Tightly grouped in center matching Image 1 */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 py-1">
          {/* Rewind 10s */}
          <button
            onClick={() => skipSeconds(-10)}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all active:scale-95 shrink-0"
            title="Rewind 10 seconds"
            aria-label="Rewind 10 seconds"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 10A8 8 0 1 1 4.5 14" />
              <polyline points="1.5 6 4.5 10 8.5 7" />
              <text x="12" y="15" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="currentColor" stroke="none">10</text>
            </svg>
          </button>

          {/* Previous / Skip Back */}
          <button
            onClick={() => skipSeconds(-30)}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all active:scale-95 shrink-0"
            title="Previous chapter"
            aria-label="Previous chapter"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Center Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-[#4f3bf3] hover:bg-[#4330ea] text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 shrink-0 hover:scale-105"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-0.5" />
            )}
          </button>

          {/* Next / Skip Forward */}
          <button
            onClick={() => skipSeconds(30)}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all active:scale-95 shrink-0"
            title="Next chapter"
            aria-label="Next chapter"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          {/* Forward 10s */}
          <button
            onClick={() => skipSeconds(10)}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-all active:scale-95 shrink-0"
            title="Forward 10 seconds"
            aria-label="Forward 10 seconds"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19.5 10A8 8 0 1 0 19.5 14" />
              <polyline points="22.5 6 19.5 10 15.5 7" />
              <text x="12" y="15" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="currentColor" stroke="none">10</text>
            </svg>
          </button>

          {/* Speed Selector Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="px-2.5 py-1.5 border border-slate-200 hover:border-slate-300 rounded-xl text-[12px] font-bold text-slate-700 flex items-center gap-1 transition-colors bg-white shadow-xs active:scale-95"
            >
              <span>{playbackSpeed}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showSpeedMenu && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 w-24 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-30 animate-fade-in">
                {speeds.map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      setPlaybackSpeed(spd);
                      setShowSpeedMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                      playbackSpeed === spd
                        ? 'bg-indigo-50 text-indigo-600 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Information Status Line */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-[12px]">
          <span className="font-semibold text-slate-600">
            Available in this chapter
          </span>
          <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
            <span>Audio is synchronized with eBook</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
          </div>
        </div>

      </div>
    </div>
  );
}
