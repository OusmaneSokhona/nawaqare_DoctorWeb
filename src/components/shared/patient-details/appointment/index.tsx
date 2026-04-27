// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { AllPatients, ConsultationsTYpe } from "@/types/dashboard";
// import DataTable from "@/components/shared/data-table";
// import { Typography } from "@/components/shared/typography";
// import { allPatients, bookedCOnsultations, content, Orders } from "@/data";
// import { Icon } from "@iconify/react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import SearchInput from "../../search-bar";
// import { Button } from "../../button";

// const Consultations = () => {
//   const [customFilter, setCustomFilter] = useState("");
//   const [filteredPatientData, setFilteredPatientData] = useState(
//     bookedCOnsultations?.RowsData
//   );
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const handleFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//     if (filter === "All") {
//       setFilteredPatientData(bookedCOnsultations?.RowsData);
//     } else {
//       const filteredData = bookedCOnsultations?.RowsData;
//       // const filteredData = bookedCOnsultations?.RowsData.filter(
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
//     <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-5 bg-background-color4 rounded-2xl">
//       {/* <SearchInput/> */}
//       <div className="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6">
//               <div className="flex items-center gap-5">
//              <SearchInput placeholder="Search by doctor / date / specialty"/>
//               </div>
//               <div className="bg-primary-color rounded-xl text-white">
//                 <Button  className="flex gap-2 items-center">
//                   {/* <Icon
//                     icon="material-symbols:download-rounded"
//                     width="24"
//                     height="24"
//                     className="text-white"
//                   /> */}
//                   Export CSV / PDF
//                 </Button>
//               </div>
//             </div>
//       <DataTable
//         ColumnsData={bookedCOnsultations?.ColumnsData}
//         tableRows={paginatedData}
//         roundedHeader={true}
//         paginate={true}
//         meta={meta}
//         setCurrentPage={setCurrentPage}
//         TableBodyRow={({
//           patientName,
//           doctorName,
//           consultationType,
//           medicalCondition,
//           Fee,
//           consultationDate,
//           Status,
//           id,
//         }: ConsultationsTYpe) => (
//           <tr key={id} className="">
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {doctorName || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {patientName || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {consultationType || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {medicalCondition || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               ${Fee || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {consultationDate || "-"}
//             </td>
//             <td
//               className={`px-4 lg:px-6 py-4 text-start text-xs ${Status === "Accept" ? "text-secondary-color" : "text-tertiary-color"}`}
//             >
//               {Status || "-"}
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
//           </tr>
//         )}
//       />
//     </div>
//   );
// };

// export default Consultations;
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ConsultationsTYpe } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { bookedCOnsultations } from "@/data";
import { Icon } from "@iconify/react";
import SearchInput from "../../search-bar";
import { Button } from "../../button";
import { useIsMobile } from "@/hooks/useIsMobile";

const Appointments = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    bookedCOnsultations?.RowsData,
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("Alld");
  const [activeFilter, setActiveFilter] = useState("All");

  const [modeFilter, setModeFilter] = useState("All");
  const [specialtyFilter, setSpecialtyFilter] = useState("All");

  const [modeOpen, setModeOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);

  const router = useRouter();

  const applyFilters = (
    status = activeFilter,
    mode = modeFilter,
    specialty = specialtyFilter,
    dateRange = dateFilter,
  ) => {
    let data = [...bookedCOnsultations.RowsData];

    if (dateRange !== "Alld") {
      const today = new Date();
      let startDate = new Date();

      if (dateRange === "Last 7 days") {
        startDate.setDate(today.getDate() - 7);
      } else if (dateRange === "Last 14 days") {
        startDate.setDate(today.getDate() - 14);
      } else if (dateRange === "Last 1 month") {
        startDate.setMonth(today.getMonth() - 1);
      }

      data = data.filter((item) => {
        // Convert DD/MM/YYYY to Date
        const [day, month, year] = item.consultationDate.split("/");
        const consultationDate = new Date(`${year}-${month}-${day}`);

        return consultationDate >= startDate && consultationDate <= today;
      });
    }

    if (status !== "All") {
      data = data.filter(
        (row) => row.Status?.toLowerCase() === status.toLowerCase(),
      );
    }

    if (mode !== "All") {
      data = data.filter(
        (row) => row.consultationType?.toLowerCase() === mode.toLowerCase(),
      );
    }

    if (specialty !== "All") {
      data = data.filter(
        (row) => row.Specialty?.toLowerCase() === specialty.toLowerCase(),
      );
    }

    setFilteredPatientData(data);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setDateFilter(filter);
    setFilterOpen(false);
    setDateOpen(false);
    applyFilters(filter);
  };

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

  const isMobile = useIsMobile();

  return (
    <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-5 bg-background-color4 rounded-2xl">
      {/* Header section */}
      <div className="flex items-center max-md:items-start max-md:flex-col max-md:gap-3 justify-between px-4 md:px-6 pt-4 md:pt-6">
        <div className="flex items-center gap-5">
          <SearchInput
            placeholder="Search by doctor/date/specialty"
            width={isMobile ? "280" : "450"}
          />
        </div>

        <div className="flex items-center gap-3">
          {/* ✅ Export Button */}
          <div className="bg-primary-color rounded-lg text-white">
            <Button className="flex gap-2 items-center">
              <Icon
                icon="material-symbols:login-rounded"
                width="22"
                className="text-white"
              />
              Export CSV / PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2 px-6 relative">
        {/* ✅ Filter Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDateOpen(!dateOpen)}
            className="flex items-center gap-2 bg-[#EAEEF7] text-md text-[#2C2C2C] px-1.5 py-2 rounded-lg  font-medium"
          >
            {dateFilter === "Alld" ? "Date Range" : dateFilter}
            <Icon
              icon={dateOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
              height="20"
            />
          </button>

          {dateOpen && (
            <div className="absolute  mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {["All", "Last 7 days", "Last 14 month", "Last 1 month"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      dateFilter === option ? "bg-gray-100 font-semibold" : ""
                    }`}
                  >
                    {option}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 bg-[#EAEEF7] text-md text-[#2C2C2C] px-1.5 py-2 rounded-lg  font-medium"
          >
            {activeFilter === "All" ? "Completed" : activeFilter}
            <Icon
              icon={filterOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
              height="20"
            />
          </button>

          {filterOpen && (
            <div className="absolute  mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {["All", "Completed", "Cancelled", "Upcoming"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleFilterChange(option)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    activeFilter === option ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setModeOpen(!modeOpen);
              setFilterOpen(false);
              setSpecialtyOpen(false);
            }}
            className="flex items-center gap-2 bg-[#EAEEF7] text-md text-[#2C2C2C] px-1.5 py-2 rounded-lg font-medium"
          >
            {modeFilter === "All" ? "Mode" : modeFilter}
            <Icon
              icon={modeOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
            />
          </button>

          {modeOpen && (
            <div className="absolute  mt-2 w-28 bg-white border rounded-md shadow-lg z-50">
              {["All", "Remote", "In-Person"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setModeFilter(opt);
                    setModeOpen(false);
                    applyFilters(activeFilter, opt, specialtyFilter);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setSpecialtyOpen(!specialtyOpen);
              setFilterOpen(false);
              setModeOpen(false);
            }}
            className="flex items-center gap-2 bg-[#EAEEF7] text-md text-[#2C2C2C] px-1.5 py-2 rounded-lg font-medium"
          >
            {specialtyFilter === "All" ? "Specialty" : specialtyFilter}
            <Icon
              icon={specialtyOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
            />
          </button>

          {specialtyOpen && (
            <div className="absolute mt-2 w-32 bg-white border rounded-md shadow-lg z-50">
              {["All", "Cardiology", "Dermatology", "Neurology"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSpecialtyFilter(opt);
                    setSpecialtyOpen(false);
                    applyFilters(activeFilter, modeFilter, opt);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Data Table */}
      <DataTable
        ColumnsData={bookedCOnsultations?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={({
          patientName,
          doctorName,
          consultationType,
          Specialty,
          Duration,
          links,
          consultationDate,
          actions,
          Status,
          id,
        }: ConsultationsTYpe) => (
          <tr key={id}>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {doctorName || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {patientName || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {consultationType || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Specialty || "-"}
            </td>
            {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Duration || "-"}
            </td> */}
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {consultationDate || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 cursor-pointer text-start text-lg text-desc-color whitespace-nowrap underline underline-offset-4">
              View Prescriptions
            </td>
            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                Status === "Completed"
                  ? "text-secondary-color"
                  : Status === "Upcoming"
                    ? "text-[#F2994A]"
                    : "text-tertiary-color"
              }`}
            >
              {Status || "-"}
            </td>
            <td className="flex items-center gap-1 px-4 lg:px-6 py-4 text-start cursor-pointer text-md text-primary-color whitespace-nowrap underline underline-offset-4">
              View Consultations
              <Icon
                icon="iconamoon:arrow-down-2-duotone"
                width="16"
                height="16"
              />
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default Appointments;
