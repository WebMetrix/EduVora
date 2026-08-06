import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { 
  ChevronRight, ArrowLeft, Play, Pause, Maximize, 
  Volume2, SkipForward, SkipBack, Settings, CheckCircle2, 
  HeadphonesIcon, Target, Users, TrendingUp, ChevronDown, ChevronUp
} from 'lucide-react';

export default function CoursePlayer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Mock data for the curriculum
  const mockCourseData = {
    id: courseId || '1',
    title: 'Digital Marketing Mastery',
    level: 'beginner',
    progress: 25,
    totalModules: 12,
    totalDuration: '4h 35m',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1000&auto=format&fit=crop',
    modules: [
      {
        id: 'm1',
        title: 'Introduction',
        lessonsCount: 3,
        duration: '45m',
        lessons: [
          { id: 'l1', title: '1. Introduction to Digital Marketing', duration: '12:45', status: 'active', 
            description: 'In this lesson, you will learn the basics of digital marketing, its importance, and how it helps businesses grow online.',
            learnings: [
              { icon: Target, title: 'Understand the basics of digital marketing' },
              { icon: Users, title: 'Learn key digital marketing channels' },
              { icon: TrendingUp, title: 'Know the benefits for business growth' }
            ]
          },
          { id: 'l2', title: '2. Importance of Digital Marketing', duration: '10:30', status: 'completed' },
          { id: 'l3', title: '3. Digital Marketing vs Traditional Marketing', duration: '08:15', status: 'completed' }
        ]
      },
      {
        id: 'm2',
        title: 'Website & Landing Pages',
        lessonsCount: 2,
        duration: '35m',
        lessons: [
          { id: 'l4', title: '1. Basics of Website Design', duration: '15:20', status: 'locked' },
          { id: 'l5', title: '2. High Converting Landing Pages', duration: '19:40', status: 'locked' }
        ]
      },
      {
        id: 'm3',
        title: 'SEO Basics',
        lessonsCount: 3,
        duration: '55m',
        lessons: [
          { id: 'l6', title: '1. What is SEO?', duration: '10:00', status: 'locked' },
          { id: 'l7', title: '2. On-Page SEO', duration: '20:00', status: 'locked' },
          { id: 'l8', title: '3. Off-Page SEO', duration: '25:00', status: 'locked' }
        ]
      },
      {
        id: 'm4',
        title: 'Social Media Marketing',
        lessonsCount: 2,
        duration: '40m',
        lessons: []
      },
      {
        id: 'm5',
        title: 'Email Marketing',
        lessonsCount: 2,
        duration: '30m',
        lessons: []
      },
      {
        id: 'm6',
        title: 'Analytics & Tools',
        lessonsCount: 2,
        duration: '30m',
        lessons: []
      }
    ]
  };

  const [expandedModules, setExpandedModules] = useState(['m1']);
  const [activeLesson, setActiveLesson] = useState(mockCourseData.modules[0].lessons[0]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  const getLevelStyles = (level) => {
    switch (level) {
      case 'beginner': return 'bg-purple-100 text-purple-600';
      case 'intermediate': return 'bg-indigo-100 text-indigo-600';
      case 'advanced': return 'bg-blue-100 text-blue-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'active') {
      return (
        <div className="w-5 h-5 rounded-full bg-[#4f3bf3] flex items-center justify-center shrink-0 shadow-sm">
          <Play className="w-2.5 h-2.5 text-white fill-white ml-0.5" />
        </div>
      );
    }
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10 shrink-0" />;
    }
    return (
      <div className="w-5 h-5 rounded-full border-2 border-slate-200 shrink-0" />
    );
  };

  return (
    <div className="flex flex-col min-h-full">
      
      {/* Top Breadcrumb & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-6">
        <div className="flex items-center flex-wrap text-[13px] font-semibold text-slate-500 gap-1.5 md:gap-2">
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">{t('myCourses.breadcrumb1')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">{t('myCourses.breadcrumb2')}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="hover:text-indigo-600 transition-colors cursor-pointer">{mockCourseData.title}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 line-clamp-1">{activeLesson.title.replace(/^[0-9]+\.\s/, '')}</span>
        </div>
        
        <button 
          onClick={() => navigate('/courses')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#4f3bf3] rounded-xl text-[13px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors shadow-sm whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('coursePlayer.backToCourses')}
        </button>
      </div>

      {/* Title Area */}
      <div className="mb-4 lg:mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] lg:text-[28px] font-extrabold text-[#1a1446] leading-tight">
            {mockCourseData.title}
          </h1>
          <span className={`px-3 py-1 rounded-full text-[12px] font-extrabold tracking-wide ${getLevelStyles(mockCourseData.level)}`}>
            {t(`myCourses.levels.${mockCourseData.level}`)}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
        
        {/* Left Column: Progress, Video & Details */}
        <div className="flex flex-col gap-5 w-full min-w-0">
          
          {/* Progress Bar (Spans full width of video column) */}
          <div className="w-full">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[12px] font-bold text-[#1a1446]">{t('coursePlayer.yourProgress')}</span>
              <span className="text-[12px] font-bold text-[#4f3bf3]">{mockCourseData.progress}% {t('coursePlayer.completed')}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full bg-[#4f3bf3] rounded-full transition-all duration-1000" style={{ width: `${mockCourseData.progress}%` }}></div>
            </div>
          </div>

          {/* Video Player Placeholder */}
          <div className="w-full aspect-video bg-[#0b0c10] rounded-2xl overflow-hidden relative shadow-xl group">
            {/* Dark Overlay for Video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none z-10" />
            
            <img 
              src={mockCourseData.image}
              alt="Video Thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            {/* Top Info overlay */}
            <div className="absolute top-0 left-0 w-full p-6 z-20">
              <h2 className="text-white text-[28px] font-extrabold max-w-[70%] leading-tight drop-shadow-md">
                {activeLesson.title.replace(/^[0-9]+\.\s/, '')}
              </h2>
              <div className="text-white/80 text-[14px] font-medium mt-2 drop-shadow-md">
                {t('coursePlayer.lesson')} 1 of 3 • {t('coursePlayer.module')} 1
              </div>
            </div>

            {/* Huge Play Button */}
            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 rounded-full border-2 border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-[#4f3bf3] hover:border-[#4f3bf3] transition-all duration-300 group-hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
              <Play className="w-8 h-8 text-white fill-white ml-1.5" />
            </button>

            {/* Video Controls Footer */}
            <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col gap-3">
              {/* Progress Bar inside video */}
              <div className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative group/scrub">
                <div className="absolute left-0 top-0 h-full bg-[#4f3bf3] w-[45%] rounded-full relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow border-2 border-[#4f3bf3] opacity-0 group-hover/scrub:opacity-100 transition-opacity translate-x-1/2" />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-white/90">
                <div className="flex items-center gap-5">
                  <button className="hover:text-white transition-colors"><Play className="w-5 h-5 fill-current" /></button>
                  <button className="hover:text-white transition-colors"><SkipBack className="w-5 h-5 fill-current" /></button>
                  <button className="hover:text-white transition-colors"><SkipForward className="w-5 h-5 fill-current" /></button>
                  <button className="hover:text-white transition-colors"><Volume2 className="w-5 h-5" /></button>
                  <span className="text-[13px] font-medium tracking-wide">06:20 / {activeLesson.duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-2 py-0.5 rounded border border-white/30 text-[12px] font-bold hover:bg-white/20 transition-colors">1x</button>
                  <button className="text-[14px] font-bold hover:text-white transition-colors">CC</button>
                  <button className="hover:text-white transition-colors"><Maximize className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Details */}
          <div className="flex flex-col">
            <h2 className="text-[20px] font-bold text-[#1a1446] mb-3">
              {activeLesson.title.replace(/^[0-9]+\.\s/, '')}
            </h2>
            <p className="text-[14px] text-slate-500 font-medium leading-relaxed mb-6">
              {activeLesson.description}
            </p>

            <h3 className="text-[15px] font-extrabold text-[#1a1446] mb-4">
              {t('coursePlayer.whatYouWillLearn')}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {(activeLesson.learnings || []).map((learning, idx) => {
                const Icon = learning.icon;
                const colors = [
                  { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
                  { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
                  { bg: 'bg-orange-50', icon: 'text-orange-500', border: 'border-orange-100' }
                ];
                const c = colors[idx % 3];
                return (
                  <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl border ${c.border} bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group/card`}>
                    <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 leading-snug pt-1">
                      {learning.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Prev / Next Navigation */}
            <div className="flex items-center justify-between border-t border-slate-200/60 pt-6 mt-auto">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-[#4f3bf3] rounded-xl text-[13px] font-bold text-[#4f3bf3] hover:bg-[#4f3bf3] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md group/btn">
                <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                {t('coursePlayer.previousLesson')}
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#4f3bf3] to-[#3f2ee6] border border-[#4f3bf3] rounded-xl text-[13px] font-bold text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 group/btn">
                {t('coursePlayer.nextLesson')}
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Curriculum */}
        <div className="flex flex-col w-full h-full gap-4">
          
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.15)] hover:border-indigo-300 flex-1 flex flex-col">
            
            {/* Decorative background flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

            <div className="relative z-10 flex items-center justify-between p-5 border-b border-indigo-100/60 shrink-0">
              <h3 className="text-[16px] font-extrabold text-[#1a1446]">{t('coursePlayer.courseContent')}</h3>
              <div className="text-[12px] font-bold text-slate-500">
                {mockCourseData.totalModules} {t('coursePlayer.modules')} • {mockCourseData.totalDuration}
              </div>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
              {mockCourseData.modules.map((module) => {
                const isExpanded = expandedModules.includes(module.id);
                return (
                  <div key={module.id} className="border-b border-indigo-100/30 last:border-none">
                    <button 
                      onClick={() => toggleModule(module.id)}
                      className={`w-full flex items-center justify-between p-4 md:p-5 transition-colors ${isExpanded ? 'bg-white/60' : 'hover:bg-white/40'}`}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <h4 className={`text-[14px] font-extrabold ${isExpanded ? 'text-[#4f3bf3]' : 'text-slate-800'}`}>
                          {t('coursePlayer.module')} {module.id.replace('m', '')}: {module.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {module.lessonsCount} {t('coursePlayer.lessons')} • {module.duration}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    
                    {isExpanded && module.lessons.length > 0 && (
                      <div className="flex flex-col pb-2">
                        {module.lessons.map((lesson) => {
                          const isActive = activeLesson.id === lesson.id;
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => { if(lesson.description) setActiveLesson(lesson); }}
                              className={`w-full flex items-start justify-between py-3 px-4 md:px-5 transition-all duration-300 ${isActive ? 'bg-indigo-50/80 border-l-4 border-[#4f3bf3] shadow-inner' : 'border-l-4 border-transparent hover:bg-white/60'}`}
                            >
                              <div className="flex items-start gap-3">
                                {getStatusIcon(isActive ? 'active' : lesson.status)}
                                <span className={`text-[13px] font-bold text-left leading-tight ${isActive ? 'text-[#1a1446]' : 'text-slate-600'}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-[11px] font-semibold text-slate-400 shrink-0 mt-0.5 ml-2">
                                {lesson.duration}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Need Help Box (Full Width, Styled like Secure Payment Banner) */}
      <div className="mt-8 bg-linear-to-r from-indigo-50/70 to-purple-50/70 backdrop-blur-xl border border-indigo-100/50 rounded-[12px] p-3 md:p-4 flex flex-col sm:flex-row gap-3 items-center shadow-sm w-full">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 shadow-sm border border-indigo-200/50">
          <HeadphonesIcon className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h5 className="text-[14px] md:text-[15px] font-bold text-slate-900 mb-0.5">{t('coursePlayer.needHelp')}</h5>
          <p className="text-[12px] md:text-[13px] text-slate-500 leading-relaxed max-w-full sm:max-w-[90%]">
            {t('coursePlayer.stuckText').replace('\n', ' ')}
          </p>
        </div>
        <div className="shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
          <button className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-white px-4 py-2 border border-[#4f3bf3] rounded-[8px] text-[12px] font-bold text-[#4f3bf3] hover:bg-indigo-50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
            {t('coursePlayer.contactSupport')}
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
