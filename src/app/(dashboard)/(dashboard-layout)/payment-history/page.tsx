"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { paymentss } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { paymentTable } from "@/data";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { getDoctorPayments } from "@/api/service/dashboard";

const PaymentsPage = () => {
  const router = useRouter();
  const [apiSummary, setApiSummary] = useState<any>(null);
  const [apiPayments, setApiPayments] = useState<any[]>([]);

  useEffect(() => {
    getDoctorPayments()
      .then((data: any) => {
        if (data?.summary) setApiSummary(data.summary);
        if (Array.isArray(data?.payments)) setApiPayments(data.payments);
      })
      .catch(() => {});
  }, []);

  const stats = [
    { icon: "tdesign:undertake-transaction-filled", stat: apiSummary?.total_transactions ?? "—", title: "Total Transactions" },
    { icon: "mdi:tick-circle", stat: apiSummary?.total_captured ?? "—", title: "Successful" },
    { icon: "carbon:close-filled", stat: apiSummary?.refunded ?? "—", title: "Refunded" },
    { icon: "fluent:money-16-filled", stat: apiSummary?.pending ?? "—", title: "Pending" },
    { icon: "gg:dollar", stat: apiSummary?.balance_xof ? `${apiSummary.balance_xof.toLocaleString()} FCFA` : "—", title: "Total Capturé" },
  ];

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
  const uniquePatients = Array.from(
    new Set(paymentTable.rowsData.map((r) => r.Patient)),
  );
  const uniqueOrders = Array.from(
    new Set(paymentTable.rowsData.map((r) => r.Order)),
  );

  // ✅ Filter logic (extended)
  const filteredPatientData = useMemo(() => {
    let filtered = [...paymentTable.rowsData];
    const now = new Date();

    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    // Status Filter
    if (statusFilter !== "Status") {
      filtered = filtered.filter((item) =>
        item.Status?.toLowerCase().includes(statusFilter.toLowerCase()),
      );
    }

    // Date Range Filter
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

    // ✅ Patient Filter
    if (patientFilter !== "Patient") {
      filtered = filtered.filter(
        (item) => item.Patient.toLowerCase() === patientFilter.toLowerCase(),
      );
    }

    // ✅ Order Filter
    if (orderFilter !== "Order") {
      filtered = filtered.filter(
        (item) => item.Order.toLowerCase() === orderFilter.toLowerCase(),
      );
    }

    return filtered;
  }, [statusFilter, dateFilter, patientFilter, orderFilter]);

  // Pagination logic
  const paginatedData = filteredPatientData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // const getPaymentMethodIcon = (method?: string) => {
  //   if (!method) return "mdi:cash";

  //   switch (method.toLowerCase()) {
  //     case "payoneer":
  //       return "simple-icons:payoneer";

  //     case "visa":
  //     case "visa card":
  //       return "mage:visa-square";

  //     case "mastercard":
  //       return "logos:mastercard";

  //     case "Insur Health":
  //       return "streamline-plump:insurance-hand-solid";

  //     case "stripe":
  //       return "logos:stripe";

  //     case "bank":
  //     case "bank transfer":
  //       return "mdi:bank";

  //     default:
  //       return "mdi:credit-card-outline";
  //   }
  // };

  const getPaymentMethodIcon = (method?: string) => {
    if (!method || method.trim() === "") return null;

    switch (method.toLowerCase()) {
      case "payoneer":
        return "simple-icons:payoneer";

      case "visa":
      case "visa card":
        return "mage:visa-square";

      case "mastercard":
        return "logos:mastercard";

      case "insur health":
        return "streamline-plump:insurance-hand-solid";

      case "stripe":
        return "logos:stripe";

      case "bank":
      case "bank transfer":
        return "mdi:bank";

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center max-md:flex-col max-md:gap-3 justify-between pt-4 pb-4">
        <div>
          <Typography size="h3" as="h3">
            Payment History
          </Typography>
          <Typography size="lg" className="text-desc-color">
            Track and audit all financial transactions across patients, doctors,
            and pharmacies.
          </Typography>
        </div>
        <Button className=" flex items-center justify-center rounded-xl bg-primary-color max-md:self-end">
          <Typography className="text-white">Generate Report</Typography>
        </Button>
      </div>

      {/* ---------- Stats ---------- */}
      <div className="pt-5 flex flex-wrap gap-5 items-center">
        {stats.map((activity, i) => (
          <div
            key={i}
            className="bg-white shadow-md  transition-all duration-300 ease-in-out
             hover:-translate-y-3 hover:shadow-xl
             cursor-pointer w-[190px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
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

      {/* ---------- Table ---------- */}
      <div className="h-full w-full flex flex-col gap-5 pb-1 overflow-x-hidden mt-5 bg-background-color4 rounded-2xl">
        {/* ---------- Filters Section ---------- */}
        <div className="flex flex-wrap items-center justify-between px-4 md:px-6 pt-4 md:pt-6 gap-3">
          {/* Left side filters */}
          <div className="flex flex-wrap gap-3 relative">
            {/* Date Filter */}
            {/* <Dropdown
              label={dateFilter}
              options={["Date", "Last 7 Days", "Last 30 Days", "Last year"]}
              isOpen={isDateOpen}
              setIsOpen={setIsDateOpen}
              onSelect={setDateFilter}
            /> */}

            {/* Patient Filter */}
            <Dropdown
              label={patientFilter}
              options={["Patient", ...uniquePatients]}
              isOpen={isPatientOpen}
              setIsOpen={setIsPatientOpen}
              onSelect={setPatientFilter}
            />

            {/* Order Filter */}
            <Dropdown
              label={orderFilter}
              options={["Order", ...uniqueOrders]}
              isOpen={isOrderOpen}
              setIsOpen={setIsOrderOpen}
              onSelect={setOrderFilter}
            />

            {/* Status Filter */}
            <Dropdown
              label={statusFilter}
              options={["Status", "Paid", "Refund", "Failed"]}
              isOpen={isStatusOpen}
              setIsOpen={setIsStatusOpen}
              onSelect={setStatusFilter}
            />
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-2 items-center text-md">
            <button className="flex items-center gap-2 px-6 py-3  bg-[#EAE8ED] text-[#2c2c2c] font-bold rounded-xl transition-all hover:bg-gray-300 whitespace-nowrap">
              <Icon
                icon="tdesign:export"
                width="20"
                height="20"
                className="rotate-180" // Export look ke liye icon ko rotate kiya
              />
              Export CSV / PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white font-bold rounded-xl transition-all hover:opacity-90 shadow-sm whitespace-nowrap">
              <Icon icon="material-symbols:download" width="20" height="20" />
              Download Invoice
            </button>
          </div>
        </div>

        {/* ---------- Table Data ---------- */}
        <DataTable
          ColumnsData={paymentTable.ColumnsData}
          tableRows={paginatedData}
          roundedHeader={true}
          paginate={true}
          TableBodyRow={({
            id,
            Patient,
            Date,
            Method,
            Amount,
            Order,
            Status,
            Type,
            Platform,
            Commission,
          }: paymentss) => (
            <tr key={id} className="hover:bg-white transition">
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color whitespace-nowrap">
                {Patient}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Date}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Type}
              </td>
              {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Method}
              </td> */}
              {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color flex items-center gap-2">
                <Icon
                  icon={getPaymentMethodIcon(Method)}
                  width="22"
                  height="22"
                />
                <span>{Method}</span>
              </td> */}
              {/* <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color flex items-center gap-2">
                {getPaymentMethodIcon(Method) && (
                  <Icon
                    icon={getPaymentMethodIcon(Method)!}
                    width="22"
                    height="22"
                  />
                )}
                {Method || "-"}
              </td> */}
              <td className="px-4 lg:px-6 py-4 text-start text-lg font-medium text-desc-color flex items-center whitespace-nowrap gap-1.5">
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

              <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                {Order}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                {Amount}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                {Platform}
              </td>
              <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                {Commission}
              </td>
              {/* <td
                className={`px-4 lg:px-6 py-4 text-start text-lg ${
                  Status === "Failed"
                    ? "text-red"
                    : Status === "Paid"
                      ? "text-secondary-color"
                      : Status === "Refunded"
                        ? "text-[#F2994A]"
                        : ""
                }`}
              >
                {Status || "-"}
              </td> */}
              <td
                className={`px-4 lg:px-6 py-4 text-start text-lg font-medium flex items-center gap-1 whitespace-nowrap ${
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
              <td
                style={{ position: "sticky", right: 0, zIndex: 20 }}
                className="px-4 lg:px-6 py-4 text-start text-lg bg-white"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:format-list-bulleted-rounded"
                    width="20"
                    height="20"
                    className="cursor-pointer text-primary-color"
                    onClick={() =>
                      router.push(`/payment-history/details?id=${id}`)
                    }
                  />
                  <Icon
                    icon="ph:dots-three-vertical"
                    width="20"
                    height="20"
                    className="cursor-pointer text-primary-color"
                  />
                </div>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};

/* ✅ Reusable dropdown component */
const Dropdown = ({
  label,
  options,
  isOpen,
  setIsOpen,
  onSelect,
}: {
  label: string;
  options: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (option: string) => void;
}) => (
  <div className="relative">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center justify-between  border border-border-color bg-border-color rounded-md px-4 py-2 text-gray-700"
    >
      <span>{label}</span>
      <Icon
        icon="mdi:chevron-down"
        className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
      />
    </button>
    {isOpen && (
      <div className="absolute left-0 mt-1 w-36 bg-white shadow-lg border border-gray-200 rounded-md z-10">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
              label === option ? "bg-gray-100" : ""
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default PaymentsPage;
