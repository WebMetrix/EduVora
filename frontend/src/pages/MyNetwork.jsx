import React, { useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight } from 'lucide-react';

// We will build these components next
import TeamDashboard from '../components/network/TeamDashboard';
import NetworkCharts from '../components/network/NetworkCharts';
import TreeControls from '../components/network/TreeControls';
import GenealogyTree from '../components/network/GenealogyTree';

export default function MyNetwork() {
  const { t } = useTranslation();

  // Lifted state for Tree Controls
  const transformComponentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAllExpanded, setIsAllExpanded] = useState(true);
  const [zoomScale, setZoomScale] = useState(0.65);

  return (
    <>
      {/* Header & Breadcrumbs */}
      <div>
        <h1 className="text-[24px] lg:text-[28px] font-bold text-slate-900 mb-1">
          {t('network.title')}
        </h1>
        <div className="hidden md:flex items-center text-[13px] font-medium text-slate-500 gap-1.5">
          <span>{t('network.breadcrumb1')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900">{t('network.breadcrumb2')}</span>
        </div>
      </div>

      {/* Top Stat Cards */}
      <TeamDashboard />

      {/* Charts Row */}
      <NetworkCharts />

      {/* Genealogy Tree Section */}
      <div className="flex flex-col gap-4">
        <TreeControls
          transformComponentRef={transformComponentRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isAllExpanded={isAllExpanded}
          setIsAllExpanded={setIsAllExpanded}
          zoomScale={zoomScale}
        />
        <GenealogyTree
          transformComponentRef={transformComponentRef}
          searchQuery={searchQuery}
          isAllExpanded={isAllExpanded}
          onZoomChange={setZoomScale}
        />
      </div>
    </>
  );
}