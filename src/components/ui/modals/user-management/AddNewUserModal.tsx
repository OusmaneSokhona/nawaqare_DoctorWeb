"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/shared/button";
import Iconify from "@/components/shared/iconify";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";

interface AddNewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewUserModal: React.FC<AddNewUserModalProps> = ({
  onClose,
  isOpen,
}) => {
  const pricePerUser = 100;
  const [userNum, setUserNum] = useState(1);

  const router = useRouter();

  return (
    <ModalWrapper
      title={"Add Users"}
      titleStyling={"text-center text-primary-dark"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-5 pt-5 select-none">
        <div className="w-full bg-primary-gradient rounded-2xl px-6 py-4 flex flex-col justify-center items-center gap-4">
          <div>
            <Typography
              as="h5"
              size="h5"
              className="text-white text-center leading-tight"
            >
              Select the number of users you want to add to your team
            </Typography>
          </div>
          <div className="flex gap-0 items-center text-white">
            <div
              className={`rounded-full border border-white bg-white w-7 h-7 flex items-center justify-center ${userNum <= 1 ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
              onClick={() => {
                if (userNum > 1) setUserNum(userNum - 1);
              }}
            >
              <Iconify
                icon="tabler:minus"
                color="green"
                width={22}
                height={22}
              />
            </div>
            <Typography
              size="h3"
              as="h3"
              className="text-white font-bold min-w-20 text-center"
            >
              {userNum}
            </Typography>
            <div
              onClick={() => setUserNum(userNum + 1)}
              className="rounded-full border border-white bg-white w-7 h-7 flex items-center justify-center cursor-pointer"
            >
              <Iconify
                icon="tabler:plus"
                color="green"
                width={22}
                height={22}
              />
            </div>
          </div>
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center gap-4 w-full text-white">
              <Typography size="lg" as="p" className="font-medium">
                Price per user
              </Typography>
              <Typography size="lg" as="p" className="font-bold">
                ${pricePerUser}
              </Typography>
            </div>
            <div className="flex justify-between items-center gap-4 w-full text-white">
              <Typography size="lg" as="p" className="font-medium">
                QTY
              </Typography>
              <Typography size="lg" as="p" className="font-bold">
                {userNum}
              </Typography>
            </div>
            <div className="flex justify-between items-center gap-4 w-full text-white">
              <Typography size="lg" as="p" className="font-medium">
                Total
              </Typography>
              <Typography size="lg" as="p" className="font-bold">
                ${pricePerUser * userNum}
              </Typography>
            </div>
          </div>
          <hr className="border-t border-light-gray w-full" />
          <div className="w-full">
            <Typography as="p" size="md" className="text-light-gray w-full">
              Each user can manage your pharmacy&apos;s prescriptions and
              deliveries.
            </Typography>
          </div>
          {/* Modal Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2 w-full">
            <Button
              onClick={() => router.push("/pay-with-credit-card")}
              variant="outlined"
              size="medium"
              className="w-full bg-white"
            >
              Purchase Users
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddNewUserModal;
