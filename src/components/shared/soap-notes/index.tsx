"use client";

import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "@/components/shared/typography";
import { Button } from "@/components/shared/button";

interface SOAPNotesProps {
  consultationId: string;
  onSave?: (data: SOAPData) => void;
}

export interface SOAPData {
  subjective: string;
  objective: string;
  assessment: string;
  diagnosisCode: string;
  diagnosisLabel: string;
  plan: string;
  followUpDays: number;
}

const ICD10_COMMON = [
  { code: "J00", label: "Rhinopharyngite aiguë" },
  { code: "J06.9", label: "Infection des voies respiratoires supérieures" },
  { code: "A09", label: "Diarrhée et gastro-entérite" },
  { code: "K29.7", label: "Gastrite non spécifiée" },
  { code: "I10", label: "Hypertension essentielle" },
  { code: "E11.9", label: "Diabète de type 2 sans complication" },
  { code: "J45.9", label: "Asthme non spécifié" },
  { code: "B54", label: "Paludisme non spécifié" },
  { code: "Z00.0", label: "Examen médical général" },
  { code: "R50.9", label: "Fièvre non spécifiée" },
  { code: "K92.1", label: "Mélaena" },
  { code: "N39.0", label: "Infection des voies urinaires" },
];

const SOAPNotes: React.FC<SOAPNotesProps> = ({ consultationId, onSave }) => {
  const [subjective, setSubjective] = useState("");
  const [objective, setObjective] = useState("");
  const [assessment, setAssessment] = useState("");
  const [plan, setPlan] = useState("");
  const [followUpDays, setFollowUpDays] = useState(7);

  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [diagnosisLabel, setDiagnosisLabel] = useState("");
  const [diagnosisSearch, setDiagnosisSearch] = useState("");
  const [showDiagnosisDropdown, setShowDiagnosisDropdown] = useState(false);

  const diagnosisInputRef = useRef<HTMLInputElement>(null);

  const filteredDiagnosis = ICD10_COMMON.filter(
    (item) =>
      item.code.toLowerCase().includes(diagnosisSearch.toLowerCase()) ||
      item.label.toLowerCase().includes(diagnosisSearch.toLowerCase())
  );

  const handleDiagnosisSelect = (code: string, label: string) => {
    setDiagnosisCode(code);
    setDiagnosisLabel(label);
    setDiagnosisSearch("");
    setShowDiagnosisDropdown(false);
  };

  const handleRemoveDiagnosis = () => {
    setDiagnosisCode("");
    setDiagnosisLabel("");
    setDiagnosisSearch("");
  };

  const handleSave = () => {
    const data: SOAPData = {
      subjective,
      objective,
      assessment,
      diagnosisCode,
      diagnosisLabel,
      plan,
      followUpDays,
    };
    if (onSave) {
      onSave(data);
    }
  };

  const handleSaveDraft = () => {
    const data: SOAPData = {
      subjective,
      objective,
      assessment,
      diagnosisCode,
      diagnosisLabel,
      plan,
      followUpDays,
    };
    if (onSave) {
      onSave(data);
    }
  };

  return (
    <div className="w-full space-y-6 p-6 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <Typography as="h3" size="h5" className="text-black font-bold">
          Clinical Notes (SOAP)
        </Typography>
        <Icon icon="ic:baseline-lock" width={20} height={20} className="text-primary-color" />
      </div>

      <div className="space-y-6">
        <div className="border-l-4 border-blue-500 pl-4 py-4 bg-blue-50 rounded-r-lg">
          <Typography size="sm" className="text-black font-semibold mb-2">
            S — Subjective
          </Typography>
          <Typography size="sm" className="text-desc-color mb-3">
            Chief complaint and patient-reported symptoms
          </Typography>
          <div className="relative">
            <textarea
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              placeholder="Patient reports..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            />
            <Typography size="sm" className="text-desc-color mt-1 text-right">
              {subjective.length}/500
            </Typography>
          </div>
        </div>

        <div className="border-l-4 border-green-500 pl-4 py-4 bg-green-50 rounded-r-lg">
          <Typography size="sm" className="text-black font-semibold mb-2">
            O — Objective
          </Typography>
          <Typography size="sm" className="text-desc-color mb-3">
            Physical examination findings, vital signs
          </Typography>
          <div className="relative">
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="On examination..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            />
            <Typography size="sm" className="text-desc-color mt-1 text-right">
              {objective.length}/500
            </Typography>
          </div>
        </div>

        <div className="border-l-4 border-orange-500 pl-4 py-4 bg-orange-50 rounded-r-lg">
          <Typography size="sm" className="text-black font-semibold mb-2">
            A — Assessment
          </Typography>
          <Typography size="sm" className="text-desc-color mb-3">
            Diagnosis and clinical impression
          </Typography>

          <div className="space-y-3">
            <div className="relative" ref={diagnosisInputRef}>
              <div className="relative">
                <Icon
                  icon="ic:baseline-search"
                  width={16}
                  height={16}
                  className="absolute left-3 top-3 text-desc-color"
                />
                <input
                  type="text"
                  value={diagnosisSearch}
                  onChange={(e) => {
                    setDiagnosisSearch(e.target.value);
                    setShowDiagnosisDropdown(true);
                  }}
                  onFocus={() => setShowDiagnosisDropdown(true)}
                  placeholder="Search diagnosis (ICD-10)"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color text-sm"
                />
              </div>

              {showDiagnosisDropdown && diagnosisSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                  {filteredDiagnosis.length > 0 ? (
                    filteredDiagnosis.map((item) => (
                      <div
                        key={item.code}
                        onClick={() => handleDiagnosisSelect(item.code, item.label)}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer border-b last:border-b-0"
                      >
                        <Typography size="sm" className="font-semibold text-black">
                          {item.code}
                        </Typography>
                        <Typography size="sm" className="text-desc-color">
                          {item.label}
                        </Typography>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2">
                      <Typography size="sm" className="text-desc-color">
                        No results found
                      </Typography>
                    </div>
                  )}
                </div>
              )}
            </div>

            {diagnosisCode && (
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 border border-primary-color rounded-full px-3 py-1 flex items-center gap-2">
                  <Typography size="sm" className="text-black">
                    <span className="font-semibold">{diagnosisCode}</span> - {diagnosisLabel}
                  </Typography>
                  <button
                    onClick={handleRemoveDiagnosis}
                    className="text-desc-color hover:text-black"
                  >
                    <Icon icon="ic:baseline-close" width={14} height={14} />
                  </button>
                </div>
              </div>
            )}

            <textarea
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Additional assessment notes..."
              className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            />
            <Typography size="sm" className="text-desc-color text-right">
              {assessment.length}/500
            </Typography>
          </div>
        </div>

        <div className="border-l-4 border-purple-500 pl-4 py-4 bg-purple-50 rounded-r-lg">
          <Typography size="sm" className="text-black font-semibold mb-2">
            P — Plan
          </Typography>
          <Typography size="sm" className="text-desc-color mb-3">
            Treatment plan, medications, referrals
          </Typography>
          <div className="relative">
            <textarea
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="Plan includes..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            />
            <Typography size="sm" className="text-desc-color mt-1 text-right">
              {plan.length}/500
            </Typography>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Typography size="sm" className="text-black font-semibold">
              Schedule follow-up in
            </Typography>
            <input
              type="number"
              value={followUpDays}
              onChange={(e) => setFollowUpDays(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-color text-center"
            />
            <Typography size="sm" className="text-black font-semibold">
              days
            </Typography>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button
          variant="primary"
          size="medium"
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Icon icon="ic:baseline-save" width={18} height={18} />
          Save
        </Button>
        <Button
          variant="outlined"
          size="medium"
          onClick={handleSaveDraft}
          className="flex-1"
        >
          Save as Draft
        </Button>
      </div>
    </div>
  );
};

export default SOAPNotes;
