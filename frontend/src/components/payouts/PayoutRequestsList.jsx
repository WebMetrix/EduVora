import React from 'react';
import { Clock, CheckCircle2, AlertCircle, ArrowUpRight, Plus, RefreshCw } from 'lucide-react';
import { BankTransferIcon, UpiIcon, PaypalIcon } from './PayoutIcons';

export default function PayoutRequestsList({ onRequestPayout, onViewDetails }) {
  // Active/pending requests
  const activeRequests = [
    {
      id: 3,
      transactionId: "TRX202607100002",
      requestDate: "10 Jul 2026",
      estimatedDate: "13 Jul 2026",
      amount: "1,500.00",
      method: "Bank Transfer",
      methodType: "bank",
      account: "•••• 1234 (HDFC Bank)",
      status: "pending",
      statusStep: 2, // 1: Submitted, 2: Under Process, 3: Completed
      remarks: "Under verification with Cashfree Payouts"
    }
  ];

  const renderMethodIcon = (type) => {
    switch (type) {
      case 'upi': return <UpiIcon className="w-5 h-5" />;
      case 'paypal': return <PaypalIcon className="w-5 h-5" />;
      default: return <BankTransferIcon className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/95 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-4 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-6 group/card transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-[16px] font-bold text-slate-900">Active Payout Requests</h3>
          <p className="text-[12.5px] text-slate-500 font-medium mt-0.5">
            Monitor real-time status of your pending withdrawal requests.
          </p>
        </div>

        <button
          onClick={onRequestPayout}
          className="flex items-center gap-2 px-4 py-2 bg-[#4f3bf3] text-white rounded-xl text-[13px] font-bold hover:bg-indigo-700 shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Payout Request
        </button>
      </div>

      {activeRequests.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Clock className="w-7 h-7" />
          </div>
          <h4 className="text-[15px] font-bold text-slate-800">No Pending Requests</h4>
          <p className="text-[13px] text-slate-500 max-w-sm mt-1">
            All your payout requests have been processed. You can submit a new request anytime your balance reaches ₹500.00.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeRequests.map((req) => (
            <div
              key={req.transactionId}
              className="border border-amber-200/80 bg-amber-50/20 rounded-2xl p-4 sm:p-5 flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-slate-900">{req.transactionId}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-100 text-amber-700 border border-amber-300/50">
                        Under Process
                      </span>
                    </div>
                    <span className="text-[12px] text-slate-500 font-medium">Requested on {req.requestDate}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Request Amount</span>
                  <span className="text-[18px] sm:text-[20px] font-black text-slate-900">₹ {req.amount}</span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/70">
                <div className="grid grid-cols-3 gap-2 text-center relative">
                  {/* Connecting Line */}
                  <div className="absolute top-3 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-0">
                    <div className="h-full bg-amber-500 w-1/2 transition-all duration-500" />
                  </div>

                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-1 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-bold">
                      ✓
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">Submitted</span>
                    <span className="text-[10px] text-slate-400">{req.requestDate}</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-1 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] font-bold">
                      2
                    </div>
                    <span className="text-[11px] font-bold text-amber-700">Processing</span>
                    <span className="text-[10px] text-slate-400">Verifying Bank</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-1 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[11px] font-bold">
                      3
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">Completed</span>
                    <span className="text-[10px] text-slate-400">Est. {req.estimatedDate}</span>
                  </div>
                </div>
              </div>

              {/* Details & Action */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 text-[12px] text-slate-600">
                  {renderMethodIcon(req.methodType)}
                  <span>Destination: <strong>{req.method}</strong> ({req.account})</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onViewDetails(req)}
                    className="flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-[12px] font-bold text-slate-700 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
