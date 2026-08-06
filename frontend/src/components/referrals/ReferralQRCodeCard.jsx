import React, { useState, useEffect } from 'react';
import { QrCode, Download, Share2 } from 'lucide-react';
import QRCode from 'qrcode';
import { toast } from 'react-toastify';
import logoImg from '../../assets/images/Eduvora.png';

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
        <!DOCTYPE html>
        <html>
          <head>
            <title>Eduvora Referral QR</title>
            <meta charset="utf-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
              
              * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              body { 
                margin: 0; 
                padding: 0;
                font-family: 'Inter', sans-serif; 
                background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
              }

              .page {
                width: 210mm; /* A4 width */
                min-height: 297mm; /* A4 height */
                padding: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: white;
                position: relative;
                overflow: hidden;
              }

              /* Decorative Background Elements */
              .bg-blob-1 { position: absolute; top: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(79,59,243,0.05) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none; }
              .bg-blob-2 { position: absolute; bottom: 100px; right: -150px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(79,59,243,0.05) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none; }
              .bg-wave { position: absolute; bottom: 0; left: 0; width: 100%; height: 150px; background: #4f3bf3; border-radius: 100% 100% 0 0 / 50px 50px 0 0; }

              /* Header */
              .header { text-align: center; margin-top: 10px; z-index: 10; }
              .logo { display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 25px; }
              .logo-img { width: 60px; height: 60px; object-fit: contain; margin-bottom: 5px; }
              .logo-text { font-size: 22px; font-weight: 800; color: #1a1446; letter-spacing: -0.5px; line-height: 1; }
              
              /* Title section */
              .title { font-size: 38px; font-weight: 800; color: #1a1446; margin: 0 0 10px 0; letter-spacing: -1px; }
              .title span { color: #4f3bf3; }
              .subtitle { font-size: 18px; color: #64748b; margin: 0 0 40px 0; font-weight: 500; }

              /* QR Container */
              .qr-wrapper {
                background: white;
                padding: 30px;
                border-radius: 24px;
                box-shadow: 0 20px 40px rgba(79,59,243,0.08);
                margin-bottom: 30px;
                z-index: 10;
                position: relative;
                border: 1px solid #f1f5f9;
              }
              .qr-image { width: 250px; height: 250px; display: block; }
              
              /* Referral Pill */
              .ref-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 35px;
                z-index: 10;
              }
              .ref-pill {
                background: #eef2ff;
                padding: 14px 40px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 8px;
              }
              .ref-icon { color: #4f3bf3; display: flex; align-items: center; }
              .ref-code { font-size: 22px; font-weight: 800; color: #4f3bf3; letter-spacing: 0.5px; }
              .ref-label { font-size: 14px; font-weight: 600; color: #64748b; text-align: center; }

              /* Info Grid */
              .info-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                width: 100%;
                background: white;
                padding: 30px 20px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.04);
                border: 1px solid #f1f5f9;
                z-index: 10;
                margin-bottom: 40px;
              }
              .info-card { display: flex; flex-direction: column; align-items: center; text-align: center; }
              .info-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
              .icon-1 { background: #f5f3ff; color: #7c3aed; }
              .icon-2 { background: #fffbeb; color: #d97706; }
              .icon-3 { background: #ecfdf5; color: #059669; }
              .icon-4 { background: #eff6ff; color: #2563eb; }
              
              .info-title { font-size: 13px; font-weight: 700; margin: 0 0 5px 0; }
              .title-1 { color: #7c3aed; }
              .title-2 { color: #d97706; }
              .title-3 { color: #059669; }
              .title-4 { color: #2563eb; }
              
              .info-desc { font-size: 11px; color: #64748b; line-height: 1.4; margin: 0; }

              /* Footer */
              .footer {
                margin-top: auto;
                text-align: center;
                z-index: 10;
                color: white;
                padding-bottom: 20px;
              }
              .footer-slogan { font-size: 18px; font-weight: 700; margin: 0 0 5px 0; }
              .footer-url { font-size: 14px; font-weight: 500; opacity: 0.9; }

              @page {
                size: A4 portrait;
                margin: 0;
              }

              @media print {
                html, body { 
                  background: white; 
                  margin: 0; 
                  padding: 0; 
                  width: 210mm;
                  height: 297mm;
                }
                .page { 
                  box-shadow: none; 
                  width: 100%; 
                  height: 100%; 
                  padding: 20px; 
                  margin: 0;
                  page-break-inside: avoid;
                }
                .bg-blob-1, .bg-blob-2 {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="bg-blob-1"></div>
              <div class="bg-blob-2"></div>
              
              <div class="header">
                <div class="logo">
                  <img src="${logoImg}" alt="Eduvora Logo" class="logo-img" />
                  <div class="logo-text">EDUVORA</div>
                  <div style="font-size:10px; color:#64748b; font-weight:600; letter-spacing:1px; margin-top:4px;">EDTECH PLATFORM</div>
                </div>
                <h1 class="title">Join <span>Eduvora</span> Today!</h1>
                <p class="subtitle">Scan this QR code to register with my referral!</p>
              </div>

              <div class="qr-wrapper">
                <img class="qr-image" src="${qrDataUrl}" onload="setTimeout(() => { window.print(); window.close(); }, 500);" />
              </div>

              <div class="ref-container">
                <div class="ref-pill">
                  <div class="ref-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  </div>
                  <div class="ref-code">${referralCode}</div>
                </div>
                <div class="ref-label">Referral Code</div>
              </div>

              <div class="info-grid">
                <div class="info-card">
                  <div class="info-icon icon-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
                  </div>
                  <h4 class="info-title title-1">Invite Friends</h4>
                  <p class="info-desc">Share your referral link or QR code</p>
                </div>
                <div class="info-card">
                  <div class="info-icon icon-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="14" rx="2"></rect><path d="M12 5a3 3 0 1 0-3 3"></path><path d="M15 8h-6"></path><path d="M12 8v14"></path></svg>
                  </div>
                  <h4 class="info-title title-2">They Register</h4>
                  <p class="info-desc">Your friends sign up using your referral</p>
                </div>
                <div class="info-card">
                  <div class="info-icon icon-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                  </div>
                  <h4 class="info-title title-3">You Earn Rewards</h4>
                  <p class="info-desc">Earn points and unlock exciting benefits</p>
                </div>
                <div class="info-card">
                  <div class="info-icon icon-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                  </div>
                  <h4 class="info-title title-4">Unlock More</h4>
                  <p class="info-desc">Climb ranks and enjoy premium perks</p>
                </div>
              </div>

              <div class="bg-wave"></div>
              
              <div class="footer">
                <h3 class="footer-slogan">Learn • Connect • Grow</h3>
                <h3 class="footer-slogan" style="font-size: 16px; margin-bottom: 10px;">with Eduvora</h3>
                <div class="footer-url">
                  <svg style="vertical-align: text-bottom; margin-right: 5px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  www.eduvora.com
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleShareQR = async () => {
    if (!qrDataUrl) return;

    if (navigator.share) {
      try {
        // Try to share the QR code image
        const response = await fetch(qrDataUrl);
        const blob = await response.blob();
        const file = new File([blob], `Eduvora_QR_${referralCode}.png`, { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Eduvora Referral',
            text: 'Scan this QR code to join Eduvora!',
            files: [file],
          });
        } else {
          // Fallback to sharing the link if file sharing isn't supported
          await navigator.share({
            title: 'Eduvora Referral',
            text: 'Join Eduvora with my referral link!',
            url: link,
          });
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error sharing:", err);
          toast.error(t('toast.error')); // Fallback translation
        }
      }
    } else {
       // Fallback for browsers without Web Share API
       navigator.clipboard.writeText(link);
       toast.success(t('toast.referral.linkCopied'));
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
        <button 
          onClick={handleShareQR}
          className="text-[#4f3bf3] hover:text-indigo-800 text-[12px] font-bold flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
        >
          <Share2 className="w-4 h-4 transition-transform" />
          {t('myReferrals.shareQR')}
        </button>
      </div>
    </div>
  );
}
