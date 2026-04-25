// "use client";
// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";
// import { quickCard } from "@/data";
// import { Icon } from "@iconify/react";
// import React from "react";

// const Reception = () => {
//     const receptionCards =[
//         {
//           title:"22",
//           desc:"Available",
//         },
//         {
//           title:"22",
//           desc:"Slots Booked",
//         },
//         {
//           title:"2",
//           desc:"Planned Absences",
//         },
//     ]
//   return (
//     <div>
//       <div>
//         <Typography size="h3" as="h3">
//           Reception
//         </Typography>
//         <Typography size="lg" className="text-desc-color">
//           Manage your schedules, services, and absences from this space
//         </Typography>
//       </div>
//       <div className="py-6">
//         <Typography size="h5" as="h5">Weekly summary</Typography>
//         <div className="flex max-md:flex-col gap-5 pt-3">
//             {receptionCards.map((d,i)=>(
//                 <div key={i} className="flex flex-col gap-2 shadow items-center justify-center bg-white rounded-xl w-full h-[150px] max-md:w-full">
//                     <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary-color">
//                       <Icon className="text-white" icon="uil:calender" width="24" height="24" />
//                     </div>
//                     <div className="flex items-center flex-col">
//                    <Typography size='h6' className="font-bold">{d.title}</Typography>
//                   <Typography className="font-semibold text-[16px] text-[#1F2A37]">{d.desc}</Typography>
//                     </div>
//                 </div>
//             ))}
//         </div>
//       </div>
//       <div className="space-y-4">
//         <Typography size="h5" as="h5">Quick Access</Typography>
//         {quickCard.map((q,i)=>(
//             <div key={i} className="bg-white rounded-xl flex justify-between items-center px-3 py-5">
//                 <div className="flex gap-3 items-center">
//                   <Icon className="text-primary-color" icon={q.icon} width="24" height="24" />
//               <div className="space-y-1">
//                 <Typography className="font-bold text-[#1F2A37]">{q.title}</Typography>
//                 <Typography className="text-desc-color">{q.desc}</Typography>
//               </div>
//                 </div>
//                <div className="bg-primary-color shadow rounded-lg w-[80px] py-1 flex items-center justify-center">
//                 <button className="text-white">Open</button>
//                </div>
//             </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Reception;
// "use client";
// import { Button } from "@/components/shared/button";
// import { Typography } from "@/components/shared/typography";
// import { quickCard } from "@/data";
// import { Icon } from "@iconify/react";
// import { useRouter } from "next/navigation";
// import React from "react";

// const Reception = () => {
//     const router = useRouter();
//   const receptionCards = [
//     { title: "22", desc: "Available" },
//     { title: "22", desc: "Slots Booked" },
//     { title: "2", desc: "Planned Absences" },
//   ];

//   return (
//     <div>
//       {/* Header */}
//       <div>
//         <Typography size="h3" as="h3">
//           Reception
//         </Typography>
//         <Typography size="lg" className="text-desc-color">
//           Manage your schedules, services, and absences from this space
//         </Typography>
//       </div>

//       {/* Weekly Summary */}
//       <div className="py-6">
//         <Typography size="h5" as="h5">
//           Weekly summary
//         </Typography>

//         <div className="flex max-md:flex-col gap-5 pt-5">
//           {receptionCards.map((d, i) => (
//             <div
//               key={i}
//               className="group flex flex-col gap-2 shadow items-center justify-center bg-white rounded-xl w-full h-[150px]
//                          transition-all duration-300 ease-out
//                          hover:-translate-y-2 hover:shadow-lg"
//             >
//               <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary-color">
//                 <Icon
//                   className="text-white"
//                   icon="uil:calender"
//                   width="24"
//                   height="24"
//                 />
//               </div>

//               <div className="flex items-center flex-col">
//                 <Typography size="h6" className="font-bold">
//                   {d.title}
//                 </Typography>
//                 <Typography className="font-semibold text-[16px] text-[#1F2A37]">
//                   {d.desc}
//                 </Typography>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Quick Access */}
//       <div className="space-y-4">
//         <Typography size="h5" as="h5">
//           Quick Access
//         </Typography>

//         {quickCard.map((q, i) => (
//           <div
//             key={i}
//             className="group bg-white rounded-xl shadow flex justify-between items-center px-3 py-5
//                        transition-all duration-300 hover:shadow-lg"
//           >
//             <div className="flex gap-3 items-center">
//               <Icon
//                 className="text-primary-color"
//                 icon={q.icon}
//                 width="24"
//                 height="24"
//               />

//               <div className="space-y-1">
//                 <Typography className="font-bold text-[#1F2A37]">
//                   {q.title}
//                 </Typography>
//                 <Typography className="text-desc-color">
//                   {q.desc}
//                 </Typography>
//               </div>
//             </div>

//             {/* Open Button (Hover Only) */}
//             <div
//               className="opacity-0 translate-x-2
//                          group-hover:opacity-100 group-hover:translate-x-0
//                          transition-all duration-300"
//             >
//               <button className="bg-primary-color shadow rounded-lg w-[80px] py-1 text-white" onClick={()=>router.push('/reception/calender')}>
//                 Open
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Reception;
"use client";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { quickCard } from "@/data";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import React from "react";

const Reception = () => {
  const router = useRouter();
  const receptionCards = [
    { title: "22", desc: "Available", heading: " slots visible to patients" },
    { title: "22", desc: "Slots Booked", heading: " upcoming consultations" },
    { title: "2", desc: "Planned Absences", heading: "Impacts slots" },
    { title: "2", desc: "Active Reasons", heading: " active reasons" },
  ];

  // Naya Data Sections ke liye
  const configIssues = [
    {
      title: "No Active Reason",
      desc: "Define when you are available to receive patients",
    },
    {
      title: "Active Reasons Without Associated Slots",
      desc: "Define when you are available to receive patients",
    },
    {
      title: "Open Slots Without Visible Reason",
      desc: "Define when you are available to receive patients",
    },
    {
      title: "Synchronization Inactive",
      desc: "Define when you are available to receive patients",
    },
    {
      title: "Future Absence Not Confirmed",
      desc: "Define when you are available to receive patients",
    },
  ];

  const alerts = [
    {
      title: "Active Service Without Slot",
      desc: "Define when you are available to receive patients",
    },
    {
      title: "Overlapping Slots",
      desc: "Define when you are available to receive patients",
    },
    {
      title: "Absence Defined But Slots Still Open",
      desc: "Define when you are available to receive patients",
    },
    {
      title: "External Calendar Not Synchronized For X Days",
      desc: "Define when you are available to receive patients",
    },
  ];

  // Helper component for Issues/Alerts Rows
  const IssueRow = ({ title, desc }: { title: string; desc: string }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 group cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors">
      <div className="flex gap-3 items-start">
        <Icon icon="mdi:alert" className="text-[#F26333] mt-1" width="20" />
        <div>
          <Typography className="font-bold text-[#374151] leading-tight">
            {title}
          </Typography>
          <Typography size="sm" className="text-gray-400 mt-1">
            {desc}
          </Typography>
        </div>
      </div>
      <div className="flex items-center gap-1 text-primary-color text-xs font-bold whitespace-nowrap">
        View <Icon icon="mdi:chevron-right" width="16" />
      </div>
    </div>
  );

  return (
    <div className="pb-5">
      {/* <div>
        <Typography size="h3" as="h3">
          Reception
        </Typography>
        <Typography size="lg" className="text-desc-color">
          Manage your schedules, services, and absences from this space
        </Typography>
      </div> */}

      {/* HEADER SECTION WITH COMPLETE CONFIGURATION BUTTON */}
      <div className="flex justify-between items-start">
        <div>
          <Typography size="h3" as="h3" className="font-bold text-gray-800">
            Reception
          </Typography>
          <Typography size="lg" className="text-desc-color">
            Manage Your Schedules, Services, And Absences From This Space
          </Typography>
          {/* Last availability update alert */}
          <div className="flex items-center py-3 gap-2 mt-2 text-[#F26333]">
            {/* <Icon icon="mdi:alert-circle" width="18" /> */}
            {/* <Typography className="text-sm font-semibold">"Last availability update: today at 09:45"</Typography> */}
            <button className="text-primary-color text-sm underline font-bold ml-2">
              View issues
            </button>
          </div>
        </div>
        <button className="bg-[#27AE60] text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-green-600 transition-colors">
          Complete configuration
        </button>
      </div>

      {/* SYNCHRONIZATION BAR */}
      <div className="bg-white border border-gray-100 rounded-xl p-2 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Icon
              icon="mdi:calendar-check"
              className="text-primary-color"
              width="24"
            />
          </div>
          <Typography className="font-bold text-gray-700">
            Synchronized : Internal calendar
          </Typography>
        </div>
        <button
          onClick={() => router.push("/reception/calendar-sync")}
          className="text-primary-color text-xs font-bold underline"
        >
          Synchronization details
        </button>
      </div>

      {/* Weekly Summary */}
      <div className="py-6">
        <Typography size="h5" as="h5">
          Weekly summary
        </Typography>

        <div className="flex max-md:flex-col gap-5 pt-5">
          {receptionCards.map((d, i) => (
            <div
              key={i}
              className="group flex flex-col gap-2 shadow items-center justify-center bg-white rounded-xl w-full h-[150px]
                         transition-all duration-300 ease-out
                         hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-primary-color">
                <Icon
                  className="text-white"
                  icon="uil:calender"
                  width="24"
                  height="24"
                />
              </div>

              <div
                className="flex items-center flex-col cursor-pointer"
                onClick={() => router.push("/reception/calendar")} // <-- title click navigates
              >
                <Typography size="h6" className="font-bold">
                  {d.desc}
                </Typography>
                <Typography className="font-medium text-[16px] text-[#1F2A37]">
                  {d.title} {d.heading}
                </Typography>
              </div>

              {/* Show Open button only for the Calendar card */}
              {/* {i === 0 && (
                <button
                  className="bg-primary-color shadow rounded-lg w-[80px] py-1 text-white mt-2"
                  onClick={() => router.push("/reception/calendar")}
                >
                  Open
                </button>
              )} */}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="space-y-4">
        <Typography size="h5" as="h5">
          Quick Access
        </Typography>

        {quickCard.map((q, i) => (
          <div
            key={i}
            className="group bg-white rounded-xl shadow flex justify-between items-center px-3 py-6
                       transition-all duration-300 hover:shadow-lg"
          >
            <div
              className="flex gap-3 items-start cursor-pointer"
              onClick={() => router.push(q.link)}
            >
              <Icon
                className="text-primary-color"
                icon={q.icon}
                width="38"
                height="38"
              />

              <div className="space-y-1">
                <Typography size="lg" className="font-bold text-[#1F2A37]">
                  {q.title}
                </Typography>
                <Typography className="text-desc-color">{q.desc}</Typography>
                <Typography className="font-bold text-[#F29F55]">
                  {q.dsc}
                </Typography>
                <Typography className="font-bold text-primary-color underline">
                  {q.dsc1}
                </Typography>
              </div>
            </div>

            {/* Optional: If you still want Open button on hover, keep this div
                Otherwise, can remove completely */}
          </div>
        ))}
      </div>

      {/* CONFIGURATION ISSUES */}
      <section className="space-y-4 mt-3">
        <Typography size="h5" as="h5">
          Configuration Issues
        </Typography>
        <div className="bg-white rounded-xl shadow p-4">
          {configIssues.map((issue, index) => (
            <IssueRow key={index} title={issue.title} desc={issue.desc} />
          ))}
        </div>
      </section>

      {/* ALERT SECTION */}
      <section className="space-y-4 mt-3">
        <Typography size="h5" as="h5">
          Alert
        </Typography>
        <div className="bg-white rounded-xl shadow p-4">
          {alerts.map((alert, index) => (
            <IssueRow key={index} title={alert.title} desc={alert.desc} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Reception;
