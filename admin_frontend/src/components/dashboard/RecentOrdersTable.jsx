import React, { useState } from 'react';
import { ShoppingCart, Calendar, IndianRupee, Package } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModal';

const ordersData = [
  {
    id: 1,
    orderId: 'ORD20260831001',
    userName: 'Rajesh Kumar',
    package: 'Starter',
    amount: '₹ 1,499',
    date: '31 Aug 2026',
    status: 'Completed'
  },
  {
    id: 2,
    orderId: 'ORD20260831002',
    userName: 'Priya Sharma',
    package: 'Advanced',
    amount: '₹ 2,999',
    date: '31 Aug 2026',
    status: 'Completed'
  },
  {
    id: 3,
    orderId: 'ORD20260830001',
    userName: 'Arjun Mehta',
    package: 'Pro',
    amount: '₹ 4,999',
    date: '30 Aug 2026',
    status: 'Pending'
  },
  {
    id: 4,
    orderId: 'ORD20260830002',
    userName: 'Sneha Iyer',
    package: 'Basic',
    amount: '₹ 999',
    date: '30 Aug 2026',
    status: 'Completed'
  },
  {
    id: 5,
    orderId: 'ORD20260829001',
    userName: 'Vikram Singh',
    package: 'Starter',
    amount: '₹ 1,499',
    date: '29 Aug 2026',
    status: 'Failed'
  }
];

export default function RecentOrdersTable({ onViewAll }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-white/90 to-indigo-50/40 backdrop-blur-xl border border-indigo-100/60 p-3.5 sm:p-4 lg:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)] hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between h-full">
      {/* Decorative hover gradient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-indigo-400/20 transition-colors duration-700" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-2.5 sm:mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <h3 className="text-[14.5px] sm:text-[15px] font-extrabold text-slate-900 tracking-tight">
            Recent Orders
          </h3>
        </div>
        {onViewAll ? (
          <button
            type="button"
            onClick={onViewAll}
            className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer focus:outline-none"
          >
            View All
          </button>
        ) : (
          <a
            href="#"
            className="text-[11.5px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
          >
            View All
          </a>
        )}
      </div>

      {/* Desktop View Table (hidden on mobile) */}
      <div className="relative z-10 hidden md:block overflow-hidden">
        <table className="w-full text-left text-[11.5px] sm:text-[12px] whitespace-nowrap">
          <colgroup>
            <col className="w-[6%]" />
            <col className="w-[20%]" />
            <col className="w-[22%]" />
            <col className="w-[14%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[12%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-slate-200/60 text-slate-400 font-bold">
              <th className="py-2 sm:py-2.5 px-2 font-semibold text-center">#</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">Order ID</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">User Name</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">Package</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">Amount</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold">Date</th>
              <th className="py-2 sm:py-2.5 px-2 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100/30">
            {ordersData.map((order) => (
              <tr
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="group border-b border-indigo-100/30 hover:bg-white hover:shadow-md hover:-translate-y-0.5 hover:z-10 relative transition-all duration-300 cursor-pointer"
              >
                <td className="py-2 sm:py-2.5 px-2 text-slate-400 font-medium text-center rounded-l-xl">{order.id}</td>
                <td className="py-2 sm:py-2.5 px-2 font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors tracking-tight">{order.orderId}</td>
                <td className="py-2 sm:py-2.5 px-2 font-bold text-slate-900 group-hover:text-indigo-950 transition-colors">{order.userName}</td>
                <td className="py-2 sm:py-2.5 px-2 text-slate-600 font-semibold">{order.package}</td>
                <td className="py-2 sm:py-2.5 px-2 font-black text-slate-900">{order.amount}</td>
                <td className="py-2 sm:py-2.5 px-2 text-slate-500 font-medium">{order.date}</td>
                <td className="py-2 sm:py-2.5 px-2 text-center rounded-r-xl">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border inline-flex items-center shadow-2xs transition-transform duration-300 group-hover:scale-105 ${order.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                      : order.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200/60'
                        : 'bg-rose-50 text-rose-700 border-rose-200/60'
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards (Visible only on mobile) */}
      <div className="relative z-10 flex flex-col gap-2.5 md:hidden">
        {ordersData.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="group p-3 sm:p-4 flex flex-col gap-2.5 bg-white/60 border border-indigo-100/50 rounded-2xl hover:bg-white hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-10"
          >
            {/* Top row: Order ID + Status + Action */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-extrabold text-indigo-900/80 group-hover:text-indigo-600 transition-colors leading-tight">
                  {order.orderId}
                </span>
                <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-indigo-950 transition-colors truncate">
                  {order.userName}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-transform duration-300 group-hover:scale-105 ${order.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                    : order.status === 'Pending'
                      ? 'bg-amber-50 text-amber-700 border-amber-200/60'
                      : 'bg-rose-50 text-rose-700 border-rose-200/60'
                    }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Bottom details row: Package, Amount, Date */}
            <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-100 text-[11px] items-center">
              <div className="flex items-center gap-1 text-slate-600 truncate">
                <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-700 truncate">{order.package}</span>
              </div>
              <div className="text-center font-black text-slate-900">
                {order.amount}
              </div>
              <div className="flex items-center gap-1 text-slate-500 justify-end text-[10.5px]">
                <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{order.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
