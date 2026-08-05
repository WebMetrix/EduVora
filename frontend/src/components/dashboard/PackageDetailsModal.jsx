import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function PackageDetailsModal({ packageData, onClose }) {
  const { t } = useTranslation();
  const isOpen = !!packageData;
  // Prevent scrolling when modal is open and fix layout shift
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

  if (!packageData) return null;

  // Calculate pricing
  const priceValue = parseInt((packageData.price || "0").replace(/[^\d]/g, ''), 10) || 0;
  const gstValue = Math.round(priceValue * 0.18);
  const totalValue = priceValue + gstValue;

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(val);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div
        className="w-full h-[90vh] md:h-[580px] md:max-w-3xl bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in"
      >
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-5 py-2 border-b border-slate-100">
          <h2 className="text-[15px] font-bold text-slate-900">{t('dashboard.packages.modal.title')}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
          <div className="grid grid-cols-[135px_1fr] md:grid-cols-[240px_1fr] gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-3 md:[grid-template-rows:1fr_auto_auto_auto] min-h-full">

            {/* Left Side: Dark Card */}
            <div
              className="col-span-1 row-span-1 md:row-span-4 bg-[#0B1221] rounded-[12px] md:rounded-[16px] p-2.5 md:p-4 pb-6 md:pb-8 flex flex-col items-center relative overflow-hidden text-white shadow-xl h-full bg-cover bg-center border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,85,247,0.25)] hover:border-white/20 group/darkcard"
              style={{ backgroundImage: `url(${packageData.detailedBg})` }}
            >
              {/* Decorative faint background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

              <div className="mt-0 mb-1.5 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/5 rounded-lg md:rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,213,107,0.15)]">
                <img src={packageData.icon} alt={packageData.name} className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md" />
              </div>

              <h3 className="text-[12px] md:text-[16px] font-bold mb-0 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{packageData.name}</h3>
              <div className="text-[16px] md:text-[20px] font-extrabold text-white mb-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{packageData.price}</div>
              <p className="text-[7px] md:text-[9px] font-medium text-white/90 mb-2.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{t('dashboard.packages.oneTimePayment')}</p>

              <div className="w-full flex flex-col gap-1.5 md:gap-2 mb-2">
                {(packageData.features || []).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 md:gap-2">
                    <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#ffd56b] shrink-0 mt-[1px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    <span className="text-[8px] md:text-[11px] font-medium text-white/95 leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{item}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Side: Details Top Section */}
            <div className="col-span-1 row-span-1 flex flex-col justify-start">
              {packageData.isDynamic && packageData.DescriptionDialog ? (
                <div className="[&_p]:!mb-2.5 [&_h4]:!mb-1.5 [&_li]:!mb-1.5" dangerouslySetInnerHTML={{ __html: packageData.DescriptionDialog }} />
              ) : (
                <>
                  <h4 className="text-[11px] md:text-[12px] font-bold text-slate-900 mb-0.5">{t('dashboard.packages.modal.about')}</h4>
                  <p className="text-[9px] md:text-[11px] leading-tight text-slate-600 mb-2">
                    {t('dashboard.packages.modal.description', { name: packageData.name })}
                  </p>

                  <h4 className="text-[11px] md:text-[12px] font-bold text-slate-900 mb-1.5">{t('dashboard.packages.modal.whatYouWillGet')}</h4>
                  <div className="flex flex-col gap-1 md:gap-1.5">
                    {(packageData.features || []).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <div className="mt-0.5 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-[9px] md:text-[11px] font-semibold text-slate-700 leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Pricing Box */}
            <div className="col-span-2 md:col-span-1 md:col-start-2 bg-indigo-50/50 rounded-[10px] p-2.5 mt-2 md:mt-auto">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] font-semibold text-slate-700">{t('dashboard.packages.modal.price')}</span>
                <span className="text-[11px] font-bold text-slate-900">{packageData.price}</span>
              </div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] font-semibold text-slate-600">{t('dashboard.packages.modal.gst')}</span>
                <span className="text-[11px] font-bold text-slate-900">{formatCurrency(gstValue)}</span>
              </div>

              <div className="w-full h-px border-t border-dashed border-slate-300 mb-1.5" />

              <div className="flex justify-between items-center">
                <span className="text-[13px] font-extrabold text-slate-900">{t('dashboard.packages.modal.total')}</span>
                <span className="text-[14px] font-black text-[#4f3bf3]">{formatCurrency(totalValue)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="col-span-2 md:col-span-1 md:col-start-2 flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-1.5 bg-white border border-[#4f3bf3] rounded-[6px] text-[11px] font-bold text-[#4f3bf3] hover:bg-indigo-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
              >
                {t('dashboard.packages.modal.cancel')}
              </button>
              <button
                className="flex-1 py-1.5 bg-[#4f3bf3] border border-[#4f3bf3] rounded-[6px] text-[11px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
              >
                {t('dashboard.packages.modal.purchase')}
              </button>
            </div>

            {/* Secure Payment Box (Desktop & Mobile) */}
            <div className="col-span-2 md:col-span-1 md:col-start-2 bg-linear-to-r from-indigo-50/70 to-purple-50/70 backdrop-blur-xl border border-indigo-100/50 rounded-[8px] p-2 flex gap-2 items-center shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0 shadow-sm border border-indigo-200/50">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h5 className="text-[14px] font-bold text-slate-900 mb-1">{t('dashboard.packages.modal.securePayment')}</h5>
                <p className="text-[12px] text-slate-500 leading-relaxed max-w-[90%]">
                  {t('dashboard.packages.modal.secureDesc')}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 bg-green-100/50 px-2.5 py-1 rounded-md">
                <Lock className="w-3 h-3 text-green-600" />
                <span className="text-[10px] font-bold text-green-700">{t('dashboard.packages.modal.secureBadge')}</span>
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
