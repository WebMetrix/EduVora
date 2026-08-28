import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, XCircle, ShieldCheck, ShoppingCart } from 'lucide-react';

export default function ComparePackagesModal({ isOpen, onClose, packages, onSelectPackage }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.paddingRight = '';
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // The comparison table structure based on the design
  const featuresList = [
    {
      title: "Access to Package Features",
      values: {
        diamond: { text: "All Diamond Features", included: true },
        gold: { text: "All Gold Features", included: true },
        silver: { text: "All Silver Features", included: true },
        bronze: { text: "All Bronze Features", included: true }
      }
    },
    {
      title: "Additional Courses",
      values: {
        diamond: { text: "Unlimited", included: true },
        gold: { text: "Advanced", included: true },
        silver: { text: "Basic", included: true },
        bronze: { text: "Limited", included: true }
      }
    },
    {
      title: "Highest level earning plan",
      values: {
        diamond: { text: "Up to 40%", included: true },
        gold: { text: "Up to 25%", included: true },
        silver: { text: "Up to 15%", included: true },
        bronze: { text: "Up to 5%", included: true }
      }
    },
    {
      title: "Advanced level courses",
      values: {
        diamond: { text: "", included: true },
        gold: { text: "", included: true },
        silver: { text: "", included: false },
        bronze: { text: "", included: false }
      }
    },
    {
      title: "Certificate of Completion",
      values: {
        diamond: { text: "Included", included: true },
        gold: { text: "Included", included: true },
        silver: { text: "Included", included: true },
        bronze: { text: "", included: false }
      }
    },
    {
      title: "Priority Member Support",
      values: {
        diamond: { text: "High Priority", included: true },
        gold: { text: "Normal Priority", included: true },
        silver: { text: "", included: false },
        bronze: { text: "", included: false }
      }
    },
    {
      title: "24/7 VIP Support",
      values: {
        diamond: { text: "", included: true },
        gold: { text: "", included: false },
        silver: { text: "", included: false },
        bronze: { text: "", included: false }
      }
    },
    {
      title: "Email Support",
      values: {
        diamond: { text: "", included: true },
        gold: { text: "", included: true },
        silver: { text: "", included: true },
        bronze: { text: "", included: true }
      }
    },
    {
      title: "Community Access",
      values: {
        diamond: { text: "Exclusive", included: true },
        gold: { text: "Standard", included: true },
        silver: { text: "Standard", included: true },
        bronze: { text: "", included: false }
      }
    },
    {
      title: "Downloadable Resources",
      values: {
        diamond: { text: "Yes", included: true },
        gold: { text: "Yes", included: true },
        silver: { text: "Limited", included: true },
        bronze: { text: "Limited", included: true }
      }
    }
  ];

  // Helper to extract package info from dynamic packages
  const getPackageInfo = (tier) => {
    return packages.find(p => p.name.toLowerCase().includes(tier)) || null;
  };

  const diamondPkg = getPackageInfo('diamond');
  const goldPkg = getPackageInfo('gold');
  const silverPkg = getPackageInfo('silver');
  const bronzePkg = getPackageInfo('bronze');

  const getTierData = (tier) => {
    if (tier === 'diamond') return diamondPkg;
    if (tier === 'gold') return goldPkg;
    if (tier === 'silver') return silverPkg;
    if (tier === 'bronze') return bronzePkg;
    return null;
  };

  const formatPrice = (priceStr) => {
    if (!priceStr) return '';
    const num = parseInt(priceStr.replace(/[^\d]/g, ''), 10);
    if (isNaN(num)) return priceStr;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(num);
  };

  const renderIcon = (included) => {
    if (included) return <CheckCircle2 className="w-[18px] h-[18px] shrink-0" fill="#22c55e" stroke="white" />;
    return <XCircle className="w-[18px] h-[18px] shrink-0" fill="#ef4444" stroke="white" />;
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full h-[90vh] md:h-auto md:max-h-[95vh] md:max-w-[1100px] bg-white rounded-t-3xl md:rounded-3xl flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden bg-white shrink-0">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 md:px-8 py-5 md:py-6 border-b border-slate-100 bg-white sticky top-0 z-20 shrink-0">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1a1446] mb-1">Compare Packages</h2>
            <p className="text-[13px] md:text-[14px] text-slate-500 font-medium">Choose the perfect package to start your learning journey and maximize your earnings.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar p-6 md:p-8 bg-white">
          <div className="min-w-[900px] flex flex-col">
            
            {/* Table Header Row (Cards) */}
            <div className="grid grid-cols-[220px_1fr_1fr_1fr_1fr] w-full mb-6">
              <div className="flex items-center px-4">
                <h3 className="text-[15px] font-bold text-[#1a1446]">Package Features</h3>
              </div>
              
              {/* Package Header Cards */}
              {['diamond', 'gold', 'silver', 'bronze'].map(tier => {
                const pkg = getTierData(tier);
                if (!pkg) return <div key={tier} />;
                return (
                  <div key={tier} className="px-2.5 flex flex-col h-full">
                    <div className="flex-1 flex flex-col border border-slate-200 rounded-[14px] overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
                      {/* Top dark section */}
                      <div 
                        className="h-[65px] bg-[#0B1221] flex items-center justify-center relative bg-cover bg-center border-b border-white/10"
                        style={{ backgroundImage: `url(${pkg.detailedBg})` }}
                      >
                        {pkg.badge && (
                          <div className={`absolute top-1.5 right-1.5 px-2 py-0.5 rounded text-[9px] font-bold shadow-sm ${pkg.badgeColor} z-10`}>
                            {pkg.badge}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative z-10 flex items-center gap-2">
                          <img src={pkg.icon} alt={pkg.name} className="w-6 h-6 drop-shadow-md" />
                          <span className="text-white font-bold text-[14px] drop-shadow-md">{pkg.name.replace(' Package', '')}</span>
                        </div>
                      </div>
                      {/* Price section */}
                      <div className="py-3.5 flex flex-col items-center justify-center bg-white">
                        <div className="text-[22px] font-extrabold text-[#4f3bf3] mb-0.5">{formatPrice(pkg.price)}</div>
                        <div className="text-[10px] font-bold text-slate-400">One Time Payment</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features Rows Container */}
            <div className="bg-white border border-slate-200 rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden mb-6 flex flex-col">
              {featuresList.map((feature, idx) => (
                <div key={idx} className={`grid grid-cols-[220px_1fr_1fr_1fr_1fr] w-full ${idx !== featuresList.length - 1 ? 'border-b border-slate-100' : ''}`}>
                  <div className="py-4 px-6 flex items-center text-[13px] font-bold text-slate-700">
                    {feature.title}
                  </div>
                  {['diamond', 'gold', 'silver', 'bronze'].map(tier => {
                    const value = feature.values[tier];
                    return (
                      <div key={tier} className="py-4 px-3 flex items-center justify-center gap-2 border-l border-slate-100">
                        {renderIcon(value.included)}
                        {value.text && <span className="text-[12px] font-semibold text-slate-600">{value.text}</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
              
              {/* Action Row */}
              <div className="grid grid-cols-[220px_1fr_1fr_1fr_1fr] w-full border-t border-slate-100 bg-white">
                <div className="py-5 px-6" />
                {['diamond', 'gold', 'silver', 'bronze'].map(tier => {
                  const pkg = getTierData(tier);
                  if (!pkg) return <div key={tier} />;
                  return (
                    <div key={tier} className="py-5 px-4 flex items-center justify-center border-l border-slate-100">
                      <button 
                        onClick={() => {
                          onClose();
                          onSelectPackage(pkg);
                        }}
                        className="w-[85%] max-w-[160px] flex items-center justify-center gap-2 py-2.5 bg-[#4f3bf3] border border-[#4f3bf3] rounded-[8px] text-[13px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Purchase Now
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Info Card */}
            <div className="bg-[#f8f9fc] border border-slate-100 rounded-[12px] p-4 flex gap-4 items-center">
              <div className="w-12 h-12 bg-[#edf0ff] rounded-xl flex items-center justify-center text-[#4f3bf3] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1a1446] mb-0.5">All packages are one-time payments with lifetime access.</h4>
                <p className="text-[13px] text-slate-500 font-medium">Choose the package that best fits your goals and start your journey today!</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (min-width: 768px) {
          .md\\:animate-fade-in {
            animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
      `}} />
    </div>,
    document.body
  );
}
