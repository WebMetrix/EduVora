import { useTranslation } from '../../hooks/useTranslation';
import { User, Calendar, Hash, Users, Shield, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function UserDetailsSidebar({ user }) {
  const { t } = useTranslation();

  if (!user) return null;

  // 1. Setup the Fallback Avatar (with safety net)
  const defaultUiAvatarUrl = import.meta.env.VITE_FALLBACK_PROF_PICTURE;
  const baseFallbackUrl = import.meta.env.VITE_FALLBACK_PROF_PICTURE || defaultUiAvatarUrl;
  const fallbackAvatar = `${baseFallbackUrl}${encodeURIComponent(user.name || 'User')}&background=random`;

  // 2. Parse and construct the valid Avatar URL
  let avatarUrl = fallbackAvatar;

  if (user?.avatar) {
    // If it's somehow already a full HTTP url, use it, otherwise parse it
    if (user.avatar.startsWith('http')) {
      avatarUrl = user.avatar;
    } else {
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
      const normalizedPath = user.avatar.replace(/\\/g, '/');
      const folderStartIndex = normalizedPath.indexOf('UserData');

      if (folderStartIndex !== -1) {
        const relativePath = normalizedPath.substring(folderStartIndex);
        avatarUrl = `${baseUrl}/${relativePath}`;
      } else {
        avatarUrl = `${baseUrl}/${normalizedPath.replace(/^\/+/, '')}`;
      }
    }
  }

  const getPackageColor = (pkgId) => {
    switch (pkgId) {
      case 3: return 'text-yellow-500'; // Gold
      case 2: return 'text-slate-500';  // Silver
      case 4: return 'text-purple-500'; // Diamond
      case 1: return 'text-amber-600';  // Bronze
      default: return 'text-slate-500'; // Unknown or None
    }
  };

  const getStatusBadge = (statusId) => {
    switch (statusId) {
      case 3:
        return <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100">{t('network.tree.active')}</span>;
      case 4:
        return <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[10px] font-bold border border-rose-100">{t('network.tree.cancelled')}</span>;
      case 2:
        return <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">{t('network.tree.registered')}</span>;
      case 1:
        return <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-bold border border-amber-100">{t('network.tree.pending')}</span>;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full lg:w-85 shrink-0 min-h-[460px] bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl rounded-2xl border border-indigo-100/60 shadow-sm flex flex-col relative group/card transition-all duration-300 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 overflow-hidden"
      >
        {/* Decorative background flare */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

        <div className="relative z-10 px-6 flex flex-col h-full py-6 justify-center">

          {/* Profile Basic Info */}
          <div className="flex flex-col items-center justify-center text-center gap-3 mb-8">
            <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden shrink-0 border-2 border-white shadow-sm">
              {/* 3. Implemented the parsed URL and an onError fallback */}
              <img
                src={avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite fallback loops
                  e.currentTarget.src = fallbackAvatar;
                }}
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-[18px] font-bold text-slate-900 leading-tight">{user.name}</h3>
              <span className={`text-[13px] font-extrabold ${getPackageColor(user.packageId)}`}>
                {user.package}
              </span>
              <div className="mt-1">
                {getStatusBadge(user.statusId)}
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Hash className="w-4 h-4" />
                <span>{t('network.details.userId')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900 text-right">{user.userId}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Shield className="w-4 h-4" />
                <span>{t('network.details.sponsor')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900 text-right">{user.sponsor}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>{t('network.details.joiningDate')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900 text-right">{user.joiningDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Package className="w-4 h-4" />
                <span>{t('network.details.package')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900 text-right">{user.package}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Users className="w-4 h-4" />
                <span>{t('network.details.childrenCount')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900 text-right">{user.childrenCount}</span>
            </div>
          </div>

          {/* Action Button Container (Always present to maintain fixed height) */}
          <div className={`mt-8 ${user.treeLevel === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <Link to="/profile" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white text-[14px] font-bold hover:bg-indigo-700 transition-all duration-300 shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/40 hover:-translate-y-1 active:scale-95 group">
              <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>{t('network.details.viewFullProfile')}</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
