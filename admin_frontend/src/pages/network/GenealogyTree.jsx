import React, { useState, useRef, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, User } from 'lucide-react';
import GenealogyStatsCards from '../../components/network/GenealogyStatsCards';
import GenealogyControlsBar from '../../components/network/GenealogyControlsBar';
import GenealogyTreeCanvas from '../../components/network/GenealogyTreeCanvas';
import MemberDetailsPanel from '../../components/network/MemberDetailsPanel';

const UPLINE_SPONSOR = {
  id: 'USR000001',
  name: 'Amit Kumar',
  email: 'amit.kumar01@example.com',
  mobile: '+91 98765 00001',
  package: 'Premium',
  registrationDate: '15 Jul 2026, 09:00 AM',
  joinedShort: '15 Jul 2026',
  sponsor: 'System Root',
  referralCode: 'USR000001',
  status: 'Active',
  totalReferrals: 1240,
  directReferrals: 18,
  indirectReferrals: 1222,
  avatar:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
};

const ROOT_MEMBER = {
  id: 'USR000125',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  mobile: '+91 98765 43210',
  package: 'Pro',
  registrationDate: '01 Aug 2026, 10:24 AM',
  joinedShort: '01 Aug 2026',
  sponsor: 'USR000001 (Amit Kumar)',
  referralCode: 'USR000125',
  status: 'Active',
  totalReferrals: 428,
  directReferrals: 3,
  indirectReferrals: 6,
  avatar:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
  children: [
    {
      id: 'USR000124',
      name: 'Priya Verma',
      email: 'priya.verma@example.com',
      mobile: '+91 98765 43211',
      package: 'Basic',
      registrationDate: '12 Aug 2026, 11:15 AM',
      joinedShort: '12 Aug 2026',
      sponsor: 'USR000125 (Rahul Sharma)',
      referralCode: 'USR000124',
      status: 'Active',
      group: 0,
      totalReferrals: 24,
      directReferrals: 2,
      indirectReferrals: 22,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
      children: [
        {
          id: 'USR000201',
          name: 'Karan Mehta',
          email: 'karan.mehta@example.com',
          mobile: '+91 98765 43221',
          package: 'Starter',
          registrationDate: '25 Aug 2026, 02:10 PM',
          joinedShort: '25 Aug 2026',
          sponsor: 'USR000124 (Priya Verma)',
          referralCode: 'USR000201',
          status: 'Active',
          totalReferrals: 5,
          directReferrals: 2,
          indirectReferrals: 3,
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
          children: [],
        },
        {
          id: 'USR000202',
          name: 'Riya Patel',
          email: 'riya.patel@example.com',
          mobile: '+91 98765 43222',
          package: 'Basic',
          registrationDate: '26 Aug 2026, 04:40 PM',
          joinedShort: '26 Aug 2026',
          sponsor: 'USR000124 (Priya Verma)',
          referralCode: 'USR000202',
          status: 'Pending KYC',
          totalReferrals: 2,
          directReferrals: 1,
          indirectReferrals: 1,
          avatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
          children: [],
        },
      ],
    },
    {
      id: 'USR000123',
      name: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      mobile: '+91 98765 43212',
      package: 'Pro',
      registrationDate: '14 Aug 2026, 09:45 AM',
      joinedShort: '14 Aug 2026',
      sponsor: 'USR000125 (Rahul Sharma)',
      referralCode: 'USR000123',
      status: 'Active',
      group: 0,
      totalReferrals: 16,
      directReferrals: 1,
      indirectReferrals: 15,
      avatar:
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
      children: [
        {
          id: 'USR000203',
          name: 'Suresh Yadav',
          email: 'suresh.yadav@example.com',
          mobile: '+91 98765 43223',
          package: 'Pro',
          registrationDate: '27 Aug 2026, 12:30 PM',
          joinedShort: '27 Aug 2026',
          sponsor: 'USR000123 (Amit Kumar)',
          referralCode: 'USR000203',
          status: 'Active',
          totalReferrals: 4,
          directReferrals: 1,
          indirectReferrals: 3,
          avatar:
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80',
          children: [],
        },
      ],
    },
    {
      id: 'USR000122',
      name: 'Neha Singh',
      email: 'neha.singh@example.com',
      mobile: '+91 98765 43213',
      package: 'Starter',
      registrationDate: '18 Aug 2026, 03:20 PM',
      joinedShort: '18 Aug 2026',
      sponsor: 'USR000125 (Rahul Sharma)',
      referralCode: 'USR000122',
      status: 'Pending KYC',
      group: 0,
      totalReferrals: 9,
      directReferrals: 2,
      indirectReferrals: 7,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&auto=format&fit=crop&q=80',
      children: [
        {
          id: 'USR000204',
          name: 'Anjali Singh',
          email: 'anjali.singh@example.com',
          mobile: '+91 98765 43224',
          package: 'Premium',
          registrationDate: '28 Aug 2026, 10:05 AM',
          joinedShort: '28 Aug 2026',
          sponsor: 'USR000122 (Neha Singh)',
          referralCode: 'USR000204',
          status: 'Active',
          totalReferrals: 3,
          directReferrals: 1,
          indirectReferrals: 2,
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
          children: [],
        },
        {
          id: 'USR000205',
          name: 'Rohit Das',
          email: 'rohit.das@example.com',
          mobile: '+91 98765 43225',
          package: 'Starter',
          registrationDate: '29 Aug 2026, 05:15 PM',
          joinedShort: '29 Aug 2026',
          sponsor: 'USR000122 (Neha Singh)',
          referralCode: 'USR000205',
          status: 'Inactive',
          totalReferrals: 0,
          directReferrals: 0,
          indirectReferrals: 0,
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&auto=format&fit=crop&q=80',
          children: [],
        },
      ],
    },
    {
      id: 'USR000121',
      name: 'Vikram Patel',
      email: 'vikram.patel@example.com',
      mobile: '+91 98765 43214',
      package: 'Premium',
      registrationDate: '20 Aug 2026, 01:05 PM',
      joinedShort: '20 Aug 2026',
      sponsor: 'USR000125 (Rahul Sharma)',
      referralCode: 'USR000121',
      status: 'Active',
      group: 1,
      totalReferrals: 19,
      directReferrals: 2,
      indirectReferrals: 17,
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80',
      children: [
        {
          id: 'USR000206',
          name: 'Aditya Rao',
          email: 'aditya.rao@example.com',
          mobile: '+91 98765 43226',
          package: 'Basic',
          registrationDate: '30 Aug 2026, 11:50 AM',
          joinedShort: '30 Aug 2026',
          sponsor: 'USR000121 (Vikram Patel)',
          referralCode: 'USR000206',
          status: 'Active',
          totalReferrals: 2,
          directReferrals: 1,
          indirectReferrals: 1,
          avatar:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80',
          children: [],
        },
        {
          id: 'USR000207',
          name: 'Pooja Nair',
          email: 'pooja.nair@example.com',
          mobile: '+91 98765 43227',
          package: 'Starter',
          registrationDate: '31 Aug 2026, 04:00 PM',
          joinedShort: '31 Aug 2026',
          sponsor: 'USR000121 (Vikram Patel)',
          referralCode: 'USR000207',
          status: 'Active',
          totalReferrals: 1,
          directReferrals: 1,
          indirectReferrals: 0,
          avatar:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
          children: [],
        },
      ],
    },
    {
      id: 'USR000120',
      name: 'Sneha Iyer',
      email: 'sneha.iyer@example.com',
      mobile: '+91 98765 43215',
      package: 'Pro',
      registrationDate: '22 Aug 2026, 06:30 PM',
      joinedShort: '22 Aug 2026',
      sponsor: 'USR000125 (Rahul Sharma)',
      referralCode: 'USR000120',
      status: 'Suspended',
      group: 1,
      totalReferrals: 7,
      directReferrals: 1,
      indirectReferrals: 6,
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
      children: [
        {
          id: 'USR000208',
          name: 'Manoj Gupta',
          email: 'manoj.gupta@example.com',
          mobile: '+91 98765 43228',
          package: 'Pro',
          registrationDate: '01 Sep 2026, 09:20 AM',
          joinedShort: '01 Sep 2026',
          sponsor: 'USR000120 (Sneha Iyer)',
          referralCode: 'USR000208',
          status: 'Inactive',
          totalReferrals: 0,
          directReferrals: 0,
          indirectReferrals: 0,
          avatar:
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80',
          children: [],
        },
      ],
    },
  ],
};

export default function GenealogyTree() {
  const navigate = useNavigate();
  const transformComponentRef = useRef(null);

  const { registry, parentMap } = useMemo(() => {
    const map = new Map();
    const parents = new Map();

    map.set(UPLINE_SPONSOR.id, { ...UPLINE_SPONSOR, children: [ROOT_MEMBER] });

    const walk = (node, parent) => {
      map.set(node.id, node);
      if (parent) parents.set(node.id, parent);
      (node.children || []).forEach((child) => walk(child, node));
    };

    walk(ROOT_MEMBER, UPLINE_SPONSOR);
    return { registry: map, parentMap: parents };
  }, []);

  const [rootMemberId, setRootMemberId] = useState(ROOT_MEMBER.id);
  const [selectedMember, setSelectedMember] = useState(ROOT_MEMBER);
  const [isDetailsOpenDesktop, setIsDetailsOpenDesktop] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchFeedback, setSearchFeedback] = useState(null);
  const [viewType, setViewType] = useState('downline');
  const [displayLevels, setDisplayLevels] = useState('1-2');
  const [isAllExpanded, setIsAllExpanded] = useState(true);
  const [zoomScale, setZoomScale] = useState(0.72);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const activeRoot = registry.get(rootMemberId) || ROOT_MEMBER;
  const activeUpline = parentMap.get(activeRoot.id) || null;

  const uplineChain = useMemo(() => {
    const chain = [];
    let current = registry.get(activeRoot.id);
    const seen = new Set();
    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      chain.unshift(current);
      current = parentMap.get(current.id) || null;
    }
    return chain;
  }, [activeRoot.id, parentMap, registry]);

  // Lock body scroll and close drawers on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileDrawerOpen(false);
        setIsFullscreen(false);
      }
    };

    if (isMobileDrawerOpen || isFullscreen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileDrawerOpen, isFullscreen]);

  const handleSelectMember = (member) => {
    const fullMember = registry.get(member.id) || member;
    setSelectedMember(fullMember);
    setIsDetailsOpenDesktop(true);
    setIsMobileDrawerOpen(true);
  };

  const handleSearchSubmit = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchFeedback(null);
      return;
    }

    const allNodes = Array.from(registry.values());
    const match = allNodes.find(
      (n) =>
        n.id.toLowerCase() === q ||
        (n.referralCode || '').toLowerCase() === q ||
        n.name.toLowerCase().includes(q) ||
        (n.email || '').toLowerCase().includes(q)
    );

    if (match) {
      setSelectedMember(match);
      setIsDetailsOpenDesktop(true);
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setIsMobileDrawerOpen(true);
      }
      setSearchFeedback({ type: 'success', message: `Found: ${match.name} (${match.id})` });
    } else {
      setSearchFeedback({ type: 'error', message: 'No matching member found' });
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSearchFeedback(null);
    setRootMemberId(ROOT_MEMBER.id);
    setSelectedMember(ROOT_MEMBER);
    setIsDetailsOpenDesktop(true);
    setViewType('downline');
    setDisplayLevels('1-2');
    setIsAllExpanded(true);
    transformComponentRef.current?.resetTransform();
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      transformComponentRef.current?.centerView(0.72);
    }, 450);
  };

  const handleViewMemberTree = (member) => {
    if (!member?.id) return;
    setRootMemberId(member.id);
    setViewType('downline');
    setIsAllExpanded(true);
    setIsMobileDrawerOpen(false);
    setTimeout(() => transformComponentRef.current?.centerView(0.9), 50);
  };

  const handleViewFullProfile = (member) => {
    setIsMobileDrawerOpen(false);
    navigate('/users/view', { state: { selectedUserId: member?.id } });
  };

  const handleZoomIn = () => transformComponentRef.current?.zoomIn(0.2);
  const handleZoomOut = () => transformComponentRef.current?.zoomOut(0.2);
  const handleResetZoom = () => transformComponentRef.current?.resetTransform();

  return (
    <div className="flex flex-col gap-4 sm:gap-5 animate-fade-in relative pb-1 sm:pb-2">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div>
          <h1 className="text-[20px] sm:text-[26px] lg:text-[28px] font-black text-slate-900 tracking-tight leading-tight">
            Network &amp; Referrals
          </h1>
          <p className="text-[12px] sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Genealogy Tree - View the referral hierarchy for a specific member.
          </p>
        </div>

        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-[12.5px] font-medium text-slate-500 flex-wrap">
          <Link to="/dashboard" className="hover:text-indigo-600 transition-colors cursor-pointer">
            Dashboard
          </Link>
          <span className="text-slate-300">/</span>
          <Link
            to="/network/referral-overview"
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Network &amp; Referrals
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600 font-bold">Genealogy Tree</span>
        </nav>
      </div>

      {/* Row 1: 4 Stat Counter Cards */}
      <GenealogyStatsCards />

      {/* Row 2: Search, View Type / Levels / Reset + Frontend Tree Controls Toolbar */}
      <GenealogyControlsBar
        transformComponentRef={transformComponentRef}
        zoomScale={zoomScale}
        isAllExpanded={isAllExpanded}
        setIsAllExpanded={setIsAllExpanded}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        searchQuery={searchQuery}
        setSearchQuery={(val) => {
          setSearchQuery(val);
          if (!val.trim()) setSearchFeedback(null);
        }}
        onSearchSubmit={handleSearchSubmit}
        searchFeedback={searchFeedback}
        viewType={viewType}
        setViewType={setViewType}
        displayLevels={displayLevels}
        setDisplayLevels={setDisplayLevels}
        onReset={handleReset}
      />

      {/* Row 3: Genealogy Tree Canvas (Left) + Zoom/Member Details Sidebar (Right on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Left: Genealogy Tree Canvas */}
        <div
          className={`${
            isDetailsOpenDesktop ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'
          } flex flex-col gap-3 transition-all duration-300`}
        >
          <div className={`relative w-full ${isDetailsOpenDesktop ? 'lg:flex-1 lg:min-h-0' : 'min-h-[520px]'}`}>
            <GenealogyTreeCanvas
              transformComponentRef={transformComponentRef}
              rootMember={activeRoot}
              uplineMember={activeUpline}
              uplineChain={uplineChain}
              viewType={viewType}
              displayLevels={displayLevels}
              isAllExpanded={isAllExpanded}
              selectedMemberId={selectedMember?.id}
              searchQuery={searchQuery}
              zoomScale={zoomScale}
              onZoomChange={setZoomScale}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
              onSelectMember={handleSelectMember}
            />
          </div>

          {/* Mobile Quick Button to Open Selected Member Details */}
          {selectedMember && (
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] active:scale-99 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[11px] font-bold text-slate-400 leading-tight">
                    Selected Member
                  </p>
                  <p className="text-[13px] font-black text-slate-900 truncate">
                    {selectedMember.name} ({selectedMember.id})
                  </p>
                </div>
              </div>
              <span className="text-[12px] font-bold text-indigo-600 shrink-0 ml-2">
                View Details
              </span>
            </button>
          )}
        </div>

        {/* Right: Desktop Zoom Bar + Member Details Card */}
        <div
          className={`hidden lg:flex flex-col gap-3 ${
            isDetailsOpenDesktop ? 'lg:col-span-4 xl:col-span-3' : 'lg:hidden'
          }`}
        >
          {/* Zoom & Fullscreen Controls Card matching mockup */}
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex-1 flex items-center justify-between bg-white border border-slate-200/80 rounded-2xl px-2.5 h-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-indigo-300 transition-colors">
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Zoom Out"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="text-[12px] font-extrabold text-slate-800 hover:text-indigo-600 px-2 py-0.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                {Math.round(zoomScale * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Zoom In"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-indigo-300 hover:text-indigo-600 text-slate-700 flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="Toggle Fullscreen Tree"
              aria-label="Toggle fullscreen tree"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Member Details Panel */}
          {selectedMember && (
            <div className="flex-1 flex flex-col">
              <MemberDetailsPanel
                member={selectedMember}
                isCurrentRoot={activeRoot.id === selectedMember.id}
                onClose={() => setIsDetailsOpenDesktop(false)}
                onViewFullProfile={handleViewFullProfile}
                onViewMemberTree={handleViewMemberTree}
              />
            </div>
          )}
        </div>
      </div>

      {/* Reopen Desktop Side Panel Button if user closed it */}
      {!isDetailsOpenDesktop && selectedMember && (
        <div className="hidden lg:flex justify-end">
          <button
            type="button"
            onClick={() => setIsDetailsOpenDesktop(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-600 text-[12px] font-bold shadow-sm hover:bg-indigo-50 transition-all cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>Show Member Details ({selectedMember.name})</span>
          </button>
        </div>
      )}

      {/* Mobile Bottom-Sheet Drawer for Member Details */}
      {isMobileDrawerOpen &&
        selectedMember &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[10000] lg:hidden flex items-end justify-center">
            <div
              onClick={() => setIsMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
            />

            <div className="relative z-10 w-full h-[88vh] max-h-[88vh] bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-slide-up pb-safe">
              {/* Pull Handle */}
              <div
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full flex justify-center py-2.5 bg-white shrink-0 cursor-pointer"
              >
                <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
              </div>

              <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                <MemberDetailsPanel
                  member={selectedMember}
                  isCurrentRoot={activeRoot.id === selectedMember.id}
                  onClose={() => setIsMobileDrawerOpen(false)}
                  onViewFullProfile={handleViewFullProfile}
                  onViewMemberTree={handleViewMemberTree}
                  isDrawer={true}
                />
              </div>

              <div className="p-3.5 border-t border-slate-100 bg-slate-50/90 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-bold text-[13px] shadow-2xs transition-all cursor-pointer text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
