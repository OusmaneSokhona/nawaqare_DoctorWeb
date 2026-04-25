"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import ModalWrapper from "@/components/shared/modal";

interface ComplianceItem {
  id: string;
  name: string;
  status: "Verified" | "Expiring Soon" | "Expired" | "Missing";
  expiryDate?: string;
  daysUntilExpiry?: number;
  documentUrl?: string;
}

interface UploadModalState {
  isOpen: boolean;
  itemId: string;
  documentType: string;
  file: File | null;
  expiryDate: string;
}

const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: "license",
    name: "Medical License",
    status: "Verified",
    expiryDate: "2027-12-15",
    documentUrl: "/documents/license.pdf",
  },
  {
    id: "ordre",
    name: "Order du médecin registration",
    status: "Verified",
    documentUrl: "/documents/ordre.pdf",
  },
  {
    id: "id",
    name: "ID Verification",
    status: "Verified",
  },
  {
    id: "insurance",
    name: "Malpractice Insurance",
    status: "Expiring Soon",
    expiryDate: "2026-06-10",
    daysUntilExpiry: 45,
  },
  {
    id: "education",
    name: "Continuing Education Credits",
    status: "Missing",
  },
  {
    id: "address",
    name: "Professional Address",
    status: "Verified",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Verified: "bg-[#27ae60] text-white",
  "Expiring Soon": "bg-[#f2994a] text-white",
  Expired: "bg-[#eb4824] text-white",
  Missing: "bg-[#eb4824] text-white",
};

const STATUS_ICONS: Record<string, string> = {
  Verified: "material-symbols:check-circle-rounded",
  "Expiring Soon": "material-symbols:warning-rounded",
  Expired: "material-symbols:error-rounded",
  Missing: "material-symbols:error-rounded",
};

const CompliancePage: React.FC = () => {
  const [complianceItems, setComplianceItems] =
    useState<ComplianceItem[]>(COMPLIANCE_ITEMS);
  const [uploadModal, setUploadModal] = useState<UploadModalState>({
    isOpen: false,
    itemId: "",
    documentType: "",
    file: null,
    expiryDate: "",
  });

  const complianceScore = 83;
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#27ae60";
    if (score >= 60) return "#f2994a";
    return "#eb4824";
  };

  const expiringItemCount = complianceItems.filter(
    (item) => item.status === "Expiring Soon" || item.status === "Expired"
  ).length;

  const missingItemCount = complianceItems.filter(
    (item) => item.status === "Missing"
  ).length;

  const handleUpload = (itemId: string, itemName: string) => {
    setUploadModal({
      isOpen: true,
      itemId,
      documentType: itemName,
      file: null,
      expiryDate: "",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadModal((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmitUpload = () => {
    if (!uploadModal.file || !uploadModal.expiryDate) {
      return;
    }

    setComplianceItems(
      complianceItems.map((item) =>
        item.id === uploadModal.itemId
          ? {
              ...item,
              status: "Verified",
              expiryDate: uploadModal.expiryDate,
            }
          : item
      )
    );

    setUploadModal({
      isOpen: false,
      itemId: "",
      documentType: "",
      file: null,
      expiryDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#eceaf7] p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Typography
            as="h1"
            size="h4"
            className="font-bold text-primary-dark mb-2"
          >
            Compliance & Verification
          </Typography>
          <Typography size="sm" className="text-dark-gray">
            Monitor your medical credentials and compliance status
          </Typography>
        </div>

        {expiringItemCount > 0 && (
          <div className="bg-[#fff9e6] border-l-4 border-[#f2994a] p-4 rounded-lg">
            <div className="flex gap-3 items-start">
              <Icon
                icon="material-symbols:warning-rounded"
                width={24}
                height={24}
                color="#f2994a"
                className="flex-shrink-0 mt-0.5"
              />
              <div>
                <Typography size="md" className="font-bold text-[#f2994a]">
                  {expiringItemCount} documents expire in less than 60 days
                </Typography>
                <Typography size="sm" className="text-[#d97f07] mt-1">
                  Please renew these documents to maintain compliance.
                </Typography>
              </div>
            </div>
          </div>
        )}

        {missingItemCount > 0 && (
          <div className="bg-[#fff5f0] border-l-4 border-[#eb4824] p-4 rounded-lg">
            <div className="flex gap-3 items-start">
              <Icon
                icon="material-symbols:error-rounded"
                width={24}
                height={24}
                color="#eb4824"
                className="flex-shrink-0 mt-0.5"
              />
              <div>
                <Typography size="md" className="font-bold text-[#eb4824]">
                  Soft blocking warning
                </Typography>
                <Typography size="sm" className="text-[#b93818] mt-1">
                  Your prescriptions will be disabled in 15 days if Continuing
                  Education Credits are not uploaded.
                </Typography>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg p-8 shadow-sm border border-light-gray">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48 mb-6">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={getScoreColor(complianceScore)}
                  strokeWidth="8"
                  strokeDasharray={`${(complianceScore / 100) * 339.29} 339.29`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Typography size="h3" className="font-bold text-primary-dark">
                  {complianceScore}%
                </Typography>
                <Typography size="sm" className="text-dark-gray">
                  Compliant
                </Typography>
              </div>
            </div>
            <Typography
              as="p"
              size="md"
              className="text-center text-dark-gray max-w-xs"
            >
              Your compliance status is currently{" "}
              <span
                className="font-bold"
                style={{ color: getScoreColor(complianceScore) }}
              >
                {complianceScore >= 80
                  ? "Excellent"
                  : complianceScore >= 60
                    ? "Good"
                    : "Needs Attention"}
              </span>
            </Typography>
          </div>
        </div>

        <div className="space-y-4">
          <Typography as="h2" size="h5" className="font-bold text-primary-dark">
            Compliance Items
          </Typography>

          <div className="grid grid-cols-1 gap-4">
            {complianceItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-5 shadow-sm border border-light-gray hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <Icon
                      icon={STATUS_ICONS[item.status]}
                      width={24}
                      height={24}
                      color={
                        item.status === "Verified"
                          ? "#27ae60"
                          : item.status === "Expiring Soon"
                            ? "#f2994a"
                            : "#eb4824"
                      }
                      className="flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <Typography
                          size="md"
                          className="font-bold text-primary-dark"
                        >
                          {item.name}
                        </Typography>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {item.expiryDate && (
                        <Typography size="sm" className="text-dark-gray">
                          {item.status === "Verified"
                            ? "Expires:"
                            : "Expiry Date:"}{" "}
                          <span className="font-medium">
                            {new Date(item.expiryDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                          {item.daysUntilExpiry && (
                            <span className="text-[#f2994a] ml-2">
                              ({item.daysUntilExpiry} days remaining)
                            </span>
                          )}
                        </Typography>
                      )}

                      {item.status === "Verified" && item.documentUrl && (
                        <button className="text-[#2f80ed] text-sm font-medium hover:underline mt-2">
                          View Document
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {item.status === "Expiring Soon" && (
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => handleUpload(item.id, item.name)}
                        className="flex items-center gap-1 text-xs"
                      >
                        <Icon
                          icon="material-symbols:refresh-rounded"
                          width={16}
                          height={16}
                        />
                        Renew
                      </Button>
                    )}

                    {item.status === "Missing" && (
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleUpload(item.id, item.name)}
                        className="flex items-center gap-1 text-xs"
                      >
                        <Icon
                          icon="material-symbols:upload-file-rounded"
                          width={16}
                          height={16}
                        />
                        Upload
                      </Button>
                    )}

                    {item.status === "Expired" && (
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => handleUpload(item.id, item.name)}
                        className="flex items-center gap-1 text-xs"
                      >
                        <Icon
                          icon="material-symbols:upload-file-rounded"
                          width={16}
                          height={16}
                        />
                        Resubmit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModalWrapper
        title="Upload Document"
        onClose={() =>
          setUploadModal({
            isOpen: false,
            itemId: "",
            documentType: "",
            file: null,
            expiryDate: "",
          })
        }
        isOpen={uploadModal.isOpen}
      >
        <div className="space-y-4 py-4">
          <div>
            <Typography size="sm" className="text-dark-gray font-medium mb-2">
              Document Type
            </Typography>
            <div className="bg-light-gray px-4 py-3 rounded-lg">
              <Typography size="md" className="text-primary-dark font-medium">
                {uploadModal.documentType}
              </Typography>
            </div>
          </div>

          <div>
            <Typography size="sm" className="text-dark-gray font-medium mb-2">
              Upload File
            </Typography>
            <label className="relative block border-2 border-dashed border-light-gray rounded-lg p-6 text-center cursor-pointer hover:bg-[#f9f9f9] transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="hidden"
              />
              {uploadModal.file ? (
                <div>
                  <Icon
                    icon="material-symbols:check-circle-rounded"
                    width={32}
                    height={32}
                    color="#27ae60"
                    className="mx-auto mb-2"
                  />
                  <Typography size="sm" className="text-primary-dark font-medium">
                    {uploadModal.file.name}
                  </Typography>
                  <Typography size="sm" className="text-dark-gray mt-1">
                    {(uploadModal.file.size / 1024 / 1024).toFixed(2)} MB
                  </Typography>
                </div>
              ) : (
                <div>
                  <Icon
                    icon="material-symbols:upload-file-rounded"
                    width={32}
                    height={32}
                    color="#828282"
                    className="mx-auto mb-2"
                  />
                  <Typography size="sm" className="text-primary-dark font-medium">
                    Click to upload or drag and drop
                  </Typography>
                  <Typography size="sm" className="text-dark-gray mt-1">
                    PDF, DOC, or image files up to 10 MB
                  </Typography>
                </div>
              )}
            </label>
          </div>

          <div>
            <Typography size="sm" className="text-dark-gray font-medium mb-2">
              Expiry Date
            </Typography>
            <input
              type="date"
              value={uploadModal.expiryDate}
              onChange={(e) =>
                setUploadModal({
                  ...uploadModal,
                  expiryDate: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-primary-color"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outlined"
              size="medium"
              className="flex-1"
              onClick={() =>
                setUploadModal({
                  isOpen: false,
                  itemId: "",
                  documentType: "",
                  file: null,
                  expiryDate: "",
                })
              }
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="medium"
              className="flex-1"
              onClick={handleSubmitUpload}
              disabled={!uploadModal.file || !uploadModal.expiryDate}
            >
              Upload
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default CompliancePage;
