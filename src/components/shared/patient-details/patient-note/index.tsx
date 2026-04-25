"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ConsultationsTYpe, PrescriptionTYpe } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { bookedCOnsultations, noteData, PrescriptionData } from "@/data";
import { Icon } from "@iconify/react";
import SearchInput from "../../search-bar";
import { Button } from "../../button";
import ClinicalNoteModal from "../ClinicalNoteModel";

const Notes = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    noteData?.RowsData,
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const router = useRouter();

  const [open, setOpen] = useState(false);
  // ✅ Handle filter selection
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setFilterOpen(false);

    if (filter === "All") {
      setFilteredPatientData(noteData?.RowsData);
    } else {
      const filteredData = noteData?.RowsData.filter(
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
      <div className="flex items-center max-md:flex-col max-md:gap-3 justify-between px-4 md:px-6 pt-4 md:pt-6 relative">
        <div className="flex items-center gap-5">
          <SearchInput placeholder="Search by note type/ author" />
        </div>

        <div className="flex items-center gap-3">
          <div
            onClick={() => setOpen(true)}
            className="bg-primary-color rounded-lg text-white"
          >
            <Button className="flex gap-2 items-center">
              Add Clinical Note
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4 px-6">
        {/* ✅ Filter Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center justify-between gap-1 rounded-lg bg-background-color3 text-md text-[#2C2C2C] px-1.5 py-2"
          >
            {activeFilter === "All" ? "Note type" : activeFilter}
            <Icon
              icon={filterOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
              height="20"
            />
          </button>

          {filterOpen && (
            <div className="absolute left-0 mt-2 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {["All", "Consultation", "Follow up", "Blood test"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      activeFilter === option ? "bg-gray-100 font-semibold" : ""
                    }`}
                  >
                    {option}
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        {/* Date filter */}
        <div className="relative">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="flex items-center justify-between gap-1 rounded-lg bg-background-color3 text-md text-[#2C2C2C] px-1.5 py-2"
          >
            {selectedDate || "Date"}
            <Icon
              icon={showDateDropdown ? "mdi:chevron-up" : "mdi:chevron-down"}
              className={`text-gray-600 transition-transform duration-200 ${
                showDateDropdown ? "rotate-180" : "rotate-0"
              }`}
              width="18"
            />
          </button>
          {showDateDropdown && (
            <div className="absolute mt-2 bg-white border rounded shadow p-2 z-50 w-24">
              {/* {[...new Set(noteData.RowsData.map((d) => d.Appointment))].map(
                (d) => (
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
                   )
              )} */}
              <div
                className="px-3 py-1 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedDate(null);
                  setFilteredPatientData(noteData.RowsData);
                  setShowDateDropdown(false);
                }}
              >
                Clear
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Data Table */}
      <DataTable
        ColumnsData={noteData?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={({
          noteType,
          doctorName,
          consultationType,
          prescriptionType,
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
              {noteType || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Appointment || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {update || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {doctorName || "-"}
            </td>

            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                Status === "Finalized"
                  ? "text-secondary-color"
                  : Status === "Draft"
                    ? "text-primary-color"
                    : Status === "Delivered"
                      ? "text-secondary-color"
                      : "text-red"
              }`}
            >
              {Status || "-"}
            </td>
            <td
              style={{ position: "sticky", right: 0, zIndex: 20 }}
              className="px-6 py-4 flex gap-2 bg-background-color4"
            >
              <Icon
                icon="mdi:eye"
                width="20"
                className="cursor-pointer text-primary-color"
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
      <ClinicalNoteModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Notes;
