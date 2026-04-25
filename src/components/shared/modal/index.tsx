import React, { FC, useEffect, useRef } from "react";

import Iconify from "../iconify";
import { Typography } from "../typography";

const ModalWrapper: FC<any> = ({
  children,
  title,
  titleStyling,
  onClose,
  isOpen,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

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
    <div
      className="fixed inset-0 !z-[1000] flex items-center justify-center w-full py-10 mt-10 bg-black bg-opacity-50 backdrop-blur-sm xl:py-0"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-light-gray flex flex-col gap-1 rounded-2xl px-5 sm:px-10 py-7 w-[90%] sm:w-[70%] lg:w-[45%] xl:w-[35%] relative"
      >
        <Iconify
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer"
          height="24"
          width="24"
          icon="material-symbols:cancel-outline-rounded"
          color="#312D2D"
        />
        <Typography
          size="h4"
          className={`text-2xl font-bold mb ${titleStyling}`}
        >
          {title}
        </Typography>
        <div className="overflow-y-auto max-h-[70vh] xs:max-h-[75vh] w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
