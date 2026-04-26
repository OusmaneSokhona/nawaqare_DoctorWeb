"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";

interface PageProps { params: { id: string } }

const PatientOverviewPage = ({ params }: PageProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock patient data
  const patient = {
    id: 1,
    name: "Dr. John Smith",
    age: 45,
    bloodType: "O+",
    profileImage: "/assets/svg/profile.svg",
    verified: true,
    activeConditions: ["Hypertension", "Type 2 Diabetes"],
    medications: [
      { name: "Lisinopril", dosage: "10mg" },
      { name: "Metformin", dosage: "1000mg" },
    ],
    allergies: ["Penicillin", "Shellfish"],
    lastVisit: "2024-04-15",
  };

  // Overview Tab Data
  const allergies = [
    { name: "Penicillin", severity: "severe" },
    { name: "Shellfish", severity: "moderate" },
    { name: "Dust", severity: "mild" },
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg once daily", since: "Jan 2023" },
    { name: "Metformin", dosage: "1000mg twice daily", since: "Mar 2022" },
    { name: "Atorvastatin", dosage: "20mg at night", since: "May 2023" },
  ];

  const vitalStats = {
    bp: "130/85 mmHg",
    weight: "75 kg",
    height: "180 cm",
    bmi: "23.1",
    recordedDate: "2024-04-20",
  };

  const antecedents = {
    personal: ["Asthma in childhood", "Appendectomy 2010"],
    family: ["Father: Diabetes", "Mother: Hypertension"],
  };

  // Medical History Tab Data
  const medicalHistory = [
    {
      date: "2024-04-15",
      doctor: "Dr. Sarah Johnson",
      diagnosis: "Hypertension Review",
      icd10: "I10",
    },
    {
      date: "2024-03-20",
      doctor: "Dr. Ahmed Hassan",
      diagnosis: "Diabetes Management",
      icd10: "E11.9",
    },
    {
      date: "2024-02-10",
      doctor: "Dr. Maria Garcia",
      diagnosis: "Annual Checkup",
      icd10: "Z00.00",
    },
    {
      date: "2024-01-25",
      doctor: "Dr. John Smith",
      diagnosis: "High Cholesterol",
      icd10: "E78.0",
    },
  ];

  // Documents Tab Data
  const documents = [
    {
      id: 1,
      name: "Prescription - Lisinopril",
      type: "prescription",
      date: "2024-04-15",
      icon: "mdi:file-document",
    },
    {
      id: 2,
      name: "Lab Result - Blood Work",
      type: "lab",
      date: "2024-04-10",
      icon: "mdi:flask-outline",
    },
    {
      id: 3,
      name: "Imaging - Chest X-ray",
      type: "imaging",
      date: "2024-03-25",
      icon: "mdi:image",
    },
    {
      id: 4,
      name: "Prescription - Metformin",
      type: "prescription",
      date: "2024-02-15",
      icon: "mdi:file-document",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "bg-[#EB48241A] text-[#EB4824]";
      case "moderate":
        return "bg-[#FFA5001A] text-[#FFA500]";
      case "mild":
        return "bg-[#27AE601A] text-[#27AE60]";
      default:
        return "bg-[#8282821A] text-[#828282]";
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

      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#2F80ED] to-[#1e5bc3] rounded-2xl p-8 mb-6 text-white">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-white">
              <Image
                src={patient.profileImage}
                alt={patient.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Typography as="h2" size="h4" className="text-white font-bold">
                  {patient.name}
                </Typography>
                {patient.verified && (
                  <Icon
                    icon="mdi:check-circle"
                    width="24"
                    className="text-[#27AE60]"
                  />
                )}
              </div>

              <Typography as="p" size="sm" className="text-blue-100 mb-3">
                Age: {patient.age} years · Blood Type: {patient.bloodType}
              </Typography>

              <div className="flex flex-wrap gap-2">
                <span className="bg-[#27AE60] px-4 py-1.5 rounded-lg text-sm font-medium">
                  Active Patient
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <Typography as="p" size="sm" className="text-blue-100">
              Last Visit
            </Typography>
            <Typography as="p" size="sm" className="text-white font-bold">
              {patient.lastVisit}
            </Typography>
          </div>
        </div>
      </div>

      {/* Quick Summary Bar */}
      <div className="bg-[#eceaf7] rounded-lg p-6 mb-6 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
          <Typography as="p" size="sm" className="text-[#828282] mb-2">
            Active Conditions
          </Typography>
          <Typography as="p" size="md" className="font-bold text-[#111827]">
            {patient.activeConditions.length}
          </Typography>
          <Typography as="p" size="sm" className="text-[#6B7280] mt-1">
            {patient.activeConditions.join(", ")}
          </Typography>
        </div>

        <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
          <Typography as="p" size="sm" className="text-[#828282] mb-2">
            Current Medications
          </Typography>
          <Typography as="p" size="md" className="font-bold text-[#111827]">
            {patient.medications.length}
          </Typography>
          <Typography as="p" size="sm" className="text-[#6B7280] mt-1">
            Active prescriptions
          </Typography>
        </div>

        <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
          <Typography as="p" size="sm" className="text-[#828282] mb-2">
            Known Allergies
          </Typography>
          <Typography as="p" size="md" className="font-bold text-[#111827]">
            {allergies.length}
          </Typography>
          <Typography as="p" size="sm" className="text-[#6B7280] mt-1">
            Documented allergies
          </Typography>
        </div>

        <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">
          <Typography as="p" size="sm" className="text-[#828282] mb-2">
            Last Visited
          </Typography>
          <Typography as="p" size="md" className="font-bold text-[#111827]">
            5 days ago
          </Typography>
          <Typography as="p" size="sm" className="text-[#6B7280] mt-1">
            {patient.lastVisit}
          </Typography>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-6 border-b border-[#E5E7EB] mb-6 overflow-x-auto">
        {[
          { id: "overview", label: "Overview" },
          { id: "history", label: "Medical History" },
          { id: "documents", label: "Documents" },
          { id: "timeline", label: "Timeline" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 font-medium relative whitespace-nowrap ${
              activeTab === tab.id
                ? "text-[#2F80ED] after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[2px] after:bg-[#2F80ED]"
                : "text-[#828282] hover:text-[#6B7280]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Allergies Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon
                icon="mdi:alert-circle-outline"
                width="24"
                className="text-[#EB4824]"
              />
              <Typography as="h3" size="h5" className="font-bold text-[#111827]">
                Allergies
              </Typography>
            </div>

            <div className="space-y-3">
              {allergies.map((allergy, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]"
                >
                  <Typography as="p" size="sm" className="text-[#111827]">
                    {allergy.name}
                  </Typography>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${getSeverityColor(
                      allergy.severity
                    )}`}
                  >
                    {allergy.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Medications Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon
                icon="mdi:pill-multiple"
                width="24"
                className="text-[#27AE60]"
              />
              <Typography as="h3" size="h5" className="font-bold text-[#111827]">
                Active Medications
              </Typography>
            </div>

            <div className="space-y-3">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Typography as="p" size="sm" className="font-bold text-[#111827]">
                      {med.name}
                    </Typography>
                    <span className="bg-[#EFF6FF] text-[#2F80ED] px-3 py-1 rounded text-xs font-medium">
                      Since {med.since}
                    </span>
                  </div>
                  <Typography as="p" size="sm" className="text-[#6B7280]">
                    {med.dosage}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          {/* Vital Stats Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon
                icon="mdi:heart-pulse"
                width="24"
                className="text-[#EB4824]"
              />
              <Typography as="h3" size="h5" className="font-bold text-[#111827]">
                Vital Statistics
              </Typography>
            </div>

            <Typography as="p" size="sm" className="text-[#828282] mb-4">
              Last recorded: {vitalStats.recordedDate}
            </Typography>

            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
              <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <Typography as="p" size="sm" className="text-[#828282] mb-1">
                  Blood Pressure
                </Typography>
                <Typography as="p" size="md" className="font-bold text-[#111827]">
                  {vitalStats.bp}
                </Typography>
              </div>

              <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <Typography as="p" size="sm" className="text-[#828282] mb-1">
                  Weight
                </Typography>
                <Typography as="p" size="md" className="font-bold text-[#111827]">
                  {vitalStats.weight}
                </Typography>
              </div>

              <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <Typography as="p" size="sm" className="text-[#828282] mb-1">
                  Height
                </Typography>
                <Typography as="p" size="md" className="font-bold text-[#111827]">
                  {vitalStats.height}
                </Typography>
              </div>

              <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                <Typography as="p" size="sm" className="text-[#828282] mb-1">
                  BMI
                </Typography>
                <Typography as="p" size="md" className="font-bold text-[#111827]">
                  {vitalStats.bmi}
                </Typography>
              </div>
            </div>
          </div>

          {/* Antecedents Card */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-3 mb-4">
              <Icon
                icon="mdi:file-document-outline"
                width="24"
                className="text-[#2F80ED]"
              />
              <Typography as="h3" size="h5" className="font-bold text-[#111827]">
                Medical History & Antecedents
              </Typography>
            </div>

            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <div>
                <Typography as="p" size="sm" className="font-bold text-[#111827] mb-3">
                  Personal History
                </Typography>
                <ul className="space-y-2">
                  {antecedents.personal.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[#6B7280]"
                    >
                      <Icon
                        icon="mdi:check-circle-outline"
                        width="18"
                        className="text-[#27AE60] mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Typography as="p" size="sm" className="font-bold text-[#111827] mb-3">
                  Family History
                </Typography>
                <ul className="space-y-2">
                  {antecedents.family.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[#6B7280]"
                    >
                      <Icon
                        icon="mdi:check-circle-outline"
                        width="18"
                        className="text-[#27AE60] mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-4">
          {medicalHistory.map((record, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#E5E7EB] p-6 hover:border-[#2F80ED] transition"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Typography as="p" size="sm" className="font-bold text-[#111827]">
                      {record.diagnosis}
                    </Typography>
                    <span className="bg-[#EFF6FF] text-[#2F80ED] px-2 py-1 rounded text-xs font-medium">
                      {record.icd10}
                    </span>
                  </div>

                  <Typography as="p" size="sm" className="text-[#828282] mb-1">
                    Dr. {record.doctor}
                  </Typography>

                  <Typography as="p" size="sm" className="text-[#6B7280]">
                    {record.date}
                  </Typography>
                </div>

                <button className="text-[#2F80ED] hover:text-[#1e5bc3] font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "documents" && (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-[#E5E7EB] p-6 flex items-center justify-between hover:border-[#2F80ED] transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                  <Icon
                    icon={doc.icon}
                    width="24"
                    className="text-[#2F80ED]"
                  />
                </div>

                <div>
                  <Typography as="p" size="sm" className="font-bold text-[#111827]">
                    {doc.name}
                  </Typography>
                  <Typography as="p" size="sm" className="text-[#828282]">
                    {doc.date}
                  </Typography>
                </div>
              </div>

              <button className="text-[#2F80ED] hover:text-[#1e5bc3]">
                <Icon icon="mdi:download" width="24" />
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "timeline" && (
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
          <Typography as="p" size="sm" className="text-[#828282]">
            Timeline feature coming soon. View the dedicated Timeline page for
            detailed chronological health records.
          </Typography>

          <Link
            href={`/patients/${params.id}/timeline`}
            className="inline-flex items-center gap-2 text-[#2F80ED] hover:text-[#1e5bc3] font-medium mt-4"
          >
            Go to Timeline
            <Icon icon="mdi:arrow-right" width="20" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PatientOverviewPage;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                