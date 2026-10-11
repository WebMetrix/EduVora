import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ 
  options = [], 
  placeholder, 
  value, 
  onChange, 
  disabled, 
  className,
  buttonClassName, 
  textClassName, 
  iconClassName, 
  dropdownClassName,
  leftIcon,
  align = 'left'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value !== undefined ? value : '');
  const [computedAlign, setComputedAlign] = useState(align);

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
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      if (align === 'right') {
        setComputedAlign('right');
      } else {
        const rect = dropdownRef.current.getBoundingClientRect();
        // On small/mobile screens, if near the right edge, align right to prevent overflow
        if (window.innerWidth - rect.left < 180) {
          setComputedAlign('right');
        } else {
          setComputedAlign('left');
        }
      }
    }
  }, [isOpen, align]);

  const defaultButton = `w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border rounded-xl flex items-center justify-between transition-all touch-manipulation select-none ${!disabled ? 'hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]' : ''} ${isOpen ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10' : 'border-slate-200/60'}`;
  
  const btnClasses = buttonClassName 
    ? `${buttonClassName} touch-manipulation select-none ${isOpen ? 'border-[#4f3bf3] ring-2 ring-indigo-500/20' : ''}`
    : defaultButton;

  const selectedOption = options.find(o => String(o.value) === String(selected));
  const displayText = selectedOption 
    ? selectedOption.label 
    : (placeholder || (selected !== undefined && selected !== '' ? selected : ''));

  const wrapperClass = className || (buttonClassName?.includes('w-full') ? 'w-full' : (buttonClassName ? 'inline-block' : 'w-full'));

  return (
    <div className={`relative ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${wrapperClass}`} ref={dropdownRef}>
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`${btnClasses} ${!disabled ? 'cursor-pointer' : ''}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
          <span className={`${textClassName || 'text-[14px] font-medium'} ${selectedOption || (selected !== undefined && selected !== '') ? (buttonClassName ? '' : 'text-slate-900') : 'text-slate-400'} whitespace-nowrap overflow-hidden text-ellipsis`}>
            {displayText}
          </span>
        </div>
        <div className={`flex items-center justify-center shrink-0 ${buttonClassName ? 'ml-1.5' : 'p-1 -mr-1'}`}>
          <ChevronDown className={`${iconClassName || 'w-5 h-5'} transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#4f3bf3]' : 'text-slate-400'}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className={`absolute top-full ${computedAlign === 'right' ? 'right-0' : 'left-0'} min-w-full w-max max-w-[calc(100vw-24px)] max-h-64 overflow-y-auto custom-scrollbar mt-1.5 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-xl z-[100] py-1 ${dropdownClassName || ''}`}>
          {options.map((opt) => {
            const isOptSelected = String(selected) === String(opt.value);
            return (
              <div 
                key={opt.value}
                onClick={() => { 
                  setSelected(opt.value); 
                  setIsOpen(false); 
                  if (onChange) onChange(opt.value, opt);
                }}
                className={`px-3.5 py-2.5 text-[13px] font-semibold cursor-pointer transition-colors flex items-center justify-between whitespace-nowrap gap-3 touch-manipulation active:bg-indigo-50/70 ${isOptSelected ? 'bg-indigo-50 text-[#4f3bf3]' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                  <span>{opt.label}</span>
                </div>
                {isOptSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#4f3bf3]" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
