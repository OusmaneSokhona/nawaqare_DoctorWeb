"use client";
import { useState } from "react";
import { Typography } from "../../typography";
import CarePlan from "../careTab";
import DocumentsPlan from "../video-documents";

interface FormData {
  reason: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

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

export default function MedicalObservation() {
  const [activeTab, setActiveTab] = useState<string>("clinical");
  const [formData, setFormData] = useState<FormData>({
    reason: "Hypertension",
    subjective:
      "Symptoms improving. Headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene.",
    objective:
      "Symptoms improving. Headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene.",
    assessment:
      "Symptoms improving. Headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene.",
    plan: "Symptoms improving. Headache frequency reduced from 5 to 2 times per week. Advised patient to continue current regimen and maintain sleep hygiene.",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveDraft = () => {
    console.log("Saving draft:", formData);
    // Add your save draft logic here
  };

  const handleFinalizeNote = () => {
    console.log("Finalizing note:", formData);
    // Add your finalize note logic here
  };

  const handleSignIfRequired = () => {
    console.log("Sign if required clicked");
    // Add your sign logic here
  };

  return (
    <div className="border rounded-xl">
      <div className="">
        {/* Header */}
        <div className="bg-[#EBE9F6] rounded-tl-xl rounded-tr-xl">
          <Typography
            size="h4"
            className="text-[#2c2c2c] px-3 py-2 font-semibold"
          >
            Medical Observation & Care Plan
          </Typography>
        </div>
        <div className="">
          <div className="p-6">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("clinical")}
                className={`pb-3 px-1 font-medium transition-all relative ${
                  activeTab === "clinical"
                    ? "text-primary-color"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Clinical Note
                {activeTab === "clinical" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-color"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`pb-3 px-1 font-medium transition-all relative ${
                  activeTab === "care"
                    ? "text-primary-color"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Care Plan
                {activeTab === "care" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-color"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`pb-3 px-1 font-medium transition-all relative ${
                  activeTab === "documents"
                    ? "text-primary-color"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Documents
                {activeTab === "documents" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-color"></div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content - Clinical Note Tab */}
        {activeTab === "clinical" && (
          <div className="bg-white shadow-sm p-6">
            <Typography
              size="h4"
              className="text-lg font-semibold text-gray-800 mb-6"
            >
              Soap Notes
            </Typography>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* <div>
                <label className="block  font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Enter reason"
                />
              </div>

              
              <div>
                <label className="block  font-medium text-gray-700 mb-2">
                  Subjective
                </label>
                <textarea
                  value={formData.subjective}
                  onChange={(e) => handleInputChange('subjective', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Enter subjective information"
                />
              </div>

              
              <div>
                <label className="block  font-medium text-gray-700 mb-2">
                  Objective
                </label>
                <textarea
                  value={formData.objective}
                  onChange={(e) => handleInputChange('objective', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Enter objective information"
                />
              </div>

              
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Assessment
                </label>
                <textarea
                  value={formData.assessment}
                  onChange={(e) => handleInputChange('assessment', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Enter assessment"
                />
              </div>

             
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Plan
                </label>
                <textarea
                  value={formData.plan}
                  onChange={(e) => handleInputChange('plan', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Enter plan"
                />
              </div> */}
              <div className="space-y-3 mt-6">
                {soapNotes.map((item, index) => (
                  <div key={index} className="">
                    <Typography size="lg" className="text-[#2c2c2c] font-bold">
                      {item.title}
                    </Typography>

                    <div className="border rounded-lg px-4 py-6 mt-1">
                      <Typography className="text-desc-color font-medium">
                        {item.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
              {/* Bottom Action Buttons */}
              <div className=" shadow-sm p-6 flex flex-wrap gap-4 items-center justify-between">
                <button
                  onClick={handleSignIfRequired}
                  className="text-primary-color underline font-semibold hover:text-blue transition-colors"
                >
                  Sign if required
                </button>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleFinalizeNote}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Finalize note
                  </button>
                  <button
                    onClick={handleSaveDraft}
                    className="px-6 py-2.5 bg-primary-color text-white font-medium rounded-lg hover:bg-blue transition-all shadow-md hover:shadow-lg"
                  >
                    Save draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "care" && (
          <div>
            <CarePlan />
          </div>
        )}
        {activeTab === "documents" && (
          <div>
            <DocumentsPlan />
          </div>
        )}
      </div>
    </div>
  );
}
