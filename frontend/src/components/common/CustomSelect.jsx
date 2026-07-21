import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ options, placeholder, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || '');

  useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);
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

  return (
    <div className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} ref={dropdownRef}>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border rounded-xl flex items-center justify-between transition-all ${!disabled ? 'cursor-pointer hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]' : ''} ${isOpen ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10' : 'border-slate-200/60'}`}
      >
        <span className={`text-[14px] font-medium ${selected ? 'text-slate-900' : 'text-slate-400'}`}>
          {selected ? options.find(o => o.value === selected)?.label : placeholder}
        </span>
        <div className="p-1 -mr-1">
          <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#4f3bf3]' : 'text-slate-400'}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white/60 backdrop-blur-3xl border border-white/70 shadow-[0_12px_40px_rgba(79,59,243,0.15)] rounded-2xl overflow-y-auto max-h-[250px] z-50 py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-indigo-200/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-indigo-300">
          {options.map((opt) => (
            <div 
              key={opt.value}
              onClick={() => { 
                setSelected(opt.value); 
                setIsOpen(false); 
                if (onChange) onChange(opt.value);
              }}
              className={`px-4 py-3 text-[14px] font-medium cursor-pointer transition-colors flex items-center justify-between ${selected === opt.value ? 'bg-indigo-50/50 text-[#4f3bf3]' : 'text-slate-700 hover:bg-white/50'}`}
            >
              {opt.label}
              {selected === opt.value && <Check className="w-4 h-4 text-[#4f3bf3]" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
