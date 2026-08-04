import React from 'react';
import { BookOpen, GraduationCap, Award, Clock } from 'lucide-react';

export default function MyCoursesStats({ t }) {
  const stats = [
    {
      title: t('myCourses.stats.totalCourses'),
      value: "3",
      subtitle: t('myCourses.stats.purchased'),
      icon: <BookOpen className="w-7 h-7 text-indigo-600" />,
      bg: "bg-indigo-100",
      borderColor: "border-indigo-100",
      hoverShadow: "hover:shadow-lg hover:border-indigo-300"
    },
    {
      title: t('myCourses.stats.inProgress'),
      value: "1",
      subtitle: t('myCourses.stats.keepLearning'),
      icon: <GraduationCap className="w-7 h-7 text-green-600" />,
      bg: "bg-green-100",
      borderColor: "border-green-100",
      hoverShadow: "hover:shadow-lg hover:border-green-300"
    },
    {
      title: t('myCourses.stats.completed'),
      value: "2",
      subtitle: t('myCourses.stats.greatJob'),
      icon: <Award className="w-7 h-7 text-amber-500" />,
      bg: "bg-amber-100",
      borderColor: "border-amber-100",
      hoverShadow: "hover:shadow-lg hover:border-amber-300"
    },
    {
      title: t('myCourses.stats.totalTime'),
      value: "24h 30m",
      subtitle: t('myCourses.stats.acrossAll'),
      icon: <Clock className="w-7 h-7 text-blue-500" />,
      bg: "bg-blue-100",
      borderColor: "border-blue-100",
      hoverShadow: "hover:shadow-lg hover:border-blue-300"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-5 lg:p-6 border border-slate-100 shadow-sm group/card transition-all duration-300">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex items-center gap-4 group bg-white p-4 lg:p-5 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer ${stat.borderColor} ${stat.hoverShadow}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300 ${stat.bg}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <div className="text-[24px] font-extrabold text-slate-900 leading-none mb-1">{stat.value}</div>
              <div className="text-[14px] font-bold text-slate-800 leading-tight mb-0.5">{stat.title}</div>
              <div className="text-[12px] font-medium text-slate-500 leading-tight">{stat.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
