import { Info } from 'lucide-react';

export default function NoteCard() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-100/50 flex items-center justify-center text-indigo-600 shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <div className="flex flex-col pt-1.5">
          <h3 className="text-[14px] font-bold text-[#1a1446] mb-1">Note</h3>
          <p className="text-[12px] text-slate-500 leading-relaxed font-medium">A welcome email with login details will be sent to the user's email address.</p>
        </div>
      </div>
    </div>
  );
}
