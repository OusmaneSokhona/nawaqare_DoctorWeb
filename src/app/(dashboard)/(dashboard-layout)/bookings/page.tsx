"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";
import { useRouter } from "next/navigation";
import FilterDropdown from "@/components/sections/filter-dropdown";
import { axiosClient } from "@/api/base";

interface Booking {
  id: string;
  patientName?: string;
  patient_uuid: string;
  consultation_mode: string;
  status: string;
  notes_patient?: string;
  time_slot?: { start_time: string; end_time: string };
  consultation?: { id: string } | null;
}

const statusColor = (status: string) => {
  switch (status) {
    case "CREATED": return "bg-[#d7d5e0] text-[#828282] border border-[#828282]";
    case "CONFIRMED": return "bg-[#c7d5ef] text-[#2F80ED] border border-[#2F80ED]";
    case "COMPLETED": return "bg-[#c5deda] text-[#27AE60]";
    case "CANCELLED": return "bg-[#ecc9cd] text-[#EB4824] border border-[#EB4824]";
    case "NO_SHOW": return "bg-[#dedce7] text-[#828282]";
    default: return "bg-gray-200 text-black";
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case "CREATED": return "Pending";
    case "CONFIRMED": return "Confirmed";
    case "COMPLETED": return "Completed";
    case "CANCELLED": return "Cancelled";
    case "NO_SHOW": return "No-Show";
    default: return status;
  }
};

const BookingPage = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState("All");
  const [filter, setFilter] = useState("All");
  const [period, setPeriod] = useState("Today");
  const [activeStatus, setActiveStatus] = useState("All");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/api/v1/bookings/doctor");
        const data = res.data?.data ?? res.data;
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les rendez-vous");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => {
    if (activeStatus !== "All" && b.status !== activeStatus) return false;
    return true;
  });

  const statusCounts: Record<string, number> = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <Typography size="h3" className="font-bold">All Agenda</Typography>
            <Typography className="text-desc-color">
              Monitor all platform consultations and appointment activity
            </Typography>
          </div>
          <div className="flex flex-wrap gap-3 bg-[#DEE1F3] rounded-md p-2 max-w-fit">
            <FilterDropdown label="View" value={view} options={["All", "My Agenda", "Team Agenda"]} onSelect={setView} />
            <FilterDropdown label="Filter" value={filter} options={["All", "Waiting", "Ready", "Ongoing", "Late", "No-Show"]} onSelect={setFilter} />
            <FilterDropdown label="Period" value={period} options={["Today", "Tomorrow", "This Week", "This Month"]} onSelect={setPeriod} />
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "All", label: "All" },
            { key: "CREATED", label: `Pending${statusCounts["CREATED"] ? `:${statusCounts["CREATED"]}` : ""}` },
            { key: "CONFIRMED", label: `Confirmed${statusCounts["CONFIRMED"] ? `:${statusCounts["CONFIRMED"]}` : ""}` },
            { key: "COMPLETED", label: "Completed" },
            { key: "CANCELLED", label: "Cancelled" },
            { key: "NO_SHOW", label: "No-Show" },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveStatus(s.key)}
              className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeStatus === s.key
                  ? s.key === "All" ? "bg-primary-color text-white" : statusColor(s.key)
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Booking Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-primary-color border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <Icon icon="mdi:alert-circle-outline" className="text-red-400 mx-auto mb-2" width={32} />
          <Typography className="text-red-600">{error}</Typography>
          <button onClick={() => window.location.reload()} className="mt-3 px-4 py-2 bg-primary-color text-white rounded-lg text-sm">
            Réessayer
          </button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <Icon icon="mdi:calendar-blank-outline" className="text-gray-300 mx-auto mb-3" width={48} />
          <Typography className="text-desc-color">Aucun rendez-vous trouvé</Typography>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl border shadow-sm p-5 flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
            >
              {/* Left */}
              <div className="flex gap-4 items-start md:items-center">
                <Image src="/assets/svg/videoImg.svg" alt="profile" width={64} height={64} className="rounded-full" />
                <div className="space-y-1">
                  <Typography className="font-semibold">{booking.patientName || "Patient"}</Typography>
                  <Typography className="text-desc-color text-sm">
                    {booking.consultation_mode?.replace(/_/g, " ")}
                  </Typography>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 text-sm text-desc-color">
                    <div className="flex gap-1 items-center">
                      <Icon icon="mdi:clock-outline" className="text-primary-color" />
                      {formatTime(booking.time_slot?.start_time)}
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon icon="mingcute:phone-call-line" className="text-primary-color" />
                      {booking.consultation_mode === "VIDEO" ? "Remote Consultation" : booking.consultation_mode === "IN_PERSON" ? "In Person" : "Consultation"}
                    </div>
                  </div>
                  <span className={`inline-block mt-2 px-4 py-0.5 rounded-full text-xs font-medium ${statusColor(booking.status)}`}>
                    {statusLabel(booking.status)}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-2 w-full md:w-auto md:items-end">
                {booking.status === "CONFIRMED" && (
                  <Typography className="text-xs text-desc-color">Consultation confirmée</Typography>
                )}

                {booking.consultation ? (
                  <Button
                    onClick={() => router.push(`/consultation/${booking.consultation!.id}`)}
                    className="rounded-full text-xs px-5 py-1 w-full md:w-auto bg-primary-color text-white"
                  >
                    Voir consultation
                  </Button>
                ) : booking.status === "CONFIRMED" ? (
                  <Button className="rounded-full text-xs px-5 py-1 w-full md:w-auto bg-primary-color text-white">
                    Rejoindre
                  </Button>
                ) : (
                  <Button className="rounded-full text-xs px-5 py-1 w-full md:w-auto bg-gray-200 text-gray-600">
                    {statusLabel(booking.status)}
                  </Button>
                )}

                <button
                  onClick={() => router.push(`/bookings/details?id=${booking.id}`)}
                  className="group text-sm text-primary-color underline underline-offset-2 text-center md:text-right flex items-center gap-1"
                >
                  View Details
                  <Icon icon="cuida:arrow-right-outline" width="16" height="16" className="group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Warning */}
      {!loading && bookings.some((b) => b.status === "CREATED") && (
        <div className="bg-white h-20 p-3 rounded-lg flex items-center gap-5 justify-between max-md:h-auto max-md:flex-col max-md:items-start">
          <div className="flex gap-2 items-center">
            <Icon icon="mdi:alert-circle-outline" className="flex-shrink-0 text-[#F2994A]" />
            Vous avez des rendez-vous en attente de confirmation.
          </div>
          <div className="flex items-center gap-5">
            <button onClick={() => setActiveStatus("CREATED")} className="h-10 px-4 rounded-xl bg-primary-color text-white text-sm font-medium">
              Voir les pending
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
