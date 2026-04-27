"use client";

import React from "react";

import { Button } from "@/components/shared/button";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";

interface ChangeStepperStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  ChangeStatus: () => void;
}

const ChangeStepperStatusModal: React.FC<ChangeStepperStatusModalProps> = ({
  onClose,
  isOpen,
  ChangeStatus,
}) => {
  return (
    <ModalWrapper
      title={"Confirm"}
      titleStyling={"text-center text-primary-dark"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-5 pt-3">
        <hr className=" bg-light-gray" />
        <div className="space-y-5">
          <Typography as="p" size="lg" className="text-center">
            Are you sure you want change status to dispatched?
          </Typography>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
          <Button
            variant="outlined"
            size="medium"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              ChangeStatus();
              onClose();
            }}
            variant="primary"
            size="medium"
            className="w-full"
          >
            Yes
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ChangeStepperStatusModal;
