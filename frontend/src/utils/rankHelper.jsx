import React from 'react';
import { 
    Trophy, Star, Users, DollarSign, Target, ArrowUpCircle, 
    Award, Sparkles, CheckCircle2, Clock, Lock, ShieldCheck, Zap
} from 'lucide-react';

/**
 * Returns the appropriate Lucide icon component for an achievement by name
 */
export const getAchievementIcon = (iconName, className = "w-5 h-5") => {
    switch (iconName) {
        case 'Star':
            return <Star className={`${className} text-yellow-500 fill-yellow-500`} />;
        case 'Users':
            return <Users className={`${className} text-indigo-600`} />;
        case 'DollarSign':
            return <DollarSign className={`${className} text-emerald-600`} />;
        case 'Target':
            return <Target className={`${className} text-blue-600`} />;
        case 'ArrowUpCircle':
            return <ArrowUpCircle className={`${className} text-purple-600`} />;
        case 'ShieldCheck':
            return <ShieldCheck className={`${className} text-emerald-600`} />;
        case 'Zap':
            return <Zap className={`${className} text-amber-500`} />;
        case 'Award':
            return <Award className={`${className} text-purple-600`} />;
        case 'Trophy':
        default:
            return <Trophy className={`${className} text-yellow-600`} />;
    }
};

/**
 * Maps rank names to consistent color palettes, gradients, and badges
 */
export const getRankTheme = (rankName = 'Bronze') => {
    const name = (rankName || '').toLowerCase();
    switch (name) {
        case 'silver':
            return {
                name: 'Silver',
                color: '#C0C0C0',
                textClass: 'text-slate-700',
                bgGradient: 'from-[#F8FAFC] to-[#EDF2F7]',
                borderColor: 'border-slate-300',
                badgeBg: 'bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 text-slate-900',
                glowColor: 'rgba(148, 163, 184, 0.3)',
                iconFill: 'fill-slate-300 text-slate-500',
                trophyFrom: '#E2E8F0',
                trophyTo: '#94A3B8'
            };
        case 'gold':
            return {
                name: 'Gold',
                color: '#FFD700',
                textClass: 'text-amber-800',
                bgGradient: 'from-[#FFFCF1] to-[#FFF8E1]',
                borderColor: 'border-yellow-200/50',
                badgeBg: 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-yellow-900',
                glowColor: 'rgba(234, 179, 8, 0.3)',
                iconFill: 'fill-yellow-400 text-yellow-600',
                trophyFrom: '#FDE047',
                trophyTo: '#CA8A04'
            };
        case 'platinum':
            return {
                name: 'Platinum',
                color: '#E5E4E2',
                textClass: 'text-indigo-900',
                bgGradient: 'from-[#F5F3FF] to-[#EDE9FE]',
                borderColor: 'border-indigo-200/50',
                badgeBg: 'bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-500 text-indigo-950',
                glowColor: 'rgba(99, 102, 241, 0.3)',
                iconFill: 'fill-indigo-300 text-indigo-600',
                trophyFrom: '#C4B5FD',
                trophyTo: '#6366F1'
            };
        case 'diamond':
            return {
                name: 'Diamond',
                color: '#B9F2FF',
                textClass: 'text-cyan-900',
                bgGradient: 'from-[#F0FDFA] to-[#CCFBF1]',
                borderColor: 'border-cyan-200/50',
                badgeBg: 'bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 text-cyan-950',
                glowColor: 'rgba(20, 184, 166, 0.3)',
                iconFill: 'fill-cyan-300 text-cyan-600',
                trophyFrom: '#67E8F9',
                trophyTo: '#0E7490'
            };
        case 'bronze':
        default:
            return {
                name: 'Bronze',
                color: '#CD7F32',
                textClass: 'text-amber-900',
                bgGradient: 'from-[#FFFDF7] to-[#FEF3C7]',
                borderColor: 'border-amber-200/50',
                badgeBg: 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-amber-50',
                glowColor: 'rgba(217, 119, 6, 0.3)',
                iconFill: 'fill-amber-400 text-amber-700',
                trophyFrom: '#F59E0B',
                trophyTo: '#B45309'
            };
    }
};

/**
 * Format date string into readable format (e.g., '15 Sep 2026')
 */
export const formatRankDate = (dateStr) => {
    if (!dateStr) return '-';
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return '-';

    return dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    });
};

/**
 * Format currency in Indian Rupees (e.g., '₹15,000')
 */
export const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return `₹${num.toLocaleString('en-IN')}`;
};
