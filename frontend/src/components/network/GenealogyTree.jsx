import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useSelector, useDispatch } from 'react-redux';
import { MousePointerClick } from 'lucide-react';
import { fetchNetworkTree } from '../../redux/slices/networkSlice';
import TreeNodeCard from './TreeNodeCard';
import UserDetailsSidebar from './UserDetailsSidebar';

// Dynamic tree data is now fetched from Redux state
const TreeNode = ({ node, onNodeClick, selectedUserId, level = 0, searchQuery, isAllExpanded }) => {
  const [isLocalExpanded, setIsLocalExpanded] = useState(isAllExpanded);

  // Sync local expanded state with global toggle
  useEffect(() => {
    setIsLocalExpanded(isAllExpanded);
  }, [isAllExpanded]);

  const hasChildren = node.children && node.children.length > 0;
  
  const isSearchMatch = searchQuery && (
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    node.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div className={`relative z-10 rounded-xl transition-all duration-300 ${isSearchMatch ? 'ring-4 ring-yellow-400 ring-offset-4 shadow-xl scale-105' : ''}`}>
        <TreeNodeCard
          user={node}
          onClick={onNodeClick}
          isSelected={selectedUserId === node.id}
          level={level}
        />
      </div>

      {/* Children Container */}
      {hasChildren && isLocalExpanded && (
        <>
          {/* Vertical line going down from parent */}
          <div className="w-px h-8 bg-indigo-200"></div>

          <div className="flex relative">
            {node.children.map((child, index) => {
              const isFirst = index === 0;
              const isLast = index === node.children.length - 1;
              const hasSiblings = node.children.length > 1;

              return (
                <div key={child.id} className="flex flex-col items-center relative px-2 sm:px-6 xl:px-12">
                  {/* Horizontal line segment for this child */}
                  {hasSiblings && (
                    <div className={`absolute top-0 h-0.5 bg-indigo-200
                    ${isFirst ? 'left-1/2 right-0' : isLast ? 'left-0 right-1/2' : 'left-0 right-0'}
                  `}></div>
                  )}
                  {/* Vertical line going down to child */}
                  <div className="w-px h-8 bg-indigo-200"></div>
                  <TreeNode
                    node={child}
                    onNodeClick={onNodeClick}
                    selectedUserId={selectedUserId}
                    level={level + 1}
                    searchQuery={searchQuery}
                    isAllExpanded={isAllExpanded}
                  />
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default function GenealogyTree({ transformComponentRef, searchQuery, isAllExpanded, onZoomChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { treeData, isLoading, error } = useSelector((state) => state.network);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasInteractedMobile, setHasInteractedMobile] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNetworkTree());
  }, [dispatch]);

  // Once treeData is available and selectedUser is null, auto-select the root node
  useEffect(() => {
    if (treeData && !selectedUser) {
      setSelectedUser({ ...treeData, treeLevel: 0 });
    }
  }, [treeData, selectedUser]);

  if (isLoading) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-[500px] w-full bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl rounded-2xl border border-indigo-100/60 shadow-sm">
         <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !treeData) {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-[500px] w-full bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl rounded-2xl border border-indigo-100/60 shadow-sm text-slate-500">
         {error ? t(error) : t('network.errors.noData')}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-stretch w-full">
      <div className="flex-1 relative min-h-[500px] lg:min-h-0 group/card transition-all duration-300">
        <div className="absolute inset-0 bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl rounded-2xl border border-indigo-100/60 shadow-sm group-hover/card:shadow-lg group-hover/card:border-indigo-200 transition-all duration-300 overflow-hidden">

          {/* Decorative background flare */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

          {/* Clipping Area for Tree Nodes to disappear before edges */}
          <div className="absolute inset-3 overflow-hidden rounded-xl">

            {/* Zoom / Pan Wrapper */}
            <TransformWrapper
              ref={transformComponentRef}
              initialScale={0.65}
              minScale={0.3}
              maxScale={2}
              centerOnInit={true}
              wheel={{ step: 0.1 }}
              onTransformed={(ref) => onZoomChange && onZoomChange(ref.state.scale)}
              onInit={(ref) => onZoomChange && onZoomChange(ref.state.scale)}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>

                  <div className="min-w-max min-h-max pl-32 pr-12 pt-24 pb-32 flex justify-center relative">

                    {/* Level Indicators */}
                    <div className="absolute left-0 top-27.5 flex flex-col gap-36.25">
                      <div className="flex items-center gap-2 px-3 py-1 bg-indigo-100/50 text-indigo-700 rounded-lg text-[10px] font-extrabold shadow-sm border border-indigo-100">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        {t('network.tree.you')}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-blue-100/50 text-blue-700 rounded-lg text-[10px] font-extrabold shadow-sm border border-blue-100">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        {t('network.tree.level1')}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100/50 text-emerald-700 rounded-lg text-[10px] font-extrabold shadow-sm border border-emerald-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        {t('network.tree.level2')}
                      </div>
                    </div>

                    {/* The Tree */}
                    <TreeNode
                      node={treeData}
                      onNodeClick={(user, level) => {
                        setSelectedUser({ ...user, treeLevel: level });
                        setHasInteractedMobile(true);
                        // Optional slight delay to ensure UI renders before scroll
                        setTimeout(() => {
                          if (window.innerWidth < 1024 && sidebarRef.current) {
                            sidebarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }}
                      selectedUserId={selectedUser?.id}
                      level={0}
                      searchQuery={searchQuery}
                      isAllExpanded={isAllExpanded}
                    />

                  </div>
                </TransformComponent>
              )}
            </TransformWrapper>
          </div>

          {/* Legend Footer (Fixed at bottom inside tree area) */}
          <div className="absolute bottom-3 left-3 right-3 lg:bottom-6 lg:left-6 lg:right-auto flex flex-wrap justify-center items-center gap-2 lg:gap-6 px-3 lg:px-5 py-2 lg:py-3 bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-slate-100 z-10">
            <div className="flex items-center gap-1.5 lg:gap-2">
              <div className="w-5 lg:w-6 h-1 rounded-full bg-indigo-500"></div>
              <span className="text-[11px] lg:text-[12px] font-bold text-slate-700">{t('network.tree.you')}</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2">
              <div className="w-5 lg:w-6 h-1 rounded-full bg-blue-500"></div>
              <span className="text-[11px] lg:text-[12px] font-bold text-slate-700">{t('network.tree.level1')}</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2">
              <div className="w-5 lg:w-6 h-1 rounded-full bg-emerald-500"></div>
              <span className="text-[11px] lg:text-[12px] font-bold text-slate-700">{t('network.tree.level2')}</span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2">
              <div className="w-5 lg:w-6 h-1 rounded-full border-b-2 border-dashed border-slate-300"></div>
              <span className="text-[11px] lg:text-[12px] font-bold text-slate-700">{t('network.tree.cancelled')}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Hint (Hidden on Desktop, shown on Mobile until interaction) */}
      {!hasInteractedMobile && (
        <div className="flex lg:hidden flex-col items-center justify-center p-6 mt-4 bg-linear-to-br from-indigo-50/50 to-white/50 border border-indigo-100 rounded-2xl">
          <MousePointerClick className="w-8 h-8 text-indigo-400 mb-2 animate-bounce" />
          <span className="text-[14px] font-bold text-slate-500 text-center">{t('network.tree.mobileHint')}</span>
        </div>
      )}

      {/* Static User Details Panel on the right (or bottom on mobile) */}
      {selectedUser && (
        <div 
          ref={sidebarRef} 
          className={`w-full lg:w-85 shrink-0 ${!hasInteractedMobile ? 'hidden lg:block' : 'block'}`}
        >
          <UserDetailsSidebar
            user={selectedUser}
          />
        </div>
      )}
    </div>
  );
}
