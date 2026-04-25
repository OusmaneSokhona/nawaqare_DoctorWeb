"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";

type VaccineStatus = "done" | "pending" | "overdue";

interface Vaccine {
  id: string;
  name: string;
  dateGiven: string;
  doseNumber: number;
  totalDoses: number;
  nextDueDate: string;
  status: VaccineStatus;
  hasCertificate: boolean;
  certificateUrl?: string;
}

interface UpcomingVaccine {
  id: string;
  name: string;
  recommendedDate: string;
  ageGroup: string;
}

const VaccinationCardPage = () => {
  const params = { id: "1" };
  const [expandedVaccineId, setExpandedVaccineId] = useState<string | null>(
    null
  );

  // Mock vaccination records
  const vaccinations: Vaccine[] = [
    {
      id: "vac1",
      name: "BCG (Bacille Calmette-Guérin)",
      dateGiven: "1979-05-15",
      doseNumber: 1,
      totalDoses: 1,
      nextDueDate: "No booster",
      status: "done",
      hasCertificate: true,
      certificateUrl: "/certs/bcg.pdf",
    },
    {
      id: "vac2",
      name: "Polio (IPV)",
      dateGiven: "2024-02-10",
      doseNumber: 3,
      totalDoses: 3,
      nextDueDate: "No additional doses",
      status: "done",
      hasCertificate: true,
      certificateUrl: "/certs/polio.pdf",
    },
    {
      id: "vac3",
      name: "Yellow Fever",
      dateGiven: "2023-08-20",
      doseNumber: 1,
      totalDoses: 1,
      nextDueDate: "2033-08-20",
      status: "done",
      hasCertificate: true,
      certificateUrl: "/certs/yellow_fever.pdf",
    },
    {
      id: "vac4",
      name: "Hepatitis B",
      dateGiven: "2024-01-15",
      doseNumber: 3,
      totalDoses: 3,
      nextDueDate: "2034-01-15",
      status: "done",
      hasCertificate: true,
      certificateUrl: "/certs/hep_b.pdf",
    },
    {
      id: "vac5",
      name: "Measles, Mumps, Rubella (MMR)",
      dateGiven: "2024-03-10",
      doseNumber: 2,
      totalDoses: 2,
      nextDueDate: "No booster",
      status: "done",
      hasCertificate: true,
      certificateUrl: "/certs/mmr.pdf",
    },
    {
      id: "vac6",
      name: "Tetanus/Diphtheria (Td)",
      dateGiven: "2024-02-05",
      doseNumber: 1,
      totalDoses: 1,
      nextDueDate: "2029-02-05",
      status: "done",
      hasCertificate: true,
      certificateUrl: "/certs/td.pdf",
    },
    {
      id: "vac7",
      name: "COVID-19",
      dateGiven: "2024-04-01",
      doseNumber: 3,
      totalDoses: 3,
      nextDueDate: "2024-10-01",
      status: "pending",
      hasCertificate: true,
      certificateUrl: "/certs/covid.pdf",
    },
    {
      id: "vac8",
      name: "Influenza (Flu)",
      dateGiven: "2023-10-15",
      doseNumber: 1,
      totalDoses: 1,
      nextDueDate: "2024-10-15",
      status: "overdue",
      hasCertificate: false,
    },
  ];

  // Upcoming scheduled vaccines
  const upcomingVaccines: UpcomingVaccine[] = [
    {
      id: "upvac1",
      name: "Pneumococcal (PCV13)",
      recommendedDate: "2024-05-20",
      ageGroup: "45+",
    },
    {
      id: "upvac2",
      name: "Shingles (Zoster)",
      recommendedDate: "2024-06-15",
      ageGroup: "50+",
    },
    {
      id: "upvac3",
      name: "HPV",
      recommendedDate: "2024-07-10",
      ageGroup: "Catch-up",
    },
  ];

  const getStatusColor = (status: VaccineStatus) => {
    switch (status) {
      case "done":
        return "bg-[#27AE601A] text-[#27AE60]";
      case "pending":
        return "bg-[#FFA5001A] text-[#FFA500]";
      case "overdue":
        return "bg-[#EB48241A] text-[#EB4824]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: VaccineStatus) => {
    switch (status) {
      case "done":
        return "mdi:check-circle";
      case "pending":
        return "mdi:clock-outline";
      case "overdue":
        return "mdi:alert-circle";
      default:
        return "mdi:help-circle";
    }
  };

  const getStatusLabel = (status: VaccineStatus) => {
    switch (status) {
      case "done":
        return "Done";
      case "pending":
        return "Pending";
      case "overdue":
        return "Overdue";
      default:
        return status;
    }
  };

  const handleDownloadCertificate = (vaccineId: string) => {
    const vaccine = vaccinations.find((v) => v.id === vaccineId);
    if (vaccine && vaccine.hasCertificate) {
      console.log(`Downloading certificate for ${vaccine.name}`);
    }
  };

  const handleExportPDF = () => {
    console.log("Exporting vaccination card as PDF");
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

      {/* Header */}
      <div className="flex items-center justify-between gap-6 mb-8 flex-wrap">
        <div>
          <Typography as="h1" size="h4" className="font-bold text-[#111827] mb-2">
            Vaccination Card
          </Typography>
          <Typography as="p" size="sm" className="text-[#828282]">
            Complete immunization history and upcoming vaccinations
          </Typography>
        </div>

        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#2F80ED] text-white rounded-lg font-medium hover:bg-[#1e5bc3] transition"
        >
          <Icon icon="material-symbols:download" width="18" />
          Export PDF
        </button>
      </div>

      {/* Vaccination Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-md:grid-cols-1">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-start justify-between mb-4">
            <Typography as="p" size="sm" className="text-[#828282]">
              Completed
            </Typography>
            <div className="w-10 h-10 rounded-lg bg-[#27AE601A] flex items-center justify-center">
              <Icon icon="mdi:check-circle" width="20" className="text-[#27AE60]" />
            </div>
          </div>
          <Typography as="p" size="h5" className="font-bold text-[#111827]">
            6 of 8
          </Typography>
          <Typography as="p" size="sm" className="text-[#6B7280] mt-2">
            Vaccinations completed
          </Typography>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-start justify-between mb-4">
            <Typography as="p" size="sm" className="text-[#828282]">
              Pending
            </Typography>
            <div className="w-10 h-10 rounded-lg bg-[#FFA5001A] flex items-center justify-center">
              <Icon icon="mdi:clock-outline" width="20" className="text-[#FFA500]" />
            </div>
          </div>
          <Typography as="p" size="h5" className="font-bold text-[#111827]">
            1
          </Typography>
          <Typography as="p" size="sm" className="text-[#6B7280] mt-2">
            Awaiting administration
          </Typography>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <div className="flex items-start justify-between mb-4">
            <Typography as="p" size="sm" className="text-[#828282]">
              Overdue
            </Typography>
            <div className="w-10 h-10 rounded-lg bg-[#EB48241A] flex items-center justify-center">
              <Icon icon="mdi:alert-circle" width="20" className="text-[#EB4824]" />
            </div>
          </div>
          <Typography as="p" size="h5" className="font-bold text-[#111827]">
            1
          </Typography>
          <Typography as="p" size="sm" className="text-[#6B7280] mt-2">
            Due for administration
          </Typography>
        </div>
      </div>

      {/* Vaccination History Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="px-6 py-4 text-left">
                  <Typography as="p" size="sm" className="font-bold text-[#111827]">
                    Vaccine
                  </Typography>
                </th>
                <th className="px-6 py-4 text-left">
                  <Typography as="p" size="sm" className="font-bold text-[#111827]">
                    Date Given
                  </Typography>
                </th>
                <th className="px-6 py-4 text-left">
                  <Typography as="p" size="sm" className="font-bold text-[#111827]">
                    Dose #
                  </Typography>
                </th>
                <th className="px-6 py-4 text-left">
                  <Typography as="p" size="sm" className="font-bold text-[#111827]">
                    Next Due
                  </Typography>
                </th>
                <th className="px-6 py-4 text-left">
                  <Typography as="p" size="sm" className="font-bold text-[#111827]">
                    Status
                  </Typography>
                </th>
                <th className="px-6 py-4 text-center">
                  <Typography as="p" size="sm" className="font-bold text-[#111827]">
                    Certificate
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {vaccinations.map((vaccine, index) => (
                <tr
                  key={vaccine.id}
                  className={`border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition ${
                    index === vaccinations.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <Typography as="p" size="sm" className="font-bold text-[#111827]">
                      {vaccine.name}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography as="p" size="sm" className="text-[#6B7280]">
                      {vaccine.dateGiven}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography as="p" size="sm" className="text-[#6B7280]">
                      {vaccine.doseNumber}/{vaccine.totalDoses}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <Typography as="p" size="sm" className="text-[#6B7280]">
                      {vaccine.nextDueDate}
                    </Typography>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${getStatusColor(
                        vaccine.status
                      )}`}
                    >
                      <Icon icon={getStatusIcon(vaccine.status)} width="14" />
                      {getStatusLabel(vaccine.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {vaccine.hasCertificate ? (
                      <button
                        onClick={() => handleDownloadCertificate(vaccine.id)}
                        className="text-[#2F80ED] hover:text-[#1e5bc3] inline-flex items-center"
                        title="Download certificate"
                      >
                        <Icon icon="mdi:download" width="20" />
                      </button>
                    ) : (
                      <span className="text-[#D1D5DB]">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming/Scheduled Vaccinations */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 mb-8">
        <Typography as="h3" size="h5" className="font-bold text-[#111827] mb-6">
          Recommended Upcoming Vaccinations
        </Typography>

        <div className="space-y-4">
          {upcomingVaccines.map((vaccine) => (
            <div
              key={vaccine.id}
              className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] hover:border-[#2F80ED] transition"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                  <Icon
                    icon="mdi:syringe"
                    width="18"
                    className="text-[#2F80ED]"
                  />
                </div>

                <div>
                  <Typography as="p" size="sm" className="font-bold text-[#111827]">
                    {vaccine.name}
                  </Typography>
                  <Typography as="p" size="sm" className="text-[#828282]">
                    Recommended: {vaccine.recommendedDate} · {vaccine.ageGroup}
                  </Typography>
                </div>
              </div>

              <button className="px-4 py-2 bg-[#2F80ED] text-white rounded-lg font-medium hover:bg-[#1e5bc3] transition whitespace-nowrap">
                Schedule
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-[#EFF6FF] rounded-xl border border-[#BFDBFE] p-6">
        <div className="flex items-start gap-4">
          <Icon
            icon="mdi:information-outline"
            width="24"
            className="text-[#2F80ED] flex-shrink-0 mt-1"
          />

          <div>
            <Typography as="p" size="sm" className="font-bold text-[#1E40AF] mb-2">
              Vaccination Guidelines
            </Typography>

            <Typography as="p" size="sm" className="text-[#1E40AF]">
              Keep your vaccinations up to date by scheduling appointments for
              overdue and upcoming vaccines. Download your vaccination
              certificates for travel and official purposes. Consult your
              healthcare provider about the appropriate vaccination schedule for
              your age and health status.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinationCardPage;
