"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AllDoctorsType } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { allDoctors } from "@/data";
import { Icon } from "@iconify/react";
import { Button } from "@/components/shared/button";
import FilterDropdown from "@/components/sections/filter-dropdown";

const DoctorsPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    speciality: "All",
    verification: "All",
    language: "All",
  });

  const filteredDoctors = allDoctors.RowsData.filter((row) => {
    return (
      filters.speciality === "All" || row.Specialty === filters.speciality

      // &&
      // (filters.verification === "All" ||
      //   row.verification === filters.verification) &&
      // (filters.language === "All" || row.language === filters.language)
    );
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = filteredDoctors.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const meta = {
    totalItems: filteredDoctors.length,
    itemsPerPage: rowsPerPage,
    currentPage,
    totalPages: Math.ceil(filteredDoctors.length / rowsPerPage),
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden relative">
      <div className="flex justify-between max-md:flex-col max-md:gap-3 items-center">
        <div>
          <Typography size="h3" as="h3" className="font-bold">
            All Doctors
          </Typography>
          <Typography size="lg" className="text-desc-color">
            Manage doctor accounts, compliance status, and professional
            validation.
          </Typography>
        </div>

        <Button className="px-4 py-4 font-bold bg-primary-dark rounded-xl  text-white">
          Export CSV / PDF
        </Button>
      </div>

      <div className="flex items-center gap-3 relative">
        <FilterDropdown
          label="Speciality"
          value={filters.speciality}
          options={["All", "Cardiology", "Neurology", "Orthopedics"]}
          onSelect={(val: any) => updateFilter("speciality", val)}
        />
        <FilterDropdown
          label="Verification"
          value={filters.verification}
          options={["All", "Verified", "Not Verified"]}
          onSelect={(val: any) => updateFilter("verification", val)}
        />
        <FilterDropdown
          label="Language"
          value={filters.language}
          options={["All", "English", "Arabic", "French"]}
          onSelect={(val: any) => updateFilter("language", val)}
        />
      </div>

      {/* ---------------- TABLE ---------------- */}
      <DataTable
        ColumnsData={allDoctors?.ColumnsData}
        tableRows={paginatedData}
        roundedHeader={true}
        paginate={true}
        meta={meta}
        setCurrentPage={setCurrentPage}
        TableBodyRow={({
          fname,
          login,
          Specialty,
          phoneNo,
          email,
          consultationType,
          cStatus,
          consulCompleted,
          Rating,
          id,
          status,
        }: AllDoctorsType) => (
          <tr key={id}>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {fname || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {login || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Specialty || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg whitespace-nowrap text-desc-color">
              {phoneNo || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg whitespace-nowrap text-desc-color">
              {cStatus || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {email || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {consulCompleted || "-"}
            </td>
            <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Rating || "-"}
            </td>
            {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
              {Rating || "-"}
            </td> */}
            <td
              className={`px-4 flex gap-2 items-center lg:px-6 py-4 text-start text-lg ${
                status?.toLowerCase() === "validated"
                  ? "text-secondary-color"
                  : status?.toLowerCase() === "under verification"
                    ? "text-[#F2994A]"
                    : status?.toLowerCase() === "suspended"
                      ? "text-red"
                      : "text-[#828282]"
              }`}
            >
              {status || "-"}
              {/* <Icon
                icon="ic:baseline-message"
                width="20"
                height="20"
                className="cursor-pointer text-primary-color"
              /> */}
              {/* <Icon
                icon="mingcute:user-edit-fill"
                width="20"
                height="20"
                className="cursor-pointer text-primary-color"
                onClick={() => router.push(`/doctors/edit?id=${id}`)}
              /> */}
              <Icon
                icon="mdi:eye"
                width="20"
                height="20"
                className="cursor-pointer text-primary-color flex-shrink-0"
                onClick={() => router.push(`/doctors/details?id=${id}`)}
              />
            </td>
          </tr>
        )}
      />
    </div>
  );
};

export default DoctorsPage;
