"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ConsultationsTYpe, PrescriptionTYpe } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { bookedCOnsultations, PrescriptionData } from "@/data";
import { Icon } from "@iconify/react";
import SearchInput from "../../search-bar";
import { Button } from "../../button";
import { useIsMobile } from "@/hooks/useIsMobile";

const Prescriptions = () => {
  const [filteredPatientData, setFilteredPatientData] = useState(
    PrescriptionData?.RowsData,
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [consultationFilter, setConsultationFilter] = useState("All");
  const [pharmacyFilter, setPharmacyFilter] = useState("All");
  const [prescriptionFilter, setPrescriptionFilter] = useState("All");
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [pharmacyOpen, setPharmacyOpen] = useState(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState(false);

  const router = useRouter();

  const applyAllFilters = (
    status = activeFilter,
    consultation = consultationFilter,
    pharmacy = pharmacyFilter,
    prescription = prescriptionFilter,
  ) => {
    let data = [...PrescriptionData.RowsData];

    if (status !== "Alld") {
      const today = new Date();
      let startDate = new Date();

      if (status === "Last 7 days") {
        startDate.setDate(today.getDate() - 7);
      } else if (status === "Last 14 days") {
        startDate.setDate(today.getDate() - 14);
      } else if (status === "Last 1 month") {
        startDate.setMonth(today.getMonth() - 1);
      }

      data = data.filter((item) => {
        // Convert DD/MM/YYYY to Date
        const [day, month, year] = item.update.split("/");
        const consultationDate = new Date(`${year}-${month}-${day}`);

        return consultationDate >= startDate && consultationDate <= today;
      });
    }

    if (consultation !== "All") {
      data = data.filter(
        (row) =>
          row.consultationType?.toLowerCase() === consultation.toLowerCase(),
      );
    }

    if (pharmacy !== "All") {
      data = data.filter(
        (row) => row.Pharmacy?.toLowerCase() === pharmacy.toLowerCase(),
      );
    }

    if (prescription !== "All") {
      data = data.filter(
        (row) =>
          row.prescriptionType?.toLowerCase() === prescription.toLowerCase(),
      );
    }

    setFilteredPatientData(data);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setFilterOpen(false);
    applyAllFilters(filter);
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
      <div className="flex items-center max-md:flex-col max-md:gap-3 justify-between px-4 md:px-6 pt-4 md:pt-6 relative">
        <div className="flex items-center gap-5">
          <SearchInput
            width={isMobile ? "280" : "585"}
            placeholder="Search by doctor/date/specialty"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* ✅ Export Button */}
          <div className="bg-primary-color rounded-lg text-white">
            <Button className="flex gap-2 items-center">
              <Icon
                icon="material-symbols:login-rounded"
                width="20"
                height="20"
                className="text-white"
              />
              Export CSV / PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2 px-6">
        {/* ✅ Filter Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-1 bg-[#EAEEF7] text-md text-[#2C2C2C] px-1.5 py-2 rounded-lg  font-medium"
          >
            {activeFilter === "All" ? "Date range" : activeFilter}
            <Icon
              icon={filterOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
              height="20"
            />
          </button>

          {filterOpen && (
            <div className="absolute mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {["All", "Last 7 days", "Last 14 month", "Last 1 month"].map(
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

        <div className="relative">
          <button
            onClick={() => setConsultationOpen(!consultationOpen)}
            className="flex items-center gap-1 bg-[#EAEEF7] text-md text-[#2C2C2C] px-1.5 py-2 rounded-lg font-medium"
          >
            {consultationFilter === "All"
              ? "Consultation Type"
              : consultationFilter}
            <Icon
              icon={consultationOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
              height="20"
            />
          </button>

          {consultationOpen && (
            <div className="absolute mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {["All", "Remote", "In-Person"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setConsultationFilter(option);
                    setConsultationOpen(false);
                    applyAllFilters(
                      activeFilter,
                      option,
                      pharmacyFilter,
                      prescriptionFilter,
                    );
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    consultationFilter === option
                      ? "bg-gray-100 font-semibold"
                      : ""
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
            onClick={() => setPharmacyOpen(!pharmacyOpen)}
            className="flex items-center gap-1 bg-[#EAEEF7] text-md text-[#2C2C2C] px-1.5 py-2 rounded-lg font-medium"
          >
            {pharmacyFilter === "All" ? "Pharmacy Status" : pharmacyFilter}
            <Icon
              icon={pharmacyOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
              height="20"
            />
          </button>

          {pharmacyOpen && (
            <div className="absolute mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {["All", "Pending", "Rejected", "Validated"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPharmacyFilter(option);
                    setPharmacyOpen(false);
                    applyAllFilters(
                      activeFilter,
                      consultationFilter,
                      option,
                      prescriptionFilter,
                    );
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    pharmacyFilter === option ? "bg-gray-100 font-semibold" : ""
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
            onClick={() => setPrescriptionOpen(!prescriptionOpen)}
            className="flex items-center gap-1 bg-[#EAEEF7] text-md text-[#2C2C2C] px-1.5 py-2 rounded-lg font-medium"
          >
            {prescriptionFilter === "All"
              ? "Prescription Type"
              : prescriptionFilter}
            <Icon
              icon={prescriptionOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
              width="20"
              height="20"
            />
          </button>

          {prescriptionOpen && (
            <div className="absolute mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {["All", "Scanned", "E-Prescription"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPrescriptionFilter(option);
                    setPrescriptionOpen(false);
                    applyAllFilters(
                      activeFilter,
                      consultationFilter,
                      pharmacyFilter,
                      option,
                    );
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    prescriptionFilter === option
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Data Table */}
      <DataTable
        ColumnsData={PrescriptionData?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={({
          patientName,
          doctorName,
          consultationType,
          prescriptionType,
          Specialty,
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
              {patientName || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {doctorName || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {consultationType || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {prescriptionType || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {update || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Medications || "-"}
            </td>
            {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
              {Specialty || "-"}
            </td> */}
            {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
              {Duration || "-"}
            </td> */}
            {/* <td className="px-4 lg:px-6 py-4 text-start text-xs text-desc-color">
              {Pharmacy || "-"}
            </td> */}
            {/* <td
              className={`px-4 lg:px-6 py-4 text-start text-xs ${
                Pharmacy === "Completed"
                  ? "text-secondary-color"
                  : "text-[#F2994A]"
              }`}
            >
              {Pharmacy || "-"}
            </td> */}
            {/* <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                Pharmacy?.toString().trim() === "Validated"
                  ? "text-secondary-color"
                  : "text-[#F2994A]"
              }`}
            >
              {Pharmacy || "-"}
            </td> */}
            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                Pharmacy === "Validated"
                  ? "text-secondary-color"
                  : Pharmacy === "Pending"
                    ? "text-[#F2994A]"
                    : Pharmacy === "Prepared"
                      ? "text-primary-color"
                      : "text-red"
              }`}
            >
              {Pharmacy || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              ABC Pharmacy
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              #LOG-**021
            </td>
            <td
              className={`px-4 lg:px-6 py-4 text-start text-lg ${
                Status === "Not started"
                  ? "text-[#F2994A]"
                  : Status === "In transit"
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
              <div className="bg-[#2F80ED] rounded">
                <Icon
                  icon="material-symbols:subject-rounded"
                  width="20"
                  className="cursor-pointer text-white"
                />
              </div>
              <Icon
                icon="material-symbols:pause-rounded"
                width="22"
                className="cursor-pointer text-primary-color"
              />
              <Icon
                icon="material-symbols:sync-alt"
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

export default Prescriptions;
