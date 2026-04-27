"use client";

import CustomTabs from "@/components/shared/custom-tabs";
import { Typography } from "@/components/shared/typography";
import { allPatients } from "@/data";
import { AllPatients } from "@/types/dashboard";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { FC, useMemo } from "react";
import { Icon } from "@iconify/react";

interface Tab {
  label: string;
  value: string;
  lock: boolean;
}

const tabs: Tab[] = [
  { lock: false, label: "analyticsp", value: "Analytics" },
  { lock: false, label: "timeline", value: "Timeline" },
  { lock: true, label: "patient", value: "Medical Data" },
  { lock: true, label: "Notes", value: "Clinical Notes" },
  { lock: true, label: "Reports", value: "Medical Reports" },
  { lock: false, label: "appointments", value: "Appointments" },
  { lock: true, label: "Prescriptions", value: "Prescriptions" },
  { lock: false, label: "payment_history", value: "Payments" },
  { lock: false, label: "Consent", value: "Consent & Authorizations" },
];

const Chip = ({
  label,
  variant = "gray",
}: {
  label: string;
  variant?: "green" | "blue" | "red" | "gray";
}) => {
  const styles =
    variant === "green"
      ? "bg-[#27AE60] text-white"
      : variant === "blue"
        ? "bg-[#2F80ED1A] text-[#2F80ED]"
        : variant === "red"
          ? "bg-[#EB57571A] text-[#EB5757]"
          : "bg-[#EAEEF7] text-[#1F2937]";

  return (
    <span className={`px-4 py-1.5 rounded-lg text-sm font-medium ${styles}`}>
      {label}
    </span>
  );
};

const InfoItem = ({ label, value }: { label: string; value?: any }) => (
  <div className="min-w-[160px]">
    <div className="text-lg font-semibold text-[#111827]">{label}:</div>
    <div className="text-md text-[#6B7280] mt-1">{value ?? "-"}</div>
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="pt-3">
    <div className="text-xl font-bold text-[#111827]">{children}</div>
    {/* <div className="h-[1px] bg-[#E5E7EB] mt-3" /> */}
  </div>
);

const PatientDetail: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const patient = useMemo(
    () =>
      allPatients?.RowsData?.find(
        (item: AllPatients) => item?.id?.toString() === id,
      ),
    [id],
  );

  if (!patient) return <p className="p-6">No data found</p>;

  // Demo placeholders like your screenshot
  const patientMeta = {
    patientId: `#${String(patient.id).padStart(7, "0")}`,
    age: patient.age ?? 50,
    sex: patient.gender ?? "female",
  };

  return (
    <div className="w-full">
      {/* Page background like screenshot */}

      {/* Top Card */}
      <div className="py-5">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-[82px] h-[82px] rounded-xl overflow-hidden bg-gray-100">
              <Image
                src="/assets/svg/profile.svg"
                alt={patient.fname}
                width={82}
                height={82}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="text-lg font-bold text-[#111827]">
                {patient.fname}
              </div>
              <div className="text-sm text-[#6B7280]">
                Patient ID:{patientMeta.patientId} · Age:{patientMeta.age} ·
                sex:
                {patientMeta.sex}
              </div>

              <div className="flex gap-2 flex-wrap">
                <Chip label="Active" variant="green" />
                <Chip label="Peanuts" variant="blue" />
                <Chip label="High Risk" variant="red" />
              </div>
            </div>
          </div>

          {/* Actions right side */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center"
              aria-label="Messages"
            >
              <Icon
                icon="mdi:message-text-outline"
                width="20"
                className="text-[#2F80ED]"
              />
            </button>

            <button
              type="button"
              className="h-10 px-4 rounded-xl bg-[#E5E7EB] text-sm font-semibold text-[#374151] flex items-center gap-2"
            >
              Add Notes
            </button>

            <button
              type="button"
              className="h-10 px-4 rounded-xl bg-[#2F80ED] text-white text-sm font-semibold flex items-center gap-2"
            >
              Start Consultation
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-5 gap-x-8 gap-y-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          <InfoItem label="Email" value={patient.email ?? "ali@gmail.com"} />
          <InfoItem
            label="Phone Number"
            value={patient.phone ?? "+92 3001234567"}
          />
          <InfoItem label="Date of Birth" value={"12/Sep/2023"} />
          <InfoItem label="Emergency Contact" value={"March 2022"} />
          <InfoItem label="Member Since" value={"March 2022"} />

          <InfoItem label="Last Login" value={"Oct 10, 2025 - 8:30 AM"} />
          <InfoItem
            label="Address"
            value={patient.city ?? "xyz street usa........"}
          />
        </div>

        {/* Secondary Information */}
        <div className="mt-6">
          <SectionTitle>Secondary Information</SectionTitle>

          <div className="mt-5 grid grid-cols-4 gap-x-8 gap-y-6 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            <InfoItem
              label="Primary Pharmacy"
              value={"subtle gray line separating header"}
            />
            <InfoItem label="Medical Record ID" value={"March 2022"} />
            <InfoItem
              label="Referring Doctor"
              value={"Oct 10, 2025 - 8:30 AM"}
            />
            <InfoItem label="Allergy" value={"From Peanuts"} />
          </div>

          {/* Consent Alert */}
          <div className="mt-6 bg-[#ebd3e1] rounded-lg px-4 py-3 flex items-center gap-2">
            <Icon
              icon="mdi:alert-circle-outline"
              width="18"
              className="text-red"
            />
            <div className="text-sm font-medium">
              “Consent required before next consultation”
            </div>
          </div>
        </div>

        {/* Insurance Plan */}
        <div className="mt-4">
          <SectionTitle>Insurance Plan</SectionTitle>

          <div className="mt-5 grid grid-cols-5 gap-x-2 gap-y-6 max-md:grid-cols-2 max-sm:grid-cols-1">
            <InfoItem label="Health Plan Name" value={"Asmere health"} />
            <InfoItem label="insurance ID" value={"#1234**56"} />
            <InfoItem label="Validity Dates" value={"12/sep/2025"} />
          </div>
        </div>
      </div>

      {/* Tabs section like screenshot (below card) */}
      <div className="mt-2 mb-3">
        <CustomTabs tabs={tabs} />
        {/* <div className="h-[1px] bg-red mt-3" /> */}
      </div>
    </div>
  );
};

export default PatientDetail;
