// import React from 'react'

// const VeiwAsPatient = () => {
//   return (
//     <div>VeiwAsPatient</div>
//   )
// }

// export default VeiwAsPatient
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { viewType } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { view } from "@/data";
import { Icon } from "@iconify/react";

const VeiwAsPatient = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    view?.RowsData || [],
  );
  const [customFilter, setCustomFilter] = useState("");
  // const [filteredPatientData, setFilteredPatientData] = useState(
  //   view?.RowsData
  // );

  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const [activeFilter, setActiveFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filters = ["All", "Morning", "Afternoon"];

  // Filter Logic Implementation
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setIsOpen(false); // Filter select karte hi dropdown band ho jaye
    setCurrentPage(1);

    if (filter === "All") {
      setFilteredPatientData(view?.RowsData);
    } else if (filter === "Morning") {
      const filtered = view?.RowsData.filter((row: any) =>
        row.Time?.toLowerCase().includes("am"),
      );
      setFilteredPatientData(filtered);
    } else if (filter === "Afternoon") {
      const filtered = view?.RowsData.filter((row: any) =>
        row.Time?.toLowerCase().includes("pm"),
      );
      setFilteredPatientData(filtered);
    }
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

  const router = useRouter();
  return (
    <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden">
      <div className="flex max-md:flex-col max-md:gap-3 max-md:items-start justify-between items-center">
        <div>
          <Typography size="h3" as="h3" className="font-bold">
            View as Patient
          </Typography>
          <Typography size="lg" className="text-desc-color">
            This is a preview of the patient’s booking view
          </Typography>
        </div>
      </div>

      {/* FILTER BUTTONS SECTION */}
      {/* DROPDOWN FILTER SECTION */}
      <div className="bg-white p-2">
        <div className="relative px-4 pt-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-gray-100 border border-gray-100 px-4 py-2 rounded-xl shadow-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
          >
            {/* <Icon icon="mdi:filter-variant" className="text-primary-color" width="20" /> */}
            Filter: {activeFilter}
            <Icon
              icon="mdi:chevron-down"
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors hover:bg-gray-50 ${
                    activeFilter === filter
                      ? "text-primary-color bg-blue-50"
                      : "text-gray-600"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        <DataTable
          ColumnsData={view?.ColumnsData}
          tableRows={paginatedData}
          roundedHeader={true}
          paginate={true}
          meta={meta}
          setCurrentPage={setCurrentPage}
          TableBodyRow={({
            Name,
            ID,
            Period,
            Date,
            Consultations,
            id,
            Time,
          }: viewType) => (
            <tr key={id} className="">
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Name || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {ID || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Date || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg whitespace-nowrap text-desc-color">
                {Time || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Period || "-"}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Consultations || "-"}
              </td>
              {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color flex gap-2 items-center">
             
              <Typography className="text-primary-color underline font-semibold cursor-pointer">Book</Typography>
              <Typography className="text-red underline font-semibold cursor-pointer">Cancel</Typography>
            </td> */}
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default VeiwAsPatient;
