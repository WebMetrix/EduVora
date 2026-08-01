import { useTranslation } from '../../hooks/useTranslation';
import { CheckCircle2 } from 'lucide-react';
import goldIcon from '../../assets/icons/Gold.svg';
import silverIcon from '../../assets/icons/Silver.svg';
import bronzeIcon from '../../assets/icons/Bronze.svg';

import goldBg from '../../assets/packageBG/gold.webp';
import silverBg from '../../assets/packageBG/silver.webp';
import bronzeBg from '../../assets/packageBG/bronze.webp';

export default function PackageCards() {
  const { t } = useTranslation();

  const packages = [
    {
      id: 'gold',
      name: t('dashboard.packages.gold.name'),
      price: t('dashboard.packages.gold.price'),
      icon: goldIcon,
      badge: t('dashboard.packages.bestSeller'),
      badgeColor: 'bg-[#ffd56b] text-[#5c4100]',
      headerBg: 'bg-[#151c2e]',
      bgImage: goldBg,
      features: t('dashboard.packages.gold.features')
    },
    {
      id: 'silver',
      name: t('dashboard.packages.silver.name'),
      price: t('dashboard.packages.silver.price'),
      icon: silverIcon,
      badge: t('dashboard.packages.mostPopular'),
      badgeColor: 'bg-[#5b8cff] text-white',
      headerBg: 'bg-[#7c8393]',
      bgImage: silverBg,
      features: t('dashboard.packages.silver.features')
    },
    {
      id: 'bronze',
      name: t('dashboard.packages.bronze.name'),
      price: t('dashboard.packages.bronze.price'),
      icon: bronzeIcon,
      badge: null,
      headerBg: 'bg-[#966b44]',
      bgImage: bronzeBg,
      features: t('dashboard.packages.bronze.features')
    }
  ];

  return (
    <div className="flex flex-col h-full lg:col-span-2">
      <div className="relative overflow-hidden flex-1 rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-5 lg:p-6 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-none hover:border-indigo-200 flex flex-col">
        {/* Decorative background flare */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

        <div className="relative z-10 flex flex-col mb-3 lg:mb-4">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-[14px] lg:text-[16px] font-bold text-slate-900">{t('dashboard.packages.title')}</h3>
            <a href="#" className="text-[13px] lg:text-[14px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4 transition-all">
              {t('dashboard.packages.viewAll')}
            </a>
          </div>
          <p className="text-[12px] text-slate-500">{t('dashboard.packages.subtitle')}</p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 flex-1">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group/pkg flex flex-col bg-white rounded-[20px] border border-slate-200 overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(79,59,243,0.12)] hover:border-indigo-300 transition-all duration-300">
              {/* Header */}
              <div 
                className={`relative p-3 sm:p-4 ${pkg.headerBg} flex flex-col items-center justify-center min-h-[90px]`}
                style={{ backgroundImage: `url(${pkg.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {pkg.badge && (
                  <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold shadow-sm ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </div>
                )}
                <img src={pkg.icon} alt={pkg.name} className="w-10 h-10 mb-1 drop-shadow-md" />
                <h4 className="text-white font-bold text-[13px]">{pkg.name}</h4>
              </div>

              {/* Price */}
              <div className="flex flex-col items-center py-2 border-b border-slate-100">
                <div className="text-[18px] lg:text-[20px] font-extrabold text-[#4f3bf3]">{pkg.price}</div>
                <div className="text-[9px] lg:text-[10px] font-bold text-slate-400">{t('dashboard.packages.oneTimePayment')}</div>
              </div>

              {/* Features */}
              <div className="flex-1 p-3 lg:p-4 flex flex-col gap-2">
                {Array.isArray(pkg.features) && pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4f3bf3] shrink-0 mt-0.5" />
                    <span className="text-[10px] lg:text-[11px] font-semibold text-[#1a1446]/80 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="p-3 lg:p-4 pt-0 mt-auto">
                <button className="w-full py-1.5 bg-white border border-[#4f3bf3]/30 rounded-lg text-[12px] font-bold text-[#4f3bf3] hover:bg-[#4f3bf3] hover:text-white transition-all duration-300 shadow-sm">
                  {t('dashboard.packages.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
