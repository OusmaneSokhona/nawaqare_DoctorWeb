// "use client";
// import React, { useState } from "react";
// import { Typography } from "../../typography";
// import { Icon } from "@iconify/react";
// import { followups } from "@/data";

// interface Follow {
//   name: string;
//   potency: string;
//   instructions: string;
// }

// interface Followup {
//   title: string;
//   follows: Follow[];
// }

// const EPrescription: React.FC = () => {
//   const [openfaq, setOPenfaq] = useState<number | null>(null);

//   return (
//     <div className="flex flex-col gap-5 rounded-xl bg-white p-8 max-md:p-5">
//       {followups.map((fellow: Followup, i: number) => (
//         <div
//           key={i}
//           className={`rounded shadow-md px-5 py-3 max-sm:p-3 transition-all duration-300 ${
//             openfaq === i ? "h-auto" : "h-12"
//           }`}
//         >
//           {/* Header */}
//           <div
//             onClick={() => setOPenfaq(openfaq === i ? null : i)}
//             className="flex justify-between items-center gap-2 cursor-pointer"
//           >
//             <Typography className="font-bold">
//               {fellow.title}
//             </Typography>
//             <Icon
//               icon="fe:arrow-up"
//               width="24"
//               height="24"
//               className={`text-secondary-color transition-transform ${
//                 openfaq === i ? "" : "rotate-180"
//               }`}
//             />
//           </div>

//           {/* Expanded details */}
//           {openfaq === i && (
//             <div className="space-y-5 pt-5">
//               {fellow.follows.map((fel, j) => (
//                 <div
//                   key={j}
//                   className="flex justify-between gap-5 items-start max-md:flex-col"
//                 >
//                   {/* Left: Icon + Medicine */}
//                   <div className="w-[30%] max-md:w-full flex items-center gap-3">
//                     <div className="flex-shrink-0 bg-secondary-color h-12 w-12 flex justify-center items-center rounded-xl">
//                       <Icon
//                         icon="streamline-ultimate:lab-tube-experiment"
//                         width="24"
//                         height="24"
//                         className="text-white"
//                       />
//                     </div>
//                     <div>
//                       <Typography className="font-medium">
//                         Medicine name
//                       </Typography>
//                       <Typography className="text-desc-color">
//                         {fel.name}
//                       </Typography>
//                     </div>
//                   </div>

//                   {/* Potency */}
//                   <div className="w-[30%] max-md:w-full">
//                     <Typography className="font-medium">Potency</Typography>
//                     <Typography className="text-desc-color">
//                       {fel.potency}
//                     </Typography>
//                   </div>

//                   {/* Instructions */}
//                   <div className="w-[30%] max-md:w-full">
//                     <Typography className="font-medium">Instructions</Typography>
//                     <Typography className="text-desc-color">
//                       {fel.instructions}
//                     </Typography>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EPrescription;
//import { appointment } from "./appointment-data";
// 'use client'
// import { appointment } from "@/data";
// import { Icon } from "@iconify/react";
// import { Typography } from "../../typography";

// export default function AppointmentCard() {
//   return (
//     <div>
//       <Typography className="mb-4 mt-[-15px] font-medium text-desc-color">Cross-reference between the involved patient and practitioner</Typography>
//     <div className="w-full bg-white h-[70vh] max-md:h-auto rounded-xl shadow p-5 space-y-5 border">
//       {/* Title */}
//       <h3 className="text-md font-semibold">Appointment {appointment.id}</h3>

//       <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6">

//         {/* Patient */}
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 bg-lime-500 rounded-md flex items-center justify-center">
//             <Icon icon="mdi:information-outline" className="text-white" width="22" />
//           </div>
//           <div>
//             <p className="font-semibold">Patient</p>
//             <p className="text-gray-600">{appointment.patient.name}</p>
//           </div>
//         </div>

//         {/* Doctor */}
//         <div>
//           <p className="font-semibold">Doctor</p>
//           <p className="text-gray-700">{appointment.doctor.name}</p>
//           <a
//             // href={appointment.doctor.profileLink}
//             className="text-blue-600 text-sm underline cursor-pointer"
//           >
//             View Profile
//           </a>
//         </div>

//         {/* Type */}
//         <div>
//           <p className="font-semibold">Type</p>
//           <p className="text-gray-600">{appointment.type}</p>
//         </div>

//         {/* Date */}
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 bg-lime-500 rounded-md flex items-center justify-center">
//             <Icon icon="mdi:information-outline" className="text-white" width="22" />
//           </div>
//           <div>
//             <p className="font-semibold">Date</p>
//             <p className="text-gray-600">{appointment.date}</p>
//           </div>
//         </div>

//         {/* Time */}
//         <div>
//           <p className="font-semibold">Time</p>
//           <p className="text-gray-600">{appointment.time}</p>
//         </div>

//         {/* Status */}
//         <div>
//           <p className="font-semibold">Status</p>
//           <p className="text-blue-600 font-medium">{appointment.status}</p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "../../typography";

// 🔹 Multiple appointments dummy data
const appointments = [
  {
    id: 1,
    patient: { name: "John Smith" },
    doctor: { name: "Dr. Emily Carter" },
    type: "Video Consultation",
    date: "Oct 14, 2025",
    time: "10:30 AM",
    status: "Ongoing",
  },
  {
    id: 2,
    patient: { name: "Michael Brown" },
    doctor: { name: "Dr. Sarah Lee" },
    type: "Clinic Visit",
    date: "Oct 16, 2025",
    time: "02:00 PM",
    status: "Scheduled",
  },
];

export default function AppointmentCard() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div>
      <Typography className="mb-4 mt-[-15px] font-medium text-desc-color">
        Cross-reference between the involved patient and practitioner
      </Typography>

      <div className="space-y-4 bg-white p-8 max-md:p-5 rounded-xl">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="w-full rounded-xl border">
            {/* HEADER */}
            <button
              onClick={() => toggle(appointment.id)}
              className="w-full flex justify-between items-center px-5 py-4"
            >
              <h3 className="text-md font-semibold">
                Appointment {appointment.id}
              </h3>

              <Icon
                icon="mdi:chevron-down"
                className={`text-xl transition-transform ${
                  openId === appointment.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* CONTENT */}
            {openId === appointment.id && (
              <div className="px-5 pb-5">
                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6">
                  {/* Patient */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-lime-500 rounded-md flex items-center justify-center">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-white"
                        width="22"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Patient</p>
                      <p className="text-gray-600">
                        {appointment.patient.name}
                      </p>
                    </div>
                  </div>

                  {/* Doctor */}
                  <div>
                    <p className="font-semibold">Doctor</p>
                    <p className="text-gray-700">{appointment.doctor.name}</p>
                    <span className="text-blue-600 text-sm underline cursor-pointer">
                      View Profile
                    </span>
                  </div>

                  {/* Type */}
                  <div>
                    <p className="font-semibold">Type</p>
                    <p className="text-gray-600">{appointment.type}</p>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-lime-500 rounded-md flex items-center justify-center">
                      <Icon
                        icon="mdi:information-outline"
                        className="text-white"
                        width="22"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">Date</p>
                      <p className="text-gray-600">{appointment.date}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-gray-600">{appointment.time}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="font-semibold">Status</p>
                    <p
                      className={`font-medium ${
                        appointment.status === "Ongoing"
                          ? "text-primary-color"
                          : "text-green-600"
                      }`}
                    >
                      {appointment.status}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
