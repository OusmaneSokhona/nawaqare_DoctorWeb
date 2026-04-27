"use client";

import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { prescription } from "@/types/dashboard";
import DataTable from "@/components/shared/data-table";
import { prescriptionTable } from "@/data";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import Delivered from "@/components/shared/prescription/devlivered";
import Pending from "@/components/shared/prescription/pending";
import { Button } from "@/components/shared/button";
import { getDoctorPrescriptions } from "@/api/service/dashboard";

const stats = [
  {
    icon: "streamline:waiting-appointments-calendar",
    stat: "12.4%",
    title: "Rejection Rate by Pharmacies",
  },
  {
    icon: "mingcute:time-fill",
    stat: "1h 23m",
    title: "Avg Pharmacy Validation Time",
  },
  { icon: "solar:delivery-bold", stat: "4h 52m", title: "Avg Delivery Time" },
  {
    icon: "material-symbols:warning",
    stat: "48",
    title: "At-Risk Prescriptions",
  },
  { icon: "codex:cross", stat: "6.2%", title: "Expired Prescriptions" },
];
const activeStats = [
  {
    icon: "material-symbols:warning",
    stat: "48",
    title: "At-Risk Prescriptions",
  },
  {
    icon: "entypo:circle-with-cross",
    stat: "6.2%",
    title: "Expired Prescriptions",
  },
  {
    icon: "streamline:waiting-appointments-calendar",
    stat: "20",
    title: "Pending Validation",
  },
  {
    icon: "mingcute:time-fill",
    stat: "30",
    title: "Moved",
  },
  { icon: "solar:delivery-bold", stat: "10", title: "Collapsible" },
];

const pendingStats = [
  // {
  //   icon: "ph:dots-three-circle-fill",
  //   stat: "23",
  //   title: "Total Pending Deliveries",
  // },
  // { icon: "solar:delivery-bold", stat: "05", title: "Overdue Deliveries" },
  // {
  //   icon: "mdi:receipt-text-clock-outline",
  //   stat: "08",
  //   title: "On-Time Deliveries",
  // },
  // { icon: "entypo:circle-with-cross", stat: "02", title: "Failed Deliveries" },
  {
    icon: "material-symbols:warning",
    stat: "48",
    title: "At-Risk Prescriptions",
  },
  // {
  //   icon: "streamline:waiting-appointments-calendar",
  //   stat: "12.4%",
  //   title: "Rejection Rate by Pharmacies",
  // },
  {
    icon: "material-symbols:cancel",
    stat: "6.2%",
    title: "Expired Prescriptions",
  },
  { icon: "solar:delivery-bold", stat: "20", title: "Pending validation" },
  // {
  //   icon: "material-symbols:warning",
  //   stat: "48",
  //   title: "At-Risk Prescriptions",
  // },
  // {
  //   icon: "entypo:circle-with-cross",
  //   stat: "6.2%",
  //   title: "Expired Prescriptions",
  // },
];

const Tabs = [
  { title: "Active Prescription(3)", key: "active" },
  // { title: "Delivered Orders", key: "delivered" },
  { title: "Prescription Templates(3)", key: "pending" },
];

const DeliveredOrdersTable = () => (
  <div className="text-center py-1">
    <Delivered />
  </div>
);

const PendingDeliveriesTable = () => (
  <div className="text-center py-1">
    <Pending />
  </div>
);

const Prescription = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(Tabs[0].key);
  const [apiPrescriptions, setApiPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    getDoctorPrescriptions()
      .then((data: any) => {
        if (Array.isArray(data) && data.length > 0) setApiPrescriptions(data);
      })
      .catch(() => {});
  }, []);

  // Filters
  const [doctorFilter, setDoctorFilter] = useState<string>("All");
  const [pharmacyFilter, setPharmacyFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("All");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [rowsPerPage] = useState(10);
  const [currentPage] = useState(1);

  // Filtered Data
  const filteredData = useMemo(() => {
    let data = [...prescriptionTable.rowsData];

    if (doctorFilter !== "All")
      data = data.filter((row) => row.Doctor === doctorFilter);
    if (pharmacyFilter !== "All")
      data = data.filter((row) => row.Pharmacy === pharmacyFilter);
    // if (statusFilter !== "All")
    //   data = data.filter((row) => row.Status === statusFilter);

    if (dateFilter !== "All") {
      const today = new Date();
      data = data.filter((row) => {
        const date = new Date(row.Date);
        const diff = (today.getTime() - date.getTime()) / (1000 * 3600 * 24);
        if (dateFilter === "Today") return diff < 1;
        if (dateFilter === "This Week") return diff <= 7;
        if (dateFilter === "This Month") return diff <= 30;
        return true;
      });
    }

    return data;
  }, [doctorFilter, pharmacyFilter, statusFilter, dateFilter]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // const tabDescriptions: Record<string, string> = {
  //   active: "Prescriptions currently awaiting validation or delivery.",
  //   delivered: "Recently delivered prescription orders.",
  //   pending:
  //     "Prescriptions awaiting delivery confirmation from assigned pharmacies.",
  // };

  const renderTabContent = () => {
    switch (activeTab) {
      case "active":
        return (
          <div className="bg-white rounded-xl mt-5">
            {/* Filters */}
            <div className="p-8 flex justify-between max-md:flex-col max-md:gap-3">
              <div className="flex gap-3">
                {/* Doctor Filter */}
                <div
                  className="w-[180px] flex items-center justify-center bg-[#EAEEF7] rounded-xl relative cursor-pointer"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "doctor" ? null : "doctor")
                  }
                >
                  <Button className="flex items-center gap-1 w-full justify-center">
                    {doctorFilter === "All" ? "Doctor" : doctorFilter}
                    <Icon
                      icon="mdi:chevron-down"
                      width="16"
                      className={`transition-transform duration-300 ${
                        openDropdown === "doctor" ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  {openDropdown === "doctor" && (
                    <div className="absolute top-10 left-0 bg-white shadow-md rounded-md w-40 py-2 z-10">
                      {[
                        "All",
                        ...Array.from(
                          new Set(
                            prescriptionTable.rowsData.map((d) => d.Doctor),
                          ),
                        ),
                      ].map((opt) => (
                        <div
                          key={opt}
                          className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                            doctorFilter === opt
                              ? "text-primary-color font-semibold"
                              : ""
                          }`}
                          onClick={() => {
                            setDoctorFilter(opt);
                            setOpenDropdown(null);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pharmacy Filter */}
                <div
                  className="w-[180px] flex items-center justify-center bg-[#EAEEF7] rounded-xl relative cursor-pointer"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "pharmacy" ? null : "pharmacy",
                    )
                  }
                >
                  <Button className="flex items-center gap-1 w-full justify-center">
                    {pharmacyFilter === "All" ? "Pharmacy" : pharmacyFilter}
                    <Icon
                      icon="mdi:chevron-down"
                      width="16"
                      className={`transition-transform duration-300 ${
                        openDropdown === "pharmacy" ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  {openDropdown === "pharmacy" && (
                    <div className="absolute top-10 left-0 bg-white shadow-md rounded-md w-40 py-2 z-10">
                      {[
                        "All",
                        ...Array.from(
                          new Set(
                            prescriptionTable.rowsData.map((d) => d.Pharmacy),
                          ),
                        ),
                      ].map((opt) => (
                        <div
                          key={opt}
                          className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                            pharmacyFilter === opt
                              ? "text-primary-color font-semibold"
                              : ""
                          }`}
                          onClick={() => {
                            setPharmacyFilter(opt);
                            setOpenDropdown(null);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Filter */}
                <div
                  className="w-[180px] flex items-center justify-center bg-[#EAEEF7] rounded-xl relative cursor-pointer"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "status" ? null : "status")
                  }
                >
                  <Button className="flex items-center gap-1 w-full justify-center">
                    {statusFilter === "All" ? "Status" : statusFilter}
                    <Icon
                      icon="mdi:chevron-down"
                      width="16"
                      className={`transition-transform duration-300 ${
                        openDropdown === "status" ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                  {openDropdown === "status" && (
                    <div className="absolute top-10 left-0 bg-white shadow-md rounded-md w-40 py-2 z-10">
                      {[
                        "All",
                        ...Array.from(
                          new Set(
                            prescriptionTable.rowsData.map(
                              (d: any) => d.Status,
                            ),
                          ),
                        ),
                      ].map((opt) => (
                        <div
                          key={opt}
                          className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                            statusFilter === opt
                              ? "text-primary-color font-semibold"
                              : ""
                          }`}
                          onClick={() => {
                            setStatusFilter(opt ?? "All");
                            setOpenDropdown(null);
                          }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Export Button (disabled / grey) */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed">
                  <Icon icon="material-symbols:upload-rounded" width={18} />
                  <Typography size="sm" className="font-medium">
                    Export CSV / PDF
                  </Typography>
                </div>

                {/* Add New Button (Blue) */}
                <div
                  onClick={() =>
                    router.push("/prescriptions/prescriptions-add")
                  }
                  className="flex items-center justify-center px-6 py-3 rounded-xl bg-primary-color text-white cursor-pointer hover:opacity-90 transition"
                >
                  <Typography size="sm" className="font-semibold">
                    Add New Prescription
                  </Typography>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              ColumnsData={prescriptionTable.ColumnsData}
              tableRows={paginatedData}
              roundedHeader
              paginate
              TableBodyRow={({
                id,
                Patient,
                Date,
                Medication,
                Doctor,
                Pharmacy,
                Status,
                Prescription,
                validation,
                delivery,
                consumerId,
                date,
                type,
                consultation,
              }: prescription) => (
                <tr key={id} className="hover:bg-white transition">
                  <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                    {Patient}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                    {Prescription}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                    {consumerId}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                    {date}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                    {type}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap cursor-pointer text-start text-primary-color underline underline-offset-4 text-md">
                    Open Consultation
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                    {Medication}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                    {Date}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-lg text-desc-color">
                    {Pharmacy}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-desc-color text-md">
                    {Doctor}
                  </td>
                  <td
                    className={`px-4 lg:px-6 py-4 text-start text-lg ${
                      validation === "At-risk"
                        ? "text-red"
                        : validation === "Validated"
                          ? "text-secondary-color"
                          : validation === "Pending"
                            ? "text-[#F2994A]"
                            : validation === "Rejected"
                              ? "text-[#828282]"
                              : "text-[#2F80ED]"
                    }`}
                  >
                    {validation || "-"}
                  </td>
                  <td
                    className={`px-4 lg:px-6 py-4 text-start text-lg ${
                      delivery === "Rejected"
                        ? "text-red"
                        : delivery === "Active"
                          ? "text-secondary-color"
                          : delivery === "Awaiting"
                            ? ""
                            : "text-[#F2994A]"
                    }`}
                  >
                    {delivery || "-"}
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-start text-lg flex items-center gap-2">
                    {/* <Icon
                      className="text-primary-color"
                      icon="ic:baseline-message"
                      width="24"
                      height="24"
                    /> */}
                    <Icon
                      icon="material-symbols:format-list-bulleted-rounded"
                      width="20"
                      height="20"
                      className="cursor-pointer text-primary-color"
                      onClick={() =>
                        router.push(`/prescriptions/details?id=${id}`)
                      }
                    />
                    {/* <Icon
                      className="text-primary-color cursor-pointer"
                      icon="tabler:file-download-filled"
                      width="24"
                      height="24"
                    /> */}
                    <div className="relative">
                      <Icon
                        className="text-primary-color cursor-pointer"
                        icon="ph:dots-three-vertical"
                        width="25"
                        height="25"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === `row-${id}` ? null : `row-${id}`,
                          )
                        }
                      />
                      {openDropdown === `row-${id}` && (
                        <div className="absolute top-6 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md w-[150px] py-2 z-20">
                          {[
                            "Request Refill",
                            // "Cancel Prescription",
                            // "Reassign Pharmacy",
                            // "Mark as Indirect",
                          ].map((option) => (
                            <div
                              key={option}
                              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                              onClick={() => {
                                console.log(option, id);
                                setOpenDropdown(null);
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            />
          </div>
        );
      case "delivered":
        return <DeliveredOrdersTable />;
      case "pending":
        return <PendingDeliveriesTable />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between pt-4 pb-4">
        <Typography size="h3" as="h3">
          Prescriptions
        </Typography>
      </div>

      {/* Stats – above tabs, only for Active tab */}
      {/* {activeTab === "active" && (
        <div className="pt-5 flex flex-wrap gap-5 items-center">
          {stats.map((activity, i) => (
            <div
              key={i}
              className="bg-white shadow-md w-[190px] h-[180px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
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
      )} */}

      {activeTab === "active" && (
        <div className="pt-3 flex flex-wrap gap-5 items-center">
          {activeStats.map((activity, i) => (
            <div
              key={i}
              className="bg-white  transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl
        cursor-pointer shadow-md w-[190px] h-[160px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
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
      )}

      {activeTab === "pending" && (
        <div className="pt-3 flex flex-wrap gap-5 items-center">
          {pendingStats.map((activity, i) => (
            <div
              key={i}
              className="bg-white  transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl
        cursor-pointer shadow-md w-[190px] h-[180px] rounded-2xl p-4 space-y-3 max-sm:w-full max-sm:text-center"
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
      )}

      {/* Tabs */}
      <div className="flex gap-5 mt-10 border-b border-gray-200">
        {Tabs.map((tab) => (
          <div
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="cursor-pointer relative pb-2"
          >
            <Typography
              className={`font-semibold ${
                activeTab === tab.key ? "text-primary-color" : "text-black"
              }`}
            >
              {tab.title}
            </Typography>

            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-color rounded-full"></span>
            )}
          </div>
        ))}
      </div>

      {/* Description under Tabs */}
      {/* <div className="mt-6 mb-6">
        <Typography size="lg" className="text-desc-color">
          {tabDescriptions[activeTab]}
        </Typography>
      </div> */}

      {/* Tab Content */}
      <div className="mt-5">{renderTabContent()}</div>
    </div>
  );
};

export default Prescription;
