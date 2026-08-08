import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Calendar, BookOpen, Clock, Award, ClipboardList } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function CourseDetailsModal({ courseData, onClose }) {
  const { t } = useTranslation();
  const isOpen = !!courseData;
  // Prevent scrolling when modal is open and fix layout shift
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!courseData) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div
        className="w-full h-[90vh] md:h-[580px] md:max-w-3xl bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in"
      >
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 shrink-0">
          <h2 className="text-[16px] md:text-[20px] font-extrabold text-slate-900">{t('myCourses.detailsTitle')}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-2 md:px-5 md:pb-4">
          <div className="flex flex-col gap-5 md:gap-6 min-h-full">

            {/* Top Row: Image + Header Info */}
            <div className="flex flex-row gap-4 md:gap-6">
              
              {/* Left Side: Dark Card (Image representation) */}
              <div
                className={`w-[135px] h-[135px] md:w-[210px] md:h-[210px] shrink-0 rounded-[16px] md:rounded-[24px] flex flex-col items-center justify-center relative overflow-hidden text-white bg-cover bg-center transition-all duration-300 ${courseData.iconTheme || 'bg-[#1a0f4f]'}`}
              >
                {/* Fallback avatar if no image */}
                <span className="text-white text-5xl md:text-[75px] font-black opacity-80">{courseData.title.charAt(0)}</span>
              </div>

              {/* Right Side: Header Info */}
              <div className="flex-1 flex flex-col min-w-0 py-1 md:py-2">
                <h3 className="text-[15px] md:text-[22px] font-bold text-slate-900 mb-1.5 md:mb-1.5 leading-tight md:leading-tight line-clamp-2 md:line-clamp-none">
                  {courseData.title}
                </h3>
                
                <div className="mb-2 md:mb-3">
                  <span className="inline-flex px-2.5 py-0.5 md:px-2 md:py-0.5 rounded-full text-[10px] md:text-[11px] font-bold bg-indigo-50 text-[#4f3bf3]">
                    {courseData.level ? courseData.level.charAt(0).toUpperCase() + courseData.level.slice(1) : t('myCourses.levels.beginner')}
                  </span>
                </div>

                <p className="text-slate-600 text-[10px] md:text-[12px] leading-snug mb-0 md:mb-3 hidden md:block">
                  {t('myCourses.modal.defaultDesc')}
                </p>

                {/* Stats on desktop */}
                <div className="hidden md:flex flex-row items-center justify-between border-t border-slate-100 pt-3 mt-auto w-full">
                   <div className="flex flex-col items-center gap-1 flex-1">
                     <Calendar className="w-4 h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                     <div className="text-center">
                       <div className="text-[13px] font-black text-slate-900 leading-none">{courseData.modules?.split(' ')[0] || t('myCourses.modal.defaultModules')}</div>
                       <div className="text-[10px] text-slate-500 font-bold mt-0.5">{t('myCourses.table.modules')}</div>
                     </div>
                   </div>
                   <div className="w-px h-8 bg-slate-100"></div>
                   <div className="flex flex-col items-center gap-1 flex-1">
                     <BookOpen className="w-4 h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                     <div className="text-center">
                       <div className="text-[13px] font-black text-slate-900 leading-none">{t('myCourses.modal.defaultLessons')}</div>
                       <div className="text-[10px] text-slate-500 font-bold mt-0.5">{t('myCourses.modal.lessons')}</div>
                     </div>
                   </div>
                   <div className="w-px h-8 bg-slate-100"></div>
                   <div className="flex flex-col items-center gap-1 flex-1">
                     <Clock className="w-4 h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                     <div className="text-center">
                       <div className="text-[13px] font-black text-slate-900 leading-none">{courseData.duration || t('myCourses.modal.defaultDuration')}</div>
                       <div className="text-[10px] text-slate-500 font-bold mt-0.5">{t('myCourses.table.duration')}</div>
                     </div>
                   </div>
                   <div className="w-px h-8 bg-slate-100"></div>
                   <div className="flex flex-col items-center gap-1 flex-1">
                     <Award className="w-4 h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                     <div className="text-center">
                       <div className="text-[13px] font-black text-slate-900 leading-none">{t('myCourses.modal.cert')}</div>
                       <div className="text-[10px] text-slate-500 font-bold mt-0.5">{t('myCourses.modal.included')}</div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Mobile Description & Stats */}
            <div className="flex flex-col md:hidden w-full">
              <p className="text-slate-600 text-[11px] leading-relaxed mb-3">
                {t('myCourses.modal.defaultDesc')}
              </p>
              
              <div className="grid grid-cols-4 gap-2 border-y border-slate-100 py-3 w-full">
                 <div className="flex flex-col items-center gap-1.5">
                   <Calendar className="w-4 h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                   <div className="text-center">
                     <div className="text-[12px] font-bold text-slate-900">{courseData.modules?.split(' ')[0] || t('myCourses.modal.defaultModules')}</div>
                     <div className="text-[9px] text-slate-500 font-bold">{t('myCourses.table.modules')}</div>
                   </div>
                 </div>
                 <div className="flex flex-col items-center gap-1.5 border-l border-slate-100">
                   <BookOpen className="w-4 h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                   <div className="text-center">
                     <div className="text-[12px] font-bold text-slate-900">{t('myCourses.modal.defaultLessons')}</div>
                     <div className="text-[9px] text-slate-500 font-bold">{t('myCourses.modal.lessons')}</div>
                   </div>
                 </div>
                 <div className="flex flex-col items-center gap-1.5 border-l border-slate-100">
                   <Clock className="w-4 h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                   <div className="text-center">
                     <div className="text-[12px] font-bold text-slate-900">{courseData.duration || t('myCourses.modal.defaultDuration')}</div>
                     <div className="text-[9px] text-slate-500 font-bold">{t('myCourses.table.duration')}</div>
                   </div>
                 </div>
                 <div className="flex flex-col items-center gap-1.5 border-l border-slate-100">
                   <Award className="w-4 h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                   <div className="text-center">
                     <div className="text-[12px] font-bold text-slate-900">{t('myCourses.modal.cert')}</div>
                     <div className="text-[9px] text-slate-500 font-bold">{t('myCourses.modal.included')}</div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Bottom Section: Spans full width on all sizes */}
            <div className="flex flex-col gap-4 md:gap-5 w-full mt-auto">
                {/* About this course */}
                <div>
                   <h4 className="text-[14px] md:text-[15px] font-bold text-slate-900 mb-1 md:mb-1.5">{t('myCourses.modal.aboutCourse')}</h4>
                   <p className="text-slate-600 text-[12px] md:text-[13px] leading-relaxed max-w-3xl">
                      {t('myCourses.modal.defaultAbout')}
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   {/* What you'll learn */}
                   <div>
                      <h4 className="text-[13px] md:text-[14px] font-bold text-slate-900 mb-2 md:mb-2.5">{t('myCourses.modal.whatYouWillLearn')}</h4>
                      <ul className="flex flex-col gap-2">
                          {(t('myCourses.modal.learnItems', { returnObjects: true }) || []).map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                               <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                               <span className="text-[11px] md:text-[12px] text-slate-700 font-semibold">{item}</span>
                            </li>
                          ))}
                      </ul>
                   </div>
                   
                   {/* Course Includes */}
                   <div>
                      <h4 className="text-[13px] md:text-[14px] font-bold text-slate-900 mb-2 md:mb-2.5">{t('myCourses.modal.courseIncludes')}</h4>
                      <ul className="flex flex-col gap-2">
                          <li className="flex items-center gap-2.5">
                             <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                             <span className="text-[11px] md:text-[12px] text-slate-700 font-semibold">{courseData.modules?.split(' ')[0] || t('myCourses.modal.defaultModules')} {t('myCourses.table.modules')}</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                             <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                             <span className="text-[11px] md:text-[12px] text-slate-700 font-semibold">{t('myCourses.modal.defaultLessons')} {t('myCourses.modal.lessons')}</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                             <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                             <span className="text-[11px] md:text-[12px] text-slate-700 font-semibold">{courseData.duration || t('myCourses.modal.defaultDuration')} {t('myCourses.modal.onDemandVideo')}</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                             <ClipboardList className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                             <span className="text-[11px] md:text-[12px] text-slate-700 font-semibold">{t('myCourses.modal.quizzesAssignments')}</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                             <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#4f3bf3] shrink-0" strokeWidth={2.5} />
                             <span className="text-[11px] md:text-[12px] text-slate-700 font-semibold">{t('myCourses.modal.certificateOfCompletion')}</span>
                          </li>
                      </ul>
                   </div>
                </div>

            </div>

          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 768px) {
          .md\\:animate-fade-in {
            animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
      `}} />
    </div>,
    document.body
  );
}
