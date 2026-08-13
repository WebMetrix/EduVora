import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PaymentSuccessModal from '../../components/payment/PaymentSuccessModal';
import { clearPaymentData } from '../../redux/slices/paymentSlice';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentContext = useSelector((state) => state.payment.paymentData) || {};
  
  const paymentData = {
    orderId: paymentContext.orderId || 'ORD987654321',
    amount: paymentContext.amount || '₹5,898',
    packageName: paymentContext.packageName || 'Gold Package',
    packagePrice: paymentContext.packagePrice || '₹4,999'
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
      {/* The modal is rendered via Portal, so it will overlay this background */}
      <PaymentSuccessModal 
        paymentData={paymentData} 
        onClose={() => {
            dispatch(clearPaymentData());
            navigate('/dashboard');
        }}
        onDashboard={() => {
            dispatch(clearPaymentData());
            navigate('/dashboard');
        }}
        onViewCourses={() => {
            dispatch(clearPaymentData());
            navigate('/courses');
        }}
      />
    </div>
  );
}
