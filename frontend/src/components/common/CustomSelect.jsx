import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
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
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border rounded-xl flex items-center justify-between cursor-pointer transition-all hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${isOpen ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10' : 'border-slate-200/60'}`}
      >
        <span className={`text-[14px] font-medium ${selected ? 'text-slate-900' : 'text-slate-400'}`}>
          {selected ? options.find(o => o.value === selected)?.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#4f3bf3]' : 'text-slate-400'}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white/60 backdrop-blur-3xl border border-white/70 shadow-[0_12px_40px_rgba(79,59,243,0.15)] rounded-2xl overflow-hidden z-50 py-1">
          {options.map((opt) => (
            <div 
              key={opt.value}
              onClick={() => { setSelected(opt.value); setIsOpen(false); }}
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
