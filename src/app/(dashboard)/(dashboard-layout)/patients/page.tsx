// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { AllPatients } from "@/types/dashboard";
// import Container from "@/components/shared/container";
// import DataTable from "@/components/shared/data-table";
// import DateRangeDropdown from "@/components/shared/date-range-dropdown";
// import Iconify from "@/components/shared/iconify";
// import InputDropdown from "@/components/shared/input-fields/input-dropdown";
// import SearchInput from "@/components/shared/search-bar";
// import { Typography } from "@/components/shared/typography";
// import StatsCard from "@/components/ui/stats-card";
// import { allPatients, content, Orders } from "@/data";
// import { Icon } from "@iconify/react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const PatientsPage = () => {
//   const [customFilter, setCustomFilter] = useState("");
//   const [filteredPatientData, setFilteredPatientData] = useState(
//     allPatients?.RowsData
//   );
//   const act = [
//     {
//       label:"Active",
//     },
//     {
//       label:"Suspended",
//     },
//     {
//       label:"Pending",
//     }
//   ]
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [rowsPerPage, setRowsPerPage] = useState(7);
//   const [currentPage, setCurrentPage] = useState(1);
//   const handleFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//     if (filter === "All") {
//       setFilteredPatientData(allPatients?.RowsData);
//     } else {
//       const filteredData = allPatients?.RowsData;
//       // const filteredData = allPatients?.RowsData.filter(
//       //   (row) => row.status === filter
//       // );
//       setFilteredPatientData(filteredData);
//     }
//     setCurrentPage(1);
//   };
//   const paginatedData = filteredPatientData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const meta = {
//     totalItems: filteredPatientData?.length,
//     itemsPerPage: rowsPerPage,
//     currentPage,
//     totalPages: Math.ceil(filteredPatientData.length / rowsPerPage),
//   };

//   const router = useRouter();
//   return (
//     <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden">
//       <div className="flex justify-between items-center max-md:flex-col">
//        <div className="py-3">
//        <Typography size="h3" as="h3" className="font-bold">
//         All Patients
//       </Typography>
//       <Typography className="text-desc-color">Manage patient accounts, access, and system-level information.”</Typography>
//       </div>
//        <div className="flex items-center gap-3">
//     {/* Date Button */}
//     <button
//       type="button"
//       className="flex items-center gap-2 px-4 py-2 bg-secondary-color-light rounded text-sm text-gray-700"
//     >

//       Date
//       <Icon icon="mdi:chevron-down" className="text-gray-600" width="18" />
//     </button>

//     {/* Suspended Button */}
//     <button
//       type="button"
//       className="flex items-center gap-2 px-4 py-2 rounded bg-secondary-color-light text-sm text-gray-700"
//     >

//       Suspended
//       <Icon icon="mdi:chevron-down" className="text-gray-600" width="18" />
//     </button>

//     {/* Export Button */}
//     <button
//       type="button"
//       className="flex items-center gap-2 px-4 py-2 bg-primary-color text-white rounded text-sm hover:bg-[#226ad1] transition"
//     >
//       <Icon icon="mdi:export-variant" width="18" />
//       Export CSV / PDF
//     </button>
//       </div>
//       </div>

//       <DataTable
//         ColumnsData={allPatients?.ColumnsData}
//         tableRows={paginatedData}
//         roundedHeader={true}
//         paginate={true}
//         meta={meta}
//         setCurrentPage={setCurrentPage}
//         TableBodyRow={({
//           fname,
//           lname,
//           gender,
//           phone,
//           email,
//           date,
//           id,
//         }: AllPatients) => (
//           <tr key={id} className="">
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {fname || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {lname || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {gender || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {phone || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {email || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {date || "-"}
//             </td>
//             {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color flex gap-2 items-center">
//               <div>
//                 <Select>
//                   <SelectTrigger className="w-full border-gray-300">
//                     <SelectValue placeholder="Disable" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="price">Enable</SelectItem>

//                   </SelectContent>
//                 </Select>
//                <div>
//                {act.map((d, i) => (
//                  <div key={i}>{d.label}</div>

//                ))}
//                   <Icon
//                 icon="ic:chevron-down"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer "
//                 />
//                </div>

//               </div>
//               <Icon
//                 icon="ic:baseline-message"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer text-primary-color"
//                 onClick={() => router.push(`/patients/details/${id}`)}
//               />
//               <Icon
//                 icon="material-symbols-light:lock-reset"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer text-primary-color"
//                 onClick={() => router.push(`/patients/details/${id}`)}
//               />
//             </td> */}
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color flex relative">
//   {(() => {
//     const statusIndex = (parseInt(id) - 1) % 3;
//     const statusOptions = [
//       { label: "Active", color: "text-green-600 " },
//       { label: "Suspended", color: "text-tertiary-color " },
//       { label: "Pending", color: "text-yellow-600 " },
//     ];

//     // ✅ local state per row (status + dropdown visibility)
//     const [status, setStatus] = React.useState(statusOptions[statusIndex]);
//     const [open, setOpen] = React.useState(false);

//     return (
//       <div className="relative inline-block">
//         {/* Status Badge */}
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className={`flex items-center gap-1 px- py-1 rounded-lg text-xs font-medium ${status.color}`}
//         >
//           {status.label}
//           <Icon
//             icon="mdi:chevron-down"
//             width="16"
//             height="16"
//             className={`transition-transform ${open ? "rotate-180" : ""}`}
//           />
//         </button>

//         {/* Dropdown Menu */}
//         {open && (
//           <div className="absolute z-10 mt-1 w-32 bg-white shadow-lg border border-gray-200 rounded-lg">
//             {statusOptions.map((opt, i) => (
//               <div
//                 key={i}
//                 onClick={() => {
//                   setStatus(opt);
//                   setOpen(false);
//                 }}
//                 className={`px-3 py-1.5 text-xs cursor-pointer hover:bg-gray-100 ${
//                   opt.label === status.label ? "font-semibold text-primary-color" : "text-gray-700"
//                 }`}
//               >
//                 {opt.label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   })()}

//   {/* Message Icon */}
//   <Icon
//     icon="ic:baseline-message"
//     width="20"
//     height="20"
//     className="cursor-pointer text-primary-color"
//     onClick={() => router.push(`/patients/details/${id}`)}
//   />

//   {/* Reset Icon */}
//   <Icon
//     icon="material-symbols-light:lock-reset"
//     width="20"
//     height="20"
//     className="cursor-pointer text-primary-color"
//     onClick={() => router.push(`/patients/details/${id}`)}
//   />
// </td>

//           </tr>
//         )}
//       />
//     </div>
//   );
// };

// export default PatientsPage;
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AllPatients } from "@/types/dashboard";
import Container from "@/components/shared/container";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { allPatients, consultation } from "@/data";
import { Icon } from "@iconify/react";
// import DateRangePicker from "react-date-range/dist/components/DateRangePicker"; // optional (only if you use one)
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Button } from "@/components/shared/button";

const PatientsPage = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    allPatients?.RowsData,
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [verificationFilter, setVerificationFilter] = useState<
    "All" | "Verified" | "Not Verified"
  >("All");
  const [showVerificationDropdown, setShowVerificationDropdown] =
    useState(false);

  const router = useRouter();

  const applyFilters = (status: string, verification: string) => {
    let data = allPatients?.RowsData || [];

    // --- Status filter (your current fake status logic based on id)
    if (status !== "All") {
      data = data.filter(
        (row) =>
          ((parseInt(row.id) - 1) % 3 === 0 && status === "Active") ||
          ((parseInt(row.id) - 1) % 3 === 1 && status === "Suspended") ||
          ((parseInt(row.id) - 1) % 3 === 2 && status === "Pending"),
      );
    }

    // --- Verification filter (based on row.verification)
    if (verification !== "All") {
      data = data.filter(
        (row) =>
          verification === "Verified"
            ? row.verification === "Verified"
            : row.verification !== "Verified", // treats anything else as Not Verified
      );
    }

    setFilteredPatientData(data);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (
    status: "All" | "Active" | "Suspended" | "Pending",
  ) => {
    setActiveFilter(status);
    setShowStatusDropdown(false);
    applyFilters(status, verificationFilter);
  };

  const handleVerificationFilterChange = (
    v: "All" | "Verified" | "Not Verified",
  ) => {
    setVerificationFilter(v);
    setShowVerificationDropdown(false);
    applyFilters(activeFilter, v);
  };

  // ✅ Date filter
  // const handleDateFilter = (date: string) => {
  //   setSelectedDate(date);
  //   const filtered = allPatients.RowsData.filter((row) =>
  //     row.date?.includes(date)
  //   );
  //   setFilteredPatientData(filtered);
  // };

  const paginatedData = filteredPatientData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const meta = {
    totalItems: filteredPatientData?.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredPatientData.length / rowsPerPage),
  };

  return (
    <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden">
      <div className="flex justify-between items-center max-md:items-start max-md:flex-col">
        <div className="py-3">
          <Typography size="h3" as="h3" className="font-bold">
            All Patients
          </Typography>
          <Typography size="lg" className="text-desc-color">
            Manage patient accounts, access, and system-level information.
          </Typography>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Export Button */}
          <Button
            type="button"
            className="flex rounded-xl items-center gap-2 px-4 py-2.5 bg-primary-color text-white"
          >
            <Icon icon="entypo:export" width="20" height="20" />
            Advanced Export
          </Button>
        </div>
      </div>
      <div className="bg-[#fbf6fc] rounded-xl pt-8">
        <div className="flex gap-2 items-center px-5">
          {/* ✅ Date Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 bg-secondary-color-light rounded-lg text-lg text-gray-700"
            >
              {selectedDate || "Date"}
              <Icon
                icon="mdi:chevron-down"
                className={`text-gray-600 transition-transform duration-200 ${
                  showDateDropdown ? "rotate-180" : "rotate-0"
                }`}
                width="18"
              />
            </button>

            {showDateDropdown && (
              <div className="absolute mt-2 bg-white border rounded shadow p-2 z-50 w-48">
                {/* {["2025-11-01", "2025-10-30", "2025-10-25"].map((d) => (
                  <div
                    key={d}
                    className="px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleDateFilter(d);
                      setShowDateDropdown(false);
                    }}
                  >
                    {d}
                  </div>
                ))} */}
                <div
                  className="px-3 py-1 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedDate(null);
                    setFilteredPatientData(allPatients.RowsData);
                    setShowDateDropdown(false);
                  }}
                >
                  Clear
                </div>
              </div>
            )}
          </div>

          {/* ✅ Suspended Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary-color-light text-lg text-gray-700"
            >
              {activeFilter === "All" ? "Suspended" : activeFilter}
              <Icon
                icon="mdi:chevron-down"
                className={`text-gray-600 transition-transform duration-200 ${
                  showStatusDropdown ? "rotate-180" : "rotate-0"
                }`}
                width="18"
              />
            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 z-50 w-32">
                {["All", "Active", "Suspended", "Pending"].map((f: any) => (
                  <div
                    key={f}
                    onClick={() => handleStatusFilterChange(f)}
                    className="px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {f}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Verification Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowVerificationDropdown(!showVerificationDropdown)
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary-color-light text-lg text-gray-700"
            >
              {verificationFilter === "All"
                ? "Verification"
                : verificationFilter}
              <Icon
                icon="mdi:chevron-down"
                className={`text-gray-600 transition-transform duration-200 ${
                  showVerificationDropdown ? "rotate-180" : "rotate-0"
                }`}
                width="18"
              />
            </button>

            {showVerificationDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 z-50 w-40">
                {["All", "Verified", "Not Verified"].map((v) => (
                  <div
                    key={v}
                    onClick={() => handleVerificationFilterChange(v as any)}
                    className="px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {v}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DataTable
          ColumnsData={allPatients?.ColumnsData}
          tableRows={paginatedData}
          roundedHeader={true}
          paginate={true}
          meta={meta}
          setCurrentPage={setCurrentPage}
          TableBodyRow={({
            fname,
            Idx,
            city,
            phone,
            email,
            Badges,
            consultations,
            tags,
            verification,
            id,
            idx,
          }: AllPatients & { idx: number }) => (
            <tr key={id} className="">
              {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color"> */}
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary-color cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>{fname || "-"}</span>
                </div>
                {/* </td> */}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Idx || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {city || "-"}
              </td>
              {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">{gender || "-"}</td> */}
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color whitespace-nowrap">
                {phone || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {email || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {consultations || "-"}
              </td>
              <td
                className={`px-4 lg:px-6 py-4 whitespace-nowrap text-start text-lg ${
                  verification === "Verified"
                    ? "text-green-600"
                    : "text-tertiary-color"
                } `}
              >
                {verification || "-"}
              </td>
              <td
                className={`px-4 lg:px-6 py-4 whitespace-nowrap text-start text-lg ${tags === "Follow Up" ? "text-[#F2994A]" : tags === "Active" ? "text-red" : tags === "VIP" ? "text-primary-color" : "text-tertiary-color"} `}
              >
                {tags || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-start text-lg text-desc-color">
                {Badges || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color flex items-center relative gap-3">
                <Icon
                  icon="mdi:eye"
                  width="20"
                  className="cursor-pointer text-primary-color"
                  onClick={() => router.push(`/patients/details?id=${id}`)}
                />
                <Icon
                  icon="mdi:pencil-outline"
                  width="20"
                  className="cursor-pointer text-primary-color"
                />
                <Icon
                  icon="solar:calendar-bold"
                  width="20"
                  height="24"
                  className="cursor-pointer text-primary-color"
                />
              </td>
            </tr>
          )}
        />

        <div className="mb-12 mx-6 bg-[#FFF3E9] text-[#F2994A] text-sm px-4 py-3 rounded-lg flex items-center gap-2">
          <Icon icon="mdi:alert-circle-outline" width="18" />
          <span className="text-black">
            Data protected under GDPR & HDS standards. Access logged for
            compliance.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
