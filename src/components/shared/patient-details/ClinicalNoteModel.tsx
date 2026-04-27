"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Typography } from "../typography";

interface ClinicalNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onChatClick?: () => void;
}

const ClinicalNoteModal = ({
  isOpen,
  onClose,
  onChatClick,
}: ClinicalNoteProps) => {
  if (!isOpen) return null;

  const soapNotes = [
    {
      title: "Subjective",
      description:
        "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
    },
    {
      title: "Objective",
      description:
        "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
    },
    {
      title: "Assessment",
      description:
        "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
    },
    {
      title: "Plan",
      description:
        "Symptoms improving, headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene",
    },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg relative overflow-y-auto max-h-[70vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-6 w-6 flex items-center justify-center bg-primary-color rounded-full text-white"
        >
          <Icon icon="mingcute:close-fill" width={18} height={18} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6">
          <Typography
            size="h3"
            className="text-lg font-semibold text-gray-800 mb-6"
          >
            Add Note
          </Typography>
          <Typography className="text-desc-color pb-2">
            Add medical notes.
          </Typography>

          {/* SOAP Fields */}
          <div className="space-y-4">
            {soapNotes.map((item, index) => (
              <div key={index}>
                <Typography size="lg" className="font-bold text-[#2c2c2c]">
                  {item.title}
                </Typography>
                <textarea
                  defaultValue={item.description} // prefilled description
                  className="w-full mt-1 border rounded-lg p-3 text-sm font-medium text-desc-color resize-none focus:outline-none focus:ring-1 focus:ring-primary-color min-h-[90px]"
                  placeholder="Enter details..."
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end py-4 gap-3">
            <button className="bg-[#ededed] font-semibold px-3 py-2 rounded-lg">
              Add into prescription
            </button>
            <button className="bg-primary-color font-semibold text-white px-3 py-2 rounded-lg">
              Submit
            </button>
          </div>

          {/* Optional Icons */}
          {onChatClick && (
            <div className="flex gap-2 flex-wrap mt-6">
              {[{ icon: "mdi:message-outline", onClick: onChatClick }].map(
                (item, i) => (
                  <div
                    key={i}
                    onClick={item.onClick}
                    className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer bg-[#2C2C2C]"
                  >
                    <Icon icon={item.icon} width="18" className="text-white" />
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalNoteModal;
