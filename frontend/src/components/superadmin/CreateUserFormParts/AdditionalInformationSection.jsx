export default function AdditionalInformationSection() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="p-5 lg:p-6 border-b border-slate-100">
        <h2 className="text-[16px] font-bold text-[#1a1446]">Additional Information (Optional)</h2>
      </div>

      <div className="p-5 lg:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Address */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Address</label>
          <input type="text" placeholder="Enter address" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium" />
        </div>

        {/* City */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">City</label>
          <input type="text" placeholder="Enter city" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium" />
        </div>

        {/* State */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">State</label>
          <input type="text" placeholder="Enter state" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium" />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-[13px] font-bold text-[#111] mb-2">Pincode</label>
          <input type="text" placeholder="Enter pincode" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium" />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-[13px] font-bold text-[#111] mb-2">Notes</label>
          <textarea placeholder="Enter any additional notes" rows={3} className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4f3bf3] focus:ring-1 focus:ring-[#4f3bf3] transition-all text-[14px] text-slate-900 placeholder:text-slate-400 font-medium resize-none" />
        </div>
      </div>
    </div>
  );
}
