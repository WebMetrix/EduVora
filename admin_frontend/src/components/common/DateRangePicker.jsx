import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatDateRangeLabel, formatDisplayDate, parseFlexibleDate } from '../../utils/dateFilterUtils';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAYS_OF_WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const DEFAULT_PRESETS = [
  { id: 'all', label: 'All Time', startDate: null, endDate: null },
  {
    id: 'today',
    label: 'Today',
    getRange: () => {
      const now = new Date();
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return { startDate: d, endDate: d };
    },
  },
  {
    id: 'week',
    label: 'This Week',
    getRange: () => {
      const now = new Date();
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const start = new Date(end);
      start.setDate(end.getDate() - 6);
      return { startDate: start, endDate: end };
    },
  },
  {
    id: 'this_month',
    label: 'This Month',
    startDate: new Date(2026, 9, 1),
    endDate: new Date(2026, 9, 31),
  },
  {
    id: 'last_3_months',
    label: 'Last 3 Months',
    startDate: new Date(2026, 7, 1),
    endDate: new Date(2026, 9, 31),
  },
  {
    id: 'last_6_months',
    label: 'Last 6 Months',
    startDate: new Date(2026, 4, 1),
    endDate: new Date(2026, 9, 31),
  },
];

/**
 * Glassmorphic interactive Calendar Date Range Picker + Preset Time Filter Pills,
 * combining the frontend Calendar UI (days/months/years + mobile portal) and Referrals pill effects.
 */
export default function DateRangePicker({
  value = null, // { preset?: string, startDate?: Date|string|null, endDate?: Date|string|null }
  onChange,
  placeholder = 'Select date range',
  presets = DEFAULT_PRESETS,
  variant = 'modal', // 'header' | 'modal' | 'field'
  label = 'Date Range',
  className = '',
  clearable = true,
  initialMonth,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('days'); // 'days' | 'months' | 'years'
  const [hoveredDate, setHoveredDate] = useState(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const resolvedStart = parseFlexibleDate(value?.startDate);
  const resolvedEnd = parseFlexibleDate(value?.endDate);
  const activePreset = value?.preset || '';

  const [draftStart, setDraftStart] = useState(resolvedStart);
  const [draftEnd, setDraftEnd] = useState(resolvedEnd);
  const [currentMonth, setCurrentMonth] = useState(
    () => resolvedStart || initialMonth || new Date(2026, 9, 1)
  );
  const [yearPage, setYearPage] = useState(
    Math.floor((resolvedStart || new Date(2026, 9, 1)).getFullYear() / 12) * 12
  );

  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    setDraftStart(parseFlexibleDate(value?.startDate));
    setDraftEnd(parseFlexibleDate(value?.endDate));
  }, [value?.startDate, value?.endDate]);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popWidth = 316;
    const popHeight = 410;
    const gap = 8;

    let left = rect.left;
    if (left + popWidth > window.innerWidth - 12) {
      left = Math.max(12, rect.right - popWidth);
    }
    if (left + popWidth > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - popWidth - 12);
    }

    let top = rect.bottom + gap;
    if (top + popHeight > window.innerHeight - 12 && rect.top - popHeight - gap > 12) {
      top = rect.top - popHeight - gap;
    }

    setCoords({ top, left });
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const handleOutside = (event) => {
      const inTrigger = triggerRef.current?.contains(event.target);
      const inPopover = popoverRef.current?.contains(event.target);
      const inMobileModal = event.target.closest?.('.mobile-daterange-picker-modal');
      if (!inTrigger && !inPopover && !inMobileModal) {
        setIsOpen(false);
      }
    };

    const handleReposition = () => updatePosition();

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

  const handlePresetClick = (preset) => {
    const range = preset.getRange ? preset.getRange() : { startDate: preset.startDate, endDate: preset.endDate };
    setDraftStart(range.startDate);
    setDraftEnd(range.endDate);
    if (range.startDate) {
      setCurrentMonth(new Date(range.startDate.getFullYear(), range.startDate.getMonth(), 1));
    }
    onChange?.({
      preset: preset.id,
      label: preset.label,
      startDate: range.startDate,
      endDate: range.endDate,
    });
    setIsOpen(false);
  };

  const handleDayClick = (dayDate, isCurrentMonth) => {
    if (!isCurrentMonth) return;

    if (!draftStart || (draftStart && draftEnd)) {
      setDraftStart(dayDate);
      setDraftEnd(null);
      return;
    }

    let start = draftStart;
    let end = dayDate;
    if (end < start) {
      [start, end] = [end, start];
    }

    setDraftStart(start);
    setDraftEnd(end);
    setHoveredDate(null);
    onChange?.({
      preset: 'custom',
      label: 'Custom Range',
      startDate: start,
      endDate: end,
    });
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e?.stopPropagation();
    setDraftStart(null);
    setDraftEnd(null);
    onChange?.({
      preset: 'all',
      label: 'All Time',
      startDate: null,
      endDate: null,
    });
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

  const calendarDays = getDaysInMonth(currentMonth);
  const rangeText = formatDateRangeLabel(
    { startDate: resolvedStart, endDate: resolvedEnd },
    placeholder
  );
  const activePresetObj = presets.find((p) => p.id === activePreset);
  const fieldTitle =
    activePresetObj?.label ||
    (resolvedStart && resolvedEnd ? 'Custom Range' : value?.label || 'This Month');

  const previewEnd = draftStart && !draftEnd ? hoveredDate : draftEnd;
  const rangeStart =
    draftStart && previewEnd && previewEnd < draftStart ? previewEnd : draftStart;
  const rangeEnd =
    draftStart && previewEnd && previewEnd < draftStart ? draftStart : previewEnd;

  const renderPopoverBody = () => (
    <div className="space-y-3">
      {/* Preset Time Pills matching frontend Referrals time filter bar */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-indigo-50/50 border border-indigo-100/70 rounded-xl">
        {presets.map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#4f3bf3] text-white shadow-sm'
                  : 'text-indigo-900/70 hover:text-[#4f3bf3] hover:bg-white'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Month / Year Switcher Header */}
      <div className="flex items-center justify-between px-1">
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
          <div className="grid gap-x-1" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-center text-[11.5px] font-bold text-slate-800">
                {day}
              </div>
            ))}
          </div>

          <div className="grid gap-y-1 gap-x-0.5" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
            {calendarDays.map((item, i) => {
              if (!item.isCurrentMonth) {
                return <div key={i} className="w-8 h-8 mx-auto" />;
              }

              const t = item.fullDate.getTime();
              const isStart = rangeStart && t === rangeStart.getTime();
              const isEnd = rangeEnd && t === rangeEnd.getTime();
              const isInRange =
                rangeStart && rangeEnd && t > rangeStart.getTime() && t < rangeEnd.getTime();
              const isToday = new Date().toDateString() === item.fullDate.toDateString();

              return (
                <div
                  key={i}
                  onMouseEnter={() => {
                    if (draftStart && !draftEnd) setHoveredDate(item.fullDate);
                  }}
                  onClick={() => handleDayClick(item.fullDate, item.isCurrentMonth)}
                  className={`relative w-8 h-8 mx-auto flex flex-col items-center justify-center rounded-[8px] text-[12.5px] font-medium cursor-pointer transition-all ${
                    isStart || isEnd
                      ? 'bg-[#2563eb] text-white shadow-sm font-bold'
                      : isInRange
                      ? 'bg-indigo-50 text-[#4f3bf3] font-semibold'
                      : 'text-slate-700 hover:bg-black/5'
                  }`}
                >
                  <span className={isToday && !isStart && !isEnd ? '-mt-1.5' : ''}>{item.day}</span>
                  {!isStart && !isEnd && isToday && (
                    <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#2563eb]" />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {viewMode === 'months' && (
        <div className="grid gap-2 pt-1" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
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
        <div className="grid gap-2 pt-1" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
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

      {/* Selected Range Readout + Quick Actions Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px]">
        <span className="font-semibold text-slate-500 truncate">
          {draftStart && !draftEnd
            ? `From ${formatDisplayDate(draftStart)} — pick end date`
            : draftStart && draftEnd
            ? `${formatDisplayDate(draftStart)} - ${formatDisplayDate(draftEnd)}`
            : 'Showing all dates'}
        </span>
        {clearable && (draftStart || draftEnd) && (
          <button
            type="button"
            onClick={(e) => {
              handleClear(e);
              setIsOpen(false);
            }}
            className="text-rose-600 hover:text-rose-700 font-bold shrink-0 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );

  const hasSelection = Boolean(resolvedStart || resolvedEnd);

  return (
    <div className={`relative ${className}`} ref={triggerRef}>
      {variant === 'field' ? (
        <div
          onClick={() => {
            setViewMode('days');
            setIsOpen((prev) => !prev);
          }}
          className={`flex items-center justify-between bg-slate-50/75 hover:bg-white border rounded-xl px-3 py-1.5 h-11 cursor-pointer transition-all duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${
            isOpen
              ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10'
              : 'border-slate-200/90 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <Calendar
              className={`w-4 h-4 shrink-0 transition-colors ${
                isOpen ? 'text-[#4f3bf3]' : 'text-indigo-600'
              }`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-bold text-slate-800 leading-tight truncate">
                {fieldTitle}
              </p>
              <p className="text-[10px] font-medium text-slate-400 leading-tight truncate">
                {hasSelection ? rangeText : 'All Dates'}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#4f3bf3]' : 'text-slate-400'
            }`}
          />
        </div>
      ) : variant === 'header' ? (
        <button
          type="button"
          onClick={() => {
            setViewMode('days');
            setIsOpen((prev) => !prev);
          }}
          className={`flex items-center justify-between sm:justify-start gap-2 bg-white/85 backdrop-blur-sm border rounded-xl px-3.5 py-2 text-[12px] sm:text-[12.5px] font-bold text-slate-700 shadow-2xs transition-all duration-200 cursor-pointer w-full sm:w-auto hover:bg-white hover:border-indigo-300 hover:text-[#4f3bf3] ${
            isOpen ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10 text-[#4f3bf3]' : 'border-slate-200/90'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className={`w-4 h-4 shrink-0 ${isOpen ? 'text-[#4f3bf3]' : 'text-indigo-600'}`} />
            <span className="truncate">{rangeText}</span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#4f3bf3]' : 'text-slate-400'
            }`}
          />
        </button>
      ) : (
        <div
          onClick={() => {
            setViewMode('days');
            setIsOpen((prev) => !prev);
          }}
          className={`flex items-center justify-between gap-1.5 bg-white/85 backdrop-blur-sm border rounded-xl px-2.5 sm:px-3 py-1.5 md:py-2 text-[11.5px] md:text-[12px] font-semibold transition-all duration-200 shadow-2xs cursor-pointer hover:bg-white hover:border-indigo-300 ${
            isOpen ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <Calendar className={`w-3.5 h-3.5 shrink-0 ${isOpen ? 'text-[#4f3bf3]' : 'text-slate-400'}`} />
            <span className={`truncate ${hasSelection ? 'text-slate-800 font-bold' : 'text-slate-700'}`}>
              {rangeText}
            </span>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {clearable && hasSelection && (
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Clear date range"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-[#4f3bf3]' : 'text-slate-400'
              }`}
            />
          </div>
        </div>
      )}

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            {/* Desktop Glassmorphic Calendar Popover */}
            <div
              ref={popoverRef}
              style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
              className="hidden md:block fixed w-[316px] bg-white/92 backdrop-blur-3xl border border-white/80 shadow-[0_14px_45px_rgba(15,23,42,0.14)] rounded-[18px] overflow-hidden z-[10020] p-4 animate-fade-in"
            >
              {renderPopoverBody()}
            </div>

            {/* Mobile Portal Modal matching frontend CustomDatePicker */}
            <div className="md:hidden fixed inset-0 z-[10020] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
              <div className="mobile-daterange-picker-modal relative bg-white rounded-[24px] shadow-2xl p-5 w-full max-w-[335px] animate-fade-in">
                {renderPopoverBody()}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
