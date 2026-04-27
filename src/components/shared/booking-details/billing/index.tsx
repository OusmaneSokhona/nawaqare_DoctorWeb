"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { payments } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { Button } from "../../button";
import { paymentsTable } from "@/data";
import { Icon } from "@iconify/react";
import { Typography } from "../../typography";

const stats = [
  {
    icon: "solar:dollar-bold",
    stat: "1k",
    title: "Total Earning",
  },
  {
    icon: "heroicons-solid:receipt-refund",
    stat: "$40",
    title: "Pending payouts",
  },
];

const BillingPayment = () => {
  const router = useRouter();

  // Filters
  const [statusFilter, setStatusFilter] = useState("Status");
  const [dateFilter, setDateFilter] = useState("Date");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  // Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [methodFilter, setMethodFilter] = useState("Method");
  const [isMethodOpen, setIsMethodOpen] = useState(false);

  // ✅ Filter logic (fixed)
  const filteredPatientData = useMemo(() => {
    let filtered = [...paymentsTable.rowsData];
    const now = new Date();

    // Helper: convert dd/mm/yyyy → valid Date
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    // ✅ Status Filter
    if (statusFilter !== "Status") {
      filtered = filtered.filter((item) =>
        item.Status?.toLowerCase().includes(statusFilter.toLowerCase()),
      );
    }

    // ✅ Date Range Filter
    if (dateFilter !== "Date") {
      if (dateFilter === "Last 7 Days") {
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);
        filtered = filtered.filter(
          (item) =>
            parseDate(item.Date) >= last7 && parseDate(item.Date) <= now,
        );
      } else if (dateFilter === "Last 30 Days") {
        const last30 = new Date();
        last30.setDate(now.getDate() - 30);
        filtered = filtered.filter(
          (item) =>
            parseDate(item.Date) >= last30 && parseDate(item.Date) <= now,
        );
      } else if (dateFilter === "Last year") {
        const lastYear = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate(),
        );
        filtered = filtered.filter(
          (item) =>
            parseDate(item.Date) >= lastYear && parseDate(item.Date) <= now,
        );
      }
    }

    // ✅ Method Filter
    if (methodFilter !== "Method") {
      filtered = filtered.filter(
        (item) => item.Method?.toLowerCase() === methodFilter.toLowerCase(),
      );
    }

    return filtered;
  }, [statusFilter, dateFilter, methodFilter]);

  // Pagination logic
  const paginatedData = filteredPatientData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div>
      <div className="pt-5 flex flex-wrap gap-5 items-center">
        {stats.map((activity, i) => (
          <div
            key={i}
            className="bg-white transition-transform duration-300 ease-in-out
                hover:-translate-y-2 hover:shadow-lg shadow-sm w-[190px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
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

      <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-5 bg-background-color4 rounded-2xl">
        <Typography size="h4" className=" px-6 pt-3">
          Payment History
        </Typography>
        {/* ---------- Filters Section ---------- */}
        <div className="flex flex-wrap items-center justify-between px-4 md:px-6 pt-2 md:pt-0 gap-3">
          <div className="flex items-center gap-5 relative">
            {/* Method Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsMethodOpen(!isMethodOpen);
                  setIsStatusOpen(false);
                  setIsDateOpen(false);
                }}
                className="flex items-center justify-between w-40 border border-border-color bg-border-color rounded-md px-4 py-2 text-gray-700"
              >
                <span>{methodFilter}</span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`transition-transform ${
                    isMethodOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {isMethodOpen && (
                <div className="absolute left-0 mt-1 w-40 bg-white shadow-lg border border-gray-200 rounded-md z-10">
                  {[
                    "Method",
                    "Visa Card",
                    "Paypal",
                    "Payoneer",
                    "Stripe",
                    "MasterCard",
                    "Bank Transfer",
                    "-",
                  ].map((method) => (
                    <div
                      key={method}
                      onClick={() => {
                        setMethodFilter(method);
                        setIsMethodOpen(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        methodFilter === method ? "bg-gray-100" : ""
                      }`}
                    >
                      {method}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Range Dropdown */}
            <div className="relative">
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
                    ),
                  )}
                </div>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setIsDateOpen(false);
                }}
                className="flex items-center justify-between w-36 border border-border-color bg-border-color rounded-md px-4 py-2 text-gray-700"
              >
                <span>{statusFilter || "Status"}</span>
                <Icon
                  icon="mdi:chevron-down"
                  className={`transition-transform ${
                    isStatusOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isStatusOpen && (
                <div className="absolute left-0 mt-1 w-36 bg-white shadow-lg border border-gray-200 rounded-md z-10">
                  {["Status", "Paid", "Refund", "Failed"].map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsStatusOpen(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        statusFilter === status ? "bg-gray-100" : ""
                      }`}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Download Button */}
          <div className="bg-primary-color rounded-xl text-white">
            <Button className="flex gap-2 items-center">
              <Icon
                icon="material-symbols:login-rounded"
                width="20"
                height="20"
                className="text-white"
              />
              Download Invoice
            </Button>
          </div>
        </div>

        {/* ---------- Table ---------- */}
        <DataTable
          ColumnsData={paymentsTable.ColumnsData}
          tableRows={paginatedData}
          roundedHeader={true}
          paginate={true}
          TableBodyRow={({
            id,
            paidBy,
            Date,
            Method,
            Amount,
            Status,
            transactionID,
          }: payments) => (
            <tr key={id} className={`hover:bg-white transition`}>
              <td className="px-4 lg:px-6 py-4 text-start text-lg font-medium text-desc-color">
                {paidBy}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {transactionID}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Date}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg font-medium text-desc-color flex items-center gap-1.5">
                <Icon
                  icon={
                    Method === "Visa Card"
                      ? "formkit:visa"
                      : Method === "Paypal"
                        ? "ic:sharp-paypal"
                        : Method === "Payoneer"
                          ? "simple-icons:payoneer"
                          : Method === "Stripe"
                            ? "mage:stripe"
                            : "lineicons:mastercard"
                  }
                  width="16"
                  height="16"
                />
                {Method}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg font-medium text-desc-color">
                {Amount}
              </td>
              <td
                className={`px-4 lg:px-6 py-4 text-start text-lg font-medium flex items-center gap-1 ${
                  Status === "Failed"
                    ? "text-red"
                    : Status === "Paid"
                      ? "text-secondary-color"
                      : Status === "Refunded"
                        ? "text-[#F2994A]"
                        : ""
                }`}
              >
                <Icon
                  icon={
                    Status === "Failed"
                      ? "maki:cross"
                      : Status === "Paid"
                        ? "mdi:tick-circle"
                        : Status === "Refunded"
                          ? "lets-icons:refund-back"
                          : ""
                  }
                  width="16"
                  height="16"
                />
                {Status || "-"}
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

export default BillingPayment;
