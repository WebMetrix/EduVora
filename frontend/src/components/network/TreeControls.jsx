import { useTranslation } from '../../hooks/useTranslation';
import { 
  Plus, Minus, ZoomIn, ZoomOut, Maximize, Search, RefreshCw, 
  Users, Layers
} from 'lucide-react';

export default function TreeControls() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4">
      
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
        {/* Expand / Collapse */}
        <div className="flex items-center gap-2 pr-2 lg:pr-4 lg:border-r border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-indigo-50 text-[13px] font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            <Plus className="w-4 h-4 text-indigo-500" />
            <span>{t('network.toolbar.expandAll')}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-indigo-50 text-[13px] font-bold text-slate-600 hover:text-indigo-600 transition-colors">
            <Minus className="w-4 h-4 text-indigo-500" />
            <span>{t('network.toolbar.collapseAll')}</span>
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-2 pr-2 lg:pr-4 lg:border-r border-slate-200">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-[13px] font-bold text-slate-600 transition-colors">
            <ZoomIn className="w-4 h-4 text-slate-400" />
            <span>{t('network.toolbar.zoomIn')}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-[13px] font-bold text-slate-600 transition-colors">
            <ZoomOut className="w-4 h-4 text-slate-400" />
            <span>{t('network.toolbar.zoomOut')}</span>
          </button>
          <span className="text-[13px] font-extrabold text-slate-900 px-2">100%</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-[13px] font-bold text-slate-600 transition-colors">
            <Maximize className="w-4 h-4 text-indigo-500" />
            <span>{t('network.toolbar.center')}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-[13px] font-bold text-slate-600 transition-colors">
            <Search className="w-4 h-4 text-slate-400" />
            <span>{t('network.toolbar.search')}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-[13px] font-bold text-slate-600 transition-colors">
            <RefreshCw className="w-4 h-4 text-indigo-500" />
            <span>{t('network.toolbar.refresh')}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="p-2 rounded-lg bg-indigo-100/50">
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-500">{t('network.toolbar.totalMembers')}</span>
            <span className="text-[14px] font-extrabold text-slate-900">49</span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
          <div className="p-2 rounded-lg bg-purple-100/50">
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-500">{t('network.toolbar.levels')}</span>
            <span className="text-[14px] font-extrabold text-slate-900">2</span>
          </div>
        </div>
      </div>

    </div>
  );
}
