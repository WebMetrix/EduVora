import React from 'react';
import { Landmark } from 'lucide-react';

/**
 * High fidelity icon for Bank Transfer
 */
export const BankTransferIcon = ({ className = "w-4 h-4 text-slate-700" }) => (
  <div className="flex items-center justify-center shrink-0">
    <Landmark className={className} />
  </div>
);

/**
 * High fidelity icon for UPI matching standard UPI badge
 */
export const UpiIcon = ({ className = "w-4 h-4" }) => (
  <div className="flex items-center justify-center shrink-0">
    <svg 
      viewBox="0 0 32 32" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="6" fill="#F8FAFC" />
      {/* UPI Styled Arrow/Text graphic */}
      <path 
        d="M9 22L15 10H19L13 22H9Z" 
        fill="#097939" 
      />
      <path 
        d="M17 22L23 10H27L21 22H17Z" 
        fill="#E56321" 
      />
      <path 
        d="M14 17L19 17" 
        stroke="#1E293B" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
    </svg>
  </div>
);

/**
 * High fidelity PayPal Icon matching classic dual-P logo
 */
export const PaypalIcon = ({ className = "w-4 h-4" }) => (
  <div className="flex items-center justify-center shrink-0">
    <svg 
      viewBox="0 0 32 32" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="6" fill="#F8FAFC" />
      <path 
        d="M10 8h6.2c3 0 5 1.5 4.5 4.5-.4 2.8-2.5 4.5-5.5 4.5H12l-1.5 9H8L10 8z" 
        fill="#003087" 
      />
      <path 
        d="M13 12h6.2c3 0 4.8 1.5 4.3 4.5-.5 3-2.6 4.5-5.8 4.5H14.5L13.2 28h-3.7l2.5-16z" 
        fill="#0079C1" 
        fillOpacity="0.88" 
      />
      <path 
        d="M14.5 21H17.7c3.2 0 5.3-1.5 5.8-4.5.3-1.8-.3-3-1.7-3.7-.8 2.2-2.8 3.7-5.5 3.7h-3.1l-1.3 8h2.6l.6-3.5z" 
        fill="#00457C" 
      />
    </svg>
  </div>
);
