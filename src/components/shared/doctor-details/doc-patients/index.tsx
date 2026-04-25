"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import { DocPatient } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { docData, docPatients, doctData } from "@/data";
import { Button } from "../../button";
import { Typography } from "../../typography";

const DocPatients = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    docPatients?.RowsData,
  );
  const [activeFilter, setActiveFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setShowDropdown(false);

    if (filter === "All") {
      setFilteredPatientData(docPatients?.RowsData);
    } else {
      const filteredData = docPatients?.RowsData.filter(
        (row) => row.Status === filter,
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
    <div className="h-full w-full flex flex-col pb-1 overflow-x-hidden mt-5 bg-white rounded-2xl">
      <div className="flex p-6 flex-wrap gap-8 items-center">
        {doctData.map((activity, i) => (
          <div
            key={i}
            className="bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] w-[180px] rounded-2xl p-6 space-y-3 max-sm:w-full max-sm:text-center"
          >
            <div className="rounded-full bg-primary-color h-11 w-11 flex justify-center items-center max-sm:mx-auto">
              <Icon
                icon={activity.icon}
                width="24"
                height="24"
                className="text-white"
              />
            </div>
            <Typography size="h4" as="h4">
              {activity.title}
            </Typography>
            <Typography>{activity.desc}</Typography>
          </div>
        ))}
      </div>
      {/* Top Buttons */}
      <div className="flex max-md:flex-col max-md:items-start items-center justify-end px-4 gap-4 md:px-6 pt-4 md:pt-6 relative">
        {/* Dropdown Filter Button */}
        <div className="relative">
          <Button
            className="bg-background-color3 flex items-center justify-center rounded-lg gap-2  font-medium"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {activeFilter === "All" ? "Recently consulted" : activeFilter}
            <Icon
              icon={showDropdown ? "mdi:chevron-up" : "mdi:chevron-down"}
              className="text-primary-color"
              width="18"
              height="18"
            />
          </Button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-[185px] bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {["All", "Active", "Inactive", "Recently consulted"].map(
                (opt) => (
                  <div
                    key={opt}
                    onClick={() => handleFilterChange(opt)}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      activeFilter === opt
                        ? "text-primary-color font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    {opt}
                  </div>
                ),
              )}
            </div>
          )}
        </div>

        {/* Export Button */}
        <Button className="bg-primary-color text-white  flex items-center justify-center rounded-lg">
          Export CSV / PDF
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        ColumnsData={docPatients?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={({
          fname,
          Idx,
          address,
          phone,
          email,
          date,
          id,
          Status,
        }: DocPatient) => (
          <tr key={id}>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {fname || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Idx || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {address || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {phone || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {email || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {date || "-"}
            </td>

            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg flex gap-1 items-center ${
                Status === "Inactive"
                  ? "text-red"
                  : Status === "Active"
                    ? "text-secondary-color"
                    : Status === "Recently consulted"
                      ? "text-[#f2994a]"
                      : ""
              }`}
            >
              {Status || "-"}
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default DocPatients;
