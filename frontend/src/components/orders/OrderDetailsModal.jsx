import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { X, Copy, Calendar, Download, CheckCircle2, Clock, XCircle, BookOpen, Play, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from '../../hooks/useTranslation';
import { getPackageUI, formatCurrency, formatOrderDateTime } from '../../utils/orderHelper';
import { downloadOrderInvoice } from '../../redux/slices/orderSlice';

export default function OrderDetailsModal({ order, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = !!order;
  const { downloadingInvoice } = useSelector((state) => state.order);

  // Prevent background scrolling when modal is open
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

  if (!order) return null;

  const packageUI = getPackageUI(order.packageId || order.PackageId, t);
  const orderNumber = order.orderNumber || order.OrderNumber || order.id;
  const packageName = order.packageName || order.PackageName || order.name;
  const paymentMethod = order.paymentMethod || order.PaymentMethod || 'Net Banking';
  const transactionId = order.transactionId || order.TransactionId || '-';
  const totalAmount = order.totalAmount ?? order.TotalAmount ?? order.amount ?? 0;
  const gstAmount = order.gstAmount ?? order.GSTAmount ?? 0;
  const subTotal = order.subTotal ?? order.SubTotal ?? (totalAmount - gstAmount);

  const { date: orderDate, time: orderTime } = formatOrderDateTime(
    order.orderDate || order.OrderDate || order.orderDateIST || order.OrderDateIST || order.date
  );

  const rawStatus = (
    order.statusCode ||
    order.StatusCode ||
    order.orderStatus ||
    order.OrderStatus ||
    (String(order.orderStatusId ?? order.OrderStatusId) === '2' ? 'completed' :
     String(order.orderStatusId ?? order.OrderStatusId) === '1' ? 'pending' : 'failed')
  );
  const status = (rawStatus || 'pending').toLowerCase();
  const hasInvoice = order.hasInvoice === 1 || order.hasInvoice === true || order.HasInvoice === 1 || !!order.invoiceNumber || !!order.InvoiceNumber;

  const handleCopy = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      toast.success(t('orders.details.copied'));
    }
  };

  const handleDownloadInvoice = () => {
    if (!hasInvoice) {
      toast.info(t('orders.details.noInvoice'));
      return;
    }
    dispatch(downloadOrderInvoice(orderNumber));
  };

  const handleActionClick = () => {
    onClose();
    navigate('/courses');
  };

  const renderActionButton = (isMobile = false) => {
    if (status === 'completed') {
      return (
        <button
          onClick={handleActionClick}
          className={`${
            isMobile
              ? 'px-5 py-2.5 bg-[#4f3bf3] border border-[#4f3bf3] rounded-[6px] text-[11px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors flex items-center justify-center gap-1.5 flex-1 cursor-pointer'
              : 'px-5 py-2 bg-[#4f3bf3] border border-[#4f3bf3] rounded-xl text-[12px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors flex items-center justify-center gap-1.5 cursor-pointer'
          }`}
        >
          <BookOpen className={isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} /> {t('orders.actions.goToCourses')}
        </button>
      );
    }
    if (status === 'pending') {
      return (
        <button
          onClick={handleActionClick}
          className={`${
            isMobile
              ? 'px-5 py-2.5 bg-[#4f3bf3] border border-[#4f3bf3] rounded-[6px] text-[11px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors flex items-center justify-center gap-1.5 flex-1 cursor-pointer'
              : 'px-5 py-2 bg-[#4f3bf3] border border-[#4f3bf3] rounded-xl text-[12px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors flex items-center justify-center gap-1.5 cursor-pointer'
          }`}
        >
          <Play className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} fill-current`} /> {t('orders.actions.payNow')}
        </button>
      );
    }
    return (
      <button
        onClick={handleActionClick}
        className={`${
          isMobile
            ? 'px-5 py-2.5 bg-[#4f3bf3] border border-[#4f3bf3] rounded-[6px] text-[11px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors flex items-center justify-center gap-1.5 flex-1 cursor-pointer'
            : 'px-5 py-2 bg-[#4f3bf3] border border-[#4f3bf3] rounded-xl text-[12px] font-bold text-white shadow-md shadow-indigo-500/20 hover:bg-[#3f2ee6] transition-colors flex items-center justify-center gap-1.5 cursor-pointer'
        }`}
      >
        <RotateCcw className={isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'} /> {t('orders.actions.retryPayment')}
      </button>
    );
  };

  // Status Badge Rendering
  const renderStatusBadge = () => {
    if (status === 'completed') {
      return <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] md:text-[11px] font-bold rounded-full">{t('orders.status.completed')}</span>;
    }
    if (status === 'pending') {
      return <span className="px-3 py-1 bg-amber-100 text-amber-600 text-[10px] md:text-[11px] font-bold rounded-full">{t('orders.status.pending')}</span>;
    }
    return <span className="px-3 py-1 bg-rose-100 text-rose-600 text-[10px] md:text-[11px] font-bold rounded-full">{t('orders.status.failed')}</span>;
  };

  // Status Banner Rendering
  const renderStatusBanner = () => {
    if (status === 'completed') {
      return (
        <div className="bg-linear-to-r from-green-50/70 to-emerald-50/70 backdrop-blur-xl border border-green-100/50 rounded-[12px] p-2.5 flex items-center gap-3 shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0 shadow-sm border border-green-200/50 hidden sm:flex">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-0.5">
              <CheckCircle2 className="w-4 h-4 text-green-600 sm:hidden" />
              <h5 className="text-[12px] md:text-[13px] font-bold text-slate-900">{t('orders.details.paymentCompleted')}</h5>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight max-w-[90%]">
              {t('orders.details.completedDesc')}
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={handleDownloadInvoice}
              disabled={downloadingInvoice}
              className="flex items-center justify-center gap-1.5 bg-white px-2.5 md:px-3 py-1.5 border border-[#4f3bf3] rounded-[6px] text-[9px] md:text-[10px] font-bold text-[#4f3bf3] hover:bg-indigo-50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3 h-3" /> {t('orders.actions.downloadInvoice')}
            </button>
          </div>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className="bg-linear-to-r from-amber-50/70 to-orange-50/70 backdrop-blur-xl border border-amber-100/50 rounded-[12px] p-2.5 flex items-center gap-3 shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 shadow-sm border border-amber-200/50 hidden sm:flex">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-0.5">
              <Clock className="w-4 h-4 text-amber-600 sm:hidden" />
              <h5 className="text-[12px] md:text-[13px] font-bold text-slate-900">{t('orders.details.paymentPending')}</h5>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight max-w-[90%]">
              {t('orders.details.pendingDesc')}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-linear-to-r from-rose-50/70 to-red-50/70 backdrop-blur-xl border border-rose-100/50 rounded-[12px] p-2.5 flex items-center gap-3 shadow-sm shrink-0">
        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 shadow-sm border border-rose-200/50 hidden sm:flex">
          <XCircle className="w-5 h-5 text-rose-600" />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-0.5">
            <XCircle className="w-4 h-4 text-rose-600 sm:hidden" />
            <h5 className="text-[12px] md:text-[13px] font-bold text-slate-900">{t('orders.details.paymentFailed')}</h5>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight max-w-[90%]">
            {t('orders.details.failedDesc')}
          </p>
        </div>
      </div>
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full h-[90vh] md:h-[580px] md:max-w-3xl bg-white rounded-t-3xl md:rounded-[24px] flex flex-col shadow-2xl relative mt-auto md:mt-0 overflow-hidden animate-slide-up md:animate-fade-in">
        
        {/* Mobile Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-5 shrink-0">
          <h2 className="text-[16px] md:text-[20px] font-extrabold text-slate-900">{t('orders.details.title')}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 pb-4 space-y-3">
          
          {/* Top Info Section with Divider */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0">
            {/* Left Side */}
            <div className="flex items-start gap-3 md:w-1/2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
                <Calendar className="w-5 h-5 text-[#4f3bf3]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-slate-500">{t('orders.details.orderId')}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-extrabold text-slate-900">{orderNumber}</span>
                  <button onClick={handleCopy} className="text-slate-400 hover:text-[#4f3bf3] transition-colors cursor-pointer">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="mt-2">
                  <span className="text-[12px] font-semibold text-slate-500 block">{t('orders.details.orderDate')}</span>
                  <span className="text-[13px] font-bold text-slate-800">
                    {orderDate && orderDate !== '-' ? `${orderDate}, ${orderTime}` : '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-slate-200 mx-6 self-stretch" />

            {/* Right Side */}
            <div className="flex flex-col items-start pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 md:w-1/2 relative mt-2 md:mt-0">
              {/* Status Badge Floating Right */}
              <div className="absolute top-0 right-0 mt-3 md:mt-0">
                {renderStatusBadge()}
              </div>
              
              <div className="flex flex-col items-start">
                <span className="text-[12px] font-semibold text-slate-500">{t('orders.details.paymentMethod')}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[13px] font-bold text-slate-800 uppercase">{paymentMethod}</span>
                </div>
              </div>
              <div className="mt-2 flex flex-col items-start">
                <span className="text-[12px] font-semibold text-slate-500">{t('orders.details.transactionId')}</span>
                <span className="text-[13px] font-bold text-slate-800 break-all">{transactionId}</span>
              </div>
            </div>
          </div>

          {/* Package Details Section */}
          <div className="border border-slate-100 rounded-[14px] p-3 md:p-4 shadow-sm shrink-0">
            <h3 className="text-[13px] font-extrabold text-slate-900 mb-2">{t('orders.details.packageDetails')}</h3>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-14 h-14 rounded-xl shrink-0 shadow-md ${packageUI.iconBg} flex items-center justify-center relative overflow-hidden bg-cover bg-center border border-indigo-900/50`}>
                   <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                   <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                     <span className="text-white text-[14px] font-bold">{packageName ? packageName.charAt(0) : 'P'}</span>
                   </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[14px] font-extrabold text-slate-900 leading-tight">{packageName}</h4>
                  <span className={`w-max px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mt-0.5 ${packageUI.levelColor}`}>
                    {packageUI.level}
                  </span>
                </div>
              </div>
              <div className="text-[18px] font-black text-slate-900 mt-2 md:mt-0">
                {formatCurrency(totalAmount)}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-slate-100 rounded-[14px] p-3 md:p-4 shadow-sm shrink-0">
            <h3 className="text-[13px] font-extrabold text-slate-900 mb-1.5">{t('orders.details.orderSummary')}</h3>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[12px] font-semibold text-slate-600">
                <span>{t('orders.details.subtotal')}</span>
                <span className="text-slate-900">{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-[12px] font-semibold text-slate-600">
                <span>{t('orders.details.discount')}</span>
                <span className="text-slate-900">{formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between items-center text-[12px] font-semibold text-slate-600">
                <span>{t('orders.details.tax')}</span>
                <span className="text-slate-900">{formatCurrency(gstAmount)}</span>
              </div>
              <div className="w-full h-px border-t border-dashed border-slate-200 my-1" />
              <div className="flex justify-between items-center">
                <span className="text-[13px] font-extrabold text-slate-900">{t('orders.details.totalAmount')}</span>
                <span className="text-[15px] font-black text-[#4f3bf3]">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Payment Status (Banner Style) */}
          {renderStatusBanner()}

          {/* Inline Footer Actions (Mobile Only) */}
          <div className="flex md:hidden items-center justify-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-[#4f3bf3] rounded-[6px] text-[11px] font-bold text-[#4f3bf3] hover:bg-indigo-50 transition-colors flex-1 text-center cursor-pointer"
            >
              {t('orders.actions.close')}
            </button>
            {renderActionButton(true)}
          </div>
        </div>

        {/* Fixed Footer Actions (Desktop Only) */}
        <div className="hidden md:flex p-3 md:py-3 md:px-5 border-t border-slate-100 bg-slate-50/50 items-center justify-end gap-3 mt-auto shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-center cursor-pointer"
          >
            {t('orders.actions.close')}
          </button>
          {renderActionButton(false)}
        </div>

      </div>
    </div>,
    document.body
  );
}
