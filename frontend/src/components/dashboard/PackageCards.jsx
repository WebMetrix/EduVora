import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { CheckCircle2 } from 'lucide-react';
import goldIcon from '../../assets/icons/Gold.svg';
import silverIcon from '../../assets/icons/Silver.svg';
import bronzeIcon from '../../assets/icons/Bronze.svg';
import diamondIcon from '../../assets/icons/Diamond.svg';

import goldBg from '../../assets/packageBG/gold.webp';
import silverBg from '../../assets/packageBG/silver.webp';
import bronzeBg from '../../assets/packageBG/bronze.webp';
import diamondBg from '../../assets/packageBG/diamond.png';

import goldDetailedBg from '../../assets/packageBG/goldDetailed.webp';
import silverDetailedBg from '../../assets/packageBG/silverDetailed.webp';
import bronzeDetailedBg from '../../assets/packageBG/bronzeDetailed.webp';
import diamondDetailedBg from '../../assets/packageBG/diamondDetailed.webp';

import PackageDetailsModal from './PackageDetailsModal';
import api from '../../https/axios';

export default function PackageCards() {
  const { t } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [dbPackages, setDbPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        setDbPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages from DB:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const bronzeDb = dbPackages.find(p => p.PackageName === 'Bronze Package' || p.PackageId === 1);
  const silverDb = dbPackages.find(p => p.PackageName === 'Silver Package' || p.PackageId === 2);
  const goldDb = dbPackages.find(p => p.PackageName === 'Gold Package' || p.PackageId === 3);
  const diamondDb = dbPackages.find(p => p.PackageName === 'Diamond Package' || p.PackageId === 4);

  const packages = [
    {
      id: 'diamond',
      name: diamondDb ? diamondDb.PackageName : t('dashboard.packages.diamond.name'),
      price: diamondDb ? `₹${diamondDb.Price}` : t('dashboard.packages.diamond.price'),
      icon: diamondIcon,
      badge: t('dashboard.packages.premium'),
      badgeColor: 'bg-[#a855f7] text-white',
      headerBg: 'bg-[#1a1446]',
      bgImage: diamondBg,
      detailedBg: diamondDetailedBg,
      features: t('dashboard.packages.diamond.leftFeatures', { returnObjects: true }),
      isDynamic: !!diamondDb,
      Description: diamondDb?.Description,
      DescriptionDialog: diamondDb?.DescriptionDialog
    },
    {
      id: 'gold',
      name: goldDb ? goldDb.PackageName : t('dashboard.packages.gold.name'),
      price: goldDb ? `₹${goldDb.Price}` : t('dashboard.packages.gold.price'),
      icon: goldIcon,
      badge: t('dashboard.packages.bestSeller'),
      badgeColor: 'bg-[#fbbf24] text-slate-900',
      headerBg: 'bg-[#1e293b]',
      bgImage: goldBg,
      detailedBg: goldDetailedBg,
      features: t('dashboard.packages.gold.leftFeatures', { returnObjects: true }),
      isDynamic: !!goldDb,
      Description: goldDb?.Description,
      DescriptionDialog: goldDb?.DescriptionDialog
    },
    {
      id: 'silver',
      name: silverDb ? silverDb.PackageName : t('dashboard.packages.silver.name'),
      price: silverDb ? `₹${silverDb.Price}` : t('dashboard.packages.silver.price'),
      icon: silverIcon,
      badge: t('dashboard.packages.mostPopular'),
      badgeColor: 'bg-[#5b8cff] text-white',
      headerBg: 'bg-[#7c8393]',
      bgImage: silverBg,
      detailedBg: silverDetailedBg,
      features: t('dashboard.packages.silver.leftFeatures', { returnObjects: true }),
      isDynamic: !!silverDb,
      Description: silverDb?.Description,
      DescriptionDialog: silverDb?.DescriptionDialog
    },
    {
      id: 'bronze',
      name: bronzeDb ? bronzeDb.PackageName : t('dashboard.packages.bronze.name'),
      price: bronzeDb ? `₹${bronzeDb.Price}` : t('dashboard.packages.bronze.price'),
      icon: bronzeIcon,
      badge: null,
      headerBg: 'bg-[#966b44]',
      bgImage: bronzeBg,
      detailedBg: bronzeDetailedBg,
      features: t('dashboard.packages.bronze.leftFeatures', { returnObjects: true }),
      isDynamic: !!bronzeDb,
      Description: bronzeDb?.Description,
      DescriptionDialog: bronzeDb?.DescriptionDialog
    }
  ];

  return (
    <div className="flex flex-col h-full xl:col-span-7">
      <div className="relative overflow-hidden flex-1 rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl p-4 lg:p-5 border border-indigo-100/60 shadow-sm group/card transition-all duration-300 hover:shadow-none hover:border-indigo-200 flex flex-col">
        {/* Decorative background flare */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover/card:bg-indigo-400/20 transition-colors duration-700" />

        <div className="relative z-10 flex flex-col mb-2 lg:mb-3">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-[14px] lg:text-[16px] font-bold text-slate-900">{t('dashboard.packages.title')}</h3>
            <a href="#" className="text-[13px] lg:text-[14px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4 transition-all">
              {t('dashboard.packages.viewAll')}
            </a>
          </div>
          <p className="text-[12px] text-slate-500">{t('dashboard.packages.subtitle')}</p>
        </div>

        <div className="relative z-10 flex flex-1 overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-4 -mt-4 custom-scrollbar">
          {packages.map((pkg) => (
            <div key={pkg.id} className={`w-[85vw] sm:w-[calc((100%-2rem)/3)] flex-none snap-center group/pkg flex flex-col bg-white rounded-[20px] border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 transform-gpu isolate ${loading ? 'pointer-events-none' : 'hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(79,59,243,0.12)] hover:border-indigo-300'}`}>
              {/* Header */}
              <div
                className={`relative w-full p-2.5 sm:p-2.5 ${pkg.headerBg} flex flex-col items-center justify-center min-h-[65px] ${loading ? 'animate-pulse' : ''}`}
                style={{ backgroundImage: `url(${pkg.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {pkg.badge && !loading && (
                  <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold shadow-sm ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </div>
                )}
                {loading ? (
                   <div className="w-8 h-8 rounded-full bg-white/20 mb-0.5" />
                ) : (
                   <img src={pkg.icon} alt={pkg.name} className="w-8 h-8 mb-0.5 drop-shadow-md" />
                )}
                <h4 className={`font-bold text-[13px] ${loading ? 'text-transparent bg-white/20 rounded mt-1' : 'text-white'}`}>{pkg.name}</h4>
              </div>

              {/* Price */}
              <div className={`flex flex-col items-center py-1.5 border-b border-slate-100 ${loading ? 'animate-pulse' : ''}`}>
                <div className={`text-[18px] lg:text-[20px] font-extrabold ${loading ? 'text-transparent bg-slate-200 rounded mb-1' : 'text-[#4f3bf3]'}`}>{pkg.price}</div>
                <div className={`text-[9px] lg:text-[10px] font-bold ${loading ? 'text-transparent bg-slate-200 rounded' : 'text-slate-400'}`}>{t('dashboard.packages.oneTimePayment')}</div>
              </div>

              {/* Features */}
              <div className={`flex-1 px-2.5 py-1.5 lg:px-3 lg:py-2 flex flex-col gap-1.5 [&_li]:!mb-1.5 lg:[&_li]:!mb-2 [&_li]:!text-[11px] lg:[&_li]:!text-[12px] [&_svg]:!w-3.5 [&_svg]:!h-3.5 [&_ul]:!flex [&_ul]:!flex-col [&_ul]:!h-full [&_ul]:!justify-start ${loading ? 'animate-pulse' : ''}`}>
                {pkg.isDynamic && pkg.Description && !loading ? (
                  <div className="flex-1" dangerouslySetInnerHTML={{ __html: pkg.Description }} />
                ) : (
                  (loading ? Array.from({ length: 4 }) : (Array.isArray(pkg.features) ? pkg.features : [])).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {loading ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-200 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4f3bf3] shrink-0 mt-0.5" />
                      )}
                      <span className={`text-[10px] lg:text-[11px] font-semibold leading-tight ${loading ? 'text-transparent bg-slate-200 rounded' : 'text-[#1a1446]/80'}`}>
                        {loading ? (idx % 2 === 0 ? 'Placeholder for a standard line' : 'Placeholder for a slightly longer wrapping line') : feature}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Action */}
              <div className={`p-2.5 lg:p-3 pt-0 mt-auto ${loading ? 'animate-pulse' : ''}`}>
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  disabled={loading}
                  className={`w-full py-1.5 border rounded-lg text-[12px] font-bold transition-all duration-300 shadow-sm ${loading ? 'bg-slate-200 border-transparent text-transparent cursor-not-allowed' : 'bg-white border-[#4f3bf3]/30 text-[#4f3bf3] hover:bg-[#4f3bf3] hover:text-white group-hover/pkg:bg-[#4f3bf3] group-hover/pkg:text-white'}`}
                >
                  {t('dashboard.packages.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PackageDetailsModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </div>
  );
}
