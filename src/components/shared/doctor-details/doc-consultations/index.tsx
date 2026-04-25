// import React from 'react'

// const DocConsultations = () => {
//   return (
//     <div>DocConsultations</div>
//   )
// }

// export default DocConsultations
// "use client";

// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { ConsultationsTYpe } from "@/types/dashboard";
// import DataTable from "@/components/shared/data-table";
// import { bookedCOnsultations, docCOnsultations } from "@/data";
// import { Icon } from "@iconify/react";
// import SearchInput from "../../search-bar";
// import { Button } from "../../button";

// const  DocConsultations = () => {
//   const [filteredPatientData, setFilteredPatientData] = useState(
//     docCOnsultations?.RowsData
//   );
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//   const router = useRouter();

//   // ✅ Handle filter selection
//   const handleFilterChange = (filter: string) => {
//     setActiveFilter(filter);
//     setFilterOpen(false);

//     if (filter === "All") {
//       setFilteredPatientData(docCOnsultations?.RowsData);
//     } else {
//       const filteredData = docCOnsultations?.RowsData.filter(
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
//       {/* Header section */}
//       <div className="flex items-center justify-end px-4 md:px-6 pt-4 md:pt-6 relative">
//         {/* <div className="flex items-center gap-5">
//           <SearchInput placeholder="Search by doctor / date / specialty" />
//         </div> */}

//         <div className="flex items-center gap-3">
//           {/* ✅ Filter Button with Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setFilterOpen(!filterOpen)}
//               className="flex items-center gap-2 bg-[#EAEEF7] text-[#2C2C2C] px-4 py-4 rounded-xl  font-medium"
//             >
//               {activeFilter === "All" ? "Completed" : activeFilter}
//               <Icon
//                 icon={
//                   filterOpen
//                     ? "mdi:chevron-up"
//                     : "mdi:chevron-down"
//                 }
//                 width="20"
//                 height="20"
//               />
//             </button>

//             {filterOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//                 {["All", "Accept", "Reject", "Upcoming"].map((option) => (
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
//           <div className="bg-primary-color rounded-xl text-white">
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
//         ColumnsData={docCOnsultations?.ColumnsData}
//         tableRows={paginatedData}
//         roundedHeader={true}
//         paginate={true}
//         meta={meta}
//         setCurrentPage={setCurrentPage}
//         TableBodyRow={({
//           patientName,
//           doctorName,
//           consultationType,
//           Specialty,
//           Fee,
//           consultationDate,
//           Status,
//           id,
//         }: ConsultationsTYpe) => (
//           <tr key={id}>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {doctorName || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {patientName || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {consultationType || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {Specialty || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {Fee || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               {consultationDate || "-"}
//             </td>
//             <td
//               className={`px-4 lg:px-6 py-4 text-start text-lg ${
//                 Status === "Accept"
//                   ? "text-secondary-color"
//                   : Status === "Upcoming"
//                   ? "text-[#F2994A]"
//                   : "text-tertiary-color"
//               }`}
//             >
//               {Status || "-"}
//             </td>
//             <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
//               <div className="relative">
//                       <Icon
//                         className="text-primary-color cursor-pointer"
//                         icon="ph:dots-three-vertical"
//                         width="25"
//                         height="25"
//                         onClick={() =>
//                           setOpenDropdown(
//                             openDropdown === `row-${id}` ? null : `row-${id}`
//                           )
//                         }
//                       />
//                       {openDropdown === `row-${id}` && (
//                         <div className="absolute top-6 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md w-48 py-2 z-20">
//                           {[
//                             "Review",
//                             "Dispute",
//                             "Cancel",
//                             // "Mark as Indirect",
//                           ].map((option) => (
//                             <div
//                               key={option}
//                               className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
//                               onClick={() => {
//                                 console.log(option, id);
//                                 setOpenDropdown(null);
//                               }}
//                             >
//                               {option}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//             </td>
//           </tr>
//         )}
//       />
//     </div>
//   );
// };

// export default  DocConsultations;
"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { ConsultationsTYpe } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { docCOnsultations } from "@/data";
import { Icon } from "@iconify/react";
import { Button } from "../../button";

type DropdownCellProps = {
  id: string | number;
  options?: string[];
};

const DropdownCell: React.FC<DropdownCellProps> = ({
  id,
  options = ["Review", "Dispute", "Cancel"],
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color relative">
      <div ref={dropdownRef} className="relative">
        <Icon
          className="text-primary-color cursor-pointer"
          icon="ph:dots-three-vertical"
          width="25"
          height="25"
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(!openDropdown);
          }}
        />
        {openDropdown && (
          <div className="absolute top-8 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md w-48 py-2 z-50">
            {options.map((option) => (
              <div
                key={option}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => setOpenDropdown(false)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </td>
  );
};

const DocConsultations = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    docCOnsultations?.RowsData,
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const router = useRouter();

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setFilterOpen(false);

    if (filter === "All") {
      setFilteredPatientData(docCOnsultations?.RowsData);
    } else {
      const filteredData = docCOnsultations?.RowsData.filter(
        (row) => row.Status?.toLowerCase() === filter.toLowerCase(),
      );
      setFilteredPatientData(filteredData);
    }
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
      {/* Header */}
      <div className="flex items-center justify-end px-4 md:px-6 pt-4 md:pt-6 relative">
        <div className="flex items-center flex-wrap gap-3">
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 bg-[#EAEEF7] text-[#2C2C2C] px-4 py-4 rounded-xl font-medium"
            >
              {activeFilter === "All" ? "Completed" : activeFilter}
              <Icon
                icon={filterOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                width="20"
                height="20"
              />
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                {["All", "Accept", "Reject", "Upcoming"].map((option) => (
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

          <div className="bg-primary-color rounded-xl text-white">
            <Button className="flex gap-2 items-center">
              Export CSV / PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        ColumnsData={docCOnsultations?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={(
          {
            patientName,
            doctorName,
            consultationType,
            Specialty,
            Fee,
            consultationDate,
            Status,
            id,
          }: ConsultationsTYpe,
          index: number,
        ) => (
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
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Fee || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {consultationDate || "-"}
            </td>
            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                Status === "Accept"
                  ? "text-secondary-color"
                  : Status === "Upcoming"
                    ? "text-[#F2994A]"
                    : "text-tertiary-color"
              }`}
            >
              {Status || "-"}
            </td>

            {/* ✅ Dropdown Cell */}
            {/* <DropdownCell id={id} /> */}
            <DropdownCell id={id || `row-${index}`} />
          </tr>
        )}
      />
    </div>
  );
};

export default DocConsultations;

{
  /* <div className="relative">
              <button
                onClick={() => {
                  setIsDateOpen(!isDateOpen);
                  setIsStatusOpen(false);
                }}
                className="flex items-center justify-between w-40 border border-border-color bg-border-color rounded-md px-4 py-2 text-gray-700"
              >
                <span>{dateFilter || "Date Range"}</span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`transition-transform ${
                    isDateOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isDateOpen && (
                <div className="absolute left-0 mt-1 w-40 bg-white shadow-lg border border-gray-200 rounded-md z-10">
                  {["Date", "Last 7 Days", "Last 30 Days", "Last year"].map(
                    (option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setDateFilter(option);
                          setIsDateOpen(false);
                        }}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                          dateFilter === option ? "bg-gray-100" : ""
                        }`}
                      >
                        {option}
                      </div>
                    )
                  )}
                </div>
              )}
            </div> */
}
