"use client";

import React from "react";
import { Icon } from "@iconify/react";

type Status =
  | "Verified"
  | "Validated"
  | "Resolved"
  | "Pending review"
  | "Unverified";

type Action = {
  label: string;
  variant?: "blue" | "green" | "gray";
};

type Card = {
  title: string; // left top title
  rightValue: string; // right top value (e.g., Penicillin)
  lastUpdated: string;
  meta1?: string; // e.g., Severity / Duration / Dose
  meta2?: string; // e.g., Dr. Emily Carter pill
  status?: Status;
  actions?: Action[]; // bottom links
};

type Section = {
  heading: string;
  card: Card;
};

const statusPill = (status?: Status) => {
  if (!status) return "";
  const s = status.toLowerCase();

  if (s === "pending review") return "bg-[#F2994A] text-white";
  if (s === "verified" || s === "validated" || s === "resolved")
    return "bg-[#27AE60] text-white";
  if (s === "unverified") return "bg-[#E5E7EB] text-[#374151]";
  return "bg-[#E5E7EB] text-[#374151]";
};

const actionClass = (variant?: Action["variant"]) => {
  if (variant === "green") return "text-[#27AE60] font-semibold";
  if (variant === "gray") return "text-[#6B7280] font-medium";
  return "text-[#2F80ED] font-semibold"; // blue default
};

const SummaryCard = ({ card }: { card: Card }) => {
  return (
    <div className="relative bg-white rounded-lg border border-[#EEF2F7] shadow-sm px-4 py-6 min-h-[140px]">
      {/* Top row: left title + right value */}
      <div className="flex items-start justify-between gap-4">
        <div className="text-md font-bold text-[#111827]">{card.title}</div>
        <div className="text-xs font-medium text-[#111827]">
          {card.rightValue}
        </div>
      </div>

      {/* Meta lines */}
      <div className="mt-2 space-y-1">
        <div className="text-[11px] text-[#9CA3AF]">
          Last updated: {card.lastUpdated}
        </div>

        {card.meta1 ? (
          <div className="text-[11px] text-[#6B7280]">{card.meta1}</div>
        ) : null}

        {card.meta2 ? (
          <div className="inline-flex w-fit rounded px-2 py-0.5 text-[10px] font-medium bg-[#E8F1FF] text-[#2F80ED]">
            {card.meta2}
          </div>
        ) : null}
      </div>

      {/* Status pill (right side, like screenshot) */}
      {card.status ? (
        <div className="absolute right-4 top-[56px]">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${statusPill(
              card.status,
            )}`}
          >
            {card.status}
          </span>
        </div>
      ) : null}

      {/* Bottom actions */}
      <div className="mt-4 flex items-center gap-4">
        {(
          card.actions ?? [
            { label: "View History", variant: "blue" },
            { label: "Mark verified", variant: "green" },
          ]
        ).map((a, idx) => (
          <button
            key={idx}
            type="button"
            className={`text-[11px] underline underline-offset-2 ${actionClass(
              a.variant,
            )}`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* Edit icon pinned bottom-right */}
      <button
        type="button"
        className="absolute right-5 bottom-7"
        aria-label="Edit"
      >
        <Icon
          icon="flowbite:edit-outline"
          width="14"
          className="text-primary-color"
        />
      </button>
    </div>
  );
};

const PatientMedicalSummary = () => {
  const sections: Section[] = [
    {
      heading: "Personal Medical History",
      card: {
        title: "Hypertension",
        rightValue: "Hypertension",
        lastUpdated: "Sep 28, 2025",
        meta1: "Duration: Existing",
        meta2: "Dr. Emily Carter",
        status: "Validated",
      },
    },
    {
      heading: "Problem History",
      card: {
        title: "Problem List",
        rightValue: "Acute Bronchitis",
        lastUpdated: "Sep 28, 2025",
        meta1: "Treated with antibiotics",
        meta2: "Dr. Emily Carter",
        status: "Resolved",
        actions: [
          { label: "Add Note", variant: "gray" },
          { label: "Add Problem", variant: "blue" },
          { label: "Mark as Resolved", variant: "green" },
        ],
      },
    },
    {
      heading: "Allergies and intolerances",
      card: {
        title: "Allergies",
        rightValue: "Penicillin",
        lastUpdated: "Sep 28, 2025",
        meta1: "Severity: Normal",
        meta2: "Dr. Emily Carter",
        status: "Pending review",
      },
    },
    {
      heading: "Current medications",
      card: {
        title: "Current Medications",
        rightValue: "Metformin",
        lastUpdated: "Sep 28, 2025",
        meta1: "Twice a day",
        meta2: "Dr. Emily Carter",
        status: "Verified",
      },
    },
    {
      heading: "Family history",
      card: {
        title: "Family History",
        rightValue: "Mother – Hypertension",
        lastUpdated: "Sep 28, 2025",
        meta1: "Severity: Normal",
        meta2: "Dr. Emily Carter",
        status: "Verified",
      },
    },
    {
      heading: "Vaccinations",
      card: {
        title: "Vaccination History",
        rightValue: "Influenza",
        lastUpdated: "Sep 28, 2025",
        meta1: "Last dose date: 12/sep/2023",
        meta2: "Dr. Emily Carter",
        status: "Validated",
      },
    },
    {
      heading: "Baseline vitals",
      card: {
        title: "Baseline vitals",
        rightValue: "BP / Weight / Height / BMI...",
        lastUpdated: "Sep 28, 2025",
        meta2: "Dr. Emily Carter",
        status: "Verified",
      },
    },
    {
      heading: "Surgical history",
      card: {
        title: "Surgical History",
        rightValue: "Appendectomy — 2016",
        lastUpdated: "Sep 28, 2025",
        meta1: "Severity: Normal",
        meta2: "Dr. Emily Carter",
        status: "Validated",
      },
    },
    {
      heading: "Infectious history",
      card: {
        title: "Infectious History",
        rightValue: "COVID-19 — 2022",
        lastUpdated: "Sep 28, 2025",
        meta1: "Last dose date: 12/sep/2023",
        meta2: "Dr. Emily Carter",
        status: "Validated",
      },
    },
    {
      heading: "Lifestyle habits / risk factors",
      card: {
        title: "Lifestyle & Risk Factors",
        rightValue: "",
        lastUpdated: "Sep 28, 2025",
        meta1: "Smoking: Occasional",
        status: "Verified",
      },
    },
  ];

  return (
    <div className="w-full py-4">
      {/* Banner */}
      <div className="mb-5 bg-[#ece2e5] border rounded-lg px-4 py-2.5 flex items-center gap-2">
        <Icon
          icon="mdi:alert-circle-outline"
          width="16"
          className="text-[#F2994A]"
        />
        <div className="text-xs font-medium text-[#111827]">
          Medical data is highly sensitive and displayed for authorized staff
          only. No export or screenshotting permitted.
        </div>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mb-3">
        {sections.slice(0, 3).map((s, idx) => (
          <div key={idx} className="text-lg font-bold text-[#111827]">
            {s.heading}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.slice(0, 3).map((s, idx) => (
          <SummaryCard key={idx} card={s.card} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-8 mb-3">
        {sections.slice(3, 6).map((s, idx) => (
          <div key={idx} className="text-lg font-bold text-[#111827]">
            {s.heading}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.slice(3, 6).map((s, idx) => (
          <SummaryCard key={idx} card={s.card} />
        ))}
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 mt-8 mb-3">
        {sections.slice(6, 9).map((s, idx) => (
          <div key={idx} className="text-lg font-bold text-[#111827]">
            {s.heading}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.slice(6, 9).map((s, idx) => (
          <SummaryCard key={idx} card={s.card} />
        ))}
      </div>

      {/* Last row: single left card */}
      <div className="mt-8 mb-3 text-lg font-bold text-[#111827]">
        {sections[9].heading}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard card={sections[9].card} />
      </div>
    </div>
  );
};

export default PatientMedicalSummary;
