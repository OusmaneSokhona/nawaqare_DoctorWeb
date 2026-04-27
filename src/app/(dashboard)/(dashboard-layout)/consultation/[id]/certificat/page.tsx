"use client";

import { useState } from "react";
import { Typography } from "@/components/shared/typography";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface Document {
  id: string;
  type: string;
  date: string;
  signed: boolean;
  content?: string;
}

const MedicalCertificatesPage = ({ params }: { params: { id: string } }) => {
  const consultationId = params.id;
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showPINModal, setShowPINModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [formData, setFormData] = useState({
    patientName: "Ahmed Hassan Mohammed",
    date: new Date().toISOString().split("T")[0],
    duration: "3",
    content:
      "This is to certify that the above-named patient has been examined and found to require medical leave/rest for a period of {{duration}} days commencing from {{date}}.\n\nDiagnosis: [Medical condition]\nRecommendations: Rest, avoid strenuous activities\n\nCertificate issued as per medical examination and clinical assessment.",
  });

  const [issuedDocuments, setIssuedDocuments] = useState<Document[]>([
    {
      id: "1",
      type: "Medical Certificate",
      date: "2025-04-15",
      signed: true,
    },
    {
      id: "2",
      type: "Sick Leave / Work Arrêt",
      date: "2025-04-12",
      signed: true,
    },
    {
      id: "3",
      type: "Medical Attestation",
      date: "2025-04-08",
      signed: true,
    },
  ]);

  const templates = [
    {
      id: "certificate",
      name: "Medical Certificate",
      icon: "material-symbols:description",
      description: "General medical certificate",
    },
    {
      id: "sick-leave",
      name: "Sick Leave / Work Arrêt",
      icon: "material-symbols:work-off",
      description: "Work leave certificate",
    },
    {
      id: "attestation",
      name: "Medical Attestation",
      icon: "material-symbols:assignment",
      description: "Medical documentation",
    },
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId === "sick-leave") {
      setFormData({
        ...formData,
        content: `MEDICAL CERTIFICATE - WORK LEAVE (ARRÊT)\n\nThis certifies that {{patientName}} has been medically examined and is required to take sick leave for {{duration}} days from {{date}}.\n\nMedical Condition: As assessed\nRequired Rest Period: {{duration}} calendar days\nReturn to Work: Upon completion of leave period or doctor's review\n\nPatient is advised to rest and avoid work-related activities.`,
      });
    } else if (templateId === "attestation") {
      setFormData({
        ...formData,
        content: `MEDICAL ATTESTATION\n\nThis document certifies that {{patientName}} has been examined on {{date}}.\n\nMedical Assessment: [Clinical findings]\nRecommendations: [Medical advice]\nNext Follow-up: As required\n\nThis attestation is issued for medical and administrative purposes.`,
      });
    } else {
      setFormData({
        ...formData,
        content: `MEDICAL CERTIFICATE\n\nThis is to certify that {{patientName}} has been examined and found fit for [purpose] on {{date}}.\n\nMedical Status: [Clinical assessment]\nRestrictions: [If any]\nValidity: Until next review\n\nCertificate issued based on medical examination.`,
      });
    }
  };

  const handleSignature = () => {
    setShowPINModal(true);
  };

  const verifyPIN = () => {
    if (pinInput === "1234") {
      setShowPINModal(false);
      setPinInput("");
      const newDoc: Document = {
        id: String(issuedDocuments.length + 1),
        type:
          selectedTemplate === "certificate"
            ? "Medical Certificate"
            : selectedTemplate === "sick-leave"
              ? "Sick Leave / Work Arrêt"
              : "Medical Attestation",
        date: new Date().toISOString().split("T")[0],
        signed: true,
      };
      setIssuedDocuments([newDoc, ...issuedDocuments]);
      setSelectedTemplate(null);
    } else {
      alert("Invalid PIN");
      setPinInput("");
    }
  };

  const processedContent = formData.content
    .replace("{{patientName}}", formData.patientName)
    .replace("{{date}}", formData.date)
    .replace("{{duration}}", formData.duration);

  return (
    <div className="mt-5">
      <div className="flex max-md:flex-col max-md:gap-4 justify-between items-start mb-8">
        <div>
          <Typography size="h5" as="h5" className="font-bold">
            Medical Documents
          </Typography>
          <Typography className="text-[#828282] text-sm">
            Create, sign, and manage medical certificates
          </Typography>
        </div>
        {!selectedTemplate && (
          <button
            onClick={() => setSelectedTemplate("certificate")}
            className="flex items-center gap-2 bg-[#2f80ed] text-white px-6 py-2.5 rounded-[12px] hover:opacity-90 transition-opacity"
          >
            <Icon icon="mingcute:plus-fill" width="20" height="20" />
            Create Document
          </button>
        )}
      </div>

      {!selectedTemplate && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className="bg-white border-2 border-[#e8e8e8] rounded-xl p-6 hover:border-[#2f80ed] hover:shadow-md transition-all text-left"
            >
              <Icon
                icon={template.icon}
                width="40"
                height="40"
                className="text-[#2f80ed] mb-3"
              />
              <Typography className="font-bold mb-1">{template.name}</Typography>
              <Typography className="text-xs text-[#828282]">
                {template.description}
              </Typography>
            </button>
          ))}
        </div>
      )}

      {selectedTemplate && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-[#e8e8e8]">
          <div className="flex justify-between items-center mb-4">
            <Typography size="h6" as="h6" className="font-bold">
              {templates.find((t) => t.id === selectedTemplate)?.name} - Create & Sign
            </Typography>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-[#828282] hover:text-[#333]"
            >
              <Icon icon="mingcute:close-line" width="20" height="20" />
            </button>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Patient Name</label>
                <input
                  type="text"
                  value={formData.patientName}
                  disabled
                  className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm bg-[#f9f9f9] cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
                />
              </div>
              {selectedTemplate === "sick-leave" && (
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (days)</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed]"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Document Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="w-full px-4 py-2 border border-[#e8e8e8] rounded-[8px] text-sm focus:outline-none focus:border-[#2f80ed] font-mono"
              />
            </div>

            <div className="bg-[#f9f9f9] p-4 rounded-[8px]">
              <Typography className="text-xs font-bold mb-3 text-[#333]">
                Preview
              </Typography>
              <div className="bg-white border border-[#e8e8e8] p-6 rounded text-sm leading-relaxed whitespace-pre-wrap font-serif">
                {processedContent}
              </div>
            </div>

            <div className="bg-[#f0f7ff] border border-[#2f80ed] rounded-[8px] p-4">
              <div className="flex items-start gap-3">
                <Icon icon="mingcute:alert-circle-line" width="20" height="20" className="text-[#2f80ed] mt-0.5" />
                <div>
                  <Typography className="text-sm font-bold text-[#2f80ed] mb-1">
                    Signature Required
                  </Typography>
                  <Typography className="text-xs text-[#2f80ed]">
                    Click "Sign & Download" to add your electronic signature using your PIN
                  </Typography>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleSignature}
                className="bg-[#2f80ed] text-white px-6 py-2 rounded-[8px] hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
              >
                <Icon icon="mingcute:signature-line" width="18" height="18" />
                Sign & Download PDF
              </button>
              <button
                type="button"
                onClick={() => alert("Email functionality - Send to patient")}
                className="border border-[#2f80ed] text-[#2f80ed] px-6 py-2 rounded-[8px] hover:bg-[#e0f3ff] transition-colors font-medium"
              >
                Send to Patient
              </button>
              <button
                type="button"
                onClick={() => setSelectedTemplate(null)}
                className="bg-[#f5f5f5] text-[#333] px-6 py-2 rounded-[8px] hover:bg-[#e8e8e8] transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showPINModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4">
            <Typography size="h6" as="h6" className="font-bold mb-4">
              Enter PIN to Sign
            </Typography>
            <Typography className="text-sm text-[#828282] mb-4">
              Enter your 4-digit PIN to electronically sign this document
            </Typography>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.slice(0, 4))}
              placeholder="••••"
              maxLength={4}
              className="w-full px-4 py-3 border border-[#e8e8e8] rounded-[8px] text-center text-lg tracking-widest font-bold focus:outline-none focus:border-[#2f80ed] mb-4"
              onKeyPress={(e) => e.key === "Enter" && verifyPIN()}
            />
            <div className="flex gap-3">
              <button
                onClick={verifyPIN}
                className="flex-1 bg-[#2f80ed] text-white py-2 rounded-[8px] hover:opacity-90 transition-opacity font-medium"
              >
                Sign
              </button>
              <button
                onClick={() => {
                  setShowPINModal(false);
                  setPinInput("");
                }}
                className="flex-1 bg-[#f5f5f5] text-[#333] py-2 rounded-[8px] hover:bg-[#e8e8e8] transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
            <Typography className="text-xs text-[#828282] text-center mt-3">
              Demo PIN: 1234
            </Typography>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6">
        <Typography size="h6" as="h6" className="font-bold mb-4">
          Issued Documents
        </Typography>
        {issuedDocuments.length === 0 ? (
          <div className="text-center py-8 text-[#828282]">
            <Icon
              icon="mingcute:file-empty-line"
              width="48"
              height="48"
              className="mx-auto mb-2 opacity-50"
            />
            <Typography className="text-sm">No documents issued yet</Typography>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9f9f9] border-b border-[#e8e8e8]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#333]">
                    Document
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#333]">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#333]">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#333]">
                    Signed
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-[#333]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {issuedDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-[#e8e8e8] hover:bg-[#fafafa]">
                    <td className="px-6 py-3 text-sm font-medium text-[#333]">{doc.type}</td>
                    <td className="px-6 py-3 text-sm text-[#666]">
                      <Icon
                        icon="material-symbols:description"
                        width="20"
                        height="20"
                        className="text-[#2f80ed]"
                      />
                    </td>
                    <td className="px-6 py-3 text-sm text-[#666]">{doc.date}</td>
                    <td className="px-6 py-3 text-sm">
                      {doc.signed ? (
                        <div className="flex items-center gap-1 text-[#27ae60]">
                          <Icon icon="mingcute:check-circle-fill" width="18" height="18" />
                          <span className="text-xs font-medium">Signed</span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#828282]">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <div className="flex gap-2">
                        <button className="text-[#2f80ed] hover:underline text-xs font-medium">
                          Download
                        </button>
                        <button className="text-[#eb4824] hover:underline text-xs font-medium">
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalCertificatesPage;
