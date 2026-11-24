import React, { useState, useRef, useEffect } from 'react';
import { UserPlus, User, Headphones, ChevronDown } from 'lucide-react';

export default function SelectUserRoleCard({ selectedRole, onSelectRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles = [
    {
      id: 'user',
      label: 'User',
      description: 'End user who can purchase packages and refer others',
      icon: User,
      badgeBg: 'bg-indigo-100/80 text-indigo-600',
    },
    {
      id: 'support',
      label: 'Support',
      description: 'Internal support staff with platform access',
      icon: Headphones,
      badgeBg: 'bg-blue-100/80 text-blue-600',
    },
  ];

  const currentRole = roles.find((r) => r.id === selectedRole) || roles[0];
  const CurrentIcon = currentRole.icon;

  return (
    <div
      className={`relative rounded-2xl bg-linear-to-br from-white/95 to-slate-50/50 backdrop-blur-xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(99,102,241,0.08)] hover:border-indigo-200 transition-all duration-300 group ${
        isOpen ? 'z-50' : 'z-20'
      }`}
    >
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon + Title & Description */}
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
            <UserPlus className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] sm:text-[16px] font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-indigo-950 transition-colors">
              Select User Role
            </h3>
            <p className="text-[12px] sm:text-[12.5px] text-slate-500 font-medium mt-0.5 leading-normal max-w-xl">
              Choose the type of user you want to create. Fields will be adjusted based on the selected role.
            </p>
          </div>
        </div>

        {/* Right: User Role Select Dropdown */}
        <div className="w-full sm:w-72 shrink-0 relative" ref={dropdownRef}>
          <label className="block text-[11.5px] font-bold text-slate-700 mb-1.5">
            User Role <span className="text-rose-500">*</span>
          </label>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-indigo-300/90 bg-white hover:border-indigo-500 text-slate-900 text-[13px] font-semibold shadow-2xs focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer group/btn"
          >
            <div className="flex items-center gap-2.5 truncate">
              <div className="pr-2.5 border-r border-slate-200/90 flex items-center justify-center">
                <CurrentIcon className="w-4 h-4 text-slate-700 shrink-0" />
              </div>
              <span className="font-bold text-slate-900">{currentRole.label}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 group-hover/btn:text-indigo-600 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Options Popup */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-2xl border border-slate-200/90 shadow-[0_14px_36px_rgba(0,0,0,0.12)] p-2 space-y-1.5 animate-fadeIn">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                const RoleIcon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      onSelectRole(role.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/80 text-indigo-950'
                        : 'hover:bg-slate-50/80 text-slate-800'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${role.badgeBg}`}
                    >
                      <RoleIcon className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[13px] font-extrabold block text-slate-900 leading-tight">
                        {role.label}
                      </span>
                      <span className="text-[11px] text-slate-500 block leading-tight mt-1 font-medium">
                        {role.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
