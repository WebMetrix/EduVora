import React, { useState, useEffect } from 'react';
import { QrCode, Download, Share2 } from 'lucide-react';
import QRCode from 'qrcode';
import { toast } from 'react-toastify';

export default function ReferralQRCodeCard({ t, profile }) {
  const [qrDataUrl, setQrDataUrl] = useState('');

  const referralCode = profile?.ReferralCode || '';
  const baseUrl = import.meta.env.VITE_REFERRAL_URL;
  const link = referralCode ? `${baseUrl}?ref=${referralCode}` : baseUrl;

  useEffect(() => {
    const generateQR = async () => {
      if (!referralCode) return;

      try {
        const url = await QRCode.toDataURL(link, {
          width: 200,
          margin: 1,
          color: {
            dark: '#000000', // Black
            light: '#ffffff' // White
          }
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }
    };
    generateQR();
  }, [link, referralCode]);

  const handleDownloadPNG = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `Eduvora_QR_${referralCode || 'Code'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success(t('toast.referral.pngDownloaded'));
  };

  const handleDownloadPDF = () => {
    if (!qrDataUrl) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Eduvora Referral QR</title>
            <style>
              body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; flex-direction: column; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; }
              .card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; }
              img { width: 250px; height: 250px; margin-bottom: 20px; }
              h1 { color: #1a1446; margin: 0 0 10px 0; font-size: 24px; }
              p { color: #64748b; margin: 0; font-size: 16px; font-weight: 500; }
              .code { margin-top: 15px; padding: 10px 20px; background: #eef2ff; color: #4f46e5; border-radius: 10px; display: inline-block; font-weight: bold; font-family: monospace; }
              @media print { body { -webkit-print-color-adjust: exact; background-color: white; } .card { box-shadow: none; padding: 0; } }
            </style>
          </head>
          <body>
            <div class="card">
              <img src="${qrDataUrl}" onload="window.print(); window.close();" />
              <h1>Join Eduvora Today</h1>
              <p>Scan this QR code to register with my referral!</p>
              <div class="code">${referralCode || ''}</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

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
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Referral QR Code" className="w-[100px] h-[100px] object-contain" />
          ) : (
            <div className="w-[100px] h-[100px] bg-slate-100 animate-pulse rounded-lg" />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 lg:gap-3 mt-auto">
        <div className="flex justify-center gap-4 lg:gap-6 w-full">
          <button onClick={handleDownloadPNG} className="text-indigo-600 hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
            <Download className="w-4 h-4 transition-transform" />
            {t('myReferrals.downloadPNG')}
          </button>
          <button onClick={handleDownloadPDF} className="text-indigo-600 hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
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
