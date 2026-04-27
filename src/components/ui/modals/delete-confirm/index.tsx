"use client";
import React from "react";
import ModalWrapper from "@/components/shared/modal";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Contact",
  description = "Are you sure you want to delete this contact? This action cannot be undone.",
}) => {
  const handleDelete = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper title={title} onClose={onClose} isOpen={isOpen}>
      <div className="pt-3 pb-5">
        {/* Description */}
        <div className="mb-6">
          <Typography className="text-desc-color font-medium text-lg text-center">
            {description}
          </Typography>
        </div>

        {/* Warning Icon (Optional) */}
        {/* <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div> */}

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outlined"
            className="flex-1 border-gray-300 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-red text-white hover:bg-red-700 rounded-xl"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;
