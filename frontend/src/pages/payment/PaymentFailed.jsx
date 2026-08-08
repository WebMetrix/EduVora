import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentFailedModal from '../../components/payment/PaymentFailedModal';

export default function PaymentFailed() {
  const navigate = useNavigate();
  
  // Dummy data so the modal stays open for preview
  const mockPaymentData = {
    orderId: 'ORD987654321'
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
      {/* The modal is rendered via Portal, so it will overlay this background */}
      <PaymentFailedModal 
        paymentData={mockPaymentData} 
        onClose={() => navigate('/dashboard')}
        onDashboard={() => navigate('/dashboard')}
        onRetry={() => navigate('/dashboard')}
      />
    </div>
  );
}
