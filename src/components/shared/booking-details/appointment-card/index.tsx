import React from "react";

const AppointmentCard = () => {
  return (
    <div className="w-full  rounded-2xl shadow-lg overflow-hidden animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)]">
      {/* Card Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white px-7 py-6 border-b border-gray-100">
        {/* Compliance Section */}
        <div className="flex items-center gap-3 mb-5 animate-[fadeIn_0.8s_ease-out_0.2s_both]">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <div className="w-[18px] h-[18px] bg-emerald-500 rounded-full flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite] relative">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <span>Compliance status: Ready to start</span>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="flex gap-4 flex-wrap animate-[fadeIn_0.8s_ease-out_0.3s_both]">
          <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white px-3 py-1.5 rounded-full shadow-sm hover:translate-y-[-2px] transition-transform duration-200">
            <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center">
              <span className="text-white text-[11px] font-bold">✓</span>
            </div>
            <span>Consent received</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white px-3 py-1.5 rounded-full shadow-sm hover:translate-y-[-2px] transition-transform duration-200">
            <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center">
              <span className="text-white text-[11px] font-bold">✓</span>
            </div>
            <span>Payment Confirmed</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-white px-3 py-1.5 rounded-full shadow-sm hover:translate-y-[-2px] transition-transform duration-200">
            <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center">
              <span className="text-white text-[11px] font-bold">✓</span>
            </div>
            <span>Document completed</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-7 py-7">
        <h2 className="text-lg font-bold text-gray-900 mb-3 tracking-tight animate-[fadeIn_0.8s_ease-out_0.4s_both]">
          Appointment Information
        </h2>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start animate-[fadeIn_0.8s_ease-out_0.5s_both]">
          <div className="flex flex-col gap-2">
            {/* Patient Info */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>44 years</span>
              <div className="w-1 h-1 bg-gray-700 rounded-full opacity-40"></div>
              <span>Male</span>
              <div className="w-1 h-1 bg-gray-700 rounded-full opacity-40"></div>
              <span>Lahore</span>
            </div>

            {/* Time Info */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
              <div className="w-4 h-4 border-2 border-gray-700 rounded-full relative">
                <div className="absolute w-0.5 h-[5px] bg-gray-700 top-0.5 left-[5px]"></div>
              </div>
              <span>11:30 Am - 12:00 Am Routine Checkup</span>
            </div>

            {/* Status Badge */}
            <div className="mt-1">
              <span className="inline-block bg-emerald-500 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                Ready
              </span>
            </div>
          </div>

          {/* Countdown Badge */}
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-br from-emerald-100 to-white border border-emerald-500 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 animate-[fadeIn_0.8s_ease-out_0.6s_both]">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">
              ⏱
            </div>
            <span>Start in 10 minit</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 animate-[fadeIn_0.8s_ease-out_0.7s_both]">
          <button className="flex-1 bg-blue hover:bg-blue text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(59,130,246,0.4)] shadow-[0_4px_12px_rgba(59,130,246,0.3)] relative overflow-hidden group">
            <span className="relative z-10">Join Consultation</span>
            <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500"></span>
          </button>
          <button className="flex-1 bg-white hover:bg-blue text-blue hover:text-white border-2 border-blue-500 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:translate-y-[-2px] relative overflow-hidden group">
            <span className="relative z-10">Patient Record</span>
            <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-[3] transition-transform duration-500"></span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
};

export default AppointmentCard;
