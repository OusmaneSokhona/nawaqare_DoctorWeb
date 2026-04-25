import React, { useEffect } from "react";

import { Button } from "@/components/shared/button";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  onClose,
  isOpen,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <ModalWrapper
      title={"Confirm"}
      titleStyling={"text-center"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-4 pt-3">
        <hr className="border-t border-light-gray" />
        <div className="w-full text-center">
          <Typography as="p" size="lg">
            Are you sure you want to Delete this user
          </Typography>
        </div>
        {/* Modal Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
          <Button
            variant="outlined"
            size="medium"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="danger" size="medium" className="w-full">
            Save
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteUserModal;
