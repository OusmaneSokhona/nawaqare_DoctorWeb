"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";

type EventType = "consultation" | "prescription" | "lab" | "vaccination";
type StatusType = "official" | "draft" | "external";

interface TimelineEvent {
  id: string;
  type: EventType;
  title: string;
  date: string;
  doctorName: string;
  status: StatusType;
  details: string;
  month: string;
}

const HealthTimelinePage = () => {
  const params = { id: "1" };
  const [activeFilter, setActiveFilter] = useState<"all" | EventType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("last3months");

  // Mock timeline events
  const allEvents: TimelineEvent[] = [
    {
      id: "evt1",
      type: "consultation",
      title: "Hypertension Review",
      date: "2024-04-15",
      doctorName: "Dr. Sarah Johnson",
      status: "official",
      details:
        "Blood pressure monitoring and medication adjustment. Patient responding well to current treatment plan. Continue Lisinopril 10mg daily.",
      month: "April",
    },
    {
      id: "evt2",
      type: "prescription",
      title: "Prescription: Lisinopril 10mg",
      date: "2024-04-15",
      doctorName: "Dr. Sarah Johnson",
      status: "official",
      details: "Renewed for 3 months. Once daily, morning dose preferred.",
      month: "April",
    },
    {
      id: "evt3",
      type: "lab",
      title: "Lab Result: Blood Work",
      date: "2024-04-10",
      doctorName: "Lab Service",
      status: "official",
      details:
        "Lipid panel, glucose level, and kidney function tests completed. All values within normal range.",
      month: "April",
    },
    {
      id: "evt4",
      type: "consultation",
      title: "Diabetes Management",
      date: "2024-03-20",
      doctorName: "Dr. Ahmed Hassan",
      status: "official",
      details:
        "HbA1c test showed improvement. Patient maintaining diet and exercise regimen.",
      month: "March",
    },
    {
      id: "evt5",
      type: "vaccination",
      title: "Vaccination: Flu Shot",
      date: "2024-03-15",
      doctorName: "Dr. Maria Garcia",
      status: "official",
      details: "Annual flu vaccination administered. Next due: March 2025.",
      month: "March",
    },
    {
      id: "evt6",
      type: "prescription",
      title: "Prescription: Metformin 1000mg",
      date: "2024-03-20",
      doctorName: "Dr. Ahmed Hassan",
      status: "draft",
      details: "Twice daily with meals. Pending patient confirmation.",
      month: "March",
    },
    {
      id: "evt7",
      type: "lab",
      title: "Lab Result: Urinalysis",
      date: "2024-03-10",
      doctorName: "Lab Service",
      status: "official",
      details: "Routine urinalysis completed. No abnormalities detected.",
      month: "March",
    },
    {
      id: "evt8",
      type: "consultation",
      title: "Annual Checkup",
      date: "2024-02-10",
      doctorName: "Dr. Maria Garcia",
      status: "official",
      details:
        "Comprehensive annual physical examination. All vital signs normal. No new concerns identified.",
      month: "February",
    },
    {
      id: "evt9",
      type: "vaccination",
      title: "Vaccination: Tetanus Booster",
      date: "2024-02-05",
      doctorName: "Dr. John Smith",
      status: "external",
      details: "Tetanus/diphtheria booster vaccination. Next due: 2029.",
      month: "February",
    },
    {
      id: "evt10",
      type: "prescription",
      title: "Prescription: Atorvastatin 20mg",
      date: "2024-01-25",
      doctorName: "Dr. John Smith",
      status: "official",
      details: "For cholesterol management. Once daily at night.",
      month: "January",
    },
  ];

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = allEvents;

    // Filter by type
    if (activeFilter !== "all") {
      filtered = filtered.filter((e) => e.type === activeFilter);
    }

    return filtered;
  }, [activeFilter]);

  // Group by month
  const groupedByMonth = useMemo(() => {
    const groups: { [key: string]: TimelineEvent[] } = {};

    filteredEvents.forEach((event) => {
      if (!groups[event.month]) {
        groups[event.month] = [];
      }
      groups[event.month].push(event);
    });

    return groups;
  }, [filteredEvents]);

  const getEventTypeIcon = (type: EventType) => {
    switch (type) {
      case "consultation":
        return "mdi:hospital-box-outline";
      case "prescription":
        return "mdi:pill-multiple";
      case "lab":
        return "mdi:flask-outline";
      case "vaccination":
        return "mdi:syringe";
      default:
        return "mdi:file-document-outline";
    }
  };

  const getEventTypeColor = (type: EventType) => {
    switch (type) {
      case "consultation":
        return "#2F80ED";
      case "prescription":
        return "#27AE60";
      case "lab":
        return "#FFA500";
      case "vaccination":
        return "#9B59B6";
      default:
        return "#828282";
    }
  };

  const getStatusBadgeStyle = (status: StatusType) => {
    switch (status) {
      case "official":
        return "bg-[#27AE601A] text-[#27AE60]";
      case "draft":
        return "bg-[#8282821A] text-[#828282]";
      case "external":
        return "border border-[#2F80ED] bg-white text-[#2F80ED]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: StatusType) => {
    switch (status) {
      case "official":
        return "Official/Signed";
      case "draft":
        return "Draft";
      case "external":
        return "External";
      default:
        return status;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Back Button */}
      <Link
        href="/patients"
        className="inline-flex items-center gap-2 text-[#2F80ED] hover:text-[#2563eb] mb-6 font-medium"
      >
        <Icon icon="mdi:arrow-left" width="20" />
        Back to Patients
      </Link>

      {/* Page Header */}
      <div className="mb-8">
        <Typography as="h1" size="h4" className="font-bold text-[#111827] mb-2">
          Health Timeline
        </Typography>
        <Typography as="p" size="sm" className="text-[#828282]">
          Chronological view of all patient health events and records
        </Typography>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mb-8">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeFilter === "all"
                  ? "bg-[#2F80ED] text-white"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveFilter("consultation")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeFilter === "consultation"
                  ? "bg-[#2F80ED] text-white"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
              }`}
            >
              <Icon icon={getEventTypeIcon("consultation")} width="16" />
              Consultations
            </button>

            <button
              onClick={() => setActiveFilter("prescription")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeFilter === "prescription"
                  ? "bg-[#2F80ED] text-white"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
              }`}
            >
              <Icon icon={getEventTypeIcon("prescription")} width="16" />
              Prescriptions
            </button>

            <button
              onClick={() => setActiveFilter("lab")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeFilter === "lab"
                  ? "bg-[#2F80ED] text-white"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
              }`}
            >
              <Icon icon={getEventTypeIcon("lab")} width="16" />
              Lab Results
            </button>

            <button
              onClick={() => setActiveFilter("vaccination")}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                activeFilter === "vaccination"
                  ? "bg-[#2F80ED] text-white"
                  : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
              }`}
            >
              <Icon icon={getEventTypeIcon("vaccination")} width="16" />
              Vaccinations
            </button>
          </div>

          {/* Date Range Dropdown */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] font-medium focus:outline-none focus:border-[#2F80ED]"
          >
            <option value="all">All time</option>
            <option value="last3months">Last 3 months</option>
            <option value="last6months">Last 6 months</option>
            <option value="lastyear">Last year</option>
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedByMonth)
          .sort(([monthA], [monthB]) => {
            const months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            return months.indexOf(monthB) - months.indexOf(monthA);
          })
          .map(([month, events]) => (
            <div key={month}>
              {/* Month Header */}
              <div className="mb-6">
                <Typography
                  as="h3"
                  size="h5"
                  className="font-bold text-[#111827] pb-4 border-b border-[#E5E7EB]"
                >
                  {month}
                </Typography>
              </div>

              {/* Events for this month */}
              <div className="space-y-4 pl-8 relative">
                {/* Left timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2F80ED] to-[#E5E7EB]" />

                {events.map((event, index) => (
                  <div key={event.id} className="relative">
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-8 top-2 w-4 h-4 rounded-full border-4 border-white bg-white shadow-md"
                      style={{
                        backgroundColor: getEventTypeColor(event.type),
                      }}
                    />

                    {/* Event card */}
                    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:border-[#2F80ED] hover:shadow-md transition">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: `${getEventTypeColor(event.type)}20`,
                            }}
                          >
                            <Icon
                              icon={getEventTypeIcon(event.type)}
                              width="20"
                              style={{ color: getEventTypeColor(event.type) }}
                            />
                          </div>

                          <div className="flex-1">
                            <Typography
                              as="p"
                              size="sm"
                              className="font-bold text-[#111827] mb-1"
                            >
                              {event.title}
                            </Typography>

                            <Typography
                              as="p"
                              size="sm"
                              className="text-[#828282] mb-2"
                            >
                              {event.date} · By {event.doctorName}
                            </Typography>

                            <span
                              className={`inline-block px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusBadgeStyle(
                                event.status
                              )}`}
                            >
                              {getStatusLabel(event.status)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === event.id ? null : event.id
                            )
                          }
                          className="text-[#2F80ED] hover:text-[#1e5bc3] flex-shrink-0"
                        >
                          <Icon
                            icon={
                              expandedId === event.id
                                ? "mdi:chevron-up"
                                : "mdi:chevron-down"
                            }
                            width="20"
                          />
                        </button>
                      </div>

                      {/* Expanded details */}
                      {expandedId === event.id && (
                        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                          <Typography as="p" size="sm" className="text-[#6B7280]">
                            {event.details}
                          </Typography>

                          <button className="mt-4 flex items-center gap-2 text-[#2F80ED] hover:text-[#1e5bc3] font-medium text-sm">
                            <Icon icon="mdi:file-document-outline" width="16" />
                            View Full Record
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Icon
            icon="mdi:calendar-blank-outline"
            width="48"
            className="text-[#D1D5DB] mx-auto mb-4"
          />
          <Typography as="p" size="sm" className="text-[#828282]">
            No events found for the selected filter
          </Typography>
        </div>
      )}
    </div>
  );
};

export default HealthTimelinePage;
