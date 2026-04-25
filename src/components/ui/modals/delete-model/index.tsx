"use client";
import React from "react";
import { Button } from "@/components/shared/button";
import { Typography } from "@/components/shared/typography";
import ModalWrapper from "@/components/shared/modal";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface DeleteSpecialityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

const DeleteSpecialityModal: React.FC<DeleteSpecialityModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper
      //   title={title}
      titleStyling=""
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-6 pt-3">
        {/* <Image src='/assets/svg/deleteImg.svg' width={194} height={172} alt="img" /> */}
        <div className="flex justify-center items-center">
          {/* <Icon
          className="text-secondary-color cursor-pointer  "
          icon="weui:delete-filled"
          width="194"
          height="172"
        /> */}

          <Image
            src="/assets/svg/delete-Img.svg"
            width={194}
            height={172}
            alt="delete"
          />
        </div>
        <Typography size="h3" className="font-bold text-center">
          {title}
        </Typography>
        <Typography className="text-dark-gray text-center">
          Are you sure you want to delete this contact? This action cannot be
          undone.”
        </Typography>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-4">
          <Button
            variant="outlined"
            size="medium"
            className="w-full text-secondary-color"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            // variant=""
            size="medium"
            className="w-full bg-primary-dark text-white rounded-xl"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteSpecialityModal;
