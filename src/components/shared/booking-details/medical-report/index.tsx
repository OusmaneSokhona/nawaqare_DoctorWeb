// "use client";
// import React, { useState } from "react";
// import { Typography } from "../../typography";
// import { Button } from "../../button";
// import { Icon } from "@iconify/react";
// import AddReportModal from "@/components/ui/modals/reports-model";

// const MedicalReports = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const reports = [
//     { id: 1, title: "Blood Test", date: "Jan 2025", type: "blood" },
//     { id: 2, title: "Chest X-ray", date: "Jan 2025", type: "xray" },
//     { id: 3, title: "Blood Test", date: "Jan 2025", type: "blood" },
//   ];

//   const getReportIcon = (type: string) => {
//     switch (type) {
//       case "blood":
//         return "mdi:test-tube";
//       case "xray":
//         return "mdi:x-ray";
//       default:
//         return "mdi:file-document-outline";
//     }
//   };

//   return (
//     <>
//       <div className="bg-white rounded-xl px-4 py-5">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <Typography size="h5" as="h5" className="font-bold">
//             Medical Reports
//           </Typography>

//           {/* <Button
//             className="rounded-lg px-4 py-2 bg-primary-color text-white"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Add New Reports
//           </Button> */}
//         </div>

//         {/* Reports List */}
//         <div className="border rounded-lg divide-y">
//           {reports.map((report) => (
//             <div
//               key={report.id}
//               className="flex items-center justify-between px-4 py-4"
//             >
//               {/* Left */}
//               <div className="flex gap-3 items-center">
//                 {/* Icon Column */}
//                 <div className="flex flex-col items-center">
//                   <Icon
//                     icon={getReportIcon(report.type)}
//                     className="text-primary-color text-xl"
//                   />
//                   <Icon
//                     icon="mdi:check"
//                     className="text-green-500 mt-2"
//                   />
//                 </div>

//                 {/* Text */}
//                 <div className="flex flex-col space-y-1">
//                   <p className="font-bold">{report.title}</p>
//                   <p className="text-gray-500 ">{report.date}</p>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex items-center gap-3">
//                 <button className="text-primary-color">
//                   <Icon icon="mdi:eye" className="text-[24px]" />
//                 </button>

//                 {/* <button className="text-red">
//                   <Icon icon="mdi:delete-outline" className="text-[24px]" />
//                 </button> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🔥 Add Report Modal */}
//       {/* <AddReportModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={(type, file) => {
//           console.log("Report Type:", type);
//           console.log("File:", file);
//           // yahan API call ya state update kar sakte ho
//         }}
//       /> */}
//     </>
//   );
// };

// export default MedicalReports;

"use client";

import React from "react";
import { Typography } from "../../typography";
import { Icon } from "@iconify/react";

const reports = [
  {
    id: 1,
    title: "Blood Test Report",
    date: "20/Sep/2025",
    source: "Source (patient)",
    createdBy: "Created by Doctor",
    status: "verified",
  },
  {
    id: 2,
    title: "Blood Test Report",
    date: "20/Sep/2025",
    source: "Source (patient)",
    createdBy: "Created by Doctor",
    status: "verified",
  },
  {
    id: 3,
    title: "Blood Test Report",
    date: "20/Sep/2025",
    source: "Source (patient)",
    createdBy: "Created by Doctor",
    status: "verified",
  },
];

const MedicalReports = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      {/* Header */}
      <Typography size="h5" className="font-bold mb-4">
        Medical Reports
      </Typography>

      {/* List */}
      <div className="space-y-4 border rounded-lg p-4 ">
        {reports.map((report) => (
          <div key={report.id} className="flex justify-between items-center">
            {/* LEFT */}
            <div className="flex gap-4 items-start">
              {/* File Icon */}
              <div className="bg-[#EEF4FF] p-2 rounded-md">
                <Icon
                  icon="mdi:file-document-outline"
                  className="text-primary-color"
                  width={22}
                />
              </div>

              {/* Info */}
              <div className="space-y-0.5">
                <Typography className="font-semibold">
                  {report.title}
                </Typography>

                <Typography className="text-xs text-desc-color">
                  {report.date}
                </Typography>

                <Typography className="text-xs text-desc-color">
                  {report.source}
                </Typography>

                <Typography className="text-xs text-desc-color">
                  {report.createdBy}
                </Typography>

                {/* Status */}
                <span className="inline-block mt-1 px-3 py-0.5 text-xs rounded-full bg-green-500 text-white">
                  verified
                </span>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              <Icon
                icon="mdi:eye-outline"
                className="text-primary-color cursor-pointer"
                width={18}
              />
              <Icon
                icon="mdi:download-outline"
                className="text-primary-color cursor-pointer"
                width={18}
              />
              <Icon
                icon="mdi:delete-outline"
                className="text-red cursor-pointer"
                width={18}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalReports;
