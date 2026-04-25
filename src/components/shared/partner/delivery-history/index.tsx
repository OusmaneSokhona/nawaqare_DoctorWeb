"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import type {
  DelivereyHistory,
  InternalContacts,
  InternalContacts as InternalContactsType,
} from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { deliverey, internalContact, paymentTable } from "@/data";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";

const stats = [
  {
    icon: "streamline:waiting-appointments-calendar-solid",
    stat: "22",
    title: "Total deliveries",
  },
  {
    icon: "icon-park-solid:prescription",
    stat: "60%",
    title: "Success rate",
  },
  //   {
  //     icon: "carbon:close-filled",
  //     stat: "5",
  //     title: "Refunded",
  //   },
  //   {
  //     icon: "fluent:money-16-filled",
  //     stat: "40%",
  //     title: "Total Revenue",
  //   },
  //   {
  //     icon: "gg:dollar",
  //     stat: "$456",
  //     title: "Platform Earnings",
  //   },
];

const DelivereyHistory = () => {
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

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Unique Patient & Order options for filters
  //   const uniquePatients = Array.from(new Set(paymentTable.rowsData.map((r) => r.Patient)));
  //   const uniqueOrders = Array.from(new Set(paymentTable.rowsData.map((r) => r.Order)));

  // ✅ Filter logic (extended)
  const filteredPatientData = useMemo(() => {
    let filtered = [...deliverey.rowsData];
    const now = new Date();

    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    return filtered;
  }, [statusFilter, dateFilter, patientFilter, orderFilter]);

  // Pagination logic
  const paginatedData = filteredPatientData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="px-8 max-md:px-2 max-md:py-4 py-10">
      <div className="flex  items-center max-md:flex-col max-md:gap-3 justify-between">
        <div>
          <Typography size="h5" as="h5">
            Delivery History
          </Typography>
        </div>
        {/* <Button className=" flex items-center justify-center rounded-xl bg-primary-color">
          <Typography className="text-white">+ Add Contact</Typography>
        </Button> */}
      </div>

      {/* ---------- Stats ---------- */}
      <div className="pt-5 flex flex-wrap gap-5 items-center">
        {stats.map((activity, i) => (
          <div
            key={i}
            className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] w-[190px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
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
              {activity.stat}
            </Typography>
            <Typography>{activity.title}</Typography>
          </div>
        ))}
      </div>
      <Typography size="h5" as="h5" className="pt-7">
        Last 10 deliveries
      </Typography>
      {/* ---------- Table ---------- */}
      <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-4 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-2xl">
        {/* ---------- Table Data ---------- */}
        <DataTable
          ColumnsData={deliverey.ColumnsData}
          tableRows={paginatedData}
          roundedHeader={true}
          paginate={true}
          TableBodyRow={({
            id,
            Name,
            Role,
            Phone,
            Email,
            Status,
          }: DelivereyHistory) => (
            <tr key={id} className="hover:bg-white transition">
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Name}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Role}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Phone}
              </td>
              <td
                className={`px-4 lg:px-6 py-4 text-start text-lg ${
                  Status === "Failed"
                    ? "text-red"
                    : Status === "Success"
                      ? "text-secondary-color"
                      : Status === "Pending"
                        ? "text-[#F2994A]"
                        : ""
                }`}
              >
                {Status || "-"}
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default DelivereyHistory;
