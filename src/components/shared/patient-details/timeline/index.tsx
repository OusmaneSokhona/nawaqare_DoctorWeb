"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "../../typography";
import dayjs from "dayjs";

const iconColorMap: Record<string, string> = {
  Consultation: "text-[#2F80ED]",
  Note: "text-[#F2994A]",
  Prescription: "text-[#9B51E0]",
  Document: "text-[#828282]",
  "Vaccine / Allergy": "text-[#27AE60]",
  Payment: "text-[#219653]",
  "Consent / Access": "text-[#4C6FFF]",
};

const iconMap: Record<string, string> = {
  Consultation: "material-symbols:stethoscope",
  Note: "material-symbols:sticky-note-2-outline",
  Prescription: "material-symbols:medication-outline",
  Document: "material-symbols:description-outline",
  "Vaccine / Allergy": "material-symbols:health-and-safety-outline",
  Payment: "material-symbols:credit-card-outline",
  "Consent / Access": "material-symbols:verified-user-outline",
};

const reviewStatusOptions = ["All", "Pending", "Completed", "In Progress"];
const dateOptions = ["Last 7 days", "Last 30 days", "This Month", "This Year"];

const Timeline = () => {
  const timelineEvents = [
    {
      id: 1,
      type: "Consultation",
      title: "Consultation",
      desc: "Video consultation completed - Follow-up required",
      date: "2026-02-10T10:42:00",
      by: "Appointment #123",
      status: "Completed",
    },
    {
      id: 2,
      type: "Note",
      title: "Note",
      desc: "Follow-up note",
      date: "2026-02-07T09:30:00",
      by: "Appointment #123",
      status: "Pending",
    },
    {
      id: 3,
      type: "Prescription",
      title: "Prescription",
      desc: "Prescription issued: Amoxicillin 500mg",
      date: "2026-01-25T14:15:00",
      by: "Appointment #123",
      status: "Completed",
    },
    {
      id: 4,
      type: "Document",
      title: "Document",
      desc: "Lab report uploaded by patient",
      date: "2026-02-01T16:00:00",
      by: "Dr. Ahmed Khan",
      status: "In Progress",
    },
    {
      id: 5,
      type: "Vaccine / Allergy",
      title: "Vaccine / Allergy",
      desc: "Vaccine record updated",
      date: "2026-01-20T11:00:00",
      by: "Dr. Ahmed Khan",
      status: "Completed",
    },
    {
      id: 6,
      type: "Payment",
      title: "Payment",
      desc: "Payment completed",
      date: "2026-02-09T08:15:00",
      by: "Dr. Ahmed Khan",
      status: "Completed",
    },
    {
      id: 7,
      type: "Consent / Access",
      title: "Consent / Access",
      desc: "Consent signed",
      date: "2026-01-15T13:30:00",
      by: "Dr. Ahmed Khan",
      status: "Pending",
    },
  ];

  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Last 7 days");

  // Filter events
  const filteredEvents = timelineEvents.filter((event) => {
    const typeMatch = typeFilter === "All" || event.type === typeFilter;
    const statusMatch = statusFilter === "All" || event.status === statusFilter;

    // Date filtering
    const eventDate = dayjs(event.date);
    const today = dayjs();

    let dateMatch = true;
    if (dateFilter === "Last 7 days")
      dateMatch = eventDate.isAfter(today.subtract(7, "day"));
    else if (dateFilter === "Last 30 days")
      dateMatch = eventDate.isAfter(today.subtract(30, "day"));
    else if (dateFilter === "This Month")
      dateMatch = eventDate.isSame(today, "month");
    else if (dateFilter === "This Year")
      dateMatch = eventDate.isSame(today, "year");

    return typeMatch && statusMatch && dateMatch;
  });

  return (
    <div className="bg-white rounded-xl p-6">
      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {/* Type Filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-[#F1F4FA] rounded-full text-xs appearance-none pr-8 cursor-pointer"
          >
            <option value="All">All Types</option>
            {Object.keys(iconMap).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <Icon
            icon="material-symbols:keyboard-arrow-down"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            width={20}
            height={20}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-[#F1F4FA] rounded-full text-xs appearance-none pr-8 cursor-pointer"
          >
            {reviewStatusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Icon
            icon="material-symbols:keyboard-arrow-down"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            width={20}
            height={20}
          />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 bg-[#F1F4FA] rounded-full text-xs appearance-none pr-8 cursor-pointer"
          >
            {dateOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <Icon
            icon="material-symbols:keyboard-arrow-down"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-5">
        {filteredEvents.map((event, index) => (
          <div key={event.id} className="flex gap-4 relative">
            {/* Number + line */}
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-primary-color text-white flex items-center justify-center text-sm font-semibold z-10">
                {index + 1}
              </div>
              {index !== filteredEvents.length - 1 && (
                <div className="w-[2px] bg-gray-300 flex-1 mt-1"></div>
              )}
            </div>

            {/* Content */}
            <div className="pt-0.5">
              <div className="flex items-center gap-1.5">
                <Icon
                  icon={iconMap[event.type]}
                  width="16"
                  className={iconColorMap[event.type]}
                />
                <Typography size="md" className="font-semibold text-[#2c2c2c]">
                  {event.title}
                </Typography>
              </div>
              <p className="text-sm text-desc-color mt-0.5">{event.desc}</p>
              <p className="text-xs text-desc-color">
                {dayjs(event.date).format("D MMM YYYY · hh:mm A")}
              </p>
              <p className="text-xs text-desc-color">{event.by}</p>
              <p className="text-xs text-primary-color font-semibold underline cursor-pointer mt-0.5">
                View details
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
