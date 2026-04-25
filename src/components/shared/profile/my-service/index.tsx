"use client";

import { useState } from "react";
import DataTable from "@/components/shared/data-table";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const columns = [
  { id: "check", label: "", accessor: "check" },
  { id: "service", label: "Services", accessor: "service" },
  { id: "mode", label: "Mode", accessor: "mode" },
  { id: "duration", label: "Duration", accessor: "duration" },
  { id: "price", label: "Price", accessor: "price" },
  { id: "status", label: "Status", accessor: "status" },
  { id: "action", label: "Action", accessor: "action" },
];

const rows = [
  {
    id: 1,
    service: "Initial Consultation",
    mode: "Remote consultation",
    duration: "30 min",
    price: "30$",
    status: "Active",
  },
  {
    id: 2,
    service: "Tests",
    mode: "In-person consultation",
    duration: "30 min",
    price: "30$",
    status: "Inactive",
  },
];

export default function MyServices() {
  const router = useRouter();
  const [showInactive, setShowInactive] = useState(true);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <Typography size="h4" className="font-bold">
          My Services
        </Typography>

        <button className="bg-primary-color text-white px-4 py-2 rounded-lg text-sm">
          Add New Service
        </button>
      </div>

      {/* STATS */}
      <div className="flex gap-4">
        <div className="flex-1 bg-[#EEF1FB] rounded-xl p-4 flex items-center gap-3">
          <Icon
            icon="mdi:check-circle"
            className="text-primary-color"
            width={28}
          />
          <Typography>
            Active services: <b>04</b>
          </Typography>
        </div>

        <div className="flex-1 bg-[#EEF1FB] rounded-xl p-4 flex items-center gap-3">
          <Icon
            icon="mdi:minus-circle"
            className="text-primary-color"
            width={28}
          />
          <Typography>
            Total: <b>06</b>
          </Typography>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search service name"
            className="pl-10 pr-3 py-2 border rounded-lg w-full text-sm"
          />
        </div>

        <select className="border rounded-lg px-3 py-2 text-sm bg-gray-50">
          <option>In-person</option>
          <option>Remote</option>
          <option>Home Visit</option>
        </select>

        {/* TOGGLE */}
        <label className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-lg">
          Show inactive
          <input
            type="checkbox"
            checked={showInactive}
            onChange={() => setShowInactive(!showInactive)}
            className="accent-primary-color"
          />
        </label>
      </div>

      {/* TABLE */}
      <div className="border rounded-xl overflow-hidden">
        <DataTable
          ColumnsData={columns}
          tableRows={rows}
          roundedHeader
          paginate
          TableBodyRow={({
            id,
            service,
            mode,
            duration,
            price,
            status,
          }: any) => (
            <tr
              key={id}
              className={`border-b ${
                status === "Inactive" ? "text-gray-400" : ""
              }`}
            >
              <td className="px-4 py-3">
                <input type="checkbox" />
              </td>

              <td className="px-4 py-3">{service}</td>
              <td className="px-4 py-3">{mode}</td>
              <td className="px-4 py-3">{duration}</td>
              <td className="px-4 py-3">{price}</td>

              <td className="px-4 py-3">
                <span
                  className={`text-xs ${
                    status === "Active" ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {status}
                </span>
              </td>

              <td className="px-4 py-3 flex gap-3 items-center">
                <span className="text-xs cursor-pointer text-gray-500">
                  {status === "Active" ? "Deactivate ▼" : "Activate ▼"}
                </span>

                <Icon
                  icon="mdi:pencil"
                  className="cursor-pointer text-primary-color"
                  onClick={() => router.push("/my-service/edit")}
                />

                <Icon
                  icon="mdi:content-copy"
                  className="cursor-pointer text-primary-color"
                />
              </td>
            </tr>
          )}
        />
      </div>

      {/* GDPR FOOTER */}
      <div className="bg-orange-50 border border-orange-200 text-xs px-4 py-3 rounded-lg flex gap-2 items-center">
        <Icon icon="mdi:alert-circle" className="text-orange-500" />
        Data protected under GDPR & HDS standards. Access logged for compliance
      </div>
    </div>
  );
}
