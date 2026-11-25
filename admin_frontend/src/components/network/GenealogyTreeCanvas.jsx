import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  GitFork, ZoomIn, ZoomOut, Maximize2, Minimize2, MousePointerClick
} from 'lucide-react';
import GenealogyNodeCard from './GenealogyNodeCard';

const STATUS_LEGEND = [
  { label: 'Active', dot: 'bg-emerald-500' },
  { label: 'Inactive', dot: 'bg-rose-500' },
  { label: 'Pending KYC', dot: 'bg-amber-400' },
  { label: 'Suspended', dot: 'bg-slate-400' },
];

export default function GenealogyTreeCanvas({
  transformComponentRef,
  rootMember,
  uplineMember,
  uplineChain = [],
  viewType = 'downline',
  displayLevels = '1-2',
  isAllExpanded = true,
  selectedMemberId,
  searchQuery = '',
  zoomScale = 1,
  onZoomChange,
  isFullscreen,
  onToggleFullscreen,
  onSelectMember,
}) {
  // Track local collapsed state per Level-1 branch, synced with global Expand All / Collapse All
  const [collapsedNodes, setCollapsedNodes] = useState({});

  useEffect(() => {
    setCollapsedNodes({});
  }, [isAllExpanded, rootMember?.id]);

  const isNodeExpanded = (nodeId) => {
    if (nodeId in collapsedNodes) return collapsedNodes[nodeId];
    return isAllExpanded;
  };

  const toggleNodeChildren = (nodeId) => {
    setCollapsedNodes((prev) => ({
      ...prev,
      [nodeId]: !(nodeId in prev ? prev[nodeId] : isAllExpanded),
    }));
  };

  const isMatch = (member) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || !member) return false;
    return (
      member.name.toLowerCase().includes(q) ||
      member.id.toLowerCase().includes(q) ||
      (member.email || '').toLowerCase().includes(q) ||
      (member.referralCode || '').toLowerCase().includes(q)
    );
  };

  const handleZoomIn = () => transformComponentRef.current?.zoomIn(0.2);
  const handleZoomOut = () => transformComponentRef.current?.zoomOut(0.2);
  const handleResetTransform = () => transformComponentRef.current?.resetTransform();

  const showLevel2 = displayLevels !== '1';
  const children = rootMember?.children || [];

  // Split Level 1 children into 2 visual clusters when grouped (matching mockup 3 + 2)
  const hasExplicitGroups = children.some((c) => typeof c.group === 'number');
  const level1Groups = hasExplicitGroups
    ? [
        children.filter((c) => c.group === 0),
        children.filter((c) => c.group === 1),
      ].filter((g) => g.length > 0)
    : children.length > 0
    ? [children]
    : [];

  const renderLevel1CardWithLevel2 = (member, idx, totalInGroup) => {
    const isFirst = idx === 0;
    const isLast = idx === totalInGroup - 1;
    const hasSiblings = totalInGroup > 1;
    const subChildren = member.children || [];
    const branchExpanded = isNodeExpanded(member.id);

    return (
      <div key={member.id} className="flex flex-col items-center relative px-1">
        {/* Horizontal branch bar connecting siblings */}
        {hasSiblings && (
          <div
            className={`absolute top-0 h-px bg-indigo-200 ${
              isFirst ? 'left-1/2 right-0' : isLast ? 'left-0 right-1/2' : 'left-0 right-0'
            }`}
          />
        )}
        {/* Vertical drop to Level 1 Card */}
        <div className="w-px h-3.5 bg-indigo-200" />

        <GenealogyNodeCard
          member={member}
          variant="level1"
          isSelected={selectedMemberId === member.id}
          isSearchMatch={isMatch(member)}
          onClick={onSelectMember}
        />

        {/* Level 2 Children */}
        {showLevel2 && subChildren.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="w-px h-3 bg-indigo-200" />
            <button
              type="button"
              onClick={() => toggleNodeChildren(member.id)}
              title={branchExpanded ? 'Click to collapse Level 2' : 'Click to expand Level 2'}
              className="px-2.5 py-0.5 rounded-lg bg-indigo-100/80 hover:bg-indigo-200/80 text-indigo-700 border border-indigo-200/70 text-[9.5px] font-bold whitespace-nowrap shadow-2xs transition-colors cursor-pointer"
            >
              Level 2 - {subChildren.length} {subChildren.length === 1 ? 'Member' : 'Members'}
              {!branchExpanded ? ' (+)' : ''}
            </button>

            {branchExpanded && (
              <>
                <div className="w-px h-3 bg-indigo-200" />
                <div className="flex relative">
                  {subChildren.map((sub, sIdx) => {
                    const subFirst = sIdx === 0;
                    const subLast = sIdx === subChildren.length - 1;
                    const subHasSiblings = subChildren.length > 1;

                    return (
                      <div key={sub.id} className="flex flex-col items-center relative px-1">
                        {subHasSiblings && (
                          <div
                            className={`absolute top-0 h-px bg-indigo-200 ${
                              subFirst
                                ? 'left-1/2 right-0'
                                : subLast
                                ? 'left-0 right-1/2'
                                : 'left-0 right-0'
                            }`}
                          />
                        )}
                        <div className="w-px h-3 bg-indigo-200" />
                        <GenealogyNodeCard
                          member={sub}
                          variant="level2"
                          isSelected={selectedMemberId === sub.id}
                          isSearchMatch={isMatch(sub)}
                          onClick={onSelectMember}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderDownlineTree = () => {
    const rootExpanded = isNodeExpanded(rootMember.id);

    return (
      <div className="flex flex-col items-center">
        {/* Sponsor (Upline) Dashed Card */}
        {uplineMember && (
          <>
            <GenealogyNodeCard
              member={uplineMember}
              variant="upline"
              isSelected={selectedMemberId === uplineMember.id}
              isSearchMatch={isMatch(uplineMember)}
              onClick={onSelectMember}
            />
            <div className="w-px h-4 bg-indigo-200" />
          </>
        )}

        {/* Focused Root Member Card */}
        <GenealogyNodeCard
          member={rootMember}
          variant="root"
          isSelected={selectedMemberId === rootMember.id}
          isSearchMatch={isMatch(rootMember)}
          onClick={onSelectMember}
        />

        {/* Level 1 Branching */}
        {level1Groups.length > 0 && rootExpanded && (
          <>
            <div className="w-px h-4 bg-indigo-200" />

            <div className="flex items-start justify-center relative">
              {level1Groups.map((groupMembers, gIdx) => {
                const isFirstGroup = gIdx === 0;
                const isLastGroup = gIdx === level1Groups.length - 1;
                const hasMultipleGroups = level1Groups.length > 1;

                return (
                  <div key={gIdx} className="flex flex-col items-center relative px-1.5 sm:px-2">
                    {/* Horizontal bar splitting into Level 1 groups */}
                    {hasMultipleGroups && (
                      <div
                        className={`absolute top-0 h-px bg-indigo-200 ${
                          isFirstGroup
                            ? 'left-1/2 right-0'
                            : isLastGroup
                            ? 'left-0 right-1/2'
                            : 'left-0 right-0'
                        }`}
                      />
                    )}
                    <div className="w-px h-3.5 bg-indigo-200" />

                    {/* Group Pill */}
                    <span className="px-3.5 py-0.5 rounded-lg bg-indigo-100/80 text-indigo-700 border border-indigo-200/70 text-[10.5px] font-bold whitespace-nowrap shadow-2xs">
                      Level 1 (Direct Referrals) - {groupMembers.length}{' '}
                      {groupMembers.length === 1 ? 'Member' : 'Members'}
                    </span>

                    <div className="w-px h-3.5 bg-indigo-200" />

                    {/* Group Members Row */}
                    <div className="flex items-start justify-center relative">
                      {groupMembers.map((member, mIdx) =>
                        renderLevel1CardWithLevel2(member, mIdx, groupMembers.length)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {level1Groups.length > 0 && !rootExpanded && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => toggleNodeChildren(rootMember.id)}
              className="px-4 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-bold shadow-2xs cursor-pointer transition-colors"
            >
              Collapsed ({children.length} Direct Referrals) • Click to Expand
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderUplineTree = () => {
    const chain = uplineChain.length > 0 ? uplineChain : [uplineMember, rootMember].filter(Boolean);

    return (
      <div className="flex flex-col items-center py-2">
        <span className="mb-4 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-bold">
          Upline Sponsor Lineage ({chain.length} {chain.length === 1 ? 'Node' : 'Nodes'})
        </span>

        {chain.map((node, index) => {
          const isRootTarget = node.id === rootMember.id;
          const levelFromRoot = chain.length - 1 - index;
          const isLast = index === chain.length - 1;

          return (
            <div key={node.id} className="flex flex-col items-center">
              <GenealogyNodeCard
                member={node}
                variant={isRootTarget ? 'root' : 'upline'}
                uplineBadgeText={
                  levelFromRoot === 1
                    ? 'Direct Sponsor (Upline +1)'
                    : `Upline Sponsor (+${levelFromRoot})`
                }
                isSelected={selectedMemberId === node.id}
                isSearchMatch={isMatch(node)}
                onClick={onSelectMember}
              />
              {!isLast && <div className="w-px h-8 bg-indigo-300" />}
            </div>
          );
        })}

        {children.length > 0 && (
          <>
            <div className="w-px h-6 bg-indigo-200" />
            <span className="px-4 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold">
              {children.length} Direct Downline {children.length === 1 ? 'Member' : 'Members'} Below
            </span>
          </>
        )}
      </div>
    );
  };

  const zoomPercent = Math.round(zoomScale * 100);

  const canvasContent = (
    <div
      className={`relative overflow-hidden bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.10)] hover:border-indigo-300 transition-all duration-300 flex flex-col ${
        isFullscreen
          ? 'w-full h-full rounded-none sm:rounded-3xl'
          : 'rounded-2xl sm:rounded-3xl w-full h-full lg:absolute lg:inset-0'
      }`}
    >
      {/* Subtle hover flare */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400/8 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      {/* Card Header: Title + Status Legend (+ Mobile/Fullscreen Zoom Controls) */}
      <div className="relative z-20 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/95 backdrop-blur-md shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
              <GitFork className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-[14.5px] sm:text-[15.5px] font-black text-slate-900 tracking-tight">
              Genealogy Tree
            </h3>
          </div>

          {/* Mobile / Fullscreen compact zoom controls */}
          <div className={`flex items-center gap-1.5 ${isFullscreen ? '' : 'lg:hidden'}`}>
            <div className="flex items-center bg-slate-50 border border-slate-200/90 rounded-lg p-0.5">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1 rounded hover:bg-white text-slate-600 cursor-pointer"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleResetTransform}
                className="px-1.5 text-[11px] font-bold text-slate-700 cursor-pointer"
                title="Reset zoom"
              >
                {zoomPercent}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1 rounded hover:bg-white text-slate-600 cursor-pointer"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/90 text-slate-600 hover:text-indigo-600 cursor-pointer"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-[11.5px] font-semibold text-slate-600">
          {STATUS_LEGEND.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${item.dot}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive TransformWrapper Canvas (matches frontend react-zoom-pan-pinch) */}
      <div
        className={`relative z-10 flex-1 overflow-hidden bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:18px_18px] bg-slate-50/35 ${
          isFullscreen ? 'min-h-0' : 'h-[430px] sm:h-[480px] lg:h-auto lg:min-h-0'
        }`}
      >
        <TransformWrapper
          ref={transformComponentRef}
          initialScale={0.72}
          minScale={0.3}
          maxScale={2}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
          onTransformed={(ref) => onZoomChange?.(ref.state.scale)}
          onInit={(ref) => onZoomChange?.(ref.state.scale)}
        >
          {() => (
            <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
              <div className="min-w-max min-h-max px-6 sm:px-10 pt-5 pb-12 flex justify-center">
                {viewType === 'upline' ? renderUplineTree() : renderDownlineTree()}
              </div>
            </TransformComponent>
          )}
        </TransformWrapper>

        {/* Bottom Helper Hint */}
        <div className="absolute bottom-3 left-3 flex items-center pointer-events-none z-20">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs text-[10.5px] font-semibold text-slate-500">
            <MousePointerClick className="w-3 h-3 text-indigo-500" />
            <span className="hidden sm:inline">
              Drag to pan • Scroll to zoom • Click any node for details
            </span>
            <span className="sm:hidden">Pinch/drag to explore • Tap node for details</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isFullscreen && typeof document !== 'undefined') {
    return createPortal(
      <div className="fixed inset-0 z-[10000] bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 lg:p-6 flex items-center justify-center animate-fade-in">
        <div className="w-full h-full">{canvasContent}</div>
      </div>,
      document.body
    );
  }

  return canvasContent;
}
