// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { ConsultationsTYpe, PrescriptionTYpe } from "@/types/dashboard";
// import DataTable from "@/components/shared/data-table";
// import { bookedCOnsultations, PrescriptionData } from "@/data";
// import { Icon } from "@iconify/react";
// import SearchInput from "../../search-bar";
// import { Button } from "../../button";

// const Consent = () => {
//   const [filteredPatientData, setFilteredPatientData] = useState(
//     PrescriptionData?.RowsData
//   );
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("All");

//   const router = useRouter();

//   // ✅ Handle filter selection
//   const handleFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//     setFilterOpen(false);

//     if (filter === "All") {
//       setFilteredPatientData(PrescriptionData?.RowsData);
//     } else {
//       const filteredData = PrescriptionData?.RowsData.filter(
//         (row) => row.Status?.toLowerCase() === filter.toLowerCase()
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
//     <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-5 bg-background-color4 rounded-2xl">
//       <div className="flex items-center max-md:flex-col max-md:gap-3 justify-between px-4 md:px-6 pt-4 md:pt-6 relative">
//         <div className="flex items-center gap-5">
//           <SearchInput placeholder="Search by doctor / date / specialty" />
//         </div>

//         <div className="flex items-center gap-3">
//           {/* ✅ Filter Button with Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setFilterOpen(!filterOpen)}
//               className="flex items-center gap-2 bg-[#EAEEF7] text-[#2C2C2C] px-4 py-2.5 rounded-lg  font-medium"
//             >
//               {activeFilter === "All" ? "Completed" : activeFilter}
//               <Icon
//                 icon={filterOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
//                 width="20"
//                 height="20"
//               />
//             </button>

//             {filterOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//                 {["All", "Completed", "Cancelled", "Upcoming"].map((option) => (
//                   <button
//                     key={option}
//                     onClick={() => handleFilterChange(option)}
//                     className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
//                       activeFilter === option ? "bg-gray-100 font-semibold" : ""
//                     }`}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ✅ Export Button */}
//           <div className="bg-primary-color rounded-lg text-white">
//             <Button className="flex gap-2 items-center">
//               {/* <Icon
//                 icon="material-symbols:download-rounded"
//                 width="20"
//                 height="20"
//                 className="text-white"
//               /> */}
//               Export CSV / PDF
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Data Table */}
//       <DataTable
//         ColumnsData={PrescriptionData?.ColumnsData}
//         tableRows={paginatedData}
//         roundedHeader={true}
//         paginate={true}
//         meta={meta}
//         setCurrentPage={setCurrentPage}
//         TableBodyRow={({
//           patientName,
//           doctorName,
//           consultationType,
//           prescriptionType,
//           Specialty,
//           Duration,
//           assignPhar,
//           update,
//           Status,
//           Medications,
//           Pharmacy,
//           id,
//         }: PrescriptionTYpe) => (
//           <tr key={id}>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {patientName || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {doctorName || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {consultationType || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {prescriptionType || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {update || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {Medications || "-"}
//             </td>
//             {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {Specialty || "-"}
//             </td> */}
//             {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {Duration || "-"}
//             </td> */}
//             {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
//               {Pharmacy || "-"}
//             </td> */}
//             {/* <td
//               className={`px-4 lg:px-6 py-4 text-start text-xs ${
//                 Pharmacy === "Completed"
//                   ? "text-secondary-color"
//                   : "text-[#F2994A]"
//               }`}
//             >
//               {Pharmacy || "-"}
//             </td> */}
//             {/* <td
//               className={`px-4 lg:px-6 py-4 text-start text-lg ${
//                 Pharmacy?.toString().trim() === "Validated"
//                   ? "text-secondary-color"
//                   : "text-[#F2994A]"
//               }`}
//             >
//               {Pharmacy || "-"}
//             </td> */}
//             <td
//               className={`px-4 lg:px-6 py-4 text-start text-lg ${
//                 Pharmacy === "Validated"
//                   ? "text-secondary-color"
//                   : Pharmacy === "Pending"
//                     ? "text-[#F2994A]"
//                     : Pharmacy === "Prepared"
//                     ? 'text-primary-color'
//                     : 'text-red'
//               }`}
//             >
//               {Pharmacy || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               ABC Pharmacy
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               #LOG-**021
//             </td>
//             <td
//               className={`px-4 lg:px-6 py-4 text-start text-lg ${
//                 Status === "Not started"
//                   ? "text-[#F2994A]"
//                   : Status=== "In transit"
//                   ? 'text-primary-color'
//                   : Status === 'Delivered'
//                   ? 'text-secondary-color'
//                   : 'text-red'
//               }`}
//             >
//               {Status || "-"}
//             </td>
//           </tr>
//         )}
//       />
//     </div>
//   );
// };

// export default Consent;
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ConsultationsTYpe, PrescriptionTYpe } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import {
  bookedCOnsultations,
  consentData,
  noteData,
  PrescriptionData,
} from "@/data";
import { Icon } from "@iconify/react";
import SearchInput from "../../search-bar";
import { Button } from "../../button";

const Consent = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    consentData?.RowsData,
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState<
    "type" | "status" | "method" | null
  >(null);

  const [consentType, setConsentType] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");

  const router = useRouter();

  const FilterDropdown = ({
    label,
    value,
    options,
    openKey,
    onChange,
  }: {
    label: string;
    value: string;
    options: string[];
    openKey: "type" | "status" | "method";
    onChange: (val: string) => void;
  }) => (
    <div className="relative">
      <button
        onClick={() => setFilterOpen(filterOpen === openKey ? null : openKey)}
        className="flex items-center justify-between gap-1 rounded-lg bg-background-color3 text-md text-[#2C2C2C] px-1.5 py-2"
      >
        {value === "All" ? label : value}
        <Icon
          icon={filterOpen === openKey ? "mdi:chevron-up" : "mdi:chevron-down"}
          width="18"
        />
      </button>

      {filterOpen === openKey && (
        <div className="absolute mt-2 w-28 bg-white border rounded-lg shadow-lg z-50">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setFilterOpen(null);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                value === opt ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const applyFilters = (type: string, status: string, method: string) => {
    let data = consentData?.RowsData || [];

    // Consent Type
    if (type !== "All") {
      data = data.filter(
        (row) => row.consentType?.toLowerCase() === type.toLowerCase(),
      );
    }

    // Status
    if (status !== "All") {
      data = data.filter(
        (row) => row.Status?.toLowerCase() === status.toLowerCase(),
      );
    }

    // Method
    if (method !== "All") {
      data = data.filter(
        (row) => row.Method?.toLowerCase() === method.toLowerCase(),
      );
    }

    setFilteredPatientData(data);
    setCurrentPage(1);
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

  return (
    <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-5 bg-background-color4 rounded-2xl">
      <div className="flex gap-3 px-6 mt-7 flex-wrap">
        {/* Consent Type */}
        <FilterDropdown
          label="All Consent"
          value={consentType}
          openKey="type"
          options={["All", "Consultation", "Follow up", "Blood test"]}
          onChange={(val) => {
            setConsentType(val);
            applyFilters(val, statusFilter, methodFilter);
          }}
        />

        {/* Status */}
        <FilterDropdown
          label="All Status"
          value={statusFilter}
          openKey="status"
          options={["All", "Pending", "Accepted", "Delivered"]}
          onChange={(val) => {
            setStatusFilter(val);
            applyFilters(consentType, val, methodFilter);
          }}
        />

        {/* Method */}
        <FilterDropdown
          label="All Method"
          value={methodFilter}
          openKey="method"
          options={["All", "Online", "In Person", "Call"]}
          onChange={(val) => {
            setMethodFilter(val);
            applyFilters(consentType, statusFilter, val);
          }}
        />
      </div>

      {/* ✅ Data Table */}
      <DataTable
        ColumnsData={consentData?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={({
          consentType,
          doctorName,
          Scop,
          Method,
          Appointment,
          Duration,
          assignPhar,
          update,
          Status,
          Medications,
          Pharmacy,
          id,
        }: PrescriptionTYpe) => (
          <tr key={id}>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {consentType || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Scop || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {update || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Method || "-"}
            </td>
            {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {doctorName || "-"}
            </td> */}

            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                Status === "Acceped"
                  ? "text-secondary-color"
                  : Status === "Pending"
                    ? "text-[#F2994A]"
                    : Status === "Delivered"
                      ? "text-secondary-color"
                      : "text-red"
              }`}
            >
              {Status || "-"}
            </td>
            <td className="px-6 py-8 flex items-center gap-2">
              <Icon
                icon="mdi:eye"
                width="20"
                className="cursor-pointer text-primary-color"
                // onClick={() =>
                //   router.push(
                //     `/prescriptions/template-details?id=${id}`
                //   )
                // }
              />
              <Icon
                icon="flowbite-edit-solid"
                width="22"
                className="cursor-pointer text-primary-color"
              />
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default Consent;
