// import React from 'react'

// const Prescriptions = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Prescriptions
// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { AllDoctorsType } from "@/types/dashboard";
// import Container from "@/components/shared/container";
// import DataTable from "@/components/shared/data-table";
// import { Typography } from "@/components/shared/typography";
// import { allDoctors } from "@/data";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/shared/button";

// const Delivered = () => {
//   const router = useRouter();

//   const [filteredPatientData, setFilteredPatientData] = useState(
//     allDoctors?.RowsData
//   );
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Dropdown State
//   const [showFilterMenu, setShowFilterMenu] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("Deactivated");

//   const handleFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//     setShowFilterMenu(false);

//     if (filter === "All") {
//       setFilteredPatientData(allDoctors?.RowsData);
//     } else {
//       const filteredData = allDoctors?.RowsData.filter(
//         (row) =>
//           row.status?.toString().trim().toLowerCase() ===
//           filter.toLowerCase()
//       );
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

//   return (
//     <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden relative">
//       <div className="flex justify-between items-center">
//         <div>
//           <Typography size="h3" as="h3" className="font-bold">
//             All Doctors
//           </Typography>
//           <Typography>
//             Manage doctor accounts, compliance status, and professional validation.
//           </Typography>
//         </div>

//         {/* ---------------- Top Buttons ---------------- */}
//         <div className="flex gap-3 relative">
//           {/* Filter Dropdown Button */}
//           <Button
//             onClick={() => setShowFilterMenu(!showFilterMenu)}
//             className="flex items-center justify-between font-bold bg-background-color3 rounded-xl w-[160px] h-[45px]"
//           >
//             <span>{activeFilter}</span>
//             <Icon
//               icon={
//                 showFilterMenu
//                   ? "mdi:chevron-up"
//                   : "mdi:chevron-down"
//               }
//               width="20"
//               height="20"
//             />
//           </Button>

//           {/* Dropdown Menu */}
//           {showFilterMenu && (
//             <div className="absolute top-[50px] left-0 bg-white shadow-md rounded-lg w-[160px] z-20 border border-gray-200">
//               {["All", "Validated", "Awaiting", "Suspended", "Deactivated"].map(
//                 (filter) => (
//                   <div
//                     key={filter}
//                     onClick={() => handleFilterChange(filter)}
//                     className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${
//                       activeFilter === filter ? "text-primary-color font-semibold" : "text-[#37474F]"
//                     }`}
//                   >
//                     {filter}
//                   </div>
//                 )
//               )}
//             </div>
//           )}

//           {/* Export Button */}
//           <Button className="flex items-center gap-2 font-bold bg-primary-dark rounded-xl w-[190px] h-[45px] text-white">
//             Export CSV / PDF
//           </Button>
//         </div>
//       </div>

//       {/* ---------------- TABLE ---------------- */}
//       <DataTable
//         ColumnsData={allDoctors?.ColumnsData}
//         tableRows={paginatedData}
//         roundedHeader={true}
//         paginate={true}
//         meta={meta}
//         setCurrentPage={setCurrentPage}
//         TableBodyRow={({
//           fname,
//           login,
//           Specialty,
//           phoneNo,
//           email,
//           consultationType,
//           Rating,
//           id,
//           status,
//         }: AllDoctorsType) => (
//           <tr key={id}>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {fname || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {login || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {Specialty || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs whitespace-nowrap text-desc-color">
//               {phoneNo || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {email || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {Rating || "-"}
//             </td>

//             <td
//               className={`px-4 flex gap-2 items-center lg:px-6 py-4 text-start text-xs ${
//                 status?.toLowerCase() === "validated"
//                   ? "text-secondary-color"
//                   : status?.toLowerCase() === "awaiting"
//                   ? "text-[#F2994A]"
//                   : status?.toLowerCase() === "suspended"
//                   ? "text-red"
//                   : "text-[#828282]"
//               }`}
//             >
//               {status || "-"}
//               {/* <Icon
//                 icon="ic:baseline-message"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer text-primary-color"
//               /> */}
//               {/* <Icon
//                 icon="mingcute:user-edit-fill"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer text-primary-color"
//                 onClick={() => router.push(`/doctors/edit?id=${id}`)}
//               /> */}
//               <Icon
//                 icon="mdi:eye"
//                 width="20"
//                 height="20"
//                 className="cursor-pointer text-primary-color"
//                 onClick={() => router.push(`/doctors/details?id=${id}`)}
//               />
//             </td>
//           </tr>
//         )}
//       />
//     </div>
//   );
// };

// export default Delivered;
"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { devlivered, paymentss } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { deliveredTable, paymentTable } from "@/data";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";

const Delivered = () => {
  const router = useRouter();

  // Filters
  const [statusFilter, setStatusFilter] = useState("Status");
  const [dateFilter, setDateFilter] = useState("Date");
  const [patientFilter, setPatientFilter] = useState("Patient");
  const [orderFilter, setOrderFilter] = useState("Order");

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Filter logic (extended)
  // const filteredPatientData = useMemo(() => {
  //   let filtered = [...deliveredTable.rowsData];
  //   const now = new Date();

  //   const parseDate = (dateStr: string) => {
  //     const [day, month, year] = dateStr.split("/").map(Number);
  //     return new Date(year, month - 1, day);
  //   };

  //   return filtered;
  // }, [statusFilter, dateFilter, patientFilter, orderFilter]);
  const filteredPatientData = useMemo(() => {
    let filtered = [...deliveredTable.rowsData];

    // Medication
    if (patientFilter !== "Patient" && patientFilter !== "Medication") {
      filtered = filtered.filter((row) =>
        row.Medication?.toLowerCase().includes(patientFilter.toLowerCase()),
      );
    }

    // Status
    if (statusFilter !== "Status") {
      filtered = filtered.filter(
        (row) => row.Status?.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    // Date filter logic
    if (dateFilter !== "Date") {
      const today = new Date();
      filtered = filtered.filter((row) => {
        if (!row.Date) return false;

        const [d, m, y] = row.Date.split("/").map(Number);
        const rowDate = new Date(y, m - 1, d);

        if (dateFilter === "Today") {
          return rowDate.toDateString() === today.toDateString();
        }
        if (dateFilter === "Yesterday") {
          const yday = new Date();
          yday.setDate(today.getDate() - 1);
          return rowDate.toDateString() === yday.toDateString();
        }
        if (dateFilter === "Last 7 Days") {
          const last = new Date();
          last.setDate(today.getDate() - 7);
          return rowDate >= last && rowDate <= today;
        }
        if (dateFilter === "Last 30 Days") {
          const last = new Date();
          last.setDate(today.getDate() - 30);
          return rowDate >= last && rowDate <= today;
        }

        return true;
      });
    }

    return filtered;
  }, [patientFilter, statusFilter, dateFilter]);

  // Pagination logic
  const paginatedData = filteredPatientData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div>
      {/* ---------- Table ---------- */}
      <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden bg-white rounded-2xl">
        <div className="flex flex-wrap items-center justify-between px-4 md:px-6 pt-4 md:pt-6 gap-3">
          <div className="flex gap-2">
            {/* <Typography className="bg-[#EAEEF7] px-3 py-2 rounded-xl">Medication</Typography>
            <Typography className="bg-[#EAEEF7] px-3 py-2 rounded-xl">Date</Typography>
            <Typography className="bg-[#EAEEF7] px-3 py-2 rounded-xl">Status</Typography> */}
            <div className="flex flex-wrap items-center justify-between px-4 md:px-6 pt-4 md:pt-6 gap-3">
              <div className="flex gap-2">
                {/* Medication */}
                <div
                  className="relative bg-[#EAEEF7] w-[180px] justify-center py-4 rounded-xl flex items-center gap-1 cursor-pointer"
                  onClick={() => setIsPatientOpen(!isPatientOpen)}
                >
                  <Typography className="font-bold">Medication</Typography>
                  <Icon
                    icon="mdi:chevron-down"
                    width="18"
                    height="18"
                    className={`transition-transform duration-300 ${
                      isPatientOpen ? "rotate-180" : ""
                    }`}
                  />

                  {isPatientOpen && (
                    <div className="absolute top-12 left-0 bg-white shadow-md rounded-md w-40 z-20">
                      {["Panadol", "Brufen", "Augmentin"].map((opt) => (
                        <p
                          key={opt}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setPatientFilter(opt);
                            setIsPatientOpen(false);
                          }}
                        >
                          {opt}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div
                  className="relative w-[180px]  justify-center bg-[#EAEEF7]  py-4 rounded-xl flex items-center gap-1 cursor-pointer"
                  onClick={() => setIsDateOpen(!isDateOpen)}
                >
                  <Typography className="font-bold">Date</Typography>
                  <Icon
                    icon="mdi:chevron-down"
                    width="18"
                    height="18"
                    className={`transition-transform duration-300 ${
                      isDateOpen ? "rotate-180" : ""
                    }`}
                  />

                  {isDateOpen && (
                    <div className="absolute top-12 left-0 bg-white shadow-md rounded-md w-40 z-20">
                      {[
                        "Today",
                        "Yesterday",
                        "Last 7 Days",
                        "Last 30 Days",
                      ].map((opt) => (
                        <p
                          key={opt}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDateFilter(opt);
                            setIsDateOpen(false);
                          }}
                        >
                          {opt}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div
                  className="relative w-[180px] justify-center bg-[#EAEEF7]  py-4 rounded-xl flex items-center gap-1 cursor-pointer"
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                >
                  <Typography className="font-bold">Status</Typography>
                  <Icon
                    icon="mdi:chevron-down"
                    width="18"
                    height="18"
                    className={`transition-transform duration-300 ${
                      isStatusOpen ? "rotate-180" : ""
                    }`}
                  />

                  {isStatusOpen && (
                    <div className="absolute top-12 left-0 bg-white shadow-md rounded-md w-40 z-20">
                      {["Delivered", "Failed", "Pending", "Completed"].map(
                        (opt) => (
                          <p
                            key={opt}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setStatusFilter(opt);
                              setIsStatusOpen(false);
                            }}
                          >
                            {opt}
                          </p>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Table Data ---------- */}
        <DataTable
          ColumnsData={deliveredTable.ColumnsData}
          tableRows={paginatedData}
          roundedHeader={true}
          paginate={true}
          TableBodyRow={({
            id,
            ID,
            Date,
            Medication,
            Doctor,
            Pharmacy,
            Status,
            Delivery,
            tracking,
            Proof,
          }: devlivered) => (
            <tr key={id} className="hover:bg-white transition">
              <td className="px-4 lg:px-6 py-4 text-md text-start text-desc-color">
                {ID}
              </td>
              <td className="px-4 lg:px-6 py-4 text-md text-start text-desc-color w-full">
                {tracking}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color w-full">
                {Medication}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color ">
                {Date}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Delivery}
              </td>
              {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">{Proof}</td> */}
              <td
                className={`px-4 lg:px-6 py-4 text-start text-lg ${
                  Proof === "Missing"
                    ? "text-red"
                    : Proof === "Verified"
                      ? "text-secondary-color"
                      : Proof === "Pending"
                        ? "text-[#F2994A]"
                        : ""
                }`}
              >
                {Proof || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Pharmacy}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Doctor}
              </td>
              <td
                className={`px-4 lg:px-6 py-4 text-start text-lg ${
                  Status === "Failed"
                    ? "text-red"
                    : Status === "Delivered"
                      ? "text-secondary-color"
                      : Status === "Completed"
                        ? "text-primary-color"
                        : ""
                }`}
              >
                {Status || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-xs flex gap-1 items-center">
                {/* <Icon
                  icon="mdi:eye"
                  width="20"
                  height="20"
                  className="cursor-pointer text-primary-color"
                  onClick={() =>
                    router.push(`/payment-history/details?id=${id}`)
                  }
                /> */}
                <Icon
                  className="text-primary-color"
                  icon="ic:baseline-message"
                  width="24"
                  height="24"
                />
                <div className="relative">
                  <Icon
                    className="text-primary-color cursor-pointer"
                    icon="ph:dots-three-vertical"
                    width="25"
                    height="25"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === `row-${id}` ? null : `row-${id}`,
                      )
                    }
                  />
                  {openDropdown === `row-${id}` && (
                    <div className="absolute top-6 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md w-[150px] py-2 z-20">
                      {[
                        "View Proof",
                        "Mark Incident",
                        // "Reassign Pharmacy",
                        // "Mark as Indirect",
                      ].map((option) => (
                        <div
                          key={option}
                          className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            console.log(option, id); // Handle action here
                            setOpenDropdown(null); // Close dropdown after click
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default Delivered;
