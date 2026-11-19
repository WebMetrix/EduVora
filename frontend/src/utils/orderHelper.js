export const getPackageUI = (packageId, t) => {
    const id = Number(packageId);
    switch (id) {
        case 1:
            return {
                level: t('orders.levels.beginner'),
                levelColor: 'bg-purple-100 text-purple-600',
                iconBg: 'bg-indigo-900'
            };
        case 2:
            return {
                level: t('orders.levels.intermediate'),
                levelColor: 'bg-indigo-100 text-indigo-600',
                iconBg: 'bg-emerald-700'
            };
        case 3:
            return {
                level: t('orders.levels.advanced'),
                levelColor: 'bg-blue-100 text-blue-600',
                iconBg: 'bg-slate-900'
            };
        case 4:
            return {
                level: t('orders.levels.pro'),
                levelColor: 'bg-amber-100 text-amber-600',
                iconBg: 'bg-amber-900'
            };
        default:
            return {
                level: t('orders.levels.standard'),
                levelColor: 'bg-slate-100 text-slate-600',
                iconBg: 'bg-indigo-900'
            };
    }
};

export const formatOrderDateTime = (dateStr) => {
    if (!dateStr) return { date: '-', time: '-' };
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return { date: '-', time: '-' };

    const date = dateObj.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    });

    const time = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    });

    return { date, time };
};

export const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return `₹${num.toLocaleString('en-IN')}`;
};
