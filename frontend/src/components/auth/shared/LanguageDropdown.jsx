import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

export default function LanguageDropdown() {
  const { t } = useTranslation();

  return (
    <button className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200/60 bg-white/40 backdrop-blur-md hover:bg-white/80 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/10">
      <Globe className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" />
      <span className="text-[13px] font-bold text-slate-700">{t('login.language')}</span>
      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
    </button>
  );
}
