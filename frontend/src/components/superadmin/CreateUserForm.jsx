import { ChevronRight } from 'lucide-react';
import UserInformationSection from './CreateUserFormParts/UserInformationSection';
import AdditionalInformationSection from './CreateUserFormParts/AdditionalInformationSection';
import RolesAndPermissionsCard from './CreateUserFormParts/RolesAndPermissionsCard';
import NoteCard from './CreateUserFormParts/NoteCard';

export default function CreateUserForm() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
          <span>User Management</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-indigo-600">Create User</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#1a1446]">Create New User</h1>
        <p className="text-[14px] text-slate-500 font-medium">Add a new user to the platform. No referral code is required.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column - Form */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <UserInformationSection />
          <AdditionalInformationSection />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 lg:pb-8">
            <button className="px-8 py-3.5 rounded-xl bg-white border-2 border-[#4f3bf3]/20 text-[#4f3bf3] font-bold text-[15px] hover:border-[#4f3bf3] hover:bg-indigo-50 transition-all duration-300">
              Cancel
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-[#4f3bf3] text-white font-bold text-[15px] hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300">
              Create User
            </button>
          </div>
        </div>

        {/* Right Column - Info Sidebar */}
        <div className="w-full lg:w-80 xl:w-80 flex flex-col gap-4 shrink-0">
          <div className="hidden lg:block">
            <RolesAndPermissionsCard />
          </div>
          <NoteCard />
        </div>
      </div>
    </div>
  );
}
