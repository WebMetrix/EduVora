import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetworkTree } from '../../redux/slices/networkSlice';
import {
  Plus, Minus, ZoomIn, ZoomOut, Maximize, Search, RefreshCw,
  Users, Layers, X
} from 'lucide-react';

export default function TreeControls({ 
  transformComponentRef, 
  searchQuery, 
  setSearchQuery, 
  isAllExpanded, 
  setIsAllExpanded,
  zoomScale
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { totalMembers, maxLevel, isLoading } = useSelector(state => state.network);

  const handleZoomIn = () => transformComponentRef.current?.zoomIn(0.2);
  const handleZoomOut = () => transformComponentRef.current?.zoomOut(0.2);
  const handleCenter = () => transformComponentRef.current?.centerView(1);
  const handleReset = () => transformComponentRef.current?.resetTransform();
  
  const handleRefresh = () => {
    dispatch(fetchNetworkTree());
  };

  return (
    <div className="relative overflow-hidden flex flex-col xl:flex-row xl:items-center justify-between gap-2 lg:gap-3 bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl rounded-2xl border border-indigo-100/60 shadow-sm p-2.5 lg:px-4 group/card transition-all duration-300 hover:shadow-lg hover:border-indigo-200">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

      {/* Controls */}
      <div className="relative z-10 flex-1 min-w-0 flex flex-nowrap overflow-x-auto items-center gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Expand / Collapse */}
        <div className="flex items-center gap-1 pr-1 lg:pr-2 lg:border-r border-slate-200">
          <button 
            onClick={() => setIsAllExpanded(true)}
            className={`flex items-center shrink-0 whitespace-nowrap gap-1 px-2 py-1.5 lg:px-2.5 rounded-lg text-[12px] font-bold transition-all duration-300 border ${isAllExpanded ? 'bg-indigo-50/80 text-indigo-600 border-indigo-100 shadow-sm' : 'text-slate-600 border-transparent hover:text-indigo-600 hover:bg-indigo-50/80 hover:border-indigo-100 active:scale-95'}`}>
            <Plus className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('network.toolbar.expandAll')}</span>
          </button>
          <button 
            onClick={() => setIsAllExpanded(false)}
            className={`flex items-center shrink-0 whitespace-nowrap gap-1 px-2 py-1.5 lg:px-2.5 rounded-lg text-[12px] font-bold transition-all duration-300 border ${!isAllExpanded ? 'bg-indigo-50/80 text-indigo-600 border-indigo-100 shadow-sm' : 'text-slate-600 border-transparent hover:text-indigo-600 hover:bg-indigo-50/80 hover:border-indigo-100 active:scale-95'}`}>
            <Minus className="w-3.5 h-3.5 text-indigo-500" />
            <span>{t('network.toolbar.collapseAll')}</span>
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-1 pr-1 lg:pr-2 lg:border-r border-slate-200">
          <button onClick={handleZoomIn} className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2 py-1.5 lg:px-2.5 rounded-lg text-[12px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 active:shadow-none border border-transparent hover:border-slate-200 transition-all duration-300">
            <ZoomIn className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="hidden xl:inline">{t('network.toolbar.zoomIn')}</span>
          </button>
          <button onClick={handleZoomOut} className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2 py-1.5 lg:px-2.5 rounded-lg text-[12px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 active:shadow-none border border-transparent hover:border-slate-200 transition-all duration-300">
            <ZoomOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="hidden xl:inline">{t('network.toolbar.zoomOut')}</span>
          </button>

          {/* Zoom Percentage Card (Click to reset) */}
          <button onClick={handleReset} title="Reset Zoom" className="relative shrink-0 whitespace-nowrap z-10 flex items-center justify-center min-w-[3rem] px-1.5 py-1 bg-white/50 border border-slate-200 shadow-sm rounded-md select-none group hover:bg-slate-50 hover:border-indigo-200 active:scale-95 transition-all">
            <span className="text-[11px] font-extrabold text-slate-700 group-hover:text-indigo-600 transition-colors">{Math.round(zoomScale * 100)}%</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 group/controls shrink-0">
          <button onClick={handleCenter} className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2 py-1.5 lg:px-2.5 rounded-xl text-[12px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 active:shadow-none border border-transparent hover:border-indigo-100 transition-all duration-300">
            <Maximize className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden lg:inline">{t('network.toolbar.center')}</span>
          </button>
          
          <div className="relative shrink-0 w-[110px] lg:w-[130px] xl:w-[150px] focus-within:w-[140px] lg:focus-within:w-[160px] xl:focus-within:w-[180px] transition-all duration-300">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-indigo-400 group-focus-within/controls:text-indigo-600 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('network.toolbar.search')}
              className="w-full pl-8 pr-4 py-1.5 bg-white border border-indigo-200 shadow-sm rounded-xl text-[12px] font-medium placeholder:text-slate-400 text-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:shadow-md hover:border-indigo-300 transition-all duration-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button onClick={handleRefresh} disabled={isLoading} className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2 py-1.5 lg:px-2.5 rounded-xl text-[12px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 hover:shadow-sm hover:-translate-y-0.5 active:scale-95 active:translate-y-0 active:shadow-none border border-transparent hover:border-indigo-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-500 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{t('network.toolbar.refresh')}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 flex items-center gap-2 lg:gap-3 shrink-0 ml-auto pl-2 border-l border-indigo-100/50">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl shadow-sm border border-indigo-100">
          <div className="p-1.5 rounded-lg bg-indigo-100/50">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 leading-tight">{t('network.toolbar.totalMembers')}</span>
            <span className="text-[13px] font-extrabold text-slate-900 leading-tight">{totalMembers}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-2 bg-white rounded-xl shadow-sm border border-indigo-100">
          <div className="p-1.5 rounded-lg bg-purple-100/50">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 leading-tight">{t('network.toolbar.levels')}</span>
            <span className="text-[13px] font-extrabold text-slate-900 leading-tight">{maxLevel}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
