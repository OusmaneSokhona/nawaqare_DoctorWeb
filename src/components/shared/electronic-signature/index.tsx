"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import ModalWrapper from "@/components/shared/modal";

interface ElectronicSignatureProps {
  isOpen: boolean;
  onClose: () => void;
  onSign: (signatureData: {
    pin: string;
    timestamp: string;
    doctorName: string;
  }) => void;
  documentTitle: string;
  documentType: "prescription" | "certificate" | "report" | "reference";
}

interface SignatureState {
  pin: string;
  showSuccess: boolean;
  errorMessage: string;
}

export const ElectronicSignatureModal: React.FC<
  ElectronicSignatureProps
> = ({
  isOpen,
  onClose,
  onSign,
  documentTitle,
  documentType,
}) => {
  const [state, setState] = useState<SignatureState>({
    pin: "",
    showSuccess: false,
    errorMessage: "",
  });

  const doctorName = "Dr. Sarah Johnson";

  useEffect(() => {
    if (!isOpen) {
      setState({ pin: "", showSuccess: false, errorMessage: "" });
    }
  }, [isOpen]);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    setState((prev) => ({
      ...prev,
      pin: value,
      errorMessage: "",
    }));
  };

  const handleSign = () => {
    if (state.pin.length !== 4) {
      setState((prev) => ({
        ...prev,
        errorMessage: "PIN must be 4 digits",
      }));
      return;
    }

    setState((prev) => ({ ...prev, showSuccess: true }));

    setTimeout(() => {
      const now = new Date();
      const timestamp = now.toISOString();
      onSign({
        pin: state.pin,
        timestamp,
        doctorName,
      });
      setState({ pin: "", showSuccess: false, errorMessage: "" });
      onClose();
    }, 2000);
  };

  const currentDateTime = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const getIconByDocumentType = (type: string) => {
    const icons: Record<string, string> = {
      prescription: "material-symbols:prescription-rounded",
      certificate: "material-symbols:card-membership-rounded",
      report: "material-symbols:article-rounded",
      reference: "material-symbols:done-all-rounded",
    };
    return icons[type] || "material-symbols:document-rounded";
  };

  return (
    <ModalWrapper
      title="Sign Document"
      onClose={onClose}
      isOpen={isOpen}
      titleStyling="flex items-center gap-2"
    >
      <div className="space-y-6 py-4">
        {state.showSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#27ae60] flex items-center justify-center animate-pulse">
              <Icon
                icon="material-symbols:check-rounded"
                width={40}
                height={40}
                color="white"
              />
            </div>
            <Typography size="h5" className="text-[#27ae60] font-bold">
              Document signed successfully
            </Typography>
          </div>
        ) : (
          <>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon
                  icon={getIconByDocumentType(documentType)}
                  width={24}
                  height={24}
                  color="#2f80ed"
                />
                <Typography size="h6" className="text-primary-dark">
                  Document to Sign
                </Typography>
              </div>
              <Typography size="md" className="text-dark-gray">
                You are about to sign:{" "}
                <span className="font-bold text-primary-dark">
                  {documentTitle}
                </span>
              </Typography>
            </div>

            <div className="bg-[#fff5f0] border-l-4 border-[#eb4824] p-3 rounded">
              <Typography size="sm" className="text-[#eb4824] font-medium">
                This action will be added to the patient's permanent medical
                record and cannot be undone.
              </Typography>
            </div>

            <div className="space-y-2">
              <Typography size="sm" className="text-dark-gray font-medium">
                Doctor Name
              </Typography>
              <div className="bg-light-gray px-4 py-3 rounded-lg">
                <Typography size="md" className="text-primary-dark font-medium">
                  {doctorName}
                </Typography>
              </div>
            </div>

            <div className="space-y-3">
              <Typography size="sm" className="text-dark-gray font-medium">
                Enter PIN (4 digits)
              </Typography>
              <input
                type="password"
                inputMode="numeric"
                value={state.pin}
                onChange={handlePinChange}
                placeholder="••••"
                maxLength={4}
                className="w-full text-center text-4xl tracking-widest px-4 py-4 border-2 border-light-gray rounded-lg focus:outline-none focus:border-primary-color transition-colors"
              />
              {state.errorMessage && (
                <Typography size="sm" className="text-[#eb4824]">
                  {state.errorMessage}
                </Typography>
              )}
              <Typography size="sm" className="text-dark-gray mt-2">
                Will be signed on:{" "}
                <span className="font-medium text-primary-dark">
                  {currentDateTime}
                </span>
              </Typography>
            </div>

            <div className="bg-[#f5f5f5] p-3 rounded">
              <Typography size="sm" className="text-[#828282]">
                By signing, you confirm this document is accurate and take
                medical responsibility for its content.
              </Typography>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outlined"
                size="medium"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="medium"
                className="flex-1"
                onClick={handleSign}
                disabled={state.pin.length !== 4}
              >
                Sign Document
              </Button>
            </div>
          </>
        )}
      </div>
    </ModalWrapper>
  );
};

export function useElectronicSignature() {
  const [isOpen, setIsOpen] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType, setDocumentType] = useState<
    "prescription" | "certificate" | "report" | "reference"
  >("prescription");

  const openSignature = (
    title: string,
    type: "prescription" | "certificate" | "report" | "reference"
  ) => {
    setDocumentTitle(title);
    setDocumentType(type);
    setIsOpen(true);
  };

  const closeSignature = () => setIsOpen(false);

  return {
    isOpen,
    documentTitle,
    documentType,
    openSignature,
    closeSignature,
  };
}
