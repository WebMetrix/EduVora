import React, { useRef } from 'react';
import { Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

export default function ProfilePictureCard({ avatar, onAvatarChange, onAvatarRemove }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && onAvatarChange) {
          onAvatarChange(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group">
      {/* Glow flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100/90 mb-5">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
          <ImageIcon className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="text-[15px] font-extrabold text-slate-900 tracking-tight">
          Profile Picture
        </h3>
      </div>

      <div className="flex items-center gap-4 sm:gap-5">
        {/* Avatar Display */}
        <div className="relative shrink-0">
          <img
            src={avatar}
            alt="Profile Avatar"
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
          />
        </div>

        {/* Action Buttons & Note */}
        <div className="flex flex-col gap-2 min-w-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
          />

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-indigo-300/90 bg-white hover:bg-indigo-50/70 text-indigo-700 font-bold text-[12px] shadow-2xs hover:border-indigo-500 transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Change Photo</span>
            </button>

            <button
              type="button"
              onClick={onAvatarRemove}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200/90 bg-white hover:bg-rose-50/70 text-rose-600 font-bold text-[12px] shadow-2xs hover:border-rose-400 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Remove</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 font-medium">
            Allowed formats: JPG, PNG (Max 2MB)
          </p>
        </div>
      </div>
    </div>
  );
}
