"use client";
import React from "react";
import { Icon } from "@iconify/react";

const PrescriptionVideoCall = () => {
  return (
    <div className="h-full flex flex-col justify-between ">
      {/* Top Content */}
      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#2C2C2C]">
          Add Prescription
        </h2>

        {/* Patient Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Patient Name
          </label>
          <input
            type="text"
            defaultValue="Mr john"
            className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* Medications */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Medications
          </label>
          <input
            type="text"
            defaultValue="Amoxicillin 500mg"
            className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* Dosage */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Dosage</label>
          <div className="relative">
            <select className="w-full px-4 py-3 rounded-xl border bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-color">
              <option>Morning/Evening</option>
              <option>Morning</option>
              <option>Evening</option>
              <option>Twice Daily</option>
            </select>
            <Icon
              icon="mdi:chevron-down"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              width="20"
            />
          </div>
        </div>

        {/* Refill Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Refill Date
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <Icon
              icon="mdi:calendar-month"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
              width="20"
            />
          </div>
        </div>

        {/* Diagnosis Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Diagnosis Notes (optional)
          </label>
          <textarea
            rows={4}
            defaultValue="Avoid antibiotics in same family"
            className="w-full px-4 py-3 rounded-xl border bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="space-y-3 mt-8">
        <button className="w-full py-3 rounded-xl bg-primary-color text-white font-semibold shadow-md hover:bg-primary-color transition">
          Save
        </button>

        <button className="w-full py-3 rounded-xl bg-gray-200 text-gray-600 font-semibold">
          Send to Patient
        </button>
      </div>
    </div>
  );
};

export default PrescriptionVideoCall;
