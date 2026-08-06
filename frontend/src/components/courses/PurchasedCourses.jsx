import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, FileText, Clock, Play } from 'lucide-react';

export default function PurchasedCourses({ t, searchQuery }) {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: "Digital Marketing Mastery",
      level: "beginner",
      description: "Learn the essential strategies of digital marketing and grow your online business.",
      modules: 12,
      duration: "8h 45m",
      status: "inProgress",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format&fit=crop",
      theme: "purple"
    },
    {
      id: 2,
      title: "Social Media Marketing Secrets",
      level: "intermediate",
      description: "Master social media platforms and create engaging content that converts.",
      modules: 10,
      duration: "6h 20m",
      status: "completed",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
      theme: "green"
    },
    {
      id: 3,
      title: "Affiliate Marketing Pro",
      level: "advanced",
      description: "Build passive income streams through affiliate marketing and partnerships.",
      modules: 15,
      duration: "9h 25m",
      status: "notStarted",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
      theme: "blue"
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelStyles = (level) => {
    switch (level) {
      case 'beginner': return 'bg-purple-100 text-purple-600';
      case 'intermediate': return 'bg-indigo-100 text-indigo-600';
      case 'advanced': return 'bg-blue-100 text-blue-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'inProgress': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'notStarted': return 'bg-slate-100 text-slate-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getActionText = (status) => {
    switch (status) {
      case 'inProgress': return t('myCourses.actions.continue');
      case 'completed': return t('myCourses.actions.viewDetails');
      case 'notStarted': return t('myCourses.actions.startNow');
      default: return t('myCourses.actions.startNow');
    }
  };

  const getActionIcon = (status) => {
    if (status === 'inProgress' || status === 'notStarted') {
      return <Play className="w-3.5 h-3.5 fill-current" />;
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <div
          key={course.id}
          className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(79,59,243,0.12)] hover:border-indigo-300 transition-all duration-300 group"
        >
          {/* Cover Image */}
          <div className="relative h-48 w-full overflow-hidden p-3">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="flex flex-col flex-1 p-5 pt-2">
            {/* Header: Title and Menu */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-[16px] font-extrabold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h3>
              <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors shrink-0">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Level Badge */}
            <div className="mb-4">
              <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide ${getLevelStyles(course.level)}`}>
                {t(`myCourses.levels.${course.level}`)}
              </span>
            </div>

            {/* Description */}
            <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6 flex-1">
              {course.description}
            </p>

            {/* Meta Info (Modules & Time) */}
            <div className="flex items-center gap-4 text-[12px] font-semibold text-slate-500 mb-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                {course.modules} {t('myCourses.table.modules')}
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {course.duration}
              </div>
            </div>

            {/* Footer: Status and Action Button */}
            <div className="flex items-center justify-between mt-auto">
              <span className={`px-3 py-1.5 rounded-lg text-[12px] font-bold ${getStatusStyles(course.status)}`}>
                {t(`myCourses.status.${course.status}`)}
              </span>
              <button 
                onClick={() => navigate(`/courses/${course.id}`)}
                className="flex items-center gap-1.5 px-5 py-2 bg-white border-2 border-indigo-500 text-indigo-600 rounded-xl text-[13px] font-bold hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
              >
                {getActionIcon(course.status)}
                {getActionText(course.status)}
              </button>
            </div>
          </div>
        </div>
      ))}
      {filteredCourses.length === 0 && (
        <div className="col-span-full py-12 text-center text-slate-500 font-medium">
          No courses found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
