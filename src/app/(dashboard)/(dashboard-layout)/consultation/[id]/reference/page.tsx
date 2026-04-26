"use client";

import { useState } from "react";
import { Typography } from "@/components/shared/typography";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface SentReference {
  id: string;
  doctorName: string;
  specialty: string;
  dateSent: string;
  status: "Sent" | "Accepted" | "Responded";
  response?: string;
}

const ReferenceLetter = ({ params }: { params: { id: string } }) => {
  const consultationId = params.id;
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    referTo: "",
    specialty: "Cardiology",
    urgency: "Routine",
    clinicalSummary:
      "Patient presents with elevated blood pressure readings over the past 3 weeks. Initial assessment shows consistent readings above 140/90 mmHg. Patient reports occasional headaches and fatigue. Current medications reviewed. Requires specialist evaluation for hypertension management and potential medication adjustment.",
    reasonForReferral: "",
    attachments: ["Vital Signs Report", "Lab Results", "Previous Consultation Notes"],
  });

  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([
    "Vital Signs Report",
  ]);

  const [showPreview, setShowPreview] = useState(false);

  const mockSentReferences: SentReference[] = [
    {
      id: "1",
      doctorName: "Dr. Ahmed Al-Mansouri",
      specialty: "Cardiology",
      dateSent: "2025-04-15",
      status: "Responded",
      response: "Received. Initial consultation scheduled for April 28, 2025. Recommend ECG before visit.",
    },
    {
      id: "2",
      doctorName: "Dr. Fatima Hassan",
      specialty: "Nephrology",
      dateSent: "2025-04-10",
      status: "Accepted",
    },
    {
      id: "3",
      doctorName: "Dr. Mohammed Ali",
      specialty: "Orthopedics",
      dateSent: "2025-04-05",
      status: "Sent",
    },
  ];

  const specialties = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Dermatology",
    "Ophthalmology",
    "ENT",
    "Psychiatry",
  ];

  const toggleAttachment = (doc: string) => {
    setSelectedAttachments((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setShowPreview(false);
  };

  return (
    <div className="mt-5">
      <div className="flex max-md:flex-col max-md:gap-4 justify-between items-start mb-8">
        <div>
          <Typography size="h5" as="h5" className="font-bold">
            Reference Letter
          </Typography>
          <Typography className="text-[#828282] text-sm">
            Send medical referrals to specialist doctors
          </Typography>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#2f80ed] text-white px-6 py-2.5 rounded-[12px] hover:opacity-90 transition-opacity"
          >
            <Icon icon="mingcute:plus-fill" width="20" height="20" />
            New Reference
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-[#e8e8e8]">
          <Typography size="h6" as="h6" className="font-bold mb-4">
            Create Reference Letter
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Refer to Doctor Name
                </label>
                <input
                  type="text"
                  value={formData.referTo}
                  onChange={(e) => setFormData({ ...formData, referTo: e.target.value })}
                  placeholder="Dr. Name"
                  className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Specialty</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
                >
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Urgency Level</label>
              <div className="flex gap-3">
                {["Routine", "Semi-urgent", "Urgent"].map((level) => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value={level}
                      checked={formData.urgency === level}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Clinical Summary (from consultation)
              </label>
              <textarea
                value={formData.clinicalSummary}
                onChange={(e) => setFormData({ ...formData, clinicalSummary: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reason for Referral</label>
              <textarea
                value={formData.reasonForReferral}
                onChange={(e) => setFormData({ ...formData, reasonForReferral: e.target.value })}
                placeholder="Explain why specialist consultation is needed..."
                rows={3}
                className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Attachments to Include</label>
              <div className="space-y-2 bg-[#f9f9f9] p-4 rounded-[8px]">
                {formData.attachments.map((doc) => (
                  <label key={doc} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAttachments.includes(doc)}
                      onChange={() => toggleAttachment(doc)}
                      className="w-4 h-4 accent-[#2f80ed]"
                    />
                    <Icon icon="mingcute:file-document-line" width="18" height="18" />
                    <span className="text-sm font-medium">{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="border border-[#2f80ed] text-[#2f80ed] px-6 py-2 rounded-[8px] hover:bg-[#e0f3ff] transition-colors font-medium"
              >
                Preview Letter
              </button>
              <button
                type="submit"
                className="bg-[#2f80ed] text-white px-6 py-2 rounded-[8px] hover:opacity-90 transition-opacity font-medium"
              >
                Send Reference
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-[#f5f5f5] text-[#333] px-6 py-2 rounded-[8px] hover:bg-[#e8e8e8] transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showPreview && (
        <div className="bg-white p-8 rounded-xl shadow-md mb-6 border border-[#e8e8e8]">
          <Typography size="h6" as="h6" className="font-bold mb-4">
            Letter Preview
          </Typography>
          <div className="bg-[#f9f9f9] p-6 rounded-[8px] font-serif text-sm leading-relaxed space-y-4 mb-4">
            <div>
              <p className="font-bold">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p>Dear {formData.specialty} Department,</p>
            </div>
            <div>
              <p>
                Re: Patient Referral for {formData.specialty} Consultation
              </p>
            </div>
            <div>
              <p className="font-bold mb-2">Urgency Level: {formData.urgency}</p>
              <p className="whitespace-pre-wrap">{formData.clinicalSummary}</p>
            </div>
            <div>
              <p className="font-bold mb-1">Reason for Referral:</p>
              <p className="whitespace-pre-wrap">{formData.reasonForReferral || "As discussed during consultation"}</p>
            </div>
            <div>
              <p className="font-bold mb-1">Attached Documents:</p>
              <ul className="list-disc list-inside">
                {selectedAttachments.map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ul>
            </div>
            <div>
              <p>Sincerely,</p>
              <p className="font-bold pt-6">Dr. [Your Name]</p>
            </div>
          </div>
          <button
            onClick={() => setShowPreview(false)}
            className="bg-[#f5f5f5] text-[#333] px-6 py-2 rounded-[8px] hover:bg-[#e8e8e8] transition-colors font-medium"
          >
            Back to Edit
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6">
        <Typography size="h6" as="h6" className="font-bold mb-4">
          Sent References
        </Typography>
        <div className="space-y-4">
          {mockSentReferences.length === 0 ? (
            <div className="text-center py-8 text-[#828282]">
              <Icon
                icon="mingcute:file-empty-line"
                width="48"
                height="48"
                className="mx-auto mb-2 opacity-50"
              />
              <Typography className="text-sm">No references sent yet</Typography>
            </div>
          ) : (
            mockSentReferences.map((ref) => (
              <div
                key={ref.id}
                className="border border-[#e8e8e8] rounded-[8px] p-4 hover:bg-[#fafafa] transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Typography className="font-bold">
                      To Dr. {ref.doctorName} ({ref.specialty})
                    </Typography>
                    <Typography className="text-sm text-[#828282]">
                      Sent: {ref.dateSent}
                    </Typography>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ref.status === "Responded"
                        ? "bg-[#E8F5E9] text-[#27ae60]"
                        : ref.status === "Accepted"
                          ? "bg-[#FFF3E0] text-[#f2994a]"
                          : "bg-[#E0F3FF] text-[#2f80ed]"
                    }`}
                  >
                    {ref.status}
                  </span>
                </div>
                {ref.response && (
                  <div className="bg-[#f0f7ff] border-l-4 border-[#2f80ed] p-3 rounded mt-2">
                    <Typography className="text-xs font-bold text-[#2f80ed] mb-1">
                      Response:
                    </Typography>
                    <Typography className="text-sm">{ref.response}</Typography>
                  </div>
                )}
                {ref.status === "Responded" && (
                  <button className="text-[#2f80ed] hover:underline text-sm font-medium mt-3">
                    View Full Response
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferenceLetter;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              