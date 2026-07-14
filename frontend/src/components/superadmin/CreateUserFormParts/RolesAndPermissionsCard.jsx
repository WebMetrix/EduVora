import { Users, User, Shield, BookOpen } from 'lucide-react';

export default function RolesAndPermissionsCard() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(79,70,229,0.15)] hover:border-indigo-200/50">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-indigo-100/50 flex items-center justify-center text-indigo-600 shrink-0">
          <Users className="w-4 h-4" />
        </div>
        <h3 className="text-[15px] font-bold text-[#1a1446]">Roles & Permissions</h3>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <User className="w-[18px] h-[18px] text-indigo-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-[#1a1446]">Super Admin</span>
            <span className="text-[12px] text-slate-500 leading-relaxed font-medium">Full access to all modules and system settings.</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Shield className="w-[18px] h-[18px] text-indigo-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-[#1a1446]">Admin</span>
            <span className="text-[12px] text-slate-500 leading-relaxed font-medium">Manage users, courses, orders, and reports.</span>
          </div>
        </div>

        <div className="flex gap-3">
          <BookOpen className="w-[18px] h-[18px] text-indigo-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-[#1a1446]">Instructor</span>
            <span className="text-[12px] text-slate-500 leading-relaxed font-medium">Create and manage courses and content.</span>
          </div>
        </div>

        <div className="flex gap-3">
          <User className="w-[18px] h-[18px] text-indigo-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-bold text-[#1a1446]">Member</span>
            <span className="text-[12px] text-slate-500 leading-relaxed font-medium">Access courses and manage own profile.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
