"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";

interface QuickSummaryProps {
  patientId: string;
}

interface MockPatient {
  name: string;
  activeConditions: { label: string; code: string }[];
  medications: string[];
  allergies: string[];
  lastVisitDate: string;
  alerts: string[];
}

const mockPatientData: MockPatient = {
  name: "Sarah Johnson",
  activeConditions: [
    { label: "Type 2 Diabetes", code: "E11.9" },
    { label: "Hypertension", code: "I10" },
    { label: "Asthma", code: "J45.9" },
  ],
  medications: ["Metformin 1000mg", "Lisinopril 10mg", "Albuterol inhaler"],
  allergies: ["Penicillin", "Shellfish"],
  lastVisitDate: "2026-04-18",
  alerts: ["Recent medication change", "Follow-up required"],
};

const QuickPatientSummary: React.FC<QuickSummaryProps> = ({ patientId }) => {
  const patient = mockPatientData;
  const moreConditions = Math.max(0, patient.activeConditions.length - 3);
  const visibleConditions = patient.activeConditions.slice(0, 3);
  const visibleMedications = patient.medications.slice(0, 3);
  const moreMedications = Math.max(0, patient.medications.length - 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md border border-gray-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <Icon icon="ic:baseline-person" width={24} height={24} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <Typography size="sm" className="font-semibold text-black">
              {patient.name}
            </Typography>
            <button className="text-primary-color text-xs hover:underline">
              View full record
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-2">
        <Icon icon="ic:baseline-flash" width={16} height={16} className="text-orange-500 flex-shrink-0" />
        <Typography size="sm" className="text-black font-semibold">
          30-second summary
        </Typography>
      </div>

      <div className="space-y-3 border-t pt-3">
        <div>
          <Typography size="sm" className="text-desc-color font-semibold mb-2">
            Active Conditions
          </Typography>
          <div className="flex flex-wrap gap-2">
            {visibleConditions.map((condition) => (
              <span
                key={condition.code}
                className="bg-blue-100 text-black text-xs px-2 py-1 rounded-full border border-primary-color"
              >
                {condition.label}
              </span>
            ))}
            {moreConditions > 0 && (
              <span className="bg-gray-100 text-black text-xs px-2 py-1 rounded-full border border-gray-300 font-semibold">
                +{moreConditions} more
              </span>
            )}
          </div>
        </div>

        <div>
          <Typography size="sm" className="text-desc-color font-semibold mb-2">
            Current Medications
          </Typography>
          <div className="space-y-1">
            {visibleMedications.map((med, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Icon
                  icon="ic:baseline-check-circle"
                  width={14}
                  height={14}
                  className="text-green-600 mt-0.5 flex-shrink-0"
                />
                <Typography size="sm" className="text-black">
                  {med}
                </Typography>
              </div>
            ))}
            {moreMedications > 0 && (
              <Typography size="sm" className="text-primary-color font-semibold ml-5">
                +{moreMedications} more medications
              </Typography>
            )}
          </div>
        </div>

        <div>
          <Typography size="sm" className="text-desc-color font-semibold mb-2">
            Known Allergies
          </Typography>
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((allergy, idx) => (
              <span key={idx} className="bg-red-100 text-red border border-red px-2 py-1 rounded-full text-xs font-semibold">
                {allergy}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-2 rounded-lg">
          <Typography size="sm" className="text-desc-color">
            <span className="font-semibold">Last Visit:</span> {formatDate(patient.lastVisitDate)}
          </Typography>
        </div>

        {patient.alerts.length > 0 && (
          <div className="bg-red-50 border border-red rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon
                icon="ic:baseline-warning"
                width={16}
                height={16}
                className="text-red flex-shrink-0"
              />
              <Typography size="sm" className="font-semibold text-red">
                Red Flags / Alerts
              </Typography>
            </div>
            <ul className="space-y-1">
              {patient.alerts.map((alert, idx) => (
                <li key={idx} className="text-xs text-black ml-5 list-disc">
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickPatientSummary;
