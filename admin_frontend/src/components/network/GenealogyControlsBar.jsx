import React from 'react';
import {
  Search, ChevronDown, X, Plus, Minus, ZoomIn, ZoomOut, Maximize, RefreshCw, RotateCcw
} from 'lucide-react';

export default function GenealogyControlsBar({
  transformComponentRef,
  zoomScale = 1,
  isAllExpanded,
  setIsAllExpanded,
  isRefreshing,
  onRefresh,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  searchFeedback,
  viewType,
  setViewType,
  displayLevels,
  setDisplayLevels,
  onReset,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const handleZoomIn = () => transformComponentRef.current?.zoomIn(0.2);
  const handleZoomOut = () => transformComponentRef.current?.zoomOut(0.2);
  const handleCenter = () => transformComponentRef.current?.centerView(1);
  const handleResetZoom = () => transformComponentRef.current?.resetTransform();

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4">
      {/* Row 2A: Search Member + View Type / Display Levels / Reset (Mockup Layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
        {/* Left Card: Search Member */}
        <form
          onSubmit={handleSubmit}
          className="xl:col-span-6 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-center"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <label
              htmlFor="genealogy-member-search"
              className="text-[12px] font-bold text-slate-700 tracking-tight"
            >
              Search Member <span className="text-rose-500">*</span>
            </label>
            {searchFeedback && (
              <span
                className={`text-[11px] font-bold ${
                  searchFeedback.type === 'error' ? 'text-rose-600' : 'text-indigo-600'
                }`}
              >
                {searchFeedback.message}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="genealogy-member-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter User ID, name, email or referral code"
                className="w-full h-10 bg-slate-50/70 hover:bg-white focus:bg-white border border-slate-200/90 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-xl pl-9 pr-8 text-[12.5px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 p-0.5 rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="h-10 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-[12.5px] font-bold shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all cursor-pointer shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* Right Card: View Type, Display Levels & Reset */}
        <div className="xl:col-span-6 relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 p-3.5 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            {/* View Type Toggle */}
            <div className="sm:col-span-5">
              <span className="block text-[12px] font-bold text-slate-700 mb-1.5 tracking-tight">
                View Type
              </span>
              <div className="grid grid-cols-2 bg-slate-50 border border-slate-200/90 rounded-xl p-1 h-10">
                <button
                  type="button"
                  onClick={() => setViewType('downline')}
                  className={`rounded-lg text-[11.5px] font-bold transition-all cursor-pointer px-2 truncate ${
                    viewType === 'downline'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-white'
                  }`}
                >
                  Downline View
                </button>
                <button
                  type="button"
                  onClick={() => setViewType('upline')}
                  className={`rounded-lg text-[11.5px] font-bold transition-all cursor-pointer px-2 truncate ${
                    viewType === 'upline'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-white'
                  }`}
                >
                  Upline View
                </button>
              </div>
            </div>

            {/* Display Levels Select */}
            <div className="sm:col-span-4">
              <label
                htmlFor="genealogy-display-levels"
                className="block text-[12px] font-bold text-slate-700 mb-1.5 tracking-tight"
              >
                Display Levels
              </label>
              <div className="relative">
                <select
                  id="genealogy-display-levels"
                  value={displayLevels}
                  onChange={(e) => setDisplayLevels(e.target.value)}
                  className="w-full h-10 bg-white border border-slate-200/90 hover:border-indigo-300 focus:border-indigo-500 rounded-xl pl-3 pr-8 text-[12px] font-bold text-slate-800 appearance-none focus:outline-none transition-all cursor-pointer shadow-2xs"
                >
                  <option value="1-2">Level 1 - 2</option>
                  <option value="1">Level 1 Only</option>
                  <option value="all">All Levels</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Reset Button */}
            <div className="sm:col-span-3">
              <button
                type="button"
                onClick={onReset}
                className="w-full h-10 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 active:scale-98 text-slate-700 text-[12.5px] font-bold shadow-2xs transition-all cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2B: Frontend-style Tree Controls Toolbar (Expand/Collapse, Zoom In/Out/%, Center, Refresh) */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 px-3 py-2.5 sm:px-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)] hover:border-indigo-300 transition-all duration-300 flex flex-wrap items-center justify-between gap-2.5 group/toolbar">
        {/* Subtle hover flare */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/8 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/toolbar:scale-125 transition-transform duration-700" />

        <div className="relative z-10 flex flex-wrap items-center gap-2 lg:gap-3 w-full justify-between">
          {/* Left Controls: Expand / Collapse + Zoom + Center + Refresh */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            {/* Expand / Collapse */}
            <div className="flex items-center gap-1 pr-1.5 lg:pr-3 sm:border-r border-slate-200">
              <button
                type="button"
                onClick={() => setIsAllExpanded(true)}
                className={`flex items-center shrink-0 whitespace-nowrap gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-bold transition-all duration-300 border cursor-pointer ${
                  isAllExpanded
                    ? 'bg-indigo-50/90 text-indigo-600 border-indigo-200 shadow-2xs'
                    : 'text-slate-600 border-transparent hover:text-indigo-600 hover:bg-indigo-50/80 hover:border-indigo-100 active:scale-95'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-indigo-500" />
                <span>Expand All</span>
              </button>
              <button
                type="button"
                onClick={() => setIsAllExpanded(false)}
                className={`flex items-center shrink-0 whitespace-nowrap gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-bold transition-all duration-300 border cursor-pointer ${
                  !isAllExpanded
                    ? 'bg-indigo-50/90 text-indigo-600 border-indigo-200 shadow-2xs'
                    : 'text-slate-600 border-transparent hover:text-indigo-600 hover:bg-indigo-50/80 hover:border-indigo-100 active:scale-95'
                }`}
              >
                <Minus className="w-3.5 h-3.5 text-indigo-500" />
                <span>Collapse All</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 pr-1.5 lg:pr-3 sm:border-r border-slate-200">
              <button
                type="button"
                onClick={handleZoomIn}
                className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-xs hover:-translate-y-0.5 active:scale-95 active:translate-y-0 border border-transparent hover:border-slate-200 transition-all duration-300 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Zoom In</span>
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-xs hover:-translate-y-0.5 active:scale-95 active:translate-y-0 border border-transparent hover:border-slate-200 transition-all duration-300 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Zoom Out</span>
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                title="Reset Zoom"
                className="relative shrink-0 whitespace-nowrap flex items-center justify-center min-w-[3.25rem] px-2 py-1 bg-slate-50 border border-slate-200 shadow-2xs rounded-lg select-none hover:bg-white hover:border-indigo-300 active:scale-95 transition-all cursor-pointer"
              >
                <span className="text-[11px] font-extrabold text-slate-700 hover:text-indigo-600 transition-colors">
                  {Math.round(zoomScale * 100)}%
                </span>
              </button>
            </div>

            {/* Center & Refresh Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCenter}
                className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 hover:shadow-xs hover:-translate-y-0.5 active:scale-95 active:translate-y-0 border border-transparent hover:border-indigo-100 transition-all duration-300 cursor-pointer"
                title="Center Tree View"
              >
                <Maximize className="w-3.5 h-3.5 text-indigo-500" />
                <span>Center</span>
              </button>

              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 hover:shadow-xs hover:-translate-y-0.5 active:scale-95 active:translate-y-0 border border-transparent hover:border-indigo-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                title="Refresh Tree"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-indigo-500 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                <span>Refresh</span>
              </button>

              <button
                type="button"
                onClick={handleResetZoom}
                className="flex items-center shrink-0 whitespace-nowrap gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-bold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100/80 hover:shadow-xs hover:-translate-y-0.5 active:scale-95 active:translate-y-0 border border-indigo-200/80 transition-all duration-300 cursor-pointer"
                title="Reset Zoom & Pan"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
