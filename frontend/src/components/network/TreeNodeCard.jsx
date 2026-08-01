import { useTranslation } from '../../hooks/useTranslation';
import { User } from 'lucide-react';

export default function TreeNodeCard({ user, onClick, isSelected, level = 0 }) {
  const { t } = useTranslation();

  // 1. Setup the Fallback Avatar (with safety net)
  const defaultUiAvatarUrl = import.meta.env.VITE_FALLBACK_PROF_PICTURE;
  const baseFallbackUrl = import.meta.env.VITE_FALLBACK_PROF_PICTURE || defaultUiAvatarUrl;
  const fallbackAvatar = `${baseFallbackUrl}${encodeURIComponent(user?.name || 'User')}&background=random`;

  // 2. Parse and construct the valid Avatar URL
  let avatarUrl = fallbackAvatar;
  
  if (user?.avatar) {
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

  // Package colors mapping based on the image
  const getPackageColor = (pkg) => {
    switch (pkg) {
      case 'Gold Package': return 'text-yellow-500';
      case 'Silver Package': return 'text-slate-400';
      case 'Diamond Package': return 'text-purple-500';
      case 'Premium Package': return 'text-emerald-500';
      default: return 'text-slate-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100">{t('network.tree.active')}</span>;
      case 'Inactive':
        return <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[10px] font-bold border border-rose-100">{t('network.tree.inactive')}</span>;
      case 'Pending':
        return <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-bold border border-amber-100">{t('network.tree.pending')}</span>;
      default:
        return null;
    }
  };

  const getLevelBorderColor = () => {
    if (user?.status === 'Inactive') return 'border-slate-300 border-dashed';
    if (level === 0) return 'border-indigo-500';
    if (level === 1) return 'border-blue-500';
    if (level === 2) return 'border-emerald-500';
    return 'border-indigo-100';
  };

  const getLevelBgColor = () => {
    if (user?.status === 'Inactive') return 'bg-slate-400';
    if (level === 0) return 'bg-indigo-600';
    if (level === 1) return 'bg-blue-600';
    if (level === 2) return 'bg-emerald-600';
    return 'bg-indigo-600';
  };

  return (
    <div
      onClick={() => onClick(user)}
      className={`relative w-60 bg-white rounded-xl border p-4 flex flex-row items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
        ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 shadow-[0_0_15px_rgba(99,102,241,0.2)] z-10' : 'shadow-sm hover:shadow-md'}
        ${getLevelBorderColor()}
      `}
    >
      {/* Node ID Badge */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold shadow-sm ${getLevelBgColor()}`}>
        {level}
      </div>

      {/* Avatar */}
      <div className={`w-12 h-12 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border-2 border-white shadow-sm shrink-0`}>
        {/* 3. Render the parsed URL with the onError fallback */}
        <img 
          src={avatarUrl} 
          alt={user?.name || 'User'} 
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackAvatar;
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 items-start text-left min-w-0">
        <h4 className="text-[14px] font-bold text-slate-900 truncate w-full">{user?.name}</h4>
        <span className={`text-[11px] font-extrabold mt-0.5 ${getPackageColor(user?.package)}`}>
          {user?.package}
        </span>
        <div className="mt-1.5">
          {getStatusBadge(user?.status)}
        </div>
      </div>
    </div>
  );
}