import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PaymentFailedModal from '../../components/payment/PaymentFailedModal';
import { clearPaymentData } from '../../redux/slices/paymentSlice';

export default function PaymentFailed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentContext = useSelector((state) => state.payment.paymentData) || {};
  
  const paymentData = {
    orderId: paymentContext.orderId || 'ORD987654321',
    amount: paymentContext.amount,
    packageName: paymentContext.packageName
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
      {/* The modal is rendered via Portal, so it will overlay this background */}
      <PaymentFailedModal 
        paymentData={paymentData} 
        onClose={() => {
            dispatch(clearPaymentData());
            navigate('/dashboard');
        }}
        onDashboard={() => {
            dispatch(clearPaymentData());
            navigate('/dashboard');
        }}
        onRetry={() => {
            dispatch(clearPaymentData());
            navigate('/dashboard'); // or redirect to cart/packages page
        }}
      />
    </div>
  );
}
