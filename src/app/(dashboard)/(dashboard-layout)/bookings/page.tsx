"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { agendaData } from "@/data";
import { useRouter } from "next/navigation";
import FilterDropdown from "@/components/sections/filter-dropdown";

// const statusPill = (status: string) => {
//   switch (status) {
//     case "Ready:03":
//       return "bg-[#c5deda] text-[#27AE60]";
//     case "Waiting:2":
//       return "bg-[#d7d5e0] text-[#828282] border border-[#828282]";
//     case "Ongoing":
//       return "bg-[#c7d5ef] text-[#2F80ED] border border-[#2F80ED]";
//     case "Late":
//       return "bg-[#ecc9cd] text-[#bb6144] border border-[#bb6144]";
//     case "No-Show":
//       return "bg-[#dedce7] text-[#828282]";
//     default:
//       return "bg-gray-200 text-black";
//   }
// };

const statusPill = (status: string) => {
  switch (true) {
    case status.startsWith("Ready"):
      return "bg-[#c5deda] text-[#27AE60]";

    case status.startsWith("Waiting"):
      return "bg-[#d7d5e0] text-[#828282] border border-[#828282]";

    case status === "Ongoing":
      return "bg-[#c7d5ef] text-[#2F80ED] border border-[#2F80ED]";

    case status === "Late":
      return "bg-[#ecc9cd] text-[#bb6144] border border-[#bb6144]";

    case status === "No-Show":
      return "bg-[#dedce7] text-[#828282]";

    default:
      return "bg-gray-200 text-black";
  }
};

const actionBtn = (text: string) => {
  if (!text) return "bg-gray-300 text-black";

  const t = text.toLowerCase();

  if (t.includes("join")) return "bg-primary-color text-white";
  if (t.includes("no")) return "bg-[#EB4824] text-white";

  return "bg-gray-300 text-black";
};

const BookingPage = () => {
  const router = useRouter();
  const [active, setActive] = useState("Today");
  const [view, setView] = useState("All");
  const [filter, setFilter] = useState("All");
  const [period, setPeriod] = useState("Today");

  return (
    <div className="space-y-6">
      {/* <div className="sticky top-0 space-y-3 bg-white p-3 rounded-xl"> */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <Typography size="h3" className="font-bold">
              All Agenda
            </Typography>
            <Typography className="text-desc-color">
              Monitor all platform consultations and appointment activity
            </Typography>
          </div>
          <div className="flex flex-wrap gap-3 bg-[#DEE1F3] rounded-md p-2 max-w-fit">
            <FilterDropdown
              label="View"
              value={view}
              options={["All", "My Agenda", "Team Agenda"]}
              onSelect={(val) => setView(val)}
            />

            <FilterDropdown
              label="Filter"
              value={filter}
              options={[
                "All",
                "Waiting",
                "Ready",
                "Ongoing",
                "Late",
                "No-Show",
              ]}
              onSelect={(val) => setFilter(val)}
            />

            <FilterDropdown
              label="Period"
              value={period}
              options={["Today", "Tomorrow", "This Week", "This Month"]}
              onSelect={(val) => setPeriod(val)}
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {["Waiting:2", "Ready:03", "Ongoing", "Late", "No-Show"].map((s) => (
            <span
              key={s}
              className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium ${statusPill(
                s,
              )}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Agenda Cards */}
      <div className="space-y-4">
        {agendaData.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border shadow-sm p-5
                       flex flex-col gap-4
                       md:flex-row md:justify-between md:items-center"
          >
            {/* Left */}
            <div className="flex gap-4 items-start md:items-center">
              <Image
                src="/assets/svg/videoImg.svg"
                alt="profile"
                width={64}
                height={64}
                className="rounded-full"
              />

              <div className="space-y-1">
                <Typography className="font-semibold">Mr. Alex</Typography>
                <Typography className="text-desc-color text-sm">
                  44 years · Male · Lahore
                </Typography>

                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 text-sm text-desc-color">
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mdi:clock-outline"
                      className="text-primary-color"
                    />
                    11:30 AM
                  </div>
                  <div className="flex gap-1 items-center">
                    <Icon
                      icon="mingcute:phone-call-line"
                      className="text-primary-color"
                    />
                    Remote Consultation
                  </div>
                </div>

                <span
                  className={`inline-block mt-2 px-4 py-0.5 rounded-full text-xs font-medium ${statusPill(
                    item.btn,
                  )}`}
                >
                  {item.btn}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-2 w-full md:w-auto md:items-end">
              {item.btn2?.toLowerCase().includes("join") && (
                <Typography className="text-xs text-desc-color">
                  Start in 10 min
                </Typography>
              )}

              <Button
                className={`rounded-full text-xs px-5 py-1 w-full md:w-auto ${actionBtn(
                  item.btn2,
                )}`}
              >
                {item.btn2}
              </Button>

              <button
                onClick={() => router.push("/bookings/details")}
                className="group text-sm text-primary-color underline underline-offset-2 text-center md:text-right flex items-center gap-1"
              >
                View Details
                <Icon
                  icon="cuida:arrow-right-outline"
                  width="16"
                  height="16"
                  className="group-hover:translate-x-1 transition-all duration-300 ease-in-out"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div className="bg-white h-20 p-3 rounded-lg flex items-center gap-5 justify-between max-md:h-auto max-md:flex-col max-md:items-start">
        <div className="flex gap-2 items-center">
          <Icon
            icon="mdi:alert-circle-outline"
            className="flex-shrink-0 text-[#F2994A]"
          />
          blocked-missing consent. please complete required consent form.
        </div>
        <div className="flex items-center gap-5">
          <button className="h-10 px-4 rounded-xl bg-[#ebe6ec] text-desc-color text-lg font-medium ">
            Resolve
          </button>
          <button className="h-10 px-4 rounded-xl bg-primary-color text-white text-lg font-medium ">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
