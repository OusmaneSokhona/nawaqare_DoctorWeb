"use client";
import React, { useState } from "react";
import ModalWrapper from "@/components/shared/modal";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import { Icon } from "@iconify/react";

interface AddReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (type: string, file: File | null) => void;
}

const AddReportModal: React.FC<AddReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [reportType, setReportType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportType || !file) return;
    onSubmit(reportType, file);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper title="Add Report" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        <Typography className="text-sm text-desc-color">
          Upload medical report
        </Typography>
        {/* Report Type */}
        <div>
          <Typography className="pb-2 font-semibold">Report Type</Typography>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-3 bg-white rounded outline-none border"
          >
            <option value="">Select Report Type</option>
            <option value="blood">Blood Test</option>
            <option value="xray">X-ray</option>
            <option value="mri">MRI</option>
          </select>
        </div>

        {/* Upload Report */}
        <div>
          <Typography className="pb-2 font-semibold">Upload Report</Typography>

          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 cursor-pointer bg-gray-50 hover:bg-gray-100">
            <Icon
              icon="mdi:cloud-upload-outline"
              className="text-primary-color text-3xl mb-2"
            />
            <p className="text-sm text-gray-500">Upload your Report</p>

            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>

          {/* Uploaded status */}
          {file && (
            <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
              <Icon icon="mdi:check-circle" />
              <span>Uploaded</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-4">
          <Button variant="outlined" className="w-full" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            className="w-full bg-primary-color rounded-xl text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddReportModal;
