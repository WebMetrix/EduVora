import React from 'react';
import { QrCode, Download, Share2 } from 'lucide-react';

export default function ReferralQRCodeCard({ t }) {
  return (
    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1 group/card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <QrCode className="w-4 h-4 text-[#4f3bf3]" />
          </div>
          <h3 className="font-bold text-[#1a1446] text-[15px]">{t('myReferrals.yourQRCode')}</h3>
        </div>
      </div>

      <div className="flex justify-center mb-6 mt-auto">
        <div className="p-3 border border-slate-100 rounded-xl shadow-sm bg-white inline-block hover:shadow-md transition-shadow">
          {/* Static Placeholder for QR Code */}
          {/* We will make this dynamic later */}
          <div className="w-[120px] h-[120px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover bg-center opacity-90" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-auto">
        <div className="flex justify-center gap-6 w-full">
          <button className="text-indigo-600 hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 group">
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            {t('myReferrals.downloadPNG')}
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 group">
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            {t('myReferrals.downloadPDF')}
          </button>
        </div>
        <button className="text-[#4f3bf3] hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 group">
          <Share2 className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          {t('myReferrals.shareQR')}
        </button>
      </div>
    </div>
  );
}
