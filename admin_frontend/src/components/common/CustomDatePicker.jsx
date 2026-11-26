import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { parseFlexibleDate } from '../../utils/dateFilterUtils';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS_OF_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/**
 * Single-date calendar picker modeled directly on frontend/src/components/common/CustomDatePicker.jsx
 * with glassmorphic backdrop blur, 3-level Days/Months/Years navigation, Today quick-select, and
 * viewport-anchored desktop popover + mobile portal dialog.
 */
export default function CustomDatePicker({
  placeholder = 'Select date',
  value = '',
  onChange,
  separator = '/',
  size = 'md', // 'sm' | 'md'
  clearable = true,
  className = '',
  leftIcon = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || '');
  const [currentMonth, setCurrentMonth] = useState(() => parseFlexibleDate(value) || new Date());
  const [viewMode, setViewMode] = useState('days'); // 'days' | 'months' | 'years'
  const [yearPage, setYearPage] = useState(Math.floor(new Date().getFullYear() / 12) * 12);
  const [popoverCoords, setPopoverCoords] = useState({ top: 0, left: 0 });

  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value || '');
      const parsed = parseFlexibleDate(value);
      if (parsed) setCurrentMonth(parsed);
    }
  }, [value]);

  const formatDateValue = (dateObj) => {
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    return `${dd}${separator}${mm}${separator}${yyyy}`;
  };

  // Position desktop popover within viewport bounds
  const updatePopoverPosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverWidth = 280;
    const popoverHeight = 315;
    const gap = 8;

    let left = rect.left;
    if (left + popoverWidth > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - popoverWidth - 12);
    }

    let top = rect.bottom + gap;
    if (top + popoverHeight > window.innerHeight - 12 && rect.top - popoverHeight - gap > 12) {
      top = rect.top - popoverHeight - gap;
    }

    setPopoverCoords({ top, left });
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePopoverPosition();

    const handleOutside = (event) => {
      const inTrigger = triggerRef.current?.contains(event.target);
      const inPopover = popoverRef.current?.contains(event.target);
      const inMobileModal = event.target.closest?.('.mobile-date-picker-modal');
      if (!inTrigger && !inPopover && !inMobileModal) {
        setIsOpen(false);
      }
    };

    const handleReposition = () => updatePopoverPosition();

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isOpen]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;

    const daysArray = [];
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      daysArray.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthDays - i),
      });
    }
    for (let i = 1; i <= days; i++) {
      daysArray.push({ day: i, isCurrentMonth: true, fullDate: new Date(year, month, i) });
    }
    return daysArray;
  };

  const nextAction = (e) => {
    e.stopPropagation();
    if (viewMode === 'days') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    } else if (viewMode === 'years') {
      setYearPage(yearPage + 12);
    } else if (viewMode === 'months') {
      setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1));
    }
  };

  const prevAction = (e) => {
    e.stopPropagation();
    if (viewMode === 'days') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    } else if (viewMode === 'years') {
      setYearPage(yearPage - 12);
    } else if (viewMode === 'months') {
      setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1));
    }
  };

  const handleSelectDate = (fullDate, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    const formattedDate = formatDateValue(fullDate);
    setSelectedDate(formattedDate);
    setIsOpen(false);
    onChange?.(formattedDate);
  };

  const handleCalendarIconClick = (e) => {
    e.stopPropagation();
    const today = new Date();
    const formattedDate = formatDateValue(today);
    setSelectedDate(formattedDate);
    setCurrentMonth(today);
    setViewMode('days');
    setIsOpen(true);
    onChange?.(formattedDate);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedDate('');
    onChange?.('');
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      setViewMode('days');
    }
    setIsOpen((prev) => !prev);
  };

  const selectedParsed = parseFlexibleDate(selectedDate);
  const calendarDays = getDaysInMonth(currentMonth);

  const renderCalendarContent = () => (
    <>
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          type="button"
          onClick={prevAction}
          className="p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>

        <button
          type="button"
          onClick={() => {
            if (viewMode === 'days') setViewMode('months');
            else if (viewMode === 'months') {
              setYearPage(Math.floor(currentMonth.getFullYear() / 12) * 12);
              setViewMode('years');
            }
          }}
          className="text-[14.5px] font-semibold text-slate-800 hover:bg-black/5 px-3 py-1 rounded-lg transition-colors cursor-pointer"
        >
          {viewMode === 'days' && `${FULL_MONTH_NAMES[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
          {viewMode === 'months' && currentMonth.getFullYear()}
          {viewMode === 'years' && `${yearPage} - ${yearPage + 11}`}
        </button>

        <button
          type="button"
          onClick={nextAction}
          className="p-1 hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {viewMode === 'days' && (
        <>
          <div className="grid mb-2 gap-x-1" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-center text-[11.5px] font-bold text-slate-800">
                {day}
              </div>
            ))}
          </div>

          <div className="grid gap-y-1 gap-x-1" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
            {calendarDays.map((item, i) => {
              if (!item.isCurrentMonth) {
                return <div key={i} className="w-8 h-8 mx-auto" />;
              }

              const isSelected =
                selectedParsed &&
                selectedParsed.toDateString() === item.fullDate.toDateString();
              const isToday = new Date().toDateString() === item.fullDate.toDateString();

              return (
                <div
                  key={i}
                  onClick={() => handleSelectDate(item.fullDate, item.isCurrentMonth)}
                  className={`relative w-8 h-8 mx-auto flex flex-col items-center justify-center rounded-[8px] text-[12.5px] font-medium cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#2563eb] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-black/5'
                  }`}
                >
                  <span className={isToday && !isSelected ? '-mt-1.5' : ''}>{item.day}</span>
                  {!isSelected && isToday && (
                    <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#2563eb]" />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {viewMode === 'months' && (
        <div className="grid gap-2 mt-2" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          {MONTH_NAMES.map((month, i) => (
            <div
              key={month}
              onClick={() => {
                setCurrentMonth(new Date(currentMonth.getFullYear(), i, 1));
                setViewMode('days');
              }}
              className={`py-2 text-center rounded-xl text-[13px] font-bold cursor-pointer transition-all ${
                currentMonth.getMonth() === i
                  ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-500/30'
                  : 'text-[#1a1446] hover:bg-indigo-50'
              }`}
            >
              {month}
            </div>
          ))}
        </div>
      )}

      {viewMode === 'years' && (
        <div className="grid gap-2 mt-2" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const year = yearPage + i;
            return (
              <div
                key={year}
                onClick={() => {
                  setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
                  setViewMode('months');
                }}
                className={`py-2 text-center rounded-xl text-[13px] font-bold cursor-pointer transition-all ${
                  currentMonth.getFullYear() === year
                    ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-500/30'
                    : 'text-[#1a1446] hover:bg-indigo-50'
                }`}
              >
                {year}
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const isCompact = size === 'sm';

  return (
    <div className={`relative ${className}`} ref={triggerRef}>
      <div
        onClick={toggleDropdown}
        className={`w-full bg-white/75 backdrop-blur-sm border rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-white hover:border-indigo-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${
          isCompact ? 'px-2.5 py-1.5 gap-1.5' : 'px-3.5 py-2.5 gap-2'
        } ${
          isOpen
            ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10'
            : 'border-slate-200/90'
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {leftIcon && (
            <Calendar
              className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                isOpen ? 'text-[#4f3bf3]' : 'text-slate-400'
              }`}
            />
          )}
          <span
            className={`truncate ${isCompact ? 'text-[11.5px] font-medium' : 'text-[12.5px] font-medium'} ${
              selectedDate ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            {selectedDate || placeholder}
          </span>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          {clearable && selectedDate && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Clear date"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          <button
            type="button"
            onClick={handleCalendarIconClick}
            className="p-0.5 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
            title="Select Today"
          >
            <Calendar
              className={`${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} transition-colors ${
                isOpen ? 'text-[#4f3bf3]' : 'text-slate-400'
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            {/* Desktop Floating Calendar Popover */}
            <div
              ref={popoverRef}
              style={{ top: `${popoverCoords.top}px`, left: `${popoverCoords.left}px` }}
              className="hidden md:block fixed w-[280px] bg-white/90 backdrop-blur-3xl border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-[16px] overflow-hidden z-[10020] p-3.5 animate-fade-in"
            >
              {renderCalendarContent()}
            </div>

            {/* Mobile Portal Modal matching frontend CustomDatePicker */}
            <div className="md:hidden fixed inset-0 z-[10020] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
              <div className="mobile-date-picker-modal relative bg-white rounded-[24px] shadow-2xl p-5 w-full max-w-[320px] animate-fade-in">
                {renderCalendarContent()}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
