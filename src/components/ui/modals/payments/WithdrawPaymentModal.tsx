"use client";

import React, { useState } from "react";

import { Button } from "@/components/shared/button";
import Iconify from "@/components/shared/iconify";
import InputNumberField from "@/components/shared/input-fields/input-number-field";
import ModalWrapper from "@/components/shared/modal";
import { Typography } from "@/components/shared/typography";

interface WithdrawPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  btnClick: () => void;
}

const WithdrawPaymentModal: React.FC<WithdrawPaymentModalProps> = ({
  onClose,
  isOpen,
  btnClick,
}) => {
  const [userNum, setUserNum] = useState<number | undefined>(undefined);

  return (
    <ModalWrapper
      title={"Add Users"}
      titleStyling={"text-center text-primary-dark"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className="space-y-5 pt-5">
        <div className="space-y-5">
          <div className="flex flex-col gap-1">
            <Typography as="p" size="lg" className="font-bold">
              Withdraw To
            </Typography>
            <div className="px-4 py-2.5 rounded-xl border border-light-gray space-y-2">
              <Typography as="p" size="md" className="font-medium">
                Bank Name (XXXX) | USD
              </Typography>
              <div className="flex flex-col-reverse gap-1 sm:gap-0 sm:flex-row justify-between items-start">
                <div className="space-y-0">
                  <Typography as="p" size="sm" className="text-dark-gray">
                    IBAN
                  </Typography>
                  <Typography as="p" size="sm" className="text-dark-gray">
                    IBAXXXXXXXXXXXXXXXXXXXXXXXXN
                  </Typography>
                </div>
                <div>
                  <Typography
                    as="p"
                    size="md"
                    className="cursor-pointer underline underline-offset-2 font-semibold text-primary-light"
                  >
                    Change Bank
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div>
            <InputNumberField
              label="Amount"
              value={userNum}
              onChange={(e) => {
                const value = Number(e.target.value);
                setUserNum(value);
              }}
              placeholder="Enter Amount Here"
              icon={
                <Iconify
                  icon="material-symbols:person-outline"
                  size={20}
                  className="text-primary-dark"
                />
              }
              className="w-full"
              min={0}
              max={1000}
              step={1}
            />
          </div>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <Typography as="p" size="md" className="text-dark-gray">
                Available balance
              </Typography>
              <Typography as="p" size="md" className="text-dark-gray">
                $100
              </Typography>
            </div>
            <div className="py-2.5 border-y-2 border-light-gray">
              <ul className="list-disc pl-4">
                <li className="text-dark-gray">
                  <Typography as="p" size="md">
                    Instantly access your funds with our streamlined withdrawal
                    process.
                  </Typography>
                </li>
              </ul>
            </div>
            <div className="flex justify-between items-center pt-2">
              <Typography as="p" size="md" className="text-dark-gray">
                Receive amount
              </Typography>
              <Typography as="p" size="md" className="text-dark-gray">
                $10
              </Typography>
            </div>
            <div className="flex justify-between items-center">
              <Typography as="p" size="md" className="text-dark-gray">
                Network fee
              </Typography>
              <Typography as="p" size="md" className="text-dark-gray">
                $2
              </Typography>
            </div>
          </div>
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
            onClick={btnClick}
            variant="primary"
            size="medium"
            className="w-full"
          >
            Withdraw
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default WithdrawPaymentModal;
