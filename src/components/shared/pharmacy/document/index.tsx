"use client";

import React, { useState } from "react";
import LegalInformation from "./legal-info";
import ValidationInfo from "./validation";
import ContactInfo from "./contact-info";
import DocumentsInfo from "./document-info";

export default function PharmacyRegistration() {
  const [activeTab, setActiveTab] = useState("legal");

  const tabs = [
    { id: "legal", label: "Legal Information" },
    { id: "validation", label: "Validation" },
    { id: "contact", label: "Contact" },
    { id: "documents", label: "Documents" },
  ];

  return (
    <div className="w-full bg-white rounded-xl min-h-screen p-6">
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-lg text-sm font-medium transition 
              ${
                activeTab === tab.id
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#E5E7EB] text-[#4B5563]"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Show Active Component */}
      {activeTab === "legal" && <LegalInformation />}
      {activeTab === "validation" && <ValidationInfo />}
      {activeTab === "contact" && <ContactInfo />}
      {activeTab === "documents" && <DocumentsInfo />}
    </div>
  );
}
