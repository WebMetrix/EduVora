import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentSuccessModal from '../../components/payment/PaymentSuccessModal';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  
  // Dummy data so the modal stays open for preview
  const mockPaymentData = {
    orderId: 'ORD987654321',
    amount: '₹5,898',
    packageName: 'Gold Package',
    packagePrice: '₹4,999'
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
      {/* The modal is rendered via Portal, so it will overlay this background */}
      <PaymentSuccessModal 
        paymentData={mockPaymentData} 
        onClose={() => navigate('/dashboard')}
        onDashboard={() => navigate('/dashboard')}
        onViewCourses={() => navigate('/courses')}
      />
    </div>
  );
}
