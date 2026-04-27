// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import DataTable from "@/components/shared/data-table";
// import { Typography } from "@/components/shared/typography";
// import { Icon } from "@iconify/react";
// import SearchInput from "@/components/shared/search-bar";
// import StatCard from "@/components/shared/prescription/StatCard";

// /* =====================
//    TABLE CONFIG
// ===================== */
// const columns = [
//   { id: "check", label: "", accessor: "check" },
//   { id: "service", label: "Services", accessor: "service" },
//   { id: "mode", label: "Mode", accessor: "mode" },
//   { id: "duration", label: "Duration", accessor: "duration" },
//   { id: "price", label: "Price", accessor: "price" },
//   { id: "status", label: "Status", accessor: "status" },
//   { id: "action", label: "Action", accessor: "action" },
//   { id: "action", label: "Action", accessor: "action" },
// ];

// const rows = [
//   {
//     id: 1,
//     service: "Initial Consultation",
//     mode: "Remote consultation",
//     duration: "30 min",
//     price: "30$",
//     status: "Active",
//   },
//   {
//     id: 2,
//     service: "Tests",
//     mode: "In-person consultation",
//     duration: "30 min",
//     price: "30$",
//     status: "Inactive",
//   },
// ];

// type StatCardProps = {
//   icon: string;
//   value: string;
//   label: string;
// };

// // export const StatCard = ({ icon, value, label }: StatCardProps) => {
// //   return (
// //     <div className="flex flex-col items-center gap-3 bg-[#EEF0FA] rounded-xl px-5 py-4 min-w-[200px]">
// //       {/* ICON */}
// //       <div className="w-8 h-8 rounded-full bg-primary-color flex items-center justify-center">
// //         <Icon icon={icon} className="text-white" width={18} />
// //       </div>

// //       {/* TEXT */}
// //       <div className="text-sm text-gray-700">
// //         <span className="font-medium">{label}: </span>
// //         <span className="font-semibold">{value}</span>
// //       </div>
// //     </div>
// //   );
// // };

// /* =====================
//    COMPONENT
// ===================== */
// export default function MyServices() {
//   const router = useRouter();
//   const [showInactive, setShowInactive] = useState(true);
//   const [search, setSearch] = useState("");

//   return (
//     <div className="space-y-6 p-3">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <Typography size="h4" className="font-bold">
//           My Services
//         </Typography>

//         <button
//           onClick={() => router.push("/profile/my-service/add")}
//           className="bg-primary-color text-white px-4 py-2 rounded-lg text-sm"
//         >
//           Add New Service
//         </button>
//       </div>

//       {/* STATS */}
//       <div className="flex gap-4 flex-wrap">
//         <StatCard icon="mdi:check" label="Active services" value="04" />

//         <StatCard icon="mdi:minus-circle-outline" label="Total" value="06" />
//       </div>

//       {/* FILTER BAR */}
//       <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
//         <div className="flex-1">
//           <SearchInput placeholder="Search service name" />
//         </div>

//         <select className="border rounded-lg px-3 py-2 text-sm bg-gray-50">
//           <option>In-person</option>
//           <option>Remote</option>
//           <option>Home Visit</option>
//         </select>

//         <label className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-lg whitespace-nowrap">
//           Show inactive
//           <input
//             type="checkbox"
//             checked={showInactive}
//             onChange={() => setShowInactive(!showInactive)}
//             className="accent-primary-color"
//           />
//         </label>
//       </div>

//       {/* TABLE */}
//       {/* <div className="bg-white overflow-x-auto">
//         <div className="overflow-x-auto">

//         </div>
//       </div> */}

//       <DataTable
//         ColumnsData={columns}
//         tableRows={rows}
//         roundedHeader
//         paginate
//         TableBodyRow={({ id, service, mode, duration, price, status }: any) => (
//           <tr
//             key={id}
//             className={`border-b ${
//               status === "Inactive" ? "text-gray-400" : ""
//             }`}
//           >
//             <td className="px-4 py-3">
//               <input type="checkbox" />
//             </td>

//             <td className="px-4 py-3 whitespace-nowrap">{service}</td>
//             <td className="px-4 py-3 whitespace-nowrap">{mode}</td>
//             <td className="px-4 py-3">{duration}</td>
//             <td className="px-4 py-3">{price}</td>

//             <td className="px-4 py-3">
//               <span
//                 className={`text-xs ${
//                   status === "Active" ? "text-green-600" : "text-gray-400"
//                 }`}
//               >
//                 {status}
//               </span>
//             </td>

//             <td className="px-4 py-3 flex gap-3 items-center justify-end whitespace-nowrap">
//               <span className="text-xs text-gray-500 cursor-pointer">
//                 {status === "Active" ? "Deactivate ▼" : "Activate ▼"}
//               </span>

//               <Icon
//                 icon="mdi:pencil-outline"
//                 className="cursor-pointer text-primary-color"
//                 onClick={() => router.push("/profile/my-service/edit")}
//               />

//               <Icon
//                 icon="mdi:content-copy"
//                 className="cursor-pointer text-primary-color"
//               />
//             </td>
//           </tr>
//         )}
//       />

//       {/* GDPR FOOTER */}
//       <div className="bg-orange-50 border border-orange-200 text-xs px-4 py-3 rounded-lg flex gap-2 items-center">
//         <Icon icon="mdi:alert-circle" className="text-orange-500" />
//         Data protected under GDPR & HDS standards. Access logged for compliance
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";
import SearchInput from "@/components/shared/search-bar";
import StatCard from "@/components/shared/prescription/StatCard";

const columns = [
  { id: "check", label: "", accessor: "check" },
  { id: "service", label: "Services", accessor: "service" },
  { id: "mode", label: "Mode", accessor: "mode" },
  { id: "duration", label: "Duration", accessor: "duration" },
  { id: "price", label: "Price", accessor: "price" },
  { id: "status", label: "Status", accessor: "status" },
  { id: "action", label: "Action", accessor: "action" },
];

const rows = [
  {
    id: 1,
    service: "Initial Consultation",
    mode: "Remote consultation",
    duration: "30 min",
    price: "30$",
    status: "Active",
  },
  {
    id: 2,
    service: "Tests",
    mode: "In-person consultation",
    duration: "30 min",
    price: "30$",
    status: "Inactive",
  },
];

export default function MyServices() {
  const router = useRouter();
  const [showInactive, setShowInactive] = useState(true);

  return (
    <div className="space-y-6 w-full md:w-[50vw] xl:w-[50vw] 2xl:w-[60vw]">
      {/* HEADER */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <Typography size="h4" className="font-bold">
          My Services
        </Typography>

        <button
          onClick={() => router.push("/profile/my-service/add")}
          className="bg-primary-color text-white px-4 py-2 rounded-lg text-sm"
        >
          Add New Service
        </button>
      </div>

      {/* STATS */}
      <div className="">
        <div className="flex gap-4 flex-wrap">
          <StatCard icon="mdi:check" label="Active services" value="04" />
          <StatCard icon="mdi:minus-circle-outline" label="Total" value="06" />
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <SearchInput placeholder="Search service name" />
        </div>

        <select className="border rounded-lg px-3 py-2 text-sm bg-gray-50 min-w-[150px]">
          <option>In-person</option>
          <option>Remote</option>
          <option>Home Visit</option>
        </select>

        <label className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-lg whitespace-nowrap">
          Show inactive
          <input
            type="checkbox"
            checked={showInactive}
            onChange={() => setShowInactive(!showInactive)}
            className="accent-primary-color"
          />
        </label>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <DataTable
          ColumnsData={columns}
          tableRows={rows}
          roundedHeader
          paginate
          TableBodyRow={({
            id,
            service,
            mode,
            duration,
            price,
            status,
          }: any) => (
            <tr
              key={id}
              className={`border-b ${status === "Inactive" ? "text-gray-400" : ""}`}
            >
              <td className="px-4 py-3">
                <input type="checkbox" />
              </td>

              <td className="px-4 py-3 whitespace-nowrap">{service}</td>
              <td className="px-4 py-3 whitespace-nowrap">{mode}</td>
              <td className="px-4 py-3">{duration}</td>
              <td className="px-4 py-3">{price}</td>

              <td className="px-4 py-3">
                <span
                  className={`text-xs ${
                    status === "Active" ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {status}
                </span>
              </td>

              <td className="px-4 py-3 flex gap-3 items-center justify-end whitespace-nowrap">
                <span className="text-xs text-gray-500 cursor-pointer">
                  {status === "Active" ? "Deactivate ▼" : "Activate ▼"}
                </span>

                <Icon
                  icon="mdi:pencil-outline"
                  className="cursor-pointer text-primary-color"
                  onClick={() => router.push("/profile/my-service/edit")}
                />

                <Icon
                  icon="mdi:content-copy"
                  className="cursor-pointer text-primary-color"
                />
              </td>
            </tr>
          )}
        />
      </div>

      {/* GDPR FOOTER */}
      <div className="bg-orange-50 border border-orange-200 text-xs px-4 py-3 rounded-lg flex gap-2 items-center">
        <Icon icon="mdi:alert-circle" className="text-orange-500" />
        Data protected under GDPR & HDS standards. Access logged for compliance
      </div>
    </div>
  );
}
