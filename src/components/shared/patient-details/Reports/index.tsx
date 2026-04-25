// import React from "react";
// import { Typography } from "../../typography";
// import { Button } from "../../button";

// const Reports = () => {
//     const reports = [
//         {
//             title:"Blood Test",
//             date: 'Jan 2025'
//         }
//     ]
//   return (
//     <div className="bg-white rounded-xl px-4 py-5">
//       <div className="flex justify-between">
//         <Typography size="h3" as="h3" className="font-bold">
//           Medical Reports
//         </Typography>
//         <div className="flex items-center gap-3 relative">
//           {/* Export Button */}
//           <Button
//             type="button"
//             className="flex rounded-xl items-center gap-2 px-4 py-2.5 bg-primary-color text-white"
//           >
//             Add New Reports
//           </Button>
//         </div>
//       </div>
//       <div>
//         {}
//       </div>
//     </div>
//   );
// };

// export default Reports;
// "use client";
// import React from "react";
// import { Typography } from "../../typography";
// import { Button } from "../../button";
// import { Icon } from "@iconify/react";

// const Reports = () => {
//   const reports = [
//     {
//       id: 1,
//       title: "Blood Test",
//       date: "Jan 2025",
//       type: "blood",
//     },
//     {
//       id: 2,
//       title: "Chest X-ray",
//       date: "Jan 2025",
//       type: "xray",
//     },
//     {
//       id: 3,
//       title: "Blood Test",
//       date: "Jan 2025",
//       type: "blood",
//     },
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
//     <div className="bg-white rounded-xl px-4 py-5">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <Typography size="h3" as="h3" className="font-bold">
//           Medical Reports
//         </Typography>

//         <Button
//           type="button"
//           className="rounded-lg px-4 py-2 bg-primary-color text-white text-sm"
//         >
//           Add New Reports
//         </Button>
//       </div>

//       {/* Reports List */}
//       <div className="border rounded-lg divide-y">
//         {reports.map((report) => (
//           <div
//             key={report.id}
//             className="flex items-center justify-between px-4 py-3"
//           >
//             {/* Left */}
//             <div className="flex items-start gap-3">
//               <Icon
//                 icon={getReportIcon(report.type)}
//                 className="text-primary-color text-xl mt-1"
//               />

//               <div className="space-y-1">
//                 <p className="text font-medium text-gray-800">
//                   {report.title}
//                 </p>
//                 <div className="flex gap-1 items-center">
//                 <Icon className="text-secondary-color" icon="mdi:tick" width="24" height="24" />
//                 <p className="text-xs text-gray-500">{report.date}</p>
//                 </div>

//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-3">
//               <button className="text-blue hover:text-blue">
//                 <Icon icon="mdi:eye-outline" className="text-lg" />
//               </button>

//               <button className="text-red hover:text-red">
//                 <Icon icon="mdi:delete-outline" className="text-lg" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Reports;
// "use client";
// import React from "react";
// import { Typography } from "../../typography";
// import { Button } from "../../button";
// import { Icon } from "@iconify/react";

// const Reports = () => {
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
//     <div className="bg-white rounded-xl px-4 py-5">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <Typography size="h3" as="h3" className="font-bold">
//           Medical Reports
//         </Typography>

//         <Button className="rounded-lg px-4 py-2 bg-primary-color text-white">
//           Add New Reports
//         </Button>
//       </div>

//       {/* Reports List */}
//       <div className="border rounded-lg divide-y">
//         {reports.map((report) => (
//           <div
//             key={report.id}
//             className="flex items-center justify-between px-4 py-4"
//           >
//             {/* Left */}
//             <div className="flex gap-3 items-center">
//               {/* ICON COLUMN */}
//               <div className="flex flex-col items-center">
//                 <Icon
//                   icon={getReportIcon(report.type)}
//                   className="text-primary-color"
//                 />

//                 {/* Tick under icon */}
//                 <Icon
//                   icon="mdi:check"
//                   className="text-green-500 text mt-[12px]"
//                 />
//               </div>

//               {/* TEXT */}
//               <div className="space-y-1 flex flex-col">
//                 <p className="text font-bold ">
//                   {report.title}
//                 </p>

//                 {/* Date + Tick */}
//                 <div className="flex items-center gap-1 mt-1">
//                   {/* <Icon
//                     icon="mdi:check-circle"
//                     className="text-green-500 text-xs"
//                   /> */}
//                   <p className="text text-gray-500">{report.date}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-3">
//               <button className="text-primary-color hover:text-primary-color">
//                 <Icon icon="mdi:eye" className="text-[24px]" />
//               </button>

//               <button className="text-red hover:text-red">
//                 <Icon icon="mdi:delete-outline" className="text-[24px]" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Reports;
// "use client";
// import React, { useState } from "react";
// import { Typography } from "../../typography";
// import { Button } from "../../button";
// import { Icon } from "@iconify/react";
// import AddReportModal from "@/components/ui/modals/reports-model";

// const Reports = () => {
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
//           <Typography size="h3" as="h3" className="font-bold">
//             Medical Reports
//           </Typography>

//           <Button
//             className="rounded-lg px-4 py-2 bg-primary-color text-white"
//             onClick={() => setIsModalOpen(true)} // ✅ modal open
//           >
//             Add New Reports
//           </Button>
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
//                   <p className="text-gray-500 text-sm">{report.date}</p>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex items-center gap-3">
//                 <button className="text-primary-color">
//                   <Icon icon="mdi:eye" className="text-[24px]" />
//                 </button>

//                 <button className="text-red">
//                   <Icon icon="mdi:delete-outline" className="text-[24px]" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🔥 Add Report Modal */}
//       <AddReportModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={(type, file) => {
//           console.log("Report Type:", type);
//           console.log("File:", file);
//           // yahan API call ya state update kar sakte ho
//         }}
//       />
//     </>
//   );
// };

// export default Reports;
// "use client";
// import React, { useState } from "react";
// import { Typography } from "../../typography";
// import { Button } from "../../button";
// import { Icon } from "@iconify/react";
// import AddReportModal from "@/components/ui/modals/reports-model";

// interface ReportType {
//   id: number;
//   title: string;
//   date: string;
//   type: string;
//   file?: File | null;
//   isOpen?: boolean;
// }

// const Reports = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [reports, setReports] = useState<ReportType[]>([
//     {
//       id: 1,
//       title: "Blood Test",
//       date: "Jan 2025",
//       type: "blood",
//       isOpen: false,
//     },
//   ]);

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

//   const toggleView = (id: number) => {
//     setReports((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? { ...item, isOpen: !item.isOpen }
//           : { ...item, isOpen: false }
//       )
//     );
//   };

//   return (
//     <>
//       <div className="bg-white rounded-xl px-4 py-5">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <Typography size="h3" as="h3" className="font-bold">
//             Medical Reports
//           </Typography>

//           <Button
//             className="rounded-lg px-4 py-2 bg-primary-color text-white"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Add New Reports
//           </Button>
//         </div>

//         {/* Reports List */}
//         <div className="border rounded-lg divide-y">
//           {reports.map((report) => (
//             <div key={report.id}>
//               {/* ROW */}
//               <div className="flex items-center justify-between px-4 py-4">
//                 {/* Left */}
//                 <div className="flex gap-3 items-center">
//                   <div className="flex flex-col items-center">
//                     <Icon
//                       icon={getReportIcon(report.type)}
//                       className="text-primary-color text-xl"
//                     />
//                     <Icon
//                       icon="mdi:check"
//                       className="text-green-500 mt-2"
//                     />
//                   </div>

//                   <div>
//                     <p className="font-bold">{report.title}</p>
//                     <p className="text-sm text-gray-500">{report.date}</p>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <button
//                   onClick={() => toggleView(report.id)}
//                   className="text-primary-color"
//                 >
//                   <Icon
//                     icon={report.isOpen ? "mdi:eye-off" : "mdi:eye"}
//                     className="text-[24px]"
//                   />
//                 </button>
//               </div>

//               {/* 🔽 FAQ / Accordion Content */}
//               {report.isOpen && (
//                 <div className="bg-gray-50 px-6 py-4 border-t">
//                   <p className="text-sm font-semibold mb-2">
//                     Report Details
//                   </p>

//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <Icon icon="mdi:file-document-outline" />
//                     <span>
//                       {report.file
//                         ? report.file.name
//                         : "No file attached"}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add Report Modal */}
//       <AddReportModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={(type, file) => {
//           setReports((prev) => [
//             ...prev,
//             {
//               id: Date.now(),
//               title: type === "blood" ? "Blood Test" : "X-ray",
//               date: "Jan 2025",
//               type,
//               file,
//               isOpen: false,
//             },
//           ]);
//         }}
//       />
//     </>
//   );
// };

// export default Reports;

// "use client";

// import React, { useState } from "react";
// import { Typography } from "../../typography";
// import { Button } from "../../button";
// import { Icon } from "@iconify/react";
// import AddReportModal from "@/components/ui/modals/reports-model";

// const Reports = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<"incoming" | "all">("all");

//   const reports = [
//     { id: 1, type: "Blood test", source: "Patient", date: "12/08/2023", status: "Reviewed" },
//     { id: 2, type: "Blood test", source: "Facility", date: "12/08/2023", status: "Attached" },
//     { id: 3, type: "Blood test", source: "Lab", date: "12/08/2023", status: "Reviewed" },
//     { id: 4, type: "Blood test", source: "Facility", date: "12/08/2023", status: "Unreviewed" },
//   ];

//   const statusColor = (status: string) => {
//     if (status === "Reviewed") return "text-primary-color";
//     if (status === "Attached") return "text-green-500";
//     if (status === "Unreviewed") return "text-red";
//     return "text-desc-color";
//   };

//   return (
//     <>
//       <div className="bg-[#F6F7FB] rounded-xl p-6">
//         {/* Tabs + Button */}
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex gap-6 text-sm font-medium">
//             <button
//               onClick={() => setActiveTab("incoming")}
//               className={`pb-2 ${
//                 activeTab === "incoming"
//                   ? "text-primary-color border-b-2 border-primary-color"
//                   : "text-desc-color"
//               }`}
//             >
//               Incoming (New)
//             </button>

//             <button
//               onClick={() => setActiveTab("all")}
//               className={`pb-2 ${
//                 activeTab === "all"
//                   ? "text-primary-color border-b-2 border-primary-color"
//                   : "text-desc-color"
//               }`}
//             >
//               All reports
//             </button>
//           </div>

//           <Button
//             className="bg-primary-color text-white rounded-lg px-4 py-2"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Add New Reports
//           </Button>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-xl overflow-hidden">
//           <table className="w-full text-sm">
//             <thead className="border-b">
//               <tr className="text-left text-desc-color">
//                 <th className="px-6 py-4">Type</th>
//                 <th className="px-6 py-4">Source</th>
//                 <th className="px-6 py-4">Date</th>
//                 <th className="px-6 py-4">Status</th>
//                 <th className="px-6 py-4 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {reports.map((r) => (
//                 <tr key={r.id} className="border-b last:border-none">
//                   <td className="px-6 py-4">{r.type}</td>
//                   <td className="px-6 py-4">{r.source}</td>
//                   <td className="px-6 py-4">{r.date}</td>
//                   <td className={`px-6 py-4 font-medium ${statusColor(r.status)}`}>
//                     {r.status}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex justify-center gap-3 text-primary-color">
//                       <Icon icon="material-symbols:visibility-outline" width="18" />
//                       <Icon icon="material-symbols:download-rounded" width="18" />
//                       <Icon icon="material-symbols:delete-outline" width="18" />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Footer */}
//           <div className="flex justify-between items-center px-6 py-4 text-xs text-desc-color border-t">
//             <div className="flex items-center gap-2">
//               <button className="p-1 rounded border">
//                 <Icon icon="mdi:chevron-left" />
//               </button>
//               <span className="text-primary-color font-medium">1</span>
//               <span>2</span>
//               <span>3</span>
//               <button className="p-1 rounded border">
//                 <Icon icon="mdi:chevron-right" />
//               </button>
//               <span className="ml-2">1-15 of 995</span>
//             </div>

//             <div className="flex items-center gap-2">
//               Rows per page
//               <select className="border rounded px-2 py-1">
//                 <option>10</option>
//                 <option>20</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <AddReportModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={(type, file) => {
//           console.log(type, file);
//         }}
//       />
//     </>
//   );
// };

// export default Reports;

"use client";

import React, { useState } from "react";
import { Typography } from "../../typography";
import { Button } from "../../button";
import { Icon } from "@iconify/react";
import AddReportModal from "@/components/ui/modals/reports-model";
import DataTable from "@/components/shared/data-table";
import { reportsTable } from "@/data";

const Reports = () => {
  type ReportRow = {
    id: number;
    type: string;
    source: string;
    date: string;
    status: "Reviewed" | "Attached" | "Unreviewed";
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"incoming" | "all">("all");

  return (
    <>
      <div className="py-4">
        {/* Tabs + Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab("incoming")}
              className={`pb-2 ${
                activeTab === "incoming"
                  ? "text-primary-color border-b-2 border-primary-color"
                  : "text-desc-color"
              }`}
            >
              Incoming (New)
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`pb-2 ${
                activeTab === "all"
                  ? "text-primary-color border-b-2 border-primary-color"
                  : "text-desc-color"
              }`}
            >
              All reports
            </button>
          </div>

          <Button
            className="bg-primary-color text-white rounded-lg px-4 py-2"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Reports
          </Button>
        </div>

        {/* DataTable */}
        <div className="bg-white rounded-xl">
          <DataTable
            ColumnsData={reportsTable.ColumnsData}
            tableRows={reportsTable.rowsData}
            roundedHeader={true}
            paginate={true}
            TableBodyRow={({ id, type, source, date, status }: ReportRow) => (
              <tr key={id} className="hover:bg-white transition">
                {/* Type */}
                <td className="px-6 py-4 text-sm text-desc-color">{type}</td>

                {/* Source */}
                <td className="px-6 py-4 text-sm text-desc-color">{source}</td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-desc-color">{date}</td>

                {/* Status */}
                <td
                  className={`px-6 py-4 text-sm font-medium ${
                    status === "Reviewed"
                      ? "text-primary-color"
                      : status === "Attached"
                        ? "text-secondary-color"
                        : "text-red"
                  }`}
                >
                  {status}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex gap-3 text-primary-color">
                    <Icon
                      icon="mdi:eye"
                      width="18"
                      className="cursor-pointer"
                    />
                    <Icon
                      icon="tabler:report-analytics"
                      width="18"
                      className="cursor-pointer"
                    />
                    <Icon
                      icon="material-symbols:download-rounded"
                      width="18"
                      className="cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            )}
          />
        </div>
      </div>

      {/* Modal */}
      <AddReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(type, file) => {
          console.log(type, file);
        }}
      />
    </>
  );
};

export default Reports;
