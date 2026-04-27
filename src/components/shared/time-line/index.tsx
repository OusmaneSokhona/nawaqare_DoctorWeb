// import React from 'react';

// const PaymentTimeline = () => {
//   const timelineEvents = [
//     {
//       id: 1,
//       title: 'Payment Created',
//       date: '10 Oct 2025 - 11:00 AM',
//       performer: 'Admin John',
//     },
//     {
//       id: 2,
//       title: 'Payment Authorized',
//       date: '10 Oct 2025 - 11:02 AM',
//       performer: 'Admin John',
//     },
//     {
//       id: 3,
//       title: 'Payment Captured',
//       date: '10 Oct 2025 - 11:05 AM',
//       performer: 'Doctor',
//     },
//     {
//       id: 4,
//       title: 'Payout Sent to Doctor',
//       date: '10 Oct 2025 - 11:06 AM',
//       performer: 'Doctor',
//     },
//     {
//       id: 5,
//       title: 'Payout Sent to Pharmacy',
//       date: '10 Oct 2025 - 11:00 AM',
//       performer: 'Medicine not available',
//     },
//     {
//       id: 6,
//       title: 'Refund Triggered',
//       date: '10 Oct 2025 - 11:00 AM',
//       performer: 'Doctor',
//     },
//     {
//       id: 7,
//       title: 'Refund Settled',
//       date: '10 Oct 2025 - 11:00 AM',
//       performer: 'Doctor',
//     },
//     {
//       id: 8,
//       title: 'Payment Status Changed',
//       date: '10 Oct 2025 - 11:00 AM',
//       performer: 'Doctor',
//     },
//   ];

//   return (
//     <div className="min-h-screen  p-8">
//       <div className="">
//         <div>
//           {/* Header */}
//         <h2 className="text-2xl font-semibold text-gray-900 mb-4">
//           Payment Timeline
//         </h2>
//          <hr />
//         </div>

//         {/* Timeline */}
//         <div className="relative mt-6">
//           {timelineEvents.map((event, index) => (
//             <div key={event.id} className="relative flex gap-4 pb-8">
//               {/* Vertical Line */}
//               {index !== timelineEvents.length - 1 && (
//                 <div className="absolute left-5 top-8 bottom-0 w-0.5 bg-primary-color" />
//               )}

//               {/* Number Circle */}
//               <div className="relative z-10 flex-shrink-0">
//                 <div className="w-10 h-10 bg-primary-color rounded-full flex items-center justify-center text-white text-sm font-medium">
//                   {event.id}
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="flex-1 pt-0.5">
//                 <h3 className="text-base font-semibold text-gray-900 mb-1">
//                   {event.title}
//                 </h3>
//                 <p className=" text-gray-500 mb-0.5">{event.date}</p>
//                 <p className=" text-gray-400">
//                   Performed by: {event.performer}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-3 mt-8 pt-6 ">
//           {/* <button className="px-4 py-2 underline text-[#828282] hover:text-gray-900 transition-colors">
//             Export Payment PDF
//           </button> */}
//           {/* <button className="px-4 py-2 underline  text-[#828282] hover:text-gray-900 transition-colors">
//             Open Linked Transaction
//           </button>
//           <button className="px-4 py-2  text-gray-600 bg-[#A7A7A733] rounded-md hover:bg-gray-200 transition-colors ml-auto max-md:ml-0">
//             Send Receipt
//           </button>
//           <button className="px-4 py-2  text-white bg-primary-color rounded-md hover:bg-blue transition-colors">
//             Manual Refund
//           </button> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentTimeline;
"use client";

import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Check } from "lucide-react";

const PaymentTimeline = () => {
  const timelineEvents = [
    {
      id: 1,
      title: "Payment Created",
      date: "10 Oct 2025 - 11:00 AM",
      performer: "Admin John",
    },
    {
      id: 2,
      title: "Payment Authorized",
      date: "10 Oct 2025 - 11:02 AM",
      performer: "Admin John",
    },
    {
      id: 3,
      title: "Payment Captured",
      date: "10 Oct 2025 - 11:05 AM",
      performer: "Doctor",
    },
    {
      id: 4,
      title: "Payout Sent to Doctor",
      date: "10 Oct 2025 - 11:06 AM",
      performer: "Doctor",
    },
    {
      id: 5,
      title: "Payout Sent to Pharmacy",
      date: "10 Oct 2025 - 11:00 AM",
      performer: "Medicine not available",
    },
    {
      id: 6,
      title: "Refund Triggered",
      date: "10 Oct 2025 - 11:00 AM",
      performer: "Doctor",
    },
    {
      id: 7,
      title: "Refund Settled",
      date: "10 Oct 2025 - 11:00 AM",
      performer: "Doctor",
    },
    {
      id: 8,
      title: "Payment Status Changed",
      date: "10 Oct 2025 - 11:00 AM",
      performer: "Doctor",
    },
  ];

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepClick = (id: number, index: number) => {
    if (!completedSteps.includes(id)) {
      const newCompleted = [...completedSteps, id];
      setCompletedSteps(newCompleted);

      // Last step → show success toast
      if (index === timelineEvents.length - 1) {
        toast.success("Successfully submitted! 🎉");
      }
    }
  };

  return (
    <div className="min-h-screen p-8">
      <Toaster position="top-right" />

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Payment Timeline
      </h2>
      <hr />

      {/* Timeline */}
      <div className="relative mt-6">
        {timelineEvents.map((event, index) => {
          const isCompleted = completedSteps.includes(event.id);

          return (
            <div key={event.id} className="relative flex gap-4 pb-8">
              {/* Vertical Line */}
              {index !== timelineEvents.length - 1 && (
                <div
                  className={`absolute left-5 top-8 bottom-0 w-0.5 transition-colors ${
                    isCompleted ? "bg-green-500" : "bg-primary-color"
                  }`}
                />
              )}

              {/* Number Circle */}
              <div className="relative z-10 flex-shrink-0">
                <button
                  onClick={() => handleStepClick(event.id, index)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium transition-colors ${
                    isCompleted ? "bg-green-500" : "bg-primary-color"
                  }`}
                >
                  {isCompleted ? <Check size={20} /> : event.id}
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 pt-0.5">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {event.title}
                </h3>
                <p className="text-gray-500 mb-0.5">{event.date}</p>
                <p className="text-gray-400">Performed by: {event.performer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentTimeline;
