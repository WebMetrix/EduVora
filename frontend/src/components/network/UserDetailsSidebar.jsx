import { useTranslation } from '../../hooks/useTranslation';
import { User, X, Calendar, Hash, Users, Shield, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserDetailsSidebar({ user, onClose }) {
  const { t } = useTranslation();

  if (!user) return null;

  const getPackageColor = (pkg) => {
    switch(pkg) {
      case 'Gold Package': return 'text-yellow-500';
      case 'Silver Package': return 'text-slate-500';
      case 'Diamond Package': return 'text-purple-500';
      case 'Premium Package': return 'text-emerald-500';
      default: return 'text-slate-500';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
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

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full lg:w-[340px] shrink-0 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-end p-4">
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 flex flex-col pb-6">
          
          {/* Profile Basic Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-slate-400 m-auto mt-4" />
              )}
            </div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-[16px] font-bold text-slate-900 leading-tight">{user.name}</h3>
              <span className={`text-[12px] font-extrabold ${getPackageColor(user.package)}`}>
                {user.package}
              </span>
              {getStatusBadge(user.status)}
            </div>
          </div>

          {/* Details List */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <div className="w-[120px] flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Hash className="w-4 h-4" />
                <span>{t('network.details.userId')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900">{user.userId}</span>
            </div>

            <div className="flex items-center">
              <div className="w-[120px] flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Shield className="w-4 h-4" />
                <span>{t('network.details.sponsor')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900">{user.sponsor}</span>
            </div>

            <div className="flex items-center">
              <div className="w-[120px] flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>{t('network.details.joiningDate')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900">{user.joiningDate}</span>
            </div>

            <div className="flex items-center">
              <div className="w-[120px] flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Package className="w-4 h-4" />
                <span>{t('network.details.package')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900">{user.package}</span>
            </div>

            <div className="flex items-center">
              <div className="w-[120px] flex items-center gap-2 text-[12px] font-bold text-slate-500">
                <Users className="w-4 h-4" />
                <span>{t('network.details.childrenCount')}</span>
              </div>
              <span className="text-[13px] font-bold text-slate-900">{user.childrenCount}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white text-[14px] font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20">
              <User className="w-4 h-4" />
              <span>{t('network.details.viewFullProfile')}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
