import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ options, placeholder, value, onChange, disabled, buttonClassName, textClassName, iconClassName, dropdownClassName }) => {
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

  const defaultButton = `w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border rounded-xl flex items-center justify-between transition-all ${!disabled ? 'hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]' : ''} ${isOpen ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10' : 'border-slate-200/60'}`;
  
  const btnClasses = buttonClassName 
    ? `${buttonClassName} ${isOpen ? 'ring-2 ring-indigo-500/20' : ''}`
    : defaultButton;

  return (
    <div className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${buttonClassName ? '' : 'w-full'}`} ref={dropdownRef}>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`${btnClasses} ${!disabled ? 'cursor-pointer' : ''}`}
      >
        <span className={`${textClassName || 'text-[14px] font-medium'} ${selected && !buttonClassName ? 'text-slate-900' : (selected ? '' : 'text-slate-400')} whitespace-nowrap`}>
          {selected ? options.find(o => o.value === selected)?.label : placeholder}
        </span>
        <div className={`flex items-center justify-center shrink-0 ${buttonClassName ? 'ml-1' : 'p-1 -mr-1'}`}>
          <ChevronDown className={`${iconClassName || 'w-5 h-5'} transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#4f3bf3]' : 'text-slate-400'}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className={`absolute top-full right-0 mt-1.5 min-w-[140px] bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden z-[100] py-1 ${dropdownClassName || ''}`}>
          {options.map((opt) => (
            <div 
              key={opt.value}
              onClick={() => { 
                setSelected(opt.value); 
                setIsOpen(false); 
                if (onChange) onChange(opt.value, opt);
              }}
              className={`px-3.5 py-2 text-[13px] font-semibold cursor-pointer transition-colors flex items-center justify-between whitespace-nowrap gap-3 ${selected === opt.value ? 'bg-indigo-50 text-[#4f3bf3]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {opt.label}
              {selected === opt.value && <Check className="w-3.5 h-3.5 shrink-0 text-[#4f3bf3]" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
