import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomDatePicker = ({ placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const dropdownRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('days'); // 'days' | 'months' | 'years'
  const [yearPage, setYearPage] = useState(Math.floor(new Date().getFullYear() / 12) * 12);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    const daysArray = [];
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      daysArray.push({ day: prevMonthDays - i, isCurrentMonth: false, fullDate: new Date(year, month - 1, prevMonthDays - i) });
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

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const handleSelectDate = (fullDate, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    const formattedDate = `${fullDate.getDate().toString().padStart(2, '0')}-${(fullDate.getMonth() + 1).toString().padStart(2, '0')}-${fullDate.getFullYear()}`;
    setSelectedDate(formattedDate);
    setIsOpen(false);
  };

  const handleCalendarIconClick = (e) => {
    e.stopPropagation();
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    setSelectedDate(formattedDate);
    setCurrentMonth(today);
    setViewMode('days');
    setIsOpen(true);
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      setViewMode('days');
    }
    setIsOpen(!isOpen);
  };

  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const calendarDays = getDaysInMonth(currentMonth);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={toggleDropdown}
        className={`w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border rounded-xl flex items-center justify-between cursor-pointer transition-all hover:bg-white hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] ${isOpen ? 'bg-white border-[#4f3bf3] ring-4 ring-indigo-500/10' : 'border-slate-200/60'}`}
      >
        <span className={`text-[14px] font-medium ${selectedDate ? 'text-slate-900' : 'text-slate-400'}`}>
          {selectedDate || placeholder}
        </span>
        <div 
          onClick={handleCalendarIconClick} 
          className="p-1 -mr-1 rounded-lg hover:bg-indigo-50 transition-colors"
          title="Select Today"
        >
          <Calendar className={`w-5 h-5 transition-colors ${isOpen ? 'text-[#4f3bf3]' : 'text-slate-400'}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-[20px] overflow-hidden z-50 p-5">
          
          <div className="flex items-center justify-between mb-5 px-1">
            <button type="button" onClick={prevAction} className="p-1 hover:bg-black/5 rounded-lg transition-colors"><ChevronLeft className="w-5 h-5 text-slate-700" /></button>
            
            <button 
              type="button" 
              onClick={() => {
                if (viewMode === 'days') setViewMode('months');
                else if (viewMode === 'months') {
                  setYearPage(Math.floor(currentMonth.getFullYear() / 12) * 12);
                  setViewMode('years');
                }
              }}
              className="text-[15px] font-semibold text-slate-800 hover:bg-black/5 px-3 py-1 rounded-lg transition-colors"
            >
              {viewMode === 'days' && `${fullMonthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
              {viewMode === 'months' && currentMonth.getFullYear()}
              {viewMode === 'years' && `${yearPage} - ${yearPage + 11}`}
            </button>
            
            <button type="button" onClick={nextAction} className="p-1 hover:bg-black/5 rounded-lg transition-colors"><ChevronRight className="w-5 h-5 text-slate-700" /></button>
          </div>
          
          {viewMode === 'days' && (
            <>
              <div className="grid mb-3 gap-x-1" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-[13px] font-bold text-slate-800">{day}</div>
                ))}
              </div>
              
              <div className="grid gap-y-2 gap-x-1" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
                {calendarDays.map((item, i) => {
                  if (!item.isCurrentMonth) {
                    return <div key={i} className="w-9 h-9 mx-auto"></div>;
                  }

                  const isSelected = selectedDate === `${item.fullDate.getDate().toString().padStart(2, '0')}-${(item.fullDate.getMonth() + 1).toString().padStart(2, '0')}-${item.fullDate.getFullYear()}`;
                  const isToday = new Date().toDateString() === item.fullDate.toDateString();

                  return (
                    <div 
                      key={i} 
                      onClick={() => handleSelectDate(item.fullDate, item.isCurrentMonth)}
                      className={`relative w-9 h-9 mx-auto flex flex-col items-center justify-center rounded-[8px] text-[14px] font-medium cursor-pointer transition-all ${
                        isSelected ? 'bg-[#2563eb] text-white shadow-sm' : 
                        'text-slate-700 hover:bg-black/5'
                      }`}
                    >
                      <span className={`${isToday && !isSelected ? '-mt-1.5' : ''}`}>{item.day}</span>
                      {!isSelected && isToday && (
                        <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#2563eb]"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {viewMode === 'months' && (
            <div className="grid gap-2 mt-2" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
              {monthNames.map((month, i) => (
                <div
                  key={month}
                  onClick={() => {
                    setCurrentMonth(new Date(currentMonth.getFullYear(), i, 1));
                    setViewMode('days');
                  }}
                  className={`py-3 text-center rounded-xl text-[13px] font-bold cursor-pointer transition-all ${
                    currentMonth.getMonth() === i ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-500/30' : 'text-[#1a1446] hover:bg-indigo-50'
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
                    className={`py-3 text-center rounded-xl text-[13px] font-bold cursor-pointer transition-all ${
                      currentMonth.getFullYear() === year ? 'bg-[#4f3bf3] text-white shadow-md shadow-indigo-500/30' : 'text-[#1a1446] hover:bg-indigo-50'
                    }`}
                  >
                    {year}
                  </div>
                );
              })}
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
