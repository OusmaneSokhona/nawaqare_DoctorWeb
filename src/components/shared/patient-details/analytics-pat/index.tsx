// import React from "react";
// import { Typography } from "../../typography";
// import { Icon } from "@iconify/react";
// import ConsultationGraph from "../consultation-graph";
// import DashboardCharts from "../consultation-graph/graph";
// import Image from "next/image";

// const stats = [
//   {
//     icon: "streamline:medical-bag-solid",
//     stat: "22",
//     title: "Total Appointments",
//   },
//   {
//     icon: "ant-design:file-add-filled",
//     stat: "2",
//     title: "Active Prescriptions",
//   },
//   {
//     icon: "solar:dollar-bold",
//     stat: " 8",
//     title: "Active  Prescriptions",
//   },
//   // {
//   //   icon: "solar:dollar-bold",
//   //   stat: "12%",
//   //   title: "No-show Rate",
//   // },
//   // {
//   //   icon: "solar:dollar-bold",
//   //   stat: " $540",
//   //   title: "Total Spend",
//   // },
//   {
//     icon: "mingcute:calendar-fill",
//     stat: "1 /3 month",
//     title: "Average consultation ",
//   },
//   // {
//   //   icon: "streamline:medical-bag-solid",
//   //   stat: "22",
//   //   title: "Total Appointments",
//   // },
//   // {
//   //   icon: "ant-design:file-add-filled",
//   //   stat: "2",
//   //   title: "Active Prescriptions",
//   // },
//   // {
//   //   icon: "solar:dollar-bold",
//   //   stat: " $540",
//   //   title: "Total Spend",
//   // },
//   // {
//   //   icon: "mingcute:calendar-fill",
//   //   stat: "Dr.Emily",
//   //   title: "Top consulted doctor",
//   // },
// ];

// const AnalyticsPat = () => {
//   return (
//     <div className="mt-6 space-y-4 ">
//       <div className="flex flex-wrap gap-8 items-center">
//         {stats.map((activity, i) => (
//           <div
//             key={i}
//             className="bg-white  w-[180px] shadow-[0_0_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out
//          hover:-translate-y-2 hover:shadow-lg rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
//           >
//             <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
//               <Icon
//                 icon={activity.icon}
//                 width="24"
//                 height="24"
//                 className="text-white"
//               />
//             </div>
//             <Typography size="h4" as="h4">
//               {activity.stat}
//             </Typography>
//             <Typography className="font-medium">{activity.title}</Typography>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-5 pt-8 max-md:flex-col">
//         <div className="basis-[65%] max-md:basis-full">
//           <Typography size="h4" className="text-[#2C2C2C]">
//             Next appointment
//           </Typography>
//           <div
//             className="bg-white shadow-[0_0_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out
//          hover:-translate-y-2 hover:shadow-lg px-6 py-6 mt-5 rounded-lg"
//           >
//             <div className="flex justify-between max-md:flex-col gap-3">
//               <div className=" flex gap-3 items-center">
//                 <Image
//                   src="/assets/svg/sehrImg2.svg"
//                   width={86}
//                   height={84}
//                   alt="img"
//                   className="rounded-full w-[100px] h-[100px]"
//                 />
//                 <div className=" space-y-1">
//                   <Typography
//                     size="h4"
//                     className="text-[#2C2C2C] font-bold text-xl"
//                   >
//                     Mr. Alex
//                   </Typography>
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     44 years . Male . Lahore
//                   </Typography>
//                   <div className="flex max-md:flex-col gap-4 max-md:gap-2">
//                     <div className="flex gap-1 items-center">
//                       <Icon
//                         className="text-primary-color"
//                         icon="mdi:clock-outline"
//                         width={20}
//                         height={20}
//                       />
//                       <Typography className="text-[#2C2C2C] font-medium">
//                         11;30 Am
//                       </Typography>
//                     </div>
//                     <div className="flex gap-1 items-center">
//                       <Icon
//                         className="text-primary-color"
//                         icon="mingcute:phone-call-line"
//                         width={20}
//                         height={20}
//                       />
//                       <Typography className="text-[#2C2C2C] font-medium">
//                         Remote Consultation
//                       </Typography>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mdi:clock-outline"
//                     width={20}
//                     height={20}
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium ">
//                     Start in 10 mint
//                   </Typography>
//                 </div>
//                 <div className="bg-primary-color rounded-full flex items-center justify-center px-3 py-1">
//                   <Typography className="text-white font-medium">
//                     Join Consultation
//                   </Typography>
//                 </div>
//               </div>
//             </div>
//             <hr className="mt-3 mb-3" />
//             <div className="flex justify-between maxmd:flex-col gap-3">
//               <div className="flex max-md:flex-col gap-3">
//                 <div className="flex items-center gap-2">
//                   <Icon
//                     className="text-primary-color"
//                     icon="uil:calender"
//                     width={22}
//                     height={22}
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     # 53 Wating
//                   </Typography>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mdi:clock-outline"
//                     width={22}
//                     height={22}
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     High Blood pressure
//                   </Typography>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mingcute:phone-call-line"
//                     width={22}
//                     height={22}
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     Allergy
//                   </Typography>
//                 </div>
//               </div>
//               <Typography className="text-primary-color underline font-semibold text-xl">
//                 View Detail
//               </Typography>
//             </div>
//           </div>
//         </div>
//         <div className="basis-[35%] max-md:basis-full">
//           <Typography size="h4">Allergies</Typography>
//           <div
//             className="bg-white transition-all duration-300 ease-out
//          hover:-translate-y-2 hover:shadow-lg w-[500px] shadow-[0_0_12px_rgba(0,0,0,0.1)]  rounded-lg px-5 py-10 h-[220px] max-md:h-auto mt-5 max-md:w-full max"
//           >
//             <div>
//               <Typography size="h5" className="text-[#2C2C2C] font-semibold ">
//                 Allergies
//               </Typography>
//               <div className="flex justify-between mt-2">
//                 <div className="space-y-2">
//                   <Typography className="text-desc-color font-medium">
//                     Last updated: Sep 28, 2025
//                   </Typography>
//                   <Typography className="text-desc-color font-medium">
//                     Severity: Normal
//                   </Typography>
//                   <Typography className="text-desc-color font-medium">
//                     By: Dr. Emily Carter
//                   </Typography>
//                 </div>
//                 <div className="space-y-2">
//                   <Typography className="text-center font-semibold text-[#2C2C2C]">
//                     Penicillin
//                   </Typography>
//                   <button className="bg-[#F2994A] px-3 py-1 rounded-full text-white">
//                     Pending review
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>

//       </div>
//       <div className="flex flex-col gap-10 pt-4">
//         <DashboardCharts />

//       </div>
//     </div>
//   );
// };

// export default AnalyticsPat;

// import React from "react";
// import { Typography } from "../../typography";
// import { Icon } from "@iconify/react";
// import DashboardCharts from "../consultation-graph/graph";
// import Image from "next/image";

// const stats = [
//   {
//     icon: "streamline:medical-bag-solid",
//     stat: "22",
//     title: "Total Appointments",
//   },
//   {
//     icon: "ant-design:file-add-filled",
//     stat: "2",
//     title: "Active Prescriptions",
//   },
//   {
//     icon: "solar:dollar-bold",
//     stat: " 8",
//     title: "Active Prescriptions",
//   },
//   {
//     icon: "mingcute:calendar-fill",
//     stat: "1 /3 month",
//     title: "Average consultation",
//   },
// ];

// const AnalyticsPat = () => {
//   return (
//     <div className="mt-6 space-y-4">
//       {/* Stats Cards Section */}
//       <div className="flex flex-wrap gap-8 items-center">
//         {stats.map((activity, i) => (
//           <div
//             key={i}
//             className="bg-white w-[180px] shadow-[0_0_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
//           >
//             <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
//               <Icon
//                 icon={activity.icon}
//                 width="24"
//                 height="24"
//                 className="text-white"
//               />
//             </div>
//             <Typography size="h4" as="h4">
//               {activity.stat}
//             </Typography>
//             <Typography className="font-medium">{activity.title}</Typography>
//           </div>
//         ))}
//       </div>

//       {/* Medical Dashboard Cards - Above DashboardCharts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8">
//         {/* Last Document Card */}
//         <div className="bg-white rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
//           <Typography size="h5" className="text-[#2C2C2C] font-semibold mb-4">
//             Last Document
//           </Typography>
//           <div className="bg-[#F8FAFB] rounded-xl p-4 flex items-center justify-between hover:bg-[#F0F3F5] transition-colors">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-[#E3F2FD] rounded-xl flex items-center justify-center">
//                 <Icon
//                   icon="mdi:file-document-outline"
//                   width="24"
//                   height="24"
//                   className="text-[#2196F3]"
//                 />
//               </div>
//               <div>
//                 <Typography className="font-semibold text-[#2C2C2C] mb-1">
//                   Blood Test Report
//                 </Typography>
//                 <Typography className="text-sm text-[#9CA3AF]">
//                   20/0/Sep/2025
//                 </Typography>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button className="w-9 h-9 rounded-lg bg-white hover:bg-[#F3F4F6] transition-colors flex items-center justify-center">
//                 <Icon
//                   icon="mdi:share-variant"
//                   width="18"
//                   height="18"
//                   className="text-[#6B7280]"
//                 />
//               </button>
//               <button className="w-9 h-9 rounded-lg bg-white hover:bg-[#F3F4F6] transition-colors flex items-center justify-center">
//                 <Icon
//                   icon="mdi:download"
//                   width="18"
//                   height="18"
//                   className="text-[#6B7280]"
//                 />
//               </button>
//               <button className="w-9 h-9 rounded-lg bg-white hover:bg-[#FEF2F2] transition-colors flex items-center justify-center">
//                 <Icon
//                   icon="mdi:delete-outline"
//                   width="18"
//                   height="18"
//                   className="text-[#EF4444]"
//                 />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Current Medications Card */}
//         <div className="bg-white rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
//           <Typography size="h5" className="text-[#2C2C2C] font-semibold mb-1">
//             Current Medications
//           </Typography>
//           <Typography className="text-xs text-[#9CA3AF] mb-4">
//             Last updated: Sep 28, 2025
//           </Typography>

//           <div className="bg-[#F8FAFB] rounded-xl p-4 mb-3">
//             <div className="flex items-center justify-between">
//               <div>
//                 <Typography className="font-semibold text-[#2C2C2C] mb-1">
//                   Metformin
//                 </Typography>
//                 <Typography className="text-sm text-[#6B7280] mb-1">
//                   Twice a day
//                 </Typography>
//                 <Typography className="text-xs text-[#9CA3AF]">
//                   By: Dr. Emily Carter
//                 </Typography>
//               </div>
//               <div className="bg-[#D4EDDA] text-[#155724] px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider">
//                 Valid
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#FFF9E6] border border-[#FFD966] rounded-xl p-3 flex items-start gap-3">
//             <Icon
//               icon="mdi:alert"
//               width="20"
//               height="20"
//               className="text-[#FF9800] flex-shrink-0 mt-0.5"
//             />
//             <Typography className="text-xs text-[#856404] leading-relaxed">
//               <span className="font-semibold">⚠️ Interaction risk:</span>{" "}
//               Metformin + XYZ*
//             </Typography>
//           </div>
//         </div>

//         {/* Last Prescriptions Card */}
//         <div className="bg-white rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
//           <Typography size="h5" className="text-[#2C2C2C] font-semibold mb-4">
//             Last prescriptions
//           </Typography>
//           <div className="bg-[#F8FAFB] border-l-4 border-[#2196F3] rounded-xl p-5 relative">
//             <button className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white hover:bg-[#E3F2FD] transition-colors flex items-center justify-center">
//               <Icon
//                 icon="mdi:information-outline"
//                 width="18"
//                 height="18"
//                 className="text-[#2196F3]"
//               />
//             </button>
//             <Typography className="font-semibold text-[#2C2C2C] mb-2">
//               Prescriptions
//             </Typography>
//             <Typography className="text-sm text-[#6B7280] mb-1">
//               <span className="font-semibold">Amoxicillin 500mg</span>
//             </Typography>
//             <Typography className="text-sm text-[#6B7280] mb-3">
//               <span className="font-medium">Dosage Instructions:</span> 1
//               tablet, twice daily after meals
//             </Typography>
//             <Typography className="text-xs text-[#9CA3AF]">
//               Refill until Oct 15, 2025
//             </Typography>
//           </div>
//         </div>

//         {/* Allergies Card */}
//         <div className="bg-white rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
//           <Typography size="h5" className="text-[#2C2C2C] font-semibold mb-4">
//             Allergies
//           </Typography>
//           <div className="bg-[#F8FAFB] rounded-xl p-5">
//             <div className="flex items-start justify-between">
//               <div className="space-y-2">
//                 <Typography className="text-sm text-[#6B7280]">
//                   Last updated: Sep 28, 2025
//                 </Typography>
//                 <Typography className="text-sm text-[#6B7280]">
//                   Severity: Normal
//                 </Typography>
//                 <Typography className="text-sm text-[#6B7280]">
//                   By: Dr. Emily Carter
//                 </Typography>
//               </div>
//               <div className="text-center space-y-2">
//                 <Typography className="font-semibold text-[#2C2C2C]">
//                   Penicillin
//                 </Typography>
//                 <div className="bg-[#F2994A] text-white px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap">
//                   Pending review
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Next Appointment Section */}
//       <div className="flex gap-5 pt-8 max-md:flex-col">
//         <div className="basis-[65%] max-md:basis-full">
//           <Typography size="h4" className="text-[#2C2C2C]">
//             Next appointment
//           </Typography>
//           <div className="bg-white shadow-[0_0_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg px-6 py-6 mt-5 rounded-lg">
//             <div className="flex justify-between max-md:flex-col gap-3">
//               <div className="flex gap-3 items-center">
//                 <Image
//                   src="/assets/svg/sehrImg2.svg"
//                   width={86}
//                   height={84}
//                   alt="img"
//                   className="rounded-full w-[100px] h-[100px]"
//                 />
//                 <div className="space-y-1">
//                   <Typography
//                     size="h4"
//                     className="text-[#2C2C2C] font-bold text-xl"
//                   >
//                     Mr. Alex
//                   </Typography>
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     44 years . Male . Lahore
//                   </Typography>
//                   <div className="flex max-md:flex-col gap-4 max-md:gap-2">
//                     <div className="flex gap-1 items-center">
//                       <Icon
//                         className="text-primary-color"
//                         icon="mdi:clock-outline"
//                         width={20}
//                         height={20}
//                       />
//                       <Typography className="text-[#2C2C2C] font-medium">
//                         11:30 Am
//                       </Typography>
//                     </div>
//                     <div className="flex gap-1 items-center">
//                       <Icon
//                         className="text-primary-color"
//                         icon="mingcute:phone-call-line"
//                         width={20}
//                         height={20}
//                       />
//                       <Typography className="text-[#2C2C2C] font-medium">
//                         Remote Consultation
//                       </Typography>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mdi:clock-outline"
//                     width={20}
//                     height={20}
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     Start in 10 mint
//                   </Typography>
//                 </div>
//                 <div className="bg-primary-color rounded-full flex items-center justify-center px-3 py-1">
//                   <Typography className="text-white font-medium">
//                     Join Consultation
//                   </Typography>
//                 </div>
//               </div>
//             </div>
//             <hr className="mt-3 mb-3" />
//             <div className="flex justify-between max-md:flex-col gap-3">
//               <div className="flex max-md:flex-col gap-3">
//                 <div className="flex items-center gap-2">
//                   <Icon
//                     className="text-primary-color"
//                     icon="uil:calender"
//                     width={22}
//                     height={22}
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     # 53 Waiting
//                   </Typography>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mdi:clock-outline"
//                     width={22}
//                     height={22}
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     High Blood pressure
//                   </Typography>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Icon
//                     className="text-primary-color"
//                     icon="mingcute:phone-call-line"
//                     width={22}
//                     height={22}
//                   />
//                   <Typography className="text-[#2C2C2C] font-medium">
//                     Allergy
//                   </Typography>
//                 </div>
//               </div>
//               <Typography className="text-primary-color underline font-semibold text-xl">
//                 View Detail
//               </Typography>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Dashboard Charts Section */}
//       <div className="flex flex-col gap-10 pt-4">
//         <DashboardCharts />
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPat;

import React from "react";
import { Typography } from "../../typography";
import { Icon } from "@iconify/react";
import Image from "next/image";
import DashboardCharts from "../consultation-graph/graph";
import StatCard from "../../prescription/StatCard";

type Stat = {
  icon: string;
  stat: string;
  title: string;
};

const stats: Stat[] = [
  { icon: "mdi:calendar-check", stat: "22", title: "Total Appointments" },
  { icon: "mdi:file-document-outline", stat: "2", title: "Last Prescription" },
  { icon: "mdi:pill", stat: "8", title: "Active Prescriptions" },
  { icon: "mdi:calendar-clock", stat: "12/sep/2023", title: "Next Follow-up" },
];

// const StatCard = ({ icon, stat, title }: Stat) => (
//   <div className="bg-white rounded-xl px-4 py-3 w-[170px] border border-[#E9EDF5] shadow-sm max-sm:w-full">
//     <div className="w-10 h-10 rounded-full bg-primary-color flex items-center justify-center">
//       <Icon icon={icon} width="28" className="text-white" />
//     </div>

//     <div className="mt-3">
//       <div className="text-lg font-bold text-[#111827]">{stat}</div>
//       <div className="text-xs text-[#6B7280] mt-1">{title}</div>
//     </div>
//   </div>
// );

const Panel = ({
  title,
  children,
  rightSlot,
  subTitle,
}: {
  title: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
  subTitle?: string;
}) => (
  <div className="">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="text-xl font-semibold text-[#111827]">{title}</div>
        {subTitle ? (
          <div className="text-xs text-[#9CA3AF] mt-1">{subTitle}</div>
        ) : null}
      </div>
      {rightSlot}
    </div>

    <div className="mt-4">{children}</div>
  </div>
);

const Pill = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex items-center gap-2 text-xs text-[#374151]">
    <Icon icon={icon} width="16" className="text-primary-color" />
    <span className="font-medium">{text}</span>
  </div>
);

const AnalyticsPat = () => {
  return (
    <div className="w-full px-1 py-4">
      {/* ✅ Stats row (like screenshot) */}
      <div className="flex flex-wrap gap-4">
        {stats.map((s, i) => (
          <StatCard value={s.stat} label={s.title} icon={s.icon} />
        ))}
      </div>

      {/* ✅ Main dashboard: LEFT stack + RIGHT stack */}
      <div className="mt-6 grid grid-cols-12 gap-6 border-2 border-gray-200 rounded-md p-3">
        {/* LEFT column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Next appointment */}
          <Panel title="Next appointment">
            <div className="bg-white rounded-md border border-[#EEF2F7] p-4 shadow-sm shadow-[#2F80ED]">
              <div className="flex items-start justify-between gap-4 max-md:flex-col">
                <div className="flex items-start gap-4">
                  <Image
                    src="/assets/svg/sehrImg2.svg"
                    width={56}
                    height={56}
                    alt="img"
                    className="rounded-full w-[56px] h-[56px]"
                  />

                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#111827]">
                      Mr. Alex
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      44 years . Male . Lahore
                    </div>

                    <div className="flex items-center gap-4 flex-wrap mt-2">
                      <Pill icon="mdi:clock-outline" text="11:30 Am" />
                      <Pill
                        icon="mingcute:phone-call-line"
                        text="Remote Consultation"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 max-md:items-start">
                  <div className="flex items-center gap-2 text-xs text-[#374151]">
                    <Icon
                      icon="mdi:clock-outline"
                      width="16"
                      className="text-primary-color"
                    />
                    <span className="font-medium">Start in 10 mint</span>
                  </div>

                  <button
                    type="button"
                    className="h-8 px-4 rounded-full bg-primary-color text-white text-xs font-semibold"
                  >
                    Join Consultation
                  </button>
                </div>
              </div>

              <div className="h-[1px] bg-[#E5E7EB] my-4" />

              <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:items-start">
                <div className="flex items-center gap-5 flex-wrap">
                  <Pill icon="uil:calender" text="# 53 Waiting" />
                  <Pill icon="mdi:heart-pulse" text="High Blood pressure" />
                  <Pill icon="mdi:alert-circle-outline" text="Allergy" />
                </div>

                <button
                  type="button"
                  className="text-primary-color text-sm font-semibold underline"
                >
                  View Detail
                </button>
              </div>
            </div>
          </Panel>

          {/* Last Document */}
          <Panel title="Last Document">
            <div className="bg-white rounded-md border border-[#EEF2F7] p-5 flex items-center justify-between gap-4 shadow-sm shadow-[#2F80ED]">
              {/* Left side */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E3F2FD] flex items-center justify-center">
                  <Icon
                    icon="mdi:file-document-outline"
                    width="30"
                    height={"30"}
                    className="text-[#2196F3]"
                  />
                </div>

                <div>
                  <div className="text-md font-semibold text-[#111827]">
                    Blood Test Report
                  </div>
                  <div className="text-xs text-[#9CA3AF] mt-1">20/Sep/2025</div>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                <Icon
                  icon="streamline:checkup-medical-report-clipboard-solid"
                  width="16"
                  height={"16"}
                  className="text-primary-color cursor-pointer"
                />

                <Icon
                  icon="material-symbols:download-rounded"
                  width="16"
                  height={"16"}
                  className="text-primary-color cursor-pointer"
                />
                <Icon
                  icon="material-symbols:delete"
                  width="16"
                  height={"16"}
                  className="text-[#EF4444] cursor-pointer"
                />

                <span className="ml-1 px-5 py-1 cursor-pointer rounded bg-primary-color text-white text-[10px] font-semibold">
                  New
                </span>
              </div>
            </div>
          </Panel>

          {/* Last prescriptions */}
          <Panel title="Last prescriptions">
            <div className="bg-white rounded-md border border-[#EEF2F7] p-4 relative shadow-sm shadow-[#2F80ED]">
              <button className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center">
                <Icon
                  icon="uiw:message"
                  width="16"
                  className="text-primary-color"
                />
              </button>

              <div className="text-lg font-semibold text-[#111827]">
                Prescriptions
              </div>
              <div className="text-xs text-[#6B7280] mt-2">
                <span className="font-semibold">Amoxicillin 500mg</span>
              </div>
              <div className="text-md text-[#6B7280] mt-2">
                <span className="font-semibold text-black">
                  Dosage Instruction:
                </span>{" "}
                1 tablet, twice daily after meals
              </div>
              <div className="text-[11px] text-[#9CA3AF] mt-3">
                Refill until Oct 15, 2025
              </div>
            </div>
          </Panel>
        </div>

        {/* RIGHT column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Allergies */}
          <Panel title="Allergies">
            <div className="bg-white rounded-md border border-[#EEF2F7] p-4 shadow-sm shadow-[#2F80ED]">
              <div className="text-md font-semibold text-[#111827]">
                Allergies
              </div>

              <div className="mt-3 mb-7 flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="text-[11px] text-[#9CA3AF]">
                    Last updated: Sep 28, 2025
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    Severity: Normal
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    By: Dr. Emily Carter
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-xs font-bold text-[#111827]">
                    Penicillin
                  </div>
                  <div className="px-1 py-1 rounded-md bg-[#F2994A] text-white text-[10px] font-semibold inline-block">
                    Pending review
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          {/* Current Medications */}
          <Panel title="Current Medications">
            <div className="bg-white rounded-md border border-[#EEF2F7] p-4 shadow-sm shadow-[#2F80ED]">
              {/* Top: Title + Drug name on right */}
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-[#111827]">
                    Current Medications
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] mt-1">
                    Last updated: Sep 28, 2025
                  </div>
                </div>

                <div className="text-xs font-bold text-[#111827]">
                  Metformin
                </div>
              </div>

              {/* Middle: Dosage left + Status right */}
              <div className="flex items-center justify-between mt-1">
                <div className="text-xs text-[#6B7280]">Twice a day</div>

                <div className="px-3 py-1 rounded-md bg-[#1e8034] text-white text-[10px] font-bold">
                  Verified
                </div>
              </div>

              {/* Doctor */}
              <div className="text-[11px] text-[#9CA3AF] mt-2">
                By: Dr. Emily Carter
              </div>

              {/* Warning */}
              <div className="mt-4 bg-[#fbf2c9] border rounded-xl p-2 flex items-start gap-2 mb-10">
                <Icon
                  icon="mdi:alert"
                  width="12"
                  className="text-[#fad030] mt-0.5"
                />
                <div className="text-sm">
                  <span className="font-medium">Interaction risk:</span>{" "}
                  Metformin + “XYZ”
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPat;
