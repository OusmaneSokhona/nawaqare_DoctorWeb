import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/shared/button";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";

interface SuccessModalProps {
  props: {
    title: string;
    isOpen: boolean;
    description: string;
    buttonText: string;
    nextPageLink?: string;
    skipBtn?: string;
    onClick?: () => void;
  };
  handleClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ props, handleClose }) => {
  const {
    title,
    description,
    buttonText,
    nextPageLink,
    skipBtn,
    onClick,
    isOpen,
  } = props;

  return (
    <ModalWrapper title={""} onClose={handleClose} isOpen={isOpen}>
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <div className="max-w-[90px] md:max-w-[100px] xl:max-w-[120px]">
          <Image
            alt="logo"
            src={"/assets/svg/success.svg"}
            height={120}
            width={120}
          />
        </div>
        <div className="w-full space-y-3 md:space-y-4 xl:space-y-7">
          <div className="space-y-0 text-center">
            <Typography
              as="h3"
              size="h3"
              className="font-bold text-primary-text"
            >
              {title}
            </Typography>
            <Typography as="p" size="lg" className="text-dark-gray">
              {description}
            </Typography>
          </div>
          <div className="w-full">
            {nextPageLink ? (
              <Link href={nextPageLink} className="w-full">
                <Button
                  className="w-full"
                  type="button"
                  variant="primary"
                  onClick={onClick}
                >
                  {buttonText}
                </Button>
              </Link>
            ) : (
              <Button
                className="w-full"
                type="button"
                variant="primary"
                onClick={onClick}
              >
                {buttonText}
              </Button>
            )}
            {skipBtn && (
              <Button
                className="w-full"
                type="button"
                variant="secondary"
                onClick={handleClose}
              >
                {skipBtn}
              </Button>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SuccessModal;
