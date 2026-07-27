import React from 'react';
import { QrCode, Download, Share2 } from 'lucide-react';

export default function ReferralQRCodeCard({ t }) {
  return (
    <div className="bg-white rounded-2xl p-4 lg:p-5 border border-slate-100 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <QrCode className="w-4 h-4 text-[#4f3bf3]" />
          </div>
          <h3 className="font-bold text-[#1a1446] text-[15px]">{t('myReferrals.yourQRCode')}</h3>
        </div>
      </div>

      <div className="flex justify-center mb-4 mt-auto">
        <div className="p-2 lg:p-3 border border-slate-100 rounded-xl shadow-sm bg-white inline-block hover:shadow-md transition-shadow">
          {/* Static Placeholder for QR Code */}
          {/* We will make this dynamic later */}
          <div className="w-[100px] h-[100px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover bg-center opacity-90" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 lg:gap-3 mt-auto">
        <div className="flex justify-center gap-4 lg:gap-6 w-full">
          <button className="text-indigo-600 hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
            <Download className="w-4 h-4 transition-transform" />
            {t('myReferrals.downloadPNG')}
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
            <Download className="w-4 h-4 transition-transform" />
            {t('myReferrals.downloadPDF')}
          </button>
        </div>
        <button className="text-[#4f3bf3] hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
          <Share2 className="w-4 h-4 transition-transform" />
          {t('myReferrals.shareQR')}
        </button>
      </div>
    </div>
  );
}
